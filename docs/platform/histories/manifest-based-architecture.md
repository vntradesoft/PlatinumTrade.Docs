---
id: platform-histories-manifest-architecture
title: Manifest-Based Monthly Partition Architecture (v2.0)
description: Technical design for monthly-partitioned binary storage with JSON manifest metadata
status: stable
visibility: internal
lastUpdated: 2026-07-15
---

# Manifest-Based Monthly Partition Architecture

## Overview

The History Candle system uses a **monthly-partitioned, binary-only, manifest-driven** storage architecture optimized for:
- **Fast metadata queries** (O(1) range lookups without file I/O)
- **Atomic writes** (no corruption on crash)
- **Memory-efficient streaming** (constant buffer size regardless of partition size)
- **Deduplication & backfill** (intelligent merge on download/sync)

## Architecture Layers

```
┌─────────────────────────────────────────┐
│   IHistoryCandleDownloader              │
│   (HistoryDownloaderService)            │
├─────────────────────────────────────────┤
│   IHistoryStoreManager                  │
│   (HistoryStoreManager)                 │
├─────────────────────────────────────────┤
│   HistoryManifestStore (JSON I/O)       │
│   BinaryHistoryStore (Binary I/O)       │
├─────────────────────────────────────────┤
│   Filesystem (Monthly partitions)       │
│   - YYYY-MM.bin (data)                  │
│   - manifest.json (per-symbol)          │
└─────────────────────────────────────────┘
```

## Directory Structure

```
$HISTORY_ROOT/
├── BTC-USDT/
│   ├── manifest.json                    # Per-symbol metadata
│   ├── 2024-01.bin                      # Monthly partition
│   ├── 2024-02.bin
│   └── 2024-03.bin
├── ETH-USDT/
│   ├── manifest.json
│   ├── 2024-01.bin
│   └── 2024-02.bin
└── SOL-USDT/
    ├── manifest.json
    └── 2024-01.bin
```

## Binary Record Format

**88 bytes per candle** (fixed-size records enable O(1) offset calculation):

```
Offset  Size  Type      Field
──────  ────  ────────  ────────
0       8     int64     DateTime.ToBinary()  [timestamp]
8       16    decimal   Open
24      16    decimal   High
40      16    decimal   Low
56      16    decimal   Close
72      16    decimal   Volume
──────────────────────────────────────────────
TOTAL   88
```

**No header**: Record count is computed as `fileSize / 88`. This design:
- Eliminates 4-byte header overhead
- Makes file append/truncation trivial
- Enables direct-seek to any record: `fileOffset = recordIndex * 88`

### Example Record Layout (48 bytes shown, omitting decimal field details)

```c#
[Ticks:     8] [OHLCV: 16+16+16+16+16=80]
[0x020A...  ] [Open  High   Low   Close  Volume]
```

## Manifest Format (manifest.json)

```json
{
  "symbol": "BTC-USDT",
  "lastUpdated": "2026-07-15T14:30:45.123Z",
  "partitions": {
    "2024-01": {
      "oldest": "2024-01-01T00:00:00Z",
      "newest": "2024-01-31T23:59:00Z",
      "count": 44640
    },
    "2024-02": {
      "oldest": "2024-02-01T00:00:00Z",
      "newest": "2024-02-29T23:59:00Z",
      "count": 43200
    },
    "2024-03": {
      "oldest": "2024-03-01T00:00:00Z",
      "newest": "2024-03-31T23:59:00Z",
      "count": 44640
    }
  }
}
```

### Computed Properties on HistoryManifest

- `HasData` → `partitions.Count > 0`
- `OldestTimestamp` → first partition's `oldest` value
- `NewestTimestamp` → last partition's `newest` value
- `ContainsRange(start, end)` → binary search on partition keys to validate coverage

## Core Components

### 1. HistoryManifestStore

**Responsibility**: JSON serialization / deserialization with atomic writes.

```csharp
public class HistoryManifestStore
{
    // Load manifest from disk
    public async Task<HistoryManifest> LoadAsync(string symbol);
    
    // Save manifest atomically (write to .tmp, rename)
    public async Task SaveAsync(HistoryManifest manifest);
    
    // Partition key utilities
    public static string ToPartitionKey(DateTime date);           // "2024-07"
    public static string[] GetPartitionKeys(DateTime start, DateTime end);
    public static (DateTime start, DateTime end) GetPartitionRange(string partitionKey);
}
```

**Atomicity**: Writes to `manifest.json.tmp`, then atomically renames to `manifest.json`. On crash during write, only temp file is left; next load falls back to previous version.

### 2. BinaryHistoryStore

**Responsibility**: Binary file I/O and partition merging logic.

```csharp
public class BinaryHistoryStore
{
    private const int RecordSize = 88;
    
    // Memory-efficient async enumeration (default batch size: 4096)
    public async IAsyncEnumerable<CandleData> StreamReadAsync(
        string symbol, 
        string partitionKey,
        int batchSize = 4096);
    
    // Atomic streaming write
    public async Task StreamWriteAsync(
        string filePath,
        IAsyncEnumerable<CandleData> candles);
    
    // Deduplicates by timestamp, re-sorts, writes back
    public async Task MergePartitionAsync(
        string symbol,
        string partitionKey,
        IAsyncEnumerable<CandleData> newCandles);
    
    // O(1) query: read first and last record
    public async Task<(DateTime oldest, DateTime newest)> GetTimestampRangeAsync(
        string symbol,
        string partitionKey);
}
```

**Streaming I/O**: Reads/writes in batches (default 4096 records ≈ 352KB) to balance memory vs. disk I/O latency. No full-file buffering.

### 3. HistoryDownloaderService

**Responsibility**: Orchestrate monthly downloads and implement IHistoryCandleDownloader.

```csharp
public class HistoryDownloaderService : IHistoryCandleDownloader
{
    // Main download entry point
    public async Task<bool> DownloadHistoryAsync(
        string symbol,
        DateTime startDate,
        DateTime? endDate = null,
        CancellationToken ct = default);
    
    // Intelligent sync: backfill + forward-fill
    public async Task<bool> SmartSyncAsync(
        string symbol,
        DateTime startDate,
        DateTime? endDate = null,
        bool forceRefresh = false,
        CancellationToken ct = default);
    
    // Stream single partition
    public async IAsyncEnumerable<CandleData> StreamDataAsync(
        string symbol,
        string partitionKey,
        [EnumeratorCancellation] CancellationToken ct = default);
    
    // Stream across multiple partitions with filtering
    public async IAsyncEnumerable<CandleData> StreamDataRangeAsync(
        string symbol,
        DateTime startDate,
        DateTime endDate,
        [EnumeratorCancellation] CancellationToken ct = default);
    
    // Check if any data exists
    public async Task<bool> HasHistoryDataAsync(string symbol);
    
    // Per-partition progress reporting
    public event Action<DownloadProgress>? OnProgressUpdate;
}
```

**Download Strategy**:
1. Scan months backward (newest first) to minimize API calls
2. Detect exchange history limit (0 candles in past month → stop)
3. Merge downloaded data into partitions
4. Report progress per partition

**Retry Logic**: Up to 5 retries on transient failures; configurable delay.

### 4. HistoryStoreManager

**Responsibility**: Query metadata and manage store lifecycle.

```csharp
public class HistoryStoreManager : IHistoryStoreManager
{
    // List all symbols with data
    public async Task<IReadOnlyList<HistoryStoreItem>> GetStoreItemsAsync();
    
    // Read all partition entries for symbol
    public async Task<StoreItemDiagnosis> DiagnoseSymbolAsync(string symbol);
    
    // Delete all data for symbol
    public async Task DeleteSymbolDataAsync(string symbol);
    
    // Clear entire store
    public async Task ClearAllStoreDataAsync();
}
```

## Key Workflows

### Workflow 1: Download New Symbol

```
1. Call DownloadHistoryAsync("BTC-USDT", start: 2024-01-01, end: 2024-12-31)
2. HistoryDownloaderService:
   a. Load manifest (creates empty if missing)
   b. Iterate months backward (2024-12 → 2024-01)
   c. Call API for each month
   d. MergePartitionAsync(symbol, "2024-12", [new candles])
   e. Update manifest + save atomically
   f. Report progress per partition
3. Result: 12 .bin files + manifest.json created
```

### Workflow 2: Smart Sync (Fill Gaps + Forward-Fill)

```
1. Call SmartSyncAsync("BTC-USDT", start: 2024-06-01)
2. Load manifest → find current extent (e.g., 2024-01 to 2024-08)
3. Backfill: Download 2024-06 if missing
4. Forward-fill: Download 2024-09, 2024-10, etc. until today
5. Update manifest
6. Return true if any new data downloaded
```

### Workflow 3: Stream Data with Range Filter

```
1. Call StreamDataRangeAsync("BTC-USDT", 
                             start: 2024-06-15 08:30,
                             end: 2024-06-20 16:45)
2. HistoryDownloaderService:
   a. HistoryManifestStore.GetPartitionRange(start, end)
     → ["2024-06"]  (May & July not in range)
   b. For each partition:
      - BinaryHistoryStore.StreamReadAsync()
      - Filter by timestamp: keep only [start, end]
   c. Yield candles
3. Consumer iterates async results with ToListAsync()
```

### Workflow 4: Merge on Download (Deduplication)

```
1. Download 100 new candles for "2024-06"
2. BinaryHistoryStore.MergePartitionAsync():
   a. Read existing 44640 candles from 2024-06.bin
   b. Combine with 100 new candles
   c. Deduplicate by timestamp (keep existing on collision)
   d. Sort by timestamp ascending
   e. Write back as atomic operation
   f. Update manifest with new count + bounds
3. Result: No duplicates, ascending order maintained
```

## Atomicity & Crash Safety

### Atomic Write Pattern (3 steps)

```csharp
// Step 1: Write to temp file
var tempPath = $"{filePath}.tmp";
await using (var stream = File.Create(tempPath))
{
    // Write all records to tempPath
}

// Step 2: (optional) Validate
// — verify record count, timestamps, etc.

// Step 3: Atomic rename (OS-level atomic)
File.Move(tempPath, filePath, overwrite: true);
```

**Guarantees**:
- On crash during write: only `.tmp` file exists; manifest unchanged
- On crash during rename: either old or new file exists; no partial data
- Next read: manifest still points to valid data

**Temp file cleanup**: Stale `.tmp` files (>24hr old) can be safely deleted.

## Performance Characteristics

### Read Performance

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Load manifest | O(1) | Small JSON, cached in memory |
| Check range coverage | O(log n) | Binary search on partition keys |
| Stream single partition | O(k) | k = record count; batched I/O |
| Stream range (multi-partition) | O(m) | m = records in range; filtered streaming |
| First/last timestamp | O(1) | Read first/last record via seek |

### Write Performance

| Operation | Complexity | Notes |
|-----------|-----------|-------|
| Merge partition | O(n log n) | n = existing + new candles; sort dominates |
| Save manifest | O(1) | Small JSON, atomic rename |

### Memory Usage

- Manifest in memory: ~1KB per 10 symbols
- Streaming buffer: 352KB (4096 records × 88 bytes)
- No full-partition buffering

### File Size Example

```
44,640 candles/month (1-minute) = 44,640 × 88 = 3,928,320 bytes ≈ 3.7 MB per month
```

## Interface Changes from v1.0

### Removed

- `Timeframe` parameter (now 1-minute only; aggregation at consumption layer)
- `SyncHistoryAsync()` method (replaced by SmartSyncAsync)
- `Format` parameter (always binary now; no CSV support)
- `StorageType` enum

### Added

- `SmartSyncAsync(symbol, startDate, endDate, forceRefresh)`
- `StreamDataRangeAsync(symbol, startDate, endDate)`
- `HasHistoryDataAsync(symbol)`
- Partition key as explicit parameter (`StreamDataAsync(symbol, partitionKey)`)

## Testing Strategy

### Unit Tests

1. **HistoryManifestTests** — Load/save manifest, partition key logic
2. **BinaryHistoryStoreTests** — Write/read/merge, timestamp range queries
3. **ManifestStoreTests** — Atomic save, concurrent access scenarios
4. **HistoryDownloaderServiceTests** — Mock API, backfill/forward-fill logic
5. **IntegrationTests** — End-to-end download + stream workflows

### Test Helpers

- `TestableDownloaders.TestBinaryStore` — In-memory wrapper for unit tests
- `FakeHistoryCandleDownloader` — Mock for UI/ViewModel tests

## Migration Notes (v1.0 → v2.0)

### For Consumers

```csharp
// OLD
await downloader.StreamDataAsync(symbol, Timeframe.OneMinute, year: 2024);

// NEW
await downloader.StreamDataAsync(symbol, partitionKey: "2024-06");
```

```csharp
// OLD
await downloader.SyncHistoryAsync(symbol, Timeframe.OneMinute, start, end);

// NEW
await downloader.SmartSyncAsync(symbol, start, end);
```

### For Storage Backends

- All storage now binary-only
- CSV support removed
- Format parameter removed from `DeleteSymbolDataAsync()`, `DiagnoseSymbolAsync()`

## Known Limitations & Future Work

### Current Limitations

1. **Fixed 1-minute resolution** — aggregation happens at consumption layer
2. **No compression** — long-term archive not yet optimized
3. **No replication** — single local copy; cloud sync not implemented
4. **Manual cleanup** — stale `.tmp` files require periodic cleanup

### Potential Future Improvements

1. **Quarter-based compression** — gzip older partitions after 90 days
2. **Incremental backups** — cloud sync for disaster recovery
3. **Multi-timeframe caching** — pre-aggregated 5m/15m/1h partitions
4. **Sharding** — distribute across multiple directories for high-frequency symbols

## Related Architecture Docs

- [Platform Architecture Overview](../architecture/overview.md)
- [Storage Paths](../storage/overview.md)
- [Logger Architecture](../logging/)
- [Strategy Engine](../strategy-engine/)

## Related Interfaces

- `IHistoryCandleDownloader` — SDK public contract
- `IHistoryStoreManager` — Store query/lifecycle
- `ITimeSeriesClient` — Market data API (uses history internally)

## References

- **Implementation**: `Pt.Okx.Core.HistoryData/` (new classes: HistoryManifestStore, BinaryHistoryStore, HistoryDownloaderService)
- **Consumer**: `Pt.Okx.Core/TimeSeriesView.cs`, `Pt.Okx.Gui/Services/CandleSyncService.cs`
- **Tests**: `Pt.Okx.Core.Tests/CandleHistoryTests.cs`

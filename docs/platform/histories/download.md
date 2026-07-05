---
id: platform-histories-download
title: Download
description: Candle history download flow and retry behavior
status: draft
visibility: internal
---

# Download

## Flow

1. Caller requests symbol/timeframe range.
2. Downloader resolves existing local extent via metadata cache.
3. Missing ranges fetched from OKX REST API in batches.
4. Data appended atomically via temp-file rename pattern.

## Key Settings

| Setting | Purpose |
|---|---|
| MaxRetries | Retry count on transient failures |
| RetryDelayMs | Base retry delay |
| ShowConsoleProgress | Progress output for CLI use |
| StorageType | Binary or CSV |

## Related Docs


---

## v2.0: Smart Sync & Monthly Partitions

**Status**: Current (as of 2026-07-15)

### Download Methods

```csharp
// Full range download
await downloader.DownloadHistoryAsync(symbol, start: 2024-01-01, end: 2024-12-31);

// Intelligent sync (backfill + forward-fill)
await downloader.SmartSyncAsync(symbol, start: 2024-06-01, forceRefresh: false);
```

### SmartSyncAsync Behavior

1. **Load manifest** → determine existing coverage
2. **Backfill** → download missing months before newest local month
3. **Forward-fill** → download months after newest local month until today
4. **Return** → true if any new data downloaded

Example:
```
Request: SmartSyncAsync("BTC-USDT", start: 2024-06-01)
Existing: 2024-01 to 2024-08 in manifest
Action: Download 2024-09 to today (forward-fill)
```

### Download Strategy

- **Scan backwards** → newest month first (minimize API calls on exchange limit)
- **Detect limit** → 0 candles in past month → stop
- **Merge & dedupe** → combine new with existing; keep by timestamp
- **Atomic write** → temp file rename pattern

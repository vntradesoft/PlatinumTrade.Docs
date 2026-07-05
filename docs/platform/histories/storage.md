---
id: platform-histories-storage
title: Storage
description: Binary and CSV storage format specification
status: draft
visibility: internal
---
# Storage

## Binary Format

- 4-byte header: record count (int32).
- 88-byte record: timestamp (int64) + 5 decimal fields (open/high/low/close/volume, 16 bytes each).
- Atomic write: temp file written then renamed to final path.

## CSV Format

- StreamWriter with minimal buffer.
- Human-readable, suitable for external tools.

## Performance Trade-offs

| Format | Read Speed | File Size | Portability |
|---|---|---|---|
| Binary | Fast | Compact | Internal only |
| CSV | Slower | Larger | Universal |

## Related Docs

- [Histories Overview](./overview.md)
- [Download](./download.md)

---

## v2.0: Monthly-Partitioned Binary-Only

**Status**: Current (as of 2026-07-15)

### Format Changes

- **Partitioning**: Monthly (YYYY-MM) instead of yearly
- **Format**: Binary only (CSV support removed)
- **Header**: No 4-byte count header; record count = fileSize / 88
- **Metadata**: Per-symbol JSON manifest for O(1) range queries

### Record Structure (88 bytes)

```
[DateTime.ToBinary: 8] [Open: 16] [High: 16] [Low: 16] [Close: 16] [Volume: 16]
```

### Manifest Metadata (per symbol)

```json
{
	"partitions": {
		"2024-06": { "oldest": "...", "newest": "...", "count": 44640 }
	}
}
```

See [Manifest-Based Architecture](./manifest-based-architecture.md) for complete specification.

### Why Binary-Only?

- CSV removed to simplify storage layer
- All aggregation/export handled at consumption layer
- Reduces test/maintenance burden

### Migration from v1.0

- Old year-based partitions (2024.bin, 2025.bin) no longer used
- New v2.0 partitions are monthly (2024-01.bin, 2024-02.bin, etc.)
- Manifests provide fast metadata without scanning files

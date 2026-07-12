---
id: index
title: Storage
sidebar_position: 3
description: The Storage API provides access to the runtime storage layout, enabling strategies and system components to locate and manage data directories.
status: stable
visibility: public
---

# Storage API

The **Storage API** provides a centralized system for resolving logical paths to physical directories for various types of runtime and persistent data, such as histories, logs, state, and caches. By abstracting the file paths into logical scopes, the Storage API ensures that your strategy and application read and write files in the correct environments.

## GetPath

Gets a storage path by its logical scope.

**Syntax**

```csharp
string GetPath(StoragePathScope scope = StoragePathScope.RuntimeDataRoot);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `scope` | [`StoragePathScope`](../enums.md#storagepathscope) | Target logical scope. If omitted, returns the highest runtime data root. |

**Remarks**

This is the primary method used to resolve paths dynamically. The framework automatically routes the request to the corresponding shortcut method based on the scope provided.

**Example**

```csharp
string cacheFolder = Storage.GetPath(StoragePathScope.Cache);
string tempFile = Path.Combine(cacheFolder, "temp.json");
```

## GetRuntimeDataRoot

Gets the root directory used for all runtime data.

**Syntax**

```csharp
string GetRuntimeDataRoot();
```

**Parameters**

*(None)*

**Remarks**

All other storage scopes (like Logs, Cache, Histories) are typically created as subdirectories under this root. 

**Example**

```csharp
string root = Storage.GetRuntimeDataRoot();
// e.g. "C:\Users\admin\AppData\Local\PlatinumTrade"
```

## GetHistoryRoot

Gets the history storage root directory.

**Syntax**

```csharp
string GetHistoryRoot();
```

**Parameters**

*(None)*

**Remarks**

Use this directory to load or save historical market data files (e.g. CSVs or custom binary formats used for backtesting).

**Example**

```csharp
string historyFolder = Storage.GetHistoryRoot();
string btcData = Path.Combine(historyFolder, "BTC_USDT_1h.csv");
```

## GetLogsRoot

Gets the runtime application logs storage root.

**Syntax**

```csharp
string GetLogsRoot();
```

**Parameters**

*(None)*

**Remarks**

This path is intended for core application logs (such as Serilog diagnostic files). It is not meant for strategy-specific or mode-specific (backtest/live) trade logs.

## GetStateRoot

Gets the state storage root directory.

**Syntax**

```csharp
string GetStateRoot();
```

**Parameters**

*(None)*

**Remarks**

Ideal for persisting internal strategy state, custom indicators state, or tracking variables across restarts.

## GetCacheRoot

Gets the cache storage root directory.

**Syntax**

```csharp
string GetCacheRoot();
```

**Parameters**

*(None)*

**Remarks**

Use this directory for temporary, non-critical data that can be safely deleted or rebuilt if lost.

## GetExportsRoot

Gets the export artifacts storage root directory.

**Syntax**

```csharp
string GetExportsRoot();
```

**Parameters**

*(None)*

**Remarks**

Use this for saving user-facing outputs, such as CSV trade reports, generated charts, or Excel files.

## Customizing the Storage Layout

If your environment requires a specialized directory structure, you can customize the storage layout by creating your own provider inheriting from `StoragePathProviderBase`.

```csharp
public class MyCustomStorageProvider : StoragePathProviderBase
{
    public override string GetRuntimeDataRoot()
    {
        return "/var/data/platinumtrade"; // Your custom path
    }
}
```

Register it in DI:

```csharp
services.UseStoragePathProvider<MyCustomStorageProvider>();
```

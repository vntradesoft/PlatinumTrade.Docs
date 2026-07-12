---
id: index
title: Storage
sidebar_position: 3
description: The Storage API provides access to the runtime storage layout, enabling strategies and system components to locate and manage data directories.
status: stable
visibility: public
---

# Storage API

The **Storage API** provides a centralized system for resolving logical paths to physical directories for various types of runtime and persistent data, such as histories, logs, state, and caches. By abstracting the file paths into logical scopes, the Storage API ensures that your strategy and application read and write files in the correct environments (e.g., Live vs. Backtest).

## IStoragePathProvider

The `IStoragePathProvider` interface is the core contract for resolving paths. By default, PlatinumTrade injects a built-in provider, which you can resolve through dependency injection to locate the necessary directories.

### Common Methods

```csharp
string GetPath(StoragePathScope scope = StoragePathScope.RuntimeDataRoot);
```

You can pass a specific [`StoragePathScope`](../enums.md#storagepathscope) to this method, such as `StoragePathScope.Histories` or `StoragePathScope.Logs`. If no scope is specified, it returns the root data directory.

The interface also provides dedicated convenience methods for each scope, including:
- `GetRuntimeDataRoot()`
- `GetHistoryRoot()`
- `GetLogsRoot()`
- `GetStateRoot()`
- `GetCacheRoot()`
- `GetExportsRoot()`

*See the [StoragePathScope](../enums.md#storagepathscope) enum for all available logical scopes.*

## Customizing the Storage Layout

If your environment requires a specialized directory structure, you can customize the storage layout by creating your own provider.

### StoragePathProviderBase

To simplify custom implementations, the SDK provides the `StoragePathProviderBase` abstract class. You only need to implement the `GetRuntimeDataRoot()` method. The base class will automatically append the appropriate subfolder names (e.g., `Logs`, `Histories`, `State`) to your custom root.

```csharp
public class MyCustomStorageProvider : StoragePathProviderBase
{
    public override string GetRuntimeDataRoot()
    {
        return "/var/data/platinumtrade"; // Your custom path
    }
}
```

### Registration

To register your custom path provider, use the `UseStoragePathProvider` extension method during service configuration:

```csharp
services.UseStoragePathProvider<MyCustomStorageProvider>();

// Alternatively, provide an explicit instance:
// services.UseStoragePathProvider(new MyCustomStorageProvider());
```

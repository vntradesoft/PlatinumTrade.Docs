---
id: sdk-indicator-overview
title: Overview & Setup
description: Developing custom indicator plugins
status: published
visibility: public
---

# Custom Indicator Plugin

This guide explains how to create a custom technical indicator plugin for the Platinum Trading Platform (supporting OKX exchange futures & swaps). A plugin is an independent DLL that can be loaded into the GUI or Bot without recompiling the core.

## Architecture Overview

The indicator plugin system relies on three main components:

| Interface / Class | Role |
|---|---|
| `IIndicatorPlugin` | Entry point — defines plugin metadata and registers indicators. |
| `IIndicatorRegistrationContext` | Context used to register indicator factory methods and parameter metadata. |
| `CalcIndBase` | The base class that all custom indicators MUST inherit from. It manages indicator identity, buffers, and calculations. |

## Step 1: Create the Project

Use the `.NET CLI` to generate a class library project for your indicators.

```bash
dotnet new classlib -n MyIndicators -f net10.0
```

Configure your `.csproj` to reference `Pt.Okx.Sdk`:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
  <ItemGroup>
    <!-- Adjust path depending on your folder structure -->
    <ProjectReference Include="..\Pt.Okx.Sdk\Pt.Okx.Sdk.csproj" />
  </ItemGroup>
</Project>
```

## Step 2: Implement the Plugin Entry Point

Every plugin needs a single class that implements `IIndicatorPlugin`. This class provides metadata about your plugin (name, author, version) and is responsible for registering the actual indicators.

```csharp
using Pt.Okx.Sdk.Indicators.Plugin;

public class MyIndicatorPlugin : IIndicatorPlugin
{
    // Metadata properties
    public string Name => "My Custom Indicators";
    public string PluginVersion => "1.0.0";
    public string RequiredSdkVersion => "1.0.0";
    public string Description => "Contains custom Simple Moving Average (SMA) and Momentum indicators.";
    public string Author => "John Doe";

    // Register all indicators contained in this DLL
    public void RegisterIndicators(IIndicatorRegistrationContext context)
    {
        // Registration logic will go here. See the Registration & Parameters page.
    }
}
```

## Loading the Plugin

Plugins are loaded dynamically by the platform.

### From the GUI
Users can load your plugin through the user interface:
Navigate to: **Insert > Indicators > Custom > Load Custom Indicator...** and select your generated `MyIndicators.dll`.

### Programmatically (Bots/Engines)
When running headless bots, the engine uses the `IIndicatorPluginLoader` (injected via DI):

```csharp
IIndicatorPluginLoader loader = /* injected */;

// Load a specific DLL
var plugin = loader.LoadPlugin("path/to/MyIndicators.dll");

// Inspect loaded plugins
foreach (var p in loader.LoadedPlugins)
{
    Console.WriteLine($"{p.Metadata.Name} v{p.Metadata.PluginVersion}");
}
```

---

Next, proceed to **[Registration & Parameters](registration.md)** to learn how to register your indicators and define their input settings.

---
sidebar_position: 9
id: sdk-strategy-logger-notify
title: Logger and Notifications
description: Logging events and sending Telegram notifications
status: draft
visibility: internal
publish: false
---

# Logging & Notifications

The `IStrategyLogger` interface provides structured logging tightly integrated with external notifications (like Telegram or MS Teams). 

When building a strategy plugin, inject `IStrategyLogger` into your classes rather than standard generic loggers, as it provides trading-specific syntax and auto-routing to external platforms.

## Standard Log Levels

Standard logging handles messages by severity. Based on the `PluginDisplayLogLevels` configured in your plugin registration, these will appear in the GUI or CLI.

```csharp
_logger.LogDebug("Title", "Template {Arg}", value);
_logger.LogInformation("Title", "Template {Arg}", value);
_logger.LogWarning("Title", "Template {Arg}", value);
_logger.LogError(exception, "Title", "Template {Arg}", value);
_logger.LogCritical("Title", "Template {Arg}", value);
_logger.LogSuccess("Title", "Template {Arg}", value);
```

## Trading-specific Logging

The platform includes specialized log methods to format trading actions beautifully in the console and reports.

```csharp
// Log entry order
_logger.LogEntry("BTC-USDT-SWAP", OrderSide.Buy,
    quantity: 0.01m, price: 95000m, sl: 93000m, tp: 100000m);

// Log exit order
_logger.LogExit("BTC-USDT-SWAP", reason: "TP Hit", OrderSide.Sell,
    qtyFill: 0.01m, entryPrice: 95000m, exitPrice: 100000m, pnl: 50m);

// Log an internal strategy signal
_logger.LogSignal("BUY", "MA crossover + RSI > 50");
```

## State Changes and Auto-Emoji

The `LogStateChange` method is perfect for tracking the macro lifecycle of your strategy (e.g. from Idle to Active). It automatically prepends an emoji based on the state keyword:

```csharp
_logger.LogStateChange("idle", "active", "Entry signal detected");
_logger.LogStateChange("active", "stopped", "Max drawdown reached");
```

**Emoji Mapping:**

| Emoji | Keywords |
|---|---|
| 🟢 | `active`, `idle`, `open`, `started`, `running`, `position_open` |
| 🔴 | `closed`, `stopped`, `ended`, `error`, `failed`, `blocked` |
| 🔄 | `pending`, `waiting`, `init`, `recovery`, `entry_pending`, `reversing_pending` |
| ➡️ | Any other state |

## Key-Value Logging

To log structured settings or metrics clearly in the console:

```csharp
// Log strategy configuration
_logger.LogConfig("Strategy Config",
    ("Symbol", "BTC-USDT"),
    ("Timeframe", "1h"),
    ("Leverage", "10x"));

// Log arbitrary key-value data (e.g. Position Status)
_logger.LogKeyValues("Position Info", "Current state",
    ("Side", "Long"),
    ("Entry", "95000"),
    ("PnL", "+2.5%"));
```

### Log Typed Input Schema Directly

If your strategy uses typed input DI (`BindSchema<TSchema>()`), you can log schema values without writing a custom display helper:

```csharp
_logger.LogInputParams(_input);
```

Optional custom title:

```csharp
_logger.LogInputParams(_input, "Strategy Input Parameters");
```

This extension skips properties marked with `[InputParamIgnore]` and uses input keys from `[InputParam(Key = ...)]` when available.

## Notifications (Telegram / Teams)

Based on your plugin's `PluginNotifyLevels`, standard logs (like `LogCritical`) might automatically push to Telegram. However, you can also force notifications explicitly:

```csharp
// Send a direct message to external channels
_logger.NotifyTrace("Bot Status", "Strategy running normally");
_logger.NotifyError("Alert", exception);

// Send structured data
_logger.NotifyKeyValue("Daily Report",
    ("PnL", "+150 USDT"),
    ("Trades", "5"),
    ("Win Rate", "80%"));

// Send a file document (e.g. Backtest HTML Report)
_logger.NotifyDocument("Backtest Result", "/path/to/report.html");
```

> [!NOTE]
> `Debug` and `Trace` logs are **always excluded from external notifications**, regardless of your `PluginNotifyLevels` settings, to prevent spamming the user's phone with high-frequency noise.

### Multi-Bot Routing

The platform supports configuring multiple Telegram Bots simultaneously (each with its own token and chat ID, managed under Options Settings in the GUI). 

When starting a live trading session, the user selects which Telegram Bot to associate with the strategy via the **Telegram Bot Alias** dropdown. The selected alias is stored in `StrategySettings.TelegramBotAlias`. All notification calls (`LogSuccess`, `NotifyTrace`, etc.) made by the strategy instance will be automatically and transparently routed to the correct Telegram Bot channel based on this alias.
---
id: index
title: Notifications
sidebar_position: 1
description: Notifications API allows you to send alerts, push notifications, and emails.
status: stable
visibility: public
---

# Notifications API

The Notifications API allows your strategies to alert the user via UI popups, email, or Telegram/Push messages. You can access these methods via the `Logger` property on your strategy, which handles routing the notification to active channels.

## NotifyTrace

Sends a trace notification with a message and a specific log level.

**Syntax**

```csharp
void NotifyTrace(string title, string message, PtLogLevel level = PtLogLevel.Information);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `title` | `string` | The notification title. |
| `message` | `string` | The trace message. |
| `level` | [`PtLogLevel`](../enums.md#ptloglevel) | The log level (default: Information). |

## NotifyKeyValue

Sends a notification with structured key-value pairs.

**Syntax**

```csharp
void NotifyKeyValue(string title, params (string key, string value)[] data);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `title` | `string` | The notification title. |
| `data` | `(string, string)[]` | The key-value pairs to notify. |

## NotifyDocument

Sends a notification with a document attachment.

**Syntax**

```csharp
void NotifyDocument(string title, string filePath);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `title` | `string` | The notification title. |
| `filePath` | `string` | The path to the document file. |

## NotifyError

Sends a notification for an error event containing exception details.

**Syntax**

```csharp
void NotifyError(string title, Exception ex);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `title` | `string` | The notification title. |
| `ex` | `Exception` | The exception to notify about. |

## Telegram Commands

You can extend the default Telegram bot functionality by registering custom commands for your strategy. This allows users to control or query your strategy remotely.

### ITelegramCommandExtension

To add custom commands, implement the `ITelegramCommandExtension` interface in your plugin. The host engine will automatically discover and register your implementation via Dependency Injection.

```csharp
public class MyCustomCommandHandler : ITelegramCommandExtension
{
    public string? HelpText => "/forcetp - Force take profit for the current active position.";

    public TradeCommand? TryParse(string action, string[] args)
    {
        if (action.ToLower() == "forcetp")
        {
            return new TradeCommand 
            {
                Action = TradeAction.Custom,
                CommandTag = "forcetp"
            };
        }

        return null; // Not a recognized command
    }
}
```

The resulting `TradeCommand` will be routed into your strategy's event stream, where you can handle it inside your main `OnEventAsync` or tick logic.

## Models and Enums

| Type | Description |
|---|---|
| [`TradeCommand`](../models.md#tradecommand) | Represents a parsed command (e.g., from Telegram) sent to the strategy. |
| [`TradeAction`](../enums.md#tradeaction) | Defines standard command actions (e.g., Pause, Resume, Shutdown, Custom). |
| [`TelegramBotConfig`](../models.md#telegrambotconfig) | Configuration settings for the Telegram notification channel. |

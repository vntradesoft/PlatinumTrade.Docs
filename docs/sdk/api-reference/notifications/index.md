---
id: index
title: Notifications & Commands
sidebar_position: 1
description: Notifications API allows you to send alerts, push notifications, and handle Telegram commands.
status: stable
visibility: public
---

# Notifications & Commands

The **Notifications API** enables your strategies to push alerts to the user through various channels (UI popups, Emails, Telegram, Push notifications) and listen to custom Telegram commands.

Unlike other systems, the SDK does not require you to inject a separate `INotificationsClient`. Instead, the unified `IStrategyLogger` handles both logging and alert routing.

## Sending Notifications

You can trigger notifications directly from your strategy using the `Logger` property (which implements `IStrategyLogger`). The host engine handles routing the message to the active notification channels (e.g., Telegram, Webhook, UI).

### Notification Methods

- **`NotifyTrace(string title, string message, PtLogLevel level)`**: Sends a general text notification.
- **`NotifyKeyValue(string title, params (string, string)[] data)`**: Sends a structured notification containing key-value pairs.
- **`NotifyDocument(string title, string filePath)`**: Sends a document or file attachment to the user (e.g., via Telegram).
- **`NotifyError(string title, Exception ex)`**: Sends a high-priority alert containing exception details.

```csharp
// Example: Sending a key-value notification on a trade exit
Logger.NotifyKeyValue("Trade Closed",
    ("Symbol", "BTC-USDT"),
    ("PnL", "$150.00"),
    ("Reason", "Take Profit Hit"));
```

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

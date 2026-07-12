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
void NotifyTrace(string title, string message, PtLogLevel level);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `title` | `string` | The notification title. |
| `message` | `string` | The trace message. |
| `level` | [`PtLogLevel`](../enums.md#ptloglevel) | The log level (default: Information). |

**Return Value**

void

**Remarks**

This method is useful for sending lightweight text alerts to the user, such as notifying them about a specific market condition being met, or a strategy milestone.

**Example**

```csharp
Logger.NotifyTrace("Market Alert", "Bitcoin price has crossed above the 200 SMA.", PtLogLevel.Information);
```

---

## NotifyKeyValue
Sends a notification with structured key-value pairs.

**Syntax**

```csharp
void NotifyKeyValue(string title, (string, string)[] data);
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `title` | `string` | The notification title. |
| `data` | `(string, string)[]` | The key-value pairs to notify. |

**Return Value**

void

**Remarks**

The key-value format provides a clean, tabular presentation in Telegram and UI notifications, making it ideal for trade execution summaries or metrics reporting.

**Example**

```csharp
Logger.NotifyKeyValue("Trade Closed",
    ("Symbol", "BTC-USDT"),
    ("PnL", "$150.00"),
    ("Reason", "Take Profit Hit"));
```

---

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
| `filePath` | `string` | The path to the document file on disk. |

**Return Value**

void

**Remarks**

This is primarily used to send generated reports, CSV exports, or chart screenshots directly to the user's Telegram or email. Ensure the file path is accessible by the host process.

**Example**

```csharp
string reportPath = Path.Combine(Storage.GetExportsRoot(), "monthly_report.csv");
Logger.NotifyDocument("Monthly Strategy Report", reportPath);
```

---

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

**Return Value**

void

**Remarks**

Use this method when a critical failure occurs in your strategy (e.g., API disconnection, data corruption) and the user needs to be notified immediately. The alert is typically routed as a high-priority message.

**Example**

```csharp
try
{
    // Custom logic that might fail
    ProcessExternalData();
}
catch (Exception ex)
{
    Logger.NotifyError("Data Processing Failure", ex);
}
```

---

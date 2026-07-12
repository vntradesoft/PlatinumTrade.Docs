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


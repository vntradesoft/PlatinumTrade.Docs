---
id: products-gui-settings-telegram-bot-setup
title: Telegram Bot Setup
sidebar_position: 10
description: Create a Telegram bot and retrieve your Chat ID
status: published
visibility: public
---

# Create a Telegram Bot and Get the Chat ID

## 1. Create a Telegram Bot

1. Open Telegram and search for **@BotFather**.
2. Send the command:
   ```
   /newbot
   ```
3. Follow the prompts to name your bot.
4. After the bot is created, you will receive a **Bot Token**.

Keep the bot token safe. For example: `123456:ABC-DEF...`

---

## 2. Get the Chat ID

### Step 1: Send a message to your bot

For example, send `hello`.

---

### Step 2: Open the following link in your browser

Replace `YOUR_BOT_TOKEN` with your token:

```
https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
```

Example:
```
https://api.telegram.org/bot123456:ABC-DEF/getUpdates
```

---

### Step 3: Find the Chat ID

In the JSON response, look for:

```json
"chat": {
  "id": 123456789,
  ...
}
```

`123456789` is your Chat ID.

---

## 3. Notes

- Personal chat IDs are usually positive numbers.
- Group chat IDs are usually negative numbers, for example `-100xxxxxxxxx`.
- If you do not see any data, send another message to the bot and refresh the link.

---

## 4. Example usage in code (C#)

```csharp
string botToken = "YOUR_BOT_TOKEN";
string chatId = "123456789";
```

---
id: products-bot-cli-faq
title: Faq
description: Frequently asked questions for CLI operators
status: draft
visibility: internal
publish: false
---

# Faq

## Why does startup fail with configuration error?

- API environment variables may be missing.
- Strategy DLL or input json may be missing.

## Why are backtest arguments ignored or rejected?

Current bot host path is forward/live oriented and backtest mode is not active in this execution flow.

## How to enable Telegram notifications?

Set TELEGRAM_TOKEN and TELEGRAM_CHATID, then use notifier argument accordingly.

## Can I run with proxy?

Yes, set HTTP_PROXY and use --use_proxy.

## Related Docs

- [CLI Getting Started](./getting-started.md)
- [Run On Ubuntu](./run-on-ubuntu.md)


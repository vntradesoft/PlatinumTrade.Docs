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

- Strategy DLL path may be wrong or the DLL may not exist.
- Required runtime arguments may be missing.
- OKX credentials may be unavailable after alias/settings and env fallback.
- Telegram notifier may be enabled without a valid alias or env fallback.

## Why are backtest arguments ignored or rejected?

Current bot host path is forward/live oriented and backtest mode is not active in this execution flow.

## How to enable Telegram notifications?

- Preferred: configure a Telegram bot alias in shared app settings and pass `--telegram_bot_alias <alias>`.
- Fallback: set `TELEGRAM_TOKEN` and `TELEGRAM_CHATID`.
- Use `--notifier Telegram` or `--notifier All`.

## Can I run with proxy?

Yes.

- Preferred: configure `Proxy.IsUse`, `Proxy.Url`, and `Proxy.Port` in shared app settings.
- Fallback: set `HTTP_PROXY`.
- Pass `--use_proxy` to enable proxy usage in Bot CLI.

## What does `--verbose` do?

- Raises the base bot log level to `Verbose`.

## What does `--api_log` do?

- Enables logs from the `OKX.Net` library that are otherwise filtered out in normal runs.

## Can I skip aliases and run only from env?

Yes.

- `--okx_account_alias` and `--telegram_bot_alias` are optional.
- If they are omitted, Bot CLI uses env fallback when available.

## Related Docs

- [CLI Getting Started](./getting-started.md)
- [Run On Windows](./run-on-windows.md)
- [Run On Ubuntu](./run-on-ubuntu.md)


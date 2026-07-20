---
id: products-bot-cli-overview
title: Overview
description: Command-line trading host for automation and strategy execution
status: draft
visibility: internal
publish: false
---

# Overview

Bot CLI is the command-line host for running strategy plugins in real or sandbox trading environments.

The current host is real-only. It does not run backtests.

## Core Capabilities

- Run strategy plugins with a .NET Generic Host.
- Switch between sandbox and live execution with `--sandbox`.
- Resolve OKX account credentials from configured aliases first, then environment fallback.
- Resolve Telegram notifier configuration from configured aliases first, then environment fallback.
- Resolve proxy configuration from application settings first, then `HTTP_PROXY` fallback.
- Control bot verbosity with `--verbose` and OKX.Net library logging with `--api_log`.

## Supported CLI Arguments

- `--strategy <path-to-dll>`
- `--symbol <instrument>`
- `--timeframe <1m|3m|5m|15m|30m|1h|2h|4h|6h|12h|1d|1w|1M|3M>`
- `--leverage <int>`
- `--margin_mode <Isolated|Cross>`
- `--okx_account_alias <alias>`
- `--telegram_bot_alias <alias>`
- `--notifier <Telegram|Teams|All>`
- `--sandbox`
- `--use_proxy`
- `--verbose`
- `--api_log`
- `--warmup_bars <int>`
- `--exchange <name>`
- `--underlying <name>`

## Resolution Order

- OKX credentials: `--okx_account_alias` -> shared app settings -> `API_KEY`/`API_SECRET` or `API_KEY_R`/`API_SECRET_R` + `API_PASS`
- Telegram notifier: `--telegram_bot_alias` -> shared app settings -> `TELEGRAM_TOKEN` + `TELEGRAM_CHATID`
- Proxy: shared app settings -> `HTTP_PROXY`

## Privacy And Security Note

- This end-user operations guide does not disclose internal source structure.

## Read Next

- [CLI Getting Started](./getting-started.md)
- [Run On Windows](./run-on-windows.md)
- [Run On Ubuntu](./run-on-ubuntu.md)
- [CLI FAQ](./faq.md)

## TBD

- [ ] Official systemd unit template and production hardening checklist.


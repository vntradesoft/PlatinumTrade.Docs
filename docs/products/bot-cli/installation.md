---
id: products-bot-cli-installation
title: Installation
description: Build and run setup for CLI
status: draft
visibility: internal
publish: false
---

# Installation

## Requirements

- .NET SDK 10.x
- Linux or Windows host
- Strategy DLL compiled for the same runtime family used by the bot host

## Install And Run

- Install packaged bot binary from your release channel.
- Prepare shared application settings for aliases, Telegram, and proxy if you plan to use settings-first resolution.
- Optionally prepare fallback variables from the repo-root `.env.example`.
- Start Bot CLI with the command-line arguments supported by the current real-only host.

## Minimum Required Arguments

- `--strategy`
- `--symbol`
- `--timeframe`
- `--leverage`

## Recommended Arguments

- `--okx_account_alias`
- `--telegram_bot_alias`
- `--margin_mode`
- `--notifier`
- `--warmup_bars`

## Notes

- `--okx_account_alias` and `--telegram_bot_alias` are optional but strongly recommended.
- Env fallback remains available for OKX, Telegram, Teams, and proxy.
- `--sandbox` switches the host to demo environment.
- `--verbose` and `--api_log` are useful during debugging and rollout.

## Related Docs

- [API Key Setup](./api-key-setup.md)
- [Run On Windows](./run-on-windows.md)
- [Run On Ubuntu](./run-on-ubuntu.md)


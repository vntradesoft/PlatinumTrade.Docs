---
id: products-bot-cli-getting-started
title: Getting Started
description: Quick start for running the trading CLI host
status: draft
visibility: internal
publish: false
---

# Getting Started

Use this page to run the bot quickly in sandbox mode.

## 1) Prepare Environment Variables

- API_KEY or API_KEY_R
- API_SECRET or API_SECRET_R
- API_PASS

For notifier support:

- TELEGRAM_TOKEN
- TELEGRAM_CHATID

## 2) Run Bot

```bash
okx-bot --sandbox --strategy <strategy.dll> --symbol BTC-USDT-SWAP --timeframe 1m --history_load Binary
```

## 3) Verify Logs

Bot writes console output and rolling files under runtime logs root.

## Common First-Run Notes

- Backtest flag is currently rejected in bot host path.
- Strategy DLL path and matching input json are required.

## Related Docs

- [API Key Setup](./api-key-setup.md)
- [Run On Ubuntu](./run-on-ubuntu.md)
- [CLI FAQ](./faq.md)

## TBD

- [ ] Public sample env file template.


---
id: products-bot-cli-run-on-ubuntu
title: Run On Ubuntu
description: Draft deployment guide for running CLI on Ubuntu host
status: tbd
visibility: internal
publish: false
---

# Run On Ubuntu

## Status: TBD

This is a deployment draft and needs final operations review.

## Open Questions

- [ ] What is the official package/distribution format for bot deployment?
- [ ] Which user/group and directory policy should be standard?
- [ ] What is the final restart and health-check policy?

## Draft Steps

1. Install .NET 10 runtime/sdk on Ubuntu.
2. Install or copy packaged bot binary to deployment directory.

3. Export required environment variables on host.
4. Run command and verify logs.

## Draft systemd unit example

```ini
[Unit]
Description=Pt.Okx Bot
After=network-online.target

[Service]
WorkingDirectory=/opt/okx-bot
ExecStart=/usr/bin/okx-bot --sandbox --strategy /opt/okx-bot/strategies/uptrend.dll --symbol BTC-USDT-SWAP --timeframe 1m
Restart=always
RestartSec=5
User=okxbot
Environment=API_KEY=...
Environment=API_SECRET=...
Environment=API_PASS=...

[Install]
WantedBy=multi-user.target
```

## Related Docs

- [API Key Setup](./api-key-setup.md)
- [CLI FAQ](./faq.md)


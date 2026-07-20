---
id: products-bot-cli-run-on-ubuntu
title: Run On Ubuntu
description: Draft deployment guide for running CLI on Ubuntu host
status: tbd
visibility: internal
publish: false
---
Use this page when deploying the Bot CLI to an Ubuntu host with `dotnet` or a published binary.

## 1) Install Runtime

1. Install .NET 10 runtime or SDK on the target host.
2. Copy the bot binary and strategy DLLs to a deployment directory.

## 2) Prepare Shared Configuration

1. Ensure shared app settings contain:
- OKX account aliases if you want alias-based credential resolution.
- Telegram bot aliases if you want alias-based notifications.
- Proxy settings if your host needs outbound proxy access.
2. Optionally prepare fallback env values using the repo-root `.env.example`.

## 3) Start Command

Example sandbox run:

```bash
/usr/bin/dotnet /opt/platinumtrade/Pt.Okx.Bot.dll \
	--sandbox \
	--okx_account_alias "okx_test" \
	--telegram_bot_alias "telebot" \
	--strategy /opt/platinumtrade/strategies/Stgy.UpTrend.dll \
	--underlying BTC-USDT \
	--symbol BTC-USDT-SWAP \
	--timeframe 1h \
	--leverage 5 \
	--margin_mode Isolated \
	--notifier Telegram \
	--warmup_bars 10000
```

## 4) Logging Options

- Add `--verbose` for detailed bot logs.
- Add `--api_log` to include `OKX.Net` library logs.

## Draft systemd unit example

```ini
[Unit]
Description=Pt.Okx Bot
After=network-online.target

[Service]
WorkingDirectory=/opt/platinumtrade
ExecStart=/usr/bin/dotnet /opt/platinumtrade/Pt.Okx.Bot.dll --sandbox --okx_account_alias okx_test --telegram_bot_alias telebot --strategy /opt/platinumtrade/strategies/Stgy.UpTrend.dll --underlying BTC-USDT --symbol BTC-USDT-SWAP --timeframe 1h --leverage 5 --margin_mode Isolated --notifier Telegram --warmup_bars 10000
Restart=always
RestartSec=5
User=okxbot
Environment=API_KEY=...
Environment=API_SECRET=...
Environment=API_PASS=...
Environment=TELEGRAM_TOKEN=...
Environment=TELEGRAM_CHATID=...

[Install]
WantedBy=multi-user.target
```

## Notes

- If aliases resolve successfully, the env values above are not required.
- If proxy settings are not present in shared settings, set `HTTP_PROXY` and keep `--use_proxy` in your command.
- The CLI host is real-only; do not pass backtest arguments.

## Related Docs

- [API Key Setup](./api-key-setup.md)
- [Run On Windows](./run-on-windows.md)
- [CLI FAQ](./faq.md)


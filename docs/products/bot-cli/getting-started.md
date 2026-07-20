---
id: products-bot-cli-getting-started
title: Getting Started
description: Quick start for running the trading CLI host
status: draft
visibility: internal
publish: false
---

# Getting Started

Use this page to run the bot quickly in sandbox mode for validation, then switch to live mode when aliases and credentials are confirmed.

## 1) Prepare Strategy And Configuration

- Build your strategy DLL.
- Confirm the DLL path you plan to pass to `--strategy` exists.
- Register an OKX account alias in the shared app settings, or prepare fallback environment variables.
- Register a Telegram bot alias in the shared app settings if you want Telegram notifications.

## 2) Optional Fallback Environment Variables

- Copy the repo-root `.env.example` into your deployment-specific secret store or shell profile.
- Use env fallback only when alias-based configuration is unavailable or intentionally omitted.

## 3) Run Bot In Sandbox

```bash
dotnet run --project ./Pt.Okx.Bot/Pt.Okx.Bot.csproj --launch-profile "Pt.Okx.Bot.Demo"
```

Equivalent direct CLI example:

```bash
okx-bot \
	--sandbox \
	--okx_account_alias "okx_test" \
	--telegram_bot_alias "telebot" \
	--strategy ./Stgy.UpTrend/bin/Debug/net10.0/Stgy.UpTrend.dll \
	--underlying BTC-USDT \
	--symbol BTC-USDT-SWAP \
	--timeframe 1h \
	--leverage 5 \
	--margin_mode Isolated \
	--notifier Telegram \
	--warmup_bars 10000
```

## 4) Run Bot In Live Mode

```bash
dotnet run --project ./Pt.Okx.Bot/Pt.Okx.Bot.csproj --launch-profile "Pt.Okx.Bot.Live"
```

Equivalent direct CLI example:

```bash
okx-bot \
	--okx_account_alias "Default Live" \
	--telegram_bot_alias "tele_live" \
	--strategy ./Stgy.UpTrend/bin/Debug/net10.0/Stgy.UpTrend.dll \
	--underlying BTC-USDT \
	--symbol BTC-USDT-SWAP \
	--timeframe 1h \
	--leverage 3 \
	--margin_mode Isolated \
	--notifier Telegram \
	--warmup_bars 10000
```

## 5) Verify Logs

Bot writes console output and rolling files under runtime logs root.

Helpful flags:

- `--verbose` enables more detailed bot logs.
- `--api_log` includes logs from the OKX.Net library.

## Common First-Run Notes

- Backtest flags are rejected. The current CLI host is real-only.
- `--strategy`, `--symbol`, `--timeframe`, and `--leverage` are required.
- `--okx_account_alias` and `--telegram_bot_alias` are optional, but recommended.
- `--use_proxy` only enables proxy usage; the actual proxy endpoint comes from shared settings first, then `HTTP_PROXY` fallback.

## Related Docs

- [API Key Setup](./api-key-setup.md)
- [Run On Windows](./run-on-windows.md)
- [Run On Ubuntu](./run-on-ubuntu.md)
- [CLI FAQ](./faq.md)


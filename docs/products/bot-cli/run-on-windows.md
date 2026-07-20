---
id: products-bot-cli-run-on-windows
title: Run On Windows
description: Deployment guide for running Bot CLI on Windows hosts
status: draft
visibility: internal
publish: false
---

# Run On Windows

Use this page when deploying the Bot CLI to a Windows host with the published `.exe`.

## 1) Prepare Files

1. Publish or extract the Bot CLI release to a target folder.
2. Copy your strategy DLLs to a stable location.
3. Confirm the Bot executable exists, for example:

```powershell
C:\PlatinumTrade\Pt.Okx.Bot.exe
```

## 2) Prepare Shared Configuration

1. Ensure shared app settings contain:
- OKX account aliases if you want alias-based credential resolution.
- Telegram bot aliases if you want alias-based notifications.
- Proxy settings if outbound traffic requires a proxy.
2. Optionally prepare fallback values from the repo-root `.env.example`.

## 3) Start Command

Example sandbox run:

```powershell
.\Pt.Okx.Bot.exe `
  --sandbox `
  --okx_account_alias "okx_test" `
  --telegram_bot_alias "telebot" `
  --strategy "C:\PlatinumTrade\strategies\Stgy.UpTrend.dll" `
  --underlying BTC-USDT `
  --symbol BTC-USDT-SWAP `
  --timeframe 1h `
  --leverage 5 `
  --margin_mode Isolated `
  --notifier Telegram `
  --warmup_bars 10000
```

Example live run:

```powershell
.\Pt.Okx.Bot.exe `
  --okx_account_alias "Default Live" `
  --telegram_bot_alias "tele_live" `
  --strategy "C:\PlatinumTrade\strategies\Stgy.UpTrend.dll" `
  --underlying BTC-USDT `
  --symbol BTC-USDT-SWAP `
  --timeframe 1h `
  --leverage 3 `
  --margin_mode Isolated `
  --notifier Telegram `
  --warmup_bars 10000
```

## 4) Optional Fallback Environment Variables

If alias or settings resolution is unavailable, Bot CLI can fall back to environment variables:

- `API_KEY` / `API_SECRET` for sandbox
- `API_KEY_R` / `API_SECRET_R` for live
- `API_PASS`
- `TELEGRAM_TOKEN`
- `TELEGRAM_CHATID`
- `TEAMS_WEBHOOK`
- `HTTP_PROXY`

In PowerShell, a simple session-scoped example is:

```powershell
$env:API_KEY_R = "your-live-key"
$env:API_SECRET_R = "your-live-secret"
$env:API_PASS = "your-passphrase"
```

## 5) Logging Options

- Add `--verbose` for detailed bot logs.
- Add `--api_log` to include `OKX.Net` library logs.

## 6) Running Automatically On Windows

Common options:

- Task Scheduler for automatic startup and restart.
- NSSM or another Windows service wrapper if you need background service behavior.
- A dedicated PowerShell launcher script when you need to preload environment variables.

## Notes

- If aliases resolve successfully, the fallback env variables are not required.
- If proxy settings are not present in shared settings, set `HTTP_PROXY` and pass `--use_proxy`.
- The CLI host is real-only; do not pass backtest arguments.
- Use absolute strategy DLL paths on Windows deployments to avoid working-directory ambiguity.

## Related Docs

- [API Key Setup](./api-key-setup.md)
- [Run On Ubuntu](./run-on-ubuntu.md)
- [CLI FAQ](./faq.md)
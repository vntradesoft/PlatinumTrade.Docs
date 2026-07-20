---
id: products-bot-cli-api-key-setup
title: Api Key Setup
description: Configure API and notifier secrets for CLI
status: draft
visibility: internal
publish: false
---

# Api Key Setup

Bot CLI prefers alias-based configuration from shared app settings.

Environment variables are fallback only.

## Preferred Setup

- Configure one or more OKX account aliases in the shared app settings.
- Use `--okx_account_alias <alias>` in Bot CLI.
- For Telegram, configure bot aliases in shared app settings and use `--telegram_bot_alias <alias>`.

## Fallback Variables

- Sandbox mode:
	- API_KEY
	- API_SECRET
- Production mode:
	- API_KEY_R
	- API_SECRET_R
- Common:
	- API_PASS

## Optional Variables

- HTTP_PROXY
- TELEGRAM_TOKEN
- TELEGRAM_CHATID
- TEAMS_WEBHOOK

## Behavior

- Sensitive values may be plain text or DPAPI-protected strings.
- If `--okx_account_alias` resolves successfully, Bot CLI ignores the OKX env fallback.
- If `--telegram_bot_alias` resolves successfully, Bot CLI ignores the Telegram env fallback.
- If proxy settings are enabled in shared app settings, Bot CLI uses those settings before checking `HTTP_PROXY`.
- Missing OKX credentials after alias/settings and env fallback fail startup with a configuration error.

## Example Fallback File

- Use the repo-root `.env.example` as the reference template for local fallback variables.

## Security Guidance

- Grant trade permission only.
- Avoid exposing secrets in shell history.
- Rotate keys regularly.
- Prefer alias-based configuration for normal operation so credentials stay in the shared application settings instead of ad-hoc shell sessions.

## Related Docs

- [CLI Getting Started](./getting-started.md)
- [CLI FAQ](./faq.md)


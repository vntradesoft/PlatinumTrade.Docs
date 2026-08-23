---
id: products-bot-cli-api-key-setup
title: Cài Đặt Khóa API
description: Configure API and notifier secrets for CLI
sidebar_label: Khóa API
---

# Api Key Setup

CLI reads credentials from environment variables.

## Required Variables

- Sandbox mode:
	- API_KEY
	- API_SECRET
- Production mode:
	- API_KEY_R
	- API_SECRET_R
- Common:
	- API_PASS

## Optional Variables

- HTTP_PROXY (when --use_proxy is enabled)
- TELEGRAM_TOKEN
- TELEGRAM_CHATID
- TEAMS_WEBHOOK

## Behavior

- Values are unprotected at runtime through local protection helper before constructing client credentials.
- Missing API variables fail startup with configuration error.

## Security Guidance

- Grant trade permission only.
- Avoid exposing secrets in shell history.
- Rotate keys regularly.

## Related Docs

- [CLI Getting Started](./getting-started.md)
- [CLI FAQ](./faq.md)


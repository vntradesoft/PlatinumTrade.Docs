---
id: platform-permissions-api-access
title: API Access
description: OKX API key permission requirements and security guidance
status: draft
visibility: public
---

# API Access

## Required OKX API Permissions

- **Trade** — required for order placement and position management.
- **Read** — required for account balance and market data.

## Security Guidance

- Do **not** enable withdrawal permission.
- Use IP whitelist on API keys where available.
- Separate demo and live keys.

## Related Docs

- [Permissions Overview](./overview.md)
- [GUI API Key Setup](../../products/gui/settings/api-credentials.md)

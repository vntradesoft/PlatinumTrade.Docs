---
id: products-gui-faq
title: FAQ
sidebar_position: 12
description: Frequently asked questions for the Platinum Trade GUI App
status: draft
visibility: internal
publish: false
---

# FAQ

## Why did "Test Connection" fail?

- Double-check your API Key, Secret Key, and Passphrase.
- Verify that you are testing the correct environment (Demo vs. Production).
- If using a proxy, verify your proxy URL and port settings.

## Can I run the application without an API key?

Yes. Some public features (like charting and public market watch) are accessible without an API key, but any account-specific or trading operations require valid API credentials.

## Where are application settings stored?

Application configurations are managed via the application's configuration manager, and sensitive credential fields are encrypted before local storage.

## How do I add custom indicators?

Navigate to Insert -> Indicators -> Custom and ensure your custom indicator plugin is compatible with the current host SDK version.

## Why are some features locked/disabled?

Certain advanced features are restricted based on your license level (e.g., Pro license requirements).

## Where do Toast Notifications appear, and when do they disappear?

By default, toast notifications appear in the upper-right corner of the screen. They auto-dismiss based on type: Success (3 seconds), Info (4 seconds), and Warning (5 seconds). Error alerts may require manual dismissal.

## Related Docs

- [API Key Setup](./settings/api-credentials.md)
- [Trading Basics](./trading-basics.md)

## TBD Items

- [ ] Add a troubleshooting matrix mapping error codes to resolved actions.

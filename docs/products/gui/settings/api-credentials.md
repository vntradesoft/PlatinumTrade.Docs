---
id: products-gui-settings-api-credentials
title: API Credentials
sidebar_position: 2
description: Technical specification for setting up API keys in the Platinum Trade App and connection verification conventions
status: draft
visibility: internal
publish: false
---

# API Key Setup

This document describes the technical configuration of API credentials in the Platinum Trade App.

## Scope

- Standardization of input data for API configurations.
- Standardization of environment-specific connection verification workflows.
- Standardization of security best practices during operation.

## Configuration Location

- Navigation: Tools -> Options.
- Module: API Credentials.
- Supported Environments: Demo and Production.

![Initial API Configuration](/img/products/gui/settings/api-cridentials-settings-1.png)

## Required Configuration Data

- API Key
- Secret Key
- Passphrase

![Register OKX Account Dialog](/img/products/gui/settings/api-cridentials-settings-dilaog-okx-account-settings.png)

## Environment Conventions

- Demo: Uses endpoints for the demo environment.
- Production: Uses endpoints for the live environment.
- Each environment uses an independent set of credentials.

![Registered Accounts List](/img/products/gui/settings/api-cridentials-settings-2.png)

## Connection Verification

- Action: Click the "Test Connection" button for the respective environment.
- Result: Returns a success status or authentication/connection error details.
- Goal: Validate the credentials before enabling any account-related trading functions.

## Credential Storage

> [!NOTE]
> 🔒 **Credentials are Protected Locally:**
> - API keys are encrypted and stored directly on your local device.
> - The security of local storage relies on the current OS user account context (Windows DPAPI).

## Security Recommendations

> [!WARNING]
> ⚠️ **Trading Account Security Rules:**
> - **Enable "Trade" Only:** Never enable withdrawal permissions on the API keys.
> - **Verify First:** Always test connections and run strategies on the Demo environment before deploying to Production.
> - **Device Security:** Lock your device when away and use a strong password for your Windows account to prevent unauthorized access to local settings.

## Related Docs

- [Getting Started](../getting-started.md)
- [Trading Basics](../trading-basics.md)
- [Network Monitor](../network-monitor.md)

---
id: changelog
title: App Changelog
description: Release notes and downloads for Platinum Trade App
sidebar_position: 99
---

# Platinum Trade App

## Changelog

### [0.9.3-beta.2] - 2026-07-08

#### Features
- **gui:** Replace old terms with new EULA.
- **gui:** Enable Velopack auto-check and configure GitHub feed url.

#### Fixes
- **app:** Fix Velopack auto-update channel configuration to support switching between stable and beta.

#### Breaking Changes
- **okx:** Upgrade JK.OKX.Net to 5.0.2.

### [0.9.0-beta.4] - 2026-07-08

#### Features
- **docs:** Update terms and conditions.
- **gui:** Add third-party notices link in About dialog.
- **gui:** Show full semantic version and replace private commit hash with architecture in About Dialog.

### [0.9.0-beta.3] - 2026-07-08

#### Features
- **gui:** Bypass feature limits for beta versions.
- **ci:** Automate Velopack beta channel and NuGet packages sync.

### [0.9.0-beta.2] - 2026-07-06

#### Features
- **core:** Update strategy engine, plugins, socket, indicators, backtest, and SDK docs.

### [0.9.0-beta.1] - 2026-07-05

#### Features
- **release:** Initial Beta Release.
  - GUI desktop application with chart, indicators, and backtest.
  - CLI host for automated strategy execution.
  - SDK public contract surface for plugin development.
  - Offline RSA license activation and Pro/Community tiers.
  - Velopack update integration with stable/beta channels.
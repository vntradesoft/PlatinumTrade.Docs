---
id: products-gui-settings-updates
title: Application Updates
sidebar_position: 9
description: Configure automated update checks, background downloads, restart policies, and release channels via Velopack
---

# Application Updates

Platinum Trade features seamless auto-updates powered by the high-performance [Velopack](https://velopack.io) deployment system. The **Updates** tab lets you configure how and when new software versions are detected, downloaded, and installed.

## Update Settings

Configure the automated update lifecycle to fit your trading workflow:

- **Automatically check for updates**: When enabled, the application periodically checks for new releases from the release feed in the background upon application startup.
- **Automatically download updates**: When enabled, new release packages are downloaded quietly in the background without interrupting your current chart view or active strategy.
- **Automatically restart to apply update**: When enabled, the application will immediately restart to apply downloaded updates without prompting for confirmation.
  
  :::tip Recommended Practice for Live Traders
  If you are running long-term live automated strategies, keep **Automatically restart to apply update** disabled (`false`). This ensures the bot never interrupts active positions unexpectedly, allowing you to choose the best maintenance window to apply updates.
  :::

- **Update Channel**: Select which release stream your installation subscribes to:
  - `Stable`: Receives thoroughly vetted, production-ready releases recommended for live trading accounts.
  - `Beta`: Receives the latest experimental features, cutting-edge indicator updates, and bug fixes ahead of the general release.

## How Updates Work

1. **Detection**: The background checker queries the GitHub release feed for packages matching your selected channel (`Stable` or `Beta`).
2. **Delta Downloads**: Velopack applies binary differential patches, meaning you only download modified bytes rather than the entire multi-megabyte package.
3. **Application**: Once downloaded, updates are verified and applied atomically on the next restart, preserving your local configurations, API credentials, and historical cache.

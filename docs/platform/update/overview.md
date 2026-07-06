---
id: platform-update-overview
title: Update Overview
description: Velopack-based auto-update architecture
status: draft
visibility: internal
---

# Update Overview

## Framework

Updates are delivered via **Velopack** — a cross-platform installer and update framework.

## Key Settings (UpdateSettings)

| Setting | Default | Purpose |
|---|---|---|
| EnableVelopackHooks | true | Run Velopack startup hooks |
| AutoApplyOnStartup | true | Apply pending update on next launch |
| EnableAutoCheck | false | Background update check |
| Channel | stable | Release channel to follow |

## Channels

- stable — production releases.
- eta — pre-release testing channel.

## Related Docs

- [Update Flow](./update-flow.md)
- [Release Channel](./release-channel.md)
- [Rollback](./rollback.md)

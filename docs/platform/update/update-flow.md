---
id: platform-update-update-flow
title: Update Flow
description: Download, verification, and apply sequence for releases
status: draft
visibility: internal
---

# Update Flow

## Sequence

1. App checks configured feed URL for new version.
2. Delta or full package downloaded to temp directory.
3. Signature verified.
4. On next startup, Velopack hooks apply the update before app code runs.
5. Old version cleaned up post-apply.

## Entry Point

VelopackApp.Build().SetAutoApplyOnStartup(...).Run() called as first statement in Main().

## Related Docs

- [Release Channel](./release-channel.md)
- [Security](./security.md)

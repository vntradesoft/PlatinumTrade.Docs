---
id: platform-licensing-server-side-check
title: Server-Side Check
description: Optional online license validation endpoint design
status: tbd
visibility: public
---

# Server-Side Check

## Status: TBD

Online license validation is architected but not yet deployed.

## Open Questions

- [ ] Should periodic online check be mandatory, optional, or absent?
- [ ] What is the fallback policy if online check fails (grace period)?
- [ ] What data is sent — machine ID hash only, or license metadata?

## Current State

Validation is offline-only via RSA signature. Server-side check is a planned extension.

## Related Docs

- [Offline License](./offline-license.md)
- [Validation](./validation.md)

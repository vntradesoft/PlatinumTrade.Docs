---
id: platform-update-security
title: Update Security
description: Package verification and supply chain integrity for updates
status: draft
visibility: internal
---

# Update Security

## Package Signing

Release packages are signed as part of the CI/CD pipeline. Velopack verifies signatures before applying.

## Feed URL Hardening

- Use HTTPS-only feed URLs.
- Pin feed certificate where supported.
- Limit channel switching to trusted operator contexts.

## Related Docs

- [Update Flow](./update-flow.md)

---
id: platform-licensing-offline-license
title: Offline License
description: Offline operation model and hardware binding
status: draft
visibility: public
---

# Offline License

## How It Works

No internet connection is required after license import. Validation runs locally using the embedded RSA public key.

## Machine Binding

Machine ID is derived from Windows hardware characteristics (WMI-based hardware hash). The license file encodes this ID so it cannot be used on a different machine.

## Privacy Note

Machine ID derivation reads local hardware identifiers. No data is transmitted externally.

## Related Docs

- [Validation](./validation.md)
- [Tiers](./tiers.md)
- [Server-Side Check](./server-side-check.md)

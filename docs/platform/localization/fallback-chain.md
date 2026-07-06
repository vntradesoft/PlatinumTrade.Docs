---
id: platform-localization-fallback-chain
title: Fallback Chain
description: Resource key resolution order when locale is incomplete
status: draft
visibility: public
---

# Fallback Chain

## Resolution Order

1. Active locale resource file (e.g. UiTextResources.vi-VN.resx)
2. InvariantCulture fallback (English default strings)

## Implementation Detail

L10n.Get(key) calls ResourceManager.GetString(key, culture). If the key is absent in the active locale's .resx, ResourceManager automatically falls through to the neutral (en) fallback.

## Practical Implication

Partially translated locales still display correctly — untranslated keys show in English.

## Related Docs

- [Localization Overview](./overview.md)
- [Formatting](./formatting.md)

---
id: platform-localization-languages
title: Languages
description: Supported language codes and BCP-47 mapping
status: draft
visibility: public
---

# Languages

## Currently Supported

| Code | Language | Status |
|---|---|---|
| en | English | Canonical — complete |
| i-VN | Vietnamese | Active — complete |

## Language Code Convention

BCP-47 tags are used throughout:
- Short codes (en) map to CultureInfo via L10n.GetCultureInfo(language).
- Full tags (i-VN) map to specific regional variants.

## Docusaurus i18n Note

When this documentation is migrated to Docusaurus, the same language codes are used in the i18n config:
- Default locale: en
- Additional locale: i-VN
- docusaurus write-translations --locale vi-VN extracts all sidebar/theme strings for translation.

## Related Docs

- [Localization Overview](./overview.md)
- [Adding New Language](./adding-new-language.md)

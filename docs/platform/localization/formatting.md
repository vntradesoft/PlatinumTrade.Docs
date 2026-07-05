---
id: platform-localization-formatting
title: Formatting
description: Culture-aware string and number formatting
status: draft
visibility: public
---

# Formatting

## API

`csharp
L10n.Format(key, arg1, arg2, ...)
`

Equivalent to string.Format(CultureInfo.CurrentCulture, template, args) using the current locale's CultureInfo.

## Number and Date Patterns

Formatting follows the active CultureInfo:
- i-VN: decimal separator ,, date dd/MM/yyyy.
- en: decimal separator ., date MM/dd/yyyy.

## Related Docs

- [Localization Overview](./overview.md)
- [Fallback Chain](./fallback-chain.md)

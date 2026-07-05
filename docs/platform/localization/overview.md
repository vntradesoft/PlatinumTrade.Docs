---
id: platform-localization-overview
title: Localization Overview
description: App-level localization architecture and BCP-47 language model
status: draft
visibility: public
---

# Localization Overview

## Supported Languages

- en — English (default, canonical)
- i-VN — Vietnamese

## Architecture

- Resource files .resx per language, embedded at build time.
- L10n static helper exposes typed resource keys and Format(key, args) for culture-aware formatting.
- TranslationSource observable source triggers live UI updates when language changes.
- XAML: `{loc:Loc KeyName}` markup extension binds to live TranslationSource.

## Fallback Chain

When a key is missing in the active locale, it falls back to InvariantCulture (effectively English).

## Related Docs

- [Languages](./languages.md)
- [Fallback Chain](./fallback-chain.md)
- [Formatting](./formatting.md)
- [Adding New Language](./adding-new-language.md)

---
id: platform-localization-adding-new-language
title: Adding New Language
description: Steps to add a new supported locale
status: draft
visibility: public
---

# Adding New Language

## Steps

1. Create `UiTextResources.<locale>.resx` in `Localization/`.
2. Add `<locale>` to `SupportedLanguages.All` list in `L10n.cs`.
3. Add `CultureInfo` mapping in `GetCultureInfo()`.
4. Translate all keys from the base `UiTextResources.resx`.
5. Test full UI pass in the new locale.

## Docusaurus i18n

For the docs site, add the locale to `docusaurus.config.js`:

```javascript
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'vi-VN', '<new-locale>'],
},
```

Then run:

```bash
npm run write-translations -- --locale <new-locale>
```

## Related Docs

- [Languages](./languages.md)
- [Localization Overview](./overview.md)

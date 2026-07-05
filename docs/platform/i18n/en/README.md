---
id: i18n-en-readme
title: English Documentation
description: English canonical docs policy and translation workflow
status: draft
visibility: public
---

# English Documentation

English is the canonical source language for all documentation.

## Policy

- Author all new content in English first.
- Content must reach status: draft or higher in EN before translation begins.
- Page IDs and slugs must remain stable to enable translation file mapping.

## Docusaurus i18n Workflow

When Docusaurus is set up in a separate repo:

`ash
# Extract translatable strings for vi-VN
npm run write-translations -- --locale vi-VN

# This generates i18n/vi-VN/docusaurus-theme-classic/... JSON files
# and i18n/vi-VN/docusaurus-plugin-content-docs/current/ for doc files
`

Then copy/translate each .md and .json file.

## Auto-Translation Options

- **Crowdin** — integrates natively with Docusaurus via Crowdin CLI + GitHub Action.
- **Custom script** — batch translate with an AI/translation API and write to i18n/vi-VN/.
- Docusaurus itself does not auto-translate — it provides the extraction/placement infrastructure.

## Related Docs

- [vi-VN Notes](../vi-vn/README.md)

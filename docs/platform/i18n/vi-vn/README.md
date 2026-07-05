---
id: i18n-vi-vn-readme
title: Vietnamese Documentation
description: Vietnamese translation rollout notes
status: tbd
visibility: public
---

# Vietnamese Documentation

## Status: TBD

Vietnamese docs mirror the English canonical tree.

## Translation Status

Translation begins after key EN pages reach status: draft or higher.

## Workflow

1. English pages reach draft status.
2. Run 
pm run write-translations -- --locale vi-VN in Docusaurus repo.
3. Translate .md files in i18n/vi-VN/docusaurus-plugin-content-docs/current/.
4. Translate UI strings in i18n/vi-VN/docusaurus-theme-classic/navbar.json etc.

## Open Questions

- [ ] Standardized glossary for trading/tech terms in Vietnamese.
- [ ] Human review required for legal pages before publish.

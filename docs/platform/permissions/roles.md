---
id: platform-permissions-roles
title: Roles
description: Current role model and tier-based access partitioning
status: draft
visibility: public
---

# Roles

## Current Model

| Role | License Needed | Access Level |
|---|---|---|
| Community | None | Chart viewing, basic indicators, market data |
| Pro | Valid Pro license | All features including live/paper trading, custom plugins, alerts |

## Implementation

Role is determined at runtime via LicenseSettings.IsProLicenseActive computed property.

## Related Docs

- [Permissions Overview](./overview.md)
- [Licensing Tiers](../licensing/tiers.md)

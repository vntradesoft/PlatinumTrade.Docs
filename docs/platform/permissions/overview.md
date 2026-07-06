---
id: platform-permissions-overview
title: Permissions Overview
description: Feature access control and licensing-based role model
status: draft
visibility: public
---

# Permissions Overview

## Feature Gating

Feature access is binary: Community (free) or Pro (licensed). There is no role-based access control beyond this tier split.

## IFeatureAccessService

Central gating service checked before enabling Pro-only operations:

`csharp
if (!featureAccess.IsProFeatureAvailable("LiveTrading"))
    ShowUpgradePrompt();
`

## Related Docs

- [Roles](./roles.md)
- [API Access](./api-access.md)
- [Licensing Tiers](../licensing/tiers.md)

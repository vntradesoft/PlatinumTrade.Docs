---
id: platform-licensing-overview
title: Licensing Overview
description: Offline RSA-based license model and feature tiers
status: draft
visibility: public
---

# Licensing Overview

## Model

Offline license validation using RSA digital signature. No internet required for daily operation.

## Core Flow

1. User requests machine ID (derived from hardware hash).
2. Operator generates signed license file with LicenseGen CLI.
3. User imports license file into the app.
4. App validates signature, expiration, and machine ID match.

## Feature Gating

Features are partitioned into Community (free) and Pro (license required). The FeatureAccessService checks IsProLicenseActive before enabling gated features.

## Related Docs

- [Activation](./activation.md)
- [Validation](./validation.md)
- [Offline License](./offline-license.md)
- [Tiers](./tiers.md)

---
id: platform-licensing-activation
title: Activation
description: License activation flow for end users and operators
status: draft
visibility: public
---

# Activation

## User Flow

1. Open **Settings → License**.
2. Copy machine ID.
3. Send machine ID to operator.
4. Receive signed .lic file.
5. Import file via **Import License** button.
6. App validates and activates Pro features.

## Operator Flow (LicenseGen CLI)

```bash
# Generate RSA key pair (once)
licensegen --generate-keys --output keys/

# Generate license for a machine
licensegen --machine-id <id> --type Pro \
  --duration-months 12 --output license.lic
```

## Related Docs

- [Validation](./validation.md)
- [Offline License](./offline-license.md)

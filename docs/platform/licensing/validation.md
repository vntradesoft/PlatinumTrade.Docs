---
id: platform-licensing-validation
title: Validation
description: License signature and machine-binding validation logic
status: draft
visibility: public
---

# Validation

## Validation Steps (in order)

1. **Signature check** — RSA-SHA256 verify against embedded public key.
2. **Expiration check** — ExpirationDate vs current UTC.
3. **Machine ID check** — computed hardware hash vs license MachineId field.
4. **Format check** — required fields present and parseable.

## Outcomes (LicenseValidationResult)

| Code | Meaning |
|---|---|
| Valid | All checks passed |
| Expired | License past expiration |
| InvalidSignature | File tampered or wrong key |
| MachineIdMismatch | File from different machine |
| InvalidFormat | File unreadable |
| Error | Runtime exception during check |

## Related Docs

- [Activation](./activation.md)
- [Server-Side Check](./server-side-check.md)

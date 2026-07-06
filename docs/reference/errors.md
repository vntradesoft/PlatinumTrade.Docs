---
id: reference-errors
title: Errors
description: Error code reference and handling guidance
status: draft
visibility: public
---

# Errors

## Error Categories (OkxErrorCode)

| Range | Category |
|---|---|
| 1000-1099 | Server and infrastructure errors |
| 1100-1199 | Request validation errors |
| 2000-2099 | Trading and order errors |

## Common Error Handling Patterns

| Condition | Recommended Action |
|---|---|
| Auth error | Fail fast — configuration issue |
| Rate limit | Backoff + retry with jitter |
| Order validation | Log and skip — check params |
| Network timeout | Retry with exponential backoff |

## Related Docs

- [SDK Overview](../sdk/intro.md)
- [SDK Error Handling](../sdk/api-result.md)

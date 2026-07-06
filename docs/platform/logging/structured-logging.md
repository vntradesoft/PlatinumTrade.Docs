---
id: platform-logging-structured-logging
title: Structured Logging
description: Template-based structured log message conventions
status: draft
visibility: public
---

# Structured Logging

## Pattern

Use structured templates ? **never** string interpolation in log calls:

```csharp
// Correct
logger.LogSmart(PtLogLevel.Information, "Order placed", "Symbol={Symbol} Side={Side}", symbol, side);

// Avoid
logger.LogSmart(PtLogLevel.Information, $"Order placed: {symbol} {side}", null);
```

## Template Format

```text
[{Prefix}] {Title} ? {Details}
```

## Rules

- No credentials or API keys in log output.
- No high-frequency per-tick spam.
- Use PtLogLevel.Debug for diagnostic detail; Information for business events.

## Related Docs

- [Logging Overview](./overview.md)

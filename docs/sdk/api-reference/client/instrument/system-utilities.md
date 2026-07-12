---
id: sdk-inst-system-utilities
title: System Utilities
sidebar_label: System Utilities
---
# System Utilities

## `GetCurrentTime`
Gets the current system time from the client's perspective.

```csharp
DateTime GetCurrentTime();
```

**Parameters**

None.

**Return Value**

The current system time as a `DateTime`.

**Remarks**

During backtests, this returns the simulated time, not the real computer time.

**Example**

```csharp
DateTime now = Context.Instrument.GetCurrentTime();
if (now.Hour == 14) { /* handle 2 PM logic */ }
```

---

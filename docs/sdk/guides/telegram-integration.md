---
id: sdk-guide-telegram-integration
title: Interactive Telegram Bot Commands & Alerts
sidebar_label: Telegram Integration
sidebar_position: 9
description: Learn how to control trading bots remotely via two-way Telegram commands and send real-time trade alerts in Platinum Trade SDK.
---

# Interactive Telegram Bot Commands & Alerts

Real-time monitoring and remote control are vital for automated crypto trading. The Platinum Trade SDK provides deep integration with Telegram, allowing strategies to:

1. **Broadcast Alerts**: Send instant notifications on order fills, stop-loss triggers, or margin warnings.
2. **Interactive Remote Control (Two-Way)**: Accept custom slash commands from traders (e.g., `/status`, `/pause`, `/close_all`, `/set_tp 75000`) and reply with live statistics or action confirmation.

---

## Architecture Overview

```mermaid
sequenceDiagram
    autonumber
    actor Trader as Trader (Telegram App)
    participant TG as Telegram Bot API
    participant SDK as Strategy Engine (StrategyBase)
    participant Exchange as OKX Exchange

    Trader->>TG: Send "/status"
    TG->>SDK: Trigger OnTradeCommandAsync(tradeCommand, ct)
    SDK->>Exchange: Query Context.Trade.GetPositionsAsync()
    Exchange-->>SDK: Active Position Info
    SDK-->>TG: Context.Notify.SendTelegramMessageAsync(report)
    TG-->>Trader: Display PnL, Winrate, Active Positions

    Trader->>TG: Send "/close"
    TG->>SDK: Trigger OnTradeCommandAsync(tradeCommand, ct)
    SDK->>Exchange: Context.Trade.ClosePositionAsync()
    SDK-->>TG: Context.Notify.SendTelegramMessageAsync("✅ Closed")
```

---

## 1. Sending Outbound Trade Alerts

Use `Context.Notify` to send formatted messages directly to the configured Telegram chat:

```csharp
public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
{
    if (tickPhase != TickPhase.BarClose) return;

    if (signalBuy)
    {
        var res = await Context.Trade.PlaceOrderAsync("BTC-USDT-SWAP", OrderSide.Buy, OrderType.Market, 1.0m, ct: ct);
        if (res.Success)
        {
            string message = 
                $"🚀 <b>BUY Order Placed</b>\n" +
                $"• <b>Symbol:</b> <code>BTC-USDT-SWAP</code>\n" +
                $"• <b>Price:</b> <code>{Context.Timeseries.CurrentTickPrice:F2}</code>\n" +
                $"• <b>Time:</b> <code>{Context.Timeseries.GetCurrentTime():yyyy-MM-dd HH:mm:ss} UTC</code>";

            await Context.Notify.SendTelegramMessageAsync(message);
        }
    }
}
```

> [!TIP]
> Use standard HTML formatting tags (`<b>`, `<i>`, `<code>`, `<pre>`) for crisp and structured Telegram messages.

---

## 2. Handling Inbound Telegram Trade Commands

Override `OnTradeCommandAsync` in your `StrategyBase` class to process inbound commands (`TradeCommand`) sent from the Telegram chat:

```csharp
using Pt.Okx.Sdk.Notifier.Enums;
using Pt.Okx.Sdk.Notifier.Models;
using Pt.Okx.Sdk.Strategy;
using Pt.Okx.Sdk.Strategy.Events;

public class TelegramInteractiveStrategy : StrategyBase
{
    private bool _isPaused = false;
    private decimal _riskPercentage = 1.0m;

    public override Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken cancellationToken) => Task.FromResult(true);
    public override Task<bool> OnStopAsync(CancellationToken cancellationToken) => Task.FromResult(true);

    public override async Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
    {
        if (_isPaused || tickPhase != TickPhase.BarClose) return;
        // Normal trading logic here
    }

    public override async Task OnTradeCommandAsync(TradeCommand tradeCommand, CancellationToken ct)
    {
        switch (tradeCommand.Action)
        {
            case TradeAction.Status:
                await HandleStatusAsync(ct);
                break;

            case TradeAction.PauseTrading:
                _isPaused = true;
                await Context.Notify.SendTelegramMessageAsync("⏸️ <b>Strategy Paused</b>. New trade entries are disabled.");
                break;

            case TradeAction.ResumeTrading:
                _isPaused = false;
                await Context.Notify.SendTelegramMessageAsync("▶️ <b>Strategy Resumed</b>. Scanning for market opportunities.");
                break;

            case TradeAction.Close:
                await HandleCloseAllAsync(ct);
                break;

            case TradeAction.Custom:
                await HandleCustomCommandAsync(tradeCommand, ct);
                break;

            default:
                await Context.Notify.SendTelegramMessageAsync($"ℹ️ Received action: <code>{tradeCommand.Action}</code>");
                break;
        }
    }

    private async Task HandleStatusAsync(CancellationToken ct)
    {
        var posRes = await Context.Trade.GetPositionsAsync(ct: ct);
        decimal equity = Context.Account.Equity;
        decimal wallet = Context.Account.WalletBalance;
        decimal pnl = Context.Account.UnrealizedPnL;

        string report = 
            $"📊 <b>Strategy Status Report</b>\n" +
            $"───────────────────\n" +
            $"• <b>Status:</b> {(_isPaused ? "⏸️ Paused" : "🟢 Running")}\n" +
            $"• <b>Wallet:</b> <code>{wallet:F2} USDT</code>\n" +
            $"• <b>Equity:</b> <code>{equity:F2} USDT</code>\n" +
            $"• <b>Unrealized PnL:</b> <code>{(pnl >= 0 ? "+" : "")}{pnl:F2} USDT</code>\n" +
            $"• <b>Active Positions:</b> <code>{posRes.Data?.Length ?? 0}</code>";

        await Context.Notify.SendTelegramMessageAsync(report);
    }

    private async Task HandleCloseAllAsync(CancellationToken ct)
    {
        var posRes = await Context.Trade.GetPositionsAsync(ct: ct);
        if (posRes.Success && posRes.Data.Length > 0)
        {
            foreach (var pos in posRes.Data)
            {
                await Context.Trade.ClosePositionAsync(pos.Symbol, pos.PositionSide, ct: ct);
            }
            await Context.Notify.SendTelegramMessageAsync("✅ <b>Emergency Action:</b> All open positions closed.");
        }
        else
        {
            await Context.Notify.SendTelegramMessageAsync("ℹ️ No open positions to close.");
        }
    }

    private async Task HandleCustomCommandAsync(TradeCommand cmd, CancellationToken ct)
    {
        if (cmd.CommandTag.Equals("setrisk", StringComparison.OrdinalIgnoreCase))
        {
            if (cmd.Params.TryGetValue("risk", out string? riskStr) && decimal.TryParse(riskStr, out decimal newRisk))
            {
                _riskPercentage = newRisk;
                await Context.Notify.SendTelegramMessageAsync($"✅ Risk per trade updated to <code>{_riskPercentage}%</code>.");
            }
            else if (cmd.Amount > 0)
            {
                _riskPercentage = cmd.Amount;
                await Context.Notify.SendTelegramMessageAsync($"✅ Risk per trade updated to <code>{_riskPercentage}%</code>.");
            }
        }
    }
}
```

---

## 3. Parsing Command Arguments

Commands can accept dynamic parameters (e.g., `/set_risk 2.5` or `/order buy 0.5`):

```csharp
case "/set_risk":
    if (args.Length > 0 && decimal.TryParse(args[0], out decimal newRisk))
    {
        _riskPercentage = newRisk;
        await e.ReplyAsync($"✅ Risk per trade updated to <code>{_riskPercentage}%</code>.");
    }
    else
    {
        await e.ReplyAsync("⚠️ Usage: <code>/set_risk &lt;percentage&gt;</code> (e.g., <code>/set_risk 2.5</code>)");
    }
    break;
```

---

## Best Practices Checklist

| Practice | Recommendation |
| :--- | :--- |
| **Authentication & Chat Security** | Ensure your bot token and authorized chat IDs are kept confidential in strategy settings or secure configuration files. |
| **Rate Limiting** | Avoid spamming Telegram API in tight loops; batch status messages or trigger only on state transitions. |
| **Clear Command Feedback** | Always reply to user commands (even on errors) so the operator knows the command was received and processed. |
| **HTML Formatting** | Use `<code>` tags for numbers, symbols, and IDs to make them easily readable and copyable on mobile devices. |

---

## Related Documentation

- [Strategy Plugin Telegram Architecture](../plugins/strategy/telegram-commands.md) — Architectural overview of Telegram command extensions.
- [Notification Client API Reference](../api-reference/notifications/index.md) — Methods and options for `Context.Notify`.
- [State Management Guide](./state-persistence.md) — Preserving command configurations across restarts.
- [Trade Client API Reference](../api-reference/client/trade.md) — Executing remote trade orders from Telegram.

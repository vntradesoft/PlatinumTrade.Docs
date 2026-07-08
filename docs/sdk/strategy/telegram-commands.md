---
id: sdk-strategy-telegram-commands
title: Telegram Commands
description: Extending strategies with custom Telegram commands
status: draft
visibility: internal
publish: false
---

# Telegram Commands & Extensions

The OKX Trading platform supports remote interaction, monitoring, and control via a Telegram Bot. When a user sends a command to the Telegram Bot, it is processed by the core `TelegramCommandHandler` service in `Core Engine` and dispatched to the active strategy.

This guide explains how the Telegram Command system works, lists the built-in commands available out of the box, and demonstrates how to extend the bot with custom commands specific to your strategy plugin.

---

## Architecture Overview

The flow of a Telegram command from the user's phone to the strategy is as follows:

1. **User Input:** The user sends a command (e.g., `/status` or a custom command like `/setrisk 2.5`) to the Telegram Bot.
2. **Core Parsing:** The `TelegramCommandHandler` in `Core Engine` receives the message, validates the sender's Chat ID against configuration permissions, and parses the command string.
3. **Command Object Generation:** If the command matches a built-in command or is recognized by a registered extension, a `TradeCommand` object is created.
4. **Host Dispatch:** The host application (GUI or CLI) captures the parsed `TradeCommand` and broadcasts it to the active strategy instance.
5. **Strategy Execution:** The host dispatches the command to the strategy via `OnTradeCommandAsync(TradeCommand, CancellationToken)`.
6. **User Feedback:** The strategy uses `IStrategyLogger` (e.g. `NotifyTrace`, `NotifyKeyValue`) to send status updates and execution success/failure notifications back to the Telegram chat.

### Multi-Bot Command Routing

Since the platform supports multiple Telegram Bots, command routing is determined by which bot the user interacts with:
- If a user sends a command to **Bot A**, the command is dispatched **only** to the active strategy instance(s) that are explicitly associated with **Bot A** (configured via `TelegramBotAlias` in their strategy settings).
- Other active strategies associated with **Bot B** or running without Telegram bot association will be completely unaffected and will not receive the command.
- This prevents command conflicts and allows side-by-side execution of multiple live strategies on the same platform, controlled independently by different Telegram bot accounts or chats.

---

## Built-in Commands

The platform includes several built-in commands that are processed by the core framework. These commands automatically map to standard `TradeAction` enum values and are routed to the active strategy.

| Command | Action Type (`TradeAction`) | Parameters Passed | Description |
|---|---|---|---|
| `/status` | `TradeAction.Status` | None | Query the current running state and status of the strategy. |
| `/balance` | `TradeAction.Balance` | None | Query the current account balance details from the exchange. |
| `/metric` | `TradeAction.Metrics` | None | Query the strategy performance metrics (e.g., win rate, profit/loss). |
| `/details` | `TradeAction.Details` | None | Query specific position details, take-profit (TP), and stop-loss (SL) levels. |
| `/pause` | `TradeAction.PauseTrading` | None | Pause new entry order placement in the strategy. |
| `/resume` | `TradeAction.ResumeTrading` | None | Resume normal entry order placement. |
| `/config` | `TradeAction.Configure` | None | Query the current strategy configuration parameters. |
| `/close [SYMBOL]` | `TradeAction.Close` | `Symbol` = upper-case symbol | Request immediate closure of all positions and cancellation of orders for the specified symbol (e.g., `/close BTC`). |
| `/shutdown` | `TradeAction.Shutdown` | None | Triggers strategy shutdown. To prevent accidental shutdown, the bot requires a secondary confirmation: `/shutdown confirm` typed within 30 seconds of the initial command. |
| `/logs [COUNT]` | `TradeAction.Logs` | `Amount` = count (double/decimal) | Fetch the latest log lines. The optional `COUNT` argument specifies the number of lines (default is 10, bounded between 1 and 1000). |
| `/uploadlog [YYYYMMDD]` | `TradeAction.UploadLogs` | `Symbol` = date string | Request the bot to upload its log file for the specified date (formatted as `YYYYMMDD`) directly to the Telegram chat. |

---

## Custom Telegram Commands (Extensions)

Strategy plugins can declare custom commands to allow users to interact with strategy-specific logic (e.g., adjusting risk levels, resetting custom trackers, or triggering manual strategy overrides).

To add custom commands, you must:
1. Implement the `ITelegramCommandExtension` interface in your plugin.
2. Register the extension in your plugin's dependency injection container.
3. Handle the `TradeAction.Custom` command in your strategy's `OnTradeCommandAsync` method.

### The `ITelegramCommandExtension` Interface

The `ITelegramCommandExtension` interface is defined in the `Pt.Okx.Sdk.Notifier` namespace:

```csharp
namespace Pt.Okx.Sdk.Notifier
{
    public interface ITelegramCommandExtension
    {
        /// <summary>
        /// The help text block to display under /help.
        /// Return null if this extension does not provide help text.
        /// </summary>
        string? HelpText { get; }

        /// <summary>
        /// Attempts to parse a Telegram command for this extension.
        /// Returns null if the command does not belong to this extension.
        /// </summary>
        /// <param name="action">The command action (without the leading '/').</param>
        /// <param name="args">The command arguments (space-separated parameters after the command).</param>
        /// <returns>A TradeCommand if the command is recognized; otherwise, null.</returns>
        TradeCommand? TryParse(string action, string[] args);
    }
}
```

When a user sends a command that does not match any built-in command, the core framework iterates through all registered `ITelegramCommandExtension` implementations and calls `TryParse`. The first extension to return a non-null `TradeCommand` handles the command.

---

## Step-by-Step Implementation Example

Here is a complete walk-through of implementing and handling two custom commands: `/setrisk [percentage]` and `/resetdrawdown`.

### Step 1: Create the Command Extension

Create a class that implements `ITelegramCommandExtension`. It defines the help text and parses the input text into a `TradeCommand` with `Action = TradeAction.Custom`.

```csharp
using Pt.Okx.Sdk.Notifier;
using Pt.Okx.Sdk.Notifier.Enums;
using Pt.Okx.Sdk.Notifier.Models;

namespace MyCustomStrategy.Command
{
    public sealed class MyStrategyCommandExtension : ITelegramCommandExtension
    {
        // This text is automatically appended when the user types /help in Telegram
        public string? HelpText => """
            *My Custom Strategy Commands:*
            /setrisk [VALUE] — Set the risk percentage per trade (e.g., /setrisk 2.5)
            /resetdrawdown — Reset the maximum drawdown tracker
            """;

        public TradeCommand? TryParse(string action, string[] args)
        {
            return action switch
            {
                "setrisk" => CreateSetRiskCommand(args),
                "resetdrawdown" => new TradeCommand
                {
                    Action = TradeAction.Custom,
                    CommandTag = "resetdrawdown"
                },
                _ => null // Return null so other extensions or help can handle it
            };
        }

        private static TradeCommand CreateSetRiskCommand(string[] args)
        {
            var cmd = new TradeCommand
            {
                Action = TradeAction.Custom,
                CommandTag = "setrisk"
            };

            // Capture the first argument and store it in the Params dictionary
            if (args.Length >= 1)
            {
                cmd.Params["value"] = args[0];
            }

            return cmd;
        }
    }
}
```

### Step 2: Register the Extension in the Plugin

In your main plugin class (which implements `IStrategyPlugin`), register your custom command extension in the dependency injection container:

```csharp
using Microsoft.Extensions.DependencyInjection;
using Pt.Okx.Sdk.Notifier;
using Pt.Okx.Sdk.Strategy.Plugin;
using MyCustomStrategy.Command;

namespace MyCustomStrategy
{
    public class MyStrategyPlugin : IStrategyPlugin, IStrategyPluginMetadata
    {
        // ... metadata properties (Name, Version, etc.) ...

        public void Register(IServiceCollection services)
        {
            // Register your main strategy implementation
            services.AddSingleton<IStrategy, MyStrategy>();

            // Register your custom Telegram command extension
            services.AddSingleton<ITelegramCommandExtension, MyStrategyCommandExtension>();
        }

        public void RegisterForBacktest(IServiceCollection services)
        {
            // Telegram commands are typically ignored during backtesting,
            // but we register the strategy itself for simulation
            services.AddTransient<IStrategy, MyStrategy>();
        }
    }
}
```

### Step 3: Handle the Commands in the Strategy

Inside your strategy, override `OnTradeCommandAsync` and process `TradeCommand` directly:

```csharp
using Pt.Okx.Sdk.Notifier.Enums;
using Pt.Okx.Sdk.Notifier.Models;
using Pt.Okx.Sdk.Strategy;

namespace MyCustomStrategy
{
    public class MyStrategy : StrategyBase
    {
        private readonly IStrategyLogger _logger;
        private decimal _riskPercent = 1.0m;
        private decimal _maxDrawdown = 0.0m;

        public MyStrategy(IStrategyLogger logger)
        {
            _logger = logger;
        }

        public override Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken cancellationToken)
        {
            return Task.FromResult(true);
        }

        public override Task OnTickAsync(TickPhase tickPhase, CancellationToken ct)
        {
            // Market logic here
            return Task.CompletedTask;
        }

        public override async Task OnTradeCommandAsync(TradeCommand command, CancellationToken ct)
        {
            _ = ct;
            await ProcessTelegramCommandAsync(command);
        }

        private async Task ProcessTelegramCommandAsync(TradeCommand command)
        {
            _logger.LogConsole(PtLogLevel.Debug, "Received command: {Action} Tag={Tag}", command.Action, command.CommandTag);

            switch (command.Action)
            {
                // Handle standard built-in commands
                case TradeAction.Status:
                    await SendStatusReportAsync();
                    break;

                case TradeAction.Details:
                    await SendDetailsReportAsync();
                    break;

                // Handle custom commands registered via MyStrategyCommandExtension
                case TradeAction.Custom:
                    await HandleCustomCommandAsync(command);
                    break;
            }
        }

        private async Task HandleCustomCommandAsync(TradeCommand command)
        {
            switch (command.CommandTag)
            {
                case "setrisk":
                    if (command.Params.TryGetValue("value", out var valueStr) && decimal.TryParse(valueStr, out var risk))
                    {
                        _riskPercent = risk;
                        
                        // Send an elegant notification back to the user via Telegram
                        _logger.LogSuccess("Risk Updated", "Risk per trade successfully updated to {0}%", risk);
                    }
                    else
                    {
                        _logger.LogError("Command Error", "Invalid risk value. Usage: /setrisk [value]");
                    }
                    break;

                case "resetdrawdown":
                    _maxDrawdown = 0.0m;
                    _logger.LogSuccess("State Reset", "Maximum drawdown tracker has been reset to 0%");
                    break;

                default:
                    _logger.LogWarning("Unknown Custom Command", "Custom command tag '{0}' was not recognized", command.CommandTag);
                    break;
            }
        }

        private async Task SendStatusReportAsync()
        {
            // Send a structured key-value report back to Telegram
            _logger.NotifyKeyValue("My Strategy Status",
                ("Status", "Running"),
                ("Risk Level", $"{_riskPercent}%"),
                ("Max Drawdown", $"{_maxDrawdown}%")
            );
            await Task.CompletedTask;
        }

        private async Task SendDetailsReportAsync()
        {
            _logger.NotifyTrace("Strategy Details", $"Active risk is {_riskPercent}% with max drawdown {_maxDrawdown}%.");
            await Task.CompletedTask;
        }

        public override Task<bool> OnStopAsync(CancellationToken cancellationToken)
        {
            return Task.FromResult(true);
        }
    }
}
```

---

## Best Practices & Guidelines

1. **Avoid Blocking the Main Thread:** Telegram command processing runs in the background. If your command handler needs to make external API requests or complex calculations, run them asynchronously to prevent blocking the hot-path execution of the strategy.
2. **Secure Parameters:** Always validate and sanitize inputs in `TryParse` or inside the strategy logic (e.g., using `decimal.TryParse` with bounds checks) to prevent invalid values from corrupting your strategy state.
3. **Use Structured Notifications:** When responding to commands, use `_logger.NotifyKeyValue` or `_logger.LogSuccess` rather than simple strings. This ensures your messages are formatted beautifully with proper emojis and layout on the user's Telegram client.
4. **Keep Commands User-Friendly:** Write clear description strings in your `HelpText` property so that users can easily discover and use your custom commands by typing `/help`.
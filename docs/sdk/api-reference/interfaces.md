---
id: interfaces
title: Interfaces
sidebar_position: 12
---

# Interfaces

## Strategy

### IInputParamManager

Manages input parameters for a strategy or component, including loading, validation, and change notification.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Parameters` | `IReadOnlyDictionary&lt;string, InputParameter&gt;` | Property | Gets the collection of all registered parameters. |
| `Keys` | `IEnumerable&lt;string&gt;` | Property | Gets the collection of parameter keys. |
| `LoadFromFile` | `void` | Method | Loads parameters from a file. |
| `SaveToFile` | `void` | Method | Saves parameters to a file. |
| `SetValue` | `void` | Method | Sets the value of a parameter. |
| `HasParameter` | `bool` | Method | Determines whether a parameter with the specified key exists. |
| `GetParameter` | `InputParameter?` | Method | Gets the full parameter definition for the specified key. |
| `GetValueRange` | `ValueRange?` | Method | Gets the value range constraint for the specified parameter. |
| `ValidateAll` | `Dictionary&lt;string, string&gt;` | Method | Validates all parameters and returns validation errors. |
| `ValidateParameter` | `bool` | Method | Validates a single parameter value. |
| `LoadFromDefaults` | `void` | Method | Loads parameters from code-defined defaults, merging with an existing JSON file if present. If the JSON file exists, user-modified values are preserved for matching keys. If the JSON file does not exist, or the schema has changed (keys differ), a new JSON file is written with merged data. |

### IStrategy

Defines the lifecycle and execution contract for a trading strategy.

| Member | Type | Kind | Description |
|---|---|---|---|
| `OnInitAsync` | `Task&lt;bool&gt;` | Method | Initializes the strategy with the provided state store. |
| `OnTickAsync` | `Task` | Method | Executes strategy logic on each market tick/bar trigger. |
| `OnStopAsync` | `Task&lt;bool&gt;` | Method | Stops the strategy and performs any required cleanup. |

### IStrategyLogger

Interface for logging strategy events, state changes, signals, and notifications in trading systems.

| Member | Type | Kind | Description |
|---|---|---|---|
| `LogConfig` | `void` | Method | Logs configuration key-value pairs with a title. |
| `LogEntry` | `void` | Method | Logs an entry order event. |
| `LogExit` | `void` | Method | Logs an exit order event. |
| `LogKeyValues` | `void` | Method | Logs a set of key-value pairs with a title and message. |
| `LogRecovery` | `void` | Method | Logs a recovery event with a message and log level. |
| `LogSignal` | `void` | Method | Logs a trading signal event. |
| `LogStateChange` | `void` | Method | Logs a state change event with automatic emoji based on the state keyword. |
| `NotifyDocument` | `void` | Method | Sends a notification with a document attachment. |
| `NotifyError` | `void` | Method | Sends a notification for an error event. |
| `NotifyKeyValue` | `void` | Method | Sends a notification with key-value pairs. |
| `NotifyTrace` | `void` | Method | Sends a trace notification with a message and log level. |
| `LogDebug` | `void` | Method | Logs a debug-level message. |
| `LogInformation` | `void` | Method | Logs an informational message. |
| `LogSuccess` | `void` | Method | Logs a success message. |
| `LogWarning` | `void` | Method | Logs a warning message. |
| `LogCritical` | `void` | Method | Logs a critical error message. |
| `LogError` | `void` | Method | Logs an error with an exception. |
| `LogCritical` | `void` | Method | Logs a critical error with an exception. |
| `LogConsole` | `void` | Method | Logs a message to the console at a specific log level. |
| `LogSmart` | `void` | Method | Logs a smart message at a specific log level. |
| `LogSmart` | `void` | Method | Logs a smart message with an exception at a specific log level. |
| `LogConsole` | `void` | Method | Logs a message to the console at a specific log level, with an optional exception. |

### IStrategyPlugin

Defines a plugin that can register services into the dependency injection container for extending strategy functionality.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Register` | `void` | Method | Registers services for the default runtime environment (e.g., live trading). |
| `RegisterForBacktest` | `void` | Method | Registers services specifically for the backtest environment. |

### IStrategyPluginInputSchema

Declares the input schema type for a strategy plugin. The schema type is parsed by the platform to build InputParameter defaults.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetInputSchemaType` | `Type` | Method | Gets the schema type that contains input parameter declarations. |

### IStrategyPluginMetadata

Provides metadata information for a strategy plugin.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Name` | `string` | Property | Gets the display name of the plugin. |
| `PluginVersion` | `string` | Property | Gets the version of the plugin. |
| `RequiredSdkVersion` | `string` | Property | Gets the minimum required SDK version for compatibility. |
| `Author` | `string` | Property | Gets the author of the plugin. Return null if not specified. |
| `Description` | `string` | Property | Gets the description of the plugin. Return null if not specified. |

### IStrategyStateStore

Represents a state container for a trading strategy, providing access to orders, positions, balances, and market data, as well as methods to apply updates from events.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Orders` | IReadOnlyList&lt;[`Order`](./models.md#order)&gt; | Property | Gets the list of active orders. |
| `AlgoOrders` | IReadOnlyList&lt;[`AlgoOrder`](./models.md#algoorder)&gt; | Property | Gets the list of active algorithmic orders (e.g., stop-loss, take-profit). |
| `Positions` | IReadOnlyList&lt;[`Position`](./models.md#position)&gt; | Property | Gets the current open positions. |
| `Balances` | IReadOnlyList&lt;[`AccountBalance`](./models.md#accountbalance)&gt; | Property | Gets the account balances. |
| `Transactions` | IReadOnlyList&lt;[`Transaction`](./models.md#transaction)&gt; | Property | Gets the list of executed transactions. |
| `TradeCommand` | [`TradeCommand`](./models.md#tradecommand) | Property | Gets the trading command interface used to place or modify orders. |
| `LastKline` | [`CandleData`](./models.md#candledata)? | Property | Gets the most recent candle (kline) data. |
| `HasOpenPosition` | `bool` | Property | Gets a value indicating whether there is any open position. |
| `HasOpenOrders` | `bool` | Property | Gets a value indicating whether there are open orders. |
| `HasProtectiveAlgoOrders` | `bool` | Property | Gets a value indicating whether protective algorithmic orders (e.g., stop-loss or take-profit) exist. |
| `OpenOrderCount` | `int` | Property | Gets the number of currently open orders. |
| `AlgoOrderCount` | `int` | Property | Gets the number of active algorithmic orders. |
| `Apply` | `void` | Method | Applies a strategy event to update the internal state. |
| `ApplyKline` | `void` | Method | Updates the latest candle data. |
| `Rebuild` | `void` | Method | Rebuilds the entire state from external data sources. Typically used for synchronization with the exchange or recovery scenarios. |

## Notifier

### ITelegramCommandExtension

Interface for Telegram command extension plugins. Implement this interface to register custom Telegram commands. TelegramCommandHandler will automatically discover implementations via dependency injection (IEnumerable&lt;T&gt;).

| Member | Type | Kind | Description |
|---|---|---|---|
| `TryParse` | [`TradeCommand`](./models.md#tradecommand)? | Method | Attempts to parse a Telegram command for this extension. Returns null if the command does not belong to this extension. |
| `HelpText` | `string?` | Property | The help text block to display under /help. Null means this extension does not provide help text. |

## Storage

### IStoragePathProvider

Provides runtime storage directories for history, logs, state and cache. End-users can implement this interface and register it in DI to customize storage layout.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetRuntimeDataRoot` | `string` | Method | Gets the root directory used for runtime data. |
| `GetHistoryRoot` | `string` | Method | Gets the history storage root. |
| `GetLogsRoot` | `string` | Method | Gets the logs storage root. |
| `GetBacktestRoot` | `string` | Method | Gets the backtest storage root. |
| `GetLiveRoot` | `string` | Method | Gets the live storage root. |
| `GetBacktestLogsRoot` | `string` | Method | Gets the backtest logs storage root. |
| `GetLiveLogsRoot` | `string` | Method | Gets the live logs storage root. |
| `GetStateRoot` | `string` | Method | Gets the state storage root. |
| `GetCacheRoot` | `string` | Method | Gets the cache storage root. |
| `GetExportsRoot` | `string` | Method | Gets the export artifacts storage root. |
| `GetIndicatorPluginsRoot` | `string` | Method | Gets the folder containing custom technical indicators plugins. |
| `GetStrategyPluginsRoot` | `string` | Method | Gets the folder containing custom trading strategies plugins. |

## Common

### IAccountClient

Interface for account clients, providing methods to query trading account information.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetBalances` | [`AccountBalance`](./models.md#accountbalance)? | Method | Gets detailed information about the trading account balance. |
| `AccountSelect` | [`AccountBalanceDetail`](./models.md#accountbalancedetail)? | Method | Selects and retrieves detailed information for a specific asset (e.g., "USDT"). |
| `LoadBalanceAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`AccountBalance`](./models.md#accountbalance)&gt;&gt; | Method | Asynchronously refreshes the account balance information from the exchange. |
| `WalletBalance` | `decimal` | Property | Gets the total actual wallet balance (excluding unrealized PnL). |
| `AvailableBalance` | `decimal` | Property | Gets the available balance that can be used to open new positions. |
| `Equity` | `decimal` | Property | Gets the account equity (Wallet Balance + Unrealized PnL). |
| `UnrealizedPnL` | `decimal` | Property | Gets the total unrealized profit and loss (PnL) from open positions. |
| `InitialMargin` | `decimal` | Property | Gets the total initial margin currently in use. |
| `SetInitialLeverageAsync` | `Task&lt;bool&gt;` | Method | Sets the initial leverage for a specific contract. |
| `GetLeverage` | `decimal` | Method | Gets the current leverage for a specific contract. |
| `SetHedgeModeAsync` | `Task&lt;(bool Success, string? Error)&gt;` | Method | Sets the position mode (Hedge Mode or Netting Mode). |
| `IsHedgeMode` | `bool` | Method | Checks if the account is currently in Hedge Mode. |
| `GetFeeLevelAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`FeeVipLevel`](./enums.md#feeviplevel)&gt;&gt; | Method | Gets information about the account's trading fee VIP level. |
| `GetCurrentEquity` | `decimal` | Method | Gets the current equity value of the account. |
| `GetEquityChangePercentage` | `decimal` | Method | Calculates the percentage change in equity compared to a reference point. |
| `GetMarginRatio` | `decimal` | Method | Calculates the margin ratio. Positions may be liquidated if this reaches 100%. |
| `GetCurrentDrawdown` | `decimal` | Method | Calculates the current account drawdown compared to the equity peak. |

### IDrawingManager

Defines the contract for managing drawing objects (lines, shapes, text, etc.) within the trading workspace.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Add` | `string` | Method | Adds a new drawing object to the manager. |
| `Remove` | `void` | Method | Removes a drawing object by its unique identifier. |
| `Update` | `void` | Method | Updates an existing drawing object by applying a mutation action. |
| `Clear` | `void` | Method | Clears all drawing objects, optionally filtered by symbol. |
| `GetAll` | IReadOnlyList&lt;[`DrawingObject`](./models.md#drawingobject)&gt; | Method | Retrieves all drawing objects for a specific symbol and timeframe. |
| `GetById` | [`DrawingObject`](./models.md#drawingobject)? | Method | Retrieves a specific drawing object by its unique identifier. |
| `AddHorizontalLine` | `string` | Method | Creates and adds a horizontal line drawing object. |
| `AddTrendLine` | `string` | Method | Creates and adds a trend line drawing object. |
| `AddRectangle` | `string` | Method | Creates and adds a rectangle drawing object. |
| `AddText` | `string` | Method | Creates and adds a text drawing object. |
| `AddEmoji` | `string` | Method | Creates and adds an emoji drawing object. |
| `AddMeasurement` | `string` | Method | Creates and adds a measurement tool drawing object. |

### IIndicator

Represents a technical indicator that can be calculated over a series of price data.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Config` | [`IndicatorConfig`](./models.md#indicatorconfig) | Property | Gets the configuration for the indicator. |
| `Identity` | [`IndicatorIdentity`](./models.md#indicatoridentity) | Property | Gets the unique identity of the indicator instance. |
| `Property` | [`IndicatorProperty`](./models.md#indicatorproperty) | Property | Gets or sets the indicator properties, such as display name and buffer metadata. |
| `IsInitialized` | `bool` | Property | Gets a value indicating whether the indicator has been initialized. |
| `OnInit` | `bool` | Method | Initializes the indicator. Called once before the first calculation. |
| `OnCalculate` | `int` | Method | Calculates the indicator values for a single price series. |
| `GetIndicatorId` | `string` | Method | Gets the unique identifier for the indicator instance. |
| `GetDisplayName` | `string` | Method | Gets the display name for the indicator. |
| `GetBuffer` | [`IIndicatorBuffer`](#iindicatorbuffer) | Method | Gets an indicator buffer by its index. |

### IIndicatorAC

Defines the contract for an Accelerator Oscillator (AC) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetUp` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the bullish (up) histogram value at the specified index. |
| `GetDown` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the bearish (down) histogram value at the specified index. |

### IIndicatorAD

Defines the contract for an Accumulation/Distribution (AD) indicator.

### IIndicatorADX

Defines the contract for an Average Directional Index (ADX) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetAdx` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the ADX value at the specified index. |
| `GetAdxRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a range of ADX values. |
| `GetMinusDI` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the -DI value at the specified index. |
| `GetMinusDIRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a range of -DI values. |
| `GetPlusDI` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the +DI value at the specified index. |
| `GetPlusDIRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a range of +DI values. |
| `IsIncreasing` | `bool` | Method | Determines whether the ADX value is increasing over the specified lookback period. |
| `IsTrending` | `bool` | Method | Determines whether the market is trending based on the ADX threshold. |

### IIndicatorADXW

Defines the contract for an ADX indicator with Wilder's smoothing (ADXW).

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetMinusDI` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the -DI value at the specified index. |
| `GetMinusDIRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a range of -DI values. |
| `GetPlusDI` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the +DI value at the specified index. |
| `GetPlusDIRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a range of +DI values. |
| `IsBearish` | `bool` | Method | Determines whether the current trend is bearish. |
| `IsBearishCrossover` | `bool` | Method | Determines if a bearish crossover (-DI crosses above +DI) has occurred. |
| `IsBullish` | `bool` | Method | Determines whether the current trend is bullish. |
| `IsBullishCrossover` | `bool` | Method | Determines if a bullish crossover (+DI crosses above -DI) has occurred. |
| `IsStrongTrend` | `bool` | Method | Determines whether a strong trend exists based on the ADX threshold. |

### IIndicatorAlligator

Defines the contract for a Williams Alligator indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetJaw` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Alligator's Jaw (Blue line) value at the specified index. |
| `GetTeeth` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Alligator's Teeth (Red line) value at the specified index. |
| `GetLips` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Alligator's Lips (Green line) value at the specified index. |

### IIndicatorAMA

Defines the interface for an Adaptive Moving Average (AMA) indicator.

### IIndicatorAO

Defines the contract for an Awesome Oscillator (AO) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetUp` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the bullish (up) histogram value at the specified index. |
| `GetDown` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the bearish (down) histogram value at the specified index. |

### IIndicatorATR

Defines the contract for an Average True Range (ATR) indicator.

### IIndicatorBears

Defines the contract for a Bears Power indicator.

### IIndicatorBollingerBands

Defines the contract for a Bollinger Bands indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetLower` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the lower band value at the specified index. |
| `GetMiddle` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the middle band (basis) value at the specified index. |
| `GetUpper` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the upper band value at the specified index. |
| `GetWidth` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Bollinger Band Width at the specified index. |
| `IsExpansion` | `bool` | Method | Determines whether the bands are expanding (volatility increasing). |
| `IsSqueeze` | `bool` | Method | Determines whether the bands are in a squeeze (volatility decreasing). |
| `IsVolatilityDecreasing` | `bool` | Method | Determines whether volatility has been decreasing over the specified lookback period. |
| `IsVolatilityIncreasing` | `bool` | Method | Determines whether volatility has been increasing over the specified lookback period. |

### IIndicatorBollingerBandWidth

Defines the contract for a Bollinger Band Width indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetWidth` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the band width value at the specified index. |
| `IsSqueeze` | `bool` | Method | Determines whether width is below a squeeze threshold. |
| `IsExpansion` | `bool` | Method | Determines whether width is above an expansion threshold. |

### IIndicatorBollingerPercentB

Defines the contract for a Bollinger Bands %B indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetPercentB` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the %B value at the specified index. |
| `IsOverbought` | `bool` | Method | Determines whether %B is above the overbought threshold. |
| `IsOversold` | `bool` | Method | Determines whether %B is below the oversold threshold. |

### IIndicatorBuffer

Represents a buffer for storing indicator values over time.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Count` | `int` | Property | Actual number of elements with data in the buffer. (does not include empty parts) |
| `FullCount` | `int` | Property | Total number of elements from the beginning to the end of the buffer that have been filled with data. Different from Count: Count only calculates the current number of elements, while FullCount includes the offset (_startIndex + Count). |
| `Capacity` | `int` | Property | The buffer's maximum capacity. When the number of elements exceeds, the buffer may need to resize. |
| `CurrentTime` | `DateTime` | Property | Indicator's current time based on the period (only applicable for backtest). This value will be updated every time new data is available. |
| `InternalValues` | IReadOnlyList&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Property | Returns all indicator values (original array) |
| `Version` | `long` | Property | Returns the version of the buffer, which increments whenever data is added or modified. |
| `At` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Returns the value at the specified index. |
| `FindCurrent` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Finds and returns the value corresponding to . (Usually used to get data at the current time in trading) |
| `FindAtOrBeforeCurrent` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Returns the indicator value at or before the time . |
| `Add` | `void` | Method | Adds a new value to the buffer at a specified position. Requires data to be added in ascending chronological order. |
| `FindAfter` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Finds and returns a collection of n elements immediately after a given time. |
| `FindRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Finds and returns all elements within a specified time range. Complexity: O(log n + k), where n is the number of elements and k is the number of satisfied elements. |
| `GetSlice` | Span&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Returns a representing a slice in the buffer. This function is very fast because it only creates a view on the original array, not copying data. |
| `FindAtOrBefore` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Returns the value at or immediately before dateTime. If not found, returns the default value. |
| `FindIndexAtOrAfter` | `int` | Method | Returns the index of the element with a time greater than or equal to the specified time dateTime. Uses BinarySearch for fast O(log n) searching. |
| `FindIndexAtOrBefore` | `int` | Method | Returns the index of the element with a time less than or equal to dateTime. |
| `Add` | `void` | Method | Adds a new value to the buffer at a specified position, with timestamp and numeric value. |
| `ForceAdd` | `void` | Method | Overwrites the value at the index regardless of whether the slot already has data or not. Used for multi-buffer indicators (SAR, etc.) when 2 buffers track the same index. |
| `MarkEmpty` | `void` | Method | Records an index position as processed but without a value (used for multi-buffer indicators like SAR). Does not increase Count, only updates FullCount so At()/TryAt() knows the index has been visited. |
| `GetValues` | [`IndicatorValue`](./models.md#indicatorvalue)[] | Method | Returns all indicator values. |
| `TryAt` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Returns the value at the specified index, or null if the index is invalid. |
| `FindIndex` | `int` | Method | Searches for the index of the element with a time exactly equal to dateTime. Uses BinarySearch with O(log n) complexity. |
| `Find` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Finds and returns the value at the exact specified time. |
| `FindClosest` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Finds and returns the value closest to the time passed in dateTime. |
| `FindBefore` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Finds and returns n elements before (or at) a given time. (Usually used to retrieve historical data before a time point in trading) |
| `FindBefore` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Finds and returns n elements before (or at) the current time. (Usually used to retrieve the most recent historical data compared to the current time in trading) |
| `FindExactAtCurrent` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Returns the value at CurrentTime, including IsEmpty (no walk-back). Used to check the exact state at the current bar. |
| `FindWithTolerance` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Finds the value closest to a given time, but only returns it if the time difference does not exceed tolerance. |
| `GetLatest` | Span&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Retrieves the last n elements (latest values) in the buffer. Returns as Span\{T\} for fast access without copying data. |
| `CountUpToCurrent` | `int` | Method | Returns the number of elements with data up to CurrentTime. Used instead of Count when counting in backtest context. |
| `HasDataAtCurrent` | `bool` | Method | Checks if the buffer has data at or before CurrentTime. Used to guard before querying. |
| `FindRangeUpToCurrent` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Returns the range [startTime, CurrentTime] — never exceeds CurrentTime. |
| `Resize` | `bool` | Method | Changes the buffer size. Only performed when newSize is greater than current Capacity. |
| `Clear` | `void` | Method | Clears all data. |
| `GetStats` | [`BufferStats`](./models.md#bufferstats) | Method | Returns basic buffer statistics. |
| `GetCurrentEndIndexDebug` | `int` | Method | Returns the current end index. |

### IIndicatorBulls

Defines the contract for a Bulls Power indicator.

### IIndicatorBWMFI

Defines the contract for a Bill Williams Market Facilitation Index (BWMFI) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetGreen` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Green bar value (MFI+, Vol+) at the specified index. |
| `GetBrown` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Brown bar value (MFI-, Vol-) at the specified index. |
| `GetBlue` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Blue bar value (MFI+, Vol-) at the specified index. |
| `GetPink` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Pink bar value (MFI-, Vol+) at the specified index. |

### IIndicatorCCI

Defines the contract for a Commodity Channel Index (CCI) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `IsOverbought` | `bool` | Method | Determines whether the CCI value at the specified index is in the overbought zone. |
| `IsOversold` | `bool` | Method | Determines whether the CCI value at the specified index is in the oversold zone. |

### IIndicatorChaikin

Defines the contract for a Chaikin Oscillator indicator.

### IIndicatorDEMA

Defines the contract for a Double Exponential Moving Average (DEMA) indicator.

### IIndicatorDeMarker

Defines the contract for a DeMarker indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `IsOverbought` | `bool` | Method | Determines whether the DeMarker value at the specified index is in the overbought zone. |
| `IsOversold` | `bool` | Method | Determines whether the DeMarker value at the specified index is in the oversold zone. |

### IIndicatorDiff

Defines the contract for a Difference indicator.

### IIndicatorEnvelopes

Defines the contract for envelope-based technical indicators (e.g., Moving Average Envelopes).

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetLower` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the lower band value at the specified index. |
| `GetLowerRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a range of lower band values. |
| `GetUpper` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the upper band value at the specified index. |
| `GetUpperRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a range of upper band values. |
| `IsPriceAboveUpper` | `bool` | Method | Determines whether the specified price exceeds the upper limit. |
| `IsPriceBelowLower` | `bool` | Method | Determines whether the specified price is below the lower threshold. |

### IIndicatorFactory

Provides registration, discovery, and creation of indicator instances.

| Member | Type | Kind | Description |
|---|---|---|---|
| `IsCustomRegistered` | `bool` | Method | Determines whether a custom indicator is registered under the specified name. |
| `GetRegisteredCustomIndicators` | `string[]` | Method | Gets the names of all registered custom indicators. |
| `GetCustomParameterDefs` | IReadOnlyList&lt;[`IndicatorParameterInfo`](./models.md#indicatorparameterinfo)&gt; | Method | Gets the parameter definitions for a registered custom indicator. |
| `IsSupported` | `bool` | Method | Determines whether the specified built-in indicator type is supported. |
| `GetSupportedIndicators` | [`IndicatorType`](./enums.md#indicatortype)[] | Method | Gets all supported built-in indicator types. |
| `RegisterCustom` | `void` | Method | Registers a custom indicator by name. |
| `SetCustomParameterDefs` | `void` | Method | Sets or replaces the parameter definitions for a custom indicator. |
| `UnregisterCustom` | `bool` | Method | Removes a custom indicator registration by name. |

### IIndicatorForce

Defines the contract for a Force Index indicator.

### IIndicatorFractals

Defines the contract for a Williams Fractals indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetUp` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the up fractal value at the specified index. |
| `GetDown` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the down fractal value at the specified index. |

### IIndicatorGator

Defines the contract for a Gator Oscillator indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetUp` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the upper histogram value at the specified index. |
| `GetDown` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the lower histogram value at the specified index. |

### IIndicatorIchimoku

Defines the contract for an Ichimoku Kinko Hyo indicator.

### IIndicatorMA

Defines the contract for a moving average indicator that provides trend analysis and crossover detection functionality.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetTrend` | [`MATrendDirection`](./enums.md#matrenddirection) | Method | Determines the moving average trend direction over a specified lookback period. |
| `DetectCrossover` | [`MACrossoverType`](./enums.md#macrossovertype) | Method | Determines the type of crossover event between the specified fast and slow moving average indicators. |

### IIndicatorMACD

Defines the contract for a Moving Average Convergence Divergence (MACD) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetMacd` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the MACD line value at the specified index. |
| `GetSignal` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Signal line value at the specified index. |
| `GetHistogram` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Histogram value at the specified index. |

### IIndicatorManager

Manages the lifecycle, registration, and data access for technical indicators.

| Member | Type | Kind | Description |
|---|---|---|---|
| `RegisterIndicator` | `string` | Method | Registers an indicator instance and assigns it a unique identifier. |
| `GetIndicatorBuffer` | [`IIndicatorBuffer`](#iindicatorbuffer)? | Method | Retrieves a specific buffer for a registered indicator. |
| `GetIndicatorBufferValueAtTime` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Retrieves an indicator's buffer value at a specific timestamp. |
| `SetIndexBuffer` | `void` | Method | Configures a buffer for a registered indicator. |
| `GetIndicators` | IReadOnlyList&lt;[`IIndicator`](#iindicator)&gt; | Method | Gets a list of all registered indicators. |
| `GetIndicator` | [`IIndicator`](#iindicator)? | Method | Retrieves an indicator instance by its unique identifier. |
| `UnregisterIndicator` | `void` | Method | Unregisters an indicator and cleans up its associated resources. |

### IIndicatorMethodCommon

Provides common access methods for retrieving indicator values from one or more internal buffers.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetAt` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the indicator value at the specified index from the default buffer (buffer index 0). |
| `GetAt` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the indicator value at the specified index from a specific buffer. |
| `GetRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a sequence of indicator values from the default buffer. |
| `GetRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a sequence of indicator values from a specific buffer. |

### IIndicatorMFI

Defines the contract for a Money Flow Index (MFI) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `IsOverbought` | `bool` | Method | Determines whether the MFI value at the specified index is in the overbought zone. |
| `IsOversold` | `bool` | Method | Determines whether the MFI value at the specified index is in the oversold zone. |

### IIndicatorMomentum

Defines the contract for a Momentum indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `FindMomentum` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the momentum value at the specified index. |

### IIndicatorOBV

Defines the contract for an On-Balance Volume (OBV) indicator.

### IIndicatorOsMA

Defines the contract for an Moving Average of Oscillator (OsMA) indicator.

### IIndicatorPlugin

Contract implemented by custom indicator plugin assemblies.

| Member | Type | Kind | Description |
|---|---|---|---|
| `RegisterIndicators` | `void` | Method | Registers all custom indicators provided by the plugin. |

### IIndicatorPluginLoader

Loads custom indicator plugins from external assemblies. Strategy and GUI components use this interface instead of implementing plugin loading themselves.

| Member | Type | Kind | Description |
|---|---|---|---|
| `LoadAll` | `void` | Method | Loads a plugin from a specific DLL path, when provided, and scans the default plugins directory. |
| `LoadPlugin` | [`IndicatorLoadedPlugin`](./models.md#indicatorloadedplugin)? | Method | Loads one plugin from a DLL path. |
| `LoadPluginsFromDirectory` | IReadOnlyList&lt;[`IndicatorLoadedPlugin`](./models.md#indicatorloadedplugin)&gt; | Method | Loads all plugins from a directory. |
| `LoadedPlugins` | IReadOnlyList&lt;[`IndicatorLoadedPlugin`](./models.md#indicatorloadedplugin)&gt; | Property | Gets the loaded plugins. |
| `UnloadPlugin` | `bool` | Method | Unloads a loaded plugin, unregistering its indicators. |
| `VerifyIndicatorPlugin` | `bool` | Method | Verifies whether a DLL is a valid, compatible indicator plugin. |

### IIndicatorPluginMetadata

Metadata exposed by an indicator plugin assembly.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Name` | `string` | Property | Plugin display name, for example "My Custom Indicators". |
| `PluginVersion` | `string` | Property | Plugin version, for example "1.0.0". |
| `RequiredSdkVersion` | `string` | Property | Required SDK version for compatibility, for example "1.0.0". |
| `Description` | `string` | Property | Short plugin description. |
| `Author` | `string` | Property | The author or publisher of the plugin. |

### IIndicatorRegistrationContext

Registration context passed to indicator plugins. Plugins register indicators through this context instead of calling the factory directly.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Register` | `void` | Method | Registers an indicator creator by name. |

### IIndicatorRSI

Defines the contract for a Relative Strength Index (RSI) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `IsOverbought` | `bool` | Method | Determines whether the RSI value at the specified index is in the overbought zone. |
| `IsOversold` | `bool` | Method | Determines whether the RSI value at the specified index is in the oversold zone. |

### IIndicatorRVI

Defines the contract for a Relative Vigor Index (RVI) indicator.

### IIndicatorSAR

Defines the contract for a Parabolic SAR (Stop and Reverse) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `IsBullish` | `bool` | Method | Determines whether the current market condition is bullish. |
| `IsBearish` | `bool` | Method | Determines whether the current condition is bearish. |

### IIndicatorStdDev

Defines the contract for a Standard Deviation indicator.

### IIndicatorStochastic

Defines the contract for a Stochastic Oscillator indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetK` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the %K line value at the specified index. |
| `GetD` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the %D line value at the specified index. |
| `IsOverbought` | `bool` | Method | Determines whether the Stochastic %K value at the specified index is in the overbought zone. |
| `IsOversold` | `bool` | Method | Determines whether the Stochastic %K value at the specified index is in the oversold zone. |

### IIndicatorSuperTrend

Defines the contract for a SuperTrend indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetAtr` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the Average True Range (ATR) value at the specified index. |
| `GetDistanceFromSuperTrend` | `double` | Method | Calculates the distance between the specified close price and the SuperTrend value. |
| `GetSmoothedATR` | `double` | Method | Calculates the smoothed Average True Range (ATR) using an exponential moving average. |
| `GetTrendDirection` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Retrieves the trend direction at the specified index. |
| `HasBearishReversal` | `bool` | Method | Determines if there is a bearish reversal at the current index. |
| `HasBearishReversalConfirmed` | `bool` | Method | Determines whether a bearish reversal pattern has been confirmed within the specified number of bars. |
| `HasBullishReversal` | `bool` | Method | Determines whether a bullish reversal pattern is present. |
| `HasBullishReversalConfirmed` | `bool` | Method | Determines whether a bullish reversal pattern has been confirmed within the specified number of bars. |
| `IsATRIncreasing` | `bool` | Method | Determines whether the ATR has been increasing over the specified lookback period. |
| `IsBearish` | `bool` | Method | Determines whether the current market condition is bearish. |
| `IsBullish` | `bool` | Method | Determines whether the current market condition is bullish. |
| `IsFarEnoughFromSuperTrend` | `bool` | Method | Determines whether the close price is sufficiently distant from the SuperTrend line. |
| `IsStrongBreakout` | `bool` | Method | Determines whether the specified closing price represents a strong breakout. |
| `IsTrendStable` | `bool` | Method | Determines whether the trend is considered stable over a specified lookback period. |
| `IsWithinSuperTrendDistance` | `bool` | Method | Determines whether the specified close price is within the allowed distance from the SuperTrend line. |

### IIndicatorTEMA

Represents a Triple Exponential Moving Average (TEMA) indicator.

### IIndicatorTRIX

Defines the contract for a Triple Exponential Average (TRIX) indicator.

### IIndicatorVolumeSpike

Defines the contract for a Volume Spike indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `FindVolume` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the volume value at the specified index. |
| `FindAvgVolume` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the average volume at the specified index. |
| `FindVolumeRatio` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the volume ratio (current volume / average volume) at the specified index. |
| `IsSpike` | `bool` | Method | Determines whether a volume spike occurred at the specified index. |

### IIndicatorVWAP

Defines the contract for a Volume Weighted Average Price (VWAP) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `FindVWAP` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the VWAP value at the specified index. |
| `IsPriceAboveVWAP` | `bool` | Method | Determines whether the specified price is above the VWAP. |
| `IsPriceBelowVWAP` | `bool` | Method | Determines whether the specified price is below the VWAP. |
| `GetDistanceFromVWAP` | `double` | Method | Calculates the percentage distance between the specified price and the VWAP. |
| `FindCumulativeVolume` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the cumulative volume at the specified index. |

### IIndicatorWPR

Defines the contract for a Williams' Percent Range (WPR) indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `IsOverbought` | `bool` | Method | Determines whether the WPR value at the specified index is in the overbought zone. |
| `IsOversold` | `bool` | Method | Determines whether the WPR value at the specified index is in the oversold zone. |

### IInstrumentClient

Interface for instrument clients, providing methods to query trading instrument information.

| Member | Type | Kind | Description |
|---|---|---|---|
| `InstrumentType` | [`InstrumentType`](./enums.md#instrumenttype) | Property | Gets the type of trading instrument handled by this client (e.g., Futures, Spot). |
| `IsSymbol` | `bool` | Method | Checks if the specified symbol is a valid and tracked trading symbol. |
| `TotalSymbols` | `int` | Method | Gets the total number of trading symbols currently tracked. |
| `QuoteAsset` | `string` | Method | Gets the quote asset for the specified symbol (e.g., "USDT"). |
| `BaseAsset` | `string` | Method | Gets the base asset for the specified symbol (e.g., "BTC"). |
| `Underlying` | `string` | Method | Gets the underlying asset for the specified symbol (for derivatives). |
| `GetLastPriceAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;decimal&gt;&gt; | Method | Gets the last traded price for the specified symbol. |
| `GetMarkPriceAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;decimal&gt;&gt; | Method | Gets the mark price for the specified symbol (important for Futures/Swap). |
| `GetBidAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;decimal&gt;&gt; | Method | Gets the current bid price for the specified symbol. |
| `GetAskAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;decimal&gt;&gt; | Method | Gets the current ask price for the specified symbol. |
| `GetSpreadAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;decimal&gt;&gt; | Method | Gets the spread (difference between ask and bid prices) for the specified symbol. |
| `GetHighPriceAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;decimal&gt;&gt; | Method | Gets the highest price within a recent time frame for the specified symbol. |
| `GetLowPriceAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;decimal&gt;&gt; | Method | Gets the lowest price within a recent time frame for the specified symbol. |
| `GetLimitPriceAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`LimitPrice`](./models.md#limitprice)&gt;&gt; | Method | Gets the limit price for the specified symbol (for limit orders). |
| `GetPrecisionPrice` | `int` | Method | Gets the price precision (number of decimal places) for the specified symbol. |
| `GetPrecisionLot` | `int` | Method | Gets the lot size precision (number of decimal places) for the specified symbol. |
| `GetTickPrice` | `decimal` | Method | Gets the tick size (minimum price increment) for the specified symbol. |
| `GetLimitMaxCost` | `decimal` | Method | Gets the maximum allowed cost for an order for the specified symbol. |
| `NormalizeLot` | `decimal` | Method | Normalizes the lot size according to exchange rules. |
| `NormalizePrice` | `decimal` | Method | Normalizes the price according to exchange rules (rounded by price precision). |
| `GetFeeTaker` | `decimal` | Method | Gets the taker trading fee for the specified symbol. |
| `GetFeeMaker` | `decimal` | Method | Gets the maker trading fee for the specified symbol. |
| `GetMaintMarginRateAsync` | `Task&lt;decimal&gt;` | Method | Gets the maintenance margin rate for the specified symbol and position notional. |
| `ContractSize` | `decimal` | Method | Gets the contract size for the specified symbol (for Futures/Swap). |
| `ContractMultiplier` | `decimal` | Method | Gets the contract multiplier for the specified symbol (for Options). |
| `GetCurrentTime` | `DateTime` | Method | Gets the current system time. |
| `SymbolCode` | `long` | Method | Gets the unique symbol code (long integer) for the specified trading symbol, and vice versa. |
| `Symbol` | `string` | Method | Gets the trading symbol string for the specified unique symbol code (long integer). |

### IOkxClient

Interface aggregating the main OKX platform services for clients. Provides restricted access compared to IOkx, exposing only safe functions for client use.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Timeseries` | [`ITimeSeriesClient`](#itimeseriesclient) | Property | Access to timeseries and technical indicator functions. |
| `Instrument` | [`IInstrumentClient`](#iinstrumentclient) | Property | Access to trading instrument information and management functions. |
| `Account` | [`IAccountClient`](#iaccountclient) | Property | Access to account information and management functions. |
| `Trade` | [`ITradeClient`](#itradeclient) | Property | Access to trading and order placement functions. |

### ITimeSeriesClient

Client interface providing methods for querying time series (OHLCV) data and initializing technical indicators.

| Member | Type | Kind | Description |
|---|---|---|---|
| `PeriodCurrent` | [`Timeframe`](./enums.md#timeframe) | Property | Gets the current timeframe (Kline interval) in use. |
| `BeginTime` | `DateTime` | Property | Gets the start time of the data in the system. |
| `EndTime` | `DateTime?` | Property | Gets the end time of the data (null if running in real-time). |
| `StartTime` | `DateTime?` | Property | Gets the system start time. |
| `MaxBars` | `int` | Property | Gets the maximum number of bars (candles) stored in the cache. |
| `Indicator` | [`IIndicatorManager`](#iindicatormanager) | Property | Gets the manager for initialized technical indicators. |
| `SymbolsTimes` | HashSet&lt;(string Symbol, [`Timeframe`](./enums.md#timeframe) [`Timeframe`](./enums.md#timeframe))&gt; | Property | Gets the distinct symbol/timeframe pairs scoped to this strategy instance (primary pair + indicator pairs). Not the global singleton. |
| `CurrentTickPrice` | `decimal` | Property | Gets the most recent tick price of the asset as received from the market data feed. |
| `CurrentTick` | [`TickData`](./models.md#tickdata) | Property | Gets the most recent tick data representing the current state of the system. |
| `GetCurrentTime` | `DateTime` | Method | Gets the current time based on the specified timeframe. |
| `BarsCalculated` | `int` | Method | Counts the number of bars calculated for a specific indicator. |
| `Bars` | `int` | Method | Gets the total number of bars available for a trading pair and timeframe. |
| `GetOHCLVAsync` | Task&lt;[`CandleData`](./models.md#candledata)&gt; | Method | Gets the OHLCV data at a specific index (0 = current forming candle, 1 = previous closed candle, etc.). |
| `GetCurrentCandleAsync` | Task&lt;[`CandleData`](./models.md#candledata)&gt; | Method | Gets the data for the currently forming candle. |
| `GetTime` | `DateTime` | Method | Gets the timestamp of the candle at the specified shift for a given timeframe. Shift 0 corresponds to the current forming candle, shift 1 is the last closed candle, and so on. |
| `GetOpenCandle` | [`CandleData`](./models.md#candledata) | Method | Retrieves the open candle data for the specified trading symbol and timeframe. |
| `GetLastClosedCandle` | [`CandleData`](./models.md#candledata) | Method | Gets the most recent closed candle data for the specified trading symbol and timeframe. |
| `CopySeries` | Task&lt;[`CandleData`](./models.md#candledata)[]&gt; | Method | Copies an array of OHLCV data within a specified time range. |
| `CopySeries` | Task&lt;[`CandleData`](./models.md#candledata)[]&gt; | Method | Copies an array of OHLCV data by start position and number of candles. |
| `CopySeries` | Task&lt;[`CandleData`](./models.md#candledata)[]&gt; | Method | Copies an array of OHLCV data from a specific time with a defined number of candles. |
| `CopyTimes` | `Task&lt;DateTime[]&gt;` | Method | Copies an array of times by position and count. |
| `CopyTimes` | `Task&lt;DateTime[]&gt;` | Method | Copies an array of times from a start time with a defined count. |
| `CopyTimes` | `Task&lt;DateTime[]&gt;` | Method | Copies an array of times within a specified time range. |
| `CopyOpens` | `Task&lt;decimal[]&gt;` | Method | Copies an array of open prices by position and count. |
| `CopyOpens` | `Task&lt;decimal[]&gt;` | Method | Copies an array of open prices from a start time with a defined count. |
| `CopyOpens` | `Task&lt;decimal[]&gt;` | Method | Copies an array of open prices within a specified time range. |
| `CopyHighs` | `Task&lt;decimal[]&gt;` | Method | Copies an array of high prices by position and count. |
| `CopyHighs` | `Task&lt;decimal[]&gt;` | Method | Copies an array of high prices from a start time with a defined count. |
| `CopyHighs` | `Task&lt;decimal[]&gt;` | Method | Copies an array of high prices within a specified time range. |
| `CopyLows` | `Task&lt;decimal[]&gt;` | Method | Copies an array of low prices by position and count. |
| `CopyLows` | `Task&lt;decimal[]&gt;` | Method | Copies an array of low prices from a start time with a defined count. |
| `CopyLows` | `Task&lt;decimal[]&gt;` | Method | Copies an array of low prices within a specified time range. |
| `CopyCloses` | `Task&lt;decimal[]&gt;` | Method | Copies an array of close prices by position and count. |
| `CopyCloses` | `Task&lt;decimal[]&gt;` | Method | Copies an array of close prices from a start time with a defined count. |
| `CopyCloses` | `Task&lt;decimal[]&gt;` | Method | Copies an array of close prices within a specified time range. |
| `CopyVolumes` | `Task&lt;decimal[]&gt;` | Method | Copies an array of volumes by position and count. |
| `CopyVolumes` | `Task&lt;decimal[]&gt;` | Method | Copies an array of volumes from a start time with a defined count. |
| `CopyVolumes` | `Task&lt;decimal[]&gt;` | Method | Copies an array of volumes within a specified time range. |
| `CopyPrices` | `IEnumerable&lt;decimal&gt;` | Method | Extracts a list of prices from an existing OHLCV data series. |
| `CopyPrice` | `decimal` | Method | Extracts a specific price value from a candle based on AppliedPrice. |
| `CopyBuffer` | `int` | Method | Copies indicator buffer values by index and count. |
| `CopyBuffer` | `int` | Method | Copies indicator buffer values from a start time with a defined count. |
| `CopyBuffer` | `int` | Method | Copies indicator buffer values within a specified time range. |
| `CreateIndicatorMA` | [`IIndicatorMA`](#iindicatorma) | Method | Creates a Moving Average (MA) indicator. |
| `CreateIndicatorRSI` | [`IIndicatorRSI`](#iindicatorrsi) | Method | Creates a Relative Strength Index (RSI) indicator. |
| `CreateIndicatorStochastic` | [`IIndicatorStochastic`](#iindicatorstochastic) | Method | Creates a Stochastic Oscillator indicator. |
| `CreateIndicatorMACD` | [`IIndicatorMACD`](#iindicatormacd) | Method | Creates a Moving Average Convergence Divergence (MACD) indicator. |
| `CreateIndicatorATR` | [`IIndicatorATR`](#iindicatoratr) | Method | Creates an Average True Range (ATR) indicator. |
| `CreateIndicatorSuperTrend` | [`IIndicatorSuperTrend`](#iindicatorsupertrend) | Method | Creates a SuperTrend indicator for trend identification. |
| `CreateIndicatorIchimoku` | [`IIndicatorIchimoku`](#iindicatorichimoku) | Method | Creates an Ichimoku indicator. |
| `CreateIndicatorVWAP` | [`IIndicatorVWAP`](#iindicatorvwap) | Method | Creates a Volume Weighted Average Price (VWAP) indicator. |
| `CreateIndicatorVolumeSpike` | [`IIndicatorVolumeSpike`](#iindicatorvolumespike) | Method | Creates a Volume Spike indicator for detecting volume surges. |
| `CreateIndicatorAD` | [`IIndicatorAD`](#iindicatorad) | Method | Creates an Accumulation/Distribution (AD) indicator. |
| `CreateIndicatorADXW` | [`IIndicatorADXW`](#iindicatoradxw) | Method | Creates an Average Directional Index Wilder (ADXW) indicator. |
| `CreateIndicatorBWMFI` | [`IIndicatorBWMFI`](#iindicatorbwmfi) | Method | Creates a Bollinger Bands Width/Money Flow Index (BWMFI) indicator. |
| `CreateIndicatorDeMarker` | [`IIndicatorDeMarker`](#iindicatordemarker) | Method | Creates a DeMarker indicator. |
| `CreateIndicatorOBV` | [`IIndicatorOBV`](#iindicatorobv) | Method | Creates an On Balance Volume (OBV) indicator. |
| `CreateIndicatorOsMA` | [`IIndicatorOsMA`](#iindicatorosma) | Method | Creates an Oscillator of Moving Average (OsMA) indicator from two source indicator IDs. |
| `CreateIndicatorStdDev` | [`IIndicatorStdDev`](#iindicatorstddev) | Method | Creates a Standard Deviation (StdDev) indicator. |
| `CreateIndicatorTRIX` | [`IIndicatorTRIX`](#iindicatortrix) | Method | Creates a TRIX indicator for momentum analysis. |
| `CreateIndicatorWPR` | [`IIndicatorWPR`](#iindicatorwpr) | Method | Creates a Williams %R (WPR) indicator. |
| `CreateIndicatorAC` | [`IIndicatorAC`](#iindicatorac) | Method | Creates an Accelerator Oscillator (AC) indicator. |
| `CreateIndicatorAO` | [`IIndicatorAO`](#iindicatorao) | Method | Creates an Awesome Oscillator (AO) indicator. |
| `CreateIndicatorAlligator` | [`IIndicatorAlligator`](#iindicatoralligator) | Method | Creates an Alligator indicator. |
| `CreateIndicatorGator` | [`IIndicatorGator`](#iindicatorgator) | Method | Creates a Gator Oscillator indicator. |
| `CreateIndicatorEnvelopes` | [`IIndicatorEnvelopes`](#iindicatorenvelopes) | Method | Creates an Envelopes indicator for upper/lower band trading envelopes. |
| `CreateIndicatorForce` | [`IIndicatorForce`](#iindicatorforce) | Method | Creates a Force Index indicator. |
| `CreateIndicatorFractals` | [`IIndicatorFractals`](#iindicatorfractals) | Method | Creates a Fractals indicator. |
| `CreateIndicatorBears` | [`IIndicatorBears`](#iindicatorbears) | Method | Creates a Bears Power indicator. |
| `CreateIndicatorBulls` | [`IIndicatorBulls`](#iindicatorbulls) | Method | Creates a Bulls Power indicator. |
| `CreateIndicatorChaikin` | [`IIndicatorChaikin`](#iindicatorchaikin) | Method | Creates a Chaikin Oscillator indicator. |
| `CreateIndicatorMFI` | [`IIndicatorMFI`](#iindicatormfi) | Method | Creates a Money Flow Index (MFI) indicator. |
| `CreateIndicatorRVI` | [`IIndicatorRVI`](#iindicatorrvi) | Method | Creates a Relative Vigor Index (RVI) indicator. |
| `CreateIndicatorSAR` | [`IIndicatorSAR`](#iindicatorsar) | Method | Creates a Parabolic SAR indicator. |
| `CreateIndicatorCCI` | [`IIndicatorCCI`](#iindicatorcci) | Method | Creates a Commodity Channel Index (CCI) indicator. |
| `CreateIndicatorTEMA` | [`IIndicatorTEMA`](#iindicatortema) | Method | Creates a Triple Exponential Moving Average (TEMA) indicator. |
| `CreateIndicatorAMA` | [`IIndicatorAMA`](#iindicatorama) | Method | Creates an Adaptive Moving Average (AMA) indicator. |
| `CreateIndicatorDEMA` | [`IIndicatorDEMA`](#iindicatordema) | Method | Creates a Double Exponential Moving Average (DEMA) indicator. |
| `CreateIndicatorMomentum` | [`IIndicatorMomentum`](#iindicatormomentum) | Method | Creates a Momentum indicator. |
| `CreateIndicatorADX` | [`IIndicatorADX`](#iindicatoradx) | Method | Creates an Average Directional Index (ADX) indicator for measuring trend strength. |
| `CreateIndicatorBollingerBands` | [`IIndicatorBollingerBands`](#iindicatorbollingerbands) | Method | Creates a Bollinger Bands indicator. |
| `CreateIndicatorBollingerPercentB` | [`IIndicatorBollingerPercentB`](#iindicatorbollingerpercentb) | Method | Creates a Bollinger Bands %B indicator. |
| `CreateIndicatorBollingerBandWidth` | [`IIndicatorBollingerBandWidth`](#iindicatorbollingerbandwidth) | Method | Creates a Bollinger Band Width indicator. |
| `CreateIndicatorSmoothedRSI` | [`IIndicator`](#iindicator) | Method | Creates a Smoothed RSI indicator (RSI smoothed by MA). |
| `CreateIndicatorDiff` | [`IIndicatorDiff`](#iindicatordiff) | Method | Creates a Difference indicator between two data sources. |
| `CreateIndicatorMASpread` | [`IIndicator`](#iindicator) | Method | Creates an MA Spread indicator (difference between two MAs). |
| `CreateIndicatorPriceHTFDiff` | [`IIndicator`](#iindicator) | Method | Creates an indicator for the distance between the current price and a higher timeframe MA. |
| `CreateCustomIndicator` | [`IIndicator`](#iindicator) | Method | Creates a custom indicator loaded from an external plugin DLL. |
| `GetCurrentTime` | `DateTime` | Method | Gets the current system time. |

### ITradeClient

Interface for trading operations, including order placement, management, position handling, and trade history retrieval. Provides methods for interacting with trading endpoints, managing orders, positions, and retrieving trade-related data.

| Member | Type | Kind | Description |
|---|---|---|---|
| `PlaceOrderAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`OrderPlaceResponse`](./models.md#orderplaceresponse)&gt;&gt; | Method | Places a new trading order (Limit/Market, etc.). |
| `PlaceAlgoOrderAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`AlgoOrderResponse`](./models.md#algoorderresponse)&gt;&gt; | Method | Places an Algo order (Take Profit/Stop Loss, Trailing Stop, Trigger Order, etc.). |
| `ClosePositionAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`ClosePositionResponse`](./models.md#closepositionresponse)&gt;&gt; | Method | Closes an open position. |
| `OrderCheckAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`CheckOrderResponse`](./models.md#checkorderresponse)&gt;&gt; | Method | Checks a potential order (pre-trade check) without actually placing it. |
| `GetOrderAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`Order`](./models.md#order)&gt;&gt; | Method | Gets detailed information for a single order. |
| `GetOrdersAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`Order`](./models.md#order)[]&gt;&gt; | Method | Gets a list of all open (live/partially filled) orders. |
| `GetAlgoOrdersAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`AlgoOrder`](./models.md#algoorder)[]&gt;&gt; | Method | Gets a list of pending Algo orders. |
| `GetPositionsAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`Position`](./models.md#position)[]&gt;&gt; | Method | Gets a list of open positions. |
| `AmendOrderAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`OrderAmendResponse`](./models.md#orderamendresponse)&gt;&gt; | Method | Amends an open order. |
| `AmendAlgoOrderAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`AlgoOrderAmendResponse`](./models.md#algoorderamendresponse)&gt;&gt; | Method | Amends a pending Algo order. |
| `CancelOrderAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`OrderCancelResponse`](./models.md#ordercancelresponse)&gt;&gt; | Method | Cancels an open order. |
| `CancelMultipleOrdersAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`OrderCancelResponse`](./models.md#ordercancelresponse)[]&gt;&gt; | Method | Cancels multiple open orders at once. |
| `CancelAlgoOrderAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`AlgoOrderResponse`](./models.md#algoorderresponse)&gt;&gt; | Method | Cancels one or more Algo orders. |
| `GetAlgoOrderAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`AlgoOrder`](./models.md#algoorder)&gt;&gt; | Method | Gets detailed information for an Algo order. |
| `GetHistoryOrdersAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`Order`](./models.md#order)[]&gt;&gt; | Method | Gets the history of closed or canceled orders. Retrieves up to 7 days of data. For longer history, use the GetHistoryOrdersArchiveAsync endpoint for archived data. |
| `GetOrdersArchiveAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`Order`](./models.md#order)[]&gt;&gt; | Method | Gets the history of closed or canceled orders from archived data. Use when more than 3 months of data is needed. |
| `GetClosePositionsAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`ClosingPosition`](./models.md#closingposition)[]&gt;&gt; | Method | Gets the history of closed positions. Retrieves up to 3 months of data. For longer history, use the GetPositionArchiveAsync endpoint for archived data. |
| `GetUserTradeAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`Transaction`](./models.md#transaction)[]&gt;&gt; | Method | Gets the history of matched trades (fills). |
| `GetUserTradesArchiveAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`Transaction`](./models.md#transaction)[]&gt;&gt; | Method | Gets the history of matched trades (fills) from archived data. Use when more than 3 months of data is needed. |
| `DisableLogApiEndPoint` | `void` | Method | Disables logging for specified API endpoints. |


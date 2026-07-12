---
id: interfaces
title: Interfaces
sidebar_position: 12
---

# Interfaces

## Client

### IAccountClient

Interface for account clients, providing methods to query trading account information.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetBalances` | [`AccountBalance`](./models.md#accountbalance)? | Method | Gets detailed information about the trading account balance. |
| `WalletBalance` | `decimal` | Property | Gets the total actual wallet balance (excluding unrealized PnL). |
| `AvailableBalance` | `decimal` | Property | Gets the available balance that can be used to open new positions. |
| `Equity` | `decimal` | Property | Gets the account equity (Wallet Balance + Unrealized PnL). |
| `UnrealizedPnL` | `decimal` | Property | Gets the total unrealized profit and loss (PnL) from open positions. |
| `InitialMargin` | `decimal` | Property | Gets the total initial margin currently in use. |
| `GetLeverage` | `decimal` | Method | Gets the current leverage for a specific contract. |
| `IsHedgeMode` | `bool` | Method | Checks if the account is currently in Hedge Mode. |
| `GetFeeLevelAsync` | Task&lt;[`ApiResult`](./models.md#apiresult)&lt;[`FeeVipLevel`](./enums.md#feeviplevel)&gt;&gt; | Method | Gets information about the account's trading fee VIP level. |
| `GetCurrentEquity` | `decimal` | Method | Gets the current equity value of the account. |
| `GetEquityChangePercentage` | `decimal` | Method | Calculates the percentage change in equity compared to a reference point. |
| `GetMarginRatio` | `decimal` | Method | Calculates the margin ratio. Positions may be liquidated if this reaches 100%. |
| `GetCurrentDrawdown` | `decimal` | Method | Calculates the current account drawdown compared to the equity peak. |

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
| `GetPrecisionPrice` | `int` | Method | Gets the price precision (number of decimal places) for the specified symbol. |
| `GetPrecisionLot` | `int` | Method | Gets the lot size precision (number of decimal places) for the specified symbol. |
| `GetTickPrice` | `decimal` | Method | Gets the tick size (minimum price increment) for the specified symbol. |
| `GetLimitMaxCost` | `decimal` | Method | Gets the maximum allowed cost for an order for the specified symbol. |
| `GetFeeTaker` | `decimal` | Method | Gets the taker trading fee for the specified symbol. |
| `GetFeeMaker` | `decimal` | Method | Gets the maker trading fee for the specified symbol. |
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
| `BarsCalculated` | `int` | Method | Counts the number of bars calculated for a specific indicator. |
| `Bars` | `int` | Method | Gets the total number of bars available for a trading pair and timeframe. |
| `GetTime` | `DateTime` | Method | Gets the timestamp of the candle at the specified shift for a given timeframe. Shift 0 corresponds to the current forming candle, shift 1 is the last closed candle, and so on. |
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
| `GetCurrentTime` | `DateTime` | Method | Gets the current system time. |

### ITradeClient

Interface for trading operations, including order placement, management, position handling, and trade history retrieval. Provides methods for interacting with trading endpoints, managing orders, positions, and retrieving trade-related data.

| Member | Type | Kind | Description |
|---|---|---|---|
| `DisableLogApiEndPoint` | `void` | Method | Disables logging for specified API endpoints. |

## Drawing

### IDrawingManager

Defines the contract for managing drawing objects (lines, shapes, text, etc.) within the trading workspace.

| Member | Type | Kind | Description |
|---|---|---|---|
| `Add` | `string` | Method | Adds a new drawing object to the manager. |
| `Remove` | `void` | Method | Removes a drawing object by its unique identifier. |
| `Update` | `void` | Method | Updates an existing drawing object by applying a mutation action. |
| `GetAll` | IReadOnlyList&lt;[`DrawingObject`](./models.md#drawingobject)&gt; | Method | Retrieves all drawing objects for a specific symbol and timeframe. |
| `GetById` | [`DrawingObject`](./models.md#drawingobject)? | Method | Retrieves a specific drawing object by its unique identifier. |

## Indicators

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
| `OnCalculate` | `int` | Method | Calculates the indicator values for a complete OHLCV data set. |
| `GetIndicatorId` | `string` | Method | Gets the unique identifier for the indicator instance. |
| `GetDisplayName` | `string` | Method | Gets the display name for the indicator. |
| `GetBuffer` | [`IIndicatorBuffer`](#iindicatorbuffer) | Method | Gets an indicator buffer by its index. |

### IIndicatorAC

Defines the contract for an Accelerator Oscillator (AC) indicator.

### IIndicatorAD

Defines the contract for an Accumulation/Distribution (AD) indicator.

### IIndicatorADX

Defines the contract for an Average Directional Index (ADX) indicator.

### IIndicatorADXW

Defines the contract for an ADX indicator with Wilder's smoothing (ADXW).

| Member | Type | Kind | Description |
|---|---|---|---|
| `IsBearishCrossover` | `bool` | Method | Determines if a bearish crossover (-DI crosses above +DI) has occurred. |
| `IsBullishCrossover` | `bool` | Method | Determines if a bullish crossover (+DI crosses above -DI) has occurred. |

### IIndicatorAlligator

Defines the contract for a Williams Alligator indicator.

### IIndicatorAMA

Defines the interface for an Adaptive Moving Average (AMA) indicator.

### IIndicatorAO

Defines the contract for an Awesome Oscillator (AO) indicator.

### IIndicatorATR

Defines the contract for an Average True Range (ATR) indicator.

### IIndicatorBears

Defines the contract for a Bears Power indicator.

### IIndicatorBollingerBands

Defines the contract for a Bollinger Bands indicator.

### IIndicatorBollingerBandWidth

Defines the contract for a Bollinger Band Width indicator.

### IIndicatorBollingerPercentB

Defines the contract for a Bollinger Bands %B indicator.

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

### IIndicatorCCI

Defines the contract for a Commodity Channel Index (CCI) indicator.

### IIndicatorChaikin

Defines the contract for a Chaikin Oscillator indicator.

### IIndicatorDEMA

Defines the contract for a Double Exponential Moving Average (DEMA) indicator.

### IIndicatorDeMarker

Defines the contract for a DeMarker indicator.

### IIndicatorDiff

Defines the contract for a Difference indicator.

### IIndicatorEnvelopes

Defines the contract for envelope-based technical indicators (e.g., Moving Average Envelopes).

| Member | Type | Kind | Description |
|---|---|---|---|
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
| `RegisterCustom` | `void` | Method | Registers a custom indicator and its parameter definitions. |
| `SetCustomParameterDefs` | `void` | Method | Sets or replaces the parameter definitions for a custom indicator. |
| `UnregisterCustom` | `bool` | Method | Removes a custom indicator registration by name. |
| `CreateIndicator` | [`IIndicator`](#iindicator) | Method | Creates an indicator instance for the specified configuration. |

### IIndicatorForce

Defines the contract for a Force Index indicator.

### IIndicatorFractals

Defines the contract for a Williams Fractals indicator.

### IIndicatorGator

Defines the contract for a Gator Oscillator indicator.

### IIndicatorIchimoku

Defines the contract for an Ichimoku Kinko Hyo indicator.

### IIndicatorMA

Defines the contract for a moving average indicator that provides trend analysis and crossover detection functionality.

| Member | Type | Kind | Description |
|---|---|---|---|
| `DetectCrossover` | [`MACrossoverType`](./enums.md#macrossovertype) | Method | Determines the type of crossover event between the specified fast and slow moving average indicators. |

### IIndicatorMACD

Defines the contract for a Moving Average Convergence Divergence (MACD) indicator.

### IIndicatorManager

Manages the lifecycle, registration, and data access for technical indicators.

| Member | Type | Kind | Description |
|---|---|---|---|
| `RegisterIndicator` | `string` | Method | Registers an indicator instance and assigns it a unique identifier. |
| `GetIndicatorBuffer` | [`IIndicatorBuffer`](#iindicatorbuffer)? | Method | Retrieves a specific buffer for a registered indicator. |
| `GetIndicatorBufferValueAtTime` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Retrieves an indicator's buffer value at a specific timestamp. |
| `GetIndicators` | IReadOnlyList&lt;[`IIndicator`](#iindicator)&gt; | Method | Gets a list of all registered indicators. |
| `GetIndicator` | [`IIndicator`](#iindicator)? | Method | Retrieves an indicator instance by its unique identifier. |
| `UnregisterIndicator` | `void` | Method | Unregisters an indicator and cleans up its associated resources. |

### IIndicatorMethodCommon

Provides common access methods for retrieving indicator values from one or more internal buffers.

| Member | Type | Kind | Description |
|---|---|---|---|
| `GetAt` | [`IndicatorValue`](./models.md#indicatorvalue) | Method | Gets the indicator value at the specified index from a specific buffer. |
| `GetRange` | IEnumerable&lt;[`IndicatorValue`](./models.md#indicatorvalue)&gt; | Method | Gets a sequence of indicator values from a specific buffer. |

### IIndicatorMFI

Defines the contract for a Money Flow Index (MFI) indicator.

### IIndicatorMomentum

Defines the contract for a Momentum indicator.

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
| `Register` | `void` | Method | Registers an indicator creator with parameter metadata. |

### IIndicatorRSI

Defines the contract for a Relative Strength Index (RSI) indicator.

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

### IIndicatorSuperTrend

Defines the contract for a SuperTrend indicator.

| Member | Type | Kind | Description |
|---|---|---|---|
| `HasBearishReversal` | `bool` | Method | Determines if there is a bearish reversal at the current index. |
| `HasBullishReversal` | `bool` | Method | Determines whether a bullish reversal pattern is present. |
| `IsBearish` | `bool` | Method | Determines whether the current market condition is bearish. |
| `IsBullish` | `bool` | Method | Determines whether the current market condition is bullish. |

### IIndicatorTEMA

Represents a Triple Exponential Moving Average (TEMA) indicator.

### IIndicatorTRIX

Defines the contract for a Triple Exponential Average (TRIX) indicator.

### IIndicatorVolumeSpike

Defines the contract for a Volume Spike indicator.

### IIndicatorVWAP

Defines the contract for a Volume Weighted Average Price (VWAP) indicator.

### IIndicatorWPR

Defines the contract for a Williams' Percent Range (WPR) indicator.

## Notifications

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
| `NotifyDocument` | `void` | Method | Sends a notification with a document attachment. |
| `NotifyError` | `void` | Method | Sends a notification for an error event. |
| `NotifyKeyValue` | `void` | Method | Sends a notification with key-value pairs. |
| `LogConsole` | `void` | Method | Logs a message to the console at a specific log level. |
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


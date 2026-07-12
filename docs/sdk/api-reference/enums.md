---
id: enums
title: Enums
sidebar_position: 10
---

# Enums

## Clients

### AlgoActualSide

Actual side of an algorithmic trigger.

| Value | Description |
|---|---|
| `StopLoss` | Stop-loss leg. |
| `TakeProfit` | Take-profit leg. |

### AlgoOrderState

OKX algorithmic order lifecycle states.

| Value | Description |
|---|---|
| `Live` | The order is active. |
| `Pause` | The order is paused. |
| `Effective` | The order has taken effect. |
| `PartiallyEffective` | The order has partially taken effect. |
| `Canceled` | The order has been canceled. |
| `Failed` | The order failed. |

### AlgoOrderType

OKX algorithmic order types exposed by the SDK mapper layer.

| Value | Description |
|---|---|
| `Conditional` | A conditional take-profit or stop-loss order. |
| `OCO` | One-cancels-the-other order. |
| `Trigger` | Trigger order. |
| `TrailingOrder` | Trailing order. |
| `Iceberg` | Iceberg order. |
| `TWAP` | Time-weighted average price order. |
| `Chase` | Chase order. |

### AlgoPriceType

Price sources used by OKX algorithmic orders.

| Value | Description |
|---|---|
| `Last` | Last traded price. |
| `Index` | Index price. |
| `Mark` | Mark price. |

### CheckUnitType

Currency unit transitions returned by OKX order checks.

| Value | Description |
|---|---|
| `BaseBoth` | Base currency before and after placing the order. |
| `BaseBeforeQuoteAfter` | Base currency before placing the order, quote currency after placing it. |
| `QuoteBeforeBaseAfter` | Quote currency before placing the order, base currency after placing it. |
| `QuoteBoth` | Quote currency before and after placing the order. |

### ClosingPositionType

Reasons or styles for closing a position.

| Value | Description |
|---|---|
| `ClosePartially` | Close part of the position. |
| `CloseAll` | Close the entire position. |
| `Liquidation` | Close caused by liquidation. |
| `PartialLiquidation` | Partial liquidation close. |
| `ADL` | Auto-deleveraging close. |

### FeeVipLevel

OKX fee VIP level.

| Value | Description |
|---|---|
| `Lv1` | Regular level 1 user. |
| `Lv2` | Regular level 2 user. |
| `Lv3` | Regular level 3 user. |
| `Lv4` | Regular level 4 user. |
| `Lv5` | Regular level 5 user. |
| `Lv6` | Regular level 6 user. |
| `Lv7` | Regular level 7 user. |
| `Lv8` | Regular level 8 user. |
| `Lv9` | Regular level 9 user. |
| `Lv10` | Regular level 10 user. |
| `VIP1` | VIP level 1 user. |
| `VIP2` | VIP level 2 user. |
| `VIP3` | VIP level 3 user. |
| `VIP4` | VIP level 4 user. |
| `VIP5` | VIP level 5 user. |

### MarginMode

Margin modes.

| Value | Description |
|---|---|
| `Cross` | Cross margin mode. |
| `Isolated` | Isolated margin mode. |
| `Cash` | Cash mode. |

### OhlcPattern

Intrabar OHLC path used when replaying candle data as ticks.

| Value | Description |
|---|---|
| `Auto` | Choose the path automatically from the candle direction. |
| `HighFirst` | Replay as Open, High, Low, Close. |
| `LowFirst` | Replay as Open, Low, High, Close. |
| `Random` | Choose a random path for each candle. |

### OrderFlowType

Order liquidity role.

| Value | Description |
|---|---|
| `Taker` | The order removed liquidity. |
| `Maker` | The order added liquidity. |

### OrderStatus

OKX order states.

| Value | Description |
|---|---|
| `Live` | The order is active. |
| `Canceled` | The order has been canceled. |
| `PartiallyFilled` | The order is partially filled. |
| `Filled` | The order is fully filled. |

### PositionMode

Account position mode.

| Value | Description |
|---|---|
| `LongShortMode` | Long and short positions are tracked separately. |
| `NetMode` | Positions are tracked as a single net position. |

### QuantityAsset

Quantity asset type for order placement.

| Value | Description |
|---|---|
| `BaseAsset` | Quantity is expressed in the base asset. |
| `QuoteAsset` | Quantity is expressed in the quote asset. |

### QuickMarginType

Quick margin behavior for margin orders.

| Value | Description |
|---|---|
| `Manual` | Manual borrow and repayment. |
| `AutoBorrow` | Automatically borrow when needed. |
| `AutoRepay` | Automatically repay when possible. |

### SelfTradePreventionMode

Self-trade prevention modes supported by OKX.

| Value | Description |
|---|---|
| `CancelMaker` | Cancel the maker order. |
| `CancelTaker` | Cancel the taker order. |
| `CancelBoth` | Cancel both maker and taker orders. |

### TickType

-

| Value | Description |
|---|---|
| `Open` | The opening tick of a candle (Open price). |
| `High` | The tick representing the highest price within the candle. |
| `Low` | The tick representing the lowest price within the candle. |
| `Close` | The closing tick of a candle (Close price). |
| `Mid` | An interpolated tick within the candle, not directly from market data. Used for simulation or smoothing between OHLC points. |
| `Realtime` | A tick received directly from a real-time market data stream. |

### TransactionType

OKX transaction types used by fills and account history mappers.

| Value | Description |
|---|---|
| `Unknown` | Unknown or unmapped transaction type. |
| `Buy` | Buy transaction. |
| `Sell` | Sell transaction. |
| `OpenLong` | Open long position. |
| `OpenShort` | Open short position. |
| `CloseLong` | Close long position. |
| `CloseShort` | Close short position. |
| `PartialLiqCloseLong` | Partial liquidation closing a long position. |
| `PartialLiqCloseShort` | Partial liquidation closing a short position. |
| `PartialLiqBuy` | Partial liquidation buy transaction. |
| `PartialLiqSell` | Partial liquidation sell transaction. |
| `LiqLong` | Liquidation of a long position. |
| `LiqShort` | Liquidation of a short position. |
| `LiqBuy` | Liquidation buy transaction. |
| `LiqSell` | Liquidation sell transaction. |
| `LiqTransferIn` | Liquidation transfer in. |
| `LiqTranferIn` | Deprecated misspelling of . |
| `LiqTransferOut` | Liquidation transfer out. |
| `LiqTranferOut` | Deprecated misspelling of . |
| `DeliveryLong` | Delivery transaction for a long position. |
| `DeliveryShort` | Delivery transaction for a short position. |
| `AdlCloseLong` | Auto-deleveraging close of a long position. |
| `AdlCloseShort` | Auto-deleveraging close of a short position. |
| `AdlBuy` | Auto-deleveraging buy transaction. |
| `AdlSell` | Auto-deleveraging sell transaction. |

### TriggerOrderKind

Order kind for trigger order legs.

| Value | Description |
|---|---|
| `Condition` | Conditional trigger order. |
| `Limit` | Limit trigger order. |

### TriggerPriceType

Trigger price source for conditional orders.

| Value | Description |
|---|---|
| `Last` | Last traded price. |
| `Index` | Index price. |
| `Mark` | Mark price. |

## Common

### ApiErrorType

SDK error classification used by API result wrappers.

| Value | Description |
|---|---|
| `Unknown` | Unknown or unclassified error. |
| `Network` | Network or connection error, such as timeout or DNS failure. |
| `InternalError` | Internal error within the SDK or application. |
| `ServerError` | The server returned a non-success HTTP status code. |
| `Authentication` | Authentication failed, such as invalid API key or signature mismatch. |
| `RateLimit` | The request was rate-limited by OKX. |
| `Deserialization` | The response could not be parsed because of an unexpected format. |
| `BusinessLogic` | Business logic error returned by OKX, such as insufficient funds. |

### ApiName

OKX API operation names used for logging and error context.

| Value | Description |
|---|---|
| `PlaceOrder` | Place an order. |
| `CancelOrder` | Cancel an order. |
| `CancelMultipleOrder` | Cancel multiple orders. |
| `ModifyOrder` | Modify an order. |
| `PlaceAlgoOrder` | Place an algorithmic order. |
| `CancelAlgoOrder` | Cancel an algorithmic order. |
| `ClosePosition` | Close a position. |
| `GetOrders` | Get open orders. |
| `GetPositions` | Get positions. |
| `GetAlgoOrder` | Get one algorithmic order. |
| `GetHistoryOrders` | Get historical orders. |
| `GetHistoryAlgoOrders` | Get historical algorithmic orders. |
| `GetHistoryPositions` | Get historical positions. |
| `GetUserTrade` | Get user trades. |
| `GetOrder` | Get one order. |
| `AmendAlgoOrder` | Amend an algorithmic order. |
| `AmendOrder` | Amend an order. |
| `GetAlgoOrders` | Get algorithmic orders. |
| `OrderCheck` | Check an order before placement. |
| `GetUserTradesArchive` | Get archived user trades. |
| `GetOrdersArchive` | Get archived orders. |

### InstrumentType

OKX instrument types.

| Value | Description |
|---|---|
| `Any` | Any supported instrument type. |
| `Spot` | Spot instrument. |
| `Margin` | Margin instrument. |
| `Swap` | Perpetual swap instrument. |
| `Futures` | Futures instrument. |
| `Option` | Option instrument. |
| `Contract` | Generic contract instrument. |

### OrderSide

Order direction.

| Value | Description |
|---|---|
| `Buy` | Buy order. |
| `Sell` | Sell order. |

### OrderType

OKX order types used by trading requests.

| Value | Description |
|---|---|
| `Market` | Market order. |
| `Limit` | Limit order. |
| `PostOnly` | Post-only order. |
| `FillOrKill` | Fill-or-kill order. |
| `ImmediateOrCancel` | Immediate-or-cancel order. |
| `OptimalLimitOrder` | Optimal limit order. |
| `MarketMakerProtection` | Market maker protection order. |
| `MarketMakerProtectionPostOnly` | Post-only market maker protection order. |
| `Elp` | Easy liquidity provider order. |

### PositionSide

Position side in long/short or net position mode.

| Value | Description |
|---|---|
| `Long` | Long position side. |
| `Short` | Short position side. |
| `Net` | Net position side. |

### PtLogLevel

Log severity used by OKX strategy and SDK components.

| Value | Description |
|---|---|
| `Critical` | Critical failure. |
| `Error` | Error. |
| `Warning` | Warning. |
| `Success` | Successful operation. |
| `Core` | Core system message. |
| `Information` | Informational message. |
| `Debug` | Debug message. |
| `Trace` | Trace message. |
| `None` | Logging is disabled. |

### Timeframe

Represents supported candlestick timeframes in seconds. The underlying integer value corresponds to the duration in seconds.

| Value | Description |
|---|---|
| `Unknown` | Unknown or unspecified timeframe. |
| `OneSecond` | One second (1 second). |
| `OneMinute` | One minute (60 seconds). |
| `ThreeMinutes` | Three minutes (180 seconds). |
| `FiveMinutes` | Five minutes (300 seconds). |
| `FifteenMinutes` | Fifteen minutes (900 seconds). |
| `ThirtyMinutes` | Thirty minutes (1800 seconds). |
| `OneHour` | One hour (3600 seconds). |
| `TwoHours` | Two hours (7200 seconds). |
| `FourHours` | Four hours (14400 seconds). |
| `SixHours` | Six hours (21600 seconds). |
| `TwelveHours` | Twelve hours (43200 seconds). |
| `OneDay` | One day (86400 seconds). |
| `OneWeek` | One week (604800 seconds). |
| `OneMonth` | One month (approximated as 30 days = 2592000 seconds). |
| `ThreeMonths` | Three months (approximated as 90 days). |
| `SixMonths` | Six months (approximated as 180 days). |
| `OneYear` | One year (approximated as 365 days). |

### TradeMode

OKX trade modes.

| Value | Description |
|---|---|
| `Cross` | Cross margin mode. |
| `Isolated` | Isolated margin mode. |
| `Cash` | Cash mode. |
| `Spot` | Spot mode. |

## Drawing

### DrawingChangeType

Specifies the type of change applied to a drawing object.

| Value | Description |
|---|---|
| `Added` | A new drawing object has been added. |
| `Updated` | An existing drawing object has been updated. |
| `Removed` | A drawing object has been removed. |

### DrawingLineStyle

Defines the visual style of a drawing line.

| Value | Description |
|---|---|
| `Solid` | Solid continuous line. |
| `Dashed` | Dashed line with spaced segments. |
| `Dotted` | Dotted line composed of small points. |

### DrawingObjectType

Defines the types of drawing objects that can be placed on a chart.

| Value | Description |
|---|---|
| `HorizontalLine` | Horizontal line drawn across the chart. |
| `VerticalLine` | Vertical line drawn across the chart. |
| `TrendLine` | Line drawn between two points to indicate a trend. |
| `Rectangle` | Rectangle shape used for highlighting areas. |
| `Ellipse` | Ellipse (oval) shape. |
| `Triangle` | Triangle shape defined by three points. |
| `FibRetracement` | Fibonacci retracement tool for identifying support and resistance levels. |
| `FibExtension` | Fibonacci extension tool for projecting price targets. |
| `Measurement` | Measurement tool for price and time distance. |
| `Text` | Text annotation. |
| `Arrow` | Arrow marker. |
| `Emoji` | Emoji or icon marker. |

### DrawingSource

Specifies the origin source of a drawing object.

| Value | Description |
|---|---|
| `User` | The drawing was created manually by the user. |
| `Strategy` | The drawing was generated automatically by a trading strategy or system. |

## Indicators

### AppliedPrice

Price field used as indicator input.

| Value | Description |
|---|---|
| `Close` | Close price. |
| `Open` | Open price. |
| `High` | High price. |
| `Low` | Low price. |
| `Median` | Median price, typically (High + Low) / 2. |
| `Typical` | Typical price, typically (High + Low + Close) / 3. |
| `Weighted` | Weighted price, typically (High + Low + Close + Close) / 4. |

### IndicatorBufferType

Type of data stored by an indicator buffer.

| Value | Description |
|---|---|
| `Data` | Main data buffer used for rendering or public output. |
| `ColorIndex` | Buffer that stores per-point color indexes. |
| `Calculations` | Internal calculation buffer that is not rendered directly. |

### IndicatorColor

Named colors available to indicator plot metadata.

| Value | Description |
|---|---|
| `None` | No color is specified. |
| `Transparent` | Transparent color. |
| `Black` | Black. |
| `White` | White. |
| `Gray` | Gray. |
| `Silver` | Silver. |
| `LightGray` | Light gray. |
| `DarkGray` | Dark gray. |
| `Red` | Red. |
| `Crimson` | Crimson. |
| `DarkRed` | Dark red. |
| `Maroon` | Maroon. |
| `Salmon` | Salmon. |
| `LightCoral` | Light coral. |
| `Green` | Green. |
| `DarkGreen` | Dark green. |
| `ForestGreen` | Forest green. |
| `LightGreen` | Light green. |
| `Lime` | Lime. |
| `SpringGreen` | Spring green. |
| `Olive` | Olive. |
| `Blue` | Blue. |
| `DarkBlue` | Dark blue. |
| `RoyalBlue` | Royal blue. |
| `LightBlue` | Light blue. |
| `SkyBlue` | Sky blue. |
| `Turquoise` | Turquoise. |
| `Navy` | Navy. |
| `Indigo` | Indigo. |
| `Cyan` | Cyan. |
| `Teal` | Teal. |
| `Aqua` | Aqua. |
| `Yellow` | Yellow. |
| `Gold` | Gold. |
| `Beige` | Beige. |
| `Khaki` | Khaki. |
| `Orange` | Orange. |
| `Coral` | Coral. |
| `Tomato` | Tomato. |
| `DarkOrange` | Dark orange. |
| `Purple` | Purple. |
| `Violet` | Violet. |
| `Plum` | Plum. |
| `Magenta` | Magenta. |
| `Pink` | Pink. |
| `Brown` | Brown. |
| `Chocolate` | Chocolate. |
| `Tan` | Tan. |

### IndicatorDrawType

Drawing primitives supported by indicator outputs.

| Value | Description |
|---|---|
| `Line` | Continuous line. |
| `Histogram` | Histogram bars. |
| `Dots` | Point markers. |
| `Arrow` | Arrow markers. |
| `Bar` | Vertical bars, such as OHLC or volume bars. |
| `Area` | Filled area under a line. |
| `Scatter` | Scatter plot points. |
| `Pie` | Pie chart segments. |
| `Candle` | Candlestick rendering. |
| `Icon` | Custom icon rendering. |
| `Shape` | Custom geometric shape rendering. |
| `Text` | Text labels on the chart. |
| `Custom` | Custom rendering handled by the host application. |

### IndicatorFillColorMode

Specifies how the fill color of an is determined.

| Value | Description |
|---|---|
| `Fixed` | Always uses a single fixed color, regardless of buffer values. |
| `BullishBearish` | Selects the color based on the relationship between buffer values. Uses when the upper buffer value is greater than or equal to the lower buffer value; otherwise uses . |

### IndicatorGroup

Indicator category used for grouping in UI and registration metadata.

| Value | Description |
|---|---|
| `TimeSeries` | Time-series indicator. |
| `Trend` | Trend indicator. |
| `Oscillator` | Oscillator indicator. |
| `Volume` | Volume indicator. |
| `BillWilliams` | Bill Williams indicator. |
| `BillWilliam` | Deprecated misspelling of . |
| `Custom` | Custom indicator group. |
| `Unknown` | Unknown indicator group. |

### IndicatorStyle

Line style for indicator plots.

| Value | Description |
|---|---|
| `Solid` | Solid line. |
| `Dashed` | Dashed line. |
| `Dotted` | Dotted line. |
| `DashDot` | Dash-dot line. |

### IndicatorType

Built-in and custom indicator identifiers used by the indicator factory.

| Value | Description |
|---|---|
| `AC` | Accelerator Oscillator. |
| `AD` | Accumulation/Distribution. |
| `ADX` | Average Directional Index. |
| `ADXW` | Average Directional Index Wilder. |
| `ALLIGATOR` | Williams Alligator. |
| `AMA` | Adaptive Moving Average. |
| `AO` | Awesome Oscillator. |
| `ATR` | Average True Range. |
| `BANDS` | Bollinger Bands. |
| `BANDSPERCENTB` | Bollinger Bands %B. |
| `BANDSWIDTH` | Bollinger Band Width. |
| `BEARS` | Bears Power. |
| `BULLS` | Bulls Power. |
| `BWMFI` | Bill Williams Market Facilitation Index. |
| `CCI` | Commodity Channel Index. |
| `CHAIKIN` | Chaikin Oscillator. |
| `CUSTOM` | Custom plugin indicator. |
| `DEMA` | Double Exponential Moving Average. |
| `DIFF` | Difference indicator. |
| `DEMARKER` | DeMarker indicator. |
| `ENVELOPES` | Envelopes indicator. |
| `FORCE` | Force Index. |
| `FRACTALS` | Williams Fractals. |
| `PRAMA` | Parametric Adaptive Moving Average. |
| `GATOR` | Gator Oscillator. |
| `ICHIMOKU` | Ichimoku Kinko Hyo. |
| `MA` | Moving Average. |
| `MACD` | Moving Average Convergence/Divergence. |
| `MFI` | Money Flow Index. |
| `MOMENTUM` | Momentum indicator. |
| `OBV` | On-Balance Volume. |
| `OSMA` | Moving Average of Oscillator. |
| `RSI` | Relative Strength Index. |
| `RVI` | Relative Vigor Index. |
| `SAR` | Parabolic SAR. |
| `STDDEV` | Standard Deviation. |
| `STOCHASTIC` | Stochastic Oscillator. |
| `TEMA` | Triple Exponential Moving Average. |
| `TRIX` | Triple Exponential Average. |
| `VIDYA` | Variable Index Dynamic Average. |
| `VOLUMES` | Volumes indicator. |
| `WPR` | Williams Percent Range. |
| `SUPERTREND` | SuperTrend indicator. |
| `VWAP` | Volume Weighted Average Price. |
| `VOLUMESPIKE` | Volume spike indicator. |

### IndicatorWindow

Chart window where an indicator should be displayed.

| Value | Description |
|---|---|
| `Main` | Render the indicator on the main price chart. |
| `Separate` | Render the indicator in a separate pane. |

### MACrossoverType

Type of moving-average crossover detected by helper methods.

| Value | Description |
|---|---|
| `None` | No crossover was detected. |
| `GoldenCross` | The fast line crossed above the slow line. |
| `DeathCross` | The fast line crossed below the slow line. |

### MaMethod

Moving average calculation method.

| Value | Description |
|---|---|
| `SMA` | Simple Moving Average. |
| `EMA` | Exponential Moving Average. |
| `SMMA` | Smoothed Moving Average. |
| `LWWMA` | Linear Weighted Moving Average. |

### MATrendDirection

Direction classification returned by moving-average helper methods.

| Value | Description |
|---|---|
| `Unknown` | The trend direction is not known. |
| `Upward` | The moving average is trending upward. |
| `Downward` | The moving average is trending downward. |
| `Sideways` | The moving average is moving sideways. |

### TimeFrameOptions

Bit flags for the timeframes where an indicator is available.

| Value | Description |
|---|---|
| `AllPeriods` | All supported periods. |
| `SixMonths` | - |
| `ThreeMonths` | - |
| `OneMonth` | - |
| `OneWeek` | - |
| `OneDay` | - |
| `TwelveHours` | - |
| `SixHours` | - |
| `FourHours` | - |
| `TwoHours` | - |
| `OneHour` | - |
| `ThirtyMinutes` | - |
| `FifteenMinutes` | - |
| `FiveMinutes` | - |
| `ThreeMinutes` | - |
| `OneMinute` | - |
| `None` | No periods are enabled. |
| `SixMonths` | Six-month period. |
| `ThreeMonths` | Three-month period. |
| `OneMonth` | One-month period. |
| `OneWeek` | One-week period. |
| `OneDay` | One-day period. |
| `TwelveHours` | Twelve-hour period. |
| `SixHours` | Six-hour period. |
| `FourHours` | Four-hour period. |
| `TwoHours` | Two-hour period. |
| `OneHour` | One-hour period. |
| `ThirtyMinutes` | Thirty-minute period. |
| `FifteenMinutes` | Fifteen-minute period. |
| `FiveMinutes` | Five-minute period. |
| `ThreeMinutes` | Three-minute period. |
| `OneMinute` | One-minute period. |

## Notifier

### TradeAction

Commands that can be sent to a strategy.

| Value | Description |
|---|---|
| `Close` | Close the active position or order context. |
| `Details` | Return detailed strategy state. |
| `Balance` | Return account balance information. |
| `Metrics` | Return strategy metrics. |
| `Status` | Return current strategy status. |
| `PauseTrading` | Pause trading. |
| `ResumeTrading` | Resume trading. |
| `Configure` | Configure strategy settings. |
| `Shutdown` | Shutdown the strategy. |
| `Logs` | Return recent logs. |
| `UploadLogs` | Upload logs. |
| `Custom` | Custom action handled by a plugin or strategy-specific command handler. |

## Storage

### StoragePathScope

Defines logical storage path categories used by the system to organize different types of runtime and persistent data.

| Value | Description |
|---|---|
| `RuntimeDataRoot` | Root directory for all runtime data. |
| `Histories` | Historical market data storage. |
| `Logs` | General log files. |
| `Backtest` | Backtesting data output. |
| `Live` | Live trading runtime data. |
| `BacktestLogs` | Log files generated during backtesting. |
| `LiveLogs` | Log files generated during live trading. |
| `State` | Persistent runtime state (snapshots, checkpoints). |
| `Cache` | Temporary cached data for performance optimization. |
| `Exports` | Exported data such as reports, CSV files, or user outputs. |
| `IndicatorPlugins` | Folder containing custom technical indicators plugins. |
| `StrategyPlugins` | Folder containing custom trading strategies plugins. |

## Strategy

### DateOption

Preset date ranges used by backtests and data queries.

| Value | Description |
|---|---|
| `Entry` | Use the configured entry date. |
| `LastYear` | Use the last year. |
| `ThreeMonth` | Use the last three months. |
| `SixMonth` | Use the last six months. |
| `LastMonth` | Use the last month. |
| `Custom` | Use a custom date range. |

### InputParamDataType

Specifies a specialized data type for parameters when property type alone is insufficient.

| Value | Description |
|---|---|
| `Auto` | Infer from property type. |
| `FilePath` | Treat a string property as a file path. |

### PriceDataOption

Price data granularity used by simulation and replay.

| Value | Description |
|---|---|
| `EveryTick` | Use every tick. |
| `OneMinuteOHLC` | Use one-minute OHLC candles. |

### StrategyEventType

Event types used internally by engines for dispatch.

| Value | Description |
|---|---|
| `Order` | Order update event. |
| `Balance` | Balance update event. |
| `Position` | Position update event. |
| `AlgoOrder` | Algorithmic order update event. |
| `Kline` | Kline or candle close event. Mapped to when invoking OnTickAsync. |
| `Transaction` | Transaction update event. |
| `TradeCommand` | Trade command event from Telegram or another external source. |
| `Tick` | Intra-bar tick event. Mapped to when invoking OnTickAsync. |

### TickPhase

Indicates whether OnTickAsync was triggered by an intra-bar tick or a closed bar.

| Value | Description |
|---|---|
| `Tick` | Intra-bar tick update. |
| `BarClose` | Closed bar/candle update. |


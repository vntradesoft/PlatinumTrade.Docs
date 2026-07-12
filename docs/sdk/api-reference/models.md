---
id: models
title: Models
sidebar_position: 11
---

# Models

## Account

### AccountBalance

Represents the total trading account balance information.

| Property | Type | Description |
|---|---|---|
| `UpdateTime` | `DateTime` | Represents the total trading account balance information. public record AccountBalance { Gets or sets the update time of the balance. |
| `TotalEquity` | `decimal` | Gets or sets the total equity of the account. |
| `AvailableEquity` | `decimal?` | Gets or sets the available equity. |
| `IsolatedMarginEquity` | `decimal?` | Gets or sets the isolated margin equity. |
| `AdjustedEquity` | `decimal?` | Gets or sets the adjusted equity. |
| `BorrowFrozen` | `decimal?` | Gets or sets the frozen borrow quantity. |
| `OrderFrozen` | `decimal?` | Gets or sets the order frozen amount. |
| `InitialMarginRequirement` | `decimal?` | Gets or sets the initial margin requirement. |
| `MaintenanceMarginRequirement` | `decimal?` | Gets or sets the maintenance margin requirement. |
| `MarginRatio` | `decimal?` | Gets or sets the margin ratio. |
| `NotionalUsd` | `decimal?` | Gets or sets the total notional value in USD. |
| `UnrealizedPnl` | `decimal?` | Gets or sets the unrealized profit and loss (PnL) in USD at the account level. |
| `Details` | `IReadOnlyList&lt;AccountBalanceDetail&gt;` | Gets or sets the list of detailed asset balances. |

### AccountBalanceDetail

Represents detailed information for a specific asset within the trading account.

| Property | Type | Description |
|---|---|---|
| `Asset` | `string` | Represents detailed information for a specific asset within the trading account. public record AccountBalanceDetail { Gets or sets the asset ticker (e.g., "BTC"). |
| `Available` | `decimal?` | Gets or sets the available balance for this asset. |
| `InitialMargin` | `decimal?` | Gets or sets the initial margin for this asset. |
| `Equity` | `decimal?` | Gets or sets the equity value of this asset. |
| `UnrealizedPnl` | `decimal?` | Gets or sets the unrealized PnL for this asset. |
| `UpdateTime` | `DateTime` | Gets or sets the update time for this asset balance. |
| `CashBalance` | `decimal?` | Gets or sets the cash balance for this asset. |
| `MaintenanceMarginRequirement` | `decimal?` | Gets or sets the maintenance margin requirement for this asset. |
| `MarginRatio` | `decimal?` | Gets or sets the margin ratio for this asset. |

## Trading

### AlgoOrder

Represents an algorithmic order in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `InstrumentType` | `InstrumentType` | Represents an algorithmic order in the OKX trading system. public record AlgoOrder { The type of the instrument. |
| `Symbol` | `string` | The trading symbol (e.g., BTC-USDT). |
| `Asset` | `string` | The asset or currency base for the order. |
| `OrderId` | `long?` | The unique identifier for the order, if available. |
| `AlgoId` | `string?` | The list of associated order identifiers. #pragma warning disable CA1819 public long[]? OrderIdList { get; set; } #pragma warning disable CA1819 The unique identifier for the algorithmic order. |
| `ClientOrderId` | `string?` | The client-defined unique identifier for the order. |
| `Quantity` | `decimal?` | The quantity of the asset to be traded. |
| `CloseFraction` | `decimal?` | The fraction of the position to be closed. |
| `OrderType` | `AlgoOrderType` | The type of the algorithmic order. |
| `OrderSide` | `OrderSide` | The side of the order (Buy/Sell). |
| `PositionSide` | `PositionSide?` | The position side (e.g., Long/Short). |
| `TradeMode` | `TradeMode` | The trade mode (e.g., Cash/Margin). |
| `State` | `AlgoOrderState` | The current state of the algorithmic order. |
| `Leverage` | `decimal?` | The leverage to be applied to the order. |
| `TakeProfitTriggerPrice` | `decimal?` | The take-profit trigger price. |
| `TakeProfitTriggerPriceType` | `TriggerPriceType?` | The type of take-profit trigger price. |
| `TakeProfitOrderPrice` | `decimal?` | The price of the take-profit order. |
| `StopLossTriggerPrice` | `decimal?` | The stop-loss trigger price. |
| `StopLossTriggerPriceType` | `TriggerPriceType?` | The type of stop-loss trigger price. |
| `StopLossOrderPrice` | `decimal?` | The price of the stop-loss order. |
| `TriggerPrice` | `decimal?` | The trigger price for the order. |
| `TriggerPriceType` | `TriggerPriceType?` | The type of trigger price. |
| `ActualOrderQuantity` | `decimal?` | The actual quantity executed for the order. |
| `ActualOrderPrice` | `decimal?` | The actual price executed for the order. |
| `Tag` | `string?` | A custom tag for the order. |
| `ActualSide` | `AlgoActualSide?` | The actual side of the order execution. |
| `TriggerTime` | `DateTime?` | The time when the order was triggered. |
| `ReduceOnly` | `bool` | Whether the order is for reducing the position only. |
| `LastPrice` | `decimal?` | The last market price of the asset. |
| `FailCode` | `string?` | The failure code, if the order failed. |
| `AlgoClientOrderId` | `string?` | The algorithmic client-defined unique identifier for the order. |
| `TradeQuoteAsset` | `string?` | The trade quote asset used for the order. |
| `CreateTime` | `DateTime` | The time when the order was created. |
| `UpdateTime` | `DateTime?` | The time when the order was last updated. |
| `IsLinkPos` | `bool?` | Whether the position is linked to this order. |

### AlgoOrderUpdate

Represents an update to an algorithmic order in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `AmendResult` | `string?` | Represents an update to an algorithmic order in the OKX trading system. public record AlgoOrderUpdate : AlgoOrder { The result of the amendment. |
| `AmendSource` | `string?` | The source of the amendment. |
| `NotionalUsd` | `decimal?` | The notional value of the update in USD. |
| `RequestId` | `string?` | The request identifier associated with the update. |
| `AlgoOrderCount` | `int?` | The count of algorithmic orders. |
| `PushTime` | `DateTime?` | The time when the update was pushed. |

### ClosePositionResponse

Represents the response received after attempting to close a position in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `Symbol` | `string` | Represents the response received after attempting to close a position in the OKX trading system. public record ClosePositionResponse { The trading symbol (e.g., BTC-USDT). |
| `PositionSide` | `PositionSide` | The side of the position to close (e.g., Long/Short). |
| `ClientOrderId` | `string?` | The client-defined unique identifier for the order. |
| `Tag` | `string?` | A custom tag associated with the close position request. |

### ClosingPosition

Represents a closed position in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `InstrumentType` | `InstrumentType` | Represents a closed position in the OKX trading system. public record ClosingPosition { The type of the instrument. |
| `Symbol` | `string` | The trading symbol (e.g., BTC-USDT). |
| `MarginMode` | `MarginMode` | The margin mode of the position. |
| `Type` | `ClosingPositionType` | The type of closing position. |
| `CreateTime` | `DateTime` | The time when the position was created. |
| `UpdateTime` | `DateTime` | The time when the position was last updated. |
| `OpenAveragePrice` | `decimal?` | The average opening price of the position. |
| `CloseAveragePrice` | `decimal?` | The average closing price of the position. |
| `PositionId` | `long?` | The unique identifier of the position. |
| `OpenMaxPos` | `decimal?` | The maximum position quantity opened. |
| `CloseTotalPos` | `decimal?` | The total quantity closed for the position. |
| `RealizedPnl` | `decimal?` | The realized profit and loss of the position. |
| `PnlRatio` | `decimal?` | The profit and loss ratio. |
| `Fee` | `decimal?` | The fee incurred for the position. |
| `FundingFee` | `decimal?` | The funding fee incurred. |
| `LiquidationPenalty` | `decimal?` | The liquidation penalty incurred. |
| `ProfitAndLoss` | `decimal?` | The overall profit and loss of the position. |
| `PositionSide` | `PositionSide` | The position side. |
| `Leverage` | `decimal?` | The leverage applied to the position. |
| `Direction` | `PositionSide` | The direction of the position. |
| `TriggerMarkPrice` | `decimal?` | The trigger mark price for the position. |
| `Underlying` | `string` | The underlying asset of the position. |
| `Asset` | `string?` | The asset used for the position. |

### Order

Represents an order in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `InstrumentType` | `InstrumentType` | Represents an order in the OKX trading system. public record Order { The type of the instrument. |
| `Symbol` | `string` | The trading symbol (e.g., BTC-USDT). |
| `Asset` | `string` | The asset or currency base for the order. |
| `OrderId` | `long?` | The unique identifier for the order. |
| `ClientOrderId` | `string?` | The client-defined unique identifier for the order. |
| `Tag` | `string` | A custom tag for the order. |
| `Price` | `decimal?` | The price of the order. |
| `Quantity` | `decimal?` | The quantity of the asset to be traded. |
| `ProfitAndLoss` | `decimal?` | The profit and loss of the order. |
| `OrderType` | `OrderType` | The type of the order. |
| `OrderSide` | `OrderSide` | The side of the order (Buy/Sell). |
| `PositionSide` | `PositionSide?` | The position side (e.g., Long/Short). |
| `TradeMode` | `TradeMode` | The trade mode (e.g., Cash/Margin). |
| `AccumulatedFillQuantity` | `decimal?` | The accumulated filled quantity for the order. |
| `FillPrice` | `decimal?` | The price at which the order was filled. |
| `TradeId` | `long?` | The unique identifier of the trade. |
| `QuantityFilled` | `decimal?` | The quantity filled for the order. |
| `FillTime` | `DateTime?` | The time when the order was filled. |
| `AveragePrice` | `decimal?` | The average price of the filled order. |
| `OrderState` | `OrderStatus` | The status of the order. |
| `SelfTradePreventionMode` | `SelfTradePreventionMode?` | The self-trade prevention mode. |
| `Leverage` | `decimal?` | The leverage applied to the order. |
| `AttachAlgoCllientOrderId` | `string?` | The client-defined unique identifier of the attached algorithmic order. |
| `TakeProfitTriggerPrice` | `decimal?` | The take-profit trigger price. |
| `TakeProfitOrderPrice` | `decimal?` | The price of the take-profit order. |
| `TakeProfitTriggerPriceType` | `TriggerPriceType?` | The type of take-profit trigger price. |
| `StopLossTriggerPrice` | `decimal?` | The stop-loss trigger price. |
| `StopLossTriggerPriceType` | `TriggerPriceType?` | The type of stop-loss trigger price. |
| `StopLossOrderPrice` | `decimal?` | The price of the stop-loss order. |
| `Source` | `string` | The source of the order. |
| `ReduceOnly` | `bool` | Whether the order is for reducing the position only. |
| `IsTakeProfitLimit` | `bool?` | Whether the order is a take-profit limit order. |
| `AlgoClientOrderId` | `string?` | The algorithmic client-defined unique identifier for the order. |
| `AlgoId` | `string?` | The unique identifier for the algorithmic order. |
| `FeeAsset` | `string` | The asset used for the fee. |
| `Fee` | `decimal?` | The fee incurred for the order. |
| `LastPrice` | `decimal?` | The last market price of the asset. |
| `TradeQuoteAsset` | `string` | The trade quote asset used for the order. |
| `CreateTime` | `DateTime` | The time when the order was created. |
| `UpdateTime` | `DateTime` | The time when the order was last updated. |

### OrderPlaceResponse

Represents the response after placing an order.

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### AlgoOrderResponse

Represents the response after placing an order. public record OrderPlaceResponse { Order id public long? OrderId { get; set; } Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string Tag { get; set; } = string.Empty; Code public int Code { get; set; } Message public string Message { get; set; } = string.Empty; Sub code public string SubCode { get; set; } = string.Empty; Timestamp public DateTime? Timestamp { get; set; } Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order.

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### CheckOrderResponse

Represents the response after placing an order. public record OrderPlaceResponse { Order id public long? OrderId { get; set; } Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string Tag { get; set; } = string.Empty; Code public int Code { get; set; } Message public string Message { get; set; } = string.Empty; Sub code public string SubCode { get; set; } = string.Empty; Timestamp public DateTime? Timestamp { get; set; } Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>algoClOrdId</c>"] Algo client order id public string? AlgoClientOrderId { get; set; } Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; Whether order placement was successful public bool Success => Code == 0; } Check order info

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### OrderAmendResponse

Represents the response after placing an order. public record OrderPlaceResponse { Order id public long? OrderId { get; set; } Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string Tag { get; set; } = string.Empty; Code public int Code { get; set; } Message public string Message { get; set; } = string.Empty; Sub code public string SubCode { get; set; } = string.Empty; Timestamp public DateTime? Timestamp { get; set; } Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>algoClOrdId</c>"] Algo client order id public string? AlgoClientOrderId { get; set; } Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD public decimal AdjustedEquity { get; set; } ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD public decimal AdjustedEquityChange { get; set; } ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off public decimal AvailableBalance { get; set; } ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off public decimal AvailableBalanceChange { get; set; } ["<c>imr</c>"] Current initial margin requirement in USD public decimal InitialMarginRequirement { get; set; } ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD public decimal InitialMarginRequirementChange { get; set; } ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities public decimal Liabilities { get; set; } ["<c>liabChg</c>"] After placing order, changed quantity of liabilities public decimal LiabilitiesChange { get; set; } ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow public string? LiabilitiesChangeAsset { get; set; } ["<c>liqPx</c>"] Current estimated liquidation price public decimal LiquidationPrice { get; set; } ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price public string LiquidationPriceDifference { get; set; } = string.Empty; ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price public decimal LiquidationPriceDifferenceRatio { get; set; } ["<c>mgnRatio</c>"] Current margin ratio in USD public decimal MarginRatio { get; set; } ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD public decimal MarginRatioChange { get; set; } ["<c>mmr</c>"] Current Maintenance margin requirement in USD public decimal MaintenanceMarginRequirement { get; set; } ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD public decimal MaintenanceMarginRequirementChange { get; set; } ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position public string? PositionBalance { get; set; } ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position public string? PositionBalanceChange { get; set; } ["<c>type</c>"] Unit type public CheckUnitType? Type { get; set; } } Order amend response

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### AlgoOrderAmendResponse

Represents the response after placing an order. public record OrderPlaceResponse { Order id public long? OrderId { get; set; } Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string Tag { get; set; } = string.Empty; Code public int Code { get; set; } Message public string Message { get; set; } = string.Empty; Sub code public string SubCode { get; set; } = string.Empty; Timestamp public DateTime? Timestamp { get; set; } Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>algoClOrdId</c>"] Algo client order id public string? AlgoClientOrderId { get; set; } Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD public decimal AdjustedEquity { get; set; } ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD public decimal AdjustedEquityChange { get; set; } ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off public decimal AvailableBalance { get; set; } ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off public decimal AvailableBalanceChange { get; set; } ["<c>imr</c>"] Current initial margin requirement in USD public decimal InitialMarginRequirement { get; set; } ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD public decimal InitialMarginRequirementChange { get; set; } ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities public decimal Liabilities { get; set; } ["<c>liabChg</c>"] After placing order, changed quantity of liabilities public decimal LiabilitiesChange { get; set; } ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow public string? LiabilitiesChangeAsset { get; set; } ["<c>liqPx</c>"] Current estimated liquidation price public decimal LiquidationPrice { get; set; } ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price public string LiquidationPriceDifference { get; set; } = string.Empty; ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price public decimal LiquidationPriceDifferenceRatio { get; set; } ["<c>mgnRatio</c>"] Current margin ratio in USD public decimal MarginRatio { get; set; } ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD public decimal MarginRatioChange { get; set; } ["<c>mmr</c>"] Current Maintenance margin requirement in USD public decimal MaintenanceMarginRequirement { get; set; } ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD public decimal MaintenanceMarginRequirementChange { get; set; } ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position public string? PositionBalance { get; set; } ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position public string? PositionBalanceChange { get; set; } ["<c>type</c>"] Unit type public CheckUnitType? Type { get; set; } } Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>subCode</c>"] Sub code public string SubCode { get; set; } = string.Empty; Whether order edit was successful public bool Success => Code == 0; } Order amend response

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### OrderCancelResponse

Represents the response after placing an order. public record OrderPlaceResponse { Order id public long? OrderId { get; set; } Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string Tag { get; set; } = string.Empty; Code public int Code { get; set; } Message public string Message { get; set; } = string.Empty; Sub code public string SubCode { get; set; } = string.Empty; Timestamp public DateTime? Timestamp { get; set; } Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>algoClOrdId</c>"] Algo client order id public string? AlgoClientOrderId { get; set; } Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD public decimal AdjustedEquity { get; set; } ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD public decimal AdjustedEquityChange { get; set; } ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off public decimal AvailableBalance { get; set; } ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off public decimal AvailableBalanceChange { get; set; } ["<c>imr</c>"] Current initial margin requirement in USD public decimal InitialMarginRequirement { get; set; } ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD public decimal InitialMarginRequirementChange { get; set; } ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities public decimal Liabilities { get; set; } ["<c>liabChg</c>"] After placing order, changed quantity of liabilities public decimal LiabilitiesChange { get; set; } ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow public string? LiabilitiesChangeAsset { get; set; } ["<c>liqPx</c>"] Current estimated liquidation price public decimal LiquidationPrice { get; set; } ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price public string LiquidationPriceDifference { get; set; } = string.Empty; ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price public decimal LiquidationPriceDifferenceRatio { get; set; } ["<c>mgnRatio</c>"] Current margin ratio in USD public decimal MarginRatio { get; set; } ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD public decimal MarginRatioChange { get; set; } ["<c>mmr</c>"] Current Maintenance margin requirement in USD public decimal MaintenanceMarginRequirement { get; set; } ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD public decimal MaintenanceMarginRequirementChange { get; set; } ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position public string? PositionBalance { get; set; } ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position public string? PositionBalanceChange { get; set; } ["<c>type</c>"] Unit type public CheckUnitType? Type { get; set; } } Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>subCode</c>"] Sub code public string SubCode { get; set; } = string.Empty; Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id public long? AlgoOrderId { get; set; } ["<c>algoClOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public string Code { get; set; } = string.Empty; ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; } Cancel response

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### AlgoOrderRequest

Represents the response after placing an order. public record OrderPlaceResponse { Order id public long? OrderId { get; set; } Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string Tag { get; set; } = string.Empty; Code public int Code { get; set; } Message public string Message { get; set; } = string.Empty; Sub code public string SubCode { get; set; } = string.Empty; Timestamp public DateTime? Timestamp { get; set; } Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>algoClOrdId</c>"] Algo client order id public string? AlgoClientOrderId { get; set; } Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD public decimal AdjustedEquity { get; set; } ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD public decimal AdjustedEquityChange { get; set; } ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off public decimal AvailableBalance { get; set; } ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off public decimal AvailableBalanceChange { get; set; } ["<c>imr</c>"] Current initial margin requirement in USD public decimal InitialMarginRequirement { get; set; } ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD public decimal InitialMarginRequirementChange { get; set; } ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities public decimal Liabilities { get; set; } ["<c>liabChg</c>"] After placing order, changed quantity of liabilities public decimal LiabilitiesChange { get; set; } ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow public string? LiabilitiesChangeAsset { get; set; } ["<c>liqPx</c>"] Current estimated liquidation price public decimal LiquidationPrice { get; set; } ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price public string LiquidationPriceDifference { get; set; } = string.Empty; ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price public decimal LiquidationPriceDifferenceRatio { get; set; } ["<c>mgnRatio</c>"] Current margin ratio in USD public decimal MarginRatio { get; set; } ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD public decimal MarginRatioChange { get; set; } ["<c>mmr</c>"] Current Maintenance margin requirement in USD public decimal MaintenanceMarginRequirement { get; set; } ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD public decimal MaintenanceMarginRequirementChange { get; set; } ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position public string? PositionBalance { get; set; } ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position public string? PositionBalanceChange { get; set; } ["<c>type</c>"] Unit type public CheckUnitType? Type { get; set; } } Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>subCode</c>"] Sub code public string SubCode { get; set; } = string.Empty; Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id public long? AlgoOrderId { get; set; } ["<c>algoClOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public string Code { get; set; } = string.Empty; ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; } Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string ClientOrderId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } Whether order cancellation was successful public bool Success => Code == 0; } Algo order request

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### OrderCancelRequest

Represents the response after placing an order. public record OrderPlaceResponse { Order id public long? OrderId { get; set; } Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string Tag { get; set; } = string.Empty; Code public int Code { get; set; } Message public string Message { get; set; } = string.Empty; Sub code public string SubCode { get; set; } = string.Empty; Timestamp public DateTime? Timestamp { get; set; } Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>algoClOrdId</c>"] Algo client order id public string? AlgoClientOrderId { get; set; } Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD public decimal AdjustedEquity { get; set; } ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD public decimal AdjustedEquityChange { get; set; } ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off public decimal AvailableBalance { get; set; } ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off public decimal AvailableBalanceChange { get; set; } ["<c>imr</c>"] Current initial margin requirement in USD public decimal InitialMarginRequirement { get; set; } ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD public decimal InitialMarginRequirementChange { get; set; } ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities public decimal Liabilities { get; set; } ["<c>liabChg</c>"] After placing order, changed quantity of liabilities public decimal LiabilitiesChange { get; set; } ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow public string? LiabilitiesChangeAsset { get; set; } ["<c>liqPx</c>"] Current estimated liquidation price public decimal LiquidationPrice { get; set; } ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price public string LiquidationPriceDifference { get; set; } = string.Empty; ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price public decimal LiquidationPriceDifferenceRatio { get; set; } ["<c>mgnRatio</c>"] Current margin ratio in USD public decimal MarginRatio { get; set; } ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD public decimal MarginRatioChange { get; set; } ["<c>mmr</c>"] Current Maintenance margin requirement in USD public decimal MaintenanceMarginRequirement { get; set; } ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD public decimal MaintenanceMarginRequirementChange { get; set; } ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position public string? PositionBalance { get; set; } ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position public string? PositionBalanceChange { get; set; } ["<c>type</c>"] Unit type public CheckUnitType? Type { get; set; } } Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>subCode</c>"] Sub code public string SubCode { get; set; } = string.Empty; Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id public long? AlgoOrderId { get; set; } ["<c>algoClOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public string Code { get; set; } = string.Empty; ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; } Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string ClientOrderId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>algoClOrdId</c>"] Client algo order id public string? ClientAlgoOrderId { get; set; } ["<c>instId</c>"] Symbol public string Symbol { get; set; } = string.Empty; } Cancel request

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### OrderPlaceRequest

Represents the response after placing an order. public record OrderPlaceResponse { Order id public long? OrderId { get; set; } Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string Tag { get; set; } = string.Empty; Code public int Code { get; set; } Message public string Message { get; set; } = string.Empty; Sub code public string SubCode { get; set; } = string.Empty; Timestamp public DateTime? Timestamp { get; set; } Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>algoClOrdId</c>"] Algo client order id public string? AlgoClientOrderId { get; set; } Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD public decimal AdjustedEquity { get; set; } ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD public decimal AdjustedEquityChange { get; set; } ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off public decimal AvailableBalance { get; set; } ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off public decimal AvailableBalanceChange { get; set; } ["<c>imr</c>"] Current initial margin requirement in USD public decimal InitialMarginRequirement { get; set; } ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD public decimal InitialMarginRequirementChange { get; set; } ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities public decimal Liabilities { get; set; } ["<c>liabChg</c>"] After placing order, changed quantity of liabilities public decimal LiabilitiesChange { get; set; } ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow public string? LiabilitiesChangeAsset { get; set; } ["<c>liqPx</c>"] Current estimated liquidation price public decimal LiquidationPrice { get; set; } ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price public string LiquidationPriceDifference { get; set; } = string.Empty; ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price public decimal LiquidationPriceDifferenceRatio { get; set; } ["<c>mgnRatio</c>"] Current margin ratio in USD public decimal MarginRatio { get; set; } ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD public decimal MarginRatioChange { get; set; } ["<c>mmr</c>"] Current Maintenance margin requirement in USD public decimal MaintenanceMarginRequirement { get; set; } ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD public decimal MaintenanceMarginRequirementChange { get; set; } ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position public string? PositionBalance { get; set; } ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position public string? PositionBalanceChange { get; set; } ["<c>type</c>"] Unit type public CheckUnitType? Type { get; set; } } Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>subCode</c>"] Sub code public string SubCode { get; set; } = string.Empty; Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id public long? AlgoOrderId { get; set; } ["<c>algoClOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public string Code { get; set; } = string.Empty; ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; } Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string ClientOrderId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>algoClOrdId</c>"] Client algo order id public string? ClientAlgoOrderId { get; set; } ["<c>instId</c>"] Symbol public string Symbol { get; set; } = string.Empty; } Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name public string Symbol { get; set; } = string.Empty; ["<c>ordId</c>"] Order id public string? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } } Order place request

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### AttachedAlgoOrder

Represents the response after placing an order. public record OrderPlaceResponse { Order id public long? OrderId { get; set; } Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string Tag { get; set; } = string.Empty; Code public int Code { get; set; } Message public string Message { get; set; } = string.Empty; Sub code public string SubCode { get; set; } = string.Empty; Timestamp public DateTime? Timestamp { get; set; } Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>algoClOrdId</c>"] Algo client order id public string? AlgoClientOrderId { get; set; } Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD public decimal AdjustedEquity { get; set; } ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD public decimal AdjustedEquityChange { get; set; } ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off public decimal AvailableBalance { get; set; } ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off public decimal AvailableBalanceChange { get; set; } ["<c>imr</c>"] Current initial margin requirement in USD public decimal InitialMarginRequirement { get; set; } ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD public decimal InitialMarginRequirementChange { get; set; } ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities public decimal Liabilities { get; set; } ["<c>liabChg</c>"] After placing order, changed quantity of liabilities public decimal LiabilitiesChange { get; set; } ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow public string? LiabilitiesChangeAsset { get; set; } ["<c>liqPx</c>"] Current estimated liquidation price public decimal LiquidationPrice { get; set; } ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price public string LiquidationPriceDifference { get; set; } = string.Empty; ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price public decimal LiquidationPriceDifferenceRatio { get; set; } ["<c>mgnRatio</c>"] Current margin ratio in USD public decimal MarginRatio { get; set; } ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD public decimal MarginRatioChange { get; set; } ["<c>mmr</c>"] Current Maintenance margin requirement in USD public decimal MaintenanceMarginRequirement { get; set; } ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD public decimal MaintenanceMarginRequirementChange { get; set; } ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position public string? PositionBalance { get; set; } ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position public string? PositionBalanceChange { get; set; } ["<c>type</c>"] Unit type public CheckUnitType? Type { get; set; } } Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>subCode</c>"] Sub code public string SubCode { get; set; } = string.Empty; Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id public long? AlgoOrderId { get; set; } ["<c>algoClOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>reqId</c>"] Request id public string RequestId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public string Code { get; set; } = string.Empty; ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; } Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id public long? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string ClientOrderId { get; set; } = string.Empty; ["<c>sCode</c>"] Code public int Code { get; set; } ["<c>sMsg</c>"] Message public string Message { get; set; } = string.Empty; ["<c>ts</c>"] Timestamp public DateTime? Timestamp { get; set; } Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id public string? AlgoOrderId { get; set; } ["<c>algoClOrdId</c>"] Client algo order id public string? ClientAlgoOrderId { get; set; } ["<c>instId</c>"] Symbol public string Symbol { get; set; } = string.Empty; } Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name public string Symbol { get; set; } = string.Empty; ["<c>ordId</c>"] Order id public string? OrderId { get; set; } ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } } Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code public long SymbolCode { get; set; } ["<c>tdMode</c>"] Trade mode public TradeMode TradeMode { get; set; } ["<c>side</c>"] Order side public OrderSide OrderSide { get; set; } ["<c>posSide</c>"] Position side public PositionSide? PositionSide { get; set; } ["<c>ordType</c>"] Order type public OrderType OrderType { get; set; } ["<c>sz</c>"] Quantity public decimal? Quantity { get; set; } ["<c>px</c>"] Price public decimal? Price { get; set; } ["<c>ccy</c>"] Asset public string Asset { get; set; } = string.Empty; ["<c>clOrdId</c>"] Client order id public string? ClientOrderId { get; set; } ["<c>tag</c>"] Tag public string? Tag { get; set; } ["<c>reduceOnly</c>"] Reduce only public bool? ReduceOnly { get; set; } ["<c>tgtCcy</c>"] Quantity type public QuantityAsset? QuantityType { get; set; } ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options public decimal? PriceUsd { get; set; } ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS public decimal? PriceVol { get; set; } ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. public bool? BanAmend { get; set; } ["<c>stpMode</c>"] Self trade prevention mode public SelfTradePreventionMode? StpMode { get; set; } ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. public string? TradeQuoteAsset { get; set; } ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | Represents the response after placing an order. public record OrderPlaceResponse { Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["<c>tag</c>"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |
| `AlgoOrderId` | `string?` | Whether order placement was successful public bool Success => Code == 0; } Represents the response after placing an algorithmic order. public record AlgoOrderResponse { ["<c>algoId</c>"] Algo order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `AlgoClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Algo client order id |
| `Code` | `int` | Deprecated misspelling of <see cref="AlgoClientOrderId"/>. [Obsolete("Use AlgoClientOrderId.")] public string? AgloClientOrderId { get => AlgoClientOrderId; set => AlgoClientOrderId = value; } ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `AdjustedEquity` | `decimal` | Whether order placement was successful public bool Success => Code == 0; } Check order info public record CheckOrderResponse { ["<c>adjEq</c>"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["<c>adjEqChg</c>"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["<c>availBal</c>"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["<c>availBalChg</c>"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["<c>imr</c>"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["<c>imrChg</c>"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["<c>liab</c>"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["<c>liabChg</c>"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["<c>liabChgCcy</c>"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["<c>liqPx</c>"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["<c>liqPxDiff</c>"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["<c>liqPxDiffRatio</c>"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["<c>mgnRatio</c>"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["<c>mgnRatioChg</c>"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["<c>mmr</c>"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["<c>mmrChg</c>"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["<c>posBal</c>"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["<c>posBalChg</c>"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | `CheckUnitType?` | ["<c>type</c>"] Unit type |
| `OrderId` | `long?` | Order amend response public record OrderAmendResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `SubCode` | `string` | ["<c>subCode</c>"] Sub code |
| `AlgoOrderId` | `long?` | Whether order edit was successful public bool Success => Code == 0; } Order amend response public record AlgoOrderAmendResponse { ["<c>algoId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client order id |
| `RequestId` | `string` | ["<c>reqId</c>"] Request id |
| `Code` | `string` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `OrderId` | `long?` | Cancel response public record OrderCancelResponse { ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string` | ["<c>clOrdId</c>"] Client order id |
| `Code` | `int` | ["<c>sCode</c>"] Code |
| `Message` | `string` | ["<c>sMsg</c>"] Message |
| `Timestamp` | `DateTime?` | ["<c>ts</c>"] Timestamp |
| `AlgoOrderId` | `string?` | Whether order cancellation was successful public bool Success => Code == 0; } Algo order request public record AlgoOrderRequest { ["<c>algoId</c>"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["<c>algoClOrdId</c>"] Client algo order id |
| `Symbol` | `string` | ["<c>instId</c>"] Symbol |
| `Symbol` | `string` | Cancel request public record OrderCancelRequest { ["<c>instId</c>"] Symbol name |
| `OrderId` | `string?` | ["<c>ordId</c>"] Order id |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `SymbolCode` | `long` | Order place request public record OrderPlaceRequest { ["<c>instIdCode</c>"] Symbol code |
| `TradeMode` | `TradeMode` | ["<c>tdMode</c>"] Trade mode |
| `OrderSide` | `OrderSide` | ["<c>side</c>"] Order side |
| `PositionSide` | `PositionSide?` | ["<c>posSide</c>"] Position side |
| `OrderType` | `OrderType` | ["<c>ordType</c>"] Order type |
| `Quantity` | `decimal?` | ["<c>sz</c>"] Quantity |
| `Price` | `decimal?` | ["<c>px</c>"] Price |
| `Asset` | `string` | ["<c>ccy</c>"] Asset |
| `ClientOrderId` | `string?` | ["<c>clOrdId</c>"] Client order id |
| `Tag` | `string?` | ["<c>tag</c>"] Tag |
| `ReduceOnly` | `bool?` | ["<c>reduceOnly</c>"] Reduce only |
| `QuantityType` | `QuantityAsset?` | ["<c>tgtCcy</c>"] Quantity type |
| `PriceUsd` | `decimal?` | ["<c>pxUsd</c>"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["<c>pxVol</c>"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["<c>banAmend</c>"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | `SelfTradePreventionMode?` | ["<c>stpMode</c>"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["<c>tradeQuoteCcy</c>"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `ClientOrderId` | `string?` | ["<c>attachAlgoOrds</c>"] Attached take profit / stop loss orders [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public AttachedAlgoOrder[]? AttachedAlgoOrders { get; set; } } Algo order attached to an order public record AttachedAlgoOrder { ["<c>attachAlgoClOrdId</c>"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["<c>tpTriggerPx</c>"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["<c>tpOrdPx</c>"] Take profit order price |
| `TakeProfitOrderKind` | `TriggerOrderKind?` | ["<c>tpOrdKind</c>"] Take profit order kind |
| `TakeProfitPriceType` | `TriggerPriceType?` | ["<c>tpTriggerPxType</c>"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["<c>sz</c>"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["<c>slTriggerPx</c>"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["<c>slOrdPx</c>"] Stop loss order price |
| `StopLossPriceType` | `TriggerPriceType?` | ["<c>slTriggerPxType</c>"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["<c>amendPxOnTriggerType</c>"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["<c>callbackRatio</c>"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["<c>callbackSpread</c>"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["<c>activePx</c>"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### OrderUpdate

Represents an update to an order in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `AmendResult` | `string?` | Represents an update to an order in the OKX trading system. public record OrderUpdate : Order { The result of the amendment. |
| `AmendSource` | `string?` | The source of the amendment. |
| `ExecutionType` | `string?` | The execution type of the order. |
| `FillFee` | `decimal` | The fee incurred for the fill. |
| `FillFeeAsset` | `string` | The asset used for the fill fee. |
| `FillNotionalUsd` | `decimal?` | The notional value of the fill in USD. |
| `FillPnl` | `decimal` | The profit and loss from the fill. |
| `NotionalUsd` | `decimal?` | The notional value of the update in USD. |
| `RequestId` | `string?` | The request identifier associated with the update. |
| `LastTradeImpliedVolatility` | `decimal?` | The implied volatility of the last trade. |
| `LastTradeUsdPrice` | `decimal?` | The USD price of the last trade. |
| `LastTradeMarkVolatility` | `decimal?` | The mark volatility of the last trade. |
| `LastTradeForwardPrice` | `decimal?` | The forward price of the last trade. |
| `LastTradeMarkPrice` | `decimal?` | The mark price of the last trade. |

### Position

Represents a position in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `InstrumentType` | `InstrumentType` | Represents a position in the OKX trading system. public record Position { The type of the instrument. |
| `MarginMode` | `MarginMode` | The margin mode of the position. |
| `PositionId` | `long?` | The unique identifier of the position. |
| `PositionSide` | `PositionSide` | The position side. |
| `PositionsQuantity` | `decimal?` | The quantity of the positions. |
| `AveragePrice` | `decimal?` | The average price of the positions. |
| `MarkPrice` | `decimal?` | The mark price of the positions. |
| `UnrealizedProfitAndLoss` | `decimal?` | The unrealized profit and loss of the positions. |
| `UnrealizedProfitAndLossRatio` | `decimal?` | The ratio of the unrealized profit and loss. |
| `UnrealizedPnl` | `decimal?` | The unrealized Pnl. |
| `UnrealizedPnlRatio` | `decimal?` | The ratio of the unrealized Pnl. |
| `Symbol` | `string` | The trading symbol. |
| `Leverage` | `decimal?` | The leverage applied to the position. |
| `LiquidationPrice` | `decimal?` | The liquidation price of the position. |
| `InitialMarginRequirement` | `decimal?` | The initial margin requirement for the position. |
| `Margin` | `decimal?` | The margin used for the position. |
| `MarginRatio` | `decimal?` | The margin ratio for the position. |
| `MaintenanceMarginRequirement` | `decimal?` | The maintenance margin requirement for the position. |
| `TradeId` | `long?` | The unique identifier for the trade. |
| `NotionalUsd` | `decimal?` | The notional value of the position in USD. |
| `AutoDeleveragingIndicator` | `decimal?` | The auto-deleveraging indicator. |
| `Asset` | `string` | The asset for the position. |
| `LastPrice` | `decimal?` | The last market price for the position. |
| `IndexPrice` | `decimal?` | The index price for the position. |
| `UsdPrice` | `decimal?` | The price of the asset in USD. |
| `BreakEvenPrice` | `decimal?` | The break-even price for the position. |
| `RealizedPnl` | `decimal?` | The realized Pnl. |
| `Pnl` | `decimal?` | The profit and loss. |
| `Fee` | `decimal?` | The fee incurred for the position. |
| `FundingFee` | `decimal?` | The funding fee incurred for the position. |
| `LiquidationPenalty` | `decimal?` | The liquidation penalty incurred for the position. |
| `CreateTime` | `DateTime` | The time when the position was created. |
| `UpdateTime` | `DateTime` | The time when the position was last updated. |
| `AlgoId` | `string` | The algorithmic orders used to close the position. [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public PositionCloseOrder[] CloseOrderAlgo { get; set; } = Array.Empty<PositionCloseOrder>(); Initializes a new instance of the <see cref="Position"/> record. public Position() { } ... (rest of methods) } Represents an algorithmic order to close a position. public class PositionCloseOrder { The algorithmic order identifier. |
| `StopLossTriggerPrice` | `decimal` | The stop-loss trigger price. |
| `StopLossTriggerType` | `TriggerPriceType` | The type of stop-loss trigger. |
| `TakeProfitTriggerPrice` | `decimal` | The take-profit trigger price. |
| `TakeProfitTriggerType` | `TriggerPriceType` | The type of take-profit trigger. |
| `CloseFraction` | `decimal?` | The fraction of the position to close. |

### PositionCloseOrder

Represents a position in the OKX trading system. public record Position { The type of the instrument. public InstrumentType InstrumentType { get; set; } The margin mode of the position. public MarginMode MarginMode { get; set; } The unique identifier of the position. public long? PositionId { get; set; } The position side. public PositionSide PositionSide { get; set; } The quantity of the positions. public decimal? PositionsQuantity { get; set; } The average price of the positions. public decimal? AveragePrice { get; set; } The mark price of the positions. public decimal? MarkPrice { get; set; } The unrealized profit and loss of the positions. public decimal? UnrealizedProfitAndLoss { get; set; } The ratio of the unrealized profit and loss. public decimal? UnrealizedProfitAndLossRatio { get; set; } The unrealized Pnl. public decimal? UnrealizedPnl { get; set; } The ratio of the unrealized Pnl. public decimal? UnrealizedPnlRatio { get; set; } The trading symbol. public string Symbol { get; set; } = string.Empty; The leverage applied to the position. public decimal? Leverage { get; set; } The liquidation price of the position. public decimal? LiquidationPrice { get; set; } The initial margin requirement for the position. public decimal? InitialMarginRequirement { get; set; } The margin used for the position. public decimal? Margin { get; set; } The margin ratio for the position. public decimal? MarginRatio { get; set; } The maintenance margin requirement for the position. public decimal? MaintenanceMarginRequirement { get; set; } The unique identifier for the trade. public long? TradeId { get; set; } The notional value of the position in USD. public decimal? NotionalUsd { get; set; } The auto-deleveraging indicator. public decimal? AutoDeleveragingIndicator { get; set; } The asset for the position. public string Asset { get; set; } = string.Empty; The last market price for the position. public decimal? LastPrice { get; set; } The index price for the position. public decimal? IndexPrice { get; set; } The price of the asset in USD. public decimal? UsdPrice { get; set; } The break-even price for the position. public decimal? BreakEvenPrice { get; set; } The realized Pnl. public decimal? RealizedPnl { get; set; } The profit and loss. public decimal? Pnl { get; set; } The fee incurred for the position. public decimal? Fee { get; set; } The funding fee incurred for the position. public decimal? FundingFee { get; set; } The liquidation penalty incurred for the position. public decimal? LiquidationPenalty { get; set; } The time when the position was created. public DateTime CreateTime { get; set; } The time when the position was last updated. public DateTime UpdateTime { get; set; } The algorithmic orders used to close the position. [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public PositionCloseOrder[] CloseOrderAlgo { get; set; } = Array.Empty<PositionCloseOrder>(); Initializes a new instance of the <see cref="Position"/> record. public Position() { } ... (rest of methods) } Represents an algorithmic order to close a position.

| Property | Type | Description |
|---|---|---|
| `InstrumentType` | `InstrumentType` | Represents a position in the OKX trading system. public record Position { The type of the instrument. |
| `MarginMode` | `MarginMode` | The margin mode of the position. |
| `PositionId` | `long?` | The unique identifier of the position. |
| `PositionSide` | `PositionSide` | The position side. |
| `PositionsQuantity` | `decimal?` | The quantity of the positions. |
| `AveragePrice` | `decimal?` | The average price of the positions. |
| `MarkPrice` | `decimal?` | The mark price of the positions. |
| `UnrealizedProfitAndLoss` | `decimal?` | The unrealized profit and loss of the positions. |
| `UnrealizedProfitAndLossRatio` | `decimal?` | The ratio of the unrealized profit and loss. |
| `UnrealizedPnl` | `decimal?` | The unrealized Pnl. |
| `UnrealizedPnlRatio` | `decimal?` | The ratio of the unrealized Pnl. |
| `Symbol` | `string` | The trading symbol. |
| `Leverage` | `decimal?` | The leverage applied to the position. |
| `LiquidationPrice` | `decimal?` | The liquidation price of the position. |
| `InitialMarginRequirement` | `decimal?` | The initial margin requirement for the position. |
| `Margin` | `decimal?` | The margin used for the position. |
| `MarginRatio` | `decimal?` | The margin ratio for the position. |
| `MaintenanceMarginRequirement` | `decimal?` | The maintenance margin requirement for the position. |
| `TradeId` | `long?` | The unique identifier for the trade. |
| `NotionalUsd` | `decimal?` | The notional value of the position in USD. |
| `AutoDeleveragingIndicator` | `decimal?` | The auto-deleveraging indicator. |
| `Asset` | `string` | The asset for the position. |
| `LastPrice` | `decimal?` | The last market price for the position. |
| `IndexPrice` | `decimal?` | The index price for the position. |
| `UsdPrice` | `decimal?` | The price of the asset in USD. |
| `BreakEvenPrice` | `decimal?` | The break-even price for the position. |
| `RealizedPnl` | `decimal?` | The realized Pnl. |
| `Pnl` | `decimal?` | The profit and loss. |
| `Fee` | `decimal?` | The fee incurred for the position. |
| `FundingFee` | `decimal?` | The funding fee incurred for the position. |
| `LiquidationPenalty` | `decimal?` | The liquidation penalty incurred for the position. |
| `CreateTime` | `DateTime` | The time when the position was created. |
| `UpdateTime` | `DateTime` | The time when the position was last updated. |
| `AlgoId` | `string` | The algorithmic orders used to close the position. [System.Diagnostics.CodeAnalysis.SuppressMessage( "Performance", "CA1819", Justification = "DTO property, array is required for serialization")] public PositionCloseOrder[] CloseOrderAlgo { get; set; } = Array.Empty<PositionCloseOrder>(); Initializes a new instance of the <see cref="Position"/> record. public Position() { } ... (rest of methods) } Represents an algorithmic order to close a position. public class PositionCloseOrder { The algorithmic order identifier. |
| `StopLossTriggerPrice` | `decimal` | The stop-loss trigger price. |
| `StopLossTriggerType` | `TriggerPriceType` | The type of stop-loss trigger. |
| `TakeProfitTriggerPrice` | `decimal` | The take-profit trigger price. |
| `TakeProfitTriggerType` | `TriggerPriceType` | The type of take-profit trigger. |
| `CloseFraction` | `decimal?` | The fraction of the position to close. |

### Transaction

Represents a transaction in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `InstrumentType` | `InstrumentType` | Represents a transaction in the OKX trading system. public class Transaction { The type of the instrument. |
| `Symbol` | `string` | The trading symbol (e.g., BTC-USDT). |
| `TradeId` | `long?` | The unique identifier for the trade. |
| `OrderId` | `long?` | The unique identifier for the order. |
| `ClientOrderId` | `string?` | The client-defined unique identifier for the order. |
| `BillId` | `long?` | The unique identifier for the bill. |
| `TransactionType` | `string` | The type of the transaction. |
| `SubType` | `TransactionType` | The sub-type of the transaction. |
| `Tag` | `string` | A custom tag for the transaction. |
| `FillPrice` | `decimal?` | The price of the fill. |
| `QuantityFilled` | `decimal?` | The quantity filled for the transaction. |
| `FillIndexPrice` | `decimal?` | The index price at the time of fill. |
| `FillProfitAndLoss` | `decimal?` | The profit and loss from the fill. |
| `FillMarkPrice` | `decimal?` | The mark price at the time of fill. |
| `OrderSide` | `OrderSide` | The side of the order (Buy/Sell). |
| `PositionSide` | `PositionSide` | The position side (e.g., Long/Short). |
| `OrderFlowType` | `OrderFlowType` | The flow type of the order. |
| `FeeAsset` | `string` | The asset used for the fee. |
| `Fee` | `decimal?` | The fee incurred for the transaction. |
| `Time` | `DateTime` | The time of the transaction. |
| `FillTime` | `DateTime` | The time of the fill. |
| `TradeQuoteAsset` | `string` | The trade quote asset used for the transaction. |

## Market

### TickSourceConfig

Configuration for synthetic tick generation during backtests. This does not affect real-time tick sources.

| Property | Type | Description |
|---|---|---|
| `TicksPerCandle` | `int` | Configuration for synthetic tick generation during backtests. This does not affect real-time tick sources. public class TickSourceConfig { Gets or sets the number of generated ticks per one-minute candle. Lower values are faster; higher values are more precise. Recommended range: 10 to 60. |
| `UseNoise` | `bool` | Gets or sets whether random noise is applied to intermediate prices. Enabled is more realistic; disabled is deterministic and better for tests. |
| `NoiseAmplitude` | `double` | Gets or sets the maximum noise amplitude as a fraction of the candle spread. For example, 0.1 means up to 10% of High - Low. |
| `RandomSeed` | `int?` | Gets or sets the random seed used for reproducible backtests. Null means a new random sequence for each run. |
| `OhlcPattern` | `OhlcPattern` | Gets or sets the generated tick path pattern inside each OHLC candle. |

## Drawing

### DrawingStyle

Defines the styling properties for a drawing object.

| Property | Type | Description |
|---|---|---|
| `Color` | `string` | Defines the styling properties for a drawing object. public class DrawingStyle { Gets or sets the stroke color in hex format (e.g., "#FFFFFF"). |
| `Width` | `double` | Gets or sets the stroke width. |
| `LineStyle` | `DrawingLineStyle` | Gets or sets the line style. |
| `Opacity` | `double` | Gets or sets the opacity (0.0 to 1.0). |
| `Fill` | `bool` | Gets or sets a value indicating whether to fill the shape. |
| `FillColor` | `string` | Gets or sets the fill color in hex format (e.g., "#44FFFFFF"). |

## Common

### LimitPrice

Represents the limit price information for a specific trading instrument.

| Property | Type | Description |
|---|---|---|
| `Symbol` | `string` | Represents the limit price information for a specific trading instrument. public record LimitPrice { ["<c>instId</c>"] Symbol |
| `InstrumentType` | `InstrumentType` | ["<c>instType</c>"] Instrument type |
| `BuyLimit` | `decimal` | ["<c>buyLmt</c>"] Buy limit |
| `SellLimit` | `decimal` | ["<c>sellLmt</c>"] Sell limit |
| `Time` | `DateTime` | ["<c>ts</c>"] Timestamp |
| `IsEnabled` | `bool` | ["<c>enabled</c>"] Whether price limit is enabled |

### ApiError

Represents an error returned by the OKX API.

| Property | Type | Description |
|---|---|---|
| `Message` | `string` | Represents an error returned by the OKX API. public class ApiError { Human-readable error message. |
| `Code` | `string?` | OKX API error code, if available (e.g. "50001", "51000"). |
| `HttpStatusCode` | `HttpStatusCode?` | HTTP status code of the response, if applicable. |
| `ErrorType` | `ApiErrorType` | The category of error. |

### ApiResult

-

| Property | Type | Description |
|---|---|---|
| `Success` | `bool` | Represents the result of an API operation. This type encapsulates both success and failure outcomes. When <see cref="Success"/> is <c>false</c>, <see cref="Error"/> will contain details. public class ApiResult { Gets a value indicating whether the operation completed successfully. |
| `Error` | `ApiError?` | Gets the error details if the operation failed; otherwise <c>null</c>. |
| `Data` | `T` | Initializes a new instance of the <see cref="ApiResult"/> class. <param name="success">Indicates whether the operation succeeded.</param> <param name="error">The error information if failed; otherwise <c>null</c>.</param> internal ApiResult(bool success, ApiError? error) { Success = success; Error = error; } Enables implicit conversion of <see cref="ApiResult"/> to <see cref="bool"/>. Returns <c>true</c> if <see cref="Success"/> is <c>true</c>; otherwise <c>false</c>. This allows usage in boolean expressions. <para>Example:</para> <code> if (result) { // Handle success } </code> ⚠️ Use with caution: this conversion may hide error details. Prefer checking <see cref="Success"/> and <see cref="Error"/> explicitly in critical flows. <param name="result">The result instance to evaluate.</param> <returns> <c>true</c> if the operation succeeded; otherwise <c>false</c>. </returns> public static implicit operator bool(ApiResult? result) => result?.Success ?? false; Returns whether the operation succeeded. <returns><c>true</c> if the operation succeeded; otherwise <c>false</c>.</returns> public bool ToBoolean() => Success; Returns a string representation of the result. <returns> <c>"Success"</c> if successful; otherwise an error description. </returns> public override string ToString() => Success ? "Success" : $"Error: {Error}"; } Represents the result of an API operation that returns data. <typeparam name="T">The type of the returned data.</typeparam> When <see cref="ApiResult.Success"/> is <c>true</c>, <see cref="Data"/> contains the result. Otherwise, <see cref="ApiResult.Error"/> provides failure details. public class ApiResult<T> : ApiResult { Gets the data returned by the operation. Only valid when <see cref="ApiResult.Success"/> is <c>true</c>. |

### ApiResult

-

| Property | Type | Description |
|---|---|---|
| `Success` | `bool` | Represents the result of an API operation. This type encapsulates both success and failure outcomes. When <see cref="Success"/> is <c>false</c>, <see cref="Error"/> will contain details. public class ApiResult { Gets a value indicating whether the operation completed successfully. |
| `Error` | `ApiError?` | Gets the error details if the operation failed; otherwise <c>null</c>. |
| `Data` | `T` | Initializes a new instance of the <see cref="ApiResult"/> class. <param name="success">Indicates whether the operation succeeded.</param> <param name="error">The error information if failed; otherwise <c>null</c>.</param> internal ApiResult(bool success, ApiError? error) { Success = success; Error = error; } Enables implicit conversion of <see cref="ApiResult"/> to <see cref="bool"/>. Returns <c>true</c> if <see cref="Success"/> is <c>true</c>; otherwise <c>false</c>. This allows usage in boolean expressions. <para>Example:</para> <code> if (result) { // Handle success } </code> ⚠️ Use with caution: this conversion may hide error details. Prefer checking <see cref="Success"/> and <see cref="Error"/> explicitly in critical flows. <param name="result">The result instance to evaluate.</param> <returns> <c>true</c> if the operation succeeded; otherwise <c>false</c>. </returns> public static implicit operator bool(ApiResult? result) => result?.Success ?? false; Returns whether the operation succeeded. <returns><c>true</c> if the operation succeeded; otherwise <c>false</c>.</returns> public bool ToBoolean() => Success; Returns a string representation of the result. <returns> <c>"Success"</c> if successful; otherwise an error description. </returns> public override string ToString() => Success ? "Success" : $"Error: {Error}"; } Represents the result of an API operation that returns data. <typeparam name="T">The type of the returned data.</typeparam> When <see cref="ApiResult.Success"/> is <c>true</c>, <see cref="Data"/> contains the result. Otherwise, <see cref="ApiResult.Error"/> provides failure details. public class ApiResult<T> : ApiResult { Gets the data returned by the operation. Only valid when <see cref="ApiResult.Success"/> is <c>true</c>. |

### TelegramBotConfig

Configuration details for an individual Telegram Bot channel.

| Property | Type | Description |
|---|---|---|
| `Alias` | `string` | Configuration details for an individual Telegram Bot channel. public class TelegramBotConfig { Gets or sets a unique alias/nickname for this bot configuration. |
| `BotToken` | `string` | Gets or sets the Telegram Bot Token. |
| `ChatId` | `long` | Gets or sets the target chat ID to send notifications to. |
| `Enabled` | `bool` | Gets or sets a value indicating whether this bot is enabled. |

### TradeCommand

Represents a command sent to a trading strategy.

| Property | Type | Description |
|---|---|---|
| `Action` | `TradeAction` | Represents a command sent to a trading strategy. public record TradeCommand { Gets or sets the command action. |
| `SourceChatId` | `long` | Gets or sets the Telegram Chat ID from which this command originated. |
| `Symbol` | `string` | Gets or sets the target symbol. |
| `Amount` | `decimal` | Gets or sets the command amount. |
| `Price` | `decimal` | Gets or sets the command price. |
| `CommandTag` | `string` | Gets or sets the plugin-specific command identifier used when <see cref="Action"/> is <see cref="TradeAction.Custom"/>. Examples: "setlevel", "forcetpchase", or "resetrisk". |

## Indicators

### IndicatorSource

Describes one data source used by an indicator instance. The source can be either candle price data or another indicator buffer.

| Property | Type | Description |
|---|---|---|
| `IndicatorId` | `string?` | Describes one data source used by an indicator instance. The source can be either candle price data or another indicator buffer. public class IndicatorSource { Gets or sets the parent indicator ID. When <c>null</c>, the source is interpreted as candle price data. |
| `TimeFrame` | `Timeframe?` | Gets or sets the parent indicator timeframe when it differs from the current indicator timeframe. |
| `BufferIndex` | `int` | Gets or sets the parent indicator buffer index to read from. |
| `AppliedPrice` | `AppliedPrice` | Gets or sets the candle price field used when no parent indicator is configured. |
| `Symbol` | `string` | Returns a compact, deterministic textual representation of this source. Used by fingerprint generation in <see cref="IndicatorConfig"/>. <returns>A stable key segment representing this source.</returns> public override string ToString() { var tf = TimeFrame.HasValue ? $":{TimeFrame}" : ""; return IndicatorId != null ? $"Ind:{IndicatorId}{tf}[{BufferIndex}]" : $"Price:{AppliedPrice}"; } } Represents the runtime configuration used to create and identify an indicator instance. This includes the trading symbol, timeframe, indicator type, parameters, and optional input sources for chained indicators. public class IndicatorConfig { Gets the list of input sources consumed by the indicator. private readonly List<IndicatorSource> _sources = new(); Gets the trading symbol this indicator is associated with. |
| `TimeFrame` | `Timeframe` | Gets the timeframe in which the indicator is calculated. |
| `IndicatorType` | `IndicatorType` | Gets the indicator type. For custom indicators, this is typically <see cref="IndicatorType.CUSTOM"/>, and <see cref="CustomName"/> is used to distinguish the implementation. |
| `Parameters` | `IndicatorParameters` | Gets or sets the parameter collection used by the indicator. |
| `CustomName` | `string?` | Gets or sets the list of input sources consumed by the indicator. Each source may represent either a candle price or another indicator buffer. public IReadOnlyList<IndicatorSource> Sources => _sources; Gets or sets the custom indicator name. <c>null</c> indicates a built-in indicator. |

### IndicatorConfig

Describes one data source used by an indicator instance. The source can be either candle price data or another indicator buffer. public class IndicatorSource { Gets or sets the parent indicator ID. When <c>null</c>, the source is interpreted as candle price data. public string? IndicatorId { get; set; } Gets or sets the parent indicator timeframe when it differs from the current indicator timeframe. public Timeframe? TimeFrame { get; set; } Gets or sets the parent indicator buffer index to read from. public int BufferIndex { get; set; } Gets or sets the candle price field used when no parent indicator is configured. public AppliedPrice AppliedPrice { get; set; } = AppliedPrice.Close; Returns a compact, deterministic textual representation of this source. Used by fingerprint generation in <see cref="IndicatorConfig"/>. <returns>A stable key segment representing this source.</returns> public override string ToString() { var tf = TimeFrame.HasValue ? $":{TimeFrame}" : ""; return IndicatorId != null ? $"Ind:{IndicatorId}{tf}[{BufferIndex}]" : $"Price:{AppliedPrice}"; } } Represents the runtime configuration used to create and identify an indicator instance. This includes the trading symbol, timeframe, indicator type, parameters, and optional input sources for chained indicators.

| Property | Type | Description |
|---|---|---|
| `IndicatorId` | `string?` | Describes one data source used by an indicator instance. The source can be either candle price data or another indicator buffer. public class IndicatorSource { Gets or sets the parent indicator ID. When <c>null</c>, the source is interpreted as candle price data. |
| `TimeFrame` | `Timeframe?` | Gets or sets the parent indicator timeframe when it differs from the current indicator timeframe. |
| `BufferIndex` | `int` | Gets or sets the parent indicator buffer index to read from. |
| `AppliedPrice` | `AppliedPrice` | Gets or sets the candle price field used when no parent indicator is configured. |
| `Symbol` | `string` | Returns a compact, deterministic textual representation of this source. Used by fingerprint generation in <see cref="IndicatorConfig"/>. <returns>A stable key segment representing this source.</returns> public override string ToString() { var tf = TimeFrame.HasValue ? $":{TimeFrame}" : ""; return IndicatorId != null ? $"Ind:{IndicatorId}{tf}[{BufferIndex}]" : $"Price:{AppliedPrice}"; } } Represents the runtime configuration used to create and identify an indicator instance. This includes the trading symbol, timeframe, indicator type, parameters, and optional input sources for chained indicators. public class IndicatorConfig { Gets the list of input sources consumed by the indicator. private readonly List<IndicatorSource> _sources = new(); Gets the trading symbol this indicator is associated with. |
| `TimeFrame` | `Timeframe` | Gets the timeframe in which the indicator is calculated. |
| `IndicatorType` | `IndicatorType` | Gets the indicator type. For custom indicators, this is typically <see cref="IndicatorType.CUSTOM"/>, and <see cref="CustomName"/> is used to distinguish the implementation. |
| `Parameters` | `IndicatorParameters` | Gets or sets the parameter collection used by the indicator. |
| `CustomName` | `string?` | Gets or sets the list of input sources consumed by the indicator. Each source may represent either a candle price or another indicator buffer. public IReadOnlyList<IndicatorSource> Sources => _sources; Gets or sets the custom indicator name. <c>null</c> indicates a built-in indicator. |

### IndicatorIdentity

Represents the logical identity of an indicator instance. Combines symbol, timeframe, type, and parameter values.

| Property | Type | Description |
|---|---|---|
| `Symbol` | `string` | Represents the logical identity of an indicator instance. Combines symbol, timeframe, type, and parameter values. public class IndicatorIdentity { Gets or sets the trading symbol for the indicator instance. |
| `TimeFrame` | `Timeframe` | Gets or sets the timeframe where the indicator is calculated. |
| `IndicatorType` | `IndicatorType` | Gets or sets the indicator type. |
| `Parameters` | `IndicatorParameters` | Gets or sets the parameter bag used by this identity. |

### IndicatorItem

Snapshot container for indicator values at a specific timestamp. Holds identity, rendering property metadata, and per-buffer values.

| Property | Type | Description |
|---|---|---|
| `IndicatorId` | `string` | Snapshot container for indicator values at a specific timestamp. Holds identity, rendering property metadata, and per-buffer values. public class IndicatorItem { Gets or sets the runtime indicator instance ID. |
| `Property` | `IndicatorProperty` | Gets or sets rendering metadata for this indicator instance. |
| `Identity` | `IndicatorIdentity` | Gets or sets identity metadata for this indicator instance. |
| `Timestamp` | `DateTime` | Gets or sets the timestamp associated with this value snapshot. |

### IndicatorFillRegion

Defines a shaded region drawn between two indicator buffers (e.g. Ichimoku Kumo cloud).

| Property | Type | Description |
|---|---|---|
| `Name` | `string` | Defines a shaded region drawn between two indicator buffers (e.g. Ichimoku Kumo cloud). public class IndicatorFillRegion { Gets or sets a human-readable label for this region (e.g. "Kumo"). |
| `Enabled` | `bool` | Gets or sets whether the fill is currently active. |
| `Visible` | `bool` | Gets or sets whether the fill is shown in the indicator settings dialog. |
| `UpperBufferIndex` | `int` | Gets or sets the buffer index whose values define the top boundary of the fill. |
| `LowerBufferIndex` | `int` | Gets or sets the buffer index whose values define the bottom boundary of the fill. |
| `ColorMode` | `IndicatorFillColorMode` | Gets or sets how the fill color is selected. Use <see cref="IndicatorFillColorMode.Fixed"/> for a constant color, or <see cref="IndicatorFillColorMode.BullishBearish"/> to switch between <see cref="BullishColor"/> and <see cref="BearishColor"/> based on the relative positions of the upper and lower buffers. |
| `FillColor` | `IndicatorColor` | Gets or sets the color used when <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.Fixed"/>. |
| `BullishColor` | `IndicatorColor` | Gets or sets the color used when upper ≥ lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. |
| `BearishColor` | `IndicatorColor` | Gets or sets the color used when upper &lt; lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. |
| `Opacity` | `byte` | Gets or sets the fill transparency (0 = fully transparent, 255 = fully opaque). Default is 72. |
| `UseRangeValue` | `bool` | Optional display features for specific indicator families. These settings add extra chart elements such as bound lines, a zero line, histogram coloring, and fill regions between buffers. public class IndicatorSpecialFeatures { Gets or sets whether to lock the Y-axis range to <see cref="MinValue"/>/<see cref="MaxValue"/> rather than auto-scaling to visible data (e.g. RSI 0–100). |
| `MinValue` | `double` | Gets or sets the fixed minimum Y value when <see cref="UseRangeValue"/> is <c>true</c>. |
| `MaxValue` | `double` | Gets or sets the fixed maximum Y value when <see cref="UseRangeValue"/> is <c>true</c>. |
| `ShowUpperBound` | `bool` | Gets or sets whether to draw a horizontal upper-bound line (e.g. RSI overbought at 70). |
| `ShowLowerBound` | `bool` | Gets or sets whether to draw a horizontal lower-bound line (e.g. RSI oversold at 30). |
| `ShowCenterLine` | `bool` | Gets or sets whether to draw a horizontal center line (e.g. RSI midpoint at 50). |
| `UpperBoundValue` | `double` | Gets or sets the Y value of the upper-bound line. Default is 70. |
| `UpperBoundWidth` | `double` | Gets or sets the stroke width of the upper-bound line. Default is 1.0. |
| `LowerBoundValue` | `double` | Gets or sets the Y value of the lower-bound line. Default is 30. |
| `LowerBoundWidth` | `double` | Gets or sets the stroke width of the lower-bound line. Default is 1.0. |
| `CenterLineValue` | `double` | Gets or sets the Y value of the center line. Default is 50. |
| `CenterLineWidth` | `double` | Gets or sets the stroke width of the center line. Default is 1.0. |
| `UpperBoundColor` | `IndicatorColor` | Gets or sets the color of the upper-bound line. Default is <see cref="IndicatorColor.Red"/>. |
| `LowerBoundColor` | `IndicatorColor` | Gets or sets the color of the lower-bound line. Default is <see cref="IndicatorColor.Green"/>. |
| `CenterLineColor` | `IndicatorColor` | Gets or sets the color of the center line. Default is <see cref="IndicatorColor.Gray"/>. |
| `BoundLineStyle` | `IndicatorStyle` | Gets or sets the dash style shared by all bound lines. Default is <see cref="IndicatorStyle.Dashed"/>. |
| `ShowBoundFill` | `bool` | Gets or sets whether to fill the area between the upper-bound line and the lower-bound line. Only rendered when both <see cref="ShowUpperBound"/> and <see cref="ShowLowerBound"/> are <c>true</c>. |
| `BoundFillColor` | `IndicatorColor` | Gets or sets the fill color used between the upper and lower bound lines. Default is <see cref="IndicatorColor.Gray"/>. |
| `BoundFillOpacity` | `byte` | Gets or sets the fill transparency for the bound area (0 = fully transparent, 255 = fully opaque). Default is 30. |
| `ShowHistogram` | `bool` | Gets or sets whether to render the primary buffer as a histogram. |
| `HistogramPositiveColor` | `IndicatorColor` | Gets or sets the color for histogram bars with positive values. Default is <see cref="IndicatorColor.Green"/>. |
| `HistogramNegativeColor` | `IndicatorColor` | Gets or sets the color for histogram bars with negative values. Default is <see cref="IndicatorColor.Red"/>. |
| `ShowZeroLine` | `bool` | Gets or sets whether to draw a horizontal zero line across the panel. |
| `ZeroLineWidth` | `double` | Gets or sets the stroke width of the zero line. Default is 1.0. |
| `ZeroLineColor` | `IndicatorColor` | Gets or sets the color of the zero line. Default is <see cref="IndicatorColor.Gray"/>. |
| `FillRegions` | `IEnumerable&lt;IndicatorFillRegion&gt;` | Gets the list of shaded regions drawn between pairs of buffers. Each entry is rendered independently and can use a different color mode and opacity. |
| `Label` | `string` | Sets the list of shaded regions drawn between pairs of buffers. <param name="regions">The list of shaded regions.</param> public void SetFillRegions(IEnumerable<IndicatorFillRegion> regions) { ArgumentNullException.ThrowIfNull(regions); _fillRegions.Clear(); _fillRegions.AddRange(regions); } } Rendering metadata for a single indicator plot (line, histogram, dots, …). Each visible buffer should have a corresponding <see cref="IndicatorLabel"/> entry in <see cref="IndicatorProperty.Labels"/>. public class IndicatorLabel { Gets or sets the human-readable name shown in the crosshair tooltip and legend. |
| `Type` | `IndicatorDrawType` | Gets or sets the draw primitive used to render this plot. Default is <see cref="IndicatorDrawType.Line"/>. |
| `Color` | `IndicatorColor` | Gets or sets the fallback color for this plot. Used when <see cref="ColorIndexBuffer"/> is not set or yields no valid palette entry. Default is <see cref="IndicatorColor.Blue"/>. |
| `Style` | `IndicatorStyle` | Gets or sets the dash style for line-type plots. Default is <see cref="IndicatorStyle.Solid"/>. |
| `Width` | `double` | Gets or sets the stroke width. Default is 1.0. |
| `Visible` | `bool` | Gets or sets whether this plot is currently visible on the chart. |
| `Digit` | `int?` | Gets or sets the optional number of decimal places shown for this plot in crosshair and tooltip overlays. When <c>null</c>, the indicator-level default precision is used. |
| `ColorIndexBuffer` | `int?` | Gets or sets the optional buffer index that contains per-point color indexes for this plot. The referenced buffer must be registered as <see cref="IndicatorBufferType.ColorIndex"/>. When <c>null</c>, <see cref="Color"/> is used uniformly for every point. Each indicator label may reference a different color-index buffer, so a multi-line indicator can have each line change color independently. |
| `Name` | `string` | Gets the color palette used when <see cref="ColorIndexBuffer"/> is set. The key is an integer color index written into the color buffer by <c>OnCalculate</c>; the value is the <see cref="IndicatorColor"/> to render for that index. Points whose index is not present in the palette fall back to <see cref="Color"/>. <example> <code> ColorPalette = new Dictionary&lt;int, IndicatorColor&gt; { { 0, IndicatorColor.Red }, // bearish { 1, IndicatorColor.Lime } // bullish } </code> </example> #pragma warning disable CA2227 public IDictionary<int, IndicatorColor> ColorPalette { get; set; } = new Dictionary<int, IndicatorColor>(); #pragma warning restore CA2227 } Display and buffer metadata for an indicator. Passed to the chart engine to control how the indicator is rendered, which timeframes it appears on, and which additional UI elements (bounds, fills, …) are shown. public class IndicatorProperty { Gets or sets the display name shown on the chart legend and in dialogs (e.g. <c>"RSI(14)"</c>, <c>"SuperTrend(10,3)"</c>). |
| `IsVisible` | `bool` | Gets or sets whether the indicator is rendered on the chart. Default is <c>true</c>. |
| `IsInternal` | `bool` | Gets or sets whether this indicator is hidden from the indicator selection menus. Set to <c>true</c> for internally chained indicators that should not be added manually. |
| `Window` | `IndicatorWindow` | Gets the chart panel where the indicator is drawn. <see cref="IndicatorWindow.Main"/> renders over the price bars; <see cref="IndicatorWindow.Separate"/> renders in its own panel below the chart. |
| `Buffers` | `int` | Gets the total number of buffers allocated for this indicator, including <see cref="IndicatorBufferType.Data"/>, <see cref="IndicatorBufferType.ColorIndex"/>, and <see cref="IndicatorBufferType.Calculations"/> buffers. Must match the number of <c>SetBuffer</c> calls in <c>OnInit</c>. |
| `Plots` | `int` | Gets the number of visible plots (i.e. entries in <see cref="Labels"/>). Used for informational purposes; the renderer drives visibility from <see cref="Labels"/> directly. |
| `VisibleTimeframes` | `TimeFrameOptions` | Gets or sets the per-buffer rendering metadata. Key: zero-based buffer index (must correspond to a <see cref="IndicatorBufferType.Data"/> buffer). Buffers without an entry are not rendered. public IReadOnlyDictionary<int, IndicatorLabel> Labels { get; set; } = new Dictionary<int, IndicatorLabel>(); Gets or sets the set of timeframes on which this indicator is displayed. Default is <see cref="TimeFrameOptions.AllPeriods"/>. |
| `SpecialFeatures` | `IndicatorSpecialFeatures` | Gets or sets additional rendering features such as bound lines, zero line, histogram colors, and fill regions between buffers. |

### IndicatorSpecialFeatures

Defines a shaded region drawn between two indicator buffers (e.g. Ichimoku Kumo cloud). public class IndicatorFillRegion { Gets or sets a human-readable label for this region (e.g. "Kumo"). public string Name { get; set; } = string.Empty; Gets or sets whether the fill is currently active. public bool Enabled { get; set; } = true; Gets or sets whether the fill is shown in the indicator settings dialog. public bool Visible { get; set; } = true; Gets or sets the buffer index whose values define the top boundary of the fill. public int UpperBufferIndex { get; set; } Gets or sets the buffer index whose values define the bottom boundary of the fill. public int LowerBufferIndex { get; set; } Gets or sets how the fill color is selected. Use <see cref="IndicatorFillColorMode.Fixed"/> for a constant color, or <see cref="IndicatorFillColorMode.BullishBearish"/> to switch between <see cref="BullishColor"/> and <see cref="BearishColor"/> based on the relative positions of the upper and lower buffers. public IndicatorFillColorMode ColorMode { get; set; } = IndicatorFillColorMode.Fixed; Gets or sets the color used when <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.Fixed"/>. public IndicatorColor FillColor { get; set; } = IndicatorColor.LightGreen; Gets or sets the color used when upper ≥ lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. public IndicatorColor BullishColor { get; set; } = IndicatorColor.LightGreen; Gets or sets the color used when upper &lt; lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. public IndicatorColor BearishColor { get; set; } = IndicatorColor.Pink; Gets or sets the fill transparency (0 = fully transparent, 255 = fully opaque). Default is 72. public byte Opacity { get; set; } = 72; } Optional display features for specific indicator families. These settings add extra chart elements such as bound lines, a zero line, histogram coloring, and fill regions between buffers.

| Property | Type | Description |
|---|---|---|
| `Name` | `string` | Defines a shaded region drawn between two indicator buffers (e.g. Ichimoku Kumo cloud). public class IndicatorFillRegion { Gets or sets a human-readable label for this region (e.g. "Kumo"). |
| `Enabled` | `bool` | Gets or sets whether the fill is currently active. |
| `Visible` | `bool` | Gets or sets whether the fill is shown in the indicator settings dialog. |
| `UpperBufferIndex` | `int` | Gets or sets the buffer index whose values define the top boundary of the fill. |
| `LowerBufferIndex` | `int` | Gets or sets the buffer index whose values define the bottom boundary of the fill. |
| `ColorMode` | `IndicatorFillColorMode` | Gets or sets how the fill color is selected. Use <see cref="IndicatorFillColorMode.Fixed"/> for a constant color, or <see cref="IndicatorFillColorMode.BullishBearish"/> to switch between <see cref="BullishColor"/> and <see cref="BearishColor"/> based on the relative positions of the upper and lower buffers. |
| `FillColor` | `IndicatorColor` | Gets or sets the color used when <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.Fixed"/>. |
| `BullishColor` | `IndicatorColor` | Gets or sets the color used when upper ≥ lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. |
| `BearishColor` | `IndicatorColor` | Gets or sets the color used when upper &lt; lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. |
| `Opacity` | `byte` | Gets or sets the fill transparency (0 = fully transparent, 255 = fully opaque). Default is 72. |
| `UseRangeValue` | `bool` | Optional display features for specific indicator families. These settings add extra chart elements such as bound lines, a zero line, histogram coloring, and fill regions between buffers. public class IndicatorSpecialFeatures { Gets or sets whether to lock the Y-axis range to <see cref="MinValue"/>/<see cref="MaxValue"/> rather than auto-scaling to visible data (e.g. RSI 0–100). |
| `MinValue` | `double` | Gets or sets the fixed minimum Y value when <see cref="UseRangeValue"/> is <c>true</c>. |
| `MaxValue` | `double` | Gets or sets the fixed maximum Y value when <see cref="UseRangeValue"/> is <c>true</c>. |
| `ShowUpperBound` | `bool` | Gets or sets whether to draw a horizontal upper-bound line (e.g. RSI overbought at 70). |
| `ShowLowerBound` | `bool` | Gets or sets whether to draw a horizontal lower-bound line (e.g. RSI oversold at 30). |
| `ShowCenterLine` | `bool` | Gets or sets whether to draw a horizontal center line (e.g. RSI midpoint at 50). |
| `UpperBoundValue` | `double` | Gets or sets the Y value of the upper-bound line. Default is 70. |
| `UpperBoundWidth` | `double` | Gets or sets the stroke width of the upper-bound line. Default is 1.0. |
| `LowerBoundValue` | `double` | Gets or sets the Y value of the lower-bound line. Default is 30. |
| `LowerBoundWidth` | `double` | Gets or sets the stroke width of the lower-bound line. Default is 1.0. |
| `CenterLineValue` | `double` | Gets or sets the Y value of the center line. Default is 50. |
| `CenterLineWidth` | `double` | Gets or sets the stroke width of the center line. Default is 1.0. |
| `UpperBoundColor` | `IndicatorColor` | Gets or sets the color of the upper-bound line. Default is <see cref="IndicatorColor.Red"/>. |
| `LowerBoundColor` | `IndicatorColor` | Gets or sets the color of the lower-bound line. Default is <see cref="IndicatorColor.Green"/>. |
| `CenterLineColor` | `IndicatorColor` | Gets or sets the color of the center line. Default is <see cref="IndicatorColor.Gray"/>. |
| `BoundLineStyle` | `IndicatorStyle` | Gets or sets the dash style shared by all bound lines. Default is <see cref="IndicatorStyle.Dashed"/>. |
| `ShowBoundFill` | `bool` | Gets or sets whether to fill the area between the upper-bound line and the lower-bound line. Only rendered when both <see cref="ShowUpperBound"/> and <see cref="ShowLowerBound"/> are <c>true</c>. |
| `BoundFillColor` | `IndicatorColor` | Gets or sets the fill color used between the upper and lower bound lines. Default is <see cref="IndicatorColor.Gray"/>. |
| `BoundFillOpacity` | `byte` | Gets or sets the fill transparency for the bound area (0 = fully transparent, 255 = fully opaque). Default is 30. |
| `ShowHistogram` | `bool` | Gets or sets whether to render the primary buffer as a histogram. |
| `HistogramPositiveColor` | `IndicatorColor` | Gets or sets the color for histogram bars with positive values. Default is <see cref="IndicatorColor.Green"/>. |
| `HistogramNegativeColor` | `IndicatorColor` | Gets or sets the color for histogram bars with negative values. Default is <see cref="IndicatorColor.Red"/>. |
| `ShowZeroLine` | `bool` | Gets or sets whether to draw a horizontal zero line across the panel. |
| `ZeroLineWidth` | `double` | Gets or sets the stroke width of the zero line. Default is 1.0. |
| `ZeroLineColor` | `IndicatorColor` | Gets or sets the color of the zero line. Default is <see cref="IndicatorColor.Gray"/>. |
| `FillRegions` | `IEnumerable&lt;IndicatorFillRegion&gt;` | Gets the list of shaded regions drawn between pairs of buffers. Each entry is rendered independently and can use a different color mode and opacity. |
| `Label` | `string` | Sets the list of shaded regions drawn between pairs of buffers. <param name="regions">The list of shaded regions.</param> public void SetFillRegions(IEnumerable<IndicatorFillRegion> regions) { ArgumentNullException.ThrowIfNull(regions); _fillRegions.Clear(); _fillRegions.AddRange(regions); } } Rendering metadata for a single indicator plot (line, histogram, dots, …). Each visible buffer should have a corresponding <see cref="IndicatorLabel"/> entry in <see cref="IndicatorProperty.Labels"/>. public class IndicatorLabel { Gets or sets the human-readable name shown in the crosshair tooltip and legend. |
| `Type` | `IndicatorDrawType` | Gets or sets the draw primitive used to render this plot. Default is <see cref="IndicatorDrawType.Line"/>. |
| `Color` | `IndicatorColor` | Gets or sets the fallback color for this plot. Used when <see cref="ColorIndexBuffer"/> is not set or yields no valid palette entry. Default is <see cref="IndicatorColor.Blue"/>. |
| `Style` | `IndicatorStyle` | Gets or sets the dash style for line-type plots. Default is <see cref="IndicatorStyle.Solid"/>. |
| `Width` | `double` | Gets or sets the stroke width. Default is 1.0. |
| `Visible` | `bool` | Gets or sets whether this plot is currently visible on the chart. |
| `Digit` | `int?` | Gets or sets the optional number of decimal places shown for this plot in crosshair and tooltip overlays. When <c>null</c>, the indicator-level default precision is used. |
| `ColorIndexBuffer` | `int?` | Gets or sets the optional buffer index that contains per-point color indexes for this plot. The referenced buffer must be registered as <see cref="IndicatorBufferType.ColorIndex"/>. When <c>null</c>, <see cref="Color"/> is used uniformly for every point. Each indicator label may reference a different color-index buffer, so a multi-line indicator can have each line change color independently. |
| `Name` | `string` | Gets the color palette used when <see cref="ColorIndexBuffer"/> is set. The key is an integer color index written into the color buffer by <c>OnCalculate</c>; the value is the <see cref="IndicatorColor"/> to render for that index. Points whose index is not present in the palette fall back to <see cref="Color"/>. <example> <code> ColorPalette = new Dictionary&lt;int, IndicatorColor&gt; { { 0, IndicatorColor.Red }, // bearish { 1, IndicatorColor.Lime } // bullish } </code> </example> #pragma warning disable CA2227 public IDictionary<int, IndicatorColor> ColorPalette { get; set; } = new Dictionary<int, IndicatorColor>(); #pragma warning restore CA2227 } Display and buffer metadata for an indicator. Passed to the chart engine to control how the indicator is rendered, which timeframes it appears on, and which additional UI elements (bounds, fills, …) are shown. public class IndicatorProperty { Gets or sets the display name shown on the chart legend and in dialogs (e.g. <c>"RSI(14)"</c>, <c>"SuperTrend(10,3)"</c>). |
| `IsVisible` | `bool` | Gets or sets whether the indicator is rendered on the chart. Default is <c>true</c>. |
| `IsInternal` | `bool` | Gets or sets whether this indicator is hidden from the indicator selection menus. Set to <c>true</c> for internally chained indicators that should not be added manually. |
| `Window` | `IndicatorWindow` | Gets the chart panel where the indicator is drawn. <see cref="IndicatorWindow.Main"/> renders over the price bars; <see cref="IndicatorWindow.Separate"/> renders in its own panel below the chart. |
| `Buffers` | `int` | Gets the total number of buffers allocated for this indicator, including <see cref="IndicatorBufferType.Data"/>, <see cref="IndicatorBufferType.ColorIndex"/>, and <see cref="IndicatorBufferType.Calculations"/> buffers. Must match the number of <c>SetBuffer</c> calls in <c>OnInit</c>. |
| `Plots` | `int` | Gets the number of visible plots (i.e. entries in <see cref="Labels"/>). Used for informational purposes; the renderer drives visibility from <see cref="Labels"/> directly. |
| `VisibleTimeframes` | `TimeFrameOptions` | Gets or sets the per-buffer rendering metadata. Key: zero-based buffer index (must correspond to a <see cref="IndicatorBufferType.Data"/> buffer). Buffers without an entry are not rendered. public IReadOnlyDictionary<int, IndicatorLabel> Labels { get; set; } = new Dictionary<int, IndicatorLabel>(); Gets or sets the set of timeframes on which this indicator is displayed. Default is <see cref="TimeFrameOptions.AllPeriods"/>. |
| `SpecialFeatures` | `IndicatorSpecialFeatures` | Gets or sets additional rendering features such as bound lines, zero line, histogram colors, and fill regions between buffers. |

### IndicatorLabel

Defines a shaded region drawn between two indicator buffers (e.g. Ichimoku Kumo cloud). public class IndicatorFillRegion { Gets or sets a human-readable label for this region (e.g. "Kumo"). public string Name { get; set; } = string.Empty; Gets or sets whether the fill is currently active. public bool Enabled { get; set; } = true; Gets or sets whether the fill is shown in the indicator settings dialog. public bool Visible { get; set; } = true; Gets or sets the buffer index whose values define the top boundary of the fill. public int UpperBufferIndex { get; set; } Gets or sets the buffer index whose values define the bottom boundary of the fill. public int LowerBufferIndex { get; set; } Gets or sets how the fill color is selected. Use <see cref="IndicatorFillColorMode.Fixed"/> for a constant color, or <see cref="IndicatorFillColorMode.BullishBearish"/> to switch between <see cref="BullishColor"/> and <see cref="BearishColor"/> based on the relative positions of the upper and lower buffers. public IndicatorFillColorMode ColorMode { get; set; } = IndicatorFillColorMode.Fixed; Gets or sets the color used when <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.Fixed"/>. public IndicatorColor FillColor { get; set; } = IndicatorColor.LightGreen; Gets or sets the color used when upper ≥ lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. public IndicatorColor BullishColor { get; set; } = IndicatorColor.LightGreen; Gets or sets the color used when upper &lt; lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. public IndicatorColor BearishColor { get; set; } = IndicatorColor.Pink; Gets or sets the fill transparency (0 = fully transparent, 255 = fully opaque). Default is 72. public byte Opacity { get; set; } = 72; } Optional display features for specific indicator families. These settings add extra chart elements such as bound lines, a zero line, histogram coloring, and fill regions between buffers. public class IndicatorSpecialFeatures { Gets or sets whether to lock the Y-axis range to <see cref="MinValue"/>/<see cref="MaxValue"/> rather than auto-scaling to visible data (e.g. RSI 0–100). public bool UseRangeValue { get; set; } Gets or sets the fixed minimum Y value when <see cref="UseRangeValue"/> is <c>true</c>. public double MinValue { get; set; } = double.MinValue; Gets or sets the fixed maximum Y value when <see cref="UseRangeValue"/> is <c>true</c>. public double MaxValue { get; set; } = double.MaxValue; ── Bound lines (RSI, Stochastic, …) ─────────────────────────────────── Gets or sets whether to draw a horizontal upper-bound line (e.g. RSI overbought at 70). public bool ShowUpperBound { get; set; } Gets or sets whether to draw a horizontal lower-bound line (e.g. RSI oversold at 30). public bool ShowLowerBound { get; set; } Gets or sets whether to draw a horizontal center line (e.g. RSI midpoint at 50). public bool ShowCenterLine { get; set; } Gets or sets the Y value of the upper-bound line. Default is 70. public double UpperBoundValue { get; set; } = 70; Gets or sets the stroke width of the upper-bound line. Default is 1.0. public double UpperBoundWidth { get; set; } = 1.0; Gets or sets the Y value of the lower-bound line. Default is 30. public double LowerBoundValue { get; set; } = 30; Gets or sets the stroke width of the lower-bound line. Default is 1.0. public double LowerBoundWidth { get; set; } = 1.0; Gets or sets the Y value of the center line. Default is 50. public double CenterLineValue { get; set; } = 50; Gets or sets the stroke width of the center line. Default is 1.0. public double CenterLineWidth { get; set; } = 1.0; Gets or sets the color of the upper-bound line. Default is <see cref="IndicatorColor.Red"/>. public IndicatorColor UpperBoundColor { get; set; } = IndicatorColor.Gray; Gets or sets the color of the lower-bound line. Default is <see cref="IndicatorColor.Green"/>. public IndicatorColor LowerBoundColor { get; set; } = IndicatorColor.Gray; Gets or sets the color of the center line. Default is <see cref="IndicatorColor.Gray"/>. public IndicatorColor CenterLineColor { get; set; } = IndicatorColor.Gray; Gets or sets the dash style shared by all bound lines. Default is <see cref="IndicatorStyle.Dashed"/>. public IndicatorStyle BoundLineStyle { get; set; } = IndicatorStyle.Dashed; ── Bound fill (optional shade between upper and lower bound lines) ──── Gets or sets whether to fill the area between the upper-bound line and the lower-bound line. Only rendered when both <see cref="ShowUpperBound"/> and <see cref="ShowLowerBound"/> are <c>true</c>. public bool ShowBoundFill { get; set; } Gets or sets the fill color used between the upper and lower bound lines. Default is <see cref="IndicatorColor.Gray"/>. public IndicatorColor BoundFillColor { get; set; } = IndicatorColor.Gray; Gets or sets the fill transparency for the bound area (0 = fully transparent, 255 = fully opaque). Default is 30. public byte BoundFillOpacity { get; set; } = 30; ── Histogram (MACD, …) ───────────────────────────────────────────────── Gets or sets whether to render the primary buffer as a histogram. public bool ShowHistogram { get; set; } Gets or sets the color for histogram bars with positive values. Default is <see cref="IndicatorColor.Green"/>. public IndicatorColor HistogramPositiveColor { get; set; } = IndicatorColor.Green; Gets or sets the color for histogram bars with negative values. Default is <see cref="IndicatorColor.Red"/>. public IndicatorColor HistogramNegativeColor { get; set; } = IndicatorColor.Red; Gets or sets whether to draw a horizontal zero line across the panel. public bool ShowZeroLine { get; set; } Gets or sets the stroke width of the zero line. Default is 1.0. public double ZeroLineWidth { get; set; } = 1.0; Gets or sets the color of the zero line. Default is <see cref="IndicatorColor.Gray"/>. public IndicatorColor ZeroLineColor { get; set; } = IndicatorColor.Gray; ── Fill regions ──────────────────────────────────────────────────────── private readonly List<IndicatorFillRegion> _fillRegions = new(); Gets the list of shaded regions drawn between pairs of buffers. Each entry is rendered independently and can use a different color mode and opacity. public IEnumerable<IndicatorFillRegion> FillRegions { get => _fillRegions; init { if (value != null) { _fillRegions.Clear(); _fillRegions.AddRange(value); } } } Sets the list of shaded regions drawn between pairs of buffers. <param name="regions">The list of shaded regions.</param> public void SetFillRegions(IEnumerable<IndicatorFillRegion> regions) { ArgumentNullException.ThrowIfNull(regions); _fillRegions.Clear(); _fillRegions.AddRange(regions); } } Rendering metadata for a single indicator plot (line, histogram, dots, …). Each visible buffer should have a corresponding <see cref="IndicatorLabel"/> entry in <see cref="IndicatorProperty.Labels"/>.

| Property | Type | Description |
|---|---|---|
| `Name` | `string` | Defines a shaded region drawn between two indicator buffers (e.g. Ichimoku Kumo cloud). public class IndicatorFillRegion { Gets or sets a human-readable label for this region (e.g. "Kumo"). |
| `Enabled` | `bool` | Gets or sets whether the fill is currently active. |
| `Visible` | `bool` | Gets or sets whether the fill is shown in the indicator settings dialog. |
| `UpperBufferIndex` | `int` | Gets or sets the buffer index whose values define the top boundary of the fill. |
| `LowerBufferIndex` | `int` | Gets or sets the buffer index whose values define the bottom boundary of the fill. |
| `ColorMode` | `IndicatorFillColorMode` | Gets or sets how the fill color is selected. Use <see cref="IndicatorFillColorMode.Fixed"/> for a constant color, or <see cref="IndicatorFillColorMode.BullishBearish"/> to switch between <see cref="BullishColor"/> and <see cref="BearishColor"/> based on the relative positions of the upper and lower buffers. |
| `FillColor` | `IndicatorColor` | Gets or sets the color used when <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.Fixed"/>. |
| `BullishColor` | `IndicatorColor` | Gets or sets the color used when upper ≥ lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. |
| `BearishColor` | `IndicatorColor` | Gets or sets the color used when upper &lt; lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. |
| `Opacity` | `byte` | Gets or sets the fill transparency (0 = fully transparent, 255 = fully opaque). Default is 72. |
| `UseRangeValue` | `bool` | Optional display features for specific indicator families. These settings add extra chart elements such as bound lines, a zero line, histogram coloring, and fill regions between buffers. public class IndicatorSpecialFeatures { Gets or sets whether to lock the Y-axis range to <see cref="MinValue"/>/<see cref="MaxValue"/> rather than auto-scaling to visible data (e.g. RSI 0–100). |
| `MinValue` | `double` | Gets or sets the fixed minimum Y value when <see cref="UseRangeValue"/> is <c>true</c>. |
| `MaxValue` | `double` | Gets or sets the fixed maximum Y value when <see cref="UseRangeValue"/> is <c>true</c>. |
| `ShowUpperBound` | `bool` | Gets or sets whether to draw a horizontal upper-bound line (e.g. RSI overbought at 70). |
| `ShowLowerBound` | `bool` | Gets or sets whether to draw a horizontal lower-bound line (e.g. RSI oversold at 30). |
| `ShowCenterLine` | `bool` | Gets or sets whether to draw a horizontal center line (e.g. RSI midpoint at 50). |
| `UpperBoundValue` | `double` | Gets or sets the Y value of the upper-bound line. Default is 70. |
| `UpperBoundWidth` | `double` | Gets or sets the stroke width of the upper-bound line. Default is 1.0. |
| `LowerBoundValue` | `double` | Gets or sets the Y value of the lower-bound line. Default is 30. |
| `LowerBoundWidth` | `double` | Gets or sets the stroke width of the lower-bound line. Default is 1.0. |
| `CenterLineValue` | `double` | Gets or sets the Y value of the center line. Default is 50. |
| `CenterLineWidth` | `double` | Gets or sets the stroke width of the center line. Default is 1.0. |
| `UpperBoundColor` | `IndicatorColor` | Gets or sets the color of the upper-bound line. Default is <see cref="IndicatorColor.Red"/>. |
| `LowerBoundColor` | `IndicatorColor` | Gets or sets the color of the lower-bound line. Default is <see cref="IndicatorColor.Green"/>. |
| `CenterLineColor` | `IndicatorColor` | Gets or sets the color of the center line. Default is <see cref="IndicatorColor.Gray"/>. |
| `BoundLineStyle` | `IndicatorStyle` | Gets or sets the dash style shared by all bound lines. Default is <see cref="IndicatorStyle.Dashed"/>. |
| `ShowBoundFill` | `bool` | Gets or sets whether to fill the area between the upper-bound line and the lower-bound line. Only rendered when both <see cref="ShowUpperBound"/> and <see cref="ShowLowerBound"/> are <c>true</c>. |
| `BoundFillColor` | `IndicatorColor` | Gets or sets the fill color used between the upper and lower bound lines. Default is <see cref="IndicatorColor.Gray"/>. |
| `BoundFillOpacity` | `byte` | Gets or sets the fill transparency for the bound area (0 = fully transparent, 255 = fully opaque). Default is 30. |
| `ShowHistogram` | `bool` | Gets or sets whether to render the primary buffer as a histogram. |
| `HistogramPositiveColor` | `IndicatorColor` | Gets or sets the color for histogram bars with positive values. Default is <see cref="IndicatorColor.Green"/>. |
| `HistogramNegativeColor` | `IndicatorColor` | Gets or sets the color for histogram bars with negative values. Default is <see cref="IndicatorColor.Red"/>. |
| `ShowZeroLine` | `bool` | Gets or sets whether to draw a horizontal zero line across the panel. |
| `ZeroLineWidth` | `double` | Gets or sets the stroke width of the zero line. Default is 1.0. |
| `ZeroLineColor` | `IndicatorColor` | Gets or sets the color of the zero line. Default is <see cref="IndicatorColor.Gray"/>. |
| `FillRegions` | `IEnumerable&lt;IndicatorFillRegion&gt;` | Gets the list of shaded regions drawn between pairs of buffers. Each entry is rendered independently and can use a different color mode and opacity. |
| `Label` | `string` | Sets the list of shaded regions drawn between pairs of buffers. <param name="regions">The list of shaded regions.</param> public void SetFillRegions(IEnumerable<IndicatorFillRegion> regions) { ArgumentNullException.ThrowIfNull(regions); _fillRegions.Clear(); _fillRegions.AddRange(regions); } } Rendering metadata for a single indicator plot (line, histogram, dots, …). Each visible buffer should have a corresponding <see cref="IndicatorLabel"/> entry in <see cref="IndicatorProperty.Labels"/>. public class IndicatorLabel { Gets or sets the human-readable name shown in the crosshair tooltip and legend. |
| `Type` | `IndicatorDrawType` | Gets or sets the draw primitive used to render this plot. Default is <see cref="IndicatorDrawType.Line"/>. |
| `Color` | `IndicatorColor` | Gets or sets the fallback color for this plot. Used when <see cref="ColorIndexBuffer"/> is not set or yields no valid palette entry. Default is <see cref="IndicatorColor.Blue"/>. |
| `Style` | `IndicatorStyle` | Gets or sets the dash style for line-type plots. Default is <see cref="IndicatorStyle.Solid"/>. |
| `Width` | `double` | Gets or sets the stroke width. Default is 1.0. |
| `Visible` | `bool` | Gets or sets whether this plot is currently visible on the chart. |
| `Digit` | `int?` | Gets or sets the optional number of decimal places shown for this plot in crosshair and tooltip overlays. When <c>null</c>, the indicator-level default precision is used. |
| `ColorIndexBuffer` | `int?` | Gets or sets the optional buffer index that contains per-point color indexes for this plot. The referenced buffer must be registered as <see cref="IndicatorBufferType.ColorIndex"/>. When <c>null</c>, <see cref="Color"/> is used uniformly for every point. Each indicator label may reference a different color-index buffer, so a multi-line indicator can have each line change color independently. |
| `Name` | `string` | Gets the color palette used when <see cref="ColorIndexBuffer"/> is set. The key is an integer color index written into the color buffer by <c>OnCalculate</c>; the value is the <see cref="IndicatorColor"/> to render for that index. Points whose index is not present in the palette fall back to <see cref="Color"/>. <example> <code> ColorPalette = new Dictionary&lt;int, IndicatorColor&gt; { { 0, IndicatorColor.Red }, // bearish { 1, IndicatorColor.Lime } // bullish } </code> </example> #pragma warning disable CA2227 public IDictionary<int, IndicatorColor> ColorPalette { get; set; } = new Dictionary<int, IndicatorColor>(); #pragma warning restore CA2227 } Display and buffer metadata for an indicator. Passed to the chart engine to control how the indicator is rendered, which timeframes it appears on, and which additional UI elements (bounds, fills, …) are shown. public class IndicatorProperty { Gets or sets the display name shown on the chart legend and in dialogs (e.g. <c>"RSI(14)"</c>, <c>"SuperTrend(10,3)"</c>). |
| `IsVisible` | `bool` | Gets or sets whether the indicator is rendered on the chart. Default is <c>true</c>. |
| `IsInternal` | `bool` | Gets or sets whether this indicator is hidden from the indicator selection menus. Set to <c>true</c> for internally chained indicators that should not be added manually. |
| `Window` | `IndicatorWindow` | Gets the chart panel where the indicator is drawn. <see cref="IndicatorWindow.Main"/> renders over the price bars; <see cref="IndicatorWindow.Separate"/> renders in its own panel below the chart. |
| `Buffers` | `int` | Gets the total number of buffers allocated for this indicator, including <see cref="IndicatorBufferType.Data"/>, <see cref="IndicatorBufferType.ColorIndex"/>, and <see cref="IndicatorBufferType.Calculations"/> buffers. Must match the number of <c>SetBuffer</c> calls in <c>OnInit</c>. |
| `Plots` | `int` | Gets the number of visible plots (i.e. entries in <see cref="Labels"/>). Used for informational purposes; the renderer drives visibility from <see cref="Labels"/> directly. |
| `VisibleTimeframes` | `TimeFrameOptions` | Gets or sets the per-buffer rendering metadata. Key: zero-based buffer index (must correspond to a <see cref="IndicatorBufferType.Data"/> buffer). Buffers without an entry are not rendered. public IReadOnlyDictionary<int, IndicatorLabel> Labels { get; set; } = new Dictionary<int, IndicatorLabel>(); Gets or sets the set of timeframes on which this indicator is displayed. Default is <see cref="TimeFrameOptions.AllPeriods"/>. |
| `SpecialFeatures` | `IndicatorSpecialFeatures` | Gets or sets additional rendering features such as bound lines, zero line, histogram colors, and fill regions between buffers. |

### IndicatorProperty

Defines a shaded region drawn between two indicator buffers (e.g. Ichimoku Kumo cloud). public class IndicatorFillRegion { Gets or sets a human-readable label for this region (e.g. "Kumo"). public string Name { get; set; } = string.Empty; Gets or sets whether the fill is currently active. public bool Enabled { get; set; } = true; Gets or sets whether the fill is shown in the indicator settings dialog. public bool Visible { get; set; } = true; Gets or sets the buffer index whose values define the top boundary of the fill. public int UpperBufferIndex { get; set; } Gets or sets the buffer index whose values define the bottom boundary of the fill. public int LowerBufferIndex { get; set; } Gets or sets how the fill color is selected. Use <see cref="IndicatorFillColorMode.Fixed"/> for a constant color, or <see cref="IndicatorFillColorMode.BullishBearish"/> to switch between <see cref="BullishColor"/> and <see cref="BearishColor"/> based on the relative positions of the upper and lower buffers. public IndicatorFillColorMode ColorMode { get; set; } = IndicatorFillColorMode.Fixed; Gets or sets the color used when <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.Fixed"/>. public IndicatorColor FillColor { get; set; } = IndicatorColor.LightGreen; Gets or sets the color used when upper ≥ lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. public IndicatorColor BullishColor { get; set; } = IndicatorColor.LightGreen; Gets or sets the color used when upper &lt; lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. public IndicatorColor BearishColor { get; set; } = IndicatorColor.Pink; Gets or sets the fill transparency (0 = fully transparent, 255 = fully opaque). Default is 72. public byte Opacity { get; set; } = 72; } Optional display features for specific indicator families. These settings add extra chart elements such as bound lines, a zero line, histogram coloring, and fill regions between buffers. public class IndicatorSpecialFeatures { Gets or sets whether to lock the Y-axis range to <see cref="MinValue"/>/<see cref="MaxValue"/> rather than auto-scaling to visible data (e.g. RSI 0–100). public bool UseRangeValue { get; set; } Gets or sets the fixed minimum Y value when <see cref="UseRangeValue"/> is <c>true</c>. public double MinValue { get; set; } = double.MinValue; Gets or sets the fixed maximum Y value when <see cref="UseRangeValue"/> is <c>true</c>. public double MaxValue { get; set; } = double.MaxValue; ── Bound lines (RSI, Stochastic, …) ─────────────────────────────────── Gets or sets whether to draw a horizontal upper-bound line (e.g. RSI overbought at 70). public bool ShowUpperBound { get; set; } Gets or sets whether to draw a horizontal lower-bound line (e.g. RSI oversold at 30). public bool ShowLowerBound { get; set; } Gets or sets whether to draw a horizontal center line (e.g. RSI midpoint at 50). public bool ShowCenterLine { get; set; } Gets or sets the Y value of the upper-bound line. Default is 70. public double UpperBoundValue { get; set; } = 70; Gets or sets the stroke width of the upper-bound line. Default is 1.0. public double UpperBoundWidth { get; set; } = 1.0; Gets or sets the Y value of the lower-bound line. Default is 30. public double LowerBoundValue { get; set; } = 30; Gets or sets the stroke width of the lower-bound line. Default is 1.0. public double LowerBoundWidth { get; set; } = 1.0; Gets or sets the Y value of the center line. Default is 50. public double CenterLineValue { get; set; } = 50; Gets or sets the stroke width of the center line. Default is 1.0. public double CenterLineWidth { get; set; } = 1.0; Gets or sets the color of the upper-bound line. Default is <see cref="IndicatorColor.Red"/>. public IndicatorColor UpperBoundColor { get; set; } = IndicatorColor.Gray; Gets or sets the color of the lower-bound line. Default is <see cref="IndicatorColor.Green"/>. public IndicatorColor LowerBoundColor { get; set; } = IndicatorColor.Gray; Gets or sets the color of the center line. Default is <see cref="IndicatorColor.Gray"/>. public IndicatorColor CenterLineColor { get; set; } = IndicatorColor.Gray; Gets or sets the dash style shared by all bound lines. Default is <see cref="IndicatorStyle.Dashed"/>. public IndicatorStyle BoundLineStyle { get; set; } = IndicatorStyle.Dashed; ── Bound fill (optional shade between upper and lower bound lines) ──── Gets or sets whether to fill the area between the upper-bound line and the lower-bound line. Only rendered when both <see cref="ShowUpperBound"/> and <see cref="ShowLowerBound"/> are <c>true</c>. public bool ShowBoundFill { get; set; } Gets or sets the fill color used between the upper and lower bound lines. Default is <see cref="IndicatorColor.Gray"/>. public IndicatorColor BoundFillColor { get; set; } = IndicatorColor.Gray; Gets or sets the fill transparency for the bound area (0 = fully transparent, 255 = fully opaque). Default is 30. public byte BoundFillOpacity { get; set; } = 30; ── Histogram (MACD, …) ───────────────────────────────────────────────── Gets or sets whether to render the primary buffer as a histogram. public bool ShowHistogram { get; set; } Gets or sets the color for histogram bars with positive values. Default is <see cref="IndicatorColor.Green"/>. public IndicatorColor HistogramPositiveColor { get; set; } = IndicatorColor.Green; Gets or sets the color for histogram bars with negative values. Default is <see cref="IndicatorColor.Red"/>. public IndicatorColor HistogramNegativeColor { get; set; } = IndicatorColor.Red; Gets or sets whether to draw a horizontal zero line across the panel. public bool ShowZeroLine { get; set; } Gets or sets the stroke width of the zero line. Default is 1.0. public double ZeroLineWidth { get; set; } = 1.0; Gets or sets the color of the zero line. Default is <see cref="IndicatorColor.Gray"/>. public IndicatorColor ZeroLineColor { get; set; } = IndicatorColor.Gray; ── Fill regions ──────────────────────────────────────────────────────── private readonly List<IndicatorFillRegion> _fillRegions = new(); Gets the list of shaded regions drawn between pairs of buffers. Each entry is rendered independently and can use a different color mode and opacity. public IEnumerable<IndicatorFillRegion> FillRegions { get => _fillRegions; init { if (value != null) { _fillRegions.Clear(); _fillRegions.AddRange(value); } } } Sets the list of shaded regions drawn between pairs of buffers. <param name="regions">The list of shaded regions.</param> public void SetFillRegions(IEnumerable<IndicatorFillRegion> regions) { ArgumentNullException.ThrowIfNull(regions); _fillRegions.Clear(); _fillRegions.AddRange(regions); } } Rendering metadata for a single indicator plot (line, histogram, dots, …). Each visible buffer should have a corresponding <see cref="IndicatorLabel"/> entry in <see cref="IndicatorProperty.Labels"/>. public class IndicatorLabel { Gets or sets the human-readable name shown in the crosshair tooltip and legend. public string Label { get; set; } = string.Empty; Gets or sets the draw primitive used to render this plot. Default is <see cref="IndicatorDrawType.Line"/>. public IndicatorDrawType Type { get; set; } = IndicatorDrawType.Line; Gets or sets the fallback color for this plot. Used when <see cref="ColorIndexBuffer"/> is not set or yields no valid palette entry. Default is <see cref="IndicatorColor.Blue"/>. public IndicatorColor Color { get; set; } = IndicatorColor.Blue; Gets or sets the dash style for line-type plots. Default is <see cref="IndicatorStyle.Solid"/>. public IndicatorStyle Style { get; set; } = IndicatorStyle.Solid; Gets or sets the stroke width. Default is 1.0. public double Width { get; set; } = 1.0; Gets or sets whether this plot is currently visible on the chart. public bool Visible { get; set; } = true; Gets or sets the optional number of decimal places shown for this plot in crosshair and tooltip overlays. When <c>null</c>, the indicator-level default precision is used. public int? Digit { get; set; } Gets or sets the optional buffer index that contains per-point color indexes for this plot. The referenced buffer must be registered as <see cref="IndicatorBufferType.ColorIndex"/>. When <c>null</c>, <see cref="Color"/> is used uniformly for every point. Each indicator label may reference a different color-index buffer, so a multi-line indicator can have each line change color independently. public int? ColorIndexBuffer { get; set; } Gets the color palette used when <see cref="ColorIndexBuffer"/> is set. The key is an integer color index written into the color buffer by <c>OnCalculate</c>; the value is the <see cref="IndicatorColor"/> to render for that index. Points whose index is not present in the palette fall back to <see cref="Color"/>. <example> <code> ColorPalette = new Dictionary&lt;int, IndicatorColor&gt; { { 0, IndicatorColor.Red }, // bearish { 1, IndicatorColor.Lime } // bullish } </code> </example> #pragma warning disable CA2227 public IDictionary<int, IndicatorColor> ColorPalette { get; set; } = new Dictionary<int, IndicatorColor>(); #pragma warning restore CA2227 } Display and buffer metadata for an indicator. Passed to the chart engine to control how the indicator is rendered, which timeframes it appears on, and which additional UI elements (bounds, fills, …) are shown.

| Property | Type | Description |
|---|---|---|
| `Name` | `string` | Defines a shaded region drawn between two indicator buffers (e.g. Ichimoku Kumo cloud). public class IndicatorFillRegion { Gets or sets a human-readable label for this region (e.g. "Kumo"). |
| `Enabled` | `bool` | Gets or sets whether the fill is currently active. |
| `Visible` | `bool` | Gets or sets whether the fill is shown in the indicator settings dialog. |
| `UpperBufferIndex` | `int` | Gets or sets the buffer index whose values define the top boundary of the fill. |
| `LowerBufferIndex` | `int` | Gets or sets the buffer index whose values define the bottom boundary of the fill. |
| `ColorMode` | `IndicatorFillColorMode` | Gets or sets how the fill color is selected. Use <see cref="IndicatorFillColorMode.Fixed"/> for a constant color, or <see cref="IndicatorFillColorMode.BullishBearish"/> to switch between <see cref="BullishColor"/> and <see cref="BearishColor"/> based on the relative positions of the upper and lower buffers. |
| `FillColor` | `IndicatorColor` | Gets or sets the color used when <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.Fixed"/>. |
| `BullishColor` | `IndicatorColor` | Gets or sets the color used when upper ≥ lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. |
| `BearishColor` | `IndicatorColor` | Gets or sets the color used when upper &lt; lower and <see cref="ColorMode"/> is <see cref="IndicatorFillColorMode.BullishBearish"/>. |
| `Opacity` | `byte` | Gets or sets the fill transparency (0 = fully transparent, 255 = fully opaque). Default is 72. |
| `UseRangeValue` | `bool` | Optional display features for specific indicator families. These settings add extra chart elements such as bound lines, a zero line, histogram coloring, and fill regions between buffers. public class IndicatorSpecialFeatures { Gets or sets whether to lock the Y-axis range to <see cref="MinValue"/>/<see cref="MaxValue"/> rather than auto-scaling to visible data (e.g. RSI 0–100). |
| `MinValue` | `double` | Gets or sets the fixed minimum Y value when <see cref="UseRangeValue"/> is <c>true</c>. |
| `MaxValue` | `double` | Gets or sets the fixed maximum Y value when <see cref="UseRangeValue"/> is <c>true</c>. |
| `ShowUpperBound` | `bool` | Gets or sets whether to draw a horizontal upper-bound line (e.g. RSI overbought at 70). |
| `ShowLowerBound` | `bool` | Gets or sets whether to draw a horizontal lower-bound line (e.g. RSI oversold at 30). |
| `ShowCenterLine` | `bool` | Gets or sets whether to draw a horizontal center line (e.g. RSI midpoint at 50). |
| `UpperBoundValue` | `double` | Gets or sets the Y value of the upper-bound line. Default is 70. |
| `UpperBoundWidth` | `double` | Gets or sets the stroke width of the upper-bound line. Default is 1.0. |
| `LowerBoundValue` | `double` | Gets or sets the Y value of the lower-bound line. Default is 30. |
| `LowerBoundWidth` | `double` | Gets or sets the stroke width of the lower-bound line. Default is 1.0. |
| `CenterLineValue` | `double` | Gets or sets the Y value of the center line. Default is 50. |
| `CenterLineWidth` | `double` | Gets or sets the stroke width of the center line. Default is 1.0. |
| `UpperBoundColor` | `IndicatorColor` | Gets or sets the color of the upper-bound line. Default is <see cref="IndicatorColor.Red"/>. |
| `LowerBoundColor` | `IndicatorColor` | Gets or sets the color of the lower-bound line. Default is <see cref="IndicatorColor.Green"/>. |
| `CenterLineColor` | `IndicatorColor` | Gets or sets the color of the center line. Default is <see cref="IndicatorColor.Gray"/>. |
| `BoundLineStyle` | `IndicatorStyle` | Gets or sets the dash style shared by all bound lines. Default is <see cref="IndicatorStyle.Dashed"/>. |
| `ShowBoundFill` | `bool` | Gets or sets whether to fill the area between the upper-bound line and the lower-bound line. Only rendered when both <see cref="ShowUpperBound"/> and <see cref="ShowLowerBound"/> are <c>true</c>. |
| `BoundFillColor` | `IndicatorColor` | Gets or sets the fill color used between the upper and lower bound lines. Default is <see cref="IndicatorColor.Gray"/>. |
| `BoundFillOpacity` | `byte` | Gets or sets the fill transparency for the bound area (0 = fully transparent, 255 = fully opaque). Default is 30. |
| `ShowHistogram` | `bool` | Gets or sets whether to render the primary buffer as a histogram. |
| `HistogramPositiveColor` | `IndicatorColor` | Gets or sets the color for histogram bars with positive values. Default is <see cref="IndicatorColor.Green"/>. |
| `HistogramNegativeColor` | `IndicatorColor` | Gets or sets the color for histogram bars with negative values. Default is <see cref="IndicatorColor.Red"/>. |
| `ShowZeroLine` | `bool` | Gets or sets whether to draw a horizontal zero line across the panel. |
| `ZeroLineWidth` | `double` | Gets or sets the stroke width of the zero line. Default is 1.0. |
| `ZeroLineColor` | `IndicatorColor` | Gets or sets the color of the zero line. Default is <see cref="IndicatorColor.Gray"/>. |
| `FillRegions` | `IEnumerable&lt;IndicatorFillRegion&gt;` | Gets the list of shaded regions drawn between pairs of buffers. Each entry is rendered independently and can use a different color mode and opacity. |
| `Label` | `string` | Sets the list of shaded regions drawn between pairs of buffers. <param name="regions">The list of shaded regions.</param> public void SetFillRegions(IEnumerable<IndicatorFillRegion> regions) { ArgumentNullException.ThrowIfNull(regions); _fillRegions.Clear(); _fillRegions.AddRange(regions); } } Rendering metadata for a single indicator plot (line, histogram, dots, …). Each visible buffer should have a corresponding <see cref="IndicatorLabel"/> entry in <see cref="IndicatorProperty.Labels"/>. public class IndicatorLabel { Gets or sets the human-readable name shown in the crosshair tooltip and legend. |
| `Type` | `IndicatorDrawType` | Gets or sets the draw primitive used to render this plot. Default is <see cref="IndicatorDrawType.Line"/>. |
| `Color` | `IndicatorColor` | Gets or sets the fallback color for this plot. Used when <see cref="ColorIndexBuffer"/> is not set or yields no valid palette entry. Default is <see cref="IndicatorColor.Blue"/>. |
| `Style` | `IndicatorStyle` | Gets or sets the dash style for line-type plots. Default is <see cref="IndicatorStyle.Solid"/>. |
| `Width` | `double` | Gets or sets the stroke width. Default is 1.0. |
| `Visible` | `bool` | Gets or sets whether this plot is currently visible on the chart. |
| `Digit` | `int?` | Gets or sets the optional number of decimal places shown for this plot in crosshair and tooltip overlays. When <c>null</c>, the indicator-level default precision is used. |
| `ColorIndexBuffer` | `int?` | Gets or sets the optional buffer index that contains per-point color indexes for this plot. The referenced buffer must be registered as <see cref="IndicatorBufferType.ColorIndex"/>. When <c>null</c>, <see cref="Color"/> is used uniformly for every point. Each indicator label may reference a different color-index buffer, so a multi-line indicator can have each line change color independently. |
| `Name` | `string` | Gets the color palette used when <see cref="ColorIndexBuffer"/> is set. The key is an integer color index written into the color buffer by <c>OnCalculate</c>; the value is the <see cref="IndicatorColor"/> to render for that index. Points whose index is not present in the palette fall back to <see cref="Color"/>. <example> <code> ColorPalette = new Dictionary&lt;int, IndicatorColor&gt; { { 0, IndicatorColor.Red }, // bearish { 1, IndicatorColor.Lime } // bullish } </code> </example> #pragma warning disable CA2227 public IDictionary<int, IndicatorColor> ColorPalette { get; set; } = new Dictionary<int, IndicatorColor>(); #pragma warning restore CA2227 } Display and buffer metadata for an indicator. Passed to the chart engine to control how the indicator is rendered, which timeframes it appears on, and which additional UI elements (bounds, fills, …) are shown. public class IndicatorProperty { Gets or sets the display name shown on the chart legend and in dialogs (e.g. <c>"RSI(14)"</c>, <c>"SuperTrend(10,3)"</c>). |
| `IsVisible` | `bool` | Gets or sets whether the indicator is rendered on the chart. Default is <c>true</c>. |
| `IsInternal` | `bool` | Gets or sets whether this indicator is hidden from the indicator selection menus. Set to <c>true</c> for internally chained indicators that should not be added manually. |
| `Window` | `IndicatorWindow` | Gets the chart panel where the indicator is drawn. <see cref="IndicatorWindow.Main"/> renders over the price bars; <see cref="IndicatorWindow.Separate"/> renders in its own panel below the chart. |
| `Buffers` | `int` | Gets the total number of buffers allocated for this indicator, including <see cref="IndicatorBufferType.Data"/>, <see cref="IndicatorBufferType.ColorIndex"/>, and <see cref="IndicatorBufferType.Calculations"/> buffers. Must match the number of <c>SetBuffer</c> calls in <c>OnInit</c>. |
| `Plots` | `int` | Gets the number of visible plots (i.e. entries in <see cref="Labels"/>). Used for informational purposes; the renderer drives visibility from <see cref="Labels"/> directly. |
| `VisibleTimeframes` | `TimeFrameOptions` | Gets or sets the per-buffer rendering metadata. Key: zero-based buffer index (must correspond to a <see cref="IndicatorBufferType.Data"/> buffer). Buffers without an entry are not rendered. public IReadOnlyDictionary<int, IndicatorLabel> Labels { get; set; } = new Dictionary<int, IndicatorLabel>(); Gets or sets the set of timeframes on which this indicator is displayed. Default is <see cref="TimeFrameOptions.AllPeriods"/>. |
| `SpecialFeatures` | `IndicatorSpecialFeatures` | Gets or sets additional rendering features such as bound lines, zero line, histogram colors, and fill regions between buffers. |

### struct

Represents a single indicator value with its associated timestamp, including support for empty-value semantics.

| Property | Type | Description |
|---|---|---|
| `Timestamp` | `DateTime` | Represents a single indicator value with its associated timestamp, including support for empty-value semantics. public record struct IndicatorValue : IEquatable<IndicatorValue>, IComparable<IndicatorValue> { Gets the timestamp associated with the value. |
| `Value` | `double` | Gets the numeric value of the indicator. |


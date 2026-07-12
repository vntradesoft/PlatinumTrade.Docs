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
| `UpdateTime` | `DateTime` | Gets or sets the update time of the balance. |
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
| `Details` | IReadOnlyList&lt;[`AccountBalanceDetail`](./models.md#accountbalancedetail)&gt; | Gets or sets the list of detailed asset balances. |

### AccountBalanceDetail

Represents detailed information for a specific asset within the trading account.

| Property | Type | Description |
|---|---|---|
| `Asset` | `string` | Gets or sets the asset ticker (e.g., "BTC"). |
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
| `InstrumentType` | [`InstrumentType`](./enums.md#instrumenttype) | The type of the instrument. |
| `Symbol` | `string` | The trading symbol (e.g., BTC-USDT). |
| `Asset` | `string` | The asset or currency base for the order. |
| `OrderId` | `long?` | The unique identifier for the order, if available. |
| `OrderIdList` | `long[]?` | The list of associated order identifiers. |
| `AlgoId` | `string?` | The unique identifier for the algorithmic order. |
| `ClientOrderId` | `string?` | The client-defined unique identifier for the order. |
| `Quantity` | `decimal?` | The quantity of the asset to be traded. |
| `CloseFraction` | `decimal?` | The fraction of the position to be closed. |
| `OrderType` | [`AlgoOrderType`](./enums.md#algoordertype) | The type of the algorithmic order. |
| `OrderSide` | [`OrderSide`](./enums.md#orderside) | The side of the order (Buy/Sell). |
| `PositionSide` | [`PositionSide`](./enums.md#positionside)? | The position side (e.g., Long/Short). |
| `TradeMode` | [`TradeMode`](./enums.md#trademode) | The trade mode (e.g., Cash/Margin). |
| `State` | [`AlgoOrderState`](./enums.md#algoorderstate) | The current state of the algorithmic order. |
| `Leverage` | `decimal?` | The leverage to be applied to the order. |
| `TakeProfitTriggerPrice` | `decimal?` | The take-profit trigger price. |
| `TakeProfitTriggerPriceType` | [`TriggerPriceType`](./enums.md#triggerpricetype)? | The type of take-profit trigger price. |
| `TakeProfitOrderPrice` | `decimal?` | The price of the take-profit order. |
| `StopLossTriggerPrice` | `decimal?` | The stop-loss trigger price. |
| `StopLossTriggerPriceType` | [`TriggerPriceType`](./enums.md#triggerpricetype)? | The type of stop-loss trigger price. |
| `StopLossOrderPrice` | `decimal?` | The price of the stop-loss order. |
| `TriggerPrice` | `decimal?` | The trigger price for the order. |
| `TriggerPriceType` | [`TriggerPriceType`](./enums.md#triggerpricetype)? | The type of trigger price. |
| `ActualOrderQuantity` | `decimal?` | The actual quantity executed for the order. |
| `ActualOrderPrice` | `decimal?` | The actual price executed for the order. |
| `Tag` | `string?` | A custom tag for the order. |
| `ActualSide` | [`AlgoActualSide`](./enums.md#algoactualside)? | The actual side of the order execution. |
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
| `AmendResult` | `string?` | The result of the amendment. |
| `AmendSource` | `string?` | The source of the amendment. |
| `NotionalUsd` | `decimal?` | The notional value of the update in USD. |
| `RequestId` | `string?` | The request identifier associated with the update. |
| `AlgoOrderCount` | `int?` | The count of algorithmic orders. |
| `PushTime` | `DateTime?` | The time when the update was pushed. |

### ClosePositionResponse

Represents the response received after attempting to close a position in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `Symbol` | `string` | The trading symbol (e.g., BTC-USDT). |
| `PositionSide` | [`PositionSide`](./enums.md#positionside) | The side of the position to close (e.g., Long/Short). |
| `ClientOrderId` | `string?` | The client-defined unique identifier for the order. |
| `Tag` | `string?` | A custom tag associated with the close position request. |

### ClosingPosition

Represents a closed position in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `InstrumentType` | [`InstrumentType`](./enums.md#instrumenttype) | The type of the instrument. |
| `Symbol` | `string` | The trading symbol (e.g., BTC-USDT). |
| `MarginMode` | [`MarginMode`](./enums.md#marginmode) | The margin mode of the position. |
| `Type` | [`ClosingPositionType`](./enums.md#closingpositiontype) | The type of closing position. |
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
| `PositionSide` | [`PositionSide`](./enums.md#positionside) | The position side. |
| `Leverage` | `decimal?` | The leverage applied to the position. |
| `Direction` | [`PositionSide`](./enums.md#positionside) | The direction of the position. |
| `TriggerMarkPrice` | `decimal?` | The trigger mark price for the position. |
| `Underlying` | `string` | The underlying asset of the position. |
| `Asset` | `string?` | The asset used for the position. |

### Order

Represents an order in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `InstrumentType` | [`InstrumentType`](./enums.md#instrumenttype) | The type of the instrument. |
| `Symbol` | `string` | The trading symbol (e.g., BTC-USDT). |
| `Asset` | `string` | The asset or currency base for the order. |
| `OrderId` | `long?` | The unique identifier for the order. |
| `ClientOrderId` | `string?` | The client-defined unique identifier for the order. |
| `Tag` | `string` | A custom tag for the order. |
| `Price` | `decimal?` | The price of the order. |
| `Quantity` | `decimal?` | The quantity of the asset to be traded. |
| `ProfitAndLoss` | `decimal?` | The profit and loss of the order. |
| `OrderType` | [`OrderType`](./enums.md#ordertype) | The type of the order. |
| `OrderSide` | [`OrderSide`](./enums.md#orderside) | The side of the order (Buy/Sell). |
| `PositionSide` | [`PositionSide`](./enums.md#positionside)? | The position side (e.g., Long/Short). |
| `TradeMode` | [`TradeMode`](./enums.md#trademode) | The trade mode (e.g., Cash/Margin). |
| `AccumulatedFillQuantity` | `decimal?` | The accumulated filled quantity for the order. |
| `FillPrice` | `decimal?` | The price at which the order was filled. |
| `TradeId` | `long?` | The unique identifier of the trade. |
| `QuantityFilled` | `decimal?` | The quantity filled for the order. |
| `FillTime` | `DateTime?` | The time when the order was filled. |
| `AveragePrice` | `decimal?` | The average price of the filled order. |
| `OrderState` | [`OrderStatus`](./enums.md#orderstatus) | The status of the order. |
| `SelfTradePreventionMode` | [`SelfTradePreventionMode`](./enums.md#selftradepreventionmode)? | The self-trade prevention mode. |
| `Leverage` | `decimal?` | The leverage applied to the order. |
| `AttachAlgoCllientOrderId` | `string?` | The client-defined unique identifier of the attached algorithmic order. |
| `TakeProfitTriggerPrice` | `decimal?` | The take-profit trigger price. |
| `TakeProfitOrderPrice` | `decimal?` | The price of the take-profit order. |
| `TakeProfitTriggerPriceType` | [`TriggerPriceType`](./enums.md#triggerpricetype)? | The type of take-profit trigger price. |
| `StopLossTriggerPrice` | `decimal?` | The stop-loss trigger price. |
| `StopLossTriggerPriceType` | [`TriggerPriceType`](./enums.md#triggerpricetype)? | The type of stop-loss trigger price. |
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
| `OrderId` | `long?` | Order id |
| `ClientOrderId` | `string?` | Client order id |
| `Tag` | `string` | ["tag"] Tag |
| `Code` | `int` | Code |
| `Message` | `string` | Message |
| `SubCode` | `string` | Sub code |
| `Timestamp` | `DateTime?` | Timestamp |

### AlgoOrderResponse

Represents the response after placing an algorithmic order.

| Property | Type | Description |
|---|---|---|
| `AlgoOrderId` | `string?` | ["algoId"] Algo order id |
| `ClientOrderId` | `string?` | ["clOrdId"] Client order id |
| `AlgoClientOrderId` | `string?` | ["algoClOrdId"] Algo client order id |
| `Code` | `int` | ["sCode"] Code |
| `Message` | `string` | ["sMsg"] Message |

### CheckOrderResponse

Check order info

| Property | Type | Description |
|---|---|---|
| `AdjustedEquity` | `decimal` | ["adjEq"] Current adjusted / Effective equity in USD |
| `AdjustedEquityChange` | `decimal` | ["adjEqChg"] After placing order, changed quantity of adjusted / Effective equity in USD |
| `AvailableBalance` | `decimal` | ["availBal"] Current available balance in margin coin currency, only applicable to turn auto borrow off |
| `AvailableBalanceChange` | `decimal` | ["availBalChg"] After placing order, changed quantity of available balance after placing order, only applicable to turn auto borrow off |
| `InitialMarginRequirement` | `decimal` | ["imr"] Current initial margin requirement in USD |
| `InitialMarginRequirementChange` | `decimal` | ["imrChg"] After placing order, changed quantity of initial margin requirement in USD |
| `Liabilities` | `decimal` | ["liab"] Current liabilities of currency. For cross, it is cross liabilities. For isolated position, it is isolated liabilities |
| `LiabilitiesChange` | `decimal` | ["liabChg"] After placing order, changed quantity of liabilities |
| `LiabilitiesChangeAsset` | `string?` | ["liabChgCcy"] After placing order, the unit of changed liabilities quantity. Only applicable cross and in auto borrow |
| `LiquidationPrice` | `decimal` | ["liqPx"] Current estimated liquidation price |
| `LiquidationPriceDifference` | `string` | ["liqPxDiff"] After placing order, the distance between estimated liquidation price and mark price |
| `LiquidationPriceDifferenceRatio` | `decimal` | ["liqPxDiffRatio"] After placing order, the distance rate between estimated liquidation price and mark price |
| `MarginRatio` | `decimal` | ["mgnRatio"] Current margin ratio in USD |
| `MarginRatioChange` | `decimal` | ["mgnRatioChg"] After placing order, changed quantity of margin ratio in USD |
| `MaintenanceMarginRequirement` | `decimal` | ["mmr"] Current Maintenance margin requirement in USD |
| `MaintenanceMarginRequirementChange` | `decimal` | ["mmrChg"] After placing order, changed quantity of maintenance margin requirement in USD |
| `PositionBalance` | `string?` | ["posBal"] Current positive asset, only applicable to margin isolated position |
| `PositionBalanceChange` | `string?` | ["posBalChg"] After placing order, positive asset of margin isolated, only applicable to margin isolated position |
| `Type` | [`CheckUnitType`](./enums.md#checkunittype)? | ["type"] Unit type |

### OrderAmendResponse

Order amend response

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | ["ordId"] Order id |
| `ClientOrderId` | `string?` | ["clOrdId"] Client order id |
| `RequestId` | `string` | ["reqId"] Request id |
| `Code` | `int` | ["sCode"] Code |
| `Timestamp` | `DateTime?` | ["ts"] Timestamp |
| `Message` | `string` | ["sMsg"] Message |
| `SubCode` | `string` | ["subCode"] Sub code |

### AlgoOrderAmendResponse

Order amend response

| Property | Type | Description |
|---|---|---|
| `AlgoOrderId` | `long?` | ["algoId"] Order id |
| `ClientOrderId` | `string?` | ["algoClOrdId"] Client order id |
| `RequestId` | `string` | ["reqId"] Request id |
| `Code` | `string` | ["sCode"] Code |
| `Message` | `string` | ["sMsg"] Message |

### OrderCancelResponse

Cancel response

| Property | Type | Description |
|---|---|---|
| `OrderId` | `long?` | ["ordId"] Order id |
| `ClientOrderId` | `string` | ["clOrdId"] Client order id |
| `Code` | `int` | ["sCode"] Code |
| `Message` | `string` | ["sMsg"] Message |
| `Timestamp` | `DateTime?` | ["ts"] Timestamp |

### AlgoOrderRequest

Algo order request

| Property | Type | Description |
|---|---|---|
| `AlgoOrderId` | `string?` | ["algoId"] Algo order id |
| `ClientAlgoOrderId` | `string?` | ["algoClOrdId"] Client algo order id |
| `Symbol` | `string` | ["instId"] Symbol |

### OrderCancelRequest

Cancel request

| Property | Type | Description |
|---|---|---|
| `Symbol` | `string` | ["instId"] Symbol name |
| `OrderId` | `string?` | ["ordId"] Order id |
| `ClientOrderId` | `string?` | ["clOrdId"] Client order id |

### OrderPlaceRequest

Order place request

| Property | Type | Description |
|---|---|---|
| `SymbolCode` | `long` | ["instIdCode"] Symbol code |
| `TradeMode` | [`TradeMode`](./enums.md#trademode) | ["tdMode"] Trade mode |
| `OrderSide` | [`OrderSide`](./enums.md#orderside) | ["side"] Order side |
| `PositionSide` | [`PositionSide`](./enums.md#positionside)? | ["posSide"] Position side |
| `OrderType` | [`OrderType`](./enums.md#ordertype) | ["ordType"] Order type |
| `Quantity` | `decimal?` | ["sz"] Quantity |
| `Price` | `decimal?` | ["px"] Price |
| `Asset` | `string` | ["ccy"] Asset |
| `ClientOrderId` | `string?` | ["clOrdId"] Client order id |
| `Tag` | `string?` | ["tag"] Tag |
| `ReduceOnly` | `bool?` | ["reduceOnly"] Reduce only |
| `QuantityType` | [`QuantityAsset`](./enums.md#quantityasset)? | ["tgtCcy"] Quantity type |
| `PriceUsd` | `decimal?` | ["pxUsd"] Place options orders in USD, only applicable to options |
| `PriceVol` | `decimal?` | ["pxVol"] Place options orders based on implied volatility, where 1 represents 100%. Only applicable to OPTIONS |
| `BanAmend` | `bool?` | ["banAmend"] Whether to disallow the system from amending the size of the SPOT Market Order. If true, system will not amend and reject the market order if user does not have sufficient funds. |
| `StpMode` | [`SelfTradePreventionMode`](./enums.md#selftradepreventionmode)? | ["stpMode"] Self trade prevention mode |
| `TradeQuoteAsset` | `string?` | ["tradeQuoteCcy"] The quote currency used for trading. Only applicable to SPOT. The default value is the quote currency of the symbol, for example: for BTC-USD, the default is USD. |
| `AttachedAlgoOrders` | [`AttachedAlgoOrder`](./models.md#attachedalgoorder)[]? | ["attachAlgoOrds"] Attached take profit / stop loss orders |

### AttachedAlgoOrder

Algo order attached to an order

| Property | Type | Description |
|---|---|---|
| `ClientOrderId` | `string?` | ["attachAlgoClOrdId"] Client order id |
| `TakeProfitTriggerPrice` | `decimal?` | ["tpTriggerPx"] Take profit trigger price |
| `TakeProfitOrderPrice` | `decimal?` | ["tpOrdPx"] Take profit order price |
| `TakeProfitOrderKind` | [`TriggerOrderKind`](./enums.md#triggerorderkind)? | ["tpOrdKind"] Take profit order kind |
| `TakeProfitPriceType` | [`TriggerPriceType`](./enums.md#triggerpricetype)? | ["tpTriggerPxType"] Take profit price type |
| `TakeProfitQuantity` | `decimal?` | ["sz"] Take profit quantity |
| `StopLossTriggerPrice` | `decimal?` | ["slTriggerPx"] Stop loss trigger price |
| `StopLossOrderPrice` | `decimal?` | ["slOrdPx"] Stop loss order price |
| `StopLossPriceType` | [`TriggerPriceType`](./enums.md#triggerpricetype)? | ["slTriggerPxType"] Stop loss price type |
| `AmendPriceOnTriggerType` | `string?` | ["amendPxOnTriggerType"] Whether to enable Cost-price SL. Only applicable to SL order of split TPs. Whether slTriggerPx will move to avgPx when the first TP order is triggered, 0: disable, the default value, 1: Enable |
| `CallbackRatio` | `decimal?` | ["callbackRatio"] Callback ratio, e.g. 0.05 represents 5%. |
| `CallbackSpread` | `decimal?` | ["callbackSpread"] Callback spread (price distance). |
| `ActivePrice` | `decimal?` | ["activePx"] Activation price. If not provided, the trailing stop is activated immediately upon order placement. |

### OrderUpdate

Represents an update to an order in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `AmendResult` | `string?` | The result of the amendment. |
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
| `InstrumentType` | [`InstrumentType`](./enums.md#instrumenttype) | The type of the instrument. |
| `MarginMode` | [`MarginMode`](./enums.md#marginmode) | The margin mode of the position. |
| `PositionId` | `long?` | The unique identifier of the position. |
| `PositionSide` | [`PositionSide`](./enums.md#positionside) | The position side. |
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
| `CloseOrderAlgo` | [`PositionCloseOrder`](./models.md#positioncloseorder)[] | The algorithmic orders used to close the position. |

### PositionCloseOrder

Represents an algorithmic order to close a position.

| Property | Type | Description |
|---|---|---|
| `AlgoId` | `string` | The algorithmic order identifier. |
| `StopLossTriggerPrice` | `decimal` | The stop-loss trigger price. |
| `StopLossTriggerType` | [`TriggerPriceType`](./enums.md#triggerpricetype) | The type of stop-loss trigger. |
| `TakeProfitTriggerPrice` | `decimal` | The take-profit trigger price. |
| `TakeProfitTriggerType` | [`TriggerPriceType`](./enums.md#triggerpricetype) | The type of take-profit trigger. |
| `CloseFraction` | `decimal?` | The fraction of the position to close. |

### Transaction

Represents a transaction in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| `InstrumentType` | [`InstrumentType`](./enums.md#instrumenttype) | The type of the instrument. |
| `Symbol` | `string` | The trading symbol (e.g., BTC-USDT). |
| `TradeId` | `long?` | The unique identifier for the trade. |
| `OrderId` | `long?` | The unique identifier for the order. |
| `ClientOrderId` | `string?` | The client-defined unique identifier for the order. |
| `BillId` | `long?` | The unique identifier for the bill. |
| `TransactionType` | `string` | The type of the transaction. |
| `SubType` | [`TransactionType`](./enums.md#transactiontype) | The sub-type of the transaction. |
| `Tag` | `string` | A custom tag for the transaction. |
| `FillPrice` | `decimal?` | The price of the fill. |
| `QuantityFilled` | `decimal?` | The quantity filled for the transaction. |
| `FillIndexPrice` | `decimal?` | The index price at the time of fill. |
| `FillProfitAndLoss` | `decimal?` | The profit and loss from the fill. |
| `FillMarkPrice` | `decimal?` | The mark price at the time of fill. |
| `OrderSide` | [`OrderSide`](./enums.md#orderside) | The side of the order (Buy/Sell). |
| `PositionSide` | [`PositionSide`](./enums.md#positionside) | The position side (e.g., Long/Short). |
| `OrderFlowType` | [`OrderFlowType`](./enums.md#orderflowtype) | The flow type of the order. |
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
| `TicksPerCandle` | `int` | Gets or sets the number of generated ticks per one-minute candle. Lower values are faster; higher values are more precise. Recommended range: 10 to 60. |
| `UseNoise` | `bool` | Gets or sets whether random noise is applied to intermediate prices. Enabled is more realistic; disabled is deterministic and better for tests. |
| `NoiseAmplitude` | `double` | Gets or sets the maximum noise amplitude as a fraction of the candle spread. For example, 0.1 means up to 10% of High - Low. |
| `RandomSeed` | `int?` | Gets or sets the random seed used for reproducible backtests. Null means a new random sequence for each run. |
| `OhlcPattern` | [`OhlcPattern`](./enums.md#ohlcpattern) | Gets or sets the generated tick path pattern inside each OHLC candle. |

## Drawing

### DrawingStyle

Defines the styling properties for a drawing object.

| Property | Type | Description |
|---|---|---|
| `Color` | `string` | Gets or sets the stroke color in hex format (e.g., "#FFFFFF"). |
| `Width` | `double` | Gets or sets the stroke width. |
| `LineStyle` | [`DrawingLineStyle`](./enums.md#drawinglinestyle) | Gets or sets the line style. |
| `Opacity` | `double` | Gets or sets the opacity (0.0 to 1.0). |
| `Fill` | `bool` | Gets or sets a value indicating whether to fill the shape. |
| `FillColor` | `string` | Gets or sets the fill color in hex format (e.g., "#44FFFFFF"). |

## Common

### LimitPrice

Represents the limit price information for a specific trading instrument.

| Property | Type | Description |
|---|---|---|
| `Symbol` | `string` | ["instId"] Symbol |
| `InstrumentType` | [`InstrumentType`](./enums.md#instrumenttype) | ["instType"] Instrument type |
| `BuyLimit` | `decimal` | ["buyLmt"] Buy limit |
| `SellLimit` | `decimal` | ["sellLmt"] Sell limit |
| `Time` | `DateTime` | ["ts"] Timestamp |
| `IsEnabled` | `bool` | ["enabled"] Whether price limit is enabled |

### ApiError

Represents an error returned by the OKX API.

| Property | Type | Description |
|---|---|---|
| `Message` | `string` | Human-readable error message. |
| `Code` | `string?` | OKX API error code, if available (e.g. "50001", "51000"). |
| `HttpStatusCode` | `HttpStatusCode?` | HTTP status code of the response, if applicable. |
| `ErrorType` | [`ApiErrorType`](./enums.md#apierrortype) | The category of error. |

### ApiResult

Represents the result of an API operation.

| Property | Type | Description |
|---|---|---|
| `Success` | `bool` | Gets a value indicating whether the operation completed successfully. |
| `Error` | [`ApiError`](./models.md#apierror)? | Gets the error details if the operation failed; otherwise null. |

### ApiResult

Represents the result of an API operation that returns data.

| Property | Type | Description |
|---|---|---|
| `Data` | `T` | Gets the data returned by the operation. Only valid when is true. |

### TelegramBotConfig

Configuration details for an individual Telegram Bot channel.

| Property | Type | Description |
|---|---|---|
| `Alias` | `string` | Gets or sets a unique alias/nickname for this bot configuration. |
| `BotToken` | `string` | Gets or sets the Telegram Bot Token. |
| `ChatId` | `long` | Gets or sets the target chat ID to send notifications to. |
| `Enabled` | `bool` | Gets or sets a value indicating whether this bot is enabled. |

### TradeCommand

Represents a command sent to a trading strategy.

| Property | Type | Description |
|---|---|---|
| `Action` | [`TradeAction`](./enums.md#tradeaction) | Gets or sets the command action. |
| `SourceChatId` | `long` | Gets or sets the Telegram Chat ID from which this command originated. |
| `Symbol` | `string` | Gets or sets the target symbol. |
| `Amount` | `decimal` | Gets or sets the command amount. |
| `Price` | `decimal` | Gets or sets the command price. |
| `CommandTag` | `string` | Gets or sets the plugin-specific command identifier used when is . Examples: "setlevel", "forcetpchase", or "resetrisk". |

## Indicators

### IndicatorSource

Describes one data source used by an indicator instance. The source can be either candle price data or another indicator buffer.

| Property | Type | Description |
|---|---|---|
| `IndicatorId` | `string?` | Gets or sets the parent indicator ID. When null, the source is interpreted as candle price data. |
| `TimeFrame` | [`Timeframe`](./enums.md#timeframe)? | Gets or sets the parent indicator timeframe when it differs from the current indicator timeframe. |
| `BufferIndex` | `int` | Gets or sets the parent indicator buffer index to read from. |
| `AppliedPrice` | [`AppliedPrice`](./enums.md#appliedprice) | Gets or sets the candle price field used when no parent indicator is configured. |

### IndicatorConfig

Represents the runtime configuration used to create and identify an indicator instance. This includes the trading symbol, timeframe, indicator type, parameters, and optional input sources for chained indicators.

| Property | Type | Description |
|---|---|---|
| `Symbol` | `string` | Gets the trading symbol this indicator is associated with. |
| `TimeFrame` | [`Timeframe`](./enums.md#timeframe) | Gets the timeframe in which the indicator is calculated. |
| `IndicatorType` | [`IndicatorType`](./enums.md#indicatortype) | Gets the indicator type. For custom indicators, this is typically , and is used to distinguish the implementation. |
| `Parameters` | [`IndicatorParameters`](./models.md#indicatorparameters) | Gets or sets the parameter collection used by the indicator. |
| `CustomName` | `string?` | Gets or sets the custom indicator name. null indicates a built-in indicator. |

### IndicatorIdentity

Represents the logical identity of an indicator instance. Combines symbol, timeframe, type, and parameter values.

| Property | Type | Description |
|---|---|---|
| `Symbol` | `string` | Gets or sets the trading symbol for the indicator instance. |
| `TimeFrame` | [`Timeframe`](./enums.md#timeframe) | Gets or sets the timeframe where the indicator is calculated. |
| `IndicatorType` | [`IndicatorType`](./enums.md#indicatortype) | Gets or sets the indicator type. |
| `Parameters` | [`IndicatorParameters`](./models.md#indicatorparameters) | Gets or sets the parameter bag used by this identity. |

### IndicatorItem

Snapshot container for indicator values at a specific timestamp. Holds identity, rendering property metadata, and per-buffer values.

| Property | Type | Description |
|---|---|---|
| `IndicatorId` | `string` | Gets or sets the runtime indicator instance ID. |
| `Property` | [`IndicatorProperty`](./models.md#indicatorproperty) | Gets or sets rendering metadata for this indicator instance. |
| `Identity` | [`IndicatorIdentity`](./models.md#indicatoridentity) | Gets or sets identity metadata for this indicator instance. |
| `Timestamp` | `DateTime` | Gets or sets the timestamp associated with this value snapshot. |

### IndicatorParameters

Mutable parameter bag for indicator configuration. Provides typed set/get helpers and a deterministic hash for identity/fingerprints.

| Property | Type | Description |
|---|---|---|
| - | - | - |

### IndicatorFillRegion

Defines a shaded region drawn between two indicator buffers (e.g. Ichimoku Kumo cloud).

| Property | Type | Description |
|---|---|---|
| `Name` | `string` | Gets or sets a human-readable label for this region (e.g. "Kumo"). |
| `Enabled` | `bool` | Gets or sets whether the fill is currently active. |
| `Visible` | `bool` | Gets or sets whether the fill is shown in the indicator settings dialog. |
| `UpperBufferIndex` | `int` | Gets or sets the buffer index whose values define the top boundary of the fill. |
| `LowerBufferIndex` | `int` | Gets or sets the buffer index whose values define the bottom boundary of the fill. |
| `ColorMode` | [`IndicatorFillColorMode`](./enums.md#indicatorfillcolormode) | Gets or sets how the fill color is selected. Use for a constant color, or to switch between and based on the relative positions of the upper and lower buffers. |
| `FillColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the color used when is . |
| `BullishColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the color used when upper ≥ lower and is . |
| `BearishColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the color used when upper &lt; lower and is . |
| `Opacity` | `byte` | Gets or sets the fill transparency (0 = fully transparent, 255 = fully opaque). Default is 72. |

### IndicatorSpecialFeatures

Optional display features for specific indicator families. These settings add extra chart elements such as bound lines, a zero line, histogram coloring, and fill regions between buffers.

| Property | Type | Description |
|---|---|---|
| `UseRangeValue` | `bool` | Gets or sets whether to lock the Y-axis range to / rather than auto-scaling to visible data (e.g. RSI 0–100). |
| `MinValue` | `double` | Gets or sets the fixed minimum Y value when is true. |
| `MaxValue` | `double` | Gets or sets the fixed maximum Y value when is true. |
| `ShowUpperBound` | `bool` | Gets or sets whether to draw a horizontal upper-bound line (e.g. RSI overbought at 70). |
| `ShowLowerBound` | `bool` | Gets or sets whether to draw a horizontal lower-bound line (e.g. RSI oversold at 30). |
| `ShowCenterLine` | `bool` | Gets or sets whether to draw a horizontal center line (e.g. RSI midpoint at 50). |
| `UpperBoundValue` | `double` | Gets or sets the Y value of the upper-bound line. Default is 70. |
| `UpperBoundWidth` | `double` | Gets or sets the stroke width of the upper-bound line. Default is 1.0. |
| `LowerBoundValue` | `double` | Gets or sets the Y value of the lower-bound line. Default is 30. |
| `LowerBoundWidth` | `double` | Gets or sets the stroke width of the lower-bound line. Default is 1.0. |
| `CenterLineValue` | `double` | Gets or sets the Y value of the center line. Default is 50. |
| `CenterLineWidth` | `double` | Gets or sets the stroke width of the center line. Default is 1.0. |
| `UpperBoundColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the color of the upper-bound line. Default is . |
| `LowerBoundColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the color of the lower-bound line. Default is . |
| `CenterLineColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the color of the center line. Default is . |
| `BoundLineStyle` | [`IndicatorStyle`](./enums.md#indicatorstyle) | Gets or sets the dash style shared by all bound lines. Default is . |
| `ShowBoundFill` | `bool` | Gets or sets whether to fill the area between the upper-bound line and the lower-bound line. Only rendered when both and are true. |
| `BoundFillColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the fill color used between the upper and lower bound lines. Default is . |
| `BoundFillOpacity` | `byte` | Gets or sets the fill transparency for the bound area (0 = fully transparent, 255 = fully opaque). Default is 30. |
| `ShowHistogram` | `bool` | Gets or sets whether to render the primary buffer as a histogram. |
| `HistogramPositiveColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the color for histogram bars with positive values. Default is . |
| `HistogramNegativeColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the color for histogram bars with negative values. Default is . |
| `ShowZeroLine` | `bool` | Gets or sets whether to draw a horizontal zero line across the panel. |
| `ZeroLineWidth` | `double` | Gets or sets the stroke width of the zero line. Default is 1.0. |
| `ZeroLineColor` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the color of the zero line. Default is . |

### IndicatorLabel

Rendering metadata for a single indicator plot (line, histogram, dots, …). Each visible buffer should have a corresponding entry in .

| Property | Type | Description |
|---|---|---|
| `Label` | `string` | Gets or sets the human-readable name shown in the crosshair tooltip and legend. |
| `Type` | [`IndicatorDrawType`](./enums.md#indicatordrawtype) | Gets or sets the draw primitive used to render this plot. Default is . |
| `Color` | [`IndicatorColor`](./enums.md#indicatorcolor) | Gets or sets the fallback color for this plot. Used when is not set or yields no valid palette entry. Default is . |
| `Style` | [`IndicatorStyle`](./enums.md#indicatorstyle) | Gets or sets the dash style for line-type plots. Default is . |
| `Width` | `double` | Gets or sets the stroke width. Default is 1.0. |
| `Visible` | `bool` | Gets or sets whether this plot is currently visible on the chart. |
| `Digit` | `int?` | Gets or sets the optional number of decimal places shown for this plot in crosshair and tooltip overlays. When null, the indicator-level default precision is used. |
| `ColorIndexBuffer` | `int?` | Gets or sets the optional buffer index that contains per-point color indexes for this plot. The referenced buffer must be registered as . When null, is used uniformly for every point. Each indicator label may reference a different color-index buffer, so a multi-line indicator can have each line change color independently. |

### IndicatorProperty

Display and buffer metadata for an indicator. Passed to the chart engine to control how the indicator is rendered, which timeframes it appears on, and which additional UI elements (bounds, fills, …) are shown.

| Property | Type | Description |
|---|---|---|
| `Name` | `string` | Gets or sets the display name shown on the chart legend and in dialogs (e.g. "RSI(14)", "SuperTrend(10,3)"). |
| `IsVisible` | `bool` | Gets or sets whether the indicator is rendered on the chart. Default is true. |
| `IsInternal` | `bool` | Gets or sets whether this indicator is hidden from the indicator selection menus. Set to true for internally chained indicators that should not be added manually. |
| `Window` | [`IndicatorWindow`](./enums.md#indicatorwindow) | Gets the chart panel where the indicator is drawn. renders over the price bars; renders in its own panel below the chart. |
| `Buffers` | `int` | Gets the total number of buffers allocated for this indicator, including , , and buffers. Must match the number of SetBuffer calls in OnInit. |
| `Plots` | `int` | Gets the number of visible plots (i.e. entries in ). Used for informational purposes; the renderer drives visibility from directly. |
| `VisibleTimeframes` | [`TimeFrameOptions`](./enums.md#timeframeoptions) | Gets or sets the set of timeframes on which this indicator is displayed. Default is . |
| `SpecialFeatures` | [`IndicatorSpecialFeatures`](./models.md#indicatorspecialfeatures) | Gets or sets additional rendering features such as bound lines, zero line, histogram colors, and fill regions between buffers. |

### struct

Represents a single indicator value with its associated timestamp, including support for empty-value semantics.

| Property | Type | Description |
|---|---|---|
| `Timestamp` | `DateTime` | Gets the timestamp associated with the value. |
| `Value` | `double` | Gets the numeric value of the indicator. |

### IndicatorParameterInfo

Describes a parameter exposed by a custom indicator plugin. The GUI can use this metadata to generate an input dialog.

| Property | Type | Description |
|---|---|---|
| - | - | - |

### IndicatorLoadedPlugin

Represents a loaded plugin in the OKX trading system.

| Property | Type | Description |
|---|---|---|
| - | - | - |


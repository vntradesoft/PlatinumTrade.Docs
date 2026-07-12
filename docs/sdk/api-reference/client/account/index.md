---
id: sdk-account-client
title: Account API
sidebar_label: Account
sidebar_position: 2
---
# Account API
The Account API (`Context.Account`) provides methods for retrieving balances, analytics, and configuring trading modes.

## Methods Overview
| Method | Description |
|---|---|
| [GetBalances](balances-and-assets.md#getbalances) | Gets detailed information about the trading account balance. |
| [AccountSelect](balances-and-assets.md#accountselect) | Retrieves detailed information for a specific asset. |
| [LoadBalanceAsync](balances-and-assets.md#loadbalanceasync) | Asynchronously refreshes the account balance from the exchange. |
| [SetInitialLeverageAsync](trading-configuration.md#setinitialleverageasync) | Sets the initial leverage for a specific contract. |
| [GetLeverage](trading-configuration.md#getleverage) | Gets the current leverage for a specific contract. |
| [SetHedgeModeAsync](trading-configuration.md#sethedgemodeasync) | Sets the position mode to Hedge Mode or Netting Mode. |
| [IsHedgeMode](trading-configuration.md#ishedgemode) | Checks if the account is currently in Hedge Mode. |
| [GetFeeLevelAsync](trading-configuration.md#getfeelevelasync) | Gets information about the account's trading fee VIP level. |
| [GetCurrentEquity](performance-analytics.md#getcurrentequity) | Gets the current equity value of the account. |
| [GetEquityChangePercentage](performance-analytics.md#getequitychangepercentage) | Calculates the percentage change in equity compared to the initial balance. |
| [GetMarginRatio](performance-analytics.md#getmarginratio) | Calculates the current margin ratio of the account. |
| [GetCurrentDrawdown](performance-analytics.md#getcurrentdrawdown) | Calculates the current account drawdown compared to the equity peak. |
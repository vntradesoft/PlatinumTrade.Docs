---
id: account-client
title: Account Client (IAccountClient)
description: Detailed API mappings for IAccountClient.
status: stable
visibility: public
---

# Account Client (IAccountClient)

The `IAccountClient` interface manages account settings, balances, and configurations.

## API Mappings

| SDK Method | OKX.Net Call | OKX API Endpoint | OKX API Documentation |
|---|---|---|---|
| `LoadBalanceAsync` | `UnifiedApi.Account.GetAccountBalanceAsync` | `GET /api/v5/account/balance` | [Get Balance](https://www.okx.com/docs-v5/en/#trading-account-api-get-balance) |
| `SetInitialLeverageAsync` | `UnifiedApi.Account.GetLeverageAsync` & `SetLeverageAsync` | `GET /leverage-info` & `POST /set-leverage` | [Get](https://www.okx.com/docs-v5/en/#trading-account-api-get-leverage) & [Set Leverage](https://www.okx.com/docs-v5/en/#trading-account-api-set-leverage) |
| `SetHedgeModeAsync` | `UnifiedApi.Account.GetAccountConfigurationAsync` & `SetPositionModeAsync` | `GET /config` & `POST /set-position-mode` | [Get Config](https://www.okx.com/docs-v5/en/#trading-account-api-get-account-configuration) & [Set Position Mode](https://www.okx.com/docs-v5/en/#trading-account-api-set-position-mode) |
| `GetFeeLevelAsync` | `UnifiedApi.Account.GetAccountConfigurationAsync` | `GET /api/v5/account/config` | [Get Account Configuration](https://www.okx.com/docs-v5/en/#trading-account-api-get-account-configuration) |

---
id: terms-of-use
title: Terms of Use
sidebar_label: Terms of Use
---

# Platinum Trade — Terms of Use

PLEASE READ CAREFULLY BEFORE USING THE SOFTWARE.

By clicking "I Accept", installing, downloading, copying, accessing, or using Platinum Trade ("the Software"), you acknowledge that you have read, understood, and agree to be legally bound by this End User License Agreement ("Agreement" or "Terms of Use"). If you do not agree to these terms, do not install or use the Software.

These Terms of Use incorporate by reference, and should be read together with, the following documents:
- [Risk Disclosure](risk-disclosure.md)
- [Disclaimer](disclaimer.md)
- [Limitation of Liability](liability.md)
- [Payment Policy](payment-policy.md)
- [Privacy Policy](privacy-policy.md)

---

## 1. License Grant
Subject to your continued compliance with all terms and conditions of this Agreement, Platinum Trade hereby grants you a limited, personal, non-exclusive, non-transferable, non-sublicensable, revocable license to:
(a) install and use one (1) copy of the Software on devices that you own or control solely for your personal, non-commercial use; and
(b) use the Software solely in accordance with its documentation and this Agreement.

This license does not include any right to:
- copy, reproduce, distribute, or publicly display the Software;
- sublicense, rent, lease, lend, sell, or transfer the Software or any rights therein to any third party;
- use the Software to provide services to third parties on a commercial basis (service bureau, SaaS, hosting, or similar);
- modify, adapt, translate, reverse engineer, decompile, disassemble, or attempt to derive the source code of the Software's closed-source components (including the GUI application, command-line interface, and core execution engine), except to the extent that applicable law expressly permits such activities notwithstanding this restriction.

*Note: The Software's open-source Software Development Kit (SDK) is separately licensed under the MIT License. Your rights with respect to the SDK are governed solely by the MIT License accompanying it.*

## 2. Intellectual Property and Ownership
The Software (excluding open-source third-party components and the SDK) is and remains the exclusive intellectual property of the Platinum Trade developer. All title, ownership rights, and intellectual property rights in and to the closed-source components of the Software — including the GUI application, command-line interface, and core execution engine — and any copies, modifications, or derivative works thereof, are and shall remain exclusively with the Platinum Trade developer.

This Agreement does not convey to you any ownership interest in the Software or any intellectual property rights therein. You acquire only the limited right to use the Software as expressly set out in Section 1 (License Grant).

All trademarks, service marks, trade names, and logos associated with Platinum Trade are the property of the Platinum Trade developer.

## 3. Restrictions on Use
You agree that you will NOT, directly or indirectly:
- reverse engineer, disassemble, decompile, or otherwise attempt to derive the source code of the Software's closed-source components, except as expressly permitted by applicable law;
- create derivative works based on the closed-source components of the Software;
- remove, obscure, or alter any proprietary notices, labels, or marks on the Software;
- use the Software in any manner that violates applicable law, including laws governing algorithmic/automated trading, cryptocurrency, capital controls, or taxation;
- use the Software to engage in market manipulation, fraud, or any other illegal or unethical trading practice;
- distribute, publicly display, or publicly perform the Software or any portion thereof;
- circumvent, disable, or interfere with any license verification, security, or access-control features of the Software;
- use the Software to develop a competing product or service.

## 4. Eligibility
You must be at least 18 years old (or the age of legal majority in your jurisdiction, if higher) and have the legal capacity to enter into binding agreements to use the Software. By using the Software, you represent and warrant that you meet these requirements and that your use of the Software does not violate any law applicable to you, including laws governing algorithmic or automated trading, capital controls, or cryptocurrency trading in your country of residence.

If you use the Software on behalf of a company or organization, you represent that you are authorized to bind that entity to this Agreement.

## 5. Purpose and Architecture of the Software

### 5.1 Purpose
Platinum Trade is a technical software platform that provides market data visualization, charting, technical analysis tools, a software development kit ("SDK") for building trading strategies, and order-routing connectivity to supported cryptocurrency exchanges (currently OKX).

The Software does NOT:
- provide investment, financial, legal, or tax advice;
- guarantee profitability or any particular trading outcome;
- act as a broker, exchange, custodian, asset manager, or financial institution;
- independently execute trades — order transmission relies on third-party components as described in Section 5.2.

All trading and strategy decisions remain solely the responsibility of the User.

### 5.2 Architecture and Roles
- **Core application, charting** (including the GUI application, command-line interface, and core execution engine) — closed-source.
  - Provided by: Platinum Trade developer.
  - Responsibility: Software functionality only — not strategy outcomes.
- **SDK** (Software Development Kit) — open-source under the MIT License (see Section 6).
  - Provided by: Platinum Trade developer.
  - Responsibility: Governed by the SDK's MIT License; provided "as is" without warranty.
- **Order transmission** to OKX via public API.
  - Provided by: Open-source third-party library (OKX.Net / CryptoExchange.Net by JKorf, MIT License).
  - Responsibility: Provided "as is" without warranty by its original author.
- **Exchange-side order matching and execution**.
  - Provided by: OKX (the exchange).
  - Responsibility: Outside our control entirely.
- **Trading strategies, indicators, automated logic, plugins** (e.g., Stgy.UpTrend, or any plugin built using the SDK).
  - Provided by: The User, or independent third-party developers.
  - Responsibility: Sole responsibility of the author/operator of the strategy or plugin.
- **API keys, account security, exchange account**.
  - Provided by / Responsibility: The User.

Any sample, example, or demonstration plugin distributed with the Software (including but not limited to Stgy.UpTrend) is provided strictly for illustrative and SDK-testing purposes. It is not intended, warranted, or recommended for live trading use, and we accept no responsibility for trading outcomes resulting from its use.

### 5.3 Open-Source Third-Party Components
The Software incorporates open-source third-party libraries, including OKX.Net and CryptoExchange.Net (© JKorf, MIT License), to communicate with exchange APIs. A full list of third-party components and their licenses is available at [Third-Party Notices](third-party-notices.md).

Use of such libraries does not imply any endorsement, partnership, warranty, or support obligation from their respective authors toward you.

## 6. SDK License and Developer Responsibility

### 6.1 SDK is Open-Source
The Software's SDK is open-source and publicly available, and is distributed under the MIT License. This means anyone may view, copy, modify, and redistribute the SDK's source code, including for commercial purposes, subject only to the conditions of the MIT License (principally, retaining the copyright notice and license text).

The MIT License text accompanying the SDK's source repository is authoritative; in case of any conflict, the MIT License text prevails for matters concerning the SDK's source code.

Unlike the SDK, the closed-source application components of the Software (including the GUI application, command-line interface, and core execution engine) are NOT open-source and remain subject in full to this Agreement.

### 6.2 No Additional Warranty from Open-Sourcing
The fact that the SDK is open-source does not create any warranty, support obligation, or liability beyond what is stated in the MIT License itself, which provides the SDK "as is," without warranty of any kind.

### 6.3 Independent Developer Responsibility
The SDK is made available to enable independent developers to build plugins, indicators, and strategies. Platinum Trade does not review, audit, certify, or guarantee the correctness, security, or trading performance of any third-party code built using the SDK.

Any developer building or distributing plugins or strategies on the SDK is solely responsible for the conduct, accuracy, security, and consequences of such plugins, and agrees to hold Platinum Trade harmless from claims arising from their distribution or use.

## 7. Term and Termination

### 7.1 Term
This Agreement is effective from the date you first accept it or use the Software and continues until terminated as described below.

### 7.2 Termination by You
You may terminate this Agreement at any time by ceasing all use of the Software and permanently deleting all copies in your possession or control.

### 7.3 Termination by Platinum Trade
Platinum Trade may terminate your license under this Agreement immediately and without notice if:
- you breach any material term of this Agreement and fail to remedy such breach within ten (10) days of written notice from Platinum Trade; or
- you are in breach of Section 3 (Restrictions on Use) or compliance laws; or
- Platinum Trade discontinues the Software.

### 7.4 Effect of Termination
Upon termination of this Agreement for any reason:
- all rights granted to you under this Agreement immediately cease;
- you must immediately cease all use of the Software and permanently delete all copies in your possession or control.

## 8. Governing Law and Dispute Resolution
This Agreement shall be governed by and construed in accordance with the laws of Vietnam, without regard to its conflict of laws principles.

Any dispute arising out of or relating to this Agreement or the Software shall first be attempted to be resolved amicably through good-faith negotiation between the parties. If a dispute cannot be resolved amicably, it shall be subject to the exclusive jurisdiction of the competent courts of Vietnam, except that Platinum Trade may seek injunctive or equivalent urgent relief in any jurisdiction where necessary to protect our rights.

## 9. Contact
Platinum Trade
Email: vntradesoft@gmail.com

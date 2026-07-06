---
id: terms-of-use
title: Terms of Use
sidebar_label: Terms of Use
---

Platinum Trade — Terms of Use
===============================

PLEASE READ CAREFULLY BEFORE USING THE SOFTWARE.

By clicking "I Accept", installing, accessing, or using Platinum Trade ("the Software"), you acknowledge that you have read, understood, and agree to be legally bound by these Terms. If you do not agree, do not install or use the Software.

These Terms of Use incorporate by reference, and should be read together with, the following documents, each of which forms part of the agreement between you and Platinum Trade:

- [Risk Disclosure](risk-disclosure.md)
- [Disclaimer](disclaimer.md)
- [Limitation of Liability](liability.md)
- [Payment Policy](payment-policy.md)
- [Privacy Policy](privacy-policy.md)

------------------------------------------------------------

0. Eligibility
================

You must be at least 18 years old (or the age of legal majority in your jurisdiction, if higher) and have the legal capacity to enter into binding agreements to use the Software. By using the Software, you represent and warrant that you meet these requirements and that your use of the Software does not violate any law applicable to you, including laws governing algorithmic or automated trading, capital controls, or cryptocurrency trading in your country of residence.

If you use the Software on behalf of a company or organization, you represent that you are authorized to bind that entity to these Terms.

------------------------------------------------------------

1. Purpose and Architecture of the Software
==============================================

>> 1.1 Purpose

Platinum Trade is a technical software platform that provides market data visualization, charting, technical analysis tools, a software development kit ("SDK") for building trading strategies, and order-routing connectivity to supported cryptocurrency exchanges (currently OKX).

The Software does NOT:

- provide investment, financial, legal, or tax advice;
- guarantee profitability or any particular trading outcome;
- act as a broker, exchange, custodian, asset manager, or financial institution;
- independently execute trades — order transmission relies on third-party components as described in Section 1.2.

All trading and strategy decisions remain solely the responsibility of the User. See the [Disclaimer](disclaimer.md) for further detail.

>> 1.2 Architecture and Roles

To avoid confusion about responsibility when issues arise, the Software's components and the responsible party for each are described below:

    - Core application, charting (Pt.Okx.Core, Pt.Okx.Gui, Pt.Okx.Cli) — closed-source
      Provided by: Platinum Trade developer ("we", "us")
      Responsibility: Software functionality only — not strategy outcomes

    - SDK (Pt.Okx.Sdk) — open-source under a separate license; see Section 12
      Provided by: Platinum Trade developer, distributed under the MIT License
      Responsibility: Governed by the SDK's own license (MIT), not by this Agreement; provided "as is" without warranty as set out in that license

    - Order transmission to OKX via public API
      Provided by: Open-source third-party library (OKX.Net / CryptoExchange.Net by JKorf, MIT License)
      Responsibility: Provided "as is" without warranty by its original author; not affiliated with Platinum Trade

    - Exchange-side order matching and execution
      Provided by: OKX (the exchange)
      Responsibility: Outside our control entirely

    - Trading strategies, indicators, automated logic, plugins (e.g., sample plugin Stgy.UpTrend, or any plugin built by independent developers using the SDK)
      Provided by: The User, or independent third-party developers
      Responsibility: Sole responsibility of the author/operator of the strategy or plugin

    - API keys, account security, exchange account
      Provided by / Responsibility: The User

Any sample, example, or demonstration plugin distributed with the Software (including but not limited to Stgy.UpTrend) is provided strictly for illustrative and SDK-testing purposes. It is not intended, warranted, or recommended for live trading use.

>> 1.3 Open-Source Third-Party Components

The Software incorporates open-source third-party libraries, including OKX.Net and CryptoExchange.Net (© JKorf, MIT License), to communicate with exchange APIs. A full list of third-party components and their licenses is available at [Third-Party Notices — to be linked/attached].

Because these components are open-source and outside our control, any defect, bug, rate-limit behavior, or limitation originating from them is outside Platinum Trade's control. Our liability for any resulting loss is governed solely by the [Limitation of Liability](liability.md).

------------------------------------------------------------

2. User Responsibility
=========================

The User is solely responsible for:

- all trading decisions and strategy configuration;
- risk management, including position sizing and leverage;
- account security and safeguarding of API credentials (see [Limitation of Liability](liability.md));
- monitoring trading activity, open positions, and order status;
- understanding and testing (e.g., in a demo/sandbox environment) any strategy or plugin — whether self-written or obtained from a third party — before deploying it with real funds;
- compliance with all applicable laws in the User's jurisdiction (see Section 15).

The User accepts all risks arising from use of the Software, as further described in the [Risk Disclosure](risk-disclosure.md).

------------------------------------------------------------

3. Strategy and Plugin Independence
======================================

Trading strategies, indicators, scripts, plugins, and automation logic built using the Software's SDK are created and controlled by the User or by independent third-party developers, not by Platinum Trade. Platinum Trade does not create, review, audit, certify, or guarantee the outcomes of any third-party strategy, indicator, or plugin.

Where a third-party developer builds and distributes a plugin or strategy using the SDK, that developer — not Platinum Trade — is solely responsible for its design, logic, accuracy, security, and trading outcomes. The User assumes all risk associated with installing or running any third-party plugin, including plugins developed using the SDK. See the [Disclaimer](disclaimer.md) for further detail.

------------------------------------------------------------

4. Third-Party Services and Order Execution
==============================================

The Software interacts with exchanges, APIs, market data providers, and open-source libraries, including order transmission to OKX performed through the public API via the third-party library OKX.Net (see Section 1.3). Platinum Trade's responsibility for third-party services, and the exclusions that apply, are set out in the [Limitation of Liability](liability.md).

------------------------------------------------------------

5. No Affiliation
====================

Platinum Trade is an independent software product developed by an individual developer and is not affiliated with, endorsed by, sponsored by, or officially associated with OKX or any other exchange, broker, or financial institution, nor with the authors of any open-source third-party library it incorporates (including JKorf, author of OKX.Net and CryptoExchange.Net). All trademarks belong to their respective owners.

------------------------------------------------------------

6. SDK License and Developer Responsibility
==============================================

>> 6.1 SDK is Open-Source

The Software's SDK (Pt.Okx.Sdk) is open-source and publicly available, and is distributed under the MIT License. This means anyone may view, copy, modify, and redistribute the SDK's source code, including for commercial purposes, subject only to the conditions of the MIT License (principally, retaining the copyright notice and license text). The MIT License text accompanying the SDK's source repository is authoritative; in case of any conflict between this Section and that license text, the MIT License text prevails for matters concerning the SDK's source code.

Unlike the SDK, the closed-source application components of the Software (including Pt.Okx.Core, Pt.Okx.Gui, and Pt.Okx.Cli) are NOT open-source and remain subject in full to these Terms and the [Limitation of Liability](liability.md).

>> 6.2 No Additional Warranty from Open-Sourcing

The fact that the SDK is open-source does not create any warranty, support obligation, or liability beyond what is stated in the MIT License itself, which provides the SDK "as is," without warranty of any kind. Making the SDK's source code available for inspection does not mean Platinum Trade has certified it as bug-free, secure, or fit for any particular purpose.

>> 6.3 Independent Developer Responsibility

The SDK is made available to enable independent developers to build plugins, indicators, and strategies. Platinum Trade does not review, audit, certify, or guarantee the correctness, security, or trading performance of any third-party code built using the SDK — whether that code is itself open-source or closed-source. Any developer building or distributing plugins or strategies on the SDK is solely responsible for the conduct, accuracy, security, and consequences of such plugins.

------------------------------------------------------------

7. Compliance
================

Users are responsible for complying with all applicable laws and regulations in their jurisdiction, including those governing cryptocurrency trading, capital controls, taxation, and algorithmic/automated trading. The Software must not be used where such use is prohibited by applicable law.

------------------------------------------------------------

8. Updates to These Terms
============================

These Terms, and the documents incorporated by reference into them, may be modified from time to time. Material changes will be notified through the Software (e.g., a re-acceptance prompt) or by other reasonable means. Continued use of the Software after such changes take effect constitutes acceptance of the updated Terms.

------------------------------------------------------------

9. Governing Law and Dispute Resolution
==========================================

These Terms shall be governed by and construed in accordance with the laws of Vietnam, without regard to its conflict of laws principles. Any dispute arising out of or relating to these Terms or the Software shall first be attempted to be resolved amicably through good-faith negotiation between the parties. If a dispute cannot be resolved amicably, it shall be subject to the exclusive jurisdiction of the competent courts of Vietnam, except that we may seek injunctive or equivalent urgent relief in any jurisdiction where necessary to protect our rights.

------------------------------------------------------------

10. Severability
===================

If any provision of these Terms is found invalid or unenforceable by a competent court, that provision shall be removed or limited to the minimum extent necessary, and the remaining provisions shall continue in full force and effect.

------------------------------------------------------------

11. Contact
==============

Phan Thanh — Platinum Trade
Email: vntradesoft@gmail.com

------------------------------------------------------------
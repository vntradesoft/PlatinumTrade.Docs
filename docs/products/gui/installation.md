---
id: products-gui-installation
title: Installation
sidebar_position: 2
description: Step-by-step installation guide and first-run Setup Wizard walkthrough for the Platinum Trade GUI App
status: draft
visibility: internal
publish: false
---

# Installation

This guide walks you through downloading, installing, and running the Platinum Trade GUI Application for the first time, including configuring the initial setup wizard.

---

## 1. System Requirements

- **Operating System:** Windows 10 or Windows 11 (64-bit).
- **Disk Space:** Minimum 200 MB for installation, plus additional space for downloading historical candlestick data (approx. 50-100 MB per symbol/year).
- **Network:** Stable internet connection for real-time market data streaming and API execution.

---

## 2. Downloading the Application

You can download the latest official release package directly from our GitHub Releases page:

👉 **[Download Platinum Trade GUI Installer](https://github.com/vntradesoft/PlatinumTrade.App/releases)**

Select the latest version and download the executable installer (`PlatinumTrade.Setup.exe`).

---

## 3. Installation Process

1. Locate the downloaded installer file (`PlatinumTrade.Setup.exe`) on your machine.
2. Double-click the file to execute the installation wizard.
3. The Setup Wizard will automatically configure the required desktop shortcuts and initialize background libraries.
4. Once completed, the application will launch automatically. A shortcut icon labeled **Platinum Trade** will also be created on your Desktop and Start Menu for future launches.

---

## 4. First-Run Setup Wizard Walkthrough

When you launch the application for the very first time, the **Setup Wizard** window will appear to guide you through the initial configuration steps. This ensures a smooth onboarding experience.

### Step 1: Language Selection

Select your preferred interface language. The platform supports complete localization.

- **Options:** English or Vietnamese.
- **Action:** Select your language and click **Next** to proceed.

![(Step 1: Language Selection)](/img/products/gui/installation/installation-step-1.png)

### Step 2: License Agreement & Legal Policies

You must review and accept the legal policies of the platform before using any trading tools.

- **Action:** Read the linked legal documents, check the **"I accept the terms and conditions"** box, and click **Next**.
- **Legal References:**
  - Please read our [Terms of Use](../../legal/terms-of-use.md).
  - Review our [Privacy Policy](../../legal/privacy-policy.md).
  - Understand the risks in our [Risk Disclosure](../../legal/risk-disclosure.md).

![(Step 2: License Agreement & Legal Policies)](/img/products/gui/installation/installation-step-2.png)

### Step 3: Historical Candlestick Data Bootstrapping

To ensure that charts load instantly when you open the application, the Setup Wizard downloads a default bootstrap history dataset (containing standard 1-minute historical candles for major pairs like `BTC-USDT-SWAP`).

- **Action:** Click **Download** to start the bootstrap process. You can monitor the progress bar.

![(Step 3: Historical Candlestick Data Bootstrapping)](/img/products/gui/installation/installation-step-3.png)

#### Handling Download Failures

If the automatic download fails due to network restrictions, firewall/proxy configurations, or server timeouts:

1. **Retry Download:** Click the **Retry** button that appears on the screen to attempt the download again.
2. **Skip and Auto-Sync:** You can click **Skip** to bypass this step. The application will launch, and the background synchronization service (`CandleSyncService`) will automatically download the necessary history files in the background once you add symbols to the [Market Watch](./market-watch.md) panel.
3. **Manual Download Fallback:** The Setup Wizard will display a detailed diagnostics box:
   - **Error Details:** The specific exception or system message explaining the failure.
   - **Manifest URL:** The direct HTTP/HTTPS endpoint of the bootstrap manifest file.
   - **Manual Storage Path:** A dedicated local directory where downloaded files should be placed:
     ```
     %LocalAppData%\PlatinumTrade\Histories
     ```

### Step 4: Theme Configuration

Select the visual style that matches your environment preference.

- **Options:**
  - **Dark Mode:** Elegant, deep indigo theme (recommended for reduced eye strain).
  - **Light Mode:** High-contrast, clean corporate style.
- **Action:** Select your theme preference and click **Finish** to enter the main trading interface.

![(Step 4: Theme Configuration)](/img/products/gui/installation/installation-step-4.png)

---

## 5. Completion & API Configuration

After clicking **Finish** in the Setup Wizard:

1. The Setup Wizard will close, and the main desktop trading application interface will load.
2. To configure your API connection and start trading, navigate to **Tools** -> **Options** -> **API Credentials** in the top menu bar.
3. Input your OKX credentials (API Key, Secret Key, Passphrase) and verify your connection.

For complete, step-by-step instructions on setting up your credentials, please refer to the next guide:

➡️ **[API Key Setup](./settings/api-credentials.md)**
➡️ **[Getting Started](./getting-started.md)**

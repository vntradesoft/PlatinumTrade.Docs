---
id: products-gui-indicator-manager
title: Indicator Plugin Manager
sidebar_position: 10
description: Load, unload, and manage custom technical indicator plugins locally
status: draft
visibility: internal
publish: false
---

# Indicator Plugin Manager

The **Indicator Plugin Manager** allows users to load, unload, monitor, and clean custom technical indicator plugins (`.dll`) dynamically.

---

## 1. How to Access

To open the Indicator Plugin Manager dialog:
- **Via the Main Menu:** Select **Tools** -> **Indicator Plugin Manager**.

---

## 2. Interface and Columns

The manager dialog displays a list of all detected indicator plugin DLLs in your local indicator directory:

![Indicator Plugin Manager UI](/img/products/gui/indicator/indicator_manager.png)

- **Name:** The friendly name of the plugin (or the file name if it cannot be loaded).
- **Version:** The version of the plugin (e.g., `1.0.0`).
- **Author:** The author or publisher of the plugin.
- **Description:** A short explanation of the indicator's behavior.
- **Indicators:** The list of specific registered indicator names contained within the DLL (multiple indicators can be bundled inside a single DLL).
- **Status:** Shows the current physical state of the plugin:
  - **Active:** The plugin is successfully loaded and running.
  - **Pending Restart:** The plugin is marked for deletion, but its DLL file is currently locked by the Windows process. It will be completely removed when you restart the application.
  - **Load Failed:** The DLL is present in the folder but cannot be loaded (due to an incompatible SDK version or invalid plugin structure).

---

## 3. Operational Features

### A. Load / Import Plugin (📥)
- Click the **Load Plugin** button to choose a compiled custom indicator DLL from your computer.
- **Validation:** The application automatically runs validation checks to ensure:
  1. The DLL is a valid, compatible indicator plugin.
  2. The DLL structure aligns with the current SDK.
- Once validated, the DLL is copied to the local AppData indicator plugins folder and automatically activated.

### B. Unload / Delete Plugin (🗑️)
- Clicking the **Trash (🗑️)** icon next to a plugin unregisters its indicators from the chart menus and schedules the DLL file for deletion.
- **Windows File Lock Handling:**
  - Because C# DLLs remain locked by the running process, a plugin that is currently running cannot be deleted immediately.
  - In this case, the file is marked with a `.deleted` marker and its status changes to **Pending Restart**. The button is disabled to prevent repeated operations.
  - The file will be cleaned up automatically during the next application startup.

### C. Open Plugins Directory (📁)
- Opens the local indicator plugins folder in Windows Explorer.
- Useful for advanced users who want to manually inspect, back up, or delete files.

### D. Refresh (🔄)
- Scans the directory and refreshes the plugin list, showing the latest status of all DLL files.

---

## 4. Safety Warnings

The application includes smart protection to prevent conflicts when importing plugins:

> [!WARNING]
> **Locked File Warn:** If you try to import or overwrite a plugin DLL that is currently active and locked, the system will prevent the overwrite and show a friendly guide: *"Cannot overwrite the DLL file because the old plugin is currently active and locked by Windows. Please uninstall the plugin, restart the application, and try importing it again."*

> [!IMPORTANT]
> **Pending Delete Warn:** If you attempt to import a plugin DLL with the same name as one that is currently marked as **Pending Restart**, the import will be blocked with the message: *"This plugin assembly is currently pending delete to fully release. Please restart the application before loading or overwriting it."*

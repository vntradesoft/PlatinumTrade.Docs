---
id: products-gui-toast-notifications
title: Toast Notifications
sidebar_position: 11
description: Design guidelines and runtime behavior for Toast Notifications in the Platinum Trade GUI App
status: draft
visibility: internal
publish: false
---

# Toast Notifications

Toast Notifications are transient, non-blocking popup alerts used to provide quick feedback on application activities without interrupting the user's workflow.

## UX Goals

- Avoid interrupting active user interactions.
- Provide clear, contextual feedback based on alert severity levels.
- Auto-dismiss after a reasonable duration.

## Key Behaviors

- Displayed in an overlay layer, positioned in the upper-right corner by default.
- Supports vertical stacking for concurrent alerts without overlap.
- Features a smooth slide-in entry animation from the right.
- Includes a manual dismiss button (X) on each card.
- Pauses the auto-close countdown when the mouse pointer hovers over the notification.

## Default Configurations

- Position: Top-Right.
- Default Auto-Close Duration: 4 seconds.
- Entry Animation: Slide-in from the right.
- Maximum Visible Notifications: 5.
- Pause on Hover: Enabled.
- Type-Specific Icons: Enabled.
- Manual Dismiss Button: Enabled.

## Notification Types

- **Success:** Indicates that a user action completed successfully.
- **Info:** Displays general system status updates or background progress.
- **Warning:** Alerts the user to potential issues that require attention.
- **Error:** Highlights critical failures that may require troubleshooting or manual intervention.

## Auto-Close Durations by Type

- Success: 3 seconds.
- Info: 4 seconds.
- Warning: 5 seconds.
- Error: Persistent by default (requires manual dismissal, though custom timeouts can be configured).

## When to Use Toast Notifications

- Indicating quick action completion (e.g., "Settings saved," "Connected successfully").
- Soft warnings that do not require full modal dialog blocks.
- Concise error notices with simple recovery suggestions.

## When to Avoid Toast Notifications

- Long, detailed text or workflows requiring multi-step inputs.
- Critical business logic decisions that require immediate, explicit user actions.
- Severe system failures that must block application usage via modal dialogs.

## Content Guidelines

- Keep texts short and focused on a single point.
- Use active verbs.
- For errors, provide a brief cause and next steps.

Examples:

- Success: "Strategy configuration saved successfully."
- Info: "Synchronizing historical candlestick data..."
- Warning: "Network connection is unstable."
- Error: "Failed to fetch symbol list. Please try again."

## Related Docs

- [UI Overview](./ui-overview.md)
- [FAQ](./faq.md)
- [Trading Basics](./trading-basics.md)

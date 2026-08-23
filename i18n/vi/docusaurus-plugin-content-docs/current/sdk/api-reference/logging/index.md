---
id: index
title: Logging
sidebar_position: 4
description: Logging API cho phép bạn ghi thông báo ra tab Experts của nền tảng.
status: stable
visibility: public
---

# Logging API

Logging API cho phép các chiến lược của bạn xuất thông báo ra giao diện người dùng, thường là tab Experts hoặc Journal, hữu ích cho việc gỡ lỗi và theo dõi kiểm toán.

| Interface / Class | Mô Tả |
|---|---|
| [`IStrategyLogger`](../interfaces.md#istrategylogger) | Giao diện ghi log có cấu trúc và thông điệp giao dịch. |
| [`PtLogLevel`](../enums.md#ptloglevel) | Kiểu liệt kê xác định mức độ nghiêm trọng của log. |

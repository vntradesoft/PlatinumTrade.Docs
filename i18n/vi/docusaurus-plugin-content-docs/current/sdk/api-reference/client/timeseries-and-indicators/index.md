---
id: sdk-timeseries-indicators
title: Dữ Liệu Chuỗi Thời Gian & Chỉ Báo
sidebar_label: Tổng Quan
sidebar_position: 1
---

# Timeseries & Indicators API

Timeseries API (`Context.Timeseries`) cung cấp quyền truy cập vào dữ liệu thị trường nến OHLCV lịch sử và thời gian thực, quản lý tick, và hệ thống chỉ báo kỹ thuật tích hợp.

## Các tính năng chính

- **Dữ liệu Nến OHLCV**: Truy xuất nến đóng, nến đang mở và chuỗi lịch sử qua `GetOHLCVAsync`, `GetLastClosedCandle`, `CopySeries`.
- **Copy Vector hóa Hiệu năng cao**: Tách riêng dữ liệu `CopyTimes`, `CopyOpens`, `CopyHighs`, `CopyLows`, `CopyCloses`, `CopyVolumes` ra mảng nguyên thủy.
- **Chỉ báo Tích hợp**: Khởi tạo và đồng bộ buffer các chỉ báo phổ biến (RSI, MA, MACD, Bollinger Bands, ATR...).
- **Chỉ báo Tùy biến**: Nạp và tính toán chỉ báo từ plugin bên ngoài qua `GetCustomIndicatorAsync<T>`.

## Tài liệu chi tiết

- [Timeseries API Reference](./timeseries.md)

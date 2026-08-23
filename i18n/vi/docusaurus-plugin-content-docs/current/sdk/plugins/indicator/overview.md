---
sidebar_position: 1
id: sdk-indicator-overview
title: Tổng Quan & Cài Đặt
description: Phát triển plugin chỉ báo kỹ thuật tùy chỉnh
status: published
visibility: public
---

# Plugin Chỉ Báo Tùy Chỉnh

Hướng dẫn này giải thích cách xây dựng một plugin chỉ báo kỹ thuật tùy chỉnh cho nền tảng Platinum Trading Platform (hỗ trợ futures & swaps sàn OKX). Plugin là một tệp DLL độc lập có thể nạp động vào ứng dụng GUI hoặc Bot mà không cần biên dịch lại mã nguồn lõi.

## Tổng Quan Kiến Trúc

Hệ thống plugin chỉ báo dựa trên 3 thành phần chính:

| Interface / Class | Vai Trò |
|---|---|
| `IIndicatorPlugin` | Điểm truy cập chính — định nghĩa siêu dữ liệu plugin (metadata) và đăng ký danh sách các chỉ báo. |
| `IIndicatorRegistrationContext` | Ngữ cảnh sử dụng để đăng ký các phương thức factory và siêu dữ liệu tham số đầu vào. |
| `CalcIndBase` | Lớp cơ sở mà mọi chỉ báo tùy chỉnh BẮT BUỘC phải kế thừa. Lớp này quản lý định danh chỉ báo, buffer dữ liệu và quy trình tính toán. |

## Bước 1: Tạo Dự Án

### Lựa chọn A — Sử dụng dotnet template (Khuyên dùng)

Cài đặt template một lần (từ thư mục gốc repo hoặc NuGet) và khởi tạo dự án:

```bash
dotnet new install ./templates/IndicatorTemplate   # Cài đặt một lần
dotnet new pt-indicator -n MyIndicators
```

Lệnh này tạo một dự án hoàn chỉnh với tệp `.csproj` chuẩn, lớp `IIndicatorPlugin` và lớp mẫu kế thừa `CalcIndBase` sẵn sàng để bạn tùy biến.

### Lựa chọn B — Thiết lập thủ công

Sử dụng `.NET CLI` để tạo dự án Class Library:

```bash
dotnet new classlib -n MyIndicators -f net10.0
```

Cấu hình `.csproj` để tham chiếu tới `Pt.Okx.Sdk`:

```xml
<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <TargetFramework>net10.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
  <ItemGroup>
    <ProjectReference Include="..\Pt.Okx.Sdk\Pt.Okx.Sdk.csproj" />
  </ItemGroup>
</Project>
```

## Bước 2: Triển Khai Điểm Truy Cập Plugin

Mỗi plugin cần một lớp duy nhất triển khai interface `IIndicatorPlugin`. Lớp này cung cấp thông tin mô tả về plugin (tên, tác giả, phiên bản) và chịu trách nhiệm đăng ký các chỉ báo thực tế.

```csharp
using Pt.Okx.Sdk.Indicators.Plugin;

public class MyIndicatorPlugin : IIndicatorPlugin
{
    // Các thuộc tính metadata
    public string Name => "My Custom Indicators";
    public string PluginVersion => "1.0.0";
    public string Description => "Chứa các chỉ báo SMA và Momentum tùy chỉnh.";
    public string Author => "Nguyen Van A";

    // Đăng ký toàn bộ chỉ báo có trong tệp DLL này
    public void RegisterIndicators(IIndicatorRegistrationContext context)
    {
        // Logic đăng ký sẽ được viết ở đây. Xem tiếp trang Đăng Ký & Tham Số.
    }
}
```

Tính tương thích SDK được hệ thống tự động nhận diện từ tham chiếu `Pt.Okx.Sdk` trong assembly của plugin.

## Nạp Plugin Vào Hệ Thống

Plugin được nạp động vào nền tảng khi chạy.

### Từ Giao Diện Đồ Họa (GUI)
Người dùng có thể nạp plugin trực tiếp qua giao diện:
Truy cập menu: **Insert > Indicators > Custom > Load Custom Indicator...** và chọn tệp `MyIndicators.dll` đã biên dịch.

### Bằng Mã Nguồn (Bots / Engines)
Khi chạy bot không có giao diện (headless bot), engine sử dụng `IIndicatorPluginLoader` (được inject qua DI):

```csharp
IIndicatorPluginLoader loader = /* được inject qua DI */;

// Nạp một file DLL cụ thể
var plugin = loader.LoadPlugin("path/to/MyIndicators.dll");

// Duyệt danh sách các plugin đã nạp
foreach (var p in loader.LoadedPlugins)
{
    Console.WriteLine($"{p.Metadata.Name} v{p.Metadata.PluginVersion}");
}
```

---

Tiếp theo, hãy chuyển sang trang **[Đăng Ký & Tham Số](registration.md)** để tìm hiểu cách đăng ký chỉ báo và định nghĩa các tham số đầu vào.

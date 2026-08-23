---
sidebar_position: 3
id: sdk-strategy-settings
title: Cấu Hình Chiến Lược
description: Cấu hình chế độ giao dịch, đòn bẩy và các thiết lập chiến lược
---

# Cấu Hình Chiến Lược (Strategy Settings)

Lớp `StrategySettings` chứa cấu hình cốt lõi cho một phiên bản chiến lược. Cấu hình này xác định các thông số vận hành cơ bản của chiến lược (như symbol cần giao dịch, khung thời gian, đòn bẩy) cũng như chế độ thực thi (Live, Sandbox hoặc Backtest).

Bạn có thể truy cập các cài đặt này trong chiến lược bằng cách inject `IOptions<StrategySettings>` vào constructor.

## Cấu Trúc Lớp

```csharp
using Pt.Okx.Sdk.Strategy.Settings;

public class StrategySettings
{
    // --- Môi Trường & Chế Độ ---
    public bool SandBox { get; set; }           // Chạy trên môi trường Demo của sàn OKX
    public bool Backtest { get; set; }          // Chạy trên động cơ Backtest cục bộ

    // --- Thông Số Giao Dịch ---
    public string Symbol { get; set; }          // Mã giao dịch (ví dụ: "BTC-USDT-SWAP")
    public string Underlying { get; set; }      // Tài sản cơ sở (ví dụ: "BTC")
    public Timeframe Timeframe { get; set; }    // Khung thời gian biểu đồ chính (ví dụ: Timeframe.M1, Timeframe.H1)
    public int Leverage { get; set; }           // Mức đòn bẩy
    public TradeMode TradeMode { get; set; }    // Ký quỹ Cô lập (Isolated) / Toàn phần (Cross)
    public MarginMode MarginMode { get; set; }  // Chế độ ký quỹ Isolated / Cross
    
    // --- Ràng Buộc Mô Phỏng & Backtest ---
    public decimal Deposite { get; set; }       // Số vốn ký quỹ ban đầu mô phỏng (ví dụ: 10000 USDT)
    public int MaxBars { get; set; }            // Số lượng nến tối đa lưu trong bộ nhớ phục vụ tính chỉ báo
    public int WarmupBars { get; set; }         // Số nến khởi động (warmup) trước khi chiến lược bắt đầu giao dịch
    public DateTime? StartTime { get; set; }    // Thời điểm bắt đầu backtest
    public DateTime? EndTime { get; set; }      // Thời điểm kết thúc backtest
}
```

## Cách Sử Dụng Trong Chiến Lược

```csharp
public class MyStrategy : StrategyBase
{
    private readonly StrategySettings _settings;

    public MyStrategy(IOptions<StrategySettings> strategySettings)
    {
        _settings = strategySettings.Value;

        if (_settings.Backtest)
        {
            // Thực thi logic khởi tạo dành riêng cho chế độ backtest
        }
    }

    public async Task<bool> OnInitAsync(IStrategyStateStore state, CancellationToken ct)
    {
        // Ví dụ: truy cập symbol và khung thời gian đã được cấu hình
        var symbol = _settings.Symbol;
        var period = _settings.Timeframe;
        
        return true;
    }
}
```

> [!NOTE]
> Các thuộc tính trong `StrategySettings` chủ yếu là chỉ đọc (read-only) trong quá trình chiến lược đang chạy, vì chúng được cấu hình bởi người dùng thông qua giao diện GUI trước khi khởi chạy bot hoặc bắt đầu backtest. Đối với các cấu hình động, bạn nên sử dụng hệ thống `InputParameter`.

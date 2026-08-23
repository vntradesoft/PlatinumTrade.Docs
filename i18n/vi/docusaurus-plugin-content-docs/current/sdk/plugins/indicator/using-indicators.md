---
sidebar_position: 5
id: sdk-indicator-using-indicators
title: Sử Dụng Chỉ Báo
description: Tận dụng các chỉ báo có sẵn hoặc chỉ báo tùy chỉnh khác bên trong chỉ báo của bạn mà không cần tính toán lại
status: published
visibility: public
---

# Sử Dụng Chỉ Báo Bên Trong Chỉ Báo

Thông thường, bạn muốn xây dựng một chỉ báo tùy chỉnh dựa trên đầu ra của một chỉ báo khác (ví dụ: tạo chỉ báo Smoothed RSI bằng cách truyền RSI qua một đường SMA, hoặc tính toán MACD bằng hai đường EMA).

SDK cho phép bạn khởi tạo và sử dụng các chỉ báo khác **mà không cần phải tự tính toán lại thủ công**. Engine sẽ tự động quản lý vòng đời của chúng, tính toán các giá trị lũy tiến và cung cấp kết quả cho bạn.

## Khởi Tạo Chỉ Báo Con (Child Indicators)

Để sử dụng một chỉ báo khác bên trong chỉ báo tùy chỉnh của bạn, bạn khởi tạo nó trong phương thức `OnInit()` bằng cách sử dụng đối tượng `_factory` được inject vào.

### 1. Định nghĩa cấu hình chỉ báo con
Tạo một đối tượng `IndicatorConfig` định nghĩa các tham số của chỉ báo con.

### 2. Tạo và lưu trữ instance
Sử dụng `_factory.CreateIndicator()` và lưu instance trả về vào một biến cấp lớp.

```csharp
using Pt.Okx.Sdk.Indicators.Base;
using Pt.Okx.Sdk.Indicators.Enums;
using Pt.Okx.Sdk.Indicators.Models;
using Pt.Okx.Sdk.Indicators.Services;
using Pt.Okx.Sdk.Indicators.BuiltIn;

public class CalcIndSmoothedRSI : CalcIndBase
{
    private IIndicator? _childRsi;
    private IIndicator? _childSma;
    private IIndicatorBuffer? _mainBuffer;

    private int _rsiPeriod;
    private int _smaPeriod;

    public CalcIndSmoothedRSI(IIndicatorFactory factory, IIndicatorManager manager, IndicatorConfig config)
        : base(factory, manager, config)
    {
    }

    protected override IndicatorProperty CreateDefaultProperty()
    {
        _rsiPeriod = GetParameter<int>("RsiPeriod");
        _smaPeriod = GetParameter<int>("SmaPeriod");

        return new IndicatorProperty("Smoothed RSI", IndicatorWindow.Separate, 1, 1);
    }

    public override bool OnInit()
    {
        if (!base.OnInit()) return false;
        
        SetBuffer(0, IndicatorBufferType.Data);
        _mainBuffer = GetBuffer(0);

        // 1. Tạo chỉ báo RSI cơ sở
        var rsiConfig = new IndicatorConfig
        {
            Symbol = Config.Symbol,
            TimeFrame = Config.TimeFrame,
            IndicatorType = IndicatorType.RSI
        };
        rsiConfig.SetParam("Period", null, _rsiPeriod);
        
        _childRsi = _factory.CreateIndicator(_manager, rsiConfig);

        // 2. Tạo đường SMA và truyền đầu ra của RSI vào làm nguồn dữ liệu đầu vào cho SMA
        var smaConfig = new IndicatorConfig
        {
            Symbol = Config.Symbol,
            TimeFrame = Config.TimeFrame,
            IndicatorType = IndicatorType.MA
        };
        smaConfig.SetParam("Period", null, _smaPeriod);
        smaConfig.SetParam("Method", null, MaMethod.SMA);
        
        // QUAN TRỌNG: Nối đầu ra của RSI làm nguồn cho SMA
        smaConfig.Sources.Add(new IndicatorSource
        {
            IndicatorId = _childRsi.GetIndicatorId(),
            BufferIndex = 0 // Buffer đầu ra chính của RSI
        });

        _childSma = _factory.CreateIndicator(_manager, smaConfig);

        return true;
    }

    public override int OnCalculate(
        in int ratesTotal, 
        in int prevCalculated, 
        in DateTime[] datetime, 
        in double[] opens, 
        in double[] highs, 
        in double[] lows, 
        in double[] closes, 
        in double[] volumes, 
        in double spreads)
    {
        int requiredPeriod = _rsiPeriod + _smaPeriod;
        if (ratesTotal <= requiredPeriod) return 0;

        int start = Math.Max(prevCalculated - 1, requiredPeriod);

        for (int i = start; i < ratesTotal; i++)
        {
            // Vì engine tự động tính toán các chỉ báo phụ thuộc trước,
            // chúng ta có thể an toàn truy vấn trực tiếp giá trị của SMA.
            var smoothedRsiValue = _childSma!.GetAt(ratesTotal - 1 - i);
            
            if (smoothedRsiValue.IsEmpty)
            {
                _mainBuffer!.MarkEmpty(i, datetime[i]);
            }
            else
            {
                _mainBuffer!.ForceAdd(i, datetime[i], smoothedRsiValue.Value);
            }
        }

        return ratesTotal;
    }
}
```

## Cơ Chế Tính Toán Phụ Thuộc (Dependency Calculation)

Khi bạn tạo một chỉ báo con qua `_factory.CreateIndicator(_manager, config)`, hai việc quan trọng diễn ra:
1. **Đăng ký:** Chỉ báo con được đăng ký với `IIndicatorManager`.
2. **Sắp xếp thứ tự phụ thuộc:** Engine tính toán tự động xây dựng cây đồ thị phụ thuộc (dependency graph). Hệ thống đảm bảo **các chỉ báo con được tính toán TRƯỚC chỉ báo cha** trên mỗi tick.

Do đó, bên trong vòng lặp `OnCalculate`, bạn không cần gọi `OnCalculate` trên `_childRsi` hay `_childSma`. Buffer nội bộ của chúng đã được tự động lấp đầy các giá trị mới nhất.

## Nối Nguồn Dữ Liệu (`Config.Sources`)

Như ví dụ trên, nếu bạn muốn một chỉ báo (như SMA) tính toán dựa trên đầu ra của một chỉ báo khác (như RSI) thay vì dữ liệu giá thô, bạn chỉ cần gán ID của chỉ báo con vào mảng `Sources`:

```csharp
smaConfig.Sources.Add(new IndicatorSource
{
    IndicatorId = _childRsi.GetIndicatorId(),
    BufferIndex = 0 // Chỉ số buffer của RSI mà bạn muốn đọc
});
```
Điều này giúp bạn không cần phải duyệt thủ công qua buffer của RSI và tự tính toán lại công thức SMA. Đường SMA sẽ tự động sử dụng mảng đầu ra của RSI làm mảng `closes` đầu vào của chính nó.

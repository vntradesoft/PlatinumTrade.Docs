---
id: index
title: Chỉ Báo Kỹ Thuật Tích Hợp Sẵn
sidebar_position: 1
description: Tổng quan về các chỉ báo kỹ thuật tích hợp sẵn, phương thức truy xuất chung và buffer chỉ báo.
status: stable
visibility: public
---

# Tổng Quan Về Chỉ Báo Kỹ Thuật

Platinum Trade SDK cung cấp một bộ chỉ báo kỹ thuật tích hợp sẵn toàn diện phục vụ phân tích định lượng và giao dịch thuật toán. Các chỉ báo này được phân nhóm theo đặc tính phân tích.

---

## Phương Thức Truy Xuất Chung (`IIndicatorMethodCommon`)

Tất cả các đối tượng chỉ báo trong SDK đều triển khai interface `IIndicatorMethodCommon`, cung cấp cách thức chuẩn hóa để lấy các giá trị đã tính toán mà không cần truy cập vào các thuộc tính riêng biệt của từng loại chỉ báo.

```csharp
public interface IIndicatorMethodCommon
{
    // Lấy giá trị chỉ báo tại vị trí chỉ số xác định từ buffer mặc định.
    IndicatorValue GetAt(int index = 0);
    
    // Lấy giá trị chỉ báo tại vị trí chỉ số xác định từ một buffer cụ thể.
    IndicatorValue GetAt(int index, int bufferIndex);
    
    // Lấy một chuỗi giá trị chỉ báo từ buffer mặc định.
    IEnumerable<IndicatorValue> GetRange(int count = 1);
    
    // Lấy một chuỗi giá trị chỉ báo từ một buffer cụ thể.
    IEnumerable<IndicatorValue> GetRange(int count, int bufferIndex);
}
```

---

## Bộ Đệm Chỉ Báo (`IIndicatorBuffer`)

Bên trong hệ thống, dữ liệu chỉ báo được lưu trữ trong các cấu trúc được lập chỉ mục theo thời gian quản lý bởi `IIndicatorBuffer`. Một chỉ báo có thể có một hoặc nhiều buffer (ví dụ: MACD có đường chính Main Line và đường tín hiệu Signal Line).

```csharp
public interface IIndicatorBuffer
{
    // Trả về tổng số phần tử trong buffer.
    int Count { get; }
    
    // Lấy giá trị tại vị trí lệch thời gian (0 = thanh nến hiện tại).
    IndicatorValue At(int index);
    
    // Trả về giá trị tại đúng thời điểm xác định.
    IndicatorValue Find(DateTime dateTime);
    
    // Trả về giá trị chỉ báo tại hoặc trước thời điểm xác định.
    IndicatorValue FindAtOrBefore(DateTime dateTime);
    
    // Lấy các giá trị mới nhất trong buffer dưới dạng Span cực nhanh, không cấp phát bộ nhớ.
    Span<IndicatorValue> GetLatest(int count);
}
```

---

## Các Danh Mục Chỉ Báo

### Bill Williams

| Chỉ báo | Mô tả |
|---|---|
| [Accelerator Oscillator (AC)](./bill-williams.md#accelerator-oscillator-ac) | Đo lường gia tốc và sự giảm tốc của động lực thị trường hiện tại. |
| [Alligator](./bill-williams.md#alligator) | Mô hình bám theo xu hướng kết hợp ba đường trung bình động dịch chuyển theo thời gian. |
| [Awesome Oscillator (AO)](./bill-williams.md#awesome-oscillator-ao) | Đo lường động lượng thị trường của 5 chu kỳ gần nhất so với 34 chu kỳ trước đó. |
| [Gator Oscillator](./bill-williams.md#gator-oscillator) | Biểu diễn sự hội tụ và phân kỳ của các dải Alligator. |
| [Fractals](./bill-williams.md#fractals) | Nhận diện các đỉnh và đáy cục bộ trong biến động giá. |
| [Market Facilitation Index (BWMFI)](./bill-williams.md#market-facilitation-index-bwmfi) | Đánh giá mức độ thay đổi giá của tài sản trên mỗi đơn vị khối lượng giao dịch. |

### Dao Động (Oscillators)

| Chỉ báo | Mô tả |
|---|---|
| [Average True Range (ATR)](./oscillators.md#average-true-range-atr) | Đo lường độ biến động tuyệt đối của thị trường. |
| [Bears Power](./oscillators.md#bears-power) | Ước tính tương quan sức mạnh của phe bán so với phe mua. |
| [Bollinger Band Width (BBW)](./oscillators.md#bollinger-band-width-bbw) | Đo lường tỷ lệ phần trăm độ rộng giữa dải trên và dải dưới Bollinger Bands để đánh giá biến động. |
| [Bollinger Bands %B](./oscillators.md#bollinger-bands-b) | Định lượng mức giá của tài sản tương quan với dải trên và dải dưới Bollinger Bands. |
| [Bulls Power](./oscillators.md#bulls-power) | Ước tính tương quan sức mạnh của phe mua so với phe bán. |
| [Commodity Channel Index (CCI)](./oscillators.md#commodity-channel-index-cci) | Đo lường độ lệch của giá tài sản so với giá trị trung bình thống kê của nó. |
| [DeMarker (DeM)](./oscillators.md#demarker-dem) | So sánh giá cao nhất và thấp nhất gần nhất với chu kỳ trước để đo lường lực cầu. |
| [MACD](./oscillators.md#macd) | Chỉ báo động lượng theo xu hướng thể hiện mối quan hệ giữa hai đường trung bình động của giá tài sản. |
| [Money Flow Index (MFI)](./oscillators.md#money-flow-index-mfi) | Đo lường áp lực mua và bán thông qua việc tích hợp dữ liệu giá và khối lượng. |
| [Momentum](./oscillators.md#momentum) | Đo lường tốc độ thay đổi giá của một tài sản. |
| [OsMA](./oscillators.md#osma) | Đo lường khoảng cách chênh lệch giữa đường MACD và đường tín hiệu của nó. |
| [Relative Strength Index (RSI)](./oscillators.md#relative-strength-index-rsi) | Bộ dao động động lượng đo lường tốc độ và sự thay đổi của biến động giá. |
| [Relative Vigor Index (RVI)](./oscillators.md#relative-vigor-index-rvi) | Đo lường năng lượng tương đối của xu hướng giá hiện tại. |
| [Standard Deviation (StdDev)](./oscillators.md#standard-deviation-stddev) | Đo lường độ biến động thị trường bằng độ lệch chuẩn thống kê. |
| [Stochastic Oscillator](./oscillators.md#stochastic-oscillator) | So sánh mức giá đóng cửa cụ thể với một biên độ giá trong một khoảng thời gian xác định. |
| [TRIX](./oscillators.md#trix) | Bộ dao động động lượng đo lường tốc độ thay đổi của đường trung bình động làm mượt ba lần theo hàm mũ. |
| [Williams %R (WPR)](./oscillators.md#williams-r-wpr) | Chỉ báo động lượng đo lường vùng quá mua và quá bán, dao động từ 0 đến -100. |

### Xu Hướng (Trend)

| Chỉ báo | Mô tả |
|---|---|
| [Average Directional Index (ADX)](./trend.md#average-directional-index-adx) | Đo lường sức mạnh của xu hướng thị trường hiện tại. |
| [ADX Wilder (ADXW)](./trend.md#adx-wilder-adxw) | Phiên bản làm mượt của Wilder cho chỉ báo Average Directional Index (ADXW). |
| [Adaptive Moving Average (AMA)](./trend.md#adaptive-moving-average-ama) | Đường trung bình động thích ứng tự động điều chỉnh độ nhạy dựa trên biến động thị trường. |
| [Bollinger Bands](./trend.md#bollinger-bands) | Các dải biến động được đặt phía trên và phía dưới một đường trung bình động. |
| [Double Exponential Moving Average (DEMA)](./trend.md#double-exponential-moving-average-dema) | Cung cấp phản ứng nhanh hơn và giảm độ trễ so với đường EMA tiêu chuẩn. |
| [Envelopes](./trend.md#envelopes) | Các dải trên và dưới dịch chuyển theo tỷ lệ phần trăm độ lệch từ đường trung bình động. |
| [Ichimoku Kinko Hyo](./trend.md#ichimoku-kinko-hyo) | Hệ thống chỉ báo xu hướng toàn diện cung cấp các mức hỗ trợ/kháng cự và điểm đảo chiều. |
| [Moving Average (MA)](./trend.md#moving-average-ma) | Chỉ báo đường trung bình động tiêu chuẩn để xác định hướng đi của xu hướng. |
| [Parabolic SAR](./trend.md#parabolic-sar) | Xác định các điểm đảo chiều tiềm năng và cung cấp mức dừng lỗ động (trailing stop). |
| [SuperTrend](./trend.md#supertrend) | Chỉ báo bám theo xu hướng dựa trên độ biến động ATR và mức giá trung vị (Median price). |
| [Triple Exponential Moving Average (TEMA)](./trend.md#triple-exponential-moving-average-tema) | Đường trung bình động theo xu hướng với độ trễ thậm chí còn thấp hơn DEMA. |

### Khối Lượng (Volumes)

| Chỉ báo | Mô tả |
|---|---|
| [Accumulation/Distribution (A/D)](./volumes.md#accumulationdistribution-ad) | Đo lường sự tích lũy và phân phối khối lượng bằng cách so sánh giá đóng cửa với biên độ giao dịch. |
| [Chaikin Oscillator](./volumes.md#chaikin-oscillator) | Áp dụng nguyên lý MACD vào đường tích lũy/phân phối A/D. |
| [Force Index](./volumes.md#force-index) | Kết hợp biến động giá với khối lượng để đo lường động lực thúc đẩy xu hướng. |
| [On Balance Volume (OBV)](./volumes.md#on-balance-volume-obv) | Theo dõi dòng tiền khối lượng tích lũy để dự đoán biến động giá trong tương lai. |
| [Volume Spike](./volumes.md#volume-spike) | Nhận diện các đợt tăng vọt đột biến về khối lượng giao dịch so với mức trung bình. |
| [Volume Weighted Average Price (VWAP)](./volumes.md#volume-weighted-average-price-vwap) | Mức giá trung bình gia quyền theo khối lượng của tài sản được giao dịch trong một phiên. |

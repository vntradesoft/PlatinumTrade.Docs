---
sidebar_position: 3
id: sdk-indicator-calculation
title: Luồng Tính Toán
description: Xử lý tính toán chỉ báo lũy tiến tối ưu hiệu năng
status: published
visibility: public
---

# Luồng Tính Toán

Logic cốt lõi của mọi chỉ báo được triển khai bằng cách ghi đè phương thức `OnCalculate`. Phương thức này được engine gọi liên tục mỗi khi có dữ liệu thị trường mới đến.

Vì `OnCalculate` nằm trên đường truyền xử lý cực nhanh (hot path) của hệ thống, **hiệu năng tính toán và quản lý bộ nhớ là cực kỳ quan trọng**.

## Tính Toán Lũy Tiến (Incremental Calculation)

Bạn **tuyệt đối không được** tính toán lại toàn bộ lịch sử giá trên mỗi tick. Thay vào đó, chỉ báo bắt buộc phải tính toán lũy tiến. Engine cung cấp hai tham số quan trọng giúp bạn xác định phần dữ liệu cần tính:
- `ratesTotal`: Tổng số nến hiện có.
- `prevCalculated`: Số lượng nến bạn đã xử lý thành công trong lần gọi trước đó.

```csharp
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
    // Nếu không đủ dữ liệu cho chu kỳ tính, dừng sớm
    if (_period <= 0 || ratesTotal <= _period)
        return 0;

    // Tính toán chỉ số bắt đầu
    // Chúng ta trừ 1 vì cây nến cuối cùng (prevCalculated - 1) có thể vẫn đang mở và liên tục cập nhật giá
    int start = Math.Max(prevCalculated - 1, _period);

    // Vòng lặp tiến về phía trước qua đoạn dữ liệu chưa tính
    for (int i = start; i < ratesTotal; i++)
    {
        // ... logic tính toán ...
    }

    // Báo cho engine biết chúng ta đã tính toán thành công đến điểm này
    return ratesTotal;
}
```

## Trích Xuất Giá Trị Nguồn (GetSourceValue)

Chỉ báo có thể áp dụng vào các loại giá khác nhau (Close, Open, High, Low). Bạn nên sử dụng phương thức trợ giúp `GetSourceValue` do `CalcIndBase` cung cấp để xử lý tự động. Phương thức này tự động lấy giá trị kiểu double chính xác dựa trên cài đặt `IndicatorConfig.AppliedPrice` của người dùng.

```csharp
for (int i = start; i < ratesTotal; i++)
{
    // Lấy giá tại chỉ số hiện tại
    IndicatorValue currentPrice = GetSourceValue(
        bufferIndex: 0, 
        barIndex: i, 
        time: datetime[i], 
        opens, highs, lows, closes);
        
    // Lấy giá tại chỉ số N chu kỳ trước đó
    IndicatorValue historicalPrice = GetSourceValue(
        bufferIndex: 0, 
        barIndex: i - _period, 
        time: datetime[i - _period], 
        opens, highs, lows, closes);

    // Nếu dữ liệu bị thiếu hoặc rỗng, đánh dấu buffer là rỗng một cách tường minh
    if (currentPrice.IsEmpty || historicalPrice.IsEmpty)
    {
        _rocBuffer.MarkEmpty(i, datetime[i]);
        continue;
    }

    // Thực hiện phép tính toán học
    double roc = historicalPrice.Value != 0
        ? ((currentPrice.Value - historicalPrice.Value) / historicalPrice.Value) * 100
        : 0;

    // Lưu kết quả vào buffer
    _rocBuffer.ForceAdd(i, datetime[i], roc);
}
```

## API Truy Xuất Công Khai Cho Chiến Lược

Để các thành phần khác (như Strategy Bots) có thể sử dụng chỉ báo tùy chỉnh của bạn, bạn nên triển khai các phương thức truy xuất công khai.

```csharp
// Tiện ích lấy giá trị an toàn
public IndicatorValue FindROC(int index = 0)
{
    return _rocBuffer!.FindAtOrBeforeCurrent(index);
}

// Phương thức ngữ nghĩa hỗ trợ Chiến lược đọc tín hiệu nhanh
public bool IsBullish()
{
    var v = FindROC();
    return !v.IsEmpty && v.Value > 0;
}

public bool IsBearish()
{
    var v = FindROC();
    return !v.IsEmpty && v.Value < 0;
}
```

## Thực Hành Tốt Nhất (Best Practices)

> [!WARNING]
> **Không bao giờ dùng biến static hoặc trạng thái mutable dùng chung** trong lớp chỉ báo. Mỗi instance chỉ báo phải hoàn toàn độc lập, vì người dùng có thể gắn nhiều bản sao của cùng một chỉ báo với các chu kỳ khác nhau lên cùng một biểu đồ.

> [!CAUTION]
> **Tránh cấp phát bộ nhớ (allocation) trong `OnCalculate`**. Không khởi tạo `new List<T>()` hay `new object()` bên trong vòng lặp. Phương thức này được gọi hàng ngàn lần mỗi giây trong điều kiện thị trường biến động mạnh. Hãy dựa hoàn toàn vào các mảng nguyên thủy đã được cấp phát sẵn.

> [!TIP]
> **Sử dụng `MarkEmpty`**. Nếu một chỉ báo không thể tính giá trị cho một cây nến cụ thể (ví dụ: đường trung bình động trên cây nến đầu tiên), hãy gọi tường minh `_buffer.MarkEmpty(...)`. KHÔNG gán giá trị `0`, vì `0` sẽ được vẽ trực quan lên biểu đồ và làm sai lệch tỷ lệ thang đo giá.

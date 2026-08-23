import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

function HeroSection({ isVi }) {
  return (
    <section className={styles.heroSection}>
      <div className={clsx(styles.container, styles.heroContainer)}>
        <div className={styles.heroLeft}>
          <span className={styles.heroBadge}>
            {isVi ? 'Bản Thử Nghiệm • v0.12.0-beta.1' : 'Public Beta • v0.12.0-beta.1'}
          </span>
          <h1 className={styles.heroTitle}>
            {isVi 
              ? 'Xây Dựng Plugin Giao Dịch Chuyên Nghiệp Với .NET' 
              : 'Build Professional Trading Plugins with .NET'}
          </h1>
          <p className={styles.heroSubtitle}>
            {isVi
              ? 'Phát triển chiến lược, chỉ báo kỹ thuật và kết nối tùy chỉnh cho Platinum Trade bằng bộ SDK chính thức.'
              : 'Develop custom strategies, indicators and integrations for Platinum Trade using the official SDK.'}
          </p>
          <div className={styles.heroButtons}>
            <Link className={styles.btnPrimary} to="/docs/getting-started/getting-started-overview">
              {isVi ? 'Bắt Đầu Nhanh' : 'Get Started'}
            </Link>
            <Link className={styles.btnSecondary} to="/docs/getting-started/getting-started-quickstart">
              {isVi ? 'Tải Ứng Dụng' : 'Download App'}
            </Link>
          </div>
        </div>
        
        <div className={styles.heroRight}>
          <div className={styles.diagContainer}>
            <div className={styles.diagLabel} style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              {isVi ? 'Quy Trình Phát Triển SDK' : 'SDK Developer Flow'}
            </div>
            <div className={clsx(styles.diagNode, styles.diagNodeHighlight)}>
              {isVi ? 'Nhà Phát Triển' : 'Developer'}
            </div>
            <div className={styles.diagArrow}>│</div>
            <div className={styles.diagNode}>
              Platinum Trade SDK
            </div>
            <div className={styles.diagArrow}>
              <span style={{ fontSize: '0.75rem', marginRight: '4px' }}>{isVi ? 'Biên dịch' : 'Build'}</span>
              ▼
            </div>
            <div className={clsx(styles.diagNode, styles.diagNodeHighlight)}>
              Strategy.dll
            </div>
            <div className={styles.diagArrow}>│</div>
            <div className={styles.diagNode}>
              {isVi ? 'Ứng Dụng Platinum Trade' : 'Platinum Trade App'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickStartSection({ isVi }) {
  const [activeStep, setActiveStep] = useState(1);
  
  const stepsEn = [
    {
      id: 1,
      title: '1. Install Platinum Trade',
      desc: 'Download the application and make sure you have the .NET 10 Runtime installed on your computer.',
      code: '# Download app package & verify runtime\ndotnet --version # Ensure .NET 10+ is installed',
    },
    {
      id: 2,
      title: '2. Create a Plugin',
      desc: 'Initialize a standard C# Class Library project targeting .NET 10.0 and add a reference to Pt.Okx.Sdk.',
      code: 'dotnet new classlib -n MyStrategy -f net10.0\ndotnet add reference Pt.Okx.Sdk.csproj',
    },
    {
      id: 3,
      title: '3. Build',
      desc: 'Write your strategy code inheriting from StrategyBase, then compile the project to generate the assembly.',
      code: 'dotnet build -c Release',
    },
    {
      id: 4,
      title: '4. Load Plugin',
      desc: 'Import the DLL directly via the GUI\'s "Load Plugin" button (which accepts DLLs from any folder), or manually copy it to the Plugins directory.',
      code: 'copy bin\\Release\\net10.0\\MyStrategy.dll %LocalAppData%\\PlatinumTrade\\Plugins\\Strategies\\',
    },
    {
      id: 5,
      title: '5. Run',
      desc: 'Launch Platinum Trade. The system detects and loads the new plugin, ready for backtesting or live execution.',
      code: '# Run CLI Bot or Launch the desktop GUI\ndotnet run --project Pt.Okx.Bot',
    },
  ];

  const stepsVi = [
    {
      id: 1,
      title: '1. Cài Đặt Platinum Trade',
      desc: 'Tải ứng dụng và đảm bảo máy tính của bạn đã cài đặt môi trường .NET 10 Runtime.',
      code: '# Tải gói cài đặt & kiểm tra runtime\ndotnet --version # Đảm bảo đã cài đặt .NET 10+',
    },
    {
      id: 2,
      title: '2. Tạo Dự Án Plugin',
      desc: 'Khởi tạo dự án C# Class Library nhắm mục tiêu .NET 10.0 và thêm tham chiếu tới Pt.Okx.Sdk.',
      code: 'dotnet new classlib -n MyStrategy -f net10.0\ndotnet add reference Pt.Okx.Sdk.csproj',
    },
    {
      id: 3,
      title: '3. Viết Mã & Biên Dịch',
      desc: 'Viết mã chiến lược kế thừa từ StrategyBase, sau đó biên dịch dự án để tạo thư viện assembly DLL.',
      code: 'dotnet build -c Release',
    },
    {
      id: 4,
      title: '4. Nạp Plugin',
      desc: 'Nạp trực tiếp DLL qua nút "Nạp Plugin" trên giao diện GUI (từ bất kỳ thư mục nào), hoặc sao chép vào thư mục Plugins.',
      code: 'copy bin\\Release\\net10.0\\MyStrategy.dll %LocalAppData%\\PlatinumTrade\\Plugins\\Strategies\\',
    },
    {
      id: 5,
      title: '5. Vận Hành',
      desc: 'Khởi chạy Platinum Trade. Hệ thống tự động nhận diện và nạp plugin, sẵn sàng cho backtest hoặc live trade.',
      code: '# Chạy Bot CLI hoặc Khởi chạy ứng dụng GUI desktop\ndotnet run --project Pt.Okx.Bot',
    },
  ];

  const steps = isVi ? stepsVi : stepsEn;

  return (
    <section className={clsx(styles.section, styles.quickstartSection)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {isVi ? 'Bắt Đầu Nhanh' : 'Quick Start'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isVi 
              ? 'Khởi đầu từ thiết lập dự án đến thực thi chiến lược tùy chỉnh trên Platinum Trade chỉ với 5 bước đơn giản.'
              : 'Go from setup to executing custom strategies on Platinum Trade in five easy steps.'}
          </p>
        </div>

        {/* Horizontal stepper flow diagram */}
        <div className={styles.stepFlow}>
          {steps.map((s, idx) => (
            <React.Fragment key={s.id}>
              <div 
                className={clsx(styles.flowItem, activeStep === s.id && styles.flowItemActive)}
                onClick={() => setActiveStep(s.id)}
                style={{ cursor: 'pointer' }}
              >
                {isVi ? `Bước ${s.id}` : `Step ${s.id}`}
              </div>
              {idx < steps.length - 1 && <span className={styles.flowArrow}>→</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Steps Grid details */}
        <div className={styles.stepsGrid}>
          {steps.map((s) => (
            <div 
              key={s.id} 
              className={clsx(styles.stepCard, activeStep === s.id && styles.stepCardActive)}
              onClick={() => setActiveStep(s.id)}
            >
              <div className={styles.stepNumber}>{s.id}</div>
              <h3 className={styles.stepTitle}>{s.title.split('. ')[1]}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
              {activeStep === s.id && (
                <pre className={styles.stepCode}>
                  <code>{s.code}</code>
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BuildCapabilities({ isVi }) {
  const cardsEn = [
    {
      title: 'Strategy Plugins',
      desc: 'Build fully automated trading strategies using event-driven tick data, order execution, position tracking, and risk controls.',
      icon: '📈',
    },
    {
      title: 'Indicator Plugins',
      desc: 'Create custom technical indicators, mathematical models, and oscillators that render cleanly directly onto charts in real-time.',
      icon: '📊',
    },
    {
      title: 'Exchange Integrations',
      desc: 'Implement adapters for new cryptocurrency or traditional finance exchange APIs using our extensible connectivity abstraction layer.',
      icon: '🔌',
    },
  ];

  const cardsVi = [
    {
      title: 'Plugin Chiến Lược',
      desc: 'Xây dựng các chiến lược giao dịch tự động hoàn chỉnh dựa trên dữ liệu tick, khớp lệnh, quản lý vị thế và kiểm soát rủi ro.',
      icon: '📈',
    },
    {
      title: 'Plugin Chỉ Báo',
      desc: 'Tạo các chỉ báo kỹ thuật, mô hình toán học và bộ dao động tùy chỉnh hiển thị mượt mà trực tiếp trên biểu đồ theo thời gian thực.',
      icon: '📊',
    },
    {
      title: 'Tích Hợp Sàn Giao Dịch',
      desc: 'Phát triển adapter kết nối các sàn tiền điện tử hoặc tài chính truyền thống mới nhờ tầng trừu tượng kết nối mở rộng.',
      icon: '🔌',
    },
  ];

  const cards = isVi ? cardsVi : cardsEn;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {isVi ? 'Bạn có thể xây dựng những gì?' : 'What can you build?'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isVi 
              ? 'Khai phóng sức mạnh của SDK và kiến trúc module để xây dựng các hệ thống giao dịch hiệu năng cao.'
              : 'Unlock the power of our SDK wrapper and modular app design to build high-performance systems.'}
          </p>
        </div>

        <div className={styles.cardGrid}>
          {cards.map((c, idx) => (
            <div key={idx} className={styles.card}>
              <div className={styles.cardIcon}>{c.icon}</div>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardDesc}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DocumentationDirectory({ isVi }) {
  const linksEn = [
    {
      title: 'Getting Started',
      desc: 'Learn application setup, keys configuration & basic concepts.',
      to: '/docs/getting-started/getting-started-overview',
      icon: '🚀',
      highlight: false,
    },
    {
      title: 'Architecture',
      desc: 'Understand assemblies, data streams, and dependency layouts.',
      to: '/docs/sdk/sdk-architecture',
      icon: '🏗️',
      highlight: false,
    },
    {
      title: 'Tutorials',
      desc: 'Step-by-step guides to write plugins and compile SDK solutions.',
      to: '/docs/sdk/guides/sdk-getting-started',
      icon: '📖',
      highlight: false,
    },
    {
      title: 'Examples',
      desc: 'Reference source code for sample indicators and strategies.',
      to: '/docs/sdk/sdk-intro',
      icon: '💡',
      highlight: false,
    },
    {
      title: 'API Reference',
      desc: 'Browse code types, properties, namespaces & method declarations.',
      to: '/api-reference',
      icon: '⚡',
      highlight: true,
    },
  ];

  const linksVi = [
    {
      title: 'Bắt Đầu Nhanh',
      desc: 'Tìm hiểu cách cài đặt ứng dụng, cấu hình khóa API và các khái niệm cơ bản.',
      to: '/docs/getting-started/getting-started-overview',
      icon: '🚀',
      highlight: false,
    },
    {
      title: 'Kiến Trúc Tổng Quan',
      desc: 'Hiểu rõ cấu trúc assembly, luồng dữ liệu và sơ đồ phụ thuộc hệ thống.',
      to: '/docs/sdk/sdk-architecture',
      icon: '🏗️',
      highlight: false,
    },
    {
      title: 'Hướng Dẫn Thực Hành',
      desc: 'Hướng dẫn từng bước để viết plugin và biên dịch giải pháp SDK hoàn chỉnh.',
      to: '/docs/sdk/guides/sdk-getting-started',
      icon: '📖',
      highlight: false,
    },
    {
      title: 'Ví Dụ Mẫu',
      desc: 'Mã nguồn tham khảo cho các chỉ báo kỹ thuật và chiến lược giao dịch mẫu.',
      to: '/docs/sdk/sdk-intro',
      icon: '💡',
      highlight: false,
    },
    {
      title: 'Tham Chiếu API',
      desc: 'Tra cứu các kiểu dữ liệu, thuộc tính, namespace và khai báo phương thức.',
      to: '/api-reference',
      icon: '⚡',
      highlight: true,
    },
  ];

  const links = isVi ? linksVi : linksEn;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {isVi ? 'Tài Liệu Hướng Dẫn' : 'Documentation'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isVi 
              ? 'Khám phá các tài liệu hướng dẫn, sổ tay thực hành và danh mục API được cấu trúc rõ ràng để tra cứu tức thì.'
              : 'Browse our carefully structured guides, manuals, and API lists to find details immediately.'}
          </p>
        </div>

        <div className={styles.docGrid}>
          {links.map((l, idx) => (
            <Link 
              key={idx} 
              to={l.to} 
              className={clsx(styles.docCard, l.highlight && styles.docCardHighlight)}
            >
              <div className={styles.docCardIcon}>{l.icon}</div>
              <h4 className={styles.docCardTitle}>{l.title}</h4>
              <p className={styles.docCardDesc}>{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CodeExampleSection({ isVi }) {
  const codeString = `public class MyStrategy : StrategyBase
{
    public override Task OnTickAsync(TickEventArgs e)
    {
        // Custom logic triggered on every market tick
        if (e.LastPrice > CurrentMovingAverage)
        {
            return PlaceOrderAsync(
                OrderSide.Buy, 
                OrderType.Market, 
                quantity: 0.1m
            );
        }
        return Task.CompletedTask;
    }
}`;

  return (
    <section className={clsx(styles.section, styles.codeSection)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {isVi ? 'Ví Dụ Mã Nguồn' : 'Code Example'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isVi
              ? 'Hệ thống API C# thân thiện với nhà phát triển, thiết kế cho tốc độ cao, xử lý bất đồng bộ (async) và an toàn kiểu dữ liệu.'
              : 'Developer friendly C# API contracts designed for speed, async efficiency, and type safety.'}
          </p>
        </div>

        <div className={styles.codeGrid}>
          <div className={styles.codeContainer}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <div className={styles.codeDot} style={{ background: '#f38ba8' }}></div>
                <div className={styles.codeDot} style={{ background: '#f9e2af' }}></div>
                <div className={styles.codeDot} style={{ background: '#a6e3a1' }}></div>
              </div>
              <span className={styles.codeTitle}>MyStrategy.cs</span>
            </div>
            <pre className={styles.codeBody}>
              <code>{codeString}</code>
            </pre>
          </div>

          <div className={styles.pipelineContainer}>
            <div className={styles.diagLabel} style={{ textAlign: 'center', marginBottom: '1rem' }}>
              {isVi ? 'Quy Trình Biên Dịch & Nạp' : 'Compile & Load Pipeline'}
            </div>
            
            <div className={styles.pipelineNode}>
              <div className={styles.pipelineNodeTitle}>
                {isVi ? 'Biên Dịch' : 'Build'}
              </div>
              <div className={styles.pipelineNodeDesc}>
                {isVi ? 'Biên dịch dự án chiến lược C# bằng công cụ dotnet CLI.' : 'Compile C# strategy project using dotnet CLI.'}
              </div>
            </div>

            <div className={styles.pipelineFlowArrow}>
              <span>↓</span>
              <div className={styles.pipelineConnector}></div>
            </div>

            <div className={clsx(styles.pipelineNode, styles.pipelineNodeHighlight)}>
              <div className={styles.pipelineNodeTitle}>MyStrategy.dll</div>
              <div className={styles.pipelineNodeDesc}>
                {isVi ? 'Thư viện DLL kết quả sau khi biên dịch.' : 'Resulting portable compiled library.'}
              </div>
            </div>

            <div className={styles.pipelineFlowArrow}>
              <span>↓</span>
              <div className={styles.pipelineConnector}></div>
            </div>

            <div className={styles.pipelineNode}>
              <div className={styles.pipelineNodeTitle}>
                {isVi ? 'Nạp Plugin' : 'Load Plugin'}
              </div>
              <div className={styles.pipelineNodeDesc}>
                {isVi ? 'Nạp DLL qua giao diện GUI hoặc đặt vào thư mục Plugins để tự động nhận diện.' : 'Import DLL via GUI or place in Plugins folder to auto-mount.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SdkFeatures({ isVi }) {
  const featuresEn = [
    { title: 'Plugin-based architecture', desc: 'Plug & play modular setup. Auto discover plugins at runtime.' },
    { title: 'Event-driven design', desc: 'Handle order execution, order books, and price feeds instantly.' },
    { title: 'High performance', desc: 'Optimized loop with minimal memory allocations built on .NET 10.' },
    { title: 'Async API', desc: 'Async/await interfaces keep threads free and applications responsive.' },
    { title: 'Backtesting support', desc: 'Simulate strategies against historical millisecond binary candle data.' },
    { title: 'Multi Exchange Support', desc: 'Abstracted architecture designed to support OKX and other networks.' },
    { title: 'Open Source', desc: 'Fully transparent and extensible contracts library for clean development.' },
    { title: 'Type Safe Contracts', desc: 'Compile-time type checking over trade signals, orders, and clients.' },
  ];

  const featuresVi = [
    { title: 'Kiến trúc dạng Plugin', desc: 'Cơ chế Plug & Play linh hoạt. Tự động phát hiện và nạp plugin tại thời điểm chạy.' },
    { title: 'Thiết kế Hướng sự kiện', desc: 'Xử lý lệnh khớp, cập nhật sổ lệnh và luồng dữ liệu giá thị trường tức thì.' },
    { title: 'Hiệu năng Vượt trội', desc: 'Vòng lặp tối ưu hóa với việc cấp phát bộ nhớ cực thấp trên nền tảng .NET 10.' },
    { title: 'API Bất đồng bộ (Async)', desc: 'Giao diện async/await giữ luồng luôn thông suốt và ứng dụng phản hồi mượt mà.' },
    { title: 'Hỗ trợ Backtest toàn diện', desc: 'Mô phỏng chiến lược với dữ liệu nến lịch sử nhị phân chính xác đến từng mili-giây.' },
    { title: 'Hỗ trợ Đa sàn giao dịch', desc: 'Kiến trúc trừu tượng hóa sẵn sàng cho OKX và các mạng lưới sàn giao dịch khác.' },
    { title: 'Mã nguồn Mở & Minh bạch', desc: 'Bộ hợp đồng thư viện hoàn toàn mở và dễ mở rộng cho việc phát triển sạch.' },
    { title: 'An toàn Kiểu dữ liệu', desc: 'Kiểm tra kiểu dữ liệu tại thời điểm biên dịch đối với tín hiệu, lệnh và client.' },
  ];

  const features = isVi ? featuresVi : featuresEn;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {isVi ? 'Tính Năng Nổi Bật Của SDK' : 'SDK Features'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isVi 
              ? 'Thư viện cốt lõi cung cấp các hook hiệu năng cao được thiết kế chuyên biệt cho giải pháp giao dịch chuyên nghiệp.'
              : 'Our core library provides high-performance hooks designed for professional trading solutions.'}
          </p>
        </div>

        <div className={styles.featuresGrid}>
          {features.map((f, idx) => (
            <div key={idx} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>
                <span className={styles.featureBullet}>✓</span>
                {f.title}
              </h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EcosystemSection({ isVi }) {
  return (
    <section className={clsx(styles.section, styles.ecoSection)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {isVi ? 'Hệ Sinh Thái' : 'Ecosystem'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isVi 
              ? 'Khám phá cách các thành phần liên kết chặt chẽ để vận hành hệ thống giao dịch từ cấu hình đến thực thi.'
              : 'Discover how components connect to power automated trading from configuration to execution.'}
          </p>
        </div>

        <div className={styles.ecoFlow}>
          <div className={styles.ecoNode}>
            <div className={styles.ecoNodeTitle}>
              {isVi ? 'Ứng Dụng Platinum Trade' : 'Platinum Trade App'}
            </div>
            <div className={styles.ecoNodeDesc}>
              {isVi ? 'Lõi động cơ giao dịch chính và bảng điều khiển GUI.' : 'The core trading software engine and GUI dashboard.'}
            </div>
          </div>
          
          <div className={styles.ecoArrow}>→</div>

          <div className={styles.ecoNode} style={{ borderColor: 'var(--ifm-color-primary)' }}>
            <div className={styles.ecoNodeTitle} style={{ color: 'var(--ifm-color-primary)' }}>
              {isVi ? 'SDK Chính Thức' : 'Official SDK'}
            </div>
            <div className={styles.ecoNodeDesc}>
              {isVi ? 'Hợp đồng kiểu, wrapper API & các giao diện interface.' : 'Type contracts, API wrappers & interfaces.'}
            </div>
          </div>

          <div className={styles.ecoArrow}>→</div>

          <div className={styles.ecoNode}>
            <div className={styles.ecoNodeTitle}>
              {isVi ? 'Plugin Tùy Chỉnh' : 'Custom Plugins'}
            </div>
            <div className={styles.ecoNodeDesc}>
              {isVi ? 'Các tệp chiến lược, chỉ báo và tích hợp của bạn.' : 'Your strategy files, indicators, and integrations.'}
            </div>
          </div>

          <div className={styles.ecoArrow}>→</div>

          <div className={styles.ecoNode}>
            <div className={styles.ecoNodeTitle}>
              {isVi ? 'Tài Liệu' : 'Documentation'}
            </div>
            <div className={styles.ecoNodeDesc}>
              {isVi ? 'Tài liệu hướng dẫn, cài đặt và đặc tả API.' : 'Reference guides, setups, and API descriptions.'}
            </div>
          </div>

          <div className={styles.ecoArrow}>→</div>

          <div className={styles.ecoNode}>
            <div className={styles.ecoNodeTitle}>
              {isVi ? 'Cộng Đồng' : 'Community'}
            </div>
            <div className={styles.ecoNodeDesc}>
              {isVi ? 'Thảo luận mở trên GitHub, đóng góp ý kiến và lộ trình.' : 'GitHub open discussions, tickets, and roadmap.'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection({ isVi }) {
  const linksEn = [
    {
      title: 'GitHub Repository',
      desc: 'Browse full SDK source, open pull requests, and contribute to the platform.',
      to: 'https://github.com/vntradesoft/PlatinumTrade.Sdk',
      icon: '💻',
    },
    {
      title: 'Discord Server',
      desc: 'Chat with other SDK developers, get support, and share custom indicators.',
      to: 'https://discord.gg/platinumtrade',
      icon: '💬',
    },
    {
      title: 'Issues & Tickets',
      desc: 'Report platform bugs, request features, or check on current bug fixes.',
      to: 'https://github.com/vntradesoft/PlatinumTrade.App/issues',
      icon: '🛠️',
    },
    {
      title: 'Project Roadmap',
      desc: 'Follow current milestones, feature releases, and upcoming exchange integration plans.',
      to: 'https://github.com/vntradesoft/PlatinumTrade.App/projects',
      icon: '🗺️',
    },
  ];

  const linksVi = [
    {
      title: 'Kho Mã Nguồn GitHub',
      desc: 'Duyệt toàn bộ mã nguồn SDK, tạo Pull Request và đóng góp cho nền tảng.',
      to: 'https://github.com/vntradesoft/PlatinumTrade.Sdk',
      icon: '💻',
    },
    {
      title: 'Máy Chủ Discord',
      desc: 'Trò chuyện cùng các nhà phát triển SDK, nhận hỗ trợ và chia sẻ chỉ báo tùy chỉnh.',
      to: 'https://discord.gg/platinumtrade',
      icon: '💬',
    },
    {
      title: 'Báo Cáo Sự Cố & Yêu Cầu',
      desc: 'Báo lỗi nền tảng, đề xuất tính năng mới hoặc theo dõi tiến độ sửa lỗi.',
      to: 'https://github.com/vntradesoft/PlatinumTrade.App/issues',
      icon: '🛠️',
    },
    {
      title: 'Lộ Trình Dự Án (Roadmap)',
      desc: 'Theo dõi các cột mốc hiện tại, các bản phát hành và kế hoạch tích hợp sàn tiếp theo.',
      to: 'https://github.com/vntradesoft/PlatinumTrade.App/projects',
      icon: '🗺️',
    },
  ];

  const links = isVi ? linksVi : linksEn;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            {isVi ? 'Cộng Đồng & Hỗ Trợ' : 'Community Support'}
          </h2>
          <p className={styles.sectionSubtitle}>
            {isVi 
              ? 'Tham gia mạng lưới nhà phát triển mở, chia sẻ plugin tùy chỉnh và cùng xây dựng tương lai Platinum Trade.'
              : 'Join our open developer network, share custom plugins, and shape the future of Platinum Trade.'}
          </p>
        </div>

        <div className={styles.commGrid}>
          {links.map((l, idx) => (
            <Link key={idx} to={l.to} className={styles.commCard}>
              <div className={styles.commIcon}>{l.icon}</div>
              <h3 className={styles.commTitle}>{l.title}</h3>
              <p className={styles.commDesc}>{l.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig, i18n } = useDocusaurusContext();
  const isVi = i18n?.currentLocale === 'vi';

  return (
    <Layout
      title={isVi ? `Cổng Thông Tin Nhà Phát Triển | ${siteConfig.title}` : `Developer Portal | ${siteConfig.title}`}
      description={isVi ? "Xây dựng plugin giao dịch chuyên nghiệp với bộ hợp đồng SDK trên nền tảng .NET 10" : "Professional trading plugins builder with .NET 10 contracts SDK"}
    >
      <main>
        <HeroSection isVi={isVi} />
        <QuickStartSection isVi={isVi} />
        <BuildCapabilities isVi={isVi} />
        <DocumentationDirectory isVi={isVi} />
        <CodeExampleSection isVi={isVi} />
        <SdkFeatures isVi={isVi} />
        <EcosystemSection isVi={isVi} />
        <CommunitySection isVi={isVi} />
      </main>
    </Layout>
  );
}

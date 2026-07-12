import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HeroSection() {
  return (
    <section className={styles.heroSection}>
      <div className={clsx(styles.container, styles.heroContainer)}>
        <div className={styles.heroLeft}>
          <span className={styles.heroBadge}>Public Beta • v0.9.3-beta.3                                                                                           </span>
          <h1 className={styles.heroTitle}>
            Build Professional Trading Plugins with .NET
          </h1>
          <p className={styles.heroSubtitle}>
            Develop custom strategies, indicators and integrations for Platinum Trade using the official SDK.
          </p>
          <div className={styles.heroButtons}>
            <Link className={styles.btnPrimary} to="/docs/getting-started/getting-started-overview">
              Get Started
            </Link>
            <Link className={styles.btnSecondary} to="/docs/getting-started/getting-started-quickstart">
              Download App
            </Link>
          </div>
        </div>
        
        <div className={styles.heroRight}>
          <div className={styles.diagContainer}>
            <div className={styles.diagLabel} style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              SDK Developer Flow
            </div>
            <div className={clsx(styles.diagNode, styles.diagNodeHighlight)}>
              Developer
            </div>
            <div className={styles.diagArrow}>│</div>
            <div className={styles.diagNode}>
              Platinum Trade SDK
            </div>
            <div className={styles.diagArrow}>
              <span style={{ fontSize: '0.75rem', marginRight: '4px' }}>Build</span>
              ▼
            </div>
            <div className={clsx(styles.diagNode, styles.diagNodeHighlight)}>
              Strategy.dll
            </div>
            <div className={styles.diagArrow}>│</div>
            <div className={styles.diagNode}>
              Platinum Trade App
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickStartSection() {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
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

  return (
    <section className={clsx(styles.section, styles.quickstartSection)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Quick Start</h2>
          <p className={styles.sectionSubtitle}>
            Go from setup to executing custom strategies on Platinum Trade in five easy steps.
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
                Step {s.id}
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

function BuildCapabilities() {
  const cards = [
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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What can you build?</h2>
          <p className={styles.sectionSubtitle}>
            Unlock the power of our SDK wrapper and modular app design to build high-performance systems.
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

function DocumentationDirectory() {
  const links = [
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
      to: '/docs/sdk/sdk-getting-started',
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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Documentation</h2>
          <p className={styles.sectionSubtitle}>
            Browse our carefully structured guides, manuals, and API lists to find details immediately.
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

function CodeExampleSection() {
  const codeString = `public class MyStrategy : StrategyBase
{
    public override Task OnTick(TickEventArgs e)
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
          <h2 className={styles.sectionTitle}>Code Example</h2>
          <p className={styles.sectionSubtitle}>
            Developer friendly C# API contracts designed for speed, async efficiency, and type safety.
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
              Compile & Load Pipeline
            </div>
            
            <div className={styles.pipelineNode}>
              <div className={styles.pipelineNodeTitle}>Build</div>
              <div className={styles.pipelineNodeDesc}>Compile C# strategy project using dotnet CLI.</div>
            </div>

            <div className={styles.pipelineFlowArrow}>
              <span>↓</span>
              <div className={styles.pipelineConnector}></div>
            </div>

            <div className={clsx(styles.pipelineNode, styles.pipelineNodeHighlight)}>
              <div className={styles.pipelineNodeTitle}>MyStrategy.dll</div>
              <div className={styles.pipelineNodeDesc}>Resulting portable compiled library.</div>
            </div>

            <div className={styles.pipelineFlowArrow}>
              <span>↓</span>
              <div className={styles.pipelineConnector}></div>
            </div>

            <div className={styles.pipelineNode}>
              <div className={styles.pipelineNodeTitle}>Load Plugin</div>
              <div className={styles.pipelineNodeDesc}>Import DLL via GUI or place in Plugins folder to auto-mount.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SdkFeatures() {
  const features = [
    { title: 'Plugin-based architecture', desc: 'Plug & play modular setup. Auto discover plugins at runtime.' },
    { title: 'Event-driven design', desc: 'Handle order execution, order books, and price feeds instantly.' },
    { title: 'High performance', desc: 'Optimized loop with minimal memory allocations built on .NET 10.' },
    { title: 'Async API', desc: 'Async/await interfaces keep threads free and applications responsive.' },
    { title: 'Backtesting support', desc: 'Simulate strategies against historical millisecond binary candle data.' },
    { title: 'Multi Exchange Support', desc: 'Abstracted architecture designed to support OKX and other networks.' },
    { title: 'Open Source', desc: 'Fully transparent and extensible contracts library for clean development.' },
    { title: 'Type Safe Contracts', desc: 'Compile-time type checking over trade signals, orders, and clients.' },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>SDK Features</h2>
          <p className={styles.sectionSubtitle}>
            Our core library provides high-performance hooks designed for professional trading solutions.
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

function EcosystemSection() {
  return (
    <section className={clsx(styles.section, styles.ecoSection)}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Ecosystem</h2>
          <p className={styles.sectionSubtitle}>
            Discover how components connect to power automated trading from configuration to execution.
          </p>
        </div>

        <div className={styles.ecoFlow}>
          <div className={styles.ecoNode}>
            <div className={styles.ecoNodeTitle}>Platinum Trade App</div>
            <div className={styles.ecoNodeDesc}>The core trading software engine and GUI dashboard.</div>
          </div>
          
          <div className={styles.ecoArrow}>→</div>

          <div className={styles.ecoNode} style={{ borderColor: 'var(--ifm-color-primary)' }}>
            <div className={styles.ecoNodeTitle} style={{ color: 'var(--ifm-color-primary)' }}>Official SDK</div>
            <div className={styles.ecoNodeDesc}>Type contracts, API wrappers & interfaces.</div>
          </div>

          <div className={styles.ecoArrow}>→</div>

          <div className={styles.ecoNode}>
            <div className={styles.ecoNodeTitle}>Custom Plugins</div>
            <div className={styles.ecoNodeDesc}>Your strategy files, indicators, and integrations.</div>
          </div>

          <div className={styles.ecoArrow}>→</div>

          <div className={styles.ecoNode}>
            <div className={styles.ecoNodeTitle}>Documentation</div>
            <div className={styles.ecoNodeDesc}>Reference guides, setups, and API descriptions.</div>
          </div>

          <div className={styles.ecoArrow}>→</div>

          <div className={styles.ecoNode}>
            <div className={styles.ecoNodeTitle}>Community</div>
            <div className={styles.ecoNodeDesc}>GitHub open discussions, tickets, and roadmap.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommunitySection() {
  const links = [
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

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Community Support</h2>
          <p className={styles.sectionSubtitle}>
            Join our open developer network, share custom plugins, and shape the future of Platinum Trade.
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
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Developer Portal | ${siteConfig.title}`}
      description="Professional trading plugins builder with .NET 10 contracts SDK"
    >
      <main>
        <HeroSection />
        <QuickStartSection />
        <BuildCapabilities />
        <DocumentationDirectory />
        <CodeExampleSection />
        <SdkFeatures />
        <EcosystemSection />
        <CommunitySection />
      </main>
    </Layout>
  );
}

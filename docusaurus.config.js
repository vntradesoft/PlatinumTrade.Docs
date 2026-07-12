// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'PlatinumTrade Docs',
  tagline: 'Platinum Trading Platform Contracts & SDK Documentation',
  favicon: 'img/logo/Icons/PlatinumTrade.ico',

  future: {
    v4: true,
  },

  // Set the production url of your site here
  url: 'https://vntradesoft.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/PlatinumTrade.Docs/',

  // GitHub pages deployment config.
  organizationName: 'vntradesoft',
  projectName: 'PlatinumTrade.Docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/vntradesoft/PlatinumTrade.App/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: "/docs",
        language: ["en"],
      }),
    ],
    // Custom plugin: serve DocFX static HTML files before the SPA fallback intercepts them
    function staticDocFxPlugin() {
      const path = require('path');
      return {
        name: 'docfx-static-serve',
        configureWebpack() {
          return {
            devServer: {
              setupMiddlewares: (middlewares, devServer) => {
                const express = require('express');
                // Serve DocFX files from static/sdk/api at the /PlatinumTrade.Docs/sdk/api path
                // This runs BEFORE the SPA historyApiFallback, so .html files are served correctly
                devServer.app.use(
                  '/PlatinumTrade.Docs/sdk/api',
                  express.static(path.resolve(__dirname, 'static/sdk/api'), {
                    index: ['index.html'],
                    extensions: ['html'],
                  })
                );
                return middlewares;
              },
            },
          };
        },
      };
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'PlatinumTrade Docs',
        logo: {
          alt: 'PlatinumTrade Logo',
          src: 'img/logo/Icons/logo-light.png',
          srcDark: 'img/logo/Icons/logo-dark.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            to: '/docs/sdk/api-reference',
            label: 'API Reference',
            position: 'left',
          },
          {
            href: 'https://github.com/vntradesoft/PlatinumTrade.Sdk/tree/main/examples',
            label: 'SDK Examples',
            position: 'left',
          },
          {
            href: 'https://github.com/vntradesoft/PlatinumTrade.App',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://discord.gg/platinumtrade',
            label: 'Discord',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/getting-started-overview',
              },
              {
                label: 'API Reference',
                to: '/docs/sdk/api-reference',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/vntradesoft/PlatinumTrade.App',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/platinumtrade',
              },
            ],
          },
          {
            title: 'Ecosystem',
            items: [
              {
                label: 'NuGet',
                href: 'https://www.nuget.org',
              },
              {
                label: 'MIT License',
                href: 'https://github.com/vntradesoft/PlatinumTrade.App/blob/main/LICENSE',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} PlatinumTrade. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

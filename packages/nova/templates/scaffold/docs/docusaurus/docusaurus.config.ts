import type { Config } from '@docusaurus/types';

const config: Config = {
  title: '[__PROJECT_SLUG__]',
  tagline: 'Documentation',
  url: 'https://example.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [[
    '@cbnventures/docusaurus-preset-nova',
    {
      preset: 'foundry',
      colors: {
        primary: '#2563eb',
        accent: '#7c3aed',
        neutral: '#6b7280',
      },
      docs: {
        sidebarPath: './sidebars.ts',
        routeBasePath: 'docs',
      },
    },
  ]],
};

export default config;

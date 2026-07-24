import { NovaIdentity } from '@cbnventures/nova/toolkit';

import type { Config } from '@docusaurus/types';

const identity = new NovaIdentity().forDocs();

const config: Config = {
  title: identity.title ?? 'Documentation',
  tagline: identity.tagline ?? 'Documentation',
  url: identity.url ?? 'https://example.com',
  baseUrl: '/',
  organizationName: identity.organizationName ?? 'your-org',
  projectName: identity.projectName ?? '[__PROJECT_SLUG__]',
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

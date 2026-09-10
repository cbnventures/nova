import { NovaIdentity } from '@cbnventures/nova/toolkit';

import type { DocusaurusNovaConfig } from '@cbnventures/docusaurus-preset-nova/types/config';

const identity = new NovaIdentity().forDocs();

const config: DocusaurusNovaConfig = {
  title: identity.title ?? 'Documentation',
  tagline: identity.tagline ?? 'Documentation',
  url: identity.url ?? 'https://example.com',
  baseUrl: '/',
  organizationName: identity.organizationName ?? 'your-org',
  projectName: identity.projectName ?? '[__PROJECT_SLUG__]',
  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [[
    '@cbnventures/docusaurus-preset-nova',
    {
      preset: '[__DOCUSAURUS_PRESET__]',
      plugins: {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
      },
    },
  ]],
};

export default config;

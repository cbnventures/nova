import { NovaIdentity } from '@cbnventures/nova/toolkit';

import type { DocusaurusNovaConfig } from '@cbnventures/docusaurus-preset-nova/types/config';

/**
 * Docusaurus - Identity.
 *
 * Reads the documentation identity from the generated Nova configuration.
 * Fallbacks keep the site runnable while consumers finish project metadata.
 *
 * @since 0.0.0
 */
const identity = new NovaIdentity().forDocs();

/**
 * Docusaurus - Config.
 *
 * Configures the generated documentation site with Nova's selected preset.
 * Consumers can extend these values through normal Docusaurus configuration.
 *
 * @since 0.0.0
 */
const config: DocusaurusNovaConfig = {
  title: identity['title'] ?? 'Documentation',
  tagline: identity['tagline'] ?? 'Documentation',
  url: identity['url'] ?? 'https://example.com',
  baseUrl: '/',
  organizationName: identity['organizationName'] ?? 'your-org',
  projectName: identity['projectName'] ?? '[__PROJECT_SLUG__]',
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
        blog: [__DOCUSAURUS_CONTENT__],
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
        },
      },
      search: [__DOCUSAURUS_SEARCH__],
    },
  ]],
};

export default config;

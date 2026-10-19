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
  title: 'Nova × Docusaurus',
  tagline: identity['tagline'] ?? 'Documentation',
  url: identity['url'] ?? 'https://www.example.com',
  baseUrl: identity['baseUrl'] ?? '/',
  favicon: 'images/nova.svg',
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
      search: {},
    },
  ]],

  themeConfig: {
    site: {
      logo: {
        alt: 'Nova',
        src: {
          light: '/images/nova.svg',
        },
        href: '/',
      },
    },
    navbar: {
      title: 'Nova × Docusaurus',
      items: [
        {
          label: 'Home',
          position: 'left',
          to: '/',
          icon: 'lucide:house',
        },
        {
          label: 'Documentation',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'docs',
          icon: 'lucide:book-open',
        },
        {
          label: 'Components',
          position: 'left',
          to: '/docs/customize#homepage',
          icon: 'lucide:blocks',
        },
      ],
    },
    footer: {
      sections: {
        learn: [
          {
            label: 'Introduction',
            href: '/docs/intro',
          },
          {
            label: 'Customize the Site',
            href: '/docs/customize',
          },
          {
            label: 'Homepage Components',
            href: '/docs/customize#homepage',
          },
        ],
        resources: [
          {
            label: 'Nova',
            href: 'https://nova.cbnventures.io/',
          },
          {
            label: 'Docusaurus',
            href: 'https://docusaurus.io/',
          },
        ],
      },
      layout: {
        learn: {
          title: 'Learn',
          section: 'learn',
        },
        resources: {
          title: 'Resources',
          section: 'resources',
        },
      },
      socialLinks: [
        {
          icon: 'ri:facebook-fill',
          href: 'https://www.facebook.com/cbnventures',
          label: 'Facebook',
        },
        {
          icon: 'ri:twitter-x-fill',
          href: 'https://x.com/cbnventures',
          label: 'X',
        },
        {
          icon: 'ri:youtube-fill',
          href: 'https://www.youtube.com/@cbnventures',
          label: 'YouTube',
        },
        {
          icon: 'ri:instagram-fill',
          href: 'https://www.instagram.com/cbnventures/',
          label: 'Instagram',
        },
        {
          icon: 'ri:github-fill',
          href: 'https://github.com/cbnventures',
          label: 'GitHub',
        },
        {
          icon: 'ri:google-play-fill',
          href: 'https://play.google.com/store/apps/dev?id=6419450160526226105',
          label: 'Google Play',
        },
        {
          icon: 'ri:linkedin-fill',
          href: 'https://www.linkedin.com/company/cbnventures/',
          label: 'LinkedIn',
        },
      ],
      copyright: identity['copyright'],
      credit: true,
      cta: {
        label: 'Start reading',
        href: '/docs/intro',
      },
    },
  },
};

export default config;

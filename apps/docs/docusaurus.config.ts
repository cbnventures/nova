import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { stripVTControlCharacters } from 'node:util';

import { CLIHeader, NovaIdentity } from '@cbnventures/nova/toolkit';

import type { DocusaurusNovaConfig } from '@cbnventures/docusaurus-preset-nova/types/config';

/**
 * Identity.
 *
 * @since 0.0.0
 */
const identity = new NovaIdentity().forDocs();

/**
 * Nova Package.
 *
 * Reads the Nova CLI's package.json so the homepage terminal views show the
 * version the CLI prints.
 *
 * @since 0.0.0
 */
const novaPackage = JSON.parse(readFileSync(fileURLToPath(new URL('../../packages/nova/package.json', import.meta.url)), 'utf-8'));

/**
 * Nova CLI Header.
 *
 * Renders the same boxed banner the Nova CLI prints at the top of every
 * command and help menu, without colors, for the homepage terminal views.
 *
 * @since 0.0.0
 */
const novaCliHeader = stripVTControlCharacters(CLIHeader.render(
  [
    `Nova v${String(Reflect.get(novaPackage, 'version'))}`,
    'CLI for the Common Developer',
  ],
  {
    align: 'center',
    interactive: true,
    marginBottom: 1,
    marginTop: 0,
    paddingX: 1,
    paddingY: 0,
    style: 'round',
    width: 50,
  },
));

/**
 * Docusaurus Configuration.
 *
 * @since 0.11.0
 */
const config: DocusaurusNovaConfig = {
  // Site Metadata.
  title: identity['title'] ?? '',
  titleDelimiter: '-',
  tagline: identity['tagline'],
  favicon: './favicon.ico',

  // Deployment.
  url: identity['url'] ?? '',
  baseUrl: identity['baseUrl'] ?? '/',
  organizationName: identity['organizationName'],
  projectName: identity['projectName'],
  deploymentBranch: undefined,
  githubHost: undefined,
  githubPort: undefined,
  trailingSlash: true,
  noIndex: false,

  // Error Handling.
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',

  // Static Assets.
  staticDirectories: ['static'],
  baseUrlIssueBanner: true,
  scripts: [],
  stylesheets: [],
  clientModules: [],
  themes: [],

  // Custom Fields.
  customFields: {
    novaCliHeader,
  },

  // Head Tags.
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        property: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `${identity['baseUrl'] ?? '/'}apple-touch-icon.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: `${identity['baseUrl'] ?? '/'}favicon-96x96.png`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `${identity['baseUrl'] ?? '/'}favicon.svg`,
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: `${identity['baseUrl'] ?? '/'}site.webmanifest`,
      },
    },
  ],

  // Internationalization.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
    path: 'i18n',
    localeConfigs: {
      en: {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
    },
  },

  // Markdown.
  markdown: {
    format: 'mdx',
    mermaid: true,
    emoji: true,
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
    anchors: {
      maintainCase: false,
    },
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'throw',
    },
  },

  // Presets (Nova).
  presets: [[
    '@cbnventures/docusaurus-preset-nova',
    {
      // Preset Identity.
      preset: 'foundry',

      // Preset Overrides (undefined = use preset default).
      overrides: {
        colors: {
          primary: {
            light: '#DC2626',
            dark: '#DC2626',
          },
          secondary: {
            light: '#FFBA33',
            dark: '#FFBA33',
          },
          text: undefined,
          border: undefined,
          warning: undefined,
          danger: undefined,
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        navbar: undefined,
        footer: undefined,
      },

      // Plugins.
      plugins: {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/cbnventures/nova/tree/main/apps/docs/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          lastVersion: 'current',
          versions: {
            current: {
              label: 'Current',
              badge: false,
              banner: 'none',
            },
          },
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Blog',
          blogDescription: 'Release notes, tooling insights, and automation patterns for JavaScript and TypeScript monorepos.',
          postsPerPage: 10,
          blogSidebarTitle: 'Recent Posts',
          blogSidebarCount: 15,
          feedOptions: {
            type: [
              'rss',
              'atom',
            ],
            copyright: identity['copyright'],
            limit: 20,
            title: 'Nova Blog',
            description: 'Release notes, tooling insights, and automation patterns for JavaScript and TypeScript monorepos.',
          },
        },
        pages: {
          editUrl: 'https://github.com/cbnventures/nova/tree/main/apps/docs/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/docs/tags/**'],
          filename: 'sitemap.xml',
        },
      },

      // Analytics.
      analytics: {
        googleAnalytics: {
          measurementId: 'G-C45E9B7D4L',
        },
        metaPixel: {
          pixelId: '1133590612756559',
        },
        clarity: {
          projectId: 'zid1vtbaef',
        },
      },

      // Search.
      search: {
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: 'docs',
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcutKeymap: 'mod+k',
        searchResultLimits: 8,
        fuzzyMatchingDistance: 1,
        ignorePatterns: [],
      },

      // Progress Bar.
      progressBar: true,
    },
  ]],

  // Plugins.
  plugins: [],

  // Theme Config.
  themeConfig: {
    // Site.
    site: {
      logo: {
        alt: 'Nova',
        src: {
          light: '/images/navbar.svg',
          dark: undefined,
        },
        href: '/',
        target: undefined,
        rel: undefined,
        ariaLabel: undefined,
        wordmark: {
          light: undefined,
          dark: undefined,
        },
      },
      image: '/thumbnails/brand.png',
      metadata: [
        {
          name: 'description',
          content: identity['metaDescription'] ?? '',
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
      ],
    },

    // Color Mode.
    colorMode: {
      defaultMode: 'system',
      disableSwitch: false,
    },

    // Navbar.
    navbar: {
      hideOnScroll: false,
      items: [
        {
          label: 'Quick Start',
          position: 'left',
          type: undefined,
          to: '/docs/quickstart/',
          icon: 'lucide:rocket',
          activeBaseRegex: '^/docs/(quickstart/|tags/)',
        },
        {
          label: 'Presets',
          position: 'left',
          type: undefined,
          to: '/docs/presets/',
          icon: 'lucide:palette',
          activeBaseRegex: '^/docs/presets/',
        },
        {
          label: 'Rules',
          position: 'left',
          type: undefined,
          to: '/docs/rules/',
          icon: 'lucide:shield-check',
          activeBaseRegex: '^/docs/rules/',
        },
        {
          label: 'Toolkit',
          position: 'left',
          type: undefined,
          to: '/docs/toolkit/',
          icon: 'lucide:wrench',
          activeBaseRegex: '^/docs/toolkit/',
        },
        {
          label: 'Facades',
          position: 'left',
          type: undefined,
          to: '/docs/facades/',
          icon: 'lucide:layers',
          activeBaseRegex: '^/docs/facades/',
        },
        {
          label: 'CLI',
          position: 'left',
          type: undefined,
          to: '/docs/cli/',
          icon: 'lucide:terminal',
          activeBaseRegex: '^/docs/cli/',
        },
        {
          label: 'Blog',
          position: 'left',
          type: undefined,
          to: '/blog/',
          icon: 'lucide:pen-line',
        },
        {
          label: 'Resources',
          position: 'left',
          type: 'dropdown',
          icon: 'lucide:life-buoy',
          items: [
            {
              label: 'Changelog',
              href: 'https://github.com/cbnventures/nova/releases',
              icon: 'lucide:history',
            },
            {
              label: 'Report an Issue',
              href: 'https://github.com/cbnventures/nova/issues',
              icon: 'lucide:bug',
            },
          ],
        },
      ],
    },

    // Docs.
    docs: {
      versionPersistence: 'localStorage',
      sidebar: {
        hideable: false,
        autoCollapseCategories: false,
      },
    },

    // Blog.
    blog: {
      sidebar: {
        groupByYear: true,
      },
      layout: {
        heading: 'Blog',
        description: 'Updates and insights from the Nova team',
      },
      share: {
        platforms: [
          'linkedin',
          'reddit',
          'facebook',
          'x',
          'copy',
        ],
      },
    },

    // Table of Contents.
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },

    // Announcement Bar.
    announcementBar: {
      id: 'nova-preset-theme-2',
      content: 'The Docusaurus preset is now available — six theme presets, one package.',
      backgroundColor: undefined,
      textColor: undefined,
      isCloseable: true,
    },

    // Back to Top Button.
    backToTopButton: true,

    // Error Pages - overrides Nova's randomized defaults with consumer copy.
    // Any unset field falls through to the Nova-flavored randomized pool.
    errorPages: {
      notFound: {
        title: 'This page is not in the workspace.',
        description: 'The link may be out of date, or the page may have moved. Head back to the docs.',
        backHomeLabel: 'Back to the docs',
        backHomeHref: '/docs/quickstart/',
      },
      errorPageContent: {
        title: 'This page could not be loaded.',
        retryLabel: 'Reload the page',
      },
      error: {
        retryLabel: 'Try again',
      },
    },

    // Footer.
    footer: {
      sections: {
        docs: [
          {
            label: 'Overview',
            href: '/docs/quickstart/',
          },
          {
            label: 'Presets',
            href: '/docs/presets/',
          },
          {
            label: 'Rules',
            href: '/docs/rules/',
          },
          {
            label: 'Toolkit',
            href: '/docs/toolkit/',
          },
          {
            label: 'Facades',
            href: '/docs/facades/',
          },
          {
            label: 'CLI',
            href: '/docs/cli/',
          },
        ],
        resources: [
          {
            label: 'Blog',
            href: '/blog/',
          },
          {
            label: 'Changelog',
            href: 'https://github.com/cbnventures/nova/releases',
          },
          {
            label: 'Report an Issue',
            href: 'https://github.com/cbnventures/nova/issues',
          },
          {
            label: 'Source Code',
            href: 'https://github.com/cbnventures/nova',
          },
        ],
        company: [
          {
            label: 'About',
            href: 'https://www.cbnventures.io/',
          },
          {
            label: 'Other Apps',
            href: 'https://www.cbnventures.io/apps/',
          },
          {
            label: 'Open Source',
            href: 'https://www.cbnventures.io/open-source/',
          },
          {
            label: 'Sponsor',
            href: 'https://github.com/sponsors/cbnventures',
          },
          {
            label: 'Get in Touch',
            href: 'https://www.cbnventures.io/get-in-touch/',
          },
        ],
        legal: [
          {
            label: 'Terms of Use',
            href: 'https://www.cbnventures.io/terms/',
          },
          {
            label: 'Privacy Policy',
            href: 'https://www.cbnventures.io/privacy/',
          },
        ],
      },
      layout: {
        docs: {
          title: 'Docs',
          section: 'docs',
        },
        resources: {
          title: 'Resources',
          section: 'resources',
        },
        company: {
          title: 'Company',
          section: 'company',
        },
        legal: {
          title: 'Legal',
          section: 'legal',
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
        label: 'Ready to set up a project?',
        href: '/docs/quickstart/setup/',
      },
    },
  },
};

export default config;

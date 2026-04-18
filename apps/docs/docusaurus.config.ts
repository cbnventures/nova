import { fetchStatItems } from './utils/getters/get-stat-items.js';

import type { DocusaurusNovaConfig } from '@cbnventures/docusaurus-preset-nova/types/config';

/**
 * Docusaurus Configuration.
 *
 * @since 0.11.0
 */
const config: DocusaurusNovaConfig = {
  // Site Metadata.
  title: 'Nova',
  titleDelimiter: ' - ',
  tagline: 'Scripts, templates, and project configuration for the common JavaScript and TypeScript developer',
  favicon: './favicon.ico',

  // Deployment.
  url: 'https://nova.cbnventures.io',
  baseUrl: '/',
  organizationName: 'cbnventures',
  projectName: 'nova',
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
    statItems: fetchStatItems(),
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
        href: '/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        href: '/favicon-96x96.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/site.webmanifest',
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
          primary: '#DC2626',
          accent: '#FFBA33',
          neutral: '#78716C',
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: undefined,
          density: undefined,
        },
        depth: {
          cards: undefined,
          codeBlocks: undefined,
        },
        motion: {
          speed: undefined,
          staggeredReveals: undefined,
          hoverEffects: undefined,
        },
        navbar: undefined,
        footer: undefined,
      },

      // Plugins.
      plugins: {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: undefined,
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
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
            copyright: `Copyright \u00A9 2025-${String(new Date().getFullYear())} CBN Ventures LLC. All Rights Reserved.`,
            limit: 20,
            title: 'Nova Blog',
            description: 'Release notes, tooling insights, and automation patterns for JavaScript and TypeScript monorepos.',
          },
        },
        pages: undefined,
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
        gtm: {
          containerId: 'GTM-KZGTWKXH',
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
      title: 'Nova',
      logo: {
        alt: 'Nova',
        src: '/images/logo.svg',
        srcDark: undefined,
        href: '/',
        wordmark: undefined,
        wordmarkDark: undefined,
        title: 'Nova',
      },
      image: '/thumbnails/brand.png',
      metadata: [
        {
          name: 'description',
          content: 'Scripts, templates, and project configuration for the common JavaScript and TypeScript developer',
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
      title: 'Nova',
      hideOnScroll: false,
      items: [
        {
          label: 'Quickstart',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'quickstart',
          icon: 'lucide:rocket',
        },
        {
          label: 'Presets',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'presets',
          icon: 'lucide:palette',
        },
        {
          label: 'Rules',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'rules',
          icon: 'lucide:shield-check',
        },
        {
          label: 'Toolkit',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'toolkit',
          icon: 'lucide:wrench',
        },
        {
          label: 'Facades',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'facades',
          icon: 'lucide:layers',
        },
        {
          label: 'CLI',
          position: 'left',
          type: 'docSidebar',
          sidebarId: 'cli',
          icon: 'lucide:terminal',
        },
        {
          label: 'Blog',
          position: 'left',
          type: undefined,
          to: '/blog/',
          icon: 'lucide:pen-line',
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
      id: 'nova-preset-theme',
      content: 'The Docusaurus preset is now available — four theme presets, one package.',
      backgroundColor: undefined,
      textColor: undefined,
      isCloseable: true,
    },

    // Back to Top Button.
    backToTopButton: true,

    // Footer.
    footer: {
      sections: {
        highlights: [
          {
            label: 'Agent Conventions',
            href: '/docs/cli/generators/must-haves/agent-conventions/',
          },
          {
            label: 'Workspace Rules',
            href: '/docs/quickstart/workspace-rules/',
          },
          {
            label: 'Monorepo Recipes',
            href: '/docs/category/recipes/',
          },
          {
            label: 'nova.config.json',
            href: '/docs/cli/utilities/initialize/',
          },
        ],
        resources: [
          {
            label: 'Documentation',
            href: '/docs/quickstart/',
          },
          {
            label: 'Blog',
            href: '/blog/',
          },
          {
            label: 'GitHub',
            href: 'https://github.com/cbnventures/nova',
          },
        ],
        connect: [
          {
            label: 'Sponsors',
            href: 'https://github.com/sponsors/cbnventures',
          },
          {
            label: 'Report an Issue',
            href: 'https://github.com/cbnventures/nova/issues',
          },
        ],
        company: [
          {
            label: 'About',
            href: 'https://www.cbnventures.io/',
          },
          {
            label: 'Get In Touch',
            href: 'https://www.cbnventures.io/get-in-touch/',
          },
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
        highlights: {
          title: 'Highlights',
          section: 'highlights',
        },
        resources: {
          title: 'Resources',
          section: 'resources',
        },
        connect: {
          title: 'Connect',
          section: 'connect',
        },
        company: {
          title: 'Company',
          section: 'company',
        },
      },
      socialLinks: [
        {
          icon: 'mdi:facebook',
          href: 'https://www.facebook.com/cbnventures',
          label: 'Facebook',
        },
        {
          icon: 'ri:twitter-x-fill',
          href: 'https://x.com/cbnventures',
          label: 'X',
        },
        {
          icon: 'mdi:youtube',
          href: 'https://www.youtube.com/@cbnventures',
          label: 'YouTube',
        },
        {
          icon: 'mdi:instagram',
          href: 'https://www.instagram.com/cbnventures/',
          label: 'Instagram',
        },
        {
          icon: 'mdi:github',
          href: 'https://github.com/cbnventures',
          label: 'GitHub',
        },
        {
          icon: 'mdi:google-play',
          href: 'https://play.google.com/store/apps/dev?id=6419450160526226105',
          label: 'Google Play',
        },
        {
          icon: 'mdi:linkedin',
          href: 'https://www.linkedin.com/company/cbnventures/',
          label: 'LinkedIn',
        },
      ],
      copyright: `Copyright \u00A9 2025-${String(new Date().getFullYear())} CBN Ventures LLC. All Rights Reserved.`,
      credit: true,
      cta: undefined,
    },
  },
};

export default config;

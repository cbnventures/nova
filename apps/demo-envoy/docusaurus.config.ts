import type { DocusaurusNovaConfig } from '@cbnventures/docusaurus-preset-nova/types/config';

/**
 * Docusaurus Configuration.
 *
 * @since 0.11.0
 */
const config: DocusaurusNovaConfig = {
  // Site Metadata.
  title: 'Envoy',
  titleDelimiter: ' - ',
  tagline: 'Deliver without ceremony.',
  favicon: './favicon.ico',

  // Deployment.
  url: 'https://envoy-demo.nova.cbnventures.io',
  baseUrl: '/',
  organizationName: 'cbnventures',
  projectName: 'demo-envoy',
  deploymentBranch: undefined,
  githubHost: undefined,
  githubPort: undefined,
  trailingSlash: true,
  noIndex: true,

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
  customFields: {},

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
    locales: [
      'en',
      'zh-Hans',
      'ar',
    ],
    path: 'i18n',
    localeConfigs: {
      'en': {
        label: 'English',
        direction: 'ltr',
        htmlLang: 'en-US',
        calendar: 'gregory',
        path: 'en',
      },
      'zh-Hans': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-CN',
        calendar: 'gregory',
        path: 'zh-Hans',
      },
      'ar': {
        label: 'العربية',
        direction: 'rtl',
        htmlLang: 'ar',
        calendar: 'gregory',
        path: 'ar',
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
      preset: 'envoy',

      // Preset Overrides (undefined = use preset default).
      overrides: {
        colors: {
          primary: undefined,
          secondary: undefined,
          text: undefined,
          border: undefined,
          warning: undefined,
          danger: undefined,
        },
        fonts: {
          display: undefined,
          body: undefined,
          code: undefined,
        },
        navbar: undefined,
        footer: undefined,
      },

      // Plugins.
      plugins: {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/cbnventures/nova/tree/main/apps/demo-envoy/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
          lastVersion: 'current',
          versions: {
            'current': {
              label: 'Current',
              badge: false,
              banner: 'none',
            },
            '1.0.0': {
              label: '1.0.0',
              badge: true,
              banner: 'unmaintained',
            },
          },
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Blog',
          blogDescription: 'Release notes, integration deep dives, and the occasional dispatch from the relay room.',
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
            title: 'Envoy Blog',
            description: 'Release notes, integration deep dives, and the occasional dispatch from the relay room.',
          },
        },
        pages: {
          editUrl: 'https://github.com/cbnventures/nova/tree/main/apps/demo-envoy/',
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
        gtm: undefined,
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
        alt: undefined,
        src: {
          light: '/images/logo.svg',
          dark: undefined,
        },
        href: undefined,
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
          content: 'Theme preset demo for @cbnventures/docusaurus-preset-nova.',
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
          label: 'Docs',
          position: 'left',
          type: 'doc',
          docId: 'overview',
          icon: 'lucide:book-open',
        },
        {
          label: 'Showcase',
          position: 'left',
          type: undefined,
          to: '/showcase/',
          icon: 'lucide:layout-grid',
        },
        {
          label: 'Integrations',
          position: 'left',
          type: undefined,
          to: '/docs/advanced/integrations/',
          icon: 'lucide:plug',
        },
        {
          label: 'Blog',
          position: 'left',
          type: undefined,
          to: '/blog/',
          icon: 'lucide:pen-line',
        },
        {
          label: 'Manifesto',
          position: 'left',
          type: undefined,
          to: '/manifesto',
          icon: 'lucide:scroll-text',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          label: 'GitHub',
          position: 'right',
          type: undefined,
          href: 'https://github.com/cbnventures/nova',
          icon: 'lucide:github',
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
        description: 'Release notes and integration deep dives',
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
      id: 'envoy-failover-2',
      content: 'Multi-region failover is now shipping.',
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
        title: 'Lost in deployment.',
        description: 'This route did not roll out \u2014 head back to your projects.',
        backHomeLabel: 'Back to projects',
        backHomeHref: undefined,
      },
      errorPageContent: {
        title: 'Delivery failed on this page.',
        retryLabel: 'Redeliver the page',
      },
      error: {
        retryLabel: 'Retry the delivery',
      },
    },

    // Footer.
    footer: {
      sections: {
        envoy: [
          {
            label: 'Getting Started',
            href: '/docs/overview/',
          },
          {
            label: 'Installation',
            href: '/docs/setup/installation/',
          },
          {
            label: 'API Reference',
            href: '/docs/reference/api-reference/',
          },
        ],
        integrations: [
          {
            label: 'Threadbare',
            href: 'https://nova.cbnventures.io',
          },
          {
            label: 'Glassboard',
            href: 'https://nova.cbnventures.io',
          },
          {
            label: 'Canary',
            href: 'https://nova.cbnventures.io',
          },
        ],
        company: [
          {
            label: 'About',
            href: 'https://nova.cbnventures.io',
          },
          {
            label: 'Careers',
            href: 'https://nova.cbnventures.io',
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
          {
            label: 'Get In Touch',
            href: 'https://www.cbnventures.io/get-in-touch/',
          },
        ],
      },
      layout: {
        envoy: {
          title: 'Envoy',
          section: 'envoy',
        },
        integrations: {
          title: 'Integrations',
          section: 'integrations',
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
      copyright: `Copyright \u00A9 2025-${String(new Date().getFullYear())} CBN Ventures LLC. All Rights Reserved.`,
      credit: true,
      cta: {
        label: 'Ready to deploy?',
        href: 'https://nova.cbnventures.io',
      },
    },
  },
};

export default config;

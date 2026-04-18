import type { DocusaurusNovaConfig } from '@cbnventures/docusaurus-preset-nova/types/config';

/**
 * Docusaurus Configuration.
 *
 * @since 0.11.0
 */
const config: DocusaurusNovaConfig = {
  // Site Metadata.
  title: 'Foundry',
  titleDelimiter: ' - ',
  tagline: 'Shape what ships.',
  favicon: './favicon.ico',

  // Deployment.
  url: 'https://foundry-demo.nova.cbnventures.io',
  baseUrl: '/',
  organizationName: 'cbnventures',
  projectName: 'demo-foundry',
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
          primary: undefined,
          accent: undefined,
          neutral: undefined,
        },
        fonts: {
          display: undefined,
          body: undefined,
          code: undefined,
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
          editUrl: 'https://github.com/cbnventures/nova/tree/main/apps/demo-foundry/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Blog',
          blogDescription: 'Dispatches from the forge — philosophy, benchmarks, and the opinions we shipped.',
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
            title: 'Foundry Blog',
            description: 'Dispatches from the forge — philosophy, benchmarks, and the opinions we shipped.',
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
      title: 'Foundry',
      logo: {
        alt: undefined,
        src: undefined,
        srcDark: undefined,
        href: undefined,
        wordmark: undefined,
        wordmarkDark: undefined,
        title: undefined,
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
      title: 'Foundry',
      hideOnScroll: false,
      items: [
        {
          label: 'Docs',
          position: 'left',
          type: 'doc',
          docId: 'getting-started',
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
          label: 'Guides',
          position: 'left',
          type: undefined,
          to: '/docs/category/guides/',
          icon: 'lucide:compass',
        },
        {
          label: 'Blog',
          position: 'left',
          type: undefined,
          to: '/blog/',
          icon: 'lucide:pen-line',
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
        description: 'Dispatches from the forge',
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
      id: 'foundry-launch',
      content: 'Foundry 1.0 is here — build, test, and ship faster than ever.',
      backgroundColor: undefined,
      textColor: undefined,
      isCloseable: true,
    },

    // Back to Top Button.
    backToTopButton: true,

    // Footer.
    footer: {
      sections: {
        forge: [
          {
            label: 'Getting Started',
            href: '/docs/getting-started/',
          },
          {
            label: 'Installation',
            href: '/docs/guides/installation/',
          },
          {
            label: 'CLI Reference',
            href: '/docs/reference/cli-reference/',
          },
        ],
        community: [
          {
            label: 'Threadbare',
            href: 'https://nova.cbnventures.io',
          },
          {
            label: 'Blog',
            href: '/blog/',
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
        forge: {
          title: 'Forge',
          section: 'forge',
        },
        community: {
          title: 'Community',
          section: 'community',
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

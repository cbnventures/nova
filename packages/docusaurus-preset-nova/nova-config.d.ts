import type { ProcessBlogPostsFn, ReadingTimeFunctionOption } from '@docusaurus/plugin-content-blog';
import type {
  DocusaurusConfig,
  FutureV4Config,
  ReportingSeverity,
  RouteConfig,
} from '@docusaurus/types';

// Primary brand color — hex format (e.g., "#DC2626").
export type NovaPresetOverridesColorsPrimary = string | undefined;

// Accent color for highlights and CTAs — hex format (e.g., "#FFBA33").
export type NovaPresetOverridesColorsAccent = string | undefined;

// Neutral color for borders and muted text — hex format (e.g., "#78716C").
export type NovaPresetOverridesColorsNeutral = string | undefined;

// Brand color overrides.
export type NovaPresetOverridesColors = {
  primary: NovaPresetOverridesColorsPrimary;
  accent: NovaPresetOverridesColorsAccent;
  neutral: NovaPresetOverridesColorsNeutral;
};

// Display/heading font family (e.g., "Sora", "Plus Jakarta Sans").
export type NovaPresetOverridesFontsDisplay = string | undefined;

// Body text font family (e.g., "Inter", "DM Sans").
export type NovaPresetOverridesFontsBody = string | undefined;

// Code/monospace font family (e.g., "Fira Code", "JetBrains Mono").
export type NovaPresetOverridesFontsCode = string | undefined;

// Font family overrides.
export type NovaPresetOverridesFonts = {
  display: NovaPresetOverridesFontsDisplay;
  body: NovaPresetOverridesFontsBody;
  code: NovaPresetOverridesFontsCode;
};

// Border radius style.
export type NovaPresetOverridesShapeRadius = 'sharp' | 'rounded' | 'pill' | undefined;

// Spacing density — affects padding and margins.
export type NovaPresetOverridesShapeDensity = 'compact' | 'comfortable' | 'spacious' | undefined;

// Shape and spacing overrides.
export type NovaPresetOverridesShape = {
  radius: NovaPresetOverridesShapeRadius;
  density: NovaPresetOverridesShapeDensity;
};

// Card surface style.
export type NovaPresetOverridesDepthCards = 'flat' | 'elevated' | 'glass' | undefined;

// Code block surface style.
export type NovaPresetOverridesDepthCodeBlocks = 'flat' | 'bordered' | 'elevated' | undefined;

// Surface depth overrides.
export type NovaPresetOverridesDepth = {
  cards: NovaPresetOverridesDepthCards;
  codeBlocks: NovaPresetOverridesDepthCodeBlocks;
};

// Animation speed.
export type NovaPresetOverridesMotionSpeed = 'none' | 'subtle' | 'normal' | 'expressive' | undefined;

// Stagger reveal animations on page load.
export type NovaPresetOverridesMotionStaggeredReveals = boolean | undefined;

// Enable hover effects on interactive elements.
export type NovaPresetOverridesMotionHoverEffects = boolean | undefined;

// Animation and motion overrides.
export type NovaPresetOverridesMotion = {
  speed: NovaPresetOverridesMotionSpeed;
  staggeredReveals: NovaPresetOverridesMotionStaggeredReveals;
  hoverEffects: NovaPresetOverridesMotionHoverEffects;
};

// Override preset brand colors (e.g., { primary: "#DC2626" }).
export type NovaPresetOverridesColorsPartial = Partial<NovaPresetOverridesColors> | undefined;

// Override preset font families (e.g., { display: "Sora" }).
export type NovaPresetOverridesFontsPartial = Partial<NovaPresetOverridesFonts> | undefined;

// Override preset border radius and spacing density.
export type NovaPresetOverridesShapePartial = Partial<NovaPresetOverridesShape> | undefined;

// Override preset card and code block depth styling.
export type NovaPresetOverridesDepthPartial = Partial<NovaPresetOverridesDepth> | undefined;

// Override preset animation speed and effects.
export type NovaPresetOverridesMotionPartial = Partial<NovaPresetOverridesMotion> | undefined;

// Navbar variant override.
export type NovaPresetOverridesNavbar = 'bridge' | 'canopy' | 'monolith' | 'compass' | undefined;

// Footer variant override.
export type NovaPresetOverridesFooter = 'commons' | 'embassy' | 'ledger' | 'launchpad' | undefined;

// Preset visual overrides — colors, fonts, shape, depth, motion, and layout variants.
export type NovaPresetOverrides = {
  colors?: NovaPresetOverridesColorsPartial;
  fonts?: NovaPresetOverridesFontsPartial;
  shape?: NovaPresetOverridesShapePartial;
  depth?: NovaPresetOverridesDepthPartial;
  motion?: NovaPresetOverridesMotionPartial;
  navbar?: NovaPresetOverridesNavbar;
  footer?: NovaPresetOverridesFooter;
};

// Plugin ID for multi-instance support (e.g., "product", "api").
export type NovaPresetPluginsDocsConfigId = string | undefined;

// Path to the docs content directory, relative to the site directory (e.g., "docs"). Defaults to "docs".
export type NovaPresetPluginsDocsConfigPath = string | undefined;

// URL route for the docs section (e.g., "docs", "/"). Defaults to "docs".
export type NovaPresetPluginsDocsConfigRouteBasePath = string | undefined;

// Path to sidebar configuration file (e.g., "./sidebars.ts"). Set as false to disable sidebars.
export type NovaPresetPluginsDocsConfigSidebarPath = string | false | undefined;

// Base URL to edit docs, or a function receiving doc context and returning a URL string or undefined to skip.
export type NovaPresetPluginsDocsConfigEditUrl = string | ((params: {
  version: string;
  versionDocsDirPath: string;
  docPath: string;
  permalink: string;
  locale: string;
}) => string | undefined) | undefined;

// Target the current version doc for edit links instead of older versions. Defaults to false.
export type NovaPresetPluginsDocsConfigEditCurrentVersion = boolean | undefined;

// Target localized file paths for edit links instead of the original. Defaults to false.
export type NovaPresetPluginsDocsConfigEditLocalizedFiles = boolean | undefined;

// Show the last update timestamp on each doc page. Defaults to false.
export type NovaPresetPluginsDocsConfigShowLastUpdateTime = boolean | undefined;

// Show the author who last updated each doc page. Defaults to false.
export type NovaPresetPluginsDocsConfigShowLastUpdateAuthor = boolean | undefined;

// Parse number prefixes from file names for sidebar ordering. Set as false to disable. Defaults to true.
export type NovaPresetPluginsDocsConfigNumberPrefixParser = boolean | undefined;

// Show breadcrumb navigation on doc pages. Defaults to true.
export type NovaPresetPluginsDocsConfigBreadcrumbs = boolean | undefined;

// Allow sidebar categories to be collapsed. Defaults to true.
export type NovaPresetPluginsDocsConfigSidebarCollapsible = boolean | undefined;

// Collapse sidebar categories by default. Defaults to true.
export type NovaPresetPluginsDocsConfigSidebarCollapsed = boolean | undefined;

// Glob patterns matching Markdown files to include (e.g., ["**/*.{md,mdx}"]). Defaults to ["**/*.{md,mdx}"].
export type NovaPresetPluginsDocsConfigInclude = string[] | undefined;

// Glob patterns matching Markdown files to exclude. Defaults to standard temp and draft patterns.
export type NovaPresetPluginsDocsConfigExclude = string[] | undefined;

// Default version displayed in navbar items (e.g., "1.0.0").
export type NovaPresetPluginsDocsConfigLastVersion = string | undefined;

// Subset of versions to include in the build (e.g., ["current", "1.0.0"]).
export type NovaPresetPluginsDocsConfigOnlyIncludeVersions = string[] | undefined;

// Disable versioning even when multiple versions exist. Defaults to false.
export type NovaPresetPluginsDocsConfigDisableVersioning = boolean | undefined;

// Include the current unreleased version of docs. Defaults to true.
export type NovaPresetPluginsDocsConfigIncludeCurrentVersion = boolean | undefined;

// Version path appended after routeBasePath (e.g., "1.0.0", "next").
export type NovaPresetPluginsDocsConfigVersionOptionsPath = string | undefined;

// Version label for badges and dropdowns (e.g., "1.0.0", "Next").
export type NovaPresetPluginsDocsConfigVersionOptionsLabel = string | undefined;

// Banner style shown at the top of docs — "none" to hide, or a version status indicator.
export type NovaPresetPluginsDocsConfigVersionOptionsBanner = 'none' | 'unreleased' | 'unmaintained' | undefined;

// Show a badge with the version label at the top of each doc. Defaults to true.
export type NovaPresetPluginsDocsConfigVersionOptionsBadge = boolean | undefined;

// Prevent search engines from indexing this version. Defaults to false.
export type NovaPresetPluginsDocsConfigVersionOptionsNoIndex = boolean | undefined;

// Add a custom class name to the HTML element for this version.
export type NovaPresetPluginsDocsConfigVersionOptionsClassName = string | undefined;

// Per-version docs configuration (label, banner, badge, noIndex, className).
export type NovaPresetPluginsDocsConfigVersionOptions = {
  path?: NovaPresetPluginsDocsConfigVersionOptionsPath;
  label?: NovaPresetPluginsDocsConfigVersionOptionsLabel;
  banner?: NovaPresetPluginsDocsConfigVersionOptionsBanner;
  badge?: NovaPresetPluginsDocsConfigVersionOptionsBadge;
  noIndex?: NovaPresetPluginsDocsConfigVersionOptionsNoIndex;
  className?: NovaPresetPluginsDocsConfigVersionOptionsClassName;
};

// Per-version configuration keyed by version name (e.g., { "1.0.0": { label: "v1.0", banner: "unmaintained" } }).
export type NovaPresetPluginsDocsConfigVersions = Record<string, NovaPresetPluginsDocsConfigVersionOptions> | undefined;

// Path to the tags file, or false/null to disable (e.g., "tags.yml"). Defaults to "tags.yml".
export type NovaPresetPluginsDocsConfigTags = string | false | null | undefined;

// Behavior when inline tags are detected. Defaults to "warn".
export type NovaPresetPluginsDocsConfigOnInlineTags = ReportingSeverity | undefined;

// URL route for the tags section, appended to routeBasePath (e.g., "tags"). Defaults to "tags".
export type NovaPresetPluginsDocsConfigTagsBasePath = string | undefined;

// Enable admonition syntax in Markdown (:::note, :::tip, etc.). Defaults to true.
export type NovaPresetPluginsDocsConfigAdmonitions = boolean | undefined;

// Remark plugins for Markdown processing.
export type NovaPresetPluginsDocsConfigRemarkPlugins = unknown[] | undefined;

// Rehype plugins for HTML processing.
export type NovaPresetPluginsDocsConfigRehypePlugins = unknown[] | undefined;

// Recma plugins for ESTree processing.
export type NovaPresetPluginsDocsConfigRecmaPlugins = unknown[] | undefined;

// Remark plugins inserted before the defaults.
export type NovaPresetPluginsDocsConfigBeforeDefaultRemarkPlugins = unknown[] | undefined;

// Rehype plugins inserted before the defaults.
export type NovaPresetPluginsDocsConfigBeforeDefaultRehypePlugins = unknown[] | undefined;

// Root component wrapping all docs pages across all versions (e.g., "@theme/DocsRoot").
export type NovaPresetPluginsDocsConfigDocsRootComponent = string | undefined;

// Root component wrapping all docs pages within a single version (e.g., "@theme/DocVersionRoot").
export type NovaPresetPluginsDocsConfigDocVersionRootComponent = string | undefined;

// Root component wrapping doc pages that have sidebars (e.g., "@theme/DocRoot").
export type NovaPresetPluginsDocsConfigDocRootComponent = string | undefined;

// Main doc page component with TOC, pagination, and content (e.g., "@theme/DocItem").
export type NovaPresetPluginsDocsConfigDocItemComponent = string | undefined;

// Component for the "docs with this tag" listing page (e.g., "@theme/DocTagDocListPage").
export type NovaPresetPluginsDocsConfigDocTagDocListComponent = string | undefined;

// Component for the tags index page (e.g., "@theme/DocTagsListPage").
export type NovaPresetPluginsDocsConfigDocTagsListComponent = string | undefined;

// Component for auto-generated category index pages (e.g., "@theme/DocCategoryGeneratedIndexPage").
export type NovaPresetPluginsDocsConfigDocCategoryGeneratedIndexComponent = string | undefined;

// Custom callback to generate sidebar items from autogenerated sections.
export type NovaPresetPluginsDocsConfigSidebarItemsGenerator = ((generatorArgs: Record<string, unknown>) => unknown[] | Promise<unknown[]>) | undefined;

// Docs plugin options — pass-through to @docusaurus/plugin-content-docs.
export type NovaPresetPluginsDocsConfig = {
  id?: NovaPresetPluginsDocsConfigId;
  path?: NovaPresetPluginsDocsConfigPath;
  routeBasePath?: NovaPresetPluginsDocsConfigRouteBasePath;
  sidebarPath?: NovaPresetPluginsDocsConfigSidebarPath;
  editUrl?: NovaPresetPluginsDocsConfigEditUrl;
  editCurrentVersion?: NovaPresetPluginsDocsConfigEditCurrentVersion;
  editLocalizedFiles?: NovaPresetPluginsDocsConfigEditLocalizedFiles;
  showLastUpdateTime?: NovaPresetPluginsDocsConfigShowLastUpdateTime;
  showLastUpdateAuthor?: NovaPresetPluginsDocsConfigShowLastUpdateAuthor;
  numberPrefixParser?: NovaPresetPluginsDocsConfigNumberPrefixParser;
  breadcrumbs?: NovaPresetPluginsDocsConfigBreadcrumbs;
  sidebarCollapsible?: NovaPresetPluginsDocsConfigSidebarCollapsible;
  sidebarCollapsed?: NovaPresetPluginsDocsConfigSidebarCollapsed;
  include?: NovaPresetPluginsDocsConfigInclude;
  exclude?: NovaPresetPluginsDocsConfigExclude;
  lastVersion?: NovaPresetPluginsDocsConfigLastVersion;
  onlyIncludeVersions?: NovaPresetPluginsDocsConfigOnlyIncludeVersions;
  disableVersioning?: NovaPresetPluginsDocsConfigDisableVersioning;
  includeCurrentVersion?: NovaPresetPluginsDocsConfigIncludeCurrentVersion;
  versions?: NovaPresetPluginsDocsConfigVersions;
  tags?: NovaPresetPluginsDocsConfigTags;
  onInlineTags?: NovaPresetPluginsDocsConfigOnInlineTags;
  tagsBasePath?: NovaPresetPluginsDocsConfigTagsBasePath;
  admonitions?: NovaPresetPluginsDocsConfigAdmonitions;
  remarkPlugins?: NovaPresetPluginsDocsConfigRemarkPlugins;
  rehypePlugins?: NovaPresetPluginsDocsConfigRehypePlugins;
  recmaPlugins?: NovaPresetPluginsDocsConfigRecmaPlugins;
  beforeDefaultRemarkPlugins?: NovaPresetPluginsDocsConfigBeforeDefaultRemarkPlugins;
  beforeDefaultRehypePlugins?: NovaPresetPluginsDocsConfigBeforeDefaultRehypePlugins;
  docsRootComponent?: NovaPresetPluginsDocsConfigDocsRootComponent;
  docVersionRootComponent?: NovaPresetPluginsDocsConfigDocVersionRootComponent;
  docRootComponent?: NovaPresetPluginsDocsConfigDocRootComponent;
  docItemComponent?: NovaPresetPluginsDocsConfigDocItemComponent;
  docTagDocListComponent?: NovaPresetPluginsDocsConfigDocTagDocListComponent;
  docTagsListComponent?: NovaPresetPluginsDocsConfigDocTagsListComponent;
  docCategoryGeneratedIndexComponent?: NovaPresetPluginsDocsConfigDocCategoryGeneratedIndexComponent;
  sidebarItemsGenerator?: NovaPresetPluginsDocsConfigSidebarItemsGenerator;
  [key: string]: unknown;
};

// Docs plugin options — pass-through to @docusaurus/plugin-content-docs.
export type NovaPresetPluginsDocs = NovaPresetPluginsDocsConfig | undefined;

// Plugin ID for multi-instance support.
export type NovaPresetPluginsBlogConfigId = string | undefined;

// Path to the blog content directory, relative to the site directory (e.g., "blog"). Defaults to "blog".
export type NovaPresetPluginsBlogConfigPath = string | undefined;

// URL route for the blog section (e.g., "blog", "/"). Defaults to "blog".
export type NovaPresetPluginsBlogConfigRouteBasePath = string | undefined;

// URL route for the tags section, appended to routeBasePath (e.g., "tags"). Defaults to "tags".
export type NovaPresetPluginsBlogConfigTagsBasePath = string | undefined;

// URL route for paginated list pages, appended to routeBasePath (e.g., "page"). Defaults to "page".
export type NovaPresetPluginsBlogConfigPageBasePath = string | undefined;

// URL route for the archive page, appended to routeBasePath. Set to null to disable. Defaults to "archive".
export type NovaPresetPluginsBlogConfigArchiveBasePath = string | null | undefined;

// Glob patterns matching blog post files to include. Defaults to ["**/*.{md,mdx}"].
export type NovaPresetPluginsBlogConfigInclude = string[] | undefined;

// Glob patterns matching blog post files to exclude. Defaults to standard temp and draft patterns.
export type NovaPresetPluginsBlogConfigExclude = string[] | undefined;

// Number of posts per listing page, or "ALL" to show all on one page. Defaults to 10.
export type NovaPresetPluginsBlogConfigPostsPerPage = number | 'ALL' | undefined;

// Blog page title for SEO (e.g., "Blog", "Changelog"). Defaults to "Blog".
export type NovaPresetPluginsBlogConfigBlogTitle = string | undefined;

// Blog page meta description for SEO. Defaults to "Blog".
export type NovaPresetPluginsBlogConfigBlogDescription = string | undefined;

// Number of recent posts in the blog sidebar, or "ALL" for all posts, or 0 to disable. Defaults to 5.
export type NovaPresetPluginsBlogConfigBlogSidebarCount = number | 'ALL' | undefined;

// Title of the blog sidebar (e.g., "Recent Posts"). Defaults to "Recent posts".
export type NovaPresetPluginsBlogConfigBlogSidebarTitle = string | undefined;

// Show estimated reading time on blog posts. Defaults to true.
export type NovaPresetPluginsBlogConfigShowReadingTime = boolean | undefined;

// Truncate marker regex for the blog post excerpt. Defaults to /<!--\s*truncate\s*-->/.
export type NovaPresetPluginsBlogConfigTruncateMarker = RegExp | undefined;

// Sort order for blog posts. Defaults to "descending".
export type NovaPresetPluginsBlogConfigSortPosts = 'ascending' | 'descending' | undefined;

// Base URL to edit blog posts, or a function receiving post context and returning a URL string or undefined to skip.
export type NovaPresetPluginsBlogConfigEditUrl = string | ((params: {
  blogDirPath: string;
  blogPath: string;
  permalink: string;
  locale: string;
}) => string | undefined) | undefined;

// Target localized file paths for edit links instead of the original. Defaults to false.
export type NovaPresetPluginsBlogConfigEditLocalizedFiles = boolean | undefined;

// Show the last update timestamp on each blog post. Defaults to false.
export type NovaPresetPluginsBlogConfigShowLastUpdateTime = boolean | undefined;

// Show the author who last updated each blog post. Defaults to false.
export type NovaPresetPluginsBlogConfigShowLastUpdateAuthor = boolean | undefined;

// Path to the authors map YAML file, relative to the blog directory (e.g., "authors.yml"). Defaults to "authors.yml".
export type NovaPresetPluginsBlogConfigAuthorsMapPath = string | undefined;

// Base path for the authors list page, appended to routeBasePath (e.g., "authors"). Defaults to "authors".
export type NovaPresetPluginsBlogConfigAuthorsBasePath = string | undefined;

// Behavior when inline authors (not from authors map) are detected. Defaults to "warn".
export type NovaPresetPluginsBlogConfigOnInlineAuthors = ReportingSeverity | undefined;

// Behavior when blog posts without a truncate marker are detected. Defaults to "warn".
export type NovaPresetPluginsBlogConfigOnUntruncatedBlogPosts = ReportingSeverity | undefined;

// Path to the tags file, or false/null to disable (e.g., "tags.yml"). Defaults to "tags.yml".
export type NovaPresetPluginsBlogConfigTags = string | false | null | undefined;

// Behavior when inline tags are detected. Defaults to "warn".
export type NovaPresetPluginsBlogConfigOnInlineTags = ReportingSeverity | undefined;

// Feed format — array of types, single type, "all" for all formats, or null to disable. Defaults to null.
export type NovaPresetPluginsBlogConfigFeedOptionsType = ('rss' | 'atom' | 'json')[] | 'all' | 'rss' | 'atom' | 'json' | null | undefined;

// Feed title override. Defaults to the site title.
export type NovaPresetPluginsBlogConfigFeedOptionsTitle = string | undefined;

// Feed description override. Defaults to the site tagline.
export type NovaPresetPluginsBlogConfigFeedOptionsDescription = string | undefined;

// Copyright notice included in the feed.
export type NovaPresetPluginsBlogConfigFeedOptionsCopyright = string | undefined;

// Language code for the feed (e.g., "en").
export type NovaPresetPluginsBlogConfigFeedOptionsLanguage = string | undefined;

// Maximum number of feed items, or false/null for unlimited. Defaults to 20.
export type NovaPresetPluginsBlogConfigFeedOptionsLimit = number | false | null | undefined;

// XSLT stylesheet configuration — true for defaults, false/null to disable, or per-format overrides.
export type NovaPresetPluginsBlogConfigFeedOptionsXslt = boolean | null | {
  rss?: string | boolean | null | undefined;
  atom?: string | boolean | null | undefined;
} | undefined;

// Blog RSS/Atom feed configuration.
export type NovaPresetPluginsBlogConfigFeedOptions = {
  type?: NovaPresetPluginsBlogConfigFeedOptionsType;
  title?: NovaPresetPluginsBlogConfigFeedOptionsTitle;
  description?: NovaPresetPluginsBlogConfigFeedOptionsDescription;
  copyright?: NovaPresetPluginsBlogConfigFeedOptionsCopyright;
  language?: NovaPresetPluginsBlogConfigFeedOptionsLanguage;
  limit?: NovaPresetPluginsBlogConfigFeedOptionsLimit;
  xslt?: NovaPresetPluginsBlogConfigFeedOptionsXslt;
  [key: string]: unknown;
} | undefined;

// Enable admonition syntax in Markdown. Defaults to true.
export type NovaPresetPluginsBlogConfigAdmonitions = boolean | undefined;

// Remark plugins for Markdown processing.
export type NovaPresetPluginsBlogConfigRemarkPlugins = unknown[] | undefined;

// Rehype plugins for HTML processing.
export type NovaPresetPluginsBlogConfigRehypePlugins = unknown[] | undefined;

// Recma plugins for ESTree processing.
export type NovaPresetPluginsBlogConfigRecmaPlugins = unknown[] | undefined;

// Remark plugins inserted before the defaults.
export type NovaPresetPluginsBlogConfigBeforeDefaultRemarkPlugins = unknown[] | undefined;

// Rehype plugins inserted before the defaults.
export type NovaPresetPluginsBlogConfigBeforeDefaultRehypePlugins = unknown[] | undefined;

// Root component for the blog listing page (e.g., "@theme/BlogListPage").
export type NovaPresetPluginsBlogConfigBlogListComponent = string | undefined;

// Root component for individual blog post pages (e.g., "@theme/BlogPostPage").
export type NovaPresetPluginsBlogConfigBlogPostComponent = string | undefined;

// Root component for the blog tags index page (e.g., "@theme/BlogTagsListPage").
export type NovaPresetPluginsBlogConfigBlogTagsListComponent = string | undefined;

// Root component for the "posts with this tag" page (e.g., "@theme/BlogTagsPostsPage").
export type NovaPresetPluginsBlogConfigBlogTagsPostsComponent = string | undefined;

// Root component for the authors list page (e.g., "@theme/BlogAuthorsListPage").
export type NovaPresetPluginsBlogConfigBlogAuthorsListComponent = string | undefined;

// Root component for the "posts by this author" page (e.g., "@theme/BlogAuthorsPostsPage").
export type NovaPresetPluginsBlogConfigBlogAuthorsPostsComponent = string | undefined;

// Root component for the blog archive page (e.g., "@theme/BlogArchivePage").
export type NovaPresetPluginsBlogConfigBlogArchiveComponent = string | undefined;

// Custom callback to calculate reading time for a blog post. Return undefined to hide reading time.
export type NovaPresetPluginsBlogConfigReadingTime = ReadingTimeFunctionOption | undefined;

// Async callback to transform, filter, or modify blog posts before rendering.
export type NovaPresetPluginsBlogConfigProcessBlogPosts = ProcessBlogPostsFn | undefined;

// Blog plugin options — pass-through to @docusaurus/plugin-content-blog.
export type NovaPresetPluginsBlogConfig = {
  id?: NovaPresetPluginsBlogConfigId;
  path?: NovaPresetPluginsBlogConfigPath;
  routeBasePath?: NovaPresetPluginsBlogConfigRouteBasePath;
  tagsBasePath?: NovaPresetPluginsBlogConfigTagsBasePath;
  pageBasePath?: NovaPresetPluginsBlogConfigPageBasePath;
  archiveBasePath?: NovaPresetPluginsBlogConfigArchiveBasePath;
  include?: NovaPresetPluginsBlogConfigInclude;
  exclude?: NovaPresetPluginsBlogConfigExclude;
  postsPerPage?: NovaPresetPluginsBlogConfigPostsPerPage;
  blogTitle?: NovaPresetPluginsBlogConfigBlogTitle;
  blogDescription?: NovaPresetPluginsBlogConfigBlogDescription;
  blogSidebarCount?: NovaPresetPluginsBlogConfigBlogSidebarCount;
  blogSidebarTitle?: NovaPresetPluginsBlogConfigBlogSidebarTitle;
  showReadingTime?: NovaPresetPluginsBlogConfigShowReadingTime;
  truncateMarker?: NovaPresetPluginsBlogConfigTruncateMarker;
  sortPosts?: NovaPresetPluginsBlogConfigSortPosts;
  editUrl?: NovaPresetPluginsBlogConfigEditUrl;
  editLocalizedFiles?: NovaPresetPluginsBlogConfigEditLocalizedFiles;
  showLastUpdateTime?: NovaPresetPluginsBlogConfigShowLastUpdateTime;
  showLastUpdateAuthor?: NovaPresetPluginsBlogConfigShowLastUpdateAuthor;
  authorsMapPath?: NovaPresetPluginsBlogConfigAuthorsMapPath;
  authorsBasePath?: NovaPresetPluginsBlogConfigAuthorsBasePath;
  onInlineAuthors?: NovaPresetPluginsBlogConfigOnInlineAuthors;
  onUntruncatedBlogPosts?: NovaPresetPluginsBlogConfigOnUntruncatedBlogPosts;
  tags?: NovaPresetPluginsBlogConfigTags;
  onInlineTags?: NovaPresetPluginsBlogConfigOnInlineTags;
  feedOptions?: NovaPresetPluginsBlogConfigFeedOptions;
  admonitions?: NovaPresetPluginsBlogConfigAdmonitions;
  remarkPlugins?: NovaPresetPluginsBlogConfigRemarkPlugins;
  rehypePlugins?: NovaPresetPluginsBlogConfigRehypePlugins;
  recmaPlugins?: NovaPresetPluginsBlogConfigRecmaPlugins;
  beforeDefaultRemarkPlugins?: NovaPresetPluginsBlogConfigBeforeDefaultRemarkPlugins;
  beforeDefaultRehypePlugins?: NovaPresetPluginsBlogConfigBeforeDefaultRehypePlugins;
  blogListComponent?: NovaPresetPluginsBlogConfigBlogListComponent;
  blogPostComponent?: NovaPresetPluginsBlogConfigBlogPostComponent;
  blogTagsListComponent?: NovaPresetPluginsBlogConfigBlogTagsListComponent;
  blogTagsPostsComponent?: NovaPresetPluginsBlogConfigBlogTagsPostsComponent;
  blogAuthorsListComponent?: NovaPresetPluginsBlogConfigBlogAuthorsListComponent;
  blogAuthorsPostsComponent?: NovaPresetPluginsBlogConfigBlogAuthorsPostsComponent;
  blogArchiveComponent?: NovaPresetPluginsBlogConfigBlogArchiveComponent;
  readingTime?: NovaPresetPluginsBlogConfigReadingTime;
  processBlogPosts?: NovaPresetPluginsBlogConfigProcessBlogPosts;
  [key: string]: unknown;
};

// Blog plugin options — pass-through to @docusaurus/plugin-content-blog, or false to disable.
export type NovaPresetPluginsBlog = NovaPresetPluginsBlogConfig | false | undefined;

// Plugin ID for multi-instance support.
export type NovaPresetPluginsPagesConfigId = string | undefined;

// Path to the pages content directory, relative to the site directory (e.g., "src/pages"). Defaults to "src/pages".
export type NovaPresetPluginsPagesConfigPath = string | undefined;

// URL route for standalone pages (e.g., "/", "pages"). Defaults to "/".
export type NovaPresetPluginsPagesConfigRouteBasePath = string | undefined;

// Glob patterns matching page files to include. Defaults to ["**/*.{js,jsx,ts,tsx,md,mdx}"].
export type NovaPresetPluginsPagesConfigInclude = string[] | undefined;

// Glob patterns matching page files to exclude. Defaults to standard temp and draft patterns.
export type NovaPresetPluginsPagesConfigExclude = string[] | undefined;

// Base URL to edit pages, or a function receiving page context and returning a URL string or undefined to skip.
export type NovaPresetPluginsPagesConfigEditUrl = string | ((params: {
  pagesDirPath: string;
  pagesPath: string;
  permalink: string;
  locale: string;
}) => string | undefined) | undefined;

// Target localized file paths for edit links instead of the original. Defaults to false.
export type NovaPresetPluginsPagesConfigEditLocalizedFiles = boolean | undefined;

// Show the last update timestamp on each page. Defaults to false.
export type NovaPresetPluginsPagesConfigShowLastUpdateTime = boolean | undefined;

// Show the author who last updated each page. Defaults to false.
export type NovaPresetPluginsPagesConfigShowLastUpdateAuthor = boolean | undefined;

// Enable admonition syntax in Markdown. Defaults to true.
export type NovaPresetPluginsPagesConfigAdmonitions = boolean | undefined;

// Remark plugins for Markdown processing.
export type NovaPresetPluginsPagesConfigRemarkPlugins = unknown[] | undefined;

// Rehype plugins for HTML processing.
export type NovaPresetPluginsPagesConfigRehypePlugins = unknown[] | undefined;

// Recma plugins for ESTree processing.
export type NovaPresetPluginsPagesConfigRecmaPlugins = unknown[] | undefined;

// Remark plugins inserted before the defaults.
export type NovaPresetPluginsPagesConfigBeforeDefaultRemarkPlugins = unknown[] | undefined;

// Rehype plugins inserted before the defaults.
export type NovaPresetPluginsPagesConfigBeforeDefaultRehypePlugins = unknown[] | undefined;

// Root component for MDX pages (e.g., "@theme/MDXPage").
export type NovaPresetPluginsPagesConfigMdxPageComponent = string | undefined;

// Pages plugin options — pass-through to @docusaurus/plugin-content-pages.
export type NovaPresetPluginsPagesConfig = {
  id?: NovaPresetPluginsPagesConfigId;
  path?: NovaPresetPluginsPagesConfigPath;
  routeBasePath?: NovaPresetPluginsPagesConfigRouteBasePath;
  include?: NovaPresetPluginsPagesConfigInclude;
  exclude?: NovaPresetPluginsPagesConfigExclude;
  editUrl?: NovaPresetPluginsPagesConfigEditUrl;
  editLocalizedFiles?: NovaPresetPluginsPagesConfigEditLocalizedFiles;
  showLastUpdateTime?: NovaPresetPluginsPagesConfigShowLastUpdateTime;
  showLastUpdateAuthor?: NovaPresetPluginsPagesConfigShowLastUpdateAuthor;
  admonitions?: NovaPresetPluginsPagesConfigAdmonitions;
  remarkPlugins?: NovaPresetPluginsPagesConfigRemarkPlugins;
  rehypePlugins?: NovaPresetPluginsPagesConfigRehypePlugins;
  recmaPlugins?: NovaPresetPluginsPagesConfigRecmaPlugins;
  beforeDefaultRemarkPlugins?: NovaPresetPluginsPagesConfigBeforeDefaultRemarkPlugins;
  beforeDefaultRehypePlugins?: NovaPresetPluginsPagesConfigBeforeDefaultRehypePlugins;
  mdxPageComponent?: NovaPresetPluginsPagesConfigMdxPageComponent;
  [key: string]: unknown;
};

// Pages plugin options — pass-through to @docusaurus/plugin-content-pages, or false to disable.
export type NovaPresetPluginsPages = NovaPresetPluginsPagesConfig | false | undefined;

// Output filename for the sitemap, relative to the build directory (e.g., "sitemap.xml"). Defaults to "sitemap.xml".
export type NovaPresetPluginsSitemapConfigFilename = string | undefined;

// Glob patterns for routes to exclude from the sitemap (e.g., ["/docs/tags/**"]).
export type NovaPresetPluginsSitemapConfigIgnorePatterns = string[] | undefined;

// Format of the lastmod entry — "date" for YYYY-MM-DD, "datetime" for ISO 8601, or null to omit. Defaults to null.
export type NovaPresetPluginsSitemapConfigLastmod = 'date' | 'datetime' | null | undefined;

// Change frequency hint for search engines, or null to omit. Defaults to null.
export type NovaPresetPluginsSitemapConfigChangefreq = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'never' | null | undefined;

// Priority value between 0.0 and 1.0 for search engines, or null to omit. Defaults to null.
export type NovaPresetPluginsSitemapConfigPriority = number | null | undefined;

// Sitemap entry with URL, last modified date, change frequency, and priority.
export type NovaSitemapItem = {
  url: string;
  lastmod?: string | null;
  changefreq?: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'never' | null;
  priority?: number | null;
};

// Site configuration passed to the sitemap callback.
export type NovaSitemapCallbackSiteConfig = DocusaurusConfig;

// Route list passed to the sitemap callback.
export type NovaSitemapCallbackRoutes = RouteConfig[];

// Default sitemap item generator provided to the callback.
export type NovaSitemapCallbackDefaultCreateSitemapItems = (params: {
  siteConfig: NovaSitemapCallbackSiteConfig;
  routes: NovaSitemapCallbackRoutes;
}) => Promise<NovaSitemapItem[]>;

// Custom callback to control sitemap item generation with access to the default implementation.
export type NovaPresetPluginsSitemapConfigCreateSitemapItems = ((params: {
  siteConfig: NovaSitemapCallbackSiteConfig;
  routes: NovaSitemapCallbackRoutes;
  defaultCreateSitemapItems: NovaSitemapCallbackDefaultCreateSitemapItems;
}) => Promise<NovaSitemapItem[]>) | undefined;

// Sitemap plugin options — pass-through to @docusaurus/plugin-sitemap.
export type NovaPresetPluginsSitemapConfig = {
  filename?: NovaPresetPluginsSitemapConfigFilename;
  ignorePatterns?: NovaPresetPluginsSitemapConfigIgnorePatterns;
  lastmod?: NovaPresetPluginsSitemapConfigLastmod;
  changefreq?: NovaPresetPluginsSitemapConfigChangefreq;
  priority?: NovaPresetPluginsSitemapConfigPriority;
  createSitemapItems?: NovaPresetPluginsSitemapConfigCreateSitemapItems;
  [key: string]: unknown;
};

// Sitemap plugin options — pass-through to @docusaurus/plugin-sitemap, or false to disable.
export type NovaPresetPluginsSitemap = NovaPresetPluginsSitemapConfig | false | undefined;

// Docusaurus plugin configuration (docs, blog, pages, sitemap).
export type NovaPresetPlugins = {
  docs?: NovaPresetPluginsDocs;
  blog?: NovaPresetPluginsBlog;
  pages?: NovaPresetPluginsPages;
  sitemap?: NovaPresetPluginsSitemap;
};

// GTM container ID (e.g., "GTM-XXXXXXXX").
export type NovaPresetAnalyticsGtmContainerId = string;

// Google Tag Manager configuration.
export type NovaPresetAnalyticsGtm = {
  containerId: NovaPresetAnalyticsGtmContainerId;
} | undefined;

// Analytics integrations.
export type NovaPresetAnalytics = {
  gtm?: NovaPresetAnalyticsGtm;
};

// Minimum progress value before the bar starts (e.g., 0.08). Defaults to 0.08.
export type NovaPresetProgressBarConfigMinimum = number | undefined;

// CSS easing function for the progress animation (e.g., "ease", "linear"). Defaults to "ease".
export type NovaPresetProgressBarConfigEasing = string | undefined;

// Animation speed in milliseconds (e.g., 200). Defaults to 200.
export type NovaPresetProgressBarConfigSpeed = number | undefined;

// Enable automatic trickle increments. Defaults to true.
export type NovaPresetProgressBarConfigTrickle = boolean | undefined;

// Trickle increment speed in milliseconds (e.g., 200). Defaults to 200.
export type NovaPresetProgressBarConfigTrickleSpeed = number | undefined;

// Show the spinner element alongside the progress bar. Defaults to true.
export type NovaPresetProgressBarConfigShowSpinner = boolean | undefined;

// CSS selector for the progress bar parent element (e.g., "body"). Defaults to "body".
export type NovaPresetProgressBarConfigParent = string | undefined;

// Progress bar appearance and behavior.
export type NovaPresetProgressBarConfig = {
  minimum?: NovaPresetProgressBarConfigMinimum;
  easing?: NovaPresetProgressBarConfigEasing;
  speed?: NovaPresetProgressBarConfigSpeed;
  trickle?: NovaPresetProgressBarConfigTrickle;
  trickleSpeed?: NovaPresetProgressBarConfigTrickleSpeed;
  showSpinner?: NovaPresetProgressBarConfigShowSpinner;
  parent?: NovaPresetProgressBarConfigParent;
  [key: string]: unknown;
};

// Show a progress bar during page transitions. Defaults to false.
export type NovaPresetProgressBar = boolean | NovaPresetProgressBarConfig;

// Lunr language codes for search indexing (e.g., ["en"], ["en", "de", "ja"]). Defaults to ["en"].
export type NovaPresetSearchConfigLanguage = string[] | undefined;

// Index docs pages in search. Defaults to true.
export type NovaPresetSearchConfigIndexDocs = boolean | undefined;

// Index blog pages in search. Defaults to true.
export type NovaPresetSearchConfigIndexBlog = boolean | undefined;

// Index standalone pages in search. Defaults to false.
export type NovaPresetSearchConfigIndexPages = boolean | undefined;

// Hash search index filenames for cache busting. Defaults to true.
export type NovaPresetSearchConfigHashed = boolean | undefined;

// Max number of search results shown in dropdown (e.g., 5, 10, 20). Defaults to 8.
export type NovaPresetSearchConfigSearchResultLimits = number | undefined;

// Highlight matching terms on the target page after clicking a result. Defaults to true.
export type NovaPresetSearchConfigHighlightSearchTermsOnTargetPage = boolean | undefined;

// Keyboard shortcut to open search (e.g., "mod+k", "mod+/", mod = Cmd/Ctrl). Defaults to "mod+k".
export type NovaPresetSearchConfigSearchBarShortcutKeymap = string | undefined;

// Max Levenshtein distance for fuzzy matching (0 = exact, 1 = one typo, 2 = two typos). Defaults to 1.
export type NovaPresetSearchConfigFuzzyMatchingDistance = number | undefined;

// Glob patterns of routes to exclude from search (e.g., ["/docs/tags/**"]). Defaults to [].
export type NovaPresetSearchConfigIgnorePatterns = string[] | undefined;

// Docs route base path — must match plugins.docs.routeBasePath (e.g., "docs", "guides"). Defaults to "docs".
export type NovaPresetSearchConfigDocsRouteBasePath = string | undefined;

// Local search configuration.
export type NovaPresetSearchConfig = {
  language?: NovaPresetSearchConfigLanguage;
  indexDocs?: NovaPresetSearchConfigIndexDocs;
  indexBlog?: NovaPresetSearchConfigIndexBlog;
  indexPages?: NovaPresetSearchConfigIndexPages;
  hashed?: NovaPresetSearchConfigHashed;
  searchResultLimits?: NovaPresetSearchConfigSearchResultLimits;
  highlightSearchTermsOnTargetPage?: NovaPresetSearchConfigHighlightSearchTermsOnTargetPage;
  searchBarShortcutKeymap?: NovaPresetSearchConfigSearchBarShortcutKeymap;
  fuzzyMatchingDistance?: NovaPresetSearchConfigFuzzyMatchingDistance;
  ignorePatterns?: NovaPresetSearchConfigIgnorePatterns;
  docsRouteBasePath?: NovaPresetSearchConfigDocsRouteBasePath;
  [key: string]: unknown;
};

// Local search configuration, or false to disable search entirely. Defaults to false.
export type NovaPresetSearch = NovaPresetSearchConfig | false;

// Preset identity — determines default colors, fonts, shape, and layout.
export type NovaPresetName = 'foundry' | 'sentinel' | 'signal' | 'envoy';

// Override individual preset defaults (undefined = use preset default).
export type NovaPresetOptionsOverrides = NovaPresetOverrides | undefined;

// Docusaurus plugin configuration (docs, blog, pages, sitemap).
export type NovaPresetOptionsPlugins = NovaPresetPlugins | undefined;

// Analytics integrations.
export type NovaPresetOptionsAnalytics = NovaPresetAnalytics | undefined;

// Show a progress bar during page transitions. Defaults to false.
export type NovaPresetOptionsProgressBar = NovaPresetProgressBar | undefined;

// Local search configuration, or false to disable search entirely. Defaults to false.
export type NovaPresetOptionsSearch = NovaPresetSearch | undefined;

// Nova preset options — identity, overrides, plugins, analytics, progress bar, and search.
export type NovaPresetOptions = {
  preset: NovaPresetName;
  overrides?: NovaPresetOptionsOverrides;
  plugins?: NovaPresetOptionsPlugins;
  analytics?: NovaPresetOptionsAnalytics;
  progressBar?: NovaPresetOptionsProgressBar;
  search?: NovaPresetOptionsSearch;
};

// Meta tag name attribute (e.g., "twitter:card", "og:description").
export type NovaThemeConfigSiteMetadataEntryName = string;

// Meta tag content attribute (e.g., "summary_large_image").
export type NovaThemeConfigSiteMetadataEntryContent = string;

// Single HTML <meta> tag for SEO.
export type NovaThemeConfigSiteMetadataEntry = {
  name: NovaThemeConfigSiteMetadataEntryName;
  content: NovaThemeConfigSiteMetadataEntryContent;
};

// Site title shown in the browser tab and SEO (e.g., "Nova", "Foundry"). Defaults to "".
export type NovaThemeConfigSiteTitle = string | undefined;

// Alt text for the logo image (e.g., "Nova"). Defaults to "".
export type NovaThemeConfigSiteLogoAlt = string | undefined;

// Logo image — URL path from static dir (e.g., "/images/logo.svg"). Defaults to "".
export type NovaThemeConfigSiteLogoSrc = string | undefined;

// Dark mode logo — URL path from static dir (e.g., "/images/logo-dark.svg").
export type NovaThemeConfigSiteLogoSrcDark = string | undefined;

// Clicking the logo navigates to this URL (e.g., "https://example.com").
export type NovaThemeConfigSiteLogoHref = string | undefined;

// Wordmark image — URL path from static dir (e.g., "/images/wordmark.svg").
export type NovaThemeConfigSiteLogoWordmark = string | undefined;

// Dark mode wordmark — URL path from static dir (e.g., "/images/wordmark-dark.svg").
export type NovaThemeConfigSiteLogoWordmarkDark = string | undefined;

// Brand title text shown in the navbar (e.g., "Envoy"). Not used for SEO.
export type NovaThemeConfigSiteLogoTitle = string | undefined;

// Site logo configuration.
export type NovaThemeConfigSiteLogo = {
  alt?: NovaThemeConfigSiteLogoAlt;
  src?: NovaThemeConfigSiteLogoSrc;
  srcDark?: NovaThemeConfigSiteLogoSrcDark;
  href?: NovaThemeConfigSiteLogoHref;
  wordmark?: NovaThemeConfigSiteLogoWordmark;
  wordmarkDark?: NovaThemeConfigSiteLogoWordmarkDark;
  title?: NovaThemeConfigSiteLogoTitle;
} | undefined;

// Default social sharing image — URL path from static dir (e.g., "/thumbnails/brand.png"). Defaults to "".
export type NovaThemeConfigSiteImage = string | undefined;

// HTML <meta> tags for SEO (e.g., [{ name: "twitter:card", content: "summary_large_image" }]). Defaults to [].
export type NovaThemeConfigSiteMetadata = NovaThemeConfigSiteMetadataEntry[] | undefined;

// Site identity — title, logo, image, and metadata.
export type NovaThemeConfigSite = {
  title?: NovaThemeConfigSiteTitle;
  logo?: NovaThemeConfigSiteLogo;
  image?: NovaThemeConfigSiteImage;
  metadata?: NovaThemeConfigSiteMetadata;
} | undefined;

// Default color mode on first visit. Defaults to "system".
export type NovaThemeConfigColorModeDefaultMode = 'system' | 'light' | 'dark' | undefined;

// Hide the light/dark toggle switch. Defaults to false.
export type NovaThemeConfigColorModeDisableSwitch = boolean | undefined;

// Color mode configuration.
export type NovaThemeConfigColorMode = {
  defaultMode?: NovaThemeConfigColorModeDefaultMode;
  disableSwitch?: NovaThemeConfigColorModeDisableSwitch;
  [key: string]: unknown;
} | undefined;

// Display text for the navbar item (e.g., "Documentation", "Blog").
export type NovaThemeConfigNavbarItemLabel = string | undefined;

// Item type — determines rendering behavior.
export type NovaThemeConfigNavbarItemType = 'default' | 'doc' | 'docSidebar' | 'dropdown' | 'html' | 'localeDropdown' | 'docsVersion' | 'docsVersionDropdown' | 'search' | undefined;

// Nested items — used when type is "dropdown".
export type NovaThemeConfigNavbarItemItems = NovaThemeConfigNavbarItem[] | undefined;

// Internal site path — uses client-side routing (e.g., "/blog", "/docs/getting-started").
export type NovaThemeConfigNavbarItemTo = string | undefined;

// External URL — full page navigation (e.g., "https://github.com/...").
export type NovaThemeConfigNavbarItemHref = string | undefined;

// Iconify icon ID or object (e.g., "lucide:book-open", "mdi:github").
export type NovaThemeConfigNavbarItemIcon = string | undefined;

// Document ID — filename without extension, used with type: "doc" (e.g., "getting-started", "overview").
export type NovaThemeConfigNavbarItemDocId = string | undefined;

// Sidebar ID — defined in sidebars.ts, used with type: "docSidebar" (e.g., "docs").
export type NovaThemeConfigNavbarItemSidebarId = string | undefined;

// Single navbar item — link, doc, dropdown, search, etc.
export type NovaThemeConfigNavbarItem = {
  label?: NovaThemeConfigNavbarItemLabel;
  type?: NovaThemeConfigNavbarItemType;
  items?: NovaThemeConfigNavbarItemItems;
  to?: NovaThemeConfigNavbarItemTo;
  href?: NovaThemeConfigNavbarItemHref;
  icon?: NovaThemeConfigNavbarItemIcon;
  docId?: NovaThemeConfigNavbarItemDocId;
  sidebarId?: NovaThemeConfigNavbarItemSidebarId;
  [key: string]: unknown;
};

// Text title displayed next to the logo in the navbar (e.g., "Nova", "Foundry"). Defaults to "".
export type NovaThemeConfigNavbarTitle = string | undefined;

// Hide the navbar when scrolling down. Defaults to false.
export type NovaThemeConfigNavbarHideOnScroll = boolean | undefined;

// Navbar items — links, dropdowns, docs, and search. Defaults to [].
export type NovaThemeConfigNavbarItems = NovaThemeConfigNavbarItem[] | undefined;

// Navbar configuration — title, items, and scroll behavior.
export type NovaThemeConfigNavbar = {
  title?: NovaThemeConfigNavbarTitle;
  hideOnScroll?: NovaThemeConfigNavbarHideOnScroll;
  items?: NovaThemeConfigNavbarItems;
  [key: string]: unknown;
} | undefined;

// Storage key for persisting the selected docs version. Defaults to "localStorage".
export type NovaThemeConfigDocsVersionPersistence = string | undefined;

// Allow users to collapse the entire sidebar. Defaults to false.
export type NovaThemeConfigDocsSidebarHideable = boolean | undefined;

// Auto-collapse other categories when opening one. Defaults to false.
export type NovaThemeConfigDocsSidebarAutoCollapseCategories = boolean | undefined;

// Docs sidebar behavior.
export type NovaThemeConfigDocsSidebar = {
  hideable?: NovaThemeConfigDocsSidebarHideable;
  autoCollapseCategories?: NovaThemeConfigDocsSidebarAutoCollapseCategories;
  [key: string]: unknown;
} | undefined;

// Docs theme configuration — version persistence and sidebar.
export type NovaThemeConfigDocs = {
  versionPersistence?: NovaThemeConfigDocsVersionPersistence;
  sidebar?: NovaThemeConfigDocsSidebar;
  [key: string]: unknown;
} | undefined;

// Group blog posts by year in the sidebar. Defaults to true.
export type NovaThemeConfigBlogSidebarGroupByYear = boolean | undefined;

// Blog sidebar behavior.
export type NovaThemeConfigBlogSidebar = {
  groupByYear?: NovaThemeConfigBlogSidebarGroupByYear;
  [key: string]: unknown;
} | undefined;

// Heading text on the blog list page (e.g., "Blog", "Changelog"). Defaults to "Blog".
export type NovaThemeConfigBlogLayoutHeading = string | undefined;

// Description text below the heading (e.g., "Updates and insights from the team"). Defaults to "".
export type NovaThemeConfigBlogLayoutDescription = string | undefined;

// Blog list page layout — heading and description.
export type NovaThemeConfigBlogLayout = {
  heading?: NovaThemeConfigBlogLayoutHeading;
  description?: NovaThemeConfigBlogLayoutDescription;
  [key: string]: unknown;
} | undefined;

// Blog theme configuration — sidebar and layout.
export type NovaThemeConfigBlog = {
  sidebar?: NovaThemeConfigBlogSidebar;
  layout?: NovaThemeConfigBlogLayout;
  [key: string]: unknown;
} | undefined;

// Minimum heading level to include (2 = h2, 3 = h3, etc.). Defaults to 2.
export type NovaThemeConfigTableOfContentsMinHeadingLevel = 2 | 3 | 4 | 5 | 6 | undefined;

// Maximum heading level to include (2 = h2, 3 = h3, etc.). Defaults to 3.
export type NovaThemeConfigTableOfContentsMaxHeadingLevel = 2 | 3 | 4 | 5 | 6 | undefined;

// Table of contents heading range.
export type NovaThemeConfigTableOfContents = {
  minHeadingLevel?: NovaThemeConfigTableOfContentsMinHeadingLevel;
  maxHeadingLevel?: NovaThemeConfigTableOfContentsMaxHeadingLevel;
} | undefined;

// Show a floating scroll-to-top button. Defaults to true.
export type NovaThemeConfigBackToTopButton = boolean | undefined;

// Unique ID — used to remember dismissal in localStorage.
export type NovaThemeConfigAnnouncementBarId = string;

// Banner content — supports HTML (e.g., "Check out our <a href="/blog">latest post</a>").
export type NovaThemeConfigAnnouncementBarContent = string;

// Background color — any CSS color (e.g., "#1a1a2e", "var(--custom-color)").
export type NovaThemeConfigAnnouncementBarBackgroundColor = string | undefined;

// Text color — any CSS color (e.g., "#ffffff").
export type NovaThemeConfigAnnouncementBarTextColor = string | undefined;

// Allow users to dismiss the banner. Defaults to true.
export type NovaThemeConfigAnnouncementBarIsCloseable = boolean | undefined;

// Announcement bar configuration.
export type NovaThemeConfigAnnouncementBar = {
  id: NovaThemeConfigAnnouncementBarId;
  content: NovaThemeConfigAnnouncementBarContent;
  backgroundColor?: NovaThemeConfigAnnouncementBarBackgroundColor;
  textColor?: NovaThemeConfigAnnouncementBarTextColor;
  isCloseable?: NovaThemeConfigAnnouncementBarIsCloseable;
} | undefined;

// Link text (e.g., "Terms of Use", "Privacy Policy").
export type NovaThemeConfigFooterSectionLinkLabel = string;

// Link destination — internal path or external URL (e.g., "/docs/getting-started/", "https://example.com").
export type NovaThemeConfigFooterSectionLinkHref = string;

// Single footer section link.
export type NovaThemeConfigFooterSectionLink = {
  label: NovaThemeConfigFooterSectionLinkLabel;
  href: NovaThemeConfigFooterSectionLinkHref;
};

// Column heading text (e.g., "Company", "Legal").
export type NovaThemeConfigFooterLayoutSlotTitle = string | undefined;

// Key from sections to display in this slot (e.g., "legal", "company").
export type NovaThemeConfigFooterLayoutSlotSection = string;

// Single footer layout slot — maps a section to a column.
export type NovaThemeConfigFooterLayoutSlot = {
  title?: NovaThemeConfigFooterLayoutSlotTitle;
  section: NovaThemeConfigFooterLayoutSlotSection;
};

// SVG path data (e.g., "<path d='M...' />").
export type NovaIconifyIconBody = string;

// Left offset of the viewBox. Defaults to 0.
export type NovaIconifyIconLeft = number | undefined;

// Top offset of the viewBox. Defaults to 0.
export type NovaIconifyIconTop = number | undefined;

// Width of the viewBox. Defaults to 16.
export type NovaIconifyIconWidth = number | undefined;

// Height of the viewBox. Defaults to 16.
export type NovaIconifyIconHeight = number | undefined;

// Number of 90-degree rotations (e.g., 0 = none, 1 = 90deg, 2 = 180deg). Defaults to 0.
export type NovaIconifyIconRotate = number | undefined;

// Horizontal flip. Defaults to false.
export type NovaIconifyIconHFlip = boolean | undefined;

// Vertical flip. Defaults to false.
export type NovaIconifyIconVFlip = boolean | undefined;

// Iconify icon definition with SVG path data and viewBox overrides.
export type NovaIconifyIcon = {
  body: NovaIconifyIconBody;
  left?: NovaIconifyIconLeft;
  top?: NovaIconifyIconTop;
  width?: NovaIconifyIconWidth;
  height?: NovaIconifyIconHeight;
  rotate?: NovaIconifyIconRotate;
  hFlip?: NovaIconifyIconHFlip;
  vFlip?: NovaIconifyIconVFlip;
};

// Iconify icon ID or object (e.g., "mdi:github", "ri:twitter-x-fill").
export type NovaThemeConfigFooterSocialLinkIcon = string | NovaIconifyIcon;

// Social profile URL (e.g., "https://github.com/cbnventures").
export type NovaThemeConfigFooterSocialLinkHref = string;

// Accessibility label for screen readers (e.g., "GitHub", "X").
export type NovaThemeConfigFooterSocialLinkLabel = string;

// Single footer social media link.
export type NovaThemeConfigFooterSocialLink = {
  icon: NovaThemeConfigFooterSocialLinkIcon;
  href: NovaThemeConfigFooterSocialLinkHref;
  label: NovaThemeConfigFooterSocialLinkLabel;
};

// Link sections — keyed by section name (e.g., { legal: [{ label: "Terms", href: "/terms/" }] }).
export type NovaThemeConfigFooterSections = Record<string, NovaThemeConfigFooterSectionLink[]> | undefined;

// Layout slots — keyed by slot name (e.g., { company: { title: "Company", section: "company" } }).
export type NovaThemeConfigFooterLayout = Record<string, NovaThemeConfigFooterLayoutSlot> | undefined;

// Social media icon links shown in the footer.
export type NovaThemeConfigFooterSocialLinks = NovaThemeConfigFooterSocialLink[] | undefined;

// Copyright text displayed in the footer (e.g., "Copyright 2025 Acme LLC."). Defaults to "".
export type NovaThemeConfigFooterCopyright = string | undefined;

// Show "Built with Nova" credit in the footer. Defaults to true.
export type NovaThemeConfigFooterCredit = boolean | undefined;

// Call-to-action text displayed in the footer (e.g., "Ready to deploy?", "Get started").
export type NovaThemeConfigFooterCta = string | undefined;

// Footer configuration. Set as false to disable the footer entirely. Defaults to false.
export type NovaThemeConfigFooter = {
  sections?: NovaThemeConfigFooterSections;
  layout?: NovaThemeConfigFooterLayout;
  socialLinks?: NovaThemeConfigFooterSocialLinks;
  copyright?: NovaThemeConfigFooterCopyright;
  credit?: NovaThemeConfigFooterCredit;
  cta?: NovaThemeConfigFooterCta;
  [key: string]: unknown;
} | false | undefined;

// Nova theme configuration — site, navbar, docs, blog, footer, and more.
export type NovaThemeConfig = {
  site?: NovaThemeConfigSite;
  colorMode?: NovaThemeConfigColorMode;
  navbar?: NovaThemeConfigNavbar;
  docs?: NovaThemeConfigDocs;
  blog?: NovaThemeConfigBlog;
  tableOfContents?: NovaThemeConfigTableOfContents;
  announcementBar?: NovaThemeConfigAnnouncementBar;
  backToTopButton?: NovaThemeConfigBackToTopButton;
  footer?: NovaThemeConfigFooter;
  [key: string]: unknown;
};

// Site title — used in metadata and browser tab (e.g., "Nova", "Foundry").
export type DocusaurusNovaConfigTitle = string;

// Site URL — top-level hostname (e.g., "https://nova.cbnventures.io").
export type DocusaurusNovaConfigUrl = string;

// Path after the host (e.g., "/", "/my-site/"). Must start and end with "/".
export type DocusaurusNovaConfigBaseUrl = string;

// Site favicon — file path relative to site dir (e.g., "./favicon.ico").
export type DocusaurusNovaConfigFavicon = string | undefined;

// Delimiter between page title and site title in <title> tag. Defaults to "|".
export type DocusaurusNovaConfigTitleDelimiter = string | undefined;

// Site tagline used in metadata. Defaults to "".
export type DocusaurusNovaConfigTagline = string | undefined;

// Trailing slash behavior. undefined = keep as-is, true = add, false = remove.
export type DocusaurusNovaConfigTrailingSlash = boolean | undefined;

// Add noindex meta tag to prevent search engine indexing. Defaults to false.
export type DocusaurusNovaConfigNoIndex = boolean | undefined;

// Behavior when broken links are detected. Defaults to "throw".
export type DocusaurusNovaConfigOnBrokenLinks = ReportingSeverity | undefined;

// Behavior when broken anchors are detected. Defaults to "warn".
export type DocusaurusNovaConfigOnBrokenAnchors = ReportingSeverity | undefined;

// Behavior when duplicate routes are detected. Defaults to "warn".
export type DocusaurusNovaConfigOnDuplicateRoutes = ReportingSeverity | undefined;

// GitHub organization or user that owns the repository (e.g., "cbnventures").
export type DocusaurusNovaConfigOrganizationName = string | undefined;

// GitHub repository name (e.g., "nova", "demo-foundry").
export type DocusaurusNovaConfigProjectName = string | undefined;

// Branch for static file deployment (e.g., "gh-pages").
export type DocusaurusNovaConfigDeploymentBranch = string | undefined;

// GitHub Enterprise hostname (e.g., "github.com").
export type DocusaurusNovaConfigGithubHost = string | undefined;

// GitHub Enterprise port (e.g., "443").
export type DocusaurusNovaConfigGithubPort = string | undefined;

// Directories copied to build output as-is (e.g., ["static"]).
export type DocusaurusNovaConfigStaticDirectories = string[] | undefined;

// Show a banner when CSS/JS fails to load due to wrong baseUrl. Defaults to true.
export type DocusaurusNovaConfigBaseUrlIssueBanner = boolean | undefined;

// Script tag — either a URL string or an object with src and attributes.
export type NovaScriptTag = string | {
  src: string;
  [key: string]: string | boolean | undefined;
};

// Stylesheet tag — either a URL string or an object with href and attributes.
export type NovaStylesheetTag = string | {
  href: string;
  [key: string]: string | boolean | undefined;
};

// Script tags injected into <head>. Defaults to [].
export type DocusaurusNovaConfigScripts = NovaScriptTag[] | undefined;

// Stylesheet tags injected into <head>. Defaults to [].
export type DocusaurusNovaConfigStylesheets = NovaStylesheetTag[] | undefined;

// Module paths loaded on every page. Defaults to [].
export type DocusaurusNovaConfigClientModules = string[] | undefined;

// Plugin reference — package name, [name, options] tuple, false to disable, or null.
export type NovaPluginConfig = string | [string, Record<string, unknown>] | false | null;

// Additional Docusaurus themes (e.g., "@docusaurus/theme-mermaid"). Defaults to [].
export type DocusaurusNovaConfigThemes = NovaPluginConfig[] | undefined;

// Custom fields — arbitrary data accessible via useDocusaurusContext().
export type DocusaurusNovaConfigCustomFields = Record<string, unknown> | undefined;

// HTML tag name (e.g., "meta", "link", "script").
export type NovaHtmlTagTagName = string;

// Key-value pairs for HTML attributes (e.g., { rel: "icon", href: "/favicon.ico" }).
export type NovaHtmlTagAttributes = Record<string, string | boolean> | undefined;

// Raw HTML content inside the tag (e.g., "console.log('hello')" for a script tag).
export type NovaHtmlTagInnerHTML = string | undefined;

// HTML tag with name, attributes, and optional inner content.
export type NovaHtmlTag = {
  tagName: NovaHtmlTagTagName;
  attributes?: NovaHtmlTagAttributes;
  innerHTML?: NovaHtmlTagInnerHTML;
};

// HTML tags injected into <head> (e.g., meta, link, script). Defaults to [].
export type DocusaurusNovaConfigHeadTags = NovaHtmlTag[] | undefined;

// Display label for the locale dropdown (e.g., "English", "Français").
export type NovaI18nLocaleConfigLabel = string;

// BCP 47 language tag for <html lang="..."> (e.g., "en-US", "fr-FR").
export type NovaI18nLocaleConfigHtmlLang = string;

// Text direction.
export type NovaI18nLocaleConfigDirection = 'ltr' | 'rtl';

// Unicode calendar identifier (e.g., "gregory", "japanese", "islamic").
export type NovaI18nLocaleConfigCalendar = string;

// Folder name inside the i18n directory (e.g., "en", "fr").
export type NovaI18nLocaleConfigPath = string;

// Per-locale configuration.
export type NovaI18nLocaleConfig = {
  label?: NovaI18nLocaleConfigLabel;
  htmlLang?: NovaI18nLocaleConfigHtmlLang;
  direction?: NovaI18nLocaleConfigDirection;
  calendar?: NovaI18nLocaleConfigCalendar;
  path?: NovaI18nLocaleConfigPath;
};

// Default locale code (e.g., "en", "fr", "ja").
export type NovaI18nConfigDefaultLocale = string;

// Root folder for translation files (e.g., "i18n", "translations").
export type NovaI18nConfigPath = string;

// List of locale codes to deploy (e.g., ["en"], ["en", "fr", "ja"]).
export type NovaI18nConfigLocales = string[];

// Per-locale configuration keyed by locale code.
export type NovaI18nConfigLocaleConfigs = Record<string, NovaI18nLocaleConfig>;

// Internationalization configuration.
export type NovaI18nConfig = {
  defaultLocale?: NovaI18nConfigDefaultLocale;
  path?: NovaI18nConfigPath;
  locales?: NovaI18nConfigLocales;
  localeConfigs?: NovaI18nConfigLocaleConfigs;
} | undefined;

// Internationalization configuration.
export type DocusaurusNovaConfigI18n = NovaI18nConfig;

// Markdown format. Defaults to "mdx".
export type NovaMarkdownConfigFormat = 'mdx' | 'md' | 'detect';

// Enable Mermaid diagram rendering in code blocks. Defaults to false.
export type NovaMarkdownConfigMermaid = boolean;

// Enable emoji shortcode conversion. Defaults to true.
export type NovaMarkdownConfigEmoji = boolean;

// MDX 1 compatibility flags.
export type NovaMarkdownMdx1CompatComments = boolean;

// Enable MDX 1 admonition syntax compatibility.
export type NovaMarkdownMdx1CompatAdmonitions = boolean;

// Enable MDX 1 heading ID compatibility.
export type NovaMarkdownMdx1CompatHeadingIds = boolean;

// MDX 1 backward compatibility flags.
export type NovaMarkdownMdx1Compat = {
  comments?: NovaMarkdownMdx1CompatComments;
  admonitions?: NovaMarkdownMdx1CompatAdmonitions;
  headingIds?: NovaMarkdownMdx1CompatHeadingIds;
};

// Preserve heading text case when generating anchor IDs. Defaults to false.
export type NovaMarkdownAnchorsConfigMaintainCase = boolean;

// Markdown anchor generation options.
export type NovaMarkdownAnchorsConfig = {
  maintainCase?: NovaMarkdownAnchorsConfigMaintainCase;
};

// Behavior when broken Markdown links are detected. Defaults to "warn".
export type NovaMarkdownHooksOnBrokenMarkdownLinks = ReportingSeverity;

// Behavior when broken Markdown images are detected. Defaults to "throw".
export type NovaMarkdownHooksOnBrokenMarkdownImages = ReportingSeverity;

// Markdown error handling hooks.
export type NovaMarkdownHooks = {
  onBrokenMarkdownLinks?: NovaMarkdownHooksOnBrokenMarkdownLinks;
  onBrokenMarkdownImages?: NovaMarkdownHooksOnBrokenMarkdownImages;
};

// Markdown processing configuration.
export type NovaMarkdownConfig = {
  format?: NovaMarkdownConfigFormat;
  mermaid?: NovaMarkdownConfigMermaid;
  emoji?: NovaMarkdownConfigEmoji;
  mdx1Compat?: NovaMarkdownMdx1Compat;
  anchors?: NovaMarkdownAnchorsConfig;
  hooks?: NovaMarkdownHooks;
} | undefined;

// Markdown processing configuration.
export type DocusaurusNovaConfigMarkdown = NovaMarkdownConfig;

// Nova preset configuration — [presetPackageName, presetOptions] tuples.
export type DocusaurusNovaConfigPresets = (['@cbnventures/docusaurus-preset-nova', NovaPresetOptions] | [string, Record<string, unknown>])[] | undefined;

// Docusaurus plugin configuration. Defaults to [].
export type DocusaurusNovaConfigPlugins = NovaPluginConfig[] | undefined;

// Nova theme configuration — site identity, navbar, footer, docs, blog.
export type DocusaurusNovaConfigThemeConfig = NovaThemeConfig | undefined;

// Opt-in flags for Docusaurus v4 breaking changes.
export type DocusaurusNovaConfigFutureV4 = Partial<FutureV4Config> | undefined;

// Future flags for upcoming breaking changes.
export type DocusaurusNovaConfigFuture = {
  v4?: DocusaurusNovaConfigFutureV4;
} | undefined;

// Custom Eta HTML template for server-side rendering.
export type DocusaurusNovaConfigSsrTemplate = string | undefined;

// Webpack JS loader — "babel" for default, or a function returning a custom RuleSetRule.
export type DocusaurusNovaConfigWebpack = {
  jsLoader?: 'babel' | ((isServer: boolean) => Record<string, unknown>);
} | undefined;

// Top-level Docusaurus configuration for a Nova-powered site.
export type DocusaurusNovaConfig = {
  title: DocusaurusNovaConfigTitle;
  url: DocusaurusNovaConfigUrl;
  baseUrl: DocusaurusNovaConfigBaseUrl;
  favicon?: DocusaurusNovaConfigFavicon;
  titleDelimiter?: DocusaurusNovaConfigTitleDelimiter;
  tagline?: DocusaurusNovaConfigTagline;
  trailingSlash?: DocusaurusNovaConfigTrailingSlash;
  noIndex?: DocusaurusNovaConfigNoIndex;
  onBrokenLinks?: DocusaurusNovaConfigOnBrokenLinks;
  onBrokenAnchors?: DocusaurusNovaConfigOnBrokenAnchors;
  onDuplicateRoutes?: DocusaurusNovaConfigOnDuplicateRoutes;
  organizationName?: DocusaurusNovaConfigOrganizationName;
  projectName?: DocusaurusNovaConfigProjectName;
  deploymentBranch?: DocusaurusNovaConfigDeploymentBranch;
  githubHost?: DocusaurusNovaConfigGithubHost;
  githubPort?: DocusaurusNovaConfigGithubPort;
  staticDirectories?: DocusaurusNovaConfigStaticDirectories;
  baseUrlIssueBanner?: DocusaurusNovaConfigBaseUrlIssueBanner;
  scripts?: DocusaurusNovaConfigScripts;
  stylesheets?: DocusaurusNovaConfigStylesheets;
  clientModules?: DocusaurusNovaConfigClientModules;
  themes?: DocusaurusNovaConfigThemes;
  customFields?: DocusaurusNovaConfigCustomFields;
  headTags?: DocusaurusNovaConfigHeadTags;
  i18n?: DocusaurusNovaConfigI18n;
  markdown?: DocusaurusNovaConfigMarkdown;
  presets?: DocusaurusNovaConfigPresets;
  plugins?: DocusaurusNovaConfigPlugins;
  themeConfig?: DocusaurusNovaConfigThemeConfig;
  future?: DocusaurusNovaConfigFuture;
  ssrTemplate?: DocusaurusNovaConfigSsrTemplate;
  webpack?: DocusaurusNovaConfigWebpack;
};

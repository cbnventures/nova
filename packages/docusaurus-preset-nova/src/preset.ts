import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { resolveModulePath } from './lib/module-loader.js';
import { rehypeShiki } from './lib/rehype-shiki.js';
import { getShikiThemes } from './lib/shiki-themes.js';

import type {
  Preset_Preset_AnalyticsOptions,
  Preset_Preset_BlogPlugin,
  Preset_Preset_BlogRehypePlugins,
  Preset_Preset_BundleGuardPlugin,
  Preset_Preset_Context,
  Preset_Preset_CurrentDirectory,
  Preset_Preset_CurrentFilePath,
  Preset_Preset_DocsPlugin,
  Preset_Preset_DocsRehypePlugins,
  Preset_Preset_GtmPlugin,
  Preset_Preset_IconsPlugin,
  Preset_Preset_MergedBlogBeforeDefaultRehypePlugins,
  Preset_Preset_MergedBlogOptions,
  Preset_Preset_MergedDocsBeforeDefaultRehypePlugins,
  Preset_Preset_MergedDocsOptions,
  Preset_Preset_MergedPagesBeforeDefaultRehypePlugins,
  Preset_Preset_MergedPagesOptions,
  Preset_Preset_MermaidTooltipPlugin,
  Preset_Preset_NovaTheme,
  Preset_Preset_Options,
  Preset_Preset_PagesPlugin,
  Preset_Preset_PagesRehypePlugins,
  Preset_Preset_PluginOptions,
  Preset_Preset_Plugins,
  Preset_Preset_RehypePlugin,
  Preset_Preset_Returns,
  Preset_Preset_ShikiThemes,
  Preset_Preset_SitemapPlugin,
  Preset_Preset_SvgrPlugin,
  Preset_Preset_ThemeOptions,
  Preset_Preset_ThemePath,
  Preset_Preset_Themes,
} from './types/preset.d.ts';

/**
 * Preset.
 *
 * Docusaurus preset factory function that assembles the full plugin and
 * theme stack from a single options object, forwarding each section to its
 * corresponding Docusaurus plugin.
 *
 * @param {Preset_Preset_Context} _context - _context.
 * @param {Preset_Preset_Options} options  - Options.
 *
 * @returns {Preset_Preset_Returns}
 *
 * @since 0.15.0
 */
function preset(_context: Preset_Preset_Context, options: Preset_Preset_Options): Preset_Preset_Returns {
  const plugins: Preset_Preset_Plugins = [];
  const themes: Preset_Preset_Themes = [];
  const pluginOptions: Preset_Preset_PluginOptions = options['plugins'] ?? {};
  const analyticsOptions: Preset_Preset_AnalyticsOptions = options['analytics'] ?? {};

  // Resolve the directory of this compiled preset module so local plugin and
  // theme paths can be constructed without a runtime file-existence check that
  // fails before the `.js` build output has been emitted.
  const currentFilePath: Preset_Preset_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentDirectory: Preset_Preset_CurrentDirectory = dirname(currentFilePath);

  // Resolve Shiki themes and create the rehype plugin config.
  const shikiThemes: Preset_Preset_ShikiThemes = getShikiThemes(options['preset']);
  const rehypePlugin: Preset_Preset_RehypePlugin = [
    rehypeShiki,
    shikiThemes,
  ];

  // Docs plugin (always included).
  const docsRehypePlugins: Preset_Preset_DocsRehypePlugins = (pluginOptions['docs'] ?? {})['beforeDefaultRehypePlugins'] as Preset_Preset_DocsRehypePlugins ?? [];
  const mergedDocsBeforeDefaultRehypePlugins: Preset_Preset_MergedDocsBeforeDefaultRehypePlugins = [
    rehypePlugin,
    ...docsRehypePlugins,
  ];
  const mergedDocsOptions: Preset_Preset_MergedDocsOptions = {
    ...(pluginOptions['docs'] ?? {}),
    beforeDefaultRehypePlugins: mergedDocsBeforeDefaultRehypePlugins,
  };
  const docsPlugin: Preset_Preset_DocsPlugin = [
    resolveModulePath('@docusaurus/plugin-content-docs'),
    mergedDocsOptions,
  ];

  plugins.push(docsPlugin);

  // Blog plugin (unless blog: false).
  if (pluginOptions['blog'] !== false) {
    const blogRehypePlugins: Preset_Preset_BlogRehypePlugins = (pluginOptions['blog'] ?? {})['beforeDefaultRehypePlugins'] as Preset_Preset_BlogRehypePlugins ?? [];
    const mergedBlogBeforeDefaultRehypePlugins: Preset_Preset_MergedBlogBeforeDefaultRehypePlugins = [
      rehypePlugin,
      ...blogRehypePlugins,
    ];
    const mergedBlogOptions: Preset_Preset_MergedBlogOptions = {
      ...(pluginOptions['blog'] ?? {}),
      beforeDefaultRehypePlugins: mergedBlogBeforeDefaultRehypePlugins,
    };
    const blogPlugin: Preset_Preset_BlogPlugin = [
      resolveModulePath('@docusaurus/plugin-content-blog'),
      mergedBlogOptions,
    ];

    plugins.push(blogPlugin);
  }

  // Pages plugin (unless pages: false).
  if (pluginOptions['pages'] !== false) {
    const pagesRehypePlugins: Preset_Preset_PagesRehypePlugins = (pluginOptions['pages'] ?? {})['beforeDefaultRehypePlugins'] as Preset_Preset_PagesRehypePlugins ?? [];
    const mergedPagesBeforeDefaultRehypePlugins: Preset_Preset_MergedPagesBeforeDefaultRehypePlugins = [
      rehypePlugin,
      ...pagesRehypePlugins,
    ];
    const mergedPagesOptions: Preset_Preset_MergedPagesOptions = {
      ...(pluginOptions['pages'] ?? {}),
      beforeDefaultRehypePlugins: mergedPagesBeforeDefaultRehypePlugins,
    };
    const pagesPlugin: Preset_Preset_PagesPlugin = [
      resolveModulePath('@docusaurus/plugin-content-pages'),
      mergedPagesOptions,
    ];

    plugins.push(pagesPlugin);
  }

  // Sitemap plugin (unless sitemap: false).
  if (pluginOptions['sitemap'] !== false) {
    const sitemapPlugin: Preset_Preset_SitemapPlugin = [
      resolveModulePath('@docusaurus/plugin-sitemap'),
      pluginOptions['sitemap'] ?? {},
    ];

    plugins.push(sitemapPlugin);
  }

  // SVGR plugin (always included).
  const svgrPlugin: Preset_Preset_SvgrPlugin = resolveModulePath('@docusaurus/plugin-svgr');

  plugins.push(svgrPlugin);

  // Mermaid runtime tooltip handler (always included). Adds the small
  // client-side script that turns the `title` attribute Mermaid emits on
  // clickable nodes into the styled `div.mermaidTooltip` on hover, matching
  // the styling already provided by `theme/Mermaid/style.css`.
  const mermaidTooltipPlugin: Preset_Preset_MermaidTooltipPlugin = resolve(currentDirectory, 'plugins/mermaid-tooltip/index.js');

  plugins.push(mermaidTooltipPlugin);

  // Icon scan plugin (always included). Discovers every Iconify identifier the
  // site references and generates a client module registering only those icons,
  // so whole Iconify collections are never bundled into the browser entry.
  const iconsPlugin: Preset_Preset_IconsPlugin = [
    resolve(currentDirectory, 'plugins/icons/index.js'),
    {
      iconSafelist: options['iconSafelist'],
    },
  ];

  plugins.push(iconsPlugin);

  // Bundle size guard (always included). Fails the production build if any
  // emitted JavaScript bundle file exceeds the configured size limit, so a
  // bundle-size regression is caught before it ships.
  const bundleGuardPlugin: Preset_Preset_BundleGuardPlugin = [
    resolve(currentDirectory, 'plugins/bundle-guard/index.js'),
    {
      maxBundleFileSize: options['maxBundleFileSize'],
    },
  ];

  plugins.push(bundleGuardPlugin);

  // Google Tag Manager plugin (if gtm option provided).
  if (analyticsOptions['gtm'] !== undefined) {
    const gtmPlugin: Preset_Preset_GtmPlugin = [
      resolveModulePath('@docusaurus/plugin-google-tag-manager'),
      analyticsOptions['gtm'],
    ];

    plugins.push(gtmPlugin);
  }

  // Nova theme (always included).
  const themeOptions: Preset_Preset_ThemeOptions = {
    preset: options['preset'],
    overrides: options['overrides'],
    persistentCache: options['persistentCache'],
    progressBar: options['progressBar'],
    search: options['search'],
  };
  const themePath: Preset_Preset_ThemePath = resolve(currentDirectory, 'index.js');
  const novaTheme: Preset_Preset_NovaTheme = [
    themePath,
    themeOptions,
  ];

  themes.push(novaTheme);

  return {
    plugins,
    themes,
  };
}

export default preset;

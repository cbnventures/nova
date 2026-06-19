import { dirname, resolve } from 'node:path';

import { rehypeShiki } from './lib/rehype-shiki.js';
import { getShikiThemes } from './lib/shiki-themes.js';

import type {
  Preset_Preset_BlogPlugin,
  Preset_Preset_BlogRehypePlugins,
  Preset_Preset_Context,
  Preset_Preset_CurrentDirectory,
  Preset_Preset_DocsPlugin,
  Preset_Preset_DocsRehypePlugins,
  Preset_Preset_GtmPlugin,
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

  // Resolve the directory of this compiled preset module so local plugin and
  // theme paths can be constructed without `require.resolve`, which performs
  // a runtime file-existence check that fails in TypeScript test runners
  // where the `.js` build output has not been emitted yet.
  const currentDirectory: Preset_Preset_CurrentDirectory = dirname(__filename);

  // Resolve Shiki themes and create the rehype plugin config.
  const shikiThemes: Preset_Preset_ShikiThemes = getShikiThemes(options['preset']);
  const rehypePlugin: Preset_Preset_RehypePlugin = [
    rehypeShiki,
    shikiThemes,
  ];

  // Docs plugin (always included).
  const docsRehypePlugins: Preset_Preset_DocsRehypePlugins = (options['plugins']['docs'] ?? {})['beforeDefaultRehypePlugins'] as Preset_Preset_DocsRehypePlugins ?? [];
  const mergedDocsBeforeDefaultRehypePlugins: Preset_Preset_MergedDocsBeforeDefaultRehypePlugins = [
    rehypePlugin,
    ...docsRehypePlugins,
  ];
  const mergedDocsOptions: Preset_Preset_MergedDocsOptions = {
    ...(options['plugins']['docs'] ?? {}),
    beforeDefaultRehypePlugins: mergedDocsBeforeDefaultRehypePlugins,
  };
  const docsPlugin: Preset_Preset_DocsPlugin = [
    require.resolve('@docusaurus/plugin-content-docs'),
    mergedDocsOptions,
  ];

  plugins.push(docsPlugin);

  // Blog plugin (unless blog: false).
  if (options['plugins']['blog'] !== false) {
    const blogRehypePlugins: Preset_Preset_BlogRehypePlugins = (options['plugins']['blog'] ?? {})['beforeDefaultRehypePlugins'] as Preset_Preset_BlogRehypePlugins ?? [];
    const mergedBlogBeforeDefaultRehypePlugins: Preset_Preset_MergedBlogBeforeDefaultRehypePlugins = [
      rehypePlugin,
      ...blogRehypePlugins,
    ];
    const mergedBlogOptions: Preset_Preset_MergedBlogOptions = {
      ...(options['plugins']['blog'] ?? {}),
      beforeDefaultRehypePlugins: mergedBlogBeforeDefaultRehypePlugins,
    };
    const blogPlugin: Preset_Preset_BlogPlugin = [
      require.resolve('@docusaurus/plugin-content-blog'),
      mergedBlogOptions,
    ];

    plugins.push(blogPlugin);
  }

  // Pages plugin (unless pages: false).
  if (options['plugins']['pages'] !== false) {
    const pagesRehypePlugins: Preset_Preset_PagesRehypePlugins = (options['plugins']['pages'] ?? {})['beforeDefaultRehypePlugins'] as Preset_Preset_PagesRehypePlugins ?? [];
    const mergedPagesBeforeDefaultRehypePlugins: Preset_Preset_MergedPagesBeforeDefaultRehypePlugins = [
      rehypePlugin,
      ...pagesRehypePlugins,
    ];
    const mergedPagesOptions: Preset_Preset_MergedPagesOptions = {
      ...(options['plugins']['pages'] ?? {}),
      beforeDefaultRehypePlugins: mergedPagesBeforeDefaultRehypePlugins,
    };
    const pagesPlugin: Preset_Preset_PagesPlugin = [
      require.resolve('@docusaurus/plugin-content-pages'),
      mergedPagesOptions,
    ];

    plugins.push(pagesPlugin);
  }

  // Sitemap plugin (unless sitemap: false).
  if (options['plugins']['sitemap'] !== false) {
    const sitemapPlugin: Preset_Preset_SitemapPlugin = [
      require.resolve('@docusaurus/plugin-sitemap'),
      options['plugins']['sitemap'] ?? {},
    ];

    plugins.push(sitemapPlugin);
  }

  // SVGR plugin (always included).
  const svgrPlugin: Preset_Preset_SvgrPlugin = require.resolve('@docusaurus/plugin-svgr');

  plugins.push(svgrPlugin);

  // Mermaid runtime tooltip handler (always included). Adds the small
  // client-side script that turns the `title` attribute Mermaid emits on
  // clickable nodes into the styled `div.mermaidTooltip` on hover, matching
  // the styling already provided by `theme/Mermaid/style.css`.
  const mermaidTooltipPlugin: Preset_Preset_MermaidTooltipPlugin = resolve(currentDirectory, 'plugins/mermaid-tooltip/index.js');

  plugins.push(mermaidTooltipPlugin);

  // Google Tag Manager plugin (if gtm option provided).
  if (options['analytics']['gtm'] !== undefined) {
    const gtmPlugin: Preset_Preset_GtmPlugin = [
      require.resolve('@docusaurus/plugin-google-tag-manager'),
      options['analytics']['gtm'],
    ];

    plugins.push(gtmPlugin);
  }

  // Nova theme (always included).
  const themeOptions: Preset_Preset_ThemeOptions = {
    preset: options['preset'],
    overrides: options['overrides'],
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

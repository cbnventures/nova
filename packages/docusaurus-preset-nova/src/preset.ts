import { dirname, resolve } from 'node:path';

import { rehypeShiki } from './lib/rehype-shiki.js';
import { getShikiThemes } from './lib/shiki-themes.js';

import type {
  PresetPresetBlogPlugin,
  PresetPresetBlogRehypePlugins,
  PresetPresetContext,
  PresetPresetDocsPlugin,
  PresetPresetDocsRehypePlugins,
  PresetPresetGtmPlugin,
  PresetPresetMergedBlogOptions,
  PresetPresetMergedBlogOptionsBeforeDefaultRehypePlugins,
  PresetPresetMergedDocsOptions,
  PresetPresetMergedDocsOptionsBeforeDefaultRehypePlugins,
  PresetPresetMergedPagesOptions,
  PresetPresetMergedPagesOptionsBeforeDefaultRehypePlugins,
  PresetPresetNovaTheme,
  PresetPresetOptions,
  PresetPresetPagesPlugin,
  PresetPresetPagesRehypePlugins,
  PresetPresetPlugins,
  PresetPresetRehypePlugin,
  PresetPresetReturns,
  PresetPresetShikiThemes,
  PresetPresetSitemapPlugin,
  PresetPresetSvgrPlugin,
  PresetPresetThemeOptions,
  PresetPresetThemePath,
  PresetPresetThemes,
} from './types/preset.d.ts';

/**
 * Preset.
 *
 * Docusaurus preset factory function that assembles the full plugin and
 * theme stack from a single options object, forwarding each section to its
 * corresponding Docusaurus plugin.
 *
 * @param {PresetPresetContext} _context - _context.
 * @param {PresetPresetOptions} options  - Options.
 *
 * @returns {PresetPresetReturns}
 *
 * @since 0.15.0
 */
function preset(_context: PresetPresetContext, options: PresetPresetOptions): PresetPresetReturns {
  const plugins: PresetPresetPlugins = [];
  const themes: PresetPresetThemes = [];

  // Resolve Shiki themes and create the rehype plugin config.
  const shikiThemes: PresetPresetShikiThemes = getShikiThemes(options['preset']);
  const rehypePlugin: PresetPresetRehypePlugin = [
    rehypeShiki,
    shikiThemes,
  ];

  // Docs plugin (always included).
  const docsRehypePlugins: PresetPresetDocsRehypePlugins = (options['plugins']['docs'] ?? {})['beforeDefaultRehypePlugins'] as PresetPresetDocsRehypePlugins ?? [];
  const mergedDocsBeforeDefaultRehypePlugins: PresetPresetMergedDocsOptionsBeforeDefaultRehypePlugins = [
    rehypePlugin,
    ...docsRehypePlugins,
  ];
  const mergedDocsOptions: PresetPresetMergedDocsOptions = {
    ...(options['plugins']['docs'] ?? {}),
    beforeDefaultRehypePlugins: mergedDocsBeforeDefaultRehypePlugins,
  };
  const docsPlugin: PresetPresetDocsPlugin = [
    require.resolve('@docusaurus/plugin-content-docs'),
    mergedDocsOptions,
  ];

  plugins.push(docsPlugin);

  // Blog plugin (unless blog: false).
  if (options['plugins']['blog'] !== false) {
    const blogRehypePlugins: PresetPresetBlogRehypePlugins = (options['plugins']['blog'] ?? {})['beforeDefaultRehypePlugins'] as PresetPresetBlogRehypePlugins ?? [];
    const mergedBlogBeforeDefaultRehypePlugins: PresetPresetMergedBlogOptionsBeforeDefaultRehypePlugins = [
      rehypePlugin,
      ...blogRehypePlugins,
    ];
    const mergedBlogOptions: PresetPresetMergedBlogOptions = {
      ...(options['plugins']['blog'] ?? {}),
      beforeDefaultRehypePlugins: mergedBlogBeforeDefaultRehypePlugins,
    };
    const blogPlugin: PresetPresetBlogPlugin = [
      require.resolve('@docusaurus/plugin-content-blog'),
      mergedBlogOptions,
    ];

    plugins.push(blogPlugin);
  }

  // Pages plugin (unless pages: false).
  if (options['plugins']['pages'] !== false) {
    const pagesRehypePlugins: PresetPresetPagesRehypePlugins = (options['plugins']['pages'] ?? {})['beforeDefaultRehypePlugins'] as PresetPresetPagesRehypePlugins ?? [];
    const mergedPagesBeforeDefaultRehypePlugins: PresetPresetMergedPagesOptionsBeforeDefaultRehypePlugins = [
      rehypePlugin,
      ...pagesRehypePlugins,
    ];
    const mergedPagesOptions: PresetPresetMergedPagesOptions = {
      ...(options['plugins']['pages'] ?? {}),
      beforeDefaultRehypePlugins: mergedPagesBeforeDefaultRehypePlugins,
    };
    const pagesPlugin: PresetPresetPagesPlugin = [
      require.resolve('@docusaurus/plugin-content-pages'),
      mergedPagesOptions,
    ];

    plugins.push(pagesPlugin);
  }

  // Sitemap plugin (unless sitemap: false).
  if (options['plugins']['sitemap'] !== false) {
    const sitemapPlugin: PresetPresetSitemapPlugin = [
      require.resolve('@docusaurus/plugin-sitemap'),
      options['plugins']['sitemap'] ?? {},
    ];

    plugins.push(sitemapPlugin);
  }

  // SVGR plugin (always included).
  const svgrPlugin: PresetPresetSvgrPlugin = require.resolve('@docusaurus/plugin-svgr');

  plugins.push(svgrPlugin);

  // Google Tag Manager plugin (if gtm option provided).
  if (options['analytics']['gtm'] !== undefined) {
    const gtmPlugin: PresetPresetGtmPlugin = [
      require.resolve('@docusaurus/plugin-google-tag-manager'),
      options['analytics']['gtm'],
    ];

    plugins.push(gtmPlugin);
  }

  // Nova theme (always included).
  const themeOptions: PresetPresetThemeOptions = {
    preset: options['preset'],
    overrides: options['overrides'],
    progressBar: options['progressBar'],
    search: options['search'],
  };
  const currentDirectory: PresetPresetThemePath = dirname(__filename);
  const themePath: PresetPresetThemePath = resolve(currentDirectory, 'index.js');
  const novaTheme: PresetPresetNovaTheme = [
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

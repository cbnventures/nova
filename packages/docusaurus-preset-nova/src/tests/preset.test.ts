import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import preset from '../preset.js';

import type {
  Tests_Preset_Preset_ExcludesBlogPluginWhenBlogIsFalse_PluginCount,
  Tests_Preset_Preset_ExcludesBlogPluginWhenBlogIsFalse_Result,
  Tests_Preset_Preset_ExcludesGtmPluginWhenGtmIsUndefined_PluginCount,
  Tests_Preset_Preset_ExcludesGtmPluginWhenGtmIsUndefined_Result,
  Tests_Preset_Preset_ExcludesPagesPluginWhenPagesIsFalse_PluginCount,
  Tests_Preset_Preset_ExcludesPagesPluginWhenPagesIsFalse_Result,
  Tests_Preset_Preset_ExcludesSearchThemeWhenSearchIsFalse_Result,
  Tests_Preset_Preset_ExcludesSearchThemeWhenSearchIsFalse_ThemeCount,
  Tests_Preset_Preset_ExcludesSitemapPluginWhenSitemapIsFalse_PluginCount,
  Tests_Preset_Preset_ExcludesSitemapPluginWhenSitemapIsFalse_Result,
  Tests_Preset_Preset_IncludesGtmPluginWhenGtmIsProvided_PluginCount,
  Tests_Preset_Preset_IncludesGtmPluginWhenGtmIsProvided_Result,
  Tests_Preset_Preset_PassesSearchConfigToNovaThemeWhenSearchIsProvided_Result,
  Tests_Preset_Preset_PassesSearchConfigToNovaThemeWhenSearchIsProvided_ThemeCount,
  Tests_Preset_Preset_ReturnsDocsBlogPagesSitemapSvgrPluginsAndNovaThemeByDefault_PluginCount,
  Tests_Preset_Preset_ReturnsDocsBlogPagesSitemapSvgrPluginsAndNovaThemeByDefault_Result,
  Tests_Preset_Preset_ReturnsDocsBlogPagesSitemapSvgrPluginsAndNovaThemeByDefault_ThemeCount,
} from '../types/tests/preset.test.d.ts';

/**
 * Tests - Preset.
 *
 * @since 0.15.0
 */
describe('preset', async () => {
  it('returns docs, blog, pages, sitemap, svgr plugins and nova theme by default', () => {
    const result: Tests_Preset_Preset_ReturnsDocsBlogPagesSitemapSvgrPluginsAndNovaThemeByDefault_Result = preset(
      { siteDir: '/mock' },
      {
        preset: 'foundry',
        overrides: undefined,
        plugins: {
          docs: undefined,
          blog: undefined,
          pages: undefined,
          sitemap: undefined,
        },
        analytics: {
          gtm: undefined,
        },
        search: undefined,
        progressBar: undefined,
      },
    );

    const pluginCount: Tests_Preset_Preset_ReturnsDocsBlogPagesSitemapSvgrPluginsAndNovaThemeByDefault_PluginCount = result['plugins'].length;
    const themeCount: Tests_Preset_Preset_ReturnsDocsBlogPagesSitemapSvgrPluginsAndNovaThemeByDefault_ThemeCount = result['themes'].length;

    // Docs, blog, pages, sitemap, svgr, mermaid-tooltip, icons, bundle-guard.
    strictEqual(pluginCount, 8);

    // Nova theme (Mermaid is now integrated natively).
    strictEqual(themeCount, 1);

    return;
  });

  it('excludes blog plugin when blog is false', () => {
    const result: Tests_Preset_Preset_ExcludesBlogPluginWhenBlogIsFalse_Result = preset(
      { siteDir: '/mock' },
      {
        preset: 'foundry',
        overrides: undefined,
        plugins: {
          docs: undefined,
          blog: false,
          pages: undefined,
          sitemap: undefined,
        },
        analytics: {
          gtm: undefined,
        },
        search: undefined,
        progressBar: undefined,
      },
    );

    const pluginCount: Tests_Preset_Preset_ExcludesBlogPluginWhenBlogIsFalse_PluginCount = result['plugins'].length;

    // Docs, pages, sitemap, svgr, mermaid-tooltip, icons, bundle-guard (no blog).
    strictEqual(pluginCount, 7);

    return;
  });

  it('excludes pages plugin when pages is false', () => {
    const result: Tests_Preset_Preset_ExcludesPagesPluginWhenPagesIsFalse_Result = preset(
      { siteDir: '/mock' },
      {
        preset: 'foundry',
        overrides: undefined,
        plugins: {
          docs: undefined,
          blog: undefined,
          pages: false,
          sitemap: undefined,
        },
        analytics: {
          gtm: undefined,
        },
        search: undefined,
        progressBar: undefined,
      },
    );

    const pluginCount: Tests_Preset_Preset_ExcludesPagesPluginWhenPagesIsFalse_PluginCount = result['plugins'].length;

    // Docs, blog, sitemap, svgr, mermaid-tooltip, icons, bundle-guard (no pages).
    strictEqual(pluginCount, 7);

    return;
  });

  it('excludes sitemap plugin when sitemap is false', () => {
    const result: Tests_Preset_Preset_ExcludesSitemapPluginWhenSitemapIsFalse_Result = preset(
      { siteDir: '/mock' },
      {
        preset: 'foundry',
        overrides: undefined,
        plugins: {
          docs: undefined,
          blog: undefined,
          pages: undefined,
          sitemap: false,
        },
        analytics: {
          gtm: undefined,
        },
        search: undefined,
        progressBar: undefined,
      },
    );

    const pluginCount: Tests_Preset_Preset_ExcludesSitemapPluginWhenSitemapIsFalse_PluginCount = result['plugins'].length;

    // Docs, blog, pages, svgr, mermaid-tooltip, icons, bundle-guard (no sitemap).
    strictEqual(pluginCount, 7);

    return;
  });

  it('includes gtm plugin when gtm is provided', () => {
    const result: Tests_Preset_Preset_IncludesGtmPluginWhenGtmIsProvided_Result = preset(
      { siteDir: '/mock' },
      {
        preset: 'foundry',
        overrides: undefined,
        plugins: {
          docs: undefined,
          blog: undefined,
          pages: undefined,
          sitemap: undefined,
        },
        analytics: {
          gtm: { containerId: 'GTM-XXXXXX' },
        },
        search: undefined,
        progressBar: undefined,
      },
    );

    const pluginCount: Tests_Preset_Preset_IncludesGtmPluginWhenGtmIsProvided_PluginCount = result['plugins'].length;

    // Docs, blog, pages, sitemap, svgr, mermaid-tooltip, icons, bundle-guard, gtm.
    strictEqual(pluginCount, 9);

    return;
  });

  it('excludes gtm plugin when gtm is undefined', () => {
    const result: Tests_Preset_Preset_ExcludesGtmPluginWhenGtmIsUndefined_Result = preset(
      { siteDir: '/mock' },
      {
        preset: 'foundry',
        overrides: undefined,
        plugins: {
          docs: undefined,
          blog: undefined,
          pages: undefined,
          sitemap: undefined,
        },
        analytics: {
          gtm: undefined,
        },
        search: undefined,
        progressBar: undefined,
      },
    );

    const pluginCount: Tests_Preset_Preset_ExcludesGtmPluginWhenGtmIsUndefined_PluginCount = result['plugins'].length;

    // Docs, blog, pages, sitemap, svgr, mermaid-tooltip, icons, bundle-guard (no gtm).
    strictEqual(pluginCount, 8);

    return;
  });

  it('passes search config to nova theme when search is provided', () => {
    const result: Tests_Preset_Preset_PassesSearchConfigToNovaThemeWhenSearchIsProvided_Result = preset(
      { siteDir: '/mock' },
      {
        preset: 'foundry',
        overrides: undefined,
        plugins: {
          docs: undefined,
          blog: undefined,
          pages: undefined,
          sitemap: undefined,
        },
        analytics: {
          gtm: undefined,
        },
        search: { hashed: true },
        progressBar: undefined,
      },
    );

    const themeCount: Tests_Preset_Preset_PassesSearchConfigToNovaThemeWhenSearchIsProvided_ThemeCount = result['themes'].length;

    // Nova theme (Mermaid is now integrated natively).
    strictEqual(themeCount, 1);

    return;
  });

  it('excludes search theme when search is false', () => {
    const result: Tests_Preset_Preset_ExcludesSearchThemeWhenSearchIsFalse_Result = preset(
      { siteDir: '/mock' },
      {
        preset: 'foundry',
        overrides: undefined,
        plugins: {
          docs: undefined,
          blog: undefined,
          pages: undefined,
          sitemap: undefined,
        },
        analytics: {
          gtm: undefined,
        },
        search: false,
        progressBar: undefined,
      },
    );

    const themeCount: Tests_Preset_Preset_ExcludesSearchThemeWhenSearchIsFalse_ThemeCount = result['themes'].length;

    // Nova theme (Mermaid is now integrated natively).
    strictEqual(themeCount, 1);

    return;
  });

  return;
});

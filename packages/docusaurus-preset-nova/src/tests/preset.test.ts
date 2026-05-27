import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import preset from '../preset.js';

import type {
  Tests_Preset_Preset_PluginCount,
  Tests_Preset_Preset_Result,
  Tests_Preset_Preset_ThemeCount,
} from '../types/tests/preset.test.d.ts';

/**
 * Tests - Preset.
 *
 * @since 0.15.0
 */
describe('preset', async () => {
  it('returns docs, blog, pages, sitemap, svgr plugins and nova theme by default', () => {
    const result: Tests_Preset_Preset_Result = preset(
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

    const pluginCount: Tests_Preset_Preset_PluginCount = result['plugins'].length;
    const themeCount: Tests_Preset_Preset_ThemeCount = result['themes'].length;

    // Docs, blog, pages, sitemap, svgr, mermaid-tooltip.
    strictEqual(pluginCount, 6);

    // Nova theme (Mermaid is now integrated natively).
    strictEqual(themeCount, 1);

    return;
  });

  it('excludes blog plugin when blog is false', () => {
    const result: Tests_Preset_Preset_Result = preset(
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

    const pluginCount: Tests_Preset_Preset_PluginCount = result['plugins'].length;

    // Docs, pages, sitemap, svgr, mermaid-tooltip (no blog).
    strictEqual(pluginCount, 5);

    return;
  });

  it('excludes pages plugin when pages is false', () => {
    const result: Tests_Preset_Preset_Result = preset(
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

    const pluginCount: Tests_Preset_Preset_PluginCount = result['plugins'].length;

    // Docs, blog, sitemap, svgr, mermaid-tooltip (no pages).
    strictEqual(pluginCount, 5);

    return;
  });

  it('excludes sitemap plugin when sitemap is false', () => {
    const result: Tests_Preset_Preset_Result = preset(
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

    const pluginCount: Tests_Preset_Preset_PluginCount = result['plugins'].length;

    // Docs, blog, pages, svgr, mermaid-tooltip (no sitemap).
    strictEqual(pluginCount, 5);

    return;
  });

  it('includes gtm plugin when gtm is provided', () => {
    const result: Tests_Preset_Preset_Result = preset(
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

    const pluginCount: Tests_Preset_Preset_PluginCount = result['plugins'].length;

    // Docs, blog, pages, sitemap, svgr, mermaid-tooltip, gtm.
    strictEqual(pluginCount, 7);

    return;
  });

  it('excludes gtm plugin when gtm is undefined', () => {
    const result: Tests_Preset_Preset_Result = preset(
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

    const pluginCount: Tests_Preset_Preset_PluginCount = result['plugins'].length;

    // Docs, blog, pages, sitemap, svgr, mermaid-tooltip (no gtm).
    strictEqual(pluginCount, 6);

    return;
  });

  it('passes search config to nova theme when search is provided', () => {
    const result: Tests_Preset_Preset_Result = preset(
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

    const themeCount: Tests_Preset_Preset_ThemeCount = result['themes'].length;

    // Nova theme (Mermaid is now integrated natively).
    strictEqual(themeCount, 1);

    return;
  });

  it('excludes search theme when search is false', () => {
    const result: Tests_Preset_Preset_Result = preset(
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

    const themeCount: Tests_Preset_Preset_ThemeCount = result['themes'].length;

    // Nova theme (Mermaid is now integrated natively).
    strictEqual(themeCount, 1);

    return;
  });

  return;
});

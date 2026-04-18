import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import preset from '../preset.js';

import type {
  TestsPresetPresetPluginCount,
  TestsPresetPresetResult,
  TestsPresetPresetThemeCount,
} from '../types/tests/preset.test.d.ts';

/**
 * Tests - Preset.
 *
 * @since 0.15.0
 */
describe('preset', async () => {
  it('returns docs, blog, pages, sitemap, svgr plugins and nova theme by default', () => {
    const result: TestsPresetPresetResult = preset(
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

    const pluginCount: TestsPresetPresetPluginCount = result['plugins'].length;
    const themeCount: TestsPresetPresetThemeCount = result['themes'].length;

    // Docs, blog, pages, sitemap, svgr.
    strictEqual(pluginCount, 5);

    // Nova theme (Mermaid is now integrated natively).
    strictEqual(themeCount, 1);

    return;
  });

  it('excludes blog plugin when blog is false', () => {
    const result: TestsPresetPresetResult = preset(
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

    const pluginCount: TestsPresetPresetPluginCount = result['plugins'].length;

    // Docs, pages, sitemap, svgr (no blog).
    strictEqual(pluginCount, 4);

    return;
  });

  it('excludes pages plugin when pages is false', () => {
    const result: TestsPresetPresetResult = preset(
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

    const pluginCount: TestsPresetPresetPluginCount = result['plugins'].length;

    // Docs, blog, sitemap, svgr (no pages).
    strictEqual(pluginCount, 4);

    return;
  });

  it('excludes sitemap plugin when sitemap is false', () => {
    const result: TestsPresetPresetResult = preset(
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

    const pluginCount: TestsPresetPresetPluginCount = result['plugins'].length;

    // Docs, blog, pages, svgr (no sitemap).
    strictEqual(pluginCount, 4);

    return;
  });

  it('includes gtm plugin when gtm is provided', () => {
    const result: TestsPresetPresetResult = preset(
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

    const pluginCount: TestsPresetPresetPluginCount = result['plugins'].length;

    // Docs, blog, pages, sitemap, svgr, gtm.
    strictEqual(pluginCount, 6);

    return;
  });

  it('excludes gtm plugin when gtm is undefined', () => {
    const result: TestsPresetPresetResult = preset(
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

    const pluginCount: TestsPresetPresetPluginCount = result['plugins'].length;

    // Docs, blog, pages, sitemap, svgr (no gtm).
    strictEqual(pluginCount, 5);

    return;
  });

  it('passes search config to nova theme when search is provided', () => {
    const result: TestsPresetPresetResult = preset(
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

    const themeCount: TestsPresetPresetThemeCount = result['themes'].length;

    // Nova theme (Mermaid is now integrated natively).
    strictEqual(themeCount, 1);

    return;
  });

  it('excludes search theme when search is false', () => {
    const result: TestsPresetPresetResult = preset(
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

    const themeCount: TestsPresetPresetThemeCount = result['themes'].length;

    // Nova theme (Mermaid is now integrated natively).
    strictEqual(themeCount, 1);

    return;
  });

  return;
});

import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { analytics } from '../../plugins/analytics/index.js';
import preset from '../../preset.js';

import type {
  Tests_Plugins_Analytics_Analytics_AddsOnlyTheConfiguredTrackers_Sources,
  Tests_Plugins_Analytics_Analytics_AddsOnlyTheConfiguredTrackers_Tags,
  Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_Names,
  Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_WithClarity,
  Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_WithGtmOnly,
  Tests_Plugins_Analytics_PluginNames_Name,
  Tests_Plugins_Analytics_PluginNames_Names,
  Tests_Plugins_Analytics_PluginNames_Plugins,
  Tests_Plugins_Analytics_PluginNames_Returns,
} from '../../types/tests/plugins/analytics.test.d.ts';

/**
 * Tests - Plugins - Analytics - Plugin Names.
 *
 * Returns the module path of every plugin the preset added that is the analytics plugin.
 *
 * @param {Tests_Plugins_Analytics_PluginNames_Plugins} plugins - Plugins.
 *
 * @returns {Tests_Plugins_Analytics_PluginNames_Returns}
 *
 * @since UNRELEASED
 */
function pluginNames(plugins: Tests_Plugins_Analytics_PluginNames_Plugins): Tests_Plugins_Analytics_PluginNames_Returns {
  const names: Tests_Plugins_Analytics_PluginNames_Names = [];

  for (const plugin of plugins) {
    const name: Tests_Plugins_Analytics_PluginNames_Name = (typeof plugin === 'string') ? plugin : plugin[0];

    if (name.endsWith('plugins/analytics/index.js') === true) {
      names.push(name);
    }
  }

  return names;
}

/**
 * Tests - Plugins - Analytics - Analytics.
 *
 * @since UNRELEASED
 */
describe('analytics', () => {
  it('adds only the configured trackers', () => {
    const tags: Tests_Plugins_Analytics_Analytics_AddsOnlyTheConfiguredTrackers_Tags = analytics({}, {
      googleAnalytics: {
        measurementId: 'G-TEST',
      },
    }).injectHtmlTags();
    const sources: Tests_Plugins_Analytics_Analytics_AddsOnlyTheConfiguredTrackers_Sources = tags['headTags'].map((tag) => `${String((tag['attributes'] === undefined) ? '' : tag['attributes']['src'])}${tag['innerHTML'] ?? ''}`);

    strictEqual(sources.some((source) => source.includes('googletagmanager.com/gtag/js?id=G-TEST')), true);
    strictEqual(sources.some((source) => source.includes('fbevents.js')), false);
    strictEqual(sources.some((source) => source.includes('clarity.ms')), false);

    return;
  });

  it('adds the analytics plugin only when a tracker is set', () => {
    const withGtmOnly: Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_WithGtmOnly = preset({ siteDir: '/mock' }, {
      preset: 'foundry',
      analytics: {
        gtm: {
          containerId: 'GTM-XXXXXX',
        },
      },
    });
    const withClarity: Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_WithClarity = preset({ siteDir: '/mock' }, {
      preset: 'foundry',
      analytics: {
        clarity: {
          projectId: 'abc123',
        },
      },
    });
    const names: Tests_Plugins_Analytics_Analytics_AddsTheAnalyticsPluginOnlyWhenATrackerIsSet_Names = [
      pluginNames(withGtmOnly['plugins']).length,
      pluginNames(withClarity['plugins']).length,
    ];

    strictEqual(names[0], 0);
    strictEqual(names[1], 1);

    return;
  });

  return;
});

import { deepStrictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { configureWebpackCache } from '../../lib/webpack-cache.js';

/**
 * Tests - Lib - Webpack Cache - Configure Webpack Cache.
 *
 * @since 0.26.0
 */
describe('configureWebpackCache', async () => {
  it('uses memory cache for development', () => {
    deepStrictEqual(configureWebpackCache('development', false), {
      cache: {
        type: 'memory',
      },
      mergeStrategy: {
        cache: 'replace',
      },
    });

    return;
  });

  it('disables cache for production', () => {
    deepStrictEqual(configureWebpackCache('production', false), {
      cache: false,
      mergeStrategy: {
        cache: 'replace',
      },
    });

    return;
  });

  it('leaves Docusaurus cache intact when persistence is enabled', () => {
    deepStrictEqual(configureWebpackCache('development', true), {});

    return;
  });

  return;
});

import type {
  Lib_WebpackCache_ConfigureWebpackCache_Cache,
  Lib_WebpackCache_ConfigureWebpackCache_Mode,
  Lib_WebpackCache_ConfigureWebpackCache_PersistentCache,
  Lib_WebpackCache_ConfigureWebpackCache_Returns,
} from '../types/lib/webpack-cache.d.ts';

/**
 * Lib - Webpack Cache - Configure Webpack Cache.
 *
 * Returns no override when persistent caching is enabled. Otherwise,
 * development uses memory-only caching and production disables caching.
 *
 * @param {Lib_WebpackCache_ConfigureWebpackCache_Mode}            mode            - Mode.
 * @param {Lib_WebpackCache_ConfigureWebpackCache_PersistentCache} persistentCache - Persistent cache.
 *
 * @returns {Lib_WebpackCache_ConfigureWebpackCache_Returns}
 *
 * @since 0.26.0
 */
export function configureWebpackCache(mode: Lib_WebpackCache_ConfigureWebpackCache_Mode, persistentCache: Lib_WebpackCache_ConfigureWebpackCache_PersistentCache): Lib_WebpackCache_ConfigureWebpackCache_Returns {
  if (persistentCache === true) {
    return {};
  }

  let cache: Lib_WebpackCache_ConfigureWebpackCache_Cache = false;

  if (mode === 'development') {
    cache = {
      type: 'memory',
    };
  }

  return {
    cache,
    mergeStrategy: {
      cache: 'replace',
    },
  };
}

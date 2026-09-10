/**
 * Lib - Webpack Cache - Configure Webpack Cache.
 *
 * @since 0.26.0
 */
export type Lib_WebpackCache_ConfigureWebpackCache_Mode = string | undefined;

export type Lib_WebpackCache_ConfigureWebpackCache_PersistentCache = boolean;

export type Lib_WebpackCache_ConfigureWebpackCache_Returns = {
  cache?: Lib_WebpackCache_ConfigureWebpackCache_Cache;
  mergeStrategy?: Lib_WebpackCache_ConfigureWebpackCache_MergeStrategy;
};

export type Lib_WebpackCache_ConfigureWebpackCache_Cache_Value_Type = 'memory';

export type Lib_WebpackCache_ConfigureWebpackCache_Cache_Value = {
  type: Lib_WebpackCache_ConfigureWebpackCache_Cache_Value_Type;
};

export type Lib_WebpackCache_ConfigureWebpackCache_Cache = Lib_WebpackCache_ConfigureWebpackCache_Cache_Value | false;

export type Lib_WebpackCache_ConfigureWebpackCache_MergeStrategy_Cache = 'replace';

export type Lib_WebpackCache_ConfigureWebpackCache_MergeStrategy = {
  cache: Lib_WebpackCache_ConfigureWebpackCache_MergeStrategy_Cache;
};

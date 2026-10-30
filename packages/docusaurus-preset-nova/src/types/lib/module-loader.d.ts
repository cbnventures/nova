/**
 * Lib - Module Loader - Module Require.
 *
 * @since 0.26.0
 */
export type Lib_ModuleLoader_ModuleRequire = NodeJS.Require;

/**
 * Lib - Module Loader - Load Common Js Module.
 *
 * @since 0.26.0
 */
export type Lib_ModuleLoader_LoadCommonJsModule_Specifier = string;

export type Lib_ModuleLoader_LoadCommonJsModule_Returns = unknown;

/**
 * Lib - Module Loader - Resolve Module Path.
 *
 * @since 0.26.0
 */
export type Lib_ModuleLoader_ResolveModulePath_Specifier = string;

export type Lib_ModuleLoader_ResolveModulePath_Returns = string;

/**
 * Lib - Module Loader - Resolve Module Path For Site.
 *
 * @since 0.37.0
 */
export type Lib_ModuleLoader_ResolveModulePathForSite_Specifier = string;

export type Lib_ModuleLoader_ResolveModulePathForSite_SiteDirectory = string;

export type Lib_ModuleLoader_ResolveModulePathForSite_Returns = string;

export type Lib_ModuleLoader_ResolveModulePathForSite_SiteModuleRequire = NodeJS.Require;

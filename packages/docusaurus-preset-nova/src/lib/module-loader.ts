import { createRequire } from 'node:module';
import { resolve } from 'node:path';

import type {
  Lib_ModuleLoader_LoadCommonJsModule_Returns,
  Lib_ModuleLoader_LoadCommonJsModule_Specifier,
  Lib_ModuleLoader_ModuleRequire,
  Lib_ModuleLoader_ResolveModulePath_Returns,
  Lib_ModuleLoader_ResolveModulePath_Specifier,
  Lib_ModuleLoader_ResolveModulePathForSite_Returns,
  Lib_ModuleLoader_ResolveModulePathForSite_SiteDirectory,
  Lib_ModuleLoader_ResolveModulePathForSite_SiteModuleRequire,
  Lib_ModuleLoader_ResolveModulePathForSite_Specifier,
} from '../types/lib/module-loader.d.ts';

/**
 * Lib - Module Loader - Module Require.
 *
 * Provides the package's ESM files with one explicit interoperability boundary
 * for CommonJS-only dependencies and Node's synchronous module resolver.
 *
 * @since 0.26.0
 */
const moduleRequire: Lib_ModuleLoader_ModuleRequire = createRequire(import.meta.url);

/**
 * Lib - Module Loader - Load Common Js Module.
 *
 * Loads a CommonJS dependency from an ESM module without relying on the global
 * `require`, which does not exist inside the package's module boundary.
 *
 * @param {Lib_ModuleLoader_LoadCommonJsModule_Specifier} specifier - Specifier.
 *
 * @returns {Lib_ModuleLoader_LoadCommonJsModule_Returns}
 *
 * @since 0.26.0
 */
export function loadCommonJsModule(specifier: Lib_ModuleLoader_LoadCommonJsModule_Specifier): Lib_ModuleLoader_LoadCommonJsModule_Returns {
  return moduleRequire(specifier) as Lib_ModuleLoader_LoadCommonJsModule_Returns;
}

/**
 * Lib - Module Loader - Resolve Module Path.
 *
 * Resolves an installed dependency to its absolute filesystem path while the
 * surrounding package remains a native ESM package.
 *
 * @param {Lib_ModuleLoader_ResolveModulePath_Specifier} specifier - Specifier.
 *
 * @returns {Lib_ModuleLoader_ResolveModulePath_Returns}
 *
 * @since 0.26.0
 */
export function resolveModulePath(specifier: Lib_ModuleLoader_ResolveModulePath_Specifier): Lib_ModuleLoader_ResolveModulePath_Returns {
  return moduleRequire.resolve(specifier);
}

/**
 * Lib - Module Loader - Resolve Module Path For Site.
 *
 * Prefers the site's dependency tree so Docusaurus core plugins and the core
 * callback share one Joi installation, then falls back to preset dependencies
 * when the package manager keeps transitive dependencies private.
 *
 * @param {Lib_ModuleLoader_ResolveModulePathForSite_Specifier}     specifier     - Specifier.
 * @param {Lib_ModuleLoader_ResolveModulePathForSite_SiteDirectory} siteDirectory - Site directory.
 *
 * @returns {Lib_ModuleLoader_ResolveModulePathForSite_Returns}
 *
 * @since 0.37.0
 */
export function resolveModulePathForSite(specifier: Lib_ModuleLoader_ResolveModulePathForSite_Specifier, siteDirectory: Lib_ModuleLoader_ResolveModulePathForSite_SiteDirectory): Lib_ModuleLoader_ResolveModulePathForSite_Returns {
  const siteModuleRequire: Lib_ModuleLoader_ResolveModulePathForSite_SiteModuleRequire = createRequire(resolve(siteDirectory, 'package.json'));

  try {
    return siteModuleRequire.resolve(specifier);
  } catch {
    return resolveModulePath(specifier);
  }
}

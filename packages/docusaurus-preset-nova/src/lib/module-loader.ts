import { createRequire } from 'node:module';

import type {
  Lib_ModuleLoader_LoadCommonJsModule_Returns,
  Lib_ModuleLoader_LoadCommonJsModule_Specifier,
  Lib_ModuleLoader_ModuleRequire,
  Lib_ModuleLoader_ResolveModulePath_Returns,
  Lib_ModuleLoader_ResolveModulePath_Specifier,
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

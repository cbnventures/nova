import { setActiveVitest } from '../internal/active-vitest.js';
import { canonicalContract } from './rules.js';

import type {
  Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_Config,
  Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_Enable,
  Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_PackageJsonPath,
  Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_RequireI18n,
  Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_RequireRootScripts,
  Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_Resolved,
  Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_RootDir,
  Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_Returns,
} from '../../../types/rules/vitest/package-scripts/register.d.ts';

/**
 * Rules - Vitest - Package Scripts - Register - Package Scripts Suite.
 *
 * Registers Nova's package-script organization contract for one package.json and
 * lets project roots or Docusaurus workspaces require their additional commands.
 *
 * @param {Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_Config} config - Config.
 *
 * @returns {Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_Returns}
 *
 * @since 0.32.0
 */
export function registerPackageScriptsSuite(config: Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_Config): Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_Returns {
  setActiveVitest(config['vitest']);

  config['vitest'].describe('package scripts', () => {
    const rootDir: Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_RootDir = config['rootDir'] ?? process.cwd();
    const packageJsonPath: Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_PackageJsonPath = config['packageJsonPath'] ?? 'package.json';
    const requireRootScripts: Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_RequireRootScripts = config['requireRootScripts'] === true;
    const requireI18n: Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_RequireI18n = config['requireI18n'] === true;
    const enable: Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_Enable = config['enable'];
    const resolved: Rules_Vitest_PackageScripts_Register_RegisterPackageScriptsSuite_PackageScripts_Resolved = {
      rootDir,
      packageJsonPath,
      requireRootScripts,
      requireI18n,
      enable,
    };

    canonicalContract(resolved, resolved['enable']);

    return;
  });

  return;
}

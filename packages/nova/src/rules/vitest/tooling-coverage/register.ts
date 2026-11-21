import { setActiveVitest } from '../internal/active-vitest.js';
import {
  noSkipLibCheck,
  scriptsLinted,
  scriptsTypeChecked,
} from './rules.js';

import type {
  Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_Config,
  Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_Returns,
  Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_ToolingCoverage_Enable,
  Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_ToolingCoverage_Resolved,
  Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_ToolingCoverage_RootDir,
  Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_ToolingCoverage_ScriptsTsconfigPath,
} from '../../../types/rules/vitest/tooling-coverage/register.d.ts';

/**
 * Rules - Vitest - Tooling Coverage - Register - Tooling Coverage Suite.
 *
 * Registers the checks that keep a workspace's tooling complete. Every script is
 * linted and type-checked, and no TSConfig turns on `skipLibCheck`; `rootDir` defaults to
 * `process.cwd()` and `scriptsTsconfigPath` to `tsconfig.scripts.json`.
 *
 * @param {Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_Config} config - Config.
 *
 * @returns {Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_Returns}
 *
 * @since 0.49.0
 */
export function registerToolingCoverageSuite(config: Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_Config): Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_Returns {
  setActiveVitest(config['vitest']);

  config['vitest'].describe('tooling coverage', () => {
    const rootDir: Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_ToolingCoverage_RootDir = config['rootDir'] ?? process.cwd();
    const scriptsTsconfigPath: Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_ToolingCoverage_ScriptsTsconfigPath = config['scriptsTsconfigPath'] ?? 'tsconfig.scripts.json';
    const enable: Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_ToolingCoverage_Enable = config['enable'];
    const resolved: Rules_Vitest_ToolingCoverage_Register_RegisterToolingCoverageSuite_ToolingCoverage_Resolved = {
      rootDir,
      scriptsTsconfigPath,
      enable,
    };

    scriptsLinted(resolved, resolved['enable']);

    scriptsTypeChecked(resolved, resolved['enable']);

    noSkipLibCheck(resolved, resolved['enable']);

    return;
  });

  return;
}

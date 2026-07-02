import { describe } from 'vitest';

import { valuesDoubleQuoted } from './rules.js';

import type {
  Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Config,
  Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Enable,
  Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_EnvPaths,
  Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Resolved,
  Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_RootDir,
  Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Returns,
} from '../../../types/rules/vitest/dotenv/register.d.ts';

/**
 * Rules - Vitest - Dotenv - Register - Dotenv Suite.
 *
 * Resolves the suite config (defaulting `rootDir` to `process.cwd()` and `envPaths` to
 * `.env` / `.env.sample`) and runs the single double-quote conformance check inside a
 * describe, gated by `enable`.
 *
 * @param {Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Config} config - Config.
 *
 * @returns {Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Returns}
 *
 * @since 0.20.0
 */
export function registerDotenvSuite(config: Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Config): Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Returns {
  describe('dotenv', () => {
    const rootDir: Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_RootDir = config['rootDir'] ?? process.cwd();
    const envPaths: Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_EnvPaths = config['envPaths'] ?? [
      '.env',
      '.env.sample',
    ];
    const enable: Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Enable = config['enable'];
    const resolved: Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Resolved = {
      rootDir,
      envPaths,
      enable,
    };

    valuesDoubleQuoted(resolved, resolved['enable']);

    return;
  });

  return;
}

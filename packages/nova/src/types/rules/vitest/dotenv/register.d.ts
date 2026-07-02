import type {
  Rules_Vitest_Index_DotenvSuiteConfig,
  Rules_Vitest_Index_DotenvToggleKey,
} from '../index.d.ts';

/**
 * Rules - Vitest - Dotenv - Register - Register Dotenv Suite.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Config = Rules_Vitest_Index_DotenvSuiteConfig;

export type Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Returns = void;

export type Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_RootDir = string;

export type Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_EnvPaths = string[];

export type Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Enable = 'all' | Rules_Vitest_Index_DotenvToggleKey[];

export type Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Resolved_RootDir = string;

export type Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Resolved_EnvPaths = string[];

export type Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Resolved_Enable = 'all' | Rules_Vitest_Index_DotenvToggleKey[];

export type Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Resolved = {
  rootDir: Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Resolved_RootDir;
  envPaths: Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Resolved_EnvPaths;
  enable: Rules_Vitest_Dotenv_Register_RegisterDotenvSuite_Dotenv_Resolved_Enable;
};

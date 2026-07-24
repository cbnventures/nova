import type { promises } from 'node:fs';

import type { vi } from 'vitest';

import type { Lib_Utility_SaveGeneratedFile_Header } from '../../../../lib/utility.d.ts';

import type { Shared_GeneratorRunResult } from '../../../../shared.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run - Drops Keys Not Declared In The Config Or Template.
 *
 * @since 0.20.0
 */
export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_ExistingEnvContent = string;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_ActualReadFile = typeof promises['readFile'];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_ReadFileSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_Calls = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined][];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_DropsKeysNotDeclaredInTheConfigOrTemplate_EnvTargetCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run - Preserves Existing Env Values.
 *
 * @since 0.20.0
 */
export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_ExistingEnvContent = string;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_ActualReadFile = typeof promises['readFile'];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_ReadFileSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_Calls = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined][];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_EnvTargetCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesExistingEnvValues_SampleTargetCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run - Preserves Multi Line Quoted Values.
 *
 * @since 0.20.0
 */
export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_ExistingEnvContent = string;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_ActualReadFile = typeof promises['readFile'];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_ReadFileSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_Calls = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined][];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesMultiLineQuotedValues_EnvTargetCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run - Preserves Undeclared Keys Without Prune.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesUndeclaredKeysWithoutPrune_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesUndeclaredKeysWithoutPrune_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesUndeclaredKeysWithoutPrune_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesUndeclaredKeysWithoutPrune_ExistingEnvContent = string;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesUndeclaredKeysWithoutPrune_ActualReadFile = typeof promises['readFile'];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesUndeclaredKeysWithoutPrune_ReadFileSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesUndeclaredKeysWithoutPrune_Calls = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined][];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_PreservesUndeclaredKeysWithoutPrune_EnvTargetCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run - Sets Exit Code When Not At Project Root.
 *
 * @since 0.15.0
 */
export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run - Warns When No Workspace Declares Dotenv.
 *
 * @since 0.20.0
 */
export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WarnsWhenNoWorkspaceDeclaresDotenv_Result = Shared_GeneratorRunResult;

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run - Writes A File For Each Workspace That Declares Dotenv.
 *
 * @since 0.20.0
 */
export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_ActualReadFile = typeof promises['readFile'];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_ReadFileSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_Calls = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined][];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_RootEnvCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesAFileForEachWorkspaceThatDeclaresDotenv_WebEnvCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Run - Writes Config Variables To Env And Env Sample.
 *
 * @since 0.20.0
 */
export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_ActualReadFile = typeof promises['readFile'];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_ReadFileSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_Calls = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined][];

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_EnvTargetCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

export type Tests_Cli_Generate_MustHaves_Dotenv_CliGenerateMustHavesDotenvRun_WritesConfigVariablesToEnvAndEnvSample_SampleTargetCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

/**
 * Tests - CLI - Generate - Must Haves - Dotenv - Prompts.
 *
 * @since 0.21.0
 */
export type Tests_Cli_Generate_MustHaves_Dotenv_Prompts_MockModule_Default = ReturnType<typeof vi['fn']>;

export type Tests_Cli_Generate_MustHaves_Dotenv_Prompts_MockModule = Readonly<{
  default: Tests_Cli_Generate_MustHaves_Dotenv_Prompts_MockModule_Default;
}>;

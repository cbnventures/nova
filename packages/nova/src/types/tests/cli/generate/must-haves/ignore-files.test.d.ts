import type { vi } from 'vitest';

import type { Lib_Utility_SaveGeneratedFile_Header } from '../../../../lib/utility.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Ignore Files - Run - Sets Exit Code When Not At Project Root.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

/**
 * Tests - CLI - Generate - Must Haves - Ignore Files - Run - Stops Before Writing Invalid Config.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_DiagnosticsSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_StopsBeforeWritingInvalidConfig_Result = 'cancelled' | 'completed';

/**
 * Tests - CLI - Generate - Must Haves - Ignore Files - Run - Writes Every Configured Ignore File.
 *
 * @since 0.32.0
 */
export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_Call = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined];

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_Calls = Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_Call[];

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_GitignoreCall = Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_Call | undefined;

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_DockerignoreCall = Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_Call | undefined;

export type Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_AssetsignoreCall = Tests_Cli_Generate_MustHaves_IgnoreFiles_CliGenerateMustHavesIgnoreFilesRun_WritesEveryConfiguredIgnoreFile_Call | undefined;

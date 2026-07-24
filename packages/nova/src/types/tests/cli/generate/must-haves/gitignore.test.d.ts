import type { vi } from 'vitest';

import type { Lib_Utility_SaveGeneratedFile_Header } from '../../../../lib/utility.d.ts';

/**
 * Tests - CLI - Generate - Must Haves - Gitignore - Run - Sets Exit Code When Not At Project Root.
 *
 * @since 0.15.0
 */
export type Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_SetsExitCodeWhenNotAtProjectRoot_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

/**
 * Tests - CLI - Generate - Must Haves - Gitignore - Run - Writes Config Project Excludes And Header Metadata.
 *
 * @since 0.15.0
 */
export type Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_IsProjectRootSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_LoadSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_SaveSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_Calls = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined][];

export type Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_TargetCall = [string, string, boolean, Lib_Utility_SaveGeneratedFile_Header | undefined] | undefined;

export type Tests_Cli_Generate_MustHaves_Gitignore_CliGenerateMustHavesGitignoreRun_WritesConfigProjectExcludesAndHeaderMetadata_HeaderArg = Lib_Utility_SaveGeneratedFile_Header | undefined;

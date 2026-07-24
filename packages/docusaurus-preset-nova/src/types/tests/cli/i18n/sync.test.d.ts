import type { TranslationFileContent } from '@docusaurus/types';
import type { vi } from 'vitest';

/**
 * Tests - CLI - I18n - Sync - LibI18nSiteContextJs - Mock Module.
 *
 * @since 0.21.0
 */
export type Tests_Cli_I18n_Sync_LibI18nSiteContextJs_MockModule_Runner_Gather = ReturnType<typeof vi['fn']>;

export type Tests_Cli_I18n_Sync_LibI18nSiteContextJs_MockModule_Runner = Readonly<{
  gather: Tests_Cli_I18n_Sync_LibI18nSiteContextJs_MockModule_Runner_Gather;
}>;

export type Tests_Cli_I18n_Sync_LibI18nSiteContextJs_MockModule = Readonly<{
  Runner: Tests_Cli_I18n_Sync_LibI18nSiteContextJs_MockModule_Runner;
}>;

/**
 * Tests - CLI - I18n - Sync - SyncRun - DeletesOrphansWhenDeleteDefunctIsSet.
 *
 * @since 0.21.0
 */
export type Tests_Cli_I18n_Sync_SyncRun_DeletesOrphansWhenDeleteDefunctIsSet_Dir = string;

export type Tests_Cli_I18n_Sync_SyncRun_DeletesOrphansWhenDeleteDefunctIsSet_CodePath = string;

export type Tests_Cli_I18n_Sync_SyncRun_DeletesOrphansWhenDeleteDefunctIsSet_Exists = boolean;

/**
 * Tests - CLI - I18n - Sync - SyncRun - ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun.
 *
 * @since 0.21.0
 */
export type Tests_Cli_I18n_Sync_SyncRun_ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun_Dir = string;

export type Tests_Cli_I18n_Sync_SyncRun_ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun_CodePath = string;

export type Tests_Cli_I18n_Sync_SyncRun_ExitsNonZeroAndWritesNothingWhenOrphansBlockANonInteractiveRun_Raw = string;

/**
 * Tests - CLI - I18n - Sync - SyncRun - ExitsWithCodeTwoWhenTheSiteCannotBeLoaded.
 *
 * @since 0.21.0
 */
export type Tests_Cli_I18n_Sync_SyncRun_ExitsWithCodeTwoWhenTheSiteCannotBeLoaded_Message = string;

/**
 * Tests - CLI - I18n - Sync - SyncRun - WritesNothingDuringADryRun.
 *
 * @since 0.21.0
 */
export type Tests_Cli_I18n_Sync_SyncRun_WritesNothingDuringADryRun_Dir = string;

export type Tests_Cli_I18n_Sync_SyncRun_WritesNothingDuringADryRun_Raw = string;

/**
 * Tests - CLI - I18n - Sync - SyncRun - WritesTheReconciledTreeAndExitsZero.
 *
 * @since 0.21.0
 */
export type Tests_Cli_I18n_Sync_SyncRun_WritesTheReconciledTreeAndExitsZero_Dir = string;

export type Tests_Cli_I18n_Sync_SyncRun_WritesTheReconciledTreeAndExitsZero_Raw = string;

export type Tests_Cli_I18n_Sync_SyncRun_WritesTheReconciledTreeAndExitsZero_Parsed = TranslationFileContent;

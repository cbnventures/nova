import { ok, strictEqual } from 'node:assert/strict';

import {
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliRecipeGithubSyncFeatures } from '../../../../cli/recipe/github/sync-features.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';
import * as toolkit from '../../../../toolkit/index.js';

import type {
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_Calls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_EditCall,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_AuthCall,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_Calls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_EditCall,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_ViewCall,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_Calls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_EditCall,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_HasNoValuesWarn,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_LoggerWarnSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_WarnCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_Calls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_EditCall,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_HasNoValuesWarn,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_LoggerWarnSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_WarnCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_ErrorCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_HasAuthError,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_LoggerErrorSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_ErrorCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_HasGhNotInstalled,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_LoggerErrorSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_CustomizedErrorCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_CustomizedLoggerMock,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_HasRateLimitError,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_LoggerCustomizeReturn,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_LoggerCustomizeSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_ErrorCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_HasVersionError,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_LoggerErrorSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_HasGithubBlockWarn,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_LoggerWarnSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_WarnCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_Calls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_EditCall,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_Calls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_EditCall,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_HasOwnerRepoWarn,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_LoggerWarnSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_WarnCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_ErrorCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_HasWriteError,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_LoggerErrorSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_CustomizedErrorCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_CustomizedLoggerMock,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_HasMalformedJsonError,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_LoggerCustomizeReturn,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_LoggerCustomizeSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_Calls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_CustomizedErrorCalls,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_CustomizedLoggerMock,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_EditCall,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_HasUndefinedPermissionError,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_LoadSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_LoggerCustomizeReturn,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_LoggerCustomizeSpy,
} from '../../../../types/tests/cli/recipe/github/sync-features.test.d.ts';

/**
 * Tests - CLI - Recipe - GitHub - Sync Features - Run.
 *
 * @since 0.22.0
 */
describe('CliRecipeGithubSyncFeatures.run', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = 0;

    return;
  });

  it('recipe disabled returns silently without executeShell mutation calls', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': false,
        },
      },
    });

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('github block missing logs warn and returns without exitCode', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({});

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasGithubBlockWarn: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GithubBlockMissingLogsWarnAndReturnsWithoutExitCode_HasGithubBlockWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('"github" block was not found') === true
    ));

    ok(hasGithubBlockWarn, 'Expected warn about missing github block');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('owner or repo missing logs warn and returns without exitCode', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        recipes: {
          'sync-features': true,
        },
      },
    });

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasOwnerRepoWarn: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OwnerOrRepoMissingLogsWarnAndReturnsWithoutExitCode_HasOwnerRepoWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('"github.owner" and "github.repo"') === true
    ));

    ok(hasOwnerRepoWarn, 'Expected warn about missing owner or repo');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('gh not on PATH logs error and sets exitCode=1', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(false);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(process.exitCode, 1);

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const errorCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasGhNotInstalled: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotOnPATHLogsErrorAndSetsExitCode1_HasGhNotInstalled = errorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('"gh" CLI is not installed') === true
    ));

    ok(hasGhNotInstalled, 'Expected error about gh not installed');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerErrorSpy.mockRestore();

    return;
  });

  it('gh version below minimum logs error and sets exitCode=1', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: 'gh version 2.30.0 (2023-10-01)',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasVersionError: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhVersionBelowMinimumLogsErrorAndSetsExitCode1_HasVersionError = errorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('below the required minimum') === true
    ));

    ok(hasVersionError, 'Expected error about gh version below minimum');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerErrorSpy.mockRestore();

    return;
  });

  it('gh not authenticated logs error and sets exitCode=1', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: 'not logged in',
          code: 1,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasAuthError: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhNotAuthenticatedLogsErrorAndSetsExitCode1_HasAuthError = errorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('"gh" CLI is not authenticated') === true
    ));

    ok(hasAuthError, 'Expected error about gh not authenticated');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerErrorSpy.mockRestore();

    return;
  });

  it('repo view returns READ permission logs error and sets exitCode=1', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {
          issues: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: JSON.stringify({ viewerPermission: 'READ' }),
          textError: '',
          code: 0,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasWriteError: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RepoViewReturnsREADPermissionLogsErrorAndSetsExitCode1_HasWriteError = errorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('does not have write access') === true
    ));

    ok(hasWriteError, 'Expected error about insufficient write access');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerErrorSpy.mockRestore();

    return;
  });

  it('all four features defined calls gh repo edit with all four enable flags', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {
          issues: true,
          wiki: false,
          projects: false,
          discussions: false,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: JSON.stringify({ viewerPermission: 'ADMIN' }),
          textError: '',
          code: 0,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    await CliRecipeGithubSyncFeatures.run({});

    const calls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-issues=true') === true,
      'Expected --enable-issues=true flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-wiki=false') === true,
      'Expected --enable-wiki=false flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-projects=false') === true,
      'Expected --enable-projects=false flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-discussions=false') === true,
      'Expected --enable-discussions=false flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('only issues defined calls gh repo edit with only --enable-issues flag', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {
          issues: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: JSON.stringify({ viewerPermission: 'WRITE' }),
          textError: '',
          code: 0,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    await CliRecipeGithubSyncFeatures.run({});

    const calls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyIssuesDefinedCallsGhRepoEditWithOnlyEnableIssuesFlag_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-issues=true') === true,
      'Expected --enable-issues=true flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-wiki') === true,
      false,
      'Expected no --enable-wiki flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-projects') === true,
      false,
      'Expected no --enable-projects flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-discussions') === true,
      false,
      'Expected no --enable-discussions flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('only wiki and discussions defined calls gh repo edit with only those two flags', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {
          wiki: false,
          discussions: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: JSON.stringify({ viewerPermission: 'MAINTAIN' }),
          textError: '',
          code: 0,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    await CliRecipeGithubSyncFeatures.run({});

    const calls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_OnlyWikiAndDiscussionsDefinedCallsGhRepoEditWithOnlyThoseTwoFlags_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-wiki=false') === true,
      'Expected --enable-wiki=false flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-discussions=true') === true,
      'Expected --enable-discussions=true flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-issues') === true,
      false,
      'Expected no --enable-issues flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-projects') === true,
      false,
      'Expected no --enable-projects flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('features block exists but all fields undefined logs warn and makes no gh repo edit call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {},
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: JSON.stringify({ viewerPermission: 'ADMIN' }),
          textError: '',
          code: 0,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncFeatures.run({});

    const calls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    const warnCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasNoValuesWarn: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockExistsButAllFieldsUndefinedLogsWarnAndMakesNoGhRepoEditCall_HasNoValuesWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('No values found under "github.features"') === true
    ));

    ok(hasNoValuesWarn, 'Expected warn about no values found under github.features');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('features block missing logs warn and makes no gh repo edit call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: JSON.stringify({ viewerPermission: 'ADMIN' }),
          textError: '',
          code: 0,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncFeatures.run({});

    const calls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    const warnCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasNoValuesWarn: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_FeaturesBlockMissingLogsWarnAndMakesNoGhRepoEditCall_HasNoValuesWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('No values found under "github.features"') === true
    ));

    ok(hasNoValuesWarn, 'Expected warn about no values found under github.features');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('dryRun true runs precheck calls but skips gh repo edit call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {
          issues: true,
          wiki: false,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: JSON.stringify({ viewerPermission: 'ADMIN' }),
          textError: '',
          code: 0,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    await CliRecipeGithubSyncFeatures.run({ dryRun: true });

    const calls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const authCall: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_AuthCall = calls.find((call) => call[0] === 'gh auth status');

    const viewCall: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_DryRunTrueRunsPrecheckCallsButSkipsGhRepoEditCall_ViewCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo view') === true
    ));

    ok(authCall !== undefined, 'Expected gh auth status to be called during dry run precheck');

    ok(viewCall !== undefined, 'Expected gh repo view to be called during dry run precheck');

    strictEqual(editCall, undefined, 'Expected no gh repo edit call in dry run');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('gh repo edit returns code=1 sets exitCode=1 and logs error', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {
          issues: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: JSON.stringify({ viewerPermission: 'ADMIN' }),
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo edit') === true
      ) {
        return Promise.resolve({
          textOut: '',
          textError: 'something went wrong',
          code: 1,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('gh repo edit with rate limit in stderr logs rate-limit-specific error', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {
          issues: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: JSON.stringify({ viewerPermission: 'ADMIN' }),
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo edit') === true
      ) {
        return Promise.resolve({
          textOut: '',
          textError: [
            'API rate limit exceeded',
            'X-RateLimit-Reset: 1700000000',
          ].join('\n'),
          code: 1,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    const customizedLoggerMock: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_LoggerCustomizeReturn);

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasRateLimitError: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditWithRateLimitInStderrLogsRateLimitSpecificError_HasRateLimitError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('rate limit exceeded') === true
    ));

    ok(hasRateLimitError, 'Expected rate-limit-specific error message');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerCustomizeSpy.mockRestore();

    return;
  });

  it('sets exitCode=1 when gh repo view returns malformed JSON', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {
          issues: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: '{not-json',
          textError: '',
          code: 0,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    const customizedLoggerMock: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_LoggerCustomizeReturn);

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasMalformedJsonError: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsMalformedJSON_HasMalformedJsonError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('Could not parse') === true
    ));

    ok(hasMalformedJsonError, 'Expected error about malformed JSON');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerCustomizeSpy.mockRestore();

    return;
  });

  it('sets exitCode=1 when gh repo view returns valid JSON without viewerPermission', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-features': true,
        },
        features: {
          issues: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
      if (cmd === 'gh --version') {
        return Promise.resolve({
          textOut: 'gh version 2.50.0 (2024-01-01)',
          textError: '',
          code: 0,
        });
      }

      if (cmd === 'gh auth status') {
        return Promise.resolve({
          textOut: '',
          textError: '',
          code: 0,
        });
      }

      if (
        typeof cmd === 'string'
        && cmd.includes('gh repo view') === true
      ) {
        return Promise.resolve({
          textOut: '{}',
          textError: '',
          code: 0,
        });
      }

      return Promise.resolve({
        textOut: '',
        textError: '',
        code: 0,
      });
    });

    const customizedLoggerMock: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_LoggerCustomizeReturn);

    await CliRecipeGithubSyncFeatures.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasUndefinedPermissionError: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_HasUndefinedPermissionError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('Could not determine permission') === true
    ));

    ok(hasUndefinedPermissionError, 'Expected error about undetermined permission');

    const calls: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_SetsExitCode1WhenGhRepoViewReturnsValidJSONWithoutViewerPermission_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerCustomizeSpy.mockRestore();

    return;
  });

  return;
});

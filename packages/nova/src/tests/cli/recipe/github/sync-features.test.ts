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
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_LoadSpy,
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
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_LoadSpy,
} from '../../../../types/tests/cli/recipe/github/sync-features.test.d.ts';

/**
 * Tests - CLI - Recipe - GitHub - Sync Features - Run.
 *
 * @since 0.18.0
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
      },
      recipes: {
        github: {
          'sync-features': {
            enabled: false,
          },
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

  it('all four features defined calls gh repo edit with all four enable flags', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncFeatures_CliRecipeGithubSyncFeaturesRun_AllFourFeaturesDefinedCallsGhRepoEditWithAllFourEnableFlags_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        features: {
          issues: true,
          wiki: false,
          projects: false,
          discussions: false,
        },
      },
      recipes: {
        github: {
          'sync-features': {
            enabled: true,
          },
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
        features: {
          issues: true,
        },
      },
      recipes: {
        github: {
          'sync-features': {
            enabled: true,
          },
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
        features: {
          wiki: false,
          discussions: true,
        },
      },
      recipes: {
        github: {
          'sync-features': {
            enabled: true,
          },
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
        features: {},
      },
      recipes: {
        github: {
          'sync-features': {
            enabled: true,
          },
        },
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
      },
      recipes: {
        github: {
          'sync-features': {
            enabled: true,
          },
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
        features: {
          issues: true,
          wiki: false,
        },
      },
      recipes: {
        github: {
          'sync-features': {
            enabled: true,
          },
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
        features: {
          issues: true,
        },
      },
      recipes: {
        github: {
          'sync-features': {
            enabled: true,
          },
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

  return;
});

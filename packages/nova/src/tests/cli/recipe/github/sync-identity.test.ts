import { ok, strictEqual } from 'node:assert/strict';

import {
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliRecipeGithubSyncIdentity } from '../../../../cli/recipe/github/sync-identity.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import { LIB_REGEX_PATTERN_TOPIC_TYPESCRIPT } from '../../../../lib/regex.js';
import * as utility from '../../../../lib/utility.js';
import * as toolkit from '../../../../toolkit/index.js';

import type {
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_EditCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_HasNoValuesWarn,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_LoggerWarnSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_WarnCalls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_EditCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_AuthCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_EditCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_ViewCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_TypescriptCount,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_Keywords,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_EditCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_EditCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_Calls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_TopicsCall,
} from '../../../../types/tests/cli/recipe/github/sync-identity.test.d.ts';

/**
 * Tests - CLI - Recipe - GitHub - Sync Identity - Run.
 *
 * @since 0.18.0
 */
describe('CliRecipeGithubSyncIdentity.run', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = 0;

    return;
  });

  it('recipe disabled returns silently without executeShell mutation calls', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: false,
          },
        },
      },
    });

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_RecipeDisabledReturnsSilentlyWithoutExecuteShellMutationCalls_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    process.exitCode = 0;

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 0);

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('description and homepage both set calls gh repo edit with both flags', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: { description: { short: 'A test project' } },
      urls: { homepage: 'https://example.com' },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DescriptionAndHomepageBothSetCallsGhRepoEditWithBothFlags_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--description') === true,
      'Expected --description flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--homepage') === true,
      'Expected --homepage flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('only description set calls gh repo edit with only --description flag', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyDescriptionSetCallsGhRepoEditWithOnlyDescriptionFlag_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--description') === true,
      'Expected --description flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--homepage') === true,
      false,
      'Expected no --homepage flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('only topics from github.topics set fires only gh api PUT topics call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        topics: [
          'typescript',
          'nodejs',
        ],
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_OnlyTopicsFromGithubTopicsSetFiresOnlyGhApiPUTTopicsCall_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    ok(topicsCall !== undefined, 'Expected gh api PUT topics call');

    ok(
      typeof topicsCall[0] === 'string' && topicsCall[0].includes('-f "names[]=typescript"') === true,
      'Expected the entire names[]=<topic> token to be shell-quoted',
    );

    ok(
      typeof topicsCall[0] === 'string' && topicsCall[0].includes('-f names[]=') !== true,
      'Expected no bare -f names[]= token (zsh would glob the brackets)',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('topics derived from project.keywords are sent in api call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: {
        keywords: [
          'typescript',
          'mono-repo',
        ],
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_Calls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsDerivedFromProjectKeywordsAreSentInApiCall_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    ok(topicsCall !== undefined, 'Expected gh api PUT topics call');

    ok(
      typeof topicsCall[0] === 'string' && topicsCall[0].includes('typescript') === true,
      'Expected typescript topic',
    );

    ok(
      typeof topicsCall[0] === 'string' && topicsCall[0].includes('mono-repo') === true,
      'Expected mono-repo topic',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('github.topics empty array fires api call clearing topics', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        topics: [],
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_Calls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GithubTopicsEmptyArrayFiresApiCallClearingTopics_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    ok(topicsCall !== undefined, 'Expected gh api PUT topics call even with empty topics array');

    ok(
      typeof topicsCall[0] === 'string' && topicsCall[0].includes('-f "names[]"') === true,
      'Expected empty-array clearing field -f "names[]" in topics command',
    );

    ok(
      typeof topicsCall[0] === 'string' && topicsCall[0].trim().endsWith('/topics') === false,
      'Expected topics command to carry the clearing field, not a field-less PUT',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('neither topics nor keywords results in no api call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_Calls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NeitherTopicsNorKeywordsResultsInNoApiCall_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(topicsCall, undefined, 'Expected no gh api PUT topics call');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('all three undefined logs warn and makes no mutation calls', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    process.exitCode = 0;

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 0);

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    strictEqual(topicsCall, undefined, 'Expected no gh api PUT topics call');

    const warnCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasNoValuesWarn: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AllThreeUndefinedLogsWarnAndMakesNoMutationCalls_HasNoValuesWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('No values found') === true
    ));

    ok(hasNoValuesWarn, 'Expected warn about no values found');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('dryRun true runs precheck calls but skips mutation calls', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        topics: ['typescript'],
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: { description: { short: 'A test project' } },
      urls: { homepage: 'https://example.com' },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({ dryRun: true });

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_Calls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    const authCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_AuthCall = calls.find((call) => call[0] === 'gh auth status');

    const viewCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_DryRunTrueRunsPrecheckCallsButSkipsMutationCalls_ViewCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo view') === true
    ));

    ok(authCall !== undefined, 'Expected gh auth status to be called during dry run precheck');

    ok(viewCall !== undefined, 'Expected gh repo view to be called during dry run precheck');

    strictEqual(editCall, undefined, 'Expected no gh repo edit call in dry run');

    strictEqual(topicsCall, undefined, 'Expected no gh api PUT topics call in dry run');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('gh repo edit returns code=1 sets exitCode=1 and logs error', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_GhRepoEditReturnsCode1SetsExitCode1AndLogsError_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('non-topic characters in keywords set exitCode=1', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: { keywords: ['@@@'] },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_Calls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicCharactersInKeywordsSetExitCode1_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(topicsCall, undefined, 'Expected no topics call for a keyword that is not a valid topic');

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('non-topic length over 50 chars sets exitCode=1', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: { keywords: ['a'.repeat(51)] },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_Calls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicLengthOver50CharsSetsExitCode1_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(topicsCall, undefined, 'Expected no topics call for a keyword longer than 50 characters');

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('no duplicate topics sent when keywords repeat', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: {
        keywords: [
          'typescript',
          'typescript',
          'nodejs',
        ],
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_Calls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    ok(topicsCall !== undefined, 'Expected topics call');

    const typescriptCount: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NoDuplicateTopicsSentWhenKeywordsRepeat_TypescriptCount = (typeof topicsCall[0] === 'string') ? (topicsCall[0].match(new RegExp(LIB_REGEX_PATTERN_TOPIC_TYPESCRIPT.source, 'g')) ?? []).length : 0;

    strictEqual(typescriptCount, 1, 'Expected typescript topic to appear exactly once after deduplication');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('non-topic total over 20 keywords sets exitCode=1', async () => {
    const keywords: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_Keywords = Array.from(
      { length: 25 },
      (_ignored, index) => `keyword-${index}`,
    );

    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
      project: { keywords },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_Calls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_NonTopicTotalOver20KeywordsSetsExitCode1_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(topicsCall, undefined, 'Expected no topics call for more than 20 keywords');

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  return;
});

import { ok, strictEqual } from 'node:assert/strict';

import {
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliRecipeGithubSyncIdentity } from '../../../../cli/recipe/github/sync-identity.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_TOPIC_FLAG,
  LIB_REGEX_PATTERN_TOPIC_TYPESCRIPT,
} from '../../../../lib/regex.js';
import * as utility from '../../../../lib/utility.js';
import * as toolkit from '../../../../toolkit/index.js';

import type {
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AuthCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_CustomizedErrorCalls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_CustomizedLoggerMock,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ErrorCalls,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasAuthError,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasGhNotInstalled,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasGithubBlockWarn,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasMalformedJsonError,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasNoValuesWarn,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasOwnerRepoWarn,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasRateLimitError,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasTooLongWarn,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasTrimWarn,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasUndefinedPermissionError,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasVersionError,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasWriteError,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_Keywords,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerCustomizeReturn,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerCustomizeSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerErrorSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerWarnSpy,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicMatches,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TypescriptCount,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ViewCall,
  Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_WarnCalls,
} from '../../../../types/tests/cli/recipe/github/sync-identity.test.d.ts';

/**
 * Tests - CLI - Recipe - GitHub - Sync Identity - Run.
 *
 * @since 0.22.0
 */
describe('CliRecipeGithubSyncIdentity.run', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = 0;

    return;
  });

  it('recipe disabled returns silently without executeShell mutation calls', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': false,
        },
      },
    });

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('github block missing logs warn and returns without exitCode', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({});

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasGithubBlockWarn: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasGithubBlockWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasOwnerRepoWarn: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasOwnerRepoWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(false);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const errorCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasGhNotInstalled: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasGhNotInstalled = errorCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: 'gh version 2.30.0 (2023-10-01)',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasVersionError: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasVersionError = errorCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasAuthError: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasAuthError = errorCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasWriteError: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasWriteError = errorCalls.some((call) => (
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

  it('description and homepage both set calls gh repo edit with both flags', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
      urls: { homepage: 'https://example.com' },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCall = calls.find((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCall = calls.find((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        topics: [
          'typescript',
          'nodejs',
        ],
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    ok(topicsCall !== undefined, 'Expected gh api PUT topics call');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('topics derived from project.keywords are normalized in api call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: {
        keywords: [
          'TypeScript',
          'mono repo',
        ],
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    ok(topicsCall !== undefined, 'Expected gh api PUT topics call');

    ok(
      typeof topicsCall[0] === 'string' && topicsCall[0].includes('typescript') === true,
      'Expected normalized typescript topic',
    );

    ok(
      typeof topicsCall[0] === 'string' && topicsCall[0].includes('mono-repo') === true,
      'Expected normalized mono-repo topic',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('github.topics empty array fires api call clearing topics', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        topics: [],
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    ok(topicsCall !== undefined, 'Expected gh api PUT topics call even with empty topics array');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('neither topics nor keywords results in no api call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    strictEqual(topicsCall, undefined, 'Expected no gh api PUT topics call');

    const warnCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasNoValuesWarn: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasNoValuesWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        topics: ['typescript'],
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
      urls: { homepage: 'https://example.com' },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    const authCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_AuthCall = calls.find((call) => call[0] === 'gh auth status');

    const viewCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ViewCall = calls.find((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

  it('gh repo edit with rate limit in stderr logs rate-limit-specific error', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerCustomizeReturn);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasRateLimitError: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasRateLimitError = customizedErrorCalls.some((call) => (
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

  it('normalizeTopics drops keywords that become empty after stripping', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { keywords: ['@@@'] },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(topicsCall, undefined, 'Expected no topics call since all were stripped to empty');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('normalizeTopics drops topics exceeding 50 chars with warn', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { keywords: ['a'.repeat(51)] },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    const warnCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasTooLongWarn: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasTooLongWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('dropped topic exceeding 50 chars') === true
    ));

    ok(hasTooLongWarn, 'Expected warn about dropped topic exceeding 50 chars');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('normalizeTopics deduplicates topics keeping first occurrence', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: {
        keywords: [
          'typescript',
          'TypeScript',
          'nodejs',
        ],
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    ok(topicsCall !== undefined, 'Expected topics call');

    const typescriptCount: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TypescriptCount = (typeof topicsCall[0] === 'string') ? (topicsCall[0].match(new RegExp(LIB_REGEX_PATTERN_TOPIC_TYPESCRIPT.source, 'g')) ?? []).length : 0;

    strictEqual(typescriptCount, 1, 'Expected typescript topic to appear exactly once after deduplication');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('normalizeTopics trims to 20 topics with warn when more than 20 provided', async () => {
    const keywords: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_Keywords = Array.from(
      { length: 25 },
      (_ignored, index) => `keyword-${index}`,
    );

    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { keywords },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    const warnCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasTrimWarn: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasTrimWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('more than 20 topics') === true
    ));

    ok(hasTrimWarn, 'Expected warn about topics trimmed to 20');

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    ok(topicsCall !== undefined, 'Expected topics call');

    const topicMatches: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicMatches = (typeof topicsCall[0] === 'string') ? topicsCall[0].match(new RegExp(LIB_REGEX_PATTERN_TOPIC_FLAG.source, 'g')) : null;

    strictEqual((topicMatches ?? []).length, 20, 'Expected exactly 20 topics in api call');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('sets exitCode=1 when gh repo view returns malformed JSON', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: {
        description: {
          short: 'A test project.',
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerCustomizeReturn);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasMalformedJsonError: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasMalformedJsonError = customizedErrorCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: {
        description: {
          short: 'A test project.',
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_LoggerCustomizeReturn);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasUndefinedPermissionError: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_HasUndefinedPermissionError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('Could not determine permission') === true
    ));

    ok(hasUndefinedPermissionError, 'Expected error about undetermined permission');

    const calls: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: Tests_Cli_Recipe_Github_SyncIdentity_CliRecipeGithubSyncIdentityRun_TopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    strictEqual(topicsCall, undefined, 'Expected no gh api PUT topics call');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerCustomizeSpy.mockRestore();

    return;
  });

  return;
});

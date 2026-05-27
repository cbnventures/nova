import { ok, strictEqual } from 'node:assert/strict';

import {
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliRecipeGithubSyncPolicies } from '../../../../cli/recipe/github/sync-policies.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';
import * as toolkit from '../../../../toolkit/index.js';

import type {
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_AuthCall,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_CustomizedErrorCalls,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_CustomizedLoggerMock,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ErrorCalls,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasAuthError,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasGhNotInstalled,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasGithubBlockWarn,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasMalformedJsonError,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasNoValuesWarn,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasOwnerRepoWarn,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasRateLimitError,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasUndefinedPermissionError,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasVersionError,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasWriteError,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerCustomizeReturn,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerCustomizeSpy,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerErrorSpy,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerWarnSpy,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ViewCall,
  Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_WarnCalls,
} from '../../../../types/tests/cli/recipe/github/sync-policies.test.d.ts';

/**
 * Tests - CLI - Recipe - GitHub - Sync Policies - Run.
 *
 * @since 0.22.0
 */
describe('CliRecipeGithubSyncPolicies.run', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = 0;

    return;
  });

  it('recipe disabled returns silently without executeShell mutation calls', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': false,
        },
      },
    });

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('github block missing logs warn and returns without exitCode', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({});

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasGithubBlockWarn: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasGithubBlockWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasOwnerRepoWarn: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasOwnerRepoWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(false);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const errorCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasGhNotInstalled: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasGhNotInstalled = errorCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: 'gh version 2.30.0 (2023-10-01)',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasVersionError: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasVersionError = errorCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasAuthError: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasAuthError = errorCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'public',
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerErrorSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasWriteError: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasWriteError = errorCalls.some((call) => (
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

  it('all fields defined calls gh repo edit with all six flags', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'public',
          defaultBranch: 'main',
          mergeMethods: {
            merge: false,
            squash: true,
            rebase: false,
          },
          autoDeleteHeadBranch: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncPolicies.run({});

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--visibility=public') === true,
      'Expected --visibility=public flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--default-branch=') === true,
      'Expected --default-branch= flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-merge-commit=false') === true,
      'Expected --enable-merge-commit=false flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-squash-merge=true') === true,
      'Expected --enable-squash-merge=true flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-rebase-merge=false') === true,
      'Expected --enable-rebase-merge=false flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--delete-branch-on-merge=true') === true,
      'Expected --delete-branch-on-merge=true flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('only visibility set calls gh repo edit with only --visibility flag', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'private',
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncPolicies.run({});

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--visibility=private') === true,
      'Expected --visibility=private flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--default-branch') === true,
      false,
      'Expected no --default-branch flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-merge-commit') === true,
      false,
      'Expected no --enable-merge-commit flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-squash-merge') === true,
      false,
      'Expected no --enable-squash-merge flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-rebase-merge') === true,
      false,
      'Expected no --enable-rebase-merge flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--delete-branch-on-merge') === true,
      false,
      'Expected no --delete-branch-on-merge flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('only mergeMethods.squash set calls gh repo edit with only --enable-squash-merge flag', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          mergeMethods: {
            squash: true,
          },
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncPolicies.run({});

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-squash-merge=true') === true,
      'Expected --enable-squash-merge=true flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--visibility') === true,
      false,
      'Expected no --visibility flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--default-branch') === true,
      false,
      'Expected no --default-branch flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-merge-commit') === true,
      false,
      'Expected no --enable-merge-commit flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-rebase-merge') === true,
      false,
      'Expected no --enable-rebase-merge flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--delete-branch-on-merge') === true,
      false,
      'Expected no --delete-branch-on-merge flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('mergeMethods block exists but all three fields undefined emits no enable-merge flags', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'public',
          mergeMethods: {},
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncPolicies.run({});

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--visibility=public') === true,
      'Expected --visibility=public flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-merge-commit') === true,
      false,
      'Expected no --enable-merge-commit flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-squash-merge') === true,
      false,
      'Expected no --enable-squash-merge flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-rebase-merge') === true,
      false,
      'Expected no --enable-rebase-merge flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('mergeMethods block missing entirely emits no enable-merge flags', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          autoDeleteHeadBranch: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncPolicies.run({});

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--delete-branch-on-merge=true') === true,
      'Expected --delete-branch-on-merge=true flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-merge-commit') === true,
      false,
      'Expected no --enable-merge-commit flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-squash-merge') === true,
      false,
      'Expected no --enable-squash-merge flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-rebase-merge') === true,
      false,
      'Expected no --enable-rebase-merge flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('top-level plus nested mix emits only matching flags', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'public',
          autoDeleteHeadBranch: false,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncPolicies.run({});

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    ok(editCall !== undefined, 'Expected gh repo edit call');

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--visibility=public') === true,
      'Expected --visibility=public flag',
    );

    ok(
      typeof editCall[0] === 'string' && editCall[0].includes('--delete-branch-on-merge=false') === true,
      'Expected --delete-branch-on-merge=false flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--default-branch') === true,
      false,
      'Expected no --default-branch flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-merge-commit') === true,
      false,
      'Expected no --enable-merge-commit flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-squash-merge') === true,
      false,
      'Expected no --enable-squash-merge flag',
    );

    strictEqual(
      typeof editCall[0] === 'string' && editCall[0].includes('--enable-rebase-merge') === true,
      false,
      'Expected no --enable-rebase-merge flag',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('policies block exists but all fields undefined logs warn and makes no gh repo edit call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {},
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    const warnCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasNoValuesWarn: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasNoValuesWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('No values found under "github.policies"') === true
    ));

    ok(hasNoValuesWarn, 'Expected warn about no values found under github.policies');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('policies block missing logs warn and makes no gh repo edit call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    const warnCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_WarnCalls = loggerWarnSpy['mock']['calls'];

    const hasNoValuesWarn: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasNoValuesWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('No values found under "github.policies"') === true
    ));

    ok(hasNoValuesWarn, 'Expected warn about no values found under github.policies');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('dryRun true runs precheck calls but skips gh repo edit call', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'public',
          autoDeleteHeadBranch: true,
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncPolicies.run({ dryRun: true });

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const authCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_AuthCall = calls.find((call) => call[0] === 'gh auth status');

    const viewCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ViewCall = calls.find((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'public',
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('gh repo edit with rate limit in stderr logs rate-limit-specific error', async () => {
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'public',
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerCustomizeReturn);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasRateLimitError: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasRateLimitError = customizedErrorCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'public',
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerCustomizeReturn);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasMalformedJsonError: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasMalformedJsonError = customizedErrorCalls.some((call) => (
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
    const isProjectRootSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {
          visibility: 'public',
        },
      },
    });

    const isCommandExistsSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_IsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_ExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_LoggerCustomizeReturn);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasUndefinedPermissionError: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_HasUndefinedPermissionError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('Could not determine permission') === true
    ));

    ok(hasUndefinedPermissionError, 'Expected error about undetermined permission');

    const calls: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCalls = executeShellSpy['mock']['calls'];

    const editCall: Tests_Cli_Recipe_Github_SyncPolicies_CliRecipeGithubSyncPoliciesRun_EditCall = calls.find((call) => (
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

import { ok, strictEqual } from 'node:assert/strict';

import {
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { CliRecipeGithubSyncPolicies } from '../../../../cli/recipe/github/sync-policies.js';
import { LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';
import * as toolkit from '../../../../toolkit/index.js';

import type {
  TestsCliRecipeGithubSyncPoliciesRunAuthCall,
  TestsCliRecipeGithubSyncPoliciesRunCustomizedErrorCalls,
  TestsCliRecipeGithubSyncPoliciesRunCustomizedLoggerMock,
  TestsCliRecipeGithubSyncPoliciesRunEditCall,
  TestsCliRecipeGithubSyncPoliciesRunEditCalls,
  TestsCliRecipeGithubSyncPoliciesRunErrorCalls,
  TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy,
  TestsCliRecipeGithubSyncPoliciesRunHasAuthError,
  TestsCliRecipeGithubSyncPoliciesRunHasGhNotInstalled,
  TestsCliRecipeGithubSyncPoliciesRunHasGithubBlockWarn,
  TestsCliRecipeGithubSyncPoliciesRunHasMalformedJsonError,
  TestsCliRecipeGithubSyncPoliciesRunHasNoValuesWarn,
  TestsCliRecipeGithubSyncPoliciesRunHasOwnerRepoWarn,
  TestsCliRecipeGithubSyncPoliciesRunHasRateLimitError,
  TestsCliRecipeGithubSyncPoliciesRunHasUndefinedPermissionError,
  TestsCliRecipeGithubSyncPoliciesRunHasVersionError,
  TestsCliRecipeGithubSyncPoliciesRunHasWriteError,
  TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy,
  TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy,
  TestsCliRecipeGithubSyncPoliciesRunLoadSpy,
  TestsCliRecipeGithubSyncPoliciesRunLoggerCustomizeReturn,
  TestsCliRecipeGithubSyncPoliciesRunLoggerCustomizeSpy,
  TestsCliRecipeGithubSyncPoliciesRunLoggerErrorSpy,
  TestsCliRecipeGithubSyncPoliciesRunLoggerWarnSpy,
  TestsCliRecipeGithubSyncPoliciesRunViewCall,
  TestsCliRecipeGithubSyncPoliciesRunWarnCalls,
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': false,
        },
      },
    });

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({});

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: TestsCliRecipeGithubSyncPoliciesRunWarnCalls = loggerWarnSpy['mock']['calls'];

    const hasGithubBlockWarn: TestsCliRecipeGithubSyncPoliciesRunHasGithubBlockWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: TestsCliRecipeGithubSyncPoliciesRunWarnCalls = loggerWarnSpy['mock']['calls'];

    const hasOwnerRepoWarn: TestsCliRecipeGithubSyncPoliciesRunHasOwnerRepoWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(false);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const errorCalls: TestsCliRecipeGithubSyncPoliciesRunErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasGhNotInstalled: TestsCliRecipeGithubSyncPoliciesRunHasGhNotInstalled = errorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: 'gh version 2.30.0 (2023-10-01)',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: TestsCliRecipeGithubSyncPoliciesRunErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasVersionError: TestsCliRecipeGithubSyncPoliciesRunHasVersionError = errorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerErrorSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: TestsCliRecipeGithubSyncPoliciesRunErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasAuthError: TestsCliRecipeGithubSyncPoliciesRunHasAuthError = errorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerErrorSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: TestsCliRecipeGithubSyncPoliciesRunErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasWriteError: TestsCliRecipeGithubSyncPoliciesRunHasWriteError = errorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
        policies: {},
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    const warnCalls: TestsCliRecipeGithubSyncPoliciesRunWarnCalls = loggerWarnSpy['mock']['calls'];

    const hasNoValuesWarn: TestsCliRecipeGithubSyncPoliciesRunHasNoValuesWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-policies': true,
        },
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncPolicies.run({});

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    const warnCalls: TestsCliRecipeGithubSyncPoliciesRunWarnCalls = loggerWarnSpy['mock']['calls'];

    const hasNoValuesWarn: TestsCliRecipeGithubSyncPoliciesRunHasNoValuesWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const authCall: TestsCliRecipeGithubSyncPoliciesRunAuthCall = calls.find((call) => call[0] === 'gh auth status');

    const viewCall: TestsCliRecipeGithubSyncPoliciesRunViewCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: TestsCliRecipeGithubSyncPoliciesRunCustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as TestsCliRecipeGithubSyncPoliciesRunLoggerCustomizeReturn);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: TestsCliRecipeGithubSyncPoliciesRunCustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasRateLimitError: TestsCliRecipeGithubSyncPoliciesRunHasRateLimitError = customizedErrorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: TestsCliRecipeGithubSyncPoliciesRunCustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as TestsCliRecipeGithubSyncPoliciesRunLoggerCustomizeReturn);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: TestsCliRecipeGithubSyncPoliciesRunCustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasMalformedJsonError: TestsCliRecipeGithubSyncPoliciesRunHasMalformedJsonError = customizedErrorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncPoliciesRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncPoliciesRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncPoliciesRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncPoliciesRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: TestsCliRecipeGithubSyncPoliciesRunCustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: TestsCliRecipeGithubSyncPoliciesRunLoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as TestsCliRecipeGithubSyncPoliciesRunLoggerCustomizeReturn);

    await CliRecipeGithubSyncPolicies.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: TestsCliRecipeGithubSyncPoliciesRunCustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasUndefinedPermissionError: TestsCliRecipeGithubSyncPoliciesRunHasUndefinedPermissionError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('Could not determine permission') === true
    ));

    ok(hasUndefinedPermissionError, 'Expected error about undetermined permission');

    const calls: TestsCliRecipeGithubSyncPoliciesRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncPoliciesRunEditCall = calls.find((call) => (
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

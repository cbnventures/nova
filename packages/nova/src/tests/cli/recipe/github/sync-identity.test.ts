import { ok, strictEqual } from 'node:assert/strict';

import {
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { CliRecipeGithubSyncIdentity } from '../../../../cli/recipe/github/sync-identity.js';
import { LibNovaConfig } from '../../../../lib/nova-config.js';
import {
  LIB_REGEX_PATTERN_TOPIC_FLAG,
  LIB_REGEX_PATTERN_TOPIC_TYPESCRIPT,
} from '../../../../lib/regex.js';
import * as utility from '../../../../lib/utility.js';
import * as toolkit from '../../../../toolkit/index.js';

import type {
  TestsCliRecipeGithubSyncIdentityRunAuthCall,
  TestsCliRecipeGithubSyncIdentityRunCustomizedErrorCalls,
  TestsCliRecipeGithubSyncIdentityRunCustomizedLoggerMock,
  TestsCliRecipeGithubSyncIdentityRunEditCall,
  TestsCliRecipeGithubSyncIdentityRunEditCalls,
  TestsCliRecipeGithubSyncIdentityRunErrorCalls,
  TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy,
  TestsCliRecipeGithubSyncIdentityRunHasAuthError,
  TestsCliRecipeGithubSyncIdentityRunHasGhNotInstalled,
  TestsCliRecipeGithubSyncIdentityRunHasGithubBlockWarn,
  TestsCliRecipeGithubSyncIdentityRunHasMalformedJsonError,
  TestsCliRecipeGithubSyncIdentityRunHasNoValuesWarn,
  TestsCliRecipeGithubSyncIdentityRunHasOwnerRepoWarn,
  TestsCliRecipeGithubSyncIdentityRunHasRateLimitError,
  TestsCliRecipeGithubSyncIdentityRunHasTooLongWarn,
  TestsCliRecipeGithubSyncIdentityRunHasTrimWarn,
  TestsCliRecipeGithubSyncIdentityRunHasUndefinedPermissionError,
  TestsCliRecipeGithubSyncIdentityRunHasVersionError,
  TestsCliRecipeGithubSyncIdentityRunHasWriteError,
  TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy,
  TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy,
  TestsCliRecipeGithubSyncIdentityRunKeywords,
  TestsCliRecipeGithubSyncIdentityRunLoadSpy,
  TestsCliRecipeGithubSyncIdentityRunLoggerCustomizeReturn,
  TestsCliRecipeGithubSyncIdentityRunLoggerCustomizeSpy,
  TestsCliRecipeGithubSyncIdentityRunLoggerErrorSpy,
  TestsCliRecipeGithubSyncIdentityRunLoggerWarnSpy,
  TestsCliRecipeGithubSyncIdentityRunTopicMatches,
  TestsCliRecipeGithubSyncIdentityRunTopicsCall,
  TestsCliRecipeGithubSyncIdentityRunTypescriptCount,
  TestsCliRecipeGithubSyncIdentityRunViewCall,
  TestsCliRecipeGithubSyncIdentityRunWarnCalls,
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': false,
        },
      },
    });

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({});

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: TestsCliRecipeGithubSyncIdentityRunLoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: TestsCliRecipeGithubSyncIdentityRunWarnCalls = loggerWarnSpy['mock']['calls'];

    const hasGithubBlockWarn: TestsCliRecipeGithubSyncIdentityRunHasGithubBlockWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerWarnSpy: TestsCliRecipeGithubSyncIdentityRunLoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const warnCalls: TestsCliRecipeGithubSyncIdentityRunWarnCalls = loggerWarnSpy['mock']['calls'];

    const hasOwnerRepoWarn: TestsCliRecipeGithubSyncIdentityRunHasOwnerRepoWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(false);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: TestsCliRecipeGithubSyncIdentityRunLoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    strictEqual(executeShellSpy['mock']['calls'].length, 0);

    const errorCalls: TestsCliRecipeGithubSyncIdentityRunErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasGhNotInstalled: TestsCliRecipeGithubSyncIdentityRunHasGhNotInstalled = errorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: 'gh version 2.30.0 (2023-10-01)',
      textError: '',
      code: 0,
    });

    const loggerErrorSpy: TestsCliRecipeGithubSyncIdentityRunLoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: TestsCliRecipeGithubSyncIdentityRunErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasVersionError: TestsCliRecipeGithubSyncIdentityRunHasVersionError = errorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerErrorSpy: TestsCliRecipeGithubSyncIdentityRunLoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: TestsCliRecipeGithubSyncIdentityRunErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasAuthError: TestsCliRecipeGithubSyncIdentityRunHasAuthError = errorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerErrorSpy: TestsCliRecipeGithubSyncIdentityRunLoggerErrorSpy = vi.spyOn(toolkit['Logger'], 'error').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const errorCalls: TestsCliRecipeGithubSyncIdentityRunErrorCalls = loggerErrorSpy['mock']['calls'];

    const hasWriteError: TestsCliRecipeGithubSyncIdentityRunHasWriteError = errorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncIdentityRunEditCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncIdentityRunEditCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncIdentityRunEditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        topics: [],
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: TestsCliRecipeGithubSyncIdentityRunLoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncIdentityRunEditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    strictEqual(editCall, undefined, 'Expected no gh repo edit call');

    strictEqual(topicsCall, undefined, 'Expected no gh api PUT topics call');

    const warnCalls: TestsCliRecipeGithubSyncIdentityRunWarnCalls = loggerWarnSpy['mock']['calls'];

    const hasNoValuesWarn: TestsCliRecipeGithubSyncIdentityRunHasNoValuesWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncIdentityRunEditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    const authCall: TestsCliRecipeGithubSyncIdentityRunAuthCall = calls.find((call) => call[0] === 'gh auth status');

    const viewCall: TestsCliRecipeGithubSyncIdentityRunViewCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { description: { short: 'A test project' } },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: TestsCliRecipeGithubSyncIdentityRunCustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: TestsCliRecipeGithubSyncIdentityRunLoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as TestsCliRecipeGithubSyncIdentityRunLoggerCustomizeReturn);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: TestsCliRecipeGithubSyncIdentityRunCustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasRateLimitError: TestsCliRecipeGithubSyncIdentityRunHasRateLimitError = customizedErrorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { keywords: ['@@@'] },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { keywords: ['a'.repeat(51)] },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: TestsCliRecipeGithubSyncIdentityRunLoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    const warnCalls: TestsCliRecipeGithubSyncIdentityRunWarnCalls = loggerWarnSpy['mock']['calls'];

    const hasTooLongWarn: TestsCliRecipeGithubSyncIdentityRunHasTooLongWarn = warnCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    ok(topicsCall !== undefined, 'Expected topics call');

    const typescriptCount: TestsCliRecipeGithubSyncIdentityRunTypescriptCount = (typeof topicsCall[0] === 'string') ? (topicsCall[0].match(new RegExp(LIB_REGEX_PATTERN_TOPIC_TYPESCRIPT.source, 'g')) ?? []).length : 0;

    strictEqual(typescriptCount, 1, 'Expected typescript topic to appear exactly once after deduplication');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    return;
  });

  it('normalizeTopics trims to 20 topics with warn when more than 20 provided', async () => {
    const keywords: TestsCliRecipeGithubSyncIdentityRunKeywords = Array.from(
      { length: 25 },
      (_ignored, index) => `keyword-${index}`,
    );

    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'test-owner',
        repo: 'test-repo',
        recipes: {
          'sync-identity': true,
        },
      },
      project: { keywords },
    });

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const loggerWarnSpy: TestsCliRecipeGithubSyncIdentityRunLoggerWarnSpy = vi.spyOn(toolkit['Logger'], 'warn').mockReturnValue(undefined);

    await CliRecipeGithubSyncIdentity.run({});

    const warnCalls: TestsCliRecipeGithubSyncIdentityRunWarnCalls = loggerWarnSpy['mock']['calls'];

    const hasTrimWarn: TestsCliRecipeGithubSyncIdentityRunHasTrimWarn = warnCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('more than 20 topics') === true
    ));

    ok(hasTrimWarn, 'Expected warn about topics trimmed to 20');

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh api -X PUT') === true
    ));

    ok(topicsCall !== undefined, 'Expected topics call');

    const topicMatches: TestsCliRecipeGithubSyncIdentityRunTopicMatches = (typeof topicsCall[0] === 'string') ? topicsCall[0].match(new RegExp(LIB_REGEX_PATTERN_TOPIC_FLAG.source, 'g')) : null;

    strictEqual((topicMatches ?? []).length, 20, 'Expected exactly 20 topics in api call');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    isCommandExistsSpy.mockRestore();

    executeShellSpy.mockRestore();

    loggerWarnSpy.mockRestore();

    return;
  });

  it('sets exitCode=1 when gh repo view returns malformed JSON', async () => {
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: TestsCliRecipeGithubSyncIdentityRunCustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: TestsCliRecipeGithubSyncIdentityRunLoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as TestsCliRecipeGithubSyncIdentityRunLoggerCustomizeReturn);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: TestsCliRecipeGithubSyncIdentityRunCustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasMalformedJsonError: TestsCliRecipeGithubSyncIdentityRunHasMalformedJsonError = customizedErrorCalls.some((call) => (
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
    const isProjectRootSpy: TestsCliRecipeGithubSyncIdentityRunIsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: TestsCliRecipeGithubSyncIdentityRunLoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
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

    const isCommandExistsSpy: TestsCliRecipeGithubSyncIdentityRunIsCommandExistsSpy = vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    const executeShellSpy: TestsCliRecipeGithubSyncIdentityRunExecuteShellSpy = vi.spyOn(utility, 'executeShell').mockImplementation((cmd) => {
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

    const customizedLoggerMock: TestsCliRecipeGithubSyncIdentityRunCustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: TestsCliRecipeGithubSyncIdentityRunLoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as TestsCliRecipeGithubSyncIdentityRunLoggerCustomizeReturn);

    await CliRecipeGithubSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    const customizedErrorCalls: TestsCliRecipeGithubSyncIdentityRunCustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasUndefinedPermissionError: TestsCliRecipeGithubSyncIdentityRunHasUndefinedPermissionError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('Could not determine permission') === true
    ));

    ok(hasUndefinedPermissionError, 'Expected error about undetermined permission');

    const calls: TestsCliRecipeGithubSyncIdentityRunEditCalls = executeShellSpy['mock']['calls'];

    const editCall: TestsCliRecipeGithubSyncIdentityRunEditCall = calls.find((call) => (
      typeof call[0] === 'string'
      && call[0].includes('gh repo edit') === true
    ));

    const topicsCall: TestsCliRecipeGithubSyncIdentityRunTopicsCall = calls.find((call) => (
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

import { ok, strictEqual } from 'node:assert/strict';

import {
  beforeEach,
  describe,
  it,
  vi,
} from 'vitest';

import { handleGhFailure } from '../../../../cli/recipe/github/handle-gh-failure.js';
import * as toolkit from '../../../../toolkit/index.js';

import type {
  TestsCliRecipeGithubHandleGhFailureCustomizedErrorCalls,
  TestsCliRecipeGithubHandleGhFailureCustomizedLoggerMock,
  TestsCliRecipeGithubHandleGhFailureHasGenericError,
  TestsCliRecipeGithubHandleGhFailureHasRateLimitError,
  TestsCliRecipeGithubHandleGhFailureHasResetsAt,
  TestsCliRecipeGithubHandleGhFailureHasTextError,
  TestsCliRecipeGithubHandleGhFailureHasUnknownResetTime,
  TestsCliRecipeGithubHandleGhFailureLoggerCustomizeReturn,
  TestsCliRecipeGithubHandleGhFailureLoggerCustomizeSpy,
} from '../../../../types/tests/cli/recipe/github/handle-gh-failure.test.d.ts';

/**
 * Tests - CLI - Recipe - GitHub - Handle Gh Failure - Handle Gh Failure.
 *
 * @since 0.22.0
 */
describe('handleGhFailure', () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    process.exitCode = 0;

    return;
  });

  it('logs rate-limit-specific error when stderr contains "API rate limit exceeded" and reset header', () => {
    const customizedLoggerMock: TestsCliRecipeGithubHandleGhFailureCustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: TestsCliRecipeGithubHandleGhFailureLoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as TestsCliRecipeGithubHandleGhFailureLoggerCustomizeReturn);

    handleGhFailure(
      {
        textOut: '',
        textError: 'API rate limit exceeded for user. X-RateLimit-Reset: 1735689600',
        code: 1,
      },
      'sync-identity',
    );

    const customizedErrorCalls: TestsCliRecipeGithubHandleGhFailureCustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasRateLimitError: TestsCliRecipeGithubHandleGhFailureHasRateLimitError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('GitHub API rate limit exceeded') === true
    ));

    const hasResetsAt: TestsCliRecipeGithubHandleGhFailureHasResetsAt = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('Resets at') === true
    ));

    ok(hasRateLimitError, 'Expected rate-limit-specific error message');

    ok(hasResetsAt, 'Expected "Resets at" in error message');

    strictEqual(process.exitCode, 1);

    loggerCustomizeSpy.mockRestore();

    return;
  });

  it('uses "unknown" reset time when X-RateLimit-Reset header is missing', () => {
    const customizedLoggerMock: TestsCliRecipeGithubHandleGhFailureCustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: TestsCliRecipeGithubHandleGhFailureLoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as TestsCliRecipeGithubHandleGhFailureLoggerCustomizeReturn);

    handleGhFailure(
      {
        textOut: '',
        textError: 'API rate limit exceeded for user.',
        code: 1,
      },
      'sync-features',
    );

    const customizedErrorCalls: TestsCliRecipeGithubHandleGhFailureCustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasUnknownResetTime: TestsCliRecipeGithubHandleGhFailureHasUnknownResetTime = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('Resets at unknown') === true
    ));

    ok(hasUnknownResetTime, 'Expected "Resets at unknown" in error message');

    strictEqual(process.exitCode, 1);

    loggerCustomizeSpy.mockRestore();

    return;
  });

  it('logs generic failure for non-rate-limit errors', () => {
    const customizedLoggerMock: TestsCliRecipeGithubHandleGhFailureCustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: TestsCliRecipeGithubHandleGhFailureLoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as TestsCliRecipeGithubHandleGhFailureLoggerCustomizeReturn);

    handleGhFailure(
      {
        textOut: '',
        textError: 'permission denied',
        code: 1,
      },
      'sync-policies',
    );

    const customizedErrorCalls: TestsCliRecipeGithubHandleGhFailureCustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasGenericError: TestsCliRecipeGithubHandleGhFailureHasGenericError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('sync-policies failed') === true
    ));

    const hasTextError: TestsCliRecipeGithubHandleGhFailureHasTextError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('permission denied') === true
    ));

    ok(hasGenericError, 'Expected generic failure message with recipe name');

    ok(hasTextError, 'Expected text error content in failure message');

    strictEqual(process.exitCode, 1);

    loggerCustomizeSpy.mockRestore();

    return;
  });

  return;
});

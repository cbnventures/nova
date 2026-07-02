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
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_CustomizedErrorCalls,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_CustomizedLoggerMock,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_HasGenericError,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_HasTextError,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_LoggerCustomizeReturn,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_LoggerCustomizeSpy,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_CustomizedErrorCalls,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_CustomizedLoggerMock,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_HasRateLimitError,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_HasResetsAt,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_LoggerCustomizeReturn,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_LoggerCustomizeSpy,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_CustomizedErrorCalls,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_CustomizedLoggerMock,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_HasUnknownResetTime,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_LoggerCustomizeReturn,
  Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_LoggerCustomizeSpy,
} from '../../../../types/tests/cli/recipe/github/handle-gh-failure.test.d.ts';

/**
 * Tests - CLI - Recipe - GitHub - Handle Gh Failure - Handle Gh Failure.
 *
 * @since 0.18.0
 */
describe('handleGhFailure', () => {
  beforeEach(() => {
    vi.restoreAllMocks();

    process.exitCode = 0;

    return;
  });

  it('logs rate-limit-specific error when stderr contains "API rate limit exceeded" and reset header', () => {
    const customizedLoggerMock: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_LoggerCustomizeReturn);

    handleGhFailure(
      {
        textOut: '',
        textError: 'API rate limit exceeded for user. X-RateLimit-Reset: 1735689600',
        code: 1,
      },
      'sync-identity',
    );

    const customizedErrorCalls: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasRateLimitError: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_HasRateLimitError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('GitHub API rate limit exceeded') === true
    ));

    const hasResetsAt: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsRateLimitSpecificErrorWhenStderrContainsAPIRateLimitExceededAndResetHeader_HasResetsAt = customizedErrorCalls.some((call) => (
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
    const customizedLoggerMock: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_LoggerCustomizeReturn);

    handleGhFailure(
      {
        textOut: '',
        textError: 'API rate limit exceeded for user.',
        code: 1,
      },
      'sync-features',
    );

    const customizedErrorCalls: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasUnknownResetTime: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_UsesUnknownResetTimeWhenXRateLimitResetHeaderIsMissing_HasUnknownResetTime = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('Resets at unknown') === true
    ));

    ok(hasUnknownResetTime, 'Expected "Resets at unknown" in error message');

    strictEqual(process.exitCode, 1);

    loggerCustomizeSpy.mockRestore();

    return;
  });

  it('logs generic failure for non-rate-limit errors', () => {
    const customizedLoggerMock: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };

    const loggerCustomizeSpy: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_LoggerCustomizeReturn);

    handleGhFailure(
      {
        textOut: '',
        textError: 'permission denied',
        code: 1,
      },
      'sync-policies',
    );

    const customizedErrorCalls: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_CustomizedErrorCalls = customizedLoggerMock['error']['mock']['calls'];

    const hasGenericError: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_HasGenericError = customizedErrorCalls.some((call) => (
      typeof call[0] === 'string'
      && call[0].includes('sync-policies failed') === true
    ));

    const hasTextError: Tests_Cli_Recipe_Github_HandleGhFailure_HandleGhFailure_LogsGenericFailureForNonRateLimitErrors_HasTextError = customizedErrorCalls.some((call) => (
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

import { LIB_REGEX_PATTERN_RATE_LIMIT_RESET } from '../../../lib/regex.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  CliRecipeGithubHandleGhFailureIsRateLimit,
  CliRecipeGithubHandleGhFailureRecipeName,
  CliRecipeGithubHandleGhFailureResetMatch,
  CliRecipeGithubHandleGhFailureResetTime,
  CliRecipeGithubHandleGhFailureResult,
  CliRecipeGithubHandleGhFailureReturns,
} from '../../../types/cli/recipe/github/handle-gh-failure.d.ts';

/**
 * CLI - Recipe - GitHub - Handle Gh Failure - Handle Gh Failure.
 *
 * Logs the appropriate error for a failed `gh` command result, branching on
 * whether the failure looks like a rate-limit hit. Sets process.exitCode = 1.
 *
 * @param {CliRecipeGithubHandleGhFailureResult}     result     - Result.
 * @param {CliRecipeGithubHandleGhFailureRecipeName} recipeName - Recipe name.
 *
 * @returns {CliRecipeGithubHandleGhFailureReturns}
 *
 * @since 0.18.0
 */
export function handleGhFailure(result: CliRecipeGithubHandleGhFailureResult, recipeName: CliRecipeGithubHandleGhFailureRecipeName): CliRecipeGithubHandleGhFailureReturns {
  const isRateLimit: CliRecipeGithubHandleGhFailureIsRateLimit = result['textError'].includes('API rate limit exceeded');

  if (isRateLimit === true) {
    const resetMatch: CliRecipeGithubHandleGhFailureResetMatch = result['textError'].match(LIB_REGEX_PATTERN_RATE_LIMIT_RESET);
    const resetTime: CliRecipeGithubHandleGhFailureResetTime = (resetMatch !== null && resetMatch[1] !== undefined) ? new Date(parseInt(resetMatch[1], 10) * 1000).toISOString() : 'unknown';

    Logger.customize({
      name: 'handleGhFailure',
      purpose: 'rateLimit',
    }).error(`Skipping ${recipeName}. GitHub API rate limit exceeded. Resets at ${resetTime}.`);
  } else {
    Logger.customize({
      name: 'handleGhFailure',
      purpose: 'failure',
    }).error(`${recipeName} failed. ${result['textError']}`);
  }

  process.exitCode = 1;

  return;
}

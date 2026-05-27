import { LIB_REGEX_PATTERN_RATE_LIMIT_RESET } from '../../../lib/regex.js';
import { Logger } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_Github_HandleGhFailure_IsRateLimit,
  Cli_Recipe_Github_HandleGhFailure_RecipeName,
  Cli_Recipe_Github_HandleGhFailure_ResetMatch,
  Cli_Recipe_Github_HandleGhFailure_ResetTime,
  Cli_Recipe_Github_HandleGhFailure_Result,
  Cli_Recipe_Github_HandleGhFailure_Returns,
} from '../../../types/cli/recipe/github/handle-gh-failure.d.ts';

/**
 * CLI - Recipe - GitHub - Handle Gh Failure - Handle Gh Failure.
 *
 * Logs the appropriate error for a failed `gh` command result, branching on
 * whether the failure looks like a rate-limit hit. Sets process.exitCode = 1.
 *
 * @param {Cli_Recipe_Github_HandleGhFailure_Result}     result     - Result.
 * @param {Cli_Recipe_Github_HandleGhFailure_RecipeName} recipeName - Recipe name.
 *
 * @returns {Cli_Recipe_Github_HandleGhFailure_Returns}
 *
 * @since 0.18.0
 */
export function handleGhFailure(result: Cli_Recipe_Github_HandleGhFailure_Result, recipeName: Cli_Recipe_Github_HandleGhFailure_RecipeName): Cli_Recipe_Github_HandleGhFailure_Returns {
  const isRateLimit: Cli_Recipe_Github_HandleGhFailure_IsRateLimit = result['textError'].includes('API rate limit exceeded');

  if (isRateLimit === true) {
    const resetMatch: Cli_Recipe_Github_HandleGhFailure_ResetMatch = result['textError'].match(LIB_REGEX_PATTERN_RATE_LIMIT_RESET);
    const resetTime: Cli_Recipe_Github_HandleGhFailure_ResetTime = (resetMatch !== null && resetMatch[1] !== undefined) ? new Date(parseInt(resetMatch[1], 10) * 1000).toISOString() : 'unknown';

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

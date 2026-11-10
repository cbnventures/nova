import {
  LIB_REGEX_PATTERN_ENV_VAR_KEY_SCREAMING_SNAKE,
  LIB_REGEX_PATTERN_ENVIRONMENT_PREFIX,
} from './regex.js';

import type { Lib_EnvNamespace_LibEnvNamespace } from '../types/lib/env-namespace.d.ts';

/**
 * Lib - Env Namespace - Lib Env Namespace.
 *
 * Derives GitHub Variable and Secret names from namespace prefixes and keys.
 * Config, prompt, and scaffold callers share its format and collision checks.
 *
 * @since 0.39.0
 */
export const libEnvNamespace: Lib_EnvNamespace_LibEnvNamespace = {
  githubName: (prefix, key) => prefix + key,
  githubProfileName: (prefix, profile, key) => `${prefix}${profile.toUpperCase()}_${key}`,
  isGithubLegalName: (name) => LIB_REGEX_PATTERN_ENV_VAR_KEY_SCREAMING_SNAKE.test(name) === true && name.toUpperCase().startsWith('GITHUB_') === false,
  isReservedPrefix: (prefix) => ['GITHUB_'].some((reservedPrefix) => prefix.toUpperCase().startsWith(reservedPrefix) === true),
  isValidPrefix: (prefix) => LIB_REGEX_PATTERN_ENVIRONMENT_PREFIX.test(prefix) === true,
  prefixesOverlap: (a, b) => (
    a.toUpperCase() === b.toUpperCase()
    || a.toUpperCase().startsWith(b.toUpperCase()) === true
    || b.toUpperCase().startsWith(a.toUpperCase()) === true
  ),
  startsWithPrefix: (key, prefix) => key.toUpperCase().startsWith(prefix.toUpperCase()) === true,
};

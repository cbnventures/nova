import { LIB_REGEX_PATTERN_ENV_VAR_KEY_SCREAMING_SNAKE } from './regex.js';

import type { Lib_EnvNamespace_LibEnvNamespace } from '../types/lib/env-namespace.d.ts';

/**
 * Lib - Env Namespace - Lib Env Namespace.
 *
 * Pure helpers that derive a GitHub Variable or Secret name from a prefix plus a key and
 * answer the prefix-overlap, reserved-prefix, and legal-name questions, all case-folded.
 *
 * @since 0.21.0
 */
export const libEnvNamespace: Lib_EnvNamespace_LibEnvNamespace = {
  githubName: (prefix, key) => prefix + key,
  isGithubLegalName: (name) => LIB_REGEX_PATTERN_ENV_VAR_KEY_SCREAMING_SNAKE.test(name) === true && name.toUpperCase().startsWith('GITHUB_') === false,
  isReservedPrefix: (prefix) => ['GITHUB_'].some((reservedPrefix) => prefix.toUpperCase().startsWith(reservedPrefix) === true),
  prefixesOverlap: (a, b) => (
    a.toUpperCase() === b.toUpperCase()
    || a.toUpperCase().startsWith(b.toUpperCase()) === true
    || b.toUpperCase().startsWith(a.toUpperCase()) === true
  ),
  startsWithPrefix: (key, prefix) => key.toUpperCase().startsWith(prefix.toUpperCase()) === true,
};

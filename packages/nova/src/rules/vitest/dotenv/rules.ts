import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { it } from 'vitest';

import { findEnvQuoteViolations } from '../../../lib/dotenv.js';
import { isEnabled } from '../enable.js';

import type {
  Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Config,
  Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Content,
  Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Enable,
  Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Failures,
  Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_FilePath,
  Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Returns,
  Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Violations,
} from '../../../types/rules/vitest/dotenv/rules.d.ts';

/**
 * Rules - Vitest - Dotenv - Rules - Values Double Quoted.
 *
 * Rule `values-double-quoted`: every value in the scanned `.env` files must be wrapped in
 * balanced double quotes. Reads each configured path (skipping any that does not exist),
 * classifies its entries, and aggregates one assertion across all files.
 *
 * @param {Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Config} config - Config.
 * @param {Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Returns}
 *
 * @since 0.20.0
 */
export function valuesDoubleQuoted(config: Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Config, enable: Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Enable): Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Returns {
  if (isEnabled('values-double-quoted', enable) === false) {
    return;
  }

  it(`all .env values are double-quoted${''}`, async () => {
    const failures: Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Failures = [];

    for (const path of config['envPaths']) {
      const filePath: Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_FilePath = join(config['rootDir'], path);
      let content: Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Content = '';

      // Skip a missing .env file instead of throwing on ENOENT.
      try {
        content = await readFile(filePath, 'utf-8');
      } catch {
        continue;
      }

      const violations: Rules_Vitest_Dotenv_Rules_ValuesDoubleQuoted_Violations = findEnvQuoteViolations(content);

      for (const violation of violations) {
        failures.push(`${path}: ${violation['reason']}`);
      }
    }

    strictEqual(failures.length, 0, failures.join('\n'));

    return;
  });

  return;
}

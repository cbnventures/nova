import { strictEqual } from 'node:assert/strict';
import { mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, it } from 'vitest';

import { findEnvQuoteViolations } from '../../../lib/dotenv.js';
import { registerDotenvSuite } from '../../../rules/vitest/dotenv/register.js';

import type {
  Tests_Rules_Vitest_Dotenv_FixtureRoot,
  Tests_Rules_Vitest_Dotenv_MissingViolations,
  Tests_Rules_Vitest_Dotenv_PresentViolations,
} from '../../../types/tests/rules/vitest/dotenv.test.d.ts';

/**
 * Tests - Rules - Vitest - Dotenv - Fixture Root.
 *
 * Isolated kit test: builds a temp fixture project containing one VALID `.env` whose values are all
 * double-quoted (a non-empty value and an empty value). Registering the suite over this root with
 * the single conformance key enabled proves the enable gating stays green, and listing a
 * non-existent path alongside the good file proves the ENOENT-skip path swallows a missing file
 * instead of failing the run.
 *
 * @since 0.20.0
 */
const fixtureRoot: Tests_Rules_Vitest_Dotenv_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-dotenv-kit-'));

writeFileSync(
  join(fixtureRoot, '.env'),
  [
    'A="x"',
    'B=""',
    '',
  ].join('\n'),
);

describe(`dotenv suite helpers${''}`, () => {
  it(`treats a present double-quoted file as having no violations${''}`, () => {
    const presentViolations: Tests_Rules_Vitest_Dotenv_PresentViolations = findEnvQuoteViolations([
      'A="x"',
      'B=""',
    ].join('\n'));

    strictEqual(presentViolations.length, 0);

    return;
  });

  it(`classifies nothing for an empty (absent-file-equivalent) read${''}`, () => {
    const missingViolations: Tests_Rules_Vitest_Dotenv_MissingViolations = findEnvQuoteViolations('');

    strictEqual(missingViolations.length, 0);

    return;
  });

  return;
});

// Enable gating: the single conformance key runs against the good fixture root. The good `.env`
// is fully double-quoted so it passes, and the non-existent `.env.sample` entry is skipped on
// ENOENT rather than failing, so the registered suite stays green.
registerDotenvSuite({
  rootDir: fixtureRoot,
  envPaths: [
    '.env',
    '.env.sample',
  ],
  enable: ['values-double-quoted'],
});

import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import * as vitest from 'vitest';

import { registerToolingCoverageSuite } from '../../../rules/vitest/tooling-coverage/register.js';

import type { Tests_Rules_Vitest_ToolingCoverage_FixtureRoot } from '../../../types/tests/rules/vitest/tooling-coverage.test.d.ts';

/**
 * Tests - Rules - Vitest - Tooling Coverage - Fixture Root.
 *
 * @since 0.49.0
 */
const fixtureRoot: Tests_Rules_Vitest_ToolingCoverage_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-tooling-coverage-kit-'));

mkdirSync(join(fixtureRoot, 'scripts', 'lib'), { recursive: true });

writeFileSync(join(fixtureRoot, 'scripts', 'build.mjs'), 'export const build = true;\n');

writeFileSync(join(fixtureRoot, 'scripts', 'lib', 'helper.mjs'), 'export const helper = true;\n');

writeFileSync(join(fixtureRoot, 'eslint.config.mjs'), 'export default [];\n');

writeFileSync(join(fixtureRoot, 'tsconfig.scripts.json'), `${JSON.stringify({
  compilerOptions: {
    allowJs: true,
    checkJs: true,
    noEmit: true,
  },
  include: ['./scripts/**/*.mjs'],
}, null, 2)}\n`);

writeFileSync(join(fixtureRoot, 'tsconfig.json'), `${JSON.stringify({
  references: [{
    path: './tsconfig.scripts.json',
  }],
  files: [],
}, null, 2)}\n`);

registerToolingCoverageSuite({
  vitest,
  rootDir: fixtureRoot,
  enable: 'all',
});

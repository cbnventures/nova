import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { registerTypeDeclarationSuite } from '../../../rules/vitest/type-declarations/register.js';

import type {
  Tests_Rules_Vitest_TypeDeclarations_FixtureRoot,
  Tests_Rules_Vitest_TypeDeclarations_SourceDir,
  Tests_Rules_Vitest_TypeDeclarations_TypesDir,
} from '../../../types/tests/rules/vitest/type-declarations.test.d.ts';

/**
 * Tests - Rules - Vitest - Type Declarations - Fixture Root.
 *
 * Isolated kit test: builds a temp fixture project whose .d.ts deliberately orders its sections
 * NON-alphabetically (an `inspector-section-alphabetical` violation) while keeping every filename
 * valid. Running the suite with only `inspector-filename-validation` enabled stays green, which
 * proves a non-enabled check does not run -- if the alphabetical check ran it would fail here.
 *
 * @since 0.20.0
 */
const fixtureRoot: Tests_Rules_Vitest_TypeDeclarations_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-td-kit-'));

const sourceDir: Tests_Rules_Vitest_TypeDeclarations_SourceDir = join(fixtureRoot, 'src');

const typesDir: Tests_Rules_Vitest_TypeDeclarations_TypesDir = join(sourceDir, 'types');

mkdirSync(typesDir, { recursive: true });

writeFileSync(
  join(sourceDir, 'widget.ts'),
  [
    'export const alpha: string = \'a\';',
    'export const beta: string = \'b\';',
    '',
  ].join('\n'),
);

writeFileSync(
  join(typesDir, 'widget.d.ts'),
  [
    'export type Widget_Beta = string;',
    '',
    'export type Widget_Alpha = string;',
    '',
  ].join('\n'),
);

registerTypeDeclarationSuite({
  packageRoot: fixtureRoot,
  typeRoots: ['src'],
  enable: ['inspector-filename-validation'],
});

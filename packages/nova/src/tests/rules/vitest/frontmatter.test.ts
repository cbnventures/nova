import { strictEqual } from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import * as vitest from 'vitest';

import { registerFrontmatterSuite } from '../../../rules/vitest/frontmatter/register.js';
import { splitFrontmatter } from '../../../rules/vitest/frontmatter/rules.js';

import type {
  Tests_Rules_Vitest_Frontmatter_DocsDir,
  Tests_Rules_Vitest_Frontmatter_FixtureRoot,
  Tests_Rules_Vitest_Frontmatter_SplitFrontmatter_KeepsFieldsAfterAValueThatContainsATripleDash_Split,
} from '../../../types/tests/rules/vitest/frontmatter.test.d.ts';

/**
 * Tests - Rules - Vitest - Frontmatter - Fixture Root.
 *
 * Isolated kit test: builds a temp fixture project under a docs dir with one VALID page (real
 * frontmatter, all required fields) and one page MISSING its required fields. Running the suite
 * with only `frontmatter-present` enabled stays green because both pages open with a `---` fence --
 * which proves a non-enabled check (`required-fields-present-docs`) does not run, otherwise the
 * second page would fail.
 *
 * @since 0.20.0
 */
const fixtureRoot: Tests_Rules_Vitest_Frontmatter_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-fm-kit-'));

const docsDir: Tests_Rules_Vitest_Frontmatter_DocsDir = join(fixtureRoot, 'docs');

mkdirSync(docsDir, { recursive: true });

writeFileSync(
  join(docsDir, 'overview.md'),
  [
    '---',
    'id: overview',
    'title: Overview',
    'description: A real description.',
    'keywords:',
    '  - alpha',
    '  - beta',
    'tags:',
    '  - guide',
    '---',
    '',
    'Real content.',
    '',
  ].join('\n'),
);

writeFileSync(
  join(docsDir, 'incomplete.md'),
  [
    '---',
    'title: Incomplete',
    '---',
    '',
    'Body without required fields.',
    '',
  ].join('\n'),
);

registerFrontmatterSuite({
  vitest,
  rootDir: fixtureRoot,
  contentDirs: ['docs'],
  requiredFields: [
    'id',
    'title',
    'description',
    'keywords',
    'tags',
  ],
  enable: ['frontmatter-present'],
});

/**
 * Tests - Rules - Vitest - Frontmatter.
 *
 * Regression: the closing fence must be found as a `---` at the start of a line. A `---`
 * appearing inside a frontmatter value must not truncate the block, otherwise every field
 * after it looks missing and dedicated rules report false failures.
 *
 * @since 0.21.0
 */
vitest.describe('split frontmatter', async () => {
  vitest.it('keeps fields after a value that contains a triple-dash', () => {
    const split: Tests_Rules_Vitest_Frontmatter_SplitFrontmatter_KeepsFieldsAfterAValueThatContainsATripleDash_Split = splitFrontmatter([
      '---',
      'id: overview',
      'title: Before --- after',
      'description: A real description.',
      '---',
      '',
      'Body.',
      '',
    ].join('\n'));

    strictEqual(split !== null && split['frontmatter'].includes('description: A real description.'), true);

    return;
  });

  return;
});

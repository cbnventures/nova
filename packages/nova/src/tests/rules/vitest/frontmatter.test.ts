import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { registerFrontmatterSuite } from '../../../rules/vitest/frontmatter/register.js';

import type {
  Tests_Rules_Vitest_Frontmatter_DocsDir,
  Tests_Rules_Vitest_Frontmatter_FixtureRoot,
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

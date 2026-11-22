import {
  ok,
  rejects,
  strictEqual,
} from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import * as vitest from 'vitest';

import { registerFrontmatterSuite } from '../../../rules/vitest/frontmatter/register.js';
import { frontmatterClosed, splitFrontmatter } from '../../../rules/vitest/frontmatter/rules.js';
import { resetActiveVitest, setActiveVitest } from '../../../rules/vitest/internal/active-vitest.js';

import type {
  Tests_Rules_Vitest_Frontmatter_DocsDir,
  Tests_Rules_Vitest_Frontmatter_FixtureRoot,
  Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_ClosedFactory,
  Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_ClosedRoot,
  Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Its,
  Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Sentinel,
  Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_UnclosedFactory,
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

/**
 * Tests - Rules - Vitest - Frontmatter.
 *
 * Regression: a "---" inside a value or the body is not a closing fence. Only a "---" at
 * the start of a line closes the frontmatter, the same way "splitFrontmatter" finds it.
 *
 * @since 0.50.0
 */
vitest.describe('frontmatter closed', () => {
  vitest.afterEach(() => {
    resetActiveVitest();

    return;
  });

  vitest.it('fails a file whose only later triple-dash is inside a line', async () => {
    const its: Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Its = [];
    const sentinel: Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_Sentinel = {
      describe: () => {
        return;
      },
      it: (_name, factory) => {
        its.push(factory);

        return;
      },
    };
    const closedRoot: Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_ClosedRoot = mkdtempSync(join(tmpdir(), 'nova-fm-closed-'));

    writeFileSync(join(closedRoot, 'closed.md'), [
      '---',
      'title: Before --- after',
      '---',
      '',
      'Body.',
      '',
    ].join('\n'));
    writeFileSync(join(closedRoot, 'unclosed.md'), [
      '---',
      'title: Before --- after',
      '',
      'Body with no closing fence.',
      '',
    ].join('\n'));

    resetActiveVitest();
    setActiveVitest(sentinel);

    await frontmatterClosed({
      requiredFields: [],
      requiredBlogFields: [],
      contentDirs: [],
      blogDir: 'blog',
      indexSlug: null,
      placeholderSentinel: undefined,
      placeholderBodyPrefix: undefined,
      rootDir: closedRoot,
      files: [
        'closed.md',
        'unclosed.md',
      ],
    }, ['frontmatter-closed']);

    const closedFactory: Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_ClosedFactory = its[0];
    const unclosedFactory: Tests_Rules_Vitest_Frontmatter_FrontmatterClosed_FailsAFileWhoseOnlyLaterTripleDashIsInsideALine_UnclosedFactory = its[1];

    strictEqual(its.length, 2);
    ok(closedFactory !== undefined);
    ok(unclosedFactory !== undefined);

    await closedFactory();

    await rejects(async () => {
      await unclosedFactory();

      return;
    }, (error) => error instanceof Error && error.message.includes('unclosed.md: unclosed frontmatter'));

    return;
  });

  return;
});

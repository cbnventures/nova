import {
  ok,
  rejects,
  strictEqual,
} from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import * as vitest from 'vitest';
import {
  afterEach,
  describe,
  it,
} from 'vitest';

import { resetActiveVitest, setActiveVitest } from '../../../rules/vitest/internal/active-vitest.js';
import { registerMarkdownTableSuite } from '../../../rules/vitest/markdown-table/register.js';
import { tablesMatchMarkdownTableOutput } from '../../../rules/vitest/markdown-table/rules.js';
import { MarkdownTable } from '../../../toolkit/index.js';

import type {
  Tests_Rules_Vitest_MarkdownTable_BadFactory,
  Tests_Rules_Vitest_MarkdownTable_BadIts,
  Tests_Rules_Vitest_MarkdownTable_BadRootDir,
  Tests_Rules_Vitest_MarkdownTable_BadSentinel,
  Tests_Rules_Vitest_MarkdownTable_DocsDir,
  Tests_Rules_Vitest_MarkdownTable_FixtureRoot,
  Tests_Rules_Vitest_MarkdownTable_GoodTable,
} from '../../../types/tests/rules/vitest/markdown-table.test.d.ts';

/**
 * Tests - Rules - Vitest - Markdown Table - Fixture Root.
 *
 * Isolated kit test: builds a temp fixture project with one VALID page whose table is rendered
 * by the canonical `MarkdownTable` class (so it is byte-exact) and a separate root with a page
 * whose table is intentionally misaligned. A direct run of the rule over the bad root proves the
 * planted table fails, and a single-key
 * `registerMarkdownTableSuite` call over the good-only root proves the enable gating stays green.
 *
 * @since 0.20.0
 */
const fixtureRoot: Tests_Rules_Vitest_MarkdownTable_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-markdown-table-kit-'));

const docsDir: Tests_Rules_Vitest_MarkdownTable_DocsDir = join(fixtureRoot, 'docs');

mkdirSync(docsDir, { recursive: true });

const goodTable: Tests_Rules_Vitest_MarkdownTable_GoodTable = new MarkdownTable([
  'Name',
  'Value',
]);

goodTable.addRow([
  'alpha',
  'one',
]);
goodTable.addRow([
  'beta',
  'two',
]);

writeFileSync(
  join(docsDir, 'good.md'),
  [
    '---',
    'id: good',
    'title: Good',
    '---',
    '',
    '## Table',
    '',
    goodTable.render(),
    '',
  ].join('\n'),
);

const badRootDir: Tests_Rules_Vitest_MarkdownTable_BadRootDir = mkdtempSync(join(tmpdir(), 'nova-markdown-table-bad-'));

mkdirSync(join(badRootDir, 'docs'), { recursive: true });

writeFileSync(
  join(badRootDir, 'docs', 'bad.md'),
  [
    '---',
    'id: bad',
    'title: Bad',
    '---',
    '',
    '## Table',
    '',
    '| Name | Value |',
    '|-|-|',
    '| alpha | one |',
    '',
  ].join('\n'),
);

describe(`markdown table kit helpers${''}`, () => {
  afterEach(() => {
    resetActiveVitest();

    return;
  });

  it(`flags a planted misaligned table as not matching MarkdownTable output${''}`, async () => {
    const badIts: Tests_Rules_Vitest_MarkdownTable_BadIts = [];
    const badSentinel: Tests_Rules_Vitest_MarkdownTable_BadSentinel = {
      describe: () => {
        return;
      },
      it: (_name, factory) => {
        badIts.push(factory);

        return;
      },
    };

    resetActiveVitest();
    setActiveVitest(badSentinel);

    await tablesMatchMarkdownTableOutput({
      contentDirs: ['docs'],
      rootDir: badRootDir,
      fileExtensions: [
        '.md',
        '.mdx',
      ],
    }, ['tables-match-markdowntable-output']);

    const badFactory: Tests_Rules_Vitest_MarkdownTable_BadFactory = badIts[0];

    strictEqual(badIts.length, 1);
    ok(badFactory !== undefined);

    await rejects(async () => {
      await badFactory();

      return;
    }, (error) => error instanceof Error && error.message.includes('docs/bad.md (table 1)'));

    return;
  });

  return;
});

// Enable gating: the single conformance key runs against the good-only root, which renders its
// table via the canonical class, so the registered suite stays green.
registerMarkdownTableSuite({
  vitest,
  rootDir: fixtureRoot,
  contentDirs: ['docs'],
  enable: ['tables-match-markdowntable-output'],
});

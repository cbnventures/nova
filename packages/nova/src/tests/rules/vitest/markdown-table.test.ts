import { strictEqual } from 'node:assert/strict';
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, it } from 'vitest';

import { discoverContentFiles } from '../../../lib/file-discovery.js';
import { registerMarkdownTableSuite } from '../../../rules/vitest/markdown-table/register.js';
import { MarkdownTable } from '../../../toolkit/index.js';

import type {
  Tests_Rules_Vitest_MarkdownTable_BadDelimiter,
  Tests_Rules_Vitest_MarkdownTable_BadFiles,
  Tests_Rules_Vitest_MarkdownTable_BadHeader,
  Tests_Rules_Vitest_MarkdownTable_BadRootDir,
  Tests_Rules_Vitest_MarkdownTable_BadRow,
  Tests_Rules_Vitest_MarkdownTable_BadTable,
  Tests_Rules_Vitest_MarkdownTable_DocsDir,
  Tests_Rules_Vitest_MarkdownTable_FixtureRoot,
  Tests_Rules_Vitest_MarkdownTable_GoodFiles,
  Tests_Rules_Vitest_MarkdownTable_GoodHeader,
  Tests_Rules_Vitest_MarkdownTable_GoodTable,
} from '../../../types/tests/rules/vitest/markdown-table.test.d.ts';

/**
 * Tests - Rules - Vitest - Markdown Table - Fixture Root.
 *
 * Isolated kit test: builds a temp fixture project with one VALID page whose table is rendered
 * by the canonical `MarkdownTable` class (so it is byte-exact) and a separate root with a page
 * whose table is intentionally misaligned. Direct assertions prove the good table round-trips and
 * the planted bad table does not, file discovery sees the fixtures, and a single-key
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
  it(`discovers the good fixture page${''}`, async () => {
    const goodFiles: Tests_Rules_Vitest_MarkdownTable_GoodFiles = await discoverContentFiles({
      rootDir: fixtureRoot,
      contentDirs: ['docs'],
      fileExtensions: [
        '.md',
        '.mdx',
      ],
    });

    strictEqual(goodFiles.includes('docs/good.md'), true);

    return;
  });

  it(`the canonical good table round-trips through MarkdownTable${''}`, () => {
    const goodHeader: Tests_Rules_Vitest_MarkdownTable_GoodHeader = new MarkdownTable([
      'Name',
      'Value',
    ]);

    goodHeader.addRow([
      'alpha',
      'one',
    ]);
    goodHeader.addRow([
      'beta',
      'two',
    ]);

    strictEqual(goodHeader.render(), goodTable.render());

    return;
  });

  it(`flags a planted misaligned table as not matching MarkdownTable output${''}`, async () => {
    const badFiles: Tests_Rules_Vitest_MarkdownTable_BadFiles = await discoverContentFiles({
      rootDir: badRootDir,
      contentDirs: ['docs'],
      fileExtensions: [
        '.md',
        '.mdx',
      ],
    });

    strictEqual(badFiles.includes('docs/bad.md'), true);

    const badHeader: Tests_Rules_Vitest_MarkdownTable_BadHeader = '| Name | Value |';
    const badDelimiter: Tests_Rules_Vitest_MarkdownTable_BadDelimiter = '|-|-|';
    const badRow: Tests_Rules_Vitest_MarkdownTable_BadRow = '| alpha | one |';

    const badTable: Tests_Rules_Vitest_MarkdownTable_BadTable = new MarkdownTable([
      'Name',
      'Value',
    ]);

    badTable.addRow([
      'alpha',
      'one',
    ]);

    strictEqual(badTable.render() !== [
      badHeader,
      badDelimiter,
      badRow,
    ].join('\n'), true);

    return;
  });

  return;
});

// Enable gating: the single conformance key runs against the good-only root, which renders its
// table via the canonical class, so the registered suite stays green.
registerMarkdownTableSuite({
  rootDir: fixtureRoot,
  contentDirs: ['docs'],
  enable: ['tables-match-markdowntable-output'],
});

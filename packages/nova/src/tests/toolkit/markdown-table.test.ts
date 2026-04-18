import {
  doesNotThrow,
  fail,
  ok,
  strictEqual,
  throws,
} from 'node:assert/strict';

import { describe, it } from 'vitest';

import { MarkdownTable } from '../../toolkit/index.js';

import type {
  TestsToolkitMarkdownTableMarkdowntableAddrowResult,
  TestsToolkitMarkdownTableMarkdowntableAddrowTable,
  TestsToolkitMarkdownTableMarkdowntableRenderDelimiterLine,
  TestsToolkitMarkdownTableMarkdowntableRenderEndsWithDash,
  TestsToolkitMarkdownTableMarkdowntableRenderEndsWithPipe,
  TestsToolkitMarkdownTableMarkdowntableRenderHeaderLine,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesDash,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesDashSeparator,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesEscapedPipe,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesJoinedLines,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesNode,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesNova,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesNpm,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesOriginalNewline,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesPaddedHeader,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesPipeSeparator,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesTenDashes,
  TestsToolkitMarkdownTableMarkdowntableRenderIncludesVersion,
  TestsToolkitMarkdownTableMarkdowntableRenderLine,
  TestsToolkitMarkdownTableMarkdowntableRenderLines,
  TestsToolkitMarkdownTableMarkdowntableRenderOutput,
  TestsToolkitMarkdownTableMarkdowntableRenderStartsWithDash,
  TestsToolkitMarkdownTableMarkdowntableRenderStartsWithPipe,
  TestsToolkitMarkdownTableMarkdowntableRenderTable,
} from '../../types/tests/toolkit/markdown-table.test.d.ts';

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Constructor.
 *
 * @since 0.13.0
 */
describe('MarkdownTable constructor', async () => {
  it('accepts valid headers', () => {
    doesNotThrow(() => {
      void new MarkdownTable([
        'Name',
        'Version',
      ]);

      return;
    });

    return;
  });

  it('throws on empty headers array', () => {
    throws(() => {
      void new MarkdownTable([]);

      return;
    }, {
      message: '"headers" must be a non-empty array',
    });

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable AddRow.
 *
 * @since 0.13.0
 */
describe('MarkdownTable addRow', async () => {
  it('accepts row matching headers length', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableAddrowTable = new MarkdownTable([
      'Name',
      'Version',
    ]);

    doesNotThrow(() => {
      table.addRow([
        'nova',
        '1.0.0',
      ]);

      return;
    });

    return;
  });

  it('throws on row length mismatch', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableAddrowTable = new MarkdownTable([
      'Name',
      'Version',
    ]);

    throws(() => {
      table.addRow(['nova']);

      return;
    }, {
      message: 'Length of "rows" must equal length of "headers"',
    });

    return;
  });

  it('returns instance for chaining', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableAddrowTable = new MarkdownTable([
      'Name',
      'Version',
    ]);
    const result: TestsToolkitMarkdownTableMarkdowntableAddrowResult = table.addRow([
      'nova',
      '1.0.0',
    ]);

    strictEqual(result, table);

    return;
  });

  it('supports chaining multiple rows', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableAddrowTable = new MarkdownTable([
      'A',
      'B',
    ]);

    const result: TestsToolkitMarkdownTableMarkdowntableAddrowResult = table
      .addRow([
        '1',
        '2',
      ])
      .addRow([
        '3',
        '4',
      ]);

    strictEqual(result, table);

    return;
  });

  return;
});

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render.
 *
 * @since 0.13.0
 */
describe('MarkdownTable render', async () => {
  it('renders basic table with one row', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableRenderTable = new MarkdownTable([
      'Name',
      'Version',
    ]);

    table.addRow([
      'nova',
      '1.0.0',
    ]);

    const output: TestsToolkitMarkdownTableMarkdowntableRenderOutput = table.render();
    const lines: TestsToolkitMarkdownTableMarkdowntableRenderLines = output.split('\n');

    strictEqual(lines.length, 3);

    const line0: TestsToolkitMarkdownTableMarkdowntableRenderLine = lines[0];
    const line1: TestsToolkitMarkdownTableMarkdowntableRenderLine = lines[1];
    const line2: TestsToolkitMarkdownTableMarkdowntableRenderLine = lines[2];

    if (
      line0 === undefined
      || line1 === undefined
      || line2 === undefined
    ) {
      fail('Expected lines to be defined');
    }

    const startsWithPipe: TestsToolkitMarkdownTableMarkdowntableRenderStartsWithPipe = line0.startsWith('| ');
    const endsWithPipe: TestsToolkitMarkdownTableMarkdowntableRenderEndsWithPipe = line0.endsWith(' |');
    const includesDash: TestsToolkitMarkdownTableMarkdowntableRenderIncludesDash = line1.includes('-');
    const includesNova: TestsToolkitMarkdownTableMarkdowntableRenderIncludesNova = line2.includes('nova');
    const includesVersion: TestsToolkitMarkdownTableMarkdowntableRenderIncludesVersion = line2.includes('1.0.0');

    ok(startsWithPipe);
    ok(endsWithPipe);
    ok(includesDash);
    ok(includesNova);
    ok(includesVersion);

    return;
  });

  it('renders table with multiple rows', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableRenderTable = new MarkdownTable([
      'Tool',
      'Version',
    ]);

    table.addRow([
      'node',
      '20.10.0',
    ]);
    table.addRow([
      'npm',
      '10.2.3',
    ]);

    const output: TestsToolkitMarkdownTableMarkdowntableRenderOutput = table.render();
    const lines: TestsToolkitMarkdownTableMarkdowntableRenderLines = output.split('\n');

    strictEqual(lines.length, 4);

    const line2: TestsToolkitMarkdownTableMarkdowntableRenderLine = lines[2];
    const line3: TestsToolkitMarkdownTableMarkdowntableRenderLine = lines[3];

    if (line2 === undefined || line3 === undefined) {
      fail('Expected lines to be defined');
    }

    const includesNode: TestsToolkitMarkdownTableMarkdowntableRenderIncludesNode = line2.includes('node');
    const includesNpm: TestsToolkitMarkdownTableMarkdowntableRenderIncludesNpm = line3.includes('npm');

    ok(includesNode);
    ok(includesNpm);

    return;
  });

  it('renders headers-only table', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableRenderTable = new MarkdownTable([
      'A',
      'B',
      'C',
    ]);
    const output: TestsToolkitMarkdownTableMarkdowntableRenderOutput = table.render();
    const lines: TestsToolkitMarkdownTableMarkdowntableRenderLines = output.split('\n');

    strictEqual(lines.length, 3);

    return;
  });

  it('escapes pipe characters in cells', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableRenderTable = new MarkdownTable(['Expression']);

    table.addRow(['a | b']);

    const output: TestsToolkitMarkdownTableMarkdowntableRenderOutput = table.render();

    const includesEscapedPipe: TestsToolkitMarkdownTableMarkdowntableRenderIncludesEscapedPipe = output.includes('a \\| b');

    ok(includesEscapedPipe);

    return;
  });

  it('replaces newlines in cells with spaces', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableRenderTable = new MarkdownTable(['Text']);

    table.addRow(['line1\nline2']);

    const output: TestsToolkitMarkdownTableMarkdowntableRenderOutput = table.render();

    const includesJoinedLines: TestsToolkitMarkdownTableMarkdowntableRenderIncludesJoinedLines = output.includes('line1 line2');
    const includesOriginalNewline: TestsToolkitMarkdownTableMarkdowntableRenderIncludesOriginalNewline = output.includes('line1\nline2');

    ok(includesJoinedLines);
    strictEqual(includesOriginalNewline, false);

    return;
  });

  it('pads columns to minimum width', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableRenderTable = new MarkdownTable(['A']);

    table.addRow(['x']);

    const output: TestsToolkitMarkdownTableMarkdowntableRenderOutput = table.render();
    const headerLine: TestsToolkitMarkdownTableMarkdowntableRenderHeaderLine = output.split('\n')[0] ?? '';

    // Column content should be padded to at least 3 characters.
    const includesPaddedHeader: TestsToolkitMarkdownTableMarkdowntableRenderIncludesPaddedHeader = headerLine.includes('A  ');

    ok(includesPaddedHeader);

    return;
  });

  it('respects custom minimum column width', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableRenderTable = new MarkdownTable(['A'], {
      minimumColumnWidth: 10,
      padDelimiterRow: false,
    });

    table.addRow(['x']);

    const output: TestsToolkitMarkdownTableMarkdowntableRenderOutput = table.render();
    const delimiterLine: TestsToolkitMarkdownTableMarkdowntableRenderDelimiterLine = output.split('\n')[1] ?? '';

    const includesTenDashes: TestsToolkitMarkdownTableMarkdowntableRenderIncludesTenDashes = delimiterLine.includes('----------');

    ok(includesTenDashes);

    return;
  });

  it('renders padded delimiter row when option enabled', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableRenderTable = new MarkdownTable([
      'Name',
      'Value',
    ], {
      minimumColumnWidth: 3,
      padDelimiterRow: true,
    });

    table.addRow([
      'a',
      'b',
    ]);

    const output: TestsToolkitMarkdownTableMarkdowntableRenderOutput = table.render();
    const delimiterLine: TestsToolkitMarkdownTableMarkdowntableRenderDelimiterLine = output.split('\n')[1] ?? '';

    const startsWithPipe: TestsToolkitMarkdownTableMarkdowntableRenderStartsWithPipe = delimiterLine.startsWith('| ');
    const includesPipeSeparator: TestsToolkitMarkdownTableMarkdowntableRenderIncludesPipeSeparator = delimiterLine.includes(' | ');
    const endsWithPipe: TestsToolkitMarkdownTableMarkdowntableRenderEndsWithPipe = delimiterLine.endsWith(' |');

    ok(startsWithPipe);
    ok(includesPipeSeparator);
    ok(endsWithPipe);

    return;
  });

  it('renders compact delimiter row by default', () => {
    const table: TestsToolkitMarkdownTableMarkdowntableRenderTable = new MarkdownTable([
      'Name',
      'Value',
    ]);

    table.addRow([
      'a',
      'b',
    ]);

    const output: TestsToolkitMarkdownTableMarkdowntableRenderOutput = table.render();
    const delimiterLine: TestsToolkitMarkdownTableMarkdowntableRenderDelimiterLine = output.split('\n')[1] ?? '';

    const startsWithDash: TestsToolkitMarkdownTableMarkdowntableRenderStartsWithDash = delimiterLine.startsWith('|-');
    const includesDashSeparator: TestsToolkitMarkdownTableMarkdowntableRenderIncludesDashSeparator = delimiterLine.includes('-|-');
    const endsWithDash: TestsToolkitMarkdownTableMarkdowntableRenderEndsWithDash = delimiterLine.endsWith('-|');

    ok(startsWithDash);
    ok(includesDashSeparator);
    ok(endsWithDash);

    return;
  });

  return;
});

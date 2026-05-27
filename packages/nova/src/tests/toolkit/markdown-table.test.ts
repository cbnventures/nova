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
  Tests_Toolkit_MarkdownTable_MarkdowntableAddrowResult,
  Tests_Toolkit_MarkdownTable_MarkdowntableAddrowTable,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderDelimiterLine,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderEndsWithDash,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderEndsWithPipe,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderHeaderLine,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesDash,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesDashSeparator,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesEscapedPipe,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesJoinedLines,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesNode,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesNova,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesNpm,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesOriginalNewline,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesPaddedHeader,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesPipeSeparator,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesTenDashes,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesVersion,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderLine,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderLines,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderStartsWithDash,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderStartsWithPipe,
  Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable,
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
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableAddrowTable = new MarkdownTable([
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
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableAddrowTable = new MarkdownTable([
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
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableAddrowTable = new MarkdownTable([
      'Name',
      'Version',
    ]);
    const result: Tests_Toolkit_MarkdownTable_MarkdowntableAddrowResult = table.addRow([
      'nova',
      '1.0.0',
    ]);

    strictEqual(result, table);

    return;
  });

  it('supports chaining multiple rows', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableAddrowTable = new MarkdownTable([
      'A',
      'B',
    ]);

    const result: Tests_Toolkit_MarkdownTable_MarkdowntableAddrowResult = table
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
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable = new MarkdownTable([
      'Name',
      'Version',
    ]);

    table.addRow([
      'nova',
      '1.0.0',
    ]);

    const output: Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput = table.render();
    const lines: Tests_Toolkit_MarkdownTable_MarkdowntableRenderLines = output.split('\n');

    strictEqual(lines.length, 3);

    const line0: Tests_Toolkit_MarkdownTable_MarkdowntableRenderLine = lines[0];
    const line1: Tests_Toolkit_MarkdownTable_MarkdowntableRenderLine = lines[1];
    const line2: Tests_Toolkit_MarkdownTable_MarkdowntableRenderLine = lines[2];

    if (
      line0 === undefined
      || line1 === undefined
      || line2 === undefined
    ) {
      fail('Expected lines to be defined');
    }

    const startsWithPipe: Tests_Toolkit_MarkdownTable_MarkdowntableRenderStartsWithPipe = line0.startsWith('| ');
    const endsWithPipe: Tests_Toolkit_MarkdownTable_MarkdowntableRenderEndsWithPipe = line0.endsWith(' |');
    const includesDash: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesDash = line1.includes('-');
    const includesNova: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesNova = line2.includes('nova');
    const includesVersion: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesVersion = line2.includes('1.0.0');

    ok(startsWithPipe);
    ok(endsWithPipe);
    ok(includesDash);
    ok(includesNova);
    ok(includesVersion);

    return;
  });

  it('renders table with multiple rows', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable = new MarkdownTable([
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

    const output: Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput = table.render();
    const lines: Tests_Toolkit_MarkdownTable_MarkdowntableRenderLines = output.split('\n');

    strictEqual(lines.length, 4);

    const line2: Tests_Toolkit_MarkdownTable_MarkdowntableRenderLine = lines[2];
    const line3: Tests_Toolkit_MarkdownTable_MarkdowntableRenderLine = lines[3];

    if (line2 === undefined || line3 === undefined) {
      fail('Expected lines to be defined');
    }

    const includesNode: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesNode = line2.includes('node');
    const includesNpm: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesNpm = line3.includes('npm');

    ok(includesNode);
    ok(includesNpm);

    return;
  });

  it('renders headers-only table', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable = new MarkdownTable([
      'A',
      'B',
      'C',
    ]);
    const output: Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput = table.render();
    const lines: Tests_Toolkit_MarkdownTable_MarkdowntableRenderLines = output.split('\n');

    strictEqual(lines.length, 3);

    return;
  });

  it('escapes pipe characters in cells', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable = new MarkdownTable(['Expression']);

    table.addRow(['a | b']);

    const output: Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput = table.render();

    const includesEscapedPipe: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesEscapedPipe = output.includes('a \\| b');

    ok(includesEscapedPipe);

    return;
  });

  it('replaces newlines in cells with spaces', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable = new MarkdownTable(['Text']);

    table.addRow(['line1\nline2']);

    const output: Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput = table.render();

    const includesJoinedLines: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesJoinedLines = output.includes('line1 line2');
    const includesOriginalNewline: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesOriginalNewline = output.includes('line1\nline2');

    ok(includesJoinedLines);
    strictEqual(includesOriginalNewline, false);

    return;
  });

  it('pads columns to minimum width', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable = new MarkdownTable(['A']);

    table.addRow(['x']);

    const output: Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput = table.render();
    const headerLine: Tests_Toolkit_MarkdownTable_MarkdowntableRenderHeaderLine = output.split('\n')[0] ?? '';

    // Column content should be padded to at least 3 characters.
    const includesPaddedHeader: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesPaddedHeader = headerLine.includes('A  ');

    ok(includesPaddedHeader);

    return;
  });

  it('respects custom minimum column width', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable = new MarkdownTable(['A'], {
      minimumColumnWidth: 10,
      padDelimiterRow: false,
    });

    table.addRow(['x']);

    const output: Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput = table.render();
    const delimiterLine: Tests_Toolkit_MarkdownTable_MarkdowntableRenderDelimiterLine = output.split('\n')[1] ?? '';

    const includesTenDashes: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesTenDashes = delimiterLine.includes('----------');

    ok(includesTenDashes);

    return;
  });

  it('renders padded delimiter row when option enabled', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable = new MarkdownTable([
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

    const output: Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput = table.render();
    const delimiterLine: Tests_Toolkit_MarkdownTable_MarkdowntableRenderDelimiterLine = output.split('\n')[1] ?? '';

    const startsWithPipe: Tests_Toolkit_MarkdownTable_MarkdowntableRenderStartsWithPipe = delimiterLine.startsWith('| ');
    const includesPipeSeparator: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesPipeSeparator = delimiterLine.includes(' | ');
    const endsWithPipe: Tests_Toolkit_MarkdownTable_MarkdowntableRenderEndsWithPipe = delimiterLine.endsWith(' |');

    ok(startsWithPipe);
    ok(includesPipeSeparator);
    ok(endsWithPipe);

    return;
  });

  it('renders compact delimiter row by default', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdowntableRenderTable = new MarkdownTable([
      'Name',
      'Value',
    ]);

    table.addRow([
      'a',
      'b',
    ]);

    const output: Tests_Toolkit_MarkdownTable_MarkdowntableRenderOutput = table.render();
    const delimiterLine: Tests_Toolkit_MarkdownTable_MarkdowntableRenderDelimiterLine = output.split('\n')[1] ?? '';

    const startsWithDash: Tests_Toolkit_MarkdownTable_MarkdowntableRenderStartsWithDash = delimiterLine.startsWith('|-');
    const includesDashSeparator: Tests_Toolkit_MarkdownTable_MarkdowntableRenderIncludesDashSeparator = delimiterLine.includes('-|-');
    const endsWithDash: Tests_Toolkit_MarkdownTable_MarkdowntableRenderEndsWithDash = delimiterLine.endsWith('-|');

    ok(startsWithDash);
    ok(includesDashSeparator);
    ok(endsWithDash);

    return;
  });

  return;
});

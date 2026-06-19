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
  Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_AcceptsRowMatchingHeadersLength_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_ReturnsInstanceForChaining_Result,
  Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_ReturnsInstanceForChaining_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_SupportsChainingMultipleRows_Result,
  Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_SupportsChainingMultipleRows_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_ThrowsOnRowLengthMismatch_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableConstructor_AcceptsValidHeaders_Headers,
  Tests_Toolkit_MarkdownTable_MarkdownTableConstructor_ThrowsOnEmptyHeadersArray_Headers,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_EscapesPipeCharactersInCells_IncludesEscapedPipe,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_EscapesPipeCharactersInCells_Output,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_EscapesPipeCharactersInCells_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_HeaderLine,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_IncludesPaddedHeader,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_Output,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_EndsWithPipe,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_IncludesDash,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_IncludesNova,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_IncludesVersion,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Line0,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Line1,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Line2,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Lines,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Output,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_StartsWithPipe,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_DelimiterLine,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_EndsWithDash,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_IncludesDashSeparator,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_Output,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_StartsWithDash,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersHeadersOnlyTable_Lines,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersHeadersOnlyTable_Output,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersHeadersOnlyTable_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_DelimiterLine,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_EndsWithPipe,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_IncludesPipeSeparator,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_Output,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_StartsWithPipe,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_IncludesNode,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_IncludesNpm,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Line2,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Line3,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Lines,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Output,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_IncludesJoinedLines,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_IncludesOriginalNewline,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_Output,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_Table,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_DelimiterLine,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_IncludesTenDashes,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_Output,
  Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_Table,
} from '../../types/tests/toolkit/markdown-table.test.d.ts';

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Constructor.
 *
 * @since 0.13.0
 */
describe('MarkdownTable constructor', async () => {
  it('accepts valid headers', () => {
    const headers: Tests_Toolkit_MarkdownTable_MarkdownTableConstructor_AcceptsValidHeaders_Headers = [
      'Name',
      'Version',
    ];

    doesNotThrow(() => {
      void new MarkdownTable(headers);

      return;
    });

    return;
  });

  it('throws on empty headers array', () => {
    const headers: Tests_Toolkit_MarkdownTable_MarkdownTableConstructor_ThrowsOnEmptyHeadersArray_Headers = [];

    throws(() => {
      void new MarkdownTable(headers);

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
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_AcceptsRowMatchingHeadersLength_Table = new MarkdownTable([
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
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_ThrowsOnRowLengthMismatch_Table = new MarkdownTable([
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
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_ReturnsInstanceForChaining_Table = new MarkdownTable([
      'Name',
      'Version',
    ]);
    const result: Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_ReturnsInstanceForChaining_Result = table.addRow([
      'nova',
      '1.0.0',
    ]);

    strictEqual(result, table);

    return;
  });

  it('supports chaining multiple rows', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_SupportsChainingMultipleRows_Table = new MarkdownTable([
      'A',
      'B',
    ]);

    const result: Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_SupportsChainingMultipleRows_Result = table
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
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Table = new MarkdownTable([
      'Name',
      'Version',
    ]);

    table.addRow([
      'nova',
      '1.0.0',
    ]);

    const output: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Output = table.render();
    const lines: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Lines = output.split('\n');

    strictEqual(lines.length, 3);

    const line0: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Line0 = lines[0];
    const line1: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Line1 = lines[1];
    const line2: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Line2 = lines[2];

    if (
      line0 === undefined
      || line1 === undefined
      || line2 === undefined
    ) {
      fail('Expected lines to be defined');
    }

    const startsWithPipe: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_StartsWithPipe = line0.startsWith('| ');
    const endsWithPipe: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_EndsWithPipe = line0.endsWith(' |');
    const includesDash: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_IncludesDash = line1.includes('-');
    const includesNova: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_IncludesNova = line2.includes('nova');
    const includesVersion: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_IncludesVersion = line2.includes('1.0.0');

    ok(startsWithPipe);
    ok(endsWithPipe);
    ok(includesDash);
    ok(includesNova);
    ok(includesVersion);

    return;
  });

  it('renders table with multiple rows', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Table = new MarkdownTable([
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

    const output: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Output = table.render();
    const lines: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Lines = output.split('\n');

    strictEqual(lines.length, 4);

    const line2: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Line2 = lines[2];
    const line3: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Line3 = lines[3];

    if (line2 === undefined || line3 === undefined) {
      fail('Expected lines to be defined');
    }

    const includesNode: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_IncludesNode = line2.includes('node');
    const includesNpm: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_IncludesNpm = line3.includes('npm');

    ok(includesNode);
    ok(includesNpm);

    return;
  });

  it('renders headers-only table', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersHeadersOnlyTable_Table = new MarkdownTable([
      'A',
      'B',
      'C',
    ]);
    const output: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersHeadersOnlyTable_Output = table.render();
    const lines: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersHeadersOnlyTable_Lines = output.split('\n');

    strictEqual(lines.length, 3);

    return;
  });

  it('escapes pipe characters in cells', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableRender_EscapesPipeCharactersInCells_Table = new MarkdownTable(['Expression']);

    table.addRow(['a | b']);

    const output: Tests_Toolkit_MarkdownTable_MarkdownTableRender_EscapesPipeCharactersInCells_Output = table.render();

    const includesEscapedPipe: Tests_Toolkit_MarkdownTable_MarkdownTableRender_EscapesPipeCharactersInCells_IncludesEscapedPipe = output.includes('a \\| b');

    ok(includesEscapedPipe);

    return;
  });

  it('replaces newlines in cells with spaces', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_Table = new MarkdownTable(['Text']);

    table.addRow(['line1\nline2']);

    const output: Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_Output = table.render();

    const includesJoinedLines: Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_IncludesJoinedLines = output.includes('line1 line2');
    const includesOriginalNewline: Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_IncludesOriginalNewline = output.includes('line1\nline2');

    ok(includesJoinedLines);
    strictEqual(includesOriginalNewline, false);

    return;
  });

  it('pads columns to minimum width', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_Table = new MarkdownTable(['A']);

    table.addRow(['x']);

    const output: Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_Output = table.render();
    const headerLine: Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_HeaderLine = output.split('\n')[0] ?? '';

    // Column content should be padded to at least 3 characters.
    const includesPaddedHeader: Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_IncludesPaddedHeader = headerLine.includes('A  ');

    ok(includesPaddedHeader);

    return;
  });

  it('respects custom minimum column width', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_Table = new MarkdownTable(['A'], {
      minimumColumnWidth: 10,
      padDelimiterRow: false,
    });

    table.addRow(['x']);

    const output: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_Output = table.render();
    const delimiterLine: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_DelimiterLine = output.split('\n')[1] ?? '';

    const includesTenDashes: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_IncludesTenDashes = delimiterLine.includes('----------');

    ok(includesTenDashes);

    return;
  });

  it('renders padded delimiter row when option enabled', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_Table = new MarkdownTable([
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

    const output: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_Output = table.render();
    const delimiterLine: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_DelimiterLine = output.split('\n')[1] ?? '';

    const startsWithPipe: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_StartsWithPipe = delimiterLine.startsWith('| ');
    const includesPipeSeparator: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_IncludesPipeSeparator = delimiterLine.includes(' | ');
    const endsWithPipe: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_EndsWithPipe = delimiterLine.endsWith(' |');

    ok(startsWithPipe);
    ok(includesPipeSeparator);
    ok(endsWithPipe);

    return;
  });

  it('renders compact delimiter row by default', () => {
    const table: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_Table = new MarkdownTable([
      'Name',
      'Value',
    ]);

    table.addRow([
      'a',
      'b',
    ]);

    const output: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_Output = table.render();
    const delimiterLine: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_DelimiterLine = output.split('\n')[1] ?? '';

    const startsWithDash: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_StartsWithDash = delimiterLine.startsWith('|-');
    const includesDashSeparator: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_IncludesDashSeparator = delimiterLine.includes('-|-');
    const endsWithDash: Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_EndsWithDash = delimiterLine.endsWith('-|');

    ok(startsWithDash);
    ok(includesDashSeparator);
    ok(endsWithDash);

    return;
  });

  return;
});

import {
  doesNotThrow,
  fail,
  ok,
  strictEqual,
  throws,
} from 'node:assert/strict';
import { test } from 'node:test';

import { MarkdownTable } from '@/toolkit/index.js';

/**
 * Markdown table constructor.
 *
 * @since 1.0.0
 */
test('MarkdownTable constructor', async (context) => {
  await context.test('accepts valid headers', () => {
    doesNotThrow(() => {
      new MarkdownTable(['Name', 'Version']);
    });
  });

  await context.test('throws on empty headers array', () => {
    throws(() => {
      new MarkdownTable([]);
    }, {
      message: '"headers" must be a non-empty array',
    });
  });
});

/**
 * Markdown table add row.
 *
 * @since 1.0.0
 */
test('MarkdownTable addRow', async (context) => {
  await context.test('accepts row matching headers length', () => {
    const table = new MarkdownTable(['Name', 'Version']);

    doesNotThrow(() => {
      table.addRow(['nova', '1.0.0']);
    });
  });

  await context.test('throws on row length mismatch', () => {
    const table = new MarkdownTable(['Name', 'Version']);

    throws(() => {
      table.addRow(['nova']);
    }, {
      message: 'Length of "rows" must equal length of "headers"',
    });
  });

  await context.test('returns instance for chaining', () => {
    const table = new MarkdownTable(['Name', 'Version']);
    const result = table.addRow(['nova', '1.0.0']);

    strictEqual(result, table);
  });

  await context.test('supports chaining multiple rows', () => {
    const table = new MarkdownTable(['A', 'B']);

    const result = table
      .addRow(['1', '2'])
      .addRow(['3', '4']);

    strictEqual(result, table);
  });
});

/**
 * Markdown table render.
 *
 * @since 1.0.0
 */
test('MarkdownTable render', async (context) => {
  await context.test('renders basic table with one row', () => {
    const table = new MarkdownTable(['Name', 'Version']);

    table.addRow(['nova', '1.0.0']);

    const output = table.render();
    const lines = output.split('\n');

    strictEqual(lines.length, 3);

    const line0 = lines[0];
    const line1 = lines[1];
    const line2 = lines[2];

    if (line0 === undefined || line1 === undefined || line2 === undefined) {
      fail('Expected lines to be defined');
    }

    ok(line0.startsWith('| '));
    ok(line0.endsWith(' |'));
    ok(line1.includes('-'));
    ok(line2.includes('nova'));
    ok(line2.includes('1.0.0'));
  });

  await context.test('renders table with multiple rows', () => {
    const table = new MarkdownTable(['Tool', 'Version']);

    table.addRow(['node', '20.10.0']);
    table.addRow(['npm', '10.2.3']);

    const output = table.render();
    const lines = output.split('\n');

    strictEqual(lines.length, 4);

    const line2 = lines[2];
    const line3 = lines[3];

    if (line2 === undefined || line3 === undefined) {
      fail('Expected lines to be defined');
    }

    ok(line2.includes('node'));
    ok(line3.includes('npm'));
  });

  await context.test('renders headers-only table', () => {
    const table = new MarkdownTable(['A', 'B', 'C']);
    const output = table.render();
    const lines = output.split('\n');

    strictEqual(lines.length, 3);
  });

  await context.test('escapes pipe characters in cells', () => {
    const table = new MarkdownTable(['Expression']);

    table.addRow(['a | b']);

    const output = table.render();

    ok(output.includes('a \\| b'));
  });

  await context.test('replaces newlines in cells with spaces', () => {
    const table = new MarkdownTable(['Text']);

    table.addRow(['line1\nline2']);

    const output = table.render();

    ok(output.includes('line1 line2'));
    ok(!output.includes('line1\nline2'));
  });

  await context.test('pads columns to minimum width', () => {
    const table = new MarkdownTable(['A']);

    table.addRow(['x']);

    const output = table.render();
    const headerLine = output.split('\n')[0] ?? '';

    // Column content should be padded to at least 3 characters.
    ok(headerLine.includes('A  '));
  });

  await context.test('respects custom minimum column width', () => {
    const table = new MarkdownTable(['A'], {
      minimumColumnWidth: 10,
      padDelimiterRow: false,
    });

    table.addRow(['x']);

    const output = table.render();
    const delimiterLine = output.split('\n')[1] ?? '';

    ok(delimiterLine.includes('----------'));
  });

  await context.test('renders padded delimiter row when option enabled', () => {
    const table = new MarkdownTable(['Name', 'Value'], {
      minimumColumnWidth: 3,
      padDelimiterRow: true,
    });

    table.addRow(['a', 'b']);

    const output = table.render();
    const delimiterLine = output.split('\n')[1] ?? '';

    ok(delimiterLine.startsWith('| '));
    ok(delimiterLine.includes(' | '));
    ok(delimiterLine.endsWith(' |'));
  });

  await context.test('renders compact delimiter row by default', () => {
    const table = new MarkdownTable(['Name', 'Value']);

    table.addRow(['a', 'b']);

    const output = table.render();
    const delimiterLine = output.split('\n')[1] ?? '';

    ok(delimiterLine.startsWith('|-'));
    ok(delimiterLine.includes('-|-'));
    ok(delimiterLine.endsWith('-|'));
  });
});

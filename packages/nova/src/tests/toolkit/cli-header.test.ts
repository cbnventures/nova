import { ok, strictEqual } from 'node:assert/strict';
import { test } from 'node:test';

import { CLIHeader } from '@/toolkit/index.js';

/**
 * CLI header render.
 *
 * @since 1.0.0
 */
test('CLIHeader render', async (context) => {
  await context.test('renders header with single text line', () => {
    const output = CLIHeader.render(['Hello'], {
      width: 20,
      interactive: true,
    });

    ok(output.includes('Hello'));
    ok(output.includes('┌'));
    ok(output.includes('┐'));
    ok(output.includes('└'));
    ok(output.includes('┘'));
  });

  await context.test('renders header with multiple text lines', () => {
    const output = CLIHeader.render(['Line 1', 'Line 2'], {
      width: 20,
      interactive: true,
    });

    ok(output.includes('Line 1'));
    ok(output.includes('Line 2'));
  });

  await context.test('renders round border style', () => {
    const output = CLIHeader.render(['Test'], {
      width: 20,
      style: 'round',
      interactive: true,
    });

    ok(output.includes('╭'));
    ok(output.includes('╮'));
    ok(output.includes('╰'));
    ok(output.includes('╯'));
  });

  await context.test('renders thick border style', () => {
    const output = CLIHeader.render(['Test'], {
      width: 20,
      style: 'thick',
      interactive: true,
    });

    ok(output.includes('╔'));
    ok(output.includes('╗'));
    ok(output.includes('╚'));
    ok(output.includes('╝'));
  });

  await context.test('renders box border style by default', () => {
    const output = CLIHeader.render(['Test'], {
      width: 20,
      interactive: true,
    });

    ok(output.includes('┌'));
    ok(output.includes('┘'));
  });

  await context.test('applies vertical padding', () => {
    const withPadding = CLIHeader.render(['Test'], {
      width: 20,
      paddingY: 1,
      interactive: true,
    });

    const withoutPadding = CLIHeader.render(['Test'], {
      width: 20,
      paddingY: 0,
      interactive: true,
    });

    const withPaddingLines = withPadding.split('\n').length;
    const withoutPaddingLines = withoutPadding.split('\n').length;

    ok(withPaddingLines > withoutPaddingLines);
  });

  await context.test('applies top and bottom margins', () => {
    const output = CLIHeader.render(['Test'], {
      width: 20,
      marginTop: 1,
      marginBottom: 1,
      interactive: true,
    });

    ok(output.startsWith('\n'));
    ok(output.endsWith('\n'));
  });

  await context.test('truncates text exceeding content width', () => {
    const output = CLIHeader.render(['This is a very long text that should be truncated'], {
      width: 20,
      paddingX: 0,
      interactive: true,
    });

    ok(output.includes('…'));
  });

  await context.test('left-aligns text', () => {
    const output = CLIHeader.render(['Hi'], {
      width: 20,
      align: 'left',
      interactive: true,
    });
    const lines = output.split('\n');
    const contentLine = lines[1] ?? '';

    ok(contentLine.includes('│Hi'));
  });

  await context.test('right-aligns text', () => {
    const output = CLIHeader.render(['Hi'], {
      width: 20,
      align: 'right',
      interactive: true,
    });
    const lines = output.split('\n');
    const contentLine = lines[1] ?? '';

    ok(contentLine.includes('Hi│'));
  });

  await context.test('renders plain text in non-interactive mode', () => {
    const output = CLIHeader.render(['Line 1', 'Line 2'], {
      width: 20,
      interactive: false,
    });

    strictEqual(output, 'Line 1\nLine 2');
  });

  await context.test('strips ANSI codes in non-interactive mode', () => {
    const output = CLIHeader.render(['\x1b[1mBold\x1b[0m', '\x1b[31mRed\x1b[0m'], {
      width: 20,
      interactive: false,
    });

    strictEqual(output, 'Bold\nRed');
  });

  await context.test('ignores border style in non-interactive mode', () => {
    const output = CLIHeader.render(['Test'], {
      width: 20,
      style: 'round',
      interactive: false,
    });

    ok(!output.includes('╭'));
    ok(!output.includes('╯'));
    strictEqual(output, 'Test');
  });

  await context.test('ignores padding and margin in non-interactive mode', () => {
    const output = CLIHeader.render(['Test'], {
      width: 20,
      paddingX: 2,
      paddingY: 1,
      marginTop: 1,
      marginBottom: 1,
      interactive: false,
    });

    strictEqual(output, 'Test');
  });
});

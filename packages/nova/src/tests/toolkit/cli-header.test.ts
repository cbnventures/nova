import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { CLIHeader } from '../../toolkit/index.js';

import type {
  Tests_Toolkit_CliHeader_CliheaderRenderContentLine,
  Tests_Toolkit_CliHeader_CliheaderRenderEndsWithNewline,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesBottomLeft,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesBottomRight,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesEllipsis,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesHello,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesLeftAligned,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesLine1,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesLine2,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesRightAligned,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesRoundBottomRight,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesRoundTopLeft,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesTopLeft,
  Tests_Toolkit_CliHeader_CliheaderRenderIncludesTopRight,
  Tests_Toolkit_CliHeader_CliheaderRenderLines,
  Tests_Toolkit_CliHeader_CliheaderRenderOutput,
  Tests_Toolkit_CliHeader_CliheaderRenderStartsWithNewline,
  Tests_Toolkit_CliHeader_CliheaderRenderWithoutPadding,
  Tests_Toolkit_CliHeader_CliheaderRenderWithoutPaddingLines,
  Tests_Toolkit_CliHeader_CliheaderRenderWithPadding,
  Tests_Toolkit_CliHeader_CliheaderRenderWithPaddingLines,
} from '../../types/tests/toolkit/cli-header.test.d.ts';

/**
 * Tests - Toolkit - CLI Header - CLIHeader Render.
 *
 * @since 0.13.0
 */
describe('CLIHeader render', async () => {
  it('renders header with single text line', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['Hello'], {
      width: 20,
      interactive: true,
    });

    const includesHello: Tests_Toolkit_CliHeader_CliheaderRenderIncludesHello = output.includes('Hello');
    const includesTopLeft: Tests_Toolkit_CliHeader_CliheaderRenderIncludesTopLeft = output.includes('┌');
    const includesTopRight: Tests_Toolkit_CliHeader_CliheaderRenderIncludesTopRight = output.includes('┐');
    const includesBottomLeft: Tests_Toolkit_CliHeader_CliheaderRenderIncludesBottomLeft = output.includes('└');
    const includesBottomRight: Tests_Toolkit_CliHeader_CliheaderRenderIncludesBottomRight = output.includes('┘');

    ok(includesHello);
    ok(includesTopLeft);
    ok(includesTopRight);
    ok(includesBottomLeft);
    ok(includesBottomRight);

    return;
  });

  it('renders header with multiple text lines', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render([
      'Line 1',
      'Line 2',
    ], {
      width: 20,
      interactive: true,
    });

    const includesLine1: Tests_Toolkit_CliHeader_CliheaderRenderIncludesLine1 = output.includes('Line 1');
    const includesLine2: Tests_Toolkit_CliHeader_CliheaderRenderIncludesLine2 = output.includes('Line 2');

    ok(includesLine1);
    ok(includesLine2);

    return;
  });

  it('renders round border style', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      style: 'round',
      interactive: true,
    });

    const includesTopLeft: Tests_Toolkit_CliHeader_CliheaderRenderIncludesTopLeft = output.includes('╭');
    const includesTopRight: Tests_Toolkit_CliHeader_CliheaderRenderIncludesTopRight = output.includes('╮');
    const includesBottomLeft: Tests_Toolkit_CliHeader_CliheaderRenderIncludesBottomLeft = output.includes('╰');
    const includesBottomRight: Tests_Toolkit_CliHeader_CliheaderRenderIncludesBottomRight = output.includes('╯');

    ok(includesTopLeft);
    ok(includesTopRight);
    ok(includesBottomLeft);
    ok(includesBottomRight);

    return;
  });

  it('renders thick border style', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      style: 'thick',
      interactive: true,
    });

    const includesTopLeft: Tests_Toolkit_CliHeader_CliheaderRenderIncludesTopLeft = output.includes('╔');
    const includesTopRight: Tests_Toolkit_CliHeader_CliheaderRenderIncludesTopRight = output.includes('╗');
    const includesBottomLeft: Tests_Toolkit_CliHeader_CliheaderRenderIncludesBottomLeft = output.includes('╚');
    const includesBottomRight: Tests_Toolkit_CliHeader_CliheaderRenderIncludesBottomRight = output.includes('╝');

    ok(includesTopLeft);
    ok(includesTopRight);
    ok(includesBottomLeft);
    ok(includesBottomRight);

    return;
  });

  it('renders box border style by default', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      interactive: true,
    });

    const includesTopLeft: Tests_Toolkit_CliHeader_CliheaderRenderIncludesTopLeft = output.includes('┌');
    const includesBottomRight: Tests_Toolkit_CliHeader_CliheaderRenderIncludesBottomRight = output.includes('┘');

    ok(includesTopLeft);
    ok(includesBottomRight);

    return;
  });

  it('applies vertical padding', () => {
    const withPadding: Tests_Toolkit_CliHeader_CliheaderRenderWithPadding = CLIHeader.render(['Test'], {
      width: 20,
      paddingY: 1,
      interactive: true,
    });

    const withoutPadding: Tests_Toolkit_CliHeader_CliheaderRenderWithoutPadding = CLIHeader.render(['Test'], {
      width: 20,
      paddingY: 0,
      interactive: true,
    });

    const withPaddingLines: Tests_Toolkit_CliHeader_CliheaderRenderWithPaddingLines = withPadding.split('\n').length;
    const withoutPaddingLines: Tests_Toolkit_CliHeader_CliheaderRenderWithoutPaddingLines = withoutPadding.split('\n').length;

    ok(withPaddingLines > withoutPaddingLines);

    return;
  });

  it('applies top and bottom margins', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      marginTop: 1,
      marginBottom: 1,
      interactive: true,
    });

    const startsWithNewline: Tests_Toolkit_CliHeader_CliheaderRenderStartsWithNewline = output.startsWith('\n');
    const endsWithNewline: Tests_Toolkit_CliHeader_CliheaderRenderEndsWithNewline = output.endsWith('\n');

    ok(startsWithNewline);
    ok(endsWithNewline);

    return;
  });

  it('truncates text exceeding content width', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['This is a very long text that should be truncated'], {
      width: 20,
      paddingX: 0,
      interactive: true,
    });

    const includesEllipsis: Tests_Toolkit_CliHeader_CliheaderRenderIncludesEllipsis = output.includes('…');

    ok(includesEllipsis);

    return;
  });

  it('left-aligns text', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['Hi'], {
      width: 20,
      align: 'left',
      interactive: true,
    });
    const lines: Tests_Toolkit_CliHeader_CliheaderRenderLines = output.split('\n');
    const contentLine: Tests_Toolkit_CliHeader_CliheaderRenderContentLine = lines[1] ?? '';

    const includesLeftAligned: Tests_Toolkit_CliHeader_CliheaderRenderIncludesLeftAligned = contentLine.includes('│Hi');

    ok(includesLeftAligned);

    return;
  });

  it('right-aligns text', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['Hi'], {
      width: 20,
      align: 'right',
      interactive: true,
    });
    const lines: Tests_Toolkit_CliHeader_CliheaderRenderLines = output.split('\n');
    const contentLine: Tests_Toolkit_CliHeader_CliheaderRenderContentLine = lines[1] ?? '';

    const includesRightAligned: Tests_Toolkit_CliHeader_CliheaderRenderIncludesRightAligned = contentLine.includes('Hi│');

    ok(includesRightAligned);

    return;
  });

  it('renders plain text in non-interactive mode', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render([
      'Line 1',
      'Line 2',
    ], {
      width: 20,
      interactive: false,
    });

    strictEqual(output, 'Line 1\nLine 2');

    return;
  });

  it('strips ANSI codes in non-interactive mode', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render([
      '\x1b[1mBold\x1b[0m',
      '\x1b[31mRed\x1b[0m',
    ], {
      width: 20,
      interactive: false,
    });

    strictEqual(output, 'Bold\nRed');

    return;
  });

  it('ignores border style in non-interactive mode', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      style: 'round',
      interactive: false,
    });

    const includesRoundTopLeft: Tests_Toolkit_CliHeader_CliheaderRenderIncludesRoundTopLeft = output.includes('╭');
    const includesRoundBottomRight: Tests_Toolkit_CliHeader_CliheaderRenderIncludesRoundBottomRight = output.includes('╯');

    strictEqual(includesRoundTopLeft, false);
    strictEqual(includesRoundBottomRight, false);
    strictEqual(output, 'Test');

    return;
  });

  it('ignores padding and margin in non-interactive mode', () => {
    const output: Tests_Toolkit_CliHeader_CliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      paddingX: 2,
      paddingY: 1,
      marginTop: 1,
      marginBottom: 1,
      interactive: false,
    });

    strictEqual(output, 'Test');

    return;
  });

  return;
});

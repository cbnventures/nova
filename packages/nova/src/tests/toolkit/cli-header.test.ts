import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { CLIHeader } from '../../toolkit/index.js';

import type {
  TestsToolkitCliHeaderCliheaderRenderContentLine,
  TestsToolkitCliHeaderCliheaderRenderEndsWithNewline,
  TestsToolkitCliHeaderCliheaderRenderIncludesBottomLeft,
  TestsToolkitCliHeaderCliheaderRenderIncludesBottomRight,
  TestsToolkitCliHeaderCliheaderRenderIncludesEllipsis,
  TestsToolkitCliHeaderCliheaderRenderIncludesHello,
  TestsToolkitCliHeaderCliheaderRenderIncludesLeftAligned,
  TestsToolkitCliHeaderCliheaderRenderIncludesLine1,
  TestsToolkitCliHeaderCliheaderRenderIncludesLine2,
  TestsToolkitCliHeaderCliheaderRenderIncludesRightAligned,
  TestsToolkitCliHeaderCliheaderRenderIncludesRoundBottomRight,
  TestsToolkitCliHeaderCliheaderRenderIncludesRoundTopLeft,
  TestsToolkitCliHeaderCliheaderRenderIncludesTopLeft,
  TestsToolkitCliHeaderCliheaderRenderIncludesTopRight,
  TestsToolkitCliHeaderCliheaderRenderLines,
  TestsToolkitCliHeaderCliheaderRenderOutput,
  TestsToolkitCliHeaderCliheaderRenderStartsWithNewline,
  TestsToolkitCliHeaderCliheaderRenderWithoutPadding,
  TestsToolkitCliHeaderCliheaderRenderWithoutPaddingLines,
  TestsToolkitCliHeaderCliheaderRenderWithPadding,
  TestsToolkitCliHeaderCliheaderRenderWithPaddingLines,
} from '../../types/tests/toolkit/cli-header.test.d.ts';

/**
 * Tests - Toolkit - CLI Header - CLIHeader Render.
 *
 * @since 0.13.0
 */
describe('CLIHeader render', async () => {
  it('renders header with single text line', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['Hello'], {
      width: 20,
      interactive: true,
    });

    const includesHello: TestsToolkitCliHeaderCliheaderRenderIncludesHello = output.includes('Hello');
    const includesTopLeft: TestsToolkitCliHeaderCliheaderRenderIncludesTopLeft = output.includes('┌');
    const includesTopRight: TestsToolkitCliHeaderCliheaderRenderIncludesTopRight = output.includes('┐');
    const includesBottomLeft: TestsToolkitCliHeaderCliheaderRenderIncludesBottomLeft = output.includes('└');
    const includesBottomRight: TestsToolkitCliHeaderCliheaderRenderIncludesBottomRight = output.includes('┘');

    ok(includesHello);
    ok(includesTopLeft);
    ok(includesTopRight);
    ok(includesBottomLeft);
    ok(includesBottomRight);

    return;
  });

  it('renders header with multiple text lines', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render([
      'Line 1',
      'Line 2',
    ], {
      width: 20,
      interactive: true,
    });

    const includesLine1: TestsToolkitCliHeaderCliheaderRenderIncludesLine1 = output.includes('Line 1');
    const includesLine2: TestsToolkitCliHeaderCliheaderRenderIncludesLine2 = output.includes('Line 2');

    ok(includesLine1);
    ok(includesLine2);

    return;
  });

  it('renders round border style', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      style: 'round',
      interactive: true,
    });

    const includesTopLeft: TestsToolkitCliHeaderCliheaderRenderIncludesTopLeft = output.includes('╭');
    const includesTopRight: TestsToolkitCliHeaderCliheaderRenderIncludesTopRight = output.includes('╮');
    const includesBottomLeft: TestsToolkitCliHeaderCliheaderRenderIncludesBottomLeft = output.includes('╰');
    const includesBottomRight: TestsToolkitCliHeaderCliheaderRenderIncludesBottomRight = output.includes('╯');

    ok(includesTopLeft);
    ok(includesTopRight);
    ok(includesBottomLeft);
    ok(includesBottomRight);

    return;
  });

  it('renders thick border style', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      style: 'thick',
      interactive: true,
    });

    const includesTopLeft: TestsToolkitCliHeaderCliheaderRenderIncludesTopLeft = output.includes('╔');
    const includesTopRight: TestsToolkitCliHeaderCliheaderRenderIncludesTopRight = output.includes('╗');
    const includesBottomLeft: TestsToolkitCliHeaderCliheaderRenderIncludesBottomLeft = output.includes('╚');
    const includesBottomRight: TestsToolkitCliHeaderCliheaderRenderIncludesBottomRight = output.includes('╝');

    ok(includesTopLeft);
    ok(includesTopRight);
    ok(includesBottomLeft);
    ok(includesBottomRight);

    return;
  });

  it('renders box border style by default', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      interactive: true,
    });

    const includesTopLeft: TestsToolkitCliHeaderCliheaderRenderIncludesTopLeft = output.includes('┌');
    const includesBottomRight: TestsToolkitCliHeaderCliheaderRenderIncludesBottomRight = output.includes('┘');

    ok(includesTopLeft);
    ok(includesBottomRight);

    return;
  });

  it('applies vertical padding', () => {
    const withPadding: TestsToolkitCliHeaderCliheaderRenderWithPadding = CLIHeader.render(['Test'], {
      width: 20,
      paddingY: 1,
      interactive: true,
    });

    const withoutPadding: TestsToolkitCliHeaderCliheaderRenderWithoutPadding = CLIHeader.render(['Test'], {
      width: 20,
      paddingY: 0,
      interactive: true,
    });

    const withPaddingLines: TestsToolkitCliHeaderCliheaderRenderWithPaddingLines = withPadding.split('\n').length;
    const withoutPaddingLines: TestsToolkitCliHeaderCliheaderRenderWithoutPaddingLines = withoutPadding.split('\n').length;

    ok(withPaddingLines > withoutPaddingLines);

    return;
  });

  it('applies top and bottom margins', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      marginTop: 1,
      marginBottom: 1,
      interactive: true,
    });

    const startsWithNewline: TestsToolkitCliHeaderCliheaderRenderStartsWithNewline = output.startsWith('\n');
    const endsWithNewline: TestsToolkitCliHeaderCliheaderRenderEndsWithNewline = output.endsWith('\n');

    ok(startsWithNewline);
    ok(endsWithNewline);

    return;
  });

  it('truncates text exceeding content width', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['This is a very long text that should be truncated'], {
      width: 20,
      paddingX: 0,
      interactive: true,
    });

    const includesEllipsis: TestsToolkitCliHeaderCliheaderRenderIncludesEllipsis = output.includes('…');

    ok(includesEllipsis);

    return;
  });

  it('left-aligns text', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['Hi'], {
      width: 20,
      align: 'left',
      interactive: true,
    });
    const lines: TestsToolkitCliHeaderCliheaderRenderLines = output.split('\n');
    const contentLine: TestsToolkitCliHeaderCliheaderRenderContentLine = lines[1] ?? '';

    const includesLeftAligned: TestsToolkitCliHeaderCliheaderRenderIncludesLeftAligned = contentLine.includes('│Hi');

    ok(includesLeftAligned);

    return;
  });

  it('right-aligns text', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['Hi'], {
      width: 20,
      align: 'right',
      interactive: true,
    });
    const lines: TestsToolkitCliHeaderCliheaderRenderLines = output.split('\n');
    const contentLine: TestsToolkitCliHeaderCliheaderRenderContentLine = lines[1] ?? '';

    const includesRightAligned: TestsToolkitCliHeaderCliheaderRenderIncludesRightAligned = contentLine.includes('Hi│');

    ok(includesRightAligned);

    return;
  });

  it('renders plain text in non-interactive mode', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render([
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
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render([
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
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['Test'], {
      width: 20,
      style: 'round',
      interactive: false,
    });

    const includesRoundTopLeft: TestsToolkitCliHeaderCliheaderRenderIncludesRoundTopLeft = output.includes('╭');
    const includesRoundBottomRight: TestsToolkitCliHeaderCliheaderRenderIncludesRoundBottomRight = output.includes('╯');

    strictEqual(includesRoundTopLeft, false);
    strictEqual(includesRoundBottomRight, false);
    strictEqual(output, 'Test');

    return;
  });

  it('ignores padding and margin in non-interactive mode', () => {
    const output: TestsToolkitCliHeaderCliheaderRenderOutput = CLIHeader.render(['Test'], {
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

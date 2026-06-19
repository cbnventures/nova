import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { CLIHeader } from '../../toolkit/index.js';

import type {
  Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesTopAndBottomMargins_EndsWithNewline,
  Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesTopAndBottomMargins_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesTopAndBottomMargins_StartsWithNewline,
  Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesVerticalPadding_WithoutPadding,
  Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesVerticalPadding_WithoutPaddingLines,
  Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesVerticalPadding_WithPadding,
  Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesVerticalPadding_WithPaddingLines,
  Tests_Toolkit_CliHeader_CLIHeaderRender_IgnoresBorderStyleInNonInteractiveMode_IncludesRoundBottomRight,
  Tests_Toolkit_CliHeader_CLIHeaderRender_IgnoresBorderStyleInNonInteractiveMode_IncludesRoundTopLeft,
  Tests_Toolkit_CliHeader_CLIHeaderRender_IgnoresBorderStyleInNonInteractiveMode_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_IgnoresPaddingAndMarginInNonInteractiveMode_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_LeftAlignsText_ContentLine,
  Tests_Toolkit_CliHeader_CLIHeaderRender_LeftAlignsText_IncludesLeftAligned,
  Tests_Toolkit_CliHeader_CLIHeaderRender_LeftAlignsText_Lines,
  Tests_Toolkit_CliHeader_CLIHeaderRender_LeftAlignsText_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersBoxBorderStyleByDefault_IncludesBottomRight,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersBoxBorderStyleByDefault_IncludesTopLeft,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersBoxBorderStyleByDefault_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithMultipleTextLines_IncludesLine1,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithMultipleTextLines_IncludesLine2,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithMultipleTextLines_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesBottomLeft,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesBottomRight,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesHello,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesTopLeft,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesTopRight,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersPlainTextInNonInteractiveMode_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_IncludesBottomLeft,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_IncludesBottomRight,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_IncludesTopLeft,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_IncludesTopRight,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_IncludesBottomLeft,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_IncludesBottomRight,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_IncludesTopLeft,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_IncludesTopRight,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RightAlignsText_ContentLine,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RightAlignsText_IncludesRightAligned,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RightAlignsText_Lines,
  Tests_Toolkit_CliHeader_CLIHeaderRender_RightAlignsText_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_StripsANSICodesInNonInteractiveMode_Output,
  Tests_Toolkit_CliHeader_CLIHeaderRender_TruncatesTextExceedingContentWidth_IncludesEllipsis,
  Tests_Toolkit_CliHeader_CLIHeaderRender_TruncatesTextExceedingContentWidth_Output,
} from '../../types/tests/toolkit/cli-header.test.d.ts';

/**
 * Tests - Toolkit - CLI Header - CLIHeader Render.
 *
 * @since 0.13.0
 */
describe('CLIHeader render', async () => {
  it('renders header with single text line', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_Output = CLIHeader.render(['Hello'], {
      width: 20,
      interactive: true,
    });

    const includesHello: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesHello = output.includes('Hello');
    const includesTopLeft: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesTopLeft = output.includes('┌');
    const includesTopRight: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesTopRight = output.includes('┐');
    const includesBottomLeft: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesBottomLeft = output.includes('└');
    const includesBottomRight: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithSingleTextLine_IncludesBottomRight = output.includes('┘');

    ok(includesHello);
    ok(includesTopLeft);
    ok(includesTopRight);
    ok(includesBottomLeft);
    ok(includesBottomRight);

    return;
  });

  it('renders header with multiple text lines', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithMultipleTextLines_Output = CLIHeader.render([
      'Line 1',
      'Line 2',
    ], {
      width: 20,
      interactive: true,
    });

    const includesLine1: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithMultipleTextLines_IncludesLine1 = output.includes('Line 1');
    const includesLine2: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersHeaderWithMultipleTextLines_IncludesLine2 = output.includes('Line 2');

    ok(includesLine1);
    ok(includesLine2);

    return;
  });

  it('renders round border style', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_Output = CLIHeader.render(['Test'], {
      width: 20,
      style: 'round',
      interactive: true,
    });

    const includesTopLeft: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_IncludesTopLeft = output.includes('╭');
    const includesTopRight: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_IncludesTopRight = output.includes('╮');
    const includesBottomLeft: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_IncludesBottomLeft = output.includes('╰');
    const includesBottomRight: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersRoundBorderStyle_IncludesBottomRight = output.includes('╯');

    ok(includesTopLeft);
    ok(includesTopRight);
    ok(includesBottomLeft);
    ok(includesBottomRight);

    return;
  });

  it('renders thick border style', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_Output = CLIHeader.render(['Test'], {
      width: 20,
      style: 'thick',
      interactive: true,
    });

    const includesTopLeft: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_IncludesTopLeft = output.includes('╔');
    const includesTopRight: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_IncludesTopRight = output.includes('╗');
    const includesBottomLeft: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_IncludesBottomLeft = output.includes('╚');
    const includesBottomRight: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersThickBorderStyle_IncludesBottomRight = output.includes('╝');

    ok(includesTopLeft);
    ok(includesTopRight);
    ok(includesBottomLeft);
    ok(includesBottomRight);

    return;
  });

  it('renders box border style by default', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersBoxBorderStyleByDefault_Output = CLIHeader.render(['Test'], {
      width: 20,
      interactive: true,
    });

    const includesTopLeft: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersBoxBorderStyleByDefault_IncludesTopLeft = output.includes('┌');
    const includesBottomRight: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersBoxBorderStyleByDefault_IncludesBottomRight = output.includes('┘');

    ok(includesTopLeft);
    ok(includesBottomRight);

    return;
  });

  it('applies vertical padding', () => {
    const withPadding: Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesVerticalPadding_WithPadding = CLIHeader.render(['Test'], {
      width: 20,
      paddingY: 1,
      interactive: true,
    });

    const withoutPadding: Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesVerticalPadding_WithoutPadding = CLIHeader.render(['Test'], {
      width: 20,
      paddingY: 0,
      interactive: true,
    });

    const withPaddingLines: Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesVerticalPadding_WithPaddingLines = withPadding.split('\n').length;
    const withoutPaddingLines: Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesVerticalPadding_WithoutPaddingLines = withoutPadding.split('\n').length;

    ok(withPaddingLines > withoutPaddingLines);

    return;
  });

  it('applies top and bottom margins', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesTopAndBottomMargins_Output = CLIHeader.render(['Test'], {
      width: 20,
      marginTop: 1,
      marginBottom: 1,
      interactive: true,
    });

    const startsWithNewline: Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesTopAndBottomMargins_StartsWithNewline = output.startsWith('\n');
    const endsWithNewline: Tests_Toolkit_CliHeader_CLIHeaderRender_AppliesTopAndBottomMargins_EndsWithNewline = output.endsWith('\n');

    ok(startsWithNewline);
    ok(endsWithNewline);

    return;
  });

  it('truncates text exceeding content width', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_TruncatesTextExceedingContentWidth_Output = CLIHeader.render(['This is a very long text that should be truncated'], {
      width: 20,
      paddingX: 0,
      interactive: true,
    });

    const includesEllipsis: Tests_Toolkit_CliHeader_CLIHeaderRender_TruncatesTextExceedingContentWidth_IncludesEllipsis = output.includes('…');

    ok(includesEllipsis);

    return;
  });

  it('left-aligns text', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_LeftAlignsText_Output = CLIHeader.render(['Hi'], {
      width: 20,
      align: 'left',
      interactive: true,
    });
    const lines: Tests_Toolkit_CliHeader_CLIHeaderRender_LeftAlignsText_Lines = output.split('\n');
    const contentLine: Tests_Toolkit_CliHeader_CLIHeaderRender_LeftAlignsText_ContentLine = lines[1] ?? '';

    const includesLeftAligned: Tests_Toolkit_CliHeader_CLIHeaderRender_LeftAlignsText_IncludesLeftAligned = contentLine.includes('│Hi');

    ok(includesLeftAligned);

    return;
  });

  it('right-aligns text', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_RightAlignsText_Output = CLIHeader.render(['Hi'], {
      width: 20,
      align: 'right',
      interactive: true,
    });
    const lines: Tests_Toolkit_CliHeader_CLIHeaderRender_RightAlignsText_Lines = output.split('\n');
    const contentLine: Tests_Toolkit_CliHeader_CLIHeaderRender_RightAlignsText_ContentLine = lines[1] ?? '';

    const includesRightAligned: Tests_Toolkit_CliHeader_CLIHeaderRender_RightAlignsText_IncludesRightAligned = contentLine.includes('Hi│');

    ok(includesRightAligned);

    return;
  });

  it('renders plain text in non-interactive mode', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_RendersPlainTextInNonInteractiveMode_Output = CLIHeader.render([
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
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_StripsANSICodesInNonInteractiveMode_Output = CLIHeader.render([
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
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_IgnoresBorderStyleInNonInteractiveMode_Output = CLIHeader.render(['Test'], {
      width: 20,
      style: 'round',
      interactive: false,
    });

    const includesRoundTopLeft: Tests_Toolkit_CliHeader_CLIHeaderRender_IgnoresBorderStyleInNonInteractiveMode_IncludesRoundTopLeft = output.includes('╭');
    const includesRoundBottomRight: Tests_Toolkit_CliHeader_CLIHeaderRender_IgnoresBorderStyleInNonInteractiveMode_IncludesRoundBottomRight = output.includes('╯');

    strictEqual(includesRoundTopLeft, false);
    strictEqual(includesRoundBottomRight, false);
    strictEqual(output, 'Test');

    return;
  });

  it('ignores padding and margin in non-interactive mode', () => {
    const output: Tests_Toolkit_CliHeader_CLIHeaderRender_IgnoresPaddingAndMarginInNonInteractiveMode_Output = CLIHeader.render(['Test'], {
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

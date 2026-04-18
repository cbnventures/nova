import { LIB_REGEX_PATTERN_ANSI, LIB_REGEX_PATTERN_ANSI_START } from '../lib/regex.js';
import { Logger } from './index.js';

import type {
  ToolkitCliHeaderAlignAlign,
  ToolkitCliHeaderAlignAvailableSpace,
  ToolkitCliHeaderAlignLeftPadding,
  ToolkitCliHeaderAlignReturns,
  ToolkitCliHeaderAlignRightPadding,
  ToolkitCliHeaderAlignString,
  ToolkitCliHeaderAlignStringLength,
  ToolkitCliHeaderAlignWidth,
  ToolkitCliHeaderBorderCharactersReturns,
  ToolkitCliHeaderBorderCharactersStyle,
  ToolkitCliHeaderPadToWidthPaddingCount,
  ToolkitCliHeaderPadToWidthReturns,
  ToolkitCliHeaderPadToWidthString,
  ToolkitCliHeaderPadToWidthVisibleLength,
  ToolkitCliHeaderPadToWidthWidth,
  ToolkitCliHeaderRenderAlign,
  ToolkitCliHeaderRenderAlignedEmpty,
  ToolkitCliHeaderRenderAlignedText,
  ToolkitCliHeaderRenderBorderCharacters,
  ToolkitCliHeaderRenderBorderlessWidth,
  ToolkitCliHeaderRenderBottomBorder,
  ToolkitCliHeaderRenderBottomMargin,
  ToolkitCliHeaderRenderContentStrings,
  ToolkitCliHeaderRenderContentWidth,
  ToolkitCliHeaderRenderDisplayStrings,
  ToolkitCliHeaderRenderInteractive,
  ToolkitCliHeaderRenderMarginBottom,
  ToolkitCliHeaderRenderMarginTop,
  ToolkitCliHeaderRenderOptions,
  ToolkitCliHeaderRenderPadded,
  ToolkitCliHeaderRenderPaddedRow,
  ToolkitCliHeaderRenderPaddingX,
  ToolkitCliHeaderRenderPaddingY,
  ToolkitCliHeaderRenderResolvedOptions,
  ToolkitCliHeaderRenderReturns,
  ToolkitCliHeaderRenderStyle,
  ToolkitCliHeaderRenderTexts,
  ToolkitCliHeaderRenderTopBorder,
  ToolkitCliHeaderRenderTopMargin,
  ToolkitCliHeaderRenderTruncatedText,
  ToolkitCliHeaderRenderWidth,
  ToolkitCliHeaderStripAnsiPattern,
  ToolkitCliHeaderStripAnsiReturns,
  ToolkitCliHeaderStripAnsiString,
  ToolkitCliHeaderTruncateCharacter,
  ToolkitCliHeaderTruncateCode,
  ToolkitCliHeaderTruncateMatches,
  ToolkitCliHeaderTruncateMax,
  ToolkitCliHeaderTruncateNeedsEllipsis,
  ToolkitCliHeaderTruncateOutput,
  ToolkitCliHeaderTruncatePlain,
  ToolkitCliHeaderTruncatePlainLength,
  ToolkitCliHeaderTruncateRawIndex,
  ToolkitCliHeaderTruncateRebuildAnsiMessage,
  ToolkitCliHeaderTruncateRebuildVisibleMessage,
  ToolkitCliHeaderTruncateReturns,
  ToolkitCliHeaderTruncateSerializedEllipsis,
  ToolkitCliHeaderTruncateSerializedEnd,
  ToolkitCliHeaderTruncateSerializedInput,
  ToolkitCliHeaderTruncateSerializedPlain,
  ToolkitCliHeaderTruncateSerializedSecondPass,
  ToolkitCliHeaderTruncateSerializedWidthInfo,
  ToolkitCliHeaderTruncateSlice,
  ToolkitCliHeaderTruncateString,
  ToolkitCliHeaderTruncateStripAnsiMessage,
  ToolkitCliHeaderTruncateStripVisibleMessage,
  ToolkitCliHeaderTruncateVisibleIndex,
  ToolkitCliHeaderTruncateVisibleWidth,
  ToolkitCliHeaderVisibleLengthPattern,
  ToolkitCliHeaderVisibleLengthReturns,
  ToolkitCliHeaderVisibleLengthString,
} from '../types/toolkit/cli-header.d.ts';

/**
 * Toolkit - CLI Header.
 *
 * Renders bordered, ANSI-colored header banners for CLI output. Used by the main
 * CLI entry point to display the Nova version and tagline on startup.
 *
 * @since 0.11.0
 */
class ToolkitCliHeader {
  /**
   * Toolkit - CLI Header - Render.
   *
   * Builds a bordered box around the given text lines with configurable alignment,
   * padding, and style. Falls back to plain text in non-interactive shells.
   *
   * @param {ToolkitCliHeaderRenderTexts}   texts     - Texts.
   * @param {ToolkitCliHeaderRenderOptions} [options] - Options.
   *
   * @returns {ToolkitCliHeaderRenderReturns}
   *
   * @since 0.11.0
   */
  public static render(texts: ToolkitCliHeaderRenderTexts, options?: ToolkitCliHeaderRenderOptions): ToolkitCliHeaderRenderReturns {
    const resolvedOptions: ToolkitCliHeaderRenderResolvedOptions = options ?? {};
    const interactive: ToolkitCliHeaderRenderInteractive = resolvedOptions['interactive'] ?? (process.stdout.isTTY === true);

    // Non-interactive mode outputs plain text without borders.
    if (interactive === false) {
      return texts.map((text) => ToolkitCliHeader.stripAnsi(text)).join('\n');
    }

    const align: ToolkitCliHeaderRenderAlign = resolvedOptions['align'] ?? 'center';
    const marginTop: ToolkitCliHeaderRenderMarginTop = Math.max(0, resolvedOptions['marginTop'] ?? 0);
    const marginBottom: ToolkitCliHeaderRenderMarginBottom = Math.max(0, resolvedOptions['marginBottom'] ?? 0);
    const paddingX: ToolkitCliHeaderRenderPaddingX = Math.max(0, resolvedOptions['paddingX'] ?? 0);
    const paddingY: ToolkitCliHeaderRenderPaddingY = Math.max(0, resolvedOptions['paddingY'] ?? 0);
    const style: ToolkitCliHeaderRenderStyle = resolvedOptions['style'] ?? 'box';
    const width: ToolkitCliHeaderRenderWidth = Math.max(0, resolvedOptions['width'] ?? process.stdout.columns);

    const topMargin: ToolkitCliHeaderRenderTopMargin = '\n'.repeat(marginTop);
    const bottomMargin: ToolkitCliHeaderRenderBottomMargin = '\n'.repeat(marginBottom);

    const borderCharacters: ToolkitCliHeaderRenderBorderCharacters = ToolkitCliHeader.borderCharacters(style);
    const borderlessWidth: ToolkitCliHeaderRenderBorderlessWidth = Math.max((2 * paddingX), width - 2);
    const topBorder: ToolkitCliHeaderRenderTopBorder = `${borderCharacters['topLeft']}${'─'.repeat(borderlessWidth)}${borderCharacters['topRight']}`;
    const bottomBorder: ToolkitCliHeaderRenderBottomBorder = `${borderCharacters['bottomLeft']}${'─'.repeat(borderlessWidth)}${borderCharacters['bottomRight']}`;
    const contentWidth: ToolkitCliHeaderRenderContentWidth = Math.max(0, borderlessWidth - (2 * paddingX));

    const contentStrings: ToolkitCliHeaderRenderContentStrings = [];
    const displayStrings: ToolkitCliHeaderRenderDisplayStrings = [];

    // Text - Top vertical padding.
    for (let i = 0; i < paddingY; i += 1) {
      const alignedEmpty: ToolkitCliHeaderRenderAlignedEmpty = ToolkitCliHeader.align('', contentWidth, align);

      contentStrings.push(alignedEmpty);
    }

    // Text - Content.
    for (const text of texts) {
      const truncatedText: ToolkitCliHeaderRenderTruncatedText = ToolkitCliHeader.truncate(text, contentWidth);
      const alignedText: ToolkitCliHeaderRenderAlignedText = ToolkitCliHeader.align(truncatedText, contentWidth, align);

      contentStrings.push(alignedText);
    }

    // Text - Bottom vertical padding.
    for (let i = 0; i < paddingY; i += 1) {
      const alignedEmpty: ToolkitCliHeaderRenderAlignedEmpty = ToolkitCliHeader.align('', contentWidth, align);

      contentStrings.push(alignedEmpty);
    }

    // Build the displayable strings.
    for (const contentString of contentStrings) {
      const padded: ToolkitCliHeaderRenderPadded = `${' '.repeat(paddingX)}${contentString}${' '.repeat(paddingX)}`;
      const paddedRow: ToolkitCliHeaderRenderPaddedRow = ToolkitCliHeader.padToWidth(padded, borderlessWidth);

      displayStrings.push(`${borderCharacters['vertical']}${paddedRow}${borderCharacters['vertical']}`);
    }

    return [
      ...(topMargin.length !== 0) ? [`${topMargin}${topBorder}`] : [topBorder],
      ...displayStrings,
      ...(bottomMargin.length !== 0) ? [`${bottomBorder}${bottomMargin}`] : [bottomBorder],
    ].join('\n');
  }

  /**
   * Toolkit - CLI Header - Border Characters.
   *
   * Maps a style name to its Unicode box-drawing character set. Supports box, round,
   * and thick border variants.
   *
   * @param {ToolkitCliHeaderBorderCharactersStyle} style - Style.
   *
   * @private
   *
   * @returns {ToolkitCliHeaderBorderCharactersReturns}
   *
   * @since 0.11.0
   */
  private static borderCharacters(style: ToolkitCliHeaderBorderCharactersStyle): ToolkitCliHeaderBorderCharactersReturns {
    switch (style) {
      case 'round': {
        return {
          topLeft: '╭',
          topRight: '╮',
          bottomLeft: '╰',
          bottomRight: '╯',
          horizontal: '─',
          vertical: '│',
        };
      }

      case 'thick': {
        return {
          topLeft: '╔',
          topRight: '╗',
          bottomLeft: '╚',
          bottomRight: '╝',
          horizontal: '═',
          vertical: '║',
        };
      }

      case 'box':
      default: {
        return {
          topLeft: '┌',
          topRight: '┐',
          bottomLeft: '└',
          bottomRight: '┘',
          horizontal: '─',
          vertical: '│',
        };
      }
    }
  }

  /**
   * Toolkit - CLI Header - Strip ANSI.
   *
   * Removes all ANSI escape sequences from a string. Used in non-interactive mode to
   * produce clean plain-text output without color codes.
   *
   * @param {ToolkitCliHeaderStripAnsiString} string - String.
   *
   * @private
   *
   * @returns {ToolkitCliHeaderStripAnsiReturns}
   *
   * @since 0.14.0
   */
  private static stripAnsi(string: ToolkitCliHeaderStripAnsiString): ToolkitCliHeaderStripAnsiReturns {
    const pattern: ToolkitCliHeaderStripAnsiPattern = new RegExp(LIB_REGEX_PATTERN_ANSI, 'g');

    return string.replace(pattern, '');
  }

  /**
   * Toolkit - CLI Header - Truncate.
   *
   * Clips a string to the given visible width while preserving ANSI escape sequences and
   * appending an ellipsis when text is cut off.
   *
   * @param {ToolkitCliHeaderTruncateString} string - String.
   * @param {ToolkitCliHeaderTruncateMax}    max    - Max.
   *
   * @private
   *
   * @returns {ToolkitCliHeaderTruncateReturns}
   *
   * @since 0.11.0
   */
  private static truncate(string: ToolkitCliHeaderTruncateString, max: ToolkitCliHeaderTruncateMax): ToolkitCliHeaderTruncateReturns {
    if (max <= 0 || string === '') {
      return '';
    }

    const serializedInput: ToolkitCliHeaderTruncateSerializedInput = JSON.stringify(string);

    Logger.customize({
      name: 'ToolkitCliHeader.truncate',
      purpose: 'begin',
    }).debug(serializedInput);

    // First pass: Strip ANSI, record them in order.
    let rawIndex: ToolkitCliHeaderTruncateRawIndex = 0;
    let plain: ToolkitCliHeaderTruncatePlain = '';

    while (rawIndex < string.length) {
      const slice: ToolkitCliHeaderTruncateSlice = string.slice(rawIndex);
      const matches: ToolkitCliHeaderTruncateMatches = slice.match(LIB_REGEX_PATTERN_ANSI_START);

      // Skips the ANSI portion.
      if (matches !== null) {
        const code: ToolkitCliHeaderTruncateCode = matches[0];

        const stripAnsiMessage: ToolkitCliHeaderTruncateStripAnsiMessage = [`ANSI at rawIndex=${rawIndex}: ${JSON.stringify(code)}`].join(', ');

        Logger.customize({
          name: 'ToolkitCliHeader.truncate',
          purpose: 'strip',
        }).debug(stripAnsiMessage);

        rawIndex += code.length;

        continue;
      }

      const character: ToolkitCliHeaderTruncateCharacter = string[rawIndex]!;

      plain += character;

      const stripVisibleMessage: ToolkitCliHeaderTruncateStripVisibleMessage = [
        `Visible at rawIndex=${rawIndex}: ${JSON.stringify(character)}`,
        `plain so far: ${JSON.stringify(plain)}`,
      ].join(', ');

      Logger.customize({
        name: 'ToolkitCliHeader.truncate',
        purpose: 'strip',
      }).debug(stripVisibleMessage);

      rawIndex += 1;
    }

    const serializedPlain: ToolkitCliHeaderTruncateSerializedPlain = JSON.stringify(plain);

    Logger.customize({
      name: 'ToolkitCliHeader.truncate',
      purpose: 'first-pass',
    }).debug(serializedPlain);

    const plainLength: ToolkitCliHeaderTruncatePlainLength = plain.length;
    const needsEllipsis: ToolkitCliHeaderTruncateNeedsEllipsis = plainLength > max;
    const visibleWidth: ToolkitCliHeaderTruncateVisibleWidth = (needsEllipsis === true) ? Math.max(0, max - 1) : Math.min(max, plainLength);

    const serializedWidthInfo: ToolkitCliHeaderTruncateSerializedWidthInfo = JSON.stringify({
      plainLength,
      needsEllipsis,
      visibleWidth,
    });

    Logger.customize({
      name: 'ToolkitCliHeader.truncate',
      purpose: 'width',
    }).debug(serializedWidthInfo);

    // Second pass: Rebuild truncated string, reinserting ANSI.
    let visibleIndex: ToolkitCliHeaderTruncateVisibleIndex = 0;
    let output: ToolkitCliHeaderTruncateOutput = '';

    rawIndex = 0;

    while (rawIndex < string.length && visibleIndex < visibleWidth) {
      const slice: ToolkitCliHeaderTruncateSlice = string.slice(rawIndex);
      const matches: ToolkitCliHeaderTruncateMatches = slice.match(LIB_REGEX_PATTERN_ANSI_START);

      // Adds the ANSI portion back.
      if (matches !== null) {
        const code: ToolkitCliHeaderTruncateCode = matches[0];

        output += code;

        const rebuildAnsiMessage: ToolkitCliHeaderTruncateRebuildAnsiMessage = [`ANSI at rawIndex=${rawIndex}: ${JSON.stringify(code)}`].join(', ');

        Logger.customize({
          name: 'ToolkitCliHeader.truncate',
          purpose: 'rebuild',
        }).debug(rebuildAnsiMessage);

        rawIndex += code.length;

        continue;
      }

      const character: ToolkitCliHeaderTruncateCharacter = string[rawIndex]!;

      output += character;

      visibleIndex += 1;

      const rebuildVisibleMessage: ToolkitCliHeaderTruncateRebuildVisibleMessage = [
        `Visible at rawIndex=${rawIndex}: ${JSON.stringify(character)}`,
        `visible count: ${JSON.stringify(visibleIndex)}`,
      ].join(', ');

      Logger.customize({
        name: 'ToolkitCliHeader.truncate',
        purpose: 'rebuild',
      }).debug(rebuildVisibleMessage);

      rawIndex += 1;
    }

    const serializedSecondPass: ToolkitCliHeaderTruncateSerializedSecondPass = JSON.stringify(output);

    Logger.customize({
      name: 'ToolkitCliHeader.truncate',
      purpose: 'second-pass',
    }).debug(serializedSecondPass);

    if (needsEllipsis === true) {
      output += '…';

      const serializedEllipsis: ToolkitCliHeaderTruncateSerializedEllipsis = JSON.stringify(output);

      Logger.customize({
        name: 'ToolkitCliHeader.truncate',
        purpose: 'ellipsis',
      }).debug(serializedEllipsis);
    }

    // If ANSI is detected in the output, add a hard reset at the end.
    if (output.includes('\x1b[') === true) {
      output += '\x1b[0m';
    }

    const serializedEnd: ToolkitCliHeaderTruncateSerializedEnd = JSON.stringify(output);

    Logger.customize({
      name: 'ToolkitCliHeader.truncate',
      purpose: 'end',
    }).debug(serializedEnd);

    return output;
  }

  /**
   * Toolkit - CLI Header - Align.
   *
   * Pads a string with spaces to fit the target width using left, right, or center
   * alignment. Measures visible length to handle ANSI-colored strings.
   *
   * @param {ToolkitCliHeaderAlignString} string - String.
   * @param {ToolkitCliHeaderAlignWidth}  width  - Width.
   * @param {ToolkitCliHeaderAlignAlign}  align  - Align.
   *
   * @private
   *
   * @returns {ToolkitCliHeaderAlignReturns}
   *
   * @since 0.11.0
   */
  private static align(string: ToolkitCliHeaderAlignString, width: ToolkitCliHeaderAlignWidth, align: ToolkitCliHeaderAlignAlign): ToolkitCliHeaderAlignReturns {
    const stringLength: ToolkitCliHeaderAlignStringLength = ToolkitCliHeader.visibleLength(string);
    const availableSpace: ToolkitCliHeaderAlignAvailableSpace = width - stringLength;
    const leftPadding: ToolkitCliHeaderAlignLeftPadding = Math.floor(availableSpace / 2);
    const rightPadding: ToolkitCliHeaderAlignRightPadding = availableSpace - leftPadding;

    // If string is aligned to the left.
    if (align === 'left') {
      return `${string}${' '.repeat(availableSpace)}`;
    }

    // If string is aligned to the right.
    if (align === 'right') {
      return `${' '.repeat(availableSpace)}${string}`;
    }

    // If string is aligned to the center.
    return `${' '.repeat(leftPadding)}${string}${' '.repeat(rightPadding)}`;
  }

  /**
   * Toolkit - CLI Header - Visible Length.
   *
   * Returns the character count after stripping ANSI codes. Used by align and padToWidth
   * to compute spacing without counting invisible escape bytes.
   *
   * @param {ToolkitCliHeaderVisibleLengthString} string - String.
   *
   * @private
   *
   * @returns {ToolkitCliHeaderVisibleLengthReturns}
   *
   * @since 0.11.0
   */
  private static visibleLength(string: ToolkitCliHeaderVisibleLengthString): ToolkitCliHeaderVisibleLengthReturns {
    const pattern: ToolkitCliHeaderVisibleLengthPattern = new RegExp(LIB_REGEX_PATTERN_ANSI, 'g');

    return string.replace(pattern, '').length;
  }

  /**
   * Toolkit - CLI Header - Pad To Width.
   *
   * Right-pads a string with spaces so it fills the full border width. Called on
   * each content row before wrapping it with vertical border characters.
   *
   * @param {ToolkitCliHeaderPadToWidthString} string - String.
   * @param {ToolkitCliHeaderPadToWidthWidth}  width  - Width.
   *
   * @private
   *
   * @returns {ToolkitCliHeaderPadToWidthReturns}
   *
   * @since 0.11.0
   */
  private static padToWidth(string: ToolkitCliHeaderPadToWidthString, width: ToolkitCliHeaderPadToWidthWidth): ToolkitCliHeaderPadToWidthReturns {
    const visibleLength: ToolkitCliHeaderPadToWidthVisibleLength = ToolkitCliHeader.visibleLength(string);

    const paddingCount: ToolkitCliHeaderPadToWidthPaddingCount = Math.max(0, width - visibleLength);

    return `${string}${' '.repeat(paddingCount)}`;
  }
}

export default ToolkitCliHeader;

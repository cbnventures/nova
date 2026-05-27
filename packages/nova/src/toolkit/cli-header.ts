import { LIB_REGEX_PATTERN_ANSI, LIB_REGEX_PATTERN_ANSI_START } from '../lib/regex.js';
import { Logger } from './index.js';

import type {
  Toolkit_CliHeader_Align_Align,
  Toolkit_CliHeader_Align_AvailableSpace,
  Toolkit_CliHeader_Align_LeftPadding,
  Toolkit_CliHeader_Align_Returns,
  Toolkit_CliHeader_Align_RightPadding,
  Toolkit_CliHeader_Align_String,
  Toolkit_CliHeader_Align_StringLength,
  Toolkit_CliHeader_Align_Width,
  Toolkit_CliHeader_BorderCharacters_Returns,
  Toolkit_CliHeader_BorderCharacters_Style,
  Toolkit_CliHeader_PadToWidth_PaddingCount,
  Toolkit_CliHeader_PadToWidth_Returns,
  Toolkit_CliHeader_PadToWidth_String,
  Toolkit_CliHeader_PadToWidth_VisibleLength,
  Toolkit_CliHeader_PadToWidth_Width,
  Toolkit_CliHeader_Render_Align,
  Toolkit_CliHeader_Render_AlignedEmpty,
  Toolkit_CliHeader_Render_AlignedText,
  Toolkit_CliHeader_Render_BorderCharacters,
  Toolkit_CliHeader_Render_BorderlessWidth,
  Toolkit_CliHeader_Render_BottomBorder,
  Toolkit_CliHeader_Render_BottomMargin,
  Toolkit_CliHeader_Render_ContentStrings,
  Toolkit_CliHeader_Render_ContentWidth,
  Toolkit_CliHeader_Render_DisplayStrings,
  Toolkit_CliHeader_Render_Interactive,
  Toolkit_CliHeader_Render_MarginBottom,
  Toolkit_CliHeader_Render_MarginTop,
  Toolkit_CliHeader_Render_Options,
  Toolkit_CliHeader_Render_Padded,
  Toolkit_CliHeader_Render_PaddedRow,
  Toolkit_CliHeader_Render_PaddingX,
  Toolkit_CliHeader_Render_PaddingY,
  Toolkit_CliHeader_Render_ResolvedOptions,
  Toolkit_CliHeader_Render_Returns,
  Toolkit_CliHeader_Render_Style,
  Toolkit_CliHeader_Render_Texts,
  Toolkit_CliHeader_Render_TopBorder,
  Toolkit_CliHeader_Render_TopMargin,
  Toolkit_CliHeader_Render_TruncatedText,
  Toolkit_CliHeader_Render_Width,
  Toolkit_CliHeader_StripAnsi_Pattern,
  Toolkit_CliHeader_StripAnsi_Returns,
  Toolkit_CliHeader_StripAnsi_String,
  Toolkit_CliHeader_Truncate_Character,
  Toolkit_CliHeader_Truncate_Code,
  Toolkit_CliHeader_Truncate_Matches,
  Toolkit_CliHeader_Truncate_Max,
  Toolkit_CliHeader_Truncate_NeedsEllipsis,
  Toolkit_CliHeader_Truncate_Output,
  Toolkit_CliHeader_Truncate_Plain,
  Toolkit_CliHeader_Truncate_PlainLength,
  Toolkit_CliHeader_Truncate_RawIndex,
  Toolkit_CliHeader_Truncate_RebuildAnsiMessage,
  Toolkit_CliHeader_Truncate_RebuildVisibleMessage,
  Toolkit_CliHeader_Truncate_Returns,
  Toolkit_CliHeader_Truncate_SerializedEllipsis,
  Toolkit_CliHeader_Truncate_SerializedEnd,
  Toolkit_CliHeader_Truncate_SerializedInput,
  Toolkit_CliHeader_Truncate_SerializedPlain,
  Toolkit_CliHeader_Truncate_SerializedSecondPass,
  Toolkit_CliHeader_Truncate_SerializedWidthInfo,
  Toolkit_CliHeader_Truncate_Slice,
  Toolkit_CliHeader_Truncate_String,
  Toolkit_CliHeader_Truncate_StripAnsiMessage,
  Toolkit_CliHeader_Truncate_StripVisibleMessage,
  Toolkit_CliHeader_Truncate_VisibleIndex,
  Toolkit_CliHeader_Truncate_VisibleWidth,
  Toolkit_CliHeader_VisibleLength_Pattern,
  Toolkit_CliHeader_VisibleLength_Returns,
  Toolkit_CliHeader_VisibleLength_String,
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
   * @param {Toolkit_CliHeader_Render_Texts}   texts     - Texts.
   * @param {Toolkit_CliHeader_Render_Options} [options] - Options.
   *
   * @returns {Toolkit_CliHeader_Render_Returns}
   *
   * @since 0.11.0
   */
  public static render(texts: Toolkit_CliHeader_Render_Texts, options?: Toolkit_CliHeader_Render_Options): Toolkit_CliHeader_Render_Returns {
    const resolvedOptions: Toolkit_CliHeader_Render_ResolvedOptions = options ?? {};
    const interactive: Toolkit_CliHeader_Render_Interactive = resolvedOptions['interactive'] ?? (process.stdout.isTTY === true);

    // Non-interactive mode outputs plain text without borders.
    if (interactive === false) {
      return texts.map((text) => ToolkitCliHeader.stripAnsi(text)).join('\n');
    }

    const align: Toolkit_CliHeader_Render_Align = resolvedOptions['align'] ?? 'center';
    const marginTop: Toolkit_CliHeader_Render_MarginTop = Math.max(0, resolvedOptions['marginTop'] ?? 0);
    const marginBottom: Toolkit_CliHeader_Render_MarginBottom = Math.max(0, resolvedOptions['marginBottom'] ?? 0);
    const paddingX: Toolkit_CliHeader_Render_PaddingX = Math.max(0, resolvedOptions['paddingX'] ?? 0);
    const paddingY: Toolkit_CliHeader_Render_PaddingY = Math.max(0, resolvedOptions['paddingY'] ?? 0);
    const style: Toolkit_CliHeader_Render_Style = resolvedOptions['style'] ?? 'box';
    const width: Toolkit_CliHeader_Render_Width = Math.max(0, resolvedOptions['width'] ?? process.stdout.columns);

    const topMargin: Toolkit_CliHeader_Render_TopMargin = '\n'.repeat(marginTop);
    const bottomMargin: Toolkit_CliHeader_Render_BottomMargin = '\n'.repeat(marginBottom);

    const borderCharacters: Toolkit_CliHeader_Render_BorderCharacters = ToolkitCliHeader.borderCharacters(style);
    const borderlessWidth: Toolkit_CliHeader_Render_BorderlessWidth = Math.max((2 * paddingX), width - 2);
    const topBorder: Toolkit_CliHeader_Render_TopBorder = `${borderCharacters['topLeft']}${'─'.repeat(borderlessWidth)}${borderCharacters['topRight']}`;
    const bottomBorder: Toolkit_CliHeader_Render_BottomBorder = `${borderCharacters['bottomLeft']}${'─'.repeat(borderlessWidth)}${borderCharacters['bottomRight']}`;
    const contentWidth: Toolkit_CliHeader_Render_ContentWidth = Math.max(0, borderlessWidth - (2 * paddingX));

    const contentStrings: Toolkit_CliHeader_Render_ContentStrings = [];
    const displayStrings: Toolkit_CliHeader_Render_DisplayStrings = [];

    // Text - Top vertical padding.
    for (let i = 0; i < paddingY; i += 1) {
      const alignedEmpty: Toolkit_CliHeader_Render_AlignedEmpty = ToolkitCliHeader.align('', contentWidth, align);

      contentStrings.push(alignedEmpty);
    }

    // Text - Content.
    for (const text of texts) {
      const truncatedText: Toolkit_CliHeader_Render_TruncatedText = ToolkitCliHeader.truncate(text, contentWidth);
      const alignedText: Toolkit_CliHeader_Render_AlignedText = ToolkitCliHeader.align(truncatedText, contentWidth, align);

      contentStrings.push(alignedText);
    }

    // Text - Bottom vertical padding.
    for (let i = 0; i < paddingY; i += 1) {
      const alignedEmpty: Toolkit_CliHeader_Render_AlignedEmpty = ToolkitCliHeader.align('', contentWidth, align);

      contentStrings.push(alignedEmpty);
    }

    // Build the displayable strings.
    for (const contentString of contentStrings) {
      const padded: Toolkit_CliHeader_Render_Padded = `${' '.repeat(paddingX)}${contentString}${' '.repeat(paddingX)}`;
      const paddedRow: Toolkit_CliHeader_Render_PaddedRow = ToolkitCliHeader.padToWidth(padded, borderlessWidth);

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
   * @param {Toolkit_CliHeader_BorderCharacters_Style} style - Style.
   *
   * @private
   *
   * @returns {Toolkit_CliHeader_BorderCharacters_Returns}
   *
   * @since 0.11.0
   */
  private static borderCharacters(style: Toolkit_CliHeader_BorderCharacters_Style): Toolkit_CliHeader_BorderCharacters_Returns {
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
   * @param {Toolkit_CliHeader_StripAnsi_String} string - String.
   *
   * @private
   *
   * @returns {Toolkit_CliHeader_StripAnsi_Returns}
   *
   * @since 0.14.0
   */
  private static stripAnsi(string: Toolkit_CliHeader_StripAnsi_String): Toolkit_CliHeader_StripAnsi_Returns {
    const pattern: Toolkit_CliHeader_StripAnsi_Pattern = new RegExp(LIB_REGEX_PATTERN_ANSI, 'g');

    return string.replace(pattern, '');
  }

  /**
   * Toolkit - CLI Header - Truncate.
   *
   * Clips a string to the given visible width while preserving ANSI escape sequences and
   * appending an ellipsis when text is cut off.
   *
   * @param {Toolkit_CliHeader_Truncate_String} string - String.
   * @param {Toolkit_CliHeader_Truncate_Max}    max    - Max.
   *
   * @private
   *
   * @returns {Toolkit_CliHeader_Truncate_Returns}
   *
   * @since 0.11.0
   */
  private static truncate(string: Toolkit_CliHeader_Truncate_String, max: Toolkit_CliHeader_Truncate_Max): Toolkit_CliHeader_Truncate_Returns {
    if (max <= 0 || string === '') {
      return '';
    }

    const serializedInput: Toolkit_CliHeader_Truncate_SerializedInput = JSON.stringify(string);

    Logger.customize({
      name: 'ToolkitCliHeader.truncate',
      purpose: 'begin',
    }).debug(serializedInput);

    // First pass: Strip ANSI, record them in order.
    let rawIndex: Toolkit_CliHeader_Truncate_RawIndex = 0;
    let plain: Toolkit_CliHeader_Truncate_Plain = '';

    while (rawIndex < string.length) {
      const slice: Toolkit_CliHeader_Truncate_Slice = string.slice(rawIndex);
      const matches: Toolkit_CliHeader_Truncate_Matches = slice.match(LIB_REGEX_PATTERN_ANSI_START);

      // Skips the ANSI portion.
      if (matches !== null) {
        const code: Toolkit_CliHeader_Truncate_Code = matches[0];

        const stripAnsiMessage: Toolkit_CliHeader_Truncate_StripAnsiMessage = [`ANSI at rawIndex=${rawIndex}: ${JSON.stringify(code)}`].join(', ');

        Logger.customize({
          name: 'ToolkitCliHeader.truncate',
          purpose: 'strip',
        }).debug(stripAnsiMessage);

        rawIndex += code.length;

        continue;
      }

      const character: Toolkit_CliHeader_Truncate_Character = string[rawIndex]!;

      plain += character;

      const stripVisibleMessage: Toolkit_CliHeader_Truncate_StripVisibleMessage = [
        `Visible at rawIndex=${rawIndex}: ${JSON.stringify(character)}`,
        `plain so far: ${JSON.stringify(plain)}`,
      ].join(', ');

      Logger.customize({
        name: 'ToolkitCliHeader.truncate',
        purpose: 'strip',
      }).debug(stripVisibleMessage);

      rawIndex += 1;
    }

    const serializedPlain: Toolkit_CliHeader_Truncate_SerializedPlain = JSON.stringify(plain);

    Logger.customize({
      name: 'ToolkitCliHeader.truncate',
      purpose: 'first-pass',
    }).debug(serializedPlain);

    const plainLength: Toolkit_CliHeader_Truncate_PlainLength = plain.length;
    const needsEllipsis: Toolkit_CliHeader_Truncate_NeedsEllipsis = plainLength > max;
    const visibleWidth: Toolkit_CliHeader_Truncate_VisibleWidth = (needsEllipsis === true) ? Math.max(0, max - 1) : Math.min(max, plainLength);

    const serializedWidthInfo: Toolkit_CliHeader_Truncate_SerializedWidthInfo = JSON.stringify({
      plainLength,
      needsEllipsis,
      visibleWidth,
    });

    Logger.customize({
      name: 'ToolkitCliHeader.truncate',
      purpose: 'width',
    }).debug(serializedWidthInfo);

    // Second pass: Rebuild truncated string, reinserting ANSI.
    let visibleIndex: Toolkit_CliHeader_Truncate_VisibleIndex = 0;
    let output: Toolkit_CliHeader_Truncate_Output = '';

    rawIndex = 0;

    while (rawIndex < string.length && visibleIndex < visibleWidth) {
      const slice: Toolkit_CliHeader_Truncate_Slice = string.slice(rawIndex);
      const matches: Toolkit_CliHeader_Truncate_Matches = slice.match(LIB_REGEX_PATTERN_ANSI_START);

      // Adds the ANSI portion back.
      if (matches !== null) {
        const code: Toolkit_CliHeader_Truncate_Code = matches[0];

        output += code;

        const rebuildAnsiMessage: Toolkit_CliHeader_Truncate_RebuildAnsiMessage = [`ANSI at rawIndex=${rawIndex}: ${JSON.stringify(code)}`].join(', ');

        Logger.customize({
          name: 'ToolkitCliHeader.truncate',
          purpose: 'rebuild',
        }).debug(rebuildAnsiMessage);

        rawIndex += code.length;

        continue;
      }

      const character: Toolkit_CliHeader_Truncate_Character = string[rawIndex]!;

      output += character;

      visibleIndex += 1;

      const rebuildVisibleMessage: Toolkit_CliHeader_Truncate_RebuildVisibleMessage = [
        `Visible at rawIndex=${rawIndex}: ${JSON.stringify(character)}`,
        `visible count: ${JSON.stringify(visibleIndex)}`,
      ].join(', ');

      Logger.customize({
        name: 'ToolkitCliHeader.truncate',
        purpose: 'rebuild',
      }).debug(rebuildVisibleMessage);

      rawIndex += 1;
    }

    const serializedSecondPass: Toolkit_CliHeader_Truncate_SerializedSecondPass = JSON.stringify(output);

    Logger.customize({
      name: 'ToolkitCliHeader.truncate',
      purpose: 'second-pass',
    }).debug(serializedSecondPass);

    if (needsEllipsis === true) {
      output += '…';

      const serializedEllipsis: Toolkit_CliHeader_Truncate_SerializedEllipsis = JSON.stringify(output);

      Logger.customize({
        name: 'ToolkitCliHeader.truncate',
        purpose: 'ellipsis',
      }).debug(serializedEllipsis);
    }

    // If ANSI is detected in the output, add a hard reset at the end.
    if (output.includes('\x1b[') === true) {
      output += '\x1b[0m';
    }

    const serializedEnd: Toolkit_CliHeader_Truncate_SerializedEnd = JSON.stringify(output);

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
   * @param {Toolkit_CliHeader_Align_String} string - String.
   * @param {Toolkit_CliHeader_Align_Width}  width  - Width.
   * @param {Toolkit_CliHeader_Align_Align}  align  - Align.
   *
   * @private
   *
   * @returns {Toolkit_CliHeader_Align_Returns}
   *
   * @since 0.11.0
   */
  private static align(string: Toolkit_CliHeader_Align_String, width: Toolkit_CliHeader_Align_Width, align: Toolkit_CliHeader_Align_Align): Toolkit_CliHeader_Align_Returns {
    const stringLength: Toolkit_CliHeader_Align_StringLength = ToolkitCliHeader.visibleLength(string);
    const availableSpace: Toolkit_CliHeader_Align_AvailableSpace = width - stringLength;
    const leftPadding: Toolkit_CliHeader_Align_LeftPadding = Math.floor(availableSpace / 2);
    const rightPadding: Toolkit_CliHeader_Align_RightPadding = availableSpace - leftPadding;

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
   * @param {Toolkit_CliHeader_VisibleLength_String} string - String.
   *
   * @private
   *
   * @returns {Toolkit_CliHeader_VisibleLength_Returns}
   *
   * @since 0.11.0
   */
  private static visibleLength(string: Toolkit_CliHeader_VisibleLength_String): Toolkit_CliHeader_VisibleLength_Returns {
    const pattern: Toolkit_CliHeader_VisibleLength_Pattern = new RegExp(LIB_REGEX_PATTERN_ANSI, 'g');

    return string.replace(pattern, '').length;
  }

  /**
   * Toolkit - CLI Header - Pad To Width.
   *
   * Right-pads a string with spaces so it fills the full border width. Called on
   * each content row before wrapping it with vertical border characters.
   *
   * @param {Toolkit_CliHeader_PadToWidth_String} string - String.
   * @param {Toolkit_CliHeader_PadToWidth_Width}  width  - Width.
   *
   * @private
   *
   * @returns {Toolkit_CliHeader_PadToWidth_Returns}
   *
   * @since 0.11.0
   */
  private static padToWidth(string: Toolkit_CliHeader_PadToWidth_String, width: Toolkit_CliHeader_PadToWidth_Width): Toolkit_CliHeader_PadToWidth_Returns {
    const visibleLength: Toolkit_CliHeader_PadToWidth_VisibleLength = ToolkitCliHeader.visibleLength(string);

    const paddingCount: Toolkit_CliHeader_PadToWidth_PaddingCount = Math.max(0, width - visibleLength);

    return `${string}${' '.repeat(paddingCount)}`;
  }
}

export default ToolkitCliHeader;

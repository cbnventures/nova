import type { SharedBorderCharacters, SharedBorderStyle, SharedTextAlign } from '../shared.d.ts';

/**
 * Toolkit - CLI Header - Align.
 *
 * @since 0.11.0
 */
export type ToolkitCliHeaderAlignString = string;

export type ToolkitCliHeaderAlignWidth = number;

export type ToolkitCliHeaderAlignAlign = SharedTextAlign;

export type ToolkitCliHeaderAlignReturns = string;

export type ToolkitCliHeaderAlignStringLength = number;

export type ToolkitCliHeaderAlignAvailableSpace = number;

export type ToolkitCliHeaderAlignLeftPadding = number;

export type ToolkitCliHeaderAlignRightPadding = number;

/**
 * Toolkit - CLI Header - Border Characters.
 *
 * @since 0.11.0
 */
export type ToolkitCliHeaderBorderCharactersStyle = SharedBorderStyle;

export type ToolkitCliHeaderBorderCharactersReturns = SharedBorderCharacters;

/**
 * Toolkit - CLI Header - Pad To Width.
 *
 * @since 0.11.0
 */
export type ToolkitCliHeaderPadToWidthString = string;

export type ToolkitCliHeaderPadToWidthWidth = number;

export type ToolkitCliHeaderPadToWidthReturns = string;

export type ToolkitCliHeaderPadToWidthVisibleLength = number;

export type ToolkitCliHeaderPadToWidthPaddingCount = number;

/**
 * Toolkit - CLI Header - Render.
 *
 * @since 0.11.0
 */
export type ToolkitCliHeaderRenderTexts = string[];

export type ToolkitCliHeaderRenderOptionsAlign = SharedTextAlign;

export type ToolkitCliHeaderRenderOptionsMarginTop = number;

export type ToolkitCliHeaderRenderOptionsMarginBottom = number;

export type ToolkitCliHeaderRenderOptionsPaddingX = number;

export type ToolkitCliHeaderRenderOptionsPaddingY = number;

export type ToolkitCliHeaderRenderOptionsStyle = SharedBorderStyle;

export type ToolkitCliHeaderRenderOptionsWidth = number;

export type ToolkitCliHeaderRenderOptionsInteractive = boolean;

export type ToolkitCliHeaderRenderOptions = {
  align?: ToolkitCliHeaderRenderOptionsAlign;
  marginTop?: ToolkitCliHeaderRenderOptionsMarginTop;
  marginBottom?: ToolkitCliHeaderRenderOptionsMarginBottom;
  paddingX?: ToolkitCliHeaderRenderOptionsPaddingX;
  paddingY?: ToolkitCliHeaderRenderOptionsPaddingY;
  style?: ToolkitCliHeaderRenderOptionsStyle;
  width?: ToolkitCliHeaderRenderOptionsWidth;
  interactive?: ToolkitCliHeaderRenderOptionsInteractive;
};

export type ToolkitCliHeaderRenderReturns = string;

export type ToolkitCliHeaderRenderResolvedOptions = ToolkitCliHeaderRenderOptions;

export type ToolkitCliHeaderRenderInteractive = boolean;

export type ToolkitCliHeaderRenderAlign = SharedTextAlign;

export type ToolkitCliHeaderRenderMarginTop = number;

export type ToolkitCliHeaderRenderMarginBottom = number;

export type ToolkitCliHeaderRenderPaddingX = number;

export type ToolkitCliHeaderRenderPaddingY = number;

export type ToolkitCliHeaderRenderStyle = SharedBorderStyle;

export type ToolkitCliHeaderRenderWidth = number;

export type ToolkitCliHeaderRenderTopMargin = string;

export type ToolkitCliHeaderRenderBottomMargin = string;

export type ToolkitCliHeaderRenderBorderCharacters = SharedBorderCharacters;

export type ToolkitCliHeaderRenderBorderlessWidth = number;

export type ToolkitCliHeaderRenderTopBorder = string;

export type ToolkitCliHeaderRenderBottomBorder = string;

export type ToolkitCliHeaderRenderContentWidth = number;

export type ToolkitCliHeaderRenderContentStrings = string[];

export type ToolkitCliHeaderRenderDisplayStrings = string[];

export type ToolkitCliHeaderRenderAlignedEmpty = string;

export type ToolkitCliHeaderRenderTruncatedText = string;

export type ToolkitCliHeaderRenderAlignedText = string;

export type ToolkitCliHeaderRenderPadded = string;

export type ToolkitCliHeaderRenderPaddedRow = string;

/**
 * Toolkit - CLI Header - Strip ANSI.
 *
 * @since 0.14.0
 */
export type ToolkitCliHeaderStripAnsiString = string;

export type ToolkitCliHeaderStripAnsiReturns = string;

export type ToolkitCliHeaderStripAnsiPattern = RegExp;

/**
 * Toolkit - CLI Header - Truncate.
 *
 * @since 0.11.0
 */
export type ToolkitCliHeaderTruncateString = string;

export type ToolkitCliHeaderTruncateMax = number;

export type ToolkitCliHeaderTruncateReturns = string;

export type ToolkitCliHeaderTruncateSerializedInput = string;

export type ToolkitCliHeaderTruncateRawIndex = number;

export type ToolkitCliHeaderTruncatePlain = string;

export type ToolkitCliHeaderTruncateSlice = string;

export type ToolkitCliHeaderTruncateMatches = RegExpMatchArray | null;

export type ToolkitCliHeaderTruncateCode = string;

export type ToolkitCliHeaderTruncateStripAnsiMessage = string;

export type ToolkitCliHeaderTruncateCharacter = string;

export type ToolkitCliHeaderTruncateStripVisibleMessage = string;

export type ToolkitCliHeaderTruncateSerializedPlain = string;

export type ToolkitCliHeaderTruncatePlainLength = number;

export type ToolkitCliHeaderTruncateNeedsEllipsis = boolean;

export type ToolkitCliHeaderTruncateVisibleWidth = number;

export type ToolkitCliHeaderTruncateSerializedWidthInfo = string;

export type ToolkitCliHeaderTruncateVisibleIndex = number;

export type ToolkitCliHeaderTruncateOutput = string;

export type ToolkitCliHeaderTruncateRebuildAnsiMessage = string;

export type ToolkitCliHeaderTruncateRebuildVisibleMessage = string;

export type ToolkitCliHeaderTruncateSerializedSecondPass = string;

export type ToolkitCliHeaderTruncateSerializedEllipsis = string;

export type ToolkitCliHeaderTruncateSerializedEnd = string;

/**
 * Toolkit - CLI Header - Visible Length.
 *
 * @since 0.11.0
 */
export type ToolkitCliHeaderVisibleLengthString = string;

export type ToolkitCliHeaderVisibleLengthReturns = number;

export type ToolkitCliHeaderVisibleLengthPattern = RegExp;

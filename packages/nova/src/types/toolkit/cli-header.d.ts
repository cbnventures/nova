import type { Shared_BorderCharacters, Shared_BorderStyle, Shared_TextAlign } from '../shared.d.ts';

/**
 * Toolkit - CLI Header - Align.
 *
 * @since 0.11.0
 */
export type Toolkit_CliHeader_Runner_Align_String = string;

export type Toolkit_CliHeader_Runner_Align_Width = number;

export type Toolkit_CliHeader_Runner_Align_Align = Shared_TextAlign;

export type Toolkit_CliHeader_Runner_Align_Returns = string;

export type Toolkit_CliHeader_Runner_Align_StringLength = number;

export type Toolkit_CliHeader_Runner_Align_AvailableSpace = number;

export type Toolkit_CliHeader_Runner_Align_LeftPadding = number;

export type Toolkit_CliHeader_Runner_Align_RightPadding = number;

/**
 * Toolkit - CLI Header - Border Characters.
 *
 * @since 0.11.0
 */
export type Toolkit_CliHeader_Runner_BorderCharacters_Style = Shared_BorderStyle;

export type Toolkit_CliHeader_Runner_BorderCharacters_Returns = Shared_BorderCharacters;

/**
 * Toolkit - CLI Header - Pad To Width.
 *
 * @since 0.11.0
 */
export type Toolkit_CliHeader_Runner_PadToWidth_String = string;

export type Toolkit_CliHeader_Runner_PadToWidth_Width = number;

export type Toolkit_CliHeader_Runner_PadToWidth_Returns = string;

export type Toolkit_CliHeader_Runner_PadToWidth_VisibleLength = number;

export type Toolkit_CliHeader_Runner_PadToWidth_PaddingCount = number;

/**
 * Toolkit - CLI Header - Render.
 *
 * @since 0.11.0
 */
export type Toolkit_CliHeader_Runner_Render_Texts = string[];

export type Toolkit_CliHeader_Runner_Render_Options_Align = Shared_TextAlign;

export type Toolkit_CliHeader_Runner_Render_Options_MarginTop = number;

export type Toolkit_CliHeader_Runner_Render_Options_MarginBottom = number;

export type Toolkit_CliHeader_Runner_Render_Options_PaddingX = number;

export type Toolkit_CliHeader_Runner_Render_Options_PaddingY = number;

export type Toolkit_CliHeader_Runner_Render_Options_Style = Shared_BorderStyle;

export type Toolkit_CliHeader_Runner_Render_Options_Width = number;

export type Toolkit_CliHeader_Runner_Render_Options_Interactive = boolean;

export type Toolkit_CliHeader_Runner_Render_Options = {
  align?: Toolkit_CliHeader_Runner_Render_Options_Align;
  marginTop?: Toolkit_CliHeader_Runner_Render_Options_MarginTop;
  marginBottom?: Toolkit_CliHeader_Runner_Render_Options_MarginBottom;
  paddingX?: Toolkit_CliHeader_Runner_Render_Options_PaddingX;
  paddingY?: Toolkit_CliHeader_Runner_Render_Options_PaddingY;
  style?: Toolkit_CliHeader_Runner_Render_Options_Style;
  width?: Toolkit_CliHeader_Runner_Render_Options_Width;
  interactive?: Toolkit_CliHeader_Runner_Render_Options_Interactive;
};

export type Toolkit_CliHeader_Runner_Render_Returns = string;

export type Toolkit_CliHeader_Runner_Render_ResolvedOptions = Toolkit_CliHeader_Runner_Render_Options;

export type Toolkit_CliHeader_Runner_Render_Interactive = boolean;

export type Toolkit_CliHeader_Runner_Render_Align = 'left' | 'center' | 'right';

export type Toolkit_CliHeader_Runner_Render_MarginTop = number;

export type Toolkit_CliHeader_Runner_Render_MarginBottom = number;

export type Toolkit_CliHeader_Runner_Render_PaddingX = number;

export type Toolkit_CliHeader_Runner_Render_PaddingY = number;

export type Toolkit_CliHeader_Runner_Render_Style = 'box' | 'round' | 'thick';

export type Toolkit_CliHeader_Runner_Render_Width = number;

export type Toolkit_CliHeader_Runner_Render_TopMargin = string;

export type Toolkit_CliHeader_Runner_Render_BottomMargin = string;

export type Toolkit_CliHeader_Runner_Render_BorderCharacters = Readonly<Shared_BorderCharacters>;

export type Toolkit_CliHeader_Runner_Render_BorderlessWidth = number;

export type Toolkit_CliHeader_Runner_Render_TopBorder = string;

export type Toolkit_CliHeader_Runner_Render_BottomBorder = string;

export type Toolkit_CliHeader_Runner_Render_ContentWidth = number;

export type Toolkit_CliHeader_Runner_Render_ContentStrings = string[];

export type Toolkit_CliHeader_Runner_Render_DisplayStrings = string[];

export type Toolkit_CliHeader_Runner_Render_AlignedEmpty = string;

export type Toolkit_CliHeader_Runner_Render_TruncatedText = string;

export type Toolkit_CliHeader_Runner_Render_AlignedText = string;

export type Toolkit_CliHeader_Runner_Render_AlignedBottomEmpty = string;

export type Toolkit_CliHeader_Runner_Render_Padded = string;

export type Toolkit_CliHeader_Runner_Render_PaddedRow = string;

/**
 * Toolkit - CLI Header - Strip ANSI.
 *
 * @since 0.14.0
 */
export type Toolkit_CliHeader_Runner_StripAnsi_String = string;

export type Toolkit_CliHeader_Runner_StripAnsi_Returns = string;

export type Toolkit_CliHeader_Runner_StripAnsi_Pattern = RegExp;

/**
 * Toolkit - CLI Header - Truncate.
 *
 * @since 0.11.0
 */
export type Toolkit_CliHeader_Runner_Truncate_String = string;

export type Toolkit_CliHeader_Runner_Truncate_Max = number;

export type Toolkit_CliHeader_Runner_Truncate_Returns = string;

export type Toolkit_CliHeader_Runner_Truncate_SerializedInput = string;

export type Toolkit_CliHeader_Runner_Truncate_RawIndex = number;

export type Toolkit_CliHeader_Runner_Truncate_Plain = string;

export type Toolkit_CliHeader_Runner_Truncate_Slice = string;

export type Toolkit_CliHeader_Runner_Truncate_Matches = RegExpMatchArray | null;

export type Toolkit_CliHeader_Runner_Truncate_Code = string;

export type Toolkit_CliHeader_Runner_Truncate_StripAnsiMessage = string;

export type Toolkit_CliHeader_Runner_Truncate_Character = string;

export type Toolkit_CliHeader_Runner_Truncate_StripVisibleMessage = string;

export type Toolkit_CliHeader_Runner_Truncate_SerializedPlain = string;

export type Toolkit_CliHeader_Runner_Truncate_PlainLength = number;

export type Toolkit_CliHeader_Runner_Truncate_NeedsEllipsis = boolean;

export type Toolkit_CliHeader_Runner_Truncate_VisibleWidth = number;

export type Toolkit_CliHeader_Runner_Truncate_SerializedWidthInfo = string;

export type Toolkit_CliHeader_Runner_Truncate_VisibleIndex = number;

export type Toolkit_CliHeader_Runner_Truncate_Output = string;

export type Toolkit_CliHeader_Runner_Truncate_RebuildSlice = string;

export type Toolkit_CliHeader_Runner_Truncate_RebuildMatches = RegExpMatchArray | null;

export type Toolkit_CliHeader_Runner_Truncate_RebuildCode = string;

export type Toolkit_CliHeader_Runner_Truncate_RebuildAnsiMessage = string;

export type Toolkit_CliHeader_Runner_Truncate_RebuildCharacter = string;

export type Toolkit_CliHeader_Runner_Truncate_RebuildVisibleMessage = string;

export type Toolkit_CliHeader_Runner_Truncate_SerializedSecondPass = string;

export type Toolkit_CliHeader_Runner_Truncate_SerializedEllipsis = string;

export type Toolkit_CliHeader_Runner_Truncate_SerializedEnd = string;

/**
 * Toolkit - CLI Header - Visible Length.
 *
 * @since 0.11.0
 */
export type Toolkit_CliHeader_Runner_VisibleLength_String = string;

export type Toolkit_CliHeader_Runner_VisibleLength_Returns = number;

export type Toolkit_CliHeader_Runner_VisibleLength_Pattern = RegExp;

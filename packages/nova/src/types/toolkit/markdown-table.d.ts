import type { MarkdownTable } from '../../toolkit/index.js';

/**
 * Toolkit - Markdown Table - Add Row.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_AddRow_Row = string[];

export type Toolkit_MarkdownTable_AddRow_Returns = MarkdownTable;

/**
 * Toolkit - Markdown Table - Compute Column Widths.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_ComputeColumnWidths_Returns = number[];

export type Toolkit_MarkdownTable_ComputeColumnWidths_ColumnsLength = number;

export type Toolkit_MarkdownTable_ComputeColumnWidths_Row = string[];

export type Toolkit_MarkdownTable_ComputeColumnWidths_Rows = Toolkit_MarkdownTable_ComputeColumnWidths_Row[];

export type Toolkit_MarkdownTable_ComputeColumnWidths_ColumnWidth = number;

export type Toolkit_MarkdownTable_ComputeColumnWidths_StrippedCell = string;

/**
 * Toolkit - Markdown Table - Constructor.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_Constructor_Headers = string[];

export type Toolkit_MarkdownTable_Constructor_Options_MinimumColumnWidth = number;

export type Toolkit_MarkdownTable_Constructor_Options_PadDelimiterRow = boolean;

export type Toolkit_MarkdownTable_Constructor_Options = {
  minimumColumnWidth: Toolkit_MarkdownTable_Constructor_Options_MinimumColumnWidth;
  padDelimiterRow: Toolkit_MarkdownTable_Constructor_Options_PadDelimiterRow;
};

/**
 * Toolkit - Markdown Table - Escape Cell.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_EscapeCell_Value = string;

export type Toolkit_MarkdownTable_EscapeCell_Returns = string;

export type Toolkit_MarkdownTable_EscapeCell_PipePattern = RegExp;

export type Toolkit_MarkdownTable_EscapeCell_LinebreakPattern = RegExp;

/**
 * Toolkit - Markdown Table - Format Delimiter.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_FormatDelimiter_ColumnWidths = number[];

export type Toolkit_MarkdownTable_FormatDelimiter_Returns = string;

export type Toolkit_MarkdownTable_FormatDelimiter_MinimumWidth = number;

export type Toolkit_MarkdownTable_FormatDelimiter_UsePaddedDelimiter = boolean;

export type Toolkit_MarkdownTable_FormatDelimiter_ColumnCells = string[];

export type Toolkit_MarkdownTable_FormatDelimiter_Delimiter = string;

export type Toolkit_MarkdownTable_FormatDelimiter_RowBody = string;

/**
 * Toolkit - Markdown Table - Format Row.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_FormatRow_Cells = string[];

export type Toolkit_MarkdownTable_FormatRow_Widths = number[];

export type Toolkit_MarkdownTable_FormatRow_Returns = string;

export type Toolkit_MarkdownTable_FormatRow_EscapedCells = string[];

export type Toolkit_MarkdownTable_FormatRow_EscapedCell = string;

/**
 * Toolkit - Markdown Table - Headers.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_Headers = string[];

/**
 * Toolkit - Markdown Table - Minimum Column Width.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_MinimumColumnWidth = number;

/**
 * Toolkit - Markdown Table - Pad Cell.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_PadCell_String = string;

export type Toolkit_MarkdownTable_PadCell_Width = number;

export type Toolkit_MarkdownTable_PadCell_Returns = string;

export type Toolkit_MarkdownTable_PadCell_Padding = number;

/**
 * Toolkit - Markdown Table - Pad Delimiter Row.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_PadDelimiterRow = boolean;

/**
 * Toolkit - Markdown Table - Render.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_Render_Returns = string;

export type Toolkit_MarkdownTable_Render_ColumnWidths = number[];

export type Toolkit_MarkdownTable_Render_Header = string;

export type Toolkit_MarkdownTable_Render_Delimiter = string;

export type Toolkit_MarkdownTable_Render_Body = string;

/**
 * Toolkit - Markdown Table - Rows.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_Row = string[];

export type Toolkit_MarkdownTable_Rows = Toolkit_MarkdownTable_Row[];

/**
 * Toolkit - Markdown Table - Strip ANSI Colors.
 *
 * @since 0.11.0
 */
export type Toolkit_MarkdownTable_StripAnsiColors_String = string;

export type Toolkit_MarkdownTable_StripAnsiColors_Returns = string;

export type Toolkit_MarkdownTable_StripAnsiColors_Pattern = RegExp;

import type { MarkdownTable } from '../../toolkit/index.js';

/**
 * Toolkit - Markdown Table - Add Row.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableAddRowRow = string[];

export type ToolkitMarkdownTableAddRowReturns = MarkdownTable;

/**
 * Toolkit - Markdown Table - Compute Column Widths.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableComputeColumnWidthsReturns = number[];

export type ToolkitMarkdownTableComputeColumnWidthsColumnsLength = number;

export type ToolkitMarkdownTableComputeColumnWidthsRow = string[];

export type ToolkitMarkdownTableComputeColumnWidthsRows = ToolkitMarkdownTableComputeColumnWidthsRow[];

export type ToolkitMarkdownTableComputeColumnWidthsColumnWidth = number;

export type ToolkitMarkdownTableComputeColumnWidthsStrippedCell = string;

/**
 * Toolkit - Markdown Table - Constructor.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableConstructorHeaders = string[];

export type ToolkitMarkdownTableConstructorOptionsMinimumColumnWidth = number;

export type ToolkitMarkdownTableConstructorOptionsPadDelimiterRow = boolean;

export type ToolkitMarkdownTableConstructorOptions = {
  minimumColumnWidth: ToolkitMarkdownTableConstructorOptionsMinimumColumnWidth;
  padDelimiterRow: ToolkitMarkdownTableConstructorOptionsPadDelimiterRow;
};

/**
 * Toolkit - Markdown Table - Escape Cell.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableEscapeCellValue = string;

export type ToolkitMarkdownTableEscapeCellReturns = string;

export type ToolkitMarkdownTableEscapeCellPipePattern = RegExp;

export type ToolkitMarkdownTableEscapeCellLinebreakPattern = RegExp;

/**
 * Toolkit - Markdown Table - Format Delimiter.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableFormatDelimiterColumnWidths = number[];

export type ToolkitMarkdownTableFormatDelimiterReturns = string;

export type ToolkitMarkdownTableFormatDelimiterMinimumWidth = number;

export type ToolkitMarkdownTableFormatDelimiterUsePaddedDelimiter = boolean;

export type ToolkitMarkdownTableFormatDelimiterColumnCells = string[];

export type ToolkitMarkdownTableFormatDelimiterDelimiter = string;

export type ToolkitMarkdownTableFormatDelimiterRowBody = string;

/**
 * Toolkit - Markdown Table - Format Row.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableFormatRowCells = string[];

export type ToolkitMarkdownTableFormatRowWidths = number[];

export type ToolkitMarkdownTableFormatRowReturns = string;

export type ToolkitMarkdownTableFormatRowEscapedCells = string[];

export type ToolkitMarkdownTableFormatRowEscapedCell = string;

/**
 * Toolkit - Markdown Table - Headers.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableHeaders = string[];

/**
 * Toolkit - Markdown Table - Minimum Column Width.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableMinimumColumnWidth = number;

/**
 * Toolkit - Markdown Table - Pad Cell.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTablePadCellString = string;

export type ToolkitMarkdownTablePadCellWidth = number;

export type ToolkitMarkdownTablePadCellReturns = string;

export type ToolkitMarkdownTablePadCellPadding = number;

/**
 * Toolkit - Markdown Table - Pad Delimiter Row.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTablePadDelimiterRow = boolean;

/**
 * Toolkit - Markdown Table - Render.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableRenderReturns = string;

export type ToolkitMarkdownTableRenderColumnWidths = number[];

export type ToolkitMarkdownTableRenderHeader = string;

export type ToolkitMarkdownTableRenderDelimiter = string;

export type ToolkitMarkdownTableRenderBody = string;

/**
 * Toolkit - Markdown Table - Rows.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableRow = string[];

export type ToolkitMarkdownTableRows = ToolkitMarkdownTableRow[];

/**
 * Toolkit - Markdown Table - Strip ANSI Colors.
 *
 * @since 0.11.0
 */
export type ToolkitMarkdownTableStripAnsiColorsString = string;

export type ToolkitMarkdownTableStripAnsiColorsReturns = string;

export type ToolkitMarkdownTableStripAnsiColorsPattern = RegExp;

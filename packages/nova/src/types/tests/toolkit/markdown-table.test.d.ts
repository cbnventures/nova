import type MarkdownTable from '../../../toolkit/markdown-table.js';

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable AddRow - Accepts Row Matching Headers Length.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_AcceptsRowMatchingHeadersLength_Table = MarkdownTable;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable AddRow - Returns Instance For Chaining.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_ReturnsInstanceForChaining_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_ReturnsInstanceForChaining_Result = MarkdownTable;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable AddRow - Supports Chaining Multiple Rows.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_SupportsChainingMultipleRows_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_SupportsChainingMultipleRows_Result = MarkdownTable;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable AddRow - Throws On Row Length Mismatch.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableAddRow_ThrowsOnRowLengthMismatch_Table = MarkdownTable;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Constructor - Accepts Valid Headers.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableConstructor_AcceptsValidHeaders_Headers = string[];

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Constructor - Throws On Empty Headers Array.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableConstructor_ThrowsOnEmptyHeadersArray_Headers = string[];

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render - Escapes Pipe Characters In Cells.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_EscapesPipeCharactersInCells_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_EscapesPipeCharactersInCells_Output = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_EscapesPipeCharactersInCells_IncludesEscapedPipe = boolean;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render - Pads Columns To Minimum Width.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_Output = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_HeaderLine = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_PadsColumnsToMinimumWidth_IncludesPaddedHeader = boolean;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render - Renders Basic Table With One Row.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Output = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Lines = string[];

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Line0 = string | undefined;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Line1 = string | undefined;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_Line2 = string | undefined;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_StartsWithPipe = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_EndsWithPipe = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_IncludesDash = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_IncludesNova = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersBasicTableWithOneRow_IncludesVersion = boolean;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render - Renders Compact Delimiter Row By Default.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_Output = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_DelimiterLine = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_StartsWithDash = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_IncludesDashSeparator = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersCompactDelimiterRowByDefault_EndsWithDash = boolean;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render - Renders Headers Only Table.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersHeadersOnlyTable_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersHeadersOnlyTable_Output = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersHeadersOnlyTable_Lines = string[];

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render - Renders Padded Delimiter Row When Option Enabled.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_Output = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_DelimiterLine = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_StartsWithPipe = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_IncludesPipeSeparator = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersPaddedDelimiterRowWhenOptionEnabled_EndsWithPipe = boolean;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render - Renders Table With Multiple Rows.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Output = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Lines = string[];

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Line2 = string | undefined;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_Line3 = string | undefined;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_IncludesNode = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RendersTableWithMultipleRows_IncludesNpm = boolean;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render - Replaces Newlines In Cells With Spaces.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_Output = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_IncludesJoinedLines = boolean;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_ReplacesNewlinesInCellsWithSpaces_IncludesOriginalNewline = boolean;

/**
 * Tests - Toolkit - Markdown Table - MarkdownTable Render - Respects Custom Minimum Column Width.
 *
 * @since 0.13.0
 */
export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_Table = MarkdownTable;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_Output = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_DelimiterLine = string;

export type Tests_Toolkit_MarkdownTable_MarkdownTableRender_RespectsCustomMinimumColumnWidth_IncludesTenDashes = boolean;

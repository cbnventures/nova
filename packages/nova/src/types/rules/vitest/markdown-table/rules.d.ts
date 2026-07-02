import type { MarkdownTable } from '../../../../toolkit/index.js';
import type { Rules_Vitest_Index_MarkdownTableResolvedConfig } from '../index.d.ts';

/**
 * Rules - Vitest - Markdown Table - Rules - Tables Match Markdown Table Output.
 *
 * @since 0.20.0
 */
export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Config = Rules_Vitest_Index_MarkdownTableResolvedConfig;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Enable = 'all' | 'tables-match-markdowntable-output'[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Returns = Promise<void>;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_MdFiles = string[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells_Row = string;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells_Segments = string[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells_Returns = string[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells = (row: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells_Row) => Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells_Returns;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Failures = string[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_FilePath = string;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Content = string;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Lines = string[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Tables = string[][];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_CurrentTable = string[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_InCodeBlock = boolean;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_TableLines = string[] | undefined;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_HeaderLine = string | undefined;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_DelimiterLine = string | undefined;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Headers = string[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_DataRows = string[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Table = MarkdownTable;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParsedCells = string[];

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Rendered = string;

export type Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Original = string;

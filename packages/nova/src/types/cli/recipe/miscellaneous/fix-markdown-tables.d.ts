import type { Dirent } from 'node:fs';

import type MarkdownTable from '../../../../toolkit/markdown-table.js';

/**
 * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Discover Files.
 *
 * @since 0.27.0
 */
export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_RootDirectory = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Returns = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_SkipDirectories = Set<string>;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_MarkdownExtensions = Set<string>;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Queue = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Files = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_CurrentDirectory = string | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Entries = Dirent[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_EntryPath = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Extension = string;

/**
 * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Format Contents.
 *
 * @since 0.27.0
 */
export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OriginalContents = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Returns_Contents = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Returns_TableCount = number;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Returns = {
  contents: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Returns_Contents;
  tableCount: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Returns_TableCount;
};

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Lines = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Tables_Item_Start = number;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Tables_Item_Lines = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Tables_Item = {
  lines: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Tables_Item_Lines;
  start: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Tables_Item_Start;
};

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Tables = Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Tables_Item[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTableStart = number;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTableLines = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OpenFenceMarker = string | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Line = string | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_FenceMarker = string | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_TableCount = number;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTable_Start = number;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTable_Lines = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTable = {
  lines: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTable_Lines;
  start: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTable_Start;
} | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Start = number;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_TableLines = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_HeaderLine = string | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_DelimiterLine = string | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_HeaderTrimmed = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_HeaderIndentation = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Headers = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_DataRows = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Table = MarkdownTable;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Rendered = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_RenderedLines = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_IndentedRenderedLines = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_RenderedTable = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OriginalTable = string;

/**
 * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Get Fence Marker.
 *
 * @since 0.27.0
 */
export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Line = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Returns = string | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Trimmed = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_FenceCharacter = string | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_FenceLength = number;

/**
 * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Is Delimiter Line.
 *
 * @since 0.27.0
 */
export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Line = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Returns = boolean;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Cells = string[];

/**
 * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Parse Cells.
 *
 * @since 0.27.0
 */
export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Row = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Returns = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_WithPlaceholders = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Parts = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_HasTrailingPipe = boolean;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_RawCells = string[];

/**
 * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Run.
 *
 * @since 0.27.0
 */
export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Options_Check = boolean | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Options_DryRun = boolean | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Options = {
  check?: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Options_Check;
  dryRun?: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_ProjectRoot = string | undefined;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_FilePaths = string[];

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_TotalFixed = number;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_OriginalContents = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Formatted_Contents = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Formatted_TableCount = number;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Formatted = {
  contents: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Formatted_Contents;
  tableCount: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Formatted_TableCount;
};

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_RelativePath = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_TableLabel = string;

export type Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_TotalLabel = string;

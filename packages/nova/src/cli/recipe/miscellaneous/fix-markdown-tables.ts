import {
  readdirSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';
import {
  extname,
  join,
  relative,
} from 'node:path';

import { libItemSkipDirectories } from '../../../lib/item.js';
import { Bootstrap, Logger, MarkdownTable } from '../../../toolkit/index.js';

import type {
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_CurrentDirectory,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Entries,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_EntryPath,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Extension,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Files,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_MarkdownExtensions,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Queue,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Returns,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_RootDirectory,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_SkipDirectories,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTable,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTableLines,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTableStart,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_DataRows,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_DelimiterLine,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_FenceMarker,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_HeaderIndentation,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_HeaderLine,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Headers,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_HeaderTrimmed,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_IndentedRenderedLines,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Line,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Lines,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OpenFenceMarker,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OriginalContents,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OriginalTable,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Rendered,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_RenderedLines,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_RenderedTable,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Returns,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Start,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Table,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_TableCount,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_TableLines,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Tables,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_FenceCharacter,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_FenceLength,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Line,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Returns,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Trimmed,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Cells,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Line,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Returns,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_HasTrailingPipe,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Parts,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_RawCells,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Returns,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Row,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_WithPlaceholders,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_FilePaths,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Formatted,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Options,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_OriginalContents,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_ProjectRoot,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_RelativePath,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Returns,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_TableLabel,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_TotalFixed,
  Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_TotalLabel,
} from '../../../types/cli/recipe/miscellaneous/fix-markdown-tables.d.ts';

/**
 * CLI - Recipe - Miscellaneous - Fix Markdown Tables.
 *
 * Formats Markdown and MDX pipe tables from one project-root scan so callers
 * no longer need to maintain copied repository scripts.
 *
 * @since 0.27.0
 */
export class Runner {
  /**
   * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Run.
   *
   * Resolves the nearest project root, reports every table that differs from
   * Nova's renderer, and writes, previews, or checks the result by mode.
   *
   * @param {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Returns}
   *
   * @since 0.27.0
   */
  public static async run(options: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Options): Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Returns {
    if (options['check'] === true && options['dryRun'] === true) {
      Logger.error('The "--check" and "--dry-run" options cannot be used together.');

      process.exitCode = 1;

      return;
    }

    try {
      const projectRoot: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_ProjectRoot = Bootstrap.getProjectRoot();

      if (projectRoot === undefined) {
        Logger.error('No "package.json" file was found. Re-run this command inside a project.');

        process.exitCode = 1;

        return;
      }

      const filePaths: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_FilePaths = Runner.discoverFiles(projectRoot);

      let totalFixed: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_TotalFixed = 0;

      for (const filePath of filePaths) {
        const originalContents: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_OriginalContents = readFileSync(filePath, 'utf-8');
        const formatted: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_Formatted = Runner.formatContents(originalContents);

        if (formatted['tableCount'] === 0) {
          continue;
        }

        totalFixed += formatted['tableCount'];

        const relativePath: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_RelativePath = relative(projectRoot, filePath);
        const tableLabel: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_TableLabel = (formatted['tableCount'] === 1) ? 'table' : 'tables';

        if (options['check'] === true) {
          Logger.warn(`Needs formatting: ${relativePath} (${formatted['tableCount']} ${tableLabel})`);

          continue;
        }

        if (options['dryRun'] === true) {
          Logger.info(`Would fix ${formatted['tableCount']} ${tableLabel} in ${relativePath}`);

          continue;
        }

        writeFileSync(filePath, formatted['contents'], 'utf-8');

        Logger.info(`Fixed ${formatted['tableCount']} ${tableLabel} in ${relativePath}`);
      }

      if (totalFixed === 0) {
        Logger.info('All Markdown tables are already formatted correctly.');

        return;
      }

      const totalLabel: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_Run_TotalLabel = (totalFixed === 1) ? 'table' : 'tables';

      if (options['check'] === true) {
        Logger.error(`${totalFixed} Markdown ${totalLabel} need formatting.`);

        process.exitCode = 1;

        return;
      }

      if (options['dryRun'] === true) {
        Logger.info(`${totalFixed} Markdown ${totalLabel} would be fixed.`);

        return;
      }

      Logger.info([
        '',
        `Fixed ${totalFixed} Markdown ${totalLabel} total.`,
      ].join('\n'));
    } catch (error) {
      Logger.error(`Unable to fix Markdown tables: ${String(error)}`);

      process.exitCode = 1;
    }

    return;
  }

  /**
   * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Discover Files.
   *
   * Walks the resolved project tree for Markdown sources while excluding
   * dependency, generated-output, cache, and agent-state directories.
   *
   * @param {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_RootDirectory} rootDirectory - Root directory.
   *
   * @private
   *
   * @returns {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Returns}
   *
   * @since 0.27.0
   */
  private static discoverFiles(rootDirectory: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_RootDirectory): Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Returns {
    const skipDirectories: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_SkipDirectories = new Set([
      '.agents',
      '.claude',
      '.codex',
      '.docusaurus',
      '.git',
      '.next',
      '.turbo',
      ...libItemSkipDirectories,
    ]);
    const markdownExtensions: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_MarkdownExtensions = new Set([
      '.md',
      '.mdx',
    ]);
    const queue: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Queue = [rootDirectory];
    const files: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Files = [];

    while (queue.length > 0) {
      const currentDirectory: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_CurrentDirectory = queue.pop();

      if (currentDirectory === undefined) {
        continue;
      }

      const entries: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Entries = readdirSync(currentDirectory, {
        withFileTypes: true,
      });

      for (const entry of entries) {
        if (entry.isDirectory() === true && skipDirectories.has(entry.name) === true) {
          continue;
        }

        const entryPath: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_EntryPath = join(currentDirectory, entry.name);

        if (entry.isDirectory() === true) {
          queue.push(entryPath);

          continue;
        }

        const extension: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_DiscoverFiles_Extension = extname(entry.name);

        if (entry.isFile() === true && markdownExtensions.has(extension) === true) {
          files.push(entryPath);
        }
      }
    }

    files.sort();

    return files;
  }

  /**
   * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Format Contents.
   *
   * Locates eligible pipe tables outside fenced code blocks and rebuilds them
   * with Nova's MarkdownTable battery while retaining surrounding text.
   *
   * @param {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OriginalContents} originalContents - Original contents.
   *
   * @private
   *
   * @returns {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Returns}
   *
   * @since 0.27.0
   */
  private static formatContents(originalContents: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OriginalContents): Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Returns {
    const lines: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Lines = originalContents.split('\n');
    const tables: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Tables = [];

    let currentTableStart: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTableStart = -1;
    let currentTableLines: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTableLines = [];
    let openFenceMarker: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OpenFenceMarker = undefined;

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const line: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Line = lines[lineIndex];

      if (line === undefined) {
        continue;
      }

      const fenceMarker: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_FenceMarker = Runner.getFenceMarker(line);

      if (fenceMarker !== undefined) {
        if (openFenceMarker === undefined) {
          openFenceMarker = fenceMarker;

          if (currentTableLines.length >= 3) {
            tables.push({
              lines: currentTableLines,
              start: currentTableStart,
            });
          }

          currentTableStart = -1;
          currentTableLines = [];

          continue;
        }

        if (
          fenceMarker[0] === openFenceMarker[0]
          && fenceMarker.length >= openFenceMarker.length
        ) {
          openFenceMarker = undefined;
        }

        continue;
      }

      if (openFenceMarker !== undefined) {
        continue;
      }

      if (line.trimStart().startsWith('|') === true) {
        if (currentTableLines.length === 0) {
          currentTableStart = lineIndex;
        }

        currentTableLines.push(line);

        continue;
      }

      if (currentTableLines.length >= 3) {
        tables.push({
          lines: currentTableLines,
          start: currentTableStart,
        });
      }

      currentTableStart = -1;
      currentTableLines = [];
    }

    if (currentTableLines.length >= 3) {
      tables.push({
        lines: currentTableLines,
        start: currentTableStart,
      });
    }

    let tableCount: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_TableCount = 0;

    for (let tableIndex = tables.length - 1; tableIndex >= 0; tableIndex -= 1) {
      const currentTable: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_CurrentTable = tables[tableIndex];

      if (currentTable === undefined) {
        continue;
      }

      const start: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Start = currentTable['start'];
      const tableLines: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_TableLines = currentTable['lines'];
      const headerLine: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_HeaderLine = tableLines[0];
      const delimiterLine: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_DelimiterLine = tableLines[1];

      if (
        headerLine === undefined
        || delimiterLine === undefined
        || Runner.isDelimiterLine(delimiterLine) === false
      ) {
        continue;
      }

      const headerTrimmed: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_HeaderTrimmed = headerLine.trimStart();
      const headerIndentation: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_HeaderIndentation = headerLine.slice(0, headerLine.length - headerTrimmed.length);
      const headers: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Headers = Runner.parseCells(headerLine);
      const dataRows: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_DataRows = tableLines.slice(2);

      try {
        const table: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Table = new MarkdownTable(headers);

        for (const dataRow of dataRows) {
          table.addRow(Runner.parseCells(dataRow));
        }

        const rendered: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_Rendered = table.render();
        const renderedLines: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_RenderedLines = rendered.split('\n');
        const indentedRenderedLines: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_IndentedRenderedLines = renderedLines.map((renderedLine) => `${headerIndentation}${renderedLine}`);
        const renderedTable: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_RenderedTable = indentedRenderedLines.join('\n');
        const originalTable: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_FormatContents_OriginalTable = tableLines.map((tableLine) => tableLine.trimEnd()).join('\n');

        if (renderedTable === originalTable) {
          continue;
        }

        lines.splice(start, tableLines.length, ...indentedRenderedLines);
        tableCount += 1;
      } catch {
        continue;
      }
    }

    return {
      contents: lines.join('\n'),
      tableCount,
    };
  }

  /**
   * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Get Fence Marker.
   *
   * Returns a complete backtick or tilde marker for valid three-character
   * fences so nested shorter markers cannot close a longer code block.
   *
   * @param {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Line} line - Line.
   *
   * @private
   *
   * @returns {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Returns}
   *
   * @since 0.27.0
   */
  private static getFenceMarker(line: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Line): Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Returns {
    const trimmed: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_Trimmed = line.trimStart();
    const fenceCharacter: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_FenceCharacter = trimmed[0];

    if (fenceCharacter !== '`' && fenceCharacter !== '~') {
      return undefined;
    }

    let fenceLength: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_GetFenceMarker_FenceLength = 0;

    for (const character of trimmed) {
      if (character !== fenceCharacter) {
        break;
      }

      fenceLength += 1;
    }

    if (fenceLength < 3) {
      return undefined;
    }

    return fenceCharacter.repeat(fenceLength);
  }

  /**
   * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Is Delimiter Line.
   *
   * Accepts only unaligned dash delimiters because MarkdownTable does not
   * represent left, center, or right alignment semantics.
   *
   * @param {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Line} line - Line.
   *
   * @private
   *
   * @returns {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Returns}
   *
   * @since 0.27.0
   */
  private static isDelimiterLine(line: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Line): Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Returns {
    const cells: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_IsDelimiterLine_Cells = Runner.parseCells(line);

    if (cells.length === 0) {
      return false;
    }

    for (const cell of cells) {
      if (cell.length < 3) {
        return false;
      }

      for (const character of cell) {
        if (character !== '-') {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * CLI - Recipe - Miscellaneous - Fix Markdown Tables - Parse Cells.
   *
   * Splits a pipe row without losing escaped pipes or the final cell when a
   * valid Markdown row omits its optional trailing pipe.
   *
   * @param {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Row} row - Row.
   *
   * @private
   *
   * @returns {Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Returns}
   *
   * @since 0.27.0
   */
  private static parseCells(row: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Row): Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Returns {
    const withPlaceholders: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_WithPlaceholders = row.replaceAll('\\|', '\x00');
    const parts: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_Parts = withPlaceholders.split('|');
    const hasTrailingPipe: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_HasTrailingPipe = row.trimEnd().endsWith('|') === true;
    const rawCells: Cli_Recipe_Miscellaneous_FixMarkdownTables_Runner_ParseCells_RawCells = (hasTrailingPipe === true) ? parts.slice(1, -1) : parts.slice(1);

    return rawCells.map((cell) => cell.trim().replaceAll('\x00', '|'));
  }
}

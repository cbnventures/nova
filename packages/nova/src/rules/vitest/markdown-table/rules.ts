import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { it } from 'vitest';

import { discoverContentFiles } from '../../../lib/file-discovery.js';
import { MarkdownTable } from '../../../toolkit/index.js';
import { isEnabled } from '../enable.js';

import type {
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Config,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Content,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_CurrentTable,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_DataRows,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_DelimiterLine,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Enable,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Failures,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_FilePath,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_HeaderLine,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Headers,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_InCodeBlock,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Lines,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_MdFiles,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Original,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells_Segments,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParsedCells,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Rendered,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Returns,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Table,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_TableLines,
  Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Tables,
} from '../../../types/rules/vitest/markdown-table/rules.d.ts';

/**
 * Rules - Vitest - Markdown Table - Rules - Tables Match Markdown Table Output.
 *
 * Rule `tables-match-markdowntable-output`: every pipe-delimited table in the scanned
 * content files must render byte-for-byte identically to the output of the canonical
 * `MarkdownTable` class. Tables inside code fences and tables with alignment markers skip.
 *
 * @param {Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Config} config - Config.
 * @param {Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Returns}
 *
 * @since 0.20.0
 */
export async function tablesMatchMarkdownTableOutput(config: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Config, enable: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Enable): Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Returns {
  if (isEnabled('tables-match-markdowntable-output', enable) === false) {
    return;
  }

  const mdFiles: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_MdFiles = await discoverContentFiles({
    rootDir: config['rootDir'],
    contentDirs: config['contentDirs'],
    fileExtensions: config['fileExtensions'],
  });

  it(`all documentation tables match MarkdownTable output${''}`, async () => {
    /*
     * Replace escaped pipes with a placeholder before splitting,
     * then restore as raw pipes so MarkdownTable can re-escape them.
     */
    const parseCells: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells = (row) => {
      const segments: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParseCells_Segments = row
        .replaceAll('\\|', '\x00')
        .split('|')
        .slice(1, -1);

      return segments.map((cell) => cell.trim().replaceAll('\x00', '|'));
    };

    const failures: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Failures = [];

    for (const mdFile of mdFiles) {
      const filePath: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_FilePath = join(config['rootDir'], mdFile);
      const content: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Content = await readFile(filePath, 'utf-8');
      const lines: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Lines = content.split('\n');
      const tables: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Tables = [];

      let currentTable: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_CurrentTable = [];
      let inCodeBlock: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_InCodeBlock = false;

      for (const line of lines) {
        if (line.trimStart().startsWith('```') === true) {
          inCodeBlock = !inCodeBlock;

          if (currentTable.length >= 3) {
            tables.push(currentTable);
          }

          currentTable = [];

          continue;
        }

        if (inCodeBlock === true) {
          continue;
        }

        if (line.trimStart().startsWith('|') === true) {
          currentTable.push(line);
        } else {
          if (currentTable.length >= 3) {
            tables.push(currentTable);
          }

          currentTable = [];
        }
      }

      if (currentTable.length >= 3) {
        tables.push(currentTable);
      }

      for (let i = 0; i < tables.length; i += 1) {
        const tableLines: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_TableLines = tables[i];

        if (tableLines === undefined) {
          continue;
        }

        const headerLine: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_HeaderLine = tableLines[0];
        const delimiterLine: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_DelimiterLine = tableLines[1];

        if (headerLine === undefined || delimiterLine === undefined) {
          continue;
        }

        // Skip tables with alignment markers.
        if (delimiterLine.includes(':') === true) {
          continue;
        }

        const headers: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Headers = parseCells(headerLine);
        const dataRows: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_DataRows = tableLines.slice(2);

        try {
          const table: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Table = new MarkdownTable(headers);

          for (const row of dataRows) {
            const parsedCells: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_ParsedCells = parseCells(row);

            table.addRow(parsedCells);
          }

          const rendered: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Rendered = table.render();
          const original: Rules_Vitest_MarkdownTable_Rules_TablesMatchMarkdownTableOutput_Original = tableLines.map((tableLine) => tableLine.trimEnd()).join('\n');

          if (rendered !== original) {
            failures.push(`${mdFile} (table ${i + 1})`);
          }
        } catch (error) {
          failures.push(`${mdFile} (table ${i + 1}): ${String(error)}`);
        }
      }
    }

    strictEqual(failures.length, 0, [
      '',
      'Tables with formatting issues:',
      failures.join('\n'),
    ].join('\n'));

    return;
  });

  return;
}

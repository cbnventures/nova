import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

import { MarkdownTable } from '@cbnventures/nova/toolkit';
import { describe, it } from 'vitest';

import type {
  Tests_MarkdownTable_MarkdownTableValidation_Content,
  Tests_MarkdownTable_MarkdownTableValidation_ContentDirs,
  Tests_MarkdownTable_MarkdownTableValidation_ContentPath,
  Tests_MarkdownTable_MarkdownTableValidation_CurrentTable,
  Tests_MarkdownTable_MarkdownTableValidation_Cwd,
  Tests_MarkdownTable_MarkdownTableValidation_DataRows,
  Tests_MarkdownTable_MarkdownTableValidation_DelimiterLine,
  Tests_MarkdownTable_MarkdownTableValidation_Entries,
  Tests_MarkdownTable_MarkdownTableValidation_Ext,
  Tests_MarkdownTable_MarkdownTableValidation_Failures,
  Tests_MarkdownTable_MarkdownTableValidation_FilePath,
  Tests_MarkdownTable_MarkdownTableValidation_HeaderLine,
  Tests_MarkdownTable_MarkdownTableValidation_Headers,
  Tests_MarkdownTable_MarkdownTableValidation_InCodeBlock,
  Tests_MarkdownTable_MarkdownTableValidation_Lines,
  Tests_MarkdownTable_MarkdownTableValidation_MdFiles,
  Tests_MarkdownTable_MarkdownTableValidation_Original,
  Tests_MarkdownTable_MarkdownTableValidation_ParseCells,
  Tests_MarkdownTable_MarkdownTableValidation_ParsedCells,
  Tests_MarkdownTable_MarkdownTableValidation_Rendered,
  Tests_MarkdownTable_MarkdownTableValidation_Table,
  Tests_MarkdownTable_MarkdownTableValidation_TableLines,
  Tests_MarkdownTable_MarkdownTableValidation_Tables,
} from '@site/src/types/tests/markdown-table.test.d.ts';

/**
 * Tests - Markdown Table - MarkdownTable Validation.
 *
 * @since 0.14.0
 */
describe('MarkdownTable validation', async () => {
  it('all documentation tables match MarkdownTable output', async () => {
    const cwd: Tests_MarkdownTable_MarkdownTableValidation_Cwd = process.cwd();
    const contentDirs: Tests_MarkdownTable_MarkdownTableValidation_ContentDirs = [
      'docs',
      'blog',
    ];
    const mdFiles: Tests_MarkdownTable_MarkdownTableValidation_MdFiles = [];

    for (const contentDir of contentDirs) {
      const contentPath: Tests_MarkdownTable_MarkdownTableValidation_ContentPath = resolve(cwd, contentDir);
      const entries: Tests_MarkdownTable_MarkdownTableValidation_Entries = await readdir(contentPath, { recursive: true });

      for (const entry of entries) {
        const ext: Tests_MarkdownTable_MarkdownTableValidation_Ext = extname(entry);

        if (ext === '.md' || ext === '.mdx') {
          mdFiles.push(join(contentDir, entry));
        }
      }
    }

    /*
     * Replace escaped pipes with a placeholder before splitting,
     * then restore as raw pipes so MarkdownTable can re-escape them.
     */
    const parseCells: Tests_MarkdownTable_MarkdownTableValidation_ParseCells = (row) => {
      return row
        .replaceAll('\\|', '\x00')
        .split('|')
        .slice(1, -1)
        .map((cell) => cell.trim().replaceAll('\x00', '|'));
    };

    const failures: Tests_MarkdownTable_MarkdownTableValidation_Failures = [];

    for (const mdFile of mdFiles) {
      const filePath: Tests_MarkdownTable_MarkdownTableValidation_FilePath = join(cwd, mdFile);
      const content: Tests_MarkdownTable_MarkdownTableValidation_Content = await readFile(filePath, 'utf-8');
      const lines: Tests_MarkdownTable_MarkdownTableValidation_Lines = content.split('\n');
      const tables: Tests_MarkdownTable_MarkdownTableValidation_Tables = [];

      let currentTable: Tests_MarkdownTable_MarkdownTableValidation_CurrentTable = [];
      let inCodeBlock: Tests_MarkdownTable_MarkdownTableValidation_InCodeBlock = false;

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
        const tableLines: Tests_MarkdownTable_MarkdownTableValidation_TableLines = tables[i];

        if (tableLines === undefined) {
          continue;
        }

        const headerLine: Tests_MarkdownTable_MarkdownTableValidation_HeaderLine = tableLines[0];
        const delimiterLine: Tests_MarkdownTable_MarkdownTableValidation_DelimiterLine = tableLines[1];

        if (headerLine === undefined || delimiterLine === undefined) {
          continue;
        }

        // Skip tables with alignment markers.
        if (delimiterLine.includes(':') === true) {
          continue;
        }

        const headers: Tests_MarkdownTable_MarkdownTableValidation_Headers = parseCells(headerLine);
        const dataRows: Tests_MarkdownTable_MarkdownTableValidation_DataRows = tableLines.slice(2);

        try {
          const table: Tests_MarkdownTable_MarkdownTableValidation_Table = new MarkdownTable(headers);

          for (const row of dataRows) {
            const parsedCells: Tests_MarkdownTable_MarkdownTableValidation_ParsedCells = parseCells(row);

            table.addRow(parsedCells);
          }

          const rendered: Tests_MarkdownTable_MarkdownTableValidation_Rendered = table.render();
          const original: Tests_MarkdownTable_MarkdownTableValidation_Original = tableLines.map((tableLine) => tableLine.trimEnd()).join('\n');

          if (rendered !== original) {
            failures.push(`${mdFile} (table ${i + 1})`);
          }
        } catch (error) {
          failures.push(`${mdFile} (table ${i + 1}): ${String(error)}`);
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nTables with formatting issues:\n${failures.join('\n')}`,
    );

    return;
  });

  return;
});

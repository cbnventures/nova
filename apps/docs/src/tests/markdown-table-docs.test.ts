import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { test } from 'node:test';

import { MarkdownTable } from '@cbnventures/nova/toolkit';

import type {
  MarkdownTableDocsTestCurrentTable,
  MarkdownTableDocsTestFailures,
  MarkdownTableDocsTestTables,
} from '@/types/tests/markdown-table-docs.test.d.ts';

/**
 * Markdown table docs validation.
 *
 * @since 1.0.0
 */
test('MarkdownTable docs validation', async (context) => {
  await context.test('all documentation tables match MarkdownTable output', async () => {
    const docsDir = resolve(process.cwd(), 'docs');
    const entries = await readdir(docsDir, { recursive: true });
    const mdFiles = entries.filter((entry) => {
      const ext = extname(entry);

      return ext === '.md' || ext === '.mdx';
    });

    // Replace escaped pipes with a placeholder before splitting,
    // then restore as raw pipes so MarkdownTable can re-escape them.
    const parseCells = (row: string) => row
      .replaceAll('\\|', '\x00')
      .split('|')
      .slice(1, -1)
      .map((cell) => cell.trim().replaceAll('\x00', '|'));

    const failures: MarkdownTableDocsTestFailures = [];

    for (const relativePath of mdFiles) {
      const filePath = join(docsDir, relativePath);
      const content = await readFile(filePath, 'utf-8');
      const lines = content.split('\n');
      const tables: MarkdownTableDocsTestTables = [];

      let currentTable: MarkdownTableDocsTestCurrentTable = [];
      let inCodeBlock = false;

      for (const line of lines) {
        if (line.trimStart().startsWith('```')) {
          inCodeBlock = !inCodeBlock;

          if (currentTable.length >= 3) {
            tables.push(currentTable);
          }

          currentTable = [];

          continue;
        }

        if (inCodeBlock) {
          continue;
        }

        if (line.trimStart().startsWith('|')) {
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
        const tableLines = tables[i];

        if (tableLines === undefined) {
          continue;
        }

        const headerLine = tableLines[0];
        const delimiterLine = tableLines[1];

        if (headerLine === undefined || delimiterLine === undefined) {
          continue;
        }

        // Skip tables with alignment markers.
        if (delimiterLine.includes(':')) {
          continue;
        }

        const headers = parseCells(headerLine);
        const dataRows = tableLines.slice(2);

        try {
          const table = new MarkdownTable(headers);

          for (const row of dataRows) {
            table.addRow(parseCells(row));
          }

          const rendered = table.render();
          const original = tableLines.map((tableLine) => tableLine.trimEnd()).join('\n');

          if (rendered !== original) {
            failures.push(`${relativePath} (table ${i + 1})`);
          }
        } catch (error) {
          failures.push(`${relativePath} (table ${i + 1}): ${String(error)}`);
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nTables with formatting issues:\n${failures.join('\n')}`,
    );
  });
});

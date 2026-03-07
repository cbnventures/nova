import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { test } from 'node:test';

import {
  PATTERN_CODE_BLOCK,
  PATTERN_EXPORT_DOT_SLASH,
  PATTERN_IMPORT_SPECIFIER,
  PATTERN_WILDCARD_SUFFIX,
} from '@/lib/regex.js';

import type {
  ImportDocsTestFailures,
  ImportDocsTestValidSpecifiers,
} from '@/types/tests/import-docs.test.d.ts';

/**
 * Import docs validation.
 *
 * @since 1.0.0
 */
test('Import docs validation', async (context) => {
  await context.test('all code block import paths match package.json exports', async () => {
    const docsDir = resolve(process.cwd(), 'docs');
    const novaPackagePath = resolve(process.cwd(), '..', '..', 'packages', 'nova', 'package.json');
    const novaPackage = JSON.parse(await readFile(novaPackagePath, 'utf-8'));
    const exportKeys = Object.keys(novaPackage.exports);

    // Build set of valid import specifiers.
    const validSpecifiers: ImportDocsTestValidSpecifiers = new Set();

    for (const key of exportKeys) {
      // Convert "./rules/eslint" to "@cbnventures/nova/rules/eslint".
      const specifier = key.replace(new RegExp(PATTERN_EXPORT_DOT_SLASH), '@cbnventures/nova/');

      // Handle wildcard patterns.
      if (specifier.includes('*')) {
        validSpecifiers.add(specifier);
      } else {
        validSpecifiers.add(specifier);
      }
    }

    // Also add the bare package specifier for root exports.
    if (novaPackage.exports['.']) {
      validSpecifiers.add('@cbnventures/nova');
    }

    const entries = await readdir(docsDir, { recursive: true });
    const mdFiles = entries.filter((entry) => {
      const ext = extname(entry);

      return ext === '.md' || ext === '.mdx';
    });

    const failures: ImportDocsTestFailures = [];

    for (const relativePath of mdFiles) {
      const filePath = join(docsDir, relativePath);
      const content = await readFile(filePath, 'utf-8');

      // Extract code blocks.
      for (const blockMatch of content.matchAll(new RegExp(PATTERN_CODE_BLOCK, 'g'))) {
        const codeBlock = blockMatch[1] ?? '';

        for (const importMatch of codeBlock.matchAll(new RegExp(PATTERN_IMPORT_SPECIFIER, 'g'))) {
          const specifier = importMatch[1] ?? '';

          // Check exact match first.
          if (validSpecifiers.has(specifier)) {
            continue;
          }

          // Check wildcard patterns.
          let matchesWildcard = false;

          for (const pattern of validSpecifiers) {
            if (pattern.includes('*')) {
              const prefix = pattern.replace(new RegExp(PATTERN_WILDCARD_SUFFIX), '');

              if (specifier.startsWith(prefix)) {
                matchesWildcard = true;

                break;
              }
            }
          }

          if (!matchesWildcard) {
            failures.push(`${relativePath}: import "${specifier}" not found in package.json exports`);
          }
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nInvalid import paths:\n${failures.join('\n')}`,
    );
  });
});

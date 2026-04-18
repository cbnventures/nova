import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

import { describe, it } from 'vitest';

import {
  PATTERN_CODE_BLOCK,
  PATTERN_EXPORT_DOT_SLASH,
  PATTERN_IMPORT_SPECIFIER,
  PATTERN_WILDCARD_SUFFIX,
} from '@site/src/lib/regex.js';

import type {
  TestsImportImportValidationCodeBlock,
  TestsImportImportValidationContent,
  TestsImportImportValidationContentDirs,
  TestsImportImportValidationContentPath,
  TestsImportImportValidationCwd,
  TestsImportImportValidationEntries,
  TestsImportImportValidationExportKeys,
  TestsImportImportValidationExports,
  TestsImportImportValidationExt,
  TestsImportImportValidationFailures,
  TestsImportImportValidationFilePath,
  TestsImportImportValidationMatchesWildcard,
  TestsImportImportValidationMdFiles,
  TestsImportImportValidationNovaPackage,
  TestsImportImportValidationNovaPackagePath,
  TestsImportImportValidationNovaPackageRaw,
  TestsImportImportValidationPrefix,
  TestsImportImportValidationSpecifier,
  TestsImportImportValidationValidSpecifiers,
} from '@site/src/types/tests/import.test.d.ts';

/**
 * Tests - Import - Import Validation.
 *
 * @since 0.14.0
 */
describe('Import validation', async () => {
  it('all code block import paths match package.json exports', async () => {
    const cwd: TestsImportImportValidationCwd = process.cwd();
    const contentDirs: TestsImportImportValidationContentDirs = [
      'docs',
      'blog',
    ];
    const novaPackagePath: TestsImportImportValidationNovaPackagePath = resolve(cwd, '..', '..', 'packages', 'nova', 'package.json');
    const novaPackageRaw: TestsImportImportValidationNovaPackageRaw = await readFile(novaPackagePath, 'utf-8');
    const novaPackage: TestsImportImportValidationNovaPackage = JSON.parse(novaPackageRaw);
    const exports: TestsImportImportValidationExports = novaPackage['exports'] as TestsImportImportValidationExports;
    const exportKeys: TestsImportImportValidationExportKeys = Object.keys(exports);

    // Build set of valid import specifiers.
    const validSpecifiers: TestsImportImportValidationValidSpecifiers = new Set();

    for (const exportKey of exportKeys) {
      // Convert "./rules/eslint" to "@cbnventures/nova/rules/eslint".
      const specifier: TestsImportImportValidationSpecifier = exportKey.replace(new RegExp(PATTERN_EXPORT_DOT_SLASH), '@cbnventures/nova/');

      // Handle wildcard patterns.
      if (specifier.includes('*') === true) {
        validSpecifiers.add(specifier);
      } else {
        validSpecifiers.add(specifier);
      }
    }

    // Also add the bare package specifier for root exports.
    if (exports['.'] !== undefined) {
      validSpecifiers.add('@cbnventures/nova');
    }

    const mdFiles: TestsImportImportValidationMdFiles = [];

    for (const contentDir of contentDirs) {
      const contentPath: TestsImportImportValidationContentPath = resolve(cwd, contentDir);
      const entries: TestsImportImportValidationEntries = await readdir(contentPath, { recursive: true });

      for (const entry of entries) {
        const ext: TestsImportImportValidationExt = extname(entry);

        if (ext === '.md' || ext === '.mdx') {
          mdFiles.push(join(contentDir, entry));
        }
      }
    }

    const failures: TestsImportImportValidationFailures = [];

    for (const mdFile of mdFiles) {
      const filePath: TestsImportImportValidationFilePath = join(cwd, mdFile);
      const content: TestsImportImportValidationContent = await readFile(filePath, 'utf-8');

      // Extract code blocks.
      for (const blockMatch of content.matchAll(new RegExp(PATTERN_CODE_BLOCK, 'g'))) {
        const codeBlock: TestsImportImportValidationCodeBlock = blockMatch[1] ?? '';

        for (const importMatch of codeBlock.matchAll(new RegExp(PATTERN_IMPORT_SPECIFIER, 'g'))) {
          const specifier: TestsImportImportValidationSpecifier = importMatch[1] ?? '';

          // Check exact match first.
          if (validSpecifiers.has(specifier) === true) {
            continue;
          }

          // Check wildcard patterns.
          let matchesWildcard: TestsImportImportValidationMatchesWildcard = false;

          for (const pattern of validSpecifiers) {
            if (pattern.includes('*') === true) {
              const prefix: TestsImportImportValidationPrefix = pattern.replace(new RegExp(PATTERN_WILDCARD_SUFFIX), '');

              if (specifier.startsWith(prefix) === true) {
                matchesWildcard = true;

                break;
              }
            }
          }

          if (matchesWildcard === false) {
            failures.push(`${mdFile}: import "${specifier}" not found in package.json exports`);
          }
        }
      }
    }

    strictEqual(
      failures.length,
      0,
      `\nInvalid import paths:\n${failures.join('\n')}`,
    );

    return;
  });

  return;
});

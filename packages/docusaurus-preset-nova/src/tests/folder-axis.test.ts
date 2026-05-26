import { strictEqual } from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import {
  LIB_REGEX_BLOCKS_INDEX_EXPORT,
  LIB_REGEX_KEBAB_CASE,
  LIB_REGEX_PASCAL_CASE,
} from '../lib/regex.js';

import type {
  TestsFolderAxisFolderAxisBlockDirs,
  TestsFolderAxisFolderAxisBlockDirSet,
  TestsFolderAxisFolderAxisCasingMessage,
  TestsFolderAxisFolderAxisCasingViolations,
  TestsFolderAxisFolderAxisExportedFolders,
  TestsFolderAxisFolderAxisMissingExports,
  TestsFolderAxisFolderAxisMissingExportsMessage,
  TestsFolderAxisFolderAxisStaleExports,
  TestsFolderAxisFolderAxisStaleExportsMessage,
  TestsFolderAxisFolderAxisThemeDirs,
  TestsFolderAxisGetPackageRootCurrentFileDirectory,
  TestsFolderAxisGetPackageRootCurrentFilePath,
  TestsFolderAxisGetPackageRootReturns,
  TestsFolderAxisListBlockDirectoriesBlocksRoot,
  TestsFolderAxisListBlockDirectoriesEntries,
  TestsFolderAxisListBlockDirectoriesReturns,
  TestsFolderAxisListThemeDirectoriesEntries,
  TestsFolderAxisListThemeDirectoriesReturns,
  TestsFolderAxisListThemeDirectoriesThemeRoot,
  TestsFolderAxisReadBlocksIndexExportsCapturedFolder,
  TestsFolderAxisReadBlocksIndexExportsContent,
  TestsFolderAxisReadBlocksIndexExportsFolders,
  TestsFolderAxisReadBlocksIndexExportsIndexPath,
  TestsFolderAxisReadBlocksIndexExportsLine,
  TestsFolderAxisReadBlocksIndexExportsLines,
  TestsFolderAxisReadBlocksIndexExportsMatch,
  TestsFolderAxisReadBlocksIndexExportsReturns,
} from '../types/tests/folder-axis.test.d.ts';

/**
 * Tests - Folder Axis - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @since 0.18.0
 */
function getPackageRoot(): TestsFolderAxisGetPackageRootReturns {
  const currentFilePath: TestsFolderAxisGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsFolderAxisGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Folder Axis - List Block Directories.
 *
 * Returns the direct subfolder names of `src/blocks/` so the
 * kebab-case + index.ts re-export integrity checks can iterate.
 *
 * @since 0.18.0
 */
function listBlockDirectories(): TestsFolderAxisListBlockDirectoriesReturns {
  const blocksRoot: TestsFolderAxisListBlockDirectoriesBlocksRoot = resolve(getPackageRoot(), 'src', 'blocks');
  const entries: TestsFolderAxisListBlockDirectoriesEntries = readdirSync(blocksRoot, { withFileTypes: true });

  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry['name']).sort();
}

/**
 * Tests - Folder Axis - List Theme Directories.
 *
 * Returns the direct subfolder names of `src/theme/` so the
 * PascalCase casing check can iterate.
 *
 * @since 0.18.0
 */
function listThemeDirectories(): TestsFolderAxisListThemeDirectoriesReturns {
  const themeRoot: TestsFolderAxisListThemeDirectoriesThemeRoot = resolve(getPackageRoot(), 'src', 'theme');
  const entries: TestsFolderAxisListThemeDirectoriesEntries = readdirSync(themeRoot, { withFileTypes: true });

  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry['name']).sort();
}

/**
 * Tests - Folder Axis - Read Blocks Index Exports.
 *
 * Parses `src/blocks/index.ts` line-by-line and returns the
 * set of kebab-case folder names referenced in each
 * `export { default as X } from './y/index.js';` statement.
 *
 * @since 0.18.0
 */
function readBlocksIndexExports(): TestsFolderAxisReadBlocksIndexExportsReturns {
  const indexPath: TestsFolderAxisReadBlocksIndexExportsIndexPath = resolve(getPackageRoot(), 'src', 'blocks', 'index.ts');
  const content: TestsFolderAxisReadBlocksIndexExportsContent = readFileSync(indexPath, 'utf-8');
  const lines: TestsFolderAxisReadBlocksIndexExportsLines = content.split('\n');
  const folders: TestsFolderAxisReadBlocksIndexExportsFolders = new Set<string>();

  for (const rawLine of lines) {
    const line: TestsFolderAxisReadBlocksIndexExportsLine = rawLine;
    const match: TestsFolderAxisReadBlocksIndexExportsMatch = line.match(LIB_REGEX_BLOCKS_INDEX_EXPORT);

    if (match !== null) {
      const capturedFolder: TestsFolderAxisReadBlocksIndexExportsCapturedFolder = match[2] as TestsFolderAxisReadBlocksIndexExportsCapturedFolder;

      folders.add(capturedFolder);
    }
  }

  return folders;
}

/**
 * Tests - Folder Axis - Folder Axis.
 *
 * Enforces the theme/blocks structural contract that
 * distinguishes Docusaurus swizzle targets from Nova-owned
 * direct-import surfaces:
 *
 *   1. Every `src/theme/<X>` uses PascalCase. The PascalCase
 *      contract mirrors Docusaurus's `@theme/X` naming
 *      convention and signals to contributors that the
 *      folder houses a swizzle target.
 *   2. Every `src/blocks/<x>` uses kebab-case. The kebab-case
 *      contract signals that the folder houses a Nova-owned
 *      direct-import block consumed via the `./blocks`
 *      subpath export.
 *   3. Every block directory must be re-exported from
 *      `src/blocks/index.ts` (the public-API barrel) so a
 *      newly added block is reachable by consumers.
 *   4. Every export in `src/blocks/index.ts` must correspond
 *      to a directory on disk so the barrel cannot drift
 *      from the filesystem state.
 *
 * Catches the drift mode where a new component is added to
 * the wrong folder, or where the public-API barrel desyncs
 * from the block directory listing.
 *
 * @since 0.18.0
 */
describe('folder axis', () => {
  it('every theme/ directory uses PascalCase', () => {
    const themeDirs: TestsFolderAxisFolderAxisThemeDirs = listThemeDirectories();
    const violations: TestsFolderAxisFolderAxisCasingViolations = themeDirs.filter((name) => LIB_REGEX_PASCAL_CASE.test(name) === false);
    const message: TestsFolderAxisFolderAxisCasingMessage = [
      `theme/ has ${violations.length} non-PascalCase subfolders (theme components must use PascalCase to match @theme/X):`,
      ...violations.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every blocks/ directory uses kebab-case', () => {
    const blockDirs: TestsFolderAxisFolderAxisBlockDirs = listBlockDirectories();
    const violations: TestsFolderAxisFolderAxisCasingViolations = blockDirs.filter((name) => LIB_REGEX_KEBAB_CASE.test(name) === false);
    const message: TestsFolderAxisFolderAxisCasingMessage = [
      `blocks/ has ${violations.length} non-kebab-case subfolders (Nova blocks must use kebab-case to signal direct-import surfaces):`,
      ...violations.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every blocks/ directory is re-exported from index.ts', () => {
    const blockDirs: TestsFolderAxisFolderAxisBlockDirs = listBlockDirectories();
    const exported: TestsFolderAxisFolderAxisExportedFolders = readBlocksIndexExports();
    const missing: TestsFolderAxisFolderAxisMissingExports = blockDirs.filter((name) => exported.has(name) === false);
    const message: TestsFolderAxisFolderAxisMissingExportsMessage = [
      `blocks/ has ${missing.length} directories not re-exported from index.ts (consumers cannot reach them via the ./blocks subpath):`,
      ...missing.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(missing.length, 0, message);

    return;
  });

  it('every blocks/index.ts export points to an existing directory', () => {
    const blockDirs: TestsFolderAxisFolderAxisBlockDirs = listBlockDirectories();
    const exported: TestsFolderAxisFolderAxisExportedFolders = readBlocksIndexExports();
    const blockDirSet: TestsFolderAxisFolderAxisBlockDirSet = new Set(blockDirs);
    const stale: TestsFolderAxisFolderAxisStaleExports = Array.from(exported).filter((name) => blockDirSet.has(name) === false);
    const message: TestsFolderAxisFolderAxisStaleExportsMessage = [
      `blocks/index.ts has ${stale.length} exports without matching directories (barrel is stale):`,
      ...stale.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(stale.length, 0, message);

    return;
  });

  return;
});

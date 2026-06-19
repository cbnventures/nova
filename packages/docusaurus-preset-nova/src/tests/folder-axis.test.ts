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
  Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_BlockDirs,
  Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_Exported,
  Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_Message,
  Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_Missing,
  Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryUsesKebabCase_BlockDirs,
  Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryUsesKebabCase_Message,
  Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryUsesKebabCase_Violations,
  Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_BlockDirs,
  Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_BlockDirSet,
  Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_Exported,
  Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_Message,
  Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_Stale,
  Tests_FolderAxis_FolderAxis_EveryThemeDirectoryUsesPascalCase_Message,
  Tests_FolderAxis_FolderAxis_EveryThemeDirectoryUsesPascalCase_ThemeDirs,
  Tests_FolderAxis_FolderAxis_EveryThemeDirectoryUsesPascalCase_Violations,
  Tests_FolderAxis_GetPackageRoot_CurrentFileDirectory,
  Tests_FolderAxis_GetPackageRoot_CurrentFilePath,
  Tests_FolderAxis_GetPackageRoot_Returns,
  Tests_FolderAxis_ListBlockDirectories_BlocksRoot,
  Tests_FolderAxis_ListBlockDirectories_Entries,
  Tests_FolderAxis_ListBlockDirectories_Returns,
  Tests_FolderAxis_ListThemeDirectories_Entries,
  Tests_FolderAxis_ListThemeDirectories_Returns,
  Tests_FolderAxis_ListThemeDirectories_ThemeRoot,
  Tests_FolderAxis_ReadBlocksIndexExports_CapturedFolder,
  Tests_FolderAxis_ReadBlocksIndexExports_Content,
  Tests_FolderAxis_ReadBlocksIndexExports_Folders,
  Tests_FolderAxis_ReadBlocksIndexExports_IndexPath,
  Tests_FolderAxis_ReadBlocksIndexExports_Line,
  Tests_FolderAxis_ReadBlocksIndexExports_Lines,
  Tests_FolderAxis_ReadBlocksIndexExports_Match,
  Tests_FolderAxis_ReadBlocksIndexExports_Returns,
} from '../types/tests/folder-axis.test.d.ts';

/**
 * Tests - Folder Axis - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @since 0.18.0
 */
function getPackageRoot(): Tests_FolderAxis_GetPackageRoot_Returns {
  const currentFilePath: Tests_FolderAxis_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_FolderAxis_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

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
function listBlockDirectories(): Tests_FolderAxis_ListBlockDirectories_Returns {
  const blocksRoot: Tests_FolderAxis_ListBlockDirectories_BlocksRoot = resolve(getPackageRoot(), 'src', 'blocks');
  const entries: Tests_FolderAxis_ListBlockDirectories_Entries = readdirSync(blocksRoot, { withFileTypes: true });

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
function listThemeDirectories(): Tests_FolderAxis_ListThemeDirectories_Returns {
  const themeRoot: Tests_FolderAxis_ListThemeDirectories_ThemeRoot = resolve(getPackageRoot(), 'src', 'theme');
  const entries: Tests_FolderAxis_ListThemeDirectories_Entries = readdirSync(themeRoot, { withFileTypes: true });

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
function readBlocksIndexExports(): Tests_FolderAxis_ReadBlocksIndexExports_Returns {
  const indexPath: Tests_FolderAxis_ReadBlocksIndexExports_IndexPath = resolve(getPackageRoot(), 'src', 'blocks', 'index.ts');
  const content: Tests_FolderAxis_ReadBlocksIndexExports_Content = readFileSync(indexPath, 'utf-8');
  const lines: Tests_FolderAxis_ReadBlocksIndexExports_Lines = content.split('\n');
  const folders: Tests_FolderAxis_ReadBlocksIndexExports_Folders = new Set<string>();

  for (const rawLine of lines) {
    const line: Tests_FolderAxis_ReadBlocksIndexExports_Line = rawLine;
    const match: Tests_FolderAxis_ReadBlocksIndexExports_Match = line.match(LIB_REGEX_BLOCKS_INDEX_EXPORT);

    if (match !== null) {
      const capturedFolder: Tests_FolderAxis_ReadBlocksIndexExports_CapturedFolder = match[2] as Tests_FolderAxis_ReadBlocksIndexExports_CapturedFolder;

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
    const themeDirs: Tests_FolderAxis_FolderAxis_EveryThemeDirectoryUsesPascalCase_ThemeDirs = listThemeDirectories();
    const violations: Tests_FolderAxis_FolderAxis_EveryThemeDirectoryUsesPascalCase_Violations = themeDirs.filter((name) => LIB_REGEX_PASCAL_CASE.test(name) === false);
    const message: Tests_FolderAxis_FolderAxis_EveryThemeDirectoryUsesPascalCase_Message = [
      `theme/ has ${violations.length} non-PascalCase subfolders (theme components must use PascalCase to match @theme/X):`,
      ...violations.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every blocks/ directory uses kebab-case', () => {
    const blockDirs: Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryUsesKebabCase_BlockDirs = listBlockDirectories();
    const violations: Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryUsesKebabCase_Violations = blockDirs.filter((name) => LIB_REGEX_KEBAB_CASE.test(name) === false);
    const message: Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryUsesKebabCase_Message = [
      `blocks/ has ${violations.length} non-kebab-case subfolders (Nova blocks must use kebab-case to signal direct-import surfaces):`,
      ...violations.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(violations.length, 0, message);

    return;
  });

  it('every blocks/ directory is re-exported from index.ts', () => {
    const blockDirs: Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_BlockDirs = listBlockDirectories();
    const exported: Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_Exported = readBlocksIndexExports();
    const missing: Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_Missing = blockDirs.filter((name) => exported.has(name) === false);
    const message: Tests_FolderAxis_FolderAxis_EveryBlocksDirectoryIsReExportedFromIndexTs_Message = [
      `blocks/ has ${missing.length} directories not re-exported from index.ts (consumers cannot reach them via the ./blocks subpath):`,
      ...missing.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(missing.length, 0, message);

    return;
  });

  it('every blocks/index.ts export points to an existing directory', () => {
    const blockDirs: Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_BlockDirs = listBlockDirectories();
    const exported: Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_Exported = readBlocksIndexExports();
    const blockDirSet: Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_BlockDirSet = new Set(blockDirs);
    const stale: Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_Stale = Array.from(exported).filter((name) => blockDirSet.has(name) === false);
    const message: Tests_FolderAxis_FolderAxis_EveryBlocksIndexTsExportPointsToAnExistingDirectory_Message = [
      `blocks/index.ts has ${stale.length} exports without matching directories (barrel is stale):`,
      ...stale.map((entry) => `  - ${entry}`),
    ].join('\n');

    strictEqual(stale.length, 0, message);

    return;
  });

  return;
});

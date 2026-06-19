import { strictEqual } from 'node:assert/strict';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import { describe, it } from 'vitest';

import { presetsIndexNames } from '../presets/index.js';

import type {
  Tests_OverlayCompleteness_GetPackageRoot_CurrentFileDirectory,
  Tests_OverlayCompleteness_GetPackageRoot_CurrentFilePath,
  Tests_OverlayCompleteness_GetPackageRoot_Returns,
  Tests_OverlayCompleteness_ListSharedThemeFiles_Returns,
  Tests_OverlayCompleteness_ListSharedThemeFiles_ThemeDirectory,
  Tests_OverlayCompleteness_OverlayCompleteness_Message,
  Tests_OverlayCompleteness_OverlayCompleteness_Missing,
  Tests_OverlayCompleteness_OverlayCompleteness_PresetFiles,
  Tests_OverlayCompleteness_OverlayCompleteness_PresetFilesSet,
  Tests_OverlayCompleteness_OverlayCompleteness_PresetName,
  Tests_OverlayCompleteness_OverlayCompleteness_PresetThemeDir,
  Tests_OverlayCompleteness_OverlayCompleteness_SharedFiles,
} from '../types/tests/overlay-completeness.test.d.ts';

/**
 * Tests - Overlay Completeness - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @since 0.18.0
 */
function getPackageRoot(): Tests_OverlayCompleteness_GetPackageRoot_Returns {
  const currentFilePath: Tests_OverlayCompleteness_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_OverlayCompleteness_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Overlay Completeness - List Shared Theme Files.
 *
 * Globs every `style.css` under `src/styles/theme/` and
 * returns the paths relative to the theme directory so the
 * comparison against each preset's overlay tree can use a
 * simple set membership test.
 *
 * @since 0.18.0
 */
async function listSharedThemeFiles(): Tests_OverlayCompleteness_ListSharedThemeFiles_Returns {
  const themeDirectory: Tests_OverlayCompleteness_ListSharedThemeFiles_ThemeDirectory = resolve(getPackageRoot(), 'src', 'styles', 'theme');

  return glob('**/style.css', { cwd: themeDirectory });
}

/**
 * Tests - Overlay Completeness - Overlay Completeness.
 *
 * For every preset, asserts the preset's `theme/` overlay
 * tree contains a file at every path that exists under the
 * shared `src/styles/theme/` tree. The reverse direction is
 * intentionally NOT checked - preset-specific overlays with
 * no shared base are legitimate and must continue to work.
 *
 * Catches the drift mode where a contributor copies the
 * sample preset, adds a new shared theme component later,
 * and forgets to scaffold an overlay file in one or more
 * existing presets - leaving those presets with the Nova
 * default rendering on that component instead of carrying
 * preset identity.
 *
 * @since 0.18.0
 */
describe('overlay completeness', () => {
  for (const presetNameEntry of presetsIndexNames) {
    const presetName: Tests_OverlayCompleteness_OverlayCompleteness_PresetName = presetNameEntry;

    it(`'${presetName}' preset has an overlay for every shared theme component`, async () => {
      const sharedFiles: Tests_OverlayCompleteness_OverlayCompleteness_SharedFiles = await listSharedThemeFiles();
      const presetThemeDir: Tests_OverlayCompleteness_OverlayCompleteness_PresetThemeDir = resolve(getPackageRoot(), 'src', 'styles', 'presets', presetName, 'theme');
      const presetFiles: Tests_OverlayCompleteness_OverlayCompleteness_PresetFiles = await glob('**/style.css', { cwd: presetThemeDir });
      const presetFilesSet: Tests_OverlayCompleteness_OverlayCompleteness_PresetFilesSet = new Set(presetFiles);
      const missing: Tests_OverlayCompleteness_OverlayCompleteness_Missing = sharedFiles.filter((file) => presetFilesSet.has(file) === false);
      const message: Tests_OverlayCompleteness_OverlayCompleteness_Message = [
        `'${presetName}' preset is missing overlays for ${missing.length} shared theme components:`,
        ...missing.map((file) => `  - presets/${presetName}/theme/${file}`),
      ].join('\n');

      strictEqual(missing.length, 0, message);

      return;
    });
  }

  return;
});

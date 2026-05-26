import { strictEqual } from 'node:assert/strict';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { glob } from 'glob';
import { describe, it } from 'vitest';

import { presetsIndexNames } from '../presets/index.js';

import type {
  TestsOverlayCompletenessGetPackageRootCurrentFileDirectory,
  TestsOverlayCompletenessGetPackageRootCurrentFilePath,
  TestsOverlayCompletenessGetPackageRootReturns,
  TestsOverlayCompletenessListSharedThemeFilesReturns,
  TestsOverlayCompletenessListSharedThemeFilesThemeDirectory,
  TestsOverlayCompletenessOverlayCompletenessMessage,
  TestsOverlayCompletenessOverlayCompletenessMissing,
  TestsOverlayCompletenessOverlayCompletenessPresetFiles,
  TestsOverlayCompletenessOverlayCompletenessPresetFilesSet,
  TestsOverlayCompletenessOverlayCompletenessPresetName,
  TestsOverlayCompletenessOverlayCompletenessPresetThemeDir,
  TestsOverlayCompletenessOverlayCompletenessSharedFiles,
} from '../types/tests/overlay-completeness.test.d.ts';

/**
 * Tests - Overlay Completeness - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @since 0.18.0
 */
function getPackageRoot(): TestsOverlayCompletenessGetPackageRootReturns {
  const currentFilePath: TestsOverlayCompletenessGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsOverlayCompletenessGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

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
async function listSharedThemeFiles(): TestsOverlayCompletenessListSharedThemeFilesReturns {
  const themeDirectory: TestsOverlayCompletenessListSharedThemeFilesThemeDirectory = resolve(getPackageRoot(), 'src', 'styles', 'theme');

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
  for (const presetName of presetsIndexNames) {
    const presetNameContext: TestsOverlayCompletenessOverlayCompletenessPresetName = presetName;

    it(`'${presetNameContext}' preset has an overlay for every shared theme component`, async () => {
      const sharedFiles: TestsOverlayCompletenessOverlayCompletenessSharedFiles = await listSharedThemeFiles();
      const presetThemeDir: TestsOverlayCompletenessOverlayCompletenessPresetThemeDir = resolve(getPackageRoot(), 'src', 'styles', 'presets', presetNameContext, 'theme');
      const presetFiles: TestsOverlayCompletenessOverlayCompletenessPresetFiles = await glob('**/style.css', { cwd: presetThemeDir });
      const presetFilesSet: TestsOverlayCompletenessOverlayCompletenessPresetFilesSet = new Set(presetFiles);
      const missing: TestsOverlayCompletenessOverlayCompletenessMissing = sharedFiles.filter((file) => presetFilesSet.has(file) === false);
      const message: TestsOverlayCompletenessOverlayCompletenessMessage = [
        `'${presetNameContext}' preset is missing overlays for ${missing.length} shared theme components:`,
        ...missing.map((file) => `  - presets/${presetNameContext}/theme/${file}`),
      ].join('\n');

      strictEqual(missing.length, 0, message);

      return;
    });
  }

  return;
});

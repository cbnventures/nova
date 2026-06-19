import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { filterPresetThemeFile } from '../../lib/filter-preset-theme-file.js';

import type {
  Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_DropsFilesThatAreNotStyleCss_Result,
  Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_DropsFooterFilesInInactiveVariantSubfolders_Result,
  Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_DropsNavbarFilesInInactiveVariantSubfolders_Result,
  Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsFooterFilesInTheActiveVariantSubfolder_Result,
  Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsNavbarFilesInTheActiveVariantSubfolder_Result,
  Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsNonNavbarNonFooterStyleFiles_Result,
  Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsTheFooterWrapperFileRegardlessOfActiveVariant_Result,
  Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsTheNavbarWrapperFileRegardlessOfActiveVariant_Result,
} from '../../types/tests/lib/filter-preset-theme-file.test.d.ts';

/**
 * Tests - Lib - Filter Preset Theme File - Filter Preset Theme File.
 *
 * @since 0.15.0
 */
describe('filterPresetThemeFile', async () => {
  it('keeps the Navbar wrapper file regardless of active variant', () => {
    const result: Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsTheNavbarWrapperFileRegardlessOfActiveVariant_Result = filterPresetThemeFile('Navbar/style.css', 'Navbar/Bridge/', 'Footer/Commons/');

    strictEqual(result, true);

    return;
  });

  it('keeps the Footer wrapper file regardless of active variant', () => {
    const result: Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsTheFooterWrapperFileRegardlessOfActiveVariant_Result = filterPresetThemeFile('Footer/style.css', 'Navbar/Bridge/', 'Footer/Commons/');

    strictEqual(result, true);

    return;
  });

  it('keeps Navbar files in the active variant subfolder', () => {
    const result: Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsNavbarFilesInTheActiveVariantSubfolder_Result = filterPresetThemeFile('Navbar/Bridge/style.css', 'Navbar/Bridge/', 'Footer/Commons/');

    strictEqual(result, true);

    return;
  });

  it('drops Navbar files in inactive variant subfolders', () => {
    const result: Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_DropsNavbarFilesInInactiveVariantSubfolders_Result = filterPresetThemeFile('Navbar/Canopy/style.css', 'Navbar/Bridge/', 'Footer/Commons/');

    strictEqual(result, false);

    return;
  });

  it('keeps Footer files in the active variant subfolder', () => {
    const result: Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsFooterFilesInTheActiveVariantSubfolder_Result = filterPresetThemeFile('Footer/Commons/style.css', 'Navbar/Bridge/', 'Footer/Commons/');

    strictEqual(result, true);

    return;
  });

  it('drops Footer files in inactive variant subfolders', () => {
    const result: Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_DropsFooterFilesInInactiveVariantSubfolders_Result = filterPresetThemeFile('Footer/Embassy/style.css', 'Navbar/Bridge/', 'Footer/Commons/');

    strictEqual(result, false);

    return;
  });

  it('keeps non-Navbar non-Footer style files', () => {
    const result: Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_KeepsNonNavbarNonFooterStyleFiles_Result = filterPresetThemeFile('DocItem/Content/style.css', 'Navbar/Bridge/', 'Footer/Commons/');

    strictEqual(result, true);

    return;
  });

  it('drops files that are not style.css', () => {
    const result: Tests_Lib_FilterPresetThemeFile_FilterPresetThemeFile_DropsFilesThatAreNotStyleCss_Result = filterPresetThemeFile('Navbar/Bridge/style.css.map', 'Navbar/Bridge/', 'Footer/Commons/');

    strictEqual(result, false);

    return;
  });

  return;
});

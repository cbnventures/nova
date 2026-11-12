import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { comparePresetThemeFiles } from '../../lib/compare-preset-theme-files.js';
import { filterPresetThemeFile } from '../../lib/filter-preset-theme-file.js';
import { toPosixPath } from '../../lib/posix-path.js';

import type {
  Tests_Lib_PosixPath_ToPosixPath_KeepsOnlyTheActiveNavbarAndFooterVariantsOfAWindowsPresetThemeListing_PosixFiles,
  Tests_Lib_PosixPath_ToPosixPath_KeepsOnlyTheActiveNavbarAndFooterVariantsOfAWindowsPresetThemeListing_WindowsFiles,
  Tests_Lib_PosixPath_ToPosixPath_LeavesForwardSlashPathsUnchanged_Result,
  Tests_Lib_PosixPath_ToPosixPath_RewritesBackslashSeparatorsToForwardSlashes_Result,
  Tests_Lib_PosixPath_ToPosixPath_SortsAWindowsBlockListingInForwardSlashOrder_PosixFiles,
  Tests_Lib_PosixPath_ToPosixPath_SortsAWindowsBlockListingInForwardSlashOrder_WindowsFiles,
} from '../../types/tests/lib/posix-path.test.d.ts';

/**
 * Tests - Lib - Posix Path - To Posix Path.
 *
 * @since 0.41.2
 */
describe('toPosixPath', async () => {
  it('rewrites backslash separators to forward slashes', () => {
    const result: Tests_Lib_PosixPath_ToPosixPath_RewritesBackslashSeparatorsToForwardSlashes_Result = toPosixPath('Navbar\\Canopy\\style.css');

    strictEqual(result, 'Navbar/Canopy/style.css');

    return;
  });

  it('leaves forward slash paths unchanged', () => {
    const result: Tests_Lib_PosixPath_ToPosixPath_LeavesForwardSlashPathsUnchanged_Result = toPosixPath('Navbar/Canopy/style.css');

    strictEqual(result, 'Navbar/Canopy/style.css');

    return;
  });

  it('sorts a Windows block listing in forward slash order', () => {
    const windowsFiles: Tests_Lib_PosixPath_ToPosixPath_SortsAWindowsBlockListingInForwardSlashOrder_WindowsFiles = [
      'NavbarItem\\style.css',
      'Navbar\\style.css',
      'Footer\\style.css',
    ];
    const posixFiles: Tests_Lib_PosixPath_ToPosixPath_SortsAWindowsBlockListingInForwardSlashOrder_PosixFiles = [
      'NavbarItem/style.css',
      'Navbar/style.css',
      'Footer/style.css',
    ];

    deepStrictEqual(
      windowsFiles.map((fileName) => toPosixPath(fileName)).sort(),
      [...posixFiles].sort(),
    );
    deepStrictEqual(
      windowsFiles.map((fileName) => toPosixPath(fileName)).sort(),
      [
        'Footer/style.css',
        'Navbar/style.css',
        'NavbarItem/style.css',
      ],
    );

    return;
  });

  it('keeps only the active Navbar and Footer variants of a Windows preset theme listing', () => {
    const windowsFiles: Tests_Lib_PosixPath_ToPosixPath_KeepsOnlyTheActiveNavbarAndFooterVariantsOfAWindowsPresetThemeListing_WindowsFiles = [
      'Navbar\\Monolith\\style.css',
      'Footer\\Commons\\style.css',
      'Navbar\\Canopy\\style.css',
      'Navbar\\style.css',
      'Footer\\Embassy\\style.css',
      'Footer\\style.css',
      'NavbarItem\\style.css',
      'Navbar\\Compass\\style.css',
      'Admonition\\style.css',
    ];
    const posixFiles: Tests_Lib_PosixPath_ToPosixPath_KeepsOnlyTheActiveNavbarAndFooterVariantsOfAWindowsPresetThemeListing_PosixFiles = windowsFiles.map((fileName) => toPosixPath(fileName)).filter(
      (fileName) => filterPresetThemeFile(fileName, 'Navbar/Canopy/', 'Footer/Commons/'),
    ).sort(
      (a, b) => comparePresetThemeFiles(a, b),
    );

    deepStrictEqual(posixFiles, [
      'Admonition/style.css',
      'Footer/style.css',
      'Footer/Commons/style.css',
      'Navbar/style.css',
      'Navbar/Canopy/style.css',
      'NavbarItem/style.css',
    ]);

    return;
  });

  return;
});

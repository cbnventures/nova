import { toPosixPath } from './posix-path.js';

import type {
  Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_A,
  Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_B,
  Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_PosixA,
  Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_PosixB,
  Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Returns,
} from '../types/lib/compare-preset-theme-files.d.ts';

/**
 * Lib - Compare Preset Theme Files - Compare Preset Theme Files.
 *
 * Sorts wrapper files before their variant subfolder siblings so variant
 * rules win the cascade, then sorts other paths alphabetically. Windows
 * backslash paths sort the same as forward slash paths.
 *
 * @param {Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_A} a - A.
 * @param {Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_B} b - B.
 *
 * @returns {Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Returns}
 *
 * @since 0.15.0
 */
export function comparePresetThemeFiles(a: Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_A, b: Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_B): Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Returns {
  const posixA: Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_PosixA = toPosixPath(a);
  const posixB: Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_PosixB = toPosixPath(b);

  if (
    posixA === 'Navbar/style.css'
    && posixB.startsWith('Navbar/') === true
    && posixB !== posixA
  ) {
    return -1;
  }

  if (
    posixB === 'Navbar/style.css'
    && posixA.startsWith('Navbar/') === true
    && posixA !== posixB
  ) {
    return 1;
  }

  if (
    posixA === 'Footer/style.css'
    && posixB.startsWith('Footer/') === true
    && posixB !== posixA
  ) {
    return -1;
  }

  if (
    posixB === 'Footer/style.css'
    && posixA.startsWith('Footer/') === true
    && posixA !== posixB
  ) {
    return 1;
  }

  return posixA.localeCompare(posixB);
}

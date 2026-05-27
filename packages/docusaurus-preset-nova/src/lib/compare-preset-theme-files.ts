import type {
  Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_A,
  Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_B,
  Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Returns,
} from '../types/lib/compare-preset-theme-files.d.ts';

/**
 * Lib - Compare Preset Theme Files - Compare Preset Theme Files.
 *
 * Sorts wrapper files before their variant subfolder siblings so
 * variant rules ship later in the CSS bundle and win the cascade
 * for same-specificity selectors. All other paths sort alphabetically.
 *
 * @param {Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_A} a - A.
 * @param {Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_B} b - B.
 *
 * @returns {Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Returns}
 *
 * @since 0.15.0
 */
export function comparePresetThemeFiles(a: Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_A, b: Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_B): Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Returns {
  if (
    a === 'Navbar/style.css'
    && b.startsWith('Navbar/') === true
    && b !== a
  ) {
    return -1;
  }

  if (
    b === 'Navbar/style.css'
    && a.startsWith('Navbar/') === true
    && a !== b
  ) {
    return 1;
  }

  if (
    a === 'Footer/style.css'
    && b.startsWith('Footer/') === true
    && b !== a
  ) {
    return -1;
  }

  if (
    b === 'Footer/style.css'
    && a.startsWith('Footer/') === true
    && a !== b
  ) {
    return 1;
  }

  return a.localeCompare(b);
}

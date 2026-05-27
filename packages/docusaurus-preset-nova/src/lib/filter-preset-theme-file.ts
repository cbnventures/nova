import type {
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_ActiveFooterPrefix,
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_ActiveNavbarPrefix,
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_FileName,
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_Returns,
} from '../types/lib/filter-preset-theme-file.d.ts';

/**
 * Lib - Filter Preset Theme File - Filter Preset Theme File.
 *
 * Keeps the Navbar and Footer wrapper files regardless of variant,
 * keeps variant subfolder files only when their prefix matches the
 * active variant, and drops anything that is not a style.css file.
 *
 * @param {Lib_FilterPresetThemeFile_FilterPresetThemeFile_FileName}           fileName            - File name.
 * @param {Lib_FilterPresetThemeFile_FilterPresetThemeFile_ActiveNavbarPrefix} activeNavbarPrefix  - Active navbar prefix.
 * @param {Lib_FilterPresetThemeFile_FilterPresetThemeFile_ActiveFooterPrefix} activeFooterPrefix  - Active footer prefix.
 *
 * @returns {Lib_FilterPresetThemeFile_FilterPresetThemeFile_Returns}
 *
 * @since 0.15.0
 */
export function filterPresetThemeFile(fileName: Lib_FilterPresetThemeFile_FilterPresetThemeFile_FileName, activeNavbarPrefix: Lib_FilterPresetThemeFile_FilterPresetThemeFile_ActiveNavbarPrefix, activeFooterPrefix: Lib_FilterPresetThemeFile_FilterPresetThemeFile_ActiveFooterPrefix): Lib_FilterPresetThemeFile_FilterPresetThemeFile_Returns {
  if (fileName.endsWith('style.css') === false) {
    return false;
  }

  if (fileName.startsWith('Navbar/') === true) {
    return fileName === 'Navbar/style.css' || fileName.startsWith(activeNavbarPrefix);
  }

  if (fileName.startsWith('Footer/') === true) {
    return fileName === 'Footer/style.css' || fileName.startsWith(activeFooterPrefix);
  }

  return true;
}

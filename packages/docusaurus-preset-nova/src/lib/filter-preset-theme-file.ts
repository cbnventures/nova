import type {
  LibFilterPresetThemeFileFilterPresetThemeFileActiveFooterPrefix,
  LibFilterPresetThemeFileFilterPresetThemeFileActiveNavbarPrefix,
  LibFilterPresetThemeFileFilterPresetThemeFileFileName,
  LibFilterPresetThemeFileFilterPresetThemeFileReturns,
} from '../types/lib/filter-preset-theme-file.d.ts';

/**
 * Lib - Filter Preset Theme File - Filter Preset Theme File.
 *
 * Keeps the Navbar and Footer wrapper files regardless of variant,
 * keeps variant subfolder files only when their prefix matches the
 * active variant, and drops anything that is not a style.css file.
 *
 * @param {LibFilterPresetThemeFileFilterPresetThemeFileFileName}           fileName            - File name.
 * @param {LibFilterPresetThemeFileFilterPresetThemeFileActiveNavbarPrefix} activeNavbarPrefix  - Active navbar prefix.
 * @param {LibFilterPresetThemeFileFilterPresetThemeFileActiveFooterPrefix} activeFooterPrefix  - Active footer prefix.
 *
 * @returns {LibFilterPresetThemeFileFilterPresetThemeFileReturns}
 *
 * @since 0.15.0
 */
export function filterPresetThemeFile(fileName: LibFilterPresetThemeFileFilterPresetThemeFileFileName, activeNavbarPrefix: LibFilterPresetThemeFileFilterPresetThemeFileActiveNavbarPrefix, activeFooterPrefix: LibFilterPresetThemeFileFilterPresetThemeFileActiveFooterPrefix): LibFilterPresetThemeFileFilterPresetThemeFileReturns {
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

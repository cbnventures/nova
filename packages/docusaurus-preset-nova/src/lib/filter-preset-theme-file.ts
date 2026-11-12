import { toPosixPath } from './posix-path.js';

import type {
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_ActiveFooterPrefix,
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_ActiveNavbarPrefix,
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_FileName,
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_PosixFileName,
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_PosixFooterPrefix,
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_PosixNavbarPrefix,
  Lib_FilterPresetThemeFile_FilterPresetThemeFile_Returns,
} from '../types/lib/filter-preset-theme-file.d.ts';

/**
 * Lib - Filter Preset Theme File - Filter Preset Theme File.
 *
 * Keeps the Navbar and Footer wrapper files, keeps variant files only for
 * the active variant, and drops anything that is not a style.css file.
 * Windows backslash paths match the same forward slash prefixes.
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
  const posixFileName: Lib_FilterPresetThemeFile_FilterPresetThemeFile_PosixFileName = toPosixPath(fileName);
  const posixNavbarPrefix: Lib_FilterPresetThemeFile_FilterPresetThemeFile_PosixNavbarPrefix = toPosixPath(activeNavbarPrefix);
  const posixFooterPrefix: Lib_FilterPresetThemeFile_FilterPresetThemeFile_PosixFooterPrefix = toPosixPath(activeFooterPrefix);

  if (posixFileName.endsWith('style.css') === false) {
    return false;
  }

  if (posixFileName.startsWith('Navbar/') === true) {
    return posixFileName === 'Navbar/style.css' || posixFileName.startsWith(posixNavbarPrefix);
  }

  if (posixFileName.startsWith('Footer/') === true) {
    return posixFileName === 'Footer/style.css' || posixFileName.startsWith(posixFooterPrefix);
  }

  return true;
}

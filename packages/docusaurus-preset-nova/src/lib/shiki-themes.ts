import type {
  Lib_ShikiThemes_GetShikiThemes_PresetName,
  Lib_ShikiThemes_GetShikiThemes_Result,
  Lib_ShikiThemes_GetShikiThemes_Returns,
  Lib_ShikiThemes_ShikiThemeMap,
} from '../types/lib/shiki-themes.d.ts';

/**
 * Lib - Shiki Themes - Shiki Theme Map.
 *
 * Maps visual preset names to their corresponding light and dark
 * Shiki syntax highlighting theme pairs for dual-theme
 * code block rendering.
 *
 * @since 0.15.0
 */
const shikiThemeMap: Lib_ShikiThemes_ShikiThemeMap = {
  envoy: {
    light: 'catppuccin-latte',
    dark: 'catppuccin-mocha',
  },
  foundry: {
    light: 'github-light',
    dark: 'github-dark',
  },
  lantern: {
    light: 'min-light',
    dark: 'dracula',
  },
  marshal: {
    light: 'solarized-light',
    dark: 'solarized-dark',
  },
  sentinel: {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  },
  signal: {
    light: 'rose-pine-dawn',
    dark: 'rose-pine',
  },
};

/**
 * Lib - Shiki Themes - Get Shiki Themes.
 *
 * Retrieves the light and dark Shiki theme pair for the given
 * visual preset name, throwing an error if the preset
 * is not recognized.
 *
 * @param {Lib_ShikiThemes_GetShikiThemes_PresetName} presetName - Preset name.
 *
 * @returns {Lib_ShikiThemes_GetShikiThemes_Returns}
 *
 * @since 0.15.0
 */
export function getShikiThemes(presetName: Lib_ShikiThemes_GetShikiThemes_PresetName): Lib_ShikiThemes_GetShikiThemes_Returns {
  const result: Lib_ShikiThemes_GetShikiThemes_Result = shikiThemeMap[presetName];

  if (result === undefined) {
    throw new Error(`Unknown preset name: ${presetName}`);
  }

  return result;
}

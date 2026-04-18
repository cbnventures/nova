export type LibShikiThemesThemePairLight = string;

export type LibShikiThemesThemePairDark = string;

export type LibShikiThemesThemePair = {
  light: LibShikiThemesThemePairLight;
  dark: LibShikiThemesThemePairDark;
};

/**
 * Lib - Shiki Themes - Get Shiki Themes.
 *
 * @since 0.15.0
 */
export type LibShikiThemesGetShikiThemesPresetName = string;

export type LibShikiThemesGetShikiThemesReturns = LibShikiThemesThemePair;

export type LibShikiThemesGetShikiThemesResult = LibShikiThemesThemePair | undefined;

/**
 * Lib - Shiki Themes - Shiki Theme Map.
 *
 * @since 0.15.0
 */
export type LibShikiThemesShikiThemeMap = Record<string, LibShikiThemesThemePair>;

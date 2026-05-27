export type Lib_ShikiThemes_ThemePair_Light = string;

export type Lib_ShikiThemes_ThemePair_Dark = string;

export type Lib_ShikiThemes_ThemePair = {
  light: Lib_ShikiThemes_ThemePair_Light;
  dark: Lib_ShikiThemes_ThemePair_Dark;
};

/**
 * Lib - Shiki Themes - Get Shiki Themes.
 *
 * @since 0.15.0
 */
export type Lib_ShikiThemes_GetShikiThemes_PresetName = string;

export type Lib_ShikiThemes_GetShikiThemes_Returns = Lib_ShikiThemes_ThemePair;

export type Lib_ShikiThemes_GetShikiThemes_Result = Lib_ShikiThemes_ThemePair | undefined;

/**
 * Lib - Shiki Themes - Shiki Theme Map.
 *
 * @since 0.15.0
 */
export type Lib_ShikiThemes_ShikiThemeMap = Record<string, Lib_ShikiThemes_ThemePair>;

import { LIB_REGEX_CHARACTER_SPACE } from './regex.js';

import type {
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_BaseUrl,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Display,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_DisplayPart,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_EncodedName,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Families,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Family,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_FamilyPart,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_FamilyParts,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Query,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Returns,
  Lib_GoogleFontsUrl_BuildGoogleFontsUrl_SpacePattern,
} from '../types/lib/google-fonts-url.d.ts';

const BASE_URL: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_BaseUrl = 'https://fonts.googleapis.com/css2';

/**
 * Lib - Google Fonts URL - Build Google Fonts URL.
 *
 * Constructs a Google Fonts CSS API URL from a list of `{name, axis}` pairs,
 * URL-encoding spaces in family names and appending a `display=<display>`
 * query parameter for the font-display strategy.
 *
 * @param {Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Families} families - Families.
 * @param {Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Display}  display  - Display.
 *
 * @returns {Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Returns}
 *
 * @since 0.17.0
 */
export function buildGoogleFontsUrl(families: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Families, display: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Display): Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Returns {
  const spacePattern: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_SpacePattern = new RegExp(LIB_REGEX_CHARACTER_SPACE.source, 'g');

  const familyParts: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_FamilyParts = families.map((family: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Family): Lib_GoogleFontsUrl_BuildGoogleFontsUrl_FamilyPart => {
    const encodedName: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_EncodedName = family['name'].replace(spacePattern, '+');

    return `family=${encodedName}:${family['axis']}`;
  });

  const query: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Query = familyParts.join('&');

  const displayPart: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_DisplayPart = `display=${display}`;

  return `${BASE_URL}?${query}&${displayPart}`;
}

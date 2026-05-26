import { LIB_REGEX_CHARACTER_SPACE } from './regex.js';

import type {
  LibGoogleFontsUrlBuildGoogleFontsUrlBaseUrl,
  LibGoogleFontsUrlBuildGoogleFontsUrlDisplay,
  LibGoogleFontsUrlBuildGoogleFontsUrlDisplayPart,
  LibGoogleFontsUrlBuildGoogleFontsUrlEncodedName,
  LibGoogleFontsUrlBuildGoogleFontsUrlFamilies,
  LibGoogleFontsUrlBuildGoogleFontsUrlFamily,
  LibGoogleFontsUrlBuildGoogleFontsUrlFamilyPart,
  LibGoogleFontsUrlBuildGoogleFontsUrlFamilyParts,
  LibGoogleFontsUrlBuildGoogleFontsUrlQuery,
  LibGoogleFontsUrlBuildGoogleFontsUrlReturns,
  LibGoogleFontsUrlBuildGoogleFontsUrlSpacePattern,
} from '../types/lib/google-fonts-url.d.ts';

const BASE_URL: LibGoogleFontsUrlBuildGoogleFontsUrlBaseUrl = 'https://fonts.googleapis.com/css2';

/**
 * Lib - Google Fonts URL - Build Google Fonts URL.
 *
 * Constructs a Google Fonts CSS API URL from a list of `{name, axis}` pairs,
 * URL-encoding spaces in family names and appending a `display=<display>`
 * query parameter for the font-display strategy.
 *
 * @param {LibGoogleFontsUrlBuildGoogleFontsUrlFamilies} families - Families.
 * @param {LibGoogleFontsUrlBuildGoogleFontsUrlDisplay}  display  - Display.
 *
 * @returns {LibGoogleFontsUrlBuildGoogleFontsUrlReturns}
 *
 * @since 0.17.0
 */
export function buildGoogleFontsUrl(families: LibGoogleFontsUrlBuildGoogleFontsUrlFamilies, display: LibGoogleFontsUrlBuildGoogleFontsUrlDisplay): LibGoogleFontsUrlBuildGoogleFontsUrlReturns {
  const spacePattern: LibGoogleFontsUrlBuildGoogleFontsUrlSpacePattern = new RegExp(LIB_REGEX_CHARACTER_SPACE.source, 'g');

  const familyParts: LibGoogleFontsUrlBuildGoogleFontsUrlFamilyParts = families.map((family: LibGoogleFontsUrlBuildGoogleFontsUrlFamily): LibGoogleFontsUrlBuildGoogleFontsUrlFamilyPart => {
    const encodedName: LibGoogleFontsUrlBuildGoogleFontsUrlEncodedName = family['name'].replace(spacePattern, '+');

    return `family=${encodedName}:${family['axis']}`;
  });

  const query: LibGoogleFontsUrlBuildGoogleFontsUrlQuery = familyParts.join('&');

  const displayPart: LibGoogleFontsUrlBuildGoogleFontsUrlDisplayPart = `display=${display}`;

  return `${BASE_URL}?${query}&${displayPart}`;
}

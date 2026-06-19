/**
 * Lib - Google Fonts URL.
 *
 * @since 0.17.0
 */
export type Lib_GoogleFontsUrl_BaseUrl = string;

/**
 * Lib - Google Fonts URL - Build Google Fonts URL.
 *
 * @since 0.17.0
 */
export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Family_Name = string;

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Family_Axis = string;

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Family = {
  name: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Family_Name;
  axis: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Family_Axis;
};

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Families = Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Family[];

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Display = 'auto' | 'block' | 'swap' | 'fallback' | 'optional';

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Returns = string;

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_SpacePattern = RegExp;

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_BuildFamilyPart = (family: Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Family) => Lib_GoogleFontsUrl_BuildGoogleFontsUrl_BuildFamilyPart_Returns;

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_FamilyParts = string[];

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_Query = string;

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_DisplayPart = string;

/**
 * Lib - Google Fonts URL - Build Google Fonts URL - Build Family Part.
 *
 * @since 0.17.0
 */
export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_BuildFamilyPart_Returns = string;

export type Lib_GoogleFontsUrl_BuildGoogleFontsUrl_BuildFamilyPart_EncodedName = string;

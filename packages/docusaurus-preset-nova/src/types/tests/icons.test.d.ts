/**
 * Tests - Icons - Create Fixture Site.
 *
 * @since 0.19.0
 */
export type Tests_Icons_CreateFixtureSite_File_Path = string;

export type Tests_Icons_CreateFixtureSite_File_Content = string;

export type Tests_Icons_CreateFixtureSite_File = {
  path: Tests_Icons_CreateFixtureSite_File_Path;
  content: Tests_Icons_CreateFixtureSite_File_Content;
};

export type Tests_Icons_CreateFixtureSite_Files = Tests_Icons_CreateFixtureSite_File[];

export type Tests_Icons_CreateFixtureSite_Returns = string;

export type Tests_Icons_CreateFixtureSite_Directory = string;

export type Tests_Icons_CreateFixtureSite_FilePath = string;

/**
 * Tests - Icons - Generate Icon Module - Discovers Icons From Content Theme Config And The Safelist.
 *
 * @since 0.19.0
 */
export type Tests_Icons_GenerateIconModule_DiscoversIconsFromContentThemeConfigAndTheSafelist_SiteDir = string;

export type Tests_Icons_GenerateIconModule_DiscoversIconsFromContentThemeConfigAndTheSafelist_Source = string;

export type Tests_Icons_GenerateIconModule_DiscoversIconsFromContentThemeConfigAndTheSafelist_Registered = string[];

/**
 * Tests - Icons - Generate Icon Module - Registers The Entire Preset Base Set.
 *
 * @since 0.19.0
 */
export type Tests_Icons_GenerateIconModule_RegistersTheEntirePresetBaseSet_SiteDir = string;

export type Tests_Icons_GenerateIconModule_RegistersTheEntirePresetBaseSet_Source = string;

export type Tests_Icons_GenerateIconModule_RegistersTheEntirePresetBaseSet_Registered = string[];

/**
 * Tests - Icons - Generate Icon Module - Skips Unresolved Names And Ignores Non Collection Prefixes.
 *
 * @since 0.19.0
 */
export type Tests_Icons_GenerateIconModule_SkipsUnresolvedNamesAndIgnoresNonCollectionPrefixes_SiteDir = string;

export type Tests_Icons_GenerateIconModule_SkipsUnresolvedNamesAndIgnoresNonCollectionPrefixes_Source = string;

export type Tests_Icons_GenerateIconModule_SkipsUnresolvedNamesAndIgnoresNonCollectionPrefixes_Registered = string[];

/**
 * Tests - Icons - Parse Registered Identifiers.
 *
 * @since 0.19.0
 */
export type Tests_Icons_ParseRegisteredIdentifiers_Source = string;

export type Tests_Icons_ParseRegisteredIdentifiers_Returns = string[];

export type Tests_Icons_ParseRegisteredIdentifiers_AddCollectionPrefix = string;

export type Tests_Icons_ParseRegisteredIdentifiers_AddCollectionSuffix = string;

export type Tests_Icons_ParseRegisteredIdentifiers_Identifiers = string[];

export type Tests_Icons_ParseRegisteredIdentifiers_Lines = string[];

export type Tests_Icons_ParseRegisteredIdentifiers_Json = string;

export type Tests_Icons_ParseRegisteredIdentifiers_Collection_Prefix = string;

export type Tests_Icons_ParseRegisteredIdentifiers_Collection_Icons = Record<string, unknown>;

export type Tests_Icons_ParseRegisteredIdentifiers_Collection_Aliases = Record<string, unknown> | undefined;

export type Tests_Icons_ParseRegisteredIdentifiers_Collection = {
  prefix: Tests_Icons_ParseRegisteredIdentifiers_Collection_Prefix;
  icons: Tests_Icons_ParseRegisteredIdentifiers_Collection_Icons;
  aliases?: Tests_Icons_ParseRegisteredIdentifiers_Collection_Aliases;
};

export type Tests_Icons_ParseRegisteredIdentifiers_Prefix = string;

export type Tests_Icons_ParseRegisteredIdentifiers_IconNames = string[];

export type Tests_Icons_ParseRegisteredIdentifiers_Aliases = Record<string, unknown> | undefined;

export type Tests_Icons_ParseRegisteredIdentifiers_AliasNames = string[];

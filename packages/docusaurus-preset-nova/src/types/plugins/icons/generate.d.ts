import type {
  Shared_IconifyAliasEntry,
  Shared_IconifyCollection,
  Shared_IconifyCollection_Aliases,
  Shared_IconifyCollectionsIndex,
  Shared_IconLoadedCollections,
  Shared_IconSlice,
  Shared_IconSlicedCollection,
  Shared_IconSlices,
} from '../../shared.d.ts';

/**
 * Plugins - Icons - Generate - Build Module Source.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_BuildModuleSource_Slices = Shared_IconSlices;

export type Plugins_Icons_Generate_BuildModuleSource_LoadedCollections = Shared_IconLoadedCollections;

export type Plugins_Icons_Generate_BuildModuleSource_Returns = string;

export type Plugins_Icons_Generate_BuildModuleSource_Lines = string[];

export type Plugins_Icons_Generate_BuildModuleSource_Prefixes = string[];

export type Plugins_Icons_Generate_BuildModuleSource_Slice = Shared_IconSlice | undefined;

export type Plugins_Icons_Generate_BuildModuleSource_Collection = Shared_IconifyCollection | undefined;

/**
 * Plugins - Icons - Generate - Build Sliced Collection.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_BuildSlicedCollection_Prefix = string;

export type Plugins_Icons_Generate_BuildSlicedCollection_Slice = Shared_IconSlice;

export type Plugins_Icons_Generate_BuildSlicedCollection_Collection = Shared_IconifyCollection;

export type Plugins_Icons_Generate_BuildSlicedCollection_Returns = Shared_IconSlicedCollection;

export type Plugins_Icons_Generate_BuildSlicedCollection_Icons = Record<string, unknown>;

export type Plugins_Icons_Generate_BuildSlicedCollection_Aliases = Record<string, unknown>;

export type Plugins_Icons_Generate_BuildSlicedCollection_CollectionAliases = Shared_IconifyCollection_Aliases | undefined;

export type Plugins_Icons_Generate_BuildSlicedCollection_IconNames = string[];

export type Plugins_Icons_Generate_BuildSlicedCollection_AliasNames = string[];

export type Plugins_Icons_Generate_BuildSlicedCollection_Sliced = Record<string, unknown>;

/**
 * Plugins - Icons - Generate - Collect Candidates.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_CollectCandidates_SiteDir = string;

export type Plugins_Icons_Generate_CollectCandidates_ThemeConfig = unknown;

export type Plugins_Icons_Generate_CollectCandidates_Safelist = string[];

export type Plugins_Icons_Generate_CollectCandidates_Returns = string[];

export type Plugins_Icons_Generate_CollectCandidates_Candidates = string[];

/**
 * Plugins - Icons - Generate - Collect Content Candidates.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_CollectContentCandidates_SiteDir = string;

export type Plugins_Icons_Generate_CollectContentCandidates_Returns = string[];

export type Plugins_Icons_Generate_CollectContentCandidates_Results = string[];

export type Plugins_Icons_Generate_CollectContentCandidates_DirectoryPath = string;

export type Plugins_Icons_Generate_CollectContentCandidates_FilePaths = string[];

export type Plugins_Icons_Generate_CollectContentCandidates_Text = string;

/**
 * Plugins - Icons - Generate - Collect Theme Config Candidates.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_CollectThemeConfigCandidates_Value = unknown;

export type Plugins_Icons_Generate_CollectThemeConfigCandidates_Returns = string[];

export type Plugins_Icons_Generate_CollectThemeConfigCandidates_Results = string[];

export type Plugins_Icons_Generate_CollectThemeConfigCandidates_Items = unknown[];

export type Plugins_Icons_Generate_CollectThemeConfigCandidates_Values = unknown[];

export type Plugins_Icons_Generate_CollectThemeConfigCandidates_Record = Record<string, unknown>;

/**
 * Plugins - Icons - Generate - Extract Candidates From Text.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_ExtractCandidatesFromText_Text = string;

export type Plugins_Icons_Generate_ExtractCandidatesFromText_Returns = string[];

export type Plugins_Icons_Generate_ExtractCandidatesFromText_Pattern = RegExp;

export type Plugins_Icons_Generate_ExtractCandidatesFromText_Results = string[];

export type Plugins_Icons_Generate_ExtractCandidatesFromText_Matches = IterableIterator<RegExpMatchArray>;

/**
 * Plugins - Icons - Generate - Generate Icon Module.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_GenerateIconModule_OptionsSiteDir = string;

export type Plugins_Icons_Generate_GenerateIconModule_OptionsThemeConfig = unknown;

export type Plugins_Icons_Generate_GenerateIconModule_OptionsSafelist = string[];

export type Plugins_Icons_Generate_GenerateIconModule_Options = {
  siteDir: Plugins_Icons_Generate_GenerateIconModule_OptionsSiteDir;
  themeConfig: Plugins_Icons_Generate_GenerateIconModule_OptionsThemeConfig;
  safelist: Plugins_Icons_Generate_GenerateIconModule_OptionsSafelist;
};

export type Plugins_Icons_Generate_GenerateIconModule_Returns = string;

export type Plugins_Icons_Generate_GenerateIconModule_Candidates = string[];

export type Plugins_Icons_Generate_GenerateIconModule_UniqueCandidates = string[];

export type Plugins_Icons_Generate_GenerateIconModule_CollectionsIndex = Record<string, unknown>;

export type Plugins_Icons_Generate_GenerateIconModule_LoadedCollections = Map<string, Shared_IconifyCollection | undefined>;

export type Plugins_Icons_Generate_GenerateIconModule_Slices = Map<string, Shared_IconSlice>;

export type Plugins_Icons_Generate_GenerateIconModule_Unresolved = string[];

export type Plugins_Icons_Generate_GenerateIconModule_ColonIndex = number;

export type Plugins_Icons_Generate_GenerateIconModule_Prefix = string;

export type Plugins_Icons_Generate_GenerateIconModule_Name = string;

export type Plugins_Icons_Generate_GenerateIconModule_Collection = Shared_IconifyCollection | undefined;

export type Plugins_Icons_Generate_GenerateIconModule_Resolved = boolean;

/**
 * Plugins - Icons - Generate - Get Iconify Package Directory.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_GetIconifyPackageDirectory_Returns = string;

/**
 * Plugins - Icons - Generate - Get Or Create Slice.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_GetOrCreateSlice_Slices = Shared_IconSlices;

export type Plugins_Icons_Generate_GetOrCreateSlice_Prefix = string;

export type Plugins_Icons_Generate_GetOrCreateSlice_Returns = Shared_IconSlice;

export type Plugins_Icons_Generate_GetOrCreateSlice_Existing = Shared_IconSlice | undefined;

export type Plugins_Icons_Generate_GetOrCreateSlice_SliceIcons = Set<string>;

export type Plugins_Icons_Generate_GetOrCreateSlice_SliceAliases = Set<string>;

export type Plugins_Icons_Generate_GetOrCreateSlice_Slice = {
  icons: Plugins_Icons_Generate_GetOrCreateSlice_SliceIcons;
  aliases: Plugins_Icons_Generate_GetOrCreateSlice_SliceAliases;
};

/**
 * Plugins - Icons - Generate - Load Collection.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_LoadCollection_Prefix = string;

export type Plugins_Icons_Generate_LoadCollection_LoadedCollections = Shared_IconLoadedCollections;

export type Plugins_Icons_Generate_LoadCollection_Returns = Shared_IconifyCollection | undefined;

export type Plugins_Icons_Generate_LoadCollection_CollectionPath = string;

export type Plugins_Icons_Generate_LoadCollection_Raw = string;

export type Plugins_Icons_Generate_LoadCollection_Collection = Shared_IconifyCollection;

/**
 * Plugins - Icons - Generate - Load Collections Index.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_LoadCollectionsIndex_Returns = Shared_IconifyCollectionsIndex;

export type Plugins_Icons_Generate_LoadCollectionsIndex_IndexPath = string;

export type Plugins_Icons_Generate_LoadCollectionsIndex_Raw = string;

/**
 * Plugins - Icons - Generate - Resolve Name.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_ResolveName_Collection = Shared_IconifyCollection;

export type Plugins_Icons_Generate_ResolveName_Name = string;

export type Plugins_Icons_Generate_ResolveName_Slice = Shared_IconSlice;

export type Plugins_Icons_Generate_ResolveName_Returns = boolean;

export type Plugins_Icons_Generate_ResolveName_Aliases = Shared_IconifyCollection_Aliases | undefined;

export type Plugins_Icons_Generate_ResolveName_AliasEntry = Shared_IconifyAliasEntry | undefined;

/**
 * Plugins - Icons - Generate - Walk Directory.
 *
 * @since 0.19.0
 */
export type Plugins_Icons_Generate_WalkDirectory_Directory = string;

export type Plugins_Icons_Generate_WalkDirectory_Returns = string[];

export type Plugins_Icons_Generate_WalkDirectory_Results = string[];

export type Plugins_Icons_Generate_WalkDirectory_Names = string[];

export type Plugins_Icons_Generate_WalkDirectory_EntryPath = string;

export type Plugins_Icons_Generate_WalkDirectory_Stats = import('node:fs').Stats;

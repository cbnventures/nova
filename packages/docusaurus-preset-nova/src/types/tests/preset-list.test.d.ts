import type { Dirent } from 'node:fs';

/**
 * Tests - Preset List - Extract Shared Preset Name Literals.
 *
 * @since 0.18.0
 */
export type Tests_PresetList_ExtractSharedPresetNameLiterals_FilePath = string;

export type Tests_PresetList_ExtractSharedPresetNameLiterals_Returns = Promise<readonly string[]>;

export type Tests_PresetList_ExtractSharedPresetNameLiterals_Content = string;

export type Tests_PresetList_ExtractSharedPresetNameLiterals_TypeMatch = RegExpMatchArray | null;

export type Tests_PresetList_ExtractSharedPresetNameLiterals_Rhs = string;

export type Tests_PresetList_ExtractSharedPresetNameLiterals_LiteralPattern = RegExp;

export type Tests_PresetList_ExtractSharedPresetNameLiterals_Literals = string[];

export type Tests_PresetList_ExtractSharedPresetNameLiterals_Match = RegExpExecArray | null;

export type Tests_PresetList_ExtractSharedPresetNameLiterals_Capture = string | undefined;

/**
 * Tests - Preset List - Extract Token Map Presets.
 *
 * @since 0.18.0
 */
export type Tests_PresetList_ExtractTokenMapPresets_FilePath = string;

export type Tests_PresetList_ExtractTokenMapPresets_Returns = Promise<readonly string[]>;

export type Tests_PresetList_ExtractTokenMapPresets_Content = string;

export type Tests_PresetList_ExtractTokenMapPresets_Pattern = RegExp;

export type Tests_PresetList_ExtractTokenMapPresets_Presets = string[];

export type Tests_PresetList_ExtractTokenMapPresets_Match = RegExpExecArray | null;

export type Tests_PresetList_ExtractTokenMapPresets_Capture = string | undefined;

/**
 * Tests - Preset List - Get Package Root.
 *
 * @since 0.18.0
 */
export type Tests_PresetList_GetPackageRoot_Returns = string;

export type Tests_PresetList_GetPackageRoot_CurrentFilePath = string;

export type Tests_PresetList_GetPackageRoot_CurrentFileDirectory = string;

/**
 * Tests - Preset List - List Preset Directories.
 *
 * @since 0.18.0
 */
export type Tests_PresetList_ListPresetDirectories_Root = string;

export type Tests_PresetList_ListPresetDirectories_Returns = Promise<readonly string[]>;

export type Tests_PresetList_ListPresetDirectories_Entries = readonly Dirent[];

export type Tests_PresetList_ListPresetDirectories_Names = string[];

/**
 * Tests - Preset List - Preset List.
 *
 * @since 0.18.0
 */
export type Tests_PresetList_PresetList_SamplePreset = 'sample';

/**
 * Tests - Preset List - Preset List - Filesystem Preset Directories Match Presets Index Names Excluding Sample Scaffold.
 *
 * @since 0.18.0
 */
export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_PresetsRoot = string;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Filesystem = readonly string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_FilesystemSet = Set<string>;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_ExpectedSet = Set<string>;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Missing = string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Extra = string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Message = string;

/**
 * Tests - Preset List - Preset List - Filesystem Preset Directories Match Presets Index Presets Keys Excluding Sample Scaffold.
 *
 * @since 0.18.0
 */
export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_PresetsRoot = string;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Filesystem = readonly string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_FilesystemSet = Set<string>;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_ExpectedSet = Set<string>;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Missing = string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Extra = string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Message = string;

/**
 * Tests - Preset List - Preset List - Filesystem Preset Directories Match Shared Preset Name Union Literals Excluding Sample Scaffold.
 *
 * @since 0.18.0
 */
export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_PresetsRoot = string;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Filesystem = readonly string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_FilesystemSet = Set<string>;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_SharedTypeFilePath = string;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Literals = readonly string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_ExpectedSet = Set<string>;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Missing = string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Extra = string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Message = string;

/**
 * Tests - Preset List - Preset List - Filesystem Preset Directories Match Token Map Expectations Including Sample Scaffold.
 *
 * @since 0.18.0
 */
export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_PresetsRoot = string;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Filesystem = readonly string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_FilesystemSet = Set<string>;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_TokenMapTestFilePath = string;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Presets = readonly string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_ExpectedSet = Set<string>;

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Missing = string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Extra = string[];

export type Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Message = string;

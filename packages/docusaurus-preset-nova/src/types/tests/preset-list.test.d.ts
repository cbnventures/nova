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

export type Tests_PresetList_PresetList_PresetsRoot = string;

export type Tests_PresetList_PresetList_Filesystem = readonly string[];

export type Tests_PresetList_PresetList_FilesystemSet = Set<string>;

export type Tests_PresetList_PresetList_ExpectedSet = Set<string>;

export type Tests_PresetList_PresetList_Missing = string[];

export type Tests_PresetList_PresetList_Extra = string[];

export type Tests_PresetList_PresetList_Message = string;

export type Tests_PresetList_PresetList_SharedTypeFilePath = string;

export type Tests_PresetList_PresetList_Literals = readonly string[];

export type Tests_PresetList_PresetList_TokenMapTestFilePath = string;

export type Tests_PresetList_PresetList_Presets = readonly string[];

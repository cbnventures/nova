import type { Dirent } from 'node:fs';

/**
 * Tests - Preset List - Extract Shared Preset Name Literals.
 *
 * @since 0.18.0
 */
export type TestsPresetListExtractSharedPresetNameLiteralsFilePath = string;

export type TestsPresetListExtractSharedPresetNameLiteralsReturns = Promise<readonly string[]>;

export type TestsPresetListExtractSharedPresetNameLiteralsContent = string;

export type TestsPresetListExtractSharedPresetNameLiteralsTypeMatch = RegExpMatchArray | null;

export type TestsPresetListExtractSharedPresetNameLiteralsRhs = string;

export type TestsPresetListExtractSharedPresetNameLiteralsLiteralPattern = RegExp;

export type TestsPresetListExtractSharedPresetNameLiteralsLiterals = string[];

export type TestsPresetListExtractSharedPresetNameLiteralsMatch = RegExpExecArray | null;

export type TestsPresetListExtractSharedPresetNameLiteralsCapture = string | undefined;

/**
 * Tests - Preset List - Extract Token Map Presets.
 *
 * @since 0.18.0
 */
export type TestsPresetListExtractTokenMapPresetsFilePath = string;

export type TestsPresetListExtractTokenMapPresetsReturns = Promise<readonly string[]>;

export type TestsPresetListExtractTokenMapPresetsContent = string;

export type TestsPresetListExtractTokenMapPresetsPattern = RegExp;

export type TestsPresetListExtractTokenMapPresetsPresets = string[];

export type TestsPresetListExtractTokenMapPresetsMatch = RegExpExecArray | null;

export type TestsPresetListExtractTokenMapPresetsCapture = string | undefined;

/**
 * Tests - Preset List - Get Package Root.
 *
 * @since 0.18.0
 */
export type TestsPresetListGetPackageRootReturns = string;

export type TestsPresetListGetPackageRootCurrentFilePath = string;

export type TestsPresetListGetPackageRootCurrentFileDirectory = string;

/**
 * Tests - Preset List - List Preset Directories.
 *
 * @since 0.18.0
 */
export type TestsPresetListListPresetDirectoriesRoot = string;

export type TestsPresetListListPresetDirectoriesReturns = Promise<readonly string[]>;

export type TestsPresetListListPresetDirectoriesEntries = readonly Dirent[];

export type TestsPresetListListPresetDirectoriesNames = string[];

/**
 * Tests - Preset List - Preset List.
 *
 * @since 0.18.0
 */
export type TestsPresetListPresetListSamplePreset = 'sample';

export type TestsPresetListPresetListPresetsRoot = string;

export type TestsPresetListPresetListFilesystem = readonly string[];

export type TestsPresetListPresetListFilesystemSet = Set<string>;

export type TestsPresetListPresetListExpectedSet = Set<string>;

export type TestsPresetListPresetListMissing = string[];

export type TestsPresetListPresetListExtra = string[];

export type TestsPresetListPresetListMessage = string;

export type TestsPresetListPresetListSharedTypeFilePath = string;

export type TestsPresetListPresetListLiterals = readonly string[];

export type TestsPresetListPresetListTokenMapTestFilePath = string;

export type TestsPresetListPresetListPresets = readonly string[];

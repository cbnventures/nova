import type { Dirent } from 'node:fs';

import type { Diagnostic } from 'typescript';

/**
 * Tests - Tsconfig Presets.
 *
 * @since 0.26.0
 */
export type Tests_TsconfigPresets_CurrentFilePath = string;

export type Tests_TsconfigPresets_CurrentDirectory = string;

export type Tests_TsconfigPresets_PackageDirectory = string;

export type Tests_TsconfigPresets_SourcePresetDirectory = string;

export type Tests_TsconfigPresets_PackageJsonPath = string;

export type Tests_TsconfigPresets_PackageJsonText = string;

export type Tests_TsconfigPresets_PackageJson_Exports = Record<string, unknown>;

export type Tests_TsconfigPresets_PackageJson = {
  exports?: Tests_TsconfigPresets_PackageJson_Exports;
};

export type Tests_TsconfigPresets_PackageExports = Tests_TsconfigPresets_PackageJson_Exports;

export type Tests_TsconfigPresets_PresetExportPrefix = string;

export type Tests_TsconfigPresets_PresetBuildPrefix = string;

export type Tests_TsconfigPresets_SourcePresetDirectoryEntries = Dirent[];

export type Tests_TsconfigPresets_SourcePresetFilenames = string[];

export type Tests_TsconfigPresets_PresetExportEntry = [string, unknown];

export type Tests_TsconfigPresets_PresetExportEntries = Tests_TsconfigPresets_PresetExportEntry[];

export type Tests_TsconfigPresets_ExportedPresetFilenames = string[];

export type Tests_TsconfigPresets_ExportSubpath = string;

export type Tests_TsconfigPresets_ExportTarget = unknown;

export type Tests_TsconfigPresets_PresetFilename = string;

export type Tests_TsconfigPresets_ExpectedExportTarget = string;

export type Tests_TsconfigPresets_SourcePresetFilename = string;

export type Tests_TsconfigPresets_SourcePresetPath = string;

export type Tests_TsconfigPresets_ReadResult = {
  config?: Record<string, unknown>;
  error?: Diagnostic;
};

export type Tests_TsconfigPresets_ReadDiagnosticMessage = string;

export type Tests_TsconfigPresets_PresetConfig = Record<string, unknown>;

export type Tests_TsconfigPresets_CompilerOptions = unknown;

export type Tests_TsconfigPresets_ConversionResult_Errors = Diagnostic[];

export type Tests_TsconfigPresets_ConversionResult = {
  errors: Tests_TsconfigPresets_ConversionResult_Errors;
};

export type Tests_TsconfigPresets_Diagnostic = Diagnostic;

export type Tests_TsconfigPresets_DiagnosticMessage = string;

export type Tests_TsconfigPresets_TSConfigPresetContract_ExportsEverySourcePresetWithoutStalePublicEntries_SourcePresetCount = number;

export type Tests_TsconfigPresets_TSConfigPresetContract_LoadsEverySourcePresetThroughTypeScriptWithoutConfigurationDiagnostics_Diagnostics = string[];

export type Tests_TsconfigPresets_TSConfigPresetContract_MapsEveryPublicExportToItsBuildCopy_Mismatches = string[];

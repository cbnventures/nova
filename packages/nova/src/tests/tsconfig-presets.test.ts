import {
  deepStrictEqual,
  notStrictEqual,
} from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  convertCompilerOptionsFromJson,
  flattenDiagnosticMessageText,
  readConfigFile,
  sys,
} from 'typescript';
import { describe, it } from 'vitest';

import { isPlainObject } from '../lib/utility.js';

import type {
  Tests_TsconfigPresets_CompilerOptions,
  Tests_TsconfigPresets_ConversionResult,
  Tests_TsconfigPresets_CurrentDirectory,
  Tests_TsconfigPresets_CurrentFilePath,
  Tests_TsconfigPresets_Diagnostic,
  Tests_TsconfigPresets_DiagnosticMessage,
  Tests_TsconfigPresets_ExpectedExportTarget,
  Tests_TsconfigPresets_ExportedPresetFilenames,
  Tests_TsconfigPresets_ExportSubpath,
  Tests_TsconfigPresets_ExportTarget,
  Tests_TsconfigPresets_PackageDirectory,
  Tests_TsconfigPresets_PackageExports,
  Tests_TsconfigPresets_PackageJson,
  Tests_TsconfigPresets_PackageJsonPath,
  Tests_TsconfigPresets_PackageJsonText,
  Tests_TsconfigPresets_PresetBuildPrefix,
  Tests_TsconfigPresets_PresetConfig,
  Tests_TsconfigPresets_PresetExportEntries,
  Tests_TsconfigPresets_PresetExportEntry,
  Tests_TsconfigPresets_PresetExportPrefix,
  Tests_TsconfigPresets_PresetFilename,
  Tests_TsconfigPresets_ReadDiagnosticMessage,
  Tests_TsconfigPresets_ReadResult,
  Tests_TsconfigPresets_SourcePresetDirectory,
  Tests_TsconfigPresets_SourcePresetDirectoryEntries,
  Tests_TsconfigPresets_SourcePresetFilename,
  Tests_TsconfigPresets_SourcePresetFilenames,
  Tests_TsconfigPresets_SourcePresetPath,
  Tests_TsconfigPresets_TSConfigPresetContract_ExportsEverySourcePresetWithoutStalePublicEntries_SourcePresetCount,
  Tests_TsconfigPresets_TSConfigPresetContract_LoadsEverySourcePresetThroughTypeScriptWithoutConfigurationDiagnostics_Diagnostics,
  Tests_TsconfigPresets_TSConfigPresetContract_MapsEveryPublicExportToItsBuildCopy_Mismatches,
} from '../types/tests/tsconfig-presets.test.d.ts';

const currentFilePath: Tests_TsconfigPresets_CurrentFilePath = fileURLToPath(import.meta.url);
const currentDirectory: Tests_TsconfigPresets_CurrentDirectory = dirname(currentFilePath);
const packageDirectory: Tests_TsconfigPresets_PackageDirectory = resolve(currentDirectory, '..', '..');
const sourcePresetDirectory: Tests_TsconfigPresets_SourcePresetDirectory = join(packageDirectory, 'src', 'presets', 'tsconfig');
const packageJsonPath: Tests_TsconfigPresets_PackageJsonPath = join(packageDirectory, 'package.json');
const packageJsonText: Tests_TsconfigPresets_PackageJsonText = readFileSync(packageJsonPath, 'utf-8');
const packageJson: Tests_TsconfigPresets_PackageJson = JSON.parse(packageJsonText);
const packageExports: Tests_TsconfigPresets_PackageExports = packageJson['exports'] ?? {};
const presetExportPrefix: Tests_TsconfigPresets_PresetExportPrefix = './presets/tsconfig/';
const presetBuildPrefix: Tests_TsconfigPresets_PresetBuildPrefix = './build/src/presets/tsconfig/';
const sourcePresetDirectoryEntries: Tests_TsconfigPresets_SourcePresetDirectoryEntries = readdirSync(sourcePresetDirectory, { withFileTypes: true });
const sourcePresetFilenames: Tests_TsconfigPresets_SourcePresetFilenames = sourcePresetDirectoryEntries
  .filter((entry) => entry.isFile() === true && entry.name.endsWith('.json') === true)
  .map((entry) => entry.name)
  .sort();
const presetExportEntries: Tests_TsconfigPresets_PresetExportEntries = Object.entries(packageExports)
  .filter((entry) => entry[0].startsWith(presetExportPrefix) === true)
  .sort((entryA, entryB) => entryA[0].localeCompare(entryB[0]));
const exportedPresetFilenames: Tests_TsconfigPresets_ExportedPresetFilenames = presetExportEntries
  .map((entry) => entry[0].slice(presetExportPrefix.length));

/**
 * Tests - Tsconfig Presets - TSConfig Preset Contract.
 *
 * Keeps Nova's complete source-preset inventory aligned with its public package exports
 * and validates every preset through the supported TypeScript compiler. The inventory is
 * discovered at runtime so adding, renaming, or removing any preset automatically exercises
 * the same contract instead of requiring a preset-specific regression.
 *
 * @since 0.26.0
 */
describe('TSConfig preset contract', () => {
  it('exports every source preset without stale public entries', () => {
    const sourcePresetCount: Tests_TsconfigPresets_TSConfigPresetContract_ExportsEverySourcePresetWithoutStalePublicEntries_SourcePresetCount = sourcePresetFilenames.length;

    notStrictEqual(sourcePresetCount, 0, 'Expected Nova to contain at least one TSConfig preset source file.');
    deepStrictEqual(exportedPresetFilenames, sourcePresetFilenames, `TSConfig source presets and public package exports differ. Source: ${sourcePresetFilenames.join(', ')}. Exports: ${exportedPresetFilenames.join(', ')}.`);

    return;
  });

  it('maps every public export to its build copy', () => {
    const mismatches: Tests_TsconfigPresets_TSConfigPresetContract_MapsEveryPublicExportToItsBuildCopy_Mismatches = [];

    for (const rawPresetExportEntry of presetExportEntries) {
      const presetExportEntry: Tests_TsconfigPresets_PresetExportEntry = rawPresetExportEntry;
      const exportSubpath: Tests_TsconfigPresets_ExportSubpath = presetExportEntry[0];
      const exportTarget: Tests_TsconfigPresets_ExportTarget = presetExportEntry[1];
      const presetFilename: Tests_TsconfigPresets_PresetFilename = exportSubpath.slice(presetExportPrefix.length);
      const expectedExportTarget: Tests_TsconfigPresets_ExpectedExportTarget = `${presetBuildPrefix}${presetFilename}`;

      if (exportTarget !== expectedExportTarget) {
        mismatches.push(`${exportSubpath} points to ${String(exportTarget)} instead of ${expectedExportTarget}`);
      }
    }

    deepStrictEqual(mismatches, [], [
      'TSConfig preset export targets do not match the build-copy contract:',
      ...mismatches,
    ].join('\n'));

    return;
  });

  it('loads every source preset through TypeScript without configuration diagnostics', () => {
    const diagnostics: Tests_TsconfigPresets_TSConfigPresetContract_LoadsEverySourcePresetThroughTypeScriptWithoutConfigurationDiagnostics_Diagnostics = [];

    for (const rawSourcePresetFilename of sourcePresetFilenames) {
      const sourcePresetFilename: Tests_TsconfigPresets_SourcePresetFilename = rawSourcePresetFilename;
      const sourcePresetPath: Tests_TsconfigPresets_SourcePresetPath = join(sourcePresetDirectory, sourcePresetFilename);
      const readResult: Tests_TsconfigPresets_ReadResult = readConfigFile(sourcePresetPath, sys.readFile);

      if (readResult['error'] !== undefined) {
        const readDiagnosticMessage: Tests_TsconfigPresets_ReadDiagnosticMessage = flattenDiagnosticMessageText(readResult['error']['messageText'], '\n');

        diagnostics.push(`${sourcePresetFilename}: ${readDiagnosticMessage}`);

        continue;
      }

      const presetConfig: Tests_TsconfigPresets_PresetConfig = readResult['config'] ?? {};

      if (isPlainObject(presetConfig['compilerOptions']) !== true) {
        diagnostics.push(`${sourcePresetFilename}: expected a compilerOptions object`);

        continue;
      }

      const compilerOptions: Tests_TsconfigPresets_CompilerOptions = presetConfig['compilerOptions'];
      const conversionResult: Tests_TsconfigPresets_ConversionResult = convertCompilerOptionsFromJson(compilerOptions, sourcePresetDirectory, sourcePresetPath);

      for (const rawDiagnostic of conversionResult['errors']) {
        const diagnostic: Tests_TsconfigPresets_Diagnostic = rawDiagnostic;
        const diagnosticMessage: Tests_TsconfigPresets_DiagnosticMessage = flattenDiagnosticMessageText(diagnostic['messageText'], '\n');

        diagnostics.push(`${sourcePresetFilename}: ${diagnosticMessage}`);
      }
    }

    deepStrictEqual(diagnostics, [], [
      'Invalid TSConfig presets:',
      ...diagnostics,
    ].join('\n'));

    return;
  });

  return;
});

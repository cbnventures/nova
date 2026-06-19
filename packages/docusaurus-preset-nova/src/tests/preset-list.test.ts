import { strictEqual } from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import {
  LIB_REGEX_PRESET_PATH_SEGMENT,
  LIB_REGEX_SHARED_PRESET_NAME_TYPE,
  LIB_REGEX_SINGLE_QUOTED_STRING,
} from '../lib/regex.js';
import { presetsIndexNames, presetsIndexPresets } from '../presets/index.js';

import type {
  Tests_PresetList_ExtractSharedPresetNameLiterals_Capture,
  Tests_PresetList_ExtractSharedPresetNameLiterals_Content,
  Tests_PresetList_ExtractSharedPresetNameLiterals_FilePath,
  Tests_PresetList_ExtractSharedPresetNameLiterals_LiteralPattern,
  Tests_PresetList_ExtractSharedPresetNameLiterals_Literals,
  Tests_PresetList_ExtractSharedPresetNameLiterals_Match,
  Tests_PresetList_ExtractSharedPresetNameLiterals_Returns,
  Tests_PresetList_ExtractSharedPresetNameLiterals_Rhs,
  Tests_PresetList_ExtractSharedPresetNameLiterals_TypeMatch,
  Tests_PresetList_ExtractTokenMapPresets_Capture,
  Tests_PresetList_ExtractTokenMapPresets_Content,
  Tests_PresetList_ExtractTokenMapPresets_FilePath,
  Tests_PresetList_ExtractTokenMapPresets_Match,
  Tests_PresetList_ExtractTokenMapPresets_Pattern,
  Tests_PresetList_ExtractTokenMapPresets_Presets,
  Tests_PresetList_ExtractTokenMapPresets_Returns,
  Tests_PresetList_GetPackageRoot_CurrentFileDirectory,
  Tests_PresetList_GetPackageRoot_CurrentFilePath,
  Tests_PresetList_GetPackageRoot_Returns,
  Tests_PresetList_ListPresetDirectories_Entries,
  Tests_PresetList_ListPresetDirectories_Names,
  Tests_PresetList_ListPresetDirectories_Returns,
  Tests_PresetList_ListPresetDirectories_Root,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_ExpectedSet,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Extra,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Filesystem,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_FilesystemSet,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Message,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Missing,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_PresetsRoot,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_ExpectedSet,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Extra,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Filesystem,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_FilesystemSet,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Message,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Missing,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_PresetsRoot,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_ExpectedSet,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Extra,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Filesystem,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_FilesystemSet,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Literals,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Message,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Missing,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_PresetsRoot,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_SharedTypeFilePath,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_ExpectedSet,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Extra,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Filesystem,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_FilesystemSet,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Message,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Missing,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Presets,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_PresetsRoot,
  Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_TokenMapTestFilePath,
  Tests_PresetList_PresetList_SamplePreset,
} from '../types/tests/preset-list.test.d.ts';

/**
 * Tests - Preset List - Extract Shared Preset Name Literals.
 *
 * Reads the supplied `.d.ts` file and returns the literal
 * union members of the `Shared_PresetName` declaration so
 * the drift test can compare type-level intent against the
 * filesystem and the runtime registry.
 *
 * @since 0.18.0
 */
async function extractSharedPresetNameLiterals(filePath: Tests_PresetList_ExtractSharedPresetNameLiterals_FilePath): Tests_PresetList_ExtractSharedPresetNameLiterals_Returns {
  const content: Tests_PresetList_ExtractSharedPresetNameLiterals_Content = await readFile(filePath, 'utf-8');
  const typeMatch: Tests_PresetList_ExtractSharedPresetNameLiterals_TypeMatch = content.match(LIB_REGEX_SHARED_PRESET_NAME_TYPE);

  if (typeMatch === null || typeMatch[1] === undefined) {
    return [];
  }

  const rhs: Tests_PresetList_ExtractSharedPresetNameLiterals_Rhs = typeMatch[1];
  const literalPattern: Tests_PresetList_ExtractSharedPresetNameLiterals_LiteralPattern = new RegExp(LIB_REGEX_SINGLE_QUOTED_STRING.source, 'g');
  const literals: Tests_PresetList_ExtractSharedPresetNameLiterals_Literals = [];

  let match: Tests_PresetList_ExtractSharedPresetNameLiterals_Match = literalPattern.exec(rhs);

  while (match !== null) {
    const capture: Tests_PresetList_ExtractSharedPresetNameLiterals_Capture = match[1];

    if (capture !== undefined) {
      literals.push(capture);
    }

    match = literalPattern.exec(rhs);
  }

  return literals;
}

/**
 * Tests - Preset List - Extract Token Map Presets.
 *
 * Reads `token-map.test.ts` and captures every preset name
 * referenced via a `presets/<name>/preset.css` path so the
 * test can verify the expectations match the filesystem.
 *
 * @since 0.18.0
 */
async function extractTokenMapPresets(filePath: Tests_PresetList_ExtractTokenMapPresets_FilePath): Tests_PresetList_ExtractTokenMapPresets_Returns {
  const content: Tests_PresetList_ExtractTokenMapPresets_Content = await readFile(filePath, 'utf-8');
  const pattern: Tests_PresetList_ExtractTokenMapPresets_Pattern = new RegExp(LIB_REGEX_PRESET_PATH_SEGMENT.source, 'g');
  const presets: Tests_PresetList_ExtractTokenMapPresets_Presets = [];

  let match: Tests_PresetList_ExtractTokenMapPresets_Match = pattern.exec(content);

  while (match !== null) {
    const capture: Tests_PresetList_ExtractTokenMapPresets_Capture = match[1];

    if (capture !== undefined) {
      presets.push(capture);
    }

    match = pattern.exec(content);
  }

  return presets;
}

/**
 * Tests - Preset List - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @since 0.18.0
 */
function getPackageRoot(): Tests_PresetList_GetPackageRoot_Returns {
  const currentFilePath: Tests_PresetList_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_PresetList_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Preset List - List Preset Directories.
 *
 * Lists the immediate child directories of a preset root,
 * dropping non-directory entries so the comparison set
 * matches what a contributor would consider a preset.
 *
 * @since 0.18.0
 */
async function listPresetDirectories(root: Tests_PresetList_ListPresetDirectories_Root): Tests_PresetList_ListPresetDirectories_Returns {
  const entries: Tests_PresetList_ListPresetDirectories_Entries = await readdir(root, { withFileTypes: true });
  const names: Tests_PresetList_ListPresetDirectories_Names = [];

  for (const entry of entries) {
    if (entry.isDirectory() === true) {
      names.push(entry.name);
    }
  }

  return names;
}

/**
 * Tests - Preset List - Preset List.
 *
 * Four meta-checks confirm that every preset enumeration
 * site agrees with the filesystem:
 *
 *   1. Runtime `presetsIndexNames` array.
 *   2. Runtime `presetsIndexPresets` record keys.
 *   3. Type-level `Shared_PresetName` union literals.
 *   4. `token-map.test.ts` expectations preset references.
 *
 * The first three exclude the `sample/` scaffold; the
 * fourth includes it because the token map intentionally
 * exercises sample's placeholder tokens.
 *
 * @since 0.18.0
 */
describe('preset list', () => {
  const samplePreset: Tests_PresetList_PresetList_SamplePreset = 'sample';

  it('filesystem preset directories match presetsIndexNames (excluding sample scaffold)', async () => {
    const presetsRoot: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_PresetsRoot = resolve(getPackageRoot(), 'src', 'styles', 'presets');
    const filesystem: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Filesystem = await listPresetDirectories(presetsRoot);
    const filesystemSet: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_FilesystemSet = new Set(filesystem.filter((name) => name !== samplePreset));
    const expectedSet: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_ExpectedSet = new Set(presetsIndexNames);
    const missing: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Missing = [...filesystemSet].filter((name) => expectedSet.has(name) === false);
    const extra: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Extra = [...expectedSet].filter((name) => filesystemSet.has(name) === false);
    const message: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexNamesExcludingSampleScaffold_Message = [
      'presetsIndexNames drift vs filesystem (sample excluded):',
      `  On disk but not in presetsIndexNames: ${missing.length}`,
      ...missing.map((name) => `    + ${name}`),
      `  In presetsIndexNames but not on disk: ${extra.length}`,
      ...extra.map((name) => `    - ${name}`),
    ].join('\n');

    strictEqual(missing.length + extra.length, 0, message);

    return;
  });

  it('filesystem preset directories match presetsIndexPresets keys (excluding sample scaffold)', async () => {
    const presetsRoot: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_PresetsRoot = resolve(getPackageRoot(), 'src', 'styles', 'presets');
    const filesystem: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Filesystem = await listPresetDirectories(presetsRoot);
    const filesystemSet: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_FilesystemSet = new Set(filesystem.filter((name) => name !== samplePreset));
    const expectedSet: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_ExpectedSet = new Set(Object.keys(presetsIndexPresets));
    const missing: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Missing = [...filesystemSet].filter((name) => expectedSet.has(name) === false);
    const extra: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Extra = [...expectedSet].filter((name) => filesystemSet.has(name) === false);
    const message: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchPresetsIndexPresetsKeysExcludingSampleScaffold_Message = [
      'presetsIndexPresets drift vs filesystem (sample excluded):',
      `  On disk but not in presetsIndexPresets: ${missing.length}`,
      ...missing.map((name) => `    + ${name}`),
      `  In presetsIndexPresets but not on disk: ${extra.length}`,
      ...extra.map((name) => `    - ${name}`),
    ].join('\n');

    strictEqual(missing.length + extra.length, 0, message);

    return;
  });

  it('filesystem preset directories match Shared_PresetName union literals (excluding sample scaffold)', async () => {
    const presetsRoot: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_PresetsRoot = resolve(getPackageRoot(), 'src', 'styles', 'presets');
    const filesystem: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Filesystem = await listPresetDirectories(presetsRoot);
    const filesystemSet: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_FilesystemSet = new Set(filesystem.filter((name) => name !== samplePreset));
    const sharedTypeFilePath: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_SharedTypeFilePath = resolve(getPackageRoot(), 'src', 'types', 'shared.d.ts');
    const literals: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Literals = await extractSharedPresetNameLiterals(sharedTypeFilePath);
    const expectedSet: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_ExpectedSet = new Set(literals);
    const missing: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Missing = [...filesystemSet].filter((name) => expectedSet.has(name) === false);
    const extra: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Extra = [...expectedSet].filter((name) => filesystemSet.has(name) === false);
    const message: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchSharedPresetNameUnionLiteralsExcludingSampleScaffold_Message = [
      'Shared_PresetName drift vs filesystem (sample excluded):',
      `  On disk but not in Shared_PresetName: ${missing.length}`,
      ...missing.map((name) => `    + ${name}`),
      `  In Shared_PresetName but not on disk: ${extra.length}`,
      ...extra.map((name) => `    - ${name}`),
    ].join('\n');

    strictEqual(missing.length + extra.length, 0, message);

    return;
  });

  it('filesystem preset directories match token-map expectations (including sample scaffold)', async () => {
    const presetsRoot: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_PresetsRoot = resolve(getPackageRoot(), 'src', 'styles', 'presets');
    const filesystem: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Filesystem = await listPresetDirectories(presetsRoot);
    const filesystemSet: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_FilesystemSet = new Set(filesystem);
    const tokenMapTestFilePath: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_TokenMapTestFilePath = resolve(getPackageRoot(), 'src', 'tests', 'token-map.test.ts');
    const presets: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Presets = await extractTokenMapPresets(tokenMapTestFilePath);
    const expectedSet: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_ExpectedSet = new Set(presets);
    const missing: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Missing = [...filesystemSet].filter((name) => expectedSet.has(name) === false);
    const extra: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Extra = [...expectedSet].filter((name) => filesystemSet.has(name) === false);
    const message: Tests_PresetList_PresetList_FilesystemPresetDirectoriesMatchTokenMapExpectationsIncludingSampleScaffold_Message = [
      'token-map drift vs filesystem (sample included):',
      `  On disk but not in token-map expectations: ${missing.length}`,
      ...missing.map((name) => `    + ${name}`),
      `  In token-map expectations but not on disk: ${extra.length}`,
      ...extra.map((name) => `    - ${name}`),
    ].join('\n');

    strictEqual(missing.length + extra.length, 0, message);

    return;
  });

  return;
});

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
  TestsPresetListExtractSharedPresetNameLiteralsCapture,
  TestsPresetListExtractSharedPresetNameLiteralsContent,
  TestsPresetListExtractSharedPresetNameLiteralsFilePath,
  TestsPresetListExtractSharedPresetNameLiteralsLiteralPattern,
  TestsPresetListExtractSharedPresetNameLiteralsLiterals,
  TestsPresetListExtractSharedPresetNameLiteralsMatch,
  TestsPresetListExtractSharedPresetNameLiteralsReturns,
  TestsPresetListExtractSharedPresetNameLiteralsRhs,
  TestsPresetListExtractSharedPresetNameLiteralsTypeMatch,
  TestsPresetListExtractTokenMapPresetsCapture,
  TestsPresetListExtractTokenMapPresetsContent,
  TestsPresetListExtractTokenMapPresetsFilePath,
  TestsPresetListExtractTokenMapPresetsMatch,
  TestsPresetListExtractTokenMapPresetsPattern,
  TestsPresetListExtractTokenMapPresetsPresets,
  TestsPresetListExtractTokenMapPresetsReturns,
  TestsPresetListGetPackageRootCurrentFileDirectory,
  TestsPresetListGetPackageRootCurrentFilePath,
  TestsPresetListGetPackageRootReturns,
  TestsPresetListListPresetDirectoriesEntries,
  TestsPresetListListPresetDirectoriesNames,
  TestsPresetListListPresetDirectoriesReturns,
  TestsPresetListListPresetDirectoriesRoot,
  TestsPresetListPresetListExpectedSet,
  TestsPresetListPresetListExtra,
  TestsPresetListPresetListFilesystem,
  TestsPresetListPresetListFilesystemSet,
  TestsPresetListPresetListLiterals,
  TestsPresetListPresetListMessage,
  TestsPresetListPresetListMissing,
  TestsPresetListPresetListPresets,
  TestsPresetListPresetListPresetsRoot,
  TestsPresetListPresetListSamplePreset,
  TestsPresetListPresetListSharedTypeFilePath,
  TestsPresetListPresetListTokenMapTestFilePath,
} from '../types/tests/preset-list.test.d.ts';

/**
 * Tests - Preset List - Extract Shared Preset Name Literals.
 *
 * Reads the supplied `.d.ts` file and returns the literal
 * union members of the `SharedPresetName` declaration so
 * the drift test can compare type-level intent against the
 * filesystem and the runtime registry.
 *
 * @since 0.18.0
 */
async function extractSharedPresetNameLiterals(filePath: TestsPresetListExtractSharedPresetNameLiteralsFilePath): TestsPresetListExtractSharedPresetNameLiteralsReturns {
  const content: TestsPresetListExtractSharedPresetNameLiteralsContent = await readFile(filePath, 'utf-8');
  const typeMatch: TestsPresetListExtractSharedPresetNameLiteralsTypeMatch = content.match(LIB_REGEX_SHARED_PRESET_NAME_TYPE);

  if (typeMatch === null || typeMatch[1] === undefined) {
    return [];
  }

  const rhs: TestsPresetListExtractSharedPresetNameLiteralsRhs = typeMatch[1];
  const literalPattern: TestsPresetListExtractSharedPresetNameLiteralsLiteralPattern = new RegExp(LIB_REGEX_SINGLE_QUOTED_STRING.source, 'g');
  const literals: TestsPresetListExtractSharedPresetNameLiteralsLiterals = [];

  let match: TestsPresetListExtractSharedPresetNameLiteralsMatch = literalPattern.exec(rhs);

  while (match !== null) {
    const capture: TestsPresetListExtractSharedPresetNameLiteralsCapture = match[1];

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
async function extractTokenMapPresets(filePath: TestsPresetListExtractTokenMapPresetsFilePath): TestsPresetListExtractTokenMapPresetsReturns {
  const content: TestsPresetListExtractTokenMapPresetsContent = await readFile(filePath, 'utf-8');
  const pattern: TestsPresetListExtractTokenMapPresetsPattern = new RegExp(LIB_REGEX_PRESET_PATH_SEGMENT.source, 'g');
  const presets: TestsPresetListExtractTokenMapPresetsPresets = [];

  let match: TestsPresetListExtractTokenMapPresetsMatch = pattern.exec(content);

  while (match !== null) {
    const capture: TestsPresetListExtractTokenMapPresetsCapture = match[1];

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
function getPackageRoot(): TestsPresetListGetPackageRootReturns {
  const currentFilePath: TestsPresetListGetPackageRootCurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: TestsPresetListGetPackageRootCurrentFileDirectory = dirname(currentFilePath);

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
async function listPresetDirectories(root: TestsPresetListListPresetDirectoriesRoot): TestsPresetListListPresetDirectoriesReturns {
  const entries: TestsPresetListListPresetDirectoriesEntries = await readdir(root, { withFileTypes: true });
  const names: TestsPresetListListPresetDirectoriesNames = [];

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
 *   3. Type-level `SharedPresetName` union literals.
 *   4. `token-map.test.ts` expectations preset references.
 *
 * The first three exclude the `sample/` scaffold; the
 * fourth includes it because the token map intentionally
 * exercises sample's placeholder tokens.
 *
 * @since 0.18.0
 */
describe('preset list', () => {
  const samplePreset: TestsPresetListPresetListSamplePreset = 'sample';

  it('filesystem preset directories match presetsIndexNames (excluding sample scaffold)', async () => {
    const presetsRoot: TestsPresetListPresetListPresetsRoot = resolve(getPackageRoot(), 'src', 'styles', 'presets');
    const filesystem: TestsPresetListPresetListFilesystem = await listPresetDirectories(presetsRoot);
    const filesystemSet: TestsPresetListPresetListFilesystemSet = new Set(filesystem.filter((name) => name !== samplePreset));
    const expectedSet: TestsPresetListPresetListExpectedSet = new Set(presetsIndexNames);
    const missing: TestsPresetListPresetListMissing = [...filesystemSet].filter((name) => expectedSet.has(name) === false);
    const extra: TestsPresetListPresetListExtra = [...expectedSet].filter((name) => filesystemSet.has(name) === false);
    const message: TestsPresetListPresetListMessage = [
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
    const presetsRoot: TestsPresetListPresetListPresetsRoot = resolve(getPackageRoot(), 'src', 'styles', 'presets');
    const filesystem: TestsPresetListPresetListFilesystem = await listPresetDirectories(presetsRoot);
    const filesystemSet: TestsPresetListPresetListFilesystemSet = new Set(filesystem.filter((name) => name !== samplePreset));
    const expectedSet: TestsPresetListPresetListExpectedSet = new Set(Object.keys(presetsIndexPresets));
    const missing: TestsPresetListPresetListMissing = [...filesystemSet].filter((name) => expectedSet.has(name) === false);
    const extra: TestsPresetListPresetListExtra = [...expectedSet].filter((name) => filesystemSet.has(name) === false);
    const message: TestsPresetListPresetListMessage = [
      'presetsIndexPresets drift vs filesystem (sample excluded):',
      `  On disk but not in presetsIndexPresets: ${missing.length}`,
      ...missing.map((name) => `    + ${name}`),
      `  In presetsIndexPresets but not on disk: ${extra.length}`,
      ...extra.map((name) => `    - ${name}`),
    ].join('\n');

    strictEqual(missing.length + extra.length, 0, message);

    return;
  });

  it('filesystem preset directories match SharedPresetName union literals (excluding sample scaffold)', async () => {
    const presetsRoot: TestsPresetListPresetListPresetsRoot = resolve(getPackageRoot(), 'src', 'styles', 'presets');
    const filesystem: TestsPresetListPresetListFilesystem = await listPresetDirectories(presetsRoot);
    const filesystemSet: TestsPresetListPresetListFilesystemSet = new Set(filesystem.filter((name) => name !== samplePreset));
    const sharedTypeFilePath: TestsPresetListPresetListSharedTypeFilePath = resolve(getPackageRoot(), 'src', 'types', 'shared.d.ts');
    const literals: TestsPresetListPresetListLiterals = await extractSharedPresetNameLiterals(sharedTypeFilePath);
    const expectedSet: TestsPresetListPresetListExpectedSet = new Set(literals);
    const missing: TestsPresetListPresetListMissing = [...filesystemSet].filter((name) => expectedSet.has(name) === false);
    const extra: TestsPresetListPresetListExtra = [...expectedSet].filter((name) => filesystemSet.has(name) === false);
    const message: TestsPresetListPresetListMessage = [
      'SharedPresetName drift vs filesystem (sample excluded):',
      `  On disk but not in SharedPresetName: ${missing.length}`,
      ...missing.map((name) => `    + ${name}`),
      `  In SharedPresetName but not on disk: ${extra.length}`,
      ...extra.map((name) => `    - ${name}`),
    ].join('\n');

    strictEqual(missing.length + extra.length, 0, message);

    return;
  });

  it('filesystem preset directories match token-map expectations (including sample scaffold)', async () => {
    const presetsRoot: TestsPresetListPresetListPresetsRoot = resolve(getPackageRoot(), 'src', 'styles', 'presets');
    const filesystem: TestsPresetListPresetListFilesystem = await listPresetDirectories(presetsRoot);
    const filesystemSet: TestsPresetListPresetListFilesystemSet = new Set(filesystem);
    const tokenMapTestFilePath: TestsPresetListPresetListTokenMapTestFilePath = resolve(getPackageRoot(), 'src', 'tests', 'token-map.test.ts');
    const presets: TestsPresetListPresetListPresets = await extractTokenMapPresets(tokenMapTestFilePath);
    const expectedSet: TestsPresetListPresetListExpectedSet = new Set(presets);
    const missing: TestsPresetListPresetListMissing = [...filesystemSet].filter((name) => expectedSet.has(name) === false);
    const extra: TestsPresetListPresetListExtra = [...expectedSet].filter((name) => filesystemSet.has(name) === false);
    const message: TestsPresetListPresetListMessage = [
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

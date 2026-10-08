import { notStrictEqual, strictEqual } from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { globSync } from 'glob';
import { beforeAll, describe, it } from 'vitest';

import type {
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_Manifest,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_NovaDependency,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_ScaffoldDependencies,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_ScaffoldManifest,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_ScaffoldManifestPath,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifest,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestPath,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestRaw,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaVersion,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PackageDirectory,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_PresetDependency,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_ScaffoldDependencies,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_ScaffoldManifest,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_ScaffoldManifestPath,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestIndex,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestPaths,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestRaw,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifests,
} from '../types/tests/scaffold-version-drift.test.d.ts';

/**
 * Tests - Scaffold Version Drift - Scaffold Version Drift.
 *
 * Pins every scaffold template's @cbnventures/nova dependency and any
 * @cbnventures/docusaurus-preset-nova dependency to the current Nova version,
 * so generated projects never begin with drifted package references.
 *
 * @since 0.20.0
 */
describe('scaffold version drift', () => {
  const packageDirectory: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PackageDirectory = join(fileURLToPath(import.meta.url), '..', '..', '..');
  const scaffoldManifestPaths: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestPaths = globSync('templates/scaffold/**/package.json', {
    absolute: true,
    cwd: packageDirectory,
  }).sort();
  const novaManifestPath: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestPath = join(packageDirectory, 'package.json');

  const novaManifestRaw: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestRaw = readFileSync(novaManifestPath, 'utf-8');

  const scaffoldManifests: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifests = scaffoldManifestPaths.map((scaffoldManifestPath) => {
    const scaffoldManifestRaw: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestRaw = readFileSync(scaffoldManifestPath, 'utf-8');

    return JSON.parse(scaffoldManifestRaw) as Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_Manifest;
  });
  const novaManifest: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifest = JSON.parse(novaManifestRaw);

  const novaVersion: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaVersion = novaManifest['version'] ?? '';

  beforeAll(() => {
    notStrictEqual(novaVersion, '', '@cbnventures/nova package.json is missing a "version" field; cannot verify scaffold drift.');

    return;
  });

  it('nova dependency matches the current version', () => {
    for (let index: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestIndex = 0; index < scaffoldManifests.length; index += 1) {
      const scaffoldManifestPath: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_ScaffoldManifestPath = scaffoldManifestPaths[index] ?? '';
      const scaffoldManifest: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_ScaffoldManifest = scaffoldManifests[index] ?? {};
      const scaffoldDependencies: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_ScaffoldDependencies = {
        ...(scaffoldManifest['dependencies'] ?? {}),
        ...(scaffoldManifest['devDependencies'] ?? {}),
      };
      const novaDependency: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_NovaDependency = scaffoldDependencies['@cbnventures/nova'] ?? '';

      strictEqual(novaDependency, novaVersion, `Scaffold @cbnventures/nova dependency (${novaDependency}) must exactly match the current Nova version (${novaVersion}) in ${scaffoldManifestPath}.`);
    }

    return;
  });

  it('preset dependency matches the current version', () => {
    for (let index: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestIndex = 0; index < scaffoldManifests.length; index += 1) {
      const scaffoldManifestPath: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_ScaffoldManifestPath = scaffoldManifestPaths[index] ?? '';
      const scaffoldManifest: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_ScaffoldManifest = scaffoldManifests[index] ?? {};
      const scaffoldDependencies: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_ScaffoldDependencies = {
        ...(scaffoldManifest['dependencies'] ?? {}),
        ...(scaffoldManifest['devDependencies'] ?? {}),
      };
      const presetDependency: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_PresetDependency = scaffoldDependencies['@cbnventures/docusaurus-preset-nova'];

      if (presetDependency === undefined) {
        continue;
      }

      strictEqual(presetDependency, novaVersion, `Scaffold @cbnventures/docusaurus-preset-nova dependency (${presetDependency}) must exactly match the current Nova version (${novaVersion}) in ${scaffoldManifestPath}.`);
    }

    return;
  });

  return;
});

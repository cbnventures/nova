import { notStrictEqual, strictEqual } from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { beforeAll, describe, it } from 'vitest';

import type {
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_NovaDependency,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifest,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestPath,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestRaw,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaVersion,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PackageDirectory,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_PresetDependency,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldDependencies,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifest,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestPath,
  Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestRaw,
} from '../types/tests/scaffold-version-drift.test.d.ts';

/**
 * Tests - Scaffold Version Drift - Scaffold Version Drift.
 *
 * Pins the scaffolded Docusaurus project's @cbnventures/nova and
 * @cbnventures/docusaurus-preset-nova dependencies to the current nova
 * version, so a freshly scaffolded site never ships an outdated or
 * drifted package reference. Bumped alongside the packages at release.
 *
 * @since 0.20.0
 */
describe('scaffold version drift', () => {
  const packageDirectory: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PackageDirectory = join(fileURLToPath(import.meta.url), '..', '..', '..');
  const scaffoldManifestPath: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestPath = join(packageDirectory, 'templates', 'scaffold', 'docs', 'docusaurus', 'package.json');
  const novaManifestPath: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestPath = join(packageDirectory, 'package.json');

  const scaffoldManifestRaw: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifestRaw = readFileSync(scaffoldManifestPath, 'utf-8');
  const novaManifestRaw: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifestRaw = readFileSync(novaManifestPath, 'utf-8');

  const scaffoldManifest: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldManifest = JSON.parse(scaffoldManifestRaw);
  const novaManifest: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaManifest = JSON.parse(novaManifestRaw);

  const novaVersion: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaVersion = novaManifest['version'] ?? '';

  const scaffoldDependencies: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_ScaffoldDependencies = {
    ...(scaffoldManifest['dependencies'] ?? {}),
    ...(scaffoldManifest['devDependencies'] ?? {}),
  };

  beforeAll(() => {
    notStrictEqual(novaVersion, '', '@cbnventures/nova package.json is missing a "version" field; cannot verify scaffold drift.');

    return;
  });

  it('nova dependency matches the current version', () => {
    const novaDependency: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_NovaDependencyMatchesTheCurrentVersion_NovaDependency = scaffoldDependencies['@cbnventures/nova'] ?? '';

    strictEqual(novaDependency, novaVersion, `Scaffold @cbnventures/nova dependency (${novaDependency}) must exactly match the current nova version (${novaVersion}). Bump it in packages/nova/templates/scaffold/docs/docusaurus/package.json to ${novaVersion}.`);

    return;
  });

  it('preset dependency matches the current version', () => {
    const presetDependency: Tests_ScaffoldVersionDrift_ScaffoldVersionDrift_PresetDependencyMatchesTheCurrentVersion_PresetDependency = scaffoldDependencies['@cbnventures/docusaurus-preset-nova'] ?? '';

    strictEqual(presetDependency, novaVersion, `Scaffold @cbnventures/docusaurus-preset-nova dependency (${presetDependency}) must exactly match the current nova version (${novaVersion}). Bump it in packages/nova/templates/scaffold/docs/docusaurus/package.json to ${novaVersion}.`);

    return;
  });

  return;
});

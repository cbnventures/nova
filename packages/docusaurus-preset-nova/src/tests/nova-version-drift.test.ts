import { notStrictEqual, strictEqual } from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { beforeAll, describe, it } from 'vitest';

import type {
  TestsNovaVersionDriftNovaVersionDriftManifest,
  TestsNovaVersionDriftNovaVersionDriftManifestPath,
  TestsNovaVersionDriftNovaVersionDriftManifestRaw,
  TestsNovaVersionDriftNovaVersionDriftVersion,
} from '../types/tests/nova-version-drift.test.d.ts';

/**
 * Tests - Nova Version Drift - Nova Version Drift.
 *
 * Pins the docusaurus-preset-nova package to the neighboring
 * @cbnventures/nova package. Both publish together, so the preset's
 * declared dependency must always match nova's current version.
 *
 * @since 0.17.1
 */
describe('nova version drift', () => {
  const packageDirectory: TestsNovaVersionDriftNovaVersionDriftManifestPath = join(fileURLToPath(import.meta.url), '..', '..', '..');
  const presetManifestPath: TestsNovaVersionDriftNovaVersionDriftManifestPath = join(packageDirectory, 'package.json');
  const novaManifestPath: TestsNovaVersionDriftNovaVersionDriftManifestPath = join(packageDirectory, '..', 'nova', 'package.json');

  const presetManifestRaw: TestsNovaVersionDriftNovaVersionDriftManifestRaw = readFileSync(presetManifestPath, 'utf-8');
  const novaManifestRaw: TestsNovaVersionDriftNovaVersionDriftManifestRaw = readFileSync(novaManifestPath, 'utf-8');

  const presetManifest: TestsNovaVersionDriftNovaVersionDriftManifest = JSON.parse(presetManifestRaw);
  const novaManifest: TestsNovaVersionDriftNovaVersionDriftManifest = JSON.parse(novaManifestRaw);

  const novaVersion: TestsNovaVersionDriftNovaVersionDriftVersion = novaManifest['version'] ?? '';

  beforeAll(() => {
    notStrictEqual(novaVersion, '', '@cbnventures/nova package.json is missing a "version" field; cannot verify drift.');

    return;
  });

  it('matches the neighboring @cbnventures/nova package version', () => {
    const presetNovaDependency: TestsNovaVersionDriftNovaVersionDriftVersion = (presetManifest['dependencies'] ?? {})['@cbnventures/nova'] ?? '';

    strictEqual(presetNovaDependency, novaVersion, `@cbnventures/nova dependency (${presetNovaDependency}) must match neighbor nova version (${novaVersion}). Bump the dependency in packages/docusaurus-preset-nova/package.json to ${novaVersion}.`);

    return;
  });

  it('preset version matches the neighboring @cbnventures/nova version', () => {
    const presetVersion: TestsNovaVersionDriftNovaVersionDriftVersion = presetManifest['version'] ?? '';

    strictEqual(presetVersion, novaVersion, `docusaurus-preset-nova version (${presetVersion}) must match neighbor nova version (${novaVersion}). The monorepo ships both packages at the same version.`);

    return;
  });

  return;
});

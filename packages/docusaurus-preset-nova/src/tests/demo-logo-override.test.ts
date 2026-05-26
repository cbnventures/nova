import { ok, strictEqual } from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { describe, it } from 'vitest';

import { presetsIndexNames } from '../presets/index.js';

import type {
  TestsDemoLogoOverrideConfig,
  TestsDemoLogoOverrideConfigModule,
  TestsDemoLogoOverrideConfigUrl,
  TestsDemoLogoOverrideCurrentFileDirectory,
  TestsDemoLogoOverrideCurrentFilePath,
  TestsDemoLogoOverrideDemoBytes,
  TestsDemoLogoOverrideDemoLogoPath,
  TestsDemoLogoOverrideLogo,
  TestsDemoLogoOverrideLogoSrc,
  TestsDemoLogoOverrideLogoSrcLight,
  TestsDemoLogoOverridePackageRoot,
  TestsDemoLogoOverridePresetBytes,
  TestsDemoLogoOverridePresetLogoPath,
  TestsDemoLogoOverridePresetStats,
  TestsDemoLogoOverrideRepoRoot,
  TestsDemoLogoOverrideSite,
  TestsDemoLogoOverrideThemeConfig,
} from '../types/tests/demo-logo-override.test.d.ts';

const currentFilePath: TestsDemoLogoOverrideCurrentFilePath = fileURLToPath(import.meta.url);
const currentFileDirectory: TestsDemoLogoOverrideCurrentFileDirectory = dirname(currentFilePath);
const packageRoot: TestsDemoLogoOverridePackageRoot = resolve(currentFileDirectory, '..', '..');
const repoRoot: TestsDemoLogoOverrideRepoRoot = resolve(packageRoot, '..', '..');

/**
 * Tests - Demo Logo Override - Demo Logo Override.
 *
 * Enforces preset-as-source-of-truth for logo assets:
 *
 *   1. Every preset (except `sample`, which has no demo) ships
 *      a non-empty canonical logo at
 *      `assets/presets/<name>/logo.svg`. Deletion or blanking
 *      of the preset canonical fails immediately.
 *   2. Every demo ships an override at
 *      `apps/demo-<name>/static/images/logo.svg` whose bytes
 *      equal the preset canonical. Any change to the preset
 *      content must fan out to every demo override before this
 *      test passes, locking the preset as source of truth.
 *   3. Every demo's `docusaurus.config.ts` wires the override
 *      via `site.logo.src === '/images/logo.svg'`, proving the
 *      override channel from demo static asset to runtime URL
 *      actually flows.
 *
 * @since 0.18.0
 */
describe('demo logo override', () => {
  for (const presetName of presetsIndexNames) {
    const presetLogoPath: TestsDemoLogoOverridePresetLogoPath = resolve(packageRoot, 'assets', 'presets', presetName, 'logo.svg');
    const demoLogoPath: TestsDemoLogoOverrideDemoLogoPath = resolve(repoRoot, 'apps', `demo-${presetName}`, 'static', 'images', 'logo.svg');

    it(`preset '${presetName}' ships a non-empty canonical logo at assets/presets/${presetName}/logo.svg`, async () => {
      const presetStats: TestsDemoLogoOverridePresetStats = await stat(presetLogoPath);

      ok(presetStats.isFile());
      ok(presetStats.size > 0);

      return;
    });

    it(`demo-${presetName} override logo bytes equal preset canonical (preset is source of truth)`, async () => {
      const presetBytes: TestsDemoLogoOverridePresetBytes = await readFile(presetLogoPath);
      const demoBytes: TestsDemoLogoOverrideDemoBytes = await readFile(demoLogoPath);

      ok(presetBytes.equals(demoBytes));

      return;
    });

    it(`demo-${presetName} wires the override via site.logo.src.light in docusaurus.config.ts`, async () => {
      const configUrl: TestsDemoLogoOverrideConfigUrl = pathToFileURL(resolve(repoRoot, 'apps', `demo-${presetName}`, 'docusaurus.config.ts')).href;
      const moduleNamespace: TestsDemoLogoOverrideConfigModule = await import(configUrl);
      const config: TestsDemoLogoOverrideConfig = moduleNamespace['default'] as TestsDemoLogoOverrideConfig;
      const themeConfig: TestsDemoLogoOverrideThemeConfig = config['themeConfig'] as TestsDemoLogoOverrideThemeConfig;
      const site: TestsDemoLogoOverrideSite = themeConfig['site'] as TestsDemoLogoOverrideSite;
      const logo: TestsDemoLogoOverrideLogo = site['logo'] as TestsDemoLogoOverrideLogo;
      const logoSrc: TestsDemoLogoOverrideLogoSrc = logo['src'] as TestsDemoLogoOverrideLogoSrc;
      const logoSrcLight: TestsDemoLogoOverrideLogoSrcLight = logoSrc['light'];

      strictEqual(logoSrcLight, '/images/logo.svg');

      return;
    });
  }

  return;
});

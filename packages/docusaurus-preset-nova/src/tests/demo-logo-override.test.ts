import { ok, strictEqual } from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { describe, it } from 'vitest';

import { presetsIndexNames } from '../presets/index.js';

import type {
  Tests_DemoLogoOverride_Config,
  Tests_DemoLogoOverride_ConfigModule,
  Tests_DemoLogoOverride_ConfigUrl,
  Tests_DemoLogoOverride_CurrentFileDirectory,
  Tests_DemoLogoOverride_CurrentFilePath,
  Tests_DemoLogoOverride_DemoBytes,
  Tests_DemoLogoOverride_DemoLogoPath,
  Tests_DemoLogoOverride_Logo,
  Tests_DemoLogoOverride_LogoSrc,
  Tests_DemoLogoOverride_LogoSrcLight,
  Tests_DemoLogoOverride_PackageRoot,
  Tests_DemoLogoOverride_PresetBytes,
  Tests_DemoLogoOverride_PresetLogoPath,
  Tests_DemoLogoOverride_PresetStats,
  Tests_DemoLogoOverride_RepoRoot,
  Tests_DemoLogoOverride_Site,
  Tests_DemoLogoOverride_ThemeConfig,
} from '../types/tests/demo-logo-override.test.d.ts';

const currentFilePath: Tests_DemoLogoOverride_CurrentFilePath = fileURLToPath(import.meta.url);
const currentFileDirectory: Tests_DemoLogoOverride_CurrentFileDirectory = dirname(currentFilePath);
const packageRoot: Tests_DemoLogoOverride_PackageRoot = resolve(currentFileDirectory, '..', '..');
const repoRoot: Tests_DemoLogoOverride_RepoRoot = resolve(packageRoot, '..', '..');

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
    const presetLogoPath: Tests_DemoLogoOverride_PresetLogoPath = resolve(packageRoot, 'assets', 'presets', presetName, 'logo.svg');
    const demoLogoPath: Tests_DemoLogoOverride_DemoLogoPath = resolve(repoRoot, 'apps', `demo-${presetName}`, 'static', 'images', 'logo.svg');

    it(`preset '${presetName}' ships a non-empty canonical logo at assets/presets/${presetName}/logo.svg`, async () => {
      const presetStats: Tests_DemoLogoOverride_PresetStats = await stat(presetLogoPath);

      ok(presetStats.isFile());
      ok(presetStats.size > 0);

      return;
    });

    it(`demo-${presetName} override logo bytes equal preset canonical (preset is source of truth)`, async () => {
      const presetBytes: Tests_DemoLogoOverride_PresetBytes = await readFile(presetLogoPath);
      const demoBytes: Tests_DemoLogoOverride_DemoBytes = await readFile(demoLogoPath);

      ok(presetBytes.equals(demoBytes));

      return;
    });

    it(`demo-${presetName} wires the override via site.logo.src.light in docusaurus.config.ts`, async () => {
      const configUrl: Tests_DemoLogoOverride_ConfigUrl = pathToFileURL(resolve(repoRoot, 'apps', `demo-${presetName}`, 'docusaurus.config.ts')).href;
      const moduleNamespace: Tests_DemoLogoOverride_ConfigModule = await import(configUrl);
      const config: Tests_DemoLogoOverride_Config = moduleNamespace['default'] as Tests_DemoLogoOverride_Config;
      const themeConfig: Tests_DemoLogoOverride_ThemeConfig = config['themeConfig'] as Tests_DemoLogoOverride_ThemeConfig;
      const site: Tests_DemoLogoOverride_Site = themeConfig['site'] as Tests_DemoLogoOverride_Site;
      const logo: Tests_DemoLogoOverride_Logo = site['logo'] as Tests_DemoLogoOverride_Logo;
      const logoSrc: Tests_DemoLogoOverride_LogoSrc = logo['src'] as Tests_DemoLogoOverride_LogoSrc;
      const logoSrcLight: Tests_DemoLogoOverride_LogoSrcLight = logoSrc['light'];

      strictEqual(logoSrcLight, '/images/logo.svg');

      return;
    });
  }

  return;
});

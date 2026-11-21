import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  it,
} from 'vitest';

import { Runner as LibNovaConfig } from '../../lib/nova-config.js';

import type {
  Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_DropsAMinimumOutsideZeroToOneHundred_Config,
  Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_DropsAMinimumOutsideZeroToOneHundred_Loaded,
  Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_DropsAMinimumOutsideZeroToOneHundred_ProjectDirectory,
  Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_KeepsTheCoverageMinimumAndTheTsconfigRecipe_Loaded,
  Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_KeepsTheCoverageMinimumAndTheTsconfigRecipe_ProjectDirectory,
  Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_OriginalCwd,
  Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_SandboxRoot,
} from '../../types/tests/lib/nova-config-coverage.test.d.ts';

/**
 * Tests - Lib - Nova Config Coverage - ParseSettings Coverage (via Load).
 *
 * @since 0.49.0
 */
describe('parseSettings coverage (via load)', async () => {
  const originalCwd: Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_OriginalCwd = process.cwd();
  const sandboxRoot: Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_SandboxRoot = await mkdtemp(join(tmpdir(), `nova-${'coverage-settings'}-`));

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('keeps the coverage minimum and the tsconfig recipe', async () => {
    const projectDirectory: Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_KeepsTheCoverageMinimumAndTheTsconfigRecipe_ProjectDirectory = join(sandboxRoot, 'valid');

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
      recipes: {
        tsconfig: {
          'sync-references': {
            enabled: true,
          },
        },
      },
      settings: {
        coverage: {
          minimum: 87.5,
        },
      },
    }, null, 2), 'utf-8');

    process.chdir(projectDirectory);

    const loaded: Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_KeepsTheCoverageMinimumAndTheTsconfigRecipe_Loaded = await new LibNovaConfig().load();

    deepStrictEqual(loaded['settings'], {
      coverage: {
        minimum: 87.5,
      },
    });
    deepStrictEqual(loaded['recipes'], {
      tsconfig: {
        'sync-references': {
          enabled: true,
        },
      },
    });

    return;
  });

  it('drops a minimum outside zero to one hundred', async () => {
    const projectDirectory: Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_DropsAMinimumOutsideZeroToOneHundred_ProjectDirectory = join(sandboxRoot, 'invalid');

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
      settings: {
        coverage: {
          minimum: 101,
        },
        versionStrategy: 'semver',
      },
    }, null, 2), 'utf-8');

    process.chdir(projectDirectory);

    const config: Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_DropsAMinimumOutsideZeroToOneHundred_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigCoverage_ParseSettingsCoverageViaLoad_DropsAMinimumOutsideZeroToOneHundred_Loaded = await config.load();

    deepStrictEqual(loaded['settings'], {
      versionStrategy: 'semver',
    });
    ok(config.diagnostics().some((diagnostic) => diagnostic['message'].includes('"settings.coverage.minimum" field must be a number from 0 to 100')));
    strictEqual(config.diagnostics().every((diagnostic) => diagnostic['message'].includes('Unknown') === false), true);

    return;
  });

  return;
});

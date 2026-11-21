import {
  deepStrictEqual,
  strictEqual,
  throws,
} from 'node:assert/strict';
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  it,
} from 'vitest';

import VitestCoverage from '../../toolkit/vitest-coverage.js';

import type {
  Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_FixtureRoot,
  Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_LeavesThresholdsOutWithoutAMinimum_ProjectDirectory,
  Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_RejectsAMinimumOutsideZeroToOneHundred_ProjectDirectory,
  Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_UsesTheNearestConfigMinimumForEveryThreshold_ProjectDirectory,
  Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_UsesTheNearestConfigMinimumForEveryThreshold_WorkspaceDirectory,
} from '../../types/tests/toolkit/vitest-coverage.test.d.ts';

/**
 * Tests - Toolkit - Vitest Coverage - Toolkit VitestCoverage.
 *
 * @since 0.49.0
 */
describe('Toolkit VitestCoverage', () => {
  const fixtureRoot: Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_FixtureRoot = mkdtempSync(join(tmpdir(), 'nova-vitest-coverage-'));

  afterAll(() => {
    rmSync(fixtureRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('uses the nearest config minimum for every threshold', () => {
    const projectDirectory: Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_UsesTheNearestConfigMinimumForEveryThreshold_ProjectDirectory = join(fixtureRoot, 'with-minimum');
    const workspaceDirectory: Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_UsesTheNearestConfigMinimumForEveryThreshold_WorkspaceDirectory = join(projectDirectory, 'apps', 'api');

    mkdirSync(workspaceDirectory, { recursive: true });

    writeFileSync(join(projectDirectory, 'nova.config.json'), `${JSON.stringify({
      settings: {
        coverage: {
          minimum: 80,
        },
      },
    }, null, 2)}\n`);

    deepStrictEqual(VitestCoverage.options({
      startDirectory: workspaceDirectory,
    }), {
      provider: 'v8',
      reporter: [
        'text-summary',
        'json-summary',
      ],
      reportsDirectory: './coverage',
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    });

    return;
  });

  it('leaves thresholds out without a minimum', () => {
    const projectDirectory: Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_LeavesThresholdsOutWithoutAMinimum_ProjectDirectory = join(fixtureRoot, 'without-minimum');

    mkdirSync(projectDirectory, { recursive: true });

    writeFileSync(join(projectDirectory, 'nova.config.json'), '{}\n');

    deepStrictEqual(VitestCoverage.options({
      startDirectory: projectDirectory,
    }), {
      provider: 'v8',
      reporter: [
        'text-summary',
        'json-summary',
      ],
      reportsDirectory: './coverage',
    });
    strictEqual(VitestCoverage.minimum(projectDirectory), undefined);

    return;
  });

  it('rejects a minimum outside zero to one hundred', () => {
    const projectDirectory: Tests_Toolkit_VitestCoverage_ToolkitVitestCoverage_RejectsAMinimumOutsideZeroToOneHundred_ProjectDirectory = join(fixtureRoot, 'invalid-minimum');

    mkdirSync(projectDirectory, { recursive: true });

    writeFileSync(join(projectDirectory, 'nova.config.json'), `${JSON.stringify({
      settings: {
        coverage: {
          minimum: 120,
        },
      },
    }, null, 2)}\n`);

    throws(() => VitestCoverage.minimum(projectDirectory), (error) => error instanceof Error && error.message.includes('must be a number from 0 to 100'));

    return;
  });

  return;
});

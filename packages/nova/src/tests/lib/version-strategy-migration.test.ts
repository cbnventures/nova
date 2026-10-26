import { rejects, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as LibVersionStrategyMigration } from '../../lib/version-strategy-migration.js';

import type {
  Tests_Lib_VersionStrategyMigration_AndroidContent,
  Tests_Lib_VersionStrategyMigration_AndroidPath,
  Tests_Lib_VersionStrategyMigration_AppleContent,
  Tests_Lib_VersionStrategyMigration_ApplePath,
  Tests_Lib_VersionStrategyMigration_Config,
  Tests_Lib_VersionStrategyMigration_PackageA,
  Tests_Lib_VersionStrategyMigration_PackageAPath,
  Tests_Lib_VersionStrategyMigration_PackageB,
  Tests_Lib_VersionStrategyMigration_PackageBPath,
  Tests_Lib_VersionStrategyMigration_Plan,
  Tests_Lib_VersionStrategyMigration_ProjectDirectory,
  Tests_Lib_VersionStrategyMigration_SandboxRoot,
  Tests_Lib_VersionStrategyMigration_TemporaryPrefix,
  Tests_Lib_VersionStrategyMigration_UpdatedAndroid,
  Tests_Lib_VersionStrategyMigration_UpdatedApple,
  Tests_Lib_VersionStrategyMigration_UpdatedPackageA,
  Tests_Lib_VersionStrategyMigration_UpdatedPackageADependencies,
  Tests_Lib_VersionStrategyMigration_UpdatedPackageB,
} from '../../types/tests/lib/version-strategy-migration.test.d.ts';

/**
 * Tests - Lib - Version Strategy Migration - Prepare And Apply.
 *
 * @since 0.34.0
 */
describe('prepare and apply', async () => {
  const temporaryPrefix: Tests_Lib_VersionStrategyMigration_TemporaryPrefix = join(tmpdir(), `nova-${'version-strategy'}-`);
  const sandboxRoot: Tests_Lib_VersionStrategyMigration_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('migrates manifests, exact pins, and authoritative native mirrors together', async () => {
    const projectDirectory: Tests_Lib_VersionStrategyMigration_ProjectDirectory = join(sandboxRoot, 'clean-project');
    const packageAPath: Tests_Lib_VersionStrategyMigration_PackageAPath = join(projectDirectory, 'apps', 'apple', 'package.json');
    const packageBPath: Tests_Lib_VersionStrategyMigration_PackageBPath = join(projectDirectory, 'apps', 'android', 'package.json');
    const applePath: Tests_Lib_VersionStrategyMigration_ApplePath = join(projectDirectory, 'apps', 'apple', 'project.yml');
    const androidPath: Tests_Lib_VersionStrategyMigration_AndroidPath = join(projectDirectory, 'apps', 'android', 'app', 'build.gradle.kts');

    await Promise.all([
      mkdir(join(projectDirectory, '.changelog'), { recursive: true }),
      mkdir(join(projectDirectory, 'apps', 'apple'), { recursive: true }),
      mkdir(join(projectDirectory, 'apps', 'android', 'app'), { recursive: true }),
    ]);

    const packageA: Tests_Lib_VersionStrategyMigration_PackageA = {
      name: 'example-app-apple',
      version: '0.0.1',
      dependencies: {
        'example-app-android': '0.0.1',
      },
    };
    const packageB: Tests_Lib_VersionStrategyMigration_PackageB = {
      name: 'example-app-android',
      version: '0.0.1',
    };
    const appleContent: Tests_Lib_VersionStrategyMigration_AppleContent = [
      'settings:',
      '  base:',
      '    MARKETING_VERSION: "0.0.1"',
      '    CURRENT_PROJECT_VERSION: "1"',
      '',
    ].join('\n');
    const androidContent: Tests_Lib_VersionStrategyMigration_AndroidContent = [
      'android {',
      '  defaultConfig {',
      '    versionCode = 1',
      '    versionName = "0.0.1"',
      '  }',
      '}',
      '',
    ].join('\n');

    await Promise.all([
      writeFile(packageAPath, `${JSON.stringify(packageA, null, 2)}\n`, 'utf-8'),
      writeFile(packageBPath, `${JSON.stringify(packageB, null, 2)}\n`, 'utf-8'),
      writeFile(applePath, appleContent, 'utf-8'),
      writeFile(androidPath, androidContent, 'utf-8'),
    ]);

    const config: Tests_Lib_VersionStrategyMigration_Config = {
      workspaces: {
        './apps/apple': {
          name: 'example-app-apple',
          role: 'app',
          policy: 'trackable',
        },
        './apps/android': {
          name: 'example-app-android',
          role: 'app',
          policy: 'trackable',
        },
      },
      settings: {
        versionStrategy: 'calver',
      },
    };
    const plan: Tests_Lib_VersionStrategyMigration_Plan = await LibVersionStrategyMigration.prepare(projectDirectory, config, 'semver', 'calver', new Date('2026-10-20T12:00:00.000Z'));

    strictEqual(plan['writes'].length, 4);

    await LibVersionStrategyMigration.apply(plan);

    const updatedPackageA: Tests_Lib_VersionStrategyMigration_UpdatedPackageA = JSON.parse(await readFile(packageAPath, 'utf-8'));
    const updatedPackageB: Tests_Lib_VersionStrategyMigration_UpdatedPackageB = JSON.parse(await readFile(packageBPath, 'utf-8'));
    const updatedApple: Tests_Lib_VersionStrategyMigration_UpdatedApple = await readFile(applePath, 'utf-8');
    const updatedAndroid: Tests_Lib_VersionStrategyMigration_UpdatedAndroid = await readFile(androidPath, 'utf-8');

    strictEqual(updatedPackageA['version'], '2026.10.0');
    const updatedPackageADependencies: Tests_Lib_VersionStrategyMigration_UpdatedPackageADependencies = updatedPackageA['dependencies'] as Tests_Lib_VersionStrategyMigration_UpdatedPackageADependencies;

    strictEqual(updatedPackageADependencies['example-app-android'], '2026.10.0');
    strictEqual(updatedPackageB['version'], '2026.10.0');
    strictEqual(updatedApple.includes('MARKETING_VERSION: "2026.10.0"'), true);
    strictEqual(updatedApple.includes('CURRENT_PROJECT_VERSION: "1"'), true);
    strictEqual(updatedAndroid.includes('versionName = "2026.10.0"'), true);
    strictEqual(updatedAndroid.includes('versionCode = 1'), true);

    return;
  });

  it('rejects pending entries before preparing any writes', async () => {
    const projectDirectory: Tests_Lib_VersionStrategyMigration_ProjectDirectory = join(sandboxRoot, 'pending-project');

    await mkdir(join(projectDirectory, '.changelog'), { recursive: true });
    await writeFile(join(projectDirectory, '.changelog', 'pending.md'), 'pending\n', 'utf-8');

    await rejects(
      LibVersionStrategyMigration.prepare(projectDirectory, {}, 'semver', 'calver'),
      (error) => error instanceof Error && error.message.includes('pending changelog entries'),
    );

    return;
  });

  return;
});

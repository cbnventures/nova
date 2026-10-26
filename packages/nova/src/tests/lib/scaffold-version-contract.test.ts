import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  afterEach,
  describe,
  it,
} from 'vitest';

import { Runner as CliScaffoldAppExpressjs } from '../../cli/scaffold/app/expressjs.js';

import type {
  Tests_Lib_ScaffoldVersionContract_ExistingConfigContent,
  Tests_Lib_ScaffoldVersionContract_ExistingConfigPath,
  Tests_Lib_ScaffoldVersionContract_ExistingCoreManifestContent,
  Tests_Lib_ScaffoldVersionContract_ExistingCoreManifestPath,
  Tests_Lib_ScaffoldVersionContract_ExistingManifest,
  Tests_Lib_ScaffoldVersionContract_ExistingManifestPath,
  Tests_Lib_ScaffoldVersionContract_ExistingManifestRaw,
  Tests_Lib_ScaffoldVersionContract_ExistingPackageContent,
  Tests_Lib_ScaffoldVersionContract_ExistingPackagePath,
  Tests_Lib_ScaffoldVersionContract_ExistingProjectDirectory,
  Tests_Lib_ScaffoldVersionContract_NewManifest,
  Tests_Lib_ScaffoldVersionContract_NewManifestPath,
  Tests_Lib_ScaffoldVersionContract_NewManifestRaw,
  Tests_Lib_ScaffoldVersionContract_NewProjectDirectory,
  Tests_Lib_ScaffoldVersionContract_OriginalCwd,
  Tests_Lib_ScaffoldVersionContract_SandboxRoot,
  Tests_Lib_ScaffoldVersionContract_TemporaryPrefix,
} from '../../types/tests/lib/scaffold-version-contract.test.d.ts';

/**
 * Tests - Lib - Scaffold Version Contract - Scaffold Version Behavior.
 *
 * @since 0.34.0
 */
describe.sequential('scaffold version behavior', async () => {
  const originalCwd: Tests_Lib_ScaffoldVersionContract_OriginalCwd = process.cwd();
  const temporaryPrefix: Tests_Lib_ScaffoldVersionContract_TemporaryPrefix = join(tmpdir(), `nova-${'scaffold-version'}-`);
  const sandboxRoot: Tests_Lib_ScaffoldVersionContract_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterEach(() => {
    process.exitCode = undefined;

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('starts a new SemVer application at 0.0.1', async () => {
    const newProjectDirectory: Tests_Lib_ScaffoldVersionContract_NewProjectDirectory = join(sandboxRoot, 'new-project-root');

    await mkdir(newProjectDirectory, { recursive: true });

    process.chdir(newProjectDirectory);

    await CliScaffoldAppExpressjs.run({
      install: false,
      name: 'versioned-project',
      nonInteractive: true,
      output: './versioned-project',
      workspaceName: 'api',
    });

    const newManifestPath: Tests_Lib_ScaffoldVersionContract_NewManifestPath = join(newProjectDirectory, 'versioned-project', 'apps', 'api', 'package.json');
    const newManifestRaw: Tests_Lib_ScaffoldVersionContract_NewManifestRaw = await readFile(newManifestPath, 'utf-8');
    const newManifest: Tests_Lib_ScaffoldVersionContract_NewManifest = JSON.parse(newManifestRaw);

    strictEqual(newManifest['version'], '0.0.1');

    return;
  });

  it('inherits the shared CalVer version in a lock-step project', async () => {
    const existingProjectDirectory: Tests_Lib_ScaffoldVersionContract_ExistingProjectDirectory = join(sandboxRoot, 'existing-project');

    await mkdir(join(existingProjectDirectory, 'packages', 'core'), { recursive: true });

    const existingPackagePath: Tests_Lib_ScaffoldVersionContract_ExistingPackagePath = join(existingProjectDirectory, 'package.json');
    const existingPackageContent: Tests_Lib_ScaffoldVersionContract_ExistingPackageContent = `${JSON.stringify({
      name: 'existing-project',
      workspaces: [
        'apps/*',
        'packages/*',
      ],
    }, null, 2)}\n`;
    const existingCoreManifestPath: Tests_Lib_ScaffoldVersionContract_ExistingCoreManifestPath = join(existingProjectDirectory, 'packages', 'core', 'package.json');
    const existingCoreManifestContent: Tests_Lib_ScaffoldVersionContract_ExistingCoreManifestContent = `${JSON.stringify({
      name: 'existing-core',
      version: '2026.10.4',
    }, null, 2)}\n`;
    const existingConfigPath: Tests_Lib_ScaffoldVersionContract_ExistingConfigPath = join(existingProjectDirectory, 'nova.config.json');
    const existingConfigContent: Tests_Lib_ScaffoldVersionContract_ExistingConfigContent = `${JSON.stringify({
      project: {
        name: {
          slug: 'existing-project',
          title: 'Existing Project',
        },
      },
      settings: {
        lockStepVersioning: true,
        versionStrategy: 'calver',
      },
      workspaces: {
        './': {
          name: 'existing-project',
          policy: 'freezable',
          role: 'project',
        },
        './packages/core': {
          name: 'existing-core',
          policy: 'distributable',
          role: 'package',
        },
      },
    }, null, 2)}\n`;

    await Promise.all([
      writeFile(existingPackagePath, existingPackageContent, 'utf-8'),
      writeFile(existingCoreManifestPath, existingCoreManifestContent, 'utf-8'),
      writeFile(existingConfigPath, existingConfigContent, 'utf-8'),
    ]);

    process.chdir(existingProjectDirectory);

    await CliScaffoldAppExpressjs.run({
      install: false,
      nonInteractive: true,
      output: './apps/api',
      workspaceName: 'api',
    });

    const existingManifestPath: Tests_Lib_ScaffoldVersionContract_ExistingManifestPath = join(existingProjectDirectory, 'apps', 'api', 'package.json');
    const existingManifestRaw: Tests_Lib_ScaffoldVersionContract_ExistingManifestRaw = await readFile(existingManifestPath, 'utf-8');
    const existingManifest: Tests_Lib_ScaffoldVersionContract_ExistingManifest = JSON.parse(existingManifestRaw);

    strictEqual(existingManifest['version'], '2026.10.4');

    return;
  });

  return;
});

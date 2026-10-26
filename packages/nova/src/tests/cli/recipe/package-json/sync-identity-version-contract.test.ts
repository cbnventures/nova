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

import { Runner as CliRecipePackageJsonSyncIdentity } from '../../../../cli/recipe/package-json/sync-identity.js';

import type {
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ConfigContent,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ConfigPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ExpectedVersion,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_OriginalCwd,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_PackageContent,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_PackagePath,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ProjectDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ReleasedChangelogPath,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ReleasedManifestRaw,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_SandboxRoot,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_TemporaryPrefix,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_UpdatedManifest,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_UpdatedManifestRaw,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_WorkspaceDirectory,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_WorkspaceManifestContent,
  Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_WorkspaceManifestPath,
} from '../../../../types/tests/cli/recipe/package-json/sync-identity-version-contract.test.d.ts';

/**
 * Tests - CLI - Recipe - package.json - Sync Identity Version Contract - CalVer Identity Synchronization.
 *
 * @since 0.34.0
 */
describe.sequential('CalVer identity synchronization', async () => {
  const originalCwd: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_OriginalCwd = process.cwd();
  const temporaryPrefix: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_TemporaryPrefix = join(tmpdir(), `nova-${'sync-identity-version'}-`);
  const sandboxRoot: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_SandboxRoot = await mkdtemp(temporaryPrefix);

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

  it('normalizes a new trackable workspace to the current UTC period', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ProjectDirectory = join(sandboxRoot, 'new-project');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_WorkspaceDirectory = join(projectDirectory, 'apps', 'web');

    await mkdir(workspaceDirectory, { recursive: true });

    const packagePath: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_PackagePath = join(projectDirectory, 'package.json');
    const packageContent: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_PackageContent = `${JSON.stringify({
      name: 'example-project',
      workspaces: ['apps/*'],
    }, null, 2)}\n`;
    const configPath: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContent: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ConfigContent = `${JSON.stringify({
      project: {
        license: 'MIT',
      },
      recipes: {
        'package-json': {
          './apps/web': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
      settings: {
        versionStrategy: 'calver',
      },
      workspaces: {
        './apps/web': {
          name: 'app-web',
          policy: 'trackable',
          role: 'app',
        },
      },
    }, null, 2)}\n`;
    const workspaceManifestPath: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_WorkspaceManifestPath = join(workspaceDirectory, 'package.json');
    const workspaceManifestContent: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_WorkspaceManifestContent = `${JSON.stringify({
      license: 'MIT',
      name: 'app-web',
      version: '0.0.0',
    }, null, 2)}\n`;

    await Promise.all([
      writeFile(packagePath, packageContent, 'utf-8'),
      writeFile(configPath, configContent, 'utf-8'),
      writeFile(workspaceManifestPath, workspaceManifestContent, 'utf-8'),
    ]);

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({ replaceFile: true });

    const updatedManifestRaw: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_UpdatedManifestRaw = await readFile(workspaceManifestPath, 'utf-8');
    const updatedManifest: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_UpdatedManifest = JSON.parse(updatedManifestRaw);
    const expectedVersion: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ExpectedVersion = `${new Date().getUTCFullYear()}.${new Date().getUTCMonth() + 1}.0`;

    strictEqual(process.exitCode, undefined);
    strictEqual(updatedManifest['version'], expectedVersion);

    return;
  });

  it('preserves an invalid established version and reports an error', async () => {
    const projectDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ProjectDirectory = join(sandboxRoot, 'released-project');
    const workspaceDirectory: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_WorkspaceDirectory = join(projectDirectory, 'apps', 'web');

    await mkdir(workspaceDirectory, { recursive: true });

    const packagePath: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_PackagePath = join(projectDirectory, 'package.json');
    const packageContent: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_PackageContent = `${JSON.stringify({
      name: 'released-project',
      workspaces: ['apps/*'],
    }, null, 2)}\n`;
    const configPath: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContent: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ConfigContent = `${JSON.stringify({
      project: {
        license: 'MIT',
      },
      recipes: {
        'package-json': {
          './apps/web': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
      settings: {
        versionStrategy: 'calver',
      },
      workspaces: {
        './apps/web': {
          name: 'app-web',
          policy: 'trackable',
          role: 'app',
        },
      },
    }, null, 2)}\n`;
    const workspaceManifestPath: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_WorkspaceManifestPath = join(workspaceDirectory, 'package.json');
    const workspaceManifestContent: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_WorkspaceManifestContent = `${JSON.stringify({
      license: 'MIT',
      name: 'app-web',
      version: '0.0.0',
    }, null, 2)}\n`;
    const releasedChangelogPath: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ReleasedChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');

    await Promise.all([
      writeFile(packagePath, packageContent, 'utf-8'),
      writeFile(configPath, configContent, 'utf-8'),
      writeFile(workspaceManifestPath, workspaceManifestContent, 'utf-8'),
      writeFile(releasedChangelogPath, [
        '# app-web',
        '',
        '## 2026.10.0',
        '',
      ].join('\n'), 'utf-8'),
    ]);

    process.chdir(projectDirectory);

    await CliRecipePackageJsonSyncIdentity.run({ replaceFile: true });

    const releasedManifestRaw: Tests_Cli_Recipe_PackageJson_SyncIdentityVersionContract_ReleasedManifestRaw = await readFile(workspaceManifestPath, 'utf-8');

    strictEqual(process.exitCode, 1);
    strictEqual(releasedManifestRaw, workspaceManifestContent);

    return;
  });

  return;
});

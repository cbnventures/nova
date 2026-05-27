import { strictEqual } from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as CliScaffoldAppWorkers } from '../../../../cli/scaffold/app/workers.js';

import type {
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ChildDirectory,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ChildPackageJson,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ChildPackageJsonPath,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_DryRunOutputPath,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_Exists,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_IndexTsPath,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_OriginalCwd,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_PackageJson,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_PackageJsonPath,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ProjectDirectory,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_RootDirectory,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_RootPackageJson,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_RootPackageJsonPath,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_SandboxRoot,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_TemporaryBase,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_TemporaryDirectory,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_WorkspacePackageJsonPath,
  Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_WranglerTomlPath,
} from '../../../../types/tests/cli/scaffold/app/workers.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Workers - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldAppWorkers.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_TemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_RootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_RootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_RootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppWorkers.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppWorkers.run({
      dryRun: true,
      name: 'my-worker',
      workspaceName: 'workers',
      output: './my-worker',
    });

    let exists: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_Exists = true;

    const dryRunOutputPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_DryRunOutputPath = join(projectDirectory, 'my-worker');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppWorkers.run({
      name: 'my-worker',
      workspaceName: 'workers',
      output: './my-worker',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_WorkspacePackageJsonPath = join(projectDirectory, 'my-worker', 'apps', 'workers', 'package.json');
    const wranglerTomlPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_WranglerTomlPath = join(projectDirectory, 'my-worker', 'apps', 'workers', 'wrangler.toml');
    const indexTsPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_IndexTsPath = join(projectDirectory, 'my-worker', 'apps', 'workers', 'src', 'index.ts');

    await access(workspacePackageJsonPath);

    await access(wranglerTomlPath);

    await access(indexTsPath);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_PackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppWorkers.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_ProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_PackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppWorkers.run({
      name: 'my-worker',
      workspaceName: 'workers',
      output: './apps/workers',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_WorkspacePackageJsonPath = join(projectDirectory, 'apps', 'workers', 'package.json');
    const wranglerTomlPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_WranglerTomlPath = join(projectDirectory, 'apps', 'workers', 'wrangler.toml');
    const indexTsPath: Tests_Cli_Scaffold_App_Workers_CliScaffoldAppWorkersRun_IndexTsPath = join(projectDirectory, 'apps', 'workers', 'src', 'index.ts');

    await access(workspacePackageJsonPath);

    await access(wranglerTomlPath);

    await access(indexTsPath);

    return;
  });

  return;
});

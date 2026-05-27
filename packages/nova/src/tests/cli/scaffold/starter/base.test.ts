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

import { Runner as CliScaffoldStarterBase } from '../../../../cli/scaffold/starter/base.js';

import type {
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_AppsDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ChildDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ChildPackageJson,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ChildPackageJsonPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_DryRunOutputPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_Exists,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_NovaConfigPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_OriginalCwd,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_PackageJson,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_PackageJsonPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_PackagesDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ProjectDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RootDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RootPackageJson,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RootPackageJsonPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_SandboxRoot,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_TemporaryBase,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_TemporaryDirectory,
} from '../../../../types/tests/cli/scaffold/starter/base.test.d.ts';

/**
 * Tests - CLI - Scaffold - Starter - Base - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldStarterBase.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_TemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldStarterBase.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_PackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits with error when already at monorepo root', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ProjectDirectory = join(sandboxRoot, 'monorepo-root');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_PackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({
      dryRun: true,
      name: 'my-project',
      output: './my-project',
    });

    let exists: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_Exists = true;

    const dryRunOutputPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_DryRunOutputPath = join(projectDirectory, 'my-project');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({
      name: 'my-project',
      output: './my-project',
    });

    // Verify root files were created.
    const rootPackageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RootPackageJsonPath = join(projectDirectory, 'my-project', 'package.json');
    const novaConfigPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_NovaConfigPath = join(projectDirectory, 'my-project', 'nova.config.json');

    await access(rootPackageJsonPath);

    await access(novaConfigPath);

    // Verify directory structure was created.
    const appsDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_AppsDirectory = join(projectDirectory, 'my-project', 'apps');
    const packagesDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_PackagesDirectory = join(projectDirectory, 'my-project', 'packages');

    await access(appsDirectory);

    await access(packagesDirectory);

    return;
  });

  return;
});

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

import { Runner as CliScaffoldAppVite } from '../../../../cli/scaffold/app/vite.js';

import type {
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ChildDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ChildPackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ChildPackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_DryRunOutputPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_Exists,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_IndexHtmlPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_MainTsPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_OriginalCwd,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_PackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_PackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ProjectDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RootDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RootPackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RootPackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_SandboxRoot,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_TemporaryBase,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_TemporaryDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ViteConfigPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_WorkspacePackageJsonPath,
} from '../../../../types/tests/cli/scaffold/app/vite.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Vite - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldAppVite.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_TemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppVite.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      dryRun: true,
      name: 'my-vite-app',
      workspaceName: 'vite',
      output: './my-vite-app',
    });

    let exists: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_Exists = true;

    const dryRunOutputPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_DryRunOutputPath = join(projectDirectory, 'my-vite-app');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      name: 'my-vite-app',
      workspaceName: 'vite',
      output: './my-vite-app',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_WorkspacePackageJsonPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'package.json');
    const viteConfigPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ViteConfigPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'vite.config.mts');
    const indexHtmlPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_IndexHtmlPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'index.html');
    const mainTsPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_MainTsPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'src', 'main.ts');

    await access(workspacePackageJsonPath);

    await access(viteConfigPath);

    await access(indexHtmlPath);

    await access(mainTsPath);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_PackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_PackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      name: 'my-vite-app',
      workspaceName: 'vite',
      output: './apps/vite',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_WorkspacePackageJsonPath = join(projectDirectory, 'apps', 'vite', 'package.json');
    const viteConfigPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ViteConfigPath = join(projectDirectory, 'apps', 'vite', 'vite.config.mts');
    const mainTsPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_MainTsPath = join(projectDirectory, 'apps', 'vite', 'src', 'main.ts');

    await access(workspacePackageJsonPath);

    await access(viteConfigPath);

    await access(mainTsPath);

    return;
  });

  return;
});

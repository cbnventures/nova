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

import { Runner as CliScaffoldAppNextjs } from '../../../../cli/scaffold/app/nextjs.js';

import type {
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ChildDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ChildPackageJson,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ChildPackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_DryRunOutputPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_Exists,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_NextConfigPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_NovaConfigPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_OriginalCwd,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_PackageJson,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_PackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_PageTsxPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ProjectDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RootDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RootPackageJson,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RootPackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_SandboxRoot,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_TemporaryBase,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_TemporaryDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_WorkspacePackageJsonPath,
} from '../../../../types/tests/cli/scaffold/app/nextjs.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Next.js - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldAppNextjs.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_TemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppNextjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_PackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({
      dryRun: true,
      name: 'my-app',
      workspaceName: 'nextjs',
      output: './my-app',
    });

    let exists: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_Exists = true;

    const dryRunOutputPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_DryRunOutputPath = join(projectDirectory, 'my-app');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({
      name: 'my-app',
      workspaceName: 'nextjs',
      output: './my-app',
    });

    // Verify root files were created.
    const rootPackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RootPackageJsonPath = join(projectDirectory, 'my-app', 'package.json');
    const novaConfigPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_NovaConfigPath = join(projectDirectory, 'my-app', 'nova.config.json');

    await access(rootPackageJsonPath);

    await access(novaConfigPath);

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_WorkspacePackageJsonPath = join(projectDirectory, 'my-app', 'apps', 'nextjs', 'package.json');
    const nextConfigPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_NextConfigPath = join(projectDirectory, 'my-app', 'apps', 'nextjs', 'next.config.mjs');
    const pageTsxPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_PageTsxPath = join(projectDirectory, 'my-app', 'apps', 'nextjs', 'src', 'app', 'page.tsx');

    await access(workspacePackageJsonPath);

    await access(nextConfigPath);

    await access(pageTsxPath);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_PackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({
      name: 'my-app',
      workspaceName: 'nextjs',
      output: './apps/nextjs',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_WorkspacePackageJsonPath = join(projectDirectory, 'apps', 'nextjs', 'package.json');
    const nextConfigPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_NextConfigPath = join(projectDirectory, 'apps', 'nextjs', 'next.config.mjs');
    const pageTsxPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_PageTsxPath = join(projectDirectory, 'apps', 'nextjs', 'src', 'app', 'page.tsx');

    await access(workspacePackageJsonPath);

    await access(nextConfigPath);

    await access(pageTsxPath);

    return;
  });

  return;
});

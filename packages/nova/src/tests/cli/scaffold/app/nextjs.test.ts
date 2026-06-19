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
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_NextConfigPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_PackageJson,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_PackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_PageTsxPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_ProjectDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_WorkspacePackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_NextConfigPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_NovaConfigPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_PageTsxPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_ProjectDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_RootPackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_WorkspacePackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorForStandaloneProject_PackageJson,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorForStandaloneProject_PackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorForStandaloneProject_ProjectDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJson,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJson,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJsonPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_OriginalCwd,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RespectsDryRun_DryRunOutputPath,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RespectsDryRun_Exists,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RespectsDryRun_ProjectDirectory,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_SandboxRoot,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_TemporaryBase,
  Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_TemporaryDirectory,
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
    const rootDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppNextjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorForStandaloneProject_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorForStandaloneProject_PackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_ExitsWithErrorForStandaloneProject_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RespectsDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({
      dryRun: true,
      name: 'my-app',
      workspaceName: 'nextjs',
      output: './my-app',
    });

    let exists: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RespectsDryRun_Exists = true;

    const dryRunOutputPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_RespectsDryRun_DryRunOutputPath = join(projectDirectory, 'my-app');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_ProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({
      name: 'my-app',
      workspaceName: 'nextjs',
      output: './my-app',
    });

    // Verify root files were created.
    const rootPackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_RootPackageJsonPath = join(projectDirectory, 'my-app', 'package.json');
    const novaConfigPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_NovaConfigPath = join(projectDirectory, 'my-app', 'nova.config.json');

    await access(rootPackageJsonPath);

    await access(novaConfigPath);

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_WorkspacePackageJsonPath = join(projectDirectory, 'my-app', 'apps', 'nextjs', 'package.json');
    const nextConfigPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_NextConfigPath = join(projectDirectory, 'my-app', 'apps', 'nextjs', 'next.config.mjs');
    const pageTsxPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_CreatesMonorepoInEmptyDirectory_PageTsxPath = join(projectDirectory, 'my-app', 'apps', 'nextjs', 'src', 'app', 'page.tsx');

    await access(workspacePackageJsonPath);

    await access(nextConfigPath);

    await access(pageTsxPath);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_ProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_PackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({
      name: 'my-app',
      workspaceName: 'nextjs',
      output: './apps/nextjs',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_WorkspacePackageJsonPath = join(projectDirectory, 'apps', 'nextjs', 'package.json');
    const nextConfigPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_NextConfigPath = join(projectDirectory, 'apps', 'nextjs', 'next.config.mjs');
    const pageTsxPath: Tests_Cli_Scaffold_App_Nextjs_CliScaffoldAppNextjsRun_AddsWorkspaceAtMonorepoRoot_PageTsxPath = join(projectDirectory, 'apps', 'nextjs', 'src', 'app', 'page.tsx');

    await access(workspacePackageJsonPath);

    await access(nextConfigPath);

    await access(pageTsxPath);

    return;
  });

  return;
});

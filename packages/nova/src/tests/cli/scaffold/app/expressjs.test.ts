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

import { Runner as CliScaffoldAppExpressjs } from '../../../../cli/scaffold/app/expressjs.js';

import type {
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_IndexTsPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_PackageJson,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_PackageJsonPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_ProjectDirectory,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_TsconfigPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_WorkspacePackageJsonPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_CreatesMonorepoInEmptyDirectory_IndexTsPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_CreatesMonorepoInEmptyDirectory_ProjectDirectory,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_CreatesMonorepoInEmptyDirectory_TsconfigPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_CreatesMonorepoInEmptyDirectory_WorkspacePackageJsonPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorForStandaloneProject_PackageJson,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorForStandaloneProject_PackageJsonPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorForStandaloneProject_ProjectDirectory,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildDirectory,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJson,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJsonPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootDirectory,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJson,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJsonPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_OriginalCwd,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_RespectsDryRun_DryRunOutputPath,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_RespectsDryRun_Exists,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_RespectsDryRun_ProjectDirectory,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_SandboxRoot,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_TemporaryBase,
  Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_TemporaryDirectory,
} from '../../../../types/tests/cli/scaffold/app/expressjs.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Express.js - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldAppExpressjs.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_TemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppExpressjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_RespectsDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppExpressjs.run({
      dryRun: true,
      name: 'my-api',
      workspaceName: 'express',
      output: './my-api',
    });

    let exists: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_RespectsDryRun_Exists = true;

    const dryRunOutputPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_RespectsDryRun_DryRunOutputPath = join(projectDirectory, 'my-api');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_CreatesMonorepoInEmptyDirectory_ProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppExpressjs.run({
      name: 'my-api',
      workspaceName: 'express',
      output: './my-api',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_CreatesMonorepoInEmptyDirectory_WorkspacePackageJsonPath = join(projectDirectory, 'my-api', 'apps', 'express', 'package.json');
    const tsconfigPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_CreatesMonorepoInEmptyDirectory_TsconfigPath = join(projectDirectory, 'my-api', 'apps', 'express', 'tsconfig.json');
    const indexTsPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_CreatesMonorepoInEmptyDirectory_IndexTsPath = join(projectDirectory, 'my-api', 'apps', 'express', 'src', 'index.ts');

    await access(workspacePackageJsonPath);

    await access(tsconfigPath);

    await access(indexTsPath);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorForStandaloneProject_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorForStandaloneProject_PackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_ExitsWithErrorForStandaloneProject_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppExpressjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_ProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_PackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppExpressjs.run({
      name: 'my-api',
      workspaceName: 'express',
      output: './apps/express',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_WorkspacePackageJsonPath = join(projectDirectory, 'apps', 'express', 'package.json');
    const tsconfigPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_TsconfigPath = join(projectDirectory, 'apps', 'express', 'tsconfig.json');
    const indexTsPath: Tests_Cli_Scaffold_App_Expressjs_CliScaffoldAppExpressjsRun_AddsWorkspaceAtMonorepoRoot_IndexTsPath = join(projectDirectory, 'apps', 'express', 'src', 'index.ts');

    await access(workspacePackageJsonPath);

    await access(tsconfigPath);

    await access(indexTsPath);

    return;
  });

  return;
});

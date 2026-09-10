import {
  deepStrictEqual,
  rejects,
  strictEqual,
} from 'node:assert/strict';
import {
  access,
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

import { Runner as CliScaffoldAppVite } from '../../../../cli/scaffold/app/vite.js';

import type {
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_MainTsPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_NovaConfig,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_NovaConfigContents,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_NovaConfigPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_PackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_PackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ParsedPackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ParsedWorkspacePackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ProjectDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ViteConfigPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_WorkspacePackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_IndexHtmlPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_MainTsPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_ProjectDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_ViteConfigPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_WorkspacePackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_WorkspacePackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorForStandaloneProject_PackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorForStandaloneProject_PackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorForStandaloneProject_ProjectDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_ChildDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_RootDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenRootConfigIsMissing_PackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenRootConfigIsMissing_PackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenRootConfigIsMissing_ProjectDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenRootConfigIsMissing_WorkspacePackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_ExistingPackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_MainTsPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_NovaConfig,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_NovaConfigPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_PackageJson,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_PackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_ProjectDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_WorkspaceDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_WorkspacePackageJsonPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_OriginalCwd,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RespectsDryRun_DryRunOutputPath,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RespectsDryRun_Exists,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RespectsDryRun_ProjectDirectory,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_SandboxRoot,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_TemporaryBase,
  Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_TemporaryDirectory,
} from '../../../../types/tests/cli/scaffold/app/vite.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Vite - Run.
 *
 * @since 0.15.0
 */
describe.sequential('CliScaffoldAppVite.run', async () => {
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

  afterEach(() => {
    process.exitCode = undefined;

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_RootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_ChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJson = JSON.stringify({
      name: 'root',
      workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppVite.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RespectsDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      dryRun: true,
      name: 'my-vite-app',
      nonInteractive: true,
      workspaceName: 'vite',
      output: './my-vite-app',
    });

    let exists: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RespectsDryRun_Exists = true;

    const dryRunOutputPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_RespectsDryRun_DryRunOutputPath = join(projectDirectory, 'my-vite-app');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_ProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      name: 'my-vite-app',
      nonInteractive: true,
      workspaceName: 'vite',
      output: './my-vite-app',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_WorkspacePackageJsonPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'package.json');
    const viteConfigPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_ViteConfigPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'vite.config.mts');
    const indexHtmlPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_IndexHtmlPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'index.html');
    const mainTsPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_MainTsPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'src', 'main.ts');

    await access(workspacePackageJsonPath);

    await access(viteConfigPath);

    await access(indexHtmlPath);

    await access(mainTsPath);

    const workspacePackageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_WorkspacePackageJson = JSON.parse(await readFile(workspacePackageJsonPath, 'utf-8')) as Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_CreatesMonorepoInEmptyDirectory_WorkspacePackageJson;

    strictEqual(workspacePackageJson['name'], 'my-vite-app-app-vite');

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorForStandaloneProject_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorForStandaloneProject_PackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithErrorForStandaloneProject_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits without writes when root config is missing', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenRootConfigIsMissing_ProjectDirectory = join(sandboxRoot, 'missing-config');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenRootConfigIsMissing_PackageJson = JSON.stringify({
      name: 'missing-config-project',
      workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenRootConfigIsMissing_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      nonInteractive: true,
      workspaceName: 'vite',
      output: './apps/vite',
    });

    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenRootConfigIsMissing_WorkspacePackageJsonPath = join(projectDirectory, 'apps', 'vite', 'package.json');

    strictEqual(process.exitCode, 1);

    await rejects(access(workspacePackageJsonPath));

    return;
  });

  it('exits without writes when target file exists', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_ProjectDirectory = join(sandboxRoot, 'target-conflict');
    const workspaceDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_WorkspaceDirectory = join(projectDirectory, 'apps', 'vite');

    await mkdir(workspaceDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_PackageJson = JSON.stringify({
      name: 'target-conflict-project',
      workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_NovaConfig = JSON.stringify({
      project: {
        name: {
          slug: 'target-conflict',
          title: 'Target Conflict',
        },
      },
      workspaces: {
        './': {
          name: 'target-conflict-project',
          role: 'project',
          policy: 'freezable',
        },
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    const existingPackageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_ExistingPackageJson = '{"name":"keep-me"}\n';
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_WorkspacePackageJsonPath = join(workspaceDirectory, 'package.json');

    await writeFile(workspacePackageJsonPath, existingPackageJson, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      nonInteractive: true,
      workspaceName: 'vite',
      output: './apps/vite',
    });

    const mainTsPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_ExitsWithoutWritesWhenTargetFileExists_MainTsPath = join(workspaceDirectory, 'src', 'main.ts');

    strictEqual(process.exitCode, 1);
    strictEqual(await readFile(workspacePackageJsonPath, 'utf-8'), existingPackageJson);
    strictEqual(await readFile(novaConfigPath, 'utf-8'), `${novaConfig}\n`);

    await rejects(access(mainTsPath));

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_PackageJson = JSON.stringify({
      name: 'root',
      workspaces: ['packages/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    const novaConfig: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_NovaConfig = JSON.stringify({
      project: {
        name: {
          slug: 'workspace-test',
          title: 'Workspace Test',
        },
      },
      workspaces: {
        './': {
          name: 'workspace-test-project',
          role: 'project',
          policy: 'freezable',
        },
      },
    }, null, 2);
    const novaConfigPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(novaConfigPath, `${novaConfig}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      nonInteractive: true,
      workspaceName: 'vite',
      output: './apps/vite',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_WorkspacePackageJsonPath = join(projectDirectory, 'apps', 'vite', 'package.json');
    const viteConfigPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ViteConfigPath = join(projectDirectory, 'apps', 'vite', 'vite.config.mts');
    const mainTsPath: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_MainTsPath = join(projectDirectory, 'apps', 'vite', 'src', 'main.ts');

    await access(workspacePackageJsonPath);

    await access(viteConfigPath);

    await access(mainTsPath);

    const parsedPackageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ParsedPackageJson = JSON.parse(await readFile(packageJsonPath, 'utf-8')) as Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ParsedPackageJson;

    deepStrictEqual(parsedPackageJson['workspaces'], [
      'packages/*',
      'apps/vite',
    ]);

    const parsedWorkspacePackageJson: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ParsedWorkspacePackageJson = JSON.parse(await readFile(workspacePackageJsonPath, 'utf-8')) as Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_ParsedWorkspacePackageJson;

    strictEqual(parsedWorkspacePackageJson['name'], 'workspace-test-app-vite');

    const novaConfigContents: Tests_Cli_Scaffold_App_Vite_CliScaffoldAppViteRun_AddsWorkspaceAtMonorepoRoot_NovaConfigContents = await readFile(novaConfigPath, 'utf-8');

    strictEqual(novaConfigContents.includes('"name": "workspace-test-app-vite"'), true);

    await CliScaffoldAppVite.run({
      nonInteractive: true,
      workspaceName: 'vite',
      output: './apps/vite',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});

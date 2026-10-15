import { strictEqual } from 'node:assert/strict';
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

import prompts from 'prompts';
import {
  afterAll,
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliScaffoldStarterBase } from '../../../../cli/scaffold/starter/base.js';

import type {
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedCall,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedPrompt,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ProjectDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_AppsDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_GitignorePath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_GitignoreRaw,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfigPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfigRaw,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_PackagesDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_ProjectDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_RootPackageJsonPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorForStandaloneProject_PackageJson,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorForStandaloneProject_PackageJsonPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorForStandaloneProject_ProjectDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenAlreadyAtMonorepoRoot_PackageJson,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenAlreadyAtMonorepoRoot_PackageJsonPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenAlreadyAtMonorepoRoot_ProjectDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_ChildDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJson,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJsonPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_RootDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJson,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJsonPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_OriginalCwd,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RejectsCurrentDirectoryOutput_Exists,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RejectsCurrentDirectoryOutput_PackageJsonPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RejectsCurrentDirectoryOutput_ProjectDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RespectsDryRun_DryRunOutputPath,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RespectsDryRun_Exists,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RespectsDryRun_ProjectDirectory,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_SandboxRoot,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_TemporaryBase,
  Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_TemporaryDirectory,
  Tests_Cli_Scaffold_Starter_Base_Prompts_MockModule,
} from '../../../../types/tests/cli/scaffold/starter/base.test.d.ts';

vi.mock('prompts', () => {
  return {
    default: vi.fn(),
  } satisfies Tests_Cli_Scaffold_Starter_Base_Prompts_MockModule;
});

/**
 * Tests - CLI - Scaffold - Starter - Base - Run.
 *
 * @since 0.15.0
 */
describe.sequential('CliScaffoldStarterBase.run', async () => {
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

  afterEach(() => {
    process.exitCode = undefined;
    vi.mocked(prompts).mockReset();

    return;
  });

  it('confirms plan before execution', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ProjectDirectory = join(sandboxRoot, 'interactive-plan');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    vi.mocked(prompts).mockResolvedValueOnce({ confirmed: true });

    await CliScaffoldStarterBase.run({
      install: false,
      name: 'interactive-project',
    });

    strictEqual(vi.mocked(prompts).mock.calls.length, 1);

    const confirmedCall: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedCall = vi.mocked(prompts).mock.calls[0] as Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedCall;

    if (confirmedCall === undefined) {
      throw new Error('Expected scaffold confirmation before execution.');
    }

    const confirmedPrompt: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedPrompt = confirmedCall[0] as Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ConfirmsPlanBeforeExecution_ConfirmedPrompt;

    strictEqual(confirmedPrompt['name'], 'confirmed');

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_RootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_ChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJson = JSON.stringify({
      name: 'root',
      workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_RootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenInsideChildWorkspace_ChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldStarterBase.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorForStandaloneProject_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorForStandaloneProject_PackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorForStandaloneProject_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits with error when already at monorepo root', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenAlreadyAtMonorepoRoot_ProjectDirectory = join(sandboxRoot, 'monorepo-root');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenAlreadyAtMonorepoRoot_PackageJson = JSON.stringify({
      name: 'root',
      workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_ExitsWithErrorWhenAlreadyAtMonorepoRoot_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RespectsDryRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({
      dryRun: true,
      install: false,
      name: 'my-project',
      nonInteractive: true,
      output: './my-project',
    });

    let exists: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RespectsDryRun_Exists = true;

    const dryRunOutputPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RespectsDryRun_DryRunOutputPath = join(projectDirectory, 'my-project');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('rejects current directory output', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RejectsCurrentDirectoryOutput_ProjectDirectory = join(sandboxRoot, 'current-directory-output');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({
      install: false,
      name: 'my-project',
      nonInteractive: true,
      output: '.',
    });

    let exists: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RejectsCurrentDirectoryOutput_Exists = true;

    const packageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_RejectsCurrentDirectoryOutput_PackageJsonPath = join(projectDirectory, 'package.json');

    try {
      await access(packageJsonPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);
    strictEqual(process.exitCode, 1);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_ProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({
      install: false,
      name: 'my-project',
      nonInteractive: true,
    });

    // Verify root files were created.
    const rootPackageJsonPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_RootPackageJsonPath = join(projectDirectory, 'my-project', 'package.json');
    const gitignorePath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_GitignorePath = join(projectDirectory, 'my-project', '.gitignore');
    const novaConfigPath: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfigPath = join(projectDirectory, 'my-project', 'nova.config.json');

    await access(rootPackageJsonPath);

    const gitignoreRaw: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_GitignoreRaw = await readFile(gitignorePath, 'utf-8');

    strictEqual(gitignoreRaw.includes('# This file is generated by @cbnventures/nova.'), true);
    strictEqual(gitignoreRaw.split('\n').includes('.env'), true);
    strictEqual(gitignoreRaw.split('\n').includes('!.env.sample'), true);

    await access(novaConfigPath);

    const novaConfigRaw: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfigRaw = await readFile(novaConfigPath, 'utf-8');
    const novaConfig: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig = JSON.parse(novaConfigRaw) as Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_NovaConfig;

    strictEqual(novaConfig['project']['legalName'], 'Example Company');
    strictEqual(novaConfig['project']['startingYear'], new Date().getFullYear());
    strictEqual(novaConfig['environment']['workspaces']['./']['prefix'], 'ROOT_');
    strictEqual((await readFile(join(projectDirectory, 'my-project', '.env'), 'utf-8')).includes('NODE_ENV="development"'), true);
    strictEqual((await readFile(join(projectDirectory, 'my-project', '.env.sample'), 'utf-8')).includes('LOG_LEVEL="auto"'), true);

    // Verify directory structure was created.
    const appsDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_AppsDirectory = join(projectDirectory, 'my-project', 'apps');
    const packagesDirectory: Tests_Cli_Scaffold_Starter_Base_CliScaffoldStarterBaseRun_CreatesMonorepoInEmptyDirectory_PackagesDirectory = join(projectDirectory, 'my-project', 'packages');

    await access(appsDirectory);

    await access(packagesDirectory);

    return;
  });

  return;
});

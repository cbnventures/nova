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

import { CliScaffoldAppWorkers } from '../../../../cli/scaffold/app/workers.js';

import type {
  TestsCliScaffoldAppWorkersRunChildDirectory,
  TestsCliScaffoldAppWorkersRunChildPackageJson,
  TestsCliScaffoldAppWorkersRunChildPackageJsonPath,
  TestsCliScaffoldAppWorkersRunDryRunOutputPath,
  TestsCliScaffoldAppWorkersRunExists,
  TestsCliScaffoldAppWorkersRunIndexTsPath,
  TestsCliScaffoldAppWorkersRunOriginalCwd,
  TestsCliScaffoldAppWorkersRunPackageJson,
  TestsCliScaffoldAppWorkersRunPackageJsonPath,
  TestsCliScaffoldAppWorkersRunProjectDirectory,
  TestsCliScaffoldAppWorkersRunRootDirectory,
  TestsCliScaffoldAppWorkersRunRootPackageJson,
  TestsCliScaffoldAppWorkersRunRootPackageJsonPath,
  TestsCliScaffoldAppWorkersRunSandboxRoot,
  TestsCliScaffoldAppWorkersRunTemporaryBase,
  TestsCliScaffoldAppWorkersRunTemporaryDirectory,
  TestsCliScaffoldAppWorkersRunWorkspacePackageJsonPath,
  TestsCliScaffoldAppWorkersRunWranglerTomlPath,
} from '../../../../types/tests/cli/scaffold/app/workers.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Workers - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldAppWorkers.run', async () => {
  const originalCwd: TestsCliScaffoldAppWorkersRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliScaffoldAppWorkersRunTemporaryDirectory = tmpdir();
  const temporaryBase: TestsCliScaffoldAppWorkersRunTemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliScaffoldAppWorkersRunSandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: TestsCliScaffoldAppWorkersRunRootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: TestsCliScaffoldAppWorkersRunChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: TestsCliScaffoldAppWorkersRunRootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: TestsCliScaffoldAppWorkersRunRootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: TestsCliScaffoldAppWorkersRunChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: TestsCliScaffoldAppWorkersRunChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppWorkers.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliScaffoldAppWorkersRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppWorkers.run({
      dryRun: true,
      name: 'my-worker',
      workspaceName: 'workers',
      output: './my-worker',
    });

    let exists: TestsCliScaffoldAppWorkersRunExists = true;

    const dryRunOutputPath: TestsCliScaffoldAppWorkersRunDryRunOutputPath = join(projectDirectory, 'my-worker');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: TestsCliScaffoldAppWorkersRunProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppWorkers.run({
      name: 'my-worker',
      workspaceName: 'workers',
      output: './my-worker',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldAppWorkersRunWorkspacePackageJsonPath = join(projectDirectory, 'my-worker', 'apps', 'workers', 'package.json');
    const wranglerTomlPath: TestsCliScaffoldAppWorkersRunWranglerTomlPath = join(projectDirectory, 'my-worker', 'apps', 'workers', 'wrangler.toml');
    const indexTsPath: TestsCliScaffoldAppWorkersRunIndexTsPath = join(projectDirectory, 'my-worker', 'apps', 'workers', 'src', 'index.ts');

    await access(workspacePackageJsonPath);

    await access(wranglerTomlPath);

    await access(indexTsPath);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: TestsCliScaffoldAppWorkersRunProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldAppWorkersRunPackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: TestsCliScaffoldAppWorkersRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppWorkers.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: TestsCliScaffoldAppWorkersRunProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldAppWorkersRunPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: TestsCliScaffoldAppWorkersRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppWorkers.run({
      name: 'my-worker',
      workspaceName: 'workers',
      output: './apps/workers',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldAppWorkersRunWorkspacePackageJsonPath = join(projectDirectory, 'apps', 'workers', 'package.json');
    const wranglerTomlPath: TestsCliScaffoldAppWorkersRunWranglerTomlPath = join(projectDirectory, 'apps', 'workers', 'wrangler.toml');
    const indexTsPath: TestsCliScaffoldAppWorkersRunIndexTsPath = join(projectDirectory, 'apps', 'workers', 'src', 'index.ts');

    await access(workspacePackageJsonPath);

    await access(wranglerTomlPath);

    await access(indexTsPath);

    return;
  });

  return;
});

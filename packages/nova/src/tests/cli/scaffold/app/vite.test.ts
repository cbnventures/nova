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

import { CliScaffoldAppVite } from '../../../../cli/scaffold/app/vite.js';

import type {
  TestsCliScaffoldAppViteRunChildDirectory,
  TestsCliScaffoldAppViteRunChildPackageJson,
  TestsCliScaffoldAppViteRunChildPackageJsonPath,
  TestsCliScaffoldAppViteRunDryRunOutputPath,
  TestsCliScaffoldAppViteRunExists,
  TestsCliScaffoldAppViteRunIndexHtmlPath,
  TestsCliScaffoldAppViteRunMainTsPath,
  TestsCliScaffoldAppViteRunOriginalCwd,
  TestsCliScaffoldAppViteRunPackageJson,
  TestsCliScaffoldAppViteRunPackageJsonPath,
  TestsCliScaffoldAppViteRunProjectDirectory,
  TestsCliScaffoldAppViteRunRootDirectory,
  TestsCliScaffoldAppViteRunRootPackageJson,
  TestsCliScaffoldAppViteRunRootPackageJsonPath,
  TestsCliScaffoldAppViteRunSandboxRoot,
  TestsCliScaffoldAppViteRunTemporaryBase,
  TestsCliScaffoldAppViteRunTemporaryDirectory,
  TestsCliScaffoldAppViteRunViteConfigPath,
  TestsCliScaffoldAppViteRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/scaffold/app/vite.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Vite - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldAppVite.run', async () => {
  const originalCwd: TestsCliScaffoldAppViteRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliScaffoldAppViteRunTemporaryDirectory = tmpdir();
  const temporaryBase: TestsCliScaffoldAppViteRunTemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliScaffoldAppViteRunSandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: TestsCliScaffoldAppViteRunRootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: TestsCliScaffoldAppViteRunChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: TestsCliScaffoldAppViteRunRootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: TestsCliScaffoldAppViteRunRootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: TestsCliScaffoldAppViteRunChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: TestsCliScaffoldAppViteRunChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppVite.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliScaffoldAppViteRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      dryRun: true,
      name: 'my-vite-app',
      workspaceName: 'vite',
      output: './my-vite-app',
    });

    let exists: TestsCliScaffoldAppViteRunExists = true;

    const dryRunOutputPath: TestsCliScaffoldAppViteRunDryRunOutputPath = join(projectDirectory, 'my-vite-app');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: TestsCliScaffoldAppViteRunProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      name: 'my-vite-app',
      workspaceName: 'vite',
      output: './my-vite-app',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldAppViteRunWorkspacePackageJsonPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'package.json');
    const viteConfigPath: TestsCliScaffoldAppViteRunViteConfigPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'vite.config.mts');
    const indexHtmlPath: TestsCliScaffoldAppViteRunIndexHtmlPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'index.html');
    const mainTsPath: TestsCliScaffoldAppViteRunMainTsPath = join(projectDirectory, 'my-vite-app', 'apps', 'vite', 'src', 'main.ts');

    await access(workspacePackageJsonPath);

    await access(viteConfigPath);

    await access(indexHtmlPath);

    await access(mainTsPath);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: TestsCliScaffoldAppViteRunProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldAppViteRunPackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: TestsCliScaffoldAppViteRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: TestsCliScaffoldAppViteRunProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldAppViteRunPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: TestsCliScaffoldAppViteRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppVite.run({
      name: 'my-vite-app',
      workspaceName: 'vite',
      output: './apps/vite',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldAppViteRunWorkspacePackageJsonPath = join(projectDirectory, 'apps', 'vite', 'package.json');
    const viteConfigPath: TestsCliScaffoldAppViteRunViteConfigPath = join(projectDirectory, 'apps', 'vite', 'vite.config.mts');
    const mainTsPath: TestsCliScaffoldAppViteRunMainTsPath = join(projectDirectory, 'apps', 'vite', 'src', 'main.ts');

    await access(workspacePackageJsonPath);

    await access(viteConfigPath);

    await access(mainTsPath);

    return;
  });

  return;
});

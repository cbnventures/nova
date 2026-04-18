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

import { CliScaffoldStarterBase } from '../../../../cli/scaffold/starter/base.js';

import type {
  TestsCliScaffoldStarterBaseRunAppsDirectory,
  TestsCliScaffoldStarterBaseRunChildDirectory,
  TestsCliScaffoldStarterBaseRunChildPackageJson,
  TestsCliScaffoldStarterBaseRunChildPackageJsonPath,
  TestsCliScaffoldStarterBaseRunDryRunOutputPath,
  TestsCliScaffoldStarterBaseRunExists,
  TestsCliScaffoldStarterBaseRunNovaConfigPath,
  TestsCliScaffoldStarterBaseRunOriginalCwd,
  TestsCliScaffoldStarterBaseRunPackageJson,
  TestsCliScaffoldStarterBaseRunPackageJsonPath,
  TestsCliScaffoldStarterBaseRunPackagesDirectory,
  TestsCliScaffoldStarterBaseRunProjectDirectory,
  TestsCliScaffoldStarterBaseRunRootDirectory,
  TestsCliScaffoldStarterBaseRunRootPackageJson,
  TestsCliScaffoldStarterBaseRunRootPackageJsonPath,
  TestsCliScaffoldStarterBaseRunSandboxRoot,
  TestsCliScaffoldStarterBaseRunTemporaryBase,
  TestsCliScaffoldStarterBaseRunTemporaryDirectory,
} from '../../../../types/tests/cli/scaffold/starter/base.test.d.ts';

/**
 * Tests - CLI - Scaffold - Starter - Base - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldStarterBase.run', async () => {
  const originalCwd: TestsCliScaffoldStarterBaseRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliScaffoldStarterBaseRunTemporaryDirectory = tmpdir();
  const temporaryBase: TestsCliScaffoldStarterBaseRunTemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliScaffoldStarterBaseRunSandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: TestsCliScaffoldStarterBaseRunRootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: TestsCliScaffoldStarterBaseRunChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: TestsCliScaffoldStarterBaseRunRootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: TestsCliScaffoldStarterBaseRunRootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: TestsCliScaffoldStarterBaseRunChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: TestsCliScaffoldStarterBaseRunChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldStarterBase.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: TestsCliScaffoldStarterBaseRunProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldStarterBaseRunPackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: TestsCliScaffoldStarterBaseRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits with error when already at monorepo root', async () => {
    const projectDirectory: TestsCliScaffoldStarterBaseRunProjectDirectory = join(sandboxRoot, 'monorepo-root');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldStarterBaseRunPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: TestsCliScaffoldStarterBaseRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliScaffoldStarterBaseRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({
      dryRun: true,
      name: 'my-project',
      output: './my-project',
    });

    let exists: TestsCliScaffoldStarterBaseRunExists = true;

    const dryRunOutputPath: TestsCliScaffoldStarterBaseRunDryRunOutputPath = join(projectDirectory, 'my-project');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: TestsCliScaffoldStarterBaseRunProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldStarterBase.run({
      name: 'my-project',
      output: './my-project',
    });

    // Verify root files were created.
    const rootPackageJsonPath: TestsCliScaffoldStarterBaseRunRootPackageJsonPath = join(projectDirectory, 'my-project', 'package.json');
    const novaConfigPath: TestsCliScaffoldStarterBaseRunNovaConfigPath = join(projectDirectory, 'my-project', 'nova.config.json');

    await access(rootPackageJsonPath);

    await access(novaConfigPath);

    // Verify directory structure was created.
    const appsDirectory: TestsCliScaffoldStarterBaseRunAppsDirectory = join(projectDirectory, 'my-project', 'apps');
    const packagesDirectory: TestsCliScaffoldStarterBaseRunPackagesDirectory = join(projectDirectory, 'my-project', 'packages');

    await access(appsDirectory);

    await access(packagesDirectory);

    return;
  });

  return;
});

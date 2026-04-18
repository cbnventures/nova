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

import { CliScaffoldAppExpressjs } from '../../../../cli/scaffold/app/expressjs.js';

import type {
  TestsCliScaffoldAppExpressjsRunChildDirectory,
  TestsCliScaffoldAppExpressjsRunChildPackageJson,
  TestsCliScaffoldAppExpressjsRunChildPackageJsonPath,
  TestsCliScaffoldAppExpressjsRunDryRunOutputPath,
  TestsCliScaffoldAppExpressjsRunExists,
  TestsCliScaffoldAppExpressjsRunIndexTsPath,
  TestsCliScaffoldAppExpressjsRunOriginalCwd,
  TestsCliScaffoldAppExpressjsRunPackageJson,
  TestsCliScaffoldAppExpressjsRunPackageJsonPath,
  TestsCliScaffoldAppExpressjsRunProjectDirectory,
  TestsCliScaffoldAppExpressjsRunRootDirectory,
  TestsCliScaffoldAppExpressjsRunRootPackageJson,
  TestsCliScaffoldAppExpressjsRunRootPackageJsonPath,
  TestsCliScaffoldAppExpressjsRunSandboxRoot,
  TestsCliScaffoldAppExpressjsRunTemporaryBase,
  TestsCliScaffoldAppExpressjsRunTemporaryDirectory,
  TestsCliScaffoldAppExpressjsRunTsconfigPath,
  TestsCliScaffoldAppExpressjsRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/scaffold/app/expressjs.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Express.js - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldAppExpressjs.run', async () => {
  const originalCwd: TestsCliScaffoldAppExpressjsRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliScaffoldAppExpressjsRunTemporaryDirectory = tmpdir();
  const temporaryBase: TestsCliScaffoldAppExpressjsRunTemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliScaffoldAppExpressjsRunSandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: TestsCliScaffoldAppExpressjsRunRootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: TestsCliScaffoldAppExpressjsRunChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: TestsCliScaffoldAppExpressjsRunRootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: TestsCliScaffoldAppExpressjsRunRootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: TestsCliScaffoldAppExpressjsRunChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: TestsCliScaffoldAppExpressjsRunChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppExpressjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliScaffoldAppExpressjsRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppExpressjs.run({
      dryRun: true,
      name: 'my-api',
      workspaceName: 'express',
      output: './my-api',
    });

    let exists: TestsCliScaffoldAppExpressjsRunExists = true;

    const dryRunOutputPath: TestsCliScaffoldAppExpressjsRunDryRunOutputPath = join(projectDirectory, 'my-api');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: TestsCliScaffoldAppExpressjsRunProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppExpressjs.run({
      name: 'my-api',
      workspaceName: 'express',
      output: './my-api',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldAppExpressjsRunWorkspacePackageJsonPath = join(projectDirectory, 'my-api', 'apps', 'express', 'package.json');
    const tsconfigPath: TestsCliScaffoldAppExpressjsRunTsconfigPath = join(projectDirectory, 'my-api', 'apps', 'express', 'tsconfig.json');
    const indexTsPath: TestsCliScaffoldAppExpressjsRunIndexTsPath = join(projectDirectory, 'my-api', 'apps', 'express', 'src', 'index.ts');

    await access(workspacePackageJsonPath);

    await access(tsconfigPath);

    await access(indexTsPath);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: TestsCliScaffoldAppExpressjsRunProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldAppExpressjsRunPackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: TestsCliScaffoldAppExpressjsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppExpressjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: TestsCliScaffoldAppExpressjsRunProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldAppExpressjsRunPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: TestsCliScaffoldAppExpressjsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppExpressjs.run({
      name: 'my-api',
      workspaceName: 'express',
      output: './apps/express',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldAppExpressjsRunWorkspacePackageJsonPath = join(projectDirectory, 'apps', 'express', 'package.json');
    const tsconfigPath: TestsCliScaffoldAppExpressjsRunTsconfigPath = join(projectDirectory, 'apps', 'express', 'tsconfig.json');
    const indexTsPath: TestsCliScaffoldAppExpressjsRunIndexTsPath = join(projectDirectory, 'apps', 'express', 'src', 'index.ts');

    await access(workspacePackageJsonPath);

    await access(tsconfigPath);

    await access(indexTsPath);

    return;
  });

  return;
});

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

import { CliScaffoldAppNextjs } from '../../../../cli/scaffold/app/nextjs.js';

import type {
  TestsCliScaffoldAppNextjsRunChildDirectory,
  TestsCliScaffoldAppNextjsRunChildPackageJson,
  TestsCliScaffoldAppNextjsRunChildPackageJsonPath,
  TestsCliScaffoldAppNextjsRunDryRunOutputPath,
  TestsCliScaffoldAppNextjsRunExists,
  TestsCliScaffoldAppNextjsRunNextConfigPath,
  TestsCliScaffoldAppNextjsRunNovaConfigPath,
  TestsCliScaffoldAppNextjsRunOriginalCwd,
  TestsCliScaffoldAppNextjsRunPackageJson,
  TestsCliScaffoldAppNextjsRunPackageJsonPath,
  TestsCliScaffoldAppNextjsRunPageTsxPath,
  TestsCliScaffoldAppNextjsRunProjectDirectory,
  TestsCliScaffoldAppNextjsRunRootDirectory,
  TestsCliScaffoldAppNextjsRunRootPackageJson,
  TestsCliScaffoldAppNextjsRunRootPackageJsonPath,
  TestsCliScaffoldAppNextjsRunSandboxRoot,
  TestsCliScaffoldAppNextjsRunTemporaryBase,
  TestsCliScaffoldAppNextjsRunTemporaryDirectory,
  TestsCliScaffoldAppNextjsRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/scaffold/app/nextjs.test.d.ts';

/**
 * Tests - CLI - Scaffold - App - Next.js - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldAppNextjs.run', async () => {
  const originalCwd: TestsCliScaffoldAppNextjsRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliScaffoldAppNextjsRunTemporaryDirectory = tmpdir();
  const temporaryBase: TestsCliScaffoldAppNextjsRunTemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliScaffoldAppNextjsRunSandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: TestsCliScaffoldAppNextjsRunRootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: TestsCliScaffoldAppNextjsRunChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: TestsCliScaffoldAppNextjsRunRootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: TestsCliScaffoldAppNextjsRunRootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: TestsCliScaffoldAppNextjsRunChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: TestsCliScaffoldAppNextjsRunChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldAppNextjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: TestsCliScaffoldAppNextjsRunProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldAppNextjsRunPackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: TestsCliScaffoldAppNextjsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliScaffoldAppNextjsRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({
      dryRun: true,
      name: 'my-app',
      workspaceName: 'nextjs',
      output: './my-app',
    });

    let exists: TestsCliScaffoldAppNextjsRunExists = true;

    const dryRunOutputPath: TestsCliScaffoldAppNextjsRunDryRunOutputPath = join(projectDirectory, 'my-app');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: TestsCliScaffoldAppNextjsRunProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({
      name: 'my-app',
      workspaceName: 'nextjs',
      output: './my-app',
    });

    // Verify root files were created.
    const rootPackageJsonPath: TestsCliScaffoldAppNextjsRunRootPackageJsonPath = join(projectDirectory, 'my-app', 'package.json');
    const novaConfigPath: TestsCliScaffoldAppNextjsRunNovaConfigPath = join(projectDirectory, 'my-app', 'nova.config.json');

    await access(rootPackageJsonPath);

    await access(novaConfigPath);

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldAppNextjsRunWorkspacePackageJsonPath = join(projectDirectory, 'my-app', 'apps', 'nextjs', 'package.json');
    const nextConfigPath: TestsCliScaffoldAppNextjsRunNextConfigPath = join(projectDirectory, 'my-app', 'apps', 'nextjs', 'next.config.mjs');
    const pageTsxPath: TestsCliScaffoldAppNextjsRunPageTsxPath = join(projectDirectory, 'my-app', 'apps', 'nextjs', 'src', 'app', 'page.tsx');

    await access(workspacePackageJsonPath);

    await access(nextConfigPath);

    await access(pageTsxPath);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: TestsCliScaffoldAppNextjsRunProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldAppNextjsRunPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: TestsCliScaffoldAppNextjsRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldAppNextjs.run({
      name: 'my-app',
      workspaceName: 'nextjs',
      output: './apps/nextjs',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldAppNextjsRunWorkspacePackageJsonPath = join(projectDirectory, 'apps', 'nextjs', 'package.json');
    const nextConfigPath: TestsCliScaffoldAppNextjsRunNextConfigPath = join(projectDirectory, 'apps', 'nextjs', 'next.config.mjs');
    const pageTsxPath: TestsCliScaffoldAppNextjsRunPageTsxPath = join(projectDirectory, 'apps', 'nextjs', 'src', 'app', 'page.tsx');

    await access(workspacePackageJsonPath);

    await access(nextConfigPath);

    await access(pageTsxPath);

    return;
  });

  return;
});

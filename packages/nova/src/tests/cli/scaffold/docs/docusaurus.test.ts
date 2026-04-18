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

import { CliScaffoldDocsDocusaurus } from '../../../../cli/scaffold/docs/docusaurus.js';

import type {
  TestsCliScaffoldDocsDocusaurusRunChildDirectory,
  TestsCliScaffoldDocsDocusaurusRunChildPackageJson,
  TestsCliScaffoldDocsDocusaurusRunChildPackageJsonPath,
  TestsCliScaffoldDocsDocusaurusRunDocusaurusConfigPath,
  TestsCliScaffoldDocsDocusaurusRunDryRunOutputPath,
  TestsCliScaffoldDocsDocusaurusRunExists,
  TestsCliScaffoldDocsDocusaurusRunIntroMdPath,
  TestsCliScaffoldDocsDocusaurusRunOriginalCwd,
  TestsCliScaffoldDocsDocusaurusRunPackageJson,
  TestsCliScaffoldDocsDocusaurusRunPackageJsonPath,
  TestsCliScaffoldDocsDocusaurusRunProjectDirectory,
  TestsCliScaffoldDocsDocusaurusRunRootDirectory,
  TestsCliScaffoldDocsDocusaurusRunRootPackageJson,
  TestsCliScaffoldDocsDocusaurusRunRootPackageJsonPath,
  TestsCliScaffoldDocsDocusaurusRunSandboxRoot,
  TestsCliScaffoldDocsDocusaurusRunTemporaryBase,
  TestsCliScaffoldDocsDocusaurusRunTemporaryDirectory,
  TestsCliScaffoldDocsDocusaurusRunWorkspacePackageJsonPath,
} from '../../../../types/tests/cli/scaffold/docs/docusaurus.test.d.ts';

/**
 * Tests - CLI - Scaffold - Docs - Docusaurus - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldDocsDocusaurus.run', async () => {
  const originalCwd: TestsCliScaffoldDocsDocusaurusRunOriginalCwd = process.cwd();
  const temporaryDirectory: TestsCliScaffoldDocsDocusaurusRunTemporaryDirectory = tmpdir();
  const temporaryBase: TestsCliScaffoldDocsDocusaurusRunTemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsCliScaffoldDocsDocusaurusRunSandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: TestsCliScaffoldDocsDocusaurusRunRootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: TestsCliScaffoldDocsDocusaurusRunChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: TestsCliScaffoldDocsDocusaurusRunRootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: TestsCliScaffoldDocsDocusaurusRunRootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: TestsCliScaffoldDocsDocusaurusRunChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: TestsCliScaffoldDocsDocusaurusRunChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldDocsDocusaurus.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: TestsCliScaffoldDocsDocusaurusRunProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldDocsDocusaurus.run({
      dryRun: true,
      name: 'my-docs',
      workspaceName: 'docusaurus',
      output: './my-docs',
    });

    let exists: TestsCliScaffoldDocsDocusaurusRunExists = true;

    const dryRunOutputPath: TestsCliScaffoldDocsDocusaurusRunDryRunOutputPath = join(projectDirectory, 'my-docs');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: TestsCliScaffoldDocsDocusaurusRunProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldDocsDocusaurus.run({
      name: 'my-docs',
      workspaceName: 'docusaurus',
      output: './my-docs',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldDocsDocusaurusRunWorkspacePackageJsonPath = join(projectDirectory, 'my-docs', 'apps', 'docusaurus', 'package.json');
    const docusaurusConfigPath: TestsCliScaffoldDocsDocusaurusRunDocusaurusConfigPath = join(projectDirectory, 'my-docs', 'apps', 'docusaurus', 'docusaurus.config.ts');
    const introMdPath: TestsCliScaffoldDocsDocusaurusRunIntroMdPath = join(projectDirectory, 'my-docs', 'apps', 'docusaurus', 'docs', 'intro.md');

    await access(workspacePackageJsonPath);

    await access(docusaurusConfigPath);

    await access(introMdPath);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: TestsCliScaffoldDocsDocusaurusRunProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldDocsDocusaurusRunPackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: TestsCliScaffoldDocsDocusaurusRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldDocsDocusaurus.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: TestsCliScaffoldDocsDocusaurusRunProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: TestsCliScaffoldDocsDocusaurusRunPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: TestsCliScaffoldDocsDocusaurusRunPackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldDocsDocusaurus.run({
      name: 'my-docs',
      workspaceName: 'docusaurus',
      output: './apps/docusaurus',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: TestsCliScaffoldDocsDocusaurusRunWorkspacePackageJsonPath = join(projectDirectory, 'apps', 'docusaurus', 'package.json');
    const docusaurusConfigPath: TestsCliScaffoldDocsDocusaurusRunDocusaurusConfigPath = join(projectDirectory, 'apps', 'docusaurus', 'docusaurus.config.ts');
    const introMdPath: TestsCliScaffoldDocsDocusaurusRunIntroMdPath = join(projectDirectory, 'apps', 'docusaurus', 'docs', 'intro.md');

    await access(workspacePackageJsonPath);

    await access(docusaurusConfigPath);

    await access(introMdPath);

    return;
  });

  return;
});

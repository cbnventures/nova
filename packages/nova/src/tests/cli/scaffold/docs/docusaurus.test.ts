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

import { Runner as CliScaffoldDocsDocusaurus } from '../../../../cli/scaffold/docs/docusaurus.js';

import type {
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ChildDirectory,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ChildPackageJson,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ChildPackageJsonPath,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_DocusaurusConfigPath,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_DryRunOutputPath,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_Exists,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_IntroMdPath,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_OriginalCwd,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_PackageJson,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_PackageJsonPath,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ProjectDirectory,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_RootDirectory,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_RootPackageJson,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_RootPackageJsonPath,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_SandboxRoot,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_TemporaryBase,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_TemporaryDirectory,
  Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_WorkspacePackageJsonPath,
} from '../../../../types/tests/cli/scaffold/docs/docusaurus.test.d.ts';

/**
 * Tests - CLI - Scaffold - Docs - Docusaurus - Run.
 *
 * @since 0.15.0
 */
describe.skip('CliScaffoldDocsDocusaurus.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_TemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('exits with error when inside child workspace', async () => {
    const rootDirectory: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_RootDirectory = join(sandboxRoot, 'nested-root');
    const childDirectory: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ChildDirectory = join(rootDirectory, 'apps', 'child');

    await mkdir(childDirectory, { recursive: true });

    const rootPackageJson: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_RootPackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);

    const rootPackageJsonPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_RootPackageJsonPath = join(rootDirectory, 'package.json');

    await writeFile(rootPackageJsonPath, `${rootPackageJson}\n`, 'utf-8');

    const childPackageJson: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ChildPackageJson = JSON.stringify({ name: 'child' }, null, 2);
    const childPackageJsonPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ChildPackageJsonPath = join(childDirectory, 'package.json');

    await writeFile(childPackageJsonPath, `${childPackageJson}\n`, 'utf-8');

    process.chdir(childDirectory);

    await CliScaffoldDocsDocusaurus.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('respects dry-run', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldDocsDocusaurus.run({
      dryRun: true,
      name: 'my-docs',
      workspaceName: 'docusaurus',
      output: './my-docs',
    });

    let exists: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_Exists = true;

    const dryRunOutputPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_DryRunOutputPath = join(projectDirectory, 'my-docs');

    try {
      await access(dryRunOutputPath);
    } catch {
      exists = false;
    }

    strictEqual(exists, false);

    return;
  });

  it('creates monorepo in empty directory', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ProjectDirectory = join(sandboxRoot, 'monorepo-test');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    await CliScaffoldDocsDocusaurus.run({
      name: 'my-docs',
      workspaceName: 'docusaurus',
      output: './my-docs',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_WorkspacePackageJsonPath = join(projectDirectory, 'my-docs', 'apps', 'docusaurus', 'package.json');
    const docusaurusConfigPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_DocusaurusConfigPath = join(projectDirectory, 'my-docs', 'apps', 'docusaurus', 'docusaurus.config.ts');
    const introMdPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_IntroMdPath = join(projectDirectory, 'my-docs', 'apps', 'docusaurus', 'docs', 'intro.md');

    await access(workspacePackageJsonPath);

    await access(docusaurusConfigPath);

    await access(introMdPath);

    return;
  });

  it('exits with error for standalone project', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ProjectDirectory = join(sandboxRoot, 'standalone');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_PackageJson = JSON.stringify({ name: 'standalone' }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldDocsDocusaurus.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('adds workspace at monorepo root', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_ProjectDirectory = join(sandboxRoot, 'workspace-test');

    await mkdir(projectDirectory, { recursive: true });

    const packageJson: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_PackageJson = JSON.stringify({
      name: 'root', workspaces: ['apps/*'],
    }, null, 2);
    const packageJsonPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, `${packageJson}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliScaffoldDocsDocusaurus.run({
      name: 'my-docs',
      workspaceName: 'docusaurus',
      output: './apps/docusaurus',
    });

    // Verify workspace files were created.
    const workspacePackageJsonPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_WorkspacePackageJsonPath = join(projectDirectory, 'apps', 'docusaurus', 'package.json');
    const docusaurusConfigPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_DocusaurusConfigPath = join(projectDirectory, 'apps', 'docusaurus', 'docusaurus.config.ts');
    const introMdPath: Tests_Cli_Scaffold_Docs_Docusaurus_CliScaffoldDocsDocusaurusRun_IntroMdPath = join(projectDirectory, 'apps', 'docusaurus', 'docs', 'intro.md');

    await access(workspacePackageJsonPath);

    await access(docusaurusConfigPath);

    await access(introMdPath);

    return;
  });

  return;
});

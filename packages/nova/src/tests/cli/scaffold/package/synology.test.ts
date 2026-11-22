import {
  deepStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
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

import { Runner as CliScaffoldPackageSynology } from '../../../../cli/scaffold/package/synology.js';

import type {
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_Info,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_NovaConfig,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_NovaConfigPath,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_PackageJson,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_ProjectDirectory,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_PublishWorkflow,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_ScriptStats,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_UiConfig,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_WorkspaceDirectory,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_OriginalCwd,
  Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_SandboxRoot,
} from '../../../../types/tests/cli/scaffold/package/synology.test.d.ts';

/**
 * Tests - CLI - Scaffold - Package - Synology - Run.
 *
 * @since 0.50.0
 */
describe.sequential('CliScaffoldPackageSynology.run', async () => {
  const originalCwd: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_OriginalCwd = process.cwd();
  const sandboxRoot: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-scaffold-synology-'));

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  afterEach(() => {
    process.exitCode = undefined;

    return;
  });

  it('adds a configured Synology package', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_ProjectDirectory = join(sandboxRoot, 'project');
    const workspaceDirectory: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_WorkspaceDirectory = join(projectDirectory, 'packages', 'media-indexer');
    const novaConfigPath: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_NovaConfigPath = join(projectDirectory, 'nova.config.json');

    await mkdir(projectDirectory, { recursive: true });

    await Promise.all([
      writeFile(join(projectDirectory, 'package.json'), `${JSON.stringify({
        name: 'synology-project',
        private: true,
        workspaces: ['packages/*'],
      }, null, 2)}\n`, 'utf-8'),
      writeFile(novaConfigPath, `${JSON.stringify({
        project: {
          name: {
            slug: 'synology-project',
            title: 'Synology Project',
          },
          legalName: 'Example Company',
          description: {
            short: 'Indexes media stored on a Synology NAS.',
          },
          platforms: ['nodejs'],
        },
        urls: {
          homepage: 'https://example.com',
          bugs: 'https://example.com/issues',
        },
        workspaces: {
          './': {
            name: 'synology-project',
            role: 'project',
            policy: 'freezable',
          },
        },
      }, null, 2)}\n`, 'utf-8'),
    ]);

    process.chdir(projectDirectory);

    await CliScaffoldPackageSynology.run({
      install: false,
      nonInteractive: true,
      output: './packages/media-indexer',
      usrLocalLink: true,
      workspaceName: 'media-indexer',
    });

    await Promise.all([
      access(join(workspaceDirectory, 'PACKAGE_ICON.PNG')),
      access(join(workspaceDirectory, 'PACKAGE_ICON_256.PNG')),
      access(join(workspaceDirectory, 'conf', 'privilege')),
      access(join(workspaceDirectory, 'conf', 'resource')),
      access(join(workspaceDirectory, 'scripts', 'build-package.mjs')),
      access(join(workspaceDirectory, 'scripts', 'check-package.mjs')),
      access(join(workspaceDirectory, 'src', 'bin', 'example-service')),
      access(join(workspaceDirectory, 'src', 'ui', 'app.js')),
      access(join(workspaceDirectory, 'src', 'ui', 'status.cgi')),
      access(join(workspaceDirectory, 'src', 'ui', 'texts', 'enu', 'strings')),
      access(join(workspaceDirectory, 'WIZARD_UIFILES', 'install_uifile')),
      access(join(workspaceDirectory, 'WIZARD_UIFILES', 'uninstall_uifile')),
    ]);

    const packageJson: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_PackageJson = JSON.parse(await readFile(join(workspaceDirectory, 'package.json'), 'utf-8')) as Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_PackageJson;
    const info: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_Info = await readFile(join(workspaceDirectory, 'INFO'), 'utf-8');
    const uiConfig: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_UiConfig = await readFile(join(workspaceDirectory, 'src', 'ui', 'config'), 'utf-8');
    const scriptStats: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_ScriptStats = await stat(join(workspaceDirectory, 'scripts', 'start-stop-status'));
    const novaConfig: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_NovaConfig = JSON.parse(await readFile(novaConfigPath, 'utf-8')) as Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_NovaConfig;
    const publishWorkflow: Tests_Cli_Scaffold_Package_Synology_CliScaffoldPackageSynologyRun_AddsAConfiguredSynologyPackage_PublishWorkflow = novaConfig['workflows'][0];

    strictEqual(packageJson['name'], 'synology-pkg-media-indexer');
    strictEqual(packageJson['private'], true);
    ok(info.includes('package="synology-pkg-media-indexer"'));
    ok(info.includes(`version="${packageJson['version']}"`));
    ok(info.includes('os_min_ver="7.0-40000"'));
    ok(info.includes('maintainer="Example Company"'));
    ok(info.includes('dsmuidir="ui"'));
    ok(info.includes('dsmappname="SYNO.SDS.MediaIndexer.Instance"'));
    ok(uiConfig.includes('"appWindow": "SYNO.SDS.MediaIndexer.MainWindow"'));
    strictEqual(scriptStats.mode.toString(8).endsWith('755'), true);
    deepStrictEqual(novaConfig['project']['platforms'], [
      'nodejs',
      'synology',
    ]);
    deepStrictEqual(novaConfig['workspaces']['./packages/media-indexer'], {
      name: 'synology-pkg-media-indexer',
      role: 'package',
      policy: 'trackable',
    });
    deepStrictEqual(novaConfig['artifacts']['synology-pkg-media-indexer'], {
      build: ['./packages/media-indexer'],
      sources: [{
        from: './packages/media-indexer/build/release',
        to: './',
      }],
    });
    ok(publishWorkflow !== undefined);
    deepStrictEqual(publishWorkflow['deploy'], [{
      to: 'synology',
      path: './packages/media-indexer',
    }]);
    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});

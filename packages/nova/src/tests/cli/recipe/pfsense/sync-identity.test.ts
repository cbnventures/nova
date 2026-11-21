import { ok, strictEqual } from 'node:assert/strict';
import {
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
  vi,
} from 'vitest';

import { Runner as CliRecipePfsenseSyncIdentity } from '../../../../cli/recipe/pfsense/sync-identity.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import { wrapPfsensePackageDescription } from '../../../../lib/pfsense-identity.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_About,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_BaseConfig,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_DryRunWritesNothing_MakefileOutput,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_DryRunWritesNothing_ProjectDirectory,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_DryRunWritesNothing_SaveGeneratedFileSpy,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_ErrorsAndWritesNothingWhenTheCommentIsOver70Characters_InfoOutput,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_ErrorsAndWritesNothingWhenTheCommentIsOver70Characters_MakefileOutput,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_ErrorsAndWritesNothingWhenTheCommentIsOver70Characters_ProjectDirectory,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_Info,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_LongDescription,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_Makefile,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_OriginalCwd,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_SandboxRoot,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_SkipsWorkspacesWithoutAPortMakefile_ProjectDirectory,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_SkipsWorkspacesWithoutAPortMakefile_SaveGeneratedFileSpy,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_UsesTheWorkspaceCommentOverride_MakefileOutput,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_UsesTheWorkspaceCommentOverride_ProjectDirectory,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WriteFixture_PortDirectory,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WriteFixture_ProjectDirectory,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WriteFixture_Returns,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_AboutOutput,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_InfoOutput,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_MakefileOutput,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_PackageDescriptionOutput,
  Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_ProjectDirectory,
} from '../../../../types/tests/cli/recipe/pfsense/sync-identity.test.d.ts';

/**
 * Tests - CLI - Recipe - Pfsense - Sync Identity - Run.
 *
 * @since 0.49.0
 */
describe('CliRecipePfsenseSyncIdentity.run', async () => {
  const originalCwd: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_OriginalCwd = process.cwd();
  const sandboxRoot: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-pfsense-sync-identity-'));
  const makefile: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_Makefile = [
    'PORTNAME=\tpfSense-pkg-Firewall',
    'DISTVERSION=\t%%NOVA_PORTVERSION%%',
    'CATEGORIES=\tsysutils',
    'MASTER_SITES=\t# empty',
    '',
    'MAINTAINER?=\told@example.com',
    'COMMENT=\tFirewall package for pfSense',
    'WWW=\thttps://old.example.com/',
    '',
    'LICENSE=\tMIT',
    '',
    '.include <bsd.port.mk>',
    '',
  ].join('\n');
  const info: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_Info = [
    '<?xml version="1.0"?>',
    '<pfsensepkgs>',
    '\t<package>',
    '\t\t<name>Firewall</name>',
    '\t\t<descr><![CDATA[Old description.]]></descr>',
    '\t\t<version>%%PKGVERSION%%</version>',
    '\t</package>',
    '</pfsensepkgs>',
    '',
  ].join('\n');
  const about: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_About = [
    '<?php',
    '$projectDescription = \'Old description\';',
    '$projectRepository = \'https://github.com/example/firewall\';',
    '',
  ].join('\n');
  const longDescription: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_LongDescription = 'Firewall is a native pfSense package that blocks unwanted websites for the whole network, each VLAN, or a single device, and keeps its lists on the firewall.';
  const baseConfig: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_BaseConfig = {
    project: {
      description: {
        short: 'Blocks the owner\'s unwanted websites',
        long: longDescription,
      },
    },
    entities: [{
      name: 'Jane Doe',
      email: 'jane@example.com',
      roles: ['author'],
    }],
    urls: {
      homepage: 'https://example.com/firewall/',
    },
    workspaces: {
      './': {
        name: 'firewall-project',
        role: 'project',
        policy: 'freezable',
      },
      './packages/firewall': {
        name: 'pfsense-pkg-firewall',
        role: 'package',
        policy: 'trackable',
      },
    },
    recipes: {
      pfsense: {
        'sync-identity': {
          enabled: true,
        },
      },
    },
  };

  afterEach(() => {
    vi.restoreAllMocks();

    process.chdir(originalCwd);

    process.exitCode = 0;

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  /**
   * Tests - CLI - Recipe - Pfsense - Sync Identity - Write Fixture.
   *
   * Writes a minimal pfSense port under "packages/firewall" so each test starts
   * from the same Makefile, info.xml, pkg-descr, and About page.
   *
   * @param {Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WriteFixture_ProjectDirectory} projectDirectory - Project directory.
   *
   * @returns {Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WriteFixture_Returns}
   *
   * @since 0.49.0
   */
  async function writeFixture(projectDirectory: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WriteFixture_ProjectDirectory): Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WriteFixture_Returns {
    const portDirectory: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WriteFixture_PortDirectory = join(projectDirectory, 'packages', 'firewall', 'port');

    await mkdir(join(portDirectory, 'files', 'usr', 'local', 'share', 'pfSense-pkg-Firewall'), { recursive: true });

    await mkdir(join(portDirectory, 'files', 'usr', 'local', 'www'), { recursive: true });

    await Promise.all([
      writeFile(join(portDirectory, 'Makefile.template'), makefile, 'utf-8'),
      writeFile(join(portDirectory, 'pkg-descr'), 'Old long description.\n', 'utf-8'),
      writeFile(join(portDirectory, 'files', 'usr', 'local', 'share', 'pfSense-pkg-Firewall', 'info.xml'), info, 'utf-8'),
      writeFile(join(portDirectory, 'files', 'usr', 'local', 'www', 'firewall-about.php'), about, 'utf-8'),
    ]);

    return;
  }

  it('writes every field and keeps everything else byte identical', async () => {
    const projectDirectory: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'writes-'));

    await writeFixture(projectDirectory);

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(baseConfig);

    process.chdir(projectDirectory);

    await CliRecipePfsenseSyncIdentity.run({
      replaceFile: true,
    });

    const makefileOutput: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_MakefileOutput = await readFile(join(projectDirectory, 'packages', 'firewall', 'port', 'Makefile.template'), 'utf-8');
    const infoOutput: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_InfoOutput = await readFile(join(projectDirectory, 'packages', 'firewall', 'port', 'files', 'usr', 'local', 'share', 'pfSense-pkg-Firewall', 'info.xml'), 'utf-8');
    const packageDescriptionOutput: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_PackageDescriptionOutput = await readFile(join(projectDirectory, 'packages', 'firewall', 'port', 'pkg-descr'), 'utf-8');
    const aboutOutput: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_WritesEveryFieldAndKeepsEverythingElseByteIdentical_AboutOutput = await readFile(join(projectDirectory, 'packages', 'firewall', 'port', 'files', 'usr', 'local', 'www', 'firewall-about.php'), 'utf-8');

    strictEqual(makefileOutput, makefile
      .replace('MAINTAINER?=\told@example.com', 'MAINTAINER?=\tjane@example.com')
      .replace('COMMENT=\tFirewall package for pfSense', 'COMMENT=\tBlocks the owner\'s unwanted websites')
      .replace('WWW=\thttps://old.example.com/', 'WWW=\thttps://example.com/firewall/'));
    strictEqual(infoOutput, info.replace('Old description.', 'Blocks the owner\'s unwanted websites.'));
    strictEqual(packageDescriptionOutput, wrapPfsensePackageDescription(longDescription));
    ok(packageDescriptionOutput.split('\n').every((packageDescriptionLine) => packageDescriptionLine.length <= 80));
    ok(packageDescriptionOutput.includes('WWW:') === false);
    strictEqual(aboutOutput, about.replace('$projectDescription = \'Old description\';', '$projectDescription = \'Blocks the owner\\\'s unwanted websites\';'));
    ok(process.exitCode !== 1);

    return;
  });

  it('dry run writes nothing', async () => {
    const projectDirectory: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_DryRunWritesNothing_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'dry-run-'));

    await writeFixture(projectDirectory);

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(baseConfig);

    const saveGeneratedFileSpy: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_DryRunWritesNothing_SaveGeneratedFileSpy = vi.spyOn(utility, 'saveGeneratedFile');

    process.chdir(projectDirectory);

    await CliRecipePfsenseSyncIdentity.run({
      dryRun: true,
    });

    const makefileOutput: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_DryRunWritesNothing_MakefileOutput = await readFile(join(projectDirectory, 'packages', 'firewall', 'port', 'Makefile.template'), 'utf-8');

    strictEqual(saveGeneratedFileSpy.mock.calls.length, 0);
    strictEqual(makefileOutput, makefile);

    return;
  });

  it('errors and writes nothing when the comment is over 70 characters', async () => {
    const projectDirectory: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_ErrorsAndWritesNothingWhenTheCommentIsOver70Characters_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'too-long-'));

    await writeFixture(projectDirectory);

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      ...baseConfig,
      project: {
        description: {
          short: 'x'.repeat(71),
          long: longDescription,
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipePfsenseSyncIdentity.run({
      replaceFile: true,
    });

    const makefileOutput: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_ErrorsAndWritesNothingWhenTheCommentIsOver70Characters_MakefileOutput = await readFile(join(projectDirectory, 'packages', 'firewall', 'port', 'Makefile.template'), 'utf-8');
    const infoOutput: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_ErrorsAndWritesNothingWhenTheCommentIsOver70Characters_InfoOutput = await readFile(join(projectDirectory, 'packages', 'firewall', 'port', 'files', 'usr', 'local', 'share', 'pfSense-pkg-Firewall', 'info.xml'), 'utf-8');

    strictEqual(makefileOutput, makefile);
    strictEqual(infoOutput, info);
    strictEqual(process.exitCode, 1);

    return;
  });

  it('uses the workspace comment override', async () => {
    const projectDirectory: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_UsesTheWorkspaceCommentOverride_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'override-'));

    await writeFixture(projectDirectory);

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      ...baseConfig,
      project: {
        description: {
          short: 'x'.repeat(90),
          long: longDescription,
        },
      },
      workspaces: {
        './packages/firewall': {
          name: 'pfsense-pkg-firewall',
          role: 'package',
          policy: 'trackable',
          pfsense: {
            comment: 'Block unwanted websites on pfSense networks',
          },
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipePfsenseSyncIdentity.run({
      replaceFile: true,
    });

    const makefileOutput: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_UsesTheWorkspaceCommentOverride_MakefileOutput = await readFile(join(projectDirectory, 'packages', 'firewall', 'port', 'Makefile.template'), 'utf-8');

    ok(makefileOutput.includes('COMMENT=\tBlock unwanted websites on pfSense networks\n'));
    ok(process.exitCode !== 1);

    return;
  });

  it('skips workspaces without a port makefile', async () => {
    const projectDirectory: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_SkipsWorkspacesWithoutAPortMakefile_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'skips-'));

    await mkdir(join(projectDirectory, 'packages', 'firewall'), { recursive: true });

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(baseConfig);

    const saveGeneratedFileSpy: Tests_Cli_Recipe_Pfsense_SyncIdentity_CliRecipePfsenseSyncIdentityRun_SkipsWorkspacesWithoutAPortMakefile_SaveGeneratedFileSpy = vi.spyOn(utility, 'saveGeneratedFile');

    process.chdir(projectDirectory);

    await CliRecipePfsenseSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(saveGeneratedFileSpy.mock.calls.length, 0);
    ok(process.exitCode !== 1);

    return;
  });

  return;
});

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
} from 'vitest';

import { Runner as CliRecipePfsenseSyncIdentity } from '../../../../cli/recipe/pfsense/sync-identity.js';
import { Runner as CliScaffoldPackagePfsense } from '../../../../cli/scaffold/package/pfsense.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import { wrapPfsensePackageDescription } from '../../../../lib/pfsense-identity.js';
import { LIB_REGEX_PLACEHOLDER_PFSENSE_PORT_COMMENT } from '../../../../lib/regex.js';

import type {
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Config,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizedMakefile,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizeWorkspace,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Info,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_LongDescription,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_PackageDescription,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_PortDirectory,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_ProjectDirectory,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_ResyncedMakefile,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_WorkspaceDirectory,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_ProjectDirectory,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_ResolveReplacements,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_Result,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_SandboxRoot,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_ProjectDirectory,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_Replacements,
  Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_ResolveReplacements,
} from '../../../../types/tests/cli/scaffold/package/pfsense.test.d.ts';

/**
 * Tests - CLI - Scaffold - Package - Pfsense - CLI Scaffold Package Pfsense.
 *
 * @since 0.49.0
 */
describe('CliScaffoldPackagePfsense', async () => {
  const sandboxRoot: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-scaffold-pfsense-'));

  afterEach(() => {
    process.exitCode = 0;

    return;
  });

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('writes the port comment from the short description', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'comment-'));

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
      project: {
        description: {
          short: 'Owner\'s firewall package.',
        },
      },
      entities: [{
        name: 'Project Author',
        email: 'author@example.com',
        roles: ['author'],
      }],
    }), 'utf-8');

    const resolveReplacements: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_ResolveReplacements = Reflect.get(CliScaffoldPackagePfsense, 'resolveReplacements') as Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_ResolveReplacements;
    const replacements: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_WritesThePortCommentFromTheShortDescription_Replacements = await resolveReplacements('firewall', projectDirectory);

    ok(replacements !== undefined);
    strictEqual(replacements.get(LIB_REGEX_PLACEHOLDER_PFSENSE_PORT_COMMENT), 'Owner\'s firewall package');

    return;
  });

  it('rejects a comment over 70 characters', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'too-long-'));

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
      project: {
        description: {
          short: 'x'.repeat(71),
        },
      },
      entities: [{
        name: 'Project Author',
        email: 'author@example.com',
        roles: ['author'],
      }],
    }), 'utf-8');

    const resolveReplacements: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_ResolveReplacements = Reflect.get(CliScaffoldPackagePfsense, 'resolveReplacements') as Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_ResolveReplacements;
    const result: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_RejectsACommentOver70Characters_Result = await resolveReplacements('firewall', projectDirectory);

    strictEqual(result, undefined);
    strictEqual(process.exitCode, 1);

    return;
  });

  it('finalize writes the same values as the sync identity recipe', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'finalize-'));
    const workspaceDirectory: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_WorkspaceDirectory = join(projectDirectory, 'packages', 'firewall');
    const portDirectory: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_PortDirectory = join(workspaceDirectory, 'port');
    const longDescription: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_LongDescription = 'Firewall blocks unwanted websites for the whole network, each VLAN, or one device, and keeps its block lists on the firewall itself.';

    await mkdir(join(portDirectory, 'files', 'usr', 'local', 'share', 'pfSense-pkg-Firewall'), { recursive: true });

    await Promise.all([
      writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
        project: {
          description: {
            short: 'Block unwanted websites on pfSense',
            long: longDescription,
          },
        },
        entities: [{
          name: 'Project Author',
          email: 'author@example.com',
          roles: ['author'],
        }],
        urls: {
          homepage: 'https://example.com/firewall/',
        },
      }), 'utf-8'),
      writeFile(join(portDirectory, 'Makefile.template'), [
        'MAINTAINER?=\tauthor@example.com',
        'COMMENT=\tBlock unwanted websites on pfSense',
        'WWW=\thttps://example.com/firewall/',
        '',
      ].join('\n'), 'utf-8'),
      writeFile(join(portDirectory, 'pkg-descr'), 'Starter text.\n', 'utf-8'),
      writeFile(join(portDirectory, 'files', 'usr', 'local', 'share', 'pfSense-pkg-Firewall', 'info.xml'), '<descr><![CDATA[Starter text.]]></descr>', 'utf-8'),
    ]);

    const finalizeWorkspace: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizeWorkspace = Reflect.get(CliScaffoldPackagePfsense, 'finalizeWorkspace') as Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizeWorkspace;

    await finalizeWorkspace(workspaceDirectory, projectDirectory);

    const packageDescription: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_PackageDescription = await readFile(join(portDirectory, 'pkg-descr'), 'utf-8');
    const info: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Info = await readFile(join(portDirectory, 'files', 'usr', 'local', 'share', 'pfSense-pkg-Firewall', 'info.xml'), 'utf-8');
    const finalizedMakefile: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizedMakefile = await readFile(join(portDirectory, 'Makefile.template'), 'utf-8');

    strictEqual(packageDescription, wrapPfsensePackageDescription(longDescription));
    strictEqual(info, '<descr><![CDATA[Block unwanted websites on pfSense.]]></descr>');

    // Running the recipe afterward must find nothing left to change.
    const config: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Config = await new LibNovaConfig().load(projectDirectory);

    await CliRecipePfsenseSyncIdentity.syncWorkspace(workspaceDirectory, './packages/firewall', config, false, true, true);

    const resyncedMakefile: Tests_Cli_Scaffold_Package_Pfsense_CliScaffoldPackagePfsense_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_ResyncedMakefile = await readFile(join(portDirectory, 'Makefile.template'), 'utf-8');

    strictEqual(resyncedMakefile, finalizedMakefile);
    strictEqual(await readFile(join(portDirectory, 'pkg-descr'), 'utf-8'), packageDescription);

    return;
  });

  return;
});

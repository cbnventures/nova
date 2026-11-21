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

import { Runner as CliRecipeGithubActionSyncIdentity } from '../../../../cli/recipe/github-action/sync-identity.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_AddsAMissingAuthorAfterTheDescription_ActionPath,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_AddsAMissingAuthorAfterTheDescription_Output,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_AddsAMissingAuthorAfterTheDescription_ProjectDirectory,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_BaseConfig,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_DryRunWritesNothing_ActionPath,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_DryRunWritesNothing_Output,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_DryRunWritesNothing_ProjectDirectory,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_ErrorsAndWritesNothingWhenTheDescriptionIsOverTheMarketplaceLimit_ActionPath,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_ErrorsAndWritesNothingWhenTheDescriptionIsOverTheMarketplaceLimit_Output,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_ErrorsAndWritesNothingWhenTheDescriptionIsOverTheMarketplaceLimit_ProjectDirectory,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_Manifest,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_OriginalCwd,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_SandboxRoot,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_SkipsWorkspacesWithoutAnActionManifest_ProjectDirectory,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_SkipsWorkspacesWithoutAnActionManifest_SaveGeneratedFileSpy,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_SyncedManifest,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_UsesTheWorkspaceDescriptionOverride_ActionPath,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_UsesTheWorkspaceDescriptionOverride_Output,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_UsesTheWorkspaceDescriptionOverride_ProjectDirectory,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_WritesNameDescriptionAndAuthorAndKeepsEverythingElseByteIdentical_ActionPath,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_WritesNameDescriptionAndAuthorAndKeepsEverythingElseByteIdentical_Output,
  Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_WritesNameDescriptionAndAuthorAndKeepsEverythingElseByteIdentical_ProjectDirectory,
} from '../../../../types/tests/cli/recipe/github-action/sync-identity.test.d.ts';

/**
 * Tests - CLI - Recipe - GitHub Action - Sync Identity - Run.
 *
 * @since 0.49.0
 */
describe('CliRecipeGithubActionSyncIdentity.run', async () => {
  const originalCwd: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_OriginalCwd = process.cwd();
  const sandboxRoot: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-github-action-sync-identity-'));
  const manifest: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_Manifest = [
    '# Lock threads action',
    'name: \'Old Name\' # Marketplace listing',
    'description: "Old description"',
    'author: Someone Else',
    '',
    'branding:',
    '  icon: "lock"',
    '  color: "orange"',
    '',
    'inputs:',
    '  GITHUB_TOKEN:',
    '    description: "Token used to lock threads"',
    '    required: true',
    '',
    'outputs:',
    '  locked:',
    '    description: \'Locked thread count\'',
    '',
    'runs:',
    '  using: "node24"',
    '  main: "./packages/lock-threads/build/index.js"',
    '',
  ].join('\n');
  const syncedManifest: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_SyncedManifest = manifest
    .replace('name: \'Old Name\'', 'name: \'Lock Threads\'')
    .replace('description: "Old description"', 'description: "Locks quiet threads"')
    .replace('author: Someone Else', 'author: Jane Doe');
  const baseConfig: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_BaseConfig = {
    project: {
      description: {
        short: 'Locks quiet threads',
      },
    },
    entities: [{
      name: 'Jane Doe',
      roles: ['author'],
    }],
    workspaces: {
      './': {
        name: 'lock-threads-project',
        role: 'project',
        policy: 'freezable',
      },
      './packages/lock-threads': {
        name: 'lock-threads',
        role: 'package',
        policy: 'trackable',
      },
    },
    recipes: {
      'github-action': {
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

  it('writes name description and author and keeps everything else byte identical', async () => {
    const projectDirectory: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_WritesNameDescriptionAndAuthorAndKeepsEverythingElseByteIdentical_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'writes-'));
    const actionPath: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_WritesNameDescriptionAndAuthorAndKeepsEverythingElseByteIdentical_ActionPath = join(projectDirectory, 'action.yml');

    await writeFile(actionPath, manifest, 'utf-8');

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(baseConfig);

    process.chdir(projectDirectory);

    await CliRecipeGithubActionSyncIdentity.run({
      replaceFile: true,
    });

    const output: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_WritesNameDescriptionAndAuthorAndKeepsEverythingElseByteIdentical_Output = await readFile(actionPath, 'utf-8');

    strictEqual(output, syncedManifest);
    ok(process.exitCode !== 1);

    return;
  });

  it('dry run writes nothing', async () => {
    const projectDirectory: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_DryRunWritesNothing_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'dry-run-'));
    const actionPath: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_DryRunWritesNothing_ActionPath = join(projectDirectory, 'action.yml');

    await writeFile(actionPath, manifest, 'utf-8');

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(baseConfig);

    process.chdir(projectDirectory);

    await CliRecipeGithubActionSyncIdentity.run({
      dryRun: true,
    });

    const output: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_DryRunWritesNothing_Output = await readFile(actionPath, 'utf-8');

    strictEqual(output, manifest);

    return;
  });

  it('adds a missing author after the description', async () => {
    const projectDirectory: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_AddsAMissingAuthorAfterTheDescription_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'author-'));
    const actionPath: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_AddsAMissingAuthorAfterTheDescription_ActionPath = join(projectDirectory, 'action.yml');

    await writeFile(actionPath, manifest.replace('author: Someone Else\n', ''), 'utf-8');

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(baseConfig);

    process.chdir(projectDirectory);

    await CliRecipeGithubActionSyncIdentity.run({
      replaceFile: true,
    });

    const output: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_AddsAMissingAuthorAfterTheDescription_Output = await readFile(actionPath, 'utf-8');

    strictEqual(output, syncedManifest.replace('author: Jane Doe', 'author: "Jane Doe"'));

    return;
  });

  it('errors and writes nothing when the description is over the marketplace limit', async () => {
    const projectDirectory: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_ErrorsAndWritesNothingWhenTheDescriptionIsOverTheMarketplaceLimit_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'too-long-'));
    const actionPath: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_ErrorsAndWritesNothingWhenTheDescriptionIsOverTheMarketplaceLimit_ActionPath = join(projectDirectory, 'action.yml');

    await writeFile(actionPath, manifest, 'utf-8');

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      ...baseConfig,
      project: {
        description: {
          short: 'x'.repeat(126),
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipeGithubActionSyncIdentity.run({
      replaceFile: true,
    });

    const output: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_ErrorsAndWritesNothingWhenTheDescriptionIsOverTheMarketplaceLimit_Output = await readFile(actionPath, 'utf-8');

    strictEqual(output, manifest);
    strictEqual(process.exitCode, 1);

    return;
  });

  it('uses the workspace description override', async () => {
    const projectDirectory: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_UsesTheWorkspaceDescriptionOverride_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'override-'));
    const actionPath: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_UsesTheWorkspaceDescriptionOverride_ActionPath = join(projectDirectory, 'action.yml');

    await writeFile(actionPath, manifest, 'utf-8');

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      ...baseConfig,
      project: {
        description: {
          short: 'x'.repeat(200),
        },
      },
      workspaces: {
        './': {
          name: 'lock-threads-project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/lock-threads': {
          name: 'lock-threads',
          role: 'package',
          policy: 'trackable',
          githubAction: {
            description: 'Locks quiet threads',
          },
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipeGithubActionSyncIdentity.run({
      replaceFile: true,
    });

    const output: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_UsesTheWorkspaceDescriptionOverride_Output = await readFile(actionPath, 'utf-8');

    strictEqual(output, syncedManifest);
    ok(process.exitCode !== 1);

    return;
  });

  it('skips workspaces without an action manifest', async () => {
    const projectDirectory: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_SkipsWorkspacesWithoutAnActionManifest_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'skips-'));

    await mkdir(join(projectDirectory, 'packages', 'lock-threads'), { recursive: true });

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(baseConfig);

    const saveGeneratedFileSpy: Tests_Cli_Recipe_GithubAction_SyncIdentity_CliRecipeGithubActionSyncIdentityRun_SkipsWorkspacesWithoutAnActionManifest_SaveGeneratedFileSpy = vi.spyOn(utility, 'saveGeneratedFile');

    process.chdir(projectDirectory);

    await CliRecipeGithubActionSyncIdentity.run({
      replaceFile: true,
    });

    strictEqual(saveGeneratedFileSpy.mock.calls.length, 0);
    ok(process.exitCode !== 1);

    return;
  });

  return;
});

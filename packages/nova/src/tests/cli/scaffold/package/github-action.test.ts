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

import { Runner as CliScaffoldPackageGithubAction } from '../../../../cli/scaffold/package/github-action.js';

import type {
  Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizeWorkspace,
  Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Manifest,
  Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Output,
  Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_ProjectDirectory,
  Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_RejectsADescriptionOverTheMarketplaceLimit_ProjectDirectory,
  Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_RejectsADescriptionOverTheMarketplaceLimit_ResolveReplacements,
  Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_RejectsADescriptionOverTheMarketplaceLimit_Result,
  Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_SandboxRoot,
} from '../../../../types/tests/cli/scaffold/package/github-action.test.d.ts';

/**
 * Tests - CLI - Scaffold - Package - GitHub Action - CLI Scaffold Package GitHub Action.
 *
 * @since 0.49.0
 */
describe('CliScaffoldPackageGithubAction', async () => {
  const sandboxRoot: Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-scaffold-github-action-'));

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

  it('rejects a description over the marketplace limit', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_RejectsADescriptionOverTheMarketplaceLimit_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'too-long-'));

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
      project: {
        description: {
          short: 'x'.repeat(126),
        },
      },
    }), 'utf-8');

    const resolveReplacements: Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_RejectsADescriptionOverTheMarketplaceLimit_ResolveReplacements = Reflect.get(CliScaffoldPackageGithubAction, 'resolveReplacements') as Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_RejectsADescriptionOverTheMarketplaceLimit_ResolveReplacements;
    const result: Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_RejectsADescriptionOverTheMarketplaceLimit_Result = await resolveReplacements('my-action', projectDirectory);

    strictEqual(result, undefined);
    strictEqual(process.exitCode, 1);

    return;
  });

  it('finalize writes the same values as the sync identity recipe', async () => {
    const projectDirectory: Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'finalize-'));
    const manifest: Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Manifest = [
      'name: "My Action"',
      'description: "A Nova-generated GitHub Action"',
      '',
      'runs:',
      '  using: "node24"',
      '  main: "./packages/my-action/build/index.js"',
      '',
    ].join('\n');

    await mkdir(join(projectDirectory, 'packages', 'my-action'), { recursive: true });

    await Promise.all([
      writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
        project: {
          description: {
            short: 'Greets people from a workflow',
          },
        },
        entities: [{
          name: 'Jane Doe',
          roles: ['author'],
        }],
      }), 'utf-8'),
      writeFile(join(projectDirectory, 'action.yml'), manifest, 'utf-8'),
    ]);

    const finalizeWorkspace: Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizeWorkspace = Reflect.get(CliScaffoldPackageGithubAction, 'finalizeWorkspace') as Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_FinalizeWorkspace;

    await finalizeWorkspace(join(projectDirectory, 'packages', 'my-action'), projectDirectory);

    const output: Tests_Cli_Scaffold_Package_GithubAction_CliScaffoldPackageGithubAction_FinalizeWritesTheSameValuesAsTheSyncIdentityRecipe_Output = await readFile(join(projectDirectory, 'action.yml'), 'utf-8');

    strictEqual(output, [
      'name: "My Action"',
      'description: "Greets people from a workflow"',
      'author: "Jane Doe"',
      '',
      'runs:',
      '  using: "node24"',
      '  main: "./packages/my-action/build/index.js"',
      '',
    ].join('\n'));
    ok(process.exitCode !== 1);

    return;
  });

  return;
});

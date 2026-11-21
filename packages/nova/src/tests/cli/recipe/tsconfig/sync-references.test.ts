import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
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

import { Runner as CliRecipeTsconfigSyncReferences } from '../../../../cli/recipe/tsconfig/sync-references.js';

import type {
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_LeavesEveryTsconfigUntouchedWhenTheRecipeIsDisabled_Output,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_LeavesEveryTsconfigUntouchedWhenTheRecipeIsDisabled_ProjectDirectory,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_LeavesEveryTsconfigUntouchedWhenTheRecipeIsDisabled_Stale,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_OriginalCwd,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SandboxRoot,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_Compiling,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_CompilingOutput,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_Jsonc,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_JsoncOutput,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_ProjectDirectory,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_RootOutput,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_RootParsed,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_RootRerun,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_WorkspaceDirectory,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_WorkspaceOutput,
  Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_TemporaryBase,
} from '../../../../types/tests/cli/recipe/tsconfig/sync-references.test.d.ts';

/**
 * Tests - CLI - Recipe - Tsconfig - Sync References - Run.
 *
 * @since 0.49.0
 */
describe.sequential('CliRecipeTsconfigSyncReferences.run', async () => {
  const originalCwd: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_OriginalCwd = process.cwd();
  const temporaryBase: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_TemporaryBase = join(tmpdir(), `nova-${'sync-references'}-`);
  const sandboxRoot: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  afterEach(() => {
    process.exitCode = undefined;

    return;
  });

  it('syncs reference-only files and never edits a compiling tsconfig', async () => {
    const projectDirectory: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_ProjectDirectory = join(sandboxRoot, 'project');
    const workspaceDirectory: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_WorkspaceDirectory = join(projectDirectory, 'packages', 'action');

    await mkdir(workspaceDirectory, { recursive: true });
    await mkdir(join(projectDirectory, 'apps', 'docs'), { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), '{"name":"project"}\n', 'utf-8');
    await writeFile(join(projectDirectory, 'nova.config.json'), `${JSON.stringify({
      workspaces: {
        './': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/docs': {
          name: 'docs',
          role: 'docs',
          policy: 'freezable',
        },
        './packages/action': {
          name: 'action',
          role: 'package',
          policy: 'trackable',
        },
      },
      recipes: {
        tsconfig: {
          'sync-references': {
            enabled: true,
          },
        },
      },
    }, null, 2)}\n`, 'utf-8');

    // The root lists a stale reference and misses two siblings.
    await writeFile(join(projectDirectory, 'tsconfig.json'), `${JSON.stringify({
      references: [{
        path: './tsconfig.removed.json',
      }],
      files: [],
    }, null, 2)}\n`, 'utf-8');

    for (const sibling of [
      'tsconfig.tests.json',
      'tsconfig.config.json',
      'tsconfig.scripts.json',
    ]) {
      await writeFile(join(projectDirectory, sibling), '{}\n', 'utf-8');
    }

    // A compiling tsconfig.json is left exactly as written.
    const compiling: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_Compiling = `${JSON.stringify({
      include: ['./src/**/*.ts'],
    }, null, 2)}\n`;

    await writeFile(join(workspaceDirectory, 'tsconfig.json'), compiling, 'utf-8');
    await writeFile(join(workspaceDirectory, 'tsconfig.tests.json'), '{}\n', 'utf-8');

    // A tsconfig.json with comments is not plain JSON, so it is skipped.
    const jsonc: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_Jsonc = [
      '{',
      '  // Solution file.',
      '  "files": []',
      '}',
      '',
    ].join('\n');

    await writeFile(join(projectDirectory, 'apps', 'docs', 'tsconfig.json'), jsonc, 'utf-8');
    await writeFile(join(projectDirectory, 'apps', 'docs', 'tsconfig.app.json'), '{}\n', 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeTsconfigSyncReferences.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const rootOutput: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_RootOutput = await readFile(join(projectDirectory, 'tsconfig.json'), 'utf-8');
    const rootParsed: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_RootParsed = JSON.parse(rootOutput) as Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_RootParsed;

    deepStrictEqual(rootParsed, {
      references: [
        {
          path: './tsconfig.config.json',
        },
        {
          path: './tsconfig.scripts.json',
        },
        {
          path: './tsconfig.tests.json',
        },
      ],
      files: [],
    });

    const compilingOutput: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_CompilingOutput = await readFile(join(workspaceDirectory, 'tsconfig.json'), 'utf-8');
    const jsoncOutput: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_JsoncOutput = await readFile(join(projectDirectory, 'apps', 'docs', 'tsconfig.json'), 'utf-8');

    strictEqual(compilingOutput, compiling);
    strictEqual(jsoncOutput, jsonc);

    // A second run finds everything up to date and writes nothing new.
    await CliRecipeTsconfigSyncReferences.run({
      replaceFile: true,
    });

    const rootRerun: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_RootRerun = await readFile(join(projectDirectory, 'tsconfig.json'), 'utf-8');
    const workspaceOutput: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_SyncsReferenceOnlyFilesAndNeverEditsACompilingTsconfig_WorkspaceOutput = await readFile(join(workspaceDirectory, 'tsconfig.json'), 'utf-8');

    strictEqual(rootRerun, rootOutput);
    strictEqual(workspaceOutput, compiling);

    return;
  });

  it('leaves every tsconfig untouched when the recipe is disabled', async () => {
    const projectDirectory: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_LeavesEveryTsconfigUntouchedWhenTheRecipeIsDisabled_ProjectDirectory = join(sandboxRoot, 'disabled');

    await mkdir(projectDirectory, { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), '{"name":"disabled"}\n', 'utf-8');
    await writeFile(join(projectDirectory, 'nova.config.json'), `${JSON.stringify({
      workspaces: {
        './': {
          name: 'disabled',
          role: 'project',
          policy: 'freezable',
        },
      },
    }, null, 2)}\n`, 'utf-8');

    const stale: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_LeavesEveryTsconfigUntouchedWhenTheRecipeIsDisabled_Stale = `${JSON.stringify({
      files: [],
    }, null, 2)}\n`;

    await writeFile(join(projectDirectory, 'tsconfig.json'), stale, 'utf-8');
    await writeFile(join(projectDirectory, 'tsconfig.tests.json'), '{}\n', 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeTsconfigSyncReferences.run({
      replaceFile: true,
    });

    const output: Tests_Cli_Recipe_Tsconfig_SyncReferences_CliRecipeTsconfigSyncReferencesRun_LeavesEveryTsconfigUntouchedWhenTheRecipeIsDisabled_Output = await readFile(join(projectDirectory, 'tsconfig.json'), 'utf-8');

    strictEqual(process.exitCode, undefined);
    strictEqual(output, stale);

    return;
  });

  return;
});

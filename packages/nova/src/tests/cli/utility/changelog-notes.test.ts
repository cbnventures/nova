import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliUtilityChangelog } from '../../../cli/utility/changelog.js';

import type {
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_ExpectedOutput,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_NativeTagVersionOutput,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_NativeVersionOutput,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_PlainVersionOutput,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_ProjectDirectory,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_TagVersionOutput,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_ChoosesTheNewestReleasedVersionAcrossChangelogs_Output,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_ChoosesTheNewestReleasedVersionAcrossChangelogs_ProjectDirectory,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_OriginalCwd,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_PrintsAlphabeticalSectionsWithExactSpacingAndVerbatimMultiLineBullets_Output,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_PrintsAlphabeticalSectionsWithExactSpacingAndVerbatimMultiLineBullets_ProjectDirectory,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RejectsAnUnknownConfiguredWorkspaceName_Output,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RejectsAnUnknownConfiguredWorkspaceName_ProjectDirectory,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RejectsAnUnknownConfiguredWorkspaceName_StderrChunks,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RequiresAMatchingNativeBuildWhilePlainWorkspacesUseTheBaseVersion_ExpectedOutput,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RequiresAMatchingNativeBuildWhilePlainWorkspacesUseTheBaseVersion_Output,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RequiresAMatchingNativeBuildWhilePlainWorkspacesUseTheBaseVersion_ProjectDirectory,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_SandboxRoot,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_UsesConfiguredOrderThenAppendsUnlistedWorkspacesAlphabetically_ChangelogContent,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_UsesConfiguredOrderThenAppendsUnlistedWorkspacesAlphabetically_Output,
  Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_UsesConfiguredOrderThenAppendsUnlistedWorkspacesAlphabetically_ProjectDirectory,
  Tests_Cli_Utility_ChangelogNotes_RunNotes_Options,
  Tests_Cli_Utility_ChangelogNotes_RunNotes_Returns,
  Tests_Cli_Utility_ChangelogNotes_RunNotes_StdoutChunks,
  Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_Changelogs,
  Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_Config,
  Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_ProjectDirectory,
  Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_Returns,
} from '../../../types/tests/cli/utility/changelog-notes.test.d.ts';

/**
 * Tests - CLI - Utility - Changelog Notes - Run Notes.
 *
 * Captures the release body exactly as a caller piping stdout receives it.
 *
 * @param {Tests_Cli_Utility_ChangelogNotes_RunNotes_Options} options - Options.
 *
 * @returns {Tests_Cli_Utility_ChangelogNotes_RunNotes_Returns}
 *
 * @since 0.50.0
 */
async function runNotes(options: Tests_Cli_Utility_ChangelogNotes_RunNotes_Options): Tests_Cli_Utility_ChangelogNotes_RunNotes_Returns {
  const stdoutChunks: Tests_Cli_Utility_ChangelogNotes_RunNotes_StdoutChunks = [];

  vi.spyOn(process.stdout, 'write').mockImplementation((chunk) => {
    stdoutChunks.push(String(chunk));

    return true;
  });

  await CliUtilityChangelog.run(options);

  return stdoutChunks.join('');
}

/**
 * Tests - CLI - Utility - Changelog Notes - Write Notes Project.
 *
 * Creates one isolated config and the requested workspace changelogs.
 *
 * @param {Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_ProjectDirectory} projectDirectory - Project directory.
 * @param {Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_Config}           config           - Config.
 * @param {Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_Changelogs}       changelogs       - Changelogs.
 *
 * @returns {Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_Returns}
 *
 * @since 0.50.0
 */
async function writeNotesProject(projectDirectory: Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_ProjectDirectory, config: Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_Config, changelogs: Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_Changelogs): Tests_Cli_Utility_ChangelogNotes_WriteNotesProject_Returns {
  await mkdir(projectDirectory, { recursive: true });
  await writeFile(join(projectDirectory, 'nova.config.json'), `${JSON.stringify(config, null, 2)}\n`, 'utf-8');

  await Promise.all(Object.entries(changelogs).map(async (workspaceEntry) => {
    await mkdir(join(projectDirectory, workspaceEntry[0]), { recursive: true });
    await writeFile(join(projectDirectory, workspaceEntry[0], 'CHANGELOG.md'), workspaceEntry[1], 'utf-8');

    return;
  }));

  return;
}

/**
 * Tests - CLI - Utility - Changelog Notes - CliUtilityChangelog.run Notes.
 *
 * @since 0.50.0
 */
describe('CliUtilityChangelog.run notes', async () => {
  const originalCwd: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_OriginalCwd = process.cwd();
  const sandboxRoot: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_SandboxRoot = await mkdtemp(join(tmpdir(), `nova-${'changelog-notes'}-`));

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('accepts all release version forms in a mixed native and plain repository', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_ProjectDirectory = join(sandboxRoot, 'release-version-forms');

    await writeNotesProject(projectDirectory, {
      workspaces: {
        './apps/native': {
          name: 'app-native',
          role: 'app',
          policy: 'trackable',
        },
        './packages/plain': {
          name: 'plain',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, {
      './apps/native': [
        '# native',
        '',
        '## 1.4.3 (458) - 2026-11-04',
        '',
        '### FIXED',
        '- Matches the native build.',
        '',
      ].join('\n'),
      './packages/plain': [
        '# plain',
        '',
        '## 1.4.3 - 2026-11-04',
        '',
        '### ADDED',
        '- Matches the plain version.',
        '',
      ].join('\n'),
    });

    process.chdir(projectDirectory);

    const expectedOutput: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_ExpectedOutput = [
      '## app-native',
      '',
      '### FIXED',
      '',
      '- Matches the native build.',
      '',
      '## plain',
      '',
      '### ADDED',
      '',
      '- Matches the plain version.',
      '',
    ].join('\n');
    const plainVersionOutput: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_PlainVersionOutput = await runNotes({
      notes: true,
      version: '1.4.3',
    });

    const tagVersionOutput: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_TagVersionOutput = await runNotes({
      notes: true,
      version: 'v1.4.3',
    });

    const nativeVersionOutput: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_NativeVersionOutput = await runNotes({
      notes: true,
      version: '1.4.3+458',
    });

    const nativeTagVersionOutput: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_AcceptsAllReleaseVersionFormsInAMixedNativeAndPlainRepository_NativeTagVersionOutput = await runNotes({
      notes: true,
      version: 'v1.4.3+458',
    });

    strictEqual(plainVersionOutput, expectedOutput);
    strictEqual(tagVersionOutput, expectedOutput);
    strictEqual(nativeVersionOutput, expectedOutput);
    strictEqual(nativeTagVersionOutput, expectedOutput);

    return;
  });

  it('chooses the newest released version across changelogs', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_ChoosesTheNewestReleasedVersionAcrossChangelogs_ProjectDirectory = join(sandboxRoot, 'newest-version');

    await writeNotesProject(projectDirectory, {
      workspaces: {
        './packages/older': {
          name: 'older',
          role: 'package',
          policy: 'distributable',
        },
        './packages/newer': {
          name: 'newer',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, {
      './packages/older': [
        '# older',
        '',
        '## 1.9.0 - 2026-11-20',
        '',
        '### FIXED',
        '- Older release.',
        '',
      ].join('\n'),
      './packages/newer': [
        '# newer',
        '',
        '## 1.10.0 - 2026-11-21',
        '',
        '### ADDED',
        '- Newer release.',
        '',
        '## 1.10.0-beta.2 - 2026-11-20',
        '',
        '### ADDED',
        '- Prerelease.',
        '',
      ].join('\n'),
    });

    process.chdir(projectDirectory);

    const output: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_ChoosesTheNewestReleasedVersionAcrossChangelogs_Output = await runNotes({
      notes: true,
    });

    strictEqual(output, [
      '## newer',
      '',
      '### ADDED',
      '',
      '- Newer release.',
      '',
      '## older',
      '',
      'No changes.',
      '',
    ].join('\n'));

    return;
  });

  it('prints alphabetical sections with exact spacing and verbatim multi-line bullets', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_PrintsAlphabeticalSectionsWithExactSpacingAndVerbatimMultiLineBullets_ProjectDirectory = join(sandboxRoot, 'alphabetical');

    await writeNotesProject(projectDirectory, {
      workspaces: {
        './packages/zeta': {
          name: 'zeta',
          role: 'package',
          policy: 'distributable',
        },
        './packages/beta': {
          name: 'beta',
          role: 'package',
          policy: 'distributable',
        },
        './packages/alpha': {
          name: 'alpha',
          role: 'package',
          policy: 'distributable',
        },
        './apps/no-changelog': {
          name: 'aardvark',
          role: 'docs',
          policy: 'freezable',
        },
      },
    }, {
      './packages/zeta': [
        '# zeta',
        '',
        '## 2.0.0 - 2026-11-21',
        '',
        '### ADDED',
        '- Ships the zeta package.',
        '',
      ].join('\n'),
      './packages/beta': [
        '# beta',
        '',
        '## 1.0.0 - 2026-11-20',
        '',
        '### FIXED',
        '- Belongs to another release.',
        '',
      ].join('\n'),
      './packages/alpha': [
        '# alpha',
        '',
        '## 2.0.0 - 2026-11-21',
        '',
        '### UPDATED',
        '- Keeps the first line word for word',
        '  and this indented continuation too.',
        '  A second continuation remains.',
        '- Keeps the next bullet.',
        '',
        '### FIXED',
        '- Fixes the alpha issue.',
        '',
      ].join('\n'),
    });

    process.chdir(projectDirectory);

    const output: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_PrintsAlphabeticalSectionsWithExactSpacingAndVerbatimMultiLineBullets_Output = await runNotes({
      notes: true,
      version: '2.0.0',
    });

    strictEqual(output, [
      '## alpha',
      '',
      '### UPDATED',
      '',
      '- Keeps the first line word for word',
      '  and this indented continuation too.',
      '  A second continuation remains.',
      '- Keeps the next bullet.',
      '',
      '### FIXED',
      '',
      '- Fixes the alpha issue.',
      '',
      '## beta',
      '',
      'No changes.',
      '',
      '## zeta',
      '',
      '### ADDED',
      '',
      '- Ships the zeta package.',
      '',
    ].join('\n'));

    return;
  });

  it('rejects an unknown configured workspace name', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RejectsAnUnknownConfiguredWorkspaceName_ProjectDirectory = join(sandboxRoot, 'unknown-workspace');

    await writeNotesProject(projectDirectory, {
      workspaces: {
        './packages/known': {
          name: 'known',
          role: 'package',
          policy: 'distributable',
        },
      },
      settings: {
        changelog: {
          workspaceOrder: ['missing'],
        },
      },
    }, {
      './packages/known': [
        '# known',
        '',
        '## 1.0.0 - 2026-11-21',
        '',
        '### ADDED',
        '- Known release.',
        '',
      ].join('\n'),
    });

    process.chdir(projectDirectory);

    const stderrChunks: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RejectsAnUnknownConfiguredWorkspaceName_StderrChunks = [];

    vi.spyOn(process.stderr, 'write').mockImplementation((chunk) => {
      stderrChunks.push(String(chunk));

      return true;
    });

    const output: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RejectsAnUnknownConfiguredWorkspaceName_Output = await runNotes({
      notes: true,
      version: '1.0.0',
    });

    strictEqual(output, '');
    strictEqual(process.exitCode, 1);
    strictEqual(stderrChunks.join('').includes('unknown workspace name "missing"'), true);

    return;
  });

  it('requires a matching native build while plain workspaces use the base version', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RequiresAMatchingNativeBuildWhilePlainWorkspacesUseTheBaseVersion_ProjectDirectory = join(sandboxRoot, 'mismatched-native-build');

    await writeNotesProject(projectDirectory, {
      workspaces: {
        './apps/native': {
          name: 'app-native',
          role: 'app',
          policy: 'trackable',
        },
        './packages/plain': {
          name: 'plain',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, {
      './apps/native': [
        '# native',
        '',
        '## 1.4.3 (458) - 2026-11-04',
        '',
        '### FIXED',
        '- Must not match another native build.',
        '',
      ].join('\n'),
      './packages/plain': [
        '# plain',
        '',
        '## 1.4.3 - 2026-11-04',
        '',
        '### ADDED',
        '- Still matches the base version.',
        '',
      ].join('\n'),
    });

    process.chdir(projectDirectory);

    const expectedOutput: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RequiresAMatchingNativeBuildWhilePlainWorkspacesUseTheBaseVersion_ExpectedOutput = [
      '## app-native',
      '',
      'No changes.',
      '',
      '## plain',
      '',
      '### ADDED',
      '',
      '- Still matches the base version.',
      '',
    ].join('\n');
    const output: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_RequiresAMatchingNativeBuildWhilePlainWorkspacesUseTheBaseVersion_Output = await runNotes({
      notes: true,
      version: '1.4.3+459',
    });

    strictEqual(output, expectedOutput);

    return;
  });

  it('uses configured order then appends unlisted workspaces alphabetically', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_UsesConfiguredOrderThenAppendsUnlistedWorkspacesAlphabetically_ProjectDirectory = join(sandboxRoot, 'configured-order');
    const changelogContent: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_UsesConfiguredOrderThenAppendsUnlistedWorkspacesAlphabetically_ChangelogContent = [
      '# package',
      '',
      '## 1.0.0 - 2026-11-21',
      '',
      '### ADDED',
      '- Release note.',
      '',
    ].join('\n');

    await writeNotesProject(projectDirectory, {
      workspaces: {
        './packages/beta': {
          name: 'beta',
          role: 'package',
          policy: 'distributable',
        },
        './packages/zeta': {
          name: 'zeta',
          role: 'package',
          policy: 'distributable',
        },
        './packages/alpha': {
          name: 'alpha',
          role: 'package',
          policy: 'distributable',
        },
      },
      settings: {
        changelog: {
          workspaceOrder: ['zeta'],
        },
      },
    }, {
      './packages/beta': changelogContent,
      './packages/zeta': changelogContent,
      './packages/alpha': changelogContent,
    });

    process.chdir(projectDirectory);

    const output: Tests_Cli_Utility_ChangelogNotes_CliUtilityChangelogRunNotes_UsesConfiguredOrderThenAppendsUnlistedWorkspacesAlphabetically_Output = await runNotes({
      notes: true,
      version: '1.0.0',
    });

    strictEqual(output, [
      '## zeta',
      '',
      '### ADDED',
      '',
      '- Release note.',
      '',
      '## alpha',
      '',
      '### ADDED',
      '',
      '- Release note.',
      '',
      '## beta',
      '',
      '### ADDED',
      '',
      '- Release note.',
      '',
    ].join('\n'));

    return;
  });

  return;
});

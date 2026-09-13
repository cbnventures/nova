import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  beforeEach,
  describe,
  it,
} from 'vitest';

import { Runner as CliRecipeMiscellaneousFixMarkdownTables } from '../../../../cli/recipe/miscellaneous/fix-markdown-tables.js';

import type {
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_FormattedContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_MarkdownContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_MarkdownPath,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_NestedDirectory,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_PackageJsonContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_PackageJsonPath,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_ProjectDirectory,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_OriginalCwd,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_BuildDirectory,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_GeneratedContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_GeneratedPath,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_MarkdownContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_MarkdownPath,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_PackageJsonContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_PackageJsonPath,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_ProjectDirectory,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_ReadGeneratedContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_ReadMarkdownContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_MarkdownContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_MarkdownPath,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_PackageJsonContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_PackageJsonPath,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_ProjectDirectory,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_ReadMarkdownContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_RejectsConflictingReadOnlyModes_Options,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_MarkdownContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_MarkdownPath,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_PackageJsonContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_PackageJsonPath,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_ProjectDirectory,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_ReadMarkdownContents,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_SandboxDirectory,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_SandboxRoot,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_TemporaryDirectory,
  Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_TemporaryPrefix,
} from '../../../../types/tests/cli/recipe/miscellaneous/fix-markdown-tables.test.d.ts';

/**
 * Tests - CLI - Recipe - Miscellaneous - Fix Markdown Tables - Run.
 *
 * @since 0.27.0
 */
describe('CliRecipeMiscellaneousFixMarkdownTables.run', async () => {
  const originalCwd: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_TemporaryPrefix = join(temporaryDirectory, `nova-${'markdown-tables'}-`);
  const sandboxDirectory: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_SandboxDirectory = await mkdtemp(temporaryPrefix);
  const sandboxRoot: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_SandboxRoot = await realpath(sandboxDirectory);

  beforeEach(() => {
    process.chdir(sandboxRoot);
    process.exitCode = undefined;

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);
    process.exitCode = undefined;

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('formats project-root tables from a nested workspace', async () => {
    const projectDirectory: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_ProjectDirectory = join(sandboxRoot, 'nested-workspace');
    const nestedDirectory: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_NestedDirectory = join(projectDirectory, 'apps', 'docs');

    await mkdir(nestedDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_PackageJsonContents = JSON.stringify({
      name: 'fixture-project',
      private: true,
      workspaces: ['./apps/*'],
    });

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const markdownPath: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_MarkdownPath = join(projectDirectory, 'README.md');
    const markdownContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_MarkdownContents = [
      '# Fixture',
      '',
      '|Name|Notes',
      '|---|---',
      '|nova|escaped \\| pipe',
      '',
    ].join('\n');

    await writeFile(markdownPath, markdownContents, 'utf-8');

    process.chdir(nestedDirectory);

    await CliRecipeMiscellaneousFixMarkdownTables.run({});

    const formattedContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_FormatsProjectRootTablesFromANestedWorkspace_FormattedContents = await readFile(markdownPath, 'utf-8');

    strictEqual(formattedContents.includes('| nova | escaped \\| pipe |'), true);
    strictEqual(formattedContents === markdownContents, false);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('preserves fences, aligned tables, and generated output', async () => {
    const projectDirectory: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_ProjectDirectory = join(sandboxRoot, 'protected-content');
    const buildDirectory: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_BuildDirectory = join(projectDirectory, 'build');

    await mkdir(buildDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_PackageJsonContents = JSON.stringify({
      name: 'fixture-project',
      private: true,
    });

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const markdownPath: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_MarkdownPath = join(projectDirectory, 'README.md');
    const markdownContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_MarkdownContents = [
      '````markdown',
      '```text',
      '|A|B',
      '|---|---',
      '|1|2',
      '```',
      '````',
      '',
      '~~~markdown',
      '|A|B',
      '|---|---',
      '|1|2',
      '~~~',
      '',
      '| A | B |',
      '|:---|---:|',
      '|1|2|',
      '',
    ].join('\n');

    await writeFile(markdownPath, markdownContents, 'utf-8');

    const generatedPath: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_GeneratedPath = join(buildDirectory, 'generated.md');
    const generatedContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_GeneratedContents = [
      '|A|B',
      '|---|---',
      '|1|2',
      '',
    ].join('\n');

    await writeFile(generatedPath, generatedContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeMiscellaneousFixMarkdownTables.run({});

    const readMarkdownContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_ReadMarkdownContents = await readFile(markdownPath, 'utf-8');
    const readGeneratedContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreservesFencesAlignedTablesAndGeneratedOutput_ReadGeneratedContents = await readFile(generatedPath, 'utf-8');

    strictEqual(readMarkdownContents, markdownContents);
    strictEqual(readGeneratedContents, generatedContents);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('previews changes without writing files', async () => {
    const projectDirectory: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_ProjectDirectory = join(sandboxRoot, 'dry-run');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_PackageJsonContents = JSON.stringify({
      name: 'fixture-project',
      private: true,
    });

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const markdownPath: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_MarkdownPath = join(projectDirectory, 'README.md');
    const markdownContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_MarkdownContents = [
      '|A|B',
      '|---|---',
      '|1|2',
      '',
    ].join('\n');

    await writeFile(markdownPath, markdownContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeMiscellaneousFixMarkdownTables.run({ dryRun: true });

    const readMarkdownContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_PreviewsChangesWithoutWritingFiles_ReadMarkdownContents = await readFile(markdownPath, 'utf-8');

    strictEqual(readMarkdownContents, markdownContents);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('reports formatting drift without writing files', async () => {
    const projectDirectory: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_ProjectDirectory = join(sandboxRoot, 'check');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_PackageJsonContents = JSON.stringify({
      name: 'fixture-project',
      private: true,
    });

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const markdownPath: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_MarkdownPath = join(projectDirectory, 'README.md');
    const markdownContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_MarkdownContents = [
      '|A|B',
      '|---|---',
      '|1|2',
      '',
    ].join('\n');

    await writeFile(markdownPath, markdownContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeMiscellaneousFixMarkdownTables.run({ check: true });

    const readMarkdownContents: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_ReportsFormattingDriftWithoutWritingFiles_ReadMarkdownContents = await readFile(markdownPath, 'utf-8');

    strictEqual(readMarkdownContents, markdownContents);
    strictEqual(process.exitCode, 1);

    return;
  });

  it('rejects conflicting read-only modes', async () => {
    const options: Tests_Cli_Recipe_Miscellaneous_FixMarkdownTables_CliRecipeMiscellaneousFixMarkdownTablesRun_RejectsConflictingReadOnlyModes_Options = {
      check: true,
      dryRun: true,
    };

    await CliRecipeMiscellaneousFixMarkdownTables.run(options);

    strictEqual(process.exitCode, 1);

    return;
  });

  return;
});

import {
  ok,
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

import prompts from 'prompts';
import {
  afterAll,
  beforeEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliUtilityChangelog } from '../../../cli/utility/changelog.js';

import type {
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AddsAnEntryToTheNewestSection_Content,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AddsAnEntryToTheNewestSection_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AsksForACategoryWhenAnInteractiveMergeFindsUncategorizedBullets_Content,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AsksForACategoryWhenAnInteractiveMergeFindsUncategorizedBullets_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AssignsUncategorizedTargetAndSourceBulletsDuringAMerge_Content,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AssignsUncategorizedTargetAndSourceBulletsDuringAMerge_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_EditsAnEntryByOneBasedIndex_Content,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_EditsAnEntryByOneBasedIndex_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_ConfigPath,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_CoreChangelogPath,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_CoreDirectory,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_DocsChangelogPath,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_DocsDirectory,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_OriginalDocsContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_ProjectDirectory,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_UpdatedCoreContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_UpdatedDocsContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_KeepsCalVerHeadersWithoutDates_Content,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_KeepsCalVerHeadersWithoutDates_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_MergesOlderSectionsAndDeduplicatesBullets_Content,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_MergesOlderSectionsAndDeduplicatesBullets_DuplicateCount,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_MergesOlderSectionsAndDeduplicatesBullets_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAmbiguousExactMatches_AfterContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAmbiguousExactMatches_BeforeContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAmbiguousExactMatches_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAnEntryThatStartsWithItsCategory_AfterContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAnEntryThatStartsWithItsCategory_BeforeContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAnEntryThatStartsWithItsCategory_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RemovesAnEmptyCategoryAndUsesNoChanges_Content,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RemovesAnEmptyCategoryAndUsesNoChanges_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_AfterContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_AfterGradle,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_BeforeContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_BeforeGradle,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_CapturedOutput,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_Fixture,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_GradlePath,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_OriginalStdoutWrite,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_SuggestsUncategorizedAsWhenAMergeEncountersLegacyBullets_AfterContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_SuggestsUncategorizedAsWhenAMergeEncountersLegacyBullets_BeforeContent,
  Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_SuggestsUncategorizedAsWhenAMergeEncountersLegacyBullets_Fixture,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_ChangelogContent,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_ChangelogPath,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_ConfigPath,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_FixtureName,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_PackageJsonPath,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_ProjectDirectory,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_Returns,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_SandboxRoot,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_Version,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_VersionStrategy,
  Tests_Cli_Utility_ChangelogFold_CreateFixture_WorkspaceDirectory,
  Tests_Cli_Utility_ChangelogFold_OriginalCwd,
  Tests_Cli_Utility_ChangelogFold_SandboxPrefix,
  Tests_Cli_Utility_ChangelogFold_SandboxRoot,
} from '../../../types/tests/cli/utility/changelog-fold.test.d.ts';

vi.mock('prompts', () => {
  return {
    default: vi.fn(),
  };
});

/**
 * Tests - CLI - Utility - Changelog Fold - Create Fixture.
 *
 * Creates one isolated Nova workspace with an existing generated changelog.
 * Fold tests reuse the fixture while keeping each scenario independent.
 *
 * @param {Tests_Cli_Utility_ChangelogFold_CreateFixture_SandboxRoot}      sandboxRoot      - Sandbox root.
 * @param {Tests_Cli_Utility_ChangelogFold_CreateFixture_FixtureName}      fixtureName      - Fixture name.
 * @param {Tests_Cli_Utility_ChangelogFold_CreateFixture_Version}          version          - Version.
 * @param {Tests_Cli_Utility_ChangelogFold_CreateFixture_ChangelogContent} changelogContent - Changelog content.
 * @param {Tests_Cli_Utility_ChangelogFold_CreateFixture_VersionStrategy}  versionStrategy  - Version strategy.
 *
 * @returns {Tests_Cli_Utility_ChangelogFold_CreateFixture_Returns}
 *
 * @since 0.39.0
 */
async function createFixture(
  sandboxRoot: Tests_Cli_Utility_ChangelogFold_CreateFixture_SandboxRoot,
  fixtureName: Tests_Cli_Utility_ChangelogFold_CreateFixture_FixtureName,
  version: Tests_Cli_Utility_ChangelogFold_CreateFixture_Version,
  changelogContent: Tests_Cli_Utility_ChangelogFold_CreateFixture_ChangelogContent,
  versionStrategy: Tests_Cli_Utility_ChangelogFold_CreateFixture_VersionStrategy,
): Tests_Cli_Utility_ChangelogFold_CreateFixture_Returns {
  const projectDirectory: Tests_Cli_Utility_ChangelogFold_CreateFixture_ProjectDirectory = join(sandboxRoot, fixtureName);
  const workspaceDirectory: Tests_Cli_Utility_ChangelogFold_CreateFixture_WorkspaceDirectory = join(projectDirectory, 'packages', 'example');
  const configPath: Tests_Cli_Utility_ChangelogFold_CreateFixture_ConfigPath = join(projectDirectory, 'nova.config.json');
  const packageJsonPath: Tests_Cli_Utility_ChangelogFold_CreateFixture_PackageJsonPath = join(workspaceDirectory, 'package.json');
  const changelogPath: Tests_Cli_Utility_ChangelogFold_CreateFixture_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');

  await mkdir(workspaceDirectory, { recursive: true });

  await Promise.all([
    writeFile(join(projectDirectory, 'package.json'), `${JSON.stringify({ name: 'example-project' }, null, 2)}\n`, 'utf-8'),
    writeFile(configPath, `${JSON.stringify({
      project: {
        name: {
          slug: 'example',
        },
      },
      workspaces: {
        './packages/example': {
          name: '@example/package',
          role: 'package',
          policy: 'distributable',
        },
      },
      settings: {
        versionStrategy,
      },
    }, null, 2)}\n`, 'utf-8'),
    writeFile(packageJsonPath, `${JSON.stringify({
      name: '@example/package',
      version,
    }, null, 2)}\n`, 'utf-8'),
    writeFile(changelogPath, changelogContent, 'utf-8'),
  ]);

  return {
    projectDirectory,
    workspaceDirectory,
    packageJsonPath,
    changelogPath,
  };
}

beforeEach(() => {
  vi.mocked(prompts).mockReset();

  return;
});

/**
 * Tests - CLI - Utility - Changelog Fold - CliUtilityChangelog.run Fold.
 *
 * @since 0.39.0
 */
describe('CliUtilityChangelog.run fold', async () => {
  const originalCwd: Tests_Cli_Utility_ChangelogFold_OriginalCwd = process.cwd();
  const sandboxPrefix: Tests_Cli_Utility_ChangelogFold_SandboxPrefix = join(tmpdir(), `nova-${'changelog-fold'}-`);
  const sandboxRoot: Tests_Cli_Utility_ChangelogFold_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('adds an entry to the newest section', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AddsAnEntryToTheNewestSection_Fixture = await createFixture(sandboxRoot, 'add', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      '### FIXED',
      '- Fixed the existing issue.',
      '',
      '## 0.9.0 - 2026-10-01',
      '',
      '### ADDED',
      '- Added the original feature.',
      '',
    ].join('\n'), 'semver');

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      add: true,
      package: '@example/package',
      category: 'added',
      message: 'The corrected feature ships.',
    });

    const content: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AddsAnEntryToTheNewestSection_Content = await readFile(fixture['changelogPath'], 'utf-8');

    strictEqual(content.includes([
      '## 1.0.0 - 2026-11-01',
      '',
      '### FIXED',
      '- Fixed the existing issue.',
      '',
      '### ADDED',
      '- The corrected feature ships.',
    ].join('\n')), true);
    strictEqual(content.includes('## 0.9.0 - 2026-10-01'), true);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('edits an entry by one-based index', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_EditsAnEntryByOneBasedIndex_Fixture = await createFixture(sandboxRoot, 'edit', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      '### FIXED',
      '- Kept the newest entry.',
      '',
      '## 0.9.0 - 2026-10-01',
      '',
      '### UPDATED',
      '- Updated the first behavior.',
      '- Updated the second behavior.',
      '',
    ].join('\n'), 'semver');

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      edit: true,
      package: '@example/package',
      version: '0.9.0',
      category: 'updated',
      entry: '2',
      message: 'The second behavior is corrected.',
    });

    const content: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_EditsAnEntryByOneBasedIndex_Content = await readFile(fixture['changelogPath'], 'utf-8');

    strictEqual(content.includes('- Kept the newest entry.'), true);
    strictEqual(content.includes('- Updated the first behavior.'), true);
    strictEqual(content.includes('- The second behavior is corrected.'), true);
    strictEqual(content.includes('- Updated the second behavior.'), false);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('removes an empty category and uses No changes', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RemovesAnEmptyCategoryAndUsesNoChanges_Fixture = await createFixture(sandboxRoot, 'remove', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      '### REMOVED',
      '- Removed the mistaken note.',
      '',
    ].join('\n'), 'semver');

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      remove: true,
      package: '@example/package',
      category: 'removed',
      match: 'Removed the mistaken note.',
    });

    const content: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RemovesAnEmptyCategoryAndUsesNoChanges_Content = await readFile(fixture['changelogPath'], 'utf-8');

    strictEqual(content, [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      'No changes.',
      '',
    ].join('\n'));
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('merges older sections and deduplicates bullets', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_MergesOlderSectionsAndDeduplicatesBullets_Fixture = await createFixture(sandboxRoot, 'merge', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      '### FIXED',
      '- Fixed the shared issue.',
      '',
      '## 0.9.0 - 2026-10-01',
      '',
      '### FIXED',
      '- Fixed the shared issue.',
      '',
      '### ADDED',
      '- Added the older feature.',
      '',
      '## 0.8.0 - 2026-09-01',
      '',
      '### UPDATED',
      '- Updated the oldest behavior.',
      '',
    ].join('\n'), 'semver');

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      package: '@example/package',
      version: '1.0.0',
      mergeFrom: '0.9.0,0.8.0',
    });

    const content: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_MergesOlderSectionsAndDeduplicatesBullets_Content = await readFile(fixture['changelogPath'], 'utf-8');
    const duplicateCount: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_MergesOlderSectionsAndDeduplicatesBullets_DuplicateCount = content.split('- Fixed the shared issue.').length - 1;

    strictEqual(content.includes('## 0.9.0'), false);
    strictEqual(content.includes('## 0.8.0'), false);
    strictEqual(content.includes('## 1.0.0 - 2026-11-01'), true);
    strictEqual(content.indexOf('### UPDATED') < content.indexOf('### FIXED'), true);
    strictEqual(content.indexOf('### FIXED') < content.indexOf('### ADDED'), true);
    strictEqual(duplicateCount, 1);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('assigns uncategorized target and source bullets during a merge', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AssignsUncategorizedTargetAndSourceBulletsDuringAMerge_Fixture = await createFixture(sandboxRoot, 'legacy-merge', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      '- Added the target release preview.',
      '',
      '## 0.1.0 (34) - 2026-09-16',
      '',
      '- Add simulated print and scan devices with job previews.',
      '- Add a shared Create workspace with editable designs.',
      '- Show saved prints and scans in a thumbnail gallery.',
      '',
    ].join('\n'), 'semver');

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      package: '@example/package',
      version: '1.0.0',
      mergeFrom: '0.1.0',
      uncategorizedAs: 'added',
    });

    const content: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AssignsUncategorizedTargetAndSourceBulletsDuringAMerge_Content = await readFile(fixture['changelogPath'], 'utf-8');

    strictEqual(content.includes('## 0.1.0 (34) - 2026-09-16'), false);
    strictEqual(content.includes('### ADDED'), true);
    strictEqual(content.includes('- Added the target release preview.'), true);
    strictEqual(content.includes('- Add simulated print and scan devices with job previews.'), true);
    strictEqual(content.includes('- Add a shared Create workspace with editable designs.'), true);
    strictEqual(content.includes('- Show saved prints and scans in a thumbnail gallery.'), true);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('asks for a category when an interactive merge finds uncategorized bullets', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AsksForACategoryWhenAnInteractiveMergeFindsUncategorizedBullets_Fixture = await createFixture(sandboxRoot, 'legacy-interactive', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      'No changes.',
      '',
      '## 0.1.0 (34) - 2026-09-16',
      '',
      '- Add simulated print and scan devices with job previews.',
      '- Add a shared Create workspace with editable designs.',
      '',
    ].join('\n'), 'semver');

    vi.mocked(prompts)
      .mockResolvedValueOnce({ action: 'merge' })
      .mockResolvedValueOnce({ versions: ['0.1.0'] })
      .mockResolvedValueOnce({ uncategorizedAs: 'added' });

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      package: '@example/package',
      version: '1.0.0',
    });

    const content: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_AsksForACategoryWhenAnInteractiveMergeFindsUncategorizedBullets_Content = await readFile(fixture['changelogPath'], 'utf-8');

    strictEqual(content.includes('## 0.1.0 (34) - 2026-09-16'), false);
    strictEqual(content.includes('### ADDED'), true);
    strictEqual(content.includes('- Add simulated print and scan devices with job previews.'), true);
    strictEqual(vi.mocked(prompts).mock.calls.length, 3);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('suggests uncategorized-as when a merge encounters legacy bullets', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_SuggestsUncategorizedAsWhenAMergeEncountersLegacyBullets_Fixture = await createFixture(sandboxRoot, 'legacy-refusal', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      'No changes.',
      '',
      '## 0.1.0 (34) - 2026-09-16',
      '',
      '- Add simulated print and scan devices with job previews.',
      '- Add a shared Create workspace with editable designs.',
      '',
    ].join('\n'), 'semver');
    const beforeContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_SuggestsUncategorizedAsWhenAMergeEncountersLegacyBullets_BeforeContent = await readFile(fixture['changelogPath'], 'utf-8');

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      package: '@example/package',
      version: '1.0.0',
      mergeFrom: '0.1.0',
    });

    const afterContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_SuggestsUncategorizedAsWhenAMergeEncountersLegacyBullets_AfterContent = await readFile(fixture['changelogPath'], 'utf-8');

    strictEqual(afterContent, beforeContent);
    ok(vi.mocked(process.stderr.write).mock.calls.some((call) => String(call[0]).includes('--uncategorized-as')));
    strictEqual(process.exitCode, 1);
    process.exitCode = undefined;

    return;
  });

  it('shows the exact dry-run diff without writing', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_Fixture = await createFixture(sandboxRoot, 'dry-run', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      'No changes.',
      '',
    ].join('\n'), 'semver');
    const gradlePath: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_GradlePath = join(fixture['workspaceDirectory'], 'app', 'build.gradle.kts');

    await mkdir(join(fixture['workspaceDirectory'], 'app'), { recursive: true });
    await writeFile(gradlePath, [
      'android {',
      '  defaultConfig {',
      '    versionCode = 449',
      '    versionName = "1.0.0"',
      '  }',
      '}',
      '',
    ].join('\n'), 'utf-8');

    const beforeContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_BeforeContent = await readFile(fixture['changelogPath'], 'utf-8');
    const beforeGradle: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_BeforeGradle = await readFile(gradlePath, 'utf-8');
    const originalStdoutWrite: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_OriginalStdoutWrite = process.stdout.write;
    let capturedOutput: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_CapturedOutput = '';

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;
    process.stdout.write = (chunk) => {
      capturedOutput += String(chunk);

      return true;
    };

    try {
      await CliUtilityChangelog.run({
        fold: true,
        add: true,
        package: '@example/package',
        category: 'added',
        message: 'The previewed note ships.',
        dryRun: true,
      });
    } finally {
      process.stdout.write = originalStdoutWrite;
    }

    const afterContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_AfterContent = await readFile(fixture['changelogPath'], 'utf-8');
    const afterGradle: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_ShowsTheExactDryRunDiffWithoutWriting_AfterGradle = await readFile(gradlePath, 'utf-8');

    strictEqual(afterContent, beforeContent);
    strictEqual(afterGradle, beforeGradle);
    strictEqual(capturedOutput.includes('-## 1.0.0 - 2026-11-01'), true);
    strictEqual(capturedOutput.includes('+## 1.0.0 (450) - 2026-11-01'), true);
    strictEqual(capturedOutput.includes('-No changes.'), true);
    strictEqual(capturedOutput.includes('+### ADDED'), true);
    strictEqual(capturedOutput.includes('+- The previewed note ships.'), true);
    strictEqual(capturedOutput.includes('Android versionCode: 449 -> 450.'), true);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('rejects an entry that starts with its category', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAnEntryThatStartsWithItsCategory_Fixture = await createFixture(sandboxRoot, 'category-verb', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      '### UPDATED',
      '- The settings page loads faster.',
      '',
    ].join('\n'), 'semver');
    const beforeContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAnEntryThatStartsWithItsCategory_BeforeContent = await readFile(fixture['changelogPath'], 'utf-8');

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      add: true,
      package: '@example/package',
      category: 'updated',
      message: 'Updated the settings page.',
    });

    const afterContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAnEntryThatStartsWithItsCategory_AfterContent = await readFile(fixture['changelogPath'], 'utf-8');

    strictEqual(afterContent, beforeContent);
    strictEqual(process.exitCode, 1);
    process.exitCode = undefined;

    return;
  });

  it('rejects ambiguous exact matches', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAmbiguousExactMatches_Fixture = await createFixture(sandboxRoot, 'ambiguous', '1.0.0', [
      '# @example/package',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      '### FIXED',
      '- Fixed the duplicate issue.',
      '- Fixed the duplicate issue.',
      '',
    ].join('\n'), 'semver');
    const beforeContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAmbiguousExactMatches_BeforeContent = await readFile(fixture['changelogPath'], 'utf-8');

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      edit: true,
      package: '@example/package',
      category: 'fixed',
      match: 'Fixed the duplicate issue.',
      message: 'The corrected issue no longer happens.',
    });

    const afterContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_RejectsAmbiguousExactMatches_AfterContent = await readFile(fixture['changelogPath'], 'utf-8');

    strictEqual(afterContent, beforeContent);
    strictEqual(process.exitCode, 1);
    process.exitCode = undefined;

    return;
  });

  it('folds only the selected package in a lock-step repository', async () => {
    const projectDirectory: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_ProjectDirectory = join(sandboxRoot, 'lock-step');
    const coreDirectory: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_CoreDirectory = join(projectDirectory, 'packages', 'core');
    const docsDirectory: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_DocsDirectory = join(projectDirectory, 'packages', 'docs');
    const configPath: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_ConfigPath = join(projectDirectory, 'nova.config.json');
    const coreChangelogPath: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_CoreChangelogPath = join(coreDirectory, 'CHANGELOG.md');
    const docsChangelogPath: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_DocsChangelogPath = join(docsDirectory, 'CHANGELOG.md');
    const originalDocsContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_OriginalDocsContent = [
      '# @example/docs',
      '',
      '## 1.0.0 - 2026-11-01',
      '',
      'No changes.',
      '',
    ].join('\n');

    await Promise.all([
      mkdir(coreDirectory, { recursive: true }),
      mkdir(docsDirectory, { recursive: true }),
    ]);

    await Promise.all([
      writeFile(join(projectDirectory, 'package.json'), `${JSON.stringify({ name: 'example-project' }, null, 2)}\n`, 'utf-8'),
      writeFile(configPath, `${JSON.stringify({
        project: {
          name: {
            slug: 'example',
          },
        },
        workspaces: {
          './packages/core': {
            name: '@example/core',
            role: 'package',
            policy: 'distributable',
          },
          './packages/docs': {
            name: '@example/docs',
            role: 'package',
            policy: 'distributable',
          },
        },
        settings: {
          lockStepVersioning: true,
          versionStrategy: 'semver',
        },
      }, null, 2)}\n`, 'utf-8'),
      writeFile(join(coreDirectory, 'package.json'), `${JSON.stringify({
        name: '@example/core',
        version: '1.0.0',
      }, null, 2)}\n`, 'utf-8'),
      writeFile(join(docsDirectory, 'package.json'), `${JSON.stringify({
        name: '@example/docs',
        version: '1.0.0',
      }, null, 2)}\n`, 'utf-8'),
      writeFile(coreChangelogPath, [
        '# @example/core',
        '',
        '## 1.0.0 - 2026-11-01',
        '',
        'No changes.',
        '',
      ].join('\n'), 'utf-8'),
      writeFile(docsChangelogPath, originalDocsContent, 'utf-8'),
    ]);

    process.chdir(projectDirectory);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      add: true,
      package: '@example/core',
      category: 'fixed',
      message: 'Only the selected package changes.',
    });

    const updatedCoreContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_UpdatedCoreContent = await readFile(coreChangelogPath, 'utf-8');
    const updatedDocsContent: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_FoldsOnlyTheSelectedPackageInALockStepRepository_UpdatedDocsContent = await readFile(docsChangelogPath, 'utf-8');

    strictEqual(updatedCoreContent.includes('Only the selected package changes.'), true);
    strictEqual(updatedDocsContent, originalDocsContent);
    strictEqual(process.exitCode, undefined);

    return;
  });

  it('keeps CalVer headers without dates', async () => {
    const fixture: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_KeepsCalVerHeadersWithoutDates_Fixture = await createFixture(sandboxRoot, 'calver', '2026.11.0', [
      '# @example/package',
      '',
      '## 2026.11.0',
      '',
      'No changes.',
      '',
    ].join('\n'), 'calver');

    process.chdir(fixture['projectDirectory']);
    process.exitCode = undefined;

    await CliUtilityChangelog.run({
      fold: true,
      add: true,
      package: '@example/package',
      category: 'updated',
      message: 'The CalVer release note is revised.',
    });

    const content: Tests_Cli_Utility_ChangelogFold_CliUtilityChangelogRunFold_KeepsCalVerHeadersWithoutDates_Content = await readFile(fixture['changelogPath'], 'utf-8');

    strictEqual(content.startsWith([
      '# @example/package',
      '',
      '## 2026.11.0',
      '',
      '### UPDATED',
    ].join('\n')), true);
    strictEqual(content.includes('## 2026.11.0 - '), false);
    strictEqual(process.exitCode, undefined);

    return;
  });

  return;
});

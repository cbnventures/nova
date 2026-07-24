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

import { Runner as CliGenerateMustHavesReadMe } from '../../../../cli/generate/must-haves/read-me.js';
import { Runner as CliRecipeReadMeUpdateBadges } from '../../../../cli/recipe/read-me/update-badges.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import { spliceReadMeRegion, wrapReadMeRegion } from '../../../../lib/read-me-regions.js';
import * as utility from '../../../../lib/utility.js';
import * as toolkit from '../../../../toolkit/index.js';

import type {
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_AppOutput,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_AppPath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_ExpectedRootContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_MarkerlessContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_NewBadges,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_RootOutput,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_RootPath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_RootStaleContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_ExpectedRootContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_MissingExists,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_MissingPath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_NewBadges,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_RootOutput,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_RootPath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_RootStaleContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_OnDiskContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_Output,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_ReadmePath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_OnDiskContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_Output,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_ReadmePath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_AppOutput,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_AppPath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_RootOutput,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_RootPath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_SaveGeneratedFileSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_StaleContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_AppOutput,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_AppPath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_ExpectedContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_NewBadges,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_PackageOutput,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_PackagePath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_RootOutput,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_RootPath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_StaleContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_NewBadges,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_OnDiskContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_Output,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_ReadmePath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_SaveGeneratedFileSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_OnDiskContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_Output,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_ReadmePath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_CustomizedLoggerMock,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_LoggerCustomizeReturn,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_LoggerCustomizeSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_OnDiskContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_Output,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_ReadmePath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_WarnCalls,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_OriginalCwd,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_ExpectedContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_IsProjectRootSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_LoadSpy,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_NewBadges,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_OnDiskContent,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_Output,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_Prefix,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_ProjectDirectory,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_ReadmePath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_Suffix,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_SandboxPath,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_SandboxRoot,
  Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_TemporaryDirectory,
} from '../../../../types/tests/cli/recipe/read-me/update-badges.test.d.ts';

/**
 * Tests - CLI - Recipe - Read Me - Update Badges - Run.
 *
 * @since 0.21.0
 */
describe('CliRecipeReadMeUpdateBadges.run', async () => {
  const originalCwd: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_TemporaryDirectory = tmpdir();
  const sandboxPath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_SandboxPath = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_SandboxRoot = await mkdtemp(sandboxPath);

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

  it('refreshes the badges region and keeps everything outside byte-identical', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'refresh-'));
    const readmePath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_ReadmePath = join(projectDirectory, 'README.md');

    // The fresh badges the recipe should splice in, derived from the same config the recipe loads.
    const newBadges: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_NewBadges = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
    });

    ok(newBadges !== undefined, 'Expected config to produce badges');

    // Content before and after the region must survive the splice untouched.
    const prefix: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_Prefix = [
      '# Project',
      '',
      'Handwritten prose above the badges.',
      '',
    ].join('\n');
    const suffix: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_Suffix = [
      '',
      '## Introduction',
      '',
      'Handwritten prose below the badges.',
      '',
    ].join('\n');
    const onDiskContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_OnDiskContent = `${prefix}${wrapReadMeRegion('badges', 'STALE BADGES')}${suffix}`;

    await writeFile(readmePath, onDiskContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
      recipes: {
        'read-me': {
          'update-badges': {
            enabled: true,
          },
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      replaceFile: true,
    });

    const output: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_Output = await readFile(readmePath, 'utf-8');
    const expectedContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_RefreshesTheBadgesRegionAndKeepsEverythingOutsideByteIdentical_ExpectedContent = `${prefix}${wrapReadMeRegion('badges', newBadges)}${suffix}`;

    strictEqual(output, expectedContent);

    ok(output.startsWith(prefix), 'Expected content before the region preserved');
    ok(output.endsWith(suffix), 'Expected content after the region preserved');
    ok(output.includes('STALE BADGES') === false, 'Expected the stale badges replaced');
    ok(output.includes('img.shields.io/github/v/release/cbnventures/nova'), 'Expected the fresh badges spliced in');

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    return;
  });

  it('idempotent second run is a no-op', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'idempotent-'));
    const readmePath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_ReadmePath = join(projectDirectory, 'README.md');

    // Already up to date: the region already holds the exact badges the config resolves to.
    const newBadges: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_NewBadges = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
    });

    ok(newBadges !== undefined, 'Expected config to produce badges');

    const onDiskContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_OnDiskContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', newBadges),
      '',
    ].join('\n');

    await writeFile(readmePath, onDiskContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
      recipes: {
        'read-me': {
          'update-badges': {
            enabled: true,
          },
        },
      },
    });

    const saveGeneratedFileSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_SaveGeneratedFileSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      replaceFile: true,
    });

    // Already-up-to-date short circuits before any write attempt.
    strictEqual(saveGeneratedFileSpy['mock']['calls'].length, 0);

    const output: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_IdempotentSecondRunIsANoOp_Output = await readFile(readmePath, 'utf-8');

    strictEqual(output, onDiskContent);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveGeneratedFileSpy.mockRestore();

    return;
  });

  it('missing markers are skipped and the file is left untouched', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'no-markers-'));
    const readmePath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_ReadmePath = join(projectDirectory, 'README.md');

    // A hand-written README with no nova region markers must never be rewritten.
    const onDiskContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_OnDiskContent = [
      '# My Own README',
      '',
      'No markers anywhere in this file.',
      '',
    ].join('\n');

    await writeFile(readmePath, onDiskContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
      recipes: {
        'read-me': {
          'update-badges': {
            enabled: true,
          },
        },
      },
    });

    const customizedLoggerMock: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_CustomizedLoggerMock = {
      debug: vi.fn(),
      dev: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    const loggerCustomizeSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_LoggerCustomizeSpy = vi.spyOn(toolkit['Logger'], 'customize').mockReturnValue(customizedLoggerMock as Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_LoggerCustomizeReturn);

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      replaceFile: true,
    });

    const output: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_Output = await readFile(readmePath, 'utf-8');

    strictEqual(output, onDiskContent);

    // The splice helper returns undefined for a marker-less file, so no rewrite is possible.
    strictEqual(spliceReadMeRegion(onDiskContent, 'badges', 'ANYTHING'), undefined);

    const warnCalls: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingMarkersAreSkippedAndTheFileIsLeftUntouched_WarnCalls = customizedLoggerMock['warn']['mock']['calls'];

    ok(
      warnCalls.some((call) => (
        typeof call[0] === 'string'
        && call[0].includes('region markers were not found') === true
      )),
      'Expected a warn about missing region markers',
    );

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    loggerCustomizeSpy.mockRestore();

    return;
  });

  it('disabled flag skips and does not write', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'disabled-'));
    const readmePath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_ReadmePath = join(projectDirectory, 'README.md');

    const onDiskContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_OnDiskContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', 'STALE BADGES'),
      '',
    ].join('\n');

    await writeFile(readmePath, onDiskContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
      recipes: {
        'read-me': {
          'update-badges': {
            enabled: false,
          },
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      replaceFile: true,
    });

    const output: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DisabledFlagSkipsAndDoesNotWrite_Output = await readFile(readmePath, 'utf-8');

    strictEqual(output, onDiskContent);
    strictEqual(process.exitCode, undefined);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    return;
  });

  it('missing enable flag skips and does not write', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'no-flag-'));
    const readmePath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_ReadmePath = join(projectDirectory, 'README.md');

    const onDiskContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_OnDiskContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', 'STALE BADGES'),
      '',
    ].join('\n');

    await writeFile(readmePath, onDiskContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
    });

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      replaceFile: true,
    });

    const output: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_MissingEnableFlagSkipsAndDoesNotWrite_Output = await readFile(readmePath, 'utf-8');

    strictEqual(output, onDiskContent);
    strictEqual(process.exitCode, undefined);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    return;
  });

  it('dry run does not write', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'dry-run-'));
    const readmePath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_ReadmePath = join(projectDirectory, 'README.md');

    // Stale but nova-generated, so the recipe would rewrite it if not for dry run.
    const onDiskContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_OnDiskContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', 'STALE BADGES'),
      '',
    ].join('\n');

    await writeFile(readmePath, onDiskContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
      recipes: {
        'read-me': {
          'update-badges': {
            enabled: true,
          },
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      dryRun: true,
    });

    const output: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunDoesNotWrite_Output = await readFile(readmePath, 'utf-8');

    // The file is unchanged because dry run never writes.
    strictEqual(output, onDiskContent);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    return;
  });

  it('fans out to every consumer workspace README', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'fan-out-'));

    // The fresh badges the recipe should splice into every copy, derived from the same config.
    const newBadges: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_NewBadges = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
    });

    ok(newBadges !== undefined, 'Expected config to produce badges');

    const rootPath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_RootPath = join(projectDirectory, 'README.md');
    const appPath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_AppPath = join(projectDirectory, 'apps', 'web', 'README.md');
    const packagePath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_PackagePath = join(projectDirectory, 'packages', 'lib-a', 'README.md');

    // Each copy starts stale but nova-generated (has the region markers).
    const staleContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_StaleContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', 'STALE BADGES'),
      '',
    ].join('\n');

    await mkdir(join(projectDirectory, 'apps', 'web'), {
      recursive: true,
    });

    await mkdir(join(projectDirectory, 'packages', 'lib-a'), {
      recursive: true,
    });

    await writeFile(rootPath, staleContent, 'utf-8');

    await writeFile(appPath, staleContent, 'utf-8');

    await writeFile(packagePath, staleContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
      recipes: {
        'read-me': {
          'update-badges': {
            enabled: true,
          },
        },
      },
      workspaces: {
        './': {
          name: 'test-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/web': {
          name: 'test-app-web',
          role: 'app',
          policy: 'trackable',
        },
        './packages/lib-a': {
          name: 'lib-a',
          role: 'package',
          policy: 'distributable',
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      replaceFile: true,
    });

    const expectedContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_ExpectedContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', newBadges),
      '',
    ].join('\n');

    const rootOutput: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_RootOutput = await readFile(rootPath, 'utf-8');
    const appOutput: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_AppOutput = await readFile(appPath, 'utf-8');
    const packageOutput: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_FansOutToEveryConsumerWorkspaceREADME_PackageOutput = await readFile(packagePath, 'utf-8');

    // Root and every consumer copy are refreshed independently to the same new content.
    strictEqual(rootOutput, expectedContent);
    strictEqual(appOutput, expectedContent);
    strictEqual(packageOutput, expectedContent);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    return;
  });

  it('a consumer README without markers is skipped while the root updates', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'mixed-'));

    const newBadges: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_NewBadges = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
    });

    ok(newBadges !== undefined, 'Expected config to produce badges');

    const rootPath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_RootPath = join(projectDirectory, 'README.md');
    const appPath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_AppPath = join(projectDirectory, 'apps', 'web', 'README.md');

    // Root: stale but nova-generated (has the region markers), so it will be refreshed.
    const rootStaleContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_RootStaleContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', 'STALE BADGES'),
      '',
    ].join('\n');

    // App consumer: a hand-written README with no nova region markers, so it must be skipped and
    // left byte-identical even while the root is refreshed.
    const markerlessContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_MarkerlessContent = [
      '# My Own README',
      '',
      'No markers anywhere in this file.',
      '',
    ].join('\n');

    await mkdir(join(projectDirectory, 'apps', 'web'), {
      recursive: true,
    });

    await writeFile(rootPath, rootStaleContent, 'utf-8');

    await writeFile(appPath, markerlessContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
      recipes: {
        'read-me': {
          'update-badges': {
            enabled: true,
          },
        },
      },
      workspaces: {
        './': {
          name: 'test-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/web': {
          name: 'test-app-web',
          role: 'app',
          policy: 'trackable',
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      replaceFile: true,
    });

    const expectedRootContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_ExpectedRootContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', newBadges),
      '',
    ].join('\n');

    const rootOutput: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_RootOutput = await readFile(rootPath, 'utf-8');
    const appOutput: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AConsumerREADMEWithoutMarkersIsSkippedWhileTheRootUpdates_AppOutput = await readFile(appPath, 'utf-8');

    // Root nova-generated copy is refreshed.
    strictEqual(rootOutput, expectedRootContent);

    // Marker-less consumer copy is left byte-identical.
    strictEqual(appOutput, markerlessContent);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    return;
  });

  it('a missing consumer README is skipped', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'missing-'));

    const newBadges: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_NewBadges = CliGenerateMustHavesReadMe.buildBadgesRegionContent({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
    });

    ok(newBadges !== undefined, 'Expected config to produce badges');

    const rootPath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_RootPath = join(projectDirectory, 'README.md');
    const missingPath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_MissingPath = join(projectDirectory, 'packages', 'lib-a', 'README.md');

    const rootStaleContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_RootStaleContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', 'STALE BADGES'),
      '',
    ].join('\n');

    // The package consumer directory exists but its README is missing on disk.
    await mkdir(join(projectDirectory, 'packages', 'lib-a'), {
      recursive: true,
    });

    await writeFile(rootPath, rootStaleContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
      recipes: {
        'read-me': {
          'update-badges': {
            enabled: true,
          },
        },
      },
      workspaces: {
        './': {
          name: 'test-project',
          role: 'project',
          policy: 'freezable',
        },
        './packages/lib-a': {
          name: 'lib-a',
          role: 'package',
          policy: 'distributable',
        },
      },
    });

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      replaceFile: true,
    });

    const expectedRootContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_ExpectedRootContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', newBadges),
      '',
    ].join('\n');

    const rootOutput: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_RootOutput = await readFile(rootPath, 'utf-8');
    const missingExists: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_AMissingConsumerREADMEIsSkipped_MissingExists = await utility.pathExists(missingPath);

    // Root nova-generated copy is refreshed.
    strictEqual(rootOutput, expectedRootContent);

    // Missing consumer copy is not created.
    strictEqual(missingExists, false);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    return;
  });

  it('dry run writes nothing anywhere in a fan-out tree', async () => {
    const projectDirectory: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'fan-out-dry-'));

    const rootPath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_RootPath = join(projectDirectory, 'README.md');
    const appPath: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_AppPath = join(projectDirectory, 'apps', 'web', 'README.md');

    // Both copies are stale but nova-generated, so they would be rewritten if not for dry run.
    const staleContent: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_StaleContent = [
      '# Project',
      '',
      wrapReadMeRegion('badges', 'STALE BADGES'),
      '',
    ].join('\n');

    await mkdir(join(projectDirectory, 'apps', 'web'), {
      recursive: true,
    });

    await writeFile(rootPath, staleContent, 'utf-8');

    await writeFile(appPath, staleContent, 'utf-8');

    const isProjectRootSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_IsProjectRootSpy = vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    const loadSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_LoadSpy = vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      github: {
        owner: 'cbnventures',
        repo: 'nova',
      },
      recipes: {
        'read-me': {
          'update-badges': {
            enabled: true,
          },
        },
      },
      workspaces: {
        './': {
          name: 'test-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/web': {
          name: 'test-app-web',
          role: 'app',
          policy: 'trackable',
        },
      },
    });

    const saveGeneratedFileSpy: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_SaveGeneratedFileSpy = vi.spyOn(utility, 'saveGeneratedFile').mockResolvedValue(undefined);

    process.chdir(projectDirectory);

    await CliRecipeReadMeUpdateBadges.run({
      dryRun: true,
    });

    // Dry run never writes to any copy.
    strictEqual(saveGeneratedFileSpy['mock']['calls'].length, 0);

    const rootOutput: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_RootOutput = await readFile(rootPath, 'utf-8');
    const appOutput: Tests_Cli_Recipe_ReadMe_UpdateBadges_CliRecipeReadMeUpdateBadgesRun_DryRunWritesNothingAnywhereInAFanOutTree_AppOutput = await readFile(appPath, 'utf-8');

    strictEqual(rootOutput, staleContent);
    strictEqual(appOutput, staleContent);

    isProjectRootSpy.mockRestore();

    loadSpy.mockRestore();

    saveGeneratedFileSpy.mockRestore();

    return;
  });

  return;
});

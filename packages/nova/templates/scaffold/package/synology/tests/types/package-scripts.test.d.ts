import type { SpawnSyncReturns } from 'node:child_process';
import type { Stats } from 'node:fs';

/**
 * Package Scripts.
 *
 * @since UNRELEASED
 */
export type PackageScripts_WorkspaceDirectory = string;

export type PackageScripts_CopyDirectory_SourceDirectory = string;

export type PackageScripts_CopyDirectory_DestinationDirectory = string;

export type PackageScripts_CopyDirectory_SourcePath = string;

export type PackageScripts_CopyDirectory_DestinationPath = string;

export type PackageScripts_CopyDirectory_Returns = Promise<void>;

export type PackageScripts_CreateFixture_Returns = Promise<string>;

export type PackageScripts_CreateFixture_FixtureDirectory = string;

export type PackageScripts_CreateFixture_Entry = string;

export type PackageScripts_CreateFixture_SourcePath = string;

export type PackageScripts_CreateFixture_DestinationPath = string;

export type PackageScripts_CreateFixture_SourceStats = Stats;

export type PackageScripts_BuildsAndChecksANoarchSpk_FixtureDirectory = string;

export type PackageScripts_BuildsAndChecksANoarchSpk_BuildResult = SpawnSyncReturns<string>;

export type PackageScripts_BuildsAndChecksANoarchSpk_CheckResult = SpawnSyncReturns<string>;

export type PackageScripts_BuildsAndChecksANoarchSpk_PackageJsonRaw = string;

export type PackageScripts_BuildsAndChecksANoarchSpk_PackageJson = {
  name: string;
  version: string;
};

export type PackageScripts_BuildsAndChecksANoarchSpk_SpkPath = string;

export type PackageScripts_BuildsAndChecksANoarchSpk_ArchiveHeader = string;

export type PackageScripts_RejectsAnOldDsmMinimum_FixtureDirectory = string;

export type PackageScripts_RejectsAnOldDsmMinimum_Info = string;

export type PackageScripts_RejectsAnOldDsmMinimum_BadInfo = string;

export type PackageScripts_RejectsAnOldDsmMinimum_CheckResult = SpawnSyncReturns<string>;

export type PackageScripts_RejectsAWizardFieldWithoutAKey_FixtureDirectory = string;

export type PackageScripts_RejectsAWizardFieldWithoutAKey_WizardPath = string;

export type PackageScripts_RejectsAWizardFieldWithoutAKey_Wizard = string;

export type PackageScripts_RejectsAWizardFieldWithoutAKey_CheckResult = SpawnSyncReturns<string>;

export type PackageScripts_RejectsAMissingDesktopIconSize_FixtureDirectory = string;

export type PackageScripts_RejectsAMissingDesktopIconSize_CheckResult = SpawnSyncReturns<string>;

export type PackageScripts_RejectsACgiScriptThatIsNotExecutable_FixtureDirectory = string;

export type PackageScripts_RejectsACgiScriptThatIsNotExecutable_CheckResult = SpawnSyncReturns<string>;

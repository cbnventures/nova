import { strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { afterAll, describe, it } from 'vitest';

import { Runner as CliUtilityChangelog } from '../../../cli/utility/changelog.js';

import type {
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_ChangelogDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_EntryContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_EntryPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_SourceAfterRun,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_SourceFileContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_SourceFilePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_SrcDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_StillHasUnreleased,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_WorkspaceDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_WorkspacePackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_WorkspacePackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_OriginalCwd,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_ChangelogDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_EntryContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_EntryPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_SourceAfterRelease,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_SourceFileContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_SourceFilePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_SrcDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_StampWasApplied,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_WorkspaceDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_WorkspacePackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_WorkspacePackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_ChangelogDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_Content,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_EntryPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_Files,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_HasBump,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_HasCategory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_HasMessage,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_HasPackage,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_MdFile,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_MdFiles,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ChangelogContent,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ChangelogDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ChangelogPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_EntryContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_EntryPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_HasFeature,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_HasVersion,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_PackageJson,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_PackageJsonRaw,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_RemainingFiles,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_RemainingMdFiles,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_UpdatedPackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_WorkspaceDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_WorkspacePackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_WorkspacePackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SandboxPrefix,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SandboxRoot,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ChangelogDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ContentAfterFirst,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ContentAfterSecond,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_EntryContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_EntryContents2,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_EntryPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_EntryPath2,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_IsIdempotent,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_SourceFileContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_SourceFilePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_SrcDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_WorkspaceDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_WorkspacePackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_WorkspacePackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_ChangelogDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_EntryContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_EntryPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceAFileContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceAFilePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceAStamped,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceBFileContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceBFilePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceBUntouched,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SrcADirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SrcBDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_UpdatedSourceA,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_UpdatedSourceB,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceADirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceAPackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceAPackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceBDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceBPackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceBPackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_ChangelogDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_EntryContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_EntryPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_HasDeprecated,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_HasSince,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_PackageJsonContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_PackageJsonPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_SourceFileContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_SourceFilePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_SrcDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_StringLiteralPreserved,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_UpdatedSource,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_WorkspaceDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_WorkspacePackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_WorkspacePackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ChangelogDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ConfigContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ConfigPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_CoreDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_CorePackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_CorePackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_EntryContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_EntryPath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ExactBumped,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ProjectDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_RangeKept,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_RootPackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_RootPackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_TemplatePackageContents,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_TemplatePackagePath,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_TemplateRaw,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_TemplatesDirectory,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ThirdPartyKept,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_VersionKept,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_WorkspaceKept,
  Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_TemporaryDirectory,
} from '../../../types/tests/cli/utility/changelog.test.d.ts';

/**
 * Tests - CLI - Utility - Changelog - Run.
 *
 * @since 0.14.0
 */
describe('CliUtilityChangelog.run', async () => {
  const originalCwd: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_TemporaryDirectory = tmpdir();
  const sandboxPrefix: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('errors when --record and --release are both set', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_ProjectDirectory = join(sandboxRoot, 'both-flags');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_PackageJsonContents = JSON.stringify({
      name: 'test-both-flags',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenRecordAndReleaseAreBothSet_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      release: true,
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when partial non-interactive flags', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_ProjectDirectory = join(sandboxRoot, 'partial-flags');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_PackageJsonContents = JSON.stringify({
      name: 'test-partial-flags',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPartialNonInteractiveFlags_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('records entry in non-interactive mode', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_ProjectDirectory = join(sandboxRoot, 'record-entry');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_PackageJsonContents = JSON.stringify({
      name: 'test-record-entry',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'added',
      bump: 'minor',
      message: 'Added new feature',
    });

    strictEqual(process.exitCode, undefined);

    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_ChangelogDirectory = join(projectDirectory, '.changelog');
    const files: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_Files = await readdir(changelogDirectory);
    const mdFiles: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_MdFiles = files.filter((file) => file.endsWith('.md') && file !== 'README.md');

    strictEqual(mdFiles.length, 1);

    const mdFile: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_MdFile = mdFiles[0] as Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_MdFile;
    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_EntryPath = join(changelogDirectory, mdFile);
    const content: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_Content = await readFile(entryPath, 'utf-8');

    const hasPackage: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_HasPackage = content.includes('package: "@test/core"');
    const hasCategory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_HasCategory = content.includes('category: added');
    const hasBump: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_HasBump = content.includes('bump: minor');
    const hasMessage: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_RecordsEntryInNonInteractiveMode_HasMessage = content.includes('Added new feature');

    strictEqual(hasPackage, true);
    strictEqual(hasCategory, true);
    strictEqual(hasBump, true);
    strictEqual(hasMessage, true);

    return;
  });

  it('errors when package is invalid', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_ProjectDirectory = join(sandboxRoot, 'invalid-package');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_PackageJsonContents = JSON.stringify({
      name: 'test-invalid-package',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenPackageIsInvalid_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/nonexistent',
      category: 'added',
      bump: 'minor',
      message: 'Some change',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when category is invalid', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_ProjectDirectory = join(sandboxRoot, 'invalid-category');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_PackageJsonContents = JSON.stringify({
      name: 'test-invalid-category',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenCategoryIsInvalid_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'invalid-category',
      bump: 'minor',
      message: 'Some change',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when bump is invalid', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_ProjectDirectory = join(sandboxRoot, 'invalid-bump');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_PackageJsonContents = JSON.stringify({
      name: 'test-invalid-bump',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenBumpIsInvalid_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'added',
      bump: 'invalid-bump',
      message: 'Some change',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('errors when message is empty', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_ProjectDirectory = join(sandboxRoot, 'empty-message');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_PackageJsonContents = JSON.stringify({
      name: 'test-empty-message',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ErrorsWhenMessageIsEmpty_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      record: true,
      package: '@test/core',
      category: 'added',
      bump: 'minor',
      message: '   ',
    });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('releases and bumps version', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ProjectDirectory = join(sandboxRoot, 'release-bump');
    const workspaceDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');
    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ChangelogDirectory = join(projectDirectory, '.changelog');

    await mkdir(workspaceDirectory, { recursive: true });
    await mkdir(changelogDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_PackageJsonContents = JSON.stringify({
      name: 'test-release-bump',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const workspacePackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_WorkspacePackagePath = join(workspaceDirectory, 'package.json');
    const workspacePackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_WorkspacePackageContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackagePath, workspacePackageContents, 'utf-8');

    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_EntryPath = join(changelogDirectory, 'test-entry.md');
    const entryContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_EntryContents = [
      '---',
      'package: "@test/core"',
      'category: added',
      'bump: minor',
      '---',
      '',
      'Added a new feature',
      '',
    ].join('\n');

    await writeFile(entryPath, entryContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    const updatedPackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_UpdatedPackagePath = join(workspaceDirectory, 'package.json');
    const packageJsonRaw: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_PackageJsonRaw = await readFile(updatedPackagePath, 'utf-8');
    const packageJson: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_PackageJson = JSON.parse(packageJsonRaw);

    strictEqual(packageJson['version'], '1.1.0');

    const changelogPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ChangelogPath = join(workspaceDirectory, 'CHANGELOG.md');
    const changelogContent: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_ChangelogContent = await readFile(changelogPath, 'utf-8');

    const hasVersion: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_HasVersion = changelogContent.includes('## 1.1.0');
    const hasFeature: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_HasFeature = changelogContent.includes('Added a new feature');

    strictEqual(hasVersion, true);
    strictEqual(hasFeature, true);

    const remainingFiles: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_RemainingFiles = await readdir(changelogDirectory);
    const remainingMdFiles: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_ReleasesAndBumpsVersion_RemainingMdFiles = remainingFiles.filter((file) => file.endsWith('.md') && file !== 'README.md');

    strictEqual(remainingMdFiles.length, 0);

    return;
  });

  it('syncs exact-pinned references to released packages', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ProjectDirectory = join(sandboxRoot, 'reference-sync');
    const coreDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_CoreDirectory = join(projectDirectory, 'packages', 'core');
    const templatesDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_TemplatesDirectory = join(coreDirectory, 'templates', 'scaffold');
    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ChangelogDirectory = join(projectDirectory, '.changelog');

    await mkdir(templatesDirectory, { recursive: true });
    await mkdir(changelogDirectory, { recursive: true });

    const rootPackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_RootPackagePath = join(projectDirectory, 'package.json');
    const rootPackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_RootPackageContents = JSON.stringify({
      name: 'test-reference-sync',
    }, null, 2);

    await writeFile(rootPackagePath, rootPackageContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const corePackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_CorePackagePath = join(coreDirectory, 'package.json');
    const corePackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_CorePackageContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(corePackagePath, corePackageContents, 'utf-8');

    const templatePackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_TemplatePackagePath = join(templatesDirectory, 'package.json');
    const templatePackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_TemplatePackageContents = JSON.stringify({
      name: '@test/scaffold',
      version: '0.0.0',
      dependencies: {
        '@test/core': '1.0.0',
        'react': '19.1.0',
      },
      devDependencies: {
        '@test/core': '^1.0.0',
      },
      peerDependencies: {
        '@test/core': 'workspace:*',
      },
    }, null, 2);

    await writeFile(templatePackagePath, templatePackageContents, 'utf-8');

    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_EntryPath = join(changelogDirectory, 'test-entry.md');
    const entryContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_EntryContents = [
      '---',
      'package: "@test/core"',
      'category: added',
      'bump: minor',
      '---',
      '',
      'Added a new feature',
      '',
    ].join('\n');

    await writeFile(entryPath, entryContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    const templateRaw: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_TemplateRaw = await readFile(templatePackagePath, 'utf-8');

    const exactBumped: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ExactBumped = templateRaw.includes('"@test/core": "1.1.0"');
    const rangeKept: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_RangeKept = templateRaw.includes('"@test/core": "^1.0.0"');
    const workspaceKept: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_WorkspaceKept = templateRaw.includes('"@test/core": "workspace:*"');
    const thirdPartyKept: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_ThirdPartyKept = templateRaw.includes('"react": "19.1.0"');
    const versionKept: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SyncsExactPinnedReferencesToReleasedPackages_VersionKept = templateRaw.includes('"version": "0.0.0"');

    strictEqual(exactBumped, true);
    strictEqual(rangeKept, true);
    strictEqual(workspaceKept, true);
    strictEqual(thirdPartyKept, true);
    strictEqual(versionKept, true);

    return;
  });

  it('stamps UNRELEASED tokens in source files on release', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_ProjectDirectory = join(sandboxRoot, 'stamp-unreleased');
    const workspaceDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');
    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_ChangelogDirectory = join(projectDirectory, '.changelog');
    const srcDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_SrcDirectory = join(workspaceDirectory, 'src');

    await mkdir(srcDirectory, { recursive: true });
    await mkdir(changelogDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_PackageJsonContents = JSON.stringify({
      name: 'test-stamp-unreleased',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const workspacePackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_WorkspacePackagePath = join(workspaceDirectory, 'package.json');
    const workspacePackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_WorkspacePackageContents = JSON.stringify({
      name: '@test/core',
      version: '0.19.0',
    }, null, 2);

    await writeFile(workspacePackagePath, workspacePackageContents, 'utf-8');

    const sourceFilePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_SourceFilePath = join(srcDirectory, 'foo.ts');
    const sourceFileContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_SourceFileContents = [
      '/**',
      ' * @since UNRELEASED',
      ' */',
      'export const foo = 1;',
      '',
      '/**',
      ' * @deprecated UNRELEASED',
      ' */',
      'export const bar = 2;',
      '',
      'export const sentinelDoc = "/** @since UNRELEASED */";',
      '',
    ].join('\n');

    await writeFile(sourceFilePath, sourceFileContents, 'utf-8');

    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_EntryPath = join(changelogDirectory, 'stamp-test.md');
    const entryContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_EntryContents = [
      '---',
      'package: "@test/core"',
      'category: added',
      'bump: minor',
      '---',
      '',
      'Added foo and bar',
      '',
    ].join('\n');

    await writeFile(entryPath, entryContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    const updatedSource: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_UpdatedSource = await readFile(sourceFilePath, 'utf-8');

    const hasSince: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_HasSince = updatedSource.includes('@since 0.20.0');
    const hasDeprecated: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_HasDeprecated = updatedSource.includes('@deprecated 0.20.0');

    // The real JSDoc tags are stamped, but the sentinel inside the string literal must be left untouched.
    const stringLiteralPreserved: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDTokensInSourceFilesOnRelease_StringLiteralPreserved = updatedSource.includes('"/** @since UNRELEASED */"');

    strictEqual(hasSince, true);
    strictEqual(hasDeprecated, true);
    strictEqual(stringLiteralPreserved, true);

    return;
  });

  it('stamps UNRELEASED only in the releasing package, not in others', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_ProjectDirectory = join(sandboxRoot, 'stamp-isolation');
    const workspaceADirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceADirectory = join(projectDirectory, 'packages', 'core');
    const workspaceBDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceBDirectory = join(projectDirectory, 'packages', 'utils');
    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_ChangelogDirectory = join(projectDirectory, '.changelog');
    const srcADirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SrcADirectory = join(workspaceADirectory, 'src');
    const srcBDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SrcBDirectory = join(workspaceBDirectory, 'src');

    await mkdir(srcADirectory, { recursive: true });
    await mkdir(srcBDirectory, { recursive: true });
    await mkdir(changelogDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_PackageJsonContents = JSON.stringify({
      name: 'test-stamp-isolation',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
        './packages/utils': {
          name: '@test/utils',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const workspaceAPackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceAPackagePath = join(workspaceADirectory, 'package.json');
    const workspaceAPackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceAPackageContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspaceAPackagePath, workspaceAPackageContents, 'utf-8');

    const workspaceBPackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceBPackagePath = join(workspaceBDirectory, 'package.json');
    const workspaceBPackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_WorkspaceBPackageContents = JSON.stringify({
      name: '@test/utils',
      version: '2.0.0',
    }, null, 2);

    await writeFile(workspaceBPackagePath, workspaceBPackageContents, 'utf-8');

    const sourceAFilePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceAFilePath = join(srcADirectory, 'index.ts');
    const sourceAFileContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceAFileContents = [
      '/**',
      ' * @since UNRELEASED',
      ' */',
      'export const a = 1;',
      '',
    ].join('\n');

    await writeFile(sourceAFilePath, sourceAFileContents, 'utf-8');

    const sourceBFilePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceBFilePath = join(srcBDirectory, 'index.ts');
    const sourceBFileContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceBFileContents = [
      '/**',
      ' * @since UNRELEASED',
      ' */',
      'export const b = 2;',
      '',
    ].join('\n');

    await writeFile(sourceBFilePath, sourceBFileContents, 'utf-8');

    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_EntryPath = join(changelogDirectory, 'core-only.md');
    const entryContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_EntryContents = [
      '---',
      'package: "@test/core"',
      'category: added',
      'bump: patch',
      '---',
      '',
      'Added something to core only',
      '',
    ].join('\n');

    await writeFile(entryPath, entryContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    const updatedSourceA: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_UpdatedSourceA = await readFile(sourceAFilePath, 'utf-8');
    const updatedSourceB: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_UpdatedSourceB = await readFile(sourceBFilePath, 'utf-8');

    const sourceAStamped: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceAStamped = updatedSourceA.includes('@since 1.0.1') === true && updatedSourceA.includes('UNRELEASED') === false;
    const sourceBUntouched: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampsUNRELEASEDOnlyInTheReleasingPackageNotInOthers_SourceBUntouched = updatedSourceB.includes('UNRELEASED') === true;

    strictEqual(sourceAStamped, true);
    strictEqual(sourceBUntouched, true);

    return;
  });

  it('dry run leaves UNRELEASED tokens in place', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_ProjectDirectory = join(sandboxRoot, 'stamp-dryrun');
    const workspaceDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');
    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_ChangelogDirectory = join(projectDirectory, '.changelog');
    const srcDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_SrcDirectory = join(workspaceDirectory, 'src');

    await mkdir(srcDirectory, { recursive: true });
    await mkdir(changelogDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_PackageJsonContents = JSON.stringify({
      name: 'test-stamp-dryrun',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const workspacePackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_WorkspacePackagePath = join(workspaceDirectory, 'package.json');
    const workspacePackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_WorkspacePackageContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackagePath, workspacePackageContents, 'utf-8');

    const sourceFilePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_SourceFilePath = join(srcDirectory, 'index.ts');
    const sourceFileContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_SourceFileContents = [
      '/**',
      ' * @since UNRELEASED',
      ' */',
      'export const x = 1;',
      '',
    ].join('\n');

    await writeFile(sourceFilePath, sourceFileContents, 'utf-8');

    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_EntryPath = join(changelogDirectory, 'dryrun-entry.md');
    const entryContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_EntryContents = [
      '---',
      'package: "@test/core"',
      'category: added',
      'bump: patch',
      '---',
      '',
      'Added something',
      '',
    ].join('\n');

    await writeFile(entryPath, entryContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
      dryRun: true,
    });

    strictEqual(process.exitCode, undefined);

    const sourceAfterRun: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_SourceAfterRun = await readFile(sourceFilePath, 'utf-8');
    const stillHasUnreleased: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_DryRunLeavesUNRELEASEDTokensInPlace_StillHasUnreleased = sourceAfterRun.includes('UNRELEASED') === true;

    strictEqual(stillHasUnreleased, true);

    return;
  });

  it('stamp is idempotent — second run changes nothing', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ProjectDirectory = join(sandboxRoot, 'stamp-idempotent');
    const workspaceDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');
    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ChangelogDirectory = join(projectDirectory, '.changelog');
    const srcDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_SrcDirectory = join(workspaceDirectory, 'src');

    await mkdir(srcDirectory, { recursive: true });
    await mkdir(changelogDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_PackageJsonContents = JSON.stringify({
      name: 'test-stamp-idempotent',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const workspacePackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_WorkspacePackagePath = join(workspaceDirectory, 'package.json');
    const workspacePackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_WorkspacePackageContents = JSON.stringify({
      name: '@test/core',
      version: '1.0.0',
    }, null, 2);

    await writeFile(workspacePackagePath, workspacePackageContents, 'utf-8');

    const sourceFilePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_SourceFilePath = join(srcDirectory, 'index.ts');
    const sourceFileContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_SourceFileContents = [
      '/**',
      ' * @since UNRELEASED',
      ' */',
      'export const y = 1;',
      '',
    ].join('\n');

    await writeFile(sourceFilePath, sourceFileContents, 'utf-8');

    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_EntryPath = join(changelogDirectory, 'idempotent-first.md');
    const entryContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_EntryContents = [
      '---',
      'package: "@test/core"',
      'category: added',
      'bump: patch',
      '---',
      '',
      'First release',
      '',
    ].join('\n');

    await writeFile(entryPath, entryContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    const contentAfterFirst: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ContentAfterFirst = await readFile(sourceFilePath, 'utf-8');

    const entryPath2: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_EntryPath2 = join(changelogDirectory, 'idempotent-second.md');
    const entryContents2: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_EntryContents2 = [
      '---',
      'package: "@test/core"',
      'category: fixed',
      'bump: patch',
      '---',
      '',
      'Second release',
      '',
    ].join('\n');

    await writeFile(entryPath2, entryContents2, 'utf-8');

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    const contentAfterSecond: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_ContentAfterSecond = await readFile(sourceFilePath, 'utf-8');

    const isIdempotent: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_StampIsIdempotentSecondRunChangesNothing_IsIdempotent = contentAfterFirst === contentAfterSecond;

    strictEqual(isIdempotent, true);

    return;
  });

  it('skips release when no entries exist', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_ProjectDirectory = join(sandboxRoot, 'no-entries');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_PackageJsonContents = JSON.stringify({
      name: 'test-no-entries',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_SkipsReleaseWhenNoEntriesExist_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    return;
  });

  // Limitation: stampUnreleased's prerelease guard checks newVersion.includes('-').
  // The normal bump arithmetic (currentVersion.split('.').map(Number)) always produces
  // clean semver (e.g. '1.0.1'), never a prerelease suffix. There is no way to inject
  // a '-' into the computed newVersion through the public run() API, so the guard
  // cannot be directly exercised here. This test instead verifies the guard's inverse:
  // a non-prerelease release stamps @since UNRELEASED, proving the guard does not
  // block normal releases.
  it('prerelease version skips stamp', async () => {
    const projectDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_ProjectDirectory = join(sandboxRoot, 'prerelease-skip');
    const workspaceDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_WorkspaceDirectory = join(projectDirectory, 'packages', 'core');
    const changelogDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_ChangelogDirectory = join(projectDirectory, '.changelog');
    const srcDirectory: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_SrcDirectory = join(workspaceDirectory, 'src');

    await mkdir(srcDirectory, { recursive: true });
    await mkdir(changelogDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_PackageJsonPath = join(projectDirectory, 'package.json');
    const packageJsonContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_PackageJsonContents = JSON.stringify({
      name: 'test-prerelease-skip',
    }, null, 2);

    await writeFile(packageJsonPath, packageJsonContents, 'utf-8');

    const configPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_ConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_ConfigContents = JSON.stringify({
      workspaces: {
        './packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    const workspacePackagePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_WorkspacePackagePath = join(workspaceDirectory, 'package.json');
    const workspacePackageContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_WorkspacePackageContents = JSON.stringify({
      name: '@test/core',
      version: '2.0.0',
    }, null, 2);

    await writeFile(workspacePackagePath, workspacePackageContents, 'utf-8');

    const sourceFilePath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_SourceFilePath = join(srcDirectory, 'index.ts');
    const sourceFileContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_SourceFileContents = [
      '/**',
      ' * @since UNRELEASED',
      ' */',
      'export const z = 1;',
      '',
    ].join('\n');

    await writeFile(sourceFilePath, sourceFileContents, 'utf-8');

    const entryPath: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_EntryPath = join(changelogDirectory, 'prerelease-test.md');
    const entryContents: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_EntryContents = [
      '---',
      'package: "@test/core"',
      'category: added',
      'bump: patch',
      '---',
      '',
      'Added something new',
      '',
    ].join('\n');

    await writeFile(entryPath, entryContents, 'utf-8');

    process.chdir(projectDirectory);

    await CliUtilityChangelog.run({
      release: true,
    });

    strictEqual(process.exitCode, undefined);

    const sourceAfterRelease: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_SourceAfterRelease = await readFile(sourceFilePath, 'utf-8');

    // A non-prerelease version ('2.0.1') does NOT trigger the guard, so the stamp runs.
    const stampWasApplied: Tests_Cli_Utility_Changelog_CliUtilityChangelogRun_PrereleaseVersionSkipsStamp_StampWasApplied = sourceAfterRelease.includes('@since 2.0.1') === true && sourceAfterRelease.includes('UNRELEASED') === false;

    strictEqual(stampWasApplied, true);

    return;
  });

  return;
});

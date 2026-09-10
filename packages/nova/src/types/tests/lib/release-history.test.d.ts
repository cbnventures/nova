import type {
  Shared_NovaConfig,
  Shared_NovaConfigSettings_VersionStrategy,
} from '../../shared.d.ts';

/**
 * Tests - Lib - Release History - Validate Strategy.
 *
 * @since 0.26.0
 */
export type Tests_Lib_ReleaseHistory_ValidateStrategy_TemporaryPrefix = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_SandboxRoot = string;

/**
 * Tests - Lib - Release History - Validate Strategy - Detects CalVer From A Non Freezable Workspace.
 *
 * @since 0.26.0
 */
export type Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_ProjectDirectory = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_WorkspaceDirectory = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_ChangelogPath = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_ChangelogContent = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_Config = Shared_NovaConfig;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_DetectsCalVerFromANonFreezableWorkspace_Strategy = Shared_NovaConfigSettings_VersionStrategy | undefined;

/**
 * Tests - Lib - Release History - Validate Strategy - Recognizes Legacy SemVer Headings.
 *
 * @since 0.26.0
 */
export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_ProjectDirectory = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_ChangelogPath = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_ChangelogContent = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_Config = Shared_NovaConfig;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesLegacySemVerHeadings_Strategy = Shared_NovaConfigSettings_VersionStrategy | undefined;

/**
 * Tests - Lib - Release History - Validate Strategy - Recognizes Prerelease SemVer Headings.
 *
 * @since 0.26.0
 */
export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_ProjectDirectory = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_ChangelogPath = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_ChangelogContent = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_Config = Shared_NovaConfig;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RecognizesPrereleaseSemVerHeadings_Strategy = Shared_NovaConfigSettings_VersionStrategy | undefined;

/**
 * Tests - Lib - Release History - Validate Strategy - Rejects A Configured Strategy That Contradicts History.
 *
 * @since 0.26.0
 */
export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_ProjectDirectory = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_WorkspaceDirectory = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_ChangelogPath = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_ChangelogContent = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsAConfiguredStrategyThatContradictsHistory_Config = Shared_NovaConfig;

/**
 * Tests - Lib - Release History - Validate Strategy - Rejects Mixed Release History.
 *
 * @since 0.26.0
 */
export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_ProjectDirectory = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_WorkspaceDirectory = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_SemverPath = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_SemverContent = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_CalverPath = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_CalverContent = string;

export type Tests_Lib_ReleaseHistory_ValidateStrategy_RejectsMixedReleaseHistory_Config = Shared_NovaConfig;

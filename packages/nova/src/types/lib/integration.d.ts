import type { Dirent } from 'node:fs';

import type {
  Shared_IntegrationAssetFile,
  Shared_IntegrationAssetTarget,
  Shared_IntegrationMetadataTarget,
  Shared_IntegrationWorkspace,
  Shared_NovaConfig,
  Shared_NovaConfigWorkspace,
} from '../shared.d.ts';

/**
 * Lib - Integration - Collect Asset Targets.
 *
 * @since 0.34.0
 */
export type Lib_Integration_CollectAssetTargets_BaseDirectory = string;

export type Lib_Integration_CollectAssetTargets_Options_Extensions = string[];

export type Lib_Integration_CollectAssetTargets_Options_Positioned = boolean;

export type Lib_Integration_CollectAssetTargets_Options = {
  extensions: Lib_Integration_CollectAssetTargets_Options_Extensions;
  positioned: Lib_Integration_CollectAssetTargets_Options_Positioned;
};

export type Lib_Integration_CollectAssetTargets_Returns = Promise<Shared_IntegrationAssetTarget[]>;

export type Lib_Integration_CollectAssetTargets_FirstLevelEntries = Dirent[];

export type Lib_Integration_CollectAssetTargets_Targets = Shared_IntegrationAssetTarget[];

export type Lib_Integration_CollectAssetTargets_AllowedPositionPrefixes = string[];

export type Lib_Integration_CollectAssetTargets_FirstLevelPath = string;

export type Lib_Integration_CollectAssetTargets_SecondLevelEntries = Dirent[];

export type Lib_Integration_CollectAssetTargets_CanonicalLocales = string[];

export type Lib_Integration_CollectAssetTargets_SecondLevelPath = string;

export type Lib_Integration_CollectAssetTargets_TargetEntries = Dirent[];

export type Lib_Integration_CollectAssetTargets_TargetPath = string;

export type Lib_Integration_CollectAssetTargets_DirectoryEntries = Dirent[];

export type Lib_Integration_CollectAssetTargets_FileEntries = Dirent[];

export type Lib_Integration_CollectAssetTargets_Files = Shared_IntegrationAssetFile[];

export type Lib_Integration_CollectAssetTargets_Positions = Set<number>;

export type Lib_Integration_CollectAssetTargets_Position = number;

export type Lib_Integration_CollectAssetTargets_PositionPrefix = string;

export type Lib_Integration_CollectAssetTargets_RelativePath = string;

export type Lib_Integration_CollectAssetTargets_Target = Shared_IntegrationAssetTarget;

/**
 * Lib - Integration - Collect Metadata Targets.
 *
 * @since 0.34.0
 */
export type Lib_Integration_CollectMetadataTargets_BaseDirectory = string;

export type Lib_Integration_CollectMetadataTargets_AllowedFields = string[];

export type Lib_Integration_CollectMetadataTargets_Returns = Promise<Shared_IntegrationMetadataTarget[]>;

export type Lib_Integration_CollectMetadataTargets_FirstLevelEntries = Dirent[];

export type Lib_Integration_CollectMetadataTargets_Targets = Shared_IntegrationMetadataTarget[];

export type Lib_Integration_CollectMetadataTargets_FirstLevelPath = string;

export type Lib_Integration_CollectMetadataTargets_FileEntries = Dirent[];

export type Lib_Integration_CollectMetadataTargets_Locale = string;

export type Lib_Integration_CollectMetadataTargets_CanonicalLocales = string[];

export type Lib_Integration_CollectMetadataTargets_FilePath = string;

export type Lib_Integration_CollectMetadataTargets_Raw = string;

export type Lib_Integration_CollectMetadataTargets_Parsed = unknown;

export type Lib_Integration_CollectMetadataTargets_Attributes = Record<string, string>;

export type Lib_Integration_CollectMetadataTargets_Value = unknown;

export type Lib_Integration_CollectMetadataTargets_Target = Shared_IntegrationMetadataTarget;

/**
 * Lib - Integration - Confirm Plan.
 *
 * @since 0.34.0
 */
export type Lib_Integration_ConfirmPlan_IsDryRun = boolean;

export type Lib_Integration_ConfirmPlan_IsNonInteractive = boolean;

export type Lib_Integration_ConfirmPlan_IsYes = boolean;

export type Lib_Integration_ConfirmPlan_Returns = Promise<boolean>;

export type Lib_Integration_ConfirmPlan_Answers = Record<string, unknown>;

/**
 * Lib - Integration - Parse Comma Separated.
 *
 * @since 0.34.0
 */
export type Lib_Integration_ParseCommaSeparated_Value = string | undefined;

export type Lib_Integration_ParseCommaSeparated_Returns = string[] | undefined;

/**
 * Lib - Integration - Read Dotenv Value.
 *
 * @since 0.34.0
 */
export type Lib_Integration_ReadDotenvValue_FilePath = string;

export type Lib_Integration_ReadDotenvValue_Key = string;

export type Lib_Integration_ReadDotenvValue_Returns = Promise<string | undefined>;

export type Lib_Integration_ReadDotenvValue_Content = string;

export type Lib_Integration_ReadDotenvValue_Lines = string[];

export type Lib_Integration_ReadDotenvValue_TrimmedLine = string;

export type Lib_Integration_ReadDotenvValue_ExportlessLine = string;

export type Lib_Integration_ReadDotenvValue_SeparatorIndex = number;

export type Lib_Integration_ReadDotenvValue_CandidateKey = string;

export type Lib_Integration_ReadDotenvValue_DotenvLine = string;

export type Lib_Integration_ReadDotenvValue_Value = string;

/**
 * Lib - Integration - Report Plan.
 *
 * @since 0.34.0
 */
export type Lib_Integration_ReportPlan_Label = string;

export type Lib_Integration_ReportPlan_Lines = string[];

export type Lib_Integration_ReportPlan_Returns = void;

/**
 * Lib - Integration - Require Array.
 *
 * @since 0.34.0
 */
export type Lib_Integration_RequireArray_Value = unknown;

export type Lib_Integration_RequireArray_Name = string;

export type Lib_Integration_RequireArray_Returns = unknown[];

/**
 * Lib - Integration - Require Non Negative Integer.
 *
 * @since 0.34.0
 */
export type Lib_Integration_RequireNonNegativeInteger_Value = unknown;

export type Lib_Integration_RequireNonNegativeInteger_Name = string;

export type Lib_Integration_RequireNonNegativeInteger_Returns = number;

/**
 * Lib - Integration - Require Object.
 *
 * @since 0.34.0
 */
export type Lib_Integration_RequireObject_Value = unknown;

export type Lib_Integration_RequireObject_Name = string;

export type Lib_Integration_RequireObject_Returns = Record<string, unknown>;

/**
 * Lib - Integration - Require String.
 *
 * @since 0.34.0
 */
export type Lib_Integration_RequireString_Value = unknown;

export type Lib_Integration_RequireString_Name = string;

export type Lib_Integration_RequireString_Returns = string;

/**
 * Lib - Integration - Resolve Workspace.
 *
 * @since 0.34.0
 */
export type Lib_Integration_ResolveWorkspace_Options_NonInteractive = true;

export type Lib_Integration_ResolveWorkspace_Options_Workspace = string;

export type Lib_Integration_ResolveWorkspace_Options = {
  nonInteractive?: Lib_Integration_ResolveWorkspace_Options_NonInteractive;
  workspace?: Lib_Integration_ResolveWorkspace_Options_Workspace;
};

export type Lib_Integration_ResolveWorkspace_Markers = string[];

export type Lib_Integration_ResolveWorkspace_Returns = Promise<Shared_IntegrationWorkspace>;

export type Lib_Integration_ResolveWorkspace_CurrentDirectory = string;

export type Lib_Integration_ResolveWorkspace_IsAtProjectRoot = boolean;

export type Lib_Integration_ResolveWorkspace_Config = Shared_NovaConfig;

export type Lib_Integration_ResolveWorkspace_WorkspaceEntries = [string, Shared_NovaConfigWorkspace][];

export type Lib_Integration_ResolveWorkspace_RequestedWorkspace = string | undefined;

export type Lib_Integration_ResolveWorkspace_Candidates = Shared_IntegrationWorkspace[];

export type Lib_Integration_ResolveWorkspace_WorkspacePath = string;

export type Lib_Integration_ResolveWorkspace_NormalizedPath = string;

export type Lib_Integration_ResolveWorkspace_WorkspaceAbsolutePath = string;

export type Lib_Integration_ResolveWorkspace_HasMarker = boolean;

export type Lib_Integration_ResolveWorkspace_WorkspaceName = string;

export type Lib_Integration_ResolveWorkspace_Matches = Shared_IntegrationWorkspace[];

export type Lib_Integration_ResolveWorkspace_RequestedCandidate = Shared_IntegrationWorkspace | undefined;

export type Lib_Integration_ResolveWorkspace_SingleCandidate = Shared_IntegrationWorkspace | undefined;

export type Lib_Integration_ResolveWorkspace_Answers = Record<string, unknown>;

export type Lib_Integration_ResolveWorkspace_SelectedPath = unknown;

export type Lib_Integration_ResolveWorkspace_Candidate = Shared_IntegrationWorkspace | undefined;

/**
 * Lib - Integration - Wait.
 *
 * @since 0.34.0
 */
export type Lib_Integration_Wait_Milliseconds = number;

export type Lib_Integration_Wait_Returns = Promise<void>;

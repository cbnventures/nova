import type { Dirent } from 'node:fs';

import type {
  Shared_CorepackPackageManagerDescriptor,
  Shared_DockerPackagingFileChange_Status,
  Shared_DockerPackagingFileChanges,
  Shared_DockerPackagingGenerateOptions,
  Shared_DockerPackagingGenerateResult,
  Shared_DockerPackagingImagePlan,
  Shared_DockerPackagingManifest,
  Shared_DockerPackagingManifest_LegacyStatePaths,
  Shared_DockerPackagingManifest_NetworkMode,
  Shared_DockerPackagingPlannedFile,
  Shared_DockerPackagingRenderInput,
  Shared_DockerPackagingService,
  Shared_DockerPackagingService_Ports,
  Shared_DockerPackagingServiceInput,
  Shared_DockerPackagingServiceInputs,
  Shared_DockerPackagingServiceKind,
  Shared_DockerPackagingServices,
  Shared_DockerPackagingServicesByName,
  Shared_DockerPackagingStage,
  Shared_DockerPackagingStages,
  Shared_DockerPackagingStringMap,
  Shared_DockerPackagingSyncOptions,
  Shared_DockerPackagingSyncResult,
  Shared_DockerPackagingSyncResult_MissingScripts,
  Shared_DockerPackagingSyncResult_UnownedFiles,
  Shared_DockerPackagingWorkspace,
  Shared_DockerPackagingWorkspace_SourceGroup,
  Shared_DockerPackagingWorkspacePackage,
  Shared_DockerPackagingWorkspacePackages,
  Shared_DockerPackagingWorkspaces,
  Shared_NovaConfig_IgnoreFile,
} from '../shared.d.ts';

/**
 * Lib - Docker Packaging.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_DockerAssemblyRelativePath = string;
export type Lib_DockerPackaging_DockerConfigWorkspacePath = string;
export type Lib_DockerPackaging_DockerManifestSchemaVersion = number;
export type Lib_DockerPackaging_DockerProtectedWritablePaths = string[];
export type Lib_DockerPackaging_DockerReservedServiceNames = ReadonlySet<string>;
export type Lib_DockerPackaging_DockerGeneratedFilesRecord = string;
export type Lib_DockerPackaging_DirectoryEntries = Dirent[];

/**
 * Lib - Docker Packaging - Runner - Apply Image Plan.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_ApplyImagePlan_ProjectDirectory = string;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_ImagePlan = Shared_DockerPackagingImagePlan;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_IsDryRun = boolean;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_IsReplaceFile = boolean;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_IsReportFiles = boolean;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_Returns = Promise<Omit<Shared_DockerPackagingSyncResult, 'missingIgnoreFileEntry'>>;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyDirectory = string;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_RootfsDirectory = string;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_WorkspaceManifestsDirectory = string;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_YarnConfigPath = string;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_RecordPath = string;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_IsOwnedPath = (targetPath: string) => boolean;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_RecordContent = string | undefined;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_RecordValue = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_RecordFiles = unknown[];
export type Lib_DockerPackaging_Runner_ApplyImagePlan_PreviousOwnedPaths = Set<string>;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_RecordedPath = string;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_Plan = Shared_DockerPackagingImagePlan;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_OwnedFiles = string[];
export type Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedEntries = [string, Shared_DockerPackagingPlannedFile][];
export type Lib_DockerPackaging_Runner_ApplyImagePlan_Discovered = [(string | undefined)[], string[], string[], string | undefined];
export type Lib_DockerPackaging_Runner_ApplyImagePlan_CurrentContents = (string | undefined)[];
export type Lib_DockerPackaging_Runner_ApplyImagePlan_RootfsFiles = string[];
export type Lib_DockerPackaging_Runner_ApplyImagePlan_Changes = Shared_DockerPackagingFileChanges;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedEntry = [string, Shared_DockerPackagingPlannedFile] | undefined;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_CurrentContent = string | undefined;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_LineChanges_Added = number;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_LineChanges_Removed = number;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_LineChanges = {
  added: Lib_DockerPackaging_Runner_ApplyImagePlan_LineChanges_Added;
  removed: Lib_DockerPackaging_Runner_ApplyImagePlan_LineChanges_Removed;
};
export type Lib_DockerPackaging_Runner_ApplyImagePlan_Status = Shared_DockerPackagingFileChange_Status;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_StalePaths = string[];
export type Lib_DockerPackaging_Runner_ApplyImagePlan_StaleContents = (string | undefined)[];
export type Lib_DockerPackaging_Runner_ApplyImagePlan_StaleContent = string;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_UnownedFiles = Shared_DockerPackagingSyncResult_UnownedFiles;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyPackagePath = string;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedAssemblyPackage = Shared_DockerPackagingPlannedFile | undefined;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyPackageContent = string | undefined;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyPackageValue = unknown;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyScriptsValue = unknown;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_MissingScripts = Shared_DockerPackagingSyncResult_MissingScripts;
export type Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedFile = Shared_DockerPackagingPlannedFile;

/**
 * Lib - Docker Packaging - Runner - Apply Image Plan - Is Owned Path.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_ApplyImagePlan_IsOwnedPath_Returns = boolean;

/**
 * Lib - Docker Packaging - Runner - Build Assembly Package.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_BuildAssemblyPackage_Slug = string;
export type Lib_DockerPackaging_Runner_BuildAssemblyPackage_Returns = Record<string, unknown>;

/**
 * Lib - Docker Packaging - Runner - BuildContainerPackage.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildContainerPackage_RootPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildContainerPackage_AssemblyPackageName = string;
export type Lib_DockerPackaging_Runner_BuildContainerPackage_BuildOrder = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_BuildContainerPackage_Returns = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildContainerPackage_ContainerPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildContainerPackage_InheritedValue = unknown;

/**
 * Lib - Docker Packaging - Runner - BuildHealthcheck.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildHealthcheck_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_BuildHealthcheck_Returns = string;
export type Lib_DockerPackaging_Runner_BuildHealthcheck_Lines = string[];
export type Lib_DockerPackaging_Runner_BuildHealthcheck_LongrunServices = Shared_DockerPackagingServices;
export type Lib_DockerPackaging_Runner_BuildHealthcheck_HealthService = Shared_DockerPackagingService | undefined;
export type Lib_DockerPackaging_Runner_BuildHealthcheck_HealthPort = number | undefined;
export type Lib_DockerPackaging_Runner_BuildHealthcheck_ShellVariableMarker = string;

/**
 * Lib - Docker Packaging - Runner - BuildInitUser.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildInitUser_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_BuildInitUser_Returns = string;
export type Lib_DockerPackaging_Runner_BuildInitUser_ShellNewline = string;
export type Lib_DockerPackaging_Runner_BuildInitUser_ShellVariableMarker = string;
export type Lib_DockerPackaging_Runner_BuildInitUser_ProtectedWritablePatterns = string;

/**
 * Lib - Docker Packaging - Runner - BuildLogHelper.
 *
 * @since 0.43.1
 */
export type Lib_DockerPackaging_Runner_BuildLogHelper_Returns = string;
export type Lib_DockerPackaging_Runner_BuildLogHelper_ShellNewline = string;
export type Lib_DockerPackaging_Runner_BuildLogHelper_ShellVariableMarker = string;

/**
 * Lib - Docker Packaging - Runner - BuildPackageJsonRecipes.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildPackageJsonRecipes_Returns = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildPackageJsonRecipes_Recipes = Record<string, unknown>;

/**
 * Lib - Docker Packaging - Runner - BuildRequestedServices.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildRequestedServices_Options = Shared_DockerPackagingGenerateOptions;
export type Lib_DockerPackaging_Runner_BuildRequestedServices_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_BuildRequestedServices_Returns = Shared_DockerPackagingServices;
export type Lib_DockerPackaging_Runner_BuildRequestedServices_WorkspacePath = string;
export type Lib_DockerPackaging_Runner_BuildRequestedServices_DefaultName = string;
export type Lib_DockerPackaging_Runner_BuildRequestedServices_ServiceInputs = Shared_DockerPackagingServiceInputs;
export type Lib_DockerPackaging_Runner_BuildRequestedServices_ExistingServices = Shared_DockerPackagingServices;
export type Lib_DockerPackaging_Runner_BuildRequestedServices_RequestedServices = Shared_DockerPackagingServices;

/**
 * Lib - Docker Packaging - Runner - BuildRootPackage.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildRootPackage_RootPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildRootPackage_AssemblyPackageName = string;
export type Lib_DockerPackaging_Runner_BuildRootPackage_Returns = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildRootPackage_ScriptsValue = unknown;
export type Lib_DockerPackaging_Runner_BuildRootPackage_Scripts = Shared_DockerPackagingStringMap;
export type Lib_DockerPackaging_Runner_BuildRootPackage_WorkspacesValue = unknown;
export type Lib_DockerPackaging_Runner_BuildRootPackage_IsCovered = boolean;
export type Lib_DockerPackaging_Runner_BuildRootPackage_IsDockerWorkspace = boolean;
export type Lib_DockerPackaging_Runner_BuildRootPackage_IsPackagesWildcard = boolean;
export type Lib_DockerPackaging_Runner_BuildRootPackage_PackageWorkspaces = unknown[];
export type Lib_DockerPackaging_Runner_BuildRootPackage_PackageIsDockerWorkspace = boolean;
export type Lib_DockerPackaging_Runner_BuildRootPackage_PackageIsPackagesWildcard = boolean;
export type Lib_DockerPackaging_Runner_BuildRootPackage_AssemblyDependencyValue = unknown;

/**
 * Lib - Docker Packaging - Runner - BuildRunScript.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildRunScript_Service = Shared_DockerPackagingService;
export type Lib_DockerPackaging_Runner_BuildRunScript_Returns = string;
export type Lib_DockerPackaging_Runner_BuildRunScript_Lines = string[];
export type Lib_DockerPackaging_Runner_BuildRunScript_ShellVariableMarker = string;

/**
 * Lib - Docker Packaging - Runner - BuildService.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildService_Options = Shared_DockerPackagingGenerateOptions;
export type Lib_DockerPackaging_Runner_BuildService_Input = Shared_DockerPackagingServiceInput;
export type Lib_DockerPackaging_Runner_BuildService_ExistingServices = Shared_DockerPackagingServices;
export type Lib_DockerPackaging_Runner_BuildService_RequestedServices = Shared_DockerPackagingServices;
export type Lib_DockerPackaging_Runner_BuildService_Returns = Shared_DockerPackagingService;
export type Lib_DockerPackaging_Runner_BuildService_Name = string;
export type Lib_DockerPackaging_Runner_BuildService_WorkspacePath = string;
export type Lib_DockerPackaging_Runner_BuildService_PreviousService = Shared_DockerPackagingService | undefined;
export type Lib_DockerPackaging_Runner_BuildService_PreviousPort = number | undefined;
export type Lib_DockerPackaging_Runner_BuildService_PreferredPort = number | undefined;
export type Lib_DockerPackaging_Runner_BuildService_Port = number | undefined;
export type Lib_DockerPackaging_Runner_BuildService_OccupiedPorts = Set<number>;
export type Lib_DockerPackaging_Runner_BuildService_Kind = Shared_DockerPackagingServiceKind;
export type Lib_DockerPackaging_Runner_BuildService_Environment = Shared_DockerPackagingStringMap;
export type Lib_DockerPackaging_Runner_BuildService_Command = string;
export type Lib_DockerPackaging_Runner_BuildService_WritablePaths = string[];
export type Lib_DockerPackaging_Runner_BuildService_PathParts = string[];
export type Lib_DockerPackaging_Runner_BuildService_IsProtectedWritablePath = boolean;
export type Lib_DockerPackaging_Runner_BuildService_Service = Shared_DockerPackagingService;
export type Lib_DockerPackaging_Runner_BuildService_HealthCommand = string | undefined;
export type Lib_DockerPackaging_Runner_BuildService_FinishCommand = string | undefined;

/**
 * Lib - Docker Packaging - Runner - BuildSyntheticWorkspacePackage.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_PackageJson = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_BuildOrder = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_Returns = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_SyntheticPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_DependencyGroup = unknown;
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_InternalWorkspace = Shared_DockerPackagingWorkspacePackage | undefined;
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_DependencyValue = unknown;
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_WorkspaceRange = string;
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_NormalizedDependencyValue = string;
export type Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_InternalVersionValue = unknown;

/**
 * Lib - Docker Packaging - Runner - CollectWorkspacePackages.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_CollectWorkspacePackages_ProjectDirectory = string;
export type Lib_DockerPackaging_Runner_CollectWorkspacePackages_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_CollectWorkspacePackages_Returns = Promise<Shared_DockerPackagingWorkspacePackages>;
export type Lib_DockerPackaging_Runner_CollectWorkspacePackages_WorkspacePaths = Set<string>;
export type Lib_DockerPackaging_Runner_CollectWorkspacePackages_GroupDirectory = string;
export type Lib_DockerPackaging_Runner_CollectWorkspacePackages_WorkspacePackages = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackagePath = string;
export type Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackageJson = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackageName = unknown;

/**
 * Lib - Docker Packaging - Runner - Count Line Changes.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_CountLineChanges_Before = string;
export type Lib_DockerPackaging_Runner_CountLineChanges_After = string;
export type Lib_DockerPackaging_Runner_CountLineChanges_Returns_Added = number;
export type Lib_DockerPackaging_Runner_CountLineChanges_Returns_Removed = number;
export type Lib_DockerPackaging_Runner_CountLineChanges_Returns = {
  added: Lib_DockerPackaging_Runner_CountLineChanges_Returns_Added;
  removed: Lib_DockerPackaging_Runner_CountLineChanges_Returns_Removed;
};
export type Lib_DockerPackaging_Runner_CountLineChanges_BeforeLines = string[];
export type Lib_DockerPackaging_Runner_CountLineChanges_AfterLines = string[];
export type Lib_DockerPackaging_Runner_CountLineChanges_Lengths = number[];
export type Lib_DockerPackaging_Runner_CountLineChanges_Diagonal = number;
export type Lib_DockerPackaging_Runner_CountLineChanges_Above = number;
export type Lib_DockerPackaging_Runner_CountLineChanges_Common = number;

/**
 * Lib - Docker Packaging - Runner - GenerateForTarget.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_GenerateForTarget_Options = Shared_DockerPackagingGenerateOptions;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Returns = Promise<Shared_DockerPackagingGenerateResult>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ProjectDirectory = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceDirectory = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePathValue = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyDirectory = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ManifestPath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_RootPackagePath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackagePath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_NovaConfigPath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ExistingManifestValue = Record<string, unknown> | undefined;
export type Lib_DockerPackaging_Runner_GenerateForTarget_RootPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_NovaConfig = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackageNameValue = unknown;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ProjectValue = unknown;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ProjectNameValue = unknown;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ProjectSlugValue = unknown;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ExistingWorkspace = Shared_DockerPackagingWorkspace | undefined;
export type Lib_DockerPackaging_Runner_GenerateForTarget_RuntimePaths = string[] | undefined;
export type Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceDefinition = Shared_DockerPackagingWorkspace;
export type Lib_DockerPackaging_Runner_GenerateForTarget_RequestedServices = Shared_DockerPackagingServices;
export type Lib_DockerPackaging_Runner_GenerateForTarget_RetainedServices = Shared_DockerPackagingServices;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ConflictingService = Shared_DockerPackagingService | undefined;
export type Lib_DockerPackaging_Runner_GenerateForTarget_RetainedWorkspaces = Shared_DockerPackagingWorkspaces;
export type Lib_DockerPackaging_Runner_GenerateForTarget_HealthPath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_LegacyStatePaths = Shared_DockerPackagingManifest_LegacyStatePaths;
export type Lib_DockerPackaging_Runner_GenerateForTarget_NetworkMode = Shared_DockerPackagingManifest_NetworkMode;
export type Lib_DockerPackaging_Runner_GenerateForTarget_StateEnvironment = string | undefined;
export type Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedManifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFileEntry = Shared_NovaConfig_IgnoreFile;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ImagePlan = Shared_DockerPackagingImagePlan;
export type Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyPackageName = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedRootPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedNovaConfig = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Result = Shared_DockerPackagingGenerateResult;

/**
 * Lib - Docker Packaging - Runner - List Files.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_ListFiles_Directory = string;
export type Lib_DockerPackaging_Runner_ListFiles_Returns = Promise<string[]>;
export type Lib_DockerPackaging_Runner_ListFiles_Entries = Dirent[];

/**
 * Lib - Docker Packaging - Runner - MergeScripts.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_MergeScripts_Scripts = Shared_DockerPackagingStringMap;
export type Lib_DockerPackaging_Runner_MergeScripts_Returns = Shared_DockerPackagingStringMap;
export type Lib_DockerPackaging_Runner_MergeScripts_Entries = [string, string][];
export type Lib_DockerPackaging_Runner_MergeScripts_DeployEntries = [string, string][];
export type Lib_DockerPackaging_Runner_MergeScripts_Merged = Shared_DockerPackagingStringMap;
export type Lib_DockerPackaging_Runner_MergeScripts_IsDeployInserted = boolean;
export type Lib_DockerPackaging_Runner_MergeScripts_InsertDeployScripts = () => void;

/**
 * Lib - Docker Packaging - Runner - MergeScripts - InsertDeployScripts.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_MergeScripts_InsertDeployScripts_Returns = void;

/**
 * Lib - Docker Packaging - Runner - NormalizeManifest.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_NormalizeManifest_Value = Record<string, unknown> | undefined;
export type Lib_DockerPackaging_Runner_NormalizeManifest_Returns = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_NormalizeManifest_HasRetiredPortKeys = boolean;
export type Lib_DockerPackaging_Runner_NormalizeManifest_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_NormalizeManifest_ServiceNames = Set<string>;
export type Lib_DockerPackaging_Runner_NormalizeManifest_ServicePorts = Set<number>;
export type Lib_DockerPackaging_Runner_NormalizeManifest_HealthPath = string;
export type Lib_DockerPackaging_Runner_NormalizeManifest_LegacyStatePaths = Shared_DockerPackagingManifest_LegacyStatePaths;
export type Lib_DockerPackaging_Runner_NormalizeManifest_NetworkMode = Shared_DockerPackagingManifest_NetworkMode;
export type Lib_DockerPackaging_Runner_NormalizeManifest_StateEnvironment = string | undefined;
export type Lib_DockerPackaging_Runner_NormalizeManifest_FirstPort = number | undefined;
export type Lib_DockerPackaging_Runner_NormalizeManifest_DeclaredPorts = Shared_DockerPackagingService_Ports;
export type Lib_DockerPackaging_Runner_NormalizeManifest_Settings = Pick<Shared_DockerPackagingManifest, 'build' | 'compose' | 'dockerfile' | 'healthService' | 'images' | 'project' | 'runtime' | 's6Overlay'>;
export type Lib_DockerPackaging_Runner_NormalizeManifest_Workspaces = Shared_DockerPackagingWorkspaces;
export type Lib_DockerPackaging_Runner_NormalizeManifest_HealthService = Shared_DockerPackagingService | undefined;

/**
 * Lib - Docker Packaging - Runner - NormalizeRuntimePaths.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Value = unknown;
export type Lib_DockerPackaging_Runner_NormalizeRuntimePaths_WorkspacePath = string;
export type Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Returns = string[];
export type Lib_DockerPackaging_Runner_NormalizeRuntimePaths_RuntimePaths = string[];
export type Lib_DockerPackaging_Runner_NormalizeRuntimePaths_PathParts = string[];

/**
 * Lib - Docker Packaging - Runner - Normalize Workspace.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_NormalizeWorkspace_Workspace = Shared_DockerPackagingWorkspace;
export type Lib_DockerPackaging_Runner_NormalizeWorkspace_Returns = Shared_DockerPackagingWorkspace;
export type Lib_DockerPackaging_Runner_NormalizeWorkspace_Normalized = Shared_DockerPackagingWorkspace;
export type Lib_DockerPackaging_Runner_NormalizeWorkspace_SourceFiles = Shared_DockerPackagingWorkspace_SourceGroup;

/**
 * Lib - Docker Packaging - Runner - Plan Image.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_PlanImage_ProjectDirectory = string;
export type Lib_DockerPackaging_Runner_PlanImage_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_PlanImage_RootPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_PlanImage_NovaConfig = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_PlanImage_IgnoreFileEntry = Shared_NovaConfig_IgnoreFile;
export type Lib_DockerPackaging_Runner_PlanImage_ProjectSlug = string;
export type Lib_DockerPackaging_Runner_PlanImage_IncludeManifest = boolean;
export type Lib_DockerPackaging_Runner_PlanImage_Returns = Promise<Shared_DockerPackagingImagePlan>;
export type Lib_DockerPackaging_Runner_PlanImage_AssemblyDirectory = string;
export type Lib_DockerPackaging_Runner_PlanImage_AssemblyPackagePath = string;
export type Lib_DockerPackaging_Runner_PlanImage_DockerignorePath = string;
export type Lib_DockerPackaging_Runner_PlanImage_WorkspacePackages = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_PlanImage_BuildOrder = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_PlanImage_Inputs = [Map<string, string>, string, string | undefined, string | undefined];
export type Lib_DockerPackaging_Runner_PlanImage_StageFragments = Map<string, string>;
export type Lib_DockerPackaging_Runner_PlanImage_DockerignoreHeader = string;
export type Lib_DockerPackaging_Runner_PlanImage_PackageManagerDescriptor = Shared_CorepackPackageManagerDescriptor | undefined;
export type Lib_DockerPackaging_Runner_PlanImage_IsYarnBerry = boolean;
export type Lib_DockerPackaging_Runner_PlanImage_IsNovaBuildEnabled = boolean;
export type Lib_DockerPackaging_Runner_PlanImage_GeneratedHeader = string[];
export type Lib_DockerPackaging_Runner_PlanImage_PnpmWorkspaceLines = string[];
export type Lib_DockerPackaging_Runner_PlanImage_RenderInput = Shared_DockerPackagingRenderInput;
export type Lib_DockerPackaging_Runner_PlanImage_Plan = Shared_DockerPackagingImagePlan;

/**
 * Lib - Docker Packaging - Runner - Read Image Workspaces.
 *
 * @since 0.41.1
 */
export type Lib_DockerPackaging_Runner_ReadImageWorkspaces_ProjectDirectory = string;
export type Lib_DockerPackaging_Runner_ReadImageWorkspaces_Returns = Promise<string[]>;
export type Lib_DockerPackaging_Runner_ReadImageWorkspaces_BuildPackagePath = string;
export type Lib_DockerPackaging_Runner_ReadImageWorkspaces_BuildPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_ReadImageWorkspaces_WorkspacesValue = unknown;
export type Lib_DockerPackaging_Runner_ReadImageWorkspaces_WorkspacePaths = string[];
export type Lib_DockerPackaging_Runner_ReadImageWorkspaces_WorkspacePathTypeGuard = string;

/**
 * Lib - Docker Packaging - Runner - ReadJsonObject.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_ReadJsonObject_TargetPath = string;
export type Lib_DockerPackaging_Runner_ReadJsonObject_Returns = Promise<Record<string, unknown>>;
export type Lib_DockerPackaging_Runner_ReadJsonObject_RawContent = string;
export type Lib_DockerPackaging_Runner_ReadJsonObject_ParsedContent = unknown;

/**
 * Lib - Docker Packaging - Runner - Read Optional File.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_ReadOptionalFile_TargetPath = string;
export type Lib_DockerPackaging_Runner_ReadOptionalFile_Returns = Promise<string | undefined>;

/**
 * Lib - Docker Packaging - Runner - Read Stage Fragments.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_ReadStageFragments_AssemblyDirectory = string;
export type Lib_DockerPackaging_Runner_ReadStageFragments_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_ReadStageFragments_Returns = Promise<Map<string, string>>;
export type Lib_DockerPackaging_Runner_ReadStageFragments_Stages = Shared_DockerPackagingStages;
export type Lib_DockerPackaging_Runner_ReadStageFragments_Contents = (string | undefined)[];
export type Lib_DockerPackaging_Runner_ReadStageFragments_Fragments = Map<string, string>;
export type Lib_DockerPackaging_Runner_ReadStageFragments_Stage = Shared_DockerPackagingStage | undefined;
export type Lib_DockerPackaging_Runner_ReadStageFragments_Content = string | undefined;

/**
 * Lib - Docker Packaging - Runner - Refresh Generated Manifests.
 *
 * @since 0.38.0
 */
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ProjectDirectory = string;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_Returns = Promise<void>;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyDirectory = string;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ManifestPath = string;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_RootPackagePath = string;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyPackagePath = string;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_RootPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyPackageNameValue = unknown;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_WorkspacePackages = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_BuildOrder = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_NeedsSyntheticWorkspaceManifests = boolean;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspaceManifests = Map<string, string>;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspaceManifestPath = string;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspacePackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspaceManifestContent = string;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ContainerBuildPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RefreshGeneratedManifests_WorkspaceManifestsDirectory = string;

/**
 * Lib - Docker Packaging - Runner - RegisterProjectConfig.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_NovaConfig = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_AssemblyPackageName = string;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFileEntry = Shared_NovaConfig_IgnoreFile;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_Returns = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_ProjectValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_PlatformsValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_Platforms = string[];
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_WorkspacesValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_Workspaces = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFilesValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFiles = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_AttributeFilesValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_AttributeFiles = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_RecipesValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_Recipes = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_PackageJsonRecipesValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_PackageJsonRecipes = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_Environment = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentWorkspacesValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentWorkspaces = Record<string, unknown>;

/**
 * Lib - Docker Packaging - Runner - Remove Empty Parents.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_RemoveEmptyParents_Directory = string;
export type Lib_DockerPackaging_Runner_RemoveEmptyParents_StopDirectory = string;
export type Lib_DockerPackaging_Runner_RemoveEmptyParents_Returns = Promise<void>;

/**
 * Lib - Docker Packaging - Runner - Render Rootfs.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_RenderRootfs_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_RenderRootfs_Returns = Map<string, Shared_DockerPackagingPlannedFile>;
export type Lib_DockerPackaging_Runner_RenderRootfs_Files = Map<string, Shared_DockerPackagingPlannedFile>;
export type Lib_DockerPackaging_Runner_RenderRootfs_WritablePaths = string[];
export type Lib_DockerPackaging_Runner_RenderRootfs_ShellVariableMarker = string;
export type Lib_DockerPackaging_Runner_RenderRootfs_GeneratedHeader = string[];
export type Lib_DockerPackaging_Runner_RenderRootfs_AddFile = (relativePath: string, content: string, executable: boolean) => void;
export type Lib_DockerPackaging_Runner_RenderRootfs_ServiceDirectory = string;
export type Lib_DockerPackaging_Runner_RenderRootfs_CriticalFinishScript = string;

/**
 * Lib - Docker Packaging - Runner - Render Rootfs - Add File.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_RenderRootfs_AddFile_Returns = void;

export type Lib_DockerPackaging_Runner_RenderRootfs_AddFile_ScriptLines = string[];

/**
 * Lib - Docker Packaging - Runner - ResolveBuildOrder.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_ResolveBuildOrder_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_ResolveBuildOrder_WorkspacePackages = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_ResolveBuildOrder_Returns = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_ResolveBuildOrder_OrderedPackages = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitingPackages = Set<string>;
export type Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage = (packageName: string) => void;

/**
 * Lib - Docker Packaging - Runner - ResolveBuildOrder - VisitPackage.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage_WorkspacePackage = Shared_DockerPackagingWorkspacePackage | undefined;
export type Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage_DependencyGroup = unknown;

/**
 * Lib - Docker Packaging - Runner - Resolve Ignore File Entry.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_NovaConfig = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_Returns = Shared_NovaConfig_IgnoreFile;
export type Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_IgnoreFilesValue = unknown;
export type Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_ConfiguredIgnoreFileEntry = unknown;

/**
 * Lib - Docker Packaging - Runner - ShellQuote.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_ShellQuote_Value = string;
export type Lib_DockerPackaging_Runner_ShellQuote_Returns = string;

/**
 * Lib - Docker Packaging - Runner - Sync Image.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_SyncImage_Options = Shared_DockerPackagingSyncOptions;
export type Lib_DockerPackaging_Runner_SyncImage_Returns = Promise<Shared_DockerPackagingSyncResult>;
export type Lib_DockerPackaging_Runner_SyncImage_ProjectDirectory = string;
export type Lib_DockerPackaging_Runner_SyncImage_ManifestPath = string;
export type Lib_DockerPackaging_Runner_SyncImage_NovaConfigPath = string;
export type Lib_DockerPackaging_Runner_SyncImage_JsonFiles = [Record<string, unknown>, Record<string, unknown>, Record<string, unknown>];
export type Lib_DockerPackaging_Runner_SyncImage_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_SyncImage_RootPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_SyncImage_NovaConfig = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_SyncImage_ProjectValue = unknown;
export type Lib_DockerPackaging_Runner_SyncImage_ProjectNameValue = unknown;
export type Lib_DockerPackaging_Runner_SyncImage_ProjectSlugValue = unknown;
export type Lib_DockerPackaging_Runner_SyncImage_ImagePlan = Shared_DockerPackagingImagePlan;
export type Lib_DockerPackaging_Runner_SyncImage_ApplyResult = Omit<Shared_DockerPackagingSyncResult, 'missingIgnoreFileEntry'>;
export type Lib_DockerPackaging_Runner_SyncImage_IgnoreFilesValue = unknown;

/**
 * Lib - Docker Packaging - Runner - Validate Service Graph.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_ValidateServiceGraph_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_ValidateServiceGraph_Returns = void;
export type Lib_DockerPackaging_Runner_ValidateServiceGraph_AvailableServiceNames = Set<string>;
export type Lib_DockerPackaging_Runner_ValidateServiceGraph_ServicesByName = Shared_DockerPackagingServicesByName;
export type Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitedServices = Set<string>;
export type Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitingServices = Set<string>;
export type Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitService = (serviceName: string) => void;

/**
 * Lib - Docker Packaging - Runner - Validate Service Graph - Visit Service.
 *
 * @since 0.49.0
 */
export type Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitService_Service = Shared_DockerPackagingService | undefined;

/**
 * Lib - Docker Packaging - Runner - ValidateServiceName.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_ValidateServiceName_Name = string;
export type Lib_DockerPackaging_Runner_ValidateServiceName_Returns = void;

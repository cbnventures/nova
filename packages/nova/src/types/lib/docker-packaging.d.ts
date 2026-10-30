import type { Dirent } from 'node:fs';

import type {
  Shared_CorepackPackageManagerDescriptor,
  Shared_DockerPackagingGenerateOptions,
  Shared_DockerPackagingGenerateResult,
  Shared_DockerPackagingManifest,
  Shared_DockerPackagingService,
  Shared_DockerPackagingServiceInput,
  Shared_DockerPackagingServiceInputs,
  Shared_DockerPackagingServiceKind,
  Shared_DockerPackagingServices,
  Shared_DockerPackagingServicesByName,
  Shared_DockerPackagingStringMap,
  Shared_DockerPackagingWorkspace,
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
export type Lib_DockerPackaging_DockerWorkspaceBuildDirectory = string;
export type Lib_DockerPackaging_DirectoryEntries = Dirent[];

/**
 * Lib - Docker Packaging - Runner - BuildCompose.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildCompose_Template = string;
export type Lib_DockerPackaging_Runner_BuildCompose_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_BuildCompose_Returns = string;
export type Lib_DockerPackaging_Runner_BuildCompose_EnvironmentFiles = string[];
export type Lib_DockerPackaging_Runner_BuildCompose_PortSet = Set<number>;
export type Lib_DockerPackaging_Runner_BuildCompose_Ports = number[];
export type Lib_DockerPackaging_Runner_BuildCompose_PortLines = string[];
export type Lib_DockerPackaging_Runner_BuildCompose_HasContainerNativeService = boolean;
export type Lib_DockerPackaging_Runner_BuildCompose_EnvironmentFileBlock = string;
export type Lib_DockerPackaging_Runner_BuildCompose_InteractiveBlock = string;
export type Lib_DockerPackaging_Runner_BuildCompose_PortBlock = string;
export type Lib_DockerPackaging_Runner_BuildCompose_Replacements = Shared_DockerPackagingStringMap;
export type Lib_DockerPackaging_Runner_BuildCompose_Content = string;

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
 * Lib - Docker Packaging - Runner - BuildDockerfile.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildDockerfile_Template = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_BuildDockerfile_BuildOrder = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_BuildDockerfile_RootPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildDockerfile_Returns = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerValue = unknown;
export type Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerDescriptor = Shared_CorepackPackageManagerDescriptor | undefined;
export type Lib_DockerPackaging_Runner_BuildDockerfile_PackageManager = Shared_CorepackPackageManagerDescriptor['name'];
export type Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerVersion = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_IsYarnClassic = boolean;
export type Lib_DockerPackaging_Runner_BuildDockerfile_NeedsSyntheticWorkspaceManifests = boolean;
export type Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerConfigCopies = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_CorepackVersion = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_InstallCommand = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_PruneCommand = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_BuildCommands = string[];
export type Lib_DockerPackaging_Runner_BuildDockerfile_PackageName = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_PackageJson = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_BuildDockerfile_ScriptsValue = unknown;
export type Lib_DockerPackaging_Runner_BuildDockerfile_BuildScriptValue = unknown;
export type Lib_DockerPackaging_Runner_BuildDockerfile_QuotedPackageName = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceManifestCopyLines = string[];
export type Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceManifestRestoreLines = string[];
export type Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceSourceCopyLines = string[];
export type Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssemblyCommands = string[];
export type Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeCopyLines = Set<string>;
export type Lib_DockerPackaging_Runner_BuildDockerfile_NeedsNodeRuntime = boolean;
export type Lib_DockerPackaging_Runner_BuildDockerfile_WorkspacePackage = Shared_DockerPackagingWorkspacePackage;
export type Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceManifestSourcePath = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeWorkspacePath = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssemblyWorkspaceServices = Shared_DockerPackagingServices;
export type Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeSitePath = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssemblyWorkspacePath = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceServices = Shared_DockerPackagingServices;
export type Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeWorkspacePackage = Shared_DockerPackagingWorkspacePackage;
export type Lib_DockerPackaging_Runner_BuildDockerfile_IsSelectedWorkspace = boolean;
export type Lib_DockerPackaging_Runner_BuildDockerfile_PortSet = Set<number>;
export type Lib_DockerPackaging_Runner_BuildDockerfile_Ports = number[];
export type Lib_DockerPackaging_Runner_BuildDockerfile_ExposeDirectives = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeBase = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_WritablePaths = string[];
export type Lib_DockerPackaging_Runner_BuildDockerfile_WritableDirectories = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssembly = string;
export type Lib_DockerPackaging_Runner_BuildDockerfile_Replacements = Shared_DockerPackagingStringMap;
export type Lib_DockerPackaging_Runner_BuildDockerfile_Content = string;

/**
 * Lib - Docker Packaging - Runner - BuildHealthcheck.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildHealthcheck_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_BuildHealthcheck_Returns = string;
export type Lib_DockerPackaging_Runner_BuildHealthcheck_Lines = string[];
export type Lib_DockerPackaging_Runner_BuildHealthcheck_RequiredServices = Shared_DockerPackagingServices;

/**
 * Lib - Docker Packaging - Runner - BuildInitUser.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildInitUser_Returns = string;
export type Lib_DockerPackaging_Runner_BuildInitUser_ShellVariableMarker = string;
export type Lib_DockerPackaging_Runner_BuildInitUser_ProtectedWritablePatterns = string;

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
 * Lib - Docker Packaging - Runner - BuildWorkspacePackage.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_BuildWorkspacePackage_Slug = string;
export type Lib_DockerPackaging_Runner_BuildWorkspacePackage_Returns = Record<string, unknown>;

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
export type Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedManifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_GenerateForTarget_AvailableServiceNames = Set<string>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ServicesByName = Shared_DockerPackagingServicesByName;
export type Lib_DockerPackaging_Runner_GenerateForTarget_VisitedServices = Set<string>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_VisitingServices = Set<string>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_VisitService = (serviceName: string) => void;
export type Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackages = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_GenerateForTarget_BuildOrder = Shared_DockerPackagingWorkspacePackages;
export type Lib_DockerPackaging_Runner_GenerateForTarget_PackageManagerDescriptor = Shared_CorepackPackageManagerDescriptor | undefined;
export type Lib_DockerPackaging_Runner_GenerateForTarget_PackageManager = Shared_CorepackPackageManagerDescriptor['name'];
export type Lib_DockerPackaging_Runner_GenerateForTarget_PackageManagerVersion = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_IsYarnClassic = boolean;
export type Lib_DockerPackaging_Runner_GenerateForTarget_IsYarnBerry = boolean;
export type Lib_DockerPackaging_Runner_GenerateForTarget_NeedsSyntheticWorkspaceManifests = boolean;
export type Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspaceManifests = Map<string, string>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspaceManifestPath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspacePackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspaceManifestContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_TemplateRoot = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_TemplateContents = string[];
export type Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ComposeContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFilesValue = unknown;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ConfiguredIgnoreFileEntry = unknown;
export type Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFileEntry = Shared_NovaConfig_IgnoreFile;
export type Lib_DockerPackaging_Runner_GenerateForTarget_DockerignoreContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_GitAttributesContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyPackageName = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ContainerBuildPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_PnpmWorkspaceLines = string[];
export type Lib_DockerPackaging_Runner_GenerateForTarget_PnpmWorkspaceContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_YarnConfigContent = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedRootPackage = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedNovaConfig = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_GenerateForTarget_Result = Shared_DockerPackagingGenerateResult;
export type Lib_DockerPackaging_Runner_GenerateForTarget_RootfsDirectory = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceManifestsDirectory = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_YarnConfigPath = string;
export type Lib_DockerPackaging_Runner_GenerateForTarget_ReportFiles = boolean;

/**
 * Lib - Docker Packaging - Runner - GenerateForTarget - VisitService.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_GenerateForTarget_VisitService_Service = Shared_DockerPackagingService | undefined;

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
export type Lib_DockerPackaging_Runner_NormalizeManifest_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_NormalizeManifest_ServiceNames = Set<string>;

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
 * Lib - Docker Packaging - Runner - ReadJsonObject.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_ReadJsonObject_TargetPath = string;
export type Lib_DockerPackaging_Runner_ReadJsonObject_Returns = Promise<Record<string, unknown>>;
export type Lib_DockerPackaging_Runner_ReadJsonObject_RawContent = string;
export type Lib_DockerPackaging_Runner_ReadJsonObject_ParsedContent = unknown;

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
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_RecipesValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_Recipes = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_PackageJsonRecipesValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_PackageJsonRecipes = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_Environment = Record<string, unknown>;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentWorkspacesValue = unknown;
export type Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentWorkspaces = Record<string, unknown>;

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
 * Lib - Docker Packaging - Runner - ShellQuote.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_ShellQuote_Value = string;
export type Lib_DockerPackaging_Runner_ShellQuote_Returns = string;

/**
 * Lib - Docker Packaging - Runner - ValidateServiceName.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_ValidateServiceName_Name = string;
export type Lib_DockerPackaging_Runner_ValidateServiceName_Returns = void;

/**
 * Lib - Docker Packaging - Runner - WriteExecutable.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_WriteExecutable_TargetPath = string;
export type Lib_DockerPackaging_Runner_WriteExecutable_Content = string;
export type Lib_DockerPackaging_Runner_WriteExecutable_Returns = Promise<void>;

/**
 * Lib - Docker Packaging - Runner - WriteRootfs.
 *
 * @since 0.34.0
 */
export type Lib_DockerPackaging_Runner_WriteRootfs_RootfsDirectory = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_Manifest = Shared_DockerPackagingManifest;
export type Lib_DockerPackaging_Runner_WriteRootfs_Returns = Promise<void>;
export type Lib_DockerPackaging_Runner_WriteRootfs_S6DatabaseDirectory = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_UserBundleDirectory = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_HelperDirectory = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_ServiceHelperDirectory = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_NovaConfigDirectory = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_InitServiceDirectory = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_InitDependenciesDirectory = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_WritablePaths = string[];
export type Lib_DockerPackaging_Runner_WriteRootfs_ShellVariableMarker = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_CriticalFinishScript = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_ServiceDirectory = string;
export type Lib_DockerPackaging_Runner_WriteRootfs_DependenciesDirectory = string;

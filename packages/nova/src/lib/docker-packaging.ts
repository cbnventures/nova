import { promises as fs } from 'node:fs';
import {
  basename,
  dirname,
  join,
  relative,
  sep,
} from 'node:path';

import { Logger } from '../toolkit/index.js';
import { Runner as LibCorepack } from './corepack.js';
import { Runner as LibDockerRender } from './docker-render.js';
import { renderIgnoreFile } from './ignore-files.js';
import { libItemAllowedRecipes } from './item.js';
import { normalizeNovaConfigTopLevelOrder } from './nova-config-order.js';
import {
  LIB_REGEX_PATTERN_CASING_UPPER_SNAKE_CASE,
  LIB_REGEX_PATTERN_DOCKER_HEALTH_PATH,
  LIB_REGEX_PATTERN_DOCKER_RUNTIME_PATH,
  LIB_REGEX_PATTERN_DOCKER_SCRIPT_NAME,
  LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE,
  LIB_REGEX_PATTERN_SLUG_SIMPLE,
} from './regex.js';
import {
  buildGeneratedFileHeader,
  isPlainObject,
  pathExists,
  saveGeneratedFile,
} from './utility.js';

import type {
  Lib_DockerPackaging_DirectoryEntries,
  Lib_DockerPackaging_DockerAssemblyRelativePath,
  Lib_DockerPackaging_DockerConfigWorkspacePath,
  Lib_DockerPackaging_DockerGeneratedFilesRecord,
  Lib_DockerPackaging_DockerManifestSchemaVersion,
  Lib_DockerPackaging_DockerProtectedWritablePaths,
  Lib_DockerPackaging_DockerReservedServiceNames,
  Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyDirectory,
  Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyPackageContent,
  Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyPackagePath,
  Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyPackageValue,
  Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyScriptsValue,
  Lib_DockerPackaging_Runner_ApplyImagePlan_Changes,
  Lib_DockerPackaging_Runner_ApplyImagePlan_CurrentContent,
  Lib_DockerPackaging_Runner_ApplyImagePlan_CurrentContents,
  Lib_DockerPackaging_Runner_ApplyImagePlan_Discovered,
  Lib_DockerPackaging_Runner_ApplyImagePlan_ImagePlan,
  Lib_DockerPackaging_Runner_ApplyImagePlan_IsDryRun,
  Lib_DockerPackaging_Runner_ApplyImagePlan_IsOwnedPath,
  Lib_DockerPackaging_Runner_ApplyImagePlan_IsOwnedPath_Returns,
  Lib_DockerPackaging_Runner_ApplyImagePlan_IsReplaceFile,
  Lib_DockerPackaging_Runner_ApplyImagePlan_IsReportFiles,
  Lib_DockerPackaging_Runner_ApplyImagePlan_LineChanges,
  Lib_DockerPackaging_Runner_ApplyImagePlan_MissingScripts,
  Lib_DockerPackaging_Runner_ApplyImagePlan_OwnedFiles,
  Lib_DockerPackaging_Runner_ApplyImagePlan_Plan,
  Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedAssemblyPackage,
  Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedEntries,
  Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedEntry,
  Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedFile,
  Lib_DockerPackaging_Runner_ApplyImagePlan_PreviousOwnedPaths,
  Lib_DockerPackaging_Runner_ApplyImagePlan_ProjectDirectory,
  Lib_DockerPackaging_Runner_ApplyImagePlan_RecordContent,
  Lib_DockerPackaging_Runner_ApplyImagePlan_RecordedPath,
  Lib_DockerPackaging_Runner_ApplyImagePlan_RecordFiles,
  Lib_DockerPackaging_Runner_ApplyImagePlan_RecordPath,
  Lib_DockerPackaging_Runner_ApplyImagePlan_RecordValue,
  Lib_DockerPackaging_Runner_ApplyImagePlan_Returns,
  Lib_DockerPackaging_Runner_ApplyImagePlan_RootfsDirectory,
  Lib_DockerPackaging_Runner_ApplyImagePlan_RootfsFiles,
  Lib_DockerPackaging_Runner_ApplyImagePlan_StaleContent,
  Lib_DockerPackaging_Runner_ApplyImagePlan_StaleContents,
  Lib_DockerPackaging_Runner_ApplyImagePlan_StalePaths,
  Lib_DockerPackaging_Runner_ApplyImagePlan_Status,
  Lib_DockerPackaging_Runner_ApplyImagePlan_UnownedFiles,
  Lib_DockerPackaging_Runner_ApplyImagePlan_WorkspaceManifestsDirectory,
  Lib_DockerPackaging_Runner_ApplyImagePlan_YarnConfigPath,
  Lib_DockerPackaging_Runner_BuildAssemblyPackage_Returns,
  Lib_DockerPackaging_Runner_BuildAssemblyPackage_Slug,
  Lib_DockerPackaging_Runner_BuildContainerPackage_AssemblyPackageName,
  Lib_DockerPackaging_Runner_BuildContainerPackage_BuildOrder,
  Lib_DockerPackaging_Runner_BuildContainerPackage_ContainerPackage,
  Lib_DockerPackaging_Runner_BuildContainerPackage_InheritedValue,
  Lib_DockerPackaging_Runner_BuildContainerPackage_Returns,
  Lib_DockerPackaging_Runner_BuildContainerPackage_RootPackage,
  Lib_DockerPackaging_Runner_BuildHealthcheck_HealthPort,
  Lib_DockerPackaging_Runner_BuildHealthcheck_HealthService,
  Lib_DockerPackaging_Runner_BuildHealthcheck_Lines,
  Lib_DockerPackaging_Runner_BuildHealthcheck_LongrunServices,
  Lib_DockerPackaging_Runner_BuildHealthcheck_Manifest,
  Lib_DockerPackaging_Runner_BuildHealthcheck_Returns,
  Lib_DockerPackaging_Runner_BuildHealthcheck_ShellVariableMarker,
  Lib_DockerPackaging_Runner_BuildInitUser_Manifest,
  Lib_DockerPackaging_Runner_BuildInitUser_ProtectedWritablePatterns,
  Lib_DockerPackaging_Runner_BuildInitUser_Returns,
  Lib_DockerPackaging_Runner_BuildInitUser_ShellNewline,
  Lib_DockerPackaging_Runner_BuildInitUser_ShellVariableMarker,
  Lib_DockerPackaging_Runner_BuildLogHelper_Returns,
  Lib_DockerPackaging_Runner_BuildLogHelper_ShellNewline,
  Lib_DockerPackaging_Runner_BuildLogHelper_ShellVariableMarker,
  Lib_DockerPackaging_Runner_BuildPackageJsonRecipes_Recipes,
  Lib_DockerPackaging_Runner_BuildPackageJsonRecipes_Returns,
  Lib_DockerPackaging_Runner_BuildRequestedServices_DefaultName,
  Lib_DockerPackaging_Runner_BuildRequestedServices_ExistingServices,
  Lib_DockerPackaging_Runner_BuildRequestedServices_Manifest,
  Lib_DockerPackaging_Runner_BuildRequestedServices_Options,
  Lib_DockerPackaging_Runner_BuildRequestedServices_RequestedServices,
  Lib_DockerPackaging_Runner_BuildRequestedServices_Returns,
  Lib_DockerPackaging_Runner_BuildRequestedServices_ServiceInputs,
  Lib_DockerPackaging_Runner_BuildRequestedServices_WorkspacePath,
  Lib_DockerPackaging_Runner_BuildRootPackage_AssemblyDependencyValue,
  Lib_DockerPackaging_Runner_BuildRootPackage_AssemblyPackageName,
  Lib_DockerPackaging_Runner_BuildRootPackage_IsCovered,
  Lib_DockerPackaging_Runner_BuildRootPackage_IsDockerWorkspace,
  Lib_DockerPackaging_Runner_BuildRootPackage_IsPackagesWildcard,
  Lib_DockerPackaging_Runner_BuildRootPackage_PackageIsDockerWorkspace,
  Lib_DockerPackaging_Runner_BuildRootPackage_PackageIsPackagesWildcard,
  Lib_DockerPackaging_Runner_BuildRootPackage_PackageWorkspaces,
  Lib_DockerPackaging_Runner_BuildRootPackage_Returns,
  Lib_DockerPackaging_Runner_BuildRootPackage_RootPackage,
  Lib_DockerPackaging_Runner_BuildRootPackage_Scripts,
  Lib_DockerPackaging_Runner_BuildRootPackage_ScriptsValue,
  Lib_DockerPackaging_Runner_BuildRootPackage_WorkspacesValue,
  Lib_DockerPackaging_Runner_BuildRunScript_Lines,
  Lib_DockerPackaging_Runner_BuildRunScript_Returns,
  Lib_DockerPackaging_Runner_BuildRunScript_Service,
  Lib_DockerPackaging_Runner_BuildRunScript_ShellVariableMarker,
  Lib_DockerPackaging_Runner_BuildService_Command,
  Lib_DockerPackaging_Runner_BuildService_Environment,
  Lib_DockerPackaging_Runner_BuildService_ExistingServices,
  Lib_DockerPackaging_Runner_BuildService_FinishCommand,
  Lib_DockerPackaging_Runner_BuildService_HealthCommand,
  Lib_DockerPackaging_Runner_BuildService_Input,
  Lib_DockerPackaging_Runner_BuildService_IsProtectedWritablePath,
  Lib_DockerPackaging_Runner_BuildService_Kind,
  Lib_DockerPackaging_Runner_BuildService_Name,
  Lib_DockerPackaging_Runner_BuildService_OccupiedPorts,
  Lib_DockerPackaging_Runner_BuildService_Options,
  Lib_DockerPackaging_Runner_BuildService_PathParts,
  Lib_DockerPackaging_Runner_BuildService_Port,
  Lib_DockerPackaging_Runner_BuildService_PreferredPort,
  Lib_DockerPackaging_Runner_BuildService_PreviousPort,
  Lib_DockerPackaging_Runner_BuildService_PreviousService,
  Lib_DockerPackaging_Runner_BuildService_RequestedServices,
  Lib_DockerPackaging_Runner_BuildService_Returns,
  Lib_DockerPackaging_Runner_BuildService_Service,
  Lib_DockerPackaging_Runner_BuildService_WorkspacePath,
  Lib_DockerPackaging_Runner_BuildService_WritablePaths,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_BuildOrder,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_DependencyGroup,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_DependencyValue,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_InternalVersionValue,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_InternalWorkspace,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_NormalizedDependencyValue,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_PackageJson,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_Returns,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_SyntheticPackage,
  Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_WorkspaceRange,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_GroupDirectory,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_Manifest,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackageJson,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackageName,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackagePath,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_ProjectDirectory,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_Returns,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_WorkspacePackages,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_WorkspacePaths,
  Lib_DockerPackaging_Runner_CountLineChanges_Above,
  Lib_DockerPackaging_Runner_CountLineChanges_After,
  Lib_DockerPackaging_Runner_CountLineChanges_AfterLines,
  Lib_DockerPackaging_Runner_CountLineChanges_Before,
  Lib_DockerPackaging_Runner_CountLineChanges_BeforeLines,
  Lib_DockerPackaging_Runner_CountLineChanges_Common,
  Lib_DockerPackaging_Runner_CountLineChanges_Diagonal,
  Lib_DockerPackaging_Runner_CountLineChanges_Lengths,
  Lib_DockerPackaging_Runner_CountLineChanges_Returns,
  Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyDirectory,
  Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyPackageName,
  Lib_DockerPackaging_Runner_GenerateForTarget_ConflictingService,
  Lib_DockerPackaging_Runner_GenerateForTarget_ExistingManifestValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_ExistingWorkspace,
  Lib_DockerPackaging_Runner_GenerateForTarget_HealthPath,
  Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFileEntry,
  Lib_DockerPackaging_Runner_GenerateForTarget_ImagePlan,
  Lib_DockerPackaging_Runner_GenerateForTarget_LegacyStatePaths,
  Lib_DockerPackaging_Runner_GenerateForTarget_Manifest,
  Lib_DockerPackaging_Runner_GenerateForTarget_ManifestPath,
  Lib_DockerPackaging_Runner_GenerateForTarget_NetworkMode,
  Lib_DockerPackaging_Runner_GenerateForTarget_NovaConfig,
  Lib_DockerPackaging_Runner_GenerateForTarget_NovaConfigPath,
  Lib_DockerPackaging_Runner_GenerateForTarget_Options,
  Lib_DockerPackaging_Runner_GenerateForTarget_ProjectDirectory,
  Lib_DockerPackaging_Runner_GenerateForTarget_ProjectNameValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_ProjectSlugValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_ProjectValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_RequestedServices,
  Lib_DockerPackaging_Runner_GenerateForTarget_Result,
  Lib_DockerPackaging_Runner_GenerateForTarget_RetainedServices,
  Lib_DockerPackaging_Runner_GenerateForTarget_RetainedWorkspaces,
  Lib_DockerPackaging_Runner_GenerateForTarget_Returns,
  Lib_DockerPackaging_Runner_GenerateForTarget_RootPackage,
  Lib_DockerPackaging_Runner_GenerateForTarget_RootPackagePath,
  Lib_DockerPackaging_Runner_GenerateForTarget_RuntimePaths,
  Lib_DockerPackaging_Runner_GenerateForTarget_StateEnvironment,
  Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedManifest,
  Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedNovaConfig,
  Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedRootPackage,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceDefinition,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceDirectory,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackage,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackageNameValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackagePath,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePathValue,
  Lib_DockerPackaging_Runner_ListFiles_Directory,
  Lib_DockerPackaging_Runner_ListFiles_Entries,
  Lib_DockerPackaging_Runner_ListFiles_Returns,
  Lib_DockerPackaging_Runner_MergeScripts_DeployEntries,
  Lib_DockerPackaging_Runner_MergeScripts_Entries,
  Lib_DockerPackaging_Runner_MergeScripts_InsertDeployScripts,
  Lib_DockerPackaging_Runner_MergeScripts_InsertDeployScripts_Returns,
  Lib_DockerPackaging_Runner_MergeScripts_IsDeployInserted,
  Lib_DockerPackaging_Runner_MergeScripts_Merged,
  Lib_DockerPackaging_Runner_MergeScripts_Returns,
  Lib_DockerPackaging_Runner_MergeScripts_Scripts,
  Lib_DockerPackaging_Runner_NormalizeManifest_DeclaredPorts,
  Lib_DockerPackaging_Runner_NormalizeManifest_FirstPort,
  Lib_DockerPackaging_Runner_NormalizeManifest_HasRetiredPortKeys,
  Lib_DockerPackaging_Runner_NormalizeManifest_HealthPath,
  Lib_DockerPackaging_Runner_NormalizeManifest_HealthService,
  Lib_DockerPackaging_Runner_NormalizeManifest_LegacyStatePaths,
  Lib_DockerPackaging_Runner_NormalizeManifest_Manifest,
  Lib_DockerPackaging_Runner_NormalizeManifest_NetworkMode,
  Lib_DockerPackaging_Runner_NormalizeManifest_Returns,
  Lib_DockerPackaging_Runner_NormalizeManifest_ServiceNames,
  Lib_DockerPackaging_Runner_NormalizeManifest_ServicePorts,
  Lib_DockerPackaging_Runner_NormalizeManifest_Settings,
  Lib_DockerPackaging_Runner_NormalizeManifest_StateEnvironment,
  Lib_DockerPackaging_Runner_NormalizeManifest_Value,
  Lib_DockerPackaging_Runner_NormalizeManifest_Workspaces,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_PathParts,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Returns,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_RuntimePaths,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Value,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_WorkspacePath,
  Lib_DockerPackaging_Runner_NormalizeWorkspace_Normalized,
  Lib_DockerPackaging_Runner_NormalizeWorkspace_Returns,
  Lib_DockerPackaging_Runner_NormalizeWorkspace_SourceFiles,
  Lib_DockerPackaging_Runner_NormalizeWorkspace_Workspace,
  Lib_DockerPackaging_Runner_PlanImage_AssemblyDirectory,
  Lib_DockerPackaging_Runner_PlanImage_AssemblyPackagePath,
  Lib_DockerPackaging_Runner_PlanImage_BuildOrder,
  Lib_DockerPackaging_Runner_PlanImage_DockerignoreHeader,
  Lib_DockerPackaging_Runner_PlanImage_DockerignorePath,
  Lib_DockerPackaging_Runner_PlanImage_GeneratedHeader,
  Lib_DockerPackaging_Runner_PlanImage_IgnoreFileEntry,
  Lib_DockerPackaging_Runner_PlanImage_IncludeManifest,
  Lib_DockerPackaging_Runner_PlanImage_Inputs,
  Lib_DockerPackaging_Runner_PlanImage_IsNovaBuildEnabled,
  Lib_DockerPackaging_Runner_PlanImage_IsYarnBerry,
  Lib_DockerPackaging_Runner_PlanImage_Manifest,
  Lib_DockerPackaging_Runner_PlanImage_NovaConfig,
  Lib_DockerPackaging_Runner_PlanImage_PackageManagerDescriptor,
  Lib_DockerPackaging_Runner_PlanImage_Plan,
  Lib_DockerPackaging_Runner_PlanImage_PnpmWorkspaceLines,
  Lib_DockerPackaging_Runner_PlanImage_ProjectDirectory,
  Lib_DockerPackaging_Runner_PlanImage_ProjectSlug,
  Lib_DockerPackaging_Runner_PlanImage_RenderInput,
  Lib_DockerPackaging_Runner_PlanImage_Returns,
  Lib_DockerPackaging_Runner_PlanImage_RootPackage,
  Lib_DockerPackaging_Runner_PlanImage_StageFragments,
  Lib_DockerPackaging_Runner_PlanImage_WorkspacePackages,
  Lib_DockerPackaging_Runner_ReadImageWorkspaces_BuildPackage,
  Lib_DockerPackaging_Runner_ReadImageWorkspaces_BuildPackagePath,
  Lib_DockerPackaging_Runner_ReadImageWorkspaces_ProjectDirectory,
  Lib_DockerPackaging_Runner_ReadImageWorkspaces_Returns,
  Lib_DockerPackaging_Runner_ReadImageWorkspaces_WorkspacePaths,
  Lib_DockerPackaging_Runner_ReadImageWorkspaces_WorkspacePathTypeGuard,
  Lib_DockerPackaging_Runner_ReadImageWorkspaces_WorkspacesValue,
  Lib_DockerPackaging_Runner_ReadJsonObject_ParsedContent,
  Lib_DockerPackaging_Runner_ReadJsonObject_RawContent,
  Lib_DockerPackaging_Runner_ReadJsonObject_Returns,
  Lib_DockerPackaging_Runner_ReadJsonObject_TargetPath,
  Lib_DockerPackaging_Runner_ReadOptionalFile_Returns,
  Lib_DockerPackaging_Runner_ReadOptionalFile_TargetPath,
  Lib_DockerPackaging_Runner_ReadStageFragments_AssemblyDirectory,
  Lib_DockerPackaging_Runner_ReadStageFragments_Content,
  Lib_DockerPackaging_Runner_ReadStageFragments_Contents,
  Lib_DockerPackaging_Runner_ReadStageFragments_Fragments,
  Lib_DockerPackaging_Runner_ReadStageFragments_Manifest,
  Lib_DockerPackaging_Runner_ReadStageFragments_Returns,
  Lib_DockerPackaging_Runner_ReadStageFragments_Stage,
  Lib_DockerPackaging_Runner_ReadStageFragments_Stages,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyDirectory,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyPackage,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyPackageNameValue,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyPackagePath,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_BuildOrder,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ContainerBuildPackage,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_Manifest,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ManifestPath,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_NeedsSyntheticWorkspaceManifests,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ProjectDirectory,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_Returns,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_RootPackage,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_RootPackagePath,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspaceManifestContent,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspaceManifestPath,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspaceManifests,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspacePackage,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_WorkspaceManifestsDirectory,
  Lib_DockerPackaging_Runner_RefreshGeneratedManifests_WorkspacePackages,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_AssemblyPackageName,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_AttributeFiles,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_AttributeFilesValue,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_Environment,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentValue,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentWorkspaces,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentWorkspacesValue,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFileEntry,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFiles,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFilesValue,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_NovaConfig,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_PackageJsonRecipes,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_PackageJsonRecipesValue,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_Platforms,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_PlatformsValue,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_ProjectValue,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_Recipes,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_RecipesValue,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_Returns,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_Workspaces,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_WorkspacesValue,
  Lib_DockerPackaging_Runner_RemoveEmptyParents_Directory,
  Lib_DockerPackaging_Runner_RemoveEmptyParents_Returns,
  Lib_DockerPackaging_Runner_RemoveEmptyParents_StopDirectory,
  Lib_DockerPackaging_Runner_RenderRootfs_AddFile,
  Lib_DockerPackaging_Runner_RenderRootfs_AddFile_Returns,
  Lib_DockerPackaging_Runner_RenderRootfs_AddFile_ScriptLines,
  Lib_DockerPackaging_Runner_RenderRootfs_CriticalFinishScript,
  Lib_DockerPackaging_Runner_RenderRootfs_Files,
  Lib_DockerPackaging_Runner_RenderRootfs_GeneratedHeader,
  Lib_DockerPackaging_Runner_RenderRootfs_Manifest,
  Lib_DockerPackaging_Runner_RenderRootfs_Returns,
  Lib_DockerPackaging_Runner_RenderRootfs_ServiceDirectory,
  Lib_DockerPackaging_Runner_RenderRootfs_ShellVariableMarker,
  Lib_DockerPackaging_Runner_RenderRootfs_WritablePaths,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_Manifest,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_OrderedPackages,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_Returns,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitingPackages,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage_DependencyGroup,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage_WorkspacePackage,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_WorkspacePackages,
  Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_ConfiguredIgnoreFileEntry,
  Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_IgnoreFilesValue,
  Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_NovaConfig,
  Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_Returns,
  Lib_DockerPackaging_Runner_ShellQuote_Returns,
  Lib_DockerPackaging_Runner_ShellQuote_Value,
  Lib_DockerPackaging_Runner_SyncImage_ApplyResult,
  Lib_DockerPackaging_Runner_SyncImage_IgnoreFilesValue,
  Lib_DockerPackaging_Runner_SyncImage_ImagePlan,
  Lib_DockerPackaging_Runner_SyncImage_JsonFiles,
  Lib_DockerPackaging_Runner_SyncImage_Manifest,
  Lib_DockerPackaging_Runner_SyncImage_ManifestPath,
  Lib_DockerPackaging_Runner_SyncImage_NovaConfig,
  Lib_DockerPackaging_Runner_SyncImage_NovaConfigPath,
  Lib_DockerPackaging_Runner_SyncImage_Options,
  Lib_DockerPackaging_Runner_SyncImage_ProjectDirectory,
  Lib_DockerPackaging_Runner_SyncImage_ProjectNameValue,
  Lib_DockerPackaging_Runner_SyncImage_ProjectSlugValue,
  Lib_DockerPackaging_Runner_SyncImage_ProjectValue,
  Lib_DockerPackaging_Runner_SyncImage_Returns,
  Lib_DockerPackaging_Runner_SyncImage_RootPackage,
  Lib_DockerPackaging_Runner_ValidateServiceGraph_AvailableServiceNames,
  Lib_DockerPackaging_Runner_ValidateServiceGraph_Manifest,
  Lib_DockerPackaging_Runner_ValidateServiceGraph_Returns,
  Lib_DockerPackaging_Runner_ValidateServiceGraph_ServicesByName,
  Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitedServices,
  Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitingServices,
  Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitService,
  Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitService_Service,
  Lib_DockerPackaging_Runner_ValidateServiceName_Name,
  Lib_DockerPackaging_Runner_ValidateServiceName_Returns,
} from '../types/lib/docker-packaging.d.ts';

/**
 * Lib - Docker Packaging - Docker Assembly Relative Path.
 *
 * Identifies the private assembly workspace inside the repository and keeps
 * generated internal files out of the project root.
 *
 * @since 0.34.0
 */
const dockerAssemblyRelativePath: Lib_DockerPackaging_DockerAssemblyRelativePath = 'packages/docker';

/**
 * Lib - Docker Packaging - Docker Config Workspace Path.
 *
 * Identifies the assembly workspace in Nova configuration keys so every
 * generator records the same project-level tool.
 *
 * @since 0.34.0
 */
const dockerConfigWorkspacePath: Lib_DockerPackaging_DockerConfigWorkspacePath = './packages/docker';

/**
 * Lib - Docker Packaging - Docker Manifest Schema Version.
 *
 * Identifies the assembly manifest contract understood by this generator and
 * rejects incompatible project-level service definitions.
 *
 * @since 0.34.0
 */
const dockerManifestSchemaVersion: Lib_DockerPackaging_DockerManifestSchemaVersion = 2;

/**
 * Lib - Docker Packaging - Docker Protected Writable Paths.
 *
 * Prevents generated ownership changes from targeting operating-system trees or
 * any descendants below those protected path boundaries.
 *
 * @since 0.34.0
 */
const dockerProtectedWritablePaths: Lib_DockerPackaging_DockerProtectedWritablePaths = [
  '/bin',
  '/dev',
  '/etc',
  '/lib',
  '/lib64',
  '/proc',
  '/run',
  '/sbin',
  '/sys',
  '/usr',
];

/**
 * Lib - Docker Packaging - Docker Reserved Service Names.
 *
 * Prevents project services from colliding with Nova's generated init service,
 * the pinned s6-overlay source database and bundles, or s6-rc internals.
 *
 * @since 0.34.0
 */
const dockerReservedServiceNames: Lib_DockerPackaging_DockerReservedServiceNames = new Set([
  'base',
  'fix-attrs',
  'legacy-cont-init',
  'legacy-services',
  'nova-container-init',
  's6rc-oneshot-runner',
  'top',
  'user',
  'user2',
]);

/**
 * Lib - Docker Packaging - Docker Generated Files Record.
 *
 * Names the file inside packages/docker that lists every rootfs and workspace
 * manifest file Nova wrote, so only those are ever deleted as stale.
 *
 * @since 0.49.0
 */
const dockerGeneratedFilesRecord: Lib_DockerPackaging_DockerGeneratedFilesRecord = 'generated-files.json';

/**
 * Lib - Docker Packaging.
 *
 * Maintains one repository-level, manifest-driven s6 appliance. Every Docker-enabled
 * scaffold contributes services to its private assembly workspace and shared image.
 *
 * @since 0.32.0
 */
export class Runner {
  /**
   * Lib - Docker Packaging - Generate For Target.
   *
   * Registers one scaffold workspace in the project appliance, regenerates the root
   * Docker entrypoints and native s6-rc database, and keeps the operation additive.
   *
   * @param {Lib_DockerPackaging_Runner_GenerateForTarget_Options} options - Options.
   *
   * @returns {Lib_DockerPackaging_Runner_GenerateForTarget_Returns}
   *
   * @since 0.34.0
   */
  public static async generateForTarget(options: Lib_DockerPackaging_Runner_GenerateForTarget_Options): Lib_DockerPackaging_Runner_GenerateForTarget_Returns {
    const projectDirectory: Lib_DockerPackaging_Runner_GenerateForTarget_ProjectDirectory = options['projectDirectory'];
    const workspaceDirectory: Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceDirectory = options['workspaceDirectory'];
    const workspacePathValue: Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePathValue = relative(projectDirectory, workspaceDirectory).split(sep).join('/');

    if (
      workspacePathValue === ''
      || workspacePathValue === '..'
      || workspacePathValue.startsWith('../') === true
    ) {
      throw new Error(`The Docker workspace "${workspaceDirectory}" must be inside project root "${projectDirectory}".`);
    }

    const assemblyDirectory: Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyDirectory = join(projectDirectory, dockerAssemblyRelativePath);
    const manifestPath: Lib_DockerPackaging_Runner_GenerateForTarget_ManifestPath = join(assemblyDirectory, 'manifest.json');
    const rootPackagePath: Lib_DockerPackaging_Runner_GenerateForTarget_RootPackagePath = join(projectDirectory, 'package.json');
    const workspacePackagePath: Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackagePath = join(workspaceDirectory, 'package.json');
    const novaConfigPath: Lib_DockerPackaging_Runner_GenerateForTarget_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const existingManifestValue: Lib_DockerPackaging_Runner_GenerateForTarget_ExistingManifestValue = (await pathExists(manifestPath) === true) ? await Runner.readJsonObject(manifestPath) : undefined;
    const rootPackage: Lib_DockerPackaging_Runner_GenerateForTarget_RootPackage = await Runner.readJsonObject(rootPackagePath);
    const workspacePackage: Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackage = await Runner.readJsonObject(workspacePackagePath);
    const novaConfig: Lib_DockerPackaging_Runner_GenerateForTarget_NovaConfig = await Runner.readJsonObject(novaConfigPath);
    const workspacePackageNameValue: Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackageNameValue = workspacePackage['name'];

    if (typeof workspacePackageNameValue !== 'string' || workspacePackageNameValue.trim() === '') {
      throw new Error(`The Docker workspace package manifest at "${workspacePackagePath}" must define a package name.`);
    }

    const projectValue: Lib_DockerPackaging_Runner_GenerateForTarget_ProjectValue = novaConfig['project'];
    const projectNameValue: Lib_DockerPackaging_Runner_GenerateForTarget_ProjectNameValue = (isPlainObject(projectValue) === true) ? projectValue['name'] : undefined;
    const projectSlugValue: Lib_DockerPackaging_Runner_GenerateForTarget_ProjectSlugValue = (isPlainObject(projectNameValue) === true) ? projectNameValue['slug'] : undefined;

    if (typeof projectSlugValue !== 'string' || LIB_REGEX_PATTERN_SLUG_SIMPLE.test(projectSlugValue) === false) {
      throw new Error(`The Nova config at "${novaConfigPath}" must define a valid project.name.slug before Docker packaging can be generated.`);
    }

    const manifest: Lib_DockerPackaging_Runner_GenerateForTarget_Manifest = Runner.normalizeManifest(existingManifestValue);
    const existingWorkspace: Lib_DockerPackaging_Runner_GenerateForTarget_ExistingWorkspace = manifest['workspaces'].find((workspace) => workspace['path'] === workspacePathValue);
    let runtimePaths: Lib_DockerPackaging_Runner_GenerateForTarget_RuntimePaths = options['runtimePaths'];

    if (runtimePaths === undefined && existingWorkspace !== undefined) {
      runtimePaths = existingWorkspace['runtimePaths'];
    }

    const workspaceDefinition: Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceDefinition = {
      ...((existingWorkspace === undefined) ? {} : existingWorkspace),
      packageName: workspacePackageNameValue,
      path: workspacePathValue,
      profile: options['profile'],
      runtimePaths: Runner.normalizeRuntimePaths(runtimePaths ?? [], workspacePathValue),
    };
    const requestedServices: Lib_DockerPackaging_Runner_GenerateForTarget_RequestedServices = Runner.buildRequestedServices(options, manifest);
    const retainedServices: Lib_DockerPackaging_Runner_GenerateForTarget_RetainedServices = manifest['services'].filter((service) => service['workspace'] !== workspacePathValue);

    for (const requestedService of requestedServices) {
      const conflictingService: Lib_DockerPackaging_Runner_GenerateForTarget_ConflictingService = manifest['services'].find((service) => service['name'] === requestedService['name'] && service['workspace'] !== workspacePathValue);

      if (conflictingService !== undefined) {
        throw new Error(`Docker service "${requestedService['name']}" is already owned by workspace "${conflictingService['workspace']}".`);
      }
    }

    const retainedWorkspaces: Lib_DockerPackaging_Runner_GenerateForTarget_RetainedWorkspaces = manifest['workspaces'].filter((workspace) => workspace['path'] !== workspacePathValue);
    const healthPath: Lib_DockerPackaging_Runner_GenerateForTarget_HealthPath = options['healthPath'] ?? manifest['healthPath'];
    const legacyStatePaths: Lib_DockerPackaging_Runner_GenerateForTarget_LegacyStatePaths = options['legacyStatePaths'] ?? manifest['legacyStatePaths'];
    const networkMode: Lib_DockerPackaging_Runner_GenerateForTarget_NetworkMode = options['networkMode'] ?? manifest['networkMode'];
    const stateEnvironment: Lib_DockerPackaging_Runner_GenerateForTarget_StateEnvironment = options['stateEnvironment'] ?? manifest['stateEnvironment'];
    const updatedManifest: Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedManifest = Runner.normalizeManifest({
      ...manifest,
      healthPath,
      legacyStatePaths,
      networkMode,
      schemaVersion: dockerManifestSchemaVersion,
      services: [
        ...retainedServices,
        ...requestedServices,
      ].sort((firstService, secondService) => firstService['name'].localeCompare(secondService['name'])),
      workspaces: [
        ...retainedWorkspaces,
        workspaceDefinition,
      ].sort((firstWorkspace, secondWorkspace) => firstWorkspace['path'].localeCompare(secondWorkspace['path'])),
      ...((stateEnvironment === undefined) ? {} : { stateEnvironment }),
    });

    Runner.validateServiceGraph(updatedManifest);

    const ignoreFileEntry: Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFileEntry = options['ignoreFileEntry'] ?? Runner.resolveIgnoreFileEntry(novaConfig);
    const imagePlan: Lib_DockerPackaging_Runner_GenerateForTarget_ImagePlan = await Runner.planImage(projectDirectory, updatedManifest, rootPackage, novaConfig, ignoreFileEntry, projectSlugValue, true);
    const assemblyPackageName: Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyPackageName = `${projectSlugValue}-tool-docker`;
    const updatedRootPackage: Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedRootPackage = Runner.buildRootPackage(rootPackage, assemblyPackageName);
    const updatedNovaConfig: Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedNovaConfig = Runner.registerProjectConfig(novaConfig, assemblyPackageName, ignoreFileEntry);
    const result: Lib_DockerPackaging_Runner_GenerateForTarget_Result = {
      assemblyDirectory,
      composePath: join(projectDirectory, 'compose.yml'),
      dockerfilePath: join(projectDirectory, 'Dockerfile'),
      dockerignorePath: join(projectDirectory, '.dockerignore'),
      manifestPath,
      projectDirectory,
      serviceNames: updatedManifest['services'].map((service) => service['name']),
      workspacePath: workspacePathValue,
    };

    if (options['dryRun'] === true) {
      return result;
    }

    // The scaffold writes through the same plan the sync-image recipe applies, so both produce the same files.
    await Runner.applyImagePlan(projectDirectory, imagePlan, false, true, options['reportFiles'] !== false);

    await Promise.all([
      saveGeneratedFile(rootPackagePath, `${JSON.stringify(updatedRootPackage, null, 2)}\n`, true, undefined, false),
      saveGeneratedFile(novaConfigPath, `${JSON.stringify(updatedNovaConfig, null, 2)}\n`, true, undefined, false),
    ]);

    return result;
  }

  /**
   * Lib - Docker Packaging - Sync Image.
   *
   * Re-renders every Nova-owned Docker file from the existing image manifest and
   * reports what changed. The sync-image recipe calls it; it never edits the manifest.
   *
   * @param {Lib_DockerPackaging_Runner_SyncImage_Options} options - Options.
   *
   * @returns {Lib_DockerPackaging_Runner_SyncImage_Returns}
   *
   * @since 0.49.0
   */
  public static async syncImage(options: Lib_DockerPackaging_Runner_SyncImage_Options): Lib_DockerPackaging_Runner_SyncImage_Returns {
    const projectDirectory: Lib_DockerPackaging_Runner_SyncImage_ProjectDirectory = options['projectDirectory'];
    const manifestPath: Lib_DockerPackaging_Runner_SyncImage_ManifestPath = join(projectDirectory, dockerAssemblyRelativePath, 'manifest.json');

    if (await pathExists(manifestPath) === false) {
      throw new Error(`No Docker image manifest was found at "${manifestPath}". Scaffold a workspace with "--docker-image" first.`);
    }

    const novaConfigPath: Lib_DockerPackaging_Runner_SyncImage_NovaConfigPath = join(projectDirectory, 'nova.config.json');
    const jsonFiles: Lib_DockerPackaging_Runner_SyncImage_JsonFiles = await Promise.all([
      Runner.readJsonObject(manifestPath),
      Runner.readJsonObject(join(projectDirectory, 'package.json')),
      Runner.readJsonObject(novaConfigPath),
    ]);
    const manifest: Lib_DockerPackaging_Runner_SyncImage_Manifest = Runner.normalizeManifest(jsonFiles[0]);
    const rootPackage: Lib_DockerPackaging_Runner_SyncImage_RootPackage = jsonFiles[1];
    const novaConfig: Lib_DockerPackaging_Runner_SyncImage_NovaConfig = jsonFiles[2];
    const projectValue: Lib_DockerPackaging_Runner_SyncImage_ProjectValue = novaConfig['project'];
    const projectNameValue: Lib_DockerPackaging_Runner_SyncImage_ProjectNameValue = (isPlainObject(projectValue) === true) ? projectValue['name'] : undefined;
    const projectSlugValue: Lib_DockerPackaging_Runner_SyncImage_ProjectSlugValue = (isPlainObject(projectNameValue) === true) ? projectNameValue['slug'] : undefined;

    if (typeof projectSlugValue !== 'string' || LIB_REGEX_PATTERN_SLUG_SIMPLE.test(projectSlugValue) === false) {
      throw new Error(`The Nova config at "${novaConfigPath}" must define a valid project.name.slug before Docker files can be synced.`);
    }

    Runner.validateServiceGraph(manifest);

    const imagePlan: Lib_DockerPackaging_Runner_SyncImage_ImagePlan = await Runner.planImage(projectDirectory, manifest, rootPackage, novaConfig, Runner.resolveIgnoreFileEntry(novaConfig), projectSlugValue, false);
    const applyResult: Lib_DockerPackaging_Runner_SyncImage_ApplyResult = await Runner.applyImagePlan(projectDirectory, imagePlan, options['dryRun'] === true, options['replaceFile'] === true, options['reportFiles'] !== false);
    const ignoreFilesValue: Lib_DockerPackaging_Runner_SyncImage_IgnoreFilesValue = novaConfig['ignoreFiles'];

    // The ignore-files generator owns ".dockerignore", so the recipe only reports a missing entry for it.
    return {
      ...applyResult,
      missingIgnoreFileEntry: isPlainObject(ignoreFilesValue) === false || isPlainObject(ignoreFilesValue['./.dockerignore']) === false,
    };
  }

  /**
   * Lib - Docker Packaging - Refresh Generated Manifests.
   *
   * Rebuilds the Docker-only package-manager manifests from their canonical
   * repository manifests after a release changes versions or dependency pins.
   * Projects without Nova Docker packaging are left untouched.
   *
   * @param {Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ProjectDirectory} projectDirectory - Project directory.
   *
   * @returns {Lib_DockerPackaging_Runner_RefreshGeneratedManifests_Returns}
   *
   * @since 0.38.0
   */
  public static async refreshGeneratedManifests(projectDirectory: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ProjectDirectory): Lib_DockerPackaging_Runner_RefreshGeneratedManifests_Returns {
    const assemblyDirectory: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyDirectory = join(projectDirectory, dockerAssemblyRelativePath);
    const manifestPath: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ManifestPath = join(assemblyDirectory, 'manifest.json');

    if (await pathExists(manifestPath) === false) {
      return;
    }

    const rootPackagePath: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_RootPackagePath = join(projectDirectory, 'package.json');
    const assemblyPackagePath: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyPackagePath = join(assemblyDirectory, 'package.json');
    const rootPackage: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_RootPackage = await Runner.readJsonObject(rootPackagePath);
    const assemblyPackage: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyPackage = await Runner.readJsonObject(assemblyPackagePath);
    const assemblyPackageNameValue: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_AssemblyPackageNameValue = assemblyPackage['name'];

    if (typeof assemblyPackageNameValue !== 'string' || assemblyPackageNameValue.trim() === '') {
      throw new Error(`The Docker assembly package manifest at "${assemblyPackagePath}" must define a package name.`);
    }

    const manifest: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_Manifest = Runner.normalizeManifest(await Runner.readJsonObject(manifestPath));
    const workspacePackages: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_WorkspacePackages = await Runner.collectWorkspacePackages(projectDirectory, manifest);
    const buildOrder: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_BuildOrder = Runner.resolveBuildOrder(manifest, workspacePackages);
    const needsSyntheticWorkspaceManifests: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_NeedsSyntheticWorkspaceManifests = LibDockerRender.usesSyntheticManifests(manifest, rootPackage);
    const syntheticWorkspaceManifests: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspaceManifests = new Map();

    if (needsSyntheticWorkspaceManifests === true) {
      for (const workspacePackageValue of buildOrder.values()) {
        const syntheticWorkspaceManifestPath: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspaceManifestPath = join(assemblyDirectory, 'workspace-manifests', workspacePackageValue['path'], 'package.json');
        const syntheticWorkspacePackage: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspacePackage = Runner.buildSyntheticWorkspacePackage(workspacePackageValue['packageJson'], buildOrder);
        const syntheticWorkspaceManifestContent: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_SyntheticWorkspaceManifestContent = `${JSON.stringify(syntheticWorkspacePackage, null, 2)}\n`;

        syntheticWorkspaceManifests.set(syntheticWorkspaceManifestPath, syntheticWorkspaceManifestContent);
      }
    }

    const containerBuildPackage: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_ContainerBuildPackage = Runner.buildContainerPackage(rootPackage, assemblyPackageNameValue, buildOrder);
    const workspaceManifestsDirectory: Lib_DockerPackaging_Runner_RefreshGeneratedManifests_WorkspaceManifestsDirectory = join(assemblyDirectory, 'workspace-manifests');

    await fs.rm(workspaceManifestsDirectory, {
      force: true,
      recursive: true,
    });

    await Promise.all([
      saveGeneratedFile(join(assemblyDirectory, 'build-package.json'), `${JSON.stringify(containerBuildPackage, null, 2)}\n`, true, undefined, false),
      ...[...syntheticWorkspaceManifests].map((syntheticWorkspaceManifest) => saveGeneratedFile(syntheticWorkspaceManifest[0], syntheticWorkspaceManifest[1], true, undefined, false)),
    ]);

    return;
  }

  /**
   * Lib - Docker Packaging - Read Image Workspaces.
   *
   * Lists the workspaces the root image ships in build order, then the assembly.
   * Projects without Nova Docker packaging return an empty list.
   *
   * @param {Lib_DockerPackaging_Runner_ReadImageWorkspaces_ProjectDirectory} projectDirectory - Project directory.
   *
   * @returns {Lib_DockerPackaging_Runner_ReadImageWorkspaces_Returns}
   *
   * @since 0.41.1
   */
  public static async readImageWorkspaces(projectDirectory: Lib_DockerPackaging_Runner_ReadImageWorkspaces_ProjectDirectory): Lib_DockerPackaging_Runner_ReadImageWorkspaces_Returns {
    const buildPackagePath: Lib_DockerPackaging_Runner_ReadImageWorkspaces_BuildPackagePath = join(projectDirectory, dockerAssemblyRelativePath, 'build-package.json');

    if (await pathExists(buildPackagePath) === false) {
      return [];
    }

    const buildPackage: Lib_DockerPackaging_Runner_ReadImageWorkspaces_BuildPackage = await Runner.readJsonObject(buildPackagePath);
    const workspacesValue: Lib_DockerPackaging_Runner_ReadImageWorkspaces_WorkspacesValue = buildPackage['workspaces'];
    const workspacePaths: Lib_DockerPackaging_Runner_ReadImageWorkspaces_WorkspacePaths = (Array.isArray(workspacesValue) === true) ? workspacesValue.filter((workspacePath): workspacePath is Lib_DockerPackaging_Runner_ReadImageWorkspaces_WorkspacePathTypeGuard => typeof workspacePath === 'string' && workspacePath !== '') : [];

    return [...new Set([
      ...workspacePaths.map((workspacePath) => ((workspacePath.startsWith('./') === true) ? workspacePath : `./${workspacePath}`)),
      dockerConfigWorkspacePath,
    ])];
  }

  /**
   * Lib - Docker Packaging - Read JSON Object.
   *
   * Reads one generated-project JSON file and verifies that its top-level value
   * is an object before it participates in assembly generation.
   *
   * @param {Lib_DockerPackaging_Runner_ReadJsonObject_TargetPath} targetPath - Target path.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_ReadJsonObject_Returns}
   *
   * @since 0.34.0
   */

  private static async readJsonObject(targetPath: Lib_DockerPackaging_Runner_ReadJsonObject_TargetPath): Lib_DockerPackaging_Runner_ReadJsonObject_Returns {
    const rawContent: Lib_DockerPackaging_Runner_ReadJsonObject_RawContent = await fs.readFile(targetPath, 'utf-8');
    const parsedContent: Lib_DockerPackaging_Runner_ReadJsonObject_ParsedContent = JSON.parse(rawContent);

    if (isPlainObject(parsedContent) === false) {
      throw new Error(`The JSON file at "${targetPath}" must contain an object.`);
    }

    return parsedContent;
  }

  /**
   * Lib - Docker Packaging - Normalize Manifest.
   *
   * Validates the repository Docker assembly manifest or initializes an empty
   * manifest for the first Docker-enabled scaffold. Workspace entries are rebuilt
   * from their known keys, which drops the retired buildDirectory field.
   *
   * @param {Lib_DockerPackaging_Runner_NormalizeManifest_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_NormalizeManifest_Returns}
   *
   * @since 0.34.0
   */

  private static normalizeManifest(value: Lib_DockerPackaging_Runner_NormalizeManifest_Value): Lib_DockerPackaging_Runner_NormalizeManifest_Returns {
    if (value === undefined) {
      return {
        healthPath: '/health',
        legacyStatePaths: [],
        networkMode: 'host',
        schemaVersion: dockerManifestSchemaVersion,
        services: [],
        workspaces: [],
      };
    }

    // Version 1 manifests are version 2 manifests without the optional sections, so they read as is.
    if (
      (
        value['schemaVersion'] !== 1
        && value['schemaVersion'] !== dockerManifestSchemaVersion
      )
      || Array.isArray(value['services']) === false
      || Array.isArray(value['workspaces']) === false
    ) {
      throw new Error('The Docker assembly manifest is not compatible with this Nova version.');
    }

    const hasRetiredPortKeys: Lib_DockerPackaging_Runner_NormalizeManifest_HasRetiredPortKeys = Reflect.has(value, 'ports') || value['services'].some((service) => isPlainObject(service) === true && Reflect.has(service, 'portEnvironment'));

    if (hasRetiredPortKeys === true) {
      Logger.warn('Docker appliance ports are fixed; manifest "ports" and service "portEnvironment" keys are ignored and can be removed.');
    }

    const manifest: Lib_DockerPackaging_Runner_NormalizeManifest_Manifest = value as Lib_DockerPackaging_Runner_NormalizeManifest_Manifest;
    const serviceNames: Lib_DockerPackaging_Runner_NormalizeManifest_ServiceNames = new Set();
    const servicePorts: Lib_DockerPackaging_Runner_NormalizeManifest_ServicePorts = new Set();
    const healthPath: Lib_DockerPackaging_Runner_NormalizeManifest_HealthPath = manifest['healthPath'] ?? '/health';
    const legacyStatePaths: Lib_DockerPackaging_Runner_NormalizeManifest_LegacyStatePaths = Runner.normalizeRuntimePaths(manifest['legacyStatePaths'] ?? [], 'legacy state migration');
    const networkMode: Lib_DockerPackaging_Runner_NormalizeManifest_NetworkMode = manifest['networkMode'] ?? 'host';
    const stateEnvironment: Lib_DockerPackaging_Runner_NormalizeManifest_StateEnvironment = manifest['stateEnvironment'];

    if (LIB_REGEX_PATTERN_DOCKER_HEALTH_PATH.test(healthPath) === false) {
      throw new Error(`Docker health path "${healthPath}" must be a safe absolute HTTP path without a query or fragment.`);
    }

    if (networkMode !== 'bridge' && networkMode !== 'host') {
      throw new Error('Docker network mode must be either "host" or "bridge".');
    }

    if (stateEnvironment !== undefined && LIB_REGEX_PATTERN_CASING_UPPER_SNAKE_CASE.test(stateEnvironment) === false) {
      throw new Error(`Docker state environment name "${stateEnvironment}" must use UPPER_SNAKE_CASE.`);
    }

    for (const service of manifest['services']) {
      Runner.validateServiceName(service['name']);

      if (serviceNames.has(service['name']) === true) {
        throw new Error(`Docker service name "${service['name']}" is declared more than once in the assembly manifest.`);
      }

      serviceNames.add(service['name']);

      // "ports" lists every port of a service; "port" stays as the alias for the first one.
      if (service['ports'] !== undefined) {
        if (Array.isArray(service['ports']) === false || service['ports'].length === 0) {
          throw new Error(`Docker service "${service['name']}" ports must be a non-empty array.`);
        }

        const firstPort: Lib_DockerPackaging_Runner_NormalizeManifest_FirstPort = service['ports'][0];

        if (service['port'] !== undefined && service['port'] !== firstPort) {
          throw new Error(`Docker service "${service['name']}" port must match the first entry of its ports.`);
        }

        if (firstPort !== undefined) {
          service.port = firstPort;
        }
      }

      const declaredPorts: Lib_DockerPackaging_Runner_NormalizeManifest_DeclaredPorts = service['ports'] ?? ((service['port'] === undefined) ? [] : [service['port']]);

      for (const declaredPort of declaredPorts) {
        if (
          Number.isInteger(declaredPort) === false
          || declaredPort < 1
          || declaredPort > 65535
        ) {
          throw new Error(`Docker service "${service['name']}" port must be an integer between 1 and 65535.`);
        }

        if (servicePorts.has(declaredPort) === true) {
          throw new Error(`Docker service port ${declaredPort} is declared more than once in the assembly manifest.`);
        }

        servicePorts.add(declaredPort);
      }

      if (declaredPorts.length > 0) {
        Reflect.deleteProperty(service['environment'], 'PORT');
      }

      if (
        service['down'] !== undefined
        && (
          service['kind'] !== 'oneshot'
          || typeof service['down'] !== 'string'
          || LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE.test(service['down']) === false
        )
      ) {
        throw new Error(`Docker service "${service['name']}" down must be a one-line command on a oneshot service.`);
      }

      Reflect.deleteProperty(service, 'portEnvironment');
    }

    const settings: Lib_DockerPackaging_Runner_NormalizeManifest_Settings = LibDockerRender.normalizeSettings(value);
    const workspaces: Lib_DockerPackaging_Runner_NormalizeManifest_Workspaces = manifest['workspaces'].map((workspace) => Runner.normalizeWorkspace(workspace));

    if (settings['healthService'] !== undefined) {
      const healthService: Lib_DockerPackaging_Runner_NormalizeManifest_HealthService = manifest['services'].find((service) => service['name'] === settings['healthService']);

      if (
        healthService === undefined
        || healthService['kind'] !== 'longrun'
        || healthService['port'] === undefined
      ) {
        throw new Error(`Docker health service "${settings['healthService']}" must be a declared longrun service with a port.`);
      }
    }

    if (
      settings['runtime'] !== undefined
      && settings['runtime']['layout'] === 'outputs'
      && workspaces.some((workspace) => workspace['runtimePaths'].length > 0) === true
    ) {
      throw new Error('Docker runtime paths are not copied in the "outputs" runtime layout; declare them as runtime.copies instead.');
    }

    return {
      ...((settings['build'] === undefined) ? {} : { build: settings['build'] }),
      ...((settings['compose'] === undefined) ? {} : { compose: settings['compose'] }),
      ...((settings['dockerfile'] === undefined) ? {} : { dockerfile: settings['dockerfile'] }),
      healthPath,
      ...((settings['healthService'] === undefined) ? {} : { healthService: settings['healthService'] }),
      ...((settings['images'] === undefined) ? {} : { images: settings['images'] }),
      legacyStatePaths,
      networkMode,
      ...((settings['project'] === undefined) ? {} : { project: settings['project'] }),
      ...((settings['runtime'] === undefined) ? {} : { runtime: settings['runtime'] }),
      ...((settings['s6Overlay'] === undefined) ? {} : { s6Overlay: settings['s6Overlay'] }),
      schemaVersion: dockerManifestSchemaVersion,
      services: manifest['services'],
      ...((stateEnvironment === undefined) ? {} : { stateEnvironment }),
      workspaces,
    };
  }

  /**
   * Lib - Docker Packaging - Normalize Workspace.
   *
   * Rebuilds one manifest workspace from its known keys, which drops retired
   * fields, and validates the optional build script, offline flag, and sources.
   *
   * @param {Lib_DockerPackaging_Runner_NormalizeWorkspace_Workspace} workspace - Workspace.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_NormalizeWorkspace_Returns}
   *
   * @since 0.49.0
   */
  private static normalizeWorkspace(workspace: Lib_DockerPackaging_Runner_NormalizeWorkspace_Workspace): Lib_DockerPackaging_Runner_NormalizeWorkspace_Returns {
    const normalized: Lib_DockerPackaging_Runner_NormalizeWorkspace_Normalized = {
      packageName: workspace['packageName'],
      path: workspace['path'],
      profile: workspace['profile'],
      runtimePaths: Runner.normalizeRuntimePaths(workspace['runtimePaths'] ?? [], workspace['path']),
    };

    if (workspace['buildNetwork'] !== undefined) {
      if (workspace['buildNetwork'] !== 'default' && workspace['buildNetwork'] !== 'none') {
        throw new Error(`Docker workspace "${workspace['path']}" buildNetwork must be "default" or "none".`);
      }

      normalized.buildNetwork = workspace['buildNetwork'];
    }

    if (workspace['buildScript'] !== undefined) {
      if (typeof workspace['buildScript'] !== 'string' || LIB_REGEX_PATTERN_DOCKER_SCRIPT_NAME.test(workspace['buildScript']) === false) {
        throw new Error(`Docker workspace "${workspace['path']}" buildScript must name one package.json script.`);
      }

      normalized.buildScript = workspace['buildScript'];
    }

    if (workspace['sources'] !== undefined) {
      if (Array.isArray(workspace['sources']) === false || workspace['sources'].length === 0) {
        throw new Error(`Docker workspace "${workspace['path']}" sources must be a non-empty array.`);
      }

      for (const source of workspace['sources']) {
        const sourceFiles: Lib_DockerPackaging_Runner_NormalizeWorkspace_SourceFiles = (Array.isArray(source) === true) ? source : [source];

        if (sourceFiles.length === 0) {
          throw new Error(`Docker workspace "${workspace['path']}" sources cannot contain an empty group.`);
        }

        Runner.normalizeRuntimePaths(sourceFiles, workspace['path']);
      }

      normalized.sources = workspace['sources'];
    }

    return normalized;
  }

  /**
   * Lib - Docker Packaging - Normalize Runtime Paths.
   *
   * Validates exact workspace-relative paths copied from the build stage into
   * the matching runtime workspace and returns stable de-duplicated ordering.
   *
   * @param {Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Value}         value         - Value.
   * @param {Lib_DockerPackaging_Runner_NormalizeRuntimePaths_WorkspacePath} workspacePath - Workspace path.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Returns}
   *
   * @since 0.34.0
   */

  private static normalizeRuntimePaths(value: Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Value, workspacePath: Lib_DockerPackaging_Runner_NormalizeRuntimePaths_WorkspacePath): Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Returns {
    if (Array.isArray(value) === false) {
      throw new Error(`Docker runtime paths for workspace "${workspacePath}" must be an array.`);
    }

    const runtimePaths: Lib_DockerPackaging_Runner_NormalizeRuntimePaths_RuntimePaths = [];

    for (const runtimePathValue of value) {
      if (typeof runtimePathValue !== 'string') {
        throw new Error(`Docker runtime paths for workspace "${workspacePath}" must contain only strings.`);
      }

      const pathParts: Lib_DockerPackaging_Runner_NormalizeRuntimePaths_PathParts = runtimePathValue.split('/');

      if (
        runtimePathValue === ''
        || runtimePathValue.startsWith('/') === true
        || runtimePathValue.endsWith('/') === true
        || LIB_REGEX_PATTERN_DOCKER_RUNTIME_PATH.test(runtimePathValue) === false
        || pathParts.includes('') === true
        || pathParts.includes('.') === true
        || pathParts.includes('..') === true
      ) {
        throw new Error(`Docker runtime path "${runtimePathValue}" for workspace "${workspacePath}" is not a safe, specific relative path.`);
      }

      runtimePaths.push(runtimePathValue);
    }

    return [...new Set(runtimePaths)].sort((firstPath, secondPath) => firstPath.localeCompare(secondPath));
  }

  /**
   * Lib - Docker Packaging - Build Requested Services.
   *
   * Normalizes service definitions contributed by one scaffold workspace and
   * supplies the profile-specific default service when none was provided.
   *
   * @param {Lib_DockerPackaging_Runner_BuildRequestedServices_Inputs}   options  - Options.
   * @param {Lib_DockerPackaging_Runner_BuildRequestedServices_Manifest} manifest - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildRequestedServices_Returns}
   *
   * @since 0.34.0
   */

  private static buildRequestedServices(options: Lib_DockerPackaging_Runner_BuildRequestedServices_Options, manifest: Lib_DockerPackaging_Runner_BuildRequestedServices_Manifest): Lib_DockerPackaging_Runner_BuildRequestedServices_Returns {
    const workspacePath: Lib_DockerPackaging_Runner_BuildRequestedServices_WorkspacePath = relative(options['projectDirectory'], options['workspaceDirectory']).split(sep).join('/');
    const defaultName: Lib_DockerPackaging_Runner_BuildRequestedServices_DefaultName = options['workspaceName'] ?? basename(workspacePath);
    const serviceInputs: Lib_DockerPackaging_Runner_BuildRequestedServices_ServiceInputs = options['services'] ?? [{ name: defaultName }];
    const existingServices: Lib_DockerPackaging_Runner_BuildRequestedServices_ExistingServices = manifest['services'];
    const requestedServices: Lib_DockerPackaging_Runner_BuildRequestedServices_RequestedServices = [];

    for (const serviceInput of serviceInputs) {
      if (requestedServices.some((service) => service['name'] === serviceInput['name']) === true) {
        throw new Error(`Docker service name "${serviceInput['name']}" is declared more than once for workspace "${workspacePath}".`);
      }

      requestedServices.push(Runner.buildService(options, serviceInput, existingServices, requestedServices));
    }

    return requestedServices;
  }

  /**
   * Lib - Docker Packaging - Build Service.
   *
   * Resolves profile defaults and validates one native s6 service definition
   * before it is merged into the repository appliance.
   *
   * @param {Lib_DockerPackaging_Runner_BuildService_Options}          options           - Options.
   * @param {Lib_DockerPackaging_Runner_BuildService_Input}            input             - Input.
   * @param {Lib_DockerPackaging_Runner_BuildService_ExistingServices} existingServices  - Existing services.
   * @param {Lib_DockerPackaging_Runner_ManifestServices}              requestedServices - Requested services.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildService_Returns}
   *
   * @since 0.34.0
   */

  private static buildService(options: Lib_DockerPackaging_Runner_BuildService_Options, input: Lib_DockerPackaging_Runner_BuildService_Input, existingServices: Lib_DockerPackaging_Runner_BuildService_ExistingServices, requestedServices: Lib_DockerPackaging_Runner_BuildService_RequestedServices): Lib_DockerPackaging_Runner_BuildService_Returns {
    const name: Lib_DockerPackaging_Runner_BuildService_Name = input['name'];

    Runner.validateServiceName(name);

    const workspacePath: Lib_DockerPackaging_Runner_BuildService_WorkspacePath = relative(options['projectDirectory'], options['workspaceDirectory']).split(sep).join('/');
    const previousService: Lib_DockerPackaging_Runner_BuildService_PreviousService = existingServices.find((service) => service['name'] === name && service['workspace'] === workspacePath);
    const previousPort: Lib_DockerPackaging_Runner_BuildService_PreviousPort = (previousService === undefined) ? undefined : previousService['port'];
    let preferredPort: Lib_DockerPackaging_Runner_BuildService_PreferredPort = undefined;

    if (options['profile'] === 'astro-node') {
      preferredPort = 4321;
    } else if (options['profile'] === 'static-site') {
      preferredPort = 8080;
    } else if (options['profile'] === 'http-service' || options['profile'] === 'nextjs-standalone') {
      preferredPort = 3000;
    }

    let port: Lib_DockerPackaging_Runner_BuildService_Port = input['port'] ?? previousPort;

    if (port === undefined) {
      port = preferredPort;
    }

    const occupiedPorts: Lib_DockerPackaging_Runner_BuildService_OccupiedPorts = new Set();

    for (const service of existingServices) {
      if (service['workspace'] === workspacePath) {
        continue;
      }

      for (const servicePort of service['ports'] ?? ((service['port'] === undefined) ? [] : [service['port']])) {
        occupiedPorts.add(servicePort);
      }
    }

    for (const service of requestedServices) {
      if (service['port'] !== undefined) {
        occupiedPorts.add(service['port']);
      }
    }

    if (input['port'] !== undefined && occupiedPorts.has(input['port']) === true) {
      throw new Error(`Docker service "${name}" requests port ${input['port']}, but another service already uses it.`);
    }

    while (port !== undefined && occupiedPorts.has(port) === true) {
      port += 1;
    }

    if (
      port !== undefined
      && (
        Number.isInteger(port) === false
        || port < 1
        || port > 65535
      )
    ) {
      throw new Error(`Docker service "${name}" port must be an integer between 1 and 65535.`);
    }

    const kind: Lib_DockerPackaging_Runner_BuildService_Kind = input['kind'] ?? 'longrun';
    const environment: Lib_DockerPackaging_Runner_BuildService_Environment = { ...(input['environment'] ?? {}) };

    Reflect.deleteProperty(environment, 'PORT');

    if (options['profile'] === 'astro-node') {
      Reflect.set(environment, 'HOST', '0.0.0.0');
    }

    if (options['profile'] === 'nextjs-standalone') {
      Reflect.set(environment, 'HOSTNAME', '0.0.0.0');
    }

    let command: Lib_DockerPackaging_Runner_BuildService_Command = input['command'] ?? 'node build/index.js';

    if (input['command'] === undefined) {
      if (options['profile'] === 'astro-node') {
        command = 'node build/server/entry.mjs';
      } else if (options['profile'] === 'container-native') {
        command = '/command/s6-pause';
      } else if (options['profile'] === 'nextjs-standalone') {
        command = 'node server.js';
      } else if (options['profile'] === 'static-site') {
        command = `httpd -f -p ${port} -h /app/sites/${name}`;
      }
    }

    const writablePaths: Lib_DockerPackaging_Runner_BuildService_WritablePaths = [...(input['writablePaths'] ?? [])];

    for (const writablePath of writablePaths) {
      const pathParts: Lib_DockerPackaging_Runner_BuildService_PathParts = writablePath.split('/');
      const isProtectedWritablePath: Lib_DockerPackaging_Runner_BuildService_IsProtectedWritablePath = dockerProtectedWritablePaths.some((protectedPath) => (
        writablePath === protectedPath
        || writablePath.startsWith(`${protectedPath}/`) === true
      ));

      if (
        writablePath.startsWith('/') === false
        || writablePath === '/'
        || pathParts.includes('..') === true
        || pathParts.includes('.') === true
        || isProtectedWritablePath === true
      ) {
        throw new Error(`Docker writable path "${writablePath}" is not a safe, specific absolute path.`);
      }
    }

    const service: Lib_DockerPackaging_Runner_BuildService_Service = {
      command,
      critical: input['critical'] ?? false,
      dependencies: [...new Set(input['dependencies'] ?? [])].sort((firstDependency, secondDependency) => firstDependency.localeCompare(secondDependency)),
      environment,
      kind: (kind === 'oneshot') ? 'oneshot' : 'longrun',
      name,
      requiredForHealth: input['requiredForHealth'] ?? kind !== 'oneshot',
      runAsRoot: input['runAsRoot'] ?? false,
      workspace: workspacePath,
      writablePaths,
    };
    const healthCommand: Lib_DockerPackaging_Runner_BuildService_HealthCommand = input['healthCommand'] ?? ((previousService === undefined) ? undefined : previousService['healthCommand']);

    if (healthCommand !== undefined) {
      service.healthCommand = healthCommand;
    }

    const finishCommand: Lib_DockerPackaging_Runner_BuildService_FinishCommand = input['finishCommand'] ?? ((previousService === undefined) ? undefined : previousService['finishCommand']);

    if (finishCommand !== undefined) {
      service.finishCommand = finishCommand;
    }

    if (port !== undefined) {
      service.port = port;
    }

    // Extra ports and a oneshot "down" command are manifest-only settings, so a scaffold rerun keeps them.
    if (
      previousService !== undefined
      && previousService['ports'] !== undefined
      && previousService['ports'][0] === port
    ) {
      service.ports = previousService['ports'];
    }

    if (
      previousService !== undefined
      && previousService['down'] !== undefined
      && service['kind'] === 'oneshot'
    ) {
      service.down = previousService['down'];
    }

    return service;
  }

  /**
   * Lib - Docker Packaging - Collect Workspace Packages.
   *
   * Reads workspace manifests that may participate in a selected dependency
   * closure without copying unrelated workspace source into the image.
   *
   * @param {Lib_DockerPackaging_Runner_CollectWorkspacePackages_ProjectDirectory} projectDirectory - Project directory.
   * @param {Lib_DockerPackaging_Runner_CollectWorkspacePackages_Manifest}         manifest         - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_CollectWorkspacePackages_Returns}
   *
   * @since 0.34.0
   */

  private static async collectWorkspacePackages(projectDirectory: Lib_DockerPackaging_Runner_CollectWorkspacePackages_ProjectDirectory, manifest: Lib_DockerPackaging_Runner_CollectWorkspacePackages_Manifest): Lib_DockerPackaging_Runner_CollectWorkspacePackages_Returns {
    const workspacePaths: Lib_DockerPackaging_Runner_CollectWorkspacePackages_WorkspacePaths = new Set(manifest['workspaces'].map((workspace) => workspace['path']));

    for (const workspaceGroup of [
      'apps',
      'packages',
    ]) {
      const groupDirectory: Lib_DockerPackaging_Runner_CollectWorkspacePackages_GroupDirectory = join(projectDirectory, workspaceGroup);

      if (await pathExists(groupDirectory) === false) {
        continue;
      }

      const directoryEntries: Lib_DockerPackaging_DirectoryEntries = await fs.readdir(groupDirectory, { withFileTypes: true });

      for (const directoryEntry of directoryEntries) {
        if (directoryEntry.isDirectory() === false) {
          continue;
        }

        if (workspaceGroup === 'packages' && directoryEntry.name === 'docker') {
          continue;
        }

        workspacePaths.add(`${workspaceGroup}/${directoryEntry.name}`);
      }
    }

    const workspacePackages: Lib_DockerPackaging_Runner_CollectWorkspacePackages_WorkspacePackages = new Map();

    for (const workspacePath of workspacePaths) {
      const packagePath: Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackagePath = join(projectDirectory, workspacePath, 'package.json');

      if (await pathExists(packagePath) === false) {
        continue;
      }

      const packageJson: Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackageJson = await Runner.readJsonObject(packagePath);
      const packageName: Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackageName = packageJson['name'];

      if (typeof packageName === 'string' && packageName.trim() !== '') {
        workspacePackages.set(packageName, {
          packageJson,
          path: workspacePath,
        });
      }
    }

    return workspacePackages;
  }

  /**
   * Lib - Docker Packaging - Resolve Build Order.
   *
   * Traverses selected workspaces and their internal dependency closure while
   * preserving dependency-first build order.
   *
   * @param {Lib_DockerPackaging_Runner_ResolveBuildOrder_Manifest}          manifest          - Manifest.
   * @param {Lib_DockerPackaging_Runner_ResolveBuildOrder_WorkspacePackages} workspacePackages - Workspace packages.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_ResolveBuildOrder_Returns}
   *
   * @since 0.34.0
   */

  private static resolveBuildOrder(manifest: Lib_DockerPackaging_Runner_ResolveBuildOrder_Manifest, workspacePackages: Lib_DockerPackaging_Runner_ResolveBuildOrder_WorkspacePackages): Lib_DockerPackaging_Runner_ResolveBuildOrder_Returns {
    const orderedPackages: Lib_DockerPackaging_Runner_ResolveBuildOrder_OrderedPackages = new Map();
    const visitingPackages: Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitingPackages = new Set();

    /**
     * Lib - Docker Packaging - Resolve Build Order - Visit Package.
     *
     * Visits one internal package dependency branch and rejects workspace cycles
     * before container build instructions are emitted.
     *
     * @param {Lib_DockerPackaging_String} packageName - Package name.
     *
     * @returns {void}
     *
     * @since 0.34.0
     */
    const visitPackage: Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage = (packageName) => {
      if (orderedPackages.has(packageName) === true) {
        return;
      }

      if (visitingPackages.has(packageName) === true) {
        throw new Error(`Docker workspace dependency cycle includes "${packageName}".`);
      }

      const workspacePackage: Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage_WorkspacePackage = workspacePackages.get(packageName);

      if (workspacePackage === undefined) {
        return;
      }

      visitingPackages.add(packageName);

      for (const dependencyGroupName of [
        'dependencies',
        'devDependencies',
        'optionalDependencies',
        'peerDependencies',
      ]) {
        const dependencyGroup: Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage_DependencyGroup = workspacePackage['packageJson'][dependencyGroupName];

        if (isPlainObject(dependencyGroup) === true) {
          for (const dependencyName of Object.keys(dependencyGroup).sort((firstDependency, secondDependency) => firstDependency.localeCompare(secondDependency))) {
            if (workspacePackages.has(dependencyName) === true) {
              visitPackage(dependencyName);
            }
          }
        }
      }

      visitingPackages.delete(packageName);

      orderedPackages.set(packageName, workspacePackage);

      return;
    };

    for (const workspace of manifest['workspaces']) {
      visitPackage(workspace['packageName']);
    }

    return orderedPackages;
  }

  /**
   * Lib - Docker Packaging - Build Synthetic Workspace Package.
   *
   * Produces a build-only workspace manifest for managers that do not understand
   * the workspace protocol. Only packages inside the selected dependency closure
   * are normalized, and the repository manifest remains unchanged.
   *
   * @param {Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_PackageJson} packageJson - Package json.
   * @param {Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_BuildOrder}  buildOrder  - Build order.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_Returns}
   *
   * @since 0.34.0
   */

  private static buildSyntheticWorkspacePackage(packageJson: Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_PackageJson, buildOrder: Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_BuildOrder): Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_Returns {
    const syntheticPackage: Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_SyntheticPackage = structuredClone(packageJson);

    for (const dependencyGroupName of [
      'dependencies',
      'devDependencies',
      'optionalDependencies',
      'peerDependencies',
    ]) {
      const dependencyGroup: Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_DependencyGroup = syntheticPackage[dependencyGroupName];

      if (isPlainObject(dependencyGroup) === false) {
        continue;
      }

      for (const dependencyEntry of Object.entries(dependencyGroup)) {
        const internalWorkspace: Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_InternalWorkspace = buildOrder.get(dependencyEntry[0]);
        const dependencyValue: Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_DependencyValue = dependencyEntry[1];

        if (
          internalWorkspace === undefined
          || typeof dependencyValue !== 'string'
          || dependencyValue.startsWith('workspace:') === false
        ) {
          continue;
        }

        const workspaceRange: Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_WorkspaceRange = dependencyValue.slice('workspace:'.length);
        let normalizedDependencyValue: Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_NormalizedDependencyValue = workspaceRange;

        if (
          workspaceRange === '*'
          || workspaceRange === '^'
          || workspaceRange === '~'
        ) {
          const internalVersionValue: Lib_DockerPackaging_Runner_BuildSyntheticWorkspacePackage_InternalVersionValue = internalWorkspace['packageJson']['version'];

          if (typeof internalVersionValue !== 'string' || internalVersionValue.trim() === '') {
            throw new Error(`Docker workspace package "${dependencyEntry[0]}" must define a version before "${dependencyValue}" can be normalized for the container build.`);
          }

          normalizedDependencyValue = (workspaceRange === '*') ? internalVersionValue : `${workspaceRange}${internalVersionValue}`;
        }

        Reflect.set(dependencyGroup, dependencyEntry[0], normalizedDependencyValue);
      }
    }

    return syntheticPackage;
  }

  /**
   * Lib - Docker Packaging - Render Rootfs.
   *
   * Computes every Nova-owned rootfs file: the native s6-rc database, dependency
   * edges, the user bundle, init, health, and log helpers, and service scripts.
   *
   * @param {Lib_DockerPackaging_Runner_RenderRootfs_Manifest} manifest - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_RenderRootfs_Returns}
   *
   * @since 0.49.0
   */
  private static renderRootfs(manifest: Lib_DockerPackaging_Runner_RenderRootfs_Manifest): Lib_DockerPackaging_Runner_RenderRootfs_Returns {
    const files: Lib_DockerPackaging_Runner_RenderRootfs_Files = new Map();
    const writablePaths: Lib_DockerPackaging_Runner_RenderRootfs_WritablePaths = [...new Set(manifest['services'].flatMap((service) => service['writablePaths']))].sort((firstPath, secondPath) => firstPath.localeCompare(secondPath));
    const shellVariableMarker: Lib_DockerPackaging_Runner_RenderRootfs_ShellVariableMarker = '$';
    const generatedHeader: Lib_DockerPackaging_Runner_RenderRootfs_GeneratedHeader = LibDockerRender.generatedHeader([]);

    /**
     * Lib - Docker Packaging - Render Rootfs - Add File.
     *
     * Records one rootfs file by its path below "packages/docker/rootfs" and
     * whether the image needs it to be executable.
     *
     * @param {Lib_DockerPackaging_Runner_RenderRootfs_AddFile_RelativePath} relativePath - Relative path.
     * @param {Lib_DockerPackaging_Runner_RenderRootfs_AddFile_Content}      content      - Content.
     * @param {Lib_DockerPackaging_Runner_RenderRootfs_AddFile_Executable}   executable   - Executable.
     *
     * @returns {Lib_DockerPackaging_Runner_RenderRootfs_AddFile_Returns}
     *
     * @since 0.49.0
     */
    const addFile: Lib_DockerPackaging_Runner_RenderRootfs_AddFile = (relativePath, content, executable): Lib_DockerPackaging_Runner_RenderRootfs_AddFile_Returns => {
      const scriptLines: Lib_DockerPackaging_Runner_RenderRootfs_AddFile_ScriptLines = content.split('\n');

      // Scripts carry the generated-file header right after the shebang; s6 data files stay bare.
      files.set(relativePath, {
        content: (executable === true) ? [
          scriptLines[0] ?? '',
          ...generatedHeader,
          ...scriptLines.slice(1),
        ].join('\n') : content,
        executable,
        report: false,
      });

      return;
    };

    addFile('etc/s6-overlay/s6-rc.d/nova-container-init/type', 'oneshot\n', false);
    addFile('etc/s6-overlay/s6-rc.d/nova-container-init/up', '/usr/local/libexec/nova-docker/init-user\n', false);
    addFile('etc/s6-overlay/s6-rc.d/nova-container-init/dependencies.d/base', '', false);
    addFile('etc/s6-overlay/user-bundles.d/user/contents.d/nova-container-init', '', false);
    addFile('usr/local/libexec/nova-docker/init-user', Runner.buildInitUser(manifest), true);
    addFile('usr/local/libexec/nova-docker/healthcheck', Runner.buildHealthcheck(manifest), true);
    addFile('usr/local/libexec/nova-docker/log', Runner.buildLogHelper(), true);
    addFile('etc/nova-docker/legacy-state-paths', (manifest['legacyStatePaths'].length === 0) ? '' : `${manifest['legacyStatePaths'].join('\n')}\n`, false);
    addFile('etc/nova-docker/writable-paths', (writablePaths.length === 0) ? '' : `${writablePaths.join('\n')}\n`, false);

    for (const service of manifest['services']) {
      const serviceDirectory: Lib_DockerPackaging_Runner_RenderRootfs_ServiceDirectory = `etc/s6-overlay/s6-rc.d/${service['name']}`;

      addFile(`${serviceDirectory}/type`, `${service['kind']}\n`, false);
      addFile(`${serviceDirectory}/dependencies.d/nova-container-init`, '', false);
      addFile(`etc/s6-overlay/user-bundles.d/user/contents.d/${service['name']}`, '', false);

      for (const dependency of service['dependencies']) {
        addFile(`${serviceDirectory}/dependencies.d/${dependency}`, '', false);
      }

      if (service['kind'] === 'oneshot') {
        addFile(`usr/local/libexec/nova-docker/services/${service['name']}`, Runner.buildRunScript(service), true);
        addFile(`${serviceDirectory}/up`, `/usr/local/libexec/nova-docker/services/${service['name']}\n`, false);

        if (service['down'] !== undefined) {
          addFile(`${serviceDirectory}/down`, `${service['down']}\n`, false);
        }

        continue;
      }

      addFile(`${serviceDirectory}/run`, Runner.buildRunScript(service), true);
      addFile(`${serviceDirectory}/timeout-down`, '6000\n', false);
      addFile(`${serviceDirectory}/timeout-finish`, '1000\n', false);
      addFile(`${serviceDirectory}/timeout-kill`, '6000\n', false);

      // The app's own finish command runs first, so its cleanup happens before a critical halt.
      if (service['critical'] === true || service['finishCommand'] !== undefined) {
        const criticalFinishScript: Lib_DockerPackaging_Runner_RenderRootfs_CriticalFinishScript = [
          '#!/command/with-contenv sh',
          'set -eu',
          '. /usr/local/libexec/nova-docker/log',
          ...((service['finishCommand'] === undefined) ? [] : [
            `if ! ${service['finishCommand']} "${shellVariableMarker}@"; then`,
            `  nova_log WARN ${Runner.shellQuote(service['name'])} 'The service finish command failed.'`,
            'fi',
          ]),
          ...((service['critical'] === true) ? [
            `if [ "${shellVariableMarker}{1:-0}" -ne 0 ]; then`,
            `  nova_log ERROR ${Runner.shellQuote(service['name'])} "Critical service exited abnormally with code ${shellVariableMarker}{1:-0} and signal ${shellVariableMarker}{2:-0}; halting the container."`,
            '  exec /run/s6/basedir/bin/halt',
            'fi',
          ] : []),
          'exit 0',
          '',
        ].join('\n');

        addFile(`${serviceDirectory}/finish`, criticalFinishScript, true);
      }
    }

    return files;
  }

  /**
   * Lib - Docker Packaging - Build Run Script.
   *
   * Renders one environment-aware service helper and uses numeric identity values
   * to drop privileges without mutating the container root filesystem.
   *
   * @param {Lib_DockerPackaging_Runner_BuildRunScript_Service} service - Service.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildRunScript_Returns}
   *
   * @since 0.34.0
   */

  private static buildRunScript(service: Lib_DockerPackaging_Runner_BuildRunScript_Service): Lib_DockerPackaging_Runner_BuildRunScript_Returns {
    const lines: Lib_DockerPackaging_Runner_BuildRunScript_Lines = [
      '#!/command/with-contenv sh',
      'set -eu',
      '. /usr/local/libexec/nova-docker/log',
      '. /run/nova-docker/environment',
    ];
    const shellVariableMarker: Lib_DockerPackaging_Runner_BuildRunScript_ShellVariableMarker = '$';

    lines.push(
      'if [ -f /app/.pnp.cjs ]; then',
      `  export NODE_OPTIONS="--require=/app/.pnp.cjs${shellVariableMarker}{NODE_OPTIONS:+ ${shellVariableMarker}{NODE_OPTIONS}}"`,
      'fi',
      'if [ -f /app/.pnp.loader.mjs ]; then',
      `  export NODE_OPTIONS="--experimental-loader=/app/.pnp.loader.mjs${shellVariableMarker}{NODE_OPTIONS:+ ${shellVariableMarker}{NODE_OPTIONS}}"`,
      'fi',
    );

    if (service['command'].includes('/app/sites/') === false) {
      lines.push(`cd ${Runner.shellQuote(`/app/${service['workspace']}`)}`);
    }

    for (const environmentEntry of Object.entries(service['environment']).sort((firstEntry, secondEntry) => firstEntry[0].localeCompare(secondEntry[0]))) {
      lines.push(`export ${environmentEntry[0]}=${Runner.shellQuote(environmentEntry[1])}`);
    }

    if (service['port'] !== undefined) {
      lines.push('unset PORT');
    }

    lines.push(`nova_log INFO ${Runner.shellQuote(service['name'])} 'Starting service.'`);

    if (service['runAsRoot'] === true) {
      lines.push(`exec ${service['command']}`);
    } else {
      lines.push(`exec /command/s6-applyuidgid -u "\${PUID:-1000}" -g "\${PGID:-1000}" -G "\${PGID:-1000}" ${service['command']}`);
    }

    return `${lines.join('\n')}\n`;
  }

  /**
   * Lib - Docker Packaging - Build Log Helper.
   *
   * Renders the shared POSIX logger used by generated init, health, finish, and
   * service scripts so container output has one stable machine-readable prefix.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildLogHelper_Returns}
   *
   * @since 0.43.1
   */
  private static buildLogHelper(): Lib_DockerPackaging_Runner_BuildLogHelper_Returns {
    const shellNewline: Lib_DockerPackaging_Runner_BuildLogHelper_ShellNewline = [
      '\\',
      'n',
    ].join('');
    const shellVariableMarker: Lib_DockerPackaging_Runner_BuildLogHelper_ShellVariableMarker = '$';

    return [
      '#!/bin/sh',
      'set -eu',
      'nova_log() {',
      `  NOVA_LOG_LEVEL="${shellVariableMarker}{1:-INFO}"`,
      `  NOVA_LOG_COMPONENT="${shellVariableMarker}{2:-nova-docker}"`,
      `  NOVA_LOG_MESSAGE="${shellVariableMarker}{3:-}"`,
      `  case "${shellVariableMarker}{NOVA_LOG_LEVEL}" in`,
      '    DEBUG|INFO|WARN|ERROR) ;;',
      '    *)',
      `      NOVA_LOG_MESSAGE="Invalid log level ${shellVariableMarker}{NOVA_LOG_LEVEL}: ${shellVariableMarker}{NOVA_LOG_MESSAGE}"`,
      '      NOVA_LOG_LEVEL=ERROR',
      '      ;;',
      '  esac',
      `  NOVA_LOG_TIMESTAMP="${shellVariableMarker}(date -u '+%Y-%m-%dT%H:%M:%SZ')"`,
      `  case "${shellVariableMarker}{NOVA_LOG_LEVEL}" in`,
      '    WARN|ERROR)',
      `      printf '%s %s %s: %s${shellNewline}' "${shellVariableMarker}{NOVA_LOG_TIMESTAMP}" "${shellVariableMarker}{NOVA_LOG_LEVEL}" "${shellVariableMarker}{NOVA_LOG_COMPONENT}" "${shellVariableMarker}{NOVA_LOG_MESSAGE}" >&2`,
      '      ;;',
      '    *)',
      `      printf '%s %s %s: %s${shellNewline}' "${shellVariableMarker}{NOVA_LOG_TIMESTAMP}" "${shellVariableMarker}{NOVA_LOG_LEVEL}" "${shellVariableMarker}{NOVA_LOG_COMPONENT}" "${shellVariableMarker}{NOVA_LOG_MESSAGE}"`,
      '      ;;',
      '  esac',
      '}',
      `if [ "${shellVariableMarker}{0##*/}" = log ]; then`,
      `  nova_log "${shellVariableMarker}{1:-INFO}" "${shellVariableMarker}{2:-nova-docker}" "${shellVariableMarker}{3:-}"`,
      'fi',
      '',
    ].join('\n');
  }

  /**
   * Lib - Docker Packaging - Build Init User.
   *
   * Resolves and migrates app state, validates runtime settings, prepares standard
   * state paths, and applies numeric ownership before services start.
   *
   * @param {Lib_DockerPackaging_Runner_BuildInitUser_Manifest} manifest - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildInitUser_Returns}
   *
   * @since 0.34.0
   */

  private static buildInitUser(manifest: Lib_DockerPackaging_Runner_BuildInitUser_Manifest): Lib_DockerPackaging_Runner_BuildInitUser_Returns {
    const shellNewline: Lib_DockerPackaging_Runner_BuildInitUser_ShellNewline = [
      '\\',
      'n',
    ].join('');
    const shellVariableMarker: Lib_DockerPackaging_Runner_BuildInitUser_ShellVariableMarker = '$';
    const protectedWritablePatterns: Lib_DockerPackaging_Runner_BuildInitUser_ProtectedWritablePatterns = dockerProtectedWritablePaths.flatMap((protectedPath) => [
      protectedPath,
      `${protectedPath}/*`,
    ]).join('|');

    return [
      '#!/command/with-contenv sh',
      'set -eu',
      '. /usr/local/libexec/nova-docker/log',
      '',
      `PUID_VALUE="${shellVariableMarker}{PUID:-1000}"`,
      `PGID_VALUE="${shellVariableMarker}{PGID:-1000}"`,
      `TZ_VALUE="${shellVariableMarker}{TZ:-UTC}"`,
      '',
      `case "${shellVariableMarker}{PUID_VALUE}" in`,
      '  \'\'|*[!0-9]*) nova_log ERROR init \'PUID must be an integer between 1 and 60000.\'; exit 1 ;;',
      'esac',
      `case "${shellVariableMarker}{PGID_VALUE}" in`,
      '  \'\'|*[!0-9]*) nova_log ERROR init \'PGID must be an integer between 1 and 60000.\'; exit 1 ;;',
      'esac',
      `if [ "${shellVariableMarker}{PUID_VALUE}" -le 0 ] || [ "${shellVariableMarker}{PUID_VALUE}" -gt 60000 ]; then`,
      '  nova_log ERROR init \'PUID must be an integer between 1 and 60000.\'',
      '  exit 1',
      'fi',
      `if [ "${shellVariableMarker}{PGID_VALUE}" -le 0 ] || [ "${shellVariableMarker}{PGID_VALUE}" -gt 60000 ]; then`,
      '  nova_log ERROR init \'PGID must be an integer between 1 and 60000.\'',
      '  exit 1',
      'fi',
      '',
      `case "${shellVariableMarker}{TZ_VALUE}" in`,
      '  \'\'|/*|*..*) nova_log ERROR init \'TZ must name an installed IANA timezone.\'; exit 1 ;;',
      'esac',
      `if [ ! -f "/usr/share/zoneinfo/${shellVariableMarker}{TZ_VALUE}" ]; then`,
      `  nova_log ERROR init "Unknown timezone: ${shellVariableMarker}{TZ_VALUE}"`,
      '  exit 1',
      'fi',
      `if ln -snf "/usr/share/zoneinfo/${shellVariableMarker}{TZ_VALUE}" /etc/localtime 2>/dev/null \\`,
      `  && printf '%s${shellNewline}' "${shellVariableMarker}{TZ_VALUE}" > /etc/timezone 2>/dev/null; then`,
      '  :',
      'else',
      `  nova_log WARN init "The root filesystem is read-only, so the container clock files were not changed; services use TZ=${shellVariableMarker}{TZ_VALUE} from the environment."`,
      'fi',
      `if ! getent group "${shellVariableMarker}{PGID_VALUE}" > /dev/null 2>&1; then`,
      `  printf 'nova-%s:x:%s:${shellNewline}' "${shellVariableMarker}{PGID_VALUE}" "${shellVariableMarker}{PGID_VALUE}" >> /etc/group 2>/dev/null \\`,
      `    || nova_log WARN init "The root filesystem is read-only, so no group entry was added for GID ${shellVariableMarker}{PGID_VALUE}."`,
      'fi',
      `if ! getent passwd "${shellVariableMarker}{PUID_VALUE}" > /dev/null 2>&1; then`,
      `  printf 'nova-%s:x:%s:%s::/config:/usr/sbin/nologin${shellNewline}' "${shellVariableMarker}{PUID_VALUE}" "${shellVariableMarker}{PUID_VALUE}" "${shellVariableMarker}{PGID_VALUE}" >> /etc/passwd 2>/dev/null \\`,
      `    || nova_log WARN init "The root filesystem is read-only, so no user entry was added for UID ${shellVariableMarker}{PUID_VALUE}."`,
      'fi',
      '',
      'mkdir -p /config /data /run/nova-docker',
      'CONFIG_HAS_STATE=0',
      'DATA_HAS_STATE=0',
      'while IFS= read -r legacy_path; do',
      `  [ -n "${shellVariableMarker}{legacy_path}" ] || continue`,
      `  if [ -e "/config/${shellVariableMarker}{legacy_path}" ] || [ -L "/config/${shellVariableMarker}{legacy_path}" ]; then`,
      '    CONFIG_HAS_STATE=1',
      '  fi',
      `  if [ -e "/data/${shellVariableMarker}{legacy_path}" ] || [ -L "/data/${shellVariableMarker}{legacy_path}" ]; then`,
      '    DATA_HAS_STATE=1',
      '  fi',
      'done < /etc/nova-docker/legacy-state-paths',
      '',
      'STATE_DIRECTORY=/config',
      `if [ "${shellVariableMarker}{CONFIG_HAS_STATE}" -eq 1 ] && [ "${shellVariableMarker}{DATA_HAS_STATE}" -eq 1 ]; then`,
      '  nova_log WARN init \'App state exists in both /config and deprecated /data; using /config without overwriting either location.\'',
      `elif [ "${shellVariableMarker}{DATA_HAS_STATE}" -eq 1 ]; then`,
      '  if mountpoint -q /config; then',
      '    while IFS= read -r legacy_path; do',
      `      [ -n "${shellVariableMarker}{legacy_path}" ] || continue`,
      `      source_path="/data/${shellVariableMarker}{legacy_path}"`,
      `      destination_path="/config/${shellVariableMarker}{legacy_path}"`,
      `      if [ ! -e "${shellVariableMarker}{source_path}" ] && [ ! -L "${shellVariableMarker}{source_path}" ]; then`,
      '        continue',
      '      fi',
      `      if [ -e "${shellVariableMarker}{destination_path}" ] || [ -L "${shellVariableMarker}{destination_path}" ]; then`,
      `        nova_log ERROR init "Refusing to overwrite existing state path ${shellVariableMarker}{destination_path}."`,
      '        exit 1',
      '      fi',
      `      destination_parent="${shellVariableMarker}(dirname -- "${shellVariableMarker}{destination_path}")"`,
      `      mkdir -p -- "${shellVariableMarker}{destination_parent}"`,
      `      source_device="${shellVariableMarker}(stat -c '%d' -- "${shellVariableMarker}{source_path}")"`,
      `      destination_device="${shellVariableMarker}(stat -c '%d' -- "${shellVariableMarker}{destination_parent}")"`,
      `      if [ "${shellVariableMarker}{source_device}" = "${shellVariableMarker}{destination_device}" ]; then`,
      `        mv -- "${shellVariableMarker}{source_path}" "${shellVariableMarker}{destination_path}"`,
      '      else',
      `        temporary_destination="${shellVariableMarker}{destination_path}.nova-migration-${shellVariableMarker}${shellVariableMarker}"`,
      `        if [ -e "${shellVariableMarker}{temporary_destination}" ] || [ -L "${shellVariableMarker}{temporary_destination}" ]; then`,
      `          nova_log ERROR init "Refusing to overwrite migration path ${shellVariableMarker}{temporary_destination}."`,
      '          exit 1',
      '        fi',
      `        cp -a -- "${shellVariableMarker}{source_path}" "${shellVariableMarker}{temporary_destination}"`,
      `        if ! diff --brief --recursive --no-dereference -- "${shellVariableMarker}{source_path}" "${shellVariableMarker}{temporary_destination}" >/dev/null; then`,
      `          nova_log ERROR init "State migration verification failed for ${shellVariableMarker}{legacy_path}."`,
      '          exit 1',
      '        fi',
      `        mv -- "${shellVariableMarker}{temporary_destination}" "${shellVariableMarker}{destination_path}"`,
      `        rm -rf -- "${shellVariableMarker}{source_path}"`,
      '      fi',
      `      nova_log INFO init "Moved app state ${shellVariableMarker}{legacy_path} from /data to /config."`,
      '    done < /etc/nova-docker/legacy-state-paths',
      '  else',
      '    STATE_DIRECTORY=/data',
      '    nova_log WARN init \'Using deprecated /data for app state; change the app-state mount from /data to /config.\'',
      '  fi',
      'fi',
      '',
      `mkdir -p "${shellVariableMarker}{STATE_DIRECTORY}/keys" "${shellVariableMarker}{STATE_DIRECTORY}/database"`,
      `chown -R "${shellVariableMarker}{PUID_VALUE}:${shellVariableMarker}{PGID_VALUE}" -- "${shellVariableMarker}{STATE_DIRECTORY}"`,
      'while IFS= read -r writable_path; do',
      `  [ -n "${shellVariableMarker}{writable_path}" ] || continue`,
      `  case "${shellVariableMarker}{writable_path}" in`,
      '    /*) ;;',
      `    *) nova_log ERROR init "Writable path must be absolute: ${shellVariableMarker}{writable_path}"; exit 1 ;;`,
      '  esac',
      `  case "${shellVariableMarker}{writable_path}" in`,
      `    /|${protectedWritablePatterns}|*/../*|*/./*)`,
      `      nova_log ERROR init "Unsafe writable path: ${shellVariableMarker}{writable_path}"`,
      '      exit 1',
      '      ;;',
      '  esac',
      `  mkdir -p -- "${shellVariableMarker}{writable_path}"`,
      `  chown "${shellVariableMarker}{PUID_VALUE}:${shellVariableMarker}{PGID_VALUE}" -- "${shellVariableMarker}{writable_path}"`,
      'done < /etc/nova-docker/writable-paths',
      '',
      `chmod 0700 "${shellVariableMarker}{STATE_DIRECTORY}/keys"`,
      `find "${shellVariableMarker}{STATE_DIRECTORY}/keys" -type f -exec chmod 0600 {} +`,
      'ENVIRONMENT_FILE=/run/nova-docker/environment',
      `ENVIRONMENT_TEMP="${shellVariableMarker}{ENVIRONMENT_FILE}.tmp.${shellVariableMarker}${shellVariableMarker}"`,
      'umask 077',
      '{',
      `  printf 'export NOVA_STATE_DIRECTORY=%s${shellNewline}' "${shellVariableMarker}{STATE_DIRECTORY}"`,
      `  printf 'export NOVA_KEYS_DIRECTORY=%s/keys${shellNewline}' "${shellVariableMarker}{STATE_DIRECTORY}"`,
      `  printf 'export NOVA_INSTALLATION_KEY_FILE=%s/keys/installation.key${shellNewline}' "${shellVariableMarker}{STATE_DIRECTORY}"`,
      `  printf 'export NOVA_DATABASE_DIRECTORY=%s/database${shellNewline}' "${shellVariableMarker}{STATE_DIRECTORY}"`,
      ...((manifest['stateEnvironment'] === undefined) ? [] : [`  printf 'export ${manifest['stateEnvironment']}=%s${shellNewline}' "${shellVariableMarker}{STATE_DIRECTORY}"`]),
      `} > "${shellVariableMarker}{ENVIRONMENT_TEMP}"`,
      `chmod 0600 "${shellVariableMarker}{ENVIRONMENT_TEMP}"`,
      `mv -- "${shellVariableMarker}{ENVIRONMENT_TEMP}" "${shellVariableMarker}{ENVIRONMENT_FILE}"`,
      'if [ -d /run/s6/container_environment ]; then',
      '  umask 022',
      `  printf '%s' "${shellVariableMarker}{STATE_DIRECTORY}" > /run/s6/container_environment/NOVA_STATE_DIRECTORY`,
      `  printf '%s/keys' "${shellVariableMarker}{STATE_DIRECTORY}" > /run/s6/container_environment/NOVA_KEYS_DIRECTORY`,
      `  printf '%s/keys/installation.key' "${shellVariableMarker}{STATE_DIRECTORY}" > /run/s6/container_environment/NOVA_INSTALLATION_KEY_FILE`,
      `  printf '%s/database' "${shellVariableMarker}{STATE_DIRECTORY}" > /run/s6/container_environment/NOVA_DATABASE_DIRECTORY`,
      ...((manifest['stateEnvironment'] === undefined) ? [] : [`  printf '%s' "${shellVariableMarker}{STATE_DIRECTORY}" > /run/s6/container_environment/${manifest['stateEnvironment']}`]),
      '  umask 077',
      'fi',
      `nova_log INFO init "Using ${shellVariableMarker}{STATE_DIRECTORY} for app state."`,
      `nova_log INFO init "Initialized app state ownership for UID ${shellVariableMarker}{PUID_VALUE} and GID ${shellVariableMarker}{PGID_VALUE}."`,
      '',
    ].join('\n');
  }

  /**
   * Lib - Docker Packaging - Build Healthcheck.
   *
   * Renders aggregate supervision and application health checks with a stable
   * project-specific override path.
   *
   * @param {Lib_DockerPackaging_Runner_BuildHealthcheck_Manifest} manifest - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildHealthcheck_Returns}
   *
   * @since 0.34.0
   */

  private static buildHealthcheck(manifest: Lib_DockerPackaging_Runner_BuildHealthcheck_Manifest): Lib_DockerPackaging_Runner_BuildHealthcheck_Returns {
    const lines: Lib_DockerPackaging_Runner_BuildHealthcheck_Lines = [
      '#!/bin/sh',
      'set -eu',
      '. /usr/local/libexec/nova-docker/log',
      'if [ -f /run/nova-docker/environment ]; then',
      '  . /run/nova-docker/environment',
      'fi',
      'if [ -x /etc/nova-docker/healthcheck ]; then',
      '  exec /etc/nova-docker/healthcheck',
      'fi',
    ];
    const longrunServices: Lib_DockerPackaging_Runner_BuildHealthcheck_LongrunServices = manifest['services'].filter((service) => service['kind'] === 'longrun');
    const healthService: Lib_DockerPackaging_Runner_BuildHealthcheck_HealthService = longrunServices.find((service) => ((manifest['healthService'] === undefined) ? service['port'] !== undefined : service['name'] === manifest['healthService']));
    const healthPort: Lib_DockerPackaging_Runner_BuildHealthcheck_HealthPort = (healthService === undefined) ? undefined : healthService['port'];
    const shellVariableMarker: Lib_DockerPackaging_Runner_BuildHealthcheck_ShellVariableMarker = '$';

    for (const service of longrunServices) {
      lines.push(
        `service_status="$(/command/s6-svstat -o up /run/service/${service['name']} 2>/dev/null || true)"`,
        `if [ "${shellVariableMarker}{service_status}" != true ]; then`,
        `  nova_log ERROR healthcheck 's6 service ${service['name']} is down.'`,
        '  exit 1',
        'fi',
      );
    }

    if (healthPort !== undefined) {
      lines.push(
        `if ! http_status="$(curl --silent --output /dev/null --write-out '%{http_code}' --max-time 4 --request GET "http://127.0.0.1:${healthPort}${manifest['healthPath']}")"; then`,
        `  nova_log ERROR healthcheck 'GET ${manifest['healthPath']} failed.'`,
        '  exit 1',
        'fi',
        `case "${shellVariableMarker}{http_status}" in`,
        '  2??) ;;',
        '  *)',
        `    nova_log ERROR healthcheck "GET ${manifest['healthPath']} returned HTTP \${http_status}."`,
        '    exit 1',
        '    ;;',
        'esac',
      );
    }

    lines.push('exit 0');

    return `${lines.join('\n')}\n`;
  }

  /**
   * Lib - Docker Packaging - Plan Image.
   *
   * Computes the content of every Nova-owned Docker file without writing it. The
   * scaffold and the sync-image recipe both apply this plan, so they cannot disagree.
   *
   * @param {Lib_DockerPackaging_Runner_PlanImage_ProjectDirectory} projectDirectory - Project directory.
   * @param {Lib_DockerPackaging_Runner_PlanImage_Manifest}         manifest         - Manifest.
   * @param {Lib_DockerPackaging_Runner_PlanImage_RootPackage}      rootPackage      - Root package.
   * @param {Lib_DockerPackaging_Runner_PlanImage_NovaConfig}       novaConfig       - Nova config.
   * @param {Lib_DockerPackaging_Runner_PlanImage_IgnoreFileEntry}  ignoreFileEntry  - Ignore file entry.
   * @param {Lib_DockerPackaging_Runner_PlanImage_ProjectSlug}      projectSlug      - Project slug.
   * @param {Lib_DockerPackaging_Runner_PlanImage_IncludeManifest}  includeManifest  - Include manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_PlanImage_Returns}
   *
   * @since 0.49.0
   */
  private static async planImage(projectDirectory: Lib_DockerPackaging_Runner_PlanImage_ProjectDirectory, manifest: Lib_DockerPackaging_Runner_PlanImage_Manifest, rootPackage: Lib_DockerPackaging_Runner_PlanImage_RootPackage, novaConfig: Lib_DockerPackaging_Runner_PlanImage_NovaConfig, ignoreFileEntry: Lib_DockerPackaging_Runner_PlanImage_IgnoreFileEntry, projectSlug: Lib_DockerPackaging_Runner_PlanImage_ProjectSlug, includeManifest: Lib_DockerPackaging_Runner_PlanImage_IncludeManifest): Lib_DockerPackaging_Runner_PlanImage_Returns {
    const assemblyDirectory: Lib_DockerPackaging_Runner_PlanImage_AssemblyDirectory = join(projectDirectory, dockerAssemblyRelativePath);
    const assemblyPackagePath: Lib_DockerPackaging_Runner_PlanImage_AssemblyPackagePath = join(assemblyDirectory, 'package.json');
    const dockerignorePath: Lib_DockerPackaging_Runner_PlanImage_DockerignorePath = join(projectDirectory, '.dockerignore');
    const workspacePackages: Lib_DockerPackaging_Runner_PlanImage_WorkspacePackages = await Runner.collectWorkspacePackages(projectDirectory, manifest);
    const buildOrder: Lib_DockerPackaging_Runner_PlanImage_BuildOrder = Runner.resolveBuildOrder(manifest, workspacePackages);
    const inputs: Lib_DockerPackaging_Runner_PlanImage_Inputs = await Promise.all([
      Runner.readStageFragments(assemblyDirectory, manifest),
      renderIgnoreFile('./.dockerignore', ignoreFileEntry),
      Runner.readOptionalFile(assemblyPackagePath),
      Runner.readOptionalFile(dockerignorePath),
    ]);
    const stageFragments: Lib_DockerPackaging_Runner_PlanImage_StageFragments = inputs[0];
    const dockerignoreHeader: Lib_DockerPackaging_Runner_PlanImage_DockerignoreHeader = buildGeneratedFileHeader({
      command: 'nova generate must-haves ignore-files',
      docsSlug: 'cli/generators/must-haves/ignore-files',
      mode: 'strict',
      targetPath: dockerignorePath,
    });
    const packageManagerDescriptor: Lib_DockerPackaging_Runner_PlanImage_PackageManagerDescriptor = LibCorepack.parsePackageManager(rootPackage['packageManager']);
    const isYarnBerry: Lib_DockerPackaging_Runner_PlanImage_IsYarnBerry = (
      packageManagerDescriptor !== undefined
      && packageManagerDescriptor['name'] === 'yarn'
      && packageManagerDescriptor['version'].startsWith('1.') === false
    );
    const isNovaBuildEnabled: Lib_DockerPackaging_Runner_PlanImage_IsNovaBuildEnabled = manifest['build'] === undefined || manifest['build']['enabled'] !== false;
    const generatedHeader: Lib_DockerPackaging_Runner_PlanImage_GeneratedHeader = LibDockerRender.generatedHeader([]);
    const pnpmWorkspaceLines: Lib_DockerPackaging_Runner_PlanImage_PnpmWorkspaceLines = [
      ...generatedHeader,
      '',
      'packages:',
      ...[...buildOrder.values()].map((workspacePackage) => `  - '${workspacePackage['path']}'`),
      '',
    ];
    const renderInput: Lib_DockerPackaging_Runner_PlanImage_RenderInput = {
      buildOrder,
      manifest,
      novaConfig,
      rootPackage,
      stageFragments,
    };
    const plan: Lib_DockerPackaging_Runner_PlanImage_Plan = new Map();

    plan.set(join(projectDirectory, 'Dockerfile'), {
      content: LibDockerRender.renderDockerfile(renderInput),
      executable: false,
      report: true,
    });
    plan.set(join(projectDirectory, 'compose.yml'), {
      content: LibDockerRender.renderCompose(manifest),
      executable: false,
      report: true,
    });

    // The ignore-files generator owns ".dockerignore", so only the scaffold seeds it, once, with the same output.
    if (includeManifest === true && inputs[3] === undefined) {
      plan.set(dockerignorePath, {
        content: `${dockerignoreHeader}${inputs[1]}`,
        executable: false,
        report: true,
      });
    }

    plan.set(join(assemblyDirectory, 'build-package.json'), {
      content: `${JSON.stringify(Runner.buildContainerPackage(rootPackage, `${projectSlug}-tool-docker`, buildOrder), null, 2)}\n`,
      executable: false,
      report: true,
    });

    // Only the scaffold creates the assembly package, and only once. After that the package-json recipes own it.
    if (includeManifest === true && inputs[2] === undefined) {
      plan.set(assemblyPackagePath, {
        content: `${JSON.stringify(Runner.buildAssemblyPackage(projectSlug), null, 2)}\n`,
        executable: false,
        report: true,
      });
    }

    // Only Nova's own build stage reads these package-manager files, so an image without it gets neither.
    if (isNovaBuildEnabled === true) {
      plan.set(join(assemblyDirectory, 'pnpm-workspace.yaml'), {
        content: pnpmWorkspaceLines.join('\n'),
        executable: false,
        report: true,
      });
    }

    if (
      isNovaBuildEnabled === true
      && isYarnBerry === true
    ) {
      plan.set(join(assemblyDirectory, 'yarnrc.yml'), {
        content: [
          ...generatedHeader,
          '',
          'enableGlobalCache: false',
          'nodeLinker: pnp',
          'pnpEnableEsmLoader: true',
          '',
        ].join('\n'),
        executable: false,
        report: true,
      });
    }

    if (LibDockerRender.usesSyntheticManifests(manifest, rootPackage) === true) {
      for (const workspacePackage of buildOrder.values()) {
        plan.set(join(assemblyDirectory, 'workspace-manifests', workspacePackage['path'], 'package.json'), {
          content: `${JSON.stringify(Runner.buildSyntheticWorkspacePackage(workspacePackage['packageJson'], buildOrder), null, 2)}\n`,
          executable: false,
          report: true,
        });
      }
    }

    if (includeManifest === true) {
      plan.set(join(assemblyDirectory, 'manifest.json'), {
        content: `${JSON.stringify(manifest, null, 2)}\n`,
        executable: false,
        report: true,
      });
    }

    for (const rootfsEntry of Runner.renderRootfs(manifest)) {
      plan.set(join(assemblyDirectory, 'rootfs', ...rootfsEntry[0].split('/')), rootfsEntry[1]);
    }

    return plan;
  }

  /**
   * Lib - Docker Packaging - Apply Image Plan.
   *
   * Compares the plan with the files on disk, then writes changed files and
   * deletes only stale files Nova generated before, tracked in "generated-files.json".
   *
   * @param {Lib_DockerPackaging_Runner_ApplyImagePlan_ProjectDirectory} projectDirectory - Project directory.
   * @param {Lib_DockerPackaging_Runner_ApplyImagePlan_ImagePlan}        imagePlan        - Image plan.
   * @param {Lib_DockerPackaging_Runner_ApplyImagePlan_IsDryRun}         isDryRun         - Is dry run.
   * @param {Lib_DockerPackaging_Runner_ApplyImagePlan_IsReplaceFile}    isReplaceFile    - Is replace file.
   * @param {Lib_DockerPackaging_Runner_ApplyImagePlan_IsReportFiles}    isReportFiles    - Is report files.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_ApplyImagePlan_Returns}
   *
   * @since 0.49.0
   */
  private static async applyImagePlan(projectDirectory: Lib_DockerPackaging_Runner_ApplyImagePlan_ProjectDirectory, imagePlan: Lib_DockerPackaging_Runner_ApplyImagePlan_ImagePlan, isDryRun: Lib_DockerPackaging_Runner_ApplyImagePlan_IsDryRun, isReplaceFile: Lib_DockerPackaging_Runner_ApplyImagePlan_IsReplaceFile, isReportFiles: Lib_DockerPackaging_Runner_ApplyImagePlan_IsReportFiles): Lib_DockerPackaging_Runner_ApplyImagePlan_Returns {
    const assemblyDirectory: Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyDirectory = join(projectDirectory, dockerAssemblyRelativePath);
    const rootfsDirectory: Lib_DockerPackaging_Runner_ApplyImagePlan_RootfsDirectory = join(assemblyDirectory, 'rootfs');
    const workspaceManifestsDirectory: Lib_DockerPackaging_Runner_ApplyImagePlan_WorkspaceManifestsDirectory = join(assemblyDirectory, 'workspace-manifests');
    const yarnConfigPath: Lib_DockerPackaging_Runner_ApplyImagePlan_YarnConfigPath = join(assemblyDirectory, 'yarnrc.yml');
    const recordPath: Lib_DockerPackaging_Runner_ApplyImagePlan_RecordPath = join(assemblyDirectory, dockerGeneratedFilesRecord);

    /**
     * Lib - Docker Packaging - Apply Image Plan - Is Owned Path.
     *
     * Reports whether a path sits in a tree Nova regenerates, so a stale copy
     * of it can be deleted. Every other path belongs to the project.
     *
     * @param {Lib_DockerPackaging_Runner_ApplyImagePlan_IsOwnedPath_TargetPath} targetPath - Target path.
     *
     * @returns {Lib_DockerPackaging_Runner_ApplyImagePlan_IsOwnedPath_Returns}
     *
     * @since 0.49.0
     */
    const isOwnedPath: Lib_DockerPackaging_Runner_ApplyImagePlan_IsOwnedPath = (targetPath): Lib_DockerPackaging_Runner_ApplyImagePlan_IsOwnedPath_Returns => (
      targetPath === yarnConfigPath
      || targetPath.startsWith(`${rootfsDirectory}${sep}`) === true
      || targetPath.startsWith(`${workspaceManifestsDirectory}${sep}`) === true
    );
    const recordContent: Lib_DockerPackaging_Runner_ApplyImagePlan_RecordContent = await Runner.readOptionalFile(recordPath);
    const recordValue: Lib_DockerPackaging_Runner_ApplyImagePlan_RecordValue = (recordContent === undefined) ? {} : await Runner.readJsonObject(recordPath);
    const recordFiles: Lib_DockerPackaging_Runner_ApplyImagePlan_RecordFiles = (Array.isArray(recordValue['files']) === true) ? recordValue['files'] : [];
    const previousOwnedPaths: Lib_DockerPackaging_Runner_ApplyImagePlan_PreviousOwnedPaths = new Set();

    for (const recordFile of recordFiles) {
      if (typeof recordFile !== 'string' || recordFile.split('/').includes('..') === true) {
        continue;
      }

      const recordedPath: Lib_DockerPackaging_Runner_ApplyImagePlan_RecordedPath = join(assemblyDirectory, ...recordFile.split('/'));

      if (isOwnedPath(recordedPath) === true) {
        previousOwnedPaths.add(recordedPath);
      }
    }

    const plan: Lib_DockerPackaging_Runner_ApplyImagePlan_Plan = new Map(imagePlan);
    const ownedFiles: Lib_DockerPackaging_Runner_ApplyImagePlan_OwnedFiles = [...plan.keys()]
      .filter((plannedPath) => isOwnedPath(plannedPath) === true)
      .map((plannedPath) => relative(assemblyDirectory, plannedPath).split(sep).join('/'))
      .sort((firstPath, secondPath) => firstPath.localeCompare(secondPath));

    plan.set(recordPath, {
      content: `${JSON.stringify({ files: ownedFiles }, null, 2)}\n`,
      executable: false,
      report: false,
    });

    const plannedEntries: Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedEntries = [...plan.entries()];
    const discovered: Lib_DockerPackaging_Runner_ApplyImagePlan_Discovered = await Promise.all([
      Promise.all(plannedEntries.map((plannedEntry) => Runner.readOptionalFile(plannedEntry[0]))),
      Runner.listFiles(rootfsDirectory),
      Runner.listFiles(workspaceManifestsDirectory),
      Runner.readOptionalFile(yarnConfigPath),
    ]);
    const currentContents: Lib_DockerPackaging_Runner_ApplyImagePlan_CurrentContents = discovered[0];
    const rootfsFiles: Lib_DockerPackaging_Runner_ApplyImagePlan_RootfsFiles = discovered[1];
    const changes: Lib_DockerPackaging_Runner_ApplyImagePlan_Changes = [];

    for (let i = 0; i < plannedEntries.length; i += 1) {
      const plannedEntry: Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedEntry = plannedEntries[i];
      const currentContent: Lib_DockerPackaging_Runner_ApplyImagePlan_CurrentContent = currentContents[i];

      if (plannedEntry === undefined) {
        continue;
      }

      const lineChanges: Lib_DockerPackaging_Runner_ApplyImagePlan_LineChanges = Runner.countLineChanges(currentContent ?? '', plannedEntry[1]['content']);
      let status: Lib_DockerPackaging_Runner_ApplyImagePlan_Status = 'update';

      if (currentContent === undefined) {
        status = 'create';
      } else if (currentContent === plannedEntry[1]['content']) {
        status = 'unchanged';
      }

      changes.push({
        added: (currentContent === undefined) ? plannedEntry[1]['content'].split('\n').length : lineChanges['added'],
        path: relative(projectDirectory, plannedEntry[0]).split(sep).join('/'),
        removed: lineChanges['removed'],
        status,
      });
    }

    // Workspace manifests and the Berry config are wholly Nova's; in rootfs only recorded files are.
    const stalePaths: Lib_DockerPackaging_Runner_ApplyImagePlan_StalePaths = [...new Set([
      ...rootfsFiles.filter((rootfsFile) => previousOwnedPaths.has(rootfsFile) === true),
      ...discovered[2],
      ...((discovered[3] === undefined) ? [] : [yarnConfigPath]),
    ])].filter((stalePath) => plan.has(stalePath) === false);
    const staleContents: Lib_DockerPackaging_Runner_ApplyImagePlan_StaleContents = await Promise.all(stalePaths.map((stalePath) => Runner.readOptionalFile(stalePath)));

    for (let i = 0; i < stalePaths.length; i += 1) {
      const staleContent: Lib_DockerPackaging_Runner_ApplyImagePlan_StaleContent = staleContents[i] ?? '';

      changes.push({
        added: 0,
        path: relative(projectDirectory, stalePaths[i] ?? '').split(sep).join('/'),
        removed: staleContent.split('\n').length,
        status: 'delete',
      });
    }

    changes.sort((firstChange, secondChange) => firstChange['path'].localeCompare(secondChange['path']));

    const unownedFiles: Lib_DockerPackaging_Runner_ApplyImagePlan_UnownedFiles = rootfsFiles
      .filter((rootfsFile) => plan.has(rootfsFile) === false && previousOwnedPaths.has(rootfsFile) === false)
      .map((rootfsFile) => relative(projectDirectory, rootfsFile).split(sep).join('/'));
    const assemblyPackagePath: Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyPackagePath = join(assemblyDirectory, 'package.json');
    const plannedAssemblyPackage: Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedAssemblyPackage = plan.get(assemblyPackagePath);
    const assemblyPackageContent: Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyPackageContent = (plannedAssemblyPackage === undefined) ? await Runner.readOptionalFile(assemblyPackagePath) : plannedAssemblyPackage['content'];
    const assemblyPackageValue: Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyPackageValue = (assemblyPackageContent === undefined) ? undefined : JSON.parse(assemblyPackageContent);
    const assemblyScriptsValue: Lib_DockerPackaging_Runner_ApplyImagePlan_AssemblyScriptsValue = (isPlainObject(assemblyPackageValue) === true) ? assemblyPackageValue['scripts'] : undefined;

    // The package-json recipes own "packages/docker/package.json", so missing image scripts are only reported.
    const missingScripts: Lib_DockerPackaging_Runner_ApplyImagePlan_MissingScripts = [
      'check',
      'build',
    ].filter((scriptName) => (
      (isPlainObject(assemblyScriptsValue) === true) ? Reflect.has(assemblyScriptsValue, scriptName) === false : true
    ));

    if (isDryRun === true) {
      return {
        changes,
        missingScripts,
        unownedFiles,
      };
    }

    await Promise.all(plannedEntries.map(async (plannedEntry, plannedIndex) => {
      const plannedFile: Lib_DockerPackaging_Runner_ApplyImagePlan_PlannedFile = plannedEntry[1];

      if (currentContents[plannedIndex] !== plannedFile['content']) {
        if (plannedFile['report'] === true) {
          await saveGeneratedFile(plannedEntry[0], plannedFile['content'], isReplaceFile, undefined, isReportFiles);
        } else {
          await fs.mkdir(dirname(plannedEntry[0]), { recursive: true });

          await fs.writeFile(plannedEntry[0], plannedFile['content'], 'utf-8');
        }
      }

      if (plannedFile['executable'] === true) {
        await fs.chmod(plannedEntry[0], parseInt('755', 8));
      }

      return;
    }));

    await Promise.all(stalePaths.map(async (stalePath) => {
      await fs.rm(stalePath, { force: true });

      await Runner.removeEmptyParents(dirname(stalePath), assemblyDirectory);

      return;
    }));

    return {
      changes,
      missingScripts,
      unownedFiles,
    };
  }

  /**
   * Lib - Docker Packaging - Read Stage Fragments.
   *
   * Loads the Dockerfile fragment of every declared project stage from its file
   * inside packages/docker and fails when one is missing.
   *
   * @param {Lib_DockerPackaging_Runner_ReadStageFragments_AssemblyDirectory} assemblyDirectory - Assembly directory.
   * @param {Lib_DockerPackaging_Runner_ReadStageFragments_Manifest}          manifest          - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_ReadStageFragments_Returns}
   *
   * @since 0.49.0
   */
  private static async readStageFragments(assemblyDirectory: Lib_DockerPackaging_Runner_ReadStageFragments_AssemblyDirectory, manifest: Lib_DockerPackaging_Runner_ReadStageFragments_Manifest): Lib_DockerPackaging_Runner_ReadStageFragments_Returns {
    const stages: Lib_DockerPackaging_Runner_ReadStageFragments_Stages = (manifest['dockerfile'] === undefined) ? [] : manifest['dockerfile']['stages'] ?? [];
    const contents: Lib_DockerPackaging_Runner_ReadStageFragments_Contents = await Promise.all(stages.map((stage) => Runner.readOptionalFile(join(assemblyDirectory, ...stage['file'].split('/')))));
    const fragments: Lib_DockerPackaging_Runner_ReadStageFragments_Fragments = new Map();

    for (let i = 0; i < stages.length; i += 1) {
      const stage: Lib_DockerPackaging_Runner_ReadStageFragments_Stage = stages[i];
      const content: Lib_DockerPackaging_Runner_ReadStageFragments_Content = contents[i];

      if (stage === undefined) {
        continue;
      }

      if (content === undefined) {
        throw new Error(`Docker stage "${stage['name']}" fragment "packages/docker/${stage['file']}" was not found.`);
      }

      fragments.set(stage['name'], content);
    }

    return fragments;
  }

  /**
   * Lib - Docker Packaging - List Files.
   *
   * Lists every file below one directory, or nothing when the directory does
   * not exist, so stale and unowned rootfs files can be found.
   *
   * @param {Lib_DockerPackaging_Runner_ListFiles_Directory} directory - Directory.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_ListFiles_Returns}
   *
   * @since 0.49.0
   */
  private static async listFiles(directory: Lib_DockerPackaging_Runner_ListFiles_Directory): Lib_DockerPackaging_Runner_ListFiles_Returns {
    if (await pathExists(directory) === false) {
      return [];
    }

    const entries: Lib_DockerPackaging_Runner_ListFiles_Entries = await fs.readdir(directory, {
      recursive: true,
      withFileTypes: true,
    });

    return entries
      .filter((entry) => entry.isFile() === true)
      .map((entry) => join(entry.parentPath, entry.name))
      .sort((firstPath, secondPath) => firstPath.localeCompare(secondPath));
  }

  /**
   * Lib - Docker Packaging - Read Optional File.
   *
   * Reads one file as text, or returns undefined when it does not exist, so
   * the plan can tell a new file from a changed one.
   *
   * @param {Lib_DockerPackaging_Runner_ReadOptionalFile_TargetPath} targetPath - Target path.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_ReadOptionalFile_Returns}
   *
   * @since 0.49.0
   */
  private static async readOptionalFile(targetPath: Lib_DockerPackaging_Runner_ReadOptionalFile_TargetPath): Lib_DockerPackaging_Runner_ReadOptionalFile_Returns {
    try {
      return await fs.readFile(targetPath, 'utf-8');
    } catch {
      return undefined;
    }
  }

  /**
   * Lib - Docker Packaging - Remove Empty Parents.
   *
   * Removes a folder left empty by a stale file and walks up until it reaches a
   * folder that still has content or the assembly workspace itself.
   *
   * @param {Lib_DockerPackaging_Runner_RemoveEmptyParents_Directory}     directory     - Directory.
   * @param {Lib_DockerPackaging_Runner_RemoveEmptyParents_StopDirectory} stopDirectory - Stop directory.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_RemoveEmptyParents_Returns}
   *
   * @since 0.49.0
   */
  private static async removeEmptyParents(directory: Lib_DockerPackaging_Runner_RemoveEmptyParents_Directory, stopDirectory: Lib_DockerPackaging_Runner_RemoveEmptyParents_StopDirectory): Lib_DockerPackaging_Runner_RemoveEmptyParents_Returns {
    if (directory === stopDirectory || directory.startsWith(`${stopDirectory}${sep}`) === false) {
      return;
    }

    try {
      await fs.rmdir(directory);
    } catch {
      return;
    }

    await Runner.removeEmptyParents(dirname(directory), stopDirectory);

    return;
  }

  /**
   * Lib - Docker Packaging - Count Line Changes.
   *
   * Counts the lines added and removed between two file versions with a longest
   * common subsequence, for the sync-image dry-run summary.
   *
   * @param {Lib_DockerPackaging_Runner_CountLineChanges_Before} before - Before.
   * @param {Lib_DockerPackaging_Runner_CountLineChanges_After}  after  - After.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_CountLineChanges_Returns}
   *
   * @since 0.49.0
   */
  private static countLineChanges(before: Lib_DockerPackaging_Runner_CountLineChanges_Before, after: Lib_DockerPackaging_Runner_CountLineChanges_After): Lib_DockerPackaging_Runner_CountLineChanges_Returns {
    const beforeLines: Lib_DockerPackaging_Runner_CountLineChanges_BeforeLines = before.split('\n');
    const afterLines: Lib_DockerPackaging_Runner_CountLineChanges_AfterLines = after.split('\n');
    const lengths: Lib_DockerPackaging_Runner_CountLineChanges_Lengths = new Array(afterLines.length + 1).fill(0);

    for (const beforeLine of beforeLines) {
      let diagonal: Lib_DockerPackaging_Runner_CountLineChanges_Diagonal = 0;

      for (let j = 0; j < afterLines.length; j += 1) {
        const above: Lib_DockerPackaging_Runner_CountLineChanges_Above = lengths[j + 1] ?? 0;

        Reflect.set(lengths, j + 1, (beforeLine === afterLines[j]) ? diagonal + 1 : Math.max(above, lengths[j] ?? 0));

        diagonal = above;
      }
    }

    const common: Lib_DockerPackaging_Runner_CountLineChanges_Common = lengths[afterLines.length] ?? 0;

    return {
      added: afterLines.length - common,
      removed: beforeLines.length - common,
    };
  }

  /**
   * Lib - Docker Packaging - Resolve Ignore File Entry.
   *
   * Returns the configured ".dockerignore" bundles and patterns, or Nova's
   * default bundle when the project has not configured the file.
   *
   * @param {Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_NovaConfig} novaConfig - Nova config.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_Returns}
   *
   * @since 0.49.0
   */
  private static resolveIgnoreFileEntry(novaConfig: Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_NovaConfig): Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_Returns {
    const ignoreFilesValue: Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_IgnoreFilesValue = novaConfig['ignoreFiles'];
    const configuredIgnoreFileEntry: Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_ConfiguredIgnoreFileEntry = (isPlainObject(ignoreFilesValue) === true) ? ignoreFilesValue['./.dockerignore'] : undefined;

    if (isPlainObject(configuredIgnoreFileEntry) === true) {
      return configuredIgnoreFileEntry as Lib_DockerPackaging_Runner_ResolveIgnoreFileEntry_Returns;
    }

    return {
      bundles: ['nova'],
      patterns: [],
    };
  }

  /**
   * Lib - Docker Packaging - Validate Service Graph.
   *
   * Rejects unknown, self, and cyclic service dependencies before any file is
   * written, because native s6-rc cannot compile such a database.
   *
   * @param {Lib_DockerPackaging_Runner_ValidateServiceGraph_Manifest} manifest - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_ValidateServiceGraph_Returns}
   *
   * @since 0.49.0
   */
  private static validateServiceGraph(manifest: Lib_DockerPackaging_Runner_ValidateServiceGraph_Manifest): Lib_DockerPackaging_Runner_ValidateServiceGraph_Returns {
    const availableServiceNames: Lib_DockerPackaging_Runner_ValidateServiceGraph_AvailableServiceNames = new Set(manifest['services'].map((service) => service['name']));

    for (const service of manifest['services']) {
      for (const dependency of service['dependencies']) {
        if (availableServiceNames.has(dependency) === false) {
          throw new Error(`Docker service "${service['name']}" depends on unknown service "${dependency}".`);
        }

        if (dependency === service['name']) {
          throw new Error(`Docker service "${service['name']}" cannot depend on itself.`);
        }
      }
    }

    const servicesByName: Lib_DockerPackaging_Runner_ValidateServiceGraph_ServicesByName = new Map(manifest['services'].map((service) => [
      service['name'],
      service,
    ]));
    const visitedServices: Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitedServices = new Set();
    const visitingServices: Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitingServices = new Set();

    /**
     * Lib - Docker Packaging - Validate Service Graph - Visit Service.
     *
     * Validates one service dependency branch before generated files are written
     * and rejects cycles that native s6-rc cannot compile.
     *
     * @param {Lib_DockerPackaging_String} serviceName - Service name.
     *
     * @returns {void}
     *
     * @since 0.34.0
     */
    const visitService: Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitService = (serviceName) => {
      if (visitedServices.has(serviceName) === true) {
        return;
      }

      if (visitingServices.has(serviceName) === true) {
        throw new Error(`Docker service dependency cycle includes "${serviceName}".`);
      }

      const service: Lib_DockerPackaging_Runner_ValidateServiceGraph_VisitService_Service = servicesByName.get(serviceName);

      if (service === undefined) {
        return;
      }

      visitingServices.add(serviceName);

      for (const dependency of service['dependencies']) {
        visitService(dependency);
      }

      visitingServices.delete(serviceName);

      visitedServices.add(serviceName);

      return;
    };

    for (const service of manifest['services']) {
      visitService(service['name']);
    }

    return;
  }

  /**
   * Lib - Docker Packaging - Build Assembly Package.
   *
   * Builds the private Docker assembly package the scaffold creates once. After
   * that the package-json recipes own the file, so it is never rewritten here.
   *
   * @param {Lib_DockerPackaging_Runner_BuildAssemblyPackage_Slug} slug - Slug.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildAssemblyPackage_Returns}
   *
   * @since 0.49.0
   */
  private static buildAssemblyPackage(slug: Lib_DockerPackaging_Runner_BuildAssemblyPackage_Slug): Lib_DockerPackaging_Runner_BuildAssemblyPackage_Returns {
    return {
      name: `${slug}-tool-docker`,
      private: true,
      scripts: {
        check: 'docker build --check --file ../../Dockerfile ../..',
        build: 'docker compose --file ../../compose.yml --project-directory ../.. build',
      },
      type: 'module',
      version: '0.0.0',
    };
  }

  /**
   * Lib - Docker Packaging - Build Container Package.
   *
   * Produces a synthetic build-root manifest with only selected workspaces and their
   * internal closure so installation cannot pull unrelated repository workspaces.
   *
   * @param {Lib_DockerPackaging_JsonObject}                    rootPackage         - Root package.
   * @param {Lib_DockerPackaging_String}                        assemblyPackageName - Assembly package name.
   * @param {Lib_DockerPackaging_Runner_WorkspacePackages}      buildOrder          - Build order.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_JsonObject}
   *
   * @since 0.34.0
   */
  private static buildContainerPackage(rootPackage: Lib_DockerPackaging_Runner_BuildContainerPackage_RootPackage, assemblyPackageName: Lib_DockerPackaging_Runner_BuildContainerPackage_AssemblyPackageName, buildOrder: Lib_DockerPackaging_Runner_BuildContainerPackage_BuildOrder): Lib_DockerPackaging_Runner_BuildContainerPackage_Returns {
    const containerPackage: Lib_DockerPackaging_Runner_BuildContainerPackage_ContainerPackage = {
      name: `${assemblyPackageName}-build`,
      private: true,
      version: '0.0.0',
      workspaces: [...buildOrder.values()].map((workspacePackage) => workspacePackage['path']),
    };

    for (const inheritedField of [
      'allowScripts',
      'engines',
      'overrides',
      'packageManager',
      'resolutions',
    ]) {
      const inheritedValue: Lib_DockerPackaging_Runner_BuildContainerPackage_InheritedValue = rootPackage[inheritedField];

      if (inheritedValue !== undefined) {
        Reflect.set(containerPackage, inheritedField, inheritedValue);
      }
    }

    return containerPackage;
  }

  /**
   * Lib - Docker Packaging - Build Root Package.
   *
   * Registers the assembly workspace and root container deploy dispatcher while
   * preserving the project's existing workspace representation.
   *
   * @param {Lib_DockerPackaging_Runner_BuildRootPackage_RootPackage}         rootPackage         - Root package.
   * @param {Lib_DockerPackaging_Runner_BuildRootPackage_AssemblyPackageName} assemblyPackageName - Assembly package name.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildRootPackage_Returns}
   *
   * @since 0.34.0
   */

  private static buildRootPackage(rootPackage: Lib_DockerPackaging_Runner_BuildRootPackage_RootPackage, assemblyPackageName: Lib_DockerPackaging_Runner_BuildRootPackage_AssemblyPackageName): Lib_DockerPackaging_Runner_BuildRootPackage_Returns {
    const scriptsValue: Lib_DockerPackaging_Runner_BuildRootPackage_ScriptsValue = rootPackage['scripts'];
    const scripts: Lib_DockerPackaging_Runner_BuildRootPackage_Scripts = {};

    if (scriptsValue !== undefined && isPlainObject(scriptsValue) === false) {
      throw new Error('The root package.json scripts field must contain an object.');
    }

    if (isPlainObject(scriptsValue) === true) {
      for (const scriptEntry of Object.entries(scriptsValue)) {
        if (typeof scriptEntry[1] !== 'string') {
          throw new Error('Every root package.json script must be a string.');
        }

        Reflect.set(scripts, scriptEntry[0], scriptEntry[1]);
      }
    }

    Reflect.set(rootPackage, 'scripts', Runner.mergeScripts(scripts));

    const workspacesValue: Lib_DockerPackaging_Runner_BuildRootPackage_WorkspacesValue = rootPackage['workspaces'];
    let isCovered: Lib_DockerPackaging_Runner_BuildRootPackage_IsCovered = false;

    if (Array.isArray(workspacesValue) === true) {
      for (const workspacePattern of workspacesValue) {
        const isDockerWorkspace: Lib_DockerPackaging_Runner_BuildRootPackage_IsDockerWorkspace = workspacePattern === dockerAssemblyRelativePath || workspacePattern === dockerConfigWorkspacePath;
        const isPackagesWildcard: Lib_DockerPackaging_Runner_BuildRootPackage_IsPackagesWildcard = workspacePattern === 'packages/*' || workspacePattern === './packages/*';

        if (isDockerWorkspace === true || isPackagesWildcard === true) {
          isCovered = true;
        }
      }

      if (isCovered === false) {
        workspacesValue.push(dockerAssemblyRelativePath);
      }
    } else if (isPlainObject(workspacesValue) === true && Array.isArray(workspacesValue['packages']) === true) {
      const packageWorkspaces: Lib_DockerPackaging_Runner_BuildRootPackage_PackageWorkspaces = workspacesValue['packages'];

      for (const workspacePattern of packageWorkspaces) {
        const packageIsDockerWorkspace: Lib_DockerPackaging_Runner_BuildRootPackage_PackageIsDockerWorkspace = workspacePattern === dockerAssemblyRelativePath || workspacePattern === dockerConfigWorkspacePath;
        const packageIsPackagesWildcard: Lib_DockerPackaging_Runner_BuildRootPackage_PackageIsPackagesWildcard = workspacePattern === 'packages/*' || workspacePattern === './packages/*';

        if (packageIsDockerWorkspace === true || packageIsPackagesWildcard === true) {
          isCovered = true;
        }
      }

      if (isCovered === false) {
        packageWorkspaces.push(dockerAssemblyRelativePath);
      }
    } else {
      Reflect.set(rootPackage, 'workspaces', [dockerAssemblyRelativePath]);
    }

    const assemblyDependencyValue: Lib_DockerPackaging_Runner_BuildRootPackage_AssemblyDependencyValue = rootPackage['name'];

    if (typeof assemblyDependencyValue === 'string' && assemblyDependencyValue === assemblyPackageName) {
      throw new Error('The root package name conflicts with the private Docker assembly package name.');
    }

    return rootPackage;
  }

  /**
   * Lib - Docker Packaging - Register Project Config.
   *
   * Registers Docker as a project platform and records the private assembly
   * workspace, environment prefix, recipes, and root ignore file.
   *
   * @param {Lib_DockerPackaging_Runner_RegisterProjectConfig_NovaConfig}          novaConfig          - Nova config.
   * @param {Lib_DockerPackaging_Runner_RegisterProjectConfig_AssemblyPackageName} assemblyPackageName - Assembly package name.
   * @param {Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFileEntry}     ignoreFileEntry     - Ignore file entry.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_RegisterProjectConfig_Returns}
   *
   * @since 0.34.0
   */

  private static registerProjectConfig(novaConfig: Lib_DockerPackaging_Runner_RegisterProjectConfig_NovaConfig, assemblyPackageName: Lib_DockerPackaging_Runner_RegisterProjectConfig_AssemblyPackageName, ignoreFileEntry: Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFileEntry): Lib_DockerPackaging_Runner_RegisterProjectConfig_Returns {
    const projectValue: Lib_DockerPackaging_Runner_RegisterProjectConfig_ProjectValue = novaConfig['project'];

    if (isPlainObject(projectValue) === false) {
      throw new Error('The root nova.config.json project field must contain an object.');
    }

    const platformsValue: Lib_DockerPackaging_Runner_RegisterProjectConfig_PlatformsValue = projectValue['platforms'];
    const platforms: Lib_DockerPackaging_Runner_RegisterProjectConfig_Platforms = [];

    if (Array.isArray(platformsValue) === true) {
      for (const platform of platformsValue) {
        if (typeof platform === 'string') {
          platforms.push(platform);
        }
      }
    }

    if (platforms.includes('docker') === false) {
      platforms.push('docker');
    }

    Reflect.set(projectValue, 'platforms', platforms);

    const workspacesValue: Lib_DockerPackaging_Runner_RegisterProjectConfig_WorkspacesValue = novaConfig['workspaces'];

    if (workspacesValue !== undefined && isPlainObject(workspacesValue) === false) {
      throw new Error('The root nova.config.json workspaces field must contain an object.');
    }

    const workspaces: Lib_DockerPackaging_Runner_RegisterProjectConfig_Workspaces = (isPlainObject(workspacesValue) === true) ? workspacesValue : {};

    Reflect.set(workspaces, dockerConfigWorkspacePath, {
      name: assemblyPackageName,
      policy: 'freezable',
      role: 'tool',
    });
    Reflect.set(novaConfig, 'workspaces', workspaces);

    const ignoreFilesValue: Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFilesValue = novaConfig['ignoreFiles'];

    if (ignoreFilesValue !== undefined && isPlainObject(ignoreFilesValue) === false) {
      throw new Error('The root nova.config.json ignoreFiles field must contain an object.');
    }

    const ignoreFiles: Lib_DockerPackaging_Runner_RegisterProjectConfig_IgnoreFiles = (isPlainObject(ignoreFilesValue) === true) ? ignoreFilesValue : {};

    Reflect.set(ignoreFiles, './.dockerignore', ignoreFileEntry);
    Reflect.set(novaConfig, 'ignoreFiles', ignoreFiles);

    const attributeFilesValue: Lib_DockerPackaging_Runner_RegisterProjectConfig_AttributeFilesValue = novaConfig['attributeFiles'];

    if (attributeFilesValue !== undefined && isPlainObject(attributeFilesValue) === false) {
      throw new Error('The root nova.config.json attributeFiles field must contain an object.');
    }

    const attributeFiles: Lib_DockerPackaging_Runner_RegisterProjectConfig_AttributeFiles = (isPlainObject(attributeFilesValue) === true) ? attributeFilesValue : {};

    // The attribute-files generator writes the file; the scaffold only records the bundle, and keeps an existing entry.
    if (attributeFiles[`${dockerConfigWorkspacePath}/.gitattributes`] === undefined) {
      Reflect.set(attributeFiles, `${dockerConfigWorkspacePath}/.gitattributes`, {
        bundles: ['docker-scripts'],
        patterns: [],
      });
    }

    Reflect.set(novaConfig, 'attributeFiles', attributeFiles);

    const recipesValue: Lib_DockerPackaging_Runner_RegisterProjectConfig_RecipesValue = novaConfig['recipes'];

    if (recipesValue !== undefined && isPlainObject(recipesValue) === false) {
      throw new Error('The root nova.config.json recipes field must contain an object.');
    }

    const recipes: Lib_DockerPackaging_Runner_RegisterProjectConfig_Recipes = (isPlainObject(recipesValue) === true) ? recipesValue : {};
    const packageJsonRecipesValue: Lib_DockerPackaging_Runner_RegisterProjectConfig_PackageJsonRecipesValue = recipes['package-json'];

    if (packageJsonRecipesValue !== undefined && isPlainObject(packageJsonRecipesValue) === false) {
      throw new Error('The root nova.config.json recipes.package-json field must contain an object.');
    }

    const packageJsonRecipes: Lib_DockerPackaging_Runner_RegisterProjectConfig_PackageJsonRecipes = (isPlainObject(packageJsonRecipesValue) === true) ? packageJsonRecipesValue : {};

    Reflect.set(packageJsonRecipes, dockerConfigWorkspacePath, Runner.buildPackageJsonRecipes());
    Reflect.set(recipes, 'package-json', packageJsonRecipes);
    Reflect.set(novaConfig, 'recipes', recipes);

    const environmentValue: Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentValue = novaConfig['environment'];

    if (environmentValue !== undefined && isPlainObject(environmentValue) === false) {
      throw new Error('The root nova.config.json environment field must contain an object.');
    }

    const environment: Lib_DockerPackaging_Runner_RegisterProjectConfig_Environment = (isPlainObject(environmentValue) === true) ? environmentValue : {};
    const environmentWorkspacesValue: Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentWorkspacesValue = environment['workspaces'];

    if (environmentWorkspacesValue !== undefined && isPlainObject(environmentWorkspacesValue) === false) {
      throw new Error('The root nova.config.json environment.workspaces field must contain an object.');
    }

    const environmentWorkspaces: Lib_DockerPackaging_Runner_RegisterProjectConfig_EnvironmentWorkspaces = (isPlainObject(environmentWorkspacesValue) === true) ? environmentWorkspacesValue : {};

    Reflect.set(environmentWorkspaces, dockerConfigWorkspacePath, { prefix: 'DOCKER_' });
    Reflect.set(environment, 'workspaces', environmentWorkspaces);
    Reflect.set(novaConfig, 'environment', environment);

    return normalizeNovaConfigTopLevelOrder(novaConfig);
  }

  /**
   * Lib - Docker Packaging - Build package.json Recipes.
   *
   * Creates Nova maintenance recipes for the private assembly package and keeps
   * its internal manifest normalized by standard project tooling.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildPackageJsonRecipes_Returns}
   *
   * @since 0.34.0
   */

  private static buildPackageJsonRecipes(): Lib_DockerPackaging_Runner_BuildPackageJsonRecipes_Returns {
    const recipes: Lib_DockerPackaging_Runner_BuildPackageJsonRecipes_Recipes = {};

    for (const recipeName of libItemAllowedRecipes) {
      Reflect.set(recipes, recipeName, { enabled: true });
    }

    Reflect.set(recipes, 'cleanup', {
      enabled: true,
      settings: {
        removeUnknownKeys: true,
        reorderKeys: true,
      },
    });
    Reflect.set(recipes, 'normalize-dependencies', {
      enabled: true,
      settings: {
        pinDependencyVersions: true,
        pinDevDependencyVersions: true,
      },
    });
    Reflect.set(recipes, 'sync-environment', {
      enabled: true,
      settings: {
        trackNodeLtsVersions: true,
      },
    });

    return recipes;
  }

  /**
   * Lib - Docker Packaging - Merge Scripts.
   *
   * Adds root container deployment scripts in Nova's canonical order while
   * retaining any existing deliverable-specific deployment commands.
   *
   * @param {Lib_DockerPackaging_Runner_MergeScripts_Scripts} scripts - Scripts.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_MergeScripts_Returns}
   *
   * @since 0.34.0
   */

  private static mergeScripts(scripts: Lib_DockerPackaging_Runner_MergeScripts_Scripts): Lib_DockerPackaging_Runner_MergeScripts_Returns {
    const entries: Lib_DockerPackaging_Runner_MergeScripts_Entries = Object.entries(scripts).filter((scriptEntry) => scriptEntry[0] !== 'deploy' && scriptEntry[0].startsWith('deploy:') === false);
    const deployEntries: Lib_DockerPackaging_Runner_MergeScripts_DeployEntries = Object.entries(scripts).filter((scriptEntry) => scriptEntry[0] !== 'deploy:container' && scriptEntry[0].startsWith('deploy:') === true);
    const merged: Lib_DockerPackaging_Runner_MergeScripts_Merged = {};
    let isDeployInserted: Lib_DockerPackaging_Runner_MergeScripts_IsDeployInserted = false;

    /**
     * Lib - Docker Packaging - Merge Scripts - Insert Deploy Scripts.
     *
     * Inserts the canonical dispatcher at the deployment group boundary and
     * preserves every other deployment script.
     *
     * @returns {void}
     *
     * @since 0.34.0
     */
    const insertDeployScripts: Lib_DockerPackaging_Runner_MergeScripts_InsertDeployScripts = (): Lib_DockerPackaging_Runner_MergeScripts_InsertDeployScripts_Returns => {
      Reflect.set(merged, 'deploy', 'nova utility run-scripts --sequential --node-env production "deploy:*"');
      Reflect.set(merged, 'deploy:container', 'docker compose up --build --detach');

      for (const deployEntry of deployEntries) {
        Reflect.set(merged, deployEntry[0], deployEntry[1]);
      }

      isDeployInserted = true;

      return;
    };

    for (const scriptEntry of entries) {
      if (scriptEntry[0] === 'clean' && isDeployInserted === false) {
        insertDeployScripts();
      }

      Reflect.set(merged, scriptEntry[0], scriptEntry[1]);
    }

    if (isDeployInserted === false) {
      insertDeployScripts();
    }

    return merged;
  }

  /**
   * Lib - Docker Packaging - Shell Quote.
   *
   * Quotes one generated POSIX shell argument without evaluating it and escapes
   * embedded single quotes for literal shell consumption.
   *
   * @param {Lib_DockerPackaging_String} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_String}
   *
   * @since 0.34.0
   */

  private static shellQuote(value: Lib_DockerPackaging_Runner_ShellQuote_Value): Lib_DockerPackaging_Runner_ShellQuote_Returns {
    return `'${value.split('\'').join('\'"\'"\'')}'`;
  }

  /**
   * Lib - Docker Packaging - Validate Service Name.
   *
   * Applies the same service namespace invariants to requested definitions and
   * persisted assembly manifests before either can reach the generated rootfs.
   *
   * @param {Lib_DockerPackaging_Runner_ValidateServiceName_Name} name - Name.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_ValidateServiceName_Returns}
   *
   * @since 0.34.0
   */

  private static validateServiceName(name: Lib_DockerPackaging_Runner_ValidateServiceName_Name): Lib_DockerPackaging_Runner_ValidateServiceName_Returns {
    if (LIB_REGEX_PATTERN_SLUG_SIMPLE.test(name) === false) {
      throw new Error(`Docker service name "${name}" must be a lowercase slug.`);
    }

    if (dockerReservedServiceNames.has(name) === true) {
      throw new Error(`Docker service name "${name}" is reserved for Nova or s6-overlay internals.`);
    }

    return;
  }
}

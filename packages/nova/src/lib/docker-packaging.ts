import { promises as fs } from 'node:fs';
import {
  basename,
  dirname,
  join,
  relative,
  sep,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import { Runner as LibCorepack } from './corepack.js';
import { renderIgnoreFile } from './ignore-files.js';
import { libItemAllowedRecipes } from './item.js';
import { normalizeNovaConfigTopLevelOrder } from './nova-config-order.js';
import {
  LIB_REGEX_PATTERN_DOCKER_RUNTIME_PATH,
  LIB_REGEX_PATTERN_SLUG_SIMPLE,
} from './regex.js';
import {
  applyScaffoldVersionReplacements,
  getScaffoldVersion,
} from './scaffold-versions.js';
import {
  isPlainObject,
  pathExists,
  saveGeneratedFile,
} from './utility.js';

import type {
  Lib_DockerPackaging_DirectoryEntries,
  Lib_DockerPackaging_DockerAssemblyRelativePath,
  Lib_DockerPackaging_DockerConfigWorkspacePath,
  Lib_DockerPackaging_DockerManifestSchemaVersion,
  Lib_DockerPackaging_DockerProtectedWritablePaths,
  Lib_DockerPackaging_DockerReservedServiceNames,
  Lib_DockerPackaging_DockerWorkspaceBuildDirectory,
  Lib_DockerPackaging_Runner_BuildCompose_Content,
  Lib_DockerPackaging_Runner_BuildCompose_EnvironmentFileBlock,
  Lib_DockerPackaging_Runner_BuildCompose_EnvironmentFiles,
  Lib_DockerPackaging_Runner_BuildCompose_HasContainerNativeService,
  Lib_DockerPackaging_Runner_BuildCompose_InteractiveBlock,
  Lib_DockerPackaging_Runner_BuildCompose_Manifest,
  Lib_DockerPackaging_Runner_BuildCompose_PortBlock,
  Lib_DockerPackaging_Runner_BuildCompose_PortLines,
  Lib_DockerPackaging_Runner_BuildCompose_Ports,
  Lib_DockerPackaging_Runner_BuildCompose_PortSet,
  Lib_DockerPackaging_Runner_BuildCompose_Replacements,
  Lib_DockerPackaging_Runner_BuildCompose_Returns,
  Lib_DockerPackaging_Runner_BuildCompose_Template,
  Lib_DockerPackaging_Runner_BuildContainerPackage_AssemblyPackageName,
  Lib_DockerPackaging_Runner_BuildContainerPackage_BuildOrder,
  Lib_DockerPackaging_Runner_BuildContainerPackage_ContainerPackage,
  Lib_DockerPackaging_Runner_BuildContainerPackage_InheritedValue,
  Lib_DockerPackaging_Runner_BuildContainerPackage_Returns,
  Lib_DockerPackaging_Runner_BuildContainerPackage_RootPackage,
  Lib_DockerPackaging_Runner_BuildDockerfile_BuildCommands,
  Lib_DockerPackaging_Runner_BuildDockerfile_BuildOrder,
  Lib_DockerPackaging_Runner_BuildDockerfile_BuildScriptValue,
  Lib_DockerPackaging_Runner_BuildDockerfile_Content,
  Lib_DockerPackaging_Runner_BuildDockerfile_CorepackVersion,
  Lib_DockerPackaging_Runner_BuildDockerfile_ExposeDirectives,
  Lib_DockerPackaging_Runner_BuildDockerfile_InstallCommand,
  Lib_DockerPackaging_Runner_BuildDockerfile_IsSelectedWorkspace,
  Lib_DockerPackaging_Runner_BuildDockerfile_IsYarnClassic,
  Lib_DockerPackaging_Runner_BuildDockerfile_Manifest,
  Lib_DockerPackaging_Runner_BuildDockerfile_NeedsNodeRuntime,
  Lib_DockerPackaging_Runner_BuildDockerfile_NeedsSyntheticWorkspaceManifests,
  Lib_DockerPackaging_Runner_BuildDockerfile_PackageJson,
  Lib_DockerPackaging_Runner_BuildDockerfile_PackageManager,
  Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerConfigCopies,
  Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerDescriptor,
  Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerValue,
  Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerVersion,
  Lib_DockerPackaging_Runner_BuildDockerfile_PackageName,
  Lib_DockerPackaging_Runner_BuildDockerfile_Ports,
  Lib_DockerPackaging_Runner_BuildDockerfile_PortSet,
  Lib_DockerPackaging_Runner_BuildDockerfile_PruneCommand,
  Lib_DockerPackaging_Runner_BuildDockerfile_QuotedPackageName,
  Lib_DockerPackaging_Runner_BuildDockerfile_Replacements,
  Lib_DockerPackaging_Runner_BuildDockerfile_Returns,
  Lib_DockerPackaging_Runner_BuildDockerfile_RootPackage,
  Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssembly,
  Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssemblyCommands,
  Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssemblyWorkspacePath,
  Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssemblyWorkspaceServices,
  Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeBase,
  Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeCopyLines,
  Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeSitePath,
  Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeWorkspacePackage,
  Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeWorkspacePath,
  Lib_DockerPackaging_Runner_BuildDockerfile_ScriptsValue,
  Lib_DockerPackaging_Runner_BuildDockerfile_Template,
  Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceManifestCopyLines,
  Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceManifestRestoreLines,
  Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceManifestSourcePath,
  Lib_DockerPackaging_Runner_BuildDockerfile_WorkspacePackage,
  Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceServices,
  Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceSourceCopyLines,
  Lib_DockerPackaging_Runner_BuildDockerfile_WritableDirectories,
  Lib_DockerPackaging_Runner_BuildDockerfile_WritablePaths,
  Lib_DockerPackaging_Runner_BuildHealthcheck_Lines,
  Lib_DockerPackaging_Runner_BuildHealthcheck_Manifest,
  Lib_DockerPackaging_Runner_BuildHealthcheck_RequiredServices,
  Lib_DockerPackaging_Runner_BuildHealthcheck_Returns,
  Lib_DockerPackaging_Runner_BuildInitUser_ProtectedWritablePatterns,
  Lib_DockerPackaging_Runner_BuildInitUser_Returns,
  Lib_DockerPackaging_Runner_BuildInitUser_ShellVariableMarker,
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
  Lib_DockerPackaging_Runner_BuildWorkspacePackage_Returns,
  Lib_DockerPackaging_Runner_BuildWorkspacePackage_Slug,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_GroupDirectory,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_Manifest,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackageJson,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackageName,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_PackagePath,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_ProjectDirectory,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_Returns,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_WorkspacePackages,
  Lib_DockerPackaging_Runner_CollectWorkspacePackages_WorkspacePaths,
  Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyDirectory,
  Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyPackage,
  Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyPackageName,
  Lib_DockerPackaging_Runner_GenerateForTarget_AvailableServiceNames,
  Lib_DockerPackaging_Runner_GenerateForTarget_BuildOrder,
  Lib_DockerPackaging_Runner_GenerateForTarget_ComposeContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_ConfiguredIgnoreFileEntry,
  Lib_DockerPackaging_Runner_GenerateForTarget_ConflictingService,
  Lib_DockerPackaging_Runner_GenerateForTarget_ContainerBuildPackage,
  Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_DockerignoreContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_ExistingManifestValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_ExistingWorkspace,
  Lib_DockerPackaging_Runner_GenerateForTarget_GitAttributesContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFileEntry,
  Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFilesValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_IsYarnBerry,
  Lib_DockerPackaging_Runner_GenerateForTarget_IsYarnClassic,
  Lib_DockerPackaging_Runner_GenerateForTarget_Manifest,
  Lib_DockerPackaging_Runner_GenerateForTarget_ManifestPath,
  Lib_DockerPackaging_Runner_GenerateForTarget_NeedsSyntheticWorkspaceManifests,
  Lib_DockerPackaging_Runner_GenerateForTarget_NovaConfig,
  Lib_DockerPackaging_Runner_GenerateForTarget_NovaConfigPath,
  Lib_DockerPackaging_Runner_GenerateForTarget_Options,
  Lib_DockerPackaging_Runner_GenerateForTarget_PackageManager,
  Lib_DockerPackaging_Runner_GenerateForTarget_PackageManagerDescriptor,
  Lib_DockerPackaging_Runner_GenerateForTarget_PackageManagerVersion,
  Lib_DockerPackaging_Runner_GenerateForTarget_PnpmWorkspaceContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_PnpmWorkspaceLines,
  Lib_DockerPackaging_Runner_GenerateForTarget_ProjectDirectory,
  Lib_DockerPackaging_Runner_GenerateForTarget_ProjectNameValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_ProjectSlugValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_ProjectValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_ReportFiles,
  Lib_DockerPackaging_Runner_GenerateForTarget_RequestedServices,
  Lib_DockerPackaging_Runner_GenerateForTarget_Result,
  Lib_DockerPackaging_Runner_GenerateForTarget_RetainedServices,
  Lib_DockerPackaging_Runner_GenerateForTarget_RetainedWorkspaces,
  Lib_DockerPackaging_Runner_GenerateForTarget_Returns,
  Lib_DockerPackaging_Runner_GenerateForTarget_RootfsDirectory,
  Lib_DockerPackaging_Runner_GenerateForTarget_RootPackage,
  Lib_DockerPackaging_Runner_GenerateForTarget_RootPackagePath,
  Lib_DockerPackaging_Runner_GenerateForTarget_RuntimePaths,
  Lib_DockerPackaging_Runner_GenerateForTarget_ServicesByName,
  Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspaceManifestContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspaceManifestPath,
  Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspaceManifests,
  Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspacePackage,
  Lib_DockerPackaging_Runner_GenerateForTarget_TemplateContents,
  Lib_DockerPackaging_Runner_GenerateForTarget_TemplateRoot,
  Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedManifest,
  Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedNovaConfig,
  Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedRootPackage,
  Lib_DockerPackaging_Runner_GenerateForTarget_VisitedServices,
  Lib_DockerPackaging_Runner_GenerateForTarget_VisitingServices,
  Lib_DockerPackaging_Runner_GenerateForTarget_VisitService,
  Lib_DockerPackaging_Runner_GenerateForTarget_VisitService_Service,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceDefinition,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceDirectory,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceManifestsDirectory,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackage,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackageNameValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackagePath,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackages,
  Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePathValue,
  Lib_DockerPackaging_Runner_GenerateForTarget_YarnConfigContent,
  Lib_DockerPackaging_Runner_GenerateForTarget_YarnConfigPath,
  Lib_DockerPackaging_Runner_MergeScripts_DeployEntries,
  Lib_DockerPackaging_Runner_MergeScripts_Entries,
  Lib_DockerPackaging_Runner_MergeScripts_InsertDeployScripts,
  Lib_DockerPackaging_Runner_MergeScripts_InsertDeployScripts_Returns,
  Lib_DockerPackaging_Runner_MergeScripts_IsDeployInserted,
  Lib_DockerPackaging_Runner_MergeScripts_Merged,
  Lib_DockerPackaging_Runner_MergeScripts_Returns,
  Lib_DockerPackaging_Runner_MergeScripts_Scripts,
  Lib_DockerPackaging_Runner_NormalizeManifest_Manifest,
  Lib_DockerPackaging_Runner_NormalizeManifest_Returns,
  Lib_DockerPackaging_Runner_NormalizeManifest_ServiceNames,
  Lib_DockerPackaging_Runner_NormalizeManifest_Value,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_PathParts,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Returns,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_RuntimePaths,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_Value,
  Lib_DockerPackaging_Runner_NormalizeRuntimePaths_WorkspacePath,
  Lib_DockerPackaging_Runner_ReadJsonObject_ParsedContent,
  Lib_DockerPackaging_Runner_ReadJsonObject_RawContent,
  Lib_DockerPackaging_Runner_ReadJsonObject_Returns,
  Lib_DockerPackaging_Runner_ReadJsonObject_TargetPath,
  Lib_DockerPackaging_Runner_RegisterProjectConfig_AssemblyPackageName,
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
  Lib_DockerPackaging_Runner_ResolveBuildOrder_Manifest,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_OrderedPackages,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_Returns,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitingPackages,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage_DependencyGroup,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_VisitPackage_WorkspacePackage,
  Lib_DockerPackaging_Runner_ResolveBuildOrder_WorkspacePackages,
  Lib_DockerPackaging_Runner_ShellQuote_Returns,
  Lib_DockerPackaging_Runner_ShellQuote_Value,
  Lib_DockerPackaging_Runner_ValidateServiceName_Name,
  Lib_DockerPackaging_Runner_ValidateServiceName_Returns,
  Lib_DockerPackaging_Runner_WriteExecutable_Content,
  Lib_DockerPackaging_Runner_WriteExecutable_Returns,
  Lib_DockerPackaging_Runner_WriteExecutable_TargetPath,
  Lib_DockerPackaging_Runner_WriteRootfs_CriticalFinishScript,
  Lib_DockerPackaging_Runner_WriteRootfs_DependenciesDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_HelperDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_InitDependenciesDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_InitServiceDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_Manifest,
  Lib_DockerPackaging_Runner_WriteRootfs_NovaConfigDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_Returns,
  Lib_DockerPackaging_Runner_WriteRootfs_RootfsDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_S6DatabaseDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_ServiceDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_ServiceHelperDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_ShellVariableMarker,
  Lib_DockerPackaging_Runner_WriteRootfs_UserBundleDirectory,
  Lib_DockerPackaging_Runner_WriteRootfs_WritablePaths,
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
const dockerManifestSchemaVersion: Lib_DockerPackaging_DockerManifestSchemaVersion = 1;

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
 * Lib - Docker Packaging - Docker Workspace Build Directory.
 *
 * Names the workspace folder every generated Dockerfile copies build output from.
 * Nova builds every workspace into this folder, so no workspace can choose another.
 *
 * @since 0.37.0
 */
const dockerWorkspaceBuildDirectory: Lib_DockerPackaging_DockerWorkspaceBuildDirectory = 'build';

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
    const updatedManifest: Lib_DockerPackaging_Runner_GenerateForTarget_UpdatedManifest = {
      schemaVersion: dockerManifestSchemaVersion,
      services: [
        ...retainedServices,
        ...requestedServices,
      ].sort((firstService, secondService) => firstService['name'].localeCompare(secondService['name'])),
      workspaces: [
        ...retainedWorkspaces,
        workspaceDefinition,
      ].sort((firstWorkspace, secondWorkspace) => firstWorkspace['path'].localeCompare(secondWorkspace['path'])),
    };
    const availableServiceNames: Lib_DockerPackaging_Runner_GenerateForTarget_AvailableServiceNames = new Set(updatedManifest['services'].map((service) => service['name']));

    for (const service of updatedManifest['services']) {
      for (const dependency of service['dependencies']) {
        if (availableServiceNames.has(dependency) === false) {
          throw new Error(`Docker service "${service['name']}" depends on unknown service "${dependency}".`);
        }

        if (dependency === service['name']) {
          throw new Error(`Docker service "${service['name']}" cannot depend on itself.`);
        }
      }
    }

    const servicesByName: Lib_DockerPackaging_Runner_GenerateForTarget_ServicesByName = new Map(updatedManifest['services'].map((service) => [
      service['name'],
      service,
    ]));
    const visitedServices: Lib_DockerPackaging_Runner_GenerateForTarget_VisitedServices = new Set();
    const visitingServices: Lib_DockerPackaging_Runner_GenerateForTarget_VisitingServices = new Set();

    /**
     * Lib - Docker Packaging - Generate For Target - Visit Service.
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
    const visitService: Lib_DockerPackaging_Runner_GenerateForTarget_VisitService = (serviceName) => {
      if (visitedServices.has(serviceName) === true) {
        return;
      }

      if (visitingServices.has(serviceName) === true) {
        throw new Error(`Docker service dependency cycle includes "${serviceName}".`);
      }

      const service: Lib_DockerPackaging_Runner_GenerateForTarget_VisitService_Service = servicesByName.get(serviceName);

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

    for (const service of updatedManifest['services']) {
      visitService(service['name']);
    }

    const workspacePackages: Lib_DockerPackaging_Runner_GenerateForTarget_WorkspacePackages = await Runner.collectWorkspacePackages(projectDirectory, updatedManifest);
    const buildOrder: Lib_DockerPackaging_Runner_GenerateForTarget_BuildOrder = Runner.resolveBuildOrder(updatedManifest, workspacePackages);
    const packageManagerDescriptor: Lib_DockerPackaging_Runner_GenerateForTarget_PackageManagerDescriptor = LibCorepack.parsePackageManager(rootPackage['packageManager']);
    const packageManager: Lib_DockerPackaging_Runner_GenerateForTarget_PackageManager = (packageManagerDescriptor === undefined) ? 'npm' : packageManagerDescriptor['name'];
    const packageManagerVersion: Lib_DockerPackaging_Runner_GenerateForTarget_PackageManagerVersion = (packageManagerDescriptor === undefined) ? '' : packageManagerDescriptor['version'];
    const isYarnClassic: Lib_DockerPackaging_Runner_GenerateForTarget_IsYarnClassic = packageManager === 'yarn' && packageManagerVersion.startsWith('1.');
    const isYarnBerry: Lib_DockerPackaging_Runner_GenerateForTarget_IsYarnBerry = packageManager === 'yarn' && isYarnClassic === false;
    const needsSyntheticWorkspaceManifests: Lib_DockerPackaging_Runner_GenerateForTarget_NeedsSyntheticWorkspaceManifests = packageManager === 'npm' || isYarnClassic === true;
    const syntheticWorkspaceManifests: Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspaceManifests = new Map();

    if (needsSyntheticWorkspaceManifests === true) {
      for (const workspacePackageValue of buildOrder.values()) {
        const syntheticWorkspaceManifestPath: Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspaceManifestPath = join(assemblyDirectory, 'workspace-manifests', workspacePackageValue['path'], 'package.json');
        const syntheticWorkspacePackage: Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspacePackage = Runner.buildSyntheticWorkspacePackage(workspacePackageValue['packageJson'], buildOrder);
        const syntheticWorkspaceManifestContent: Lib_DockerPackaging_Runner_GenerateForTarget_SyntheticWorkspaceManifestContent = `${JSON.stringify(syntheticWorkspacePackage, null, 2)}\n`;

        syntheticWorkspaceManifests.set(syntheticWorkspaceManifestPath, syntheticWorkspaceManifestContent);
      }
    }

    const templateRoot: Lib_DockerPackaging_Runner_GenerateForTarget_TemplateRoot = fileURLToPath(new URL('../../templates/scaffold-options/docker-image/common/', import.meta.url));
    const templateContents: Lib_DockerPackaging_Runner_GenerateForTarget_TemplateContents = await Promise.all([
      fs.readFile(join(templateRoot, 'Dockerfile'), 'utf-8'),
      fs.readFile(join(templateRoot, 'compose.yml'), 'utf-8'),
    ]);
    const dockerfileContent: Lib_DockerPackaging_Runner_GenerateForTarget_DockerfileContent = Runner.buildDockerfile(templateContents[0] ?? '', updatedManifest, buildOrder, rootPackage);
    const composeContent: Lib_DockerPackaging_Runner_GenerateForTarget_ComposeContent = Runner.buildCompose(templateContents[1] ?? '', updatedManifest);
    const ignoreFilesValue: Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFilesValue = novaConfig['ignoreFiles'];
    const configuredIgnoreFileEntry: Lib_DockerPackaging_Runner_GenerateForTarget_ConfiguredIgnoreFileEntry = (isPlainObject(ignoreFilesValue) === true) ? ignoreFilesValue['./.dockerignore'] : undefined;
    const ignoreFileEntry: Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFileEntry = options['ignoreFileEntry'] ?? ((isPlainObject(configuredIgnoreFileEntry) === true) ? configuredIgnoreFileEntry as Lib_DockerPackaging_Runner_GenerateForTarget_IgnoreFileEntry : {
      bundles: ['nova'],
      patterns: [],
    });
    const dockerignoreContent: Lib_DockerPackaging_Runner_GenerateForTarget_DockerignoreContent = await renderIgnoreFile('./.dockerignore', ignoreFileEntry);
    const gitAttributesContent: Lib_DockerPackaging_Runner_GenerateForTarget_GitAttributesContent = 'rootfs/** text eol=lf\n';
    const assemblyPackageName: Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyPackageName = `${projectSlugValue}-tool-docker`;
    const assemblyPackage: Lib_DockerPackaging_Runner_GenerateForTarget_AssemblyPackage = Runner.buildWorkspacePackage(projectSlugValue);
    const containerBuildPackage: Lib_DockerPackaging_Runner_GenerateForTarget_ContainerBuildPackage = Runner.buildContainerPackage(rootPackage, assemblyPackageName, buildOrder);
    const pnpmWorkspaceLines: Lib_DockerPackaging_Runner_GenerateForTarget_PnpmWorkspaceLines = [
      'packages:',
      ...[...buildOrder.values()].map((workspacePackageValue) => `  - '${workspacePackageValue['path']}'`),
      '',
    ];
    const pnpmWorkspaceContent: Lib_DockerPackaging_Runner_GenerateForTarget_PnpmWorkspaceContent = pnpmWorkspaceLines.join('\n');
    const yarnConfigContent: Lib_DockerPackaging_Runner_GenerateForTarget_YarnConfigContent = [
      'enableGlobalCache: false',
      'nodeLinker: pnp',
      'pnpEnableEsmLoader: true',
      '',
    ].join('\n');
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

    const rootfsDirectory: Lib_DockerPackaging_Runner_GenerateForTarget_RootfsDirectory = join(assemblyDirectory, 'rootfs');
    const workspaceManifestsDirectory: Lib_DockerPackaging_Runner_GenerateForTarget_WorkspaceManifestsDirectory = join(assemblyDirectory, 'workspace-manifests');
    const yarnConfigPath: Lib_DockerPackaging_Runner_GenerateForTarget_YarnConfigPath = join(assemblyDirectory, 'yarnrc.yml');
    const reportFiles: Lib_DockerPackaging_Runner_GenerateForTarget_ReportFiles = options['reportFiles'] !== false;

    await fs.mkdir(assemblyDirectory, { recursive: true });

    await Promise.all([
      fs.rm(rootfsDirectory, {
        force: true,
        recursive: true,
      }),
      fs.rm(workspaceManifestsDirectory, {
        force: true,
        recursive: true,
      }),
      fs.rm(yarnConfigPath, { force: true }),
    ]);

    await Promise.all([
      saveGeneratedFile(result['dockerfilePath'], dockerfileContent, true, undefined, reportFiles),
      saveGeneratedFile(result['composePath'], composeContent, true, undefined, reportFiles),
      saveGeneratedFile(result['dockerignorePath'], dockerignoreContent, true, {
        command: 'nova generate must-haves ignore-files',
        docsSlug: 'cli/generators/must-haves/ignore-files',
        mode: 'strict',
      }, reportFiles),
      saveGeneratedFile(join(assemblyDirectory, '.gitattributes'), gitAttributesContent, true, undefined, reportFiles),
      saveGeneratedFile(join(assemblyDirectory, 'build-package.json'), `${JSON.stringify(containerBuildPackage, null, 2)}\n`, true, undefined, reportFiles),
      saveGeneratedFile(join(assemblyDirectory, 'package.json'), `${JSON.stringify(assemblyPackage, null, 2)}\n`, true, undefined, reportFiles),
      saveGeneratedFile(join(assemblyDirectory, 'pnpm-workspace.yaml'), pnpmWorkspaceContent, true, undefined, reportFiles),
      ...((isYarnBerry === true) ? [saveGeneratedFile(yarnConfigPath, yarnConfigContent, true, undefined, reportFiles)] : []),
      ...[...syntheticWorkspaceManifests].map((syntheticWorkspaceManifest) => saveGeneratedFile(syntheticWorkspaceManifest[0], syntheticWorkspaceManifest[1], true, undefined, reportFiles)),
      saveGeneratedFile(manifestPath, `${JSON.stringify(updatedManifest, null, 2)}\n`, true, undefined, reportFiles),
      saveGeneratedFile(rootPackagePath, `${JSON.stringify(updatedRootPackage, null, 2)}\n`, true, undefined, false),
      saveGeneratedFile(novaConfigPath, `${JSON.stringify(updatedNovaConfig, null, 2)}\n`, true, undefined, false),
    ]);

    await Runner.writeRootfs(rootfsDirectory, updatedManifest);

    return result;
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
        schemaVersion: dockerManifestSchemaVersion,
        services: [],
        workspaces: [],
      };
    }

    if (
      value['schemaVersion'] !== dockerManifestSchemaVersion
      || Array.isArray(value['services']) === false
      || Array.isArray(value['workspaces']) === false
    ) {
      throw new Error('The Docker assembly manifest is not compatible with this Nova version.');
    }

    const manifest: Lib_DockerPackaging_Runner_NormalizeManifest_Manifest = value as Lib_DockerPackaging_Runner_NormalizeManifest_Manifest;
    const serviceNames: Lib_DockerPackaging_Runner_NormalizeManifest_ServiceNames = new Set();

    for (const service of manifest['services']) {
      Runner.validateServiceName(service['name']);

      if (serviceNames.has(service['name']) === true) {
        throw new Error(`Docker service name "${service['name']}" is declared more than once in the assembly manifest.`);
      }

      serviceNames.add(service['name']);
    }

    return {
      ...manifest,
      workspaces: manifest['workspaces'].map((workspace) => ({
        packageName: workspace['packageName'],
        path: workspace['path'],
        profile: workspace['profile'],
        runtimePaths: Runner.normalizeRuntimePaths(workspace['runtimePaths'] ?? [], workspace['path']),
      })),
    };
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
      if (service['workspace'] !== workspacePath && service['port'] !== undefined) {
        occupiedPorts.add(service['port']);
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

    const kind: Lib_DockerPackaging_Runner_BuildService_Kind = input['kind'] ?? 'longrun';
    const environment: Lib_DockerPackaging_Runner_BuildService_Environment = { ...(input['environment'] ?? {}) };

    if (port !== undefined) {
      Reflect.set(environment, 'PORT', `${port}`);
    }

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
        command = `httpd -f -p ${port ?? 8080} -h /app/sites/${name}`;
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
    const healthCommand: Lib_DockerPackaging_Runner_BuildService_HealthCommand = input['healthCommand'] ?? ((port === undefined) ? undefined : `wget --spider --quiet http://127.0.0.1:${port}/`);

    if (healthCommand !== undefined) {
      service.healthCommand = healthCommand;
    }

    if (port !== undefined) {
      service.port = port;
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
   * Lib - Docker Packaging - Build Dockerfile.
   *
   * Renders a closure-scoped multi-stage build for the repository appliance while
   * using non-frozen installs because root lockfiles describe excluded workspaces.
   *
   * @param {Lib_DockerPackaging_String}                            template    - Template.
   * @param {Lib_DockerPackaging_Runner_BuildDockerfile_Manifest}   manifest    - Manifest.
   * @param {Lib_DockerPackaging_Runner_BuildDockerfile_BuildOrder} buildOrder  - Build order.
   * @param {Lib_DockerPackaging_JsonObject}                        rootPackage - Root package.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildDockerfile_Returns}
   *
   * @since 0.34.0
   */

  private static buildDockerfile(template: Lib_DockerPackaging_Runner_BuildDockerfile_Template, manifest: Lib_DockerPackaging_Runner_BuildDockerfile_Manifest, buildOrder: Lib_DockerPackaging_Runner_BuildDockerfile_BuildOrder, rootPackage: Lib_DockerPackaging_Runner_BuildDockerfile_RootPackage): Lib_DockerPackaging_Runner_BuildDockerfile_Returns {
    const packageManagerValue: Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerValue = rootPackage['packageManager'];
    const packageManagerDescriptor: Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerDescriptor = LibCorepack.parsePackageManager(packageManagerValue);
    const packageManager: Lib_DockerPackaging_Runner_BuildDockerfile_PackageManager = (packageManagerDescriptor === undefined) ? 'npm' : packageManagerDescriptor['name'];
    const packageManagerVersion: Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerVersion = (packageManagerDescriptor === undefined) ? '' : packageManagerDescriptor['version'];
    const isYarnClassic: Lib_DockerPackaging_Runner_BuildDockerfile_IsYarnClassic = packageManager === 'yarn' && packageManagerVersion.startsWith('1.');
    const needsSyntheticWorkspaceManifests: Lib_DockerPackaging_Runner_BuildDockerfile_NeedsSyntheticWorkspaceManifests = packageManager === 'npm' || isYarnClassic === true;
    const packageManagerConfigCopies: Lib_DockerPackaging_Runner_BuildDockerfile_PackageManagerConfigCopies = (packageManager === 'yarn' && isYarnClassic === false) ? 'COPY packages/docker/yarnrc.yml ./.yarnrc.yml' : '# This package manager does not need generated build configuration.';
    const corepackVersion: Lib_DockerPackaging_Runner_BuildDockerfile_CorepackVersion = getScaffoldVersion('corepack');
    let installCommand: Lib_DockerPackaging_Runner_BuildDockerfile_InstallCommand = 'RUN npm install';
    let pruneCommand: Lib_DockerPackaging_Runner_BuildDockerfile_PruneCommand = 'RUN npm prune --omit=dev && npm cache clean --force';
    const buildCommands: Lib_DockerPackaging_Runner_BuildDockerfile_BuildCommands = [];

    if (packageManager === 'pnpm') {
      installCommand = `RUN npm install --global corepack@${corepackVersion} && corepack enable pnpm && pnpm install`;
      pruneCommand = 'RUN pnpm install --prod';
    } else if (packageManager === 'yarn') {
      installCommand = `RUN npm install --global corepack@${corepackVersion} && corepack enable yarn && yarn install`;
      pruneCommand = (isYarnClassic === true) ? 'RUN yarn install --production && yarn cache clean' : 'RUN yarn workspaces focus --all --production';
    }

    for (const workspacePackageEntry of buildOrder) {
      const packageName: Lib_DockerPackaging_Runner_BuildDockerfile_PackageName = workspacePackageEntry[0];
      const packageJson: Lib_DockerPackaging_Runner_BuildDockerfile_PackageJson = workspacePackageEntry[1]['packageJson'];
      const scriptsValue: Lib_DockerPackaging_Runner_BuildDockerfile_ScriptsValue = packageJson['scripts'];
      const buildScriptValue: Lib_DockerPackaging_Runner_BuildDockerfile_BuildScriptValue = (isPlainObject(scriptsValue) === true) ? scriptsValue['build'] : undefined;

      if (typeof buildScriptValue !== 'string') {
        continue;
      }

      const quotedPackageName: Lib_DockerPackaging_Runner_BuildDockerfile_QuotedPackageName = Runner.shellQuote(packageName);

      if (packageManager === 'pnpm') {
        buildCommands.push(`RUN pnpm --filter ${quotedPackageName} run build`);
      } else if (packageManager === 'yarn') {
        buildCommands.push(`RUN yarn workspace ${quotedPackageName} build`);
      } else {
        buildCommands.push(`RUN npm run build --workspace=${quotedPackageName}`);
      }
    }

    const workspaceManifestCopyLines: Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceManifestCopyLines = [];
    const workspaceManifestRestoreLines: Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceManifestRestoreLines = [];
    const workspaceSourceCopyLines: Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceSourceCopyLines = [];
    const runtimeAssemblyCommands: Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssemblyCommands = [];
    const runtimeCopyLines: Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeCopyLines = new Set();
    const needsNodeRuntime: Lib_DockerPackaging_Runner_BuildDockerfile_NeedsNodeRuntime = manifest['workspaces'].some((workspace) => [
      'astro-node',
      'background-service',
      'http-service',
      'nextjs-standalone',
    ].includes(workspace['profile']));

    for (const workspacePackageEntry of buildOrder) {
      const workspacePackage: Lib_DockerPackaging_Runner_BuildDockerfile_WorkspacePackage = workspacePackageEntry[1];
      const workspaceManifestSourcePath: Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceManifestSourcePath = (needsSyntheticWorkspaceManifests === true) ? `packages/docker/workspace-manifests/${workspacePackage['path']}/package.json` : `${workspacePackage['path']}/package.json`;

      workspaceManifestCopyLines.push(`COPY ${JSON.stringify([
        workspaceManifestSourcePath,
        `${workspacePackage['path']}/package.json`,
      ])}`);

      if (needsSyntheticWorkspaceManifests === true) {
        workspaceManifestRestoreLines.push(`COPY ${JSON.stringify([
          workspaceManifestSourcePath,
          `${workspacePackage['path']}/package.json`,
        ])}`);
      }

      workspaceSourceCopyLines.push(`COPY ${JSON.stringify([
        workspacePackage['path'],
        workspacePackage['path'],
      ])}`);
    }

    if (needsNodeRuntime === true) {
      runtimeAssemblyCommands.push(
        'mkdir -p /runtime',
        'cp -a . /runtime/',
      );

      runtimeCopyLines.add('COPY --from=build /runtime/ /app/');
    }

    for (const workspace of manifest['workspaces']) {
      const runtimeWorkspacePath: Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeWorkspacePath = `/app/${workspace['path']}`;

      if (needsNodeRuntime === true && workspace['profile'] === 'static-site') {
        const runtimeAssemblyWorkspaceServices: Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssemblyWorkspaceServices = manifest['services'].filter((manifestService) => manifestService['workspace'] === workspace['path']);

        for (const service of runtimeAssemblyWorkspaceServices) {
          const runtimeSitePath: Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeSitePath = `/runtime/sites/${service['name']}`;

          runtimeAssemblyCommands.push(
            `mkdir -p ${Runner.shellQuote(runtimeSitePath)}`,
            `cp -a ${Runner.shellQuote(`/workspace/${workspace['path']}/${dockerWorkspaceBuildDirectory}/.`)} ${Runner.shellQuote(`${runtimeSitePath}/`)}`,
          );
        }
      } else if (needsNodeRuntime === true && workspace['profile'] === 'nextjs-standalone') {
        const runtimeAssemblyWorkspacePath: Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssemblyWorkspacePath = `/runtime/${workspace['path']}`;

        runtimeAssemblyCommands.push(`cp -a ${Runner.shellQuote(`/workspace/${workspace['path']}/${dockerWorkspaceBuildDirectory}/standalone/.`)} ${Runner.shellQuote(`${runtimeAssemblyWorkspacePath}/`)}`);
      } else if (needsNodeRuntime === true) {
        continue;
      } else if (workspace['profile'] === 'static-site') {
        const workspaceServices: Lib_DockerPackaging_Runner_BuildDockerfile_WorkspaceServices = manifest['services'].filter((manifestService) => manifestService['workspace'] === workspace['path']);

        for (const service of workspaceServices) {
          runtimeCopyLines.add(`COPY --from=build /workspace/${workspace['path']}/${dockerWorkspaceBuildDirectory} /app/sites/${service['name']}`);
        }
      } else if (workspace['profile'] === 'container-native') {
        runtimeCopyLines.add(`COPY --from=build /workspace/${workspace['path']} ${runtimeWorkspacePath}`);
      } else if (workspace['profile'] === 'nextjs-standalone') {
        runtimeCopyLines.add(`COPY --from=build /workspace/${workspace['path']}/${dockerWorkspaceBuildDirectory}/standalone ${runtimeWorkspacePath}`);
        runtimeCopyLines.add(`COPY --from=build /workspace/${workspace['path']}/public ${runtimeWorkspacePath}/public`);
        runtimeCopyLines.add(`COPY --from=build /workspace/${workspace['path']}/${dockerWorkspaceBuildDirectory}/static ${runtimeWorkspacePath}/${dockerWorkspaceBuildDirectory}/static`);
      } else {
        runtimeCopyLines.add(`COPY --from=build /workspace/${workspace['path']}/package.json ${runtimeWorkspacePath}/package.json`);
        runtimeCopyLines.add(`COPY --from=build /workspace/${workspace['path']}/${dockerWorkspaceBuildDirectory} ${runtimeWorkspacePath}/${dockerWorkspaceBuildDirectory}`);
      }

      if (workspace['profile'] !== 'container-native') {
        for (const runtimePath of workspace['runtimePaths']) {
          runtimeCopyLines.add(`COPY --from=build /workspace/${workspace['path']}/${runtimePath} ${runtimeWorkspacePath}/${runtimePath}`);
        }
      }
    }

    if (needsNodeRuntime === false) {
      for (const workspacePackageEntry of buildOrder) {
        const runtimeWorkspacePackage: Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeWorkspacePackage = workspacePackageEntry[1];
        const isSelectedWorkspace: Lib_DockerPackaging_Runner_BuildDockerfile_IsSelectedWorkspace = manifest['workspaces'].some((workspace) => workspace['path'] === runtimeWorkspacePackage['path']);

        if (isSelectedWorkspace === false) {
          runtimeCopyLines.add(`COPY --from=build /workspace/${runtimeWorkspacePackage['path']} /app/${runtimeWorkspacePackage['path']}`);
        }
      }
    }

    const portSet: Lib_DockerPackaging_Runner_BuildDockerfile_PortSet = new Set();

    for (const service of manifest['services']) {
      if (service['port'] !== undefined) {
        portSet.add(service['port']);
      }
    }

    const ports: Lib_DockerPackaging_Runner_BuildDockerfile_Ports = [...portSet].sort((firstPort, secondPort) => firstPort - secondPort);
    const exposeDirectives: Lib_DockerPackaging_Runner_BuildDockerfile_ExposeDirectives = ports.map((port) => `EXPOSE ${port}`).join('\n');
    const runtimeBase: Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeBase = (needsNodeRuntime === true) ? 'node:[__SCAFFOLD_VERSION_DOCKER_NODE__]' : 'debian:[__SCAFFOLD_VERSION_DOCKER_DEBIAN__]';
    const writablePaths: Lib_DockerPackaging_Runner_BuildDockerfile_WritablePaths = [...new Set(manifest['services'].flatMap((service) => service['writablePaths']))].sort((firstPath, secondPath) => firstPath.localeCompare(secondPath));
    const writableDirectories: Lib_DockerPackaging_Runner_BuildDockerfile_WritableDirectories = (writablePaths.length === 0) ? '# No project writable paths are declared.' : `RUN mkdir -p ${writablePaths.map((writablePath) => Runner.shellQuote(writablePath)).join(' ')}`;
    const runtimeAssembly: Lib_DockerPackaging_Runner_BuildDockerfile_RuntimeAssembly = (runtimeAssemblyCommands.length === 0) ? '# This appliance does not need a Node.js runtime assembly.' : `RUN ${runtimeAssemblyCommands.join([
      ' \\',
      '  && ',
    ].join('\n'))}`;
    const replacements: Lib_DockerPackaging_Runner_BuildDockerfile_Replacements = {
      '[__DOCKER_BUILD_COMMANDS__]': (buildCommands.length === 0) ? '# No selected workspace declares a build script.' : buildCommands.join('\n'),
      '[__DOCKER_EXPOSE_DIRECTIVES__]': (exposeDirectives === '') ? '# This appliance does not expose a network port.' : exposeDirectives,
      '[__DOCKER_INSTALL_COMMAND__]': installCommand,
      '[__DOCKER_PACKAGE_MANAGER_CONFIG_COPIES__]': packageManagerConfigCopies,
      '[__DOCKER_PRUNE_COMMAND__]': pruneCommand,
      '[__DOCKER_RUNTIME_ASSEMBLY__]': runtimeAssembly,
      '[__DOCKER_RUNTIME_BASE__]': runtimeBase,
      '[__DOCKER_RUNTIME_COPIES__]': [...runtimeCopyLines].join('\n'),
      '[__DOCKER_WORKSPACE_MANIFEST_COPIES__]': workspaceManifestCopyLines.join('\n'),
      '[__DOCKER_WORKSPACE_MANIFEST_RESTORES__]': (workspaceManifestRestoreLines.length === 0) ? '# Workspace manifests already use this package manager\'s native protocol.' : workspaceManifestRestoreLines.join('\n'),
      '[__DOCKER_WORKSPACE_SOURCE_COPIES__]': workspaceSourceCopyLines.join('\n'),
      '[__DOCKER_WRITABLE_DIRECTORIES__]': writableDirectories,
    };
    let content: Lib_DockerPackaging_Runner_BuildDockerfile_Content = applyScaffoldVersionReplacements(template);

    for (const replacementEntry of Object.entries(replacements)) {
      content = content.split(replacementEntry[0]).join(replacementEntry[1]);
    }

    return applyScaffoldVersionReplacements(content);
  }

  /**
   * Lib - Docker Packaging - Build Compose.
   *
   * Renders the single root Compose service for every assembled process and keeps
   * read-only mode available without forcing it on generated projects.
   *
   * @param {Lib_DockerPackaging_String}                       template - Template.
   * @param {Lib_DockerPackaging_Runner_BuildCompose_Manifest} manifest - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildCompose_Returns}
   *
   * @since 0.34.0
   */

  private static buildCompose(template: Lib_DockerPackaging_Runner_BuildCompose_Template, manifest: Lib_DockerPackaging_Runner_BuildCompose_Manifest): Lib_DockerPackaging_Runner_BuildCompose_Returns {
    const environmentFiles: Lib_DockerPackaging_Runner_BuildCompose_EnvironmentFiles = manifest['workspaces']
      .filter((workspace) => workspace['profile'] === 'background-service')
      .map((workspace) => `      - ./${workspace['path']}/.env`);
    const portSet: Lib_DockerPackaging_Runner_BuildCompose_PortSet = new Set();

    for (const service of manifest['services']) {
      if (service['port'] !== undefined) {
        portSet.add(service['port']);
      }
    }

    const ports: Lib_DockerPackaging_Runner_BuildCompose_Ports = [...portSet].sort((firstPort, secondPort) => firstPort - secondPort);
    const portLines: Lib_DockerPackaging_Runner_BuildCompose_PortLines = ports.map((port) => `      - "${port}:${port}"`);
    const hasContainerNativeService: Lib_DockerPackaging_Runner_BuildCompose_HasContainerNativeService = manifest['workspaces'].some((workspace) => workspace['profile'] === 'container-native');
    const environmentFileBlock: Lib_DockerPackaging_Runner_BuildCompose_EnvironmentFileBlock = (environmentFiles.length === 0) ? '' : [
      '    env_file:',
      ...environmentFiles,
    ].join('\n');
    const interactiveBlock: Lib_DockerPackaging_Runner_BuildCompose_InteractiveBlock = (hasContainerNativeService === true) ? [
      '    stdin_open: true',
      '    tty: true',
    ].join('\n') : '';
    const portBlock: Lib_DockerPackaging_Runner_BuildCompose_PortBlock = (portLines.length === 0) ? '' : [
      '    ports:',
      ...portLines,
    ].join('\n');
    const replacements: Lib_DockerPackaging_Runner_BuildCompose_Replacements = {
      '[__DOCKER_COMPOSE_ENV_FILES__]': environmentFileBlock,
      '[__DOCKER_COMPOSE_INTERACTIVE__]': interactiveBlock,
      '[__DOCKER_COMPOSE_PORTS__]': portBlock,
    };
    let content: Lib_DockerPackaging_Runner_BuildCompose_Content = template;

    for (const replacementEntry of Object.entries(replacements)) {
      content = content.split(replacementEntry[0]).join(replacementEntry[1]);
    }

    return content;
  }

  /**
   * Lib - Docker Packaging - Write Rootfs.
   *
   * Writes the native s6-rc database and executable helpers, including dependency
   * edges, the user bundle, init validation, and service supervision scripts.
   *
   * @param {Lib_DockerPackaging_String}          rootfsDirectory - Rootfs directory.
   * @param {Lib_DockerPackaging_Runner_Manifest} manifest        - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_WriteRootfs_Returns}
   *
   * @since 0.34.0
   */

  private static async writeRootfs(rootfsDirectory: Lib_DockerPackaging_Runner_WriteRootfs_RootfsDirectory, manifest: Lib_DockerPackaging_Runner_WriteRootfs_Manifest): Lib_DockerPackaging_Runner_WriteRootfs_Returns {
    const s6DatabaseDirectory: Lib_DockerPackaging_Runner_WriteRootfs_S6DatabaseDirectory = join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d');
    const userBundleDirectory: Lib_DockerPackaging_Runner_WriteRootfs_UserBundleDirectory = join(rootfsDirectory, 'etc', 's6-overlay', 'user-bundles.d', 'user', 'contents.d');
    const helperDirectory: Lib_DockerPackaging_Runner_WriteRootfs_HelperDirectory = join(rootfsDirectory, 'usr', 'local', 'libexec', 'nova-docker');
    const serviceHelperDirectory: Lib_DockerPackaging_Runner_WriteRootfs_ServiceHelperDirectory = join(helperDirectory, 'services');
    const novaConfigDirectory: Lib_DockerPackaging_Runner_WriteRootfs_NovaConfigDirectory = join(rootfsDirectory, 'etc', 'nova-docker');
    const initServiceDirectory: Lib_DockerPackaging_Runner_WriteRootfs_InitServiceDirectory = join(s6DatabaseDirectory, 'nova-container-init');
    const initDependenciesDirectory: Lib_DockerPackaging_Runner_WriteRootfs_InitDependenciesDirectory = join(initServiceDirectory, 'dependencies.d');
    const writablePaths: Lib_DockerPackaging_Runner_WriteRootfs_WritablePaths = [...new Set(manifest['services'].flatMap((service) => service['writablePaths']))].sort((firstPath, secondPath) => firstPath.localeCompare(secondPath));
    const shellVariableMarker: Lib_DockerPackaging_Runner_WriteRootfs_ShellVariableMarker = '$';
    const criticalFinishScript: Lib_DockerPackaging_Runner_WriteRootfs_CriticalFinishScript = [
      '#!/command/with-contenv sh',
      'set -eu',
      `if [ "${shellVariableMarker}{1:-0}" -ne 0 ] || [ "${shellVariableMarker}{2:-0}" -ne 0 ]; then`,
      '  exec /run/s6/basedir/bin/halt',
      'fi',
      'exit 0',
      '',
    ].join('\n');

    await Promise.all([
      fs.mkdir(userBundleDirectory, { recursive: true }),
      fs.mkdir(serviceHelperDirectory, { recursive: true }),
      fs.mkdir(novaConfigDirectory, { recursive: true }),
      fs.mkdir(initDependenciesDirectory, { recursive: true }),
    ]);

    await Promise.all([
      fs.writeFile(join(initServiceDirectory, 'type'), 'oneshot\n', 'utf-8'),
      fs.writeFile(join(initServiceDirectory, 'up'), '/usr/local/libexec/nova-docker/init-user\n', 'utf-8'),
      fs.writeFile(join(initDependenciesDirectory, 'base'), '', 'utf-8'),
      fs.writeFile(join(userBundleDirectory, 'nova-container-init'), '', 'utf-8'),
      Runner.writeExecutable(join(helperDirectory, 'init-user'), Runner.buildInitUser()),
      Runner.writeExecutable(join(helperDirectory, 'healthcheck'), Runner.buildHealthcheck(manifest)),
      fs.writeFile(join(novaConfigDirectory, 'writable-paths'), (writablePaths.length === 0) ? '' : `${writablePaths.join('\n')}\n`, 'utf-8'),
    ]);

    for (const service of manifest['services']) {
      const serviceDirectory: Lib_DockerPackaging_Runner_WriteRootfs_ServiceDirectory = join(s6DatabaseDirectory, service['name']);
      const dependenciesDirectory: Lib_DockerPackaging_Runner_WriteRootfs_DependenciesDirectory = join(serviceDirectory, 'dependencies.d');

      await fs.mkdir(dependenciesDirectory, { recursive: true });

      await Promise.all([
        fs.writeFile(join(serviceDirectory, 'type'), `${service['kind']}\n`, 'utf-8'),
        fs.writeFile(join(dependenciesDirectory, 'nova-container-init'), '', 'utf-8'),
        fs.writeFile(join(userBundleDirectory, service['name']), '', 'utf-8'),
      ]);

      for (const dependency of service['dependencies']) {
        await fs.writeFile(join(dependenciesDirectory, dependency), '', 'utf-8');
      }

      if (service['kind'] === 'oneshot') {
        await Promise.all([
          Runner.writeExecutable(join(serviceHelperDirectory, service['name']), Runner.buildRunScript(service)),
          fs.writeFile(join(serviceDirectory, 'up'), `/usr/local/libexec/nova-docker/services/${service['name']}\n`, 'utf-8'),
        ]);
      } else {
        await Runner.writeExecutable(join(serviceDirectory, 'run'), Runner.buildRunScript(service));

        if (service['critical'] === true) {
          await Runner.writeExecutable(join(serviceDirectory, 'finish'), criticalFinishScript);
        }
      }
    }

    return;
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

    if (service['runAsRoot'] === true) {
      lines.push(`exec ${service['command']}`);
    } else {
      lines.push(`exec /command/s6-applyuidgid -u "\${PUID:-1000}" -g "\${PGID:-1000}" -G "\${PGID:-1000}" ${service['command']}`);
    }

    return `${lines.join('\n')}\n`;
  }

  /**
   * Lib - Docker Packaging - Build Init User.
   *
   * Renders startup validation for identity and timezone while changing ownership
   * only on explicitly declared writable paths.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildInitUser_Returns}
   *
   * @since 0.34.0
   */

  private static buildInitUser(): Lib_DockerPackaging_Runner_BuildInitUser_Returns {
    const shellVariableMarker: Lib_DockerPackaging_Runner_BuildInitUser_ShellVariableMarker = '$';
    const protectedWritablePatterns: Lib_DockerPackaging_Runner_BuildInitUser_ProtectedWritablePatterns = dockerProtectedWritablePaths.flatMap((protectedPath) => [
      protectedPath,
      `${protectedPath}/*`,
    ]).join('|');

    return [
      '#!/command/with-contenv sh',
      'set -eu',
      '',
      `PUID_VALUE="${shellVariableMarker}{PUID:-1000}"`,
      `PGID_VALUE="${shellVariableMarker}{PGID:-1000}"`,
      `TZ_VALUE="${shellVariableMarker}{TZ:-UTC}"`,
      '',
      `case "${shellVariableMarker}{PUID_VALUE}" in`,
      '  \'\'|*[!0-9]*) echo \'PUID must be a positive integer.\' >&2; exit 1 ;;',
      'esac',
      `case "${shellVariableMarker}{PGID_VALUE}" in`,
      '  \'\'|*[!0-9]*) echo \'PGID must be a positive integer.\' >&2; exit 1 ;;',
      'esac',
      `if [ "${shellVariableMarker}{PUID_VALUE}" -le 0 ] || [ "${shellVariableMarker}{PUID_VALUE}" -gt 2147483647 ]; then`,
      '  echo \'PUID must be between 1 and 2147483647.\' >&2',
      '  exit 1',
      'fi',
      `if [ "${shellVariableMarker}{PGID_VALUE}" -le 0 ] || [ "${shellVariableMarker}{PGID_VALUE}" -gt 2147483647 ]; then`,
      '  echo \'PGID must be between 1 and 2147483647.\' >&2',
      '  exit 1',
      'fi',
      '',
      `case "${shellVariableMarker}{TZ_VALUE}" in`,
      '  \'\'|/*|*..*) echo \'TZ must name an installed IANA timezone.\' >&2; exit 1 ;;',
      'esac',
      `if [ ! -f "/usr/share/zoneinfo/${shellVariableMarker}{TZ_VALUE}" ]; then`,
      `  echo "Unknown timezone: ${shellVariableMarker}{TZ_VALUE}" >&2`,
      '  exit 1',
      'fi',
      '',
      'while IFS= read -r writable_path; do',
      `  [ -n "${shellVariableMarker}{writable_path}" ] || continue`,
      `  case "${shellVariableMarker}{writable_path}" in`,
      '    /*) ;;',
      `    *) echo "Writable path must be absolute: ${shellVariableMarker}{writable_path}" >&2; exit 1 ;;`,
      '  esac',
      `  case "${shellVariableMarker}{writable_path}" in`,
      `    /|${protectedWritablePatterns}|*/../*|*/./*)`,
      `      echo "Unsafe writable path: ${shellVariableMarker}{writable_path}" >&2`,
      '      exit 1',
      '      ;;',
      '  esac',
      `  mkdir -p -- "${shellVariableMarker}{writable_path}"`,
      `  chown "${shellVariableMarker}{PUID_VALUE}:${shellVariableMarker}{PGID_VALUE}" -- "${shellVariableMarker}{writable_path}"`,
      'done < /etc/nova-docker/writable-paths',
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
      'if [ -x /etc/nova-docker/healthcheck ]; then',
      '  exec /etc/nova-docker/healthcheck',
      'fi',
    ];
    const requiredServices: Lib_DockerPackaging_Runner_BuildHealthcheck_RequiredServices = manifest['services'].filter((service) => service['requiredForHealth'] === true);

    for (const service of requiredServices) {
      if (service['kind'] === 'longrun') {
        lines.push(`/command/s6-svstat -u /run/service/${service['name']} >/dev/null`);
      }

      if (service['healthCommand'] !== undefined) {
        lines.push(service['healthCommand']);
      }
    }

    lines.push('exit 0');

    return `${lines.join('\n')}\n`;
  }

  /**
   * Lib - Docker Packaging - Write Executable.
   *
   * Writes one executable rootfs helper and applies deterministic permissions only
   * after the file content is durable.
   *
   * @param {Lib_DockerPackaging_String} targetPath - Target path.
   * @param {Lib_DockerPackaging_String} content    - Content.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_WriteExecutable_Returns}
   *
   * @since 0.34.0
   */

  private static async writeExecutable(targetPath: Lib_DockerPackaging_Runner_WriteExecutable_TargetPath, content: Lib_DockerPackaging_Runner_WriteExecutable_Content): Lib_DockerPackaging_Runner_WriteExecutable_Returns {
    await fs.mkdir(dirname(targetPath), { recursive: true });

    await fs.writeFile(targetPath, content, 'utf-8');

    await fs.chmod(targetPath, parseInt('755', 8));

    return;
  }

  /**
   * Lib - Docker Packaging - Build Workspace Package.
   *
   * Creates the private, non-publishable Docker assembly package manifest with
   * validation and image-build scripts, but without publish or deployment scripts.
   *
   * @param {Lib_DockerPackaging_Runner_BuildWorkspacePackage_Slug} slug - Slug.
   *
   * @private
   *
   * @returns {Lib_DockerPackaging_Runner_BuildWorkspacePackage_Returns}
   *
   * @since 0.34.0
   */

  private static buildWorkspacePackage(slug: Lib_DockerPackaging_Runner_BuildWorkspacePackage_Slug): Lib_DockerPackaging_Runner_BuildWorkspacePackage_Returns {
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

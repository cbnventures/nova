import type {
  Shared_CorepackPackageManagerDescriptor,
  Shared_DockerImageProfile,
  Shared_DockerPackagingArgument,
  Shared_DockerPackagingArguments,
  Shared_DockerPackagingComment,
  Shared_DockerPackagingComposeNetwork,
  Shared_DockerPackagingComposeVolume,
  Shared_DockerPackagingExecutable,
  Shared_DockerPackagingImage,
  Shared_DockerPackagingImageAlias,
  Shared_DockerPackagingManifest,
  Shared_DockerPackagingManifest_Build,
  Shared_DockerPackagingManifest_Compose,
  Shared_DockerPackagingManifest_Compose_CapAdd,
  Shared_DockerPackagingManifest_Compose_Devices,
  Shared_DockerPackagingManifest_Compose_EnvironmentFiles,
  Shared_DockerPackagingManifest_Compose_Networks,
  Shared_DockerPackagingManifest_Compose_Ports,
  Shared_DockerPackagingManifest_Compose_Restart,
  Shared_DockerPackagingManifest_Compose_Volumes,
  Shared_DockerPackagingManifest_Dockerfile,
  Shared_DockerPackagingManifest_Dockerfile_Layout,
  Shared_DockerPackagingManifest_Images,
  Shared_DockerPackagingManifest_Project,
  Shared_DockerPackagingManifest_Runtime,
  Shared_DockerPackagingManifest_Runtime_Copies,
  Shared_DockerPackagingManifest_Runtime_Layout,
  Shared_DockerPackagingManifest_Runtime_Packages,
  Shared_DockerPackagingRenderInput,
  Shared_DockerPackagingRuntimeCopy,
  Shared_DockerPackagingServices,
  Shared_DockerPackagingStage_Before,
  Shared_DockerPackagingStages,
  Shared_DockerPackagingStringMap,
  Shared_DockerPackagingWorkspace,
  Shared_DockerPackagingWorkspacePackage,
} from '../shared.d.ts';

/**
 * Lib - Docker Render.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_BaseEnvironment = Shared_DockerPackagingStringMap;

export type Lib_DockerRender_BasePackages = string[];

export type Lib_DockerRender_ComposeIdentity = Shared_DockerPackagingStringMap;

export type Lib_DockerRender_NodeProfiles = Shared_DockerImageProfile[];

export type Lib_DockerRender_NovaStageNames = Shared_DockerPackagingStage_Before[];

/**
 * Lib - Docker Render - Assign Defined.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_AssignDefined_Target = object;

export type Lib_DockerRender_Runner_AssignDefined_Key = string;

export type Lib_DockerRender_Runner_AssignDefined_Value = unknown;

export type Lib_DockerRender_Runner_AssignDefined_Returns = void;

/**
 * Lib - Docker Render - Collect Ports.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_CollectPorts_Manifest = Shared_DockerPackagingManifest;

export type Lib_DockerRender_Runner_CollectPorts_Returns = number[];

export type Lib_DockerRender_Runner_CollectPorts_RuntimeSettings = Shared_DockerPackagingManifest_Runtime;

export type Lib_DockerRender_Runner_CollectPorts_Ports = Set<number>;

/**
 * Lib - Docker Render - Compare Text.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_CompareText_First = string;

export type Lib_DockerRender_Runner_CompareText_Second = string;

export type Lib_DockerRender_Runner_CompareText_Returns = number;

/**
 * Lib - Docker Render - Escape Docker Label.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_EscapeDockerLabel_Value = string;

export type Lib_DockerRender_Runner_EscapeDockerLabel_Returns = string;

/**
 * Lib - Docker Render - Format Argument.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_FormatArgument_Argument = Shared_DockerPackagingArgument;

export type Lib_DockerRender_Runner_FormatArgument_Returns = string;

export type Lib_DockerRender_Runner_FormatArgument_ArgumentValue = string | undefined;

/**
 * Lib - Docker Render - Format Banner.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_FormatBanner_StepNumber = number;

export type Lib_DockerRender_Runner_FormatBanner_Title = string;

export type Lib_DockerRender_Runner_FormatBanner_Returns = string[];

export type Lib_DockerRender_Runner_FormatBanner_TitleLine = string;

export type Lib_DockerRender_Runner_FormatBanner_Rule = string;

/**
 * Lib - Docker Render - Format Compose Comment.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_FormatComposeComment_Comment = Shared_DockerPackagingComment;

export type Lib_DockerRender_Runner_FormatComposeComment_Indent = string;

export type Lib_DockerRender_Runner_FormatComposeComment_Returns = string[];

/**
 * Lib - Docker Render - Format Compose String.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_FormatComposeString_Value = string;

export type Lib_DockerRender_Runner_FormatComposeString_Returns = string;

/**
 * Lib - Docker Render - Format Copy.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_FormatCopy_Copy = Shared_DockerPackagingRuntimeCopy;

export type Lib_DockerRender_Runner_FormatCopy_Returns = string;

export type Lib_DockerRender_Runner_FormatCopy_Flags = string[];

/**
 * Lib - Docker Render - Format Path.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_FormatPath_Value = string;

export type Lib_DockerRender_Runner_FormatPath_Returns = string;

/**
 * Lib - Docker Render - Format Run.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_FormatRun_Commands = string[];

export type Lib_DockerRender_Runner_FormatRun_Prefix = string;

export type Lib_DockerRender_Runner_FormatRun_Returns = string[];

export type Lib_DockerRender_Runner_FormatRun_CommandStart = string;

export type Lib_DockerRender_Runner_FormatRun_CommandEnd = string;

/**
 * Lib - Docker Render - Format Source URL.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_FormatSourceUrl_Value = string;

export type Lib_DockerRender_Runner_FormatSourceUrl_Returns = string;

export type Lib_DockerRender_Runner_FormatSourceUrl_SourceUrl = string;

/**
 * Lib - Docker Render - Format Stage.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_FormatStage_Block = string[];

export type Lib_DockerRender_Runner_FormatStage_Blocks = Lib_DockerRender_Runner_FormatStage_Block[];

export type Lib_DockerRender_Runner_FormatStage_Layout = Shared_DockerPackagingManifest_Dockerfile_Layout;

export type Lib_DockerRender_Runner_FormatStage_Returns = string;

export type Lib_DockerRender_Runner_FormatStage_NonEmptyBlocks = Lib_DockerRender_Runner_FormatStage_Block[];

/**
 * Lib - Docker Render - Generated Header.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_GeneratedHeader_Notes = string[];

export type Lib_DockerRender_Runner_GeneratedHeader_Returns = string[];

/**
 * Lib - Docker Render - Inherits Frontend.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_InheritsFrontend_Base = string;

export type Lib_DockerRender_Runner_InheritsFrontend_StageFragments = Map<string, string>;

export type Lib_DockerRender_Runner_InheritsFrontend_Returns = boolean;

export type Lib_DockerRender_Runner_InheritsFrontend_Visited = Set<string>;

export type Lib_DockerRender_Runner_InheritsFrontend_Current = string | undefined;

export type Lib_DockerRender_Runner_InheritsFrontend_Fragment = string | undefined;

export type Lib_DockerRender_Runner_InheritsFrontend_FragmentLines = string[];

export type Lib_DockerRender_Runner_InheritsFrontend_FromLine = string | undefined;

export type Lib_DockerRender_Runner_InheritsFrontend_FromMatch = RegExpExecArray | null;

/**
 * Lib - Docker Render - Normalize Arguments.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_NormalizeArguments_Value = unknown;

export type Lib_DockerRender_Runner_NormalizeArguments_Label = string;

export type Lib_DockerRender_Runner_NormalizeArguments_Returns = Shared_DockerPackagingArguments | undefined;

export type Lib_DockerRender_Runner_NormalizeArguments_ArgumentValues = unknown[] | undefined;

export type Lib_DockerRender_Runner_NormalizeArguments_Normalized = Shared_DockerPackagingArguments;

export type Lib_DockerRender_Runner_NormalizeArguments_ArgumentObject = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeArguments_Name = string | undefined;

export type Lib_DockerRender_Runner_NormalizeArguments_ValueText = string | undefined;

export type Lib_DockerRender_Runner_NormalizeArguments_Quoted = boolean | undefined;

export type Lib_DockerRender_Runner_NormalizeArguments_Argument = Shared_DockerPackagingArgument;

/**
 * Lib - Docker Render - Normalize Compose.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_NormalizeCompose_Value = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeCompose_Returns = Shared_DockerPackagingManifest_Compose;

export type Lib_DockerRender_Runner_NormalizeCompose_Compose = Shared_DockerPackagingManifest_Compose;

export type Lib_DockerRender_Runner_NormalizeCompose_RestartValue = string | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_Restart = Shared_DockerPackagingManifest_Compose_Restart | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_Environment = Shared_DockerPackagingStringMap | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_EnvironmentFilesValue = unknown[] | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_EnvironmentFiles = Shared_DockerPackagingManifest_Compose_EnvironmentFiles;

export type Lib_DockerRender_Runner_NormalizeCompose_EnvironmentFileObject = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeCompose_FilePath = string | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_FileRequired = boolean | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_Image = string | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_Name = string | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_NetworksValue = Record<string, unknown> | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_Networks = Shared_DockerPackagingManifest_Compose_Networks;

export type Lib_DockerRender_Runner_NormalizeCompose_NetworkSettings = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeCompose_NetworkConfig = Shared_DockerPackagingComposeNetwork;

export type Lib_DockerRender_Runner_NormalizeCompose_Ports = Shared_DockerPackagingManifest_Compose_Ports | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_Service = string | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_User = string | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_VolumesValue = unknown[] | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_Volumes = Shared_DockerPackagingManifest_Compose_Volumes;

export type Lib_DockerRender_Runner_NormalizeCompose_VolumeObject = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeCompose_VolumeSource = string | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_VolumeTarget = string | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_VolumeReadOnly = boolean | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_VolumeComment = Shared_DockerPackagingComment | undefined;

export type Lib_DockerRender_Runner_NormalizeCompose_Volume = Shared_DockerPackagingComposeVolume;

/**
 * Lib - Docker Render - Normalize Runtime.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_NormalizeRuntime_Value = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeRuntime_Returns = Shared_DockerPackagingManifest_Runtime;

export type Lib_DockerRender_Runner_NormalizeRuntime_Runtime = Shared_DockerPackagingManifest_Runtime;

export type Lib_DockerRender_Runner_NormalizeRuntime_RuntimeArguments = Shared_DockerPackagingArguments | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_CopiesValue = unknown[] | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_Copies = Shared_DockerPackagingManifest_Runtime_Copies;

export type Lib_DockerRender_Runner_NormalizeRuntime_CopyObject = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeRuntime_CopySource = string | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_CopyDestination = string | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_Copy = Shared_DockerPackagingRuntimeCopy;

export type Lib_DockerRender_Runner_NormalizeRuntime_Directories = string[] | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_Environment = Shared_DockerPackagingStringMap | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_EnvironmentPath = string | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_ExposeValue = unknown[] | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_Expose = number[];

export type Lib_DockerRender_Runner_NormalizeRuntime_From = string | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_Labels = Shared_DockerPackagingStringMap | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_LayoutValue = string | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_Layout = Shared_DockerPackagingManifest_Runtime_Layout | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_PackageCommands = string[] | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_PackagesValue = unknown[] | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_Packages = Shared_DockerPackagingManifest_Runtime_Packages;

export type Lib_DockerRender_Runner_NormalizeRuntime_PackageObject = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeRuntime_PackageName = string | undefined;

export type Lib_DockerRender_Runner_NormalizeRuntime_PackageVersion = string | undefined;

/**
 * Lib - Docker Render - Normalize Settings.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_NormalizeSettings_Value = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeSettings_Returns = Pick<Shared_DockerPackagingManifest, 'build' | 'compose' | 'dockerfile' | 'healthService' | 'images' | 'project' | 'runtime' | 's6Overlay'>;

export type Lib_DockerRender_Runner_NormalizeSettings_Settings = Pick<Shared_DockerPackagingManifest, 'build' | 'compose' | 'dockerfile' | 'healthService' | 'images' | 'project' | 'runtime' | 's6Overlay'>;

export type Lib_DockerRender_Runner_NormalizeSettings_BuildValue = Record<string, unknown> | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_Build = Shared_DockerPackagingManifest_Build;

export type Lib_DockerRender_Runner_NormalizeSettings_BuildFlag = boolean | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_ComposeValue = Record<string, unknown> | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_DockerfileValue = Record<string, unknown> | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_Dockerfile = Shared_DockerPackagingManifest_Dockerfile;

export type Lib_DockerRender_Runner_NormalizeSettings_LayoutValue = string | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_Layout = Shared_DockerPackagingManifest_Dockerfile_Layout | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_HealthService = string | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_ImagesValue = Record<string, unknown> | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_Images = Shared_DockerPackagingManifest_Images;

export type Lib_DockerRender_Runner_NormalizeSettings_ImageValue = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeSettings_ImageReference = string | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_ProjectValue = Record<string, unknown> | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_ExecutablesValue = unknown[];

export type Lib_DockerRender_Runner_NormalizeSettings_Executables = Shared_DockerPackagingExecutable[];

export type Lib_DockerRender_Runner_NormalizeSettings_ExecutableObject = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeSettings_ExecutablePath = string | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_ExecutableName = string | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_RuntimeValue = Record<string, unknown> | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_S6OverlayValue = Record<string, unknown> | undefined;

export type Lib_DockerRender_Runner_NormalizeSettings_S6OverlayFrom = string | undefined;

/**
 * Lib - Docker Render - Normalize Stages.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_NormalizeStages_Value = unknown;

export type Lib_DockerRender_Runner_NormalizeStages_Returns = Shared_DockerPackagingStages | undefined;

export type Lib_DockerRender_Runner_NormalizeStages_StageValues = unknown[] | undefined;

export type Lib_DockerRender_Runner_NormalizeStages_Stages = Shared_DockerPackagingStages;

export type Lib_DockerRender_Runner_NormalizeStages_StageNames = Set<string>;

export type Lib_DockerRender_Runner_NormalizeStages_StageObject = Record<string, unknown>;

export type Lib_DockerRender_Runner_NormalizeStages_Name = string | undefined;

export type Lib_DockerRender_Runner_NormalizeStages_File = string | undefined;

export type Lib_DockerRender_Runner_NormalizeStages_BeforeValue = string | undefined;

export type Lib_DockerRender_Runner_NormalizeStages_Before = Shared_DockerPackagingStage_Before | undefined;

/**
 * Lib - Docker Render - Read Boolean.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ReadBoolean_Value = unknown;

export type Lib_DockerRender_Runner_ReadBoolean_Label = string;

export type Lib_DockerRender_Runner_ReadBoolean_Returns = boolean | undefined;

/**
 * Lib - Docker Render - Read List.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ReadList_Value = unknown;

export type Lib_DockerRender_Runner_ReadList_Label = string;

export type Lib_DockerRender_Runner_ReadList_Returns = unknown[] | undefined;

/**
 * Lib - Docker Render - Read Object.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ReadObject_Value = unknown;

export type Lib_DockerRender_Runner_ReadObject_Label = string;

export type Lib_DockerRender_Runner_ReadObject_Returns = Record<string, unknown> | undefined;

/**
 * Lib - Docker Render - Read String.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ReadString_Value = unknown;

export type Lib_DockerRender_Runner_ReadString_Label = string;

export type Lib_DockerRender_Runner_ReadString_Pattern = RegExp;

export type Lib_DockerRender_Runner_ReadString_Returns = string | undefined;

/**
 * Lib - Docker Render - Read String List.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ReadStringList_Value = unknown;

export type Lib_DockerRender_Runner_ReadStringList_Label = string;

export type Lib_DockerRender_Runner_ReadStringList_Pattern = RegExp;

export type Lib_DockerRender_Runner_ReadStringList_Returns = string[] | undefined;

export type Lib_DockerRender_Runner_ReadStringList_Values = unknown[] | undefined;

export type Lib_DockerRender_Runner_ReadStringList_Strings = string[];

/**
 * Lib - Docker Render - Read String Map.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ReadStringMap_Value = unknown;

export type Lib_DockerRender_Runner_ReadStringMap_Label = string;

export type Lib_DockerRender_Runner_ReadStringMap_KeyPattern = RegExp;

export type Lib_DockerRender_Runner_ReadStringMap_ValuePattern = RegExp;

export type Lib_DockerRender_Runner_ReadStringMap_Returns = Shared_DockerPackagingStringMap | undefined;

export type Lib_DockerRender_Runner_ReadStringMap_Object = Record<string, unknown> | undefined;

export type Lib_DockerRender_Runner_ReadStringMap_Map = Shared_DockerPackagingStringMap;

/**
 * Lib - Docker Render - Render Build Stage.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_RenderBuildStage_Input = Shared_DockerPackagingRenderInput;

export type Lib_DockerRender_Runner_RenderBuildStage_StepNumber = number;

export type Lib_DockerRender_Runner_RenderBuildStage_Block = string[];

export type Lib_DockerRender_Runner_RenderBuildStage_Returns = Lib_DockerRender_Runner_RenderBuildStage_Block[];

export type Lib_DockerRender_Runner_RenderBuildStage_Manifest = Shared_DockerPackagingManifest;

export type Lib_DockerRender_Runner_RenderBuildStage_BuildSettings = Shared_DockerPackagingManifest_Build;

export type Lib_DockerRender_Runner_RenderBuildStage_RuntimeSettings = Shared_DockerPackagingManifest_Runtime;

export type Lib_DockerRender_Runner_RenderBuildStage_PackageManagerDescriptor = Shared_CorepackPackageManagerDescriptor | undefined;

export type Lib_DockerRender_Runner_RenderBuildStage_PackageManager = Shared_CorepackPackageManagerDescriptor['name'];

export type Lib_DockerRender_Runner_RenderBuildStage_PackageManagerVersion = string;

export type Lib_DockerRender_Runner_RenderBuildStage_IsYarnClassic = boolean;

export type Lib_DockerRender_Runner_RenderBuildStage_UsesSyntheticManifests = boolean;

export type Lib_DockerRender_Runner_RenderBuildStage_CorepackVersion = string;

export type Lib_DockerRender_Runner_RenderBuildStage_InstallCommand = string;

export type Lib_DockerRender_Runner_RenderBuildStage_PruneCommand = string;

export type Lib_DockerRender_Runner_RenderBuildStage_ManifestCopyLines = string[];

export type Lib_DockerRender_Runner_RenderBuildStage_SourceLines = string[];

export type Lib_DockerRender_Runner_RenderBuildStage_BuildCommands = string[];

export type Lib_DockerRender_Runner_RenderBuildStage_WorkspacePath = string;

export type Lib_DockerRender_Runner_RenderBuildStage_ManifestWorkspace = Shared_DockerPackagingWorkspace | undefined;

export type Lib_DockerRender_Runner_RenderBuildStage_ManifestSourcePath = string;

export type Lib_DockerRender_Runner_RenderBuildStage_CopyLines = string[];

export type Lib_DockerRender_Runner_RenderBuildStage_PackageJson = Record<string, unknown>;

export type Lib_DockerRender_Runner_RenderBuildStage_ScriptsValue = unknown;

export type Lib_DockerRender_Runner_RenderBuildStage_BuildScript = string;

export type Lib_DockerRender_Runner_RenderBuildStage_ScriptValue = unknown;

export type Lib_DockerRender_Runner_RenderBuildStage_QuotedPackageName = string;

export type Lib_DockerRender_Runner_RenderBuildStage_RunPrefix = string;

export type Lib_DockerRender_Runner_RenderBuildStage_BuildCommand = string;

export type Lib_DockerRender_Runner_RenderBuildStage_NeedsNodeRuntime = boolean;

export type Lib_DockerRender_Runner_RenderBuildStage_RuntimeAssemblyCommands = string[];

/**
 * Lib - Docker Render - Render Compose.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_RenderCompose_Manifest = Shared_DockerPackagingManifest;

export type Lib_DockerRender_Runner_RenderCompose_Returns = string;

export type Lib_DockerRender_Runner_RenderCompose_Compose = Shared_DockerPackagingManifest_Compose;

export type Lib_DockerRender_Runner_RenderCompose_ServiceName = string;

export type Lib_DockerRender_Runner_RenderCompose_Lines = string[];

export type Lib_DockerRender_Runner_RenderCompose_CapAdd = Shared_DockerPackagingManifest_Compose_CapAdd;

export type Lib_DockerRender_Runner_RenderCompose_Devices = Shared_DockerPackagingManifest_Compose_Devices;

export type Lib_DockerRender_Runner_RenderCompose_EnvironmentFiles = Shared_DockerPackagingManifest_Compose_EnvironmentFiles;

export type Lib_DockerRender_Runner_RenderCompose_EnvironmentEntry = [string, string];

export type Lib_DockerRender_Runner_RenderCompose_Environment = Lib_DockerRender_Runner_RenderCompose_EnvironmentEntry[];

export type Lib_DockerRender_Runner_RenderCompose_Ports = string[];

export type Lib_DockerRender_Runner_RenderCompose_Volumes = Shared_DockerPackagingManifest_Compose_Volumes;

export type Lib_DockerRender_Runner_RenderCompose_NamedVolumes = string[];

export type Lib_DockerRender_Runner_RenderCompose_Volume = Shared_DockerPackagingComposeVolume | undefined;

export type Lib_DockerRender_Runner_RenderCompose_ReadOnlySuffix = string;

export type Lib_DockerRender_Runner_RenderCompose_Networks = Shared_DockerPackagingManifest_Compose_Networks;

export type Lib_DockerRender_Runner_RenderCompose_NetworkNames = string[];

/**
 * Lib - Docker Render - Render Dockerfile.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_RenderDockerfile_Input = Shared_DockerPackagingRenderInput;

export type Lib_DockerRender_Runner_RenderDockerfile_Returns = string;

export type Lib_DockerRender_Runner_RenderDockerfile_Layout = Shared_DockerPackagingManifest_Dockerfile_Layout;

export type Lib_DockerRender_Runner_RenderDockerfile_StageOrder = string[];

export type Lib_DockerRender_Runner_RenderDockerfile_ArgumentLines = string[];

export type Lib_DockerRender_Runner_RenderDockerfile_HasStageFragments = boolean;

export type Lib_DockerRender_Runner_RenderDockerfile_HeaderNotes = string[];

export type Lib_DockerRender_Runner_RenderDockerfile_Sections = string[];

export type Lib_DockerRender_Runner_RenderDockerfile_StageName = string;

/**
 * Lib - Docker Render - Render Runtime Stage.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_RenderRuntimeStage_Input = Shared_DockerPackagingRenderInput;

export type Lib_DockerRender_Runner_RenderRuntimeStage_StepNumber = number;

export type Lib_DockerRender_Runner_RenderRuntimeStage_Block = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_Returns = Lib_DockerRender_Runner_RenderRuntimeStage_Block[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_Manifest = Shared_DockerPackagingManifest;

export type Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeSettings = Shared_DockerPackagingManifest_Runtime;

export type Lib_DockerRender_Runner_RenderRuntimeStage_IsBuildEnabled = boolean;

export type Lib_DockerRender_Runner_RenderRuntimeStage_IsOutputsLayout = boolean;

export type Lib_DockerRender_Runner_RenderRuntimeStage_NeedsNodeRuntime = boolean;

export type Lib_DockerRender_Runner_RenderRuntimeStage_BaseImage = string;

export type Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeArguments = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_ProjectValue = unknown;

export type Lib_DockerRender_Runner_RenderRuntimeStage_Project = Record<string, unknown>;

export type Lib_DockerRender_Runner_RenderRuntimeStage_ProjectNameValue = unknown;

export type Lib_DockerRender_Runner_RenderRuntimeStage_ProjectName = Record<string, unknown>;

export type Lib_DockerRender_Runner_RenderRuntimeStage_ProjectDescriptionValue = unknown;

export type Lib_DockerRender_Runner_RenderRuntimeStage_ProjectDescription = Record<string, unknown>;

export type Lib_DockerRender_Runner_RenderRuntimeStage_UrlsValue = unknown;

export type Lib_DockerRender_Runner_RenderRuntimeStage_Urls = Record<string, unknown>;

export type Lib_DockerRender_Runner_RenderRuntimeStage_ProjectTitle = string;

export type Lib_DockerRender_Runner_RenderRuntimeStage_StringField = (source: Record<string, unknown>, key: string) => string;

export type Lib_DockerRender_Runner_RenderRuntimeStage_LabelEntry = [string, string];

export type Lib_DockerRender_Runner_RenderRuntimeStage_LabelEntries = Lib_DockerRender_Runner_RenderRuntimeStage_LabelEntry[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_LabelLines = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_LabelPrefix = string;

export type Lib_DockerRender_Runner_RenderRuntimeStage_LabelSuffix = string;

export type Lib_DockerRender_Runner_RenderRuntimeStage_Packages = Map<string, string>;

export type Lib_DockerRender_Runner_RenderRuntimeStage_PackageLines = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_AptCommands = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentEntry = [string, string];

export type Lib_DockerRender_Runner_RenderRuntimeStage_Environment = Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentEntry[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentLines = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentPrefix = string;

export type Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentSuffix = string;

export type Lib_DockerRender_Runner_RenderRuntimeStage_Copies = Shared_DockerPackagingManifest_Runtime_Copies;

export type Lib_DockerRender_Runner_RenderRuntimeStage_RootfsCopyLines = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_ProjectSettings = Shared_DockerPackagingManifest_Project;

export type Lib_DockerRender_Runner_RenderRuntimeStage_FixCommands = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_NameFlag = string;

export type Lib_DockerRender_Runner_RenderRuntimeStage_CopyLines = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeWorkspacePath = string;

export type Lib_DockerRender_Runner_RenderRuntimeStage_StaticServices = Shared_DockerPackagingServices;

export type Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeAssemblyWorkspaces = Shared_DockerPackagingWorkspacePackage[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_Directories = string[];

export type Lib_DockerRender_Runner_RenderRuntimeStage_Ports = number[];

/**
 * Lib - Docker Render - Render Runtime Stage - String Field.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_RenderRuntimeStage_StringField_FieldValue = unknown;

/**
 * Lib - Docker Render - Render S6 Overlay Stage.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_RenderS6OverlayStage_Input = Shared_DockerPackagingRenderInput;

export type Lib_DockerRender_Runner_RenderS6OverlayStage_StepNumber = number;

export type Lib_DockerRender_Runner_RenderS6OverlayStage_Block = string[];

export type Lib_DockerRender_Runner_RenderS6OverlayStage_Returns = Lib_DockerRender_Runner_RenderS6OverlayStage_Block[];

export type Lib_DockerRender_Runner_RenderS6OverlayStage_S6OverlayFrom = string | undefined;

export type Lib_DockerRender_Runner_RenderS6OverlayStage_BaseImage = string;

export type Lib_DockerRender_Runner_RenderS6OverlayStage_ShellVariableMarker = string;

/**
 * Lib - Docker Render - Resolve Image.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ResolveImage_Manifest = Shared_DockerPackagingManifest;

export type Lib_DockerRender_Runner_ResolveImage_Alias = Shared_DockerPackagingImageAlias;

export type Lib_DockerRender_Runner_ResolveImage_Returns = string;

export type Lib_DockerRender_Runner_ResolveImage_Images = Shared_DockerPackagingManifest_Images;

export type Lib_DockerRender_Runner_ResolveImage_Override = Shared_DockerPackagingImage | undefined;

/**
 * Lib - Docker Render - Resolve Stage Order.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ResolveStageOrder_Manifest = Shared_DockerPackagingManifest;

export type Lib_DockerRender_Runner_ResolveStageOrder_Returns = string[];

export type Lib_DockerRender_Runner_ResolveStageOrder_Stages = Shared_DockerPackagingStages;

export type Lib_DockerRender_Runner_ResolveStageOrder_IsBuildEnabled = boolean;

export type Lib_DockerRender_Runner_ResolveStageOrder_Order = string[];

export type Lib_DockerRender_Runner_ResolveStageOrder_Anchor = Shared_DockerPackagingStage_Before;

/**
 * Lib - Docker Render - Shell Quote.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ShellQuote_Value = string;

export type Lib_DockerRender_Runner_ShellQuote_Returns = string;

/**
 * Lib - Docker Render - Uses Synthetic Manifests.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_UsesSyntheticManifests_Manifest = Shared_DockerPackagingManifest;

export type Lib_DockerRender_Runner_UsesSyntheticManifests_RootPackage = Record<string, unknown>;

export type Lib_DockerRender_Runner_UsesSyntheticManifests_Returns = boolean;

export type Lib_DockerRender_Runner_UsesSyntheticManifests_Build = Shared_DockerPackagingManifest_Build;

export type Lib_DockerRender_Runner_UsesSyntheticManifests_PackageManagerDescriptor = Shared_CorepackPackageManagerDescriptor | undefined;

/**
 * Lib - Docker Render - Validate Stages.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ValidateStages_Input = Shared_DockerPackagingRenderInput;

export type Lib_DockerRender_Runner_ValidateStages_Returns = void;

export type Lib_DockerRender_Runner_ValidateStages_StageOrder = string[];

export type Lib_DockerRender_Runner_ValidateStages_Positions = Map<string, number>;

export type Lib_DockerRender_Runner_ValidateStages_StageFromPattern = RegExp;

export type Lib_DockerRender_Runner_ValidateStages_Fragment = string | undefined;

export type Lib_DockerRender_Runner_ValidateStages_FromLines = string[];

export type Lib_DockerRender_Runner_ValidateStages_FromMatch = RegExpExecArray | null;

export type Lib_DockerRender_Runner_ValidateStages_ValidateReference = (reference: string, position: number, label: string) => void;

export type Lib_DockerRender_Runner_ValidateStages_CopySource = string | undefined;

/**
 * Lib - Docker Render - Validate Stages - Validate Reference.
 *
 * @since 0.49.0
 */
export type Lib_DockerRender_Runner_ValidateStages_ValidateReference_ReferencePosition = number | undefined;

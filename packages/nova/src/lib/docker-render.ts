import { LIB_CONSTANTS_DOCS_BASE_URL } from './constants.js';
import { Runner as LibCorepack } from './corepack.js';
import {
  LIB_REGEX_PATTERN_DOCKER_ARGUMENT_NAME,
  LIB_REGEX_PATTERN_DOCKER_CAPABILITY,
  LIB_REGEX_PATTERN_DOCKER_COPY_PATH,
  LIB_REGEX_PATTERN_DOCKER_FILE_MODE,
  LIB_REGEX_PATTERN_DOCKER_FIND_NAME,
  LIB_REGEX_PATTERN_DOCKER_IDENTITY,
  LIB_REGEX_PATTERN_DOCKER_IMAGE_REFERENCE,
  LIB_REGEX_PATTERN_DOCKER_LABEL_KEY,
  LIB_REGEX_PATTERN_DOCKER_PACKAGE_NAME,
  LIB_REGEX_PATTERN_DOCKER_PLAIN_VALUE,
  LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE,
  LIB_REGEX_PATTERN_DOCKER_STAGE_FROM,
  LIB_REGEX_PATTERN_DOCKER_STAGE_NAME,
  LIB_REGEX_PATTERN_SLUG_SIMPLE,
} from './regex.js';
import { getScaffoldVersion } from './scaffold-versions.js';
import { isPlainObject } from './utility.js';

import type {
  Lib_DockerRender_BaseEnvironment,
  Lib_DockerRender_BasePackages,
  Lib_DockerRender_ComposeIdentity,
  Lib_DockerRender_NodeProfiles,
  Lib_DockerRender_NovaStageNames,
  Lib_DockerRender_Runner_AssignDefined_Key,
  Lib_DockerRender_Runner_AssignDefined_Returns,
  Lib_DockerRender_Runner_AssignDefined_Target,
  Lib_DockerRender_Runner_AssignDefined_Value,
  Lib_DockerRender_Runner_CollectPorts_Manifest,
  Lib_DockerRender_Runner_CollectPorts_Ports,
  Lib_DockerRender_Runner_CollectPorts_Returns,
  Lib_DockerRender_Runner_CollectPorts_RuntimeSettings,
  Lib_DockerRender_Runner_CompareText_First,
  Lib_DockerRender_Runner_CompareText_Returns,
  Lib_DockerRender_Runner_CompareText_Second,
  Lib_DockerRender_Runner_EscapeDockerLabel_Returns,
  Lib_DockerRender_Runner_EscapeDockerLabel_Value,
  Lib_DockerRender_Runner_FormatArgument_Argument,
  Lib_DockerRender_Runner_FormatArgument_ArgumentValue,
  Lib_DockerRender_Runner_FormatArgument_Returns,
  Lib_DockerRender_Runner_FormatBanner_Returns,
  Lib_DockerRender_Runner_FormatBanner_Rule,
  Lib_DockerRender_Runner_FormatBanner_StepNumber,
  Lib_DockerRender_Runner_FormatBanner_Title,
  Lib_DockerRender_Runner_FormatBanner_TitleLine,
  Lib_DockerRender_Runner_FormatComposeComment_Comment,
  Lib_DockerRender_Runner_FormatComposeComment_Indent,
  Lib_DockerRender_Runner_FormatComposeComment_Returns,
  Lib_DockerRender_Runner_FormatComposeString_Returns,
  Lib_DockerRender_Runner_FormatComposeString_Value,
  Lib_DockerRender_Runner_FormatCopy_Copy,
  Lib_DockerRender_Runner_FormatCopy_Flags,
  Lib_DockerRender_Runner_FormatCopy_Returns,
  Lib_DockerRender_Runner_FormatPath_Returns,
  Lib_DockerRender_Runner_FormatPath_Value,
  Lib_DockerRender_Runner_FormatRun_CommandEnd,
  Lib_DockerRender_Runner_FormatRun_Commands,
  Lib_DockerRender_Runner_FormatRun_CommandStart,
  Lib_DockerRender_Runner_FormatRun_Prefix,
  Lib_DockerRender_Runner_FormatRun_Returns,
  Lib_DockerRender_Runner_FormatSourceUrl_Returns,
  Lib_DockerRender_Runner_FormatSourceUrl_SourceUrl,
  Lib_DockerRender_Runner_FormatSourceUrl_Value,
  Lib_DockerRender_Runner_FormatStage_Blocks,
  Lib_DockerRender_Runner_FormatStage_Layout,
  Lib_DockerRender_Runner_FormatStage_NonEmptyBlocks,
  Lib_DockerRender_Runner_FormatStage_Returns,
  Lib_DockerRender_Runner_GeneratedHeader_Notes,
  Lib_DockerRender_Runner_GeneratedHeader_Returns,
  Lib_DockerRender_Runner_InheritsFrontend_Base,
  Lib_DockerRender_Runner_InheritsFrontend_Current,
  Lib_DockerRender_Runner_InheritsFrontend_Fragment,
  Lib_DockerRender_Runner_InheritsFrontend_FragmentLines,
  Lib_DockerRender_Runner_InheritsFrontend_FromLine,
  Lib_DockerRender_Runner_InheritsFrontend_FromMatch,
  Lib_DockerRender_Runner_InheritsFrontend_Returns,
  Lib_DockerRender_Runner_InheritsFrontend_StageFragments,
  Lib_DockerRender_Runner_InheritsFrontend_Visited,
  Lib_DockerRender_Runner_NormalizeArguments_Argument,
  Lib_DockerRender_Runner_NormalizeArguments_ArgumentObject,
  Lib_DockerRender_Runner_NormalizeArguments_ArgumentValues,
  Lib_DockerRender_Runner_NormalizeArguments_Label,
  Lib_DockerRender_Runner_NormalizeArguments_Name,
  Lib_DockerRender_Runner_NormalizeArguments_Normalized,
  Lib_DockerRender_Runner_NormalizeArguments_Quoted,
  Lib_DockerRender_Runner_NormalizeArguments_Returns,
  Lib_DockerRender_Runner_NormalizeArguments_Value,
  Lib_DockerRender_Runner_NormalizeArguments_ValueText,
  Lib_DockerRender_Runner_NormalizeCompose_Compose,
  Lib_DockerRender_Runner_NormalizeCompose_Environment,
  Lib_DockerRender_Runner_NormalizeCompose_EnvironmentFileObject,
  Lib_DockerRender_Runner_NormalizeCompose_EnvironmentFiles,
  Lib_DockerRender_Runner_NormalizeCompose_EnvironmentFilesValue,
  Lib_DockerRender_Runner_NormalizeCompose_FilePath,
  Lib_DockerRender_Runner_NormalizeCompose_FileRequired,
  Lib_DockerRender_Runner_NormalizeCompose_Image,
  Lib_DockerRender_Runner_NormalizeCompose_Name,
  Lib_DockerRender_Runner_NormalizeCompose_NetworkConfig,
  Lib_DockerRender_Runner_NormalizeCompose_Networks,
  Lib_DockerRender_Runner_NormalizeCompose_NetworkSettings,
  Lib_DockerRender_Runner_NormalizeCompose_NetworksValue,
  Lib_DockerRender_Runner_NormalizeCompose_Ports,
  Lib_DockerRender_Runner_NormalizeCompose_Restart,
  Lib_DockerRender_Runner_NormalizeCompose_RestartValue,
  Lib_DockerRender_Runner_NormalizeCompose_Returns,
  Lib_DockerRender_Runner_NormalizeCompose_Service,
  Lib_DockerRender_Runner_NormalizeCompose_User,
  Lib_DockerRender_Runner_NormalizeCompose_Value,
  Lib_DockerRender_Runner_NormalizeCompose_Volume,
  Lib_DockerRender_Runner_NormalizeCompose_VolumeComment,
  Lib_DockerRender_Runner_NormalizeCompose_VolumeObject,
  Lib_DockerRender_Runner_NormalizeCompose_VolumeReadOnly,
  Lib_DockerRender_Runner_NormalizeCompose_Volumes,
  Lib_DockerRender_Runner_NormalizeCompose_VolumeSource,
  Lib_DockerRender_Runner_NormalizeCompose_VolumesValue,
  Lib_DockerRender_Runner_NormalizeCompose_VolumeTarget,
  Lib_DockerRender_Runner_NormalizeRuntime_Copies,
  Lib_DockerRender_Runner_NormalizeRuntime_CopiesValue,
  Lib_DockerRender_Runner_NormalizeRuntime_Copy,
  Lib_DockerRender_Runner_NormalizeRuntime_CopyDestination,
  Lib_DockerRender_Runner_NormalizeRuntime_CopyObject,
  Lib_DockerRender_Runner_NormalizeRuntime_CopySource,
  Lib_DockerRender_Runner_NormalizeRuntime_Directories,
  Lib_DockerRender_Runner_NormalizeRuntime_Environment,
  Lib_DockerRender_Runner_NormalizeRuntime_EnvironmentPath,
  Lib_DockerRender_Runner_NormalizeRuntime_Expose,
  Lib_DockerRender_Runner_NormalizeRuntime_ExposeValue,
  Lib_DockerRender_Runner_NormalizeRuntime_From,
  Lib_DockerRender_Runner_NormalizeRuntime_Labels,
  Lib_DockerRender_Runner_NormalizeRuntime_Layout,
  Lib_DockerRender_Runner_NormalizeRuntime_LayoutValue,
  Lib_DockerRender_Runner_NormalizeRuntime_PackageCommands,
  Lib_DockerRender_Runner_NormalizeRuntime_PackageName,
  Lib_DockerRender_Runner_NormalizeRuntime_PackageObject,
  Lib_DockerRender_Runner_NormalizeRuntime_Packages,
  Lib_DockerRender_Runner_NormalizeRuntime_PackagesValue,
  Lib_DockerRender_Runner_NormalizeRuntime_PackageVersion,
  Lib_DockerRender_Runner_NormalizeRuntime_Returns,
  Lib_DockerRender_Runner_NormalizeRuntime_Runtime,
  Lib_DockerRender_Runner_NormalizeRuntime_RuntimeArguments,
  Lib_DockerRender_Runner_NormalizeRuntime_Value,
  Lib_DockerRender_Runner_NormalizeSettings_Build,
  Lib_DockerRender_Runner_NormalizeSettings_BuildFlag,
  Lib_DockerRender_Runner_NormalizeSettings_BuildValue,
  Lib_DockerRender_Runner_NormalizeSettings_ComposeValue,
  Lib_DockerRender_Runner_NormalizeSettings_Dockerfile,
  Lib_DockerRender_Runner_NormalizeSettings_DockerfileValue,
  Lib_DockerRender_Runner_NormalizeSettings_ExecutableName,
  Lib_DockerRender_Runner_NormalizeSettings_ExecutableObject,
  Lib_DockerRender_Runner_NormalizeSettings_ExecutablePath,
  Lib_DockerRender_Runner_NormalizeSettings_Executables,
  Lib_DockerRender_Runner_NormalizeSettings_ExecutablesValue,
  Lib_DockerRender_Runner_NormalizeSettings_HealthService,
  Lib_DockerRender_Runner_NormalizeSettings_ImageReference,
  Lib_DockerRender_Runner_NormalizeSettings_Images,
  Lib_DockerRender_Runner_NormalizeSettings_ImagesValue,
  Lib_DockerRender_Runner_NormalizeSettings_ImageValue,
  Lib_DockerRender_Runner_NormalizeSettings_Layout,
  Lib_DockerRender_Runner_NormalizeSettings_LayoutValue,
  Lib_DockerRender_Runner_NormalizeSettings_ProjectValue,
  Lib_DockerRender_Runner_NormalizeSettings_Returns,
  Lib_DockerRender_Runner_NormalizeSettings_RuntimeValue,
  Lib_DockerRender_Runner_NormalizeSettings_S6OverlayFrom,
  Lib_DockerRender_Runner_NormalizeSettings_S6OverlayValue,
  Lib_DockerRender_Runner_NormalizeSettings_Settings,
  Lib_DockerRender_Runner_NormalizeSettings_Value,
  Lib_DockerRender_Runner_NormalizeStages_Before,
  Lib_DockerRender_Runner_NormalizeStages_BeforeValue,
  Lib_DockerRender_Runner_NormalizeStages_File,
  Lib_DockerRender_Runner_NormalizeStages_Name,
  Lib_DockerRender_Runner_NormalizeStages_Returns,
  Lib_DockerRender_Runner_NormalizeStages_StageNames,
  Lib_DockerRender_Runner_NormalizeStages_StageObject,
  Lib_DockerRender_Runner_NormalizeStages_Stages,
  Lib_DockerRender_Runner_NormalizeStages_StageValues,
  Lib_DockerRender_Runner_NormalizeStages_Value,
  Lib_DockerRender_Runner_ReadBoolean_Label,
  Lib_DockerRender_Runner_ReadBoolean_Returns,
  Lib_DockerRender_Runner_ReadBoolean_Value,
  Lib_DockerRender_Runner_ReadList_Label,
  Lib_DockerRender_Runner_ReadList_Returns,
  Lib_DockerRender_Runner_ReadList_Value,
  Lib_DockerRender_Runner_ReadObject_Label,
  Lib_DockerRender_Runner_ReadObject_Returns,
  Lib_DockerRender_Runner_ReadObject_Value,
  Lib_DockerRender_Runner_ReadString_Label,
  Lib_DockerRender_Runner_ReadString_Pattern,
  Lib_DockerRender_Runner_ReadString_Returns,
  Lib_DockerRender_Runner_ReadString_Value,
  Lib_DockerRender_Runner_ReadStringList_Label,
  Lib_DockerRender_Runner_ReadStringList_Pattern,
  Lib_DockerRender_Runner_ReadStringList_Returns,
  Lib_DockerRender_Runner_ReadStringList_Strings,
  Lib_DockerRender_Runner_ReadStringList_Value,
  Lib_DockerRender_Runner_ReadStringList_Values,
  Lib_DockerRender_Runner_ReadStringMap_KeyPattern,
  Lib_DockerRender_Runner_ReadStringMap_Label,
  Lib_DockerRender_Runner_ReadStringMap_Map,
  Lib_DockerRender_Runner_ReadStringMap_Object,
  Lib_DockerRender_Runner_ReadStringMap_Returns,
  Lib_DockerRender_Runner_ReadStringMap_Value,
  Lib_DockerRender_Runner_ReadStringMap_ValuePattern,
  Lib_DockerRender_Runner_RenderBuildStage_BuildCommand,
  Lib_DockerRender_Runner_RenderBuildStage_BuildCommands,
  Lib_DockerRender_Runner_RenderBuildStage_BuildScript,
  Lib_DockerRender_Runner_RenderBuildStage_BuildSettings,
  Lib_DockerRender_Runner_RenderBuildStage_CopyLines,
  Lib_DockerRender_Runner_RenderBuildStage_CorepackVersion,
  Lib_DockerRender_Runner_RenderBuildStage_Input,
  Lib_DockerRender_Runner_RenderBuildStage_InstallCommand,
  Lib_DockerRender_Runner_RenderBuildStage_IsYarnClassic,
  Lib_DockerRender_Runner_RenderBuildStage_Manifest,
  Lib_DockerRender_Runner_RenderBuildStage_ManifestCopyLines,
  Lib_DockerRender_Runner_RenderBuildStage_ManifestSourcePath,
  Lib_DockerRender_Runner_RenderBuildStage_ManifestWorkspace,
  Lib_DockerRender_Runner_RenderBuildStage_NeedsNodeRuntime,
  Lib_DockerRender_Runner_RenderBuildStage_PackageJson,
  Lib_DockerRender_Runner_RenderBuildStage_PackageManager,
  Lib_DockerRender_Runner_RenderBuildStage_PackageManagerDescriptor,
  Lib_DockerRender_Runner_RenderBuildStage_PackageManagerVersion,
  Lib_DockerRender_Runner_RenderBuildStage_PruneCommand,
  Lib_DockerRender_Runner_RenderBuildStage_QuotedPackageName,
  Lib_DockerRender_Runner_RenderBuildStage_Returns,
  Lib_DockerRender_Runner_RenderBuildStage_RunPrefix,
  Lib_DockerRender_Runner_RenderBuildStage_RuntimeAssemblyCommands,
  Lib_DockerRender_Runner_RenderBuildStage_RuntimeSettings,
  Lib_DockerRender_Runner_RenderBuildStage_ScriptsValue,
  Lib_DockerRender_Runner_RenderBuildStage_ScriptValue,
  Lib_DockerRender_Runner_RenderBuildStage_SourceLines,
  Lib_DockerRender_Runner_RenderBuildStage_StepNumber,
  Lib_DockerRender_Runner_RenderBuildStage_UsesSyntheticManifests,
  Lib_DockerRender_Runner_RenderBuildStage_WorkspacePath,
  Lib_DockerRender_Runner_RenderCompose_CapAdd,
  Lib_DockerRender_Runner_RenderCompose_Compose,
  Lib_DockerRender_Runner_RenderCompose_Devices,
  Lib_DockerRender_Runner_RenderCompose_Environment,
  Lib_DockerRender_Runner_RenderCompose_EnvironmentFiles,
  Lib_DockerRender_Runner_RenderCompose_Lines,
  Lib_DockerRender_Runner_RenderCompose_Manifest,
  Lib_DockerRender_Runner_RenderCompose_NamedVolumes,
  Lib_DockerRender_Runner_RenderCompose_NetworkNames,
  Lib_DockerRender_Runner_RenderCompose_Networks,
  Lib_DockerRender_Runner_RenderCompose_Ports,
  Lib_DockerRender_Runner_RenderCompose_ReadOnlySuffix,
  Lib_DockerRender_Runner_RenderCompose_Returns,
  Lib_DockerRender_Runner_RenderCompose_ServiceName,
  Lib_DockerRender_Runner_RenderCompose_Volume,
  Lib_DockerRender_Runner_RenderCompose_Volumes,
  Lib_DockerRender_Runner_RenderDockerfile_ArgumentLines,
  Lib_DockerRender_Runner_RenderDockerfile_HasStageFragments,
  Lib_DockerRender_Runner_RenderDockerfile_HeaderNotes,
  Lib_DockerRender_Runner_RenderDockerfile_Input,
  Lib_DockerRender_Runner_RenderDockerfile_Layout,
  Lib_DockerRender_Runner_RenderDockerfile_Returns,
  Lib_DockerRender_Runner_RenderDockerfile_Sections,
  Lib_DockerRender_Runner_RenderDockerfile_StageName,
  Lib_DockerRender_Runner_RenderDockerfile_StageOrder,
  Lib_DockerRender_Runner_RenderRuntimeStage_AptCommands,
  Lib_DockerRender_Runner_RenderRuntimeStage_BaseImage,
  Lib_DockerRender_Runner_RenderRuntimeStage_Copies,
  Lib_DockerRender_Runner_RenderRuntimeStage_CopyLines,
  Lib_DockerRender_Runner_RenderRuntimeStage_Directories,
  Lib_DockerRender_Runner_RenderRuntimeStage_Environment,
  Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentLines,
  Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentPrefix,
  Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentSuffix,
  Lib_DockerRender_Runner_RenderRuntimeStage_FixCommands,
  Lib_DockerRender_Runner_RenderRuntimeStage_Input,
  Lib_DockerRender_Runner_RenderRuntimeStage_IsBuildEnabled,
  Lib_DockerRender_Runner_RenderRuntimeStage_IsOutputsLayout,
  Lib_DockerRender_Runner_RenderRuntimeStage_LabelEntries,
  Lib_DockerRender_Runner_RenderRuntimeStage_LabelLines,
  Lib_DockerRender_Runner_RenderRuntimeStage_LabelPrefix,
  Lib_DockerRender_Runner_RenderRuntimeStage_LabelSuffix,
  Lib_DockerRender_Runner_RenderRuntimeStage_Manifest,
  Lib_DockerRender_Runner_RenderRuntimeStage_NameFlag,
  Lib_DockerRender_Runner_RenderRuntimeStage_NeedsNodeRuntime,
  Lib_DockerRender_Runner_RenderRuntimeStage_PackageLines,
  Lib_DockerRender_Runner_RenderRuntimeStage_Packages,
  Lib_DockerRender_Runner_RenderRuntimeStage_Ports,
  Lib_DockerRender_Runner_RenderRuntimeStage_Project,
  Lib_DockerRender_Runner_RenderRuntimeStage_ProjectDescription,
  Lib_DockerRender_Runner_RenderRuntimeStage_ProjectDescriptionValue,
  Lib_DockerRender_Runner_RenderRuntimeStage_ProjectName,
  Lib_DockerRender_Runner_RenderRuntimeStage_ProjectNameValue,
  Lib_DockerRender_Runner_RenderRuntimeStage_ProjectSettings,
  Lib_DockerRender_Runner_RenderRuntimeStage_ProjectTitle,
  Lib_DockerRender_Runner_RenderRuntimeStage_ProjectValue,
  Lib_DockerRender_Runner_RenderRuntimeStage_Returns,
  Lib_DockerRender_Runner_RenderRuntimeStage_RootfsCopyLines,
  Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeArguments,
  Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeAssemblyWorkspaces,
  Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeSettings,
  Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeWorkspacePath,
  Lib_DockerRender_Runner_RenderRuntimeStage_StaticServices,
  Lib_DockerRender_Runner_RenderRuntimeStage_StepNumber,
  Lib_DockerRender_Runner_RenderRuntimeStage_StringField,
  Lib_DockerRender_Runner_RenderRuntimeStage_StringField_FieldValue,
  Lib_DockerRender_Runner_RenderRuntimeStage_Urls,
  Lib_DockerRender_Runner_RenderRuntimeStage_UrlsValue,
  Lib_DockerRender_Runner_RenderS6OverlayStage_BaseImage,
  Lib_DockerRender_Runner_RenderS6OverlayStage_Input,
  Lib_DockerRender_Runner_RenderS6OverlayStage_Returns,
  Lib_DockerRender_Runner_RenderS6OverlayStage_S6OverlayFrom,
  Lib_DockerRender_Runner_RenderS6OverlayStage_ShellVariableMarker,
  Lib_DockerRender_Runner_RenderS6OverlayStage_StepNumber,
  Lib_DockerRender_Runner_ResolveImage_Alias,
  Lib_DockerRender_Runner_ResolveImage_Images,
  Lib_DockerRender_Runner_ResolveImage_Manifest,
  Lib_DockerRender_Runner_ResolveImage_Override,
  Lib_DockerRender_Runner_ResolveImage_Returns,
  Lib_DockerRender_Runner_ResolveStageOrder_Anchor,
  Lib_DockerRender_Runner_ResolveStageOrder_IsBuildEnabled,
  Lib_DockerRender_Runner_ResolveStageOrder_Manifest,
  Lib_DockerRender_Runner_ResolveStageOrder_Order,
  Lib_DockerRender_Runner_ResolveStageOrder_Returns,
  Lib_DockerRender_Runner_ResolveStageOrder_Stages,
  Lib_DockerRender_Runner_ShellQuote_Returns,
  Lib_DockerRender_Runner_ShellQuote_Value,
  Lib_DockerRender_Runner_UsesSyntheticManifests_Build,
  Lib_DockerRender_Runner_UsesSyntheticManifests_Manifest,
  Lib_DockerRender_Runner_UsesSyntheticManifests_PackageManagerDescriptor,
  Lib_DockerRender_Runner_UsesSyntheticManifests_Returns,
  Lib_DockerRender_Runner_UsesSyntheticManifests_RootPackage,
  Lib_DockerRender_Runner_ValidateStages_CopySource,
  Lib_DockerRender_Runner_ValidateStages_Fragment,
  Lib_DockerRender_Runner_ValidateStages_FromLines,
  Lib_DockerRender_Runner_ValidateStages_FromMatch,
  Lib_DockerRender_Runner_ValidateStages_Input,
  Lib_DockerRender_Runner_ValidateStages_Positions,
  Lib_DockerRender_Runner_ValidateStages_Returns,
  Lib_DockerRender_Runner_ValidateStages_StageFromPattern,
  Lib_DockerRender_Runner_ValidateStages_StageOrder,
  Lib_DockerRender_Runner_ValidateStages_ValidateReference,
  Lib_DockerRender_Runner_ValidateStages_ValidateReference_ReferencePosition,
} from '../types/lib/docker-render.d.ts';

/**
 * Lib - Docker Render - Base Environment.
 *
 * Holds the runtime ENV values every Nova appliance sets. A project may extend
 * the list or prepend to PATH, but it cannot change the other appliance keys.
 *
 * @since 0.49.0
 */
const baseEnvironment: Lib_DockerRender_BaseEnvironment = {
  NODE_ENV: 'production',
  PATH: [
    '"/command:',
    '$',
    '{PATH}"',
  ].join(''),
  PGID: '1000',
  PUID: '1000',
  S6_BEHAVIOUR_IF_STAGE2_FAILS: '2',
  S6_CMD_WAIT_FOR_SERVICES_MAXTIME: '0',
  S6_KILL_FINISH_MAXTIME: '1000',
  S6_KILL_GRACETIME: '1000',
  S6_SERVICES_GRACETIME: '6000',
  TZ: 'UTC',
};

/**
 * Lib - Docker Render - Base Packages.
 *
 * Lists the Debian packages the generated init, health, and log helpers need.
 * Project runtime packages are merged into this list in name order.
 *
 * @since 0.49.0
 */
const basePackages: Lib_DockerRender_BasePackages = [
  'ca-certificates',
  'curl',
  'diffutils',
  'tzdata',
  'util-linux',
];

/**
 * Lib - Docker Render - Compose Identity.
 *
 * Holds the Compose environment entries that pass the numeric identity and
 * timezone into the appliance. Project entries cannot replace them.
 *
 * @since 0.49.0
 */
const composeIdentity: Lib_DockerRender_ComposeIdentity = {
  PGID: [
    '$',
    '{PGID:-1000}',
  ].join(''),
  PUID: [
    '$',
    '{PUID:-1000}',
  ].join(''),
  TZ: [
    '$',
    '{TZ:-UTC}',
  ].join(''),
};

/**
 * Lib - Docker Render - Node Profiles.
 *
 * Names the scaffold profiles whose services run on Node.js, so the runtime
 * stage starts from the Node.js image instead of plain Debian.
 *
 * @since 0.49.0
 */
const nodeProfiles: Lib_DockerRender_NodeProfiles = [
  'astro-node',
  'background-service',
  'http-service',
  'nextjs-standalone',
];

/**
 * Lib - Docker Render - Nova Stage Names.
 *
 * Reserves the three stage names Nova renders itself, so a project stage
 * fragment cannot take one of them.
 *
 * @since 0.49.0
 */
const novaStageNames: Lib_DockerRender_NovaStageNames = [
  'build',
  's6-overlay',
  'runtime',
];

/**
 * Lib - Docker Render.
 *
 * Renders the root Dockerfile and compose.yml from the image manifest with pure
 * functions, so the scaffold and the sync-image recipe always produce the same files.
 *
 * @since 0.49.0
 */
export class Runner {
  /**
   * Lib - Docker Render - Render Dockerfile.
   *
   * Places the project stage fragments around Nova's build, s6-overlay, and
   * runtime stages and joins them into one root Dockerfile.
   *
   * @param {Lib_DockerRender_Runner_RenderDockerfile_Input} input - Input.
   *
   * @returns {Lib_DockerRender_Runner_RenderDockerfile_Returns}
   *
   * @since 0.49.0
   */
  public static renderDockerfile(input: Lib_DockerRender_Runner_RenderDockerfile_Input): Lib_DockerRender_Runner_RenderDockerfile_Returns {
    Runner.validateStages(input);

    const layout: Lib_DockerRender_Runner_RenderDockerfile_Layout = (input['manifest']['dockerfile'] === undefined) ? 'compact' : input['manifest']['dockerfile']['layout'] ?? 'compact';
    const stageOrder: Lib_DockerRender_Runner_RenderDockerfile_StageOrder = Runner.resolveStageOrder(input['manifest']);
    const argumentLines: Lib_DockerRender_Runner_RenderDockerfile_ArgumentLines = (input['manifest']['dockerfile'] === undefined) ? [] : (input['manifest']['dockerfile']['arguments'] ?? []).map((argument) => Runner.formatArgument(argument));
    const hasStageFragments: Lib_DockerRender_Runner_RenderDockerfile_HasStageFragments = input['stageFragments'].size > 0;
    const headerNotes: Lib_DockerRender_Runner_RenderDockerfile_HeaderNotes = (hasStageFragments === true) ? [
      'Edit packages/docker/manifest.json, packages/docker/stages/, and',
      'packages/docker/project/ instead. Stages copied from stages/ are',
      'pasted verbatim, so those fragment files are their source of truth.',
    ] : ['Edit packages/docker/manifest.json and packages/docker/project/ instead.'];

    // The syntax directive must stay on the first line, so the generated-file header follows it.
    const sections: Lib_DockerRender_Runner_RenderDockerfile_Sections = [
      '# syntax=docker/dockerfile:1',
      Runner.generatedHeader(headerNotes).join('\n'),
    ];

    if (argumentLines.length > 0) {
      sections.push(argumentLines.join('\n'));
    }

    for (let i = 0; i < stageOrder.length; i += 1) {
      const stageName: Lib_DockerRender_Runner_RenderDockerfile_StageName = stageOrder[i] ?? '';

      if (stageName === 'build') {
        sections.push(Runner.formatStage(Runner.renderBuildStage(input, i + 1), layout));
      } else if (stageName === 's6-overlay') {
        sections.push(Runner.formatStage(Runner.renderS6OverlayStage(input, i + 1), layout));
      } else if (stageName === 'runtime') {
        sections.push(Runner.formatStage(Runner.renderRuntimeStage(input, i + 1), layout));
      } else {
        sections.push((input['stageFragments'].get(stageName) ?? '').trim());
      }
    }

    return `${sections.join('\n\n')}\n`;
  }

  /**
   * Lib - Docker Render - Render Compose.
   *
   * Renders the single root Compose service with Nova's identity, restart,
   * network, port, and state-mount contract plus the manifest's compose fields.
   *
   * @param {Lib_DockerRender_Runner_RenderCompose_Manifest} manifest - Manifest.
   *
   * @returns {Lib_DockerRender_Runner_RenderCompose_Returns}
   *
   * @since 0.49.0
   */
  public static renderCompose(manifest: Lib_DockerRender_Runner_RenderCompose_Manifest): Lib_DockerRender_Runner_RenderCompose_Returns {
    const compose: Lib_DockerRender_Runner_RenderCompose_Compose = manifest['compose'] ?? {};
    const serviceName: Lib_DockerRender_Runner_RenderCompose_ServiceName = compose['service'] ?? 'app';
    const lines: Lib_DockerRender_Runner_RenderCompose_Lines = [
      ...Runner.generatedHeader([
        'Project-owned settings live in the "compose" section of',
        'packages/docker/manifest.json. Edit them there instead of this file.',
      ]),
      '',
    ];

    if (compose['name'] !== undefined) {
      lines.push(`name: ${compose['name']}`, '');
    }

    lines.push('services:', `  ${serviceName}:`);

    if (compose['image'] !== undefined) {
      lines.push(`    image: ${compose['image']}`);
    }

    lines.push(
      '    build:',
      '      context: .',
      '      dockerfile: Dockerfile',
    );

    const capAdd: Lib_DockerRender_Runner_RenderCompose_CapAdd = compose['capAdd'] ?? [];

    if (capAdd.length > 0) {
      lines.push('    cap_add:', ...capAdd.map((capability) => `      - ${capability}`));
    }

    const devices: Lib_DockerRender_Runner_RenderCompose_Devices = compose['devices'] ?? [];

    if (devices.length > 0) {
      lines.push('    devices:', ...devices.map((device) => `      - ${device}`));
    }

    const environmentFiles: Lib_DockerRender_Runner_RenderCompose_EnvironmentFiles = compose['environmentFiles'] ?? manifest['workspaces']
      .filter((workspace) => workspace['profile'] === 'background-service')
      .map((workspace) => `./${workspace['path']}/.env`);

    if (environmentFiles.length > 0) {
      lines.push('    env_file:');

      for (const environmentFile of environmentFiles) {
        if (typeof environmentFile === 'string') {
          lines.push(`      - ${environmentFile}`);

          continue;
        }

        lines.push(`      - path: ${environmentFile['path']}`);

        if (environmentFile['required'] !== undefined) {
          lines.push(`        required: ${String(environmentFile['required'])}`);
        }
      }
    }

    const environment: Lib_DockerRender_Runner_RenderCompose_Environment = Object.entries({
      ...(compose['environment'] ?? {}),
      ...composeIdentity,
    }).sort((firstEntry, secondEntry) => Runner.compareText(firstEntry[0], secondEntry[0]));

    lines.push('    environment:', ...environment.map((environmentEntry) => `      ${environmentEntry[0]}: ${Runner.formatComposeString(environmentEntry[1])}`));

    if (compose['networks'] === undefined) {
      lines.push(`    network_mode: ${manifest['networkMode']}`);
    }

    let ports: Lib_DockerRender_Runner_RenderCompose_Ports = compose['ports'] ?? [];

    if (compose['ports'] === undefined && manifest['networkMode'] === 'bridge') {
      ports = Runner.collectPorts(manifest).map((port) => `${port}:${port}`);
    }

    if (ports.length > 0) {
      lines.push('    ports:', ...ports.map((port) => `      - "${port}"`));
    }

    lines.push(
      `    restart: ${compose['restart'] ?? 'always'}`,
      `    user: "${compose['user'] ?? '0:0'}"`,
      '    volumes:',
    );

    const volumes: Lib_DockerRender_Runner_RenderCompose_Volumes = compose['volumes'] ?? [];
    const namedVolumes: Lib_DockerRender_Runner_RenderCompose_NamedVolumes = [];

    if (volumes.length === 0) {
      lines.push('      - "./config:/config"');
    }

    for (let i = 0; i < volumes.length; i += 1) {
      const volume: Lib_DockerRender_Runner_RenderCompose_Volume = volumes[i];

      if (volume === undefined) {
        continue;
      }

      if (volume['comment'] !== undefined && volume['comment'].length > 0) {
        if (i > 0) {
          lines.push('');
        }

        lines.push(...Runner.formatComposeComment(volume['comment'], '      '));
      }

      const readOnlySuffix: Lib_DockerRender_Runner_RenderCompose_ReadOnlySuffix = (volume['readOnly'] === true) ? ':ro' : '';

      lines.push(`      - ${volume['source']}:${volume['target']}${readOnlySuffix}`);

      if (
        LIB_REGEX_PATTERN_DOCKER_STAGE_NAME.test(volume['source']) === true
        && namedVolumes.includes(volume['source']) === false
      ) {
        namedVolumes.push(volume['source']);
      }
    }

    if (compose['comment'] !== undefined && compose['comment'].length > 0) {
      lines.push('', ...Runner.formatComposeComment(compose['comment'], '    '));
    }

    const networks: Lib_DockerRender_Runner_RenderCompose_Networks = compose['networks'] ?? {};
    const networkNames: Lib_DockerRender_Runner_RenderCompose_NetworkNames = Object.keys(networks);

    if (networkNames.length > 0) {
      lines.push('', 'networks:');

      for (const networkName of networkNames) {
        lines.push(`  ${networkName}:`);

        for (const networkEntry of Object.entries(networks[networkName] ?? {})) {
          lines.push(`    ${networkEntry[0]}: ${String(networkEntry[1])}`);
        }
      }
    }

    if (namedVolumes.length > 0) {
      lines.push('', 'volumes:', ...namedVolumes.map((namedVolume) => `  ${namedVolume}:`));
    }

    return `${lines.join('\n')}\n`;
  }

  /**
   * Lib - Docker Render - Normalize Settings.
   *
   * Validates the optional manifest version 2 sections and returns only the
   * known keys, so a typo cannot silently reach the rendered files.
   *
   * @param {Lib_DockerRender_Runner_NormalizeSettings_Value} value - Value.
   *
   * @returns {Lib_DockerRender_Runner_NormalizeSettings_Returns}
   *
   * @since 0.49.0
   */
  public static normalizeSettings(value: Lib_DockerRender_Runner_NormalizeSettings_Value): Lib_DockerRender_Runner_NormalizeSettings_Returns {
    const settings: Lib_DockerRender_Runner_NormalizeSettings_Settings = {};
    const buildValue: Lib_DockerRender_Runner_NormalizeSettings_BuildValue = Runner.readObject(value['build'], 'build');

    if (buildValue !== undefined) {
      const build: Lib_DockerRender_Runner_NormalizeSettings_Build = {};

      for (const buildKey of [
        'copyNovaConfig',
        'corepack',
        'enabled',
        'syntheticManifests',
      ]) {
        const buildFlag: Lib_DockerRender_Runner_NormalizeSettings_BuildFlag = Runner.readBoolean(buildValue[buildKey], `build.${buildKey}`);

        Runner.assignDefined(build, buildKey, buildFlag);
      }

      settings.build = build;
    }

    const composeValue: Lib_DockerRender_Runner_NormalizeSettings_ComposeValue = Runner.readObject(value['compose'], 'compose');

    if (composeValue !== undefined) {
      settings.compose = Runner.normalizeCompose(composeValue);
    }

    const dockerfileValue: Lib_DockerRender_Runner_NormalizeSettings_DockerfileValue = Runner.readObject(value['dockerfile'], 'dockerfile');

    if (dockerfileValue !== undefined) {
      const dockerfile: Lib_DockerRender_Runner_NormalizeSettings_Dockerfile = {};
      const layoutValue: Lib_DockerRender_Runner_NormalizeSettings_LayoutValue = Runner.readString(dockerfileValue['layout'], 'dockerfile.layout', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME);
      const layout: Lib_DockerRender_Runner_NormalizeSettings_Layout = [
        'compact' as const,
        'spaced' as const,
      ].find((allowedLayout) => allowedLayout === layoutValue);

      if (layoutValue !== undefined && layout === undefined) {
        throw new Error('Docker manifest field "dockerfile.layout" must be "compact" or "spaced".');
      }

      Runner.assignDefined(dockerfile, 'layout', layout);
      Runner.assignDefined(dockerfile, 'arguments', Runner.normalizeArguments(dockerfileValue['arguments'], 'dockerfile.arguments'));
      Runner.assignDefined(dockerfile, 'stages', Runner.normalizeStages(dockerfileValue['stages']));

      settings.dockerfile = dockerfile;
    }

    const healthService: Lib_DockerRender_Runner_NormalizeSettings_HealthService = Runner.readString(value['healthService'], 'healthService', LIB_REGEX_PATTERN_SLUG_SIMPLE);

    Runner.assignDefined(settings, 'healthService', healthService);

    const imagesValue: Lib_DockerRender_Runner_NormalizeSettings_ImagesValue = Runner.readObject(value['images'], 'images');

    if (imagesValue !== undefined) {
      const images: Lib_DockerRender_Runner_NormalizeSettings_Images = {};

      for (const imageEntry of Object.entries(imagesValue)) {
        if (imageEntry[0] !== 'debian' && imageEntry[0] !== 'node') {
          throw new Error(`Docker manifest field "images.${imageEntry[0]}" is not a Nova base image; use "debian" or "node".`);
        }

        const imageValue: Lib_DockerRender_Runner_NormalizeSettings_ImageValue = Runner.readObject(imageEntry[1], `images.${imageEntry[0]}`) ?? {};
        const imageReference: Lib_DockerRender_Runner_NormalizeSettings_ImageReference = Runner.readString(imageValue['reference'], `images.${imageEntry[0]}.reference`, LIB_REGEX_PATTERN_DOCKER_IMAGE_REFERENCE);

        if (
          imageReference === undefined
          || (
            imageReference.includes(':') === false
            && imageReference.includes('@') === false
          )
        ) {
          throw new Error(`Docker manifest field "images.${imageEntry[0]}.reference" must name a pinned tag or digest.`);
        }

        Reflect.set(images, imageEntry[0], { reference: imageReference });
      }

      settings.images = images;
    }

    const projectValue: Lib_DockerRender_Runner_NormalizeSettings_ProjectValue = Runner.readObject(value['project'], 'project');

    if (projectValue !== undefined) {
      const executablesValue: Lib_DockerRender_Runner_NormalizeSettings_ExecutablesValue = Runner.readList(projectValue['executables'], 'project.executables') ?? [];
      const executables: Lib_DockerRender_Runner_NormalizeSettings_Executables = [];

      for (const executableValue of executablesValue) {
        const executableObject: Lib_DockerRender_Runner_NormalizeSettings_ExecutableObject = Runner.readObject(executableValue, 'project.executables[]') ?? {};
        const executablePath: Lib_DockerRender_Runner_NormalizeSettings_ExecutablePath = Runner.readString(executableObject['path'], 'project.executables[].path', LIB_REGEX_PATTERN_DOCKER_COPY_PATH);
        const executableName: Lib_DockerRender_Runner_NormalizeSettings_ExecutableName = Runner.readString(executableObject['name'], 'project.executables[].name', LIB_REGEX_PATTERN_DOCKER_FIND_NAME);

        if (executablePath === undefined || executablePath.startsWith('/') === false) {
          throw new Error('Docker manifest field "project.executables[].path" must be an absolute image path.');
        }

        executables.push((executableName === undefined) ? { path: executablePath } : {
          name: executableName,
          path: executablePath,
        });
      }

      settings.project = { executables };
    }

    const runtimeValue: Lib_DockerRender_Runner_NormalizeSettings_RuntimeValue = Runner.readObject(value['runtime'], 'runtime');

    if (runtimeValue !== undefined) {
      settings.runtime = Runner.normalizeRuntime(runtimeValue);
    }

    const s6OverlayValue: Lib_DockerRender_Runner_NormalizeSettings_S6OverlayValue = Runner.readObject(value['s6Overlay'], 's6Overlay');

    if (s6OverlayValue !== undefined) {
      const s6OverlayFrom: Lib_DockerRender_Runner_NormalizeSettings_S6OverlayFrom = Runner.readString(s6OverlayValue['from'], 's6Overlay.from', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME);

      settings.s6Overlay = (s6OverlayFrom === undefined) ? {} : { from: s6OverlayFrom };
    }

    return settings;
  }

  /**
   * Lib - Docker Render - Generated Header.
   *
   * Returns the comment lines that open every Nova-generated Docker file, with an
   * optional note on where the project-owned parts of a half-generated file live.
   *
   * @param {Lib_DockerRender_Runner_GeneratedHeader_Notes} notes - Notes.
   *
   * @returns {Lib_DockerRender_Runner_GeneratedHeader_Returns}
   *
   * @since 0.49.0
   */
  public static generatedHeader(notes: Lib_DockerRender_Runner_GeneratedHeader_Notes): Lib_DockerRender_Runner_GeneratedHeader_Returns {
    return [
      '# This file is generated by @cbnventures/nova.',
      '# Do not edit manually.',
      ...((notes.length === 0) ? [] : [
        '#',
        ...notes.map((note) => `# ${note}`),
      ]),
      '#',
      '# Run `nova recipe docker sync-image` to regenerate.',
      `# See: ${LIB_CONSTANTS_DOCS_BASE_URL}/docs/cli/recipes/docker/sync-image`,
    ];
  }

  /**
   * Lib - Docker Render - Uses Synthetic Manifests.
   *
   * Reports whether the build stage copies Nova's Docker-only workspace manifests.
   * Package managers without the workspace protocol need them unless disabled.
   *
   * @param {Lib_DockerRender_Runner_UsesSyntheticManifests_Manifest}    manifest    - Manifest.
   * @param {Lib_DockerRender_Runner_UsesSyntheticManifests_RootPackage} rootPackage - Root package.
   *
   * @returns {Lib_DockerRender_Runner_UsesSyntheticManifests_Returns}
   *
   * @since 0.49.0
   */
  public static usesSyntheticManifests(manifest: Lib_DockerRender_Runner_UsesSyntheticManifests_Manifest, rootPackage: Lib_DockerRender_Runner_UsesSyntheticManifests_RootPackage): Lib_DockerRender_Runner_UsesSyntheticManifests_Returns {
    const build: Lib_DockerRender_Runner_UsesSyntheticManifests_Build = manifest['build'] ?? {};

    if (
      build['enabled'] === false
      || build['syntheticManifests'] === false
    ) {
      return false;
    }

    const packageManagerDescriptor: Lib_DockerRender_Runner_UsesSyntheticManifests_PackageManagerDescriptor = LibCorepack.parsePackageManager(rootPackage['packageManager']);

    if (packageManagerDescriptor === undefined) {
      return true;
    }

    return (
      packageManagerDescriptor['name'] === 'npm'
      || (
        packageManagerDescriptor['name'] === 'yarn'
        && packageManagerDescriptor['version'].startsWith('1.') === true
      )
    );
  }

  /**
   * Lib - Docker Render - Render Build Stage.
   *
   * Installs and builds the selected workspaces and their internal closure. Per-file
   * sources, build script names, and offline builds come from the workspace entries.
   *
   * @param {Lib_DockerRender_Runner_RenderBuildStage_Input}      input      - Input.
   * @param {Lib_DockerRender_Runner_RenderBuildStage_StepNumber} stepNumber - Step number.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_RenderBuildStage_Returns}
   *
   * @since 0.49.0
   */
  private static renderBuildStage(input: Lib_DockerRender_Runner_RenderBuildStage_Input, stepNumber: Lib_DockerRender_Runner_RenderBuildStage_StepNumber): Lib_DockerRender_Runner_RenderBuildStage_Returns {
    const manifest: Lib_DockerRender_Runner_RenderBuildStage_Manifest = input['manifest'];
    const buildSettings: Lib_DockerRender_Runner_RenderBuildStage_BuildSettings = manifest['build'] ?? {};
    const runtimeSettings: Lib_DockerRender_Runner_RenderBuildStage_RuntimeSettings = manifest['runtime'] ?? {};
    const packageManagerDescriptor: Lib_DockerRender_Runner_RenderBuildStage_PackageManagerDescriptor = LibCorepack.parsePackageManager(input['rootPackage']['packageManager']);
    const packageManager: Lib_DockerRender_Runner_RenderBuildStage_PackageManager = (packageManagerDescriptor === undefined) ? 'npm' : packageManagerDescriptor['name'];
    const packageManagerVersion: Lib_DockerRender_Runner_RenderBuildStage_PackageManagerVersion = (packageManagerDescriptor === undefined) ? '' : packageManagerDescriptor['version'];
    const isYarnClassic: Lib_DockerRender_Runner_RenderBuildStage_IsYarnClassic = packageManager === 'yarn' && packageManagerVersion.startsWith('1.');
    const usesSyntheticManifests: Lib_DockerRender_Runner_RenderBuildStage_UsesSyntheticManifests = Runner.usesSyntheticManifests(manifest, input['rootPackage']);
    const corepackVersion: Lib_DockerRender_Runner_RenderBuildStage_CorepackVersion = getScaffoldVersion('corepack');
    let installCommand: Lib_DockerRender_Runner_RenderBuildStage_InstallCommand = (buildSettings['corepack'] === true) ? 'RUN corepack enable npm && npm install' : 'RUN npm install';
    let pruneCommand: Lib_DockerRender_Runner_RenderBuildStage_PruneCommand = 'RUN npm prune --omit=dev && npm cache clean --force';

    if (packageManager === 'pnpm') {
      installCommand = `RUN npm install --global corepack@${corepackVersion} && corepack enable pnpm && pnpm install`;
      pruneCommand = 'RUN pnpm install --prod';
    } else if (packageManager === 'yarn') {
      installCommand = `RUN npm install --global corepack@${corepackVersion} && corepack enable yarn && yarn install`;
      pruneCommand = (isYarnClassic === true) ? 'RUN yarn install --production && yarn cache clean' : 'RUN yarn workspaces focus --all --production';
    }

    const manifestCopyLines: Lib_DockerRender_Runner_RenderBuildStage_ManifestCopyLines = [
      'COPY packages/docker/build-package.json ./package.json',
      'COPY packages/docker/pnpm-workspace.yaml ./pnpm-workspace.yaml',
    ];
    const sourceLines: Lib_DockerRender_Runner_RenderBuildStage_SourceLines = [];
    const buildCommands: Lib_DockerRender_Runner_RenderBuildStage_BuildCommands = [];

    if (packageManager === 'yarn' && isYarnClassic === false) {
      manifestCopyLines.push('COPY packages/docker/yarnrc.yml ./.yarnrc.yml');
    }

    if (buildSettings['copyNovaConfig'] !== false) {
      sourceLines.push('COPY nova.config.json ./nova.config.json');
    }

    for (const workspacePackageEntry of input['buildOrder']) {
      const workspacePath: Lib_DockerRender_Runner_RenderBuildStage_WorkspacePath = workspacePackageEntry[1]['path'];
      const manifestWorkspace: Lib_DockerRender_Runner_RenderBuildStage_ManifestWorkspace = manifest['workspaces'].find((workspace) => workspace['path'] === workspacePath);
      const manifestSourcePath: Lib_DockerRender_Runner_RenderBuildStage_ManifestSourcePath = (usesSyntheticManifests === true) ? `packages/docker/workspace-manifests/${workspacePath}/package.json` : `${workspacePath}/package.json`;
      const copyLines: Lib_DockerRender_Runner_RenderBuildStage_CopyLines = [];

      manifestCopyLines.push(`COPY ${JSON.stringify([
        manifestSourcePath,
        `${workspacePath}/package.json`,
      ])}`);

      if (manifestWorkspace !== undefined && manifestWorkspace['sources'] !== undefined) {
        for (const source of manifestWorkspace['sources']) {
          if (typeof source === 'string') {
            copyLines.push(`COPY ${workspacePath}/${source} ./${workspacePath}/${source}`);
          } else {
            copyLines.push(`COPY ${source.map((sourceFile) => `${workspacePath}/${sourceFile}`).join(' ')} ./${workspacePath}/`);
          }
        }
      } else {
        copyLines.push(`COPY ${JSON.stringify([
          workspacePath,
          workspacePath,
        ])}`);

        // A whole-folder copy brings the workspace's own manifest back, so the Docker-only one is restored after it.
        if (usesSyntheticManifests === true) {
          copyLines.push(`COPY ${JSON.stringify([
            manifestSourcePath,
            `${workspacePath}/package.json`,
          ])}`);
        }
      }

      sourceLines.push(...copyLines);

      const packageJson: Lib_DockerRender_Runner_RenderBuildStage_PackageJson = workspacePackageEntry[1]['packageJson'];
      const scriptsValue: Lib_DockerRender_Runner_RenderBuildStage_ScriptsValue = packageJson['scripts'];
      const buildScript: Lib_DockerRender_Runner_RenderBuildStage_BuildScript = (manifestWorkspace === undefined) ? 'build' : manifestWorkspace['buildScript'] ?? 'build';
      const scriptValue: Lib_DockerRender_Runner_RenderBuildStage_ScriptValue = (isPlainObject(scriptsValue) === true) ? scriptsValue[buildScript] : undefined;

      if (typeof scriptValue !== 'string') {
        continue;
      }

      const quotedPackageName: Lib_DockerRender_Runner_RenderBuildStage_QuotedPackageName = Runner.shellQuote(workspacePackageEntry[0]);
      const runPrefix: Lib_DockerRender_Runner_RenderBuildStage_RunPrefix = (manifestWorkspace !== undefined && manifestWorkspace['buildNetwork'] === 'none') ? 'RUN --network=none' : 'RUN';
      let buildCommand: Lib_DockerRender_Runner_RenderBuildStage_BuildCommand = `${runPrefix} npm run ${buildScript} --workspace=${quotedPackageName}`;

      if (packageManager === 'pnpm') {
        buildCommand = `${runPrefix} pnpm --filter ${quotedPackageName} run ${buildScript}`;
      } else if (packageManager === 'yarn') {
        buildCommand = `${runPrefix} yarn workspace ${quotedPackageName} ${buildScript}`;
      }

      buildCommands.push(buildCommand);
    }

    const needsNodeRuntime: Lib_DockerRender_Runner_RenderBuildStage_NeedsNodeRuntime = manifest['workspaces'].some((workspace) => nodeProfiles.includes(workspace['profile']));
    const runtimeAssemblyCommands: Lib_DockerRender_Runner_RenderBuildStage_RuntimeAssemblyCommands = [];

    if (needsNodeRuntime === true && runtimeSettings['layout'] !== 'outputs') {
      runtimeAssemblyCommands.push(
        'mkdir -p /runtime',
        'cp -a . /runtime/',
      );

      for (const workspace of manifest['workspaces']) {
        if (workspace['profile'] === 'static-site') {
          for (const service of manifest['services'].filter((manifestService) => manifestService['workspace'] === workspace['path'])) {
            runtimeAssemblyCommands.push(
              `mkdir -p ${Runner.shellQuote(`/runtime/sites/${service['name']}`)}`,
              `cp -a ${Runner.shellQuote(`/workspace/${workspace['path']}/build/.`)} ${Runner.shellQuote(`/runtime/sites/${service['name']}/`)}`,
            );
          }
        } else if (workspace['profile'] === 'nextjs-standalone') {
          runtimeAssemblyCommands.push(`cp -a ${Runner.shellQuote(`/workspace/${workspace['path']}/build/standalone/.`)} ${Runner.shellQuote(`/runtime/${workspace['path']}/`)}`);
        }
      }
    }

    return [
      [
        ...Runner.formatBanner(stepNumber, 'Build Workspaces'),
        `FROM ${Runner.resolveImage(manifest, 'node')} AS build`,
      ],
      ['WORKDIR /workspace'],
      manifestCopyLines,
      [installCommand],
      sourceLines,
      ...buildCommands.map((buildCommandLine) => [buildCommandLine]),
      [pruneCommand],
      Runner.formatRun(runtimeAssemblyCommands, 'RUN'),
    ];
  }

  /**
   * Lib - Docker Render - Render S6 Overlay Stage.
   *
   * Downloads and verifies the pinned s6-overlay release. The stage can start
   * from a project stage that already prepares the shared Debian base.
   *
   * @param {Lib_DockerRender_Runner_RenderS6OverlayStage_Input}      input      - Input.
   * @param {Lib_DockerRender_Runner_RenderS6OverlayStage_StepNumber} stepNumber - Step number.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_RenderS6OverlayStage_Returns}
   *
   * @since 0.49.0
   */
  private static renderS6OverlayStage(input: Lib_DockerRender_Runner_RenderS6OverlayStage_Input, stepNumber: Lib_DockerRender_Runner_RenderS6OverlayStage_StepNumber): Lib_DockerRender_Runner_RenderS6OverlayStage_Returns {
    const s6OverlayFrom: Lib_DockerRender_Runner_RenderS6OverlayStage_S6OverlayFrom = (input['manifest']['s6Overlay'] === undefined) ? undefined : input['manifest']['s6Overlay']['from'];
    const baseImage: Lib_DockerRender_Runner_RenderS6OverlayStage_BaseImage = s6OverlayFrom ?? Runner.resolveImage(input['manifest'], 'debian');
    const shellVariableMarker: Lib_DockerRender_Runner_RenderS6OverlayStage_ShellVariableMarker = '$';

    return [
      [
        ...Runner.formatBanner(stepNumber, 'Install s6-overlay'),
        `FROM ${baseImage} AS s6-overlay`,
      ],
      [
        ...((s6OverlayFrom !== undefined && Runner.inheritsFrontend(s6OverlayFrom, input['stageFragments']) === true) ? [] : ['ARG DEBIAN_FRONTEND="noninteractive"']),
        'ARG TARGETARCH',
        `ARG S6_OVERLAY_VERSION="${getScaffoldVersion('dockerS6Overlay')}"`,
      ],
      [
        'RUN apt-get update \\',
        '  && apt-get install -y --no-install-recommends \\',
        '    ca-certificates \\',
        '    curl \\',
        '    xz-utils \\',
        '  && rm -rf /var/lib/apt/lists/*',
      ],
      [
        'RUN set -eux; \\',
        `  case "${shellVariableMarker}{TARGETARCH}" in \\`,
        '    "amd64") s6_architecture="x86_64" ;; \\',
        '    "arm64") s6_architecture="aarch64" ;; \\',
        `    *) echo "Unsupported target architecture: ${shellVariableMarker}{TARGETARCH}" >&2; exit 1 ;; \\`,
        '  esac; \\',
        '  mkdir -p /s6-rootfs; \\',
        `  for archive_name in "s6-overlay-noarch.tar.xz" "s6-overlay-${shellVariableMarker}{s6_architecture}.tar.xz"; do \\`,
        `    release_url="https://github.com/just-containers/s6-overlay/releases/download/v${shellVariableMarker}{S6_OVERLAY_VERSION}"; \\`,
        '    curl --fail --location --silent --show-error \\',
        `      --output "/tmp/${shellVariableMarker}{archive_name}" \\`,
        `      "${shellVariableMarker}{release_url}/${shellVariableMarker}{archive_name}"; \\`,
        '    curl --fail --location --silent --show-error \\',
        `      --output "/tmp/${shellVariableMarker}{archive_name}.sha256" \\`,
        `      "${shellVariableMarker}{release_url}/${shellVariableMarker}{archive_name}.sha256"; \\`,
        '    cd /tmp; \\',
        `    sha256sum -c "${shellVariableMarker}{archive_name}.sha256"; \\`,
        `    tar -C /s6-rootfs -Jxpf "/tmp/${shellVariableMarker}{archive_name}"; \\`,
        `    rm -f "/tmp/${shellVariableMarker}{archive_name}" "/tmp/${shellVariableMarker}{archive_name}.sha256"; \\`,
        '  done',
      ],
    ];
  }

  /**
   * Lib - Docker Render - Render Runtime Stage.
   *
   * Assembles the final s6 image: labels, apt packages, environment, the Nova
   * rootfs and project overlay, declared copies, state folders, and health.
   *
   * @param {Lib_DockerRender_Runner_RenderRuntimeStage_Input}      input      - Input.
   * @param {Lib_DockerRender_Runner_RenderRuntimeStage_StepNumber} stepNumber - Step number.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_RenderRuntimeStage_Returns}
   *
   * @since 0.49.0
   */
  private static renderRuntimeStage(input: Lib_DockerRender_Runner_RenderRuntimeStage_Input, stepNumber: Lib_DockerRender_Runner_RenderRuntimeStage_StepNumber): Lib_DockerRender_Runner_RenderRuntimeStage_Returns {
    const manifest: Lib_DockerRender_Runner_RenderRuntimeStage_Manifest = input['manifest'];
    const runtimeSettings: Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeSettings = manifest['runtime'] ?? {};
    const isBuildEnabled: Lib_DockerRender_Runner_RenderRuntimeStage_IsBuildEnabled = manifest['build'] === undefined || manifest['build']['enabled'] !== false;
    const isOutputsLayout: Lib_DockerRender_Runner_RenderRuntimeStage_IsOutputsLayout = runtimeSettings['layout'] === 'outputs';
    const needsNodeRuntime: Lib_DockerRender_Runner_RenderRuntimeStage_NeedsNodeRuntime = manifest['workspaces'].some((workspace) => nodeProfiles.includes(workspace['profile']));
    const baseImage: Lib_DockerRender_Runner_RenderRuntimeStage_BaseImage = runtimeSettings['from'] ?? Runner.resolveImage(manifest, (needsNodeRuntime === true) ? 'node' : 'debian');
    const runtimeArguments: Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeArguments = (runtimeSettings['arguments'] ?? []).map((argument) => Runner.formatArgument(argument));

    if (runtimeSettings['from'] === undefined || Runner.inheritsFrontend(runtimeSettings['from'], input['stageFragments']) === false) {
      runtimeArguments.unshift('ARG DEBIAN_FRONTEND="noninteractive"');
    }

    // OCI labels come from nova.config.json; missing values stay empty instead of leaving a token behind.
    const projectValue: Lib_DockerRender_Runner_RenderRuntimeStage_ProjectValue = input['novaConfig']['project'];
    const project: Lib_DockerRender_Runner_RenderRuntimeStage_Project = (isPlainObject(projectValue) === true) ? projectValue : {};
    const projectNameValue: Lib_DockerRender_Runner_RenderRuntimeStage_ProjectNameValue = project['name'];
    const projectName: Lib_DockerRender_Runner_RenderRuntimeStage_ProjectName = (isPlainObject(projectNameValue) === true) ? projectNameValue : {};
    const projectDescriptionValue: Lib_DockerRender_Runner_RenderRuntimeStage_ProjectDescriptionValue = project['description'];
    const projectDescription: Lib_DockerRender_Runner_RenderRuntimeStage_ProjectDescription = (isPlainObject(projectDescriptionValue) === true) ? projectDescriptionValue : {};
    const urlsValue: Lib_DockerRender_Runner_RenderRuntimeStage_UrlsValue = input['novaConfig']['urls'];
    const urls: Lib_DockerRender_Runner_RenderRuntimeStage_Urls = (isPlainObject(urlsValue) === true) ? urlsValue : {};
    let projectTitle: Lib_DockerRender_Runner_RenderRuntimeStage_ProjectTitle = '';

    if (typeof projectName['title'] === 'string') {
      projectTitle = projectName['title'];
    } else if (typeof projectName['slug'] === 'string') {
      projectTitle = projectName['slug'];
    }

    /**
     * Lib - Docker Render - Render Runtime Stage - String Field.
     *
     * Reads one optional string from a nova.config.json object and falls back
     * to an empty label value when the field is missing.
     *
     * @param {Lib_DockerRender_Runner_RenderRuntimeStage_StringField_Source} source - Source.
     * @param {Lib_DockerRender_Runner_RenderRuntimeStage_StringField_Key}    key    - Key.
     *
     * @returns {Lib_DockerRender_Runner_RenderRuntimeStage_StringField_Returns}
     *
     * @since 0.49.0
     */
    const stringField: Lib_DockerRender_Runner_RenderRuntimeStage_StringField = (source, key) => {
      const fieldValue: Lib_DockerRender_Runner_RenderRuntimeStage_StringField_FieldValue = source[key];

      return (typeof fieldValue === 'string') ? fieldValue : '';
    };
    const labelEntries: Lib_DockerRender_Runner_RenderRuntimeStage_LabelEntries = [
      [
        'org.opencontainers.image.title',
        projectTitle,
      ],
      [
        'org.opencontainers.image.description',
        stringField(projectDescription, 'short'),
      ],
      [
        'org.opencontainers.image.url',
        stringField(urls, 'homepage'),
      ],
      [
        'org.opencontainers.image.source',
        Runner.formatSourceUrl(stringField(urls, 'repository')),
      ],
      [
        'org.opencontainers.image.documentation',
        stringField(urls, 'documentation'),
      ],
      [
        'org.opencontainers.image.licenses',
        stringField(project, 'license'),
      ],
      [
        'org.opencontainers.image.vendor',
        stringField(project, 'legalName'),
      ],
      ...Object.entries(runtimeSettings['labels'] ?? {}),
    ];
    const labelLines: Lib_DockerRender_Runner_RenderRuntimeStage_LabelLines = labelEntries.map((labelEntry, labelIndex) => {
      const labelPrefix: Lib_DockerRender_Runner_RenderRuntimeStage_LabelPrefix = (labelIndex === 0) ? 'LABEL ' : '  ';
      const labelSuffix: Lib_DockerRender_Runner_RenderRuntimeStage_LabelSuffix = (labelIndex === labelEntries.length - 1) ? '' : ' \\';

      return `${labelPrefix}${labelEntry[0]}="${Runner.escapeDockerLabel(labelEntry[1])}"${labelSuffix}`;
    });

    // Project packages join the fixed helper packages; a project entry with a version replaces the bare one.
    const packages: Lib_DockerRender_Runner_RenderRuntimeStage_Packages = new Map(basePackages.map((packageName) => [
      packageName,
      packageName,
    ]));

    for (const packageEntry of runtimeSettings['packages'] ?? []) {
      if (typeof packageEntry === 'string') {
        packages.set(packageEntry, packageEntry);
      } else {
        packages.set(packageEntry['name'], (packageEntry['version'] === undefined) ? packageEntry['name'] : `"${packageEntry['name']}=${packageEntry['version']}"`);
      }
    }

    const packageLines: Lib_DockerRender_Runner_RenderRuntimeStage_PackageLines = [...packages.entries()]
      .sort((firstEntry, secondEntry) => Runner.compareText(firstEntry[0], secondEntry[0]))
      .map((packageEntry) => `    ${packageEntry[1]} \\`);
    const aptCommands: Lib_DockerRender_Runner_RenderRuntimeStage_AptCommands = [
      'RUN apt-get update \\',
      '  && apt-get install -y --no-install-recommends \\',
      ...packageLines,
      ...(runtimeSettings['packageCommands'] ?? []).map((packageCommand) => `  && ${packageCommand} \\`),
      '  && rm -rf /var/lib/apt/lists/*',
    ];
    const environment: Lib_DockerRender_Runner_RenderRuntimeStage_Environment = Object.entries({
      ...baseEnvironment,
      ...(runtimeSettings['environment'] ?? {}),
    }).sort((firstEntry, secondEntry) => Runner.compareText(firstEntry[0], secondEntry[0]));
    const environmentLines: Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentLines = environment.map((environmentEntry, environmentIndex) => {
      const environmentPrefix: Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentPrefix = (environmentIndex === 0) ? 'ENV ' : '  ';
      const environmentSuffix: Lib_DockerRender_Runner_RenderRuntimeStage_EnvironmentSuffix = (environmentIndex === environment.length - 1) ? '' : ' \\';

      return `${environmentPrefix}${environmentEntry[0]}=${environmentEntry[1]}${environmentSuffix}`;
    });
    const copies: Lib_DockerRender_Runner_RenderRuntimeStage_Copies = runtimeSettings['copies'] ?? [];
    const rootfsCopyLines: Lib_DockerRender_Runner_RenderRuntimeStage_RootfsCopyLines = [
      'COPY --from=s6-overlay /s6-rootfs/ /',
      ...copies.filter((copy) => copy['beforeRootfs'] === true).map((copy) => Runner.formatCopy(copy)),
      'COPY packages/docker/rootfs/ /',
      ...((manifest['project'] === undefined) ? [] : ['COPY packages/docker/project/ /']),
    ];
    const projectSettings: Lib_DockerRender_Runner_RenderRuntimeStage_ProjectSettings = manifest['project'] ?? {};
    const fixCommands: Lib_DockerRender_Runner_RenderRuntimeStage_FixCommands = [
      'find /usr/local/libexec/nova-docker -type f -exec sed -i \'s/\\r$//\' {} \\;',
      'find /usr/local/libexec/nova-docker -type f -exec chmod 0755 {} \\;',
      'find /etc/s6-overlay/s6-rc.d -type f \\( -name run -o -name finish \\) -exec sed -i \'s/\\r$//\' {} \\;',
      'find /etc/s6-overlay/s6-rc.d -type f \\( -name run -o -name finish \\) -exec chmod 0755 {} \\;',
    ];

    for (const executable of projectSettings['executables'] ?? []) {
      const nameFlag: Lib_DockerRender_Runner_RenderRuntimeStage_NameFlag = (executable['name'] === undefined) ? '' : ` -name '${executable['name']}'`;

      fixCommands.push(
        `find ${executable['path']} -type f${nameFlag} -exec sed -i 's/\\r$//' {} \\;`,
        `find ${executable['path']} -type f${nameFlag} -exec chmod 0755 {} \\;`,
      );
    }

    const copyLines: Lib_DockerRender_Runner_RenderRuntimeStage_CopyLines = [];

    // The assembly layout copies Nova's per-profile runtime tree; the outputs layout copies only declared files.
    if (isBuildEnabled === true && isOutputsLayout === false) {
      if (needsNodeRuntime === true) {
        copyLines.push('COPY --from=build /runtime/ /app/');
      }

      for (const workspace of manifest['workspaces']) {
        const runtimeWorkspacePath: Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeWorkspacePath = `/app/${workspace['path']}`;

        // The Node.js runtime tree already holds every workspace except the rebuilt static and Next.js output.
        if (
          needsNodeRuntime === true
          && workspace['profile'] !== 'static-site'
          && workspace['profile'] !== 'nextjs-standalone'
        ) {
          continue;
        }

        if (needsNodeRuntime === false && workspace['profile'] === 'static-site') {
          const staticServices: Lib_DockerRender_Runner_RenderRuntimeStage_StaticServices = manifest['services'].filter((manifestService) => manifestService['workspace'] === workspace['path']);

          for (const service of staticServices) {
            copyLines.push(`COPY --from=build /workspace/${workspace['path']}/build /app/sites/${service['name']}`);
          }
        } else if (needsNodeRuntime === false && workspace['profile'] === 'container-native') {
          copyLines.push(`COPY --from=build /workspace/${workspace['path']} ${runtimeWorkspacePath}`);
        }

        if (workspace['profile'] !== 'container-native') {
          for (const runtimePath of workspace['runtimePaths']) {
            copyLines.push(`COPY --from=build /workspace/${workspace['path']}/${runtimePath} ${runtimeWorkspacePath}/${runtimePath}`);
          }
        }
      }

      if (needsNodeRuntime === false) {
        const runtimeAssemblyWorkspaces: Lib_DockerRender_Runner_RenderRuntimeStage_RuntimeAssemblyWorkspaces = [...input['buildOrder'].values()].filter((workspacePackage) => manifest['workspaces'].some((workspace) => workspace['path'] === workspacePackage['path']) === false);

        for (const workspacePackage of runtimeAssemblyWorkspaces) {
          copyLines.push(`COPY --from=build /workspace/${workspacePackage['path']} /app/${workspacePackage['path']}`);
        }
      }
    }

    copyLines.push(...copies.filter((copy) => copy['beforeRootfs'] !== true).map((copy) => Runner.formatCopy(copy)));

    const directories: Lib_DockerRender_Runner_RenderRuntimeStage_Directories = [...new Set([
      '/config',
      '/data',
      ...manifest['services'].flatMap((service) => service['writablePaths']),
      ...(runtimeSettings['directories'] ?? []),
      ...((isBuildEnabled === true) ? [] : manifest['workspaces'].map((workspace) => `/app/${workspace['path']}`)),
    ])].sort((firstDirectory, secondDirectory) => Runner.compareText(firstDirectory, secondDirectory));
    const ports: Lib_DockerRender_Runner_RenderRuntimeStage_Ports = Runner.collectPorts(manifest);

    return [
      [
        ...Runner.formatBanner(stepNumber, 'Runtime Image'),
        `FROM ${baseImage} AS runtime`,
      ],
      runtimeArguments,
      labelLines,
      aptCommands,
      environmentLines,
      ['WORKDIR /app'],
      rootfsCopyLines,
      Runner.formatRun(fixCommands, 'RUN'),
      copyLines,
      [`RUN mkdir -p ${directories.map((directory) => Runner.formatPath(directory)).join(' ')}`],
      ports.map((port) => `EXPOSE ${port}`),
      [
        'HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \\',
        '  CMD ["/usr/local/libexec/nova-docker/healthcheck"]',
      ],
      ['STOPSIGNAL SIGTERM'],
      ['ENTRYPOINT ["/init"]'],
    ];
  }

  /**
   * Lib - Docker Render - Validate Stages.
   *
   * Confirms every project stage fragment declares its own stage and that each
   * stage reference points at a stage defined earlier in the Dockerfile.
   *
   * @param {Lib_DockerRender_Runner_ValidateStages_Input} input - Input.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ValidateStages_Returns}
   *
   * @since 0.49.0
   */
  private static validateStages(input: Lib_DockerRender_Runner_ValidateStages_Input): Lib_DockerRender_Runner_ValidateStages_Returns {
    const stageOrder: Lib_DockerRender_Runner_ValidateStages_StageOrder = Runner.resolveStageOrder(input['manifest']);
    const positions: Lib_DockerRender_Runner_ValidateStages_Positions = new Map(stageOrder.map((stageName, stageIndex) => [
      stageName,
      stageIndex,
    ]));
    const stageFromPattern: Lib_DockerRender_Runner_ValidateStages_StageFromPattern = new RegExp(LIB_REGEX_PATTERN_DOCKER_STAGE_FROM.source, 'i');

    for (const stageName of stageOrder) {
      if (novaStageNames.some((novaStageName) => novaStageName === stageName) === true) {
        continue;
      }

      const fragment: Lib_DockerRender_Runner_ValidateStages_Fragment = input['stageFragments'].get(stageName);

      if (fragment === undefined) {
        throw new Error(`Docker stage "${stageName}" has no fragment file to insert.`);
      }

      const fromLines: Lib_DockerRender_Runner_ValidateStages_FromLines = fragment.split('\n').filter((fragmentLine) => fragmentLine.trim().toUpperCase().startsWith('FROM ') === true);
      const fromMatch: Lib_DockerRender_Runner_ValidateStages_FromMatch = (fromLines.length === 1) ? stageFromPattern.exec((fromLines[0] ?? '').trim()) : null;

      if (fromMatch === null || fromMatch[2] !== stageName) {
        throw new Error(`Docker stage fragment for "${stageName}" must contain exactly one "FROM <base> AS ${stageName}" line.`);
      }
    }

    /**
     * Lib - Docker Render - Validate Stages - Validate Reference.
     *
     * Rejects a stage reference that is unknown or appears at or after the
     * stage that uses it, because Docker resolves stages top to bottom.
     *
     * @param {Lib_DockerRender_Runner_ValidateStages_ValidateReference_Reference} reference - Reference.
     * @param {Lib_DockerRender_Runner_ValidateStages_ValidateReference_Position}  position  - Position.
     * @param {Lib_DockerRender_Runner_ValidateStages_ValidateReference_Label}     label     - Label.
     *
     * @returns {Lib_DockerRender_Runner_ValidateStages_ValidateReference_Returns}
     *
     * @since 0.49.0
     */
    const validateReference: Lib_DockerRender_Runner_ValidateStages_ValidateReference = (reference, position, label) => {
      const referencePosition: Lib_DockerRender_Runner_ValidateStages_ValidateReference_ReferencePosition = positions.get(reference);

      if (referencePosition === undefined || referencePosition >= position) {
        throw new Error(`Docker manifest field "${label}" names stage "${reference}", which is not defined before it.`);
      }

      return;
    };

    if (input['manifest']['s6Overlay'] !== undefined && input['manifest']['s6Overlay']['from'] !== undefined) {
      validateReference(input['manifest']['s6Overlay']['from'], positions.get('s6-overlay') ?? 0, 's6Overlay.from');
    }

    if (input['manifest']['runtime'] !== undefined) {
      if (input['manifest']['runtime']['from'] !== undefined) {
        validateReference(input['manifest']['runtime']['from'], positions.get('runtime') ?? 0, 'runtime.from');
      }

      for (const copy of input['manifest']['runtime']['copies'] ?? []) {
        const copySource: Lib_DockerRender_Runner_ValidateStages_CopySource = copy['from'];

        if (copySource !== undefined) {
          validateReference(copySource, positions.get('runtime') ?? 0, 'runtime.copies[].from');
        }
      }
    }

    return;
  }

  /**
   * Lib - Docker Render - Resolve Stage Order.
   *
   * Lists every stage name in Dockerfile order. Project stages sit before the
   * Nova stage they name, keeping their declared order, and default to runtime.
   *
   * @param {Lib_DockerRender_Runner_ResolveStageOrder_Manifest} manifest - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ResolveStageOrder_Returns}
   *
   * @since 0.49.0
   */
  private static resolveStageOrder(manifest: Lib_DockerRender_Runner_ResolveStageOrder_Manifest): Lib_DockerRender_Runner_ResolveStageOrder_Returns {
    const stages: Lib_DockerRender_Runner_ResolveStageOrder_Stages = (manifest['dockerfile'] === undefined) ? [] : manifest['dockerfile']['stages'] ?? [];
    const isBuildEnabled: Lib_DockerRender_Runner_ResolveStageOrder_IsBuildEnabled = manifest['build'] === undefined || manifest['build']['enabled'] !== false;
    const order: Lib_DockerRender_Runner_ResolveStageOrder_Order = [];

    for (const novaStageName of novaStageNames) {
      const anchor: Lib_DockerRender_Runner_ResolveStageOrder_Anchor = novaStageName;

      for (const stage of stages) {
        if ((stage['before'] ?? 'runtime') === anchor) {
          order.push(stage['name']);
        }
      }

      if (anchor !== 'build' || isBuildEnabled === true) {
        order.push(anchor);
      }
    }

    return order;
  }

  /**
   * Lib - Docker Render - Inherits Frontend.
   *
   * Reports whether a project base stage, or a stage it builds on, already sets
   * DEBIAN_FRONTEND. Child stages inherit that argument, so Nova does not repeat it.
   *
   * @param {Lib_DockerRender_Runner_InheritsFrontend_Base}           base           - Base.
   * @param {Lib_DockerRender_Runner_InheritsFrontend_StageFragments} stageFragments - Stage fragments.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_InheritsFrontend_Returns}
   *
   * @since 0.49.0
   */
  private static inheritsFrontend(base: Lib_DockerRender_Runner_InheritsFrontend_Base, stageFragments: Lib_DockerRender_Runner_InheritsFrontend_StageFragments): Lib_DockerRender_Runner_InheritsFrontend_Returns {
    const visited: Lib_DockerRender_Runner_InheritsFrontend_Visited = new Set();
    let current: Lib_DockerRender_Runner_InheritsFrontend_Current = base;

    while (current !== undefined && visited.has(current) === false) {
      visited.add(current);

      const fragment: Lib_DockerRender_Runner_InheritsFrontend_Fragment = stageFragments.get(current);

      if (fragment === undefined) {
        return false;
      }

      const fragmentLines: Lib_DockerRender_Runner_InheritsFrontend_FragmentLines = fragment.split('\n').map((fragmentLine) => fragmentLine.trim());

      if (fragmentLines.some((fragmentLine) => fragmentLine.startsWith('ARG DEBIAN_FRONTEND') === true) === true) {
        return true;
      }

      const fromLine: Lib_DockerRender_Runner_InheritsFrontend_FromLine = fragmentLines.find((fragmentLine) => fragmentLine.toUpperCase().startsWith('FROM ') === true);
      const fromMatch: Lib_DockerRender_Runner_InheritsFrontend_FromMatch = (fromLine === undefined) ? null : new RegExp(LIB_REGEX_PATTERN_DOCKER_STAGE_FROM.source, 'i').exec(fromLine);

      current = (fromMatch === null) ? undefined : fromMatch[1];
    }

    return false;
  }

  /**
   * Lib - Docker Render - Collect Ports.
   *
   * Lists every service port and every extra exposed port once, in numeric
   * order, for EXPOSE lines and bridge-mode Compose mappings.
   *
   * @param {Lib_DockerRender_Runner_CollectPorts_Manifest} manifest - Manifest.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_CollectPorts_Returns}
   *
   * @since 0.49.0
   */
  private static collectPorts(manifest: Lib_DockerRender_Runner_CollectPorts_Manifest): Lib_DockerRender_Runner_CollectPorts_Returns {
    const runtimeSettings: Lib_DockerRender_Runner_CollectPorts_RuntimeSettings = manifest['runtime'] ?? {};
    const ports: Lib_DockerRender_Runner_CollectPorts_Ports = new Set(runtimeSettings['expose'] ?? []);

    for (const service of manifest['services']) {
      for (const port of service['ports'] ?? ((service['port'] === undefined) ? [] : [service['port']])) {
        ports.add(port);
      }
    }

    return [...ports].sort((firstPort, secondPort) => firstPort - secondPort);
  }

  /**
   * Lib - Docker Render - Resolve Image.
   *
   * Returns the manifest's pinned reference for a Nova base image, or the
   * scaffold catalog version when the project does not pin one.
   *
   * @param {Lib_DockerRender_Runner_ResolveImage_Manifest} manifest - Manifest.
   * @param {Lib_DockerRender_Runner_ResolveImage_Alias}    alias    - Alias.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ResolveImage_Returns}
   *
   * @since 0.49.0
   */
  private static resolveImage(manifest: Lib_DockerRender_Runner_ResolveImage_Manifest, alias: Lib_DockerRender_Runner_ResolveImage_Alias): Lib_DockerRender_Runner_ResolveImage_Returns {
    const images: Lib_DockerRender_Runner_ResolveImage_Images = manifest['images'] ?? {};
    const override: Lib_DockerRender_Runner_ResolveImage_Override = images[alias];

    if (override !== undefined) {
      return override['reference'];
    }

    return (alias === 'node') ? `node:${getScaffoldVersion('dockerNode')}` : `debian:${getScaffoldVersion('dockerDebian')}`;
  }

  /**
   * Lib - Docker Render - Format Banner.
   *
   * Builds the boxed "#### Step N: Title ####" comment that opens each stage
   * Nova renders, following the Docker documentation style.
   *
   * @param {Lib_DockerRender_Runner_FormatBanner_StepNumber} stepNumber - Step number.
   * @param {Lib_DockerRender_Runner_FormatBanner_Title}      title      - Title.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_FormatBanner_Returns}
   *
   * @since 0.49.0
   */
  private static formatBanner(stepNumber: Lib_DockerRender_Runner_FormatBanner_StepNumber, title: Lib_DockerRender_Runner_FormatBanner_Title): Lib_DockerRender_Runner_FormatBanner_Returns {
    const titleLine: Lib_DockerRender_Runner_FormatBanner_TitleLine = `#### Step ${stepNumber}: ${title} ####`;
    const rule: Lib_DockerRender_Runner_FormatBanner_Rule = '#'.repeat(titleLine.length);

    return [
      rule,
      titleLine,
      rule,
    ];
  }

  /**
   * Lib - Docker Render - Format Stage.
   *
   * Joins the instruction blocks of one Nova stage. The compact layout keeps
   * instructions together; the spaced layout puts a blank line between blocks.
   *
   * @param {Lib_DockerRender_Runner_FormatStage_Blocks} blocks - Blocks.
   * @param {Lib_DockerRender_Runner_FormatStage_Layout} layout - Layout.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_FormatStage_Returns}
   *
   * @since 0.49.0
   */
  private static formatStage(blocks: Lib_DockerRender_Runner_FormatStage_Blocks, layout: Lib_DockerRender_Runner_FormatStage_Layout): Lib_DockerRender_Runner_FormatStage_Returns {
    const nonEmptyBlocks: Lib_DockerRender_Runner_FormatStage_NonEmptyBlocks = blocks.filter((block) => block.length > 0);

    return nonEmptyBlocks.map((block) => block.join('\n')).join((layout === 'spaced') ? '\n\n' : '\n');
  }

  /**
   * Lib - Docker Render - Format Run.
   *
   * Chains shell commands into one RUN instruction with "&&" continuations, or
   * returns no lines when there is nothing to run.
   *
   * @param {Lib_DockerRender_Runner_FormatRun_Commands} commands - Commands.
   * @param {Lib_DockerRender_Runner_FormatRun_Prefix}   prefix   - Prefix.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_FormatRun_Returns}
   *
   * @since 0.49.0
   */
  private static formatRun(commands: Lib_DockerRender_Runner_FormatRun_Commands, prefix: Lib_DockerRender_Runner_FormatRun_Prefix): Lib_DockerRender_Runner_FormatRun_Returns {
    return commands.map((command, commandIndex) => {
      const commandStart: Lib_DockerRender_Runner_FormatRun_CommandStart = (commandIndex === 0) ? `${prefix} ` : '  && ';
      const commandEnd: Lib_DockerRender_Runner_FormatRun_CommandEnd = (commandIndex === commands.length - 1) ? '' : ' \\';

      return `${commandStart}${command}${commandEnd}`;
    });
  }

  /**
   * Lib - Docker Render - Format Argument.
   *
   * Writes one ARG line exactly as declared, quoting the default value unless
   * the manifest asks for the bare form some build scripts parse.
   *
   * @param {Lib_DockerRender_Runner_FormatArgument_Argument} argument - Argument.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_FormatArgument_Returns}
   *
   * @since 0.49.0
   */
  private static formatArgument(argument: Lib_DockerRender_Runner_FormatArgument_Argument): Lib_DockerRender_Runner_FormatArgument_Returns {
    const argumentValue: Lib_DockerRender_Runner_FormatArgument_ArgumentValue = argument['value'];

    if (argumentValue === undefined) {
      return `ARG ${argument['name']}`;
    }

    if (argument['quoted'] === false) {
      return `ARG ${argument['name']}=${argumentValue}`;
    }

    return `ARG ${argument['name']}="${argumentValue}"`;
  }

  /**
   * Lib - Docker Render - Format Copy.
   *
   * Writes one declared runtime COPY instruction with its optional source
   * stage, owner, and mode flags.
   *
   * @param {Lib_DockerRender_Runner_FormatCopy_Copy} copy - Copy.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_FormatCopy_Returns}
   *
   * @since 0.49.0
   */
  private static formatCopy(copy: Lib_DockerRender_Runner_FormatCopy_Copy): Lib_DockerRender_Runner_FormatCopy_Returns {
    const flags: Lib_DockerRender_Runner_FormatCopy_Flags = [];

    if (copy['from'] !== undefined) {
      flags.push(`--from=${copy['from']}`);
    }

    if (copy['chown'] !== undefined) {
      flags.push(`--chown=${copy['chown']}`);
    }

    if (copy['chmod'] !== undefined) {
      flags.push(`--chmod=${copy['chmod']}`);
    }

    return [
      'COPY',
      ...flags,
      copy['source'],
      copy['destination'],
    ].join(' ');
  }

  /**
   * Lib - Docker Render - Format Source URL.
   *
   * Strips a "git+" prefix and a ".git" suffix from the repository URL, so the
   * OCI source label is the plain page address GitHub uses to link the image.
   *
   * @param {Lib_DockerRender_Runner_FormatSourceUrl_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_FormatSourceUrl_Returns}
   *
   * @since 0.49.0
   */
  private static formatSourceUrl(value: Lib_DockerRender_Runner_FormatSourceUrl_Value): Lib_DockerRender_Runner_FormatSourceUrl_Returns {
    let sourceUrl: Lib_DockerRender_Runner_FormatSourceUrl_SourceUrl = value;

    if (sourceUrl.startsWith('git+') === true) {
      sourceUrl = sourceUrl.slice('git+'.length);
    }

    if (sourceUrl.endsWith('.git') === true) {
      sourceUrl = sourceUrl.slice(0, sourceUrl.length - '.git'.length);
    }

    return sourceUrl;
  }

  /**
   * Lib - Docker Render - Format Path.
   *
   * Leaves a plain absolute path bare and shell-quotes anything else, so the
   * state-folder RUN line stays readable without losing safety.
   *
   * @param {Lib_DockerRender_Runner_FormatPath_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_FormatPath_Returns}
   *
   * @since 0.49.0
   */
  private static formatPath(value: Lib_DockerRender_Runner_FormatPath_Value): Lib_DockerRender_Runner_FormatPath_Returns {
    return (LIB_REGEX_PATTERN_DOCKER_COPY_PATH.test(value) === true) ? value : Runner.shellQuote(value);
  }

  /**
   * Lib - Docker Render - Format Compose Comment.
   *
   * Turns manifest comment lines into indented YAML comments. An empty line
   * becomes a bare "#" so paragraph breaks survive.
   *
   * @param {Lib_DockerRender_Runner_FormatComposeComment_Comment} comment - Comment.
   * @param {Lib_DockerRender_Runner_FormatComposeComment_Indent}  indent  - Indent.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_FormatComposeComment_Returns}
   *
   * @since 0.49.0
   */
  private static formatComposeComment(comment: Lib_DockerRender_Runner_FormatComposeComment_Comment, indent: Lib_DockerRender_Runner_FormatComposeComment_Indent): Lib_DockerRender_Runner_FormatComposeComment_Returns {
    return comment.map((commentLine) => ((commentLine === '') ? `${indent}#` : `${indent}# ${commentLine}`));
  }

  /**
   * Lib - Docker Render - Format Compose String.
   *
   * Writes one double-quoted YAML scalar, escaping backslashes and quotes so a
   * project environment value cannot break the Compose file.
   *
   * @param {Lib_DockerRender_Runner_FormatComposeString_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_FormatComposeString_Returns}
   *
   * @since 0.49.0
   */
  private static formatComposeString(value: Lib_DockerRender_Runner_FormatComposeString_Value): Lib_DockerRender_Runner_FormatComposeString_Returns {
    return `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;
  }

  /**
   * Lib - Docker Render - Escape Docker Label.
   *
   * Escapes project-controlled metadata for a double-quoted Dockerfile LABEL
   * value without permitting environment expansion or line injection.
   *
   * @param {Lib_DockerRender_Runner_EscapeDockerLabel_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_EscapeDockerLabel_Returns}
   *
   * @since 0.49.0
   */
  private static escapeDockerLabel(value: Lib_DockerRender_Runner_EscapeDockerLabel_Value): Lib_DockerRender_Runner_EscapeDockerLabel_Returns {
    return value
      .replaceAll('\\', '\\\\')
      .replaceAll('"', '\\"')
      .replaceAll('$', '\\$')
      .replaceAll('\r', '\\r')
      .replaceAll('\n', '\\n')
      .replaceAll('\t', '\\t');
  }

  /**
   * Lib - Docker Render - Shell Quote.
   *
   * Quotes one generated POSIX shell argument without evaluating it and escapes
   * embedded single quotes for literal shell consumption.
   *
   * @param {Lib_DockerRender_Runner_ShellQuote_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ShellQuote_Returns}
   *
   * @since 0.49.0
   */
  private static shellQuote(value: Lib_DockerRender_Runner_ShellQuote_Value): Lib_DockerRender_Runner_ShellQuote_Returns {
    return `'${value.split('\'').join('\'"\'"\'')}'`;
  }

  /**
   * Lib - Docker Render - Compare Text.
   *
   * Orders two strings by their character codes. Package, environment, and
   * path lists sort the same way on every machine and locale.
   *
   * @param {Lib_DockerRender_Runner_CompareText_First}  first  - First.
   * @param {Lib_DockerRender_Runner_CompareText_Second} second - Second.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_CompareText_Returns}
   *
   * @since 0.49.0
   */
  private static compareText(first: Lib_DockerRender_Runner_CompareText_First, second: Lib_DockerRender_Runner_CompareText_Second): Lib_DockerRender_Runner_CompareText_Returns {
    if (first === second) {
      return 0;
    }

    return (first < second) ? -1 : 1;
  }

  /**
   * Lib - Docker Render - Normalize Compose.
   *
   * Validates the manifest "compose" section field by field so each repository
   * can express its service name, image, devices, ports, volumes, and networks.
   *
   * @param {Lib_DockerRender_Runner_NormalizeCompose_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_NormalizeCompose_Returns}
   *
   * @since 0.49.0
   */
  private static normalizeCompose(value: Lib_DockerRender_Runner_NormalizeCompose_Value): Lib_DockerRender_Runner_NormalizeCompose_Returns {
    const compose: Lib_DockerRender_Runner_NormalizeCompose_Compose = {};
    const restartValue: Lib_DockerRender_Runner_NormalizeCompose_RestartValue = Runner.readString(value['restart'], 'compose.restart', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME);
    const restart: Lib_DockerRender_Runner_NormalizeCompose_Restart = [
      'always' as const,
      'no' as const,
      'on-failure' as const,
      'unless-stopped' as const,
    ].find((allowedRestart) => allowedRestart === restartValue);

    if (restartValue !== undefined && restart === undefined) {
      throw new Error('Docker manifest field "compose.restart" must be "always", "no", "on-failure", or "unless-stopped".');
    }

    const environment: Lib_DockerRender_Runner_NormalizeCompose_Environment = Runner.readStringMap(value['environment'], 'compose.environment', LIB_REGEX_PATTERN_DOCKER_ARGUMENT_NAME, LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE);

    if (environment !== undefined) {
      for (const identityKey of Object.keys(composeIdentity)) {
        if (Reflect.has(environment, identityKey) === true) {
          throw new Error(`Docker manifest field "compose.environment.${identityKey}" is set by Nova and cannot be replaced.`);
        }
      }
    }

    Runner.assignDefined(compose, 'capAdd', Runner.readStringList(value['capAdd'], 'compose.capAdd', LIB_REGEX_PATTERN_DOCKER_CAPABILITY));
    Runner.assignDefined(compose, 'comment', Runner.readStringList(value['comment'], 'compose.comment', LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE));
    Runner.assignDefined(compose, 'devices', Runner.readStringList(value['devices'], 'compose.devices', LIB_REGEX_PATTERN_DOCKER_PLAIN_VALUE));
    Runner.assignDefined(compose, 'environment', environment);

    const environmentFilesValue: Lib_DockerRender_Runner_NormalizeCompose_EnvironmentFilesValue = Runner.readList(value['environmentFiles'], 'compose.environmentFiles');

    if (environmentFilesValue !== undefined) {
      const environmentFiles: Lib_DockerRender_Runner_NormalizeCompose_EnvironmentFiles = [];

      for (const environmentFileValue of environmentFilesValue) {
        if (typeof environmentFileValue === 'string') {
          environmentFiles.push(Runner.readString(environmentFileValue, 'compose.environmentFiles[]', LIB_REGEX_PATTERN_DOCKER_PLAIN_VALUE) ?? '');

          continue;
        }

        const environmentFileObject: Lib_DockerRender_Runner_NormalizeCompose_EnvironmentFileObject = Runner.readObject(environmentFileValue, 'compose.environmentFiles[]') ?? {};
        const filePath: Lib_DockerRender_Runner_NormalizeCompose_FilePath = Runner.readString(environmentFileObject['path'], 'compose.environmentFiles[].path', LIB_REGEX_PATTERN_DOCKER_PLAIN_VALUE);
        const fileRequired: Lib_DockerRender_Runner_NormalizeCompose_FileRequired = Runner.readBoolean(environmentFileObject['required'], 'compose.environmentFiles[].required');

        if (filePath === undefined) {
          throw new Error('Docker manifest field "compose.environmentFiles[].path" is required.');
        }

        environmentFiles.push((fileRequired === undefined) ? { path: filePath } : {
          path: filePath,
          required: fileRequired,
        });
      }

      compose.environmentFiles = environmentFiles;
    }

    const image: Lib_DockerRender_Runner_NormalizeCompose_Image = Runner.readString(value['image'], 'compose.image', LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE);
    const name: Lib_DockerRender_Runner_NormalizeCompose_Name = Runner.readString(value['name'], 'compose.name', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME);

    Runner.assignDefined(compose, 'image', image);
    Runner.assignDefined(compose, 'name', name);

    const networksValue: Lib_DockerRender_Runner_NormalizeCompose_NetworksValue = Runner.readObject(value['networks'], 'compose.networks');

    if (networksValue !== undefined) {
      const networks: Lib_DockerRender_Runner_NormalizeCompose_Networks = {};

      for (const networkEntry of Object.entries(networksValue)) {
        const networkSettings: Lib_DockerRender_Runner_NormalizeCompose_NetworkSettings = Runner.readObject(networkEntry[1], `compose.networks.${networkEntry[0]}`) ?? {};
        const networkConfig: Lib_DockerRender_Runner_NormalizeCompose_NetworkConfig = {};

        if (LIB_REGEX_PATTERN_DOCKER_STAGE_NAME.test(networkEntry[0]) === false) {
          throw new Error(`Docker manifest network name "${networkEntry[0]}" must be a lowercase name.`);
        }

        for (const settingEntry of Object.entries(networkSettings)) {
          if (
            LIB_REGEX_PATTERN_DOCKER_ARGUMENT_NAME.test(settingEntry[0]) === false
            || (
              typeof settingEntry[1] !== 'boolean'
              && typeof settingEntry[1] !== 'number'
              && (
                typeof settingEntry[1] !== 'string'
                || LIB_REGEX_PATTERN_DOCKER_PLAIN_VALUE.test(settingEntry[1]) === false
              )
            )
          ) {
            throw new Error(`Docker manifest field "compose.networks.${networkEntry[0]}.${settingEntry[0]}" must be a plain boolean, number, or string.`);
          }

          Reflect.set(networkConfig, settingEntry[0], settingEntry[1]);
        }

        Reflect.set(networks, networkEntry[0], networkConfig);
      }

      compose.networks = networks;
    }

    const ports: Lib_DockerRender_Runner_NormalizeCompose_Ports = Runner.readStringList(value['ports'], 'compose.ports', LIB_REGEX_PATTERN_DOCKER_PLAIN_VALUE);
    const service: Lib_DockerRender_Runner_NormalizeCompose_Service = Runner.readString(value['service'], 'compose.service', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME);
    const user: Lib_DockerRender_Runner_NormalizeCompose_User = Runner.readString(value['user'], 'compose.user', LIB_REGEX_PATTERN_DOCKER_IDENTITY);

    Runner.assignDefined(compose, 'ports', ports);
    Runner.assignDefined(compose, 'restart', restart);
    Runner.assignDefined(compose, 'service', service);
    Runner.assignDefined(compose, 'user', user);

    const volumesValue: Lib_DockerRender_Runner_NormalizeCompose_VolumesValue = Runner.readList(value['volumes'], 'compose.volumes');

    if (volumesValue !== undefined) {
      const volumes: Lib_DockerRender_Runner_NormalizeCompose_Volumes = [];

      for (const volumeValue of volumesValue) {
        const volumeObject: Lib_DockerRender_Runner_NormalizeCompose_VolumeObject = Runner.readObject(volumeValue, 'compose.volumes[]') ?? {};
        const volumeSource: Lib_DockerRender_Runner_NormalizeCompose_VolumeSource = Runner.readString(volumeObject['source'], 'compose.volumes[].source', LIB_REGEX_PATTERN_DOCKER_PLAIN_VALUE);
        const volumeTarget: Lib_DockerRender_Runner_NormalizeCompose_VolumeTarget = Runner.readString(volumeObject['target'], 'compose.volumes[].target', LIB_REGEX_PATTERN_DOCKER_COPY_PATH);
        const volumeReadOnly: Lib_DockerRender_Runner_NormalizeCompose_VolumeReadOnly = Runner.readBoolean(volumeObject['readOnly'], 'compose.volumes[].readOnly');
        const volumeComment: Lib_DockerRender_Runner_NormalizeCompose_VolumeComment = Runner.readStringList(volumeObject['comment'], 'compose.volumes[].comment', LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE);
        const volume: Lib_DockerRender_Runner_NormalizeCompose_Volume = {
          source: volumeSource ?? '',
          target: volumeTarget ?? '',
        };

        if (
          volumeSource === undefined
          || volumeTarget === undefined
          || volumeTarget.startsWith('/') === false
        ) {
          throw new Error('Docker manifest field "compose.volumes[]" needs a "source" and an absolute "target".');
        }

        Runner.assignDefined(volume, 'comment', volumeComment);
        Runner.assignDefined(volume, 'readOnly', volumeReadOnly);

        volumes.push(volume);
      }

      compose.volumes = volumes;
    }

    return compose;
  }

  /**
   * Lib - Docker Render - Normalize Runtime.
   *
   * Validates the manifest "runtime" section: build arguments, packages, labels,
   * environment, copies, folders, extra ports, base stage, and copy layout.
   *
   * @param {Lib_DockerRender_Runner_NormalizeRuntime_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_NormalizeRuntime_Returns}
   *
   * @since 0.49.0
   */
  private static normalizeRuntime(value: Lib_DockerRender_Runner_NormalizeRuntime_Value): Lib_DockerRender_Runner_NormalizeRuntime_Returns {
    const runtime: Lib_DockerRender_Runner_NormalizeRuntime_Runtime = {};
    const runtimeArguments: Lib_DockerRender_Runner_NormalizeRuntime_RuntimeArguments = Runner.normalizeArguments(value['arguments'], 'runtime.arguments');

    Runner.assignDefined(runtime, 'arguments', runtimeArguments);

    const copiesValue: Lib_DockerRender_Runner_NormalizeRuntime_CopiesValue = Runner.readList(value['copies'], 'runtime.copies');

    if (copiesValue !== undefined) {
      const copies: Lib_DockerRender_Runner_NormalizeRuntime_Copies = [];

      for (const copyValue of copiesValue) {
        const copyObject: Lib_DockerRender_Runner_NormalizeRuntime_CopyObject = Runner.readObject(copyValue, 'runtime.copies[]') ?? {};
        const copySource: Lib_DockerRender_Runner_NormalizeRuntime_CopySource = Runner.readString(copyObject['source'], 'runtime.copies[].source', LIB_REGEX_PATTERN_DOCKER_COPY_PATH);
        const copyDestination: Lib_DockerRender_Runner_NormalizeRuntime_CopyDestination = Runner.readString(copyObject['destination'], 'runtime.copies[].destination', LIB_REGEX_PATTERN_DOCKER_COPY_PATH);
        const copy: Lib_DockerRender_Runner_NormalizeRuntime_Copy = {
          destination: copyDestination ?? '',
          source: copySource ?? '',
        };

        if (copySource === undefined || copyDestination === undefined) {
          throw new Error('Docker manifest field "runtime.copies[]" needs a "source" and a "destination".');
        }

        Runner.assignDefined(copy, 'beforeRootfs', Runner.readBoolean(copyObject['beforeRootfs'], 'runtime.copies[].beforeRootfs'));
        Runner.assignDefined(copy, 'chmod', Runner.readString(copyObject['chmod'], 'runtime.copies[].chmod', LIB_REGEX_PATTERN_DOCKER_FILE_MODE));
        Runner.assignDefined(copy, 'chown', Runner.readString(copyObject['chown'], 'runtime.copies[].chown', LIB_REGEX_PATTERN_DOCKER_IDENTITY));
        Runner.assignDefined(copy, 'from', Runner.readString(copyObject['from'], 'runtime.copies[].from', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME));

        copies.push(copy);
      }

      runtime.copies = copies;
    }

    const directories: Lib_DockerRender_Runner_NormalizeRuntime_Directories = Runner.readStringList(value['directories'], 'runtime.directories', LIB_REGEX_PATTERN_DOCKER_COPY_PATH);

    if (directories !== undefined && directories.some((directory) => directory.startsWith('/') === false) === true) {
      throw new Error('Docker manifest field "runtime.directories" must list absolute paths.');
    }

    Runner.assignDefined(runtime, 'directories', directories);

    const environment: Lib_DockerRender_Runner_NormalizeRuntime_Environment = Runner.readStringMap(value['environment'], 'runtime.environment', LIB_REGEX_PATTERN_DOCKER_ARGUMENT_NAME, LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE);

    if (environment !== undefined) {
      for (const environmentKey of Object.keys(environment)) {
        if (environmentKey !== 'PATH' && Reflect.has(baseEnvironment, environmentKey) === true) {
          throw new Error(`Docker manifest field "runtime.environment.${environmentKey}" is set by Nova and cannot be replaced.`);
        }
      }

      const environmentPath: Lib_DockerRender_Runner_NormalizeRuntime_EnvironmentPath = environment['PATH'];

      if (environmentPath !== undefined && environmentPath.includes('/command') === false) {
        throw new Error('Docker manifest field "runtime.environment.PATH" must keep "/command" so s6-overlay can start.');
      }
    }

    Runner.assignDefined(runtime, 'environment', environment);

    const exposeValue: Lib_DockerRender_Runner_NormalizeRuntime_ExposeValue = Runner.readList(value['expose'], 'runtime.expose');

    if (exposeValue !== undefined) {
      const expose: Lib_DockerRender_Runner_NormalizeRuntime_Expose = [];

      for (const exposedPort of exposeValue) {
        if (
          typeof exposedPort !== 'number'
          || Number.isInteger(exposedPort) === false
          || exposedPort < 1
          || exposedPort > 65535
        ) {
          throw new Error('Docker manifest field "runtime.expose" must list integer ports between 1 and 65535.');
        }

        expose.push(exposedPort);
      }

      runtime.expose = expose;
    }

    const from: Lib_DockerRender_Runner_NormalizeRuntime_From = Runner.readString(value['from'], 'runtime.from', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME);
    const labels: Lib_DockerRender_Runner_NormalizeRuntime_Labels = Runner.readStringMap(value['labels'], 'runtime.labels', LIB_REGEX_PATTERN_DOCKER_LABEL_KEY, LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE);
    const layoutValue: Lib_DockerRender_Runner_NormalizeRuntime_LayoutValue = Runner.readString(value['layout'], 'runtime.layout', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME);
    const layout: Lib_DockerRender_Runner_NormalizeRuntime_Layout = [
      'assembly' as const,
      'outputs' as const,
    ].find((allowedLayout) => allowedLayout === layoutValue);

    if (layoutValue !== undefined && layout === undefined) {
      throw new Error('Docker manifest field "runtime.layout" must be "assembly" or "outputs".');
    }

    Runner.assignDefined(runtime, 'from', from);
    Runner.assignDefined(runtime, 'labels', labels);
    Runner.assignDefined(runtime, 'layout', layout);

    const packageCommands: Lib_DockerRender_Runner_NormalizeRuntime_PackageCommands = Runner.readStringList(value['packageCommands'], 'runtime.packageCommands', LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE);

    Runner.assignDefined(runtime, 'packageCommands', packageCommands);

    const packagesValue: Lib_DockerRender_Runner_NormalizeRuntime_PackagesValue = Runner.readList(value['packages'], 'runtime.packages');

    if (packagesValue !== undefined) {
      const packages: Lib_DockerRender_Runner_NormalizeRuntime_Packages = [];

      for (const packageValue of packagesValue) {
        if (typeof packageValue === 'string') {
          packages.push(Runner.readString(packageValue, 'runtime.packages[]', LIB_REGEX_PATTERN_DOCKER_PACKAGE_NAME) ?? '');

          continue;
        }

        const packageObject: Lib_DockerRender_Runner_NormalizeRuntime_PackageObject = Runner.readObject(packageValue, 'runtime.packages[]') ?? {};
        const packageName: Lib_DockerRender_Runner_NormalizeRuntime_PackageName = Runner.readString(packageObject['name'], 'runtime.packages[].name', LIB_REGEX_PATTERN_DOCKER_PACKAGE_NAME);
        const packageVersion: Lib_DockerRender_Runner_NormalizeRuntime_PackageVersion = Runner.readString(packageObject['version'], 'runtime.packages[].version', LIB_REGEX_PATTERN_DOCKER_PLAIN_VALUE);

        if (packageName === undefined) {
          throw new Error('Docker manifest field "runtime.packages[].name" is required.');
        }

        packages.push((packageVersion === undefined) ? { name: packageName } : {
          name: packageName,
          version: packageVersion,
        });
      }

      runtime.packages = packages;
    }

    return runtime;
  }

  /**
   * Lib - Docker Render - Normalize Arguments.
   *
   * Validates a list of build arguments for the top of the Dockerfile or the
   * runtime stage, keeping each name, default value, and quote choice.
   *
   * @param {Lib_DockerRender_Runner_NormalizeArguments_Value} value - Value.
   * @param {Lib_DockerRender_Runner_NormalizeArguments_Label} label - Label.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_NormalizeArguments_Returns}
   *
   * @since 0.49.0
   */
  private static normalizeArguments(value: Lib_DockerRender_Runner_NormalizeArguments_Value, label: Lib_DockerRender_Runner_NormalizeArguments_Label): Lib_DockerRender_Runner_NormalizeArguments_Returns {
    const argumentValues: Lib_DockerRender_Runner_NormalizeArguments_ArgumentValues = Runner.readList(value, label);

    if (argumentValues === undefined) {
      return undefined;
    }

    const normalized: Lib_DockerRender_Runner_NormalizeArguments_Normalized = [];

    for (const argumentValue of argumentValues) {
      const argumentObject: Lib_DockerRender_Runner_NormalizeArguments_ArgumentObject = Runner.readObject(argumentValue, `${label}[]`) ?? {};
      const name: Lib_DockerRender_Runner_NormalizeArguments_Name = Runner.readString(argumentObject['name'], `${label}[].name`, LIB_REGEX_PATTERN_DOCKER_ARGUMENT_NAME);
      const valueText: Lib_DockerRender_Runner_NormalizeArguments_ValueText = Runner.readString(argumentObject['value'], `${label}[].value`, LIB_REGEX_PATTERN_DOCKER_SINGLE_LINE);
      const quoted: Lib_DockerRender_Runner_NormalizeArguments_Quoted = Runner.readBoolean(argumentObject['quoted'], `${label}[].quoted`);

      if (name === undefined) {
        throw new Error(`Docker manifest field "${label}[].name" is required.`);
      }

      if (valueText !== undefined && valueText.includes('"') === true) {
        throw new Error(`Docker manifest field "${label}[].value" cannot contain a double quote.`);
      }

      const argument: Lib_DockerRender_Runner_NormalizeArguments_Argument = { name };

      Runner.assignDefined(argument, 'quoted', quoted);
      Runner.assignDefined(argument, 'value', valueText);

      normalized.push(argument);
    }

    return normalized;
  }

  /**
   * Lib - Docker Render - Normalize Stages.
   *
   * Validates the project stage list: unique names that do not reuse a Nova
   * stage, fragment files inside packages/docker, and the stage they precede.
   *
   * @param {Lib_DockerRender_Runner_NormalizeStages_Value} value - Value.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_NormalizeStages_Returns}
   *
   * @since 0.49.0
   */
  private static normalizeStages(value: Lib_DockerRender_Runner_NormalizeStages_Value): Lib_DockerRender_Runner_NormalizeStages_Returns {
    const stageValues: Lib_DockerRender_Runner_NormalizeStages_StageValues = Runner.readList(value, 'dockerfile.stages');

    if (stageValues === undefined) {
      return undefined;
    }

    const stages: Lib_DockerRender_Runner_NormalizeStages_Stages = [];
    const stageNames: Lib_DockerRender_Runner_NormalizeStages_StageNames = new Set();

    for (const stageValue of stageValues) {
      const stageObject: Lib_DockerRender_Runner_NormalizeStages_StageObject = Runner.readObject(stageValue, 'dockerfile.stages[]') ?? {};
      const name: Lib_DockerRender_Runner_NormalizeStages_Name = Runner.readString(stageObject['name'], 'dockerfile.stages[].name', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME);
      const file: Lib_DockerRender_Runner_NormalizeStages_File = Runner.readString(stageObject['file'], 'dockerfile.stages[].file', LIB_REGEX_PATTERN_DOCKER_COPY_PATH);
      const beforeValue: Lib_DockerRender_Runner_NormalizeStages_BeforeValue = Runner.readString(stageObject['before'], 'dockerfile.stages[].before', LIB_REGEX_PATTERN_DOCKER_STAGE_NAME);
      const before: Lib_DockerRender_Runner_NormalizeStages_Before = novaStageNames.find((novaStageName) => novaStageName === beforeValue);

      if (
        name === undefined
        || novaStageNames.some((novaStageName) => novaStageName === name) === true
        || stageNames.has(name) === true
      ) {
        throw new Error('Docker manifest field "dockerfile.stages[].name" must be a unique stage name other than "build", "s6-overlay", or "runtime".');
      }

      if (
        file === undefined
        || file.startsWith('/') === true
        || file.split('/').includes('..') === true
      ) {
        throw new Error(`Docker stage "${name}" needs a "file" path relative to packages/docker.`);
      }

      if (beforeValue !== undefined && before === undefined) {
        throw new Error(`Docker stage "${name}" field "before" must be "build", "s6-overlay", or "runtime".`);
      }

      stageNames.add(name);

      stages.push((before === undefined) ? {
        file,
        name,
      } : {
        before,
        file,
        name,
      });
    }

    return stages;
  }

  /**
   * Lib - Docker Render - Assign Defined.
   *
   * Copies one validated value onto a manifest section only when it was set,
   * so optional keys never appear as explicit "undefined" entries.
   *
   * @param {Lib_DockerRender_Runner_AssignDefined_Target} target - Target.
   * @param {Lib_DockerRender_Runner_AssignDefined_Key}    key    - Key.
   * @param {Lib_DockerRender_Runner_AssignDefined_Value}  value  - Value.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_AssignDefined_Returns}
   *
   * @since 0.49.0
   */
  private static assignDefined(target: Lib_DockerRender_Runner_AssignDefined_Target, key: Lib_DockerRender_Runner_AssignDefined_Key, value: Lib_DockerRender_Runner_AssignDefined_Value): Lib_DockerRender_Runner_AssignDefined_Returns {
    if (value !== undefined) {
      Reflect.set(target, key, value);
    }

    return;
  }

  /**
   * Lib - Docker Render - Read Boolean.
   *
   * Returns an optional manifest flag and rejects any value that is not a
   * boolean, naming the field in the error.
   *
   * @param {Lib_DockerRender_Runner_ReadBoolean_Value} value - Value.
   * @param {Lib_DockerRender_Runner_ReadBoolean_Label} label - Label.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ReadBoolean_Returns}
   *
   * @since 0.49.0
   */
  private static readBoolean(value: Lib_DockerRender_Runner_ReadBoolean_Value, label: Lib_DockerRender_Runner_ReadBoolean_Label): Lib_DockerRender_Runner_ReadBoolean_Returns {
    if (value === undefined) {
      return undefined;
    }

    if (typeof value !== 'boolean') {
      throw new Error(`Docker manifest field "${label}" must be true or false.`);
    }

    return value;
  }

  /**
   * Lib - Docker Render - Read List.
   *
   * Returns an optional manifest array and rejects any value that is not an
   * array, naming the field in the error.
   *
   * @param {Lib_DockerRender_Runner_ReadList_Value} value - Value.
   * @param {Lib_DockerRender_Runner_ReadList_Label} label - Label.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ReadList_Returns}
   *
   * @since 0.49.0
   */
  private static readList(value: Lib_DockerRender_Runner_ReadList_Value, label: Lib_DockerRender_Runner_ReadList_Label): Lib_DockerRender_Runner_ReadList_Returns {
    if (value === undefined) {
      return undefined;
    }

    if (Array.isArray(value) === false) {
      throw new Error(`Docker manifest field "${label}" must be an array.`);
    }

    return value;
  }

  /**
   * Lib - Docker Render - Read Object.
   *
   * Returns an optional manifest object and rejects any value that is not a
   * plain object, naming the field in the error.
   *
   * @param {Lib_DockerRender_Runner_ReadObject_Value} value - Value.
   * @param {Lib_DockerRender_Runner_ReadObject_Label} label - Label.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ReadObject_Returns}
   *
   * @since 0.49.0
   */
  private static readObject(value: Lib_DockerRender_Runner_ReadObject_Value, label: Lib_DockerRender_Runner_ReadObject_Label): Lib_DockerRender_Runner_ReadObject_Returns {
    if (value === undefined) {
      return undefined;
    }

    if (isPlainObject(value) === false) {
      throw new Error(`Docker manifest field "${label}" must be an object.`);
    }

    return value;
  }

  /**
   * Lib - Docker Render - Read String.
   *
   * Returns an optional manifest string that matches the field's pattern and
   * rejects anything else, naming the field in the error.
   *
   * @param {Lib_DockerRender_Runner_ReadString_Value}   value   - Value.
   * @param {Lib_DockerRender_Runner_ReadString_Label}   label   - Label.
   * @param {Lib_DockerRender_Runner_ReadString_Pattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ReadString_Returns}
   *
   * @since 0.49.0
   */
  private static readString(value: Lib_DockerRender_Runner_ReadString_Value, label: Lib_DockerRender_Runner_ReadString_Label, pattern: Lib_DockerRender_Runner_ReadString_Pattern): Lib_DockerRender_Runner_ReadString_Returns {
    if (value === undefined) {
      return undefined;
    }

    if (typeof value !== 'string' || pattern.test(value) === false) {
      throw new Error(`Docker manifest field "${label}" has an unsupported value.`);
    }

    return value;
  }

  /**
   * Lib - Docker Render - Read String List.
   *
   * Returns an optional array of strings that each match the field's pattern
   * and rejects anything else, naming the field in the error.
   *
   * @param {Lib_DockerRender_Runner_ReadStringList_Value}   value   - Value.
   * @param {Lib_DockerRender_Runner_ReadStringList_Label}   label   - Label.
   * @param {Lib_DockerRender_Runner_ReadStringList_Pattern} pattern - Pattern.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ReadStringList_Returns}
   *
   * @since 0.49.0
   */
  private static readStringList(value: Lib_DockerRender_Runner_ReadStringList_Value, label: Lib_DockerRender_Runner_ReadStringList_Label, pattern: Lib_DockerRender_Runner_ReadStringList_Pattern): Lib_DockerRender_Runner_ReadStringList_Returns {
    const values: Lib_DockerRender_Runner_ReadStringList_Values = Runner.readList(value, label);

    if (values === undefined) {
      return undefined;
    }

    const strings: Lib_DockerRender_Runner_ReadStringList_Strings = [];

    for (const item of values) {
      strings.push(Runner.readString(item, `${label}[]`, pattern) ?? '');
    }

    return strings;
  }

  /**
   * Lib - Docker Render - Read String Map.
   *
   * Returns an optional object whose keys and string values match the field's
   * patterns and rejects anything else, naming the field in the error.
   *
   * @param {Lib_DockerRender_Runner_ReadStringMap_Value}        value        - Value.
   * @param {Lib_DockerRender_Runner_ReadStringMap_Label}        label        - Label.
   * @param {Lib_DockerRender_Runner_ReadStringMap_KeyPattern}   keyPattern   - Key pattern.
   * @param {Lib_DockerRender_Runner_ReadStringMap_ValuePattern} valuePattern - Value pattern.
   *
   * @private
   *
   * @returns {Lib_DockerRender_Runner_ReadStringMap_Returns}
   *
   * @since 0.49.0
   */
  private static readStringMap(value: Lib_DockerRender_Runner_ReadStringMap_Value, label: Lib_DockerRender_Runner_ReadStringMap_Label, keyPattern: Lib_DockerRender_Runner_ReadStringMap_KeyPattern, valuePattern: Lib_DockerRender_Runner_ReadStringMap_ValuePattern): Lib_DockerRender_Runner_ReadStringMap_Returns {
    const object: Lib_DockerRender_Runner_ReadStringMap_Object = Runner.readObject(value, label);

    if (object === undefined) {
      return undefined;
    }

    const map: Lib_DockerRender_Runner_ReadStringMap_Map = {};

    for (const entry of Object.entries(object)) {
      if (keyPattern.test(entry[0]) === false) {
        throw new Error(`Docker manifest field "${label}" has an unsupported key "${entry[0]}".`);
      }

      Reflect.set(map, entry[0], Runner.readString(entry[1], `${label}.${entry[0]}`, valuePattern));
    }

    return map;
  }
}

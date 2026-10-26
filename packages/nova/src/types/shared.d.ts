import type {
  EmitAndSemanticDiagnosticsBuilderProgram,
  WatchOfConfigFile,
} from 'typescript';

/**
 * Shared - Active Vitest.
 *
 * @since 0.21.0
 */
export type Shared_ActiveVitest_Factory = () => void | Promise<void>;

export type Shared_ActiveVitest_Describe = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Shared_ActiveVitest_It_Timeout = number;

export type Shared_ActiveVitest_It = (name: string, factory: Shared_ActiveVitest_Factory, timeout?: Shared_ActiveVitest_It_Timeout) => void;

export type Shared_ActiveVitest = {
  describe: Shared_ActiveVitest_Describe;
  it: Shared_ActiveVitest_It;
};

/**
 * Shared - Border Characters.
 *
 * @since 0.15.0
 */
export type Shared_BorderCharacters_TopLeft = string;

export type Shared_BorderCharacters_TopRight = string;

export type Shared_BorderCharacters_BottomLeft = string;

export type Shared_BorderCharacters_BottomRight = string;

export type Shared_BorderCharacters_Horizontal = string;

export type Shared_BorderCharacters_Vertical = string;

export type Shared_BorderCharacters = {
  topLeft: Shared_BorderCharacters_TopLeft;
  topRight: Shared_BorderCharacters_TopRight;
  bottomLeft: Shared_BorderCharacters_BottomLeft;
  bottomRight: Shared_BorderCharacters_BottomRight;
  horizontal: Shared_BorderCharacters_Horizontal;
  vertical: Shared_BorderCharacters_Vertical;
};

/**
 * Shared - Border Style.
 *
 * @since 0.11.0
 */
export type Shared_BorderStyle = 'box' | 'round' | 'thick';

/**
 * Shared - Changelog Entry.
 *
 * @since 0.13.0
 */
export type Shared_ChangelogEntry_Package = string;

export type Shared_ChangelogEntry_Category = 'updated' | 'fixed' | 'added' | 'removed';

export type Shared_ChangelogEntry_Bump = 'major' | 'minor' | 'patch';

export type Shared_ChangelogEntry_Message = string;

export type Shared_ChangelogEntry_FilePath = string;

export type Shared_ChangelogEntry = {
  package: Shared_ChangelogEntry_Package;
  category: Shared_ChangelogEntry_Category;
  bump?: Shared_ChangelogEntry_Bump;
  message: Shared_ChangelogEntry_Message;
  filePath: Shared_ChangelogEntry_FilePath;
};

/**
 * Shared - Changelog Options.
 *
 * @since 0.13.0
 */
export type Shared_ChangelogOptions_Record = true;

export type Shared_ChangelogOptions_Release = true;

export type Shared_ChangelogOptions_Package = string;

export type Shared_ChangelogOptions_Category = string;

export type Shared_ChangelogOptions_Bump = string;

export type Shared_ChangelogOptions_Message = string;

export type Shared_ChangelogOptions_DryRun = true;

export type Shared_ChangelogOptions = {
  record?: Shared_ChangelogOptions_Record;
  release?: Shared_ChangelogOptions_Release;
  package?: Shared_ChangelogOptions_Package;
  category?: Shared_ChangelogOptions_Category;
  bump?: Shared_ChangelogOptions_Bump;
  message?: Shared_ChangelogOptions_Message;
  dryRun?: Shared_ChangelogOptions_DryRun;
};

/**
 * Shared - Corepack Package Manager.
 *
 * @since 0.26.0
 */
export type Shared_CorepackPackageManager = 'npm' | 'pnpm' | 'yarn';

export type Shared_CorepackPackageManagerDescriptor_Name = Shared_CorepackPackageManager;

export type Shared_CorepackPackageManagerDescriptor_Version = string;

export type Shared_CorepackPackageManagerDescriptor_Value = string;

export type Shared_CorepackPackageManagerDescriptor = {
  name: Shared_CorepackPackageManagerDescriptor_Name;
  version: Shared_CorepackPackageManagerDescriptor_Version;
  value: Shared_CorepackPackageManagerDescriptor_Value;
};

export type Shared_CorepackCommand = 'corepack' | 'npm';

export type Shared_CorepackSpawnInvocation_Command = string;

export type Shared_CorepackSpawnInvocation_CommandArguments = string[];

export type Shared_CorepackSpawnInvocation = {
  command: Shared_CorepackSpawnInvocation_Command;
  commandArguments: Shared_CorepackSpawnInvocation_CommandArguments;
};

/**
 * Shared - Dialog Action.
 *
 * @since 0.11.0
 */
export type Shared_DialogAction = 'save' | 'cancel' | 'back';

/**
 * Shared - Docker Image Profile.
 *
 * @since 0.29.0
 */
export type Shared_DockerImageProfile = 'astro-node' | 'background-service' | 'container-native' | 'http-service' | 'nextjs-standalone' | 'static-site';

/**
 * Shared - Docker Packaging.
 *
 * @since 0.34.0
 */
export type Shared_DockerPackagingStringMap = Record<string, string>;

export type Shared_DockerPackagingServiceKind = 'longrun' | 'oneshot';

export type Shared_DockerPackagingService_Command = string;

export type Shared_DockerPackagingService_Critical = boolean;

export type Shared_DockerPackagingService_Dependency = string;

export type Shared_DockerPackagingService_Dependencies = Shared_DockerPackagingService_Dependency[];

export type Shared_DockerPackagingService_Environment = Shared_DockerPackagingStringMap;

export type Shared_DockerPackagingService_HealthCommand = string;

export type Shared_DockerPackagingService_Kind = Shared_DockerPackagingServiceKind;

export type Shared_DockerPackagingService_Name = string;

export type Shared_DockerPackagingService_Port = number;

export type Shared_DockerPackagingService_RequiredForHealth = boolean;

export type Shared_DockerPackagingService_RunAsRoot = boolean;

export type Shared_DockerPackagingService_Workspace = string;

export type Shared_DockerPackagingService_WritablePath = string;

export type Shared_DockerPackagingService_WritablePaths = Shared_DockerPackagingService_WritablePath[];

export type Shared_DockerPackagingService = {
  command: Shared_DockerPackagingService_Command;
  critical: Shared_DockerPackagingService_Critical;
  dependencies: Shared_DockerPackagingService_Dependencies;
  environment: Shared_DockerPackagingService_Environment;
  healthCommand?: Shared_DockerPackagingService_HealthCommand;
  kind: Shared_DockerPackagingService_Kind;
  name: Shared_DockerPackagingService_Name;
  port?: Shared_DockerPackagingService_Port;
  requiredForHealth: Shared_DockerPackagingService_RequiredForHealth;
  runAsRoot: Shared_DockerPackagingService_RunAsRoot;
  workspace: Shared_DockerPackagingService_Workspace;
  writablePaths: Shared_DockerPackagingService_WritablePaths;
};

export type Shared_DockerPackagingServices = Shared_DockerPackagingService[];

export type Shared_DockerPackagingServicesByName = Map<string, Shared_DockerPackagingService>;

export type Shared_DockerPackagingServiceInput_Command = string;

export type Shared_DockerPackagingServiceInput_Critical = boolean;

export type Shared_DockerPackagingServiceInput_Dependency = string;

export type Shared_DockerPackagingServiceInput_Dependencies = Shared_DockerPackagingServiceInput_Dependency[];

export type Shared_DockerPackagingServiceInput_Environment = Shared_DockerPackagingStringMap;

export type Shared_DockerPackagingServiceInput_HealthCommand = string;

export type Shared_DockerPackagingServiceInput_Kind = Shared_DockerPackagingServiceKind;

export type Shared_DockerPackagingServiceInput_Name = string;

export type Shared_DockerPackagingServiceInput_Port = number;

export type Shared_DockerPackagingServiceInput_RequiredForHealth = boolean;

export type Shared_DockerPackagingServiceInput_RunAsRoot = boolean;

export type Shared_DockerPackagingServiceInput_WritablePath = string;

export type Shared_DockerPackagingServiceInput_WritablePaths = Shared_DockerPackagingServiceInput_WritablePath[];

export type Shared_DockerPackagingServiceInput = {
  command?: Shared_DockerPackagingServiceInput_Command;
  critical?: Shared_DockerPackagingServiceInput_Critical;
  dependencies?: Shared_DockerPackagingServiceInput_Dependencies;
  environment?: Shared_DockerPackagingServiceInput_Environment;
  healthCommand?: Shared_DockerPackagingServiceInput_HealthCommand;
  kind?: Shared_DockerPackagingServiceInput_Kind;
  name: Shared_DockerPackagingServiceInput_Name;
  port?: Shared_DockerPackagingServiceInput_Port;
  requiredForHealth?: Shared_DockerPackagingServiceInput_RequiredForHealth;
  runAsRoot?: Shared_DockerPackagingServiceInput_RunAsRoot;
  writablePaths?: Shared_DockerPackagingServiceInput_WritablePaths;
};

export type Shared_DockerPackagingServiceInputs = Shared_DockerPackagingServiceInput[];

export type Shared_DockerPackagingWorkspace_BuildDirectory = string;

export type Shared_DockerPackagingWorkspace_PackageName = string;

export type Shared_DockerPackagingWorkspace_Path = string;

export type Shared_DockerPackagingWorkspace_Profile = Shared_DockerImageProfile;

export type Shared_DockerPackagingWorkspace_RuntimePath = string;

export type Shared_DockerPackagingWorkspace_RuntimePaths = Shared_DockerPackagingWorkspace_RuntimePath[];

export type Shared_DockerPackagingWorkspace = {
  buildDirectory: Shared_DockerPackagingWorkspace_BuildDirectory;
  packageName: Shared_DockerPackagingWorkspace_PackageName;
  path: Shared_DockerPackagingWorkspace_Path;
  profile: Shared_DockerPackagingWorkspace_Profile;
  runtimePaths: Shared_DockerPackagingWorkspace_RuntimePaths;
};

export type Shared_DockerPackagingWorkspaces = Shared_DockerPackagingWorkspace[];

export type Shared_DockerPackagingManifest_SchemaVersion = number;

export type Shared_DockerPackagingManifest_Services = Shared_DockerPackagingServices;

export type Shared_DockerPackagingManifest_Workspaces = Shared_DockerPackagingWorkspaces;

export type Shared_DockerPackagingManifest = {
  schemaVersion: Shared_DockerPackagingManifest_SchemaVersion;
  services: Shared_DockerPackagingManifest_Services;
  workspaces: Shared_DockerPackagingManifest_Workspaces;
};

export type Shared_DockerPackagingGenerateOptions_BuildDirectory = string;

export type Shared_DockerPackagingGenerateOptions_DryRun = boolean;

export type Shared_DockerPackagingGenerateOptions_IgnoreFileEntry = Shared_NovaConfig_IgnoreFile;

export type Shared_DockerPackagingGenerateOptions_Profile = Shared_DockerImageProfile;

export type Shared_DockerPackagingGenerateOptions_ProjectDirectory = string;

export type Shared_DockerPackagingGenerateOptions_ReportFiles = boolean;

export type Shared_DockerPackagingGenerateOptions_ReplaceFile = boolean;

export type Shared_DockerPackagingGenerateOptions_RuntimePath = string;

export type Shared_DockerPackagingGenerateOptions_RuntimePaths = Shared_DockerPackagingGenerateOptions_RuntimePath[];

export type Shared_DockerPackagingGenerateOptions_Services = Shared_DockerPackagingServiceInputs;

export type Shared_DockerPackagingGenerateOptions_WorkspaceDirectory = string;

export type Shared_DockerPackagingGenerateOptions_WorkspaceName = string;

export type Shared_DockerPackagingGenerateOptions = {
  buildDirectory?: Shared_DockerPackagingGenerateOptions_BuildDirectory;
  dryRun?: Shared_DockerPackagingGenerateOptions_DryRun;
  ignoreFileEntry?: Shared_DockerPackagingGenerateOptions_IgnoreFileEntry;
  profile: Shared_DockerPackagingGenerateOptions_Profile;
  projectDirectory: Shared_DockerPackagingGenerateOptions_ProjectDirectory;
  reportFiles?: Shared_DockerPackagingGenerateOptions_ReportFiles;
  replaceFile?: Shared_DockerPackagingGenerateOptions_ReplaceFile;
  runtimePaths?: Shared_DockerPackagingGenerateOptions_RuntimePaths;
  services?: Shared_DockerPackagingGenerateOptions_Services;
  workspaceDirectory: Shared_DockerPackagingGenerateOptions_WorkspaceDirectory;
  workspaceName?: Shared_DockerPackagingGenerateOptions_WorkspaceName;
};

export type Shared_DockerPackagingGenerateResult_AssemblyDirectory = string;

export type Shared_DockerPackagingGenerateResult_ComposePath = string;

export type Shared_DockerPackagingGenerateResult_DockerfilePath = string;

export type Shared_DockerPackagingGenerateResult_DockerignorePath = string;

export type Shared_DockerPackagingGenerateResult_ManifestPath = string;

export type Shared_DockerPackagingGenerateResult_ProjectDirectory = string;

export type Shared_DockerPackagingGenerateResult_ServiceName = string;

export type Shared_DockerPackagingGenerateResult_ServiceNames = Shared_DockerPackagingGenerateResult_ServiceName[];

export type Shared_DockerPackagingGenerateResult_WorkspacePath = string;

export type Shared_DockerPackagingGenerateResult = {
  assemblyDirectory: Shared_DockerPackagingGenerateResult_AssemblyDirectory;
  composePath: Shared_DockerPackagingGenerateResult_ComposePath;
  dockerfilePath: Shared_DockerPackagingGenerateResult_DockerfilePath;
  dockerignorePath: Shared_DockerPackagingGenerateResult_DockerignorePath;
  manifestPath: Shared_DockerPackagingGenerateResult_ManifestPath;
  projectDirectory: Shared_DockerPackagingGenerateResult_ProjectDirectory;
  serviceNames: Shared_DockerPackagingGenerateResult_ServiceNames;
  workspacePath: Shared_DockerPackagingGenerateResult_WorkspacePath;
};

export type Shared_DockerPackagingWorkspacePackage_PackageJson = Record<string, unknown>;

export type Shared_DockerPackagingWorkspacePackage_Path = string;

export type Shared_DockerPackagingWorkspacePackage = {
  packageJson: Shared_DockerPackagingWorkspacePackage_PackageJson;
  path: Shared_DockerPackagingWorkspacePackage_Path;
};

export type Shared_DockerPackagingWorkspacePackages = Map<string, Shared_DockerPackagingWorkspacePackage>;

/**
 * Shared - Entity Menu Action.
 *
 * @since 0.11.0
 */
export type Shared_EntityMenuActionAdd_Kind = 'add';

export type Shared_EntityMenuActionAdd = {
  kind: Shared_EntityMenuActionAdd_Kind;
};

export type Shared_EntityMenuActionEdit_Kind = 'edit';

export type Shared_EntityMenuActionEdit_Index = number;

export type Shared_EntityMenuActionEdit = {
  kind: Shared_EntityMenuActionEdit_Kind;
  index: Shared_EntityMenuActionEdit_Index;
};

export type Shared_EntityMenuActionRemove_Kind = 'remove';

export type Shared_EntityMenuActionRemove_Index = number;

export type Shared_EntityMenuActionRemove = {
  kind: Shared_EntityMenuActionRemove_Kind;
  index: Shared_EntityMenuActionRemove_Index;
};

export type Shared_EntityMenuActionBack_Kind = 'back';

export type Shared_EntityMenuActionBack = {
  kind: Shared_EntityMenuActionBack_Kind;
};

export type Shared_EntityMenuAction =
  Shared_EntityMenuActionAdd
  | Shared_EntityMenuActionEdit
  | Shared_EntityMenuActionRemove
  | Shared_EntityMenuActionBack;

/**
 * Shared - Env Entry.
 *
 * @since 0.15.0
 */
export type Shared_EnvEntry_Key = string;

export type Shared_EnvEntry_Value = string;

export type Shared_EnvEntry = {
  key: Shared_EnvEntry_Key;
  value: Shared_EnvEntry_Value;
};

export type Shared_EnvEntries = Shared_EnvEntry[];

/**
 * Shared - Fund Platform.
 *
 * @since 0.15.0
 */
export type Shared_FundPlatform_Id =
  'github-sponsors'
  | 'paypal'
  | 'open-collective'
  | 'ko-fi'
  | 'buy-me-a-coffee'
  | 'patreon'
  | 'liberapay'
  | 'unknown';

export type Shared_FundPlatform_Url = string;

export type Shared_FundPlatform_Logo = string;

export type Shared_FundPlatform_Label = string;

export type Shared_FundPlatform_Alt = string;

export type Shared_FundPlatform_Color = string;

export type Shared_FundPlatform = {
  id: Shared_FundPlatform_Id;
  url: Shared_FundPlatform_Url;
  logo: Shared_FundPlatform_Logo;
  label: Shared_FundPlatform_Label;
  alt: Shared_FundPlatform_Alt;
  color: Shared_FundPlatform_Color;
};

/**
 * Shared - Generator Run Result.
 *
 * @since 0.15.0
 */
export type Shared_GeneratorRunResult = 'completed' | 'cancelled';

/**
 * Shared - Blueprint Permission.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintPermission = 'read' | 'write';

/**
 * Shared - Blueprint Permissions.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintPermissionsScope = string;

export type Shared_BlueprintPermissions = {
  [scope: Shared_BlueprintPermissionsScope]: Shared_BlueprintPermission;
};

/**
 * Shared - Blueprint Concurrency.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintConcurrency_Group = string;

export type Shared_BlueprintConcurrency_CancelInProgress = boolean;

export type Shared_BlueprintConcurrency = {
  group: Shared_BlueprintConcurrency_Group;
  cancelInProgress: Shared_BlueprintConcurrency_CancelInProgress;
};

/**
 * Shared - Blueprint Env Map.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintEnvMapKey = string;

export type Shared_BlueprintEnvMapValue = string;

export type Shared_BlueprintEnvMapEntry_Key = Shared_BlueprintEnvMapKey;

export type Shared_BlueprintEnvMapEntry_Value = Shared_BlueprintEnvMapValue;

export type Shared_BlueprintEnvMapEntry = {
  key: Shared_BlueprintEnvMapEntry_Key;
  value: Shared_BlueprintEnvMapEntry_Value;
};

export type Shared_BlueprintEnvMap = Shared_BlueprintEnvMapEntry[];

/**
 * Shared - Blueprint With Map.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintWithMapKey = string;

export type Shared_BlueprintWithMapValue = string | number | boolean;

export type Shared_BlueprintWithMapBlock = boolean;

export type Shared_BlueprintWithMapEntry_Key = Shared_BlueprintWithMapKey;

export type Shared_BlueprintWithMapEntry_Value = Shared_BlueprintWithMapValue;

export type Shared_BlueprintWithMapEntry_Block = Shared_BlueprintWithMapBlock;

export type Shared_BlueprintWithMapEntry = {
  key: Shared_BlueprintWithMapEntry_Key;
  value: Shared_BlueprintWithMapEntry_Value;
  block?: Shared_BlueprintWithMapEntry_Block;
};

export type Shared_BlueprintWithMap = Shared_BlueprintWithMapEntry[];

/**
 * Shared - Blueprint Dispatch Input.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintDispatchInput_Name = string;

export type Shared_BlueprintDispatchInput_Description = string;

export type Shared_BlueprintDispatchInput_Required = boolean;

export type Shared_BlueprintDispatchInput_Type = string;

export type Shared_BlueprintDispatchInput_Default = boolean | string;

export type Shared_BlueprintDispatchInput = {
  name: Shared_BlueprintDispatchInput_Name;
  description: Shared_BlueprintDispatchInput_Description;
  required: Shared_BlueprintDispatchInput_Required;
  type: Shared_BlueprintDispatchInput_Type;
  default: Shared_BlueprintDispatchInput_Default;
};

export type Shared_BlueprintDispatchInputs = Shared_BlueprintDispatchInput[];

/**
 * Shared - Blueprint Trigger.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintTriggerIssuesEvent = 'issues' | 'issue_comment';

export type Shared_BlueprintTriggerIssuesType = string;

export type Shared_BlueprintTriggerIssuesTypes = Shared_BlueprintTriggerIssuesType[];

export type Shared_BlueprintTriggerIssues_Event = Shared_BlueprintTriggerIssuesEvent;

export type Shared_BlueprintTriggerIssues_Types = Shared_BlueprintTriggerIssuesTypes;

export type Shared_BlueprintTriggerIssues = {
  event: Shared_BlueprintTriggerIssues_Event;
  types: Shared_BlueprintTriggerIssues_Types;
};

export type Shared_BlueprintTriggerScheduleEvent = 'schedule';

export type Shared_BlueprintTriggerScheduleCron = string;

export type Shared_BlueprintTriggerSchedule_Event = Shared_BlueprintTriggerScheduleEvent;

export type Shared_BlueprintTriggerSchedule_Cron = Shared_BlueprintTriggerScheduleCron;

export type Shared_BlueprintTriggerSchedule = {
  event: Shared_BlueprintTriggerSchedule_Event;
  cron: Shared_BlueprintTriggerSchedule_Cron;
};

export type Shared_BlueprintTriggerDispatchEvent = 'workflow_dispatch';

export type Shared_BlueprintTriggerDispatch_Event = Shared_BlueprintTriggerDispatchEvent;

export type Shared_BlueprintTriggerDispatch_Inputs = Shared_BlueprintDispatchInputs;

export type Shared_BlueprintTriggerDispatch = {
  event: Shared_BlueprintTriggerDispatch_Event;
  inputs: Shared_BlueprintTriggerDispatch_Inputs;
};

export type Shared_BlueprintTriggerReleaseEvent = 'release';

export type Shared_BlueprintTriggerReleaseType = string;

export type Shared_BlueprintTriggerReleaseTypes = Shared_BlueprintTriggerReleaseType[];

export type Shared_BlueprintTriggerRelease_Event = Shared_BlueprintTriggerReleaseEvent;

export type Shared_BlueprintTriggerRelease_Types = Shared_BlueprintTriggerReleaseTypes;

export type Shared_BlueprintTriggerRelease = {
  event: Shared_BlueprintTriggerRelease_Event;
  types: Shared_BlueprintTriggerRelease_Types;
};

export type Shared_BlueprintTriggerPushEvent = 'push';

export type Shared_BlueprintTriggerPushBranch = string;

export type Shared_BlueprintTriggerPushBranches = Shared_BlueprintTriggerPushBranch[];

export type Shared_BlueprintTriggerPushPath = string;

export type Shared_BlueprintTriggerPushPaths = Shared_BlueprintTriggerPushPath[];

export type Shared_BlueprintTriggerPushTag = string;

export type Shared_BlueprintTriggerPushTags = Shared_BlueprintTriggerPushTag[];

export type Shared_BlueprintTriggerPush_Event = Shared_BlueprintTriggerPushEvent;

export type Shared_BlueprintTriggerPush_Branches = Shared_BlueprintTriggerPushBranches;

export type Shared_BlueprintTriggerPush_Paths = Shared_BlueprintTriggerPushPaths;

export type Shared_BlueprintTriggerPush_Tags = Shared_BlueprintTriggerPushTags;

export type Shared_BlueprintTriggerPush = {
  event: Shared_BlueprintTriggerPush_Event;
  branches?: Shared_BlueprintTriggerPush_Branches;
  paths?: Shared_BlueprintTriggerPush_Paths;
  tags?: Shared_BlueprintTriggerPush_Tags;
};

export type Shared_BlueprintTriggerWorkflowRunEvent = 'workflow_run';

export type Shared_BlueprintTriggerWorkflowRunWorkflow = string;

export type Shared_BlueprintTriggerWorkflowRunWorkflows = Shared_BlueprintTriggerWorkflowRunWorkflow[];

export type Shared_BlueprintTriggerWorkflowRunType = string;

export type Shared_BlueprintTriggerWorkflowRunTypes = Shared_BlueprintTriggerWorkflowRunType[];

export type Shared_BlueprintTriggerWorkflowRun_Event = Shared_BlueprintTriggerWorkflowRunEvent;

export type Shared_BlueprintTriggerWorkflowRun_Workflows = Shared_BlueprintTriggerWorkflowRunWorkflows;

export type Shared_BlueprintTriggerWorkflowRun_Types = Shared_BlueprintTriggerWorkflowRunTypes;

export type Shared_BlueprintTriggerWorkflowRun = {
  event: Shared_BlueprintTriggerWorkflowRun_Event;
  workflows: Shared_BlueprintTriggerWorkflowRun_Workflows;
  types: Shared_BlueprintTriggerWorkflowRun_Types;
};

export type Shared_BlueprintTrigger = Shared_BlueprintTriggerIssues | Shared_BlueprintTriggerSchedule | Shared_BlueprintTriggerDispatch | Shared_BlueprintTriggerRelease | Shared_BlueprintTriggerPush | Shared_BlueprintTriggerWorkflowRun;

export type Shared_BlueprintTriggers = Shared_BlueprintTrigger[];

/**
 * Shared - Blueprint Step.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintStep_Name = string;

export type Shared_BlueprintStep_Id = string;

export type Shared_BlueprintStep_If = string;

export type Shared_BlueprintStep_Uses = string;

export type Shared_BlueprintStep_Env = Shared_BlueprintEnvMap;

export type Shared_BlueprintStep_EnvAfterRun = boolean;

export type Shared_BlueprintStep_With = Shared_BlueprintWithMap;

export type Shared_BlueprintStep_Run = string;

export type Shared_BlueprintStep_RunBlock = boolean;

export type Shared_BlueprintStep_RunPlain = boolean;

export type Shared_BlueprintStep_WorkingDirectory = string;

export type Shared_BlueprintStep = {
  name: Shared_BlueprintStep_Name;
  id?: Shared_BlueprintStep_Id;
  if?: Shared_BlueprintStep_If;
  uses?: Shared_BlueprintStep_Uses;
  env?: Shared_BlueprintStep_Env;
  envAfterRun?: Shared_BlueprintStep_EnvAfterRun;
  with?: Shared_BlueprintStep_With;
  run?: Shared_BlueprintStep_Run;
  runBlock?: Shared_BlueprintStep_RunBlock;
  runPlain?: Shared_BlueprintStep_RunPlain;
  workingDirectory?: Shared_BlueprintStep_WorkingDirectory;
};

export type Shared_BlueprintSteps = Shared_BlueprintStep[];

/**
 * Shared - Blueprint Job.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintJob_Id = string;

export type Shared_BlueprintJobNeedsEntry = string;

export type Shared_BlueprintJob_Needs = Shared_BlueprintJobNeedsEntry[];

export type Shared_BlueprintJob_RunsOn = string;

export type Shared_BlueprintJob_TimeoutMinutes = number;

export type Shared_BlueprintJob_Permissions = Shared_BlueprintPermissions;

export type Shared_BlueprintJob_If = string;

export type Shared_BlueprintJob_Steps = Shared_BlueprintSteps;

export type Shared_BlueprintJob = {
  id: Shared_BlueprintJob_Id;
  needs?: Shared_BlueprintJob_Needs;
  runsOn: Shared_BlueprintJob_RunsOn;
  timeoutMinutes: Shared_BlueprintJob_TimeoutMinutes;
  permissions?: Shared_BlueprintJob_Permissions;
  if?: Shared_BlueprintJob_If;
  steps: Shared_BlueprintJob_Steps;
};

export type Shared_BlueprintJobs = Shared_BlueprintJob[];

/**
 * Shared - Blueprint Workflow.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintWorkflow_Name = string;

export type Shared_BlueprintWorkflow_RunName = string;

export type Shared_BlueprintWorkflow_On = Shared_BlueprintTriggers;

export type Shared_BlueprintWorkflow_Permissions = Shared_BlueprintPermissions;

export type Shared_BlueprintWorkflow_Concurrency = Shared_BlueprintConcurrency;

export type Shared_BlueprintWorkflow_Env = Shared_BlueprintEnvMap;

export type Shared_BlueprintWorkflow_Jobs = Shared_BlueprintJobs;

export type Shared_BlueprintWorkflow = {
  name: Shared_BlueprintWorkflow_Name;
  runName: Shared_BlueprintWorkflow_RunName;
  on: Shared_BlueprintWorkflow_On;
  permissions: Shared_BlueprintWorkflow_Permissions;
  concurrency: Shared_BlueprintWorkflow_Concurrency;
  env: Shared_BlueprintWorkflow_Env;
  jobs: Shared_BlueprintWorkflow_Jobs;
};

/**
 * Shared - Item Pretty Names.
 *
 * @since 0.11.0
 */
export type Shared_ItemPrettyNames = Record<string, string>;

/**
 * Shared - JSDoc Hierarchy Create Options.
 *
 * @since 0.15.0
 */
export type Shared_JsdocHierarchyCreateOptions_AnchorDirectories = string[];

export type Shared_JsdocHierarchyCreateOptions_IgnoreFiles = string[];

export type Shared_JsdocHierarchyCreateOptions_KnownNames = Record<string, string>;

export type Shared_JsdocHierarchyCreateOptions_StripDirectories = string[];

export type Shared_JsdocHierarchyCreateOptions_WarnSkippedScripts = boolean;

export type Shared_JsdocHierarchyCreateOptions = Readonly<{
  anchorDirectories: Shared_JsdocHierarchyCreateOptions_AnchorDirectories;
  ignoreFiles: Shared_JsdocHierarchyCreateOptions_IgnoreFiles;
  knownNames: Shared_JsdocHierarchyCreateOptions_KnownNames;
  stripDirectories: Shared_JsdocHierarchyCreateOptions_StripDirectories;
  warnSkippedScripts: Shared_JsdocHierarchyCreateOptions_WarnSkippedScripts;
}>;

/**
 * Shared - JSDoc Hierarchy Find Summary Info Result.
 *
 * @since 0.15.0
 */
export type Shared_JsdocHierarchyFindSummaryInfoResult_Index = number;

export type Shared_JsdocHierarchyFindSummaryInfoResult_Text = string;

export type Shared_JsdocHierarchyFindSummaryInfoResult = {
  index: Shared_JsdocHierarchyFindSummaryInfoResult_Index;
  text: Shared_JsdocHierarchyFindSummaryInfoResult_Text;
};

/**
 * Shared - Linux OS Release Entries.
 *
 * @since 0.13.0
 */
export type Shared_LinuxOsReleaseEntry = string;

export type Shared_LinuxOsReleaseEntries = {
  [key: string]: Shared_LinuxOsReleaseEntry;
};

/**
 * Shared - Logger Customize Returns.
 *
 * @since 0.15.0
 */
export type Shared_LoggerCustomizeReturnsMessage = unknown[];

export type Shared_LoggerCustomizeReturnsMethodReturns = void;

export type Shared_LoggerCustomizeReturns = {
  debug(...message: Shared_LoggerCustomizeReturnsMessage): Shared_LoggerCustomizeReturnsMethodReturns;
  dev(...message: Shared_LoggerCustomizeReturnsMessage): Shared_LoggerCustomizeReturnsMethodReturns;
  info(...message: Shared_LoggerCustomizeReturnsMessage): Shared_LoggerCustomizeReturnsMethodReturns;
  warn(...message: Shared_LoggerCustomizeReturnsMessage): Shared_LoggerCustomizeReturnsMethodReturns;
  error(...message: Shared_LoggerCustomizeReturnsMessage): Shared_LoggerCustomizeReturnsMethodReturns;
};

/**
 * Shared - Log Level.
 *
 * @since 0.11.0
 */
export type Shared_LogLevel =
  'debug'
  | 'dev'
  | 'info'
  | 'warn'
  | 'error';

/**
 * Shared - Log Options.
 *
 * @since 0.11.0
 */
export type Shared_LogOptions_Name = string;

export type Shared_LogOptions_Type = 'function' | 'method' | 'test';

export type Shared_LogOptions_Purpose = string;

export type Shared_LogOptions_PadTop = number;

export type Shared_LogOptions_PadBottom = number;

export type Shared_LogOptions = {
  name?: Shared_LogOptions_Name;
  type?: Shared_LogOptions_Type;
  purpose?: Shared_LogOptions_Purpose;
  padTop?: Shared_LogOptions_PadTop;
  padBottom?: Shared_LogOptions_PadBottom;
};

/**
 * Shared - Log Queue Entry.
 *
 * @since 0.15.0
 */
export type Shared_LogQueueEntry_Script = string;

export type Shared_LogQueueEntry_Stream = 'stdout' | 'stderr';

export type Shared_LogQueueEntry_Line = string;

export type Shared_LogQueueEntry = {
  script: Shared_LogQueueEntry_Script;
  stream: Shared_LogQueueEntry_Stream;
  line: Shared_LogQueueEntry_Line;
};

/**
 * Shared - Monorepo Context.
 *
 * @since 0.15.0
 */
export type Shared_MonorepoContextMonorepo_Context = 'monorepo';

export type Shared_MonorepoContextMonorepo = {
  context: Shared_MonorepoContextMonorepo_Context;
};

export type Shared_MonorepoContextWorkspace_Context = 'workspace';

export type Shared_MonorepoContextWorkspace_Root = string;

export type Shared_MonorepoContextWorkspace = {
  context: Shared_MonorepoContextWorkspace_Context;
  root: Shared_MonorepoContextWorkspace_Root;
};

export type Shared_MonorepoContextStandalone_Context = 'standalone';

export type Shared_MonorepoContextStandalone = {
  context: Shared_MonorepoContextStandalone_Context;
};

export type Shared_MonorepoContextNested_Context = 'nested';

export type Shared_MonorepoContextNested = {
  context: Shared_MonorepoContextNested_Context;
};

export type Shared_MonorepoContextInvalid_Context = 'invalid';

export type Shared_MonorepoContextInvalid_Reason = string;

export type Shared_MonorepoContextInvalid = {
  context: Shared_MonorepoContextInvalid_Context;
  reason: Shared_MonorepoContextInvalid_Reason;
};

export type Shared_MonorepoContext =
  Shared_MonorepoContextMonorepo
  | Shared_MonorepoContextWorkspace
  | Shared_MonorepoContextStandalone
  | Shared_MonorepoContextNested
  | Shared_MonorepoContextInvalid;

/**
 * Shared - Normalized Result.
 *
 * @since 0.13.0
 */
export type Shared_NormalizedResult_Result = true | string;

export type Shared_NormalizedResult_Sanitized<ReturnType> = ReturnType | undefined;

export type Shared_NormalizedResult<ReturnType> = {
  result: Shared_NormalizedResult_Result;
  sanitized: Shared_NormalizedResult_Sanitized<ReturnType>;
};

/**
 * Shared - Nova Config.
 *
 * @since 0.11.0
 */
export type Shared_NovaConfig_Project_Name_Slug = string;

export type Shared_NovaConfig_Project_Name_Title = string;

export type Shared_NovaConfig_Project_Name = {
  slug?: Shared_NovaConfig_Project_Name_Slug;
  title?: Shared_NovaConfig_Project_Name_Title;
};

export type Shared_NovaConfig_Project_Description_Short = string;

export type Shared_NovaConfig_Project_Description_Long = string;

export type Shared_NovaConfig_Project_Description = {
  short?: Shared_NovaConfig_Project_Description_Short;
  long?: Shared_NovaConfig_Project_Description_Long;
};

export type Shared_NovaConfigProjectKeyword = string;

export type Shared_NovaConfig_Project_Keywords = Shared_NovaConfigProjectKeyword[];

export type Shared_NovaConfig_Project_LegalName = string;

export type Shared_NovaConfig_Project_Pronouns = 'personal' | 'business';

export type Shared_NovaConfigProjectPlatform =
  'nodejs'
  | 'swift'
  | 'ios'
  | 'visionos'
  | 'android'
  | 'java'
  | 'kotlin'
  | 'csharp'
  | 'php'
  | 'python'
  | 'macos'
  | 'linux'
  | 'windows'
  | 'discord'
  | 'homebridge'
  | 'docker'
  | 'pfsense'
  | 'synology'
  | 'web';

export type Shared_NovaConfig_Project_Platforms = Shared_NovaConfigProjectPlatform[];

export type Shared_NovaConfig_Project_StartingYear = number;

export type Shared_NovaConfig_Project_License =
  'AGPL-3.0'
  | 'Apache-2.0'
  | 'BSD-2-Clause'
  | 'BSD-3-Clause'
  | 'BSL-1.0'
  | 'CC0-1.0'
  | 'EPL-2.0'
  | 'GPL-2.0'
  | 'GPL-3.0'
  | 'LGPL-2.1'
  | 'MIT'
  | 'MPL-2.0'
  | 'Proprietary'
  | 'Unlicense';

export type Shared_NovaConfig_Project = {
  name?: Shared_NovaConfig_Project_Name;
  description?: Shared_NovaConfig_Project_Description;
  keywords?: Shared_NovaConfig_Project_Keywords;
  legalName?: Shared_NovaConfig_Project_LegalName;
  pronouns?: Shared_NovaConfig_Project_Pronouns;
  platforms?: Shared_NovaConfig_Project_Platforms;
  startingYear?: Shared_NovaConfig_Project_StartingYear;
  license?: Shared_NovaConfig_Project_License;
};

export type Shared_NovaConfigEntity_Name = string;

export type Shared_NovaConfigEntity_Email = string;

export type Shared_NovaConfigEntity_Url = string;

export type Shared_NovaConfigEntityRole = 'author' | 'contributor' | 'supporter';

export type Shared_NovaConfigEntity_Roles = Shared_NovaConfigEntityRole[];

export type Shared_NovaConfigEntity = {
  name?: Shared_NovaConfigEntity_Name;
  email?: Shared_NovaConfigEntity_Email;
  url?: Shared_NovaConfigEntity_Url;
  roles?: Shared_NovaConfigEntity_Roles;
};

export type Shared_NovaConfig_Entities = Shared_NovaConfigEntity[];

export type Shared_NovaConfig_Emails_Bugs = string;

export type Shared_NovaConfig_Emails = {
  bugs?: Shared_NovaConfig_Emails_Bugs;
};

export type Shared_NovaConfig_Github_Owner = string;

export type Shared_NovaConfig_Github_Repo = string;

export type Shared_NovaConfigGithubRecipeName =
  'sync-actions'
  | 'sync-features'
  | 'sync-identity'
  | 'sync-labels'
  | 'sync-policies'
  | 'sync-rulesets'
  | 'sync-security';

export type Shared_NovaConfig_Github_Topics = string[];

export type Shared_NovaConfig_Github_Features_Issues = boolean;

export type Shared_NovaConfig_Github_Features_Wiki = boolean;

export type Shared_NovaConfig_Github_Features_Projects = boolean;

export type Shared_NovaConfig_Github_Features_Discussions = boolean;

export type Shared_NovaConfig_Github_Features_Sponsorships = boolean;

export type Shared_NovaConfig_Github_Features = {
  issues?: Shared_NovaConfig_Github_Features_Issues;
  wiki?: Shared_NovaConfig_Github_Features_Wiki;
  projects?: Shared_NovaConfig_Github_Features_Projects;
  discussions?: Shared_NovaConfig_Github_Features_Discussions;
  sponsorships?: Shared_NovaConfig_Github_Features_Sponsorships;
};

export type Shared_NovaConfigGithubActionsAllowedActions = 'all' | 'local-only' | 'selected';

export type Shared_NovaConfigGithubActionsDefaultWorkflowPermissions = 'read' | 'write';

export type Shared_NovaConfig_Github_Actions_SelectedActions_Pattern = string;

export type Shared_NovaConfig_Github_Actions_SelectedActions_GithubOwned = boolean;

export type Shared_NovaConfig_Github_Actions_SelectedActions_Verified = boolean;

export type Shared_NovaConfig_Github_Actions_SelectedActions_Patterns = Shared_NovaConfig_Github_Actions_SelectedActions_Pattern[];

export type Shared_NovaConfig_Github_Actions_Enabled = boolean;

export type Shared_NovaConfig_Github_Actions_AllowedActions = Shared_NovaConfigGithubActionsAllowedActions;

export type Shared_NovaConfig_Github_Actions_ShaPinningRequired = boolean;

export type Shared_NovaConfig_Github_Actions_SelectedActions = {
  githubOwned?: Shared_NovaConfig_Github_Actions_SelectedActions_GithubOwned;
  verified?: Shared_NovaConfig_Github_Actions_SelectedActions_Verified;
  patterns?: Shared_NovaConfig_Github_Actions_SelectedActions_Patterns;
};

export type Shared_NovaConfig_Github_Actions_DefaultWorkflowPermissions = Shared_NovaConfigGithubActionsDefaultWorkflowPermissions;

export type Shared_NovaConfig_Github_Actions_CanApprovePullRequestReviews = boolean;

export type Shared_NovaConfig_Github_Actions_ArtifactRetentionDays = number;

export type Shared_NovaConfig_Github_Label_Name = string;

export type Shared_NovaConfig_Github_Label_Color = string;

export type Shared_NovaConfig_Github_Label_Description = string;

export type Shared_NovaConfig_Github_Label = {
  name: Shared_NovaConfig_Github_Label_Name;
  color: Shared_NovaConfig_Github_Label_Color;
  description?: Shared_NovaConfig_Github_Label_Description;
};

export type Shared_NovaConfig_Github_Policies_MergeMethods_Merge = boolean;

export type Shared_NovaConfig_Github_Policies_MergeMethods_Squash = boolean;

export type Shared_NovaConfig_Github_Policies_MergeMethods_Rebase = boolean;

export type Shared_NovaConfig_Github_Policies_Visibility = 'public' | 'private' | 'internal';

export type Shared_NovaConfig_Github_Policies_DefaultBranch = string;

export type Shared_NovaConfig_Github_Policies_MergeMethods = {
  merge?: Shared_NovaConfig_Github_Policies_MergeMethods_Merge;
  squash?: Shared_NovaConfig_Github_Policies_MergeMethods_Squash;
  rebase?: Shared_NovaConfig_Github_Policies_MergeMethods_Rebase;
};

export type Shared_NovaConfigGithubPoliciesMergeCommitTitle = 'pull-request-title' | 'merge-message';

export type Shared_NovaConfigGithubPoliciesMergeCommitMessage = 'pull-request-body' | 'pull-request-title' | 'blank';

export type Shared_NovaConfig_Github_Policies_MergeCommit_Title = Shared_NovaConfigGithubPoliciesMergeCommitTitle;

export type Shared_NovaConfig_Github_Policies_MergeCommit_Message = Shared_NovaConfigGithubPoliciesMergeCommitMessage;

export type Shared_NovaConfig_Github_Policies_MergeCommit = {
  title?: Shared_NovaConfig_Github_Policies_MergeCommit_Title;
  message?: Shared_NovaConfig_Github_Policies_MergeCommit_Message;
};

export type Shared_NovaConfigGithubPoliciesSquashMergeTitle = 'pull-request-title' | 'commit-or-pull-request-title';

export type Shared_NovaConfigGithubPoliciesSquashMergeMessage = 'pull-request-body' | 'commit-messages' | 'blank';

export type Shared_NovaConfig_Github_Policies_SquashMerge_Title = Shared_NovaConfigGithubPoliciesSquashMergeTitle;

export type Shared_NovaConfig_Github_Policies_SquashMerge_Message = Shared_NovaConfigGithubPoliciesSquashMergeMessage;

export type Shared_NovaConfig_Github_Policies_SquashMerge = {
  title?: Shared_NovaConfig_Github_Policies_SquashMerge_Title;
  message?: Shared_NovaConfig_Github_Policies_SquashMerge_Message;
};

export type Shared_NovaConfig_Github_Policies_AutoDeleteHeadBranch = boolean;

export type Shared_NovaConfig_Github_Policies_AutoMerge = boolean;

export type Shared_NovaConfig_Github_Policies_AllowUpdateBranch = boolean;

export type Shared_NovaConfig_Github_Policies_WebCommitSignoffRequired = boolean;

export type Shared_NovaConfig_Github_Policies = {
  visibility?: Shared_NovaConfig_Github_Policies_Visibility;
  defaultBranch?: Shared_NovaConfig_Github_Policies_DefaultBranch;
  mergeMethods?: Shared_NovaConfig_Github_Policies_MergeMethods;
  mergeCommit?: Shared_NovaConfig_Github_Policies_MergeCommit;
  squashMerge?: Shared_NovaConfig_Github_Policies_SquashMerge;
  autoDeleteHeadBranch?: Shared_NovaConfig_Github_Policies_AutoDeleteHeadBranch;
  autoMerge?: Shared_NovaConfig_Github_Policies_AutoMerge;
  allowUpdateBranch?: Shared_NovaConfig_Github_Policies_AllowUpdateBranch;
  webCommitSignoffRequired?: Shared_NovaConfig_Github_Policies_WebCommitSignoffRequired;
};

export type Shared_NovaConfigGithubRulesetEnforcement = 'active' | 'disabled' | 'evaluate';

export type Shared_NovaConfigGithubRulesetAllowedMergeMethod = 'merge' | 'squash' | 'rebase';

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusCheck = string;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_Enforcement = Shared_NovaConfigGithubRulesetEnforcement;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_BlockDeletions = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_BlockForcePushes = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireLinearHistory = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireSignedCommits = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequirePullRequest = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_AllowedMergeMethods = Shared_NovaConfigGithubRulesetAllowedMergeMethod[];

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_DismissStaleReviews = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireCodeOwnerReview = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireLastPushApproval = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredApprovals = number;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireConversationResolution = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusChecks = Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusCheck[];

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireBranchesToBeUpToDate = boolean;

export type Shared_NovaConfig_Github_Rulesets_DefaultBranch = {
  enforcement?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_Enforcement;
  blockDeletions?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_BlockDeletions;
  blockForcePushes?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_BlockForcePushes;
  requireLinearHistory?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireLinearHistory;
  requireSignedCommits?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireSignedCommits;
  requirePullRequest?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequirePullRequest;
  allowedMergeMethods?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_AllowedMergeMethods;
  dismissStaleReviews?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_DismissStaleReviews;
  requireCodeOwnerReview?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireCodeOwnerReview;
  requireLastPushApproval?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireLastPushApproval;
  requiredApprovals?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredApprovals;
  requireConversationResolution?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireConversationResolution;
  requiredStatusChecks?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusChecks;
  requireBranchesToBeUpToDate?: Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequireBranchesToBeUpToDate;
};

export type Shared_NovaConfig_Github_Security_VulnerabilityAlerts = boolean;

export type Shared_NovaConfig_Github_Security_DependabotSecurityUpdates = boolean;

export type Shared_NovaConfig_Github_Security_SecretScanning = boolean;

export type Shared_NovaConfig_Github_Security_PushProtection = boolean;

export type Shared_NovaConfig_Github_Security = {
  vulnerabilityAlerts?: Shared_NovaConfig_Github_Security_VulnerabilityAlerts;
  dependabotSecurityUpdates?: Shared_NovaConfig_Github_Security_DependabotSecurityUpdates;
  secretScanning?: Shared_NovaConfig_Github_Security_SecretScanning;
  pushProtection?: Shared_NovaConfig_Github_Security_PushProtection;
};

export type Shared_NovaConfig_Github_Rulesets = {
  defaultBranch?: Shared_NovaConfig_Github_Rulesets_DefaultBranch;
};

export type Shared_NovaConfig_Github_Actions = {
  enabled?: Shared_NovaConfig_Github_Actions_Enabled;
  allowedActions?: Shared_NovaConfig_Github_Actions_AllowedActions;
  shaPinningRequired?: Shared_NovaConfig_Github_Actions_ShaPinningRequired;
  selectedActions?: Shared_NovaConfig_Github_Actions_SelectedActions;
  defaultWorkflowPermissions?: Shared_NovaConfig_Github_Actions_DefaultWorkflowPermissions;
  canApprovePullRequestReviews?: Shared_NovaConfig_Github_Actions_CanApprovePullRequestReviews;
  artifactRetentionDays?: Shared_NovaConfig_Github_Actions_ArtifactRetentionDays;
};

export type Shared_NovaConfig_Github_Labels = Shared_NovaConfig_Github_Label[];

export type Shared_NovaConfig_Github_IssueTemplate_BugReportField =
  'nodejs'
  | 'apple'
  | 'android'
  | 'csharp'
  | 'php'
  | 'python'
  | 'homebridge'
  | 'pfsense'
  | 'synology'
  | 'docker'
  | 'web'
  | 'screenshots';

export type Shared_NovaConfig_Github_IssueTemplate_BugReportFields = Shared_NovaConfig_Github_IssueTemplate_BugReportField[];

export type Shared_NovaConfig_Github_IssueTemplate = {
  bugReportFields?: Shared_NovaConfig_Github_IssueTemplate_BugReportFields;
};

export type Shared_NovaConfig_Github = {
  owner?: Shared_NovaConfig_Github_Owner;
  repo?: Shared_NovaConfig_Github_Repo;
  topics?: Shared_NovaConfig_Github_Topics;
  features?: Shared_NovaConfig_Github_Features;
  policies?: Shared_NovaConfig_Github_Policies;
  security?: Shared_NovaConfig_Github_Security;
  rulesets?: Shared_NovaConfig_Github_Rulesets;
  actions?: Shared_NovaConfig_Github_Actions;
  labels?: Shared_NovaConfig_Github_Labels;
  issueTemplate?: Shared_NovaConfig_Github_IssueTemplate;
};

export type Shared_NovaConfigWorkflow_Name = string;

export type Shared_NovaConfigWorkflow_Template = string;

export type Shared_NovaConfigWorkflowTrigger = string;

export type Shared_NovaConfigWorkflowTriggerObject_Name = string;

export type Shared_NovaConfigWorkflowTriggerObjectBranch = string;

export type Shared_NovaConfigWorkflowTriggerObject_Branches = Shared_NovaConfigWorkflowTriggerObjectBranch[];

export type Shared_NovaConfigWorkflowTriggerObjectPath = string;

export type Shared_NovaConfigWorkflowTriggerObject_Paths = Shared_NovaConfigWorkflowTriggerObjectPath[];

export type Shared_NovaConfigWorkflowTriggerObjectTag = string;

export type Shared_NovaConfigWorkflowTriggerObject_Tags = Shared_NovaConfigWorkflowTriggerObjectTag[];

export type Shared_NovaConfigWorkflowTriggerObjectWorkflow = string;

export type Shared_NovaConfigWorkflowTriggerObject_Workflows = Shared_NovaConfigWorkflowTriggerObjectWorkflow[];

export type Shared_NovaConfigWorkflowTriggerObject = {
  name: Shared_NovaConfigWorkflowTriggerObject_Name;
  branches?: Shared_NovaConfigWorkflowTriggerObject_Branches;
  paths?: Shared_NovaConfigWorkflowTriggerObject_Paths;
  tags?: Shared_NovaConfigWorkflowTriggerObject_Tags;
  workflows?: Shared_NovaConfigWorkflowTriggerObject_Workflows;
};

export type Shared_NovaConfigWorkflowTriggerWideEntry = Shared_NovaConfigWorkflowTrigger | Shared_NovaConfigWorkflowTriggerObject;

export type Shared_NovaConfigWorkflow_Triggers = Shared_NovaConfigWorkflowTriggerWideEntry[];

export type Shared_NovaConfigWorkflowTriggersWide = Shared_NovaConfigWorkflow_Triggers;

export type Shared_NovaConfigWorkflow_RunsOn = 'ubuntu-latest';

export type Shared_NovaConfigWorkflow_TimeoutMinutes = number;

export type Shared_NovaConfigWorkflowContainerPlatform = 'linux/amd64' | 'linux/arm64';

export type Shared_NovaConfigWorkflow_ContainerPlatforms = Shared_NovaConfigWorkflowContainerPlatform[];

export type Shared_NovaConfigWorkflowBuildEntry = string;

export type Shared_NovaConfigWorkflow_Build = Shared_NovaConfigWorkflowBuildEntry[];

export type Shared_NovaConfigWorkflowWithKey = string;

export type Shared_NovaConfigWorkflowWithValue = string;

export type Shared_NovaConfigWorkflowDeployTarget_To = string;

export type Shared_NovaConfigWorkflowDeployTarget_Path = string;

export type Shared_NovaConfigWorkflowDeployTargetAfterEntry = string;

export type Shared_NovaConfigWorkflowDeployTarget_After = Shared_NovaConfigWorkflowDeployTargetAfterEntry[];

export type Shared_NovaConfigWorkflowDeployTarget_With = {
  [key: Shared_NovaConfigWorkflowWithKey]: Shared_NovaConfigWorkflowWithValue;
};

export type Shared_NovaConfigWorkflowDeployTarget = {
  to: Shared_NovaConfigWorkflowDeployTarget_To;
  path: Shared_NovaConfigWorkflowDeployTarget_Path;
  after?: Shared_NovaConfigWorkflowDeployTarget_After;
  with?: Shared_NovaConfigWorkflowDeployTarget_With;
};

export type Shared_NovaConfigWorkflow_Deploy = Shared_NovaConfigWorkflowDeployTarget[];

export type Shared_NovaConfigWorkflow_With = {
  [key: Shared_NovaConfigWorkflowWithKey]: Shared_NovaConfigWorkflowWithValue;
};

export type Shared_NovaConfigWorkflow = {
  'template': Shared_NovaConfigWorkflow_Template;
  'name': Shared_NovaConfigWorkflow_Name;
  'triggers': Shared_NovaConfigWorkflow_Triggers;
  'runsOn'?: Shared_NovaConfigWorkflow_RunsOn;
  'timeoutMinutes'?: Shared_NovaConfigWorkflow_TimeoutMinutes;
  'containerPlatforms'?: Shared_NovaConfigWorkflow_ContainerPlatforms;
  'build'?: Shared_NovaConfigWorkflow_Build;
  'deploy'?: Shared_NovaConfigWorkflow_Deploy;
  'with'?: Shared_NovaConfigWorkflow_With;
};

// The workflow generator keeps its own vocabulary for several of the values above. A workflow
// name is the trailing segment of the generated file name ("project" in
// "nova-publish-project.yml"), a build entry is the scope a setup step runs in, a "with" map is
// a settings map, and a deploy target's "after" list is the jobs it needs. The aliases below let
// the generator keep those names while the config types stay named after the fields on disk.

export type Shared_NovaConfigWorkflow_Suffix = Shared_NovaConfigWorkflow_Name;

export type Shared_NovaConfigWorkflowScope = Shared_NovaConfigWorkflowBuildEntry;

export type Shared_NovaConfigWorkflow_Scopes = Shared_NovaConfigWorkflow_Build;

export type Shared_NovaConfigWorkflow_Settings = Shared_NovaConfigWorkflow_With;

export type Shared_NovaConfigWorkflowTarget_Settings = Shared_NovaConfigWorkflowDeployTarget_With;

export type Shared_NovaConfigWorkflowTargetNeedsEntry = Shared_NovaConfigWorkflowDeployTargetAfterEntry;

export type Shared_NovaConfigWorkflowTarget_Needs = Shared_NovaConfigWorkflowDeployTarget_After;

export type Shared_NovaConfig_Workflows = Shared_NovaConfigWorkflow[];

export type Shared_NovaConfig_Urls_Homepage = string;

export type Shared_NovaConfig_Urls_Repository = string;

export type Shared_NovaConfig_Urls_Bugs = string;

export type Shared_NovaConfig_Urls_License = string;

export type Shared_NovaConfig_Urls_Logo = string;

export type Shared_NovaConfig_Urls_Docker = string;

export type Shared_NovaConfig_Urls_Documentation = string;

export type Shared_NovaConfig_Urls_Npm = string;

export type Shared_NovaConfigUrlsFundSource = string;

export type Shared_NovaConfig_Urls_FundSources = Shared_NovaConfigUrlsFundSource[];

export type Shared_NovaConfig_Urls_PrivacyPolicy = string;

export type Shared_NovaConfig_Urls_TermsOfUse = string;

export type Shared_NovaConfig_Urls = {
  homepage?: Shared_NovaConfig_Urls_Homepage;
  repository?: Shared_NovaConfig_Urls_Repository;
  bugs?: Shared_NovaConfig_Urls_Bugs;
  license?: Shared_NovaConfig_Urls_License;
  logo?: Shared_NovaConfig_Urls_Logo;
  docker?: Shared_NovaConfig_Urls_Docker;
  documentation?: Shared_NovaConfig_Urls_Documentation;
  npm?: Shared_NovaConfig_Urls_Npm;
  fundSources?: Shared_NovaConfig_Urls_FundSources;
  privacyPolicy?: Shared_NovaConfig_Urls_PrivacyPolicy;
  termsOfUse?: Shared_NovaConfig_Urls_TermsOfUse;
};

export type Shared_NovaConfigReadMeBadge =
  'homebridge'
  | 'homebridge-verified'
  | 'npm-version'
  | 'npm-downloads'
  | 'docker-pulls'
  | 'docker-image-size'
  | 'github-release'
  | 'github-top-language'
  | 'github-license'
  | 'funding';

export type Shared_NovaConfig_ReadMe_Badges = Shared_NovaConfigReadMeBadge[];

export type Shared_NovaConfig_ReadMe = {
  badges?: Shared_NovaConfig_ReadMe_Badges;
};

export type Shared_NovaConfigWorkspace_Name = string;

export type Shared_NovaConfigWorkspace_Role = 'project' | 'docs' | 'config' | 'app' | 'package' | 'tool' | 'template';

export type Shared_NovaConfigWorkspace_Policy = 'freezable' | 'trackable' | 'distributable';

export type Shared_NovaConfigWorkspaceRecipeName =
  'cleanup'
  | 'normalize-artifacts'
  | 'normalize-bundler'
  | 'normalize-dependencies'
  | 'normalize-modules'
  | 'normalize-tooling'
  | 'sync-environment'
  | 'sync-identity'
  | 'sync-ownership';

export type Shared_NovaConfigWorkspaceRecipeSettings = Record<string, boolean>;

export type Shared_NovaConfigWorkspace = {
  name: Shared_NovaConfigWorkspace_Name;
  role: Shared_NovaConfigWorkspace_Role;
  policy: Shared_NovaConfigWorkspace_Policy;
};

export type Shared_NovaConfig_Workspaces = {
  [key: string]: Shared_NovaConfigWorkspace;
};

export type Shared_BlueprintConfigWorkflow_Template = Shared_NovaConfigWorkflow_Template;

export type Shared_BlueprintConfigWorkflow_Name = Shared_NovaConfigWorkflow_Name;

export type Shared_BlueprintConfigTriggerObjectWorkflow = Shared_NovaConfigWorkflowTriggerObjectWorkflow;

export type Shared_BlueprintConfigTriggerObject_Workflows = Shared_NovaConfigWorkflowTriggerObject_Workflows;

export type Shared_BlueprintConfigTriggerObject_Name = Shared_NovaConfigWorkflowTriggerObject_Name;

export type Shared_BlueprintConfigTriggerObject_Branches = Shared_NovaConfigWorkflowTriggerObject_Branches;

export type Shared_BlueprintConfigTriggerObject_Paths = Shared_NovaConfigWorkflowTriggerObject_Paths;

export type Shared_BlueprintConfigTriggerObject_Tags = Shared_NovaConfigWorkflowTriggerObject_Tags;

export type Shared_BlueprintConfigTriggerObject = Shared_NovaConfigWorkflowTriggerObject;

export type Shared_BlueprintConfigTriggerWideEntry = Shared_NovaConfigWorkflowTriggerWideEntry;

export type Shared_BlueprintConfigWorkflow_Triggers = Shared_NovaConfigWorkflow_Triggers;

export type Shared_BlueprintConfigWorkflow_RunsOn = Shared_NovaConfigWorkflow_RunsOn;

export type Shared_BlueprintConfigWorkflow_TimeoutMinutes = Shared_NovaConfigWorkflow_TimeoutMinutes;

export type Shared_BlueprintConfigWorkflow_ContainerPlatforms = Shared_NovaConfigWorkflow_ContainerPlatforms;

export type Shared_BlueprintConfigWorkflow_Build = Shared_NovaConfigWorkflow_Build;

export type Shared_BlueprintConfigDeployTarget_To = Shared_NovaConfigWorkflowDeployTarget_To;

export type Shared_BlueprintConfigDeployTarget_Path = Shared_NovaConfigWorkflowDeployTarget_Path;

export type Shared_BlueprintConfigDeployTarget_After = Shared_NovaConfigWorkflowDeployTarget_After;

export type Shared_BlueprintConfigDeployTarget_With = Shared_NovaConfigWorkflowDeployTarget_With;

export type Shared_BlueprintConfigDeployTarget = {
  to: Shared_BlueprintConfigDeployTarget_To;
  path: Shared_BlueprintConfigDeployTarget_Path;
  after?: Shared_BlueprintConfigDeployTarget_After;
  with?: Shared_BlueprintConfigDeployTarget_With;
};

export type Shared_BlueprintConfigWorkflow_Deploy = Shared_BlueprintConfigDeployTarget[];

export type Shared_BlueprintConfigWorkflow_With = Shared_NovaConfigWorkflow_With;

export type Shared_BlueprintConfigWorkflow = {
  'template': Shared_BlueprintConfigWorkflow_Template;
  'name': Shared_BlueprintConfigWorkflow_Name;
  'triggers': Shared_BlueprintConfigWorkflow_Triggers;
  'runsOn'?: Shared_BlueprintConfigWorkflow_RunsOn;
  'timeoutMinutes'?: Shared_BlueprintConfigWorkflow_TimeoutMinutes;
  'containerPlatforms'?: Shared_BlueprintConfigWorkflow_ContainerPlatforms;
  'build'?: Shared_BlueprintConfigWorkflow_Build;
  'deploy'?: Shared_BlueprintConfigWorkflow_Deploy;
  'with'?: Shared_BlueprintConfigWorkflow_With;
};

export type Shared_BlueprintConfig_Workflows = Shared_BlueprintConfigWorkflow[];

export type Shared_BlueprintValidationResultDiagnostic_Severity = 'error';

export type Shared_BlueprintValidationResultDiagnostic_Message = string;

export type Shared_BlueprintValidationResultDiagnostic = {
  severity: Shared_BlueprintValidationResultDiagnostic_Severity;
  message: Shared_BlueprintValidationResultDiagnostic_Message;
};

export type Shared_BlueprintValidationResult_Workflows = Shared_BlueprintConfig_Workflows;

export type Shared_BlueprintValidationResult_Diagnostics = Shared_BlueprintValidationResultDiagnostic[];

export type Shared_BlueprintValidationResult = {
  workflows: Shared_BlueprintValidationResult_Workflows;
  diagnostics: Shared_BlueprintValidationResult_Diagnostics;
};

/**
 * Shared - Blueprint Publish Target Context.
 *
 * @since 0.21.0
 */
export type Shared_BlueprintPublishTargetContext_WorkingDir = string;

export type Shared_BlueprintPublishTargetContext_ArtifactName = string;

export type Shared_BlueprintPublishTargetContext_Needs = Shared_BlueprintJob_Needs;

export type Shared_BlueprintPublishTargetContext_TargetSettings = Shared_NovaConfigWorkflowDeployTarget_With | undefined;

export type Shared_BlueprintPublishTargetContext_WorkflowSettings = Shared_NovaConfigWorkflow_With | undefined;

export type Shared_BlueprintPublishTargetContext_Workspace = Shared_NovaConfigWorkspace | undefined;

export type Shared_BlueprintPublishTargetContext_Environment = Shared_NovaConfigEnvironment | undefined;

export type Shared_BlueprintPublishTargetContext_PackageManager = Shared_CorepackPackageManager;

export type Shared_BlueprintPublishTargetContext = {
  workingDir: Shared_BlueprintPublishTargetContext_WorkingDir;
  artifactName: Shared_BlueprintPublishTargetContext_ArtifactName;
  needs: Shared_BlueprintPublishTargetContext_Needs;
  targetSettings?: Shared_BlueprintPublishTargetContext_TargetSettings;
  workflowSettings?: Shared_BlueprintPublishTargetContext_WorkflowSettings;
  workspace?: Shared_BlueprintPublishTargetContext_Workspace;
  environment?: Shared_BlueprintPublishTargetContext_Environment;
  packageManager: Shared_BlueprintPublishTargetContext_PackageManager;
};

/**
 * Shared - Nova Config Ignore File.
 *
 * @since 0.32.0
 */
export type Shared_NovaConfigIgnoreFile_Bundle = string;

export type Shared_NovaConfig_IgnoreFile_Bundles = Shared_NovaConfigIgnoreFile_Bundle[];

export type Shared_NovaConfigIgnoreFile_Pattern = string;

export type Shared_NovaConfig_IgnoreFile_Patterns = Shared_NovaConfigIgnoreFile_Pattern[];

export type Shared_NovaConfig_IgnoreFile = {
  bundles: Shared_NovaConfig_IgnoreFile_Bundles;
  patterns?: Shared_NovaConfig_IgnoreFile_Patterns;
};

export type Shared_NovaConfigIgnoreFiles_Path = string;

export type Shared_NovaConfig_IgnoreFiles = Record<Shared_NovaConfigIgnoreFiles_Path, Shared_NovaConfig_IgnoreFile>;

export type Shared_BlueprintPublicDotenvVariable_Key = string;

export type Shared_BlueprintPublicDotenvVariable_Source = string;

export type Shared_BlueprintPublicDotenvVariable = {
  key: Shared_BlueprintPublicDotenvVariable_Key;
  source: Shared_BlueprintPublicDotenvVariable_Source;
};

export type Shared_BlueprintPublicDotenvVariables = Shared_BlueprintPublicDotenvVariable[];

export type Shared_BlueprintManagedSecret_Key = string;

export type Shared_BlueprintManagedSecret_From = string;

export type Shared_BlueprintManagedSecret = {
  key: Shared_BlueprintManagedSecret_Key;
  from: Shared_BlueprintManagedSecret_From;
};

export type Shared_BlueprintManagedSecrets = Shared_BlueprintManagedSecret[];

/**
 * Shared - Blueprint Delivery Value.
 *
 * A single environment value resolved for delivery: its source key, the derived
 * GitHub name (prefix + key), and whether it stores as a Secret (which only
 * picks the GitHub source and vendor channel, never the delivery route).
 *
 * @since 0.21.0
 */
export type Shared_BlueprintDeliveryValue_Key = string;

export type Shared_BlueprintDeliveryValue_Name = string;

export type Shared_BlueprintDeliveryValue_Secret = boolean;

export type Shared_BlueprintDeliveryValue_DefaultValue = string;

export type Shared_BlueprintDeliveryValue = {
  key: Shared_BlueprintDeliveryValue_Key;
  name: Shared_BlueprintDeliveryValue_Name;
  secret: Shared_BlueprintDeliveryValue_Secret;
  defaultValue?: Shared_BlueprintDeliveryValue_DefaultValue;
};

export type Shared_BlueprintDeliveryValues = Shared_BlueprintDeliveryValue[];

/**
 * Shared - Nova Config Environment.
 *
 * @since 0.21.0
 */
export type Shared_NovaConfigEnvironmentValue_Key = string;

export type Shared_NovaConfigEnvironmentValue_Secret = boolean;

export type Shared_NovaConfigEnvironmentValue_DefaultValue = string;

/**
 * Shared - Nova Config Environment Value Reach.
 *
 * @since 0.22.0
 */
export type Shared_NovaConfigEnvironmentValue_Reach = 'local' | 'managed' | 'build' | 'runtime';

/**
 * Shared - Nova Config Environment Value Local.
 *
 * A key that lives only in ".env" / ".env.sample" and never reaches GitHub, so it
 * has no secret slot (the structure is the guard against a local secret).
 *
 * @since 0.22.0
 */
export type Shared_NovaConfigEnvironmentValueLocal_Key = Shared_NovaConfigEnvironmentValue_Key;

export type Shared_NovaConfigEnvironmentValueLocal_Reach = 'local';

export type Shared_NovaConfigEnvironmentValueLocal_DefaultValue = Shared_NovaConfigEnvironmentValue_DefaultValue;

export type Shared_NovaConfigEnvironmentValueLocal = {
  key: Shared_NovaConfigEnvironmentValueLocal_Key;
  reach: Shared_NovaConfigEnvironmentValueLocal_Reach;
  defaultValue?: Shared_NovaConfigEnvironmentValueLocal_DefaultValue;
};

/**
 * Shared - Nova Config Environment Value Managed.
 *
 * A key provisioned as a GitHub Variable or Secret but never delivered to a
 * build or server by CI. Workspace-scoped values also appear blank in local
 * ".env" files; project-scoped values do not. Neither kind accepts a default.
 *
 * @since 0.26.0
 */
export type Shared_NovaConfigEnvironmentValueManaged_Key = Shared_NovaConfigEnvironmentValue_Key;

export type Shared_NovaConfigEnvironmentValueManaged_Reach = 'managed';

export type Shared_NovaConfigEnvironmentValueManaged_Secret = Shared_NovaConfigEnvironmentValue_Secret;

export type Shared_NovaConfigEnvironmentValueManaged = {
  key: Shared_NovaConfigEnvironmentValueManaged_Key;
  reach: Shared_NovaConfigEnvironmentValueManaged_Reach;
  secret: Shared_NovaConfigEnvironmentValueManaged_Secret;
};

/**
 * Shared - Nova Config Environment Value Build.
 *
 * The former "buildOnly: true" kind: provisioned on GitHub and baked into the build.
 *
 * @since 0.22.0
 */
export type Shared_NovaConfigEnvironmentValueBuild_Key = Shared_NovaConfigEnvironmentValue_Key;

export type Shared_NovaConfigEnvironmentValueBuild_Reach = 'build';

export type Shared_NovaConfigEnvironmentValueBuild_Secret = Shared_NovaConfigEnvironmentValue_Secret;

export type Shared_NovaConfigEnvironmentValueBuild_DefaultValue = Shared_NovaConfigEnvironmentValue_DefaultValue;

export type Shared_NovaConfigEnvironmentValueBuild = {
  key: Shared_NovaConfigEnvironmentValueBuild_Key;
  reach: Shared_NovaConfigEnvironmentValueBuild_Reach;
  secret: Shared_NovaConfigEnvironmentValueBuild_Secret;
  defaultValue?: Shared_NovaConfigEnvironmentValueBuild_DefaultValue;
};

/**
 * Shared - Nova Config Environment Value Runtime.
 *
 * The former "buildOnly: false" kind: provisioned on GitHub and synced to server(s).
 *
 * @since 0.22.0
 */
export type Shared_NovaConfigEnvironmentValueRuntime_Key = Shared_NovaConfigEnvironmentValue_Key;

export type Shared_NovaConfigEnvironmentValueRuntime_Reach = 'runtime';

export type Shared_NovaConfigEnvironmentValueRuntime_Secret = Shared_NovaConfigEnvironmentValue_Secret;

export type Shared_NovaConfigEnvironmentValueRuntime_DefaultValue = Shared_NovaConfigEnvironmentValue_DefaultValue;

export type Shared_NovaConfigEnvironmentValueRuntime = {
  key: Shared_NovaConfigEnvironmentValueRuntime_Key;
  reach: Shared_NovaConfigEnvironmentValueRuntime_Reach;
  secret: Shared_NovaConfigEnvironmentValueRuntime_Secret;
  defaultValue?: Shared_NovaConfigEnvironmentValueRuntime_DefaultValue;
};

export type Shared_NovaConfigEnvironmentValue =
  | Shared_NovaConfigEnvironmentValueLocal
  | Shared_NovaConfigEnvironmentValueManaged
  | Shared_NovaConfigEnvironmentValueBuild
  | Shared_NovaConfigEnvironmentValueRuntime;

export type Shared_NovaConfigEnvironmentWorkspace_Prefix = string;

export type Shared_NovaConfigEnvironmentWorkspace_Variables = Shared_NovaConfigEnvironmentValue[];

export type Shared_NovaConfigEnvironmentWorkspace = {
  prefix: Shared_NovaConfigEnvironmentWorkspace_Prefix;
  variables?: Shared_NovaConfigEnvironmentWorkspace_Variables;
};

export type Shared_NovaConfigEnvironmentProject_Prefix = string;

export type Shared_NovaConfigEnvironmentProject_Variables = Shared_NovaConfigEnvironmentValue[];

export type Shared_NovaConfigEnvironmentProject = {
  prefix: Shared_NovaConfigEnvironmentProject_Prefix;
  variables?: Shared_NovaConfigEnvironmentProject_Variables;
};

export type Shared_NovaConfigEnvironmentWorkflow_Prefix = string;

export type Shared_NovaConfigEnvironmentWorkflow = {
  prefix: Shared_NovaConfigEnvironmentWorkflow_Prefix;
};

export type Shared_NovaConfigEnvironment_Project = Shared_NovaConfigEnvironmentProject;

export type Shared_NovaConfigEnvironment_Workspaces = {
  [key: string]: Shared_NovaConfigEnvironmentWorkspace;
};

export type Shared_NovaConfigEnvironment_Workflows = {
  [key: string]: Shared_NovaConfigEnvironmentWorkflow;
};

export type Shared_NovaConfigEnvironment = {
  project?: Shared_NovaConfigEnvironment_Project;
  workspaces?: Shared_NovaConfigEnvironment_Workspaces;
  workflows?: Shared_NovaConfigEnvironment_Workflows;
};

export type Shared_NovaConfigAgent = 'claude-code' | 'codex';

export type Shared_NovaConfig_Agents = Shared_NovaConfigAgent[];

export type Shared_NovaConfig_RecipeEntry_Enabled = boolean;

export type Shared_NovaConfig_RecipeEntry_Settings = {
  [key: string]: boolean;
};

export type Shared_NovaConfig_RecipeEntry = {
  enabled: Shared_NovaConfig_RecipeEntry_Enabled;
  settings?: Shared_NovaConfig_RecipeEntry_Settings;
};

export type Shared_NovaConfigOperatingSystemFilePlatform = 'linux' | 'macos' | 'windows';

export type Shared_NovaConfigOperatingSystemFileName =
  'appleDouble'
  | 'desktopServicesStore'
  | 'enhancedThumbnailDatabase'
  | 'enhancedVistaThumbnailDatabase'
  | 'thumbnailDatabase';

export type Shared_NovaConfigOperatingSystemFileSettings_Linux = Record<never, never>;

export type Shared_NovaConfigOperatingSystemFileSettings_Macos_AppleDouble = boolean;

export type Shared_NovaConfigOperatingSystemFileSettings_Macos_DesktopServicesStore = boolean;

export type Shared_NovaConfigOperatingSystemFileSettings_Macos = {
  appleDouble?: Shared_NovaConfigOperatingSystemFileSettings_Macos_AppleDouble;
  desktopServicesStore?: Shared_NovaConfigOperatingSystemFileSettings_Macos_DesktopServicesStore;
};

export type Shared_NovaConfigOperatingSystemFileSettings_Windows_EnhancedThumbnailDatabase = boolean;

export type Shared_NovaConfigOperatingSystemFileSettings_Windows_EnhancedVistaThumbnailDatabase = boolean;

export type Shared_NovaConfigOperatingSystemFileSettings_Windows_ThumbnailDatabase = boolean;

export type Shared_NovaConfigOperatingSystemFileSettings_Windows = {
  enhancedThumbnailDatabase?: Shared_NovaConfigOperatingSystemFileSettings_Windows_EnhancedThumbnailDatabase;
  enhancedVistaThumbnailDatabase?: Shared_NovaConfigOperatingSystemFileSettings_Windows_EnhancedVistaThumbnailDatabase;
  thumbnailDatabase?: Shared_NovaConfigOperatingSystemFileSettings_Windows_ThumbnailDatabase;
};

export type Shared_NovaConfigOperatingSystemFileSettings = {
  linux?: Shared_NovaConfigOperatingSystemFileSettings_Linux;
  macos?: Shared_NovaConfigOperatingSystemFileSettings_Macos;
  windows?: Shared_NovaConfigOperatingSystemFileSettings_Windows;
};

export type Shared_NovaConfigOperatingSystemFileRecipeEntry_Enabled = boolean;

export type Shared_NovaConfigOperatingSystemFileRecipeEntry_Settings = Shared_NovaConfigOperatingSystemFileSettings;

export type Shared_NovaConfigOperatingSystemFileRecipeEntry = {
  enabled: Shared_NovaConfigOperatingSystemFileRecipeEntry_Enabled;
  settings?: Shared_NovaConfigOperatingSystemFileRecipeEntry_Settings;
};

export type Shared_NovaConfig_Recipes_Github = {
  [K in Shared_NovaConfigGithubRecipeName]?: Shared_NovaConfig_RecipeEntry;
};

export type Shared_NovaConfigLicenseRecipeName = 'update-copyright';

export type Shared_NovaConfig_Recipes_License = {
  [K in Shared_NovaConfigLicenseRecipeName]?: Shared_NovaConfig_RecipeEntry;
};

export type Shared_NovaConfigMiscellaneousRecipeName = 'fix-markdown-tables' | 'remove-operating-system-files';

export type Shared_NovaConfig_Recipes_Miscellaneous = {
  'fix-markdown-tables'?: Shared_NovaConfig_RecipeEntry;
  'remove-operating-system-files'?: Shared_NovaConfigOperatingSystemFileRecipeEntry;
};

export type Shared_NovaConfigNovaConfigRecipeName = 'normalize-order';

export type Shared_NovaConfig_Recipes_NovaConfig = {
  [K in Shared_NovaConfigNovaConfigRecipeName]?: Shared_NovaConfig_RecipeEntry;
};

export type Shared_NovaConfigReadMeRecipeName =
  'update-badges'
  | 'update-credits'
  | 'update-documentation'
  | 'update-header'
  | 'update-introduction';

export type Shared_NovaConfig_Recipes_ReadMe = {
  [K in Shared_NovaConfigReadMeRecipeName]?: Shared_NovaConfig_RecipeEntry;
};

export type Shared_NovaConfig_Recipes_PackageJsonWorkspace = {
  [K in Shared_NovaConfigWorkspaceRecipeName]?: Shared_NovaConfig_RecipeEntry;
};

export type Shared_NovaConfig_Recipes_PackageJson = {
  [workspacePath: string]: Shared_NovaConfig_Recipes_PackageJsonWorkspace;
};

export type Shared_NovaConfig_Recipes = {
  'github'?: Shared_NovaConfig_Recipes_Github;
  'license'?: Shared_NovaConfig_Recipes_License;
  'miscellaneous'?: Shared_NovaConfig_Recipes_Miscellaneous;
  'nova-config'?: Shared_NovaConfig_Recipes_NovaConfig;
  'read-me'?: Shared_NovaConfig_Recipes_ReadMe;
  'package-json'?: Shared_NovaConfig_Recipes_PackageJson;
};

export type Shared_NovaConfig_Environment = Shared_NovaConfigEnvironment;

/**
 * Shared - Nova Config Settings - Version Strategy.
 *
 * @since 0.23.0
 */
export type Shared_NovaConfigSettings_VersionStrategy = 'semver' | 'calver';

export type Shared_NovaConfigSettings_RunWorkspacesCache_Directory = string;

export type Shared_NovaConfigSettings_RunWorkspacesCache_Enabled = boolean;

export type Shared_NovaConfigSettings_RunWorkspacesCache_Scripts = string[];

export type Shared_NovaConfigSettings_RunWorkspacesCache = {
  directory?: Shared_NovaConfigSettings_RunWorkspacesCache_Directory;
  enabled?: Shared_NovaConfigSettings_RunWorkspacesCache_Enabled;
  scripts?: Shared_NovaConfigSettings_RunWorkspacesCache_Scripts;
};

export type Shared_NovaConfigSettings_RunWorkspaces_Cache = Shared_NovaConfigSettings_RunWorkspacesCache;

export type Shared_NovaConfigSettings_RunWorkspacesConcurrency_Value = number;

export type Shared_NovaConfigSettings_RunWorkspacesConcurrency = Record<string, Shared_NovaConfigSettings_RunWorkspacesConcurrency_Value>;

export type Shared_NovaConfigSettings_RunWorkspaces_Concurrency = Shared_NovaConfigSettings_RunWorkspacesConcurrency;

export type Shared_NovaConfigSettings_RunWorkspaces_Root = 'first' | 'skip';

export type Shared_NovaConfigSettings_RunWorkspaces = {
  cache?: Shared_NovaConfigSettings_RunWorkspaces_Cache;
  concurrency?: Shared_NovaConfigSettings_RunWorkspaces_Concurrency;
  root?: Shared_NovaConfigSettings_RunWorkspaces_Root;
};

export type Shared_NovaConfig_Settings_LockStepVersioning = boolean;

export type Shared_NovaConfig_Settings_RunWorkspaces = Shared_NovaConfigSettings_RunWorkspaces;

export type Shared_NovaConfig_Settings_VersionStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Shared_NovaConfig_Settings = {
  lockStepVersioning?: Shared_NovaConfig_Settings_LockStepVersioning;
  runWorkspaces?: Shared_NovaConfig_Settings_RunWorkspaces;
  versionStrategy?: Shared_NovaConfig_Settings_VersionStrategy;
};

export type Shared_NovaConfig = {
  project?: Shared_NovaConfig_Project;
  entities?: Shared_NovaConfig_Entities;
  emails?: Shared_NovaConfig_Emails;
  github?: Shared_NovaConfig_Github;
  workflows?: Shared_NovaConfig_Workflows;
  urls?: Shared_NovaConfig_Urls;
  readme?: Shared_NovaConfig_ReadMe;
  workspaces?: Shared_NovaConfig_Workspaces;
  ignoreFiles?: Shared_NovaConfig_IgnoreFiles;
  agents?: Shared_NovaConfig_Agents;
  recipes?: Shared_NovaConfig_Recipes;
  environment?: Shared_NovaConfig_Environment;
  settings?: Shared_NovaConfig_Settings;
};

export type Shared_NovaConfigConfig = Shared_NovaConfig;

/**
 * Shared - Nova Config Category.
 *
 * @since 0.11.0
 */
export type Shared_NovaConfigCategory = 'project' | 'entities' | 'emails' | 'github' | 'urls' | 'readme' | 'workspaces' | 'workflows' | 'ignoreFiles' | 'agents' | 'recipes' | 'environment' | 'settings';

/**
 * Shared - Prompt With Cancel.
 *
 * @since 0.15.0
 */
export type Shared_PromptWithCancelResolved_Cancelled = false;

export type Shared_PromptWithCancelResolved_Result<Keys extends string, Result> = Record<Keys, Result>;

export type Shared_PromptWithCancelResolved<Keys extends string, Result> = {
  cancelled: Shared_PromptWithCancelResolved_Cancelled;
  result: Shared_PromptWithCancelResolved_Result<Keys, Result>;
};

export type Shared_PromptWithCancelReject_Cancelled = true;

export type Shared_PromptWithCancelReject = {
  cancelled: Shared_PromptWithCancelReject_Cancelled;
};

/**
 * Shared - Run Scripts Options.
 *
 * @since 0.15.0
 */
export type Shared_RunScriptsOptions_Pattern = string;

export type Shared_RunScriptsOptions_Sequential = true | undefined;

export type Shared_RunScriptsOptions_Parallel = true | undefined;

export type Shared_RunScriptsOptions_Buffer = string | undefined;

export type Shared_RunScriptsOptions_NodeEnv = string | undefined;

export type Shared_RunScriptsOptions = {
  pattern?: Shared_RunScriptsOptions_Pattern;
  sequential?: Shared_RunScriptsOptions_Sequential;
  parallel?: Shared_RunScriptsOptions_Parallel;
  buffer?: Shared_RunScriptsOptions_Buffer;
  nodeEnv?: Shared_RunScriptsOptions_NodeEnv;
};

/**
 * Shared - Run Workspaces Cache Record.
 *
 * @since 0.32.0
 */
export type Shared_RunWorkspacesCacheRecord_ContextDigest = string;

export type Shared_RunWorkspacesCacheRecord_StateDigest = string;

export type Shared_RunWorkspacesCacheRecord_Version = 1;

export type Shared_RunWorkspacesCacheRecord = {
  contextDigest: Shared_RunWorkspacesCacheRecord_ContextDigest;
  stateDigest: Shared_RunWorkspacesCacheRecord_StateDigest;
  version: Shared_RunWorkspacesCacheRecord_Version;
};

/**
 * Shared - Run Workspaces Options.
 *
 * @since 0.32.0
 */
export type Shared_RunWorkspacesOptions_Task = string;

export type Shared_RunWorkspacesOptions_Buffer = string | undefined;

export type Shared_RunWorkspacesOptions_Concurrency = string | undefined;

export type Shared_RunWorkspacesOptions_ContinueOnError = true | undefined;

export type Shared_RunWorkspacesOptions_DryRun = true | undefined;

export type Shared_RunWorkspacesOptions_ExcludeWorkspace = string[] | undefined;

export type Shared_RunWorkspacesOptions_Force = true | undefined;

export type Shared_RunWorkspacesOptions_NodeEnv = string | undefined;

export type Shared_RunWorkspacesOptions_ScriptArgs = string[] | undefined;

export type Shared_RunWorkspacesOptions_Workspace = string[] | undefined;

export type Shared_RunWorkspacesOptions = {
  task?: Shared_RunWorkspacesOptions_Task;
  buffer?: Shared_RunWorkspacesOptions_Buffer;
  concurrency?: Shared_RunWorkspacesOptions_Concurrency;
  continueOnError?: Shared_RunWorkspacesOptions_ContinueOnError;
  dryRun?: Shared_RunWorkspacesOptions_DryRun;
  excludeWorkspace?: Shared_RunWorkspacesOptions_ExcludeWorkspace;
  force?: Shared_RunWorkspacesOptions_Force;
  nodeEnv?: Shared_RunWorkspacesOptions_NodeEnv;
  scriptArgs?: Shared_RunWorkspacesOptions_ScriptArgs;
  workspace?: Shared_RunWorkspacesOptions_Workspace;
};

/**
 * Shared - Run Workspaces Output Entry.
 *
 * @since 0.32.0
 */
export type Shared_RunWorkspacesOutputEntry_Kind = 'output' | 'result';

export type Shared_RunWorkspacesOutputEntry_Key = string;

export type Shared_RunWorkspacesOutputEntry_Stream = 'stdout' | 'stderr';

export type Shared_RunWorkspacesOutputEntry_Line = string;

export type Shared_RunWorkspacesOutputEntry = {
  kind: Shared_RunWorkspacesOutputEntry_Kind;
  key: Shared_RunWorkspacesOutputEntry_Key;
  stream: Shared_RunWorkspacesOutputEntry_Stream;
  line: Shared_RunWorkspacesOutputEntry_Line;
};

export type Shared_RunWorkspacesOutputQueue = Shared_RunWorkspacesOutputEntry[];

/**
 * Shared - Run Workspaces Plan.
 *
 * @since 0.32.0
 */
export type Shared_RunWorkspacesPlan_Tasks = Map<string, Shared_RunWorkspacesTask>;

export type Shared_RunWorkspacesPlan_Skipped = string[];

export type Shared_RunWorkspacesPlan = {
  tasks: Shared_RunWorkspacesPlan_Tasks;
  skipped: Shared_RunWorkspacesPlan_Skipped;
};

/**
 * Shared - Run Workspaces Project.
 *
 * @since 0.32.0
 */
export type Shared_RunWorkspacesProject_Cache_Directory = string;

export type Shared_RunWorkspacesProject_Cache_Enabled = boolean;

export type Shared_RunWorkspacesProject_Cache_Scripts = Set<string>;

export type Shared_RunWorkspacesProject_Cache = {
  directory: Shared_RunWorkspacesProject_Cache_Directory;
  enabled: Shared_RunWorkspacesProject_Cache_Enabled;
  scripts: Shared_RunWorkspacesProject_Cache_Scripts;
};

export type Shared_RunWorkspacesProject_Concurrency = Shared_NovaConfigSettings_RunWorkspacesConcurrency;

export type Shared_RunWorkspacesProject_PackageManager = Shared_CorepackPackageManager;

export type Shared_RunWorkspacesProject_PackageManagerDescriptor = string;

export type Shared_RunWorkspacesProject_RootDirectory = string;

export type Shared_RunWorkspacesProject_Workspaces = Map<string, Shared_RunWorkspacesWorkspace>;

export type Shared_RunWorkspacesProject_Root = Shared_RunWorkspacesWorkspace | undefined;

export type Shared_RunWorkspacesProject = {
  cache: Shared_RunWorkspacesProject_Cache;
  concurrency: Shared_RunWorkspacesProject_Concurrency;
  packageManager: Shared_RunWorkspacesProject_PackageManager;
  packageManagerDescriptor: Shared_RunWorkspacesProject_PackageManagerDescriptor;
  rootDirectory: Shared_RunWorkspacesProject_RootDirectory;
  workspaces: Shared_RunWorkspacesProject_Workspaces;
  root: Shared_RunWorkspacesProject_Root;
};

/**
 * Shared - Run Workspaces State.
 *
 * @since 0.32.0
 */
export type Shared_RunWorkspacesState_Interrupted = boolean;

export type Shared_RunWorkspacesState_Stopping = boolean;

export type Shared_RunWorkspacesState = {
  interrupted: Shared_RunWorkspacesState_Interrupted;
  stopping: Shared_RunWorkspacesState_Stopping;
};

/**
 * Shared - Run Workspaces Task.
 *
 * @since 0.32.0
 */
export type Shared_RunWorkspacesTask_Key = string;

export type Shared_RunWorkspacesTask_Label = string;

export type Shared_RunWorkspacesTask_Script = string;

export type Shared_RunWorkspacesTask_Command = string;

export type Shared_RunWorkspacesTask_WorkspaceName = string;

export type Shared_RunWorkspacesTask_Directory = string;

export type Shared_RunWorkspacesTask_Dependencies = Set<string>;

export type Shared_RunWorkspacesTask_Cacheable = boolean;

export type Shared_RunWorkspacesTask = {
  key: Shared_RunWorkspacesTask_Key;
  label: Shared_RunWorkspacesTask_Label;
  script: Shared_RunWorkspacesTask_Script;
  command: Shared_RunWorkspacesTask_Command;
  workspaceName: Shared_RunWorkspacesTask_WorkspaceName;
  directory: Shared_RunWorkspacesTask_Directory;
  dependencies: Shared_RunWorkspacesTask_Dependencies;
  cacheable: Shared_RunWorkspacesTask_Cacheable;
};

/**
 * Shared - Run Workspaces Task Result.
 *
 * @since 0.32.0
 */
export type Shared_RunWorkspacesTaskResult_Key = string;

export type Shared_RunWorkspacesTaskResult_Status = 'cached' | 'cancelled' | 'failed' | 'interrupted' | 'succeeded';

export type Shared_RunWorkspacesTaskResult_ExitCode = number;

export type Shared_RunWorkspacesTaskResult_StateDigest = string | undefined;

export type Shared_RunWorkspacesTaskResult = {
  key: Shared_RunWorkspacesTaskResult_Key;
  status: Shared_RunWorkspacesTaskResult_Status;
  exitCode: Shared_RunWorkspacesTaskResult_ExitCode;
  stateDigest?: Shared_RunWorkspacesTaskResult_StateDigest;
};

/**
 * Shared - Run Workspaces Workspace.
 *
 * @since 0.32.0
 */
export type Shared_RunWorkspacesWorkspace_Path = string;

export type Shared_RunWorkspacesWorkspace_Directory = string;

export type Shared_RunWorkspacesWorkspace_Name = string;

export type Shared_RunWorkspacesWorkspace_Scripts = Record<string, string>;

export type Shared_RunWorkspacesWorkspace_Dependency = string;

export type Shared_RunWorkspacesWorkspace_Dependencies = Shared_RunWorkspacesWorkspace_Dependency[];

export type Shared_RunWorkspacesWorkspace = {
  path: Shared_RunWorkspacesWorkspace_Path;
  directory: Shared_RunWorkspacesWorkspace_Directory;
  name: Shared_RunWorkspacesWorkspace_Name;
  scripts: Shared_RunWorkspacesWorkspace_Scripts;
  dependencies: Shared_RunWorkspacesWorkspace_Dependencies;
};

/**
 * Shared - Scaffold Config.
 *
 * @since 0.15.0
 */
export type Shared_ScaffoldConfig_Mode = 'monorepo' | 'workspace';

export type Shared_ScaffoldConfig_Name = string;

export type Shared_ScaffoldConfig_OutputDirectory = string;

export type Shared_ScaffoldConfig_WorkspaceName = string;

export type Shared_ScaffoldConfig = {
  mode: Shared_ScaffoldConfig_Mode;
  name: Shared_ScaffoldConfig_Name;
  outputDirectory: Shared_ScaffoldConfig_OutputDirectory;
  workspaceName: Shared_ScaffoldConfig_WorkspaceName;
};

/**
 * Shared - Scaffold Existing Root.
 *
 * @since 0.26.0
 */
export type Shared_ScaffoldExistingRoot_Config = Record<string, unknown>;

export type Shared_ScaffoldExistingRoot_PackageJson = Record<string, unknown>;

export type Shared_ScaffoldExistingRoot_ProjectSlug = string;

export type Shared_ScaffoldExistingRoot_WorkspacePatterns = string[];

export type Shared_ScaffoldExistingRoot_Workspaces = Record<string, unknown>;

export type Shared_ScaffoldExistingRoot = {
  config: Shared_ScaffoldExistingRoot_Config;
  packageJson: Shared_ScaffoldExistingRoot_PackageJson;
  projectSlug: Shared_ScaffoldExistingRoot_ProjectSlug;
  workspacePatterns: Shared_ScaffoldExistingRoot_WorkspacePatterns;
  workspaces: Shared_ScaffoldExistingRoot_Workspaces;
};

/**
 * Shared - Scaffold Non Interactive Workspace Options.
 *
 * @since 0.26.0
 */
export type Shared_ScaffoldNonInteractiveWorkspaceOptions_Name = string;

export type Shared_ScaffoldNonInteractiveWorkspaceOptions_NonInteractive = true;

export type Shared_ScaffoldNonInteractiveWorkspaceOptions_Output = string;

export type Shared_ScaffoldNonInteractiveWorkspaceOptions_WorkspaceName = string;

export type Shared_ScaffoldNonInteractiveWorkspaceOptions = {
  name: Shared_ScaffoldNonInteractiveWorkspaceOptions_Name;
  nonInteractive: Shared_ScaffoldNonInteractiveWorkspaceOptions_NonInteractive;
  output: Shared_ScaffoldNonInteractiveWorkspaceOptions_Output;
  workspaceName: Shared_ScaffoldNonInteractiveWorkspaceOptions_WorkspaceName;
};

/**
 * Shared - Scaffold Output Contract.
 *
 * @since 0.26.0
 */
export type Shared_ScaffoldOutputContract_Name = string;

export type Shared_ScaffoldOutputContract_TemplateSubpath = string;

export type Shared_ScaffoldOutputContract_TemplateOptionSubpath = string;

export type Shared_ScaffoldOutputContract_TemplateOptionSubpaths = Shared_ScaffoldOutputContract_TemplateOptionSubpath[];

export type Shared_ScaffoldOutputContract_ExpectedFile = string;

export type Shared_ScaffoldOutputContract_ExpectedFiles = Shared_ScaffoldOutputContract_ExpectedFile[];

export type Shared_ScaffoldOutputContract_ExpectedScripts = Record<string, string>;

export type Shared_ScaffoldOutputContract_Replacements = Map<RegExp, string>;

export type Shared_ScaffoldOutputContract = {
  name: Shared_ScaffoldOutputContract_Name;
  templateSubpath: Shared_ScaffoldOutputContract_TemplateSubpath;
  templateOptionSubpaths?: Shared_ScaffoldOutputContract_TemplateOptionSubpaths;
  expectedFiles: Shared_ScaffoldOutputContract_ExpectedFiles;
  expectedScripts?: Shared_ScaffoldOutputContract_ExpectedScripts;
  replacements: Shared_ScaffoldOutputContract_Replacements;
};

/**
 * Shared - Scaffold Version Catalog.
 *
 * @since 0.32.0
 */
export type Shared_ScaffoldVersionCatalog_Entry_Value = string;

export type Shared_ScaffoldVersionCatalog_Entry_Placeholder = string;

export type Shared_ScaffoldVersionCatalog_Entry_Group = string;

export type Shared_ScaffoldVersionCatalog_Entry_Source = Record<string, unknown>;

export type Shared_ScaffoldVersionCatalog_Entry = {
  value: Shared_ScaffoldVersionCatalog_Entry_Value;
  placeholder: Shared_ScaffoldVersionCatalog_Entry_Placeholder;
  group: Shared_ScaffoldVersionCatalog_Entry_Group;
  source: Shared_ScaffoldVersionCatalog_Entry_Source;
};

export type Shared_ScaffoldVersionCatalog_SchemaVersion = number;

export type Shared_ScaffoldVersionCatalog_Entries = Record<string, Shared_ScaffoldVersionCatalog_Entry>;

export type Shared_ScaffoldVersionCatalog = {
  schemaVersion: Shared_ScaffoldVersionCatalog_SchemaVersion;
  entries: Shared_ScaffoldVersionCatalog_Entries;
};

/**
 * Shared - Scaffold Template Question.
 *
 * @since 0.26.0
 */
export type Shared_ScaffoldTemplateQuestionChoice_Description = string;

export type Shared_ScaffoldTemplateQuestionChoice_Replacement = string;

export type Shared_ScaffoldTemplateQuestionChoice_Title = string;

export type Shared_ScaffoldTemplateQuestionChoice_Value = string;

export type Shared_ScaffoldTemplateQuestionChoice = {
  description: Shared_ScaffoldTemplateQuestionChoice_Description;
  replacement?: Shared_ScaffoldTemplateQuestionChoice_Replacement;
  title: Shared_ScaffoldTemplateQuestionChoice_Title;
  value: Shared_ScaffoldTemplateQuestionChoice_Value;
};

export type Shared_ScaffoldTemplateQuestion_Choices = Shared_ScaffoldTemplateQuestionChoice[];

export type Shared_ScaffoldTemplateQuestion_DefaultValue = string;

export type Shared_ScaffoldTemplateQuestion_DependsOn_Name = string;

export type Shared_ScaffoldTemplateQuestion_DependsOn_Value = string;

export type Shared_ScaffoldTemplateQuestion_DependsOn_Values = Shared_ScaffoldTemplateQuestion_DependsOn_Value[];

export type Shared_ScaffoldTemplateQuestion_DependsOn = {
  name: Shared_ScaffoldTemplateQuestion_DependsOn_Name;
  values: Shared_ScaffoldTemplateQuestion_DependsOn_Values;
};

export type Shared_ScaffoldTemplateQuestion_Flag = string;

export type Shared_ScaffoldTemplateQuestion_FlagValue = string;

export type Shared_ScaffoldTemplateQuestion_Initial = number;

export type Shared_ScaffoldTemplateQuestion_Message = string;

export type Shared_ScaffoldTemplateQuestion_Name = string;

export type Shared_ScaffoldTemplateQuestion_Placeholder = RegExp;

export type Shared_ScaffoldTemplateQuestion = {
  choices: Shared_ScaffoldTemplateQuestion_Choices;
  defaultValue?: Shared_ScaffoldTemplateQuestion_DefaultValue;
  dependsOn?: Shared_ScaffoldTemplateQuestion_DependsOn;
  flag: Shared_ScaffoldTemplateQuestion_Flag;
  flagValue?: Shared_ScaffoldTemplateQuestion_FlagValue;
  initial: Shared_ScaffoldTemplateQuestion_Initial;
  message: Shared_ScaffoldTemplateQuestion_Message;
  name: Shared_ScaffoldTemplateQuestion_Name;
  placeholder: Shared_ScaffoldTemplateQuestion_Placeholder;
};

export type Shared_ScaffoldTemplateQuestions = Shared_ScaffoldTemplateQuestion[];

/**
 * Shared - Scaffold Template Resolution.
 *
 * @since 0.29.0
 */
export type Shared_ScaffoldTemplateResolution_AnswerName = string;

export type Shared_ScaffoldTemplateResolution_AnswerValue = string;

export type Shared_ScaffoldTemplateResolution_Answers = Map<Shared_ScaffoldTemplateResolution_AnswerName, Shared_ScaffoldTemplateResolution_AnswerValue>;

export type Shared_ScaffoldTemplateResolution_Replacements = Map<RegExp, string>;

export type Shared_ScaffoldTemplateResolution = {
  answers: Shared_ScaffoldTemplateResolution_Answers;
  replacements: Shared_ScaffoldTemplateResolution_Replacements;
};

/**
 * Shared - Shell Output.
 *
 * @since 0.15.0
 */
export type Shared_ShellOutput_TextOut = string;

export type Shared_ShellOutput_TextError = string;

export type Shared_ShellOutput_Code = number;

export type Shared_ShellOutput = {
  textOut: Shared_ShellOutput_TextOut;
  textError: Shared_ShellOutput_TextError;
  code: Shared_ShellOutput_Code;
};

/**
 * Shared - Text Align.
 *
 * @since 0.11.0
 */
export type Shared_TextAlign = 'left' | 'center' | 'right';

/**
 * Shared - Transpile.
 *
 * @since 0.30.0
 */
export type Shared_TranspileOptions_Project = string | undefined;

export type Shared_TranspileOptions_Watch = true | undefined;

export type Shared_TranspileOptions_PrintError = (message: string) => void;

export type Shared_TranspileOptions_PrintInfo = (message: string) => void;

export type Shared_TranspileOptions = {
  project: Shared_TranspileOptions_Project;
  watch: Shared_TranspileOptions_Watch;
  printError: Shared_TranspileOptions_PrintError;
  printInfo: Shared_TranspileOptions_PrintInfo;
};

export type Shared_TranspileWatcher = WatchOfConfigFile<EmitAndSemanticDiagnosticsBuilderProgram>;

export type Shared_TranspileResult = number | Shared_TranspileWatcher;

/**
 * Shared - Type Declaration Dts Mapping.
 *
 * @since 0.18.0
 */
export type Shared_TypeDeclarationDtsMapping_SourceToDts = (file: string) => string;

export type Shared_TypeDeclarationDtsMapping_DtsToSource = (file: string) => string;

export type Shared_TypeDeclarationDtsMapping = {
  sourceToDts: Shared_TypeDeclarationDtsMapping_SourceToDts;
  dtsToSource: Shared_TypeDeclarationDtsMapping_DtsToSource;
};

/**
 * Shared - Type Declaration Engine Config.
 *
 * @since 0.18.0
 */
export type Shared_TypeDeclarationEngineConfig_PackageRoot = string;

export type Shared_TypeDeclarationEngineConfig_TypeRoots = string[];

export type Shared_TypeDeclarationEngineConfig = {
  packageRoot?: Shared_TypeDeclarationEngineConfig_PackageRoot;
  typeRoots?: Shared_TypeDeclarationEngineConfig_TypeRoots;
};

/**
 * Shared - URL Protocol.
 *
 * @since 0.11.0
 */
export type Shared_UrlProtocol = 'generic' | 'repository';

/**
 * Shared - Windows Registry Keys.
 *
 * @since 0.13.0
 */
export type Shared_WindowsRegistryKey_Type =
  'REG_NONE'
  | 'REG_SZ'
  | 'REG_EXPAND_SZ'
  | 'REG_BINARY'
  | 'REG_DWORD'
  | 'REG_DWORD_LITTLE_ENDIAN'
  | 'REG_DWORD_BIG_ENDIAN'
  | 'REG_MULTI_SZ'
  | 'REG_LINK'
  | 'REG_FULL_RESOURCE_DESCRIPTOR'
  | 'REG_RESOURCE_LIST'
  | 'REG_RESOURCE_REQUIREMENTS_LIST'
  | 'REG_QWORD'
  | 'REG_QWORD_LITTLE_ENDIAN';

export type Shared_WindowsRegistryKey_Data = string;

export type Shared_WindowsRegistryKey = {
  type: Shared_WindowsRegistryKey_Type;
  data: Shared_WindowsRegistryKey_Data;
};

export type Shared_WindowsRegistryKeys = {
  [key: string]: Shared_WindowsRegistryKey;
};

/**
 * Shared - Workflow Template Permission.
 *
 * @since 0.18.0
 */
export type Shared_WorkflowTemplatePermissionRead = 'read';

export type Shared_WorkflowTemplatePermissionWrite = 'write';

export type Shared_WorkflowTemplatePermission = Shared_WorkflowTemplatePermissionRead | Shared_WorkflowTemplatePermissionWrite;

export type Shared_WorkflowTemplatePermissionKey = string;

export type Shared_WorkflowTemplatePermissions = {
  [key: Shared_WorkflowTemplatePermissionKey]: Shared_WorkflowTemplatePermission;
};

/**
 * Shared - Workflow Template Target.
 *
 * @since 0.18.0
 */
export type Shared_WorkflowTemplateTarget_Description = string;

export type Shared_WorkflowTemplateTargetArtifactPath = string;

export type Shared_WorkflowTemplateTarget_ArtifactPaths = Shared_WorkflowTemplateTargetArtifactPath[];

export type Shared_WorkflowTemplateTarget_Variables = Shared_WorkflowTemplateVariables;

export type Shared_WorkflowTemplateTargetRequiredLiteral_Description = string;

export type Shared_WorkflowTemplateTargetRequiredLiteral_Example = string;

export type Shared_WorkflowTemplateTargetRequiredLiteral = {
  description: Shared_WorkflowTemplateTargetRequiredLiteral_Description;
  example?: Shared_WorkflowTemplateTargetRequiredLiteral_Example;
};

export type Shared_WorkflowTemplateTargetRequiredLiteralName = string;

export type Shared_WorkflowTemplateTarget_RequiredLiterals = {
  [key: Shared_WorkflowTemplateTargetRequiredLiteralName]: Shared_WorkflowTemplateTargetRequiredLiteral;
};

export type Shared_WorkflowTemplateTarget_Permissions = Shared_WorkflowTemplatePermissions;

export type Shared_WorkflowTemplateTargetUniquenessKeyEntry = Shared_WorkflowTemplateVariableName;

export type Shared_WorkflowTemplateTarget_UniquenessKey = Shared_WorkflowTemplateTargetUniquenessKeyEntry[];

export type Shared_WorkflowTemplateTarget_SupportsRuntimeSecretSync = boolean;

export type Shared_WorkflowTemplateTarget = {
  description: Shared_WorkflowTemplateTarget_Description;
  artifactPaths: Shared_WorkflowTemplateTarget_ArtifactPaths;
  variables: Shared_WorkflowTemplateTarget_Variables;
  requiredLiterals?: Shared_WorkflowTemplateTarget_RequiredLiterals;
  permissions: Shared_WorkflowTemplateTarget_Permissions;
  uniquenessKey?: Shared_WorkflowTemplateTarget_UniquenessKey;
  supportsRuntimeSecretSync?: Shared_WorkflowTemplateTarget_SupportsRuntimeSecretSync;
};

export type Shared_WorkflowTemplateTargetType = string;

export type Shared_WorkflowTemplateTargets = {
  [key: Shared_WorkflowTemplateTargetType]: Shared_WorkflowTemplateTarget;
};

/**
 * Shared - Workflow Template Variable.
 *
 * @since 0.18.0
 */
export type Shared_WorkflowTemplateVariableFormatSecret = 'secret';

export type Shared_WorkflowTemplateVariableFormatVar = 'var';

export type Shared_WorkflowTemplateVariableFormatLiteral = 'literal';

export type Shared_WorkflowTemplateVariable_Format = Shared_WorkflowTemplateVariableFormatSecret | Shared_WorkflowTemplateVariableFormatVar | Shared_WorkflowTemplateVariableFormatLiteral;

export type Shared_WorkflowTemplateVariable_Default = string;

export type Shared_WorkflowTemplateVariable_Auto = true;

export type Shared_WorkflowTemplateVariable_Description = string;

export type Shared_WorkflowTemplateVariable_Example = string;

/**
 * Shared - Workflow Template Variable Scope.
 *
 * @since 0.21.0
 */
export type Shared_WorkflowTemplateVariable_Scope = 'account' | 'app';

/**
 * Shared - Workflow Template Variable Optional.
 *
 * @since 0.21.0
 */
export type Shared_WorkflowTemplateVariable_Optional = boolean;

/**
 * Shared - Workflow Template Variable.
 *
 * @since 0.18.0
 */
export type Shared_WorkflowTemplateVariable = {
  format: Shared_WorkflowTemplateVariable_Format;
  default?: Shared_WorkflowTemplateVariable_Default;
  auto?: Shared_WorkflowTemplateVariable_Auto;
  description?: Shared_WorkflowTemplateVariable_Description;
  example?: Shared_WorkflowTemplateVariable_Example;
  scope?: Shared_WorkflowTemplateVariable_Scope;
  optional?: Shared_WorkflowTemplateVariable_Optional;
};

export type Shared_WorkflowTemplateVariableName = string;

export type Shared_WorkflowTemplateVariables = {
  [key: Shared_WorkflowTemplateVariableName]: Shared_WorkflowTemplateVariable;
};

/**
 * Shared - Workspace Manifest.
 *
 * @since 0.13.0
 */
export type Shared_WorkspaceManifest_WorkspacePath = string;

export type Shared_WorkspaceManifest_Manifest = Shared_NovaConfigWorkspace;

export type Shared_WorkspaceManifest_FilePath = string;

export type Shared_WorkspaceManifest_FileContents = Record<string, unknown>;

export type Shared_WorkspaceManifest = {
  workspacePath: Shared_WorkspaceManifest_WorkspacePath;
  manifest: Shared_WorkspaceManifest_Manifest;
  filePath: Shared_WorkspaceManifest_FilePath;
  fileContents: Shared_WorkspaceManifest_FileContents;
};

/**
 * Shared - Vendor Integrations.
 *
 * @since 0.34.0
 */
export type Shared_IntegrationWorkspace_AbsolutePath = string;

export type Shared_IntegrationWorkspace_ConfiguredName = string;

export type Shared_IntegrationWorkspace_Name = string;

export type Shared_IntegrationWorkspace_Path = string;

export type Shared_IntegrationWorkspace_RelativePath = string;

export type Shared_IntegrationWorkspace = {
  absolutePath: Shared_IntegrationWorkspace_AbsolutePath;
  configuredName: Shared_IntegrationWorkspace_ConfiguredName;
  name: Shared_IntegrationWorkspace_Name;
  path: Shared_IntegrationWorkspace_Path;
  relativePath: Shared_IntegrationWorkspace_RelativePath;
};

export type Shared_IntegrationMetadataTarget_Attributes = Record<string, string>;

export type Shared_IntegrationMetadataTarget_FilePath = string;

export type Shared_IntegrationMetadataTarget_Locale = string;

export type Shared_IntegrationMetadataTarget_Platform = string;

export type Shared_IntegrationMetadataTarget = {
  attributes: Shared_IntegrationMetadataTarget_Attributes;
  filePath: Shared_IntegrationMetadataTarget_FilePath;
  locale: Shared_IntegrationMetadataTarget_Locale;
  platform: Shared_IntegrationMetadataTarget_Platform;
};

export type Shared_IntegrationAssetFile_FileName = string;

export type Shared_IntegrationAssetFile_FilePath = string;

export type Shared_IntegrationAssetFile_Position = number;

export type Shared_IntegrationAssetFile = {
  fileName: Shared_IntegrationAssetFile_FileName;
  filePath: Shared_IntegrationAssetFile_FilePath;
  position: Shared_IntegrationAssetFile_Position;
};

export type Shared_IntegrationAssetTarget_Files = Shared_IntegrationAssetFile[];

export type Shared_IntegrationAssetTarget_Locale = string;

export type Shared_IntegrationAssetTarget_Platform = string;

export type Shared_IntegrationAssetTarget_RelativePath = string;

export type Shared_IntegrationAssetTarget_Target = string;

export type Shared_IntegrationAssetTarget = {
  files: Shared_IntegrationAssetTarget_Files;
  locale: Shared_IntegrationAssetTarget_Locale;
  platform: Shared_IntegrationAssetTarget_Platform;
  relativePath: Shared_IntegrationAssetTarget_RelativePath;
  target: Shared_IntegrationAssetTarget_Target;
};

export type Shared_AppStoreConnectResource = Record<string, unknown>;

export type Shared_AppStoreConnectCredentials_IssuerId = string;

export type Shared_AppStoreConnectCredentials_KeyId = string;

export type Shared_AppStoreConnectCredentials_PrivateKey = string;

export type Shared_AppStoreConnectCredentials = {
  issuerId?: Shared_AppStoreConnectCredentials_IssuerId;
  keyId: Shared_AppStoreConnectCredentials_KeyId;
  privateKey: Shared_AppStoreConnectCredentials_PrivateKey;
};

export type Shared_AppStoreConnectRequestOptions_Body = Record<string, unknown>;

export type Shared_AppStoreConnectRequestOptions_ExpectedStatuses = number[];

export type Shared_AppStoreConnectRequestOptions_Method = string;

export type Shared_AppStoreConnectRequestOptions = {
  body?: Shared_AppStoreConnectRequestOptions_Body;
  expectedStatuses?: Shared_AppStoreConnectRequestOptions_ExpectedStatuses;
  method?: Shared_AppStoreConnectRequestOptions_Method;
};

export type Shared_AppStoreConnectIntegrationOptions_BundleId = string;

export type Shared_AppStoreConnectIntegrationOptions_DryRun = true;

export type Shared_AppStoreConnectIntegrationOptions_IssuerId = string;

export type Shared_AppStoreConnectIntegrationOptions_KeyId = string;

export type Shared_AppStoreConnectIntegrationOptions_Locales = string;

export type Shared_AppStoreConnectIntegrationOptions_NonInteractive = true;

export type Shared_AppStoreConnectIntegrationOptions_Platforms = string;

export type Shared_AppStoreConnectIntegrationOptions_Version = string;

export type Shared_AppStoreConnectIntegrationOptions_Workspace = string;

export type Shared_AppStoreConnectIntegrationOptions_Yes = true;

export type Shared_AppStoreConnectIntegrationOptions = {
  bundleId?: Shared_AppStoreConnectIntegrationOptions_BundleId;
  dryRun?: Shared_AppStoreConnectIntegrationOptions_DryRun;
  issuerId?: Shared_AppStoreConnectIntegrationOptions_IssuerId;
  keyId?: Shared_AppStoreConnectIntegrationOptions_KeyId;
  locales?: Shared_AppStoreConnectIntegrationOptions_Locales;
  nonInteractive?: Shared_AppStoreConnectIntegrationOptions_NonInteractive;
  platforms?: Shared_AppStoreConnectIntegrationOptions_Platforms;
  version?: Shared_AppStoreConnectIntegrationOptions_Version;
  workspace?: Shared_AppStoreConnectIntegrationOptions_Workspace;
  yes?: Shared_AppStoreConnectIntegrationOptions_Yes;
};

export type Shared_AppStoreConnectWorkspaceContext_BundleIdentifier = string;

export type Shared_AppStoreConnectWorkspaceContext_Version = string;

export type Shared_AppStoreConnectWorkspaceContext_Workspace = Shared_IntegrationWorkspace;

export type Shared_AppStoreConnectWorkspaceContext = {
  bundleIdentifier: Shared_AppStoreConnectWorkspaceContext_BundleIdentifier;
  version: Shared_AppStoreConnectWorkspaceContext_Version;
  workspace: Shared_AppStoreConnectWorkspaceContext_Workspace;
};

export type Shared_AppStoreConnectRemoteContext_Localization = Shared_AppStoreConnectResource;

export type Shared_AppStoreConnectRemoteContext_Version = Shared_AppStoreConnectResource;

export type Shared_AppStoreConnectRemoteContext = {
  localization: Shared_AppStoreConnectRemoteContext_Localization;
  version: Shared_AppStoreConnectRemoteContext_Version;
};

export type Shared_AppStoreConnectContextCache = Map<string, Promise<Shared_AppStoreConnectRemoteContext>>;

export type Shared_AppStoreConnectKeyCandidate_KeyId = string;

export type Shared_AppStoreConnectKeyCandidate_Path = string;

export type Shared_AppStoreConnectKeyCandidate = {
  keyId: Shared_AppStoreConnectKeyCandidate_KeyId;
  path: Shared_AppStoreConnectKeyCandidate_Path;
};

export type Shared_GooglePlayConsoleResource = Record<string, unknown>;

export type Shared_GooglePlayConsoleRequestOptions_Body = Record<string, unknown>;

export type Shared_GooglePlayConsoleRequestOptions_ExpectedStatuses = number[];

export type Shared_GooglePlayConsoleRequestOptions_Method = string;

export type Shared_GooglePlayConsoleRequestOptions = {
  body?: Shared_GooglePlayConsoleRequestOptions_Body;
  expectedStatuses?: Shared_GooglePlayConsoleRequestOptions_ExpectedStatuses;
  method?: Shared_GooglePlayConsoleRequestOptions_Method;
};

export type Shared_GooglePlayConsoleIntegrationOptions_DryRun = true;

export type Shared_GooglePlayConsoleIntegrationOptions_Locales = string;

export type Shared_GooglePlayConsoleIntegrationOptions_NonInteractive = true;

export type Shared_GooglePlayConsoleIntegrationOptions_PackageName = string;

export type Shared_GooglePlayConsoleIntegrationOptions_Workspace = string;

export type Shared_GooglePlayConsoleIntegrationOptions_Yes = true;

export type Shared_GooglePlayConsoleIntegrationOptions = {
  dryRun?: Shared_GooglePlayConsoleIntegrationOptions_DryRun;
  locales?: Shared_GooglePlayConsoleIntegrationOptions_Locales;
  nonInteractive?: Shared_GooglePlayConsoleIntegrationOptions_NonInteractive;
  packageName?: Shared_GooglePlayConsoleIntegrationOptions_PackageName;
  workspace?: Shared_GooglePlayConsoleIntegrationOptions_Workspace;
  yes?: Shared_GooglePlayConsoleIntegrationOptions_Yes;
};

export type Shared_GooglePlayConsoleWorkspaceContext_PackageName = string;

export type Shared_GooglePlayConsoleWorkspaceContext_Workspace = Shared_IntegrationWorkspace;

export type Shared_GooglePlayConsoleWorkspaceContext = {
  packageName: Shared_GooglePlayConsoleWorkspaceContext_PackageName;
  workspace: Shared_GooglePlayConsoleWorkspaceContext_Workspace;
};

export type Shared_DiscordDeveloperPortalOptions_Token = string;

export type Shared_DiscordDeveloperPortalOptions_Workspace = string;

export type Shared_DiscordDeveloperPortalOptions = {
  token?: Shared_DiscordDeveloperPortalOptions_Token;
  workspace?: Shared_DiscordDeveloperPortalOptions_Workspace;
};

/**
 * Shared - Active Vitest.
 *
 * @since 0.21.0
 */
export type Shared_ActiveVitest_Factory = () => void | Promise<void>;

export type Shared_ActiveVitest_Describe = (name: string, factory: Shared_ActiveVitest_Factory) => void;

export type Shared_ActiveVitest_It = (name: string, factory: Shared_ActiveVitest_Factory) => void;

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
  bump: Shared_ChangelogEntry_Bump;
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
 * Shared - Dialog Action.
 *
 * @since 0.11.0
 */
export type Shared_DialogAction = 'save' | 'cancel' | 'back';

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

export type Shared_BlueprintDispatchInput_Default = boolean;

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

export type Shared_BlueprintStep_Uses = string;

export type Shared_BlueprintStep_Env = Shared_BlueprintEnvMap;

export type Shared_BlueprintStep_EnvAfterRun = boolean;

export type Shared_BlueprintStep_With = Shared_BlueprintWithMap;

export type Shared_BlueprintStep_Run = string;

export type Shared_BlueprintStep_RunBlock = boolean;

export type Shared_BlueprintStep_RunPlain = boolean;

export type Shared_BlueprintStep_WorkingDirectory = string;

export type Shared_BlueprintStep_If = string;

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

export type Shared_BlueprintJob_If = string;

export type Shared_BlueprintJob_RunsOn = string;

export type Shared_BlueprintJob_TimeoutMinutes = number;

export type Shared_BlueprintJob_Permissions = Shared_BlueprintPermissions;

export type Shared_BlueprintJob_Steps = Shared_BlueprintSteps;

export type Shared_BlueprintJobNeedsEntry = string;

export type Shared_BlueprintJob_Needs = Shared_BlueprintJobNeedsEntry[];

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

export type Shared_MonorepoContext =
  Shared_MonorepoContextMonorepo
  | Shared_MonorepoContextWorkspace
  | Shared_MonorepoContextStandalone
  | Shared_MonorepoContextNested;

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
  | 'android'
  | 'java'
  | 'kotlin'
  | 'csharp'
  | 'php'
  | 'python'
  | 'macos'
  | 'linux'
  | 'windows';

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
  'sync-features'
  | 'sync-identity'
  | 'sync-policies';

export type Shared_NovaConfig_Github_Topics = string[];

export type Shared_NovaConfig_Github_Features = {
  issues?: boolean;
  wiki?: boolean;
  projects?: boolean;
  discussions?: boolean;
};

export type Shared_NovaConfig_Github_Policies_MergeMethods = {
  merge?: boolean;
  squash?: boolean;
  rebase?: boolean;
};

export type Shared_NovaConfig_Github_Policies = {
  visibility?: 'public' | 'private' | 'internal';
  defaultBranch?: string;
  mergeMethods?: Shared_NovaConfig_Github_Policies_MergeMethods;
  autoDeleteHeadBranch?: boolean;
};

export type Shared_NovaConfig_Github_IssueTemplate_BugReportField = string;

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
  issueTemplate?: Shared_NovaConfig_Github_IssueTemplate;
};

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

export type Shared_NovaConfigWorkflow_Name = string;

export type Shared_NovaConfigWorkflow_Template = string;

export type Shared_NovaConfigWorkflowTrigger = string;

export type Shared_NovaConfigWorkflow_Triggers = Shared_NovaConfigWorkflowTrigger[];

export type Shared_NovaConfigWorkflowTriggerObject_Name = string;

export type Shared_NovaConfigWorkflowTriggerObjectBranch = string;

export type Shared_NovaConfigWorkflowTriggerObject_Branches = Shared_NovaConfigWorkflowTriggerObjectBranch[];

export type Shared_NovaConfigWorkflowTriggerObjectPath = string;

export type Shared_NovaConfigWorkflowTriggerObject_Paths = Shared_NovaConfigWorkflowTriggerObjectPath[];

export type Shared_NovaConfigWorkflowTriggerObjectTag = string;

export type Shared_NovaConfigWorkflowTriggerObject_Tags = Shared_NovaConfigWorkflowTriggerObjectTag[];

export type Shared_NovaConfigWorkflowTriggerObject = {
  name: Shared_NovaConfigWorkflowTriggerObject_Name;
  branches?: Shared_NovaConfigWorkflowTriggerObject_Branches;
  paths?: Shared_NovaConfigWorkflowTriggerObject_Paths;
  tags?: Shared_NovaConfigWorkflowTriggerObject_Tags;
};

export type Shared_NovaConfigWorkflowTriggerWideEntry = Shared_NovaConfigWorkflowTrigger | Shared_NovaConfigWorkflowTriggerObject;

export type Shared_NovaConfigWorkflowTriggersWide = Shared_NovaConfigWorkflowTriggerWideEntry[];

export type Shared_NovaConfigWorkflow_DependsOn = string[];

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
  'depends-on'?: Shared_NovaConfigWorkflow_DependsOn;
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

export type Shared_BlueprintConfigWorkflow_Template = Shared_NovaConfigWorkflow_Template;

export type Shared_BlueprintConfigWorkflow_Name = Shared_NovaConfigWorkflow_Name;

export type Shared_BlueprintConfigTriggerObjectWorkflow = string;

export type Shared_BlueprintConfigTriggerObject_Workflows = Shared_BlueprintConfigTriggerObjectWorkflow[];

export type Shared_BlueprintConfigTriggerObject_Name = Shared_NovaConfigWorkflowTriggerObject_Name;

export type Shared_BlueprintConfigTriggerObject_Branches = Shared_NovaConfigWorkflowTriggerObject_Branches;

export type Shared_BlueprintConfigTriggerObject_Paths = Shared_NovaConfigWorkflowTriggerObject_Paths;

export type Shared_BlueprintConfigTriggerObject_Tags = Shared_NovaConfigWorkflowTriggerObject_Tags;

export type Shared_BlueprintConfigTriggerObject = {
  name: Shared_BlueprintConfigTriggerObject_Name;
  branches?: Shared_BlueprintConfigTriggerObject_Branches;
  paths?: Shared_BlueprintConfigTriggerObject_Paths;
  tags?: Shared_BlueprintConfigTriggerObject_Tags;
  workflows?: Shared_BlueprintConfigTriggerObject_Workflows;
};

export type Shared_BlueprintConfigTriggerWideEntry = Shared_NovaConfigWorkflowTrigger | Shared_BlueprintConfigTriggerObject;

export type Shared_BlueprintConfigWorkflow_Triggers = Shared_BlueprintConfigTriggerWideEntry[];

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

export type Shared_BlueprintPublishTargetContext = {
  workingDir: Shared_BlueprintPublishTargetContext_WorkingDir;
  artifactName: Shared_BlueprintPublishTargetContext_ArtifactName;
  needs: Shared_BlueprintPublishTargetContext_Needs;
  targetSettings?: Shared_BlueprintPublishTargetContext_TargetSettings;
  workflowSettings?: Shared_BlueprintPublishTargetContext_WorkflowSettings;
  workspace?: Shared_BlueprintPublishTargetContext_Workspace;
  environment?: Shared_BlueprintPublishTargetContext_Environment;
};

export type Shared_NovaConfigGitignoreProjectExclude = string;

export type Shared_NovaConfig_Gitignore_ProjectExcludes = Shared_NovaConfigGitignoreProjectExclude[];

export type Shared_NovaConfig_Gitignore = {
  projectExcludes?: Shared_NovaConfig_Gitignore_ProjectExcludes;
};

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
 * A key provisioned as a GitHub Variable or Secret but delivered nowhere; it carries
 * no "defaultValue" because it never reaches a ".env" or a build.
 *
 * @since 0.22.0
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

export type Shared_NovaConfig_Environment = Shared_NovaConfigEnvironment;

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

export type Shared_NovaConfig_Recipes_Github = {
  [K in Shared_NovaConfigGithubRecipeName]?: Shared_NovaConfig_RecipeEntry;
};

export type Shared_NovaConfigLicenseRecipeName = 'update-copyright';

export type Shared_NovaConfig_Recipes_License = {
  [K in Shared_NovaConfigLicenseRecipeName]?: Shared_NovaConfig_RecipeEntry;
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
  'read-me'?: Shared_NovaConfig_Recipes_ReadMe;
  'package-json'?: Shared_NovaConfig_Recipes_PackageJson;
};

export type Shared_NovaConfig_Settings = {
  lockStepVersioning?: boolean;
};

export type Shared_NovaConfig = {
  project?: Shared_NovaConfig_Project;
  entities?: Shared_NovaConfig_Entities;
  emails?: Shared_NovaConfig_Emails;
  github?: Shared_NovaConfig_Github;
  workflows?: Shared_NovaConfig_Workflows;
  urls?: Shared_NovaConfig_Urls;
  workspaces?: Shared_NovaConfig_Workspaces;
  gitignore?: Shared_NovaConfig_Gitignore;
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
export type Shared_NovaConfigCategory = 'project' | 'entities' | 'emails' | 'github' | 'urls' | 'workspaces' | 'workflows' | 'gitignore' | 'agents' | 'environment';

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

export type Shared_RunScriptsOptions = {
  pattern?: Shared_RunScriptsOptions_Pattern;
  sequential?: Shared_RunScriptsOptions_Sequential;
  parallel?: Shared_RunScriptsOptions_Parallel;
  buffer?: Shared_RunScriptsOptions_Buffer;
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

export type Shared_WorkflowTemplateTarget_Permissions = Shared_WorkflowTemplatePermissions;

export type Shared_WorkflowTemplateTargetUniquenessKeyEntry = Shared_WorkflowTemplateVariableName;

export type Shared_WorkflowTemplateTarget_UniquenessKey = Shared_WorkflowTemplateTargetUniquenessKeyEntry[];

export type Shared_WorkflowTemplateTarget_SupportsRuntimeSecretSync = boolean;

export type Shared_WorkflowTemplateTarget = {
  description: Shared_WorkflowTemplateTarget_Description;
  artifactPaths: Shared_WorkflowTemplateTarget_ArtifactPaths;
  variables: Shared_WorkflowTemplateTarget_Variables;
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

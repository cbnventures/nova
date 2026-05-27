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
export type Shared_JsdocHierarchyCreateOptionsAnchorDirectories = string[];

export type Shared_JsdocHierarchyCreateOptionsIgnoreFiles = string[];

export type Shared_JsdocHierarchyCreateOptionsKnownNames = Record<string, string>;

export type Shared_JsdocHierarchyCreateOptionsStripDirectories = string[];

export type Shared_JsdocHierarchyCreateOptions = Readonly<{
  anchorDirectories: Shared_JsdocHierarchyCreateOptionsAnchorDirectories;
  ignoreFiles: Shared_JsdocHierarchyCreateOptionsIgnoreFiles;
  knownNames: Shared_JsdocHierarchyCreateOptionsKnownNames;
  stripDirectories: Shared_JsdocHierarchyCreateOptionsStripDirectories;
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

export type Shared_NovaConfig_Github_Recipes = {
  [K in Shared_NovaConfigGithubRecipeName]?: boolean;
};

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

export type Shared_NovaConfig_Github = {
  owner?: Shared_NovaConfig_Github_Owner;
  repo?: Shared_NovaConfig_Github_Repo;
  recipes?: Shared_NovaConfig_Github_Recipes;
  topics?: Shared_NovaConfig_Github_Topics;
  features?: Shared_NovaConfig_Github_Features;
  policies?: Shared_NovaConfig_Github_Policies;
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

export type Shared_NovaConfigWorkspace_DisplayName = string;

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

export type Shared_NovaConfigWorkspaceRecipeEnabled = boolean;

export type Shared_NovaConfigWorkspaceRecipeSettings = Record<string, boolean>;

export type Shared_NovaConfigWorkspaceRecipeTupleWithSettings = [Shared_NovaConfigWorkspaceRecipeEnabled, Shared_NovaConfigWorkspaceRecipeSettings];

export type Shared_NovaConfigWorkspaceRecipeTupleWithoutSettings = [Shared_NovaConfigWorkspaceRecipeEnabled];

export type Shared_NovaConfigWorkspaceRecipeTuple = Shared_NovaConfigWorkspaceRecipeTupleWithSettings | Shared_NovaConfigWorkspaceRecipeTupleWithoutSettings;

export type Shared_NovaConfigWorkspace_Recipes = {
  [key in Shared_NovaConfigWorkspaceRecipeName]?: Shared_NovaConfigWorkspaceRecipeTuple;
};

export type Shared_NovaConfigWorkspace = {
  name: Shared_NovaConfigWorkspace_Name;
  displayName?: Shared_NovaConfigWorkspace_DisplayName;
  role: Shared_NovaConfigWorkspace_Role;
  policy: Shared_NovaConfigWorkspace_Policy;
  recipes?: Shared_NovaConfigWorkspace_Recipes;
};

export type Shared_NovaConfig_Workspaces = {
  [key: string]: Shared_NovaConfigWorkspace;
};

export type Shared_NovaConfigWorkflow_Suffix = string;

export type Shared_NovaConfigWorkflow_Template = string;

export type Shared_NovaConfigWorkflowTrigger = string;

export type Shared_NovaConfigWorkflow_Triggers = Shared_NovaConfigWorkflowTrigger[];

export type Shared_NovaConfigWorkflow_DependsOn = string[];

export type Shared_NovaConfigWorkflowScope = string;

export type Shared_NovaConfigWorkflow_Scopes = Shared_NovaConfigWorkflowScope[];

export type Shared_NovaConfigWorkflowTarget_Type = string;

export type Shared_NovaConfigWorkflowTarget_WorkingDir = string;

export type Shared_NovaConfigWorkflowTargetNeedsEntry = string;

export type Shared_NovaConfigWorkflowTarget_Needs = Shared_NovaConfigWorkflowTargetNeedsEntry[];

export type Shared_NovaConfigWorkflowTarget = {
  type: Shared_NovaConfigWorkflowTarget_Type;
  workingDir: Shared_NovaConfigWorkflowTarget_WorkingDir;
  needs?: Shared_NovaConfigWorkflowTarget_Needs;
};

export type Shared_NovaConfigWorkflow_Targets = Shared_NovaConfigWorkflowTarget[];

export type Shared_NovaConfigWorkflowSettingsKey = string;

export type Shared_NovaConfigWorkflowSettingsValue = string;

export type Shared_NovaConfigWorkflow_Settings = {
  [key: Shared_NovaConfigWorkflowSettingsKey]: Shared_NovaConfigWorkflowSettingsValue;
};

export type Shared_NovaConfigWorkflow = {
  'template': Shared_NovaConfigWorkflow_Template;
  'suffix': Shared_NovaConfigWorkflow_Suffix;
  'triggers': Shared_NovaConfigWorkflow_Triggers;
  'depends-on'?: Shared_NovaConfigWorkflow_DependsOn;
  'scopes'?: Shared_NovaConfigWorkflow_Scopes;
  'targets'?: Shared_NovaConfigWorkflow_Targets;
  'settings'?: Shared_NovaConfigWorkflow_Settings;
};

export type Shared_NovaConfig_Workflows = Shared_NovaConfigWorkflow[];

export type Shared_NovaConfig = {
  project?: Shared_NovaConfig_Project;
  entities?: Shared_NovaConfig_Entities;
  emails?: Shared_NovaConfig_Emails;
  github?: Shared_NovaConfig_Github;
  workflows?: Shared_NovaConfig_Workflows;
  urls?: Shared_NovaConfig_Urls;
  workspaces?: Shared_NovaConfig_Workspaces;
};

export type Shared_NovaConfigConfig = Shared_NovaConfig;

/**
 * Shared - Nova Config Category.
 *
 * @since 0.11.0
 */
export type Shared_NovaConfigCategory = 'project' | 'entities' | 'emails' | 'github' | 'urls' | 'workspaces' | 'workflows';

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
 * @since 0.20.0
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
 * @since 0.20.0
 */
export type Shared_WorkflowTemplateTarget_Description = string;

export type Shared_WorkflowTemplateTargetArtifactPath = string;

export type Shared_WorkflowTemplateTarget_ArtifactPaths = Shared_WorkflowTemplateTargetArtifactPath[];

export type Shared_WorkflowTemplateTarget_Variables = Shared_WorkflowTemplateVariables;

export type Shared_WorkflowTemplateTarget_Permissions = Shared_WorkflowTemplatePermissions;

export type Shared_WorkflowTemplateTarget = {
  description: Shared_WorkflowTemplateTarget_Description;
  artifactPaths: Shared_WorkflowTemplateTarget_ArtifactPaths;
  variables: Shared_WorkflowTemplateTarget_Variables;
  permissions: Shared_WorkflowTemplateTarget_Permissions;
};

export type Shared_WorkflowTemplateTargetType = string;

export type Shared_WorkflowTemplateTargets = {
  [key: Shared_WorkflowTemplateTargetType]: Shared_WorkflowTemplateTarget;
};

/**
 * Shared - Workflow Template Variable.
 *
 * @since 0.20.0
 */
export type Shared_WorkflowTemplateVariableFormatSecret = 'secret';

export type Shared_WorkflowTemplateVariableFormatVar = 'var';

export type Shared_WorkflowTemplateVariableFormatLiteral = 'literal';

export type Shared_WorkflowTemplateVariable_Format = Shared_WorkflowTemplateVariableFormatSecret | Shared_WorkflowTemplateVariableFormatVar | Shared_WorkflowTemplateVariableFormatLiteral;

export type Shared_WorkflowTemplateVariable_Default = string;

export type Shared_WorkflowTemplateVariable_Auto = true;

export type Shared_WorkflowTemplateVariable_Description = string;

export type Shared_WorkflowTemplateVariable_Example = string;

export type Shared_WorkflowTemplateVariable = {
  format: Shared_WorkflowTemplateVariable_Format;
  default?: Shared_WorkflowTemplateVariable_Default;
  auto?: Shared_WorkflowTemplateVariable_Auto;
  description?: Shared_WorkflowTemplateVariable_Description;
  example?: Shared_WorkflowTemplateVariable_Example;
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
export type Shared_WorkspaceManifest_Manifest = Shared_NovaConfigWorkspace;

export type Shared_WorkspaceManifest_FilePath = string;

export type Shared_WorkspaceManifest_FileContents = Record<string, unknown>;

export type Shared_WorkspaceManifest = {
  manifest: Shared_WorkspaceManifest_Manifest;
  filePath: Shared_WorkspaceManifest_FilePath;
  fileContents: Shared_WorkspaceManifest_FileContents;
};

/**
 * Shared - Border Characters.
 *
 * @since 0.15.0
 */
export type SharedBorderCharactersTopLeft = string;

export type SharedBorderCharactersTopRight = string;

export type SharedBorderCharactersBottomLeft = string;

export type SharedBorderCharactersBottomRight = string;

export type SharedBorderCharactersHorizontal = string;

export type SharedBorderCharactersVertical = string;

export type SharedBorderCharacters = {
  topLeft: SharedBorderCharactersTopLeft;
  topRight: SharedBorderCharactersTopRight;
  bottomLeft: SharedBorderCharactersBottomLeft;
  bottomRight: SharedBorderCharactersBottomRight;
  horizontal: SharedBorderCharactersHorizontal;
  vertical: SharedBorderCharactersVertical;
};

/**
 * Shared - Border Style.
 *
 * @since 0.11.0
 */
export type SharedBorderStyle = 'box' | 'round' | 'thick';

/**
 * Shared - Changelog Entry.
 *
 * @since 0.13.0
 */
export type SharedChangelogEntryPackage = string;

export type SharedChangelogEntryCategory = 'updated' | 'fixed' | 'added' | 'removed';

export type SharedChangelogEntryBump = 'major' | 'minor' | 'patch';

export type SharedChangelogEntryMessage = string;

export type SharedChangelogEntryFilePath = string;

export type SharedChangelogEntry = {
  package: SharedChangelogEntryPackage;
  category: SharedChangelogEntryCategory;
  bump: SharedChangelogEntryBump;
  message: SharedChangelogEntryMessage;
  filePath: SharedChangelogEntryFilePath;
};

/**
 * Shared - Changelog Options.
 *
 * @since 0.13.0
 */
export type SharedChangelogOptionsRecord = true;

export type SharedChangelogOptionsRelease = true;

export type SharedChangelogOptionsPackage = string;

export type SharedChangelogOptionsCategory = string;

export type SharedChangelogOptionsBump = string;

export type SharedChangelogOptionsMessage = string;

export type SharedChangelogOptionsDryRun = true;

export type SharedChangelogOptions = {
  record?: SharedChangelogOptionsRecord;
  release?: SharedChangelogOptionsRelease;
  package?: SharedChangelogOptionsPackage;
  category?: SharedChangelogOptionsCategory;
  bump?: SharedChangelogOptionsBump;
  message?: SharedChangelogOptionsMessage;
  dryRun?: SharedChangelogOptionsDryRun;
};

/**
 * Shared - Dialog Action.
 *
 * @since 0.11.0
 */
export type SharedDialogAction = 'save' | 'cancel' | 'back';

/**
 * Shared - Entity Menu Action.
 *
 * @since 0.11.0
 */
export type SharedEntityMenuActionAddKind = 'add';

export type SharedEntityMenuActionAdd = {
  kind: SharedEntityMenuActionAddKind;
};

export type SharedEntityMenuActionEditKind = 'edit';

export type SharedEntityMenuActionEditIndex = number;

export type SharedEntityMenuActionEdit = {
  kind: SharedEntityMenuActionEditKind;
  index: SharedEntityMenuActionEditIndex;
};

export type SharedEntityMenuActionRemoveKind = 'remove';

export type SharedEntityMenuActionRemoveIndex = number;

export type SharedEntityMenuActionRemove = {
  kind: SharedEntityMenuActionRemoveKind;
  index: SharedEntityMenuActionRemoveIndex;
};

export type SharedEntityMenuActionBackKind = 'back';

export type SharedEntityMenuActionBack = {
  kind: SharedEntityMenuActionBackKind;
};

export type SharedEntityMenuAction =
  SharedEntityMenuActionAdd
  | SharedEntityMenuActionEdit
  | SharedEntityMenuActionRemove
  | SharedEntityMenuActionBack;

/**
 * Shared - Env Entry.
 *
 * @since 0.15.0
 */
export type SharedEnvEntryKey = string;

export type SharedEnvEntryValue = string;

export type SharedEnvEntry = {
  key: SharedEnvEntryKey;
  value: SharedEnvEntryValue;
};

export type SharedEnvEntries = SharedEnvEntry[];

/**
 * Shared - Fund Platform.
 *
 * @since 0.15.0
 */
export type SharedFundPlatformId =
  'github-sponsors'
  | 'paypal'
  | 'open-collective'
  | 'ko-fi'
  | 'buy-me-a-coffee'
  | 'patreon'
  | 'liberapay'
  | 'unknown';

export type SharedFundPlatformUrl = string;

export type SharedFundPlatformLogo = string;

export type SharedFundPlatformLabel = string;

export type SharedFundPlatformAlt = string;

export type SharedFundPlatformColor = string;

export type SharedFundPlatform = {
  id: SharedFundPlatformId;
  url: SharedFundPlatformUrl;
  logo: SharedFundPlatformLogo;
  label: SharedFundPlatformLabel;
  alt: SharedFundPlatformAlt;
  color: SharedFundPlatformColor;
};

/**
 * Shared - Item Pretty Names.
 *
 * @since 0.11.0
 */
export type SharedItemPrettyNames = Record<string, string>;

/**
 * Shared - JSDoc Hierarchy Create Options.
 *
 * @since 0.15.0
 */
export type SharedJsdocHierarchyCreateOptionsAnchorDirectories = string[];

export type SharedJsdocHierarchyCreateOptionsIgnoreFiles = string[];

export type SharedJsdocHierarchyCreateOptionsKnownNames = Record<string, string>;

export type SharedJsdocHierarchyCreateOptionsStripDirectories = string[];

export type SharedJsdocHierarchyCreateOptions = Readonly<{
  anchorDirectories: SharedJsdocHierarchyCreateOptionsAnchorDirectories;
  ignoreFiles: SharedJsdocHierarchyCreateOptionsIgnoreFiles;
  knownNames: SharedJsdocHierarchyCreateOptionsKnownNames;
  stripDirectories: SharedJsdocHierarchyCreateOptionsStripDirectories;
}>;

/**
 * Shared - JSDoc Hierarchy Find Summary Info Result.
 *
 * @since 0.15.0
 */
export type SharedJsdocHierarchyFindSummaryInfoResultIndex = number;

export type SharedJsdocHierarchyFindSummaryInfoResultText = string;

export type SharedJsdocHierarchyFindSummaryInfoResult = {
  index: SharedJsdocHierarchyFindSummaryInfoResultIndex;
  text: SharedJsdocHierarchyFindSummaryInfoResultText;
};

/**
 * Shared - Linux OS Release Entries.
 *
 * @since 0.13.0
 */
export type SharedLinuxOsReleaseEntry = string;

export type SharedLinuxOsReleaseEntries = {
  [key: string]: SharedLinuxOsReleaseEntry;
};

/**
 * Shared - Logger Customize Returns.
 *
 * @since 0.15.0
 */
export type SharedLoggerCustomizeReturnsMessage = unknown[];

export type SharedLoggerCustomizeReturnsMethodReturns = void;

export type SharedLoggerCustomizeReturns = {
  debug(...message: SharedLoggerCustomizeReturnsMessage): SharedLoggerCustomizeReturnsMethodReturns;
  dev(...message: SharedLoggerCustomizeReturnsMessage): SharedLoggerCustomizeReturnsMethodReturns;
  info(...message: SharedLoggerCustomizeReturnsMessage): SharedLoggerCustomizeReturnsMethodReturns;
  warn(...message: SharedLoggerCustomizeReturnsMessage): SharedLoggerCustomizeReturnsMethodReturns;
  error(...message: SharedLoggerCustomizeReturnsMessage): SharedLoggerCustomizeReturnsMethodReturns;
};

/**
 * Shared - Log Level.
 *
 * @since 0.11.0
 */
export type SharedLogLevel =
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
export type SharedLogOptionsName = string;

export type SharedLogOptionsType = 'function' | 'method' | 'test';

export type SharedLogOptionsPurpose = string;

export type SharedLogOptionsPadTop = number;

export type SharedLogOptionsPadBottom = number;

export type SharedLogOptions = {
  name?: SharedLogOptionsName;
  type?: SharedLogOptionsType;
  purpose?: SharedLogOptionsPurpose;
  padTop?: SharedLogOptionsPadTop;
  padBottom?: SharedLogOptionsPadBottom;
};

/**
 * Shared - Log Queue Entry.
 *
 * @since 0.15.0
 */
export type SharedLogQueueEntryScript = string;

export type SharedLogQueueEntryStream = 'stdout' | 'stderr';

export type SharedLogQueueEntryLine = string;

export type SharedLogQueueEntry = {
  script: SharedLogQueueEntryScript;
  stream: SharedLogQueueEntryStream;
  line: SharedLogQueueEntryLine;
};

/**
 * Shared - Monorepo Context.
 *
 * @since 0.15.0
 */
export type SharedMonorepoContextMonorepoContext = 'monorepo';

export type SharedMonorepoContextMonorepo = {
  context: SharedMonorepoContextMonorepoContext;
};

export type SharedMonorepoContextWorkspaceContext = 'workspace';

export type SharedMonorepoContextWorkspaceRoot = string;

export type SharedMonorepoContextWorkspace = {
  context: SharedMonorepoContextWorkspaceContext;
  root: SharedMonorepoContextWorkspaceRoot;
};

export type SharedMonorepoContextStandaloneContext = 'standalone';

export type SharedMonorepoContextStandalone = {
  context: SharedMonorepoContextStandaloneContext;
};

export type SharedMonorepoContextNestedContext = 'nested';

export type SharedMonorepoContextNested = {
  context: SharedMonorepoContextNestedContext;
};

export type SharedMonorepoContext =
  SharedMonorepoContextMonorepo
  | SharedMonorepoContextWorkspace
  | SharedMonorepoContextStandalone
  | SharedMonorepoContextNested;

/**
 * Shared - Normalized Result.
 *
 * @since 0.13.0
 */
export type SharedNormalizedResultResult = true | string;

export type SharedNormalizedResultSanitized<ReturnType> = ReturnType | undefined;

export type SharedNormalizedResult<ReturnType> = {
  result: SharedNormalizedResultResult;
  sanitized: SharedNormalizedResultSanitized<ReturnType>;
};

/**
 * Shared - Nova Config.
 *
 * @since 0.11.0
 */
export type SharedNovaConfigProjectNameSlug = string;

export type SharedNovaConfigProjectNameTitle = string;

export type SharedNovaConfigProjectName = {
  slug?: SharedNovaConfigProjectNameSlug;
  title?: SharedNovaConfigProjectNameTitle;
};

export type SharedNovaConfigProjectDescriptionShort = string;

export type SharedNovaConfigProjectDescriptionLong = string;

export type SharedNovaConfigProjectDescription = {
  short?: SharedNovaConfigProjectDescriptionShort;
  long?: SharedNovaConfigProjectDescriptionLong;
};

export type SharedNovaConfigProjectKeyword = string;

export type SharedNovaConfigProjectKeywords = SharedNovaConfigProjectKeyword[];

export type SharedNovaConfigProjectLegalName = string;

export type SharedNovaConfigProjectPronouns = 'personal' | 'business';

export type SharedNovaConfigProjectPlatform =
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

export type SharedNovaConfigProjectPlatforms = SharedNovaConfigProjectPlatform[];

export type SharedNovaConfigProjectStartingYear = number;

export type SharedNovaConfigProjectLicense =
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

export type SharedNovaConfigProject = {
  name?: SharedNovaConfigProjectName;
  description?: SharedNovaConfigProjectDescription;
  keywords?: SharedNovaConfigProjectKeywords;
  legalName?: SharedNovaConfigProjectLegalName;
  pronouns?: SharedNovaConfigProjectPronouns;
  platforms?: SharedNovaConfigProjectPlatforms;
  startingYear?: SharedNovaConfigProjectStartingYear;
  license?: SharedNovaConfigProjectLicense;
};

export type SharedNovaConfigEntityName = string;

export type SharedNovaConfigEntityEmail = string;

export type SharedNovaConfigEntityUrl = string;

export type SharedNovaConfigEntityRole = 'author' | 'contributor' | 'supporter';

export type SharedNovaConfigEntityRoles = SharedNovaConfigEntityRole[];

export type SharedNovaConfigEntity = {
  name?: SharedNovaConfigEntityName;
  email?: SharedNovaConfigEntityEmail;
  url?: SharedNovaConfigEntityUrl;
  roles?: SharedNovaConfigEntityRoles;
};

export type SharedNovaConfigEntities = SharedNovaConfigEntity[];

export type SharedNovaConfigEmailsBugs = string;

export type SharedNovaConfigEmails = {
  bugs?: SharedNovaConfigEmailsBugs;
};

export type SharedNovaConfigUrlsHomepage = string;

export type SharedNovaConfigUrlsRepository = string;

export type SharedNovaConfigUrlsBugs = string;

export type SharedNovaConfigUrlsLicense = string;

export type SharedNovaConfigUrlsLogo = string;

export type SharedNovaConfigUrlsDocker = string;

export type SharedNovaConfigUrlsDocumentation = string;

export type SharedNovaConfigUrlsGitHub = string;

export type SharedNovaConfigUrlsNpm = string;

export type SharedNovaConfigUrlsFundSource = string;

export type SharedNovaConfigUrlsFundSources = SharedNovaConfigUrlsFundSource[];

export type SharedNovaConfigUrlsPrivacyPolicy = string;

export type SharedNovaConfigUrlsTermsOfUse = string;

export type SharedNovaConfigUrls = {
  homepage?: SharedNovaConfigUrlsHomepage;
  repository?: SharedNovaConfigUrlsRepository;
  bugs?: SharedNovaConfigUrlsBugs;
  license?: SharedNovaConfigUrlsLicense;
  logo?: SharedNovaConfigUrlsLogo;
  docker?: SharedNovaConfigUrlsDocker;
  documentation?: SharedNovaConfigUrlsDocumentation;
  github?: SharedNovaConfigUrlsGitHub;
  npm?: SharedNovaConfigUrlsNpm;
  fundSources?: SharedNovaConfigUrlsFundSources;
  privacyPolicy?: SharedNovaConfigUrlsPrivacyPolicy;
  termsOfUse?: SharedNovaConfigUrlsTermsOfUse;
};

export type SharedNovaConfigWorkspaceName = string;

export type SharedNovaConfigWorkspaceRole = 'project' | 'docs' | 'config' | 'app' | 'package' | 'tool' | 'template';

export type SharedNovaConfigWorkspacePolicy = 'freezable' | 'trackable' | 'distributable';

export type SharedNovaConfigWorkspaceRecipeName =
  'sync-identity'
  | 'sync-ownership'
  | 'normalize-modules'
  | 'normalize-artifacts'
  | 'sync-environment'
  | 'normalize-dependencies'
  | 'normalize-bundler'
  | 'normalize-tooling'
  | 'cleanup';

export type SharedNovaConfigWorkspaceRecipeEnabled = boolean;

export type SharedNovaConfigWorkspaceRecipeSettings = Record<string, boolean>;

export type SharedNovaConfigWorkspaceRecipeTupleWithSettings = [SharedNovaConfigWorkspaceRecipeEnabled, SharedNovaConfigWorkspaceRecipeSettings];

export type SharedNovaConfigWorkspaceRecipeTupleWithoutSettings = [SharedNovaConfigWorkspaceRecipeEnabled];

export type SharedNovaConfigWorkspaceRecipeTuple = SharedNovaConfigWorkspaceRecipeTupleWithSettings | SharedNovaConfigWorkspaceRecipeTupleWithoutSettings;

export type SharedNovaConfigWorkspaceRecipes = {
  [key in SharedNovaConfigWorkspaceRecipeName]?: SharedNovaConfigWorkspaceRecipeTuple;
};

export type SharedNovaConfigWorkspace = {
  name: SharedNovaConfigWorkspaceName;
  role: SharedNovaConfigWorkspaceRole;
  policy: SharedNovaConfigWorkspacePolicy;
  recipes?: SharedNovaConfigWorkspaceRecipes;
};

export type SharedNovaConfigWorkspaces = {
  [key: string]: SharedNovaConfigWorkspace;
};

export type SharedNovaConfigWorkflowSuffix = string;

export type SharedNovaConfigWorkflowTemplate = string;

export type SharedNovaConfigWorkflowTrigger = string;

export type SharedNovaConfigWorkflowTriggers = SharedNovaConfigWorkflowTrigger[];

export type SharedNovaConfigWorkflowDependsOn = string[];

export type SharedNovaConfigWorkflowSettingsKey = string;

export type SharedNovaConfigWorkflowSettingsValue = string;

export type SharedNovaConfigWorkflowSettings = {
  [key: SharedNovaConfigWorkflowSettingsKey]: SharedNovaConfigWorkflowSettingsValue;
};

export type SharedNovaConfigWorkflow = {
  'template': SharedNovaConfigWorkflowTemplate;
  'suffix': SharedNovaConfigWorkflowSuffix;
  'triggers': SharedNovaConfigWorkflowTriggers;
  'depends-on'?: SharedNovaConfigWorkflowDependsOn;
  'settings'?: SharedNovaConfigWorkflowSettings;
};

export type SharedNovaConfigWorkflows = SharedNovaConfigWorkflow[];

export type SharedNovaConfig = {
  project?: SharedNovaConfigProject;
  entities?: SharedNovaConfigEntities;
  emails?: SharedNovaConfigEmails;
  urls?: SharedNovaConfigUrls;
  workspaces?: SharedNovaConfigWorkspaces;
  workflows?: SharedNovaConfigWorkflows;
};

export type SharedNovaConfigConfig = SharedNovaConfig;

/**
 * Shared - Nova Config Category.
 *
 * @since 0.11.0
 */
export type SharedNovaConfigCategory = 'project' | 'entities' | 'emails' | 'urls' | 'workspaces' | 'workflows';

/**
 * Shared - Prompt With Cancel.
 *
 * @since 0.15.0
 */
export type SharedPromptWithCancelResolvedCancelled = false;

export type SharedPromptWithCancelResolvedResult<Keys extends string, Result> = Record<Keys, Result>;

export type SharedPromptWithCancelResolved<Keys extends string, Result> = {
  cancelled: SharedPromptWithCancelResolvedCancelled;
  result: SharedPromptWithCancelResolvedResult<Keys, Result>;
};

export type SharedPromptWithCancelRejectCancelled = true;

export type SharedPromptWithCancelReject = {
  cancelled: SharedPromptWithCancelRejectCancelled;
};

/**
 * Shared - Run Scripts Options.
 *
 * @since 0.15.0
 */
export type SharedRunScriptsOptionsPattern = string;

export type SharedRunScriptsOptionsSequential = true | undefined;

export type SharedRunScriptsOptionsParallel = true | undefined;

export type SharedRunScriptsOptionsBuffer = string | undefined;

export type SharedRunScriptsOptions = {
  pattern?: SharedRunScriptsOptionsPattern;
  sequential?: SharedRunScriptsOptionsSequential;
  parallel?: SharedRunScriptsOptionsParallel;
  buffer?: SharedRunScriptsOptionsBuffer;
};

/**
 * Shared - Scaffold Config.
 *
 * @since 0.15.0
 */
export type SharedScaffoldConfigMode = 'monorepo' | 'workspace';

export type SharedScaffoldConfigName = string;

export type SharedScaffoldConfigOutputDirectory = string;

export type SharedScaffoldConfigWorkspaceName = string;

export type SharedScaffoldConfig = {
  mode: SharedScaffoldConfigMode;
  name: SharedScaffoldConfigName;
  outputDirectory: SharedScaffoldConfigOutputDirectory;
  workspaceName: SharedScaffoldConfigWorkspaceName;
};

/**
 * Shared - Shell Output.
 *
 * @since 0.15.0
 */
export type SharedShellOutputTextOut = string;

export type SharedShellOutputTextError = string;

export type SharedShellOutputCode = number;

export type SharedShellOutput = {
  textOut: SharedShellOutputTextOut;
  textError: SharedShellOutputTextError;
  code: SharedShellOutputCode;
};

/**
 * Shared - Text Align.
 *
 * @since 0.11.0
 */
export type SharedTextAlign = 'left' | 'center' | 'right';

/**
 * Shared - URL Protocol.
 *
 * @since 0.11.0
 */
export type SharedUrlProtocol = 'generic' | 'repository';

/**
 * Shared - Windows Registry Keys.
 *
 * @since 0.13.0
 */
export type SharedWindowsRegistryKeyType =
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

export type SharedWindowsRegistryKeyData = string;

export type SharedWindowsRegistryKey = {
  type: SharedWindowsRegistryKeyType;
  data: SharedWindowsRegistryKeyData;
};

export type SharedWindowsRegistryKeys = {
  [key: string]: SharedWindowsRegistryKey;
};

/**
 * Shared - Workspace Manifest.
 *
 * @since 0.13.0
 */
export type SharedWorkspaceManifestManifest = SharedNovaConfigWorkspace;

export type SharedWorkspaceManifestFilePath = string;

export type SharedWorkspaceManifestFileContents = Record<string, unknown>;

export type SharedWorkspaceManifest = {
  manifest: SharedWorkspaceManifestManifest;
  filePath: SharedWorkspaceManifestFilePath;
  fileContents: SharedWorkspaceManifestFileContents;
};

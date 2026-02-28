/**
 * Border style.
 *
 * @since 1.0.0
 */
export type BorderStyle = 'box' | 'round' | 'thick';

/**
 * Changelog entry.
 *
 * @since 1.0.0
 */
export type ChangelogEntryPackage = string;

export type ChangelogEntryCategory = 'updated' | 'fixed' | 'added' | 'removed';

export type ChangelogEntryBump = 'major' | 'minor' | 'patch';

export type ChangelogEntryMessage = string;

export type ChangelogEntryFilePath = string;

export type ChangelogEntry = {
  package: ChangelogEntryPackage;
  category: ChangelogEntryCategory;
  bump: ChangelogEntryBump;
  message: ChangelogEntryMessage;
  filePath: ChangelogEntryFilePath;
};

/**
 * Changelog options.
 *
 * @since 1.0.0
 */
export type ChangelogOptionsRecord = true;

export type ChangelogOptionsRelease = true;

export type ChangelogOptionsPackage = string;

export type ChangelogOptionsCategory = string;

export type ChangelogOptionsBump = string;

export type ChangelogOptionsMessage = string;

export type ChangelogOptionsDryRun = true;

export type ChangelogOptions = {
  record?: ChangelogOptionsRecord;
  release?: ChangelogOptionsRelease;
  package?: ChangelogOptionsPackage;
  category?: ChangelogOptionsCategory;
  bump?: ChangelogOptionsBump;
  message?: ChangelogOptionsMessage;
  dryRun?: ChangelogOptionsDryRun;
};

/**
 * Dialog action.
 *
 * @since 1.0.0
 */
export type DialogAction = 'save' | 'cancel' | 'back';

/**
 * Entity menu action.
 *
 * @since 1.0.0
 */
export type EntityMenuActionAddKind = 'add';

export type EntityMenuActionAdd = {
  kind: EntityMenuActionAddKind;
};

export type EntityMenuActionEditKind = 'edit';

export type EntityMenuActionEditIndex = number;

export type EntityMenuActionEdit = {
  kind: EntityMenuActionEditKind;
  index: EntityMenuActionEditIndex;
};

export type EntityMenuActionRemoveKind = 'remove';

export type EntityMenuActionRemoveIndex = number;

export type EntityMenuActionRemove = {
  kind: EntityMenuActionRemoveKind;
  index: EntityMenuActionRemoveIndex;
};

export type EntityMenuActionBackKind = 'back';

export type EntityMenuActionBack = {
  kind: EntityMenuActionBackKind;
};

export type EntityMenuAction = EntityMenuActionAdd | EntityMenuActionEdit | EntityMenuActionRemove | EntityMenuActionBack;

/**
 * Item pretty names.
 *
 * @since 1.0.0
 */
export type ItemPrettyNames = Record<string, string>;

/**
 * Log level.
 *
 * @since 1.0.0
 */
export type LogLevel =
  'debug'
  | 'dev'
  | 'info'
  | 'warn'
  | 'error';

/**
 * Log options.
 *
 * @since 1.0.0
 */
export type LogOptionsName = string;

export type LogOptionsType = 'function' | 'method' | 'test';

export type LogOptionsPurpose = string;

export type LogOptionsPadTop = number;

export type LogOptionsPadBottom = number;

export type LogOptions = {
  name?: LogOptionsName;
  type?: LogOptionsType;
  purpose?: LogOptionsPurpose;
  padTop?: LogOptionsPadTop;
  padBottom?: LogOptionsPadBottom;
};

/**
 * Normalized result.
 *
 * @since 1.0.0
 */
export type NormalizedResultResult = true | string;

export type NormalizedResultSanitized<ReturnType> = ReturnType | undefined;

export type NormalizedResult<ReturnType> = {
  result: NormalizedResultResult;
  sanitized: NormalizedResultSanitized<ReturnType>;
};

/**
 * Linux os release entries.
 *
 * @since 1.0.0
 */
export type LinuxOsReleaseEntry = string;

export type LinuxOsReleaseEntries = {
  [key: string]: LinuxOsReleaseEntry;
};

/**
 * Nova config.
 *
 * @since 1.0.0
 */
export type NovaConfigProjectNameSlug = string;

export type NovaConfigProjectNameTitle = string;

export type NovaConfigProjectName = {
  slug?: NovaConfigProjectNameSlug;
  title?: NovaConfigProjectNameTitle;
};

export type NovaConfigProjectDescriptionShort = string;

export type NovaConfigProjectDescriptionLong = string;

export type NovaConfigProjectDescription = {
  short?: NovaConfigProjectDescriptionShort;
  long?: NovaConfigProjectDescriptionLong;
};

export type NovaConfigProjectKeyword = string;

export type NovaConfigProjectKeywords = NovaConfigProjectKeyword[];

export type NovaConfigProject = {
  name?: NovaConfigProjectName;
  description?: NovaConfigProjectDescription;
  keywords?: NovaConfigProjectKeywords;
};

export type NovaConfigEntityName = string;

export type NovaConfigEntityEmail = string;

export type NovaConfigEntityUrl = string;

export type NovaConfigEntityRole = 'author' | 'contributor' | 'supporter';

export type NovaConfigEntityRoles = NovaConfigEntityRole[];

export type NovaConfigEntity = {
  name?: NovaConfigEntityName;
  email?: NovaConfigEntityEmail;
  url?: NovaConfigEntityUrl;
  roles?: NovaConfigEntityRoles;
};

export type NovaConfigEntities = NovaConfigEntity[];

export type NovaConfigEmailsBugs = string;

export type NovaConfigEmails = {
  bugs?: NovaConfigEmailsBugs;
};

export type NovaConfigUrlsHomepage = string;

export type NovaConfigUrlsRepository = string;

export type NovaConfigUrlsBugs = string;

export type NovaConfigUrlsLicense = string;

export type NovaConfigUrlsLogo = string;

export type NovaConfigUrlsDocumentation = string;

export type NovaConfigUrlsGitHub = string;

export type NovaConfigUrlsNpm = string;

export type NovaConfigUrlsFundSource = string;

export type NovaConfigUrlsFundSources = NovaConfigUrlsFundSource[];

export type NovaConfigUrls = {
  homepage?: NovaConfigUrlsHomepage;
  repository?: NovaConfigUrlsRepository;
  bugs?: NovaConfigUrlsBugs;
  license?: NovaConfigUrlsLicense;
  logo?: NovaConfigUrlsLogo;
  documentation?: NovaConfigUrlsDocumentation;
  github?: NovaConfigUrlsGitHub;
  npm?: NovaConfigUrlsNpm;
  fundSources?: NovaConfigUrlsFundSources;
};

export type NovaConfigWorkspaceName = string;

export type NovaConfigWorkspaceRole = 'project' | 'docs' | 'config' | 'app' | 'package' | 'tool' | 'template';

export type NovaConfigWorkspacePolicy = 'freezable' | 'trackable' | 'distributable';

export type NovaConfigWorkspaceSyncProperty =
  'description'
  | 'keywords'
  | 'author'
  | 'contributors'
  | 'funding'
  | 'homepage'
  | 'repository'
  | 'bugs';

export type NovaConfigWorkspaceSyncProperties = NovaConfigWorkspaceSyncProperty[];

export type NovaConfigWorkspacePinVersions = boolean;

export type NovaConfigWorkspaceSyncLtsEngines = boolean;

export type NovaConfigWorkspace = {
  name: NovaConfigWorkspaceName;
  role: NovaConfigWorkspaceRole;
  policy: NovaConfigWorkspacePolicy;
  syncProperties?: NovaConfigWorkspaceSyncProperties;
  pinVersions?: NovaConfigWorkspacePinVersions;
  syncLtsEngines?: NovaConfigWorkspaceSyncLtsEngines;
};

export type NovaConfigWorkspaces = {
  [key: string]: NovaConfigWorkspace;
};

export type NovaConfig = {
  project?: NovaConfigProject;
  entities?: NovaConfigEntities;
  emails?: NovaConfigEmails;
  urls?: NovaConfigUrls;
  workspaces?: NovaConfigWorkspaces;
};

/**
 * Nova config category.
 *
 * @since 1.0.0
 */
export type NovaConfigCategory = 'project' | 'entities' | 'emails' | 'urls' | 'workspaces';

/**
 * Text align.
 *
 * @since 1.0.0
 */
export type TextAlign = 'left' | 'center' | 'right';

/**
 * Url protocol.
 *
 * @since 1.0.0
 */
export type UrlProtocol = 'generic' | 'repository';

/**
 * Windows registry keys.
 *
 * @since 1.0.0
 */
export type WindowsRegistryKeyType =
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

export type WindowsRegistryKeyData = string;

export type WindowsRegistryKey = {
  type: WindowsRegistryKeyType;
  data: WindowsRegistryKeyData;
};

export type WindowsRegistryKeys = {
  [key: string]: WindowsRegistryKey;
};

/**
 * Workspace manifest.
 *
 * @since 1.0.0
 */
export type WorkspaceManifestManifest = NovaConfigWorkspace;

export type WorkspaceManifestFilePath = string;

export type WorkspaceManifestFileContents = Record<string, unknown>;

export type WorkspaceManifest = {
  manifest: WorkspaceManifestManifest;
  filePath: WorkspaceManifestFilePath;
  fileContents: WorkspaceManifestFileContents;
};

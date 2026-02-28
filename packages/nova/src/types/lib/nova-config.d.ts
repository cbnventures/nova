import type {
  NovaConfig,
  NovaConfigEmails,
  NovaConfigEntities,
  NovaConfigEntity,
  NovaConfigEntityRole,
  NovaConfigProject,
  NovaConfigProjectDescription,
  NovaConfigProjectName,
  NovaConfigProjectNameSlug,
  NovaConfigUrls,
  NovaConfigWorkspaceName,
  NovaConfigWorkspaceRole,
  NovaConfigWorkspaces,
  NovaConfigWorkspaceSyncProperty,
  UrlProtocol,
} from '@/types/shared.d.ts';

/**
 * Nova Config - Config.
 *
 * @since 1.0.0
 */
export type NovaConfigConfig = NovaConfig;

/**
 * Nova Config - Get array of http urls.
 *
 * @since 1.0.0
 */
export type NovaConfigGetArrayOfHttpUrlsValue = unknown;

export type NovaConfigGetArrayOfHttpUrlsField = UrlProtocol;

export type NovaConfigGetArrayOfHttpUrlsReturns = string[] | undefined;

/**
 * Nova Config - Get array of non-empty strings.
 *
 * @since 1.0.0
 */
export type NovaConfigGetArrayOfNonEmptyStringsValue = unknown;

export type NovaConfigGetArrayOfNonEmptyStringsReturns = string[] | undefined;

/**
 * Nova Config - Get email.
 *
 * @since 1.0.0
 */
export type NovaConfigGetEmailValue = unknown;

export type NovaConfigGetEmailReturns = string | undefined;

/**
 * Nova Config - Get non-empty string.
 *
 * @since 1.0.0
 */
export type NovaConfigGetNonEmptyStringValue = unknown;

export type NovaConfigGetNonEmptyStringReturns = string | undefined;

/**
 * Nova Config - Get url.
 *
 * @since 1.0.0
 */
export type NovaConfigGetUrlValue = unknown;

export type NovaConfigGetUrlField = UrlProtocol;

export type NovaConfigGetUrlReturns = string | undefined;

/**
 * Nova Config - Is entity role.
 *
 * @since 1.0.0
 */
export type NovaConfigIsEntityRoleValue = unknown;

export type NovaConfigIsEntityRoleTypeGuard = NovaConfigEntityRole;

/**
 * Nova Config - Load.
 *
 * @since 1.0.0
 */
export type NovaConfigLoadReturns = Promise<NovaConfigConfig>;

export type NovaConfigLoadParsedFile = unknown;

/**
 * Nova Config - Parse.
 *
 * @since 1.0.0
 */
export type NovaConfigParseValue = unknown;

export type NovaConfigParseReturns = NovaConfig;

export type NovaConfigParseResult = NovaConfig;

/**
 * Nova Config - Parse emails.
 *
 * @since 1.0.0
 */
export type NovaConfigParseEmailsValue = unknown;

export type NovaConfigParseEmailsReturns = NovaConfigEmails | undefined;

export type NovaConfigParseEmailsEmails = NovaConfigEmails;

/**
 * Nova Config - Parse entities.
 *
 * @since 1.0.0
 */
export type NovaConfigParseEntitiesValue = unknown;

export type NovaConfigParseEntitiesReturns = NovaConfigEntities | undefined;

export type NovaConfigParseEntitiesParsedEntity = NovaConfigEntity;

/**
 * Nova Config - Parse project.
 *
 * @since 1.0.0
 */
export type NovaConfigParseProjectValue = unknown;

export type NovaConfigParseProjectReturns = NovaConfigProject | undefined;

export type NovaConfigParseProjectProject = NovaConfigProject;

export type NovaConfigParseProjectName = NovaConfigProjectName;

export type NovaConfigParseProjectDescription = NovaConfigProjectDescription;

/**
 * Nova Config - Parse urls.
 *
 * @since 1.0.0
 */
export type NovaConfigParseUrlsValue = unknown;

export type NovaConfigParseUrlsReturns = NovaConfigUrls | undefined;

export type NovaConfigParseUrlsUrls = NovaConfigUrls;

/**
 * Nova Config - Parse workspaces.
 *
 * @since 1.0.0
 */
export type NovaConfigParseWorkspacesValue = unknown;

export type NovaConfigParseWorkspacesSlug = NovaConfigProjectNameSlug | undefined;

export type NovaConfigParseWorkspacesReturns = NovaConfigWorkspaces | undefined;

export type NovaConfigParseWorkspacesWorkspaces = NovaConfigWorkspaces;

export type NovaConfigParseWorkspacesAllowedSyncProperties = Set<string>;

export type NovaConfigParseWorkspacesSyncProperties = NovaConfigWorkspaceSyncProperty[] | undefined;

export type NovaConfigParseWorkspacesSyncPropertiesTypeGuard = NovaConfigWorkspaceSyncProperty;

/**
 * Nova Config - Parse workspaces - Is name allowed.
 *
 * @since 1.0.0
 */
export type NovaConfigParseWorkspacesIsNameAllowedRole = NovaConfigWorkspaceRole;

export type NovaConfigParseWorkspacesIsNameAllowedName = NovaConfigWorkspaceName;

export type NovaConfigParseWorkspacesIsNameAllowedReturns = boolean;

/**
 * Nova Config - Save.
 *
 * @since 1.0.0
 */
export type NovaConfigSaveReplaceFile = boolean;

export type NovaConfigSaveReturns = Promise<void>;

/**
 * Nova Config - Set.
 *
 * @since 1.0.0
 */
export type NovaConfigSetValue = NovaConfigConfig;

export type NovaConfigSetReturns = void;

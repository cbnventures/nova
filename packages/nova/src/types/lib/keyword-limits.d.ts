import type {
  Shared_KeywordDestination,
  Shared_KeywordDestination_Kind,
  Shared_KeywordDestinations,
  Shared_NovaConfig,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Project_Keywords,
  Shared_NovaConfig_Project_Platforms,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_Recipes_Github,
  Shared_NovaConfig_Recipes_PackageJson,
  Shared_NovaConfig_Recipes_PackageJsonWorkspace,
  Shared_NovaConfigWorkspace,
} from '../shared.d.ts';

/**
 * Lib - Keyword Limits - Format Keyword Limit Message.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_FormatKeywordLimitMessage_Destination = Shared_KeywordDestination;

export type Lib_KeywordLimits_FormatKeywordLimitMessage_Keywords = Shared_NovaConfig_Project_Keywords;

export type Lib_KeywordLimits_FormatKeywordLimitMessage_Returns = string | undefined;

export type Lib_KeywordLimits_FormatKeywordLimitMessage_SourceField = string;

export type Lib_KeywordLimits_FormatKeywordLimitMessage_Fix = string;

/**
 * Lib - Keyword Limits - Is Homebridge Plugin Workspace.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_IsHomebridgePluginWorkspace_Config = Shared_NovaConfig;

export type Lib_KeywordLimits_IsHomebridgePluginWorkspace_WorkspacePath = string;

export type Lib_KeywordLimits_IsHomebridgePluginWorkspace_Returns = boolean;

export type Lib_KeywordLimits_IsHomebridgePluginWorkspace_Platforms = Shared_NovaConfig_Project_Platforms | undefined;

export type Lib_KeywordLimits_IsHomebridgePluginWorkspace_Workspace = Shared_NovaConfigWorkspace | undefined;

/**
 * Lib - Keyword Limits - Is Keyword Sync Enabled.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_IsKeywordSyncEnabled_Config = Shared_NovaConfig;

export type Lib_KeywordLimits_IsKeywordSyncEnabled_WorkspacePath = string;

export type Lib_KeywordLimits_IsKeywordSyncEnabled_Returns = boolean;

export type Lib_KeywordLimits_IsKeywordSyncEnabled_PackageJsonRecipes = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Lib_KeywordLimits_IsKeywordSyncEnabled_WorkspaceRecipes = Shared_NovaConfig_Recipes_PackageJsonWorkspace | undefined;

export type Lib_KeywordLimits_IsKeywordSyncEnabled_RecipeEntry = Shared_NovaConfig_RecipeEntry | undefined;

/**
 * Lib - Keyword Limits - Resolve Destination Keywords.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_ResolveDestinationKeywords_Destination = Shared_KeywordDestination;

export type Lib_KeywordLimits_ResolveDestinationKeywords_Config = Shared_NovaConfig;

export type Lib_KeywordLimits_ResolveDestinationKeywords_Returns = Shared_NovaConfig_Project_Keywords | undefined;

/**
 * Lib - Keyword Limits - Resolve GitHub Topics Destination.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_ResolveGithubTopicsDestination_Github = Shared_NovaConfig_Github | undefined;

export type Lib_KeywordLimits_ResolveGithubTopicsDestination_Returns = Shared_KeywordDestination;

/**
 * Lib - Keyword Limits - Resolve Homebridge Plugin Destination.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_ResolveHomebridgePluginDestination_WorkspacePath = string;

export type Lib_KeywordLimits_ResolveHomebridgePluginDestination_Returns = Shared_KeywordDestination;

/**
 * Lib - Keyword Limits - Resolve Keyword Count Limit.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_ResolveKeywordCountLimit_Config = Shared_NovaConfig;

export type Lib_KeywordLimits_ResolveKeywordCountLimit_Returns = Shared_KeywordDestination | undefined;

export type Lib_KeywordLimits_ResolveKeywordCountLimit_StrictestDestination = Shared_KeywordDestination | undefined;

/**
 * Lib - Keyword Limits - Resolve Keyword Destinations.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_ResolveKeywordDestinations_Config = Shared_NovaConfig;

export type Lib_KeywordLimits_ResolveKeywordDestinations_Returns = Shared_KeywordDestinations;

export type Lib_KeywordLimits_ResolveKeywordDestinations_Destinations = Shared_KeywordDestinations;

export type Lib_KeywordLimits_ResolveKeywordDestinations_Github = Shared_NovaConfig_Github | undefined;

export type Lib_KeywordLimits_ResolveKeywordDestinations_GithubRecipes = Shared_NovaConfig_Recipes_Github | undefined;

export type Lib_KeywordLimits_ResolveKeywordDestinations_GithubRecipeEntry = Shared_NovaConfig_RecipeEntry | undefined;

export type Lib_KeywordLimits_ResolveKeywordDestinations_WorkspacePaths = string[];

/**
 * Lib - Keyword Limits - Resolve Keyword Limit Messages.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_ResolveKeywordLimitMessages_Config = Shared_NovaConfig;

export type Lib_KeywordLimits_ResolveKeywordLimitMessages_Kind = Shared_KeywordDestination_Kind | undefined;

export type Lib_KeywordLimits_ResolveKeywordLimitMessages_Returns = string[];

export type Lib_KeywordLimits_ResolveKeywordLimitMessages_Messages = string[];

export type Lib_KeywordLimits_ResolveKeywordLimitMessages_Keywords = Shared_NovaConfig_Project_Keywords | undefined;

export type Lib_KeywordLimits_ResolveKeywordLimitMessages_Message = string | undefined;

/**
 * Lib - Keyword Limits - Resolve Project Keywords Limit Message.
 *
 * @since 0.49.0
 */
export type Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Config = Shared_NovaConfig;

export type Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Keywords = Shared_NovaConfig_Project_Keywords;

export type Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Returns = string | undefined;

export type Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Message = string | undefined;

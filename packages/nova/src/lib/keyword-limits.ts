import { LIB_REGEX_PATTERN_GITHUB_TOPIC, LIB_REGEX_PATTERN_HOMEBRIDGE_PLUGIN_NAME } from './regex.js';

import type {
  Lib_KeywordLimits_FormatKeywordLimitMessage_Destination,
  Lib_KeywordLimits_FormatKeywordLimitMessage_Fix,
  Lib_KeywordLimits_FormatKeywordLimitMessage_Keywords,
  Lib_KeywordLimits_FormatKeywordLimitMessage_Returns,
  Lib_KeywordLimits_FormatKeywordLimitMessage_SourceField,
  Lib_KeywordLimits_IsHomebridgePluginWorkspace_Config,
  Lib_KeywordLimits_IsHomebridgePluginWorkspace_Platforms,
  Lib_KeywordLimits_IsHomebridgePluginWorkspace_Returns,
  Lib_KeywordLimits_IsHomebridgePluginWorkspace_Workspace,
  Lib_KeywordLimits_IsHomebridgePluginWorkspace_WorkspacePath,
  Lib_KeywordLimits_IsKeywordSyncEnabled_Config,
  Lib_KeywordLimits_IsKeywordSyncEnabled_PackageJsonRecipes,
  Lib_KeywordLimits_IsKeywordSyncEnabled_RecipeEntry,
  Lib_KeywordLimits_IsKeywordSyncEnabled_Returns,
  Lib_KeywordLimits_IsKeywordSyncEnabled_WorkspacePath,
  Lib_KeywordLimits_IsKeywordSyncEnabled_WorkspaceRecipes,
  Lib_KeywordLimits_ResolveDestinationKeywords_Config,
  Lib_KeywordLimits_ResolveDestinationKeywords_Destination,
  Lib_KeywordLimits_ResolveDestinationKeywords_Returns,
  Lib_KeywordLimits_ResolveGithubTopicsDestination_Github,
  Lib_KeywordLimits_ResolveGithubTopicsDestination_Returns,
  Lib_KeywordLimits_ResolveHomebridgePluginDestination_Returns,
  Lib_KeywordLimits_ResolveHomebridgePluginDestination_WorkspacePath,
  Lib_KeywordLimits_ResolveKeywordCountLimit_Config,
  Lib_KeywordLimits_ResolveKeywordCountLimit_Returns,
  Lib_KeywordLimits_ResolveKeywordCountLimit_StrictestDestination,
  Lib_KeywordLimits_ResolveKeywordDestinations_Config,
  Lib_KeywordLimits_ResolveKeywordDestinations_Destinations,
  Lib_KeywordLimits_ResolveKeywordDestinations_Github,
  Lib_KeywordLimits_ResolveKeywordDestinations_GithubRecipeEntry,
  Lib_KeywordLimits_ResolveKeywordDestinations_GithubRecipes,
  Lib_KeywordLimits_ResolveKeywordDestinations_Returns,
  Lib_KeywordLimits_ResolveKeywordDestinations_WorkspacePaths,
  Lib_KeywordLimits_ResolveKeywordLimitMessages_Config,
  Lib_KeywordLimits_ResolveKeywordLimitMessages_Keywords,
  Lib_KeywordLimits_ResolveKeywordLimitMessages_Kind,
  Lib_KeywordLimits_ResolveKeywordLimitMessages_Message,
  Lib_KeywordLimits_ResolveKeywordLimitMessages_Messages,
  Lib_KeywordLimits_ResolveKeywordLimitMessages_Returns,
  Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Config,
  Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Keywords,
  Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Message,
  Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Returns,
} from '../types/lib/keyword-limits.d.ts';

/**
 * Lib - Keyword Limits - Format Keyword Limit Message.
 *
 * Builds the message for a keyword list one destination cannot accept. It names
 * the field, the broken rule, and the field changes that fix it.
 *
 * @param {Lib_KeywordLimits_FormatKeywordLimitMessage_Destination} destination - Destination.
 * @param {Lib_KeywordLimits_FormatKeywordLimitMessage_Keywords}    keywords    - Keywords.
 *
 * @returns {Lib_KeywordLimits_FormatKeywordLimitMessage_Returns}
 *
 * @since 0.49.0
 */
export function formatKeywordLimitMessage(destination: Lib_KeywordLimits_FormatKeywordLimitMessage_Destination, keywords: Lib_KeywordLimits_FormatKeywordLimitMessage_Keywords): Lib_KeywordLimits_FormatKeywordLimitMessage_Returns {
  const sourceField: Lib_KeywordLimits_FormatKeywordLimitMessage_SourceField = (destination['override'] !== undefined && destination['overrideField'] !== undefined) ? destination['overrideField'] : 'project.keywords';
  let fix: Lib_KeywordLimits_FormatKeywordLimitMessage_Fix = 'Change "project.keywords".';

  if (destination['override'] !== undefined) {
    fix = `Change "${sourceField}", or remove it to use "project.keywords" instead.`;
  } else if (destination['overrideField'] !== undefined) {
    fix = `Change "project.keywords", or set "${destination['overrideField']}" to give ${destination['label']} their own list.`;
  }

  if (
    destination['maxCount'] !== undefined
    && keywords.length > destination['maxCount']
  ) {
    return `The "${sourceField}" field has ${keywords.length} keywords, but ${destination['label']} allow at most ${destination['maxCount']}. ${fix}`;
  }

  for (const keyword of keywords) {
    if (
      destination['topicFormat'] === true
      && LIB_REGEX_PATTERN_GITHUB_TOPIC.test(keyword) === false
    ) {
      return `The "${sourceField}" field has "${keyword}", but ${destination['label']} allow only lowercase letters, numbers, and hyphens, starting with a letter or number. ${fix}`;
    }

    if (
      destination['maxLength'] !== undefined
      && keyword.length > destination['maxLength']
    ) {
      return `The "${sourceField}" field has "${keyword}" with ${keyword.length} characters, but ${destination['label']} allow at most ${destination['maxLength']} per keyword. ${fix}`;
    }
  }

  if (
    destination['requiredKeyword'] !== undefined
    && keywords.includes(destination['requiredKeyword']) === false
  ) {
    return `The "${sourceField}" field does not include "${destination['requiredKeyword']}", which ${destination['label']} must contain. Add "${destination['requiredKeyword']}" to "${sourceField}".`;
  }

  return undefined;
}

/**
 * Lib - Keyword Limits - Is Homebridge Plugin Workspace.
 *
 * Recognizes a Homebridge plugin the way the Homebridge scaffold records one: a
 * "homebridge" project platform and a distributable package named "homebridge-".
 *
 * @param {Lib_KeywordLimits_IsHomebridgePluginWorkspace_Config}        config        - Config.
 * @param {Lib_KeywordLimits_IsHomebridgePluginWorkspace_WorkspacePath} workspacePath - Workspace path.
 *
 * @returns {Lib_KeywordLimits_IsHomebridgePluginWorkspace_Returns}
 *
 * @since 0.49.0
 */
export function isHomebridgePluginWorkspace(config: Lib_KeywordLimits_IsHomebridgePluginWorkspace_Config, workspacePath: Lib_KeywordLimits_IsHomebridgePluginWorkspace_WorkspacePath): Lib_KeywordLimits_IsHomebridgePluginWorkspace_Returns {
  const platforms: Lib_KeywordLimits_IsHomebridgePluginWorkspace_Platforms = (config['project'] !== undefined) ? config['project']['platforms'] : undefined;
  const workspace: Lib_KeywordLimits_IsHomebridgePluginWorkspace_Workspace = (config['workspaces'] !== undefined) ? config['workspaces'][workspacePath] : undefined;

  return (
    platforms !== undefined
    && platforms.includes('homebridge') === true
    && workspace !== undefined
    && workspace['role'] === 'package'
    && workspace['policy'] === 'distributable'
    && LIB_REGEX_PATTERN_HOMEBRIDGE_PLUGIN_NAME.test(workspace['name']) === true
  );
}

/**
 * Lib - Keyword Limits - Is Keyword Sync Enabled.
 *
 * Reports whether the package.json sync-identity recipe copies "project.keywords"
 * into one workspace's npm keywords, which makes that workspace a destination.
 *
 * @param {Lib_KeywordLimits_IsKeywordSyncEnabled_Config}        config        - Config.
 * @param {Lib_KeywordLimits_IsKeywordSyncEnabled_WorkspacePath} workspacePath - Workspace path.
 *
 * @returns {Lib_KeywordLimits_IsKeywordSyncEnabled_Returns}
 *
 * @since 0.49.0
 */
export function isKeywordSyncEnabled(config: Lib_KeywordLimits_IsKeywordSyncEnabled_Config, workspacePath: Lib_KeywordLimits_IsKeywordSyncEnabled_WorkspacePath): Lib_KeywordLimits_IsKeywordSyncEnabled_Returns {
  const packageJsonRecipes: Lib_KeywordLimits_IsKeywordSyncEnabled_PackageJsonRecipes = (config['recipes'] !== undefined) ? config['recipes']['package-json'] : undefined;
  const workspaceRecipes: Lib_KeywordLimits_IsKeywordSyncEnabled_WorkspaceRecipes = (packageJsonRecipes !== undefined) ? packageJsonRecipes[workspacePath] : undefined;
  const recipeEntry: Lib_KeywordLimits_IsKeywordSyncEnabled_RecipeEntry = (workspaceRecipes !== undefined) ? workspaceRecipes['sync-identity'] : undefined;

  return (
    recipeEntry !== undefined
    && recipeEntry['enabled'] === true
    && recipeEntry['settings'] !== undefined
    && recipeEntry['settings']['keywords'] === true
  );
}

/**
 * Lib - Keyword Limits - Resolve Destination Keywords.
 *
 * Picks the keyword list one destination publishes. A filled-in override wins;
 * otherwise it falls back to "project.keywords".
 *
 * @param {Lib_KeywordLimits_ResolveDestinationKeywords_Destination} destination - Destination.
 * @param {Lib_KeywordLimits_ResolveDestinationKeywords_Config}      config      - Config.
 *
 * @returns {Lib_KeywordLimits_ResolveDestinationKeywords_Returns}
 *
 * @since 0.49.0
 */
export function resolveDestinationKeywords(destination: Lib_KeywordLimits_ResolveDestinationKeywords_Destination, config: Lib_KeywordLimits_ResolveDestinationKeywords_Config): Lib_KeywordLimits_ResolveDestinationKeywords_Returns {
  if (destination['override'] !== undefined) {
    return destination['override'];
  }

  return (config['project'] !== undefined) ? config['project']['keywords'] : undefined;
}

/**
 * Lib - Keyword Limits - Resolve GitHub Topics Destination.
 *
 * Describes the GitHub repository topics and their limits: at most 20 topics of
 * at most 50 lowercase letters, numbers, and hyphens, with "github.topics" as override.
 *
 * @param {Lib_KeywordLimits_ResolveGithubTopicsDestination_Github} github - Github.
 *
 * @returns {Lib_KeywordLimits_ResolveGithubTopicsDestination_Returns}
 *
 * @since 0.49.0
 */
export function resolveGithubTopicsDestination(github: Lib_KeywordLimits_ResolveGithubTopicsDestination_Github): Lib_KeywordLimits_ResolveGithubTopicsDestination_Returns {
  return {
    kind: 'github-topics',
    label: 'GitHub topics',
    maxCount: 20,
    maxLength: 50,
    topicFormat: true,
    requiredKeyword: undefined,
    overrideField: 'github.topics',
    override: (github !== undefined) ? github['topics'] : undefined,
  };
}

/**
 * Lib - Keyword Limits - Resolve Homebridge Plugin Destination.
 *
 * Describes the npm keywords of one Homebridge plugin workspace, which must
 * include "homebridge-plugin" so the Homebridge plugin search lists it.
 *
 * @param {Lib_KeywordLimits_ResolveHomebridgePluginDestination_WorkspacePath} workspacePath - Workspace path.
 *
 * @returns {Lib_KeywordLimits_ResolveHomebridgePluginDestination_Returns}
 *
 * @since 0.49.0
 */
export function resolveHomebridgePluginDestination(workspacePath: Lib_KeywordLimits_ResolveHomebridgePluginDestination_WorkspacePath): Lib_KeywordLimits_ResolveHomebridgePluginDestination_Returns {
  return {
    kind: 'homebridge-plugin',
    label: `the npm keywords of the Homebridge plugin "${workspacePath}"`,
    maxCount: undefined,
    maxLength: undefined,
    topicFormat: false,
    requiredKeyword: 'homebridge-plugin',
    overrideField: undefined,
    override: undefined,
  };
}

/**
 * Lib - Keyword Limits - Resolve Keyword Count Limit.
 *
 * Finds the active destination with the smallest keyword count that still falls
 * back to "project.keywords". Its count is the effective cap on the list.
 *
 * @param {Lib_KeywordLimits_ResolveKeywordCountLimit_Config} config - Config.
 *
 * @returns {Lib_KeywordLimits_ResolveKeywordCountLimit_Returns}
 *
 * @since 0.49.0
 */
export function resolveKeywordCountLimit(config: Lib_KeywordLimits_ResolveKeywordCountLimit_Config): Lib_KeywordLimits_ResolveKeywordCountLimit_Returns {
  let strictestDestination: Lib_KeywordLimits_ResolveKeywordCountLimit_StrictestDestination = undefined;

  for (const destination of resolveKeywordDestinations(config)) {
    if (
      destination['override'] !== undefined
      || destination['maxCount'] === undefined
    ) {
      continue;
    }

    if (
      strictestDestination === undefined
      || strictestDestination['maxCount'] === undefined
      || destination['maxCount'] < strictestDestination['maxCount']
    ) {
      strictestDestination = destination;
    }
  }

  return strictestDestination;
}

/**
 * Lib - Keyword Limits - Resolve Keyword Destinations.
 *
 * Lists every active destination that limits keywords: GitHub topics when the
 * GitHub sync-identity recipe runs, and each Homebridge plugin whose npm keywords sync.
 *
 * @param {Lib_KeywordLimits_ResolveKeywordDestinations_Config} config - Config.
 *
 * @returns {Lib_KeywordLimits_ResolveKeywordDestinations_Returns}
 *
 * @since 0.49.0
 */
export function resolveKeywordDestinations(config: Lib_KeywordLimits_ResolveKeywordDestinations_Config): Lib_KeywordLimits_ResolveKeywordDestinations_Returns {
  const destinations: Lib_KeywordLimits_ResolveKeywordDestinations_Destinations = [];
  const github: Lib_KeywordLimits_ResolveKeywordDestinations_Github = config['github'];
  const githubRecipes: Lib_KeywordLimits_ResolveKeywordDestinations_GithubRecipes = (config['recipes'] !== undefined) ? config['recipes']['github'] : undefined;
  const githubRecipeEntry: Lib_KeywordLimits_ResolveKeywordDestinations_GithubRecipeEntry = (githubRecipes !== undefined) ? githubRecipes['sync-identity'] : undefined;

  if (
    github !== undefined
    && githubRecipeEntry !== undefined
    && githubRecipeEntry['enabled'] === true
  ) {
    destinations.push(resolveGithubTopicsDestination(github));
  }

  const workspacePaths: Lib_KeywordLimits_ResolveKeywordDestinations_WorkspacePaths = Object.keys(config['workspaces'] ?? {});

  for (const workspacePath of workspacePaths) {
    if (
      isHomebridgePluginWorkspace(config, workspacePath) === true
      && isKeywordSyncEnabled(config, workspacePath) === true
    ) {
      destinations.push(resolveHomebridgePluginDestination(workspacePath));
    }
  }

  return destinations;
}

/**
 * Lib - Keyword Limits - Resolve Keyword Limit Messages.
 *
 * Checks each active destination, or only those of one kind, against the list it
 * would publish, either its own override or "project.keywords", one message per problem.
 *
 * @param {Lib_KeywordLimits_ResolveKeywordLimitMessages_Config} config - Config.
 * @param {Lib_KeywordLimits_ResolveKeywordLimitMessages_Kind}   kind   - Kind.
 *
 * @returns {Lib_KeywordLimits_ResolveKeywordLimitMessages_Returns}
 *
 * @since 0.49.0
 */
export function resolveKeywordLimitMessages(config: Lib_KeywordLimits_ResolveKeywordLimitMessages_Config, kind: Lib_KeywordLimits_ResolveKeywordLimitMessages_Kind): Lib_KeywordLimits_ResolveKeywordLimitMessages_Returns {
  const messages: Lib_KeywordLimits_ResolveKeywordLimitMessages_Messages = [];

  for (const destination of resolveKeywordDestinations(config)) {
    if (
      kind !== undefined
      && destination['kind'] !== kind
    ) {
      continue;
    }

    const keywords: Lib_KeywordLimits_ResolveKeywordLimitMessages_Keywords = resolveDestinationKeywords(destination, config);

    // Without keywords GitHub topics stay as they are, but a synced npm "keywords" field is removed.
    if (
      keywords === undefined
      && destination['requiredKeyword'] === undefined
    ) {
      continue;
    }

    const message: Lib_KeywordLimits_ResolveKeywordLimitMessages_Message = formatKeywordLimitMessage(destination, keywords ?? []);

    if (message !== undefined) {
      messages.push(message);
    }
  }

  return messages;
}

/**
 * Lib - Keyword Limits - Resolve Project Keywords Limit Message.
 *
 * Checks a candidate "project.keywords" list against every active destination
 * without an override. Configure uses it to reject input before it is saved.
 *
 * @param {Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Config}   config   - Config.
 * @param {Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Keywords} keywords - Keywords.
 *
 * @returns {Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Returns}
 *
 * @since 0.49.0
 */
export function resolveProjectKeywordsLimitMessage(config: Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Config, keywords: Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Keywords): Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Returns {
  for (const destination of resolveKeywordDestinations(config)) {
    if (destination['override'] !== undefined) {
      continue;
    }

    const message: Lib_KeywordLimits_ResolveProjectKeywordsLimitMessage_Message = formatKeywordLimitMessage(destination, keywords);

    if (message !== undefined) {
      return message;
    }
  }

  return undefined;
}

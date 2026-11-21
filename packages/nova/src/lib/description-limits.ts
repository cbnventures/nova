import type {
  Lib_DescriptionLimits_FormatDescriptionLimitMessage_Description,
  Lib_DescriptionLimits_FormatDescriptionLimitMessage_Destination,
  Lib_DescriptionLimits_FormatDescriptionLimitMessage_Returns,
  Lib_DescriptionLimits_RemoveTrailingPeriods_Returns,
  Lib_DescriptionLimits_RemoveTrailingPeriods_Trimmed,
  Lib_DescriptionLimits_RemoveTrailingPeriods_Value,
  Lib_DescriptionLimits_ResolveDescriptionDestinations_Config,
  Lib_DescriptionLimits_ResolveDescriptionDestinations_DeployTargets,
  Lib_DescriptionLimits_ResolveDescriptionDestinations_Destinations,
  Lib_DescriptionLimits_ResolveDescriptionDestinations_DockerHub,
  Lib_DescriptionLimits_ResolveDescriptionDestinations_Returns,
  Lib_DescriptionLimits_ResolveDescriptionDestinations_SeenTargets,
  Lib_DescriptionLimits_ResolveDescriptionDestinations_TargetKey,
  Lib_DescriptionLimits_ResolveDescriptionDestinations_Workflows,
  Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Config,
  Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Description,
  Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Destinations,
  Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Message,
  Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Messages,
  Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Returns,
  Lib_DescriptionLimits_ResolveDestinationDescription_Config,
  Lib_DescriptionLimits_ResolveDestinationDescription_Destination,
  Lib_DescriptionLimits_ResolveDestinationDescription_Returns,
  Lib_DescriptionLimits_ResolveDestinationDescription_ShortDescription,
  Lib_DescriptionLimits_ResolveDockerHubDescriptionDestination_DockerHub,
  Lib_DescriptionLimits_ResolveDockerHubDescriptionDestination_Returns,
  Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_GithubAction,
  Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Returns,
  Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Workspace,
  Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_WorkspacePath,
  Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Workspaces,
  Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Pfsense,
  Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Returns,
  Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Workspace,
  Lib_DescriptionLimits_ResolvePfsenseCommentDestination_WorkspacePath,
  Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Workspaces,
  Lib_DescriptionLimits_ResolveShortDescriptionLimit_Config,
  Lib_DescriptionLimits_ResolveShortDescriptionLimit_Destinations,
  Lib_DescriptionLimits_ResolveShortDescriptionLimit_Returns,
  Lib_DescriptionLimits_ResolveShortDescriptionLimit_StrictestDestination,
  Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Config,
  Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Description,
  Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Destinations,
  Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Message,
  Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Returns,
  Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_ShortDescription,
} from '../types/lib/description-limits.d.ts';

/**
 * Lib - Description Limits - Format Description Limit Message.
 *
 * Builds the message for a description one destination cannot accept. It names the
 * destination, the limit, the actual length, and the field changes that fix it.
 *
 * @param {Lib_DescriptionLimits_FormatDescriptionLimitMessage_Destination} destination - Destination.
 * @param {Lib_DescriptionLimits_FormatDescriptionLimitMessage_Description} description - Description.
 *
 * @returns {Lib_DescriptionLimits_FormatDescriptionLimitMessage_Returns}
 *
 * @since 0.49.0
 */
export function formatDescriptionLimitMessage(destination: Lib_DescriptionLimits_FormatDescriptionLimitMessage_Destination, description: Lib_DescriptionLimits_FormatDescriptionLimitMessage_Description): Lib_DescriptionLimits_FormatDescriptionLimitMessage_Returns {
  if (
    destination['kind'] === 'pfsense'
    && destination['override'] !== undefined
    && destination['override'].trimEnd().endsWith('.') === true
  ) {
    return `The "${destination['overrideField']}" field ends with a period, which ${destination['label']} does not allow. Remove the trailing period.`;
  }

  if (description.length <= destination['limit']) {
    return undefined;
  }

  if (destination['override'] !== undefined) {
    return `The "${destination['overrideField']}" field has ${description.length} characters, but ${destination['label']} allows at most ${destination['limit']}. Shorten "${destination['overrideField']}", or remove it to use "project.description.short" instead.`;
  }

  return `The "project.description.short" field has ${description.length} characters, but ${destination['label']} allows at most ${destination['limit']}. Shorten "project.description.short", or set "${destination['overrideField']}" to give ${destination['label']} its own text.`;
}

/**
 * Lib - Description Limits - Resolve Description Destinations.
 *
 * Lists every active destination that caps the description length: Docker Hub
 * with "dockerHub", and each "github-action" and "pfsense" deploy target.
 *
 * @param {Lib_DescriptionLimits_ResolveDescriptionDestinations_Config} config - Config.
 *
 * @returns {Lib_DescriptionLimits_ResolveDescriptionDestinations_Returns}
 *
 * @since 0.49.0
 */
export function resolveDescriptionDestinations(config: Lib_DescriptionLimits_ResolveDescriptionDestinations_Config): Lib_DescriptionLimits_ResolveDescriptionDestinations_Returns {
  const destinations: Lib_DescriptionLimits_ResolveDescriptionDestinations_Destinations = [];
  const dockerHub: Lib_DescriptionLimits_ResolveDescriptionDestinations_DockerHub = config['dockerHub'];

  if (dockerHub !== undefined) {
    destinations.push(resolveDockerHubDescriptionDestination(dockerHub));
  }

  const workflows: Lib_DescriptionLimits_ResolveDescriptionDestinations_Workflows = config['workflows'] ?? [];
  const seenTargets: Lib_DescriptionLimits_ResolveDescriptionDestinations_SeenTargets = new Set();

  for (const workflow of workflows) {
    const deployTargets: Lib_DescriptionLimits_ResolveDescriptionDestinations_DeployTargets = workflow['deploy'] ?? [];

    for (const deployTarget of deployTargets) {
      const targetKey: Lib_DescriptionLimits_ResolveDescriptionDestinations_TargetKey = `${deployTarget['to']}:${deployTarget['path']}`;

      if (seenTargets.has(targetKey) === true) {
        continue;
      }

      seenTargets.add(targetKey);

      if (deployTarget['to'] === 'github-action') {
        destinations.push(resolveGithubActionDescriptionDestination(config['workspaces'], deployTarget['path']));
      }

      if (deployTarget['to'] === 'pfsense') {
        destinations.push(resolvePfsenseCommentDestination(config['workspaces'], deployTarget['path']));
      }
    }
  }

  return destinations;
}

/**
 * Lib - Description Limits - Resolve Description Limit Messages.
 *
 * Checks each active destination against the value it would publish, either its
 * own override or the short description, and returns one message per problem.
 *
 * @param {Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Config} config - Config.
 *
 * @returns {Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Returns}
 *
 * @since 0.49.0
 */
export function resolveDescriptionLimitMessages(config: Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Config): Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Returns {
  const destinations: Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Destinations = resolveDescriptionDestinations(config);
  const messages: Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Messages = [];

  for (const destination of destinations) {
    const description: Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Description = resolveDestinationDescription(destination, config);

    if (description === undefined) {
      continue;
    }

    const message: Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Message = formatDescriptionLimitMessage(destination, description);

    if (message !== undefined) {
      messages.push(message);
    }
  }

  return messages;
}

/**
 * Lib - Description Limits - Resolve Destination Description.
 *
 * Picks the text one destination publishes. A filled-in override wins; otherwise
 * it falls back to the short description, without a trailing period for pfSense.
 *
 * @param {Lib_DescriptionLimits_ResolveDestinationDescription_Destination} destination - Destination.
 * @param {Lib_DescriptionLimits_ResolveDestinationDescription_Config}      config      - Config.
 *
 * @returns {Lib_DescriptionLimits_ResolveDestinationDescription_Returns}
 *
 * @since 0.49.0
 */
export function resolveDestinationDescription(destination: Lib_DescriptionLimits_ResolveDestinationDescription_Destination, config: Lib_DescriptionLimits_ResolveDestinationDescription_Config): Lib_DescriptionLimits_ResolveDestinationDescription_Returns {
  if (destination['override'] !== undefined) {
    return destination['override'];
  }

  const shortDescription: Lib_DescriptionLimits_ResolveDestinationDescription_ShortDescription = (
    config['project'] !== undefined
    && config['project']['description'] !== undefined
  ) ? config['project']['description']['short'] : undefined;

  if (shortDescription === undefined) {
    return undefined;
  }

  if (destination['kind'] === 'pfsense') {
    return removeTrailingPeriods(shortDescription);
  }

  return shortDescription;
}

/**
 * Lib - Description Limits - Resolve Docker Hub Description Destination.
 *
 * Describes the Docker Hub short description and its 100-character limit.
 * The Docker Hub recipe and the config checks read the same override field.
 *
 * @param {Lib_DescriptionLimits_ResolveDockerHubDescriptionDestination_DockerHub} dockerHub - Docker hub.
 *
 * @returns {Lib_DescriptionLimits_ResolveDockerHubDescriptionDestination_Returns}
 *
 * @since 0.49.0
 */
export function resolveDockerHubDescriptionDestination(dockerHub: Lib_DescriptionLimits_ResolveDockerHubDescriptionDestination_DockerHub): Lib_DescriptionLimits_ResolveDockerHubDescriptionDestination_Returns {
  return {
    kind: 'docker-hub',
    label: 'Docker Hub',
    limit: 100,
    overrideField: 'dockerHub.description',
    override: dockerHub['description'],
  };
}

/**
 * Lib - Description Limits - Resolve GitHub Action Description Destination.
 *
 * Describes the GitHub Marketplace description of one action workspace and its
 * 125-character limit, reading that workspace's own override when it is set.
 *
 * @param {Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Workspaces}    workspaces    - Workspaces.
 * @param {Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_WorkspacePath} workspacePath - Workspace path.
 *
 * @returns {Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Returns}
 *
 * @since 0.49.0
 */
export function resolveGithubActionDescriptionDestination(workspaces: Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Workspaces, workspacePath: Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_WorkspacePath): Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Returns {
  const workspace: Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Workspace = (workspaces !== undefined) ? workspaces[workspacePath] : undefined;
  const githubAction: Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_GithubAction = (workspace !== undefined) ? workspace['githubAction'] : undefined;

  return {
    kind: 'github-action',
    label: 'the GitHub Marketplace',
    limit: 125,
    overrideField: `workspaces["${workspacePath}"].githubAction.description`,
    override: (githubAction !== undefined) ? githubAction['description'] : undefined,
  };
}

/**
 * Lib - Description Limits - Resolve Pfsense Comment Destination.
 *
 * Describes the FreeBSD port COMMENT of one pfSense workspace and its 70-character
 * limit, reading that workspace's own "comment" override when it is set.
 *
 * @param {Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Workspaces}    workspaces    - Workspaces.
 * @param {Lib_DescriptionLimits_ResolvePfsenseCommentDestination_WorkspacePath} workspacePath - Workspace path.
 *
 * @returns {Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Returns}
 *
 * @since 0.49.0
 */
export function resolvePfsenseCommentDestination(workspaces: Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Workspaces, workspacePath: Lib_DescriptionLimits_ResolvePfsenseCommentDestination_WorkspacePath): Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Returns {
  const workspace: Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Workspace = (workspaces !== undefined) ? workspaces[workspacePath] : undefined;
  const pfsense: Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Pfsense = (workspace !== undefined) ? workspace['pfsense'] : undefined;

  return {
    kind: 'pfsense',
    label: `the FreeBSD port COMMENT of "${workspacePath}"`,
    limit: 70,
    overrideField: `workspaces["${workspacePath}"].pfsense.comment`,
    override: (pfsense !== undefined) ? pfsense['comment'] : undefined,
  };
}

/**
 * Lib - Description Limits - Resolve Short Description Limit.
 *
 * Finds the strictest active destination that still falls back to the short
 * description. Its limit is the effective cap on "project.description.short".
 *
 * @param {Lib_DescriptionLimits_ResolveShortDescriptionLimit_Config} config - Config.
 *
 * @returns {Lib_DescriptionLimits_ResolveShortDescriptionLimit_Returns}
 *
 * @since 0.49.0
 */
export function resolveShortDescriptionLimit(config: Lib_DescriptionLimits_ResolveShortDescriptionLimit_Config): Lib_DescriptionLimits_ResolveShortDescriptionLimit_Returns {
  const destinations: Lib_DescriptionLimits_ResolveShortDescriptionLimit_Destinations = resolveDescriptionDestinations(config);
  let strictestDestination: Lib_DescriptionLimits_ResolveShortDescriptionLimit_StrictestDestination = undefined;

  for (const destination of destinations) {
    if (destination['override'] !== undefined) {
      continue;
    }

    if (
      strictestDestination === undefined
      || destination['limit'] < strictestDestination['limit']
    ) {
      strictestDestination = destination;
    }
  }

  return strictestDestination;
}

/**
 * Lib - Description Limits - Resolve Short Description Limit Message.
 *
 * Checks a candidate short description against every active destination that
 * has no override. Configure uses it to reject input before it is saved.
 *
 * @param {Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Config}           config           - Config.
 * @param {Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_ShortDescription} shortDescription - Short description.
 *
 * @returns {Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Returns}
 *
 * @since 0.49.0
 */
export function resolveShortDescriptionLimitMessage(config: Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Config, shortDescription: Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_ShortDescription): Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Returns {
  const destinations: Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Destinations = resolveDescriptionDestinations(config).filter((destination) => destination['override'] === undefined);

  destinations.sort((destinationA, destinationB) => destinationA['limit'] - destinationB['limit']);

  for (const destination of destinations) {
    const description: Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Description = (destination['kind'] === 'pfsense') ? removeTrailingPeriods(shortDescription) : shortDescription;
    const message: Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Message = formatDescriptionLimitMessage(destination, description);

    if (message !== undefined) {
      return message;
    }
  }

  return undefined;
}

/**
 * Lib - Description Limits - Remove Trailing Periods.
 *
 * Strips trailing whitespace and periods so a sentence-style short description
 * becomes a valid FreeBSD port COMMENT, which must not end with a period.
 *
 * @param {Lib_DescriptionLimits_RemoveTrailingPeriods_Value} value - Value.
 *
 * @returns {Lib_DescriptionLimits_RemoveTrailingPeriods_Returns}
 *
 * @since 0.49.0
 */
function removeTrailingPeriods(value: Lib_DescriptionLimits_RemoveTrailingPeriods_Value): Lib_DescriptionLimits_RemoveTrailingPeriods_Returns {
  let trimmed: Lib_DescriptionLimits_RemoveTrailingPeriods_Trimmed = value.trimEnd();

  while (trimmed.endsWith('.') === true) {
    trimmed = trimmed.slice(0, -1).trimEnd();
  }

  return trimmed;
}

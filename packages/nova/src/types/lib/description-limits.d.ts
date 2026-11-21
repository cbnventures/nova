import type {
  Shared_DescriptionDestination,
  Shared_DescriptionDestinations,
  Shared_NovaConfig,
  Shared_NovaConfig_DockerHub,
  Shared_NovaConfig_Workflows,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigWorkflow_Deploy,
  Shared_NovaConfigWorkspace,
  Shared_NovaConfigWorkspace_GithubAction,
  Shared_NovaConfigWorkspace_Pfsense,
} from '../shared.d.ts';

/**
 * Lib - Description Limits - Format Description Limit Message.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_FormatDescriptionLimitMessage_Destination = Shared_DescriptionDestination;

export type Lib_DescriptionLimits_FormatDescriptionLimitMessage_Description = string;

export type Lib_DescriptionLimits_FormatDescriptionLimitMessage_Returns = string | undefined;

/**
 * Lib - Description Limits - Remove Trailing Periods.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_RemoveTrailingPeriods_Value = string;

export type Lib_DescriptionLimits_RemoveTrailingPeriods_Returns = string;

export type Lib_DescriptionLimits_RemoveTrailingPeriods_Trimmed = string;

/**
 * Lib - Description Limits - Resolve Description Destinations.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_ResolveDescriptionDestinations_Config = Shared_NovaConfig;

export type Lib_DescriptionLimits_ResolveDescriptionDestinations_Returns = Shared_DescriptionDestinations;

export type Lib_DescriptionLimits_ResolveDescriptionDestinations_Destinations = Shared_DescriptionDestinations;

export type Lib_DescriptionLimits_ResolveDescriptionDestinations_DockerHub = Shared_NovaConfig_DockerHub | undefined;

export type Lib_DescriptionLimits_ResolveDescriptionDestinations_Workflows = Shared_NovaConfig_Workflows;

export type Lib_DescriptionLimits_ResolveDescriptionDestinations_SeenTargets = Set<string>;

export type Lib_DescriptionLimits_ResolveDescriptionDestinations_DeployTargets = Shared_NovaConfigWorkflow_Deploy;

export type Lib_DescriptionLimits_ResolveDescriptionDestinations_TargetKey = string;

/**
 * Lib - Description Limits - Resolve Description Limit Messages.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Config = Shared_NovaConfig;

export type Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Returns = string[];

export type Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Destinations = Shared_DescriptionDestinations;

export type Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Messages = string[];

export type Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Description = string | undefined;

export type Lib_DescriptionLimits_ResolveDescriptionLimitMessages_Message = string | undefined;

/**
 * Lib - Description Limits - Resolve Destination Description.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_ResolveDestinationDescription_Destination = Shared_DescriptionDestination;

export type Lib_DescriptionLimits_ResolveDestinationDescription_Config = Shared_NovaConfig;

export type Lib_DescriptionLimits_ResolveDestinationDescription_Returns = string | undefined;

export type Lib_DescriptionLimits_ResolveDestinationDescription_ShortDescription = string | undefined;

/**
 * Lib - Description Limits - Resolve Docker Hub Description Destination.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_ResolveDockerHubDescriptionDestination_DockerHub = Shared_NovaConfig_DockerHub;

export type Lib_DescriptionLimits_ResolveDockerHubDescriptionDestination_Returns = Shared_DescriptionDestination;

/**
 * Lib - Description Limits - Resolve GitHub Action Description Destination.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Workspaces = Shared_NovaConfig_Workspaces | undefined;

export type Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_WorkspacePath = string;

export type Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Returns = Shared_DescriptionDestination;

export type Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_Workspace = Shared_NovaConfigWorkspace | undefined;

export type Lib_DescriptionLimits_ResolveGithubActionDescriptionDestination_GithubAction = Shared_NovaConfigWorkspace_GithubAction | undefined;

/**
 * Lib - Description Limits - Resolve Pfsense Comment Destination.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Workspaces = Shared_NovaConfig_Workspaces | undefined;

export type Lib_DescriptionLimits_ResolvePfsenseCommentDestination_WorkspacePath = string;

export type Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Returns = Shared_DescriptionDestination;

export type Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Workspace = Shared_NovaConfigWorkspace | undefined;

export type Lib_DescriptionLimits_ResolvePfsenseCommentDestination_Pfsense = Shared_NovaConfigWorkspace_Pfsense | undefined;

/**
 * Lib - Description Limits - Resolve Short Description Limit.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_ResolveShortDescriptionLimit_Config = Shared_NovaConfig;

export type Lib_DescriptionLimits_ResolveShortDescriptionLimit_Returns = Shared_DescriptionDestination | undefined;

export type Lib_DescriptionLimits_ResolveShortDescriptionLimit_Destinations = Shared_DescriptionDestinations;

export type Lib_DescriptionLimits_ResolveShortDescriptionLimit_StrictestDestination = Shared_DescriptionDestination | undefined;

/**
 * Lib - Description Limits - Resolve Short Description Limit Message.
 *
 * @since 0.49.0
 */
export type Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Config = Shared_NovaConfig;

export type Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_ShortDescription = string;

export type Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Returns = string | undefined;

export type Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Destinations = Shared_DescriptionDestinations;

export type Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Description = string;

export type Lib_DescriptionLimits_ResolveShortDescriptionLimitMessage_Message = string | undefined;

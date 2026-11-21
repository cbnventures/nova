import type {
  Shared_CoverageBadge,
  Shared_NovaConfig,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Workspaces,
} from '../shared.d.ts';

/**
 * Lib - Coverage Badge - Resolve Coverage Badge.
 *
 * @since 0.49.0
 */
export type Lib_CoverageBadge_ResolveCoverageBadge_Config = Shared_NovaConfig;

export type Lib_CoverageBadge_ResolveCoverageBadge_Returns = Shared_CoverageBadge | undefined;

export type Lib_CoverageBadge_ResolveCoverageBadge_Minimum = number | undefined;

export type Lib_CoverageBadge_ResolveCoverageBadge_Documentation = string;

export type Lib_CoverageBadge_ResolveCoverageBadge_Workspaces = Shared_NovaConfig_Workspaces;

export type Lib_CoverageBadge_ResolveCoverageBadge_DocsPath = string | undefined;

/**
 * Lib - Coverage Badge - Resolve Coverage Badge Endpoint URL.
 *
 * @since 0.49.0
 */
export type Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Config = Shared_NovaConfig;

export type Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Returns = string | undefined;

export type Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Badge = Shared_CoverageBadge | undefined;

export type Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Documentation = string;

export type Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_DocumentationBase = string;

export type Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Github = Shared_NovaConfig_Github | undefined;

export type Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Owner = string;

export type Lib_CoverageBadge_ResolveCoverageBadgeEndpointUrl_Repo = string;

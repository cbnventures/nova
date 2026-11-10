import type {
  Shared_DockerHubRepository,
  Shared_DockerHubResponse,
  Shared_NovaConfig_DockerHub,
  Shared_NovaConfig_DockerHub_ImmutableTags,
  Shared_NovaConfigDockerHubVisibility,
} from '../../../shared.d.ts';
import type { Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Result } from './docker-hub-precheck.d.ts';

/**
 * CLI - Recipe - Docker Hub - Sync Policies - Run.
 *
 * @since 0.40.0
 */
export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Options = {
  dryRun?: Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Precheck = Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Result | undefined;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_DockerHub = Shared_NovaConfig_DockerHub;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Namespace = string;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_RepositoryName = string;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Token = string;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Repository = Shared_DockerHubRepository;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_Visibility = Shared_NovaConfigDockerHubVisibility | undefined;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTags = Shared_NovaConfig_DockerHub_ImmutableTags | undefined;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_DesiredIsPrivate = boolean;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_VisibilityChanged = boolean;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_VisibilityStatus = string;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsChanged = boolean;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsLabel = string;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsStatus = string;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_PrivacyResponse = Shared_DockerHubResponse;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_ImmutableTagsResponse = Shared_DockerHubResponse;

export type Cli_Recipe_DockerHub_SyncPolicies_Runner_Run_HasChanges = boolean;

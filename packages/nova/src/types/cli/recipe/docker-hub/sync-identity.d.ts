import type {
  Shared_DockerHubCategories,
  Shared_DockerHubCategory,
  Shared_DockerHubRepository,
  Shared_DockerHubResponse,
  Shared_NovaConfig_DockerHub,
  Shared_NovaConfigConfig,
} from '../../../shared.d.ts';
import type { Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Result } from './docker-hub-precheck.d.ts';

/**
 * CLI - Recipe - Docker Hub - Sync Identity - Run.
 *
 * @since 0.40.0
 */
export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Options = {
  dryRun?: Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Precheck = Cli_Recipe_DockerHub_DockerHubPrecheck_DockerHubPrecheck_Result | undefined;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DockerHub = Shared_NovaConfig_DockerHub;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Namespace = string;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_RepositoryName = string;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Token = string;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Repository = Shared_DockerHubRepository;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Description = string | undefined;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_ReadmePath = string;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_HasReadme = boolean;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Overview = string | undefined;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategorySlugs = string[] | undefined;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_Categories = Shared_DockerHubCategories | undefined;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_LiveCategories = Shared_DockerHubCategories | undefined;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_LiveCategory = Shared_DockerHubCategory | undefined;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DescriptionChanged = boolean;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_OverviewChanged = boolean;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CurrentCategorySlugs = string[];

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DesiredCategorySlugs = string[];

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoriesChanged = boolean;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_DescriptionStatus = string;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_OverviewLength = string;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_OverviewStatus = string;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoryNames = string;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoriesStatus = string;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_IdentityResponse = Shared_DockerHubResponse;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_CategoriesResponse = Shared_DockerHubResponse;

export type Cli_Recipe_DockerHub_SyncIdentity_Runner_Run_HasChanges = boolean;

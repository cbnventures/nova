import type { LibNovaConfig } from '../../../../lib/nova-config.js';

import type {
  SharedNovaConfigConfig,
  SharedNovaConfigEntities,
  SharedNovaConfigEntity,
  SharedNovaConfigWorkspace,
  SharedNovaConfigWorkspaceRecipes,
  SharedNovaConfigWorkspaceRecipeSettings,
  SharedNovaConfigWorkspaceRecipeTuple,
  SharedWorkspaceManifest,
} from '../../../shared.d.ts';

/**
 * CLI - Recipe - package.json - Sync Ownership - Handle.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonSyncOwnershipHandleWorkspace = SharedWorkspaceManifest;

export type CliRecipePackageJsonSyncOwnershipHandleWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonSyncOwnershipHandleReturns = void;

export type CliRecipePackageJsonSyncOwnershipHandleFileContents = Record<string, unknown>;

export type CliRecipePackageJsonSyncOwnershipHandleManifest = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonSyncOwnershipHandlePackageHomepage = unknown;

export type CliRecipePackageJsonSyncOwnershipHandlePackageBugs = unknown;

export type CliRecipePackageJsonSyncOwnershipHandlePackageAuthor = unknown;

export type CliRecipePackageJsonSyncOwnershipHandlePackageContributors = unknown;

export type CliRecipePackageJsonSyncOwnershipHandlePackageFundingSources = unknown;

export type CliRecipePackageJsonSyncOwnershipHandlePackageRepository = unknown;

export type CliRecipePackageJsonSyncOwnershipHandleRecipes = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleRecipeTuple = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleRecipeSettings = SharedNovaConfigWorkspaceRecipeSettings | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidHomepage = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidBugsEmail = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidBugsUrl = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidBugs = {
  email: CliRecipePackageJsonSyncOwnershipHandleValidBugsEmail;
  url: CliRecipePackageJsonSyncOwnershipHandleValidBugsUrl;
};

export type CliRecipePackageJsonSyncOwnershipHandleValidAuthorName = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidAuthorEmail = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidAuthorUrl = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidAuthor = {
  name: CliRecipePackageJsonSyncOwnershipHandleValidAuthorName;
  email: CliRecipePackageJsonSyncOwnershipHandleValidAuthorEmail;
  url: CliRecipePackageJsonSyncOwnershipHandleValidAuthorUrl;
};

export type CliRecipePackageJsonSyncOwnershipHandleAuthorEntity = SharedNovaConfigEntity | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidContributorName = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidContributorEmail = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidContributorUrl = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidContributor = {
  name: CliRecipePackageJsonSyncOwnershipHandleValidContributorName;
  email: CliRecipePackageJsonSyncOwnershipHandleValidContributorEmail;
  url: CliRecipePackageJsonSyncOwnershipHandleValidContributorUrl;
};

export type CliRecipePackageJsonSyncOwnershipHandleValidContributors = CliRecipePackageJsonSyncOwnershipHandleValidContributor[];

export type CliRecipePackageJsonSyncOwnershipHandleEntities = SharedNovaConfigEntities;

export type CliRecipePackageJsonSyncOwnershipHandleValidFundingSources = string[] | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleValidRepositoryType = string;

export type CliRecipePackageJsonSyncOwnershipHandleValidRepositoryUrl = string;

export type CliRecipePackageJsonSyncOwnershipHandleValidRepositoryDirectory = string;

export type CliRecipePackageJsonSyncOwnershipHandleValidRepository = {
  type: CliRecipePackageJsonSyncOwnershipHandleValidRepositoryType;
  url: CliRecipePackageJsonSyncOwnershipHandleValidRepositoryUrl;
  directory?: CliRecipePackageJsonSyncOwnershipHandleValidRepositoryDirectory;
} | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleRepositoryUrl = string | undefined;

export type CliRecipePackageJsonSyncOwnershipHandleProjectRoot = string;

export type CliRecipePackageJsonSyncOwnershipHandlePackageDirectory = string;

export type CliRecipePackageJsonSyncOwnershipHandleRelativeDirectory = string;

export type CliRecipePackageJsonSyncOwnershipHandleRepositoryDirectory = string;

/**
 * CLI - Recipe - package.json - Sync Ownership - Run.
 *
 * @since 0.14.0
 */
export type CliRecipePackageJsonSyncOwnershipRunOptionsDryRun = true;

export type CliRecipePackageJsonSyncOwnershipRunOptionsReplaceFile = true;

export type CliRecipePackageJsonSyncOwnershipRunOptions = {
  dryRun?: CliRecipePackageJsonSyncOwnershipRunOptionsDryRun;
  replaceFile?: CliRecipePackageJsonSyncOwnershipRunOptionsReplaceFile;
};

export type CliRecipePackageJsonSyncOwnershipRunReturns = Promise<void>;

export type CliRecipePackageJsonSyncOwnershipRunCurrentDirectory = string;

export type CliRecipePackageJsonSyncOwnershipRunIsAtProjectRoot = boolean;

export type CliRecipePackageJsonSyncOwnershipRunIsDryRun = boolean;

export type CliRecipePackageJsonSyncOwnershipRunIsReplaceFile = boolean;

export type CliRecipePackageJsonSyncOwnershipRunReplaceFileNotice = string;

export type CliRecipePackageJsonSyncOwnershipRunNovaConfig = LibNovaConfig;

export type CliRecipePackageJsonSyncOwnershipRunWorkingFile = SharedNovaConfigConfig;

export type CliRecipePackageJsonSyncOwnershipRunWorkingFileWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonSyncOwnershipRunEligibleWorkspaces = [string, SharedNovaConfigWorkspace][];

export type CliRecipePackageJsonSyncOwnershipRunWorkspaceConfigFilter = SharedNovaConfigWorkspace;

export type CliRecipePackageJsonSyncOwnershipRunWorkspaceRecipesFilter = SharedNovaConfigWorkspaceRecipes | undefined;

export type CliRecipePackageJsonSyncOwnershipRunRecipeTupleFilter = SharedNovaConfigWorkspaceRecipeTuple | undefined;

export type CliRecipePackageJsonSyncOwnershipRunWorkspaces = SharedWorkspaceManifest[];

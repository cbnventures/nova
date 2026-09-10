import type {
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Features,
  Shared_ShellOutput,
} from '../../../shared.d.ts';
import type { Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result } from './gh-precheck.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Features - Run.
 *
 * @since 0.18.0
 */
export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Github_SyncFeatures_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Precheck = Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Github = Shared_NovaConfig_Github;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Owner = string;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Repo = string;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Features = Shared_NovaConfig_Github_Features | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Flags = string[];

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_Sponsorships = boolean | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_RepoEditCommand = string | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_SponsorshipsCommand = string | undefined;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_RepositoryIdCommand = string;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_RepositoryIdResult = Shared_ShellOutput;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_RepositoryId = string;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_SponsorshipsMutation = string;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_RepoEditResult = Shared_ShellOutput;

export type Cli_Recipe_Github_SyncFeatures_Runner_Run_SponsorshipsResult = Shared_ShellOutput;

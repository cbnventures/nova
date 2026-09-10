import type {
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Labels,
} from '../../../shared.d.ts';
import type { Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result } from './gh-precheck.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Labels - Run.
 *
 * @since 0.26.0
 */
export type Cli_Recipe_Github_SyncLabels_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Github_SyncLabels_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Github_SyncLabels_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Github_SyncLabels_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Github_SyncLabels_Runner_Run_Precheck = Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result | undefined;

export type Cli_Recipe_Github_SyncLabels_Runner_Run_Github = Shared_NovaConfig_Github;

export type Cli_Recipe_Github_SyncLabels_Runner_Run_Owner = string;

export type Cli_Recipe_Github_SyncLabels_Runner_Run_Repo = string;

export type Cli_Recipe_Github_SyncLabels_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Github_SyncLabels_Runner_Run_Labels = Shared_NovaConfig_Github_Labels | undefined;

export type Cli_Recipe_Github_SyncLabels_Runner_Run_Commands = string[];

export type Cli_Recipe_Github_SyncLabels_Runner_Run_Description = string;

export type Cli_Recipe_Github_SyncLabels_Runner_Run_DidSucceed = boolean;

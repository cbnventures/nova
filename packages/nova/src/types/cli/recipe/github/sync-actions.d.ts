import type {
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Actions,
  Shared_NovaConfig_Github_Actions_SelectedActions,
} from '../../../shared.d.ts';
import type { Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result } from './gh-precheck.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Actions - Run.
 *
 * @since 0.26.0
 */
export type Cli_Recipe_Github_SyncActions_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Github_SyncActions_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Github_SyncActions_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Github_SyncActions_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Github_SyncActions_Runner_Run_Precheck = Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result | undefined;

export type Cli_Recipe_Github_SyncActions_Runner_Run_Github = Shared_NovaConfig_Github;

export type Cli_Recipe_Github_SyncActions_Runner_Run_Owner = string;

export type Cli_Recipe_Github_SyncActions_Runner_Run_Repo = string;

export type Cli_Recipe_Github_SyncActions_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Github_SyncActions_Runner_Run_Actions = Shared_NovaConfig_Github_Actions | undefined;

export type Cli_Recipe_Github_SyncActions_Runner_Run_SelectedActions = Shared_NovaConfig_Github_Actions_SelectedActions | undefined;

export type Cli_Recipe_Github_SyncActions_Runner_Run_Commands = string[];

export type Cli_Recipe_Github_SyncActions_Runner_Run_PermissionFlags = string[];

export type Cli_Recipe_Github_SyncActions_Runner_Run_SelectedActionFlags = string[];

export type Cli_Recipe_Github_SyncActions_Runner_Run_WorkflowFlags = string[];

export type Cli_Recipe_Github_SyncActions_Runner_Run_DidSucceed = boolean;

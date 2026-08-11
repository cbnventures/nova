import type {
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Policies,
  Shared_NovaConfig_Github_Policies_MergeMethods,
  Shared_ShellOutput,
} from '../../../shared.d.ts';
import type { Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result } from './gh-precheck.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Policies - Run.
 *
 * @since 0.18.0
 */
export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Github_SyncPolicies_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Precheck = Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result | undefined;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Github = Shared_NovaConfig_Github;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Owner = string;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Repo = string;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Policies = Shared_NovaConfig_Github_Policies | undefined;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Flags = string[];

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_BranchResult = Shared_ShellOutput;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_MergeMethods = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Command = string;

export type Cli_Recipe_Github_SyncPolicies_Runner_Run_Result = Shared_ShellOutput;

import type {
  Shared_KeywordDestination,
  Shared_NovaConfig_Github,
  Shared_NovaConfigConfig,
  Shared_ShellOutput,
} from '../../../shared.d.ts';
import type { Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result } from './gh-precheck.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Identity - Run.
 *
 * @since 0.18.0
 */
export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Github_SyncIdentity_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Precheck = Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_WorkingFile = Shared_NovaConfigConfig;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Github = Shared_NovaConfig_Github;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Owner = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Repo = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Description = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Homepage = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsDestination = Shared_KeywordDestination;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Keywords = string[] | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsLimitMessage = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_Topics = string[] | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_EditCommand = string | undefined;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_EditResult = Shared_ShellOutput;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsCommand = string;

export type Cli_Recipe_Github_SyncIdentity_Runner_Run_TopicsResult = Shared_ShellOutput;

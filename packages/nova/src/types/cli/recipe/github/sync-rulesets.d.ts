import type {
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Rulesets,
  Shared_NovaConfig_Github_Rulesets_DefaultBranch,
  Shared_NovaConfig_Github_Rulesets_DefaultBranch_AllowedMergeMethods,
  Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusChecks,
  Shared_NovaConfigGithubRulesetEnforcement,
  Shared_ShellOutput,
} from '../../../shared.d.ts';
import type { Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result } from './gh-precheck.d.ts';

/**
 * CLI - Recipe - GitHub - Sync Rulesets - Run.
 *
 * @since 0.26.0
 */
export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Options_DryRun = true;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Options = {
  dryRun?: Cli_Recipe_Github_SyncRulesets_Runner_Run_Options_DryRun;
};

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Returns = Promise<void>;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Precheck = Cli_Recipe_Github_GhPrecheck_GhPrecheck_Result | undefined;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Github = Shared_NovaConfig_Github;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Owner = string;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Repo = string;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_IsDryRun = boolean;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Rulesets = Shared_NovaConfig_Github_Rulesets | undefined;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_DefaultBranch = Shared_NovaConfig_Github_Rulesets_DefaultBranch | undefined;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_AllowedMergeMethods = Shared_NovaConfig_Github_Rulesets_DefaultBranch_AllowedMergeMethods | undefined;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_RequiredStatusChecks = Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusChecks | undefined;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetName = string;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Enforcement = Shared_NovaConfigGithubRulesetEnforcement;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Flags = string[];

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_RuleCount = number;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Query = string;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupCommand = string;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_LookupResult = Shared_ShellOutput;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetIdCandidate = string;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetIdNumber = number;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_RulesetId = string | undefined;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Method = 'POST' | 'PUT';

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Endpoint = string;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Command = string;

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_Commands = string[];

export type Cli_Recipe_Github_SyncRulesets_Runner_Run_DidSucceed = boolean;

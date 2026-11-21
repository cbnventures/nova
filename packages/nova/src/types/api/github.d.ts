import type {
  Shared_GithubOwnerType,
  Shared_GithubRepositoryVisibility,
  Shared_NovaConfig_Github_Actions,
  Shared_NovaConfig_Github_Actions_SelectedActions,
  Shared_NovaConfig_Github_Features,
  Shared_NovaConfig_Github_Label,
  Shared_NovaConfig_Github_Policies,
  Shared_NovaConfig_Github_Policies_MergeCommit,
  Shared_NovaConfig_Github_Policies_MergeMethods,
  Shared_NovaConfig_Github_Policies_SquashMerge,
  Shared_NovaConfig_Github_Rulesets_DefaultBranch,
  Shared_NovaConfig_Github_Rulesets_DefaultBranch_AllowedMergeMethods,
  Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusChecks,
  Shared_NovaConfig_Github_Topics,
  Shared_NovaConfigGithubRulesetEnforcement,
} from '../shared.d.ts';

/**
 * API - GitHub - Build Actions Permissions Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildActionsPermissionsCommand_Owner = string;

export type Api_Github_Runner_BuildActionsPermissionsCommand_Repo = string;

export type Api_Github_Runner_BuildActionsPermissionsCommand_Actions = Shared_NovaConfig_Github_Actions;

export type Api_Github_Runner_BuildActionsPermissionsCommand_Returns = string | undefined;

export type Api_Github_Runner_BuildActionsPermissionsCommand_Flags = string[];

/**
 * API - GitHub - Build Artifact Retention Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildArtifactRetentionCommand_Owner = string;

export type Api_Github_Runner_BuildArtifactRetentionCommand_Repo = string;

export type Api_Github_Runner_BuildArtifactRetentionCommand_Days = number;

export type Api_Github_Runner_BuildArtifactRetentionCommand_Returns = string;

/**
 * API - GitHub - Build Automated Security Fixes Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Owner = string;

export type Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Repo = string;

export type Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Enabled = boolean;

export type Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Returns = string;

export type Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Method = 'PUT' | 'DELETE';

/**
 * API - GitHub - Build Branch Lookup Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildBranchLookupCommand_Owner = string;

export type Api_Github_Runner_BuildBranchLookupCommand_Repo = string;

export type Api_Github_Runner_BuildBranchLookupCommand_Branch = string;

export type Api_Github_Runner_BuildBranchLookupCommand_Returns = string;

/**
 * API - GitHub - Build Features Edit Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildFeaturesEditCommand_Owner = string;

export type Api_Github_Runner_BuildFeaturesEditCommand_Repo = string;

export type Api_Github_Runner_BuildFeaturesEditCommand_Features = Shared_NovaConfig_Github_Features;

export type Api_Github_Runner_BuildFeaturesEditCommand_Returns = string | undefined;

export type Api_Github_Runner_BuildFeaturesEditCommand_Flags = string[];

/**
 * API - GitHub - Build Identity Edit Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildIdentityEditCommand_Owner = string;

export type Api_Github_Runner_BuildIdentityEditCommand_Repo = string;

export type Api_Github_Runner_BuildIdentityEditCommand_Description = string | undefined;

export type Api_Github_Runner_BuildIdentityEditCommand_Homepage = string | undefined;

export type Api_Github_Runner_BuildIdentityEditCommand_Returns = string | undefined;

export type Api_Github_Runner_BuildIdentityEditCommand_Flags = string[];

/**
 * API - GitHub - Build Label Create Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildLabelCreateCommand_Owner = string;

export type Api_Github_Runner_BuildLabelCreateCommand_Repo = string;

export type Api_Github_Runner_BuildLabelCreateCommand_Label = Shared_NovaConfig_Github_Label;

export type Api_Github_Runner_BuildLabelCreateCommand_Returns = string;

export type Api_Github_Runner_BuildLabelCreateCommand_Description = string;

/**
 * API - GitHub - Build Latest Release API URL.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildLatestReleaseApiUrl_Owner = string;

export type Api_Github_Runner_BuildLatestReleaseApiUrl_Repo = string;

export type Api_Github_Runner_BuildLatestReleaseApiUrl_Returns = string;

/**
 * API - GitHub - Build Owner Plan Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildOwnerPlanCommand_Owner = string;

export type Api_Github_Runner_BuildOwnerPlanCommand_OwnerType = Shared_GithubOwnerType;

export type Api_Github_Runner_BuildOwnerPlanCommand_Returns = string;

/**
 * API - GitHub - Build Policies Edit Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildPoliciesEditCommand_Owner = string;

export type Api_Github_Runner_BuildPoliciesEditCommand_Repo = string;

export type Api_Github_Runner_BuildPoliciesEditCommand_Policies = Shared_NovaConfig_Github_Policies;

export type Api_Github_Runner_BuildPoliciesEditCommand_DefaultBranch = string | undefined;

export type Api_Github_Runner_BuildPoliciesEditCommand_Returns = string | undefined;

export type Api_Github_Runner_BuildPoliciesEditCommand_Flags = string[];

export type Api_Github_Runner_BuildPoliciesEditCommand_MergeMethods = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

/**
 * API - GitHub - Build Policies Update Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildPoliciesUpdateCommand_Owner = string;

export type Api_Github_Runner_BuildPoliciesUpdateCommand_Repo = string;

export type Api_Github_Runner_BuildPoliciesUpdateCommand_Policies = Shared_NovaConfig_Github_Policies;

export type Api_Github_Runner_BuildPoliciesUpdateCommand_Returns = string | undefined;

export type Api_Github_Runner_BuildPoliciesUpdateCommand_Flags = string[];

export type Api_Github_Runner_BuildPoliciesUpdateCommand_MergeCommit = Shared_NovaConfig_Github_Policies_MergeCommit | undefined;

export type Api_Github_Runner_BuildPoliciesUpdateCommand_SquashMerge = Shared_NovaConfig_Github_Policies_SquashMerge | undefined;

/**
 * API - GitHub - Build Push Protection Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildPushProtectionCommand_Owner = string;

export type Api_Github_Runner_BuildPushProtectionCommand_Repo = string;

export type Api_Github_Runner_BuildPushProtectionCommand_Enabled = boolean;

export type Api_Github_Runner_BuildPushProtectionCommand_Returns = string;

/**
 * API - GitHub - Build Release Download Prefix.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildReleaseDownloadPrefix_Owner = string;

export type Api_Github_Runner_BuildReleaseDownloadPrefix_Repo = string;

export type Api_Github_Runner_BuildReleaseDownloadPrefix_Returns = string;

/**
 * API - GitHub - Build Repository ID Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildRepositoryIdCommand_Owner = string;

export type Api_Github_Runner_BuildRepositoryIdCommand_Repo = string;

export type Api_Github_Runner_BuildRepositoryIdCommand_Returns = string;

/**
 * API - GitHub - Build Repository Permission Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildRepositoryPermissionCommand_Owner = string;

export type Api_Github_Runner_BuildRepositoryPermissionCommand_Repo = string;

export type Api_Github_Runner_BuildRepositoryPermissionCommand_Returns = string;

/**
 * API - GitHub - Build Repository Visibility Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildRepositoryVisibilityCommand_Owner = string;

export type Api_Github_Runner_BuildRepositoryVisibilityCommand_Repo = string;

export type Api_Github_Runner_BuildRepositoryVisibilityCommand_Returns = string;

/**
 * API - GitHub - Build Ruleset Lookup Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildRulesetLookupCommand_Owner = string;

export type Api_Github_Runner_BuildRulesetLookupCommand_Repo = string;

export type Api_Github_Runner_BuildRulesetLookupCommand_RulesetName = string;

export type Api_Github_Runner_BuildRulesetLookupCommand_Returns = string;

export type Api_Github_Runner_BuildRulesetLookupCommand_Query = string;

/**
 * API - GitHub - Build Ruleset Save Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildRulesetSaveCommand_Owner = string;

export type Api_Github_Runner_BuildRulesetSaveCommand_Repo = string;

export type Api_Github_Runner_BuildRulesetSaveCommand_RulesetId = string | undefined;

export type Api_Github_Runner_BuildRulesetSaveCommand_RulesetName = string;

export type Api_Github_Runner_BuildRulesetSaveCommand_DefaultBranch = Shared_NovaConfig_Github_Rulesets_DefaultBranch;

export type Api_Github_Runner_BuildRulesetSaveCommand_Returns = string;

export type Api_Github_Runner_BuildRulesetSaveCommand_Enforcement = Shared_NovaConfigGithubRulesetEnforcement;

export type Api_Github_Runner_BuildRulesetSaveCommand_Flags = string[];

export type Api_Github_Runner_BuildRulesetSaveCommand_AllowedMergeMethods = Shared_NovaConfig_Github_Rulesets_DefaultBranch_AllowedMergeMethods | undefined;

export type Api_Github_Runner_BuildRulesetSaveCommand_RequiredStatusChecks = Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusChecks | undefined;

export type Api_Github_Runner_BuildRulesetSaveCommand_Method = 'POST' | 'PUT';

export type Api_Github_Runner_BuildRulesetSaveCommand_Endpoint = string;

/**
 * API - GitHub - Build Secret Scanning Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildSecretScanningCommand_Owner = string;

export type Api_Github_Runner_BuildSecretScanningCommand_Repo = string;

export type Api_Github_Runner_BuildSecretScanningCommand_Enabled = boolean;

export type Api_Github_Runner_BuildSecretScanningCommand_Returns = string;

/**
 * API - GitHub - Build Selected Actions Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildSelectedActionsCommand_Owner = string;

export type Api_Github_Runner_BuildSelectedActionsCommand_Repo = string;

export type Api_Github_Runner_BuildSelectedActionsCommand_SelectedActions = Shared_NovaConfig_Github_Actions_SelectedActions;

export type Api_Github_Runner_BuildSelectedActionsCommand_Returns = string | undefined;

export type Api_Github_Runner_BuildSelectedActionsCommand_Flags = string[];

/**
 * API - GitHub - Build Sponsorships Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildSponsorshipsCommand_RepositoryId = string;

export type Api_Github_Runner_BuildSponsorshipsCommand_Enabled = boolean;

export type Api_Github_Runner_BuildSponsorshipsCommand_Returns = string;

export type Api_Github_Runner_BuildSponsorshipsCommand_Mutation = string;

/**
 * API - GitHub - Build Topics Replace Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildTopicsReplaceCommand_Owner = string;

export type Api_Github_Runner_BuildTopicsReplaceCommand_Repo = string;

export type Api_Github_Runner_BuildTopicsReplaceCommand_Topics = Shared_NovaConfig_Github_Topics;

export type Api_Github_Runner_BuildTopicsReplaceCommand_Returns = string;

export type Api_Github_Runner_BuildTopicsReplaceCommand_TopicFlags = string;

/**
 * API - GitHub - Build Vulnerability Alerts Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildVulnerabilityAlertsCommand_Owner = string;

export type Api_Github_Runner_BuildVulnerabilityAlertsCommand_Repo = string;

export type Api_Github_Runner_BuildVulnerabilityAlertsCommand_Enabled = boolean;

export type Api_Github_Runner_BuildVulnerabilityAlertsCommand_Returns = string;

export type Api_Github_Runner_BuildVulnerabilityAlertsCommand_Method = 'PUT' | 'DELETE';

/**
 * API - GitHub - Build Workflow Permissions Command.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_BuildWorkflowPermissionsCommand_Owner = string;

export type Api_Github_Runner_BuildWorkflowPermissionsCommand_Repo = string;

export type Api_Github_Runner_BuildWorkflowPermissionsCommand_Actions = Shared_NovaConfig_Github_Actions;

export type Api_Github_Runner_BuildWorkflowPermissionsCommand_Returns = string | undefined;

export type Api_Github_Runner_BuildWorkflowPermissionsCommand_Flags = string[];

/**
 * API - GitHub - Is Ruleset Plan Error.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_IsRulesetPlanError_TextError = string;

export type Api_Github_Runner_IsRulesetPlanError_Returns = boolean;

/**
 * API - GitHub - Is Ruleset Plan Unsupported.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_IsRulesetPlanUnsupported_PlanName = string;

export type Api_Github_Runner_IsRulesetPlanUnsupported_Returns = boolean;

/**
 * API - GitHub - Parse Repository Visibility.
 *
 * @since 0.49.0
 */
export type Api_Github_Runner_ParseRepositoryVisibility_TextOut = string;

export type Api_Github_Runner_ParseRepositoryVisibility_Returns = Shared_GithubRepositoryVisibility;

export type Api_Github_Runner_ParseRepositoryVisibility_Lines = string[];

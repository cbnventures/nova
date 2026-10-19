import type {
  Shared_NovaConfig,
  Shared_NovaConfig_Agents,
  Shared_NovaConfig_Emails,
  Shared_NovaConfig_Entities,
  Shared_NovaConfig_Environment,
  Shared_NovaConfig_Github,
  Shared_NovaConfig_Github_Actions,
  Shared_NovaConfig_Github_Actions_SelectedActions,
  Shared_NovaConfig_Github_Actions_SelectedActions_Patterns,
  Shared_NovaConfig_Github_Features,
  Shared_NovaConfig_Github_IssueTemplate,
  Shared_NovaConfig_Github_IssueTemplate_BugReportFields,
  Shared_NovaConfig_Github_Label,
  Shared_NovaConfig_Github_Labels,
  Shared_NovaConfig_Github_Policies,
  Shared_NovaConfig_Github_Policies_MergeCommit,
  Shared_NovaConfig_Github_Policies_MergeMethods,
  Shared_NovaConfig_Github_Policies_SquashMerge,
  Shared_NovaConfig_Github_Rulesets,
  Shared_NovaConfig_Github_Rulesets_DefaultBranch,
  Shared_NovaConfig_Github_Rulesets_DefaultBranch_AllowedMergeMethods,
  Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusChecks,
  Shared_NovaConfig_Github_Security,
  Shared_NovaConfig_Github_Topics,
  Shared_NovaConfig_IgnoreFile,
  Shared_NovaConfig_IgnoreFile_Bundles,
  Shared_NovaConfig_IgnoreFile_Patterns,
  Shared_NovaConfig_IgnoreFiles,
  Shared_NovaConfig_Project,
  Shared_NovaConfig_Project_Description,
  Shared_NovaConfig_Project_License,
  Shared_NovaConfig_Project_Name,
  Shared_NovaConfig_Project_Name_Slug,
  Shared_NovaConfig_ReadMe,
  Shared_NovaConfig_ReadMe_Badges,
  Shared_NovaConfig_RecipeEntry,
  Shared_NovaConfig_RecipeEntry_Settings,
  Shared_NovaConfig_Recipes,
  Shared_NovaConfig_Recipes_Github,
  Shared_NovaConfig_Recipes_License,
  Shared_NovaConfig_Recipes_Miscellaneous,
  Shared_NovaConfig_Recipes_NovaConfig,
  Shared_NovaConfig_Recipes_PackageJson,
  Shared_NovaConfig_Recipes_ReadMe,
  Shared_NovaConfig_Settings,
  Shared_NovaConfig_Urls,
  Shared_NovaConfig_Workflows,
  Shared_NovaConfig_Workspaces,
  Shared_NovaConfigConfig,
  Shared_NovaConfigEntityRole,
  Shared_NovaConfigEnvironment,
  Shared_NovaConfigEnvironment_Workflows,
  Shared_NovaConfigEnvironment_Workspaces,
  Shared_NovaConfigEnvironmentProject,
  Shared_NovaConfigEnvironmentValue,
  Shared_NovaConfigEnvironmentValue_Reach,
  Shared_NovaConfigEnvironmentWorkflow,
  Shared_NovaConfigEnvironmentWorkspace,
  Shared_NovaConfigGithubActionsAllowedActions,
  Shared_NovaConfigGithubActionsDefaultWorkflowPermissions,
  Shared_NovaConfigGithubPoliciesMergeCommitMessage,
  Shared_NovaConfigGithubPoliciesMergeCommitTitle,
  Shared_NovaConfigGithubPoliciesSquashMergeMessage,
  Shared_NovaConfigGithubPoliciesSquashMergeTitle,
  Shared_NovaConfigGithubRulesetEnforcement,
  Shared_NovaConfigMiscellaneousRecipeName,
  Shared_NovaConfigOperatingSystemFileName,
  Shared_NovaConfigOperatingSystemFilePlatform,
  Shared_NovaConfigOperatingSystemFileRecipeEntry,
  Shared_NovaConfigOperatingSystemFileSettings,
  Shared_NovaConfigProjectPlatform,
  Shared_NovaConfigReadMeBadge,
  Shared_NovaConfigSettings_RunWorkspaces,
  Shared_NovaConfigSettings_RunWorkspacesCache,
  Shared_NovaConfigSettings_RunWorkspacesConcurrency,
  Shared_NovaConfigSettings_VersionStrategy,
  Shared_NovaConfigWorkflow,
  Shared_NovaConfigWorkflow_RunsOn,
  Shared_NovaConfigWorkflow_TimeoutMinutes,
  Shared_NovaConfigWorkflow_Triggers,
  Shared_NovaConfigWorkflowTriggerObject,
  Shared_NovaConfigWorkflowTriggerObject_Branches,
  Shared_NovaConfigWorkflowTriggerObject_Paths,
  Shared_NovaConfigWorkflowTriggerObject_Tags,
  Shared_NovaConfigWorkflowTriggerObject_Workflows,
  Shared_NovaConfigWorkspace,
  Shared_NovaConfigWorkspace_Name,
  Shared_NovaConfigWorkspace_Policy,
  Shared_NovaConfigWorkspace_Role,
  Shared_UrlProtocol,
  Shared_WorkflowTemplateTarget,
  Shared_WorkflowTemplateTargets,
  Shared_WorkflowTemplateVariable,
  Shared_WorkflowTemplateVariable_Scope,
  Shared_WorkflowTemplateVariables,
} from '../shared.d.ts';

import type {
  Lib_Item_GenericProtocols,
  Lib_Item_RepositoryProtocols,
} from './item.d.ts';
import type { Lib_WorkflowTemplates_Entry } from './workflow-templates.d.ts';

/**
 * Lib - Nova Config - Config.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Config = Shared_NovaConfigConfig;

/**
 * Lib - Nova Config - Constructor.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Constructor_Config = {};

/**
 * Lib - Nova Config - Diagnostics.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_Diagnostics_Severity = 'error' | 'warning';

export type Lib_NovaConfig_Runner_Diagnostics_Message = string;

export type Lib_NovaConfig_Runner_Diagnostics = {
  severity: Lib_NovaConfig_Runner_Diagnostics_Severity;
  message: Lib_NovaConfig_Runner_Diagnostics_Message;
}[];

export type Lib_NovaConfig_Runner_Diagnostics_Returns = Lib_NovaConfig_Runner_Diagnostics;

/**
 * Lib - Nova Config - Get Array Of HTTP URLs.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Value = unknown;

export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Field = Shared_UrlProtocol;

export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Returns = string[] | undefined;

export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_Items = string[];

export type Lib_NovaConfig_Runner_GetArrayOfHttpUrls_TypeGuard = string;

/**
 * Lib - Nova Config - Get Array Of Non Empty Strings.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Value = unknown;

export type Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Returns = string[] | undefined;

export type Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_Items = string[];

export type Lib_NovaConfig_Runner_GetArrayOfNonEmptyStrings_TypeGuard = string;

/**
 * Lib - Nova Config - Get Email.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_GetEmail_Value = unknown;

export type Lib_NovaConfig_Runner_GetEmail_Returns = string | undefined;

export type Lib_NovaConfig_Runner_GetEmail_Email = string | undefined;

/**
 * Lib - Nova Config - Get GitHub Actions.
 *
 * @since 0.26.0
 */
export type Lib_NovaConfig_Runner_GetGithubActions_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubActions_Returns = Shared_NovaConfig_Github_Actions | undefined;

export type Lib_NovaConfig_Runner_GetGithubActions_Result_Enabled = boolean;

export type Lib_NovaConfig_Runner_GetGithubActions_Result_AllowedActions = Shared_NovaConfigGithubActionsAllowedActions;

export type Lib_NovaConfig_Runner_GetGithubActions_Result_ShaPinningRequired = boolean;

export type Lib_NovaConfig_Runner_GetGithubActions_Result_SelectedActions = Shared_NovaConfig_Github_Actions_SelectedActions;

export type Lib_NovaConfig_Runner_GetGithubActions_Result_DefaultWorkflowPermissions = Shared_NovaConfigGithubActionsDefaultWorkflowPermissions;

export type Lib_NovaConfig_Runner_GetGithubActions_Result_CanApprovePullRequestReviews = boolean;

export type Lib_NovaConfig_Runner_GetGithubActions_Result_ArtifactRetentionDays = number;

export type Lib_NovaConfig_Runner_GetGithubActions_Result = {
  enabled?: Lib_NovaConfig_Runner_GetGithubActions_Result_Enabled;
  allowedActions?: Lib_NovaConfig_Runner_GetGithubActions_Result_AllowedActions;
  shaPinningRequired?: Lib_NovaConfig_Runner_GetGithubActions_Result_ShaPinningRequired;
  selectedActions?: Lib_NovaConfig_Runner_GetGithubActions_Result_SelectedActions;
  defaultWorkflowPermissions?: Lib_NovaConfig_Runner_GetGithubActions_Result_DefaultWorkflowPermissions;
  canApprovePullRequestReviews?: Lib_NovaConfig_Runner_GetGithubActions_Result_CanApprovePullRequestReviews;
  artifactRetentionDays?: Lib_NovaConfig_Runner_GetGithubActions_Result_ArtifactRetentionDays;
};

export type Lib_NovaConfig_Runner_GetGithubActions_Enabled = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubActions_AllowedActions = Shared_NovaConfigGithubActionsAllowedActions | undefined;

export type Lib_NovaConfig_Runner_GetGithubActions_ShaPinningRequired = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubActions_SelectedActions = Shared_NovaConfig_Github_Actions_SelectedActions | undefined;

export type Lib_NovaConfig_Runner_GetGithubActions_DefaultWorkflowPermissions = Shared_NovaConfigGithubActionsDefaultWorkflowPermissions | undefined;

export type Lib_NovaConfig_Runner_GetGithubActions_CanApprovePullRequestReviews = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubActions_ArtifactRetentionDays = number | undefined;

/**
 * Lib - Nova Config - Get GitHub Actions Selected Actions.
 *
 * @since 0.26.0
 */
export type Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Returns = Shared_NovaConfig_Github_Actions_SelectedActions | undefined;

export type Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Result_GithubOwned = boolean;

export type Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Result_Verified = boolean;

export type Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Result_Patterns = Shared_NovaConfig_Github_Actions_SelectedActions_Patterns;

export type Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Result = {
  githubOwned?: Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Result_GithubOwned;
  verified?: Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Result_Verified;
  patterns?: Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Result_Patterns;
};

export type Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_GithubOwned = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Verified = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubActionsSelectedActions_Patterns = Shared_NovaConfig_Github_Actions_SelectedActions_Patterns | undefined;

/**
 * Lib - Nova Config - Get GitHub Features.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_GetGithubFeatures_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Returns = Shared_NovaConfig_Github_Features | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Result_Issues = boolean;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Result_Wiki = boolean;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Result_Projects = boolean;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Result_Discussions = boolean;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Result_Sponsorships = boolean;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Result = {
  issues?: Lib_NovaConfig_Runner_GetGithubFeatures_Result_Issues;
  wiki?: Lib_NovaConfig_Runner_GetGithubFeatures_Result_Wiki;
  projects?: Lib_NovaConfig_Runner_GetGithubFeatures_Result_Projects;
  discussions?: Lib_NovaConfig_Runner_GetGithubFeatures_Result_Discussions;
  sponsorships?: Lib_NovaConfig_Runner_GetGithubFeatures_Result_Sponsorships;
};

export type Lib_NovaConfig_Runner_GetGithubFeatures_Issues = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Wiki = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Projects = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Discussions = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubFeatures_Sponsorships = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Issue Template.
 *
 * @since 0.20.0
 */
export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_Returns = Shared_NovaConfig_Github_IssueTemplate | undefined;

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_Result_BugReportFields = Shared_NovaConfig_Github_IssueTemplate_BugReportFields;

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_Result = {
  bugReportFields?: Lib_NovaConfig_Runner_GetGithubIssueTemplate_Result_BugReportFields;
};

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_RawBugReportFields = unknown;

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_AllowedBugReportFields = Set<string>;

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_SeenBugReportFields = Set<string>;

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_BugReportFields = Shared_NovaConfig_Github_IssueTemplate_BugReportFields;

export type Lib_NovaConfig_Runner_GetGithubIssueTemplate_BugReportField = Shared_NovaConfig_Github_IssueTemplate_BugReportFields[number];

/**
 * Lib - Nova Config - Get GitHub Labels.
 *
 * @since 0.26.0
 */
export type Lib_NovaConfig_Runner_GetGithubLabels_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubLabels_Returns = Shared_NovaConfig_Github_Labels | undefined;

export type Lib_NovaConfig_Runner_GetGithubLabels_Labels = Shared_NovaConfig_Github_Labels;

export type Lib_NovaConfig_Runner_GetGithubLabels_Name = string | undefined;

export type Lib_NovaConfig_Runner_GetGithubLabels_ColorCandidate = string | undefined;

export type Lib_NovaConfig_Runner_GetGithubLabels_Color = string | undefined;

export type Lib_NovaConfig_Runner_GetGithubLabels_Description = string | undefined;

export type Lib_NovaConfig_Runner_GetGithubLabels_Label = Shared_NovaConfig_Github_Label;

/**
 * Lib - Nova Config - Get GitHub Policies.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_GetGithubPolicies_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Returns = Shared_NovaConfig_Github_Policies | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result_Visibility = 'public' | 'private' | 'internal';

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result_DefaultBranch = string;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result_MergeMethods = Shared_NovaConfig_Github_Policies_MergeMethods;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result_MergeCommit = Shared_NovaConfig_Github_Policies_MergeCommit;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result_SquashMerge = Shared_NovaConfig_Github_Policies_SquashMerge;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result_AutoDeleteHeadBranch = boolean;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result_AutoMerge = boolean;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result_AllowUpdateBranch = boolean;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result_WebCommitSignoffRequired = boolean;

export type Lib_NovaConfig_Runner_GetGithubPolicies_Result = {
  visibility?: Lib_NovaConfig_Runner_GetGithubPolicies_Result_Visibility;
  defaultBranch?: Lib_NovaConfig_Runner_GetGithubPolicies_Result_DefaultBranch;
  mergeMethods?: Lib_NovaConfig_Runner_GetGithubPolicies_Result_MergeMethods;
  mergeCommit?: Lib_NovaConfig_Runner_GetGithubPolicies_Result_MergeCommit;
  squashMerge?: Lib_NovaConfig_Runner_GetGithubPolicies_Result_SquashMerge;
  autoDeleteHeadBranch?: Lib_NovaConfig_Runner_GetGithubPolicies_Result_AutoDeleteHeadBranch;
  autoMerge?: Lib_NovaConfig_Runner_GetGithubPolicies_Result_AutoMerge;
  allowUpdateBranch?: Lib_NovaConfig_Runner_GetGithubPolicies_Result_AllowUpdateBranch;
  webCommitSignoffRequired?: Lib_NovaConfig_Runner_GetGithubPolicies_Result_WebCommitSignoffRequired;
};

export type Lib_NovaConfig_Runner_GetGithubPolicies_Visibility = 'public' | 'private' | 'internal' | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_DefaultBranch = string | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_MergeMethods = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_MergeCommit = Shared_NovaConfig_Github_Policies_MergeCommit | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_SquashMerge = Shared_NovaConfig_Github_Policies_SquashMerge | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_AutoDeleteHeadBranch = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_AutoMerge = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_AllowUpdateBranch = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPolicies_WebCommitSignoffRequired = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Policies Merge Commit.
 *
 * @since 0.26.0
 */
export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeCommit_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeCommit_Returns = Shared_NovaConfig_Github_Policies_MergeCommit | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeCommit_Result_Title = Shared_NovaConfigGithubPoliciesMergeCommitTitle;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeCommit_Result_Message = Shared_NovaConfigGithubPoliciesMergeCommitMessage;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeCommit_Result = {
  title?: Lib_NovaConfig_Runner_GetGithubPoliciesMergeCommit_Result_Title;
  message?: Lib_NovaConfig_Runner_GetGithubPoliciesMergeCommit_Result_Message;
};

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeCommit_Title = Shared_NovaConfigGithubPoliciesMergeCommitTitle | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeCommit_Message = Shared_NovaConfigGithubPoliciesMergeCommitMessage | undefined;

/**
 * Lib - Nova Config - Get GitHub Policies Merge Methods.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Returns = Shared_NovaConfig_Github_Policies_MergeMethods | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result_Merge = boolean;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result_Squash = boolean;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result_Rebase = boolean;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result = {
  merge?: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result_Merge;
  squash?: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result_Squash;
  rebase?: Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Result_Rebase;
};

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Merge = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Squash = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesMergeMethods_Rebase = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Policies Squash Merge.
 *
 * @since 0.26.0
 */
export type Lib_NovaConfig_Runner_GetGithubPoliciesSquashMerge_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubPoliciesSquashMerge_Returns = Shared_NovaConfig_Github_Policies_SquashMerge | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesSquashMerge_Result_Title = Shared_NovaConfigGithubPoliciesSquashMergeTitle;

export type Lib_NovaConfig_Runner_GetGithubPoliciesSquashMerge_Result_Message = Shared_NovaConfigGithubPoliciesSquashMergeMessage;

export type Lib_NovaConfig_Runner_GetGithubPoliciesSquashMerge_Result = {
  title?: Lib_NovaConfig_Runner_GetGithubPoliciesSquashMerge_Result_Title;
  message?: Lib_NovaConfig_Runner_GetGithubPoliciesSquashMerge_Result_Message;
};

export type Lib_NovaConfig_Runner_GetGithubPoliciesSquashMerge_Title = Shared_NovaConfigGithubPoliciesSquashMergeTitle | undefined;

export type Lib_NovaConfig_Runner_GetGithubPoliciesSquashMerge_Message = Shared_NovaConfigGithubPoliciesSquashMergeMessage | undefined;

/**
 * Lib - Nova Config - Get GitHub Rulesets.
 *
 * @since 0.26.0
 */
export type Lib_NovaConfig_Runner_GetGithubRulesets_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubRulesets_Returns = Shared_NovaConfig_Github_Rulesets | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesets_Result_DefaultBranch = Shared_NovaConfig_Github_Rulesets_DefaultBranch;

export type Lib_NovaConfig_Runner_GetGithubRulesets_Result = {
  defaultBranch?: Lib_NovaConfig_Runner_GetGithubRulesets_Result_DefaultBranch;
};

export type Lib_NovaConfig_Runner_GetGithubRulesets_DefaultBranch = Shared_NovaConfig_Github_Rulesets_DefaultBranch | undefined;

/**
 * Lib - Nova Config - Get GitHub Rulesets Default Branch.
 *
 * @since 0.26.0
 */
export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_Returns = Shared_NovaConfig_Github_Rulesets_DefaultBranch | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_Result = Shared_NovaConfig_Github_Rulesets_DefaultBranch;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_Enforcement = Shared_NovaConfigGithubRulesetEnforcement | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_BlockDeletions = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_BlockForcePushes = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_RequireLinearHistory = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_RequireSignedCommits = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_RequirePullRequest = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_AllowedMergeMethods = Shared_NovaConfig_Github_Rulesets_DefaultBranch_AllowedMergeMethods | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_DismissStaleReviews = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_RequireCodeOwnerReview = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_RequireLastPushApproval = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_RequiredApprovals = number | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_RequireConversationResolution = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_RequiredStatusChecks = Shared_NovaConfig_Github_Rulesets_DefaultBranch_RequiredStatusChecks | undefined;

export type Lib_NovaConfig_Runner_GetGithubRulesetsDefaultBranch_RequireBranchesToBeUpToDate = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Security.
 *
 * @since 0.26.0
 */
export type Lib_NovaConfig_Runner_GetGithubSecurity_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubSecurity_Returns = Shared_NovaConfig_Github_Security | undefined;

export type Lib_NovaConfig_Runner_GetGithubSecurity_Result = Shared_NovaConfig_Github_Security;

export type Lib_NovaConfig_Runner_GetGithubSecurity_VulnerabilityAlerts = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubSecurity_DependabotSecurityUpdates = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubSecurity_SecretScanning = boolean | undefined;

export type Lib_NovaConfig_Runner_GetGithubSecurity_PushProtection = boolean | undefined;

/**
 * Lib - Nova Config - Get GitHub Topics.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_GetGithubTopics_Value = unknown;

export type Lib_NovaConfig_Runner_GetGithubTopics_Returns = Shared_NovaConfig_Github_Topics | undefined;

export type Lib_NovaConfig_Runner_GetGithubTopics_TypeGuard = string;

/**
 * Lib - Nova Config - Get Miscellaneous Recipes.
 *
 * @since 0.32.0
 */
export type Lib_NovaConfig_Runner_GetMiscellaneousRecipes_Value = unknown;

export type Lib_NovaConfig_Runner_GetMiscellaneousRecipes_Returns = Shared_NovaConfig_Recipes_Miscellaneous | undefined;

export type Lib_NovaConfig_Runner_GetMiscellaneousRecipes_Result = Shared_NovaConfig_Recipes_Miscellaneous;

export type Lib_NovaConfig_Runner_GetMiscellaneousRecipes_AllowedName = Shared_NovaConfigMiscellaneousRecipeName | undefined;

export type Lib_NovaConfig_Runner_GetMiscellaneousRecipes_FixMarkdownTables = Shared_NovaConfig_RecipeEntry | undefined;

export type Lib_NovaConfig_Runner_GetMiscellaneousRecipes_RemoveOperatingSystemFiles = Shared_NovaConfigOperatingSystemFileRecipeEntry | undefined;

/**
 * Lib - Nova Config - Get Non Empty String.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_GetNonEmptyString_Value = unknown;

export type Lib_NovaConfig_Runner_GetNonEmptyString_Returns = string | undefined;

export type Lib_NovaConfig_Runner_GetNonEmptyString_String = string;

/**
 * Lib - Nova Config - Get Operating System File Recipe Entry.
 *
 * @since 0.32.0
 */
export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_Value = unknown;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_Returns = Shared_NovaConfigOperatingSystemFileRecipeEntry | undefined;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_Enabled = unknown;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_Result = Shared_NovaConfigOperatingSystemFileRecipeEntry;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_SettingsCandidate = unknown;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_Settings = Shared_NovaConfigOperatingSystemFileSettings;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_PlatformCandidates = Shared_NovaConfigOperatingSystemFilePlatform[];

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_Platform = Shared_NovaConfigOperatingSystemFilePlatform | undefined;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_PlatformValue = unknown;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_SupportedFileNames = readonly Shared_NovaConfigOperatingSystemFileName[];

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_FileSettings = Partial<Record<Shared_NovaConfigOperatingSystemFileName, boolean>>;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_FileName = Shared_NovaConfigOperatingSystemFileName | undefined;

export type Lib_NovaConfig_Runner_GetOperatingSystemFileRecipeEntry_FileValue = unknown;

/**
 * Lib - Nova Config - Get Package JSON Recipes.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_Value = unknown;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_Returns = Shared_NovaConfig_Recipes_PackageJson | undefined;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_Result = Shared_NovaConfig_Recipes_PackageJson;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_WorkspacePath = string;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_WorkspaceValue = unknown;

export type Lib_NovaConfig_Runner_GetPackageJsonRecipes_Entries = {
  [recipeName: string]: Shared_NovaConfig_RecipeEntry;
} | undefined;

/**
 * Lib - Nova Config - Get Recipe Entries.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_GetRecipeEntries_Value = unknown;

export type Lib_NovaConfig_Runner_GetRecipeEntries_AllowedNames = readonly string[];

export type Lib_NovaConfig_Runner_GetRecipeEntries_Returns = Lib_NovaConfig_Runner_GetRecipeEntries_Result | undefined;

export type Lib_NovaConfig_Runner_GetRecipeEntries_Result = {
  [recipeName: string]: Shared_NovaConfig_RecipeEntry;
};

export type Lib_NovaConfig_Runner_GetRecipeEntries_Entry = Shared_NovaConfig_RecipeEntry | undefined;

/**
 * Lib - Nova Config - Get Recipe Entry.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_GetRecipeEntry_Value = unknown;

export type Lib_NovaConfig_Runner_GetRecipeEntry_Returns = Shared_NovaConfig_RecipeEntry | undefined;

export type Lib_NovaConfig_Runner_GetRecipeEntry_Enabled = unknown;

export type Lib_NovaConfig_Runner_GetRecipeEntry_Result = Shared_NovaConfig_RecipeEntry;

export type Lib_NovaConfig_Runner_GetRecipeEntry_SettingsCandidate = unknown;

export type Lib_NovaConfig_Runner_GetRecipeEntry_Settings = Shared_NovaConfig_RecipeEntry_Settings;

export type Lib_NovaConfig_Runner_GetRecipeEntry_SettingKey = string;

export type Lib_NovaConfig_Runner_GetRecipeEntry_SettingValue = unknown;

/**
 * Lib - Nova Config - Get URL.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_GetUrl_Value = unknown;

export type Lib_NovaConfig_Runner_GetUrl_Field = Shared_UrlProtocol;

export type Lib_NovaConfig_Runner_GetUrl_Returns = string | undefined;

export type Lib_NovaConfig_Runner_GetUrl_CandidateUrl = string | undefined;

export type Lib_NovaConfig_Runner_GetUrl_Url = URL;

export type Lib_NovaConfig_Runner_GetUrl_AllowedProtocols = Lib_Item_GenericProtocols | Lib_Item_RepositoryProtocols;

export type Lib_NovaConfig_Runner_GetUrl_IsAllowed = boolean;

/**
 * Lib - Nova Config - Is Entity Role.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_IsEntityRole_Value = unknown;

export type Lib_NovaConfig_Runner_IsEntityRole_TypeGuard = Shared_NovaConfigEntityRole;

/**
 * Lib - Nova Config - Load.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Load_Returns = Promise<Shared_NovaConfigConfig>;

export type Lib_NovaConfig_Runner_Load_Directory = string;

export type Lib_NovaConfig_Runner_Load_CurrentDirectory = string;

export type Lib_NovaConfig_Runner_Load_ConfigFileName = string;

export type Lib_NovaConfig_Runner_Load_ConfigPath = string;

export type Lib_NovaConfig_Runner_Load_RawFile = string;

export type Lib_NovaConfig_Runner_Load_ParsedFile = unknown;

/**
 * Lib - Nova Config - Parse.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Parse_Value = unknown;

export type Lib_NovaConfig_Runner_Parse_Returns = Shared_NovaConfig;

export type Lib_NovaConfig_Runner_Parse_Result_Project = Shared_NovaConfig_Project;

export type Lib_NovaConfig_Runner_Parse_Result_Entities = Shared_NovaConfig_Entities;

export type Lib_NovaConfig_Runner_Parse_Result_Emails = Shared_NovaConfig_Emails;

export type Lib_NovaConfig_Runner_Parse_Result_Github = Shared_NovaConfig_Github;

export type Lib_NovaConfig_Runner_Parse_Result_Workflows = Shared_NovaConfig_Workflows;

export type Lib_NovaConfig_Runner_Parse_Result_Urls = Shared_NovaConfig_Urls;

export type Lib_NovaConfig_Runner_Parse_Result_Readme = Shared_NovaConfig_ReadMe;

export type Lib_NovaConfig_Runner_Parse_Result_Workspaces = Shared_NovaConfig_Workspaces;

export type Lib_NovaConfig_Runner_Parse_Result_IgnoreFiles = Shared_NovaConfig_IgnoreFiles;

export type Lib_NovaConfig_Runner_Parse_Result_Agents = Shared_NovaConfig_Agents;

export type Lib_NovaConfig_Runner_Parse_Result_Recipes = Shared_NovaConfig_Recipes;

export type Lib_NovaConfig_Runner_Parse_Result_Environment = Shared_NovaConfig_Environment;

export type Lib_NovaConfig_Runner_Parse_Result_Settings = Shared_NovaConfig_Settings;

export type Lib_NovaConfig_Runner_Parse_Result = {
  project?: Lib_NovaConfig_Runner_Parse_Result_Project;
  entities?: Lib_NovaConfig_Runner_Parse_Result_Entities;
  emails?: Lib_NovaConfig_Runner_Parse_Result_Emails;
  github?: Lib_NovaConfig_Runner_Parse_Result_Github;
  workflows?: Lib_NovaConfig_Runner_Parse_Result_Workflows;
  urls?: Lib_NovaConfig_Runner_Parse_Result_Urls;
  readme?: Lib_NovaConfig_Runner_Parse_Result_Readme;
  workspaces?: Lib_NovaConfig_Runner_Parse_Result_Workspaces;
  ignoreFiles?: Lib_NovaConfig_Runner_Parse_Result_IgnoreFiles;
  agents?: Lib_NovaConfig_Runner_Parse_Result_Agents;
  recipes?: Lib_NovaConfig_Runner_Parse_Result_Recipes;
  environment?: Lib_NovaConfig_Runner_Parse_Result_Environment;
  settings?: Lib_NovaConfig_Runner_Parse_Result_Settings;
};

export type Lib_NovaConfig_Runner_Parse_Project = Shared_NovaConfig_Project | undefined;

export type Lib_NovaConfig_Runner_Parse_Entities = Shared_NovaConfig_Entities | undefined;

export type Lib_NovaConfig_Runner_Parse_Emails = Shared_NovaConfig_Emails | undefined;

export type Lib_NovaConfig_Runner_Parse_Github = Shared_NovaConfig_Github | undefined;

export type Lib_NovaConfig_Runner_Parse_Workflows = Shared_NovaConfig_Workflows | undefined;

export type Lib_NovaConfig_Runner_Parse_Urls = Shared_NovaConfig_Urls | undefined;

export type Lib_NovaConfig_Runner_Parse_ReadMe = Shared_NovaConfig_ReadMe | undefined;

export type Lib_NovaConfig_Runner_Parse_Workspaces = Shared_NovaConfig_Workspaces | undefined;

export type Lib_NovaConfig_Runner_Parse_IgnoreFiles = Shared_NovaConfig_IgnoreFiles | undefined;

export type Lib_NovaConfig_Runner_Parse_Agents = Shared_NovaConfig_Agents | undefined;

export type Lib_NovaConfig_Runner_Parse_Recipes = Shared_NovaConfig_Recipes | undefined;

export type Lib_NovaConfig_Runner_Parse_Environment = Shared_NovaConfig_Environment | undefined;

export type Lib_NovaConfig_Runner_Parse_Settings = Shared_NovaConfig_Settings | undefined;

/**
 * Lib - Nova Config - Parse Agents.
 *
 * @since 0.20.0
 */
export type Lib_NovaConfig_Runner_ParseAgents_Value = unknown;

export type Lib_NovaConfig_Runner_ParseAgents_Returns = Shared_NovaConfig_Agents | undefined;

export type Lib_NovaConfig_Runner_ParseAgents_Agents = ('claude-code' | 'codex')[];

/**
 * Lib - Nova Config - Parse Emails.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseEmails_Value = unknown;

export type Lib_NovaConfig_Runner_ParseEmails_Returns = Shared_NovaConfig_Emails | undefined;

export type Lib_NovaConfig_Runner_ParseEmails_Emails_Bugs = string;

export type Lib_NovaConfig_Runner_ParseEmails_Emails = {
  bugs?: Lib_NovaConfig_Runner_ParseEmails_Emails_Bugs;
};

export type Lib_NovaConfig_Runner_ParseEmails_EmailFields = readonly ['bugs'];

export type Lib_NovaConfig_Runner_ParseEmails_ParsedEmail = string | undefined;

/**
 * Lib - Nova Config - Parse Entities.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseEntities_Value = unknown;

export type Lib_NovaConfig_Runner_ParseEntities_Returns = Shared_NovaConfig_Entities | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Entities_Name = string;

export type Lib_NovaConfig_Runner_ParseEntities_Entities_Email = string;

export type Lib_NovaConfig_Runner_ParseEntities_Entities_Url = string;

export type Lib_NovaConfig_Runner_ParseEntities_Entities_Roles = Shared_NovaConfigEntityRole[];

export type Lib_NovaConfig_Runner_ParseEntities_Entities = {
  name?: Lib_NovaConfig_Runner_ParseEntities_Entities_Name;
  email?: Lib_NovaConfig_Runner_ParseEntities_Entities_Email;
  url?: Lib_NovaConfig_Runner_ParseEntities_Entities_Url;
  roles?: Lib_NovaConfig_Runner_ParseEntities_Entities_Roles;
}[];

export type Lib_NovaConfig_Runner_ParseEntities_ParsedEntity_Name = string;

export type Lib_NovaConfig_Runner_ParseEntities_ParsedEntity_Email = string;

export type Lib_NovaConfig_Runner_ParseEntities_ParsedEntity_Url = string;

export type Lib_NovaConfig_Runner_ParseEntities_ParsedEntity_Roles = Shared_NovaConfigEntityRole[];

export type Lib_NovaConfig_Runner_ParseEntities_ParsedEntity = {
  name?: Lib_NovaConfig_Runner_ParseEntities_ParsedEntity_Name;
  email?: Lib_NovaConfig_Runner_ParseEntities_ParsedEntity_Email;
  url?: Lib_NovaConfig_Runner_ParseEntities_ParsedEntity_Url;
  roles?: Lib_NovaConfig_Runner_ParseEntities_ParsedEntity_Roles;
};

export type Lib_NovaConfig_Runner_ParseEntities_Name = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Email = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Url = string | undefined;

export type Lib_NovaConfig_Runner_ParseEntities_Roles = unknown;

export type Lib_NovaConfig_Runner_ParseEntities_ParsedRoles = ('author' | 'contributor' | 'supporter')[];

export type Lib_NovaConfig_Runner_ParseEntities_ParsedEntityTypeGuard = Lib_NovaConfig_Runner_ParseEntities_ParsedEntity;

export type Lib_NovaConfig_Runner_ParseEntities_NameA = string;

export type Lib_NovaConfig_Runner_ParseEntities_NameB = string;

/**
 * Lib - Nova Config - Parse Environment.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_ParseEnvironment_Value = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_Workspaces = Shared_NovaConfig_Workspaces | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_Workflows = Shared_NovaConfig_Workflows | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_Returns = Shared_NovaConfigEnvironment | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_Result = Shared_NovaConfigEnvironment;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePaths = string[];

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowNames = string[];

export type Lib_NovaConfig_Runner_ParseEnvironment_CollectedPrefixes = string[];

export type Lib_NovaConfig_Runner_ParseEnvironment_ProjectValue = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_ProjectPrefix = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_ProjectVariables = Shared_NovaConfigEnvironmentValue[] | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_ProjectResult = Shared_NovaConfigEnvironmentProject;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacesValue = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacesResult = Shared_NovaConfigEnvironment_Workspaces;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePath = string;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceOptions = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspacePrefix = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceVariables = Shared_NovaConfigEnvironmentValue[] | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkspaceResult = Shared_NovaConfigEnvironmentWorkspace;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowsValue = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowsResult = Shared_NovaConfigEnvironment_Workflows;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowName = string;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowOptions = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironment_MatchCount = number;

export type Lib_NovaConfig_Runner_ParseEnvironment_WorkflowPrefix = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironment_I = number;

export type Lib_NovaConfig_Runner_ParseEnvironment_J = number;

export type Lib_NovaConfig_Runner_ParseEnvironment_PrefixA = string;

export type Lib_NovaConfig_Runner_ParseEnvironment_PrefixB = string;

/**
 * Lib - Nova Config - Parse Environment Values.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_ParseEnvironmentValues_RawVariables = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Prefix = string;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Context = string;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Returns = Shared_NovaConfigEnvironmentValue[] | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Values = Shared_NovaConfigEnvironmentValue[];

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_SeenNames = Set<string>;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Raw = unknown;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Key = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_ReachValues = Shared_NovaConfigEnvironmentValue_Reach[];

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_ReachCandidate = Shared_NovaConfigEnvironmentValue_Reach | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_IsLocal = boolean;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_SecretCandidate = boolean | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_HasError = boolean;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_DefaultValueCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Name = string;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_FoldedName = string;

export type Lib_NovaConfig_Runner_ParseEnvironmentValues_Value = Shared_NovaConfigEnvironmentValue;

/**
 * Lib - Nova Config - Parse GitHub.
 *
 * @since 0.18.0
 */
export type Lib_NovaConfig_Runner_ParseGithub_Value = unknown;

export type Lib_NovaConfig_Runner_ParseGithub_Returns = Shared_NovaConfig_Github | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Result_Owner = string;

export type Lib_NovaConfig_Runner_ParseGithub_Result_Repo = string;

export type Lib_NovaConfig_Runner_ParseGithub_Result_Topics = string[];

export type Lib_NovaConfig_Runner_ParseGithub_Result_Features = Shared_NovaConfig_Github_Features;

export type Lib_NovaConfig_Runner_ParseGithub_Result_Policies = Shared_NovaConfig_Github_Policies;

export type Lib_NovaConfig_Runner_ParseGithub_Result_Security = Shared_NovaConfig_Github_Security;

export type Lib_NovaConfig_Runner_ParseGithub_Result_Rulesets = Shared_NovaConfig_Github_Rulesets;

export type Lib_NovaConfig_Runner_ParseGithub_Result_Actions = Shared_NovaConfig_Github_Actions;

export type Lib_NovaConfig_Runner_ParseGithub_Result_Labels = Shared_NovaConfig_Github_Labels;

export type Lib_NovaConfig_Runner_ParseGithub_Result_IssueTemplate = Shared_NovaConfig_Github_IssueTemplate;

export type Lib_NovaConfig_Runner_ParseGithub_Result = {
  owner?: Lib_NovaConfig_Runner_ParseGithub_Result_Owner;
  repo?: Lib_NovaConfig_Runner_ParseGithub_Result_Repo;
  topics?: Lib_NovaConfig_Runner_ParseGithub_Result_Topics;
  features?: Lib_NovaConfig_Runner_ParseGithub_Result_Features;
  policies?: Lib_NovaConfig_Runner_ParseGithub_Result_Policies;
  security?: Lib_NovaConfig_Runner_ParseGithub_Result_Security;
  rulesets?: Lib_NovaConfig_Runner_ParseGithub_Result_Rulesets;
  actions?: Lib_NovaConfig_Runner_ParseGithub_Result_Actions;
  labels?: Lib_NovaConfig_Runner_ParseGithub_Result_Labels;
  issueTemplate?: Lib_NovaConfig_Runner_ParseGithub_Result_IssueTemplate;
};

export type Lib_NovaConfig_Runner_ParseGithub_OwnerCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Owner = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_RepoCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Repo = string | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Topics = Shared_NovaConfig_Github_Topics | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Features = Shared_NovaConfig_Github_Features | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Policies = Shared_NovaConfig_Github_Policies | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Security = Shared_NovaConfig_Github_Security | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Rulesets = Shared_NovaConfig_Github_Rulesets | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Actions = Shared_NovaConfig_Github_Actions | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_Labels = Shared_NovaConfig_Github_Labels | undefined;

export type Lib_NovaConfig_Runner_ParseGithub_IssueTemplate = Shared_NovaConfig_Github_IssueTemplate | undefined;

/**
 * Lib - Nova Config - Parse Ignore Files.
 *
 * @since 0.32.0
 */
export type Lib_NovaConfig_Runner_ParseIgnoreFiles_Value = unknown;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_Returns = Shared_NovaConfig_IgnoreFiles | undefined;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_Result = Shared_NovaConfig_IgnoreFiles;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_ConfigPath = string;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_RawEntry = unknown;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_RawBundles = unknown;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_Bundles = Shared_NovaConfig_IgnoreFile_Bundles;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_SupportedBundles = string[];

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_HasUnsupportedBundle = boolean;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_RawPatterns = unknown;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_Patterns = Shared_NovaConfig_IgnoreFile_Patterns | undefined;

export type Lib_NovaConfig_Runner_ParseIgnoreFiles_Entry = Shared_NovaConfig_IgnoreFile;

/**
 * Lib - Nova Config - Parse Project.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseProject_Value = unknown;

export type Lib_NovaConfig_Runner_ParseProject_Returns = Shared_NovaConfig_Project | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Project_Name = Shared_NovaConfig_Project_Name;

export type Lib_NovaConfig_Runner_ParseProject_Project_Description = Shared_NovaConfig_Project_Description;

export type Lib_NovaConfig_Runner_ParseProject_Project_Keywords = string[];

export type Lib_NovaConfig_Runner_ParseProject_Project_LegalName = string;

export type Lib_NovaConfig_Runner_ParseProject_Project_Pronouns = 'personal' | 'business';

export type Lib_NovaConfig_Runner_ParseProject_Project_Platforms = Shared_NovaConfigProjectPlatform[];

export type Lib_NovaConfig_Runner_ParseProject_Project_StartingYear = number;

export type Lib_NovaConfig_Runner_ParseProject_Project_License = Shared_NovaConfig_Project_License;

export type Lib_NovaConfig_Runner_ParseProject_Project = {
  name?: Lib_NovaConfig_Runner_ParseProject_Project_Name;
  description?: Lib_NovaConfig_Runner_ParseProject_Project_Description;
  keywords?: Lib_NovaConfig_Runner_ParseProject_Project_Keywords;
  legalName?: Lib_NovaConfig_Runner_ParseProject_Project_LegalName;
  pronouns?: Lib_NovaConfig_Runner_ParseProject_Project_Pronouns;
  platforms?: Lib_NovaConfig_Runner_ParseProject_Project_Platforms;
  startingYear?: Lib_NovaConfig_Runner_ParseProject_Project_StartingYear;
  license?: Lib_NovaConfig_Runner_ParseProject_Project_License;
};

export type Lib_NovaConfig_Runner_ParseProject_ValueName = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueDescription = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueKeywords = string[] | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Name_Slug = Shared_NovaConfig_Project_Name_Slug;

export type Lib_NovaConfig_Runner_ParseProject_Name_Title = string;

export type Lib_NovaConfig_Runner_ParseProject_Name = {
  slug?: Lib_NovaConfig_Runner_ParseProject_Name_Slug;
  title?: Lib_NovaConfig_Runner_ParseProject_Name_Title;
};

export type Lib_NovaConfig_Runner_ParseProject_Slug = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Title = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Description_Short = string;

export type Lib_NovaConfig_Runner_ParseProject_Description_Long = string;

export type Lib_NovaConfig_Runner_ParseProject_Description = {
  short?: Lib_NovaConfig_Runner_ParseProject_Description_Short;
  long?: Lib_NovaConfig_Runner_ParseProject_Description_Long;
};

export type Lib_NovaConfig_Runner_ParseProject_Short = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_Long = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_ValueLegalName = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_ValuePronouns = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_ValuePlatforms = unknown;

export type Lib_NovaConfig_Runner_ParseProject_AllowedPlatforms = Set<string>;

export type Lib_NovaConfig_Runner_ParseProject_ParsedPlatforms = Shared_NovaConfigProjectPlatform[];

export type Lib_NovaConfig_Runner_ParseProject_PlatformTypeGuard = Shared_NovaConfigProjectPlatform;

export type Lib_NovaConfig_Runner_ParseProject_ValueStartingYear = unknown;

export type Lib_NovaConfig_Runner_ParseProject_ValueLicense = string | undefined;

export type Lib_NovaConfig_Runner_ParseProject_AllowedLicenses = Set<string>;

export type Lib_NovaConfig_Runner_ParseProject_License = Shared_NovaConfig_Project_License;

/**
 * Lib - Nova Config - Parse Read Me.
 *
 * @since 0.29.0
 */
export type Lib_NovaConfig_Runner_ParseReadMe_Value = unknown;

export type Lib_NovaConfig_Runner_ParseReadMe_Github = Shared_NovaConfig_Github | undefined;

export type Lib_NovaConfig_Runner_ParseReadMe_Urls = Shared_NovaConfig_Urls | undefined;

export type Lib_NovaConfig_Runner_ParseReadMe_Returns = Shared_NovaConfig_ReadMe | undefined;

export type Lib_NovaConfig_Runner_ParseReadMe_Result = Shared_NovaConfig_ReadMe;

export type Lib_NovaConfig_Runner_ParseReadMe_ValueBadges = unknown;

export type Lib_NovaConfig_Runner_ParseReadMe_AllowedBadges = Set<string>;

export type Lib_NovaConfig_Runner_ParseReadMe_SeenBadges = Set<string>;

export type Lib_NovaConfig_Runner_ParseReadMe_Badges = Shared_NovaConfig_ReadMe_Badges;

export type Lib_NovaConfig_Runner_ParseReadMe_HasGithubSource = boolean;

export type Lib_NovaConfig_Runner_ParseReadMe_HasNpmSource = boolean;

export type Lib_NovaConfig_Runner_ParseReadMe_HasDockerSource = boolean;

export type Lib_NovaConfig_Runner_ParseReadMe_HasFundingSource = boolean;

export type Lib_NovaConfig_Runner_ParseReadMe_Badge = Shared_NovaConfigReadMeBadge;

export type Lib_NovaConfig_Runner_ParseReadMe_MissingSource = boolean;

/**
 * Lib - Nova Config - Parse Recipes.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_ParseRecipes_Value = unknown;

export type Lib_NovaConfig_Runner_ParseRecipes_Returns = Shared_NovaConfig_Recipes | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_Result = Shared_NovaConfig_Recipes;

export type Lib_NovaConfig_Runner_ParseRecipes_Github = Shared_NovaConfig_Recipes_Github | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_License = Shared_NovaConfig_Recipes_License | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_Miscellaneous = Shared_NovaConfig_Recipes_Miscellaneous | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_NovaConfig = Shared_NovaConfig_Recipes_NovaConfig | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_ReadMe = Shared_NovaConfig_Recipes_ReadMe | undefined;

export type Lib_NovaConfig_Runner_ParseRecipes_PackageJson = Shared_NovaConfig_Recipes_PackageJson | undefined;

/**
 * Lib - Nova Config - Parse Settings.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_ParseSettings_Value = unknown;

export type Lib_NovaConfig_Runner_ParseSettings_Returns = Shared_NovaConfig_Settings | undefined;

export type Lib_NovaConfig_Runner_ParseSettings_Result_LockStepVersioning = boolean;

export type Lib_NovaConfig_Runner_ParseSettings_Result_RunWorkspaces = Shared_NovaConfigSettings_RunWorkspaces;

export type Lib_NovaConfig_Runner_ParseSettings_Result_VersionStrategy = Shared_NovaConfigSettings_VersionStrategy;

export type Lib_NovaConfig_Runner_ParseSettings_Result = {
  lockStepVersioning?: Lib_NovaConfig_Runner_ParseSettings_Result_LockStepVersioning;
  runWorkspaces?: Lib_NovaConfig_Runner_ParseSettings_Result_RunWorkspaces;
  versionStrategy?: Lib_NovaConfig_Runner_ParseSettings_Result_VersionStrategy;
};

export type Lib_NovaConfig_Runner_ParseSettings_LockStepVersioning = boolean | undefined;

export type Lib_NovaConfig_Runner_ParseSettings_RunWorkspacesValue = unknown;

export type Lib_NovaConfig_Runner_ParseSettings_RunWorkspaces = Shared_NovaConfigSettings_RunWorkspaces | undefined;

export type Lib_NovaConfig_Runner_ParseSettings_CacheValue = unknown;

export type Lib_NovaConfig_Runner_ParseSettings_Cache = Shared_NovaConfigSettings_RunWorkspacesCache;

export type Lib_NovaConfig_Runner_ParseSettings_CacheEnabled = boolean | undefined;

export type Lib_NovaConfig_Runner_ParseSettings_CacheDirectory = string | undefined;

export type Lib_NovaConfig_Runner_ParseSettings_CacheScriptsValue = unknown;

export type Lib_NovaConfig_Runner_ParseSettings_CacheScripts = string[] | undefined;

export type Lib_NovaConfig_Runner_ParseSettings_ConcurrencyValue = unknown;

export type Lib_NovaConfig_Runner_ParseSettings_Concurrency = Shared_NovaConfigSettings_RunWorkspacesConcurrency;

export type Lib_NovaConfig_Runner_ParseSettings_ConcurrencyEntries = [string, unknown][];

export type Lib_NovaConfig_Runner_ParseSettings_TypedConcurrencyEntry = [string, unknown];

export type Lib_NovaConfig_Runner_ParseSettings_ConcurrencyScript = string;

export type Lib_NovaConfig_Runner_ParseSettings_ConcurrencyLimit = unknown;

export type Lib_NovaConfig_Runner_ParseSettings_VersionStrategy = Shared_NovaConfigSettings_VersionStrategy | undefined;

/**
 * Lib - Nova Config - Parse URLs.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseUrls_Value = unknown;

export type Lib_NovaConfig_Runner_ParseUrls_Returns = Shared_NovaConfig_Urls | undefined;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_Homepage = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_Repository = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_Bugs = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_License = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_Logo = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_Docker = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_Documentation = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_Npm = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_FundSources = string[];

export type Lib_NovaConfig_Runner_ParseUrls_Urls_PrivacyPolicy = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls_TermsOfUse = string;

export type Lib_NovaConfig_Runner_ParseUrls_Urls = {
  homepage?: Lib_NovaConfig_Runner_ParseUrls_Urls_Homepage;
  repository?: Lib_NovaConfig_Runner_ParseUrls_Urls_Repository;
  bugs?: Lib_NovaConfig_Runner_ParseUrls_Urls_Bugs;
  license?: Lib_NovaConfig_Runner_ParseUrls_Urls_License;
  logo?: Lib_NovaConfig_Runner_ParseUrls_Urls_Logo;
  docker?: Lib_NovaConfig_Runner_ParseUrls_Urls_Docker;
  documentation?: Lib_NovaConfig_Runner_ParseUrls_Urls_Documentation;
  npm?: Lib_NovaConfig_Runner_ParseUrls_Urls_Npm;
  fundSources?: Lib_NovaConfig_Runner_ParseUrls_Urls_FundSources;
  privacyPolicy?: Lib_NovaConfig_Runner_ParseUrls_Urls_PrivacyPolicy;
  termsOfUse?: Lib_NovaConfig_Runner_ParseUrls_Urls_TermsOfUse;
};

export type Lib_NovaConfig_Runner_ParseUrls_UrlFields = readonly ['homepage', 'repository', 'bugs', 'license', 'logo', 'documentation', 'npm', 'docker', 'privacyPolicy', 'termsOfUse'];

export type Lib_NovaConfig_Runner_ParseUrls_UrlFieldsFundSourcesIndex = number;

export type Lib_NovaConfig_Runner_ParseUrls_LoopIndex = number;

export type Lib_NovaConfig_Runner_ParseUrls_FundSources = string[] | undefined;

export type Lib_NovaConfig_Runner_ParseUrls_UrlField = string;

export type Lib_NovaConfig_Runner_ParseUrls_ParsedUrl = string | undefined;

/**
 * Lib - Nova Config - Parse Workflows.
 *
 * @since 0.26.0
 */
export type Lib_NovaConfig_Runner_ParseWorkflows_Value = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Returns = Shared_NovaConfig_Workflows | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflows_Element = Shared_NovaConfigWorkflow;

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflows = Lib_NovaConfig_Runner_ParseWorkflows_Workflows_Element[];

export type Lib_NovaConfig_Runner_ParseWorkflows_CastItem = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Template = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_Name = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTriggers = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Triggers = Shared_NovaConfigWorkflow_Triggers;

export type Lib_NovaConfig_Runner_ParseWorkflows_Trigger = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerValue = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerName = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerObject = Shared_NovaConfigWorkflowTriggerObject;

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerBranches = Shared_NovaConfigWorkflowTriggerObject_Branches | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerPaths = Shared_NovaConfigWorkflowTriggerObject_Paths | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerTags = Shared_NovaConfigWorkflowTriggerObject_Tags | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TriggerWorkflows = Shared_NovaConfigWorkflowTriggerObject_Workflows | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawRunsOn = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_RunsOn = Shared_NovaConfigWorkflow_RunsOn | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawTimeoutMinutes = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_TimeoutMinutes = Shared_NovaConfigWorkflow_TimeoutMinutes | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawBuild = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Build = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_RawDeploy = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_To = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_Path = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_After = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_With = Record<string, string>;

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element = {
  to: Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_To;
  path: Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_Path;
  after?: Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_After;
  with?: Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element_With;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_Deploy = Lib_NovaConfig_Runner_ParseWorkflows_Deploy_Element[];

export type Lib_NovaConfig_Runner_ParseWorkflows_RawDeployValue = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTo = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployPath = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_RawDeployAfter = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployAfter = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_To = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_Path = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_After = string[];

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_With = Record<string, string>;

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget = {
  to: Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_To;
  path: Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_Path;
  after?: Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_After;
  with?: Lib_NovaConfig_Runner_ParseWorkflows_DeployTarget_With;
};

export type Lib_NovaConfig_Runner_ParseWorkflows_DeployWith = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_ParsedDeployWith = Record<string, string> | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_WithMap = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflows_Workflow = Shared_NovaConfigWorkflow;

export type Lib_NovaConfig_Runner_ParseWorkflows_ParsedWith = Record<string, string> | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflows_TemplateCompare = number;

export type Lib_NovaConfig_Runner_ParseWorkflows_NameA = string;

export type Lib_NovaConfig_Runner_ParseWorkflows_NameB = string;

/**
 * Lib - Nova Config - Parse Workflow With.
 *
 * @since 0.22.0
 */
export type Lib_NovaConfig_Runner_ParseWorkflowWith_Value = unknown;

export type Lib_NovaConfig_Runner_ParseWorkflowWith_Returns = Record<string, string> | undefined;

export type Lib_NovaConfig_Runner_ParseWorkflowWith_Parsed = Record<string, string>;

export type Lib_NovaConfig_Runner_ParseWorkflowWith_SortedEntries = [string, unknown][];

export type Lib_NovaConfig_Runner_ParseWorkflowWith_EntryKey = string;

export type Lib_NovaConfig_Runner_ParseWorkflowWith_EntryValue = unknown;

/**
 * Lib - Nova Config - Parse Workspaces.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseWorkspaces_Value = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Slug = Shared_NovaConfig_Project_Name_Slug | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Returns = Shared_NovaConfig_Workspaces | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Workspaces = {
  [key: string]: Shared_NovaConfigWorkspace;
};

export type Lib_NovaConfig_Runner_ParseWorkspaces_Role = 'project' | 'docs' | 'config' | 'app' | 'package' | 'tool' | 'template';

export type Lib_NovaConfig_Runner_ParseWorkspaces_Name = Shared_NovaConfigWorkspace_Name;

export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed = (role: Lib_NovaConfig_Runner_ParseWorkspaces_Role, name: Lib_NovaConfig_Runner_ParseWorkspaces_Name) => Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Path = string;

export type Lib_NovaConfig_Runner_ParseWorkspaces_Options = unknown;

export type Lib_NovaConfig_Runner_ParseWorkspaces_NameCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_RoleCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_PolicyCandidate = string | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_MatchedRole = Shared_NovaConfigWorkspace_Role | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_AllowedPolicies = ('freezable' | 'trackable' | 'distributable')[];

export type Lib_NovaConfig_Runner_ParseWorkspaces_Policy = Shared_NovaConfigWorkspace_Policy | undefined;

export type Lib_NovaConfig_Runner_ParseWorkspaces_WorkspaceKeys = string[];

export type Lib_NovaConfig_Runner_ParseWorkspaces_SortedWorkspaces = {
  [key: string]: Shared_NovaConfigWorkspace;
};

/**
 * Lib - Nova Config - Parse Workspaces - Is Name Allowed.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Returns = boolean;

export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Base = string;

export type Lib_NovaConfig_Runner_ParseWorkspaces_IsNameAllowed_Descriptor = string;

/**
 * Lib - Nova Config - Push Error.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_PushError_Name = string;

export type Lib_NovaConfig_Runner_PushError_Purpose = string;

export type Lib_NovaConfig_Runner_PushError_Message = string;

export type Lib_NovaConfig_Runner_PushError_Returns = void;

/**
 * Lib - Nova Config - Push Warning.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_PushWarning_Name = string;

export type Lib_NovaConfig_Runner_PushWarning_Purpose = string;

export type Lib_NovaConfig_Runner_PushWarning_Message = string;

export type Lib_NovaConfig_Runner_PushWarning_Returns = void;

/**
 * Lib - Nova Config - Save.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Save_ReplaceFile = boolean;

export type Lib_NovaConfig_Runner_Save_Returns = Promise<void>;

export type Lib_NovaConfig_Runner_Save_CurrentDirectory = string;

export type Lib_NovaConfig_Runner_Save_ConfigPath = string;

export type Lib_NovaConfig_Runner_Save_ConfigJson = string;

export type Lib_NovaConfig_Runner_Save_ConfigContents = string;

/**
 * Lib - Nova Config - Save.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_Save_ConfigExists = boolean;

/**
 * Lib - Nova Config - Set.
 *
 * @since 0.11.0
 */
export type Lib_NovaConfig_Runner_Set_Config = Shared_NovaConfigConfig;

export type Lib_NovaConfig_Runner_Set_Returns = void;

/**
 * Lib - Nova Config - Validate Cred Contributors.
 *
 * @since 0.21.0
 */
export type Lib_NovaConfig_Runner_ValidateCredContributors_RawWorkflows = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Environment = Shared_NovaConfigEnvironment | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Returns = void;

export type Lib_NovaConfig_Runner_ValidateCredContributors_ProjectGroup = Shared_NovaConfigEnvironmentProject | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_HasProjectPrefix = boolean;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkspacesGroup = Shared_NovaConfigEnvironment_Workspaces | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowsGroup = Shared_NovaConfigEnvironment_Workflows | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Reported = Set<string>;

export type Lib_NovaConfig_Runner_ValidateCredContributors_ServerBearingWorkspaces = Set<string>;

export type Lib_NovaConfig_Runner_ValidateCredContributors_RawWorkflow = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Template = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TemplateMeta = Lib_WorkflowTemplates_Entry | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowName = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_OwnsConfigKeys = boolean;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowGroup = Shared_NovaConfigEnvironmentWorkflow | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkflowMessage = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TemplateTargets = Shared_WorkflowTemplateTargets | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget_TargetType = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget_AppPath = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget = {
  targetType: Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget_TargetType;
  appPath: Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget_AppPath;
};

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployTargets = Lib_NovaConfig_Runner_ValidateCredContributors_DeployTarget[];

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployList = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_DeployEntry = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_To = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Path = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TargetList = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TargetEntry = unknown;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Type = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkingDir = string | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TargetMeta = Shared_WorkflowTemplateTarget | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_TargetVariables = Shared_WorkflowTemplateVariables;

export type Lib_NovaConfig_Runner_ValidateCredContributors_VariableName = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_VariableMeta = Shared_WorkflowTemplateVariable;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Scope = Shared_WorkflowTemplateVariable_Scope | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Message = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_Workspace = Shared_NovaConfigEnvironmentWorkspace | undefined;

export type Lib_NovaConfig_Runner_ValidateCredContributors_WorkspaceMessage = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_RuntimeWorkspacePath = string;

export type Lib_NovaConfig_Runner_ValidateCredContributors_RuntimeWorkspace = Shared_NovaConfigEnvironmentWorkspace;

export type Lib_NovaConfig_Runner_ValidateCredContributors_HasRuntimeValue = boolean;

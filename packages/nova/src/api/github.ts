import { shellQuote } from '../lib/utility.js';

import type {
  Api_Github_Runner_BuildActionsPermissionsCommand_Actions,
  Api_Github_Runner_BuildActionsPermissionsCommand_Flags,
  Api_Github_Runner_BuildActionsPermissionsCommand_Owner,
  Api_Github_Runner_BuildActionsPermissionsCommand_Repo,
  Api_Github_Runner_BuildActionsPermissionsCommand_Returns,
  Api_Github_Runner_BuildArtifactRetentionCommand_Days,
  Api_Github_Runner_BuildArtifactRetentionCommand_Owner,
  Api_Github_Runner_BuildArtifactRetentionCommand_Repo,
  Api_Github_Runner_BuildArtifactRetentionCommand_Returns,
  Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Enabled,
  Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Method,
  Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Owner,
  Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Repo,
  Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Returns,
  Api_Github_Runner_BuildBranchLookupCommand_Branch,
  Api_Github_Runner_BuildBranchLookupCommand_Owner,
  Api_Github_Runner_BuildBranchLookupCommand_Repo,
  Api_Github_Runner_BuildBranchLookupCommand_Returns,
  Api_Github_Runner_BuildFeaturesEditCommand_Features,
  Api_Github_Runner_BuildFeaturesEditCommand_Flags,
  Api_Github_Runner_BuildFeaturesEditCommand_Owner,
  Api_Github_Runner_BuildFeaturesEditCommand_Repo,
  Api_Github_Runner_BuildFeaturesEditCommand_Returns,
  Api_Github_Runner_BuildIdentityEditCommand_Description,
  Api_Github_Runner_BuildIdentityEditCommand_Flags,
  Api_Github_Runner_BuildIdentityEditCommand_Homepage,
  Api_Github_Runner_BuildIdentityEditCommand_Owner,
  Api_Github_Runner_BuildIdentityEditCommand_Repo,
  Api_Github_Runner_BuildIdentityEditCommand_Returns,
  Api_Github_Runner_BuildLabelCreateCommand_Description,
  Api_Github_Runner_BuildLabelCreateCommand_Label,
  Api_Github_Runner_BuildLabelCreateCommand_Owner,
  Api_Github_Runner_BuildLabelCreateCommand_Repo,
  Api_Github_Runner_BuildLabelCreateCommand_Returns,
  Api_Github_Runner_BuildLatestReleaseApiUrl_Owner,
  Api_Github_Runner_BuildLatestReleaseApiUrl_Repo,
  Api_Github_Runner_BuildLatestReleaseApiUrl_Returns,
  Api_Github_Runner_BuildOwnerPlanCommand_Owner,
  Api_Github_Runner_BuildOwnerPlanCommand_OwnerType,
  Api_Github_Runner_BuildOwnerPlanCommand_Returns,
  Api_Github_Runner_BuildPoliciesEditCommand_DefaultBranch,
  Api_Github_Runner_BuildPoliciesEditCommand_Flags,
  Api_Github_Runner_BuildPoliciesEditCommand_MergeMethods,
  Api_Github_Runner_BuildPoliciesEditCommand_Owner,
  Api_Github_Runner_BuildPoliciesEditCommand_Policies,
  Api_Github_Runner_BuildPoliciesEditCommand_Repo,
  Api_Github_Runner_BuildPoliciesEditCommand_Returns,
  Api_Github_Runner_BuildPoliciesUpdateCommand_Flags,
  Api_Github_Runner_BuildPoliciesUpdateCommand_MergeCommit,
  Api_Github_Runner_BuildPoliciesUpdateCommand_Owner,
  Api_Github_Runner_BuildPoliciesUpdateCommand_Policies,
  Api_Github_Runner_BuildPoliciesUpdateCommand_Repo,
  Api_Github_Runner_BuildPoliciesUpdateCommand_Returns,
  Api_Github_Runner_BuildPoliciesUpdateCommand_SquashMerge,
  Api_Github_Runner_BuildPushProtectionCommand_Enabled,
  Api_Github_Runner_BuildPushProtectionCommand_Owner,
  Api_Github_Runner_BuildPushProtectionCommand_Repo,
  Api_Github_Runner_BuildPushProtectionCommand_Returns,
  Api_Github_Runner_BuildReleaseDownloadPrefix_Owner,
  Api_Github_Runner_BuildReleaseDownloadPrefix_Repo,
  Api_Github_Runner_BuildReleaseDownloadPrefix_Returns,
  Api_Github_Runner_BuildRepositoryIdCommand_Owner,
  Api_Github_Runner_BuildRepositoryIdCommand_Repo,
  Api_Github_Runner_BuildRepositoryIdCommand_Returns,
  Api_Github_Runner_BuildRepositoryPermissionCommand_Owner,
  Api_Github_Runner_BuildRepositoryPermissionCommand_Repo,
  Api_Github_Runner_BuildRepositoryPermissionCommand_Returns,
  Api_Github_Runner_BuildRepositoryVisibilityCommand_Owner,
  Api_Github_Runner_BuildRepositoryVisibilityCommand_Repo,
  Api_Github_Runner_BuildRepositoryVisibilityCommand_Returns,
  Api_Github_Runner_BuildRulesetLookupCommand_Owner,
  Api_Github_Runner_BuildRulesetLookupCommand_Query,
  Api_Github_Runner_BuildRulesetLookupCommand_Repo,
  Api_Github_Runner_BuildRulesetLookupCommand_Returns,
  Api_Github_Runner_BuildRulesetLookupCommand_RulesetName,
  Api_Github_Runner_BuildRulesetSaveCommand_AllowedMergeMethods,
  Api_Github_Runner_BuildRulesetSaveCommand_DefaultBranch,
  Api_Github_Runner_BuildRulesetSaveCommand_Endpoint,
  Api_Github_Runner_BuildRulesetSaveCommand_Enforcement,
  Api_Github_Runner_BuildRulesetSaveCommand_Flags,
  Api_Github_Runner_BuildRulesetSaveCommand_Method,
  Api_Github_Runner_BuildRulesetSaveCommand_Owner,
  Api_Github_Runner_BuildRulesetSaveCommand_Repo,
  Api_Github_Runner_BuildRulesetSaveCommand_RequiredStatusChecks,
  Api_Github_Runner_BuildRulesetSaveCommand_Returns,
  Api_Github_Runner_BuildRulesetSaveCommand_RulesetId,
  Api_Github_Runner_BuildRulesetSaveCommand_RulesetName,
  Api_Github_Runner_BuildSecretScanningCommand_Enabled,
  Api_Github_Runner_BuildSecretScanningCommand_Owner,
  Api_Github_Runner_BuildSecretScanningCommand_Repo,
  Api_Github_Runner_BuildSecretScanningCommand_Returns,
  Api_Github_Runner_BuildSelectedActionsCommand_Flags,
  Api_Github_Runner_BuildSelectedActionsCommand_Owner,
  Api_Github_Runner_BuildSelectedActionsCommand_Repo,
  Api_Github_Runner_BuildSelectedActionsCommand_Returns,
  Api_Github_Runner_BuildSelectedActionsCommand_SelectedActions,
  Api_Github_Runner_BuildSponsorshipsCommand_Enabled,
  Api_Github_Runner_BuildSponsorshipsCommand_Mutation,
  Api_Github_Runner_BuildSponsorshipsCommand_RepositoryId,
  Api_Github_Runner_BuildSponsorshipsCommand_Returns,
  Api_Github_Runner_BuildTopicsReplaceCommand_Owner,
  Api_Github_Runner_BuildTopicsReplaceCommand_Repo,
  Api_Github_Runner_BuildTopicsReplaceCommand_Returns,
  Api_Github_Runner_BuildTopicsReplaceCommand_TopicFlags,
  Api_Github_Runner_BuildTopicsReplaceCommand_Topics,
  Api_Github_Runner_BuildVulnerabilityAlertsCommand_Enabled,
  Api_Github_Runner_BuildVulnerabilityAlertsCommand_Method,
  Api_Github_Runner_BuildVulnerabilityAlertsCommand_Owner,
  Api_Github_Runner_BuildVulnerabilityAlertsCommand_Repo,
  Api_Github_Runner_BuildVulnerabilityAlertsCommand_Returns,
  Api_Github_Runner_BuildWorkflowPermissionsCommand_Actions,
  Api_Github_Runner_BuildWorkflowPermissionsCommand_Flags,
  Api_Github_Runner_BuildWorkflowPermissionsCommand_Owner,
  Api_Github_Runner_BuildWorkflowPermissionsCommand_Repo,
  Api_Github_Runner_BuildWorkflowPermissionsCommand_Returns,
  Api_Github_Runner_IsRulesetPlanError_Returns,
  Api_Github_Runner_IsRulesetPlanError_TextError,
  Api_Github_Runner_IsRulesetPlanUnsupported_PlanName,
  Api_Github_Runner_IsRulesetPlanUnsupported_Returns,
  Api_Github_Runner_ParseRepositoryVisibility_Lines,
  Api_Github_Runner_ParseRepositoryVisibility_Returns,
  Api_Github_Runner_ParseRepositoryVisibility_TextOut,
} from '../types/api/github.d.ts';

/**
 * API - GitHub.
 *
 * Owns every GitHub endpoint path, HTTP method, and payload shape Nova uses. Recipes
 * pass Nova settings in and run the returned "gh" commands through Nova's gh helpers.
 *
 * @since 0.49.0
 */
export class Runner {
  /**
   * API - GitHub - Build Actions Permissions Command.
   *
   * Maps the Actions availability, allowlist mode, and SHA pinning settings onto the
   * repository Actions permissions endpoint. Returns undefined when nothing is set.
   *
   * @param {Api_Github_Runner_BuildActionsPermissionsCommand_Owner}   owner   - Owner.
   * @param {Api_Github_Runner_BuildActionsPermissionsCommand_Repo}    repo    - Repo.
   * @param {Api_Github_Runner_BuildActionsPermissionsCommand_Actions} actions - Actions.
   *
   * @returns {Api_Github_Runner_BuildActionsPermissionsCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildActionsPermissionsCommand(owner: Api_Github_Runner_BuildActionsPermissionsCommand_Owner, repo: Api_Github_Runner_BuildActionsPermissionsCommand_Repo, actions: Api_Github_Runner_BuildActionsPermissionsCommand_Actions): Api_Github_Runner_BuildActionsPermissionsCommand_Returns {
    const flags: Api_Github_Runner_BuildActionsPermissionsCommand_Flags = [];

    if (actions['enabled'] !== undefined) {
      flags.push(`-F enabled=${actions['enabled']}`);
    }

    if (actions['allowedActions'] === 'all') {
      flags.push('-f allowed_actions=all');
    }

    if (actions['allowedActions'] === 'local-only') {
      flags.push('-f allowed_actions=local_only');
    }

    if (actions['allowedActions'] === 'selected') {
      flags.push('-f allowed_actions=selected');
    }

    if (actions['shaPinningRequired'] !== undefined) {
      flags.push(`-F sha_pinning_required=${actions['shaPinningRequired']}`);
    }

    if (flags.length === 0) {
      return undefined;
    }

    return `gh api --method PUT repos/${owner}/${repo}/actions/permissions ${flags.join(' ')} --silent`;
  }

  /**
   * API - GitHub - Build Artifact Retention Command.
   *
   * Sets how many days GitHub keeps workflow artifacts and logs through the
   * repository artifact and log retention endpoint.
   *
   * @param {Api_Github_Runner_BuildArtifactRetentionCommand_Owner} owner - Owner.
   * @param {Api_Github_Runner_BuildArtifactRetentionCommand_Repo}  repo  - Repo.
   * @param {Api_Github_Runner_BuildArtifactRetentionCommand_Days}  days  - Days.
   *
   * @returns {Api_Github_Runner_BuildArtifactRetentionCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildArtifactRetentionCommand(owner: Api_Github_Runner_BuildArtifactRetentionCommand_Owner, repo: Api_Github_Runner_BuildArtifactRetentionCommand_Repo, days: Api_Github_Runner_BuildArtifactRetentionCommand_Days): Api_Github_Runner_BuildArtifactRetentionCommand_Returns {
    return `gh api --method PUT repos/${owner}/${repo}/actions/permissions/artifact-and-log-retention -F days=${days} --silent`;
  }

  /**
   * API - GitHub - Build Automated Security Fixes Command.
   *
   * Turns Dependabot security updates on with PUT or off with DELETE on the
   * repository automated security fixes endpoint.
   *
   * @param {Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Owner}   owner   - Owner.
   * @param {Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Repo}    repo    - Repo.
   * @param {Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Enabled} enabled - Enabled.
   *
   * @returns {Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildAutomatedSecurityFixesCommand(owner: Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Owner, repo: Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Repo, enabled: Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Enabled): Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Returns {
    const method: Api_Github_Runner_BuildAutomatedSecurityFixesCommand_Method = (enabled === true) ? 'PUT' : 'DELETE';

    return `gh api --method ${method} repos/${owner}/${repo}/automated-security-fixes --silent`;
  }

  /**
   * API - GitHub - Build Branch Lookup Command.
   *
   * Reads one branch from the repository branches endpoint. A zero exit code means
   * the branch exists and can become the default branch.
   *
   * @param {Api_Github_Runner_BuildBranchLookupCommand_Owner}  owner  - Owner.
   * @param {Api_Github_Runner_BuildBranchLookupCommand_Repo}   repo   - Repo.
   * @param {Api_Github_Runner_BuildBranchLookupCommand_Branch} branch - Branch.
   *
   * @returns {Api_Github_Runner_BuildBranchLookupCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildBranchLookupCommand(owner: Api_Github_Runner_BuildBranchLookupCommand_Owner, repo: Api_Github_Runner_BuildBranchLookupCommand_Repo, branch: Api_Github_Runner_BuildBranchLookupCommand_Branch): Api_Github_Runner_BuildBranchLookupCommand_Returns {
    return `gh api repos/${owner}/${repo}/branches/${shellQuote(branch)}`;
  }

  /**
   * API - GitHub - Build Features Edit Command.
   *
   * Maps the issues, wiki, projects, and discussions toggles onto "gh repo edit"
   * flags. Returns undefined when none of them is set.
   *
   * @param {Api_Github_Runner_BuildFeaturesEditCommand_Owner}    owner    - Owner.
   * @param {Api_Github_Runner_BuildFeaturesEditCommand_Repo}     repo     - Repo.
   * @param {Api_Github_Runner_BuildFeaturesEditCommand_Features} features - Features.
   *
   * @returns {Api_Github_Runner_BuildFeaturesEditCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildFeaturesEditCommand(owner: Api_Github_Runner_BuildFeaturesEditCommand_Owner, repo: Api_Github_Runner_BuildFeaturesEditCommand_Repo, features: Api_Github_Runner_BuildFeaturesEditCommand_Features): Api_Github_Runner_BuildFeaturesEditCommand_Returns {
    const flags: Api_Github_Runner_BuildFeaturesEditCommand_Flags = [];

    if (features['issues'] !== undefined) {
      flags.push(`--enable-issues=${features['issues']}`);
    }

    if (features['wiki'] !== undefined) {
      flags.push(`--enable-wiki=${features['wiki']}`);
    }

    if (features['projects'] !== undefined) {
      flags.push(`--enable-projects=${features['projects']}`);
    }

    if (features['discussions'] !== undefined) {
      flags.push(`--enable-discussions=${features['discussions']}`);
    }

    if (flags.length === 0) {
      return undefined;
    }

    return `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;
  }

  /**
   * API - GitHub - Build Identity Edit Command.
   *
   * Sets the repository description and homepage URL with "gh repo edit". Returns
   * undefined when neither value is set.
   *
   * @param {Api_Github_Runner_BuildIdentityEditCommand_Owner}       owner       - Owner.
   * @param {Api_Github_Runner_BuildIdentityEditCommand_Repo}        repo        - Repo.
   * @param {Api_Github_Runner_BuildIdentityEditCommand_Description} description - Description.
   * @param {Api_Github_Runner_BuildIdentityEditCommand_Homepage}    homepage    - Homepage.
   *
   * @returns {Api_Github_Runner_BuildIdentityEditCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildIdentityEditCommand(owner: Api_Github_Runner_BuildIdentityEditCommand_Owner, repo: Api_Github_Runner_BuildIdentityEditCommand_Repo, description: Api_Github_Runner_BuildIdentityEditCommand_Description, homepage: Api_Github_Runner_BuildIdentityEditCommand_Homepage): Api_Github_Runner_BuildIdentityEditCommand_Returns {
    const flags: Api_Github_Runner_BuildIdentityEditCommand_Flags = [];

    if (description !== undefined) {
      flags.push(`--description ${shellQuote(description)}`);
    }

    if (homepage !== undefined) {
      flags.push(`--homepage ${shellQuote(homepage)}`);
    }

    if (flags.length === 0) {
      return undefined;
    }

    return `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;
  }

  /**
   * API - GitHub - Build Label Create Command.
   *
   * Creates or overwrites one issue label with "gh label create --force", so the
   * command is safe to repeat. A missing description is sent as empty.
   *
   * @param {Api_Github_Runner_BuildLabelCreateCommand_Owner} owner - Owner.
   * @param {Api_Github_Runner_BuildLabelCreateCommand_Repo}  repo  - Repo.
   * @param {Api_Github_Runner_BuildLabelCreateCommand_Label} label - Label.
   *
   * @returns {Api_Github_Runner_BuildLabelCreateCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildLabelCreateCommand(owner: Api_Github_Runner_BuildLabelCreateCommand_Owner, repo: Api_Github_Runner_BuildLabelCreateCommand_Repo, label: Api_Github_Runner_BuildLabelCreateCommand_Label): Api_Github_Runner_BuildLabelCreateCommand_Returns {
    const description: Api_Github_Runner_BuildLabelCreateCommand_Description = label['description'] ?? '';

    return `gh label create ${shellQuote(label['name'])} --repo ${owner}/${repo} --color ${shellQuote(label['color'])} --description ${shellQuote(description)} --force`;
  }

  /**
   * API - GitHub - Build Latest Release API URL.
   *
   * Points at the REST endpoint that returns the newest published release, which
   * generated pfSense packages read to check for updates.
   *
   * @param {Api_Github_Runner_BuildLatestReleaseApiUrl_Owner} owner - Owner.
   * @param {Api_Github_Runner_BuildLatestReleaseApiUrl_Repo}  repo  - Repo.
   *
   * @returns {Api_Github_Runner_BuildLatestReleaseApiUrl_Returns}
   *
   * @since 0.49.0
   */
  public static buildLatestReleaseApiUrl(owner: Api_Github_Runner_BuildLatestReleaseApiUrl_Owner, repo: Api_Github_Runner_BuildLatestReleaseApiUrl_Repo): Api_Github_Runner_BuildLatestReleaseApiUrl_Returns {
    return `https://api.github.com/repos/${owner}/${repo}/releases/latest`;
  }

  /**
   * API - GitHub - Build Policies Edit Command.
   *
   * Maps visibility, the default branch, merge methods, and branch housekeeping
   * onto "gh repo edit" flags. Returns undefined when none of them is set.
   *
   * @param {Api_Github_Runner_BuildPoliciesEditCommand_Owner}         owner         - Owner.
   * @param {Api_Github_Runner_BuildPoliciesEditCommand_Repo}          repo          - Repo.
   * @param {Api_Github_Runner_BuildPoliciesEditCommand_Policies}      policies      - Policies.
   * @param {Api_Github_Runner_BuildPoliciesEditCommand_DefaultBranch} defaultBranch - Default branch.
   *
   * @returns {Api_Github_Runner_BuildPoliciesEditCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildPoliciesEditCommand(owner: Api_Github_Runner_BuildPoliciesEditCommand_Owner, repo: Api_Github_Runner_BuildPoliciesEditCommand_Repo, policies: Api_Github_Runner_BuildPoliciesEditCommand_Policies, defaultBranch: Api_Github_Runner_BuildPoliciesEditCommand_DefaultBranch): Api_Github_Runner_BuildPoliciesEditCommand_Returns {
    const flags: Api_Github_Runner_BuildPoliciesEditCommand_Flags = [];

    if (policies['visibility'] !== undefined) {
      flags.push(`--visibility=${policies['visibility']}`);
      flags.push('--accept-visibility-change-consequences');
    }

    if (defaultBranch !== undefined) {
      flags.push(`--default-branch=${shellQuote(defaultBranch)}`);
    }

    const mergeMethods: Api_Github_Runner_BuildPoliciesEditCommand_MergeMethods = policies['mergeMethods'];

    if (mergeMethods !== undefined) {
      if (mergeMethods['merge'] !== undefined) {
        flags.push(`--enable-merge-commit=${mergeMethods['merge']}`);
      }

      if (mergeMethods['squash'] !== undefined) {
        flags.push(`--enable-squash-merge=${mergeMethods['squash']}`);
      }

      if (mergeMethods['rebase'] !== undefined) {
        flags.push(`--enable-rebase-merge=${mergeMethods['rebase']}`);
      }
    }

    if (policies['autoDeleteHeadBranch'] !== undefined) {
      flags.push(`--delete-branch-on-merge=${policies['autoDeleteHeadBranch']}`);
    }

    if (policies['autoMerge'] !== undefined) {
      flags.push(`--enable-auto-merge=${policies['autoMerge']}`);
    }

    if (policies['allowUpdateBranch'] !== undefined) {
      flags.push(`--allow-update-branch=${policies['allowUpdateBranch']}`);
    }

    if (flags.length === 0) {
      return undefined;
    }

    return `gh repo edit ${owner}/${repo} ${flags.join(' ')}`;
  }

  /**
   * API - GitHub - Build Policies Update Command.
   *
   * Maps the merge commit and squash commit presentation and web sign-off settings
   * onto the repository PATCH endpoint. Returns undefined when none of them is set.
   *
   * @param {Api_Github_Runner_BuildPoliciesUpdateCommand_Owner}    owner    - Owner.
   * @param {Api_Github_Runner_BuildPoliciesUpdateCommand_Repo}     repo     - Repo.
   * @param {Api_Github_Runner_BuildPoliciesUpdateCommand_Policies} policies - Policies.
   *
   * @returns {Api_Github_Runner_BuildPoliciesUpdateCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildPoliciesUpdateCommand(owner: Api_Github_Runner_BuildPoliciesUpdateCommand_Owner, repo: Api_Github_Runner_BuildPoliciesUpdateCommand_Repo, policies: Api_Github_Runner_BuildPoliciesUpdateCommand_Policies): Api_Github_Runner_BuildPoliciesUpdateCommand_Returns {
    const flags: Api_Github_Runner_BuildPoliciesUpdateCommand_Flags = [];
    const mergeCommit: Api_Github_Runner_BuildPoliciesUpdateCommand_MergeCommit = policies['mergeCommit'];

    if (mergeCommit !== undefined) {
      if (mergeCommit['title'] === 'pull-request-title') {
        flags.push('-f merge_commit_title=PR_TITLE');
      }

      if (mergeCommit['title'] === 'merge-message') {
        flags.push('-f merge_commit_title=MERGE_MESSAGE');
      }

      if (mergeCommit['message'] === 'pull-request-body') {
        flags.push('-f merge_commit_message=PR_BODY');
      }

      if (mergeCommit['message'] === 'pull-request-title') {
        flags.push('-f merge_commit_message=PR_TITLE');
      }

      if (mergeCommit['message'] === 'blank') {
        flags.push('-f merge_commit_message=BLANK');
      }
    }

    const squashMerge: Api_Github_Runner_BuildPoliciesUpdateCommand_SquashMerge = policies['squashMerge'];

    if (squashMerge !== undefined) {
      if (squashMerge['title'] === 'pull-request-title') {
        flags.push('-f squash_merge_commit_title=PR_TITLE');
      }

      if (squashMerge['title'] === 'commit-or-pull-request-title') {
        flags.push('-f squash_merge_commit_title=COMMIT_OR_PR_TITLE');
      }

      if (squashMerge['message'] === 'pull-request-body') {
        flags.push('-f squash_merge_commit_message=PR_BODY');
      }

      if (squashMerge['message'] === 'commit-messages') {
        flags.push('-f squash_merge_commit_message=COMMIT_MESSAGES');
      }

      if (squashMerge['message'] === 'blank') {
        flags.push('-f squash_merge_commit_message=BLANK');
      }
    }

    if (policies['webCommitSignoffRequired'] !== undefined) {
      flags.push(`-F web_commit_signoff_required=${policies['webCommitSignoffRequired']}`);
    }

    if (flags.length === 0) {
      return undefined;
    }

    return `gh api --method PATCH repos/${owner}/${repo} ${flags.join(' ')}`;
  }

  /**
   * API - GitHub - Build Owner Plan Command.
   *
   * Reads the GitHub plan name of the repository owner. Organizations expose it to
   * their owners; a personal plan is only readable when the owner is signed in.
   *
   * @param {Api_Github_Runner_BuildOwnerPlanCommand_Owner}     owner     - Owner.
   * @param {Api_Github_Runner_BuildOwnerPlanCommand_OwnerType} ownerType - Owner type.
   *
   * @returns {Api_Github_Runner_BuildOwnerPlanCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildOwnerPlanCommand(owner: Api_Github_Runner_BuildOwnerPlanCommand_Owner, ownerType: Api_Github_Runner_BuildOwnerPlanCommand_OwnerType): Api_Github_Runner_BuildOwnerPlanCommand_Returns {
    if (ownerType === 'Organization') {
      return `gh api orgs/${owner} --jq ${shellQuote('.plan.name // ""')}`;
    }

    return `gh api user --jq ${shellQuote(`if .login == "${owner}" then .plan.name // "" else "" end`)}`;
  }

  /**
   * API - GitHub - Build Push Protection Command.
   *
   * Turns secret scanning push protection on or off with "gh repo edit". Push
   * protection depends on secret scanning, so callers order the two commands.
   *
   * @param {Api_Github_Runner_BuildPushProtectionCommand_Owner}   owner   - Owner.
   * @param {Api_Github_Runner_BuildPushProtectionCommand_Repo}    repo    - Repo.
   * @param {Api_Github_Runner_BuildPushProtectionCommand_Enabled} enabled - Enabled.
   *
   * @returns {Api_Github_Runner_BuildPushProtectionCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildPushProtectionCommand(owner: Api_Github_Runner_BuildPushProtectionCommand_Owner, repo: Api_Github_Runner_BuildPushProtectionCommand_Repo, enabled: Api_Github_Runner_BuildPushProtectionCommand_Enabled): Api_Github_Runner_BuildPushProtectionCommand_Returns {
    return `gh repo edit ${owner}/${repo} --enable-secret-scanning-push-protection=${enabled}`;
  }

  /**
   * API - GitHub - Build Release Download Prefix.
   *
   * Points at the folder GitHub serves release assets from. Generated pfSense
   * packages append the tag and file name to download an update.
   *
   * @param {Api_Github_Runner_BuildReleaseDownloadPrefix_Owner} owner - Owner.
   * @param {Api_Github_Runner_BuildReleaseDownloadPrefix_Repo}  repo  - Repo.
   *
   * @returns {Api_Github_Runner_BuildReleaseDownloadPrefix_Returns}
   *
   * @since 0.49.0
   */
  public static buildReleaseDownloadPrefix(owner: Api_Github_Runner_BuildReleaseDownloadPrefix_Owner, repo: Api_Github_Runner_BuildReleaseDownloadPrefix_Repo): Api_Github_Runner_BuildReleaseDownloadPrefix_Returns {
    return `https://github.com/${owner}/${repo}/releases/download/`;
  }

  /**
   * API - GitHub - Build Repository ID Command.
   *
   * Reads the GraphQL node ID of the repository, which GraphQL mutations such as
   * the sponsorships toggle need instead of the owner and name.
   *
   * @param {Api_Github_Runner_BuildRepositoryIdCommand_Owner} owner - Owner.
   * @param {Api_Github_Runner_BuildRepositoryIdCommand_Repo}  repo  - Repo.
   *
   * @returns {Api_Github_Runner_BuildRepositoryIdCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildRepositoryIdCommand(owner: Api_Github_Runner_BuildRepositoryIdCommand_Owner, repo: Api_Github_Runner_BuildRepositoryIdCommand_Repo): Api_Github_Runner_BuildRepositoryIdCommand_Returns {
    return `gh repo view ${owner}/${repo} --json id --jq .id`;
  }

  /**
   * API - GitHub - Build Repository Permission Command.
   *
   * Reads the signed-in user's permission on the repository as JSON, so recipes
   * can stop before sending changes they are not allowed to make.
   *
   * @param {Api_Github_Runner_BuildRepositoryPermissionCommand_Owner} owner - Owner.
   * @param {Api_Github_Runner_BuildRepositoryPermissionCommand_Repo}  repo  - Repo.
   *
   * @returns {Api_Github_Runner_BuildRepositoryPermissionCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildRepositoryPermissionCommand(owner: Api_Github_Runner_BuildRepositoryPermissionCommand_Owner, repo: Api_Github_Runner_BuildRepositoryPermissionCommand_Repo): Api_Github_Runner_BuildRepositoryPermissionCommand_Returns {
    return `gh repo view ${owner}/${repo} --json viewerPermission`;
  }

  /**
   * API - GitHub - Build Repository Visibility Command.
   *
   * Reads whether the repository is private and whether a user or an organization
   * owns it, one value per line, for "parseRepositoryVisibility" to read.
   *
   * @param {Api_Github_Runner_BuildRepositoryVisibilityCommand_Owner} owner - Owner.
   * @param {Api_Github_Runner_BuildRepositoryVisibilityCommand_Repo}  repo  - Repo.
   *
   * @returns {Api_Github_Runner_BuildRepositoryVisibilityCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildRepositoryVisibilityCommand(owner: Api_Github_Runner_BuildRepositoryVisibilityCommand_Owner, repo: Api_Github_Runner_BuildRepositoryVisibilityCommand_Repo): Api_Github_Runner_BuildRepositoryVisibilityCommand_Returns {
    return `gh api repos/${owner}/${repo} --jq ${shellQuote('.private, .owner.type')}`;
  }

  /**
   * API - GitHub - Build Ruleset Lookup Command.
   *
   * Lists the repository's own rulesets and prints only the ID of the one with the
   * given name, so rulesets owned by someone else are never touched.
   *
   * @param {Api_Github_Runner_BuildRulesetLookupCommand_Owner}       owner       - Owner.
   * @param {Api_Github_Runner_BuildRulesetLookupCommand_Repo}        repo        - Repo.
   * @param {Api_Github_Runner_BuildRulesetLookupCommand_RulesetName} rulesetName - Ruleset name.
   *
   * @returns {Api_Github_Runner_BuildRulesetLookupCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildRulesetLookupCommand(owner: Api_Github_Runner_BuildRulesetLookupCommand_Owner, repo: Api_Github_Runner_BuildRulesetLookupCommand_Repo, rulesetName: Api_Github_Runner_BuildRulesetLookupCommand_RulesetName): Api_Github_Runner_BuildRulesetLookupCommand_Returns {
    const query: Api_Github_Runner_BuildRulesetLookupCommand_Query = `.[] | select(.name == "${rulesetName}" and .source_type == "Repository") | .id`;

    return `gh api repos/${owner}/${repo}/rulesets --paginate --jq ${shellQuote(query)}`;
  }

  /**
   * API - GitHub - Build Ruleset Save Command.
   *
   * Builds the full default-branch ruleset payload and creates it with POST, or
   * replaces the existing ruleset with PUT when its ID is known.
   *
   * @param {Api_Github_Runner_BuildRulesetSaveCommand_Owner}         owner         - Owner.
   * @param {Api_Github_Runner_BuildRulesetSaveCommand_Repo}          repo          - Repo.
   * @param {Api_Github_Runner_BuildRulesetSaveCommand_RulesetId}     rulesetId     - Ruleset id.
   * @param {Api_Github_Runner_BuildRulesetSaveCommand_RulesetName}   rulesetName   - Ruleset name.
   * @param {Api_Github_Runner_BuildRulesetSaveCommand_DefaultBranch} defaultBranch - Default branch.
   *
   * @returns {Api_Github_Runner_BuildRulesetSaveCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildRulesetSaveCommand(owner: Api_Github_Runner_BuildRulesetSaveCommand_Owner, repo: Api_Github_Runner_BuildRulesetSaveCommand_Repo, rulesetId: Api_Github_Runner_BuildRulesetSaveCommand_RulesetId, rulesetName: Api_Github_Runner_BuildRulesetSaveCommand_RulesetName, defaultBranch: Api_Github_Runner_BuildRulesetSaveCommand_DefaultBranch): Api_Github_Runner_BuildRulesetSaveCommand_Returns {
    const enforcement: Api_Github_Runner_BuildRulesetSaveCommand_Enforcement = defaultBranch['enforcement'] ?? 'active';
    const flags: Api_Github_Runner_BuildRulesetSaveCommand_Flags = [
      `-f ${shellQuote(`name=${rulesetName}`)}`,
      '-f target=branch',
      `-f enforcement=${enforcement}`,
      `-f ${shellQuote('conditions[ref_name][include][]=~DEFAULT_BRANCH')}`,
      `-F ${shellQuote('conditions[ref_name][exclude][]')}`,
    ];

    if (defaultBranch['blockDeletions'] === true) {
      flags.push(`-f ${shellQuote('rules[][type]=deletion')}`);
    }

    if (defaultBranch['blockForcePushes'] === true) {
      flags.push(`-f ${shellQuote('rules[][type]=non_fast_forward')}`);
    }

    if (defaultBranch['requireLinearHistory'] === true) {
      flags.push(`-f ${shellQuote('rules[][type]=required_linear_history')}`);
    }

    if (defaultBranch['requireSignedCommits'] === true) {
      flags.push(`-f ${shellQuote('rules[][type]=required_signatures')}`);
    }

    const allowedMergeMethods: Api_Github_Runner_BuildRulesetSaveCommand_AllowedMergeMethods = defaultBranch['allowedMergeMethods'];

    if (
      defaultBranch['requirePullRequest'] === true
      && allowedMergeMethods !== undefined
    ) {
      flags.push(`-f ${shellQuote('rules[][type]=pull_request')}`);

      for (const allowedMergeMethod of allowedMergeMethods) {
        flags.push(`-f ${shellQuote(`rules[][parameters][allowed_merge_methods][]=${allowedMergeMethod}`)}`);
      }

      flags.push(`-F ${shellQuote(`rules[][parameters][dismiss_stale_reviews_on_push]=${defaultBranch['dismissStaleReviews'] ?? false}`)}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][require_code_owner_review]=${defaultBranch['requireCodeOwnerReview'] ?? false}`)}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][require_last_push_approval]=${defaultBranch['requireLastPushApproval'] ?? false}`)}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][required_approving_review_count]=${defaultBranch['requiredApprovals'] ?? 0}`)}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][required_review_thread_resolution]=${defaultBranch['requireConversationResolution'] ?? false}`)}`);
    }

    const requiredStatusChecks: Api_Github_Runner_BuildRulesetSaveCommand_RequiredStatusChecks = defaultBranch['requiredStatusChecks'];

    if (requiredStatusChecks !== undefined && requiredStatusChecks.length > 0) {
      flags.push(`-f ${shellQuote('rules[][type]=required_status_checks')}`);

      for (const requiredStatusCheck of requiredStatusChecks) {
        flags.push(`-f ${shellQuote(`rules[][parameters][required_status_checks][][context]=${requiredStatusCheck}`)}`);
      }

      flags.push(`-F ${shellQuote('rules[][parameters][do_not_enforce_on_create]=false')}`);
      flags.push(`-F ${shellQuote(`rules[][parameters][strict_required_status_checks_policy]=${defaultBranch['requireBranchesToBeUpToDate'] ?? false}`)}`);
    }

    const method: Api_Github_Runner_BuildRulesetSaveCommand_Method = (rulesetId === undefined) ? 'POST' : 'PUT';
    const endpoint: Api_Github_Runner_BuildRulesetSaveCommand_Endpoint = (rulesetId === undefined) ? `repos/${owner}/${repo}/rulesets` : `repos/${owner}/${repo}/rulesets/${rulesetId}`;

    return `gh api --method ${method} ${endpoint} ${flags.join(' ')} --silent`;
  }

  /**
   * API - GitHub - Build Secret Scanning Command.
   *
   * Turns secret scanning on or off with "gh repo edit". Secret scanning must be on
   * before push protection can be turned on.
   *
   * @param {Api_Github_Runner_BuildSecretScanningCommand_Owner}   owner   - Owner.
   * @param {Api_Github_Runner_BuildSecretScanningCommand_Repo}    repo    - Repo.
   * @param {Api_Github_Runner_BuildSecretScanningCommand_Enabled} enabled - Enabled.
   *
   * @returns {Api_Github_Runner_BuildSecretScanningCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildSecretScanningCommand(owner: Api_Github_Runner_BuildSecretScanningCommand_Owner, repo: Api_Github_Runner_BuildSecretScanningCommand_Repo, enabled: Api_Github_Runner_BuildSecretScanningCommand_Enabled): Api_Github_Runner_BuildSecretScanningCommand_Returns {
    return `gh repo edit ${owner}/${repo} --enable-secret-scanning=${enabled}`;
  }

  /**
   * API - GitHub - Build Selected Actions Command.
   *
   * Maps the GitHub-owned, verified-creator, and pattern allowlist onto the selected
   * actions endpoint. An empty pattern list clears the allowlist.
   *
   * @param {Api_Github_Runner_BuildSelectedActionsCommand_Owner}           owner           - Owner.
   * @param {Api_Github_Runner_BuildSelectedActionsCommand_Repo}            repo            - Repo.
   * @param {Api_Github_Runner_BuildSelectedActionsCommand_SelectedActions} selectedActions - Selected actions.
   *
   * @returns {Api_Github_Runner_BuildSelectedActionsCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildSelectedActionsCommand(owner: Api_Github_Runner_BuildSelectedActionsCommand_Owner, repo: Api_Github_Runner_BuildSelectedActionsCommand_Repo, selectedActions: Api_Github_Runner_BuildSelectedActionsCommand_SelectedActions): Api_Github_Runner_BuildSelectedActionsCommand_Returns {
    const flags: Api_Github_Runner_BuildSelectedActionsCommand_Flags = [];

    if (selectedActions['githubOwned'] !== undefined) {
      flags.push(`-F github_owned_allowed=${selectedActions['githubOwned']}`);
    }

    if (selectedActions['verified'] !== undefined) {
      flags.push(`-F verified_allowed=${selectedActions['verified']}`);
    }

    if (selectedActions['patterns'] !== undefined) {
      if (selectedActions['patterns'].length === 0) {
        flags.push(`-F ${shellQuote('patterns_allowed[]')}`);
      }

      for (const pattern of selectedActions['patterns']) {
        flags.push(`-f ${shellQuote(`patterns_allowed[]=${pattern}`)}`);
      }
    }

    if (flags.length === 0) {
      return undefined;
    }

    return `gh api --method PUT repos/${owner}/${repo}/actions/permissions/selected-actions ${flags.join(' ')} --silent`;
  }

  /**
   * API - GitHub - Build Sponsorships Command.
   *
   * Turns the repository Sponsor button on or off through GitHub GraphQL, which is
   * the only API that exposes this setting.
   *
   * @param {Api_Github_Runner_BuildSponsorshipsCommand_RepositoryId} repositoryId - Repository id.
   * @param {Api_Github_Runner_BuildSponsorshipsCommand_Enabled}      enabled      - Enabled.
   *
   * @returns {Api_Github_Runner_BuildSponsorshipsCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildSponsorshipsCommand(repositoryId: Api_Github_Runner_BuildSponsorshipsCommand_RepositoryId, enabled: Api_Github_Runner_BuildSponsorshipsCommand_Enabled): Api_Github_Runner_BuildSponsorshipsCommand_Returns {
    const mutation: Api_Github_Runner_BuildSponsorshipsCommand_Mutation = 'mutation($repositoryId: ID!, $enabled: Boolean!) { updateRepository(input: { repositoryId: $repositoryId, hasSponsorshipsEnabled: $enabled }) { repository { id } } }';

    return `gh api graphql -f query=${shellQuote(mutation)} -F repositoryId=${shellQuote(repositoryId)} -F enabled=${enabled}`;
  }

  /**
   * API - GitHub - Build Topics Replace Command.
   *
   * Replaces every repository topic with the given list. An empty list clears all
   * topics on the repository.
   *
   * @param {Api_Github_Runner_BuildTopicsReplaceCommand_Owner}  owner  - Owner.
   * @param {Api_Github_Runner_BuildTopicsReplaceCommand_Repo}   repo   - Repo.
   * @param {Api_Github_Runner_BuildTopicsReplaceCommand_Topics} topics - Topics.
   *
   * @returns {Api_Github_Runner_BuildTopicsReplaceCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildTopicsReplaceCommand(owner: Api_Github_Runner_BuildTopicsReplaceCommand_Owner, repo: Api_Github_Runner_BuildTopicsReplaceCommand_Repo, topics: Api_Github_Runner_BuildTopicsReplaceCommand_Topics): Api_Github_Runner_BuildTopicsReplaceCommand_Returns {
    const topicFlags: Api_Github_Runner_BuildTopicsReplaceCommand_TopicFlags = (topics.length === 0) ? `-f ${shellQuote('names[]')}` : topics.map((topic) => `-f ${shellQuote(`names[]=${topic}`)}`).join(' ');

    return `gh api -X PUT /repos/${owner}/${repo}/topics ${topicFlags}`.trim();
  }

  /**
   * API - GitHub - Build Vulnerability Alerts Command.
   *
   * Turns Dependabot vulnerability alerts on with PUT or off with DELETE on the
   * repository vulnerability alerts endpoint.
   *
   * @param {Api_Github_Runner_BuildVulnerabilityAlertsCommand_Owner}   owner   - Owner.
   * @param {Api_Github_Runner_BuildVulnerabilityAlertsCommand_Repo}    repo    - Repo.
   * @param {Api_Github_Runner_BuildVulnerabilityAlertsCommand_Enabled} enabled - Enabled.
   *
   * @returns {Api_Github_Runner_BuildVulnerabilityAlertsCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildVulnerabilityAlertsCommand(owner: Api_Github_Runner_BuildVulnerabilityAlertsCommand_Owner, repo: Api_Github_Runner_BuildVulnerabilityAlertsCommand_Repo, enabled: Api_Github_Runner_BuildVulnerabilityAlertsCommand_Enabled): Api_Github_Runner_BuildVulnerabilityAlertsCommand_Returns {
    const method: Api_Github_Runner_BuildVulnerabilityAlertsCommand_Method = (enabled === true) ? 'PUT' : 'DELETE';

    return `gh api --method ${method} repos/${owner}/${repo}/vulnerability-alerts --silent`;
  }

  /**
   * API - GitHub - Build Workflow Permissions Command.
   *
   * Maps the default GITHUB_TOKEN permission and the pull request approval toggle
   * onto the workflow permissions endpoint. Returns undefined when neither is set.
   *
   * @param {Api_Github_Runner_BuildWorkflowPermissionsCommand_Owner}   owner   - Owner.
   * @param {Api_Github_Runner_BuildWorkflowPermissionsCommand_Repo}    repo    - Repo.
   * @param {Api_Github_Runner_BuildWorkflowPermissionsCommand_Actions} actions - Actions.
   *
   * @returns {Api_Github_Runner_BuildWorkflowPermissionsCommand_Returns}
   *
   * @since 0.49.0
   */
  public static buildWorkflowPermissionsCommand(owner: Api_Github_Runner_BuildWorkflowPermissionsCommand_Owner, repo: Api_Github_Runner_BuildWorkflowPermissionsCommand_Repo, actions: Api_Github_Runner_BuildWorkflowPermissionsCommand_Actions): Api_Github_Runner_BuildWorkflowPermissionsCommand_Returns {
    const flags: Api_Github_Runner_BuildWorkflowPermissionsCommand_Flags = [];

    if (actions['defaultWorkflowPermissions'] !== undefined) {
      flags.push(`-f default_workflow_permissions=${actions['defaultWorkflowPermissions']}`);
    }

    if (actions['canApprovePullRequestReviews'] !== undefined) {
      flags.push(`-F can_approve_pull_request_reviews=${actions['canApprovePullRequestReviews']}`);
    }

    if (flags.length === 0) {
      return undefined;
    }

    return `gh api --method PUT repos/${owner}/${repo}/actions/permissions/workflow ${flags.join(' ')} --silent`;
  }

  /**
   * API - GitHub - Is Ruleset Plan Error.
   *
   * Recognizes the 403 GitHub returns when a private repository's plan cannot use
   * rulesets, as opposed to a permission or network failure.
   *
   * @param {Api_Github_Runner_IsRulesetPlanError_TextError} textError - Text error.
   *
   * @returns {Api_Github_Runner_IsRulesetPlanError_Returns}
   *
   * @since 0.49.0
   */
  public static isRulesetPlanError(textError: Api_Github_Runner_IsRulesetPlanError_TextError): Api_Github_Runner_IsRulesetPlanError_Returns {
    return (
      textError.includes('Upgrade to GitHub Pro')
      || textError.includes('make this repository public to enable this feature')
    );
  }

  /**
   * API - GitHub - Is Ruleset Plan Unsupported.
   *
   * Reports whether a plan name read by "buildOwnerPlanCommand" belongs to the free
   * plan, which cannot use rulesets on private repositories.
   *
   * @param {Api_Github_Runner_IsRulesetPlanUnsupported_PlanName} planName - Plan name.
   *
   * @returns {Api_Github_Runner_IsRulesetPlanUnsupported_Returns}
   *
   * @since 0.49.0
   */
  public static isRulesetPlanUnsupported(planName: Api_Github_Runner_IsRulesetPlanUnsupported_PlanName): Api_Github_Runner_IsRulesetPlanUnsupported_Returns {
    return planName.trim().toLowerCase() === 'free';
  }

  /**
   * API - GitHub - Parse Repository Visibility.
   *
   * Reads the two lines printed by "buildRepositoryVisibilityCommand". Anything other
   * than "true" on the first line counts as a public repository.
   *
   * @param {Api_Github_Runner_ParseRepositoryVisibility_TextOut} textOut - Text out.
   *
   * @returns {Api_Github_Runner_ParseRepositoryVisibility_Returns}
   *
   * @since 0.49.0
   */
  public static parseRepositoryVisibility(textOut: Api_Github_Runner_ParseRepositoryVisibility_TextOut): Api_Github_Runner_ParseRepositoryVisibility_Returns {
    const lines: Api_Github_Runner_ParseRepositoryVisibility_Lines = textOut.split('\n').map((line) => line.trim());

    return {
      isPrivate: lines[0] === 'true',
      ownerType: (lines[1] === 'Organization') ? 'Organization' : 'User',
    };
  }
}

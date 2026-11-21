import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as ApiGithub } from '../../api/github.js';

/**
 * Tests - API - GitHub - Actions Commands.
 *
 * @since 0.49.0
 */
describe('actions commands', async () => {
  it('maps every Actions permission setting onto one PUT', async () => {
    strictEqual(ApiGithub.buildActionsPermissionsCommand('acme', 'widget', {
      enabled: true,
      allowedActions: 'local-only',
      shaPinningRequired: false,
    }), 'gh api --method PUT repos/acme/widget/actions/permissions -F enabled=true -f allowed_actions=local_only -F sha_pinning_required=false --silent');

    strictEqual(ApiGithub.buildActionsPermissionsCommand('acme', 'widget', {
      allowedActions: 'all',
    }), 'gh api --method PUT repos/acme/widget/actions/permissions -f allowed_actions=all --silent');

    strictEqual(ApiGithub.buildActionsPermissionsCommand('acme', 'widget', {
      allowedActions: 'selected',
    }), 'gh api --method PUT repos/acme/widget/actions/permissions -f allowed_actions=selected --silent');

    return;
  });

  it('returns undefined when no Actions permission setting is set', async () => {
    strictEqual(ApiGithub.buildActionsPermissionsCommand('acme', 'widget', {
      artifactRetentionDays: 7,
    }), undefined);

    strictEqual(ApiGithub.buildWorkflowPermissionsCommand('acme', 'widget', {
      enabled: true,
    }), undefined);

    strictEqual(ApiGithub.buildSelectedActionsCommand('acme', 'widget', {}), undefined);

    return;
  });

  it('clears the pattern allowlist with an empty list and quotes each pattern', async () => {
    strictEqual(ApiGithub.buildSelectedActionsCommand('acme', 'widget', {
      githubOwned: false,
      verified: true,
      patterns: [],
    }), 'gh api --method PUT repos/acme/widget/actions/permissions/selected-actions -F github_owned_allowed=false -F verified_allowed=true -F "patterns_allowed[]" --silent');

    strictEqual(ApiGithub.buildSelectedActionsCommand('acme', 'widget', {
      patterns: [
        'a/*',
        'b/c@v1',
      ],
    }), 'gh api --method PUT repos/acme/widget/actions/permissions/selected-actions -f "patterns_allowed[]=a/*" -f "patterns_allowed[]=b/c@v1" --silent');

    return;
  });

  it('maps workflow token defaults and artifact retention', async () => {
    strictEqual(ApiGithub.buildWorkflowPermissionsCommand('acme', 'widget', {
      defaultWorkflowPermissions: 'write',
      canApprovePullRequestReviews: true,
    }), 'gh api --method PUT repos/acme/widget/actions/permissions/workflow -f default_workflow_permissions=write -F can_approve_pull_request_reviews=true --silent');

    strictEqual(ApiGithub.buildArtifactRetentionCommand('acme', 'widget', 7), 'gh api --method PUT repos/acme/widget/actions/permissions/artifact-and-log-retention -F days=7 --silent');

    return;
  });

  return;
});

/**
 * Tests - API - GitHub - Security Commands.
 *
 * @since 0.49.0
 */
describe('security commands', async () => {
  it('switches between PUT and DELETE for alert endpoints', async () => {
    strictEqual(ApiGithub.buildVulnerabilityAlertsCommand('acme', 'widget', true), 'gh api --method PUT repos/acme/widget/vulnerability-alerts --silent');

    strictEqual(ApiGithub.buildVulnerabilityAlertsCommand('acme', 'widget', false), 'gh api --method DELETE repos/acme/widget/vulnerability-alerts --silent');

    strictEqual(ApiGithub.buildAutomatedSecurityFixesCommand('acme', 'widget', true), 'gh api --method PUT repos/acme/widget/automated-security-fixes --silent');

    strictEqual(ApiGithub.buildAutomatedSecurityFixesCommand('acme', 'widget', false), 'gh api --method DELETE repos/acme/widget/automated-security-fixes --silent');

    return;
  });

  it('edits secret scanning and push protection separately', async () => {
    strictEqual(ApiGithub.buildSecretScanningCommand('acme', 'widget', false), 'gh repo edit acme/widget --enable-secret-scanning=false');

    strictEqual(ApiGithub.buildPushProtectionCommand('acme', 'widget', true), 'gh repo edit acme/widget --enable-secret-scanning-push-protection=true');

    return;
  });

  return;
});

/**
 * Tests - API - GitHub - Repository Commands.
 *
 * @since 0.49.0
 */
describe('repository commands', async () => {
  it('maps every policy onto gh repo edit flags in a fixed order', async () => {
    strictEqual(ApiGithub.buildPoliciesEditCommand('acme', 'widget', {
      visibility: 'public',
      defaultBranch: 'main',
      mergeMethods: {
        merge: false,
        squash: true,
        rebase: false,
      },
      autoDeleteHeadBranch: true,
      autoMerge: false,
      allowUpdateBranch: true,
    }, 'main'), 'gh repo edit acme/widget --visibility=public --accept-visibility-change-consequences --default-branch="main" --enable-merge-commit=false --enable-squash-merge=true --enable-rebase-merge=false --delete-branch-on-merge=true --enable-auto-merge=false --allow-update-branch=true');

    strictEqual(ApiGithub.buildPoliciesEditCommand('acme', 'widget', {
      defaultBranch: 'main',
    }, undefined), undefined);

    return;
  });

  it('maps merge presentation policies onto one PATCH', async () => {
    strictEqual(ApiGithub.buildPoliciesUpdateCommand('acme', 'widget', {
      mergeCommit: {
        title: 'merge-message',
        message: 'pull-request-title',
      },
      squashMerge: {
        title: 'pull-request-title',
        message: 'blank',
      },
      webCommitSignoffRequired: false,
    }), 'gh api --method PATCH repos/acme/widget -f merge_commit_title=MERGE_MESSAGE -f merge_commit_message=PR_TITLE -f squash_merge_commit_title=PR_TITLE -f squash_merge_commit_message=BLANK -F web_commit_signoff_required=false');

    strictEqual(ApiGithub.buildPoliciesUpdateCommand('acme', 'widget', {
      mergeCommit: {
        title: 'pull-request-title',
        message: 'blank',
      },
      squashMerge: {
        title: 'commit-or-pull-request-title',
        message: 'pull-request-body',
      },
    }), 'gh api --method PATCH repos/acme/widget -f merge_commit_title=PR_TITLE -f merge_commit_message=BLANK -f squash_merge_commit_title=COMMIT_OR_PR_TITLE -f squash_merge_commit_message=PR_BODY');

    strictEqual(ApiGithub.buildPoliciesUpdateCommand('acme', 'widget', {
      autoMerge: true,
    }), undefined);

    return;
  });

  it('maps features, identity, topics, and labels', async () => {
    strictEqual(ApiGithub.buildFeaturesEditCommand('acme', 'widget', {
      issues: true,
      wiki: false,
      projects: false,
      discussions: true,
      sponsorships: false,
    }), 'gh repo edit acme/widget --enable-issues=true --enable-wiki=false --enable-projects=false --enable-discussions=true');

    strictEqual(ApiGithub.buildFeaturesEditCommand('acme', 'widget', {
      sponsorships: true,
    }), undefined);

    strictEqual(ApiGithub.buildIdentityEditCommand('acme', 'widget', 'A "quoted" $thing', 'https://example.com'), 'gh repo edit acme/widget --description "A \\"quoted\\" \\$thing" --homepage "https://example.com"');

    strictEqual(ApiGithub.buildIdentityEditCommand('acme', 'widget', undefined, undefined), undefined);

    strictEqual(ApiGithub.buildTopicsReplaceCommand('acme', 'widget', [
      'foo-bar',
      'baz-qux',
    ]), 'gh api -X PUT /repos/acme/widget/topics -f "names[]=foo-bar" -f "names[]=baz-qux"');

    strictEqual(ApiGithub.buildTopicsReplaceCommand('acme', 'widget', []), 'gh api -X PUT /repos/acme/widget/topics -f "names[]"');

    strictEqual(ApiGithub.buildLabelCreateCommand('acme', 'widget', {
      name: 'x y',
      color: '000000',
    }), 'gh label create "x y" --repo acme/widget --color "000000" --description "" --force');

    return;
  });

  it('builds the lookup and GraphQL commands', async () => {
    strictEqual(ApiGithub.buildBranchLookupCommand('acme', 'widget', 'main'), 'gh api repos/acme/widget/branches/"main"');

    strictEqual(ApiGithub.buildRepositoryIdCommand('acme', 'widget'), 'gh repo view acme/widget --json id --jq .id');

    strictEqual(ApiGithub.buildRepositoryPermissionCommand('acme', 'widget'), 'gh repo view acme/widget --json viewerPermission');

    strictEqual(ApiGithub.buildSponsorshipsCommand('R_example', false), 'gh api graphql -f query="mutation(\\$repositoryId: ID!, \\$enabled: Boolean!) { updateRepository(input: { repositoryId: \\$repositoryId, hasSponsorshipsEnabled: \\$enabled }) { repository { id } } }" -F repositoryId="R_example" -F enabled=false');

    return;
  });

  it('builds the release URLs read by generated pfSense packages', async () => {
    strictEqual(ApiGithub.buildLatestReleaseApiUrl('example', 'firewall'), 'https://api.github.com/repos/example/firewall/releases/latest');

    strictEqual(ApiGithub.buildReleaseDownloadPrefix('example', 'firewall'), 'https://github.com/example/firewall/releases/download/');

    return;
  });

  return;
});

/**
 * Tests - API - GitHub - Ruleset Commands.
 *
 * @since 0.49.0
 */
describe('ruleset commands', async () => {
  it('looks up only the repository ruleset with the given name', async () => {
    strictEqual(ApiGithub.buildRulesetLookupCommand('acme', 'widget', 'Nova default branch'), 'gh api repos/acme/widget/rulesets --paginate --jq ".[] | select(.name == \\"Nova default branch\\" and .source_type == \\"Repository\\") | .id"');

    return;
  });

  it('creates a ruleset with every rule and updates it by ID', async () => {
    for (const target of [
      {
        rulesetId: undefined,
        request: 'POST repos/acme/widget/rulesets',
      },
      {
        rulesetId: '42',
        request: 'PUT repos/acme/widget/rulesets/42',
      },
    ]) {
      strictEqual(ApiGithub.buildRulesetSaveCommand('acme', 'widget', target['rulesetId'], 'Nova default branch', {
        enforcement: 'evaluate',
        blockDeletions: true,
        blockForcePushes: true,
        requireLinearHistory: true,
        requireSignedCommits: true,
        requirePullRequest: true,
        allowedMergeMethods: [
          'squash',
          'rebase',
        ],
        dismissStaleReviews: true,
        requireCodeOwnerReview: true,
        requireLastPushApproval: true,
        requiredApprovals: 2,
        requireConversationResolution: true,
        requiredStatusChecks: [
          'check',
          'build',
        ],
        requireBranchesToBeUpToDate: true,
      }), `gh api --method ${target['request']} -f "name=Nova default branch" -f target=branch -f enforcement=evaluate -f "conditions[ref_name][include][]=~DEFAULT_BRANCH" -F "conditions[ref_name][exclude][]" -f "rules[][type]=deletion" -f "rules[][type]=non_fast_forward" -f "rules[][type]=required_linear_history" -f "rules[][type]=required_signatures" -f "rules[][type]=pull_request" -f "rules[][parameters][allowed_merge_methods][]=squash" -f "rules[][parameters][allowed_merge_methods][]=rebase" -F "rules[][parameters][dismiss_stale_reviews_on_push]=true" -F "rules[][parameters][require_code_owner_review]=true" -F "rules[][parameters][require_last_push_approval]=true" -F "rules[][parameters][required_approving_review_count]=2" -F "rules[][parameters][required_review_thread_resolution]=true" -f "rules[][type]=required_status_checks" -f "rules[][parameters][required_status_checks][][context]=check" -f "rules[][parameters][required_status_checks][][context]=build" -F "rules[][parameters][do_not_enforce_on_create]=false" -F "rules[][parameters][strict_required_status_checks_policy]=true" --silent`);
    }

    return;
  });

  it('reads repository privacy and the owner plan for the ruleset plan check', async () => {
    strictEqual(ApiGithub.buildRepositoryVisibilityCommand('acme', 'widget'), 'gh api repos/acme/widget --jq ".private, .owner.type"');

    strictEqual(ApiGithub.buildOwnerPlanCommand('acme', 'Organization'), 'gh api orgs/acme --jq ".plan.name // \\"\\""');

    strictEqual(ApiGithub.buildOwnerPlanCommand('octo-user', 'User'), 'gh api user --jq "if .login == \\"octo-user\\" then .plan.name // \\"\\" else \\"\\" end"');

    deepStrictEqual(ApiGithub.parseRepositoryVisibility([
      'true',
      'Organization',
    ].join('\n')), {
      isPrivate: true,
      ownerType: 'Organization',
    });

    deepStrictEqual(ApiGithub.parseRepositoryVisibility([
      'false',
      'User',
      '',
    ].join('\n')), {
      isPrivate: false,
      ownerType: 'User',
    });

    strictEqual(ApiGithub.isRulesetPlanUnsupported(' Free '), true);

    strictEqual(ApiGithub.isRulesetPlanUnsupported('team'), false);

    strictEqual(ApiGithub.isRulesetPlanUnsupported(''), false);

    strictEqual(ApiGithub.isRulesetPlanError('gh: Upgrade to GitHub Pro or make this repository public to enable this feature. (HTTP 403)'), true);

    strictEqual(ApiGithub.isRulesetPlanError('gh: Not Found (HTTP 404)'), false);

    return;
  });

  it('defaults enforcement to active and pull request parameters to off', async () => {
    strictEqual(ApiGithub.buildRulesetSaveCommand('acme', 'widget', undefined, 'Nova default branch', {
      blockDeletions: true,
      requirePullRequest: true,
      allowedMergeMethods: ['merge'],
    }), 'gh api --method POST repos/acme/widget/rulesets -f "name=Nova default branch" -f target=branch -f enforcement=active -f "conditions[ref_name][include][]=~DEFAULT_BRANCH" -F "conditions[ref_name][exclude][]" -f "rules[][type]=deletion" -f "rules[][type]=pull_request" -f "rules[][parameters][allowed_merge_methods][]=merge" -F "rules[][parameters][dismiss_stale_reviews_on_push]=false" -F "rules[][parameters][require_code_owner_review]=false" -F "rules[][parameters][require_last_push_approval]=false" -F "rules[][parameters][required_approving_review_count]=0" -F "rules[][parameters][required_review_thread_resolution]=false" --silent');

    return;
  });

  return;
});

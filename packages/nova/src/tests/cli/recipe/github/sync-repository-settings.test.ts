import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { executeGhCommands } from '../../../../cli/recipe/github/gh-commands.js';
import { ghPrecheck } from '../../../../cli/recipe/github/gh-precheck.js';
import { Runner as CliRecipeGithubSyncActions } from '../../../../cli/recipe/github/sync-actions.js';
import { Runner as CliRecipeGithubSyncFeatures } from '../../../../cli/recipe/github/sync-features.js';
import { Runner as CliRecipeGithubSyncLabels } from '../../../../cli/recipe/github/sync-labels.js';
import { Runner as CliRecipeGithubSyncPolicies } from '../../../../cli/recipe/github/sync-policies.js';
import { Runner as CliRecipeGithubSyncRulesets } from '../../../../cli/recipe/github/sync-rulesets.js';
import { Runner as CliRecipeGithubSyncSecurity } from '../../../../cli/recipe/github/sync-security.js';
import * as utility from '../../../../lib/utility.js';

vi.mock('../../../../cli/recipe/github/gh-commands.js', () => ({
  executeGhCommands: vi.fn(),
}));

vi.mock('../../../../cli/recipe/github/gh-precheck.js', () => ({
  ghPrecheck: vi.fn(),
}));

/**
 * Tests - CLI - Recipe - GitHub - Sync Repository Settings - Sync Repository Settings.
 *
 * Confirms each focused repository-settings recipe translates Nova's declarative
 * configuration into the expected GitHub CLI mutations.
 *
 * @since 0.26.0
 */
describe('sync repository settings', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(executeGhCommands).mockResolvedValue(true);

    process.exitCode = undefined;

    return;
  });

  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = undefined;

    return;
  });

  it('maps the complete Actions policy to repository API calls', async () => {
    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        actions: {
          enabled: true,
          allowedActions: 'selected',
          shaPinningRequired: true,
          selectedActions: {
            githubOwned: true,
            verified: false,
            patterns: ['actions/*'],
          },
          defaultWorkflowPermissions: 'read',
          canApprovePullRequestReviews: false,
          artifactRetentionDays: 30,
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: false,
    });

    await CliRecipeGithubSyncActions.run({});

    expect(executeGhCommands).toHaveBeenCalledWith([
      'gh api --method PUT repos/acme/widget/actions/permissions -F enabled=true -f allowed_actions=selected -F sha_pinning_required=true --silent',
      'gh api --method PUT repos/acme/widget/actions/permissions/selected-actions -F github_owned_allowed=true -F verified_allowed=false -f "patterns_allowed[]=actions/*" --silent',
      'gh api --method PUT repos/acme/widget/actions/permissions/workflow -f default_workflow_permissions=read -F can_approve_pull_request_reviews=false --silent',
      'gh api --method PUT repos/acme/widget/actions/permissions/artifact-and-log-retention -F days=30 --silent',
    ], 'sync-actions', false);

    return;
  });

  it('creates or updates only the configured labels', async () => {
    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        labels: [{
          name: 'needs triage',
          color: 'D73A4A',
          description: 'Needs review',
        }],
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: true,
    });

    await CliRecipeGithubSyncLabels.run({ dryRun: true });

    expect(executeGhCommands).toHaveBeenCalledWith(['gh label create "needs triage" --repo acme/widget --color "D73A4A" --description "Needs review" --force'], 'sync-labels', true);

    return;
  });

  it('syncs sponsorships through GitHub GraphQL after resolving the repository ID', async () => {
    vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: 'R_example',
      textError: '',
      code: 0,
    });

    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        features: {
          sponsorships: true,
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: false,
    });

    await CliRecipeGithubSyncFeatures.run({});

    expect(utility['executeShell']).toHaveBeenNthCalledWith(1, 'gh repo view acme/widget --json id --jq .id');

    expect(utility['executeShell']).toHaveBeenNthCalledWith(2, expect.stringContaining('hasSponsorshipsEnabled'));

    expect(utility['executeShell']).toHaveBeenNthCalledWith(2, expect.stringContaining('-F enabled=true'));

    return;
  });

  it('previews sponsorships without sending its GraphQL mutation during dry run', async () => {
    vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: 'R_example',
      textError: '',
      code: 0,
    });

    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        features: {
          sponsorships: true,
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: true,
    });

    await CliRecipeGithubSyncFeatures.run({ dryRun: true });

    expect(utility['executeShell']).toHaveBeenCalledTimes(1);

    expect(utility['executeShell']).toHaveBeenCalledWith('gh repo view acme/widget --json id --jq .id');

    return;
  });

  it('maps merge presentation and collaboration policies to GitHub settings', async () => {
    vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        policies: {
          autoMerge: true,
          allowUpdateBranch: true,
          mergeCommit: {
            title: 'pull-request-title',
            message: 'pull-request-body',
          },
          squashMerge: {
            title: 'commit-or-pull-request-title',
            message: 'commit-messages',
          },
          webCommitSignoffRequired: true,
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: false,
    });

    await CliRecipeGithubSyncPolicies.run({});

    expect(utility['executeShell']).toHaveBeenNthCalledWith(1, 'gh repo edit acme/widget --enable-auto-merge=true --allow-update-branch=true');

    expect(utility['executeShell']).toHaveBeenNthCalledWith(2, 'gh api --method PATCH repos/acme/widget -f merge_commit_title=PR_TITLE -f merge_commit_message=PR_BODY -f squash_merge_commit_title=COMMIT_OR_PR_TITLE -f squash_merge_commit_message=COMMIT_MESSAGES -F web_commit_signoff_required=true');

    return;
  });

  it('orders security mutations around secret-scanning dependencies', async () => {
    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        security: {
          vulnerabilityAlerts: true,
          dependabotSecurityUpdates: true,
          secretScanning: true,
          pushProtection: true,
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: false,
    });

    await CliRecipeGithubSyncSecurity.run({});

    expect(executeGhCommands).toHaveBeenCalledWith([
      'gh api --method PUT repos/acme/widget/vulnerability-alerts --silent',
      'gh api --method PUT repos/acme/widget/automated-security-fixes --silent',
      'gh repo edit acme/widget --enable-secret-scanning=true',
      'gh repo edit acme/widget --enable-secret-scanning-push-protection=true',
    ], 'sync-security', false);

    return;
  });

  it('updates Nova\'s named default-branch ruleset and preserves other rulesets', async () => {
    vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '42',
      textError: '',
      code: 0,
    });

    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        rulesets: {
          defaultBranch: {
            enforcement: 'active',
            blockDeletions: true,
            blockForcePushes: true,
            requirePullRequest: true,
            allowedMergeMethods: ['squash'],
            requiredApprovals: 1,
            requireConversationResolution: true,
            requiredStatusChecks: ['check'],
            requireBranchesToBeUpToDate: true,
          },
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: false,
    });

    await CliRecipeGithubSyncRulesets.run({});

    expect(utility['executeShell']).toHaveBeenCalledWith(expect.stringContaining('.[] | select(.name == \\"Nova default branch\\"'));

    expect(utility['executeShell']).toHaveBeenCalledWith(expect.not.stringContaining('--slurp'));

    expect(executeGhCommands).toHaveBeenCalledWith([expect.stringContaining('gh api --method PUT repos/acme/widget/rulesets/42 ')], 'sync-rulesets', false);

    expect(executeGhCommands).toHaveBeenCalledWith([expect.stringContaining('rules[][parameters][required_status_checks][][context]=check')], 'sync-rulesets', false);

    return;
  });

  it('skips a private repository on a free organization plan without failing', async () => {
    vi.spyOn(utility, 'executeShell').mockImplementation(async (command) => ({
      textOut: (command.startsWith('gh api repos/acme/widget --jq') === true) ? [
        'true',
        'Organization',
      ].join('\n') : 'free',
      textError: '',
      code: 0,
    }));

    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        rulesets: {
          defaultBranch: {
            blockDeletions: true,
          },
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: false,
    });

    vi.spyOn(process['stderr'], 'write').mockImplementation(() => true);

    await CliRecipeGithubSyncRulesets.run({});

    expect(utility['executeShell']).toHaveBeenNthCalledWith(1, 'gh api repos/acme/widget --jq ".private, .owner.type"');

    expect(utility['executeShell']).toHaveBeenNthCalledWith(2, 'gh api orgs/acme --jq ".plan.name // \\"\\""');

    expect(utility['executeShell']).toHaveBeenCalledTimes(2);

    expect(executeGhCommands).not.toHaveBeenCalled();

    expect(process['stderr']['write']).toHaveBeenCalledWith(expect.stringContaining('acme/widget is private, and its GitHub plan cannot use rulesets'));

    expect(process.exitCode).toBeUndefined();

    return;
  });

  it('skips a private repository when GitHub rejects the ruleset lookup for its plan', async () => {
    vi.spyOn(utility, 'executeShell').mockImplementation(async (command) => {
      if (command.startsWith('gh api repos/acme/widget --jq') === true) {
        return {
          textOut: [
            'true',
            'User',
          ].join('\n'),
          textError: '',
          code: 0,
        };
      }

      if (command.startsWith('gh api user') === true) {
        return {
          textOut: '',
          textError: '',
          code: 0,
        };
      }

      return {
        textOut: '',
        textError: 'gh: Upgrade to GitHub Pro or make this repository public to enable this feature. (HTTP 403)',
        code: 1,
      };
    });

    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        rulesets: {
          defaultBranch: {
            blockDeletions: true,
          },
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: true,
    });

    vi.spyOn(process['stderr'], 'write').mockImplementation(() => true);

    await CliRecipeGithubSyncRulesets.run({ dryRun: true });

    expect(utility['executeShell']).toHaveBeenNthCalledWith(2, 'gh api user --jq "if .login == \\"acme\\" then .plan.name // \\"\\" else \\"\\" end"');

    expect(utility['executeShell']).toHaveBeenNthCalledWith(3, expect.stringContaining('gh api repos/acme/widget/rulesets --paginate'));

    expect(executeGhCommands).not.toHaveBeenCalled();

    expect(process.exitCode).toBeUndefined();

    return;
  });

  it('syncs a private repository whose plan supports rulesets', async () => {
    vi.spyOn(utility, 'executeShell').mockImplementation(async (command) => {
      if (command.startsWith('gh api repos/acme/widget --jq') === true) {
        return {
          textOut: [
            'true',
            'Organization',
          ].join('\n'),
          textError: '',
          code: 0,
        };
      }

      return {
        textOut: (command.startsWith('gh api orgs/acme') === true) ? 'team' : '',
        textError: '',
        code: 0,
      };
    });

    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        rulesets: {
          defaultBranch: {
            blockDeletions: true,
          },
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: false,
    });

    await CliRecipeGithubSyncRulesets.run({});

    expect(executeGhCommands).toHaveBeenCalledWith(['gh api --method POST repos/acme/widget/rulesets -f "name=Nova default branch" -f target=branch -f enforcement=active -f "conditions[ref_name][include][]=~DEFAULT_BRANCH" -F "conditions[ref_name][exclude][]" -f "rules[][type]=deletion" --silent'], 'sync-rulesets', false);

    expect(process.exitCode).toBeUndefined();

    return;
  });

  it('skips the plan lookup for a public repository and still fails on other lookup errors', async () => {
    vi.spyOn(utility, 'executeShell').mockImplementation(async (command) => ({
      textOut: (command.startsWith('gh api repos/acme/widget --jq') === true) ? [
        'false',
        'Organization',
      ].join('\n') : '',
      textError: (command.includes('/rulesets') === true) ? 'gh: Upgrade to GitHub Pro or make this repository public to enable this feature. (HTTP 403)' : '',
      code: (command.includes('/rulesets') === true) ? 1 : 0,
    }));

    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        rulesets: {
          defaultBranch: {
            blockDeletions: true,
          },
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: false,
    });

    vi.spyOn(process['stderr'], 'write').mockImplementation(() => true);

    await CliRecipeGithubSyncRulesets.run({});

    expect(utility['executeShell']).toHaveBeenCalledTimes(2);

    expect(utility['executeShell']).not.toHaveBeenCalledWith(expect.stringContaining('orgs/acme'));

    expect(executeGhCommands).not.toHaveBeenCalled();

    expect(process.exitCode).toBe(1);

    return;
  });

  it('rejects dependent settings that cannot be valid on GitHub', async () => {
    vi.mocked(ghPrecheck)
      .mockResolvedValueOnce({
        workingFile: {},
        github: {
          owner: 'acme',
          repo: 'widget',
          actions: {
            allowedActions: 'all',
          },
        },
        owner: 'acme',
        repo: 'widget',
        isDryRun: false,
      })
      .mockResolvedValueOnce({
        workingFile: {},
        github: {
          owner: 'acme',
          repo: 'widget',
          security: {
            secretScanning: false,
            pushProtection: true,
          },
        },
        owner: 'acme',
        repo: 'widget',
        isDryRun: false,
      });

    await CliRecipeGithubSyncActions.run({});

    await CliRecipeGithubSyncSecurity.run({});

    expect(executeGhCommands).not.toHaveBeenCalled();

    expect(process.exitCode).toBe(1);

    return;
  });

  it('rejects Dependabot security updates without vulnerability alerts', async () => {
    vi.mocked(ghPrecheck).mockResolvedValue({
      workingFile: {},
      github: {
        owner: 'acme',
        repo: 'widget',
        security: {
          vulnerabilityAlerts: false,
          dependabotSecurityUpdates: true,
        },
      },
      owner: 'acme',
      repo: 'widget',
      isDryRun: false,
    });

    await CliRecipeGithubSyncSecurity.run({});

    expect(executeGhCommands).not.toHaveBeenCalled();

    expect(process.exitCode).toBe(1);

    return;
  });

  return;
});

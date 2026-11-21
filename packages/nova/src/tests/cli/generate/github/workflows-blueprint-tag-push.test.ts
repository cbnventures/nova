import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as WorkflowsBlueprint } from '../../../../cli/generate/github/workflows-blueprint.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_CreatesAMissingReleaseBeforeUploadingPackages_ReleaseOnly,
  Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_CreatesAMissingReleaseBeforeUploadingPackages_TagPush,
  Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_PassesTheTagPatternsToTheTargetsOnlyForATagPushTrigger_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_PublishesLatestForAStablePushedContainerTagOnlyWhenTagPushIsOn_ReleaseOnly,
  Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_PublishesLatestForAStablePushedContainerTagOnlyWhenTagPushIsOn_TagPush,
  Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_ReadsThePushedTagInTheActionReleaseSteps_ReleaseOnly,
  Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_ReadsThePushedTagInTheActionReleaseSteps_TagPush,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint-tag-push.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Tag Push - Tag Push Publish Targets.
 *
 * @since 0.49.0
 */
describe('tag push publish targets', () => {
  it('creates a missing release before uploading packages', () => {
    const releaseOnly: Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_CreatesAMissingReleaseBeforeUploadingPackages_ReleaseOnly = JSON.stringify(WorkflowsBlueprint.buildPfsenseTarget({
      workingDir: './packages/firewall',
      artifactName: 'build-pfsense-packages-firewall',
      needs: ['build'],
      packageManager: 'npm',
      timeoutMinutes: 30,
    }));
    const tagPush: Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_CreatesAMissingReleaseBeforeUploadingPackages_TagPush = JSON.stringify(WorkflowsBlueprint.buildPfsenseTarget({
      workingDir: './packages/firewall',
      artifactName: 'build-pfsense-packages-firewall',
      needs: ['build'],
      packageManager: 'npm',
      timeoutMinutes: 30,
      tagPushPrereleaseExpression: 'contains(github.ref_name, \'0-\')',
    }));

    ok(releaseOnly.includes('github.event.release.tag_name || inputs.tag }}'));
    strictEqual(releaseOnly.includes('gh release create'), false);
    ok(tagPush.includes('github.event.release.tag_name || inputs.tag || github.ref_name }}'));
    ok(tagPush.includes('gh release create \\"$RELEASE_TAG\\" --verify-tag --title \\"$RELEASE_TAG\\" --notes \\"\\" --prerelease'));
    ok(tagPush.includes('github.event.release.prerelease || (contains(github.ref_name, \'0-\')) }}'));

    return;
  });

  it('reads the pushed tag in the action release steps', () => {
    const releaseOnly: Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_ReadsThePushedTagInTheActionReleaseSteps_ReleaseOnly = JSON.stringify(WorkflowsBlueprint.buildGithubActionTarget({
      workingDir: './packages/action',
      artifactName: 'build-github-action-packages-action',
      needs: ['build'],
      packageManager: 'npm',
      timeoutMinutes: 30,
    }));
    const tagPush: Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_ReadsThePushedTagInTheActionReleaseSteps_TagPush = JSON.stringify(WorkflowsBlueprint.buildGithubActionTarget({
      workingDir: './packages/action',
      artifactName: 'build-github-action-packages-action',
      needs: ['build'],
      packageManager: 'npm',
      timeoutMinutes: 30,
      tagPushPrereleaseExpression: 'contains(github.ref_name, \'0-\')',
    }));

    strictEqual(releaseOnly.includes('github.ref_name'), false);
    ok(releaseOnly.includes('requires a release.published event with a tag name.'));
    strictEqual(tagPush.split('github.event.release.tag_name || (github.ref_type == \'tag\' && github.ref_name) || \'\' }}').length - 1, 4);
    ok(tagPush.includes('requires a release.published event or a pushed tag.'));
    ok(tagPush.includes('github.event_name == \'release\' && github.event.release.prerelease || github.event_name == \'push\' && (contains(github.ref_name, \'0-\')) }}'));

    return;
  });

  it('publishes latest for a stable pushed container tag only when tag push is on', () => {
    const releaseOnly: Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_PublishesLatestForAStablePushedContainerTagOnlyWhenTagPushIsOn_ReleaseOnly = JSON.stringify(WorkflowsBlueprint.buildGhcrTarget({
      workingDir: './packages/docker',
      artifactName: 'container-oci',
      needs: ['build-container'],
      packageManager: 'npm',
      timeoutMinutes: 30,
    }));
    const tagPush: Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_PublishesLatestForAStablePushedContainerTagOnlyWhenTagPushIsOn_TagPush = JSON.stringify(WorkflowsBlueprint.buildGhcrTarget({
      workingDir: './packages/docker',
      artifactName: 'container-oci',
      needs: ['build-container'],
      packageManager: 'npm',
      timeoutMinutes: 30,
      tagPushPrereleaseExpression: 'contains(github.ref_name, \'0-\')',
    }));

    strictEqual(releaseOnly.includes('TAG_PRERELEASE'), false);
    ok(tagPush.includes('(contains(github.ref_name, \'0-\')) && \'true\' || \'false\' }}'));
    ok(tagPush.includes('if [ \\"$TAG_PRERELEASE\\" = \\"false\\" ]; then'));

    return;
  });

  it('passes the tag patterns to the targets only for a tag-push trigger', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintTagPush_TagPushPublishTargets_PassesTheTagPatternsToTheTargetsOnlyForATagPushTrigger_Workspaces = {
      './packages/firewall': {
        name: 'pfsense-pkg-firewall',
        role: 'package',
        policy: 'trackable',
      },
    };

    for (const triggerCase of [
      {
        triggers: ['release' as const],
        expected: false,
      },
      {
        triggers: [{
          name: 'tag-push' as const,
          tags: ['firewall-v*'],
        }],
        expected: true,
      },
    ]) {
      strictEqual(WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish({
        template: 'publish',
        name: 'project',
        triggers: triggerCase['triggers'],
        build: [],
        deploy: [{
          to: 'pfsense',
          path: './packages/firewall',
        }],
      }, workspaces)).includes('gh release create'), triggerCase['expected']);
    }

    return;
  });

  return;
});

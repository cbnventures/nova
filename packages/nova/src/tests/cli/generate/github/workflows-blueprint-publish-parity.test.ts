import { ok, strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import { Runner as WorkflowsBlueprint } from '../../../../cli/generate/github/workflows-blueprint.js';
import { libEnvManagedSet } from '../../../../lib/env-managed-set.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_NoSecretsEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_NoSecretsWorkspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_DerivesCredNamesThatMatchTheProvisionManagedSet_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_DerivesCredNamesThatMatchTheProvisionManagedSet_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_DerivesCredNamesThatMatchTheProvisionManagedSet_ManagedNames,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_EmitsASyncStepOnBothTheCloudflareAndVercelJobs_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_EmitsASyncStepOnBothTheCloudflareAndVercelJobs_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_NoSecretsEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_NoSecretsWorkspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_Environment,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_AddonEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_CoreEntry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_Committed,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_FixturePath,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_FixturesDir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_Generated,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_Ir,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_Siblings,
  Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_Workspaces,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint-publish-parity.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Project.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.project', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_Workspaces = {
    './apps/docs': {
      name: 'nova-docs',
      role: 'app',
      policy: 'trackable',
    },
    './packages/docusaurus-preset-nova': {
      name: '@cbnventures/docusaurus-preset-nova',
      role: 'package',
      policy: 'trackable',
    },
    './packages/nova': {
      name: '@cbnventures/nova',
      role: 'package',
      policy: 'trackable',
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_Entry = {
    template: 'publish',
    name: 'project',
    triggers: ['release'],
    build: [
      './packages/nova',
      './packages/docusaurus-preset-nova',
      './apps/docs',
    ],
    deploy: [
      {
        to: 'npm',
        path: './packages/nova',
      },
      {
        to: 'npm',
        path: './packages/docusaurus-preset-nova',
        after: ['./packages/nova'],
      },
      {
        to: 'github-packages',
        path: './packages/nova',
      },
      {
        to: 'github-packages',
        path: './packages/docusaurus-preset-nova',
        after: ['./packages/nova'],
      },
      {
        to: 'cloudflare-pages-docusaurus',
        path: './apps/docs',
      },
    ],
    with: {
      CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
      CLOUDFLARE_PROJECT_NAME: 'CLOUDFLARE_PROJECT_NAME',
      NPM_TOKEN: 'NPM_TOKEN',
    },
  };

  it('reproduces the committed project workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_FixturePath = join(fixturesDir, 'nova-publish-project.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityProject_ReproducesTheCommittedProjectWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Sites.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.sites', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_Workspaces = {
    './apps/cbnventures': {
      name: 'portfolio-app-cbnventures',
      role: 'app',
      policy: 'trackable',
    },
    './apps/mrjackyliang': {
      name: 'portfolio-app-mrjackyliang',
      role: 'app',
      policy: 'trackable',
    },
  };

  const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_Environment = {
    workspaces: {
      './apps/cbnventures': {
        prefix: 'CBN_',
        variables: [
          {
            key: 'PUBLIC_GOOGLE_TAG_MANAGER_ID',
            secret: false,
            reach: 'build',
          },
          {
            key: 'PUBLIC_TURNSTILE_SITE_KEY',
            secret: false,
            reach: 'build',
          },
          {
            key: 'PUBLIC_STRIPE_PUBLISHABLE_KEY',
            secret: false,
            reach: 'build',
          },
          {
            key: 'TURNSTILE_SECRET_KEY',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'STRIPE_SECRET_KEY',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'STRIPE_WEBHOOK_SECRET',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'AMAZON_ACCESS_KEY_ID',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'AMAZON_ACCESS_KEY_SECRET',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'AMAZON_REGION',
            secret: true,
            reach: 'runtime',
          },
        ],
      },
      './apps/mrjackyliang': {
        prefix: 'MJL_',
        variables: [
          {
            key: 'PUBLIC_GOOGLE_TAG_MANAGER_ID',
            secret: false,
            reach: 'build',
          },
          {
            key: 'PUBLIC_TURNSTILE_SITE_KEY',
            secret: false,
            reach: 'build',
          },
          {
            key: 'TURNSTILE_SECRET_KEY',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'AMAZON_ACCESS_KEY_ID',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'AMAZON_ACCESS_KEY_SECRET',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'AMAZON_REGION',
            secret: true,
            reach: 'runtime',
          },
        ],
      },
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_Entry = {
    template: 'publish',
    name: 'sites',
    triggers: ['release'],
    build: [
      './apps/cbnventures',
      './apps/mrjackyliang',
    ],
    deploy: [
      {
        to: 'cloudflare-workers',
        path: './apps/cbnventures',
      },
      {
        to: 'cloudflare-workers',
        path: './apps/mrjackyliang',
      },
    ],
    with: {
      CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
    },
  };

  it('reproduces the committed sites workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, environment);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_FixturePath = join(fixturesDir, 'nova-publish-sites.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParitySites_ReproducesTheCommittedSitesWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Cloudflare Workers Secret Sync.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.cloudflareWorkersSecretSync', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_Workspaces = {
    './apps/portal': {
      name: 'synthetic-app-portal',
      role: 'app',
      policy: 'trackable',
    },
  };

  const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_Environment = {
    workspaces: {
      './apps/portal': {
        prefix: 'CBN_',
        variables: [
          {
            key: 'STRIPE_SECRET_KEY',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'TURNSTILE_SECRET_KEY',
            secret: true,
            reach: 'runtime',
          },
        ],
      },
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_Entry = {
    template: 'publish',
    name: 'portal',
    triggers: ['release'],
    build: ['./apps/portal'],
    deploy: [{
      to: 'cloudflare-workers',
      path: './apps/portal',
    }],
    with: {
      CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
    },
  };

  it('reproduces the synthetic cloudflare workers secret sync workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, environment);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-cloudflare-workers-secret-sync.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_ReproducesTheSyntheticCloudflareWorkersSecretSyncWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  it('emits no sync step when the scope workspace has no private secrets', () => {
    const noSecretsWorkspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_NoSecretsWorkspaces = {
      './apps/plain': {
        name: 'synthetic-app-plain',
        role: 'app',
        policy: 'trackable',
      },
    };
    const noSecretsEntry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_NoSecretsEntry = {
      template: 'publish',
      name: 'plain',
      triggers: ['release'],
      build: ['./apps/plain'],
      deploy: [{
        to: 'cloudflare-workers',
        path: './apps/plain',
      }],
      with: {
        CLOUDFLARE_ACCOUNT_ID: 'CLOUDFLARE_ACCOUNT_ID',
      },
    };
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_Ir = WorkflowsBlueprint.buildPublish(noSecretsEntry, noSecretsWorkspaces);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityCloudflareWorkersSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_Generated = WorkflowsBlueprint.serialize(ir);

    strictEqual(generated.includes('Sync worker runtime secrets'), false);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Containers.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.containers', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_Workspaces = {
    './services/api': {
      name: 'sandbox-api',
      role: 'package',
      policy: 'trackable',
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_Entry = {
    template: 'publish',
    name: 'containers',
    triggers: ['release'],
    build: ['./services/api'],
    deploy: [
      {
        to: 'docker-hub',
        path: './services/api',
      },
      {
        to: 'ghcr',
        path: './services/api',
      },
    ],
  };

  it('reproduces the synthetic containers workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-docker-hub-ghcr.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityContainers_ReproducesTheSyntheticContainersWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - No Turbo.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.noTurbo', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_Workspaces = {
    './packages/plain': {
      name: 'sandbox-plain',
      role: 'package',
      policy: 'trackable',
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_Entry = {
    template: 'publish',
    name: 'plain',
    triggers: ['release'],
    build: ['./packages/plain'],
    deploy: [{
      to: 'npm',
      path: './packages/plain',
    }],
    with: {
      NPM_TOKEN: 'NPM_TOKEN',
    },
  };

  it('reproduces the synthetic no-turbo workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, {}, [], false);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-no-turbo.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityNoTurbo_ReproducesTheSyntheticNoTurboWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Pages.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.pages', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_Workspaces = {
    './apps/docs': {
      name: 'nova-app-docs',
      role: 'app',
      policy: 'trackable',
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_Entry = {
    template: 'publish',
    name: 'pages',
    triggers: ['release'],
    build: ['./apps/docs'],
    deploy: [{
      to: 'github-pages-docusaurus',
      path: './apps/docs',
    }],
  };

  it('reproduces the synthetic pages workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-github-pages.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityPages_ReproducesTheSyntheticPagesWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Action.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.action', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_Workspaces = {
    './packages/action': {
      name: 'sandbox-action',
      role: 'package',
      policy: 'trackable',
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_Entry = {
    template: 'publish',
    name: 'action',
    triggers: ['release'],
    build: ['./packages/action'],
    deploy: [{
      to: 'github-action',
      path: './packages/action',
    }],
    with: {
      ACTION_ENTRY_POINT: 'index.js',
      ACTION_OUTPUT_PATH: './packages/action/build',
      ACTION_YML_PATH: './action.yml',
      RELEASE_BRANCH_NAME: 'releases',
    },
  };

  it('reproduces the synthetic action workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-github-action.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityAction_ReproducesTheSyntheticActionWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Vercel.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.vercel', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_Workspaces = {
    './apps/web': {
      name: 'nova-app-web',
      role: 'app',
      policy: 'trackable',
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_Entry = {
    template: 'publish',
    name: 'vercel',
    triggers: ['release'],
    build: ['./apps/web'],
    deploy: [{
      to: 'vercel-nextjs',
      path: './apps/web',
    }],
  };

  it('reproduces the synthetic vercel workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-vercel.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercel_ReproducesTheSyntheticVercelWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Vercel Scope.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.vercelScope', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_Workspaces = {
    './apps/web': {
      name: 'nova-app-web',
      role: 'app',
      policy: 'trackable',
    },
  };

  const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_Environment = {
    project: {
      prefix: 'PF_',
    },
    workspaces: {
      './apps/web': {
        prefix: 'WEB_',
      },
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_Entry = {
    template: 'publish',
    name: 'vercel-scope',
    triggers: ['release'],
    build: ['./apps/web'],
    deploy: [{
      to: 'vercel-nextjs',
      path: './apps/web',
    }],
  };

  it('reproduces the synthetic vercel scope workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, environment);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-vercel-scope.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelScope_ReproducesTheSyntheticVercelScopeWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Vercel Secret Sync.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.vercelSecretSync', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_Workspaces = {
    './apps/web': {
      name: 'nova-app-web',
      role: 'app',
      policy: 'trackable',
    },
  };

  const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_Environment = {
    workspaces: {
      './apps/web': {
        prefix: 'CBN_',
        variables: [
          {
            key: 'STRIPE_SECRET_KEY',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'TURNSTILE_SECRET_KEY',
            secret: true,
            reach: 'runtime',
          },
        ],
      },
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_Entry = {
    template: 'publish',
    name: 'vercel-secret-sync',
    triggers: ['release'],
    build: ['./apps/web'],
    deploy: [{
      to: 'vercel-nextjs',
      path: './apps/web',
    }],
  };

  it('reproduces the synthetic vercel secret sync workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, environment);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-vercel-secret-sync.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_ReproducesTheSyntheticVercelSecretSyncWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  it('emits no sync step when the scope workspace has no private secrets', () => {
    const noSecretsWorkspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_NoSecretsWorkspaces = {
      './apps/plain': {
        name: 'nova-app-plain',
        role: 'app',
        policy: 'trackable',
      },
    };
    const noSecretsEntry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_NoSecretsEntry = {
      template: 'publish',
      name: 'plain',
      triggers: ['release'],
      build: ['./apps/plain'],
      deploy: [{
        to: 'vercel-nextjs',
        path: './apps/plain',
      }],
    };
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_Ir = WorkflowsBlueprint.buildPublish(noSecretsEntry, noSecretsWorkspaces);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityVercelSecretSync_EmitsNoSyncStepWhenTheScopeWorkspaceHasNoPrivateSecrets_Generated = WorkflowsBlueprint.serialize(ir);

    strictEqual(generated.includes('Sync Vercel runtime environment'), false);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Runtime Sync Fan Out.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.runtimeSyncFanOut', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_Workspaces = {
    './apps/api': {
      name: 'synthetic-app-api',
      role: 'app',
      policy: 'trackable',
    },
  };

  const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_Environment = {
    project: {
      prefix: 'PF_',
    },
    workspaces: {
      './apps/api': {
        prefix: 'API_',
        variables: [
          {
            key: 'SESSION_SECRET',
            secret: true,
            reach: 'runtime',
          },
          {
            key: 'DATABASE_URL',
            secret: true,
            reach: 'runtime',
          },
        ],
      },
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_Entry = {
    template: 'publish',
    name: 'api',
    triggers: ['release'],
    build: ['./apps/api'],
    deploy: [
      {
        to: 'cloudflare-workers',
        path: './apps/api',
      },
      {
        to: 'vercel-nextjs',
        path: './apps/api',
      },
    ],
  };

  it('syncs the same runtime secrets to every server-bearing target byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, environment);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-runtime-sync-fan-out.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_SyncsTheSameRuntimeSecretsToEveryServerBearingTargetByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  it('emits a sync step on both the cloudflare and vercel jobs', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_EmitsASyncStepOnBothTheCloudflareAndVercelJobs_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, environment);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityRuntimeSyncFanOut_EmitsASyncStepOnBothTheCloudflareAndVercelJobs_Generated = WorkflowsBlueprint.serialize(ir);

    strictEqual(generated.includes('Sync worker runtime secrets'), true);
    strictEqual(generated.includes('Sync Vercel runtime environment'), true);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Workflow Run.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.workflowRun', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_Workspaces = {
    './packages/core': {
      name: 'sandbox-core',
      role: 'package',
      policy: 'trackable',
    },
    './packages/addon': {
      name: 'sandbox-addon',
      role: 'package',
      policy: 'trackable',
    },
  };

  const coreEntry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_CoreEntry = {
    template: 'publish',
    name: 'core',
    triggers: ['release'],
    build: ['./packages/core'],
    deploy: [{
      to: 'npm',
      path: './packages/core',
    }],
    with: {
      NPM_TOKEN: 'NPM_TOKEN',
    },
  };

  const addonEntry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_AddonEntry = {
    'template': 'publish',
    'name': 'addon',
    'triggers': [{
      name: 'workflow-run-success',
      workflows: ['publish-core'],
    }],
    'build': ['./packages/addon'],
    'deploy': [{
      to: 'npm',
      path: './packages/addon',
    }],
    'with': {
      NPM_TOKEN: 'NPM_TOKEN',
    },
  };

  const siblings: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_Siblings = [
    coreEntry,
    addonEntry,
  ];

  it('reproduces the synthetic upstream core workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(coreEntry, workspaces, {}, siblings);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-workflow-run-core.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticUpstreamCoreWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  it('reproduces the synthetic chained success workflow byte-for-byte', async () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_Ir = WorkflowsBlueprint.buildPublish(addonEntry, workspaces, {}, siblings);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_Generated = WorkflowsBlueprint.serialize(ir);
    const fixturesDir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_FixturesDir = join(dirname(fileURLToPath(import.meta.url)), 'fixtures');
    const fixturePath: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_FixturePath = join(fixturesDir, 'synthetic-publish-workflow-run-success.yml');
    const committed: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityWorkflowRun_ReproducesTheSyntheticChainedSuccessWorkflowByteForByte_Committed = await readFile(fixturePath, 'utf-8');

    strictEqual(generated, committed);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Publish Parity - Invariant.
 *
 * Locks the generator-name == provision-name contract: a scoped deploy cred
 * must resolve to the SAME prefixed GitHub name on both the generated workflow
 * side and the libEnvManagedSet provision side, so a deploy never reads a name
 * Nova did not provision. A future half-wiring fails this test.
 *
 * @since 0.21.0
 */
describe('WorkflowsBlueprintPublishParity.invariant', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_Workspaces = {
    './apps/docs': {
      name: 'nova-app-docs',
      role: 'app',
      policy: 'trackable',
    },
  };

  const environment: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_Environment = {
    project: {
      prefix: 'PF_',
    },
    workspaces: {
      './apps/docs': {
        prefix: 'DOCS_',
      },
    },
  };

  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_Entry = {
    template: 'publish',
    name: 'invariant',
    triggers: ['release'],
    build: ['./apps/docs'],
    deploy: [{
      to: 'cloudflare-pages-docusaurus',
      path: './apps/docs',
    }],
  };

  it('derives cred names that match the provision managed set', () => {
    const ir: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_DerivesCredNamesThatMatchTheProvisionManagedSet_Ir = WorkflowsBlueprint.buildPublish(entry, workspaces, environment);
    const generated: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_DerivesCredNamesThatMatchTheProvisionManagedSet_Generated = WorkflowsBlueprint.serialize(ir);
    const managedNames: Tests_Cli_Generate_Github_WorkflowsBlueprintPublishParity_WorkflowsBlueprintPublishParityInvariant_DerivesCredNamesThatMatchTheProvisionManagedSet_ManagedNames = libEnvManagedSet.compute({
      environment,
      workflows: [{
        template: 'publish',
        name: 'invariant',
        triggers: ['release'],
        deploy: [{
          to: 'cloudflare-pages-docusaurus',
          path: './apps/docs',
        }],
      }],
    }).map((candidate) => candidate['name']);

    // Account-scoped secret: both sides carry the global prefix.
    ok(managedNames.includes('PF_CLOUDFLARE_API_TOKEN'));
    ok(generated.includes('secrets.PF_CLOUDFLARE_API_TOKEN'));

    // Account-scoped variable: both sides carry the global prefix.
    ok(managedNames.includes('PF_CLOUDFLARE_ACCOUNT_ID'));
    ok(generated.includes('vars.PF_CLOUDFLARE_ACCOUNT_ID'));

    // App-scoped variable: both sides carry the deploying app prefix.
    ok(managedNames.includes('DOCS_CLOUDFLARE_PROJECT_NAME'));
    ok(generated.includes('vars.DOCS_CLOUDFLARE_PROJECT_NAME'));

    return;
  });

  return;
});

import {
  deepStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';

import {
  describe,
  it,
} from 'vitest';

import { Runner as Validator } from '../../../../cli/generate/github/workflows-blueprint-validate.js';
import { Runner as WorkflowsBlueprint } from '../../../../cli/generate/github/workflows-blueprint.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_BuildStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_CheckStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_Job,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_ReleaseStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_UploadStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_Workflow,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_Yaml,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_YamlJob,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_CreatesAReleaseForPushedTags_Job,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_CreatesAReleaseForPushedTags_ReleaseStep,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_ValidatesTheWorkspaceContract_InvalidResult,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_ValidatesTheWorkspaceContract_InvalidWorkspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_ValidatesTheWorkspaceContract_ValidResult,
  Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_Workspaces,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint-synology.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Synology - Synology.
 *
 * @since 0.50.0
 */
describe('WorkflowsBlueprint.synology', () => {
  const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_Workspaces = {
    './packages/media-indexer': {
      name: 'synology-pkg-media-indexer',
      role: 'package',
      policy: 'trackable',
    },
  };
  const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_Entry = {
    template: 'publish',
    runsOn: 'ubuntu-24.04',
    name: 'project',
    triggers: ['release'],
    timeoutMinutes: 30,
    build: ['./packages/media-indexer'],
    deploy: [{
      to: 'synology',
      path: './packages/media-indexer',
    }],
  };

  it('builds, checks, and publishes the SPK', () => {
    const workflow: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_Workflow = WorkflowsBlueprint.buildPublish(entry, workspaces);
    const job: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_Job = workflow['jobs'].find((candidateJob) => candidateJob['id'] === 'publish-synology-packages-media-indexer');

    ok(job !== undefined);

    const buildStep: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_BuildStep = job['steps'].find((candidateStep) => candidateStep['name'] === 'Build Synology package');
    const checkStep: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_CheckStep = job['steps'].find((candidateStep) => candidateStep['name'] === 'Check Synology package');
    const uploadStep: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_UploadStep = job['steps'].find((candidateStep) => candidateStep['name'] === 'Upload workflow artifact');
    const releaseStep: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_ReleaseStep = job['steps'].find((candidateStep) => candidateStep['name'] === 'Upload GitHub release assets');

    ok(buildStep !== undefined);
    ok(checkStep !== undefined);
    ok(uploadStep !== undefined);
    ok(releaseStep !== undefined);
    strictEqual(job['runsOn'], 'ubuntu-latest');
    deepStrictEqual(job['needs'], ['build']);
    strictEqual(buildStep['run'], 'npm run build');
    strictEqual(buildStep['workingDirectory'], './packages/media-indexer');
    strictEqual(checkStep['run'], 'node ./scripts/check-package.mjs');
    strictEqual(checkStep['workingDirectory'], './packages/media-indexer');
    deepStrictEqual(uploadStep['with'], [
      {
        key: 'name',
        value: 'synology-synology-pkg-media-indexer',
      },
      {
        key: 'path',
        value: './packages/media-indexer/build/release/*.spk',
      },
      {
        key: 'if-no-files-found',
        value: 'error',
      },
      {
        key: 'retention-days',
        value: 7,
      },
    ]);
    strictEqual(releaseStep['run'], 'gh release upload "$RELEASE_TAG" "./packages/media-indexer/build/release/"*.spk --clobber');
    strictEqual(JSON.stringify(job).includes('FreeBSD'), false);
    strictEqual(JSON.stringify(job).includes('RELEASE_SIGNING_KEY'), false);

    const yaml: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_Yaml = WorkflowsBlueprint.dispatch(entry, workspaces);
    const yamlJob: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_BuildsChecksAndPublishesTheSPK_YamlJob = yaml.slice(yaml.indexOf('  publish-synology-packages-media-indexer:'));

    ok(yamlJob.includes('runs-on: "ubuntu-latest"'));
    ok(yamlJob.includes('npm run build'));
    ok(yamlJob.includes('node ./scripts/check-package.mjs'));
    ok(yamlJob.includes('./packages/media-indexer/build/release/*.spk'));

    return;
  });

  it('creates a release for pushed tags', () => {
    const job: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_CreatesAReleaseForPushedTags_Job = WorkflowsBlueprint.buildSynologyTarget({
      workingDir: './packages/media-indexer',
      artifactName: 'build-synology-packages-media-indexer',
      needs: ['build'],
      packageManager: 'npm',
      timeoutMinutes: 30,
      workspace: workspaces['./packages/media-indexer'],
      tagPushPrereleaseExpression: 'contains(github.ref_name, \'0-\')',
    });
    const releaseStep: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_CreatesAReleaseForPushedTags_ReleaseStep = job['steps'].find((candidateStep) => candidateStep['name'] === 'Upload GitHub release assets');

    ok(releaseStep !== undefined);
    ok(releaseStep['run'] !== undefined);
    ok(releaseStep['run'].includes('gh release create "$RELEASE_TAG" --verify-tag'));
    ok(releaseStep['run'].includes('gh release upload "$RELEASE_TAG"'));

    return;
  });

  it('validates the workspace contract', () => {
    const invalidWorkspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_ValidatesTheWorkspaceContract_InvalidWorkspaces = {
      './packages/media-indexer': {
        name: 'ordinary-package',
        role: 'package',
        policy: 'trackable',
      },
    };
    const invalidResult: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_ValidatesTheWorkspaceContract_InvalidResult = Validator.validate([entry], invalidWorkspaces);
    const validResult: Tests_Cli_Generate_Github_WorkflowsBlueprintSynology_WorkflowsBlueprintSynology_ValidatesTheWorkspaceContract_ValidResult = Validator.validate([entry], workspaces);

    strictEqual(invalidResult['workflows'].length, 0);
    strictEqual(invalidResult['diagnostics'].some((diagnostic) => diagnostic['message'].includes('whose name starts with "synology-pkg-"')), true);
    strictEqual(validResult['diagnostics'].length, 0);
    strictEqual(validResult['workflows'].length, 1);

    return;
  });

  return;
});

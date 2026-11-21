import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as WorkflowsBlueprint } from '../../../../cli/generate/github/workflows-blueprint.js';

import type {
  Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_AddsNothingWithoutACoverageMinimum_Entry,
  Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_AddsNothingWithoutACoverageMinimum_Output,
  Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_AddsNothingWithoutACoverageMinimum_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_PushesTheBadgeToTheBadgesBranchWithoutADocsSite_Output,
  Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_PushesTheBadgeToTheBadgesBranchWithoutADocsSite_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_WritesTheBadgeIntoTheDocsBuildOutput_Output,
  Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_WritesTheBadgeIntoTheDocsBuildOutput_Workspaces,
  Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_WritesTheBadgeWhereAnAssembledDocsArtifactPutsTheSite_Output,
  Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_WritesTheBadgeWhereAnAssembledDocsArtifactPutsTheSite_Workspaces,
} from '../../../../types/tests/cli/generate/github/workflows-blueprint-coverage-badge.test.d.ts';

/**
 * Tests - CLI - Generate - GitHub - Workflows Blueprint Coverage Badge - Coverage Badge Publish Steps.
 *
 * @since 0.49.0
 */
describe('coverage badge publish steps', () => {
  it('writes the badge into the docs build output', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_WritesTheBadgeIntoTheDocsBuildOutput_Workspaces = {
      './apps/docs': {
        name: 'sample-docs',
        role: 'docs',
        policy: 'freezable',
      },
      './packages/sample': {
        name: 'sample',
        role: 'package',
        policy: 'distributable',
      },
    };
    const output: Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_WritesTheBadgeIntoTheDocsBuildOutput_Output = WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish({
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      build: [
        './packages/sample',
        './apps/docs',
      ],
      deploy: [
        {
          to: 'npm',
          path: './packages/sample',
        },
        {
          to: 'cloudflare-pages',
          path: './apps/docs',
        },
      ],
    }, workspaces, {}, [], 'npm', {}, undefined, {}, [], {
      minimum: 80,
      docsPath: './apps/docs',
    }));

    ok(output.includes('name: "Write coverage badge"'));
    ok(output.includes('apps/docs/build/badges/coverage.json'));
    ok(output.includes('JSON.stringify({ schemaVersion: 1, label: \'coverage\', message: percent + \'%\', color })'));
    ok(output.indexOf('Write coverage badge') > output.indexOf('Build project'));
    ok(output.indexOf('Write coverage badge') < output.indexOf('Validate build artifacts'));
    strictEqual(output.includes('publish-coverage-badge'), false);

    return;
  });

  it('writes the badge where an assembled docs artifact puts the site', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_WritesTheBadgeWhereAnAssembledDocsArtifactPutsTheSite_Workspaces = {
      './apps/docs': {
        name: 'sample-docs',
        role: 'docs',
        policy: 'freezable',
      },
    };
    const output: Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_WritesTheBadgeWhereAnAssembledDocsArtifactPutsTheSite_Output = WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish({
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      build: ['./apps/docs'],
      deploy: [{
        to: 'github-pages',
        path: './apps/docs',
        artifact: 'documentation',
      }],
    }, workspaces, {}, [], 'npm', {
      documentation: {
        build: ['./apps/docs'],
        sources: [{
          from: './apps/docs/build',
          to: './',
        }],
      },
    }, undefined, {}, [], {
      minimum: 80,
      docsPath: './apps/docs',
    }));

    ok(output.includes('BADGE_PATH: "build/documentation/badges/coverage.json"'));
    strictEqual(output.includes('publish-coverage-badge'), false);

    return;
  });

  it('pushes the badge to the badges branch without a docs site', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_PushesTheBadgeToTheBadgesBranchWithoutADocsSite_Workspaces = {
      './packages/sample': {
        name: 'sample',
        role: 'package',
        policy: 'distributable',
      },
    };
    const output: Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_PushesTheBadgeToTheBadgesBranchWithoutADocsSite_Output = WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish({
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      build: ['./packages/sample'],
      deploy: [{
        to: 'npm',
        path: './packages/sample',
      }],
    }, workspaces, {}, [], 'npm', {}, undefined, {}, [], {
      minimum: 80,
    }));

    ok(output.includes('coverage-badge/coverage.json'));
    ok(output.includes('name: "Upload coverage badge"'));
    ok(output.includes('publish-coverage-badge:'));
    ok(output.includes('contents: "write"'));
    ok(output.includes('git switch --orphan badges'));
    ok(output.includes('git push origin badges'));

    return;
  });

  it('adds nothing without a coverage minimum', () => {
    const workspaces: Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_AddsNothingWithoutACoverageMinimum_Workspaces = {
      './packages/sample': {
        name: 'sample',
        role: 'package',
        policy: 'distributable',
      },
    };
    const entry: Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_AddsNothingWithoutACoverageMinimum_Entry = {
      template: 'publish',
      name: 'project',
      triggers: ['release'],
      build: ['./packages/sample'],
      deploy: [{
        to: 'npm',
        path: './packages/sample',
      }],
    };
    const output: Tests_Cli_Generate_Github_WorkflowsBlueprintCoverageBadge_CoverageBadgePublishSteps_AddsNothingWithoutACoverageMinimum_Output = WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish(entry, workspaces));

    strictEqual(output.includes('coverage'), false);
    strictEqual(WorkflowsBlueprint.serialize(WorkflowsBlueprint.buildPublish(entry, workspaces, {}, [], 'npm', {}, undefined, {}, [], undefined)), output);

    return;
  });

  return;
});

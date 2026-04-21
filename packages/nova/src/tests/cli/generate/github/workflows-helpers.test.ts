import { strictEqual } from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, it } from 'vitest';

import { CliGenerateGithubWorkflows } from '../../../../cli/generate/github/workflows.js';

import type {
  TestsCliGenerateGithubWorkflowsHelpersBuildCommandResult,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboPrefix,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboProjectDirectory,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboResult,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboTemporaryDirectory,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboTurboConfigPath,
  TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsResult,
  TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsTargetMetadata,
  TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsTargets,
  TestsCliGenerateGithubWorkflowsHelpersResolveWorkspaceNameResult,
  TestsCliGenerateGithubWorkflowsHelpersResolveWorkspaceNameWorkspaces,
  TestsCliGenerateGithubWorkflowsHelpersSlugifyWorkingDirResult,
} from '../../../../types/tests/cli/generate/github/workflows-helpers.test.d.ts';

const helpers = CliGenerateGithubWorkflows;

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Slugify Working Dir.
 *
 * @since 0.16.0
 */
describe('CliGenerateGithubWorkflows.slugifyWorkingDir', () => {
  it('strips leading ./ and replaces slashes with hyphens', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersSlugifyWorkingDirResult = helpers.slugifyWorkingDir('./packages/nova');

    strictEqual(result, 'packages-nova');

    return;
  });

  it('handles apps/ prefix', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersSlugifyWorkingDirResult = helpers.slugifyWorkingDir('./apps/docs');

    strictEqual(result, 'apps-docs');

    return;
  });

  it('handles deep nested scoped names', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersSlugifyWorkingDirResult = helpers.slugifyWorkingDir('./packages/docusaurus-preset-nova');

    strictEqual(result, 'packages-docusaurus-preset-nova');

    return;
  });

  it('returns root for ./ input', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersSlugifyWorkingDirResult = helpers.slugifyWorkingDir('./');

    strictEqual(result, 'root');

    return;
  });

  it('handles path without leading ./', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersSlugifyWorkingDirResult = helpers.slugifyWorkingDir('packages/nova');

    strictEqual(result, 'packages-nova');

    return;
  });

  it('strips trailing slash', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersSlugifyWorkingDirResult = helpers.slugifyWorkingDir('./deep/nested/workspace/');

    strictEqual(result, 'deep-nested-workspace');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Resolve Workspace Name.
 *
 * @since 0.16.0
 */
describe('CliGenerateGithubWorkflows.resolveWorkspaceName', () => {
  const workspaces: TestsCliGenerateGithubWorkflowsHelpersResolveWorkspaceNameWorkspaces = {
    './packages/nova': { name: '@cbnventures/nova' },
    './packages/broken': {},
  };

  it('returns the workspace name for a known path', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersResolveWorkspaceNameResult = helpers.resolveWorkspaceName(workspaces, './packages/nova');

    strictEqual(result, '@cbnventures/nova');

    return;
  });

  it('returns undefined for an unknown path', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersResolveWorkspaceNameResult = helpers.resolveWorkspaceName(workspaces, './does-not-exist');

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined when entry exists but name is missing', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersResolveWorkspaceNameResult = helpers.resolveWorkspaceName(workspaces, './packages/broken');

    strictEqual(result, undefined);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Detect Turbo.
 *
 * @since 0.16.0
 */
describe('CliGenerateGithubWorkflows.detectTurbo', () => {
  it('returns true when turbo.json exists', async () => {
    const temporaryDirectory: TestsCliGenerateGithubWorkflowsHelpersDetectTurboTemporaryDirectory = tmpdir();
    const prefix: TestsCliGenerateGithubWorkflowsHelpersDetectTurboPrefix = join(temporaryDirectory, 'nova-detect-turbo-true-');
    const projectDirectory: TestsCliGenerateGithubWorkflowsHelpersDetectTurboProjectDirectory = await mkdtemp(prefix);
    const turboConfigPath: TestsCliGenerateGithubWorkflowsHelpersDetectTurboTurboConfigPath = join(projectDirectory, 'turbo.json');

    await writeFile(turboConfigPath, '{}', 'utf-8');

    const result: TestsCliGenerateGithubWorkflowsHelpersDetectTurboResult = await helpers.detectTurbo(projectDirectory);

    strictEqual(result, true);

    return;
  });

  it('returns false when turbo.json does not exist', async () => {
    const temporaryDirectory: TestsCliGenerateGithubWorkflowsHelpersDetectTurboTemporaryDirectory = tmpdir();
    const prefix: TestsCliGenerateGithubWorkflowsHelpersDetectTurboPrefix = join(temporaryDirectory, 'nova-detect-turbo-false-');
    const projectDirectory: TestsCliGenerateGithubWorkflowsHelpersDetectTurboProjectDirectory = await mkdtemp(prefix);
    const result: TestsCliGenerateGithubWorkflowsHelpersDetectTurboResult = await helpers.detectTurbo(projectDirectory);

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Build Command.
 *
 * @since 0.16.0
 */
describe('CliGenerateGithubWorkflows.buildCommand', () => {
  it('emits turbo run command with filters and concurrency', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersBuildCommandResult = helpers.buildCommand(
      'build',
      [
        '@cbnventures/nova',
        '@cbnventures/docusaurus-preset-nova',
        'nova-docs',
      ],
      true,
    );

    strictEqual(result, 'npx turbo run build --filter=@cbnventures/nova --filter=@cbnventures/docusaurus-preset-nova --filter=nova-docs --concurrency=2');

    return;
  });

  it('emits npm run command for single workspace without turbo', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersBuildCommandResult = helpers.buildCommand(
      'check',
      ['ntfy-reverse-proxy'],
      false,
    );

    strictEqual(result, 'npm run check -w ntfy-reverse-proxy');

    return;
  });

  it('emits npm run command with multiple -w flags without turbo', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersBuildCommandResult = helpers.buildCommand(
      'check',
      [
        'pkg-a',
        'pkg-b',
      ],
      false,
    );

    strictEqual(result, 'npm run check -w pkg-a -w pkg-b');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Render Artifact Paths.
 *
 * @since 0.16.0
 */
describe('CliGenerateGithubWorkflows.renderArtifactPaths', () => {
  const targetsMetadata: TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsTargetMetadata = {
    'npm': { artifactPaths: ['{workingDir}/build'] },
    'github-packages': { artifactPaths: ['{workingDir}/build'] },
    'docker-hub': { artifactPaths: [] },
    'aws-amplify-nextjs': {
      artifactPaths: [
        '{workingDir}/.next',
        '{workingDir}/public',
      ],
    },
  };

  it('dedupes paths across multiple targets for the same workingDir', () => {
    const targets: TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsTargets = [
      {
        type: 'npm', workingDir: './packages/nova',
      },
      {
        type: 'github-packages', workingDir: './packages/nova',
      },
      {
        type: 'npm', workingDir: './packages/docusaurus-preset-nova',
      },
    ];

    const result: TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsResult = helpers.renderArtifactPaths(targets, targetsMetadata);

    strictEqual(result, [
      '            packages/nova/build',
      '            packages/docusaurus-preset-nova/build',
    ].join('\n'));

    return;
  });

  it('returns empty string when all targets have no artifact paths', () => {
    const targets: TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsTargets = [{
      type: 'docker-hub', workingDir: './',
    }];

    const result: TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsResult = helpers.renderArtifactPaths(targets, targetsMetadata);

    strictEqual(result, '');

    return;
  });

  it('emits two indented lines for aws-amplify-nextjs', () => {
    const targets: TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsTargets = [{
      type: 'aws-amplify-nextjs', workingDir: './apps/web',
    }];

    const result: TestsCliGenerateGithubWorkflowsHelpersRenderArtifactPathsResult = helpers.renderArtifactPaths(targets, targetsMetadata);

    strictEqual(result, [
      '            apps/web/.next',
      '            apps/web/public',
    ].join('\n'));

    return;
  });

  return;
});

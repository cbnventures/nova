import { strictEqual } from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { describe, it } from 'vitest';

import { CliGenerateGithubWorkflows } from '../../../../cli/generate/github/workflows.js';

import type {
  TestsCliGenerateGithubWorkflowsHelpersBuildArtifactNameResult,
  TestsCliGenerateGithubWorkflowsHelpersBuildCommandResult,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboPrefix,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboProjectDirectory,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboResult,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboTemporaryDirectory,
  TestsCliGenerateGithubWorkflowsHelpersDetectTurboTurboConfigPath,
  TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsExpected,
  TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsResult,
  TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetMetadata,
  TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargets,
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
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Render Upload Artifact Steps.
 *
 * @since 0.16.3
 */
describe('CliGenerateGithubWorkflows.renderUploadArtifactSteps', () => {
  const targetsMetadata: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargetMetadata = {
    'npm': { artifactPaths: ['{workingDir}/build'] },
    'github-packages': { artifactPaths: ['{workingDir}/build'] },
    'docker-hub': { artifactPaths: [] },
    'aws-amplify-nextjs': {
      artifactPaths: [
        '{workingDir}/build',
        '{workingDir}/public',
      ],
    },
    'cloudflare-pages-docusaurus': { artifactPaths: ['{workingDir}/build'] },
  };

  it('emits one upload step per target without deduping shared workingDirs', () => {
    const targets: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargets = [
      {
        type: 'npm', workingDir: './packages/nova',
      },
      {
        type: 'github-packages', workingDir: './packages/nova',
      },
    ];

    const result: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsResult = helpers.renderUploadArtifactSteps(targets, targetsMetadata);

    const expected: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsExpected = [
      '      - name: "Upload build artifacts (npm/packages-nova)"',
      '        uses: "actions/upload-artifact@v4"',
      '        with:',
      '          name: "build-npm-packages-nova"',
      '          retention-days: 1',
      '          path: |',
      '            packages/nova/build',
      '',
      '      - name: "Upload build artifacts (github-packages/packages-nova)"',
      '        uses: "actions/upload-artifact@v4"',
      '        with:',
      '          name: "build-github-packages-packages-nova"',
      '          retention-days: 1',
      '          path: |',
      '            packages/nova/build',
    ].join('\n');

    strictEqual(result, expected);

    return;
  });

  it('returns empty string when all targets have empty artifactPaths', () => {
    const targets: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargets = [{
      type: 'docker-hub', workingDir: './',
    }];

    const result: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsResult = helpers.renderUploadArtifactSteps(targets, targetsMetadata);

    strictEqual(result, '');

    return;
  });

  it('skips targets with empty artifactPaths but emits steps for the rest', () => {
    const targets: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargets = [
      {
        type: 'docker-hub', workingDir: './',
      },
      {
        type: 'npm', workingDir: './packages/nova',
      },
    ];

    const result: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsResult = helpers.renderUploadArtifactSteps(targets, targetsMetadata);

    const expected: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsExpected = [
      '      - name: "Upload build artifacts (npm/packages-nova)"',
      '        uses: "actions/upload-artifact@v4"',
      '        with:',
      '          name: "build-npm-packages-nova"',
      '          retention-days: 1',
      '          path: |',
      '            packages/nova/build',
    ].join('\n');

    strictEqual(result, expected);

    return;
  });

  it('emits two indented path lines for aws-amplify-nextjs', () => {
    const targets: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargets = [{
      type: 'aws-amplify-nextjs', workingDir: './apps/web',
    }];

    const result: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsResult = helpers.renderUploadArtifactSteps(targets, targetsMetadata);

    const expected: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsExpected = [
      '      - name: "Upload build artifacts (aws-amplify-nextjs/apps-web)"',
      '        uses: "actions/upload-artifact@v4"',
      '        with:',
      '          name: "build-aws-amplify-nextjs-apps-web"',
      '          retention-days: 1',
      '          path: |',
      '            apps/web/build',
      '            apps/web/public',
    ].join('\n');

    strictEqual(result, expected);

    return;
  });

  it('skips targets whose type is missing from targetsMetadata', () => {
    const targets: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsTargets = [{
      type: 'unknown-type', workingDir: './packages/x',
    }];

    const result: TestsCliGenerateGithubWorkflowsHelpersRenderUploadArtifactStepsResult = helpers.renderUploadArtifactSteps(targets, targetsMetadata);

    strictEqual(result, '');

    return;
  });

  return;
});

/**
 * Tests - CLI - Generate - GitHub - Workflows Helpers - Build Artifact Name.
 *
 * @since 0.16.3
 */
describe('CliGenerateGithubWorkflows.buildArtifactName', () => {
  it('joins build prefix, targetType, and targetId with dashes', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersBuildArtifactNameResult = helpers.buildArtifactName('npm', 'packages-nova');

    strictEqual(result, 'build-npm-packages-nova');

    return;
  });

  it('preserves nested-slug targetIds verbatim', () => {
    const result: TestsCliGenerateGithubWorkflowsHelpersBuildArtifactNameResult = helpers.buildArtifactName('cloudflare-pages-docusaurus', 'apps-docs');

    strictEqual(result, 'build-cloudflare-pages-docusaurus-apps-docs');

    return;
  });

  return;
});

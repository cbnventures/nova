import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  it,
} from 'vitest';

import { Runner as LibNovaConfig } from '../../lib/nova-config.js';

import type {
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_LoadsNamedAssembliesAndDeployReferences_Config,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_LoadsNamedAssembliesAndDeployReferences_ConfigContents,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_LoadsNamedAssembliesAndDeployReferences_Loaded,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_LoadsNamedAssembliesAndDeployReferences_ProjectDirectory,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_OriginalCwd,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_Config,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_ConfigContents,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_Loaded,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_Messages,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_ProjectDirectory,
  Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_SandboxRoot,
} from '../../types/tests/lib/nova-config-artifacts.test.d.ts';

/**
 * Tests - Lib - Nova Config Artifacts - Nova Config Artifacts.
 *
 * @since 0.38.0
 */
describe('Nova config artifacts', async () => {
  const originalCwd: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_OriginalCwd = process.cwd();
  const sandboxRoot: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-config-artifacts-test-'));

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('loads named assemblies and deploy references', async () => {
    const projectDirectory: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_LoadsNamedAssembliesAndDeployReferences_ProjectDirectory = join(sandboxRoot, 'valid');
    const configContents: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_LoadsNamedAssembliesAndDeployReferences_ConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'artifact-contract',
          title: 'Artifact Contract',
        },
      },
      artifacts: {
        'site-release': {
          build: ['./apps/site'],
          sources: [{
            from: './apps/site/build',
            to: './site',
          }],
        },
      },
      workflows: [{
        name: 'publish-project',
        template: 'publish',
        triggers: ['tag-push'],
        build: ['./apps/site'],
        deploy: [{
          to: 'github-pages',
          path: './apps/site',
          artifact: 'site-release',
        }],
      }],
      workspaces: {
        './': {
          name: 'artifact-contract-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/site': {
          name: 'artifact-contract-app-site',
          role: 'app',
          policy: 'trackable',
        },
      },
    }, null, 2);

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'nova.config.json'), `${configContents}\n`, 'utf-8');

    process.chdir(projectDirectory);

    const config: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_LoadsNamedAssembliesAndDeployReferences_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_LoadsNamedAssembliesAndDeployReferences_Loaded = await config.load();

    deepStrictEqual(loaded['artifacts'], {
      'site-release': {
        build: ['./apps/site'],
        sources: [{
          from: './apps/site/build',
          to: './site',
        }],
      },
    });
    deepStrictEqual(loaded['workflows'], [{
      name: 'publish-project',
      template: 'publish',
      triggers: ['tag-push'],
      build: ['./apps/site'],
      deploy: [{
        to: 'github-pages',
        path: './apps/site',
        artifact: 'site-release',
      }],
    }]);
    deepStrictEqual(config.diagnostics(), []);

    return;
  });

  it('rejects unsafe paths and unknown deploy references', async () => {
    const projectDirectory: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_ProjectDirectory = join(sandboxRoot, 'invalid');
    const configContents: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_ConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'invalid-artifact',
          title: 'Invalid Artifact',
        },
      },
      artifacts: {
        release: {
          build: ['./apps/site'],
          sources: [{
            from: '../private',
            to: './site',
          }],
        },
      },
      workflows: [{
        name: 'publish-project',
        template: 'publish',
        triggers: ['tag-push'],
        build: ['./apps/site'],
        deploy: [{
          to: 'github-pages',
          path: './apps/site',
          artifact: 'missing',
        }],
      }],
      workspaces: {
        './': {
          name: 'invalid-artifact-project',
          role: 'project',
          policy: 'freezable',
        },
        './apps/site': {
          name: 'invalid-artifact-app-site',
          role: 'app',
          policy: 'trackable',
        },
      },
    }, null, 2);

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'nova.config.json'), `${configContents}\n`, 'utf-8');

    process.chdir(projectDirectory);

    const config: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_Loaded = await config.load();
    const messages: Tests_Lib_NovaConfigArtifacts_NovaConfigArtifacts_RejectsUnsafePathsAndUnknownDeployReferences_Messages = config.diagnostics().map((diagnostic) => diagnostic['message']);

    strictEqual(loaded['artifacts'], undefined);
    deepStrictEqual(loaded['workflows'], [{
      name: 'publish-project',
      template: 'publish',
      triggers: ['tag-push'],
      build: ['./apps/site'],
    }]);
    strictEqual(messages.some((message) => message.includes('paths must be safe project-relative paths')), true);
    strictEqual(messages.some((message) => message.includes('references unknown artifact "missing"')), true);

    return;
  });

  return;
});

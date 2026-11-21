import { deepStrictEqual, strictEqual } from 'node:assert/strict';
import {
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Runner as CliScaffoldPackageGithubAction } from '../../cli/scaffold/package/github-action.js';
import { Runner as CliScaffoldPackageHomebridge } from '../../cli/scaffold/package/homebridge.js';
import { Runner as CliScaffoldPackagePfsense } from '../../cli/scaffold/package/pfsense.js';
import * as scaffold from '../../lib/scaffold.js';
import { resolveDistributablePolicyMessages, resolveNonNpmDeployTargets } from '../../lib/workspace-policy.js';

import type {
  Tests_Lib_WorkspacePolicy_WorkspacePolicy_FlagsADistributableWorkspacePublishedOutsideNpm_Messages,
  Tests_Lib_WorkspacePolicy_WorkspacePolicy_ListsThePublishTargetsThatAreNotNpmRegistries_Targets,
  Tests_Lib_WorkspacePolicy_WorkspacePolicy_MarksOnlyTheNpmPackageScaffoldsAsNpmPublishers_RunScaffoldSpy,
  Tests_Lib_WorkspacePolicy_WorkspacePolicy_RegistersANonNpmPackageAsTrackable_ConfigRaw,
  Tests_Lib_WorkspacePolicy_WorkspacePolicy_RegistersANonNpmPackageAsTrackable_ProjectDirectory,
} from '../../types/tests/lib/workspace-policy.test.d.ts';

/**
 * Tests - Lib - Workspace Policy - Workspace Policy.
 *
 * @since 0.49.0
 */
describe('workspace policy', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('lists the publish targets that are not npm registries', () => {
    const targets: Tests_Lib_WorkspacePolicy_WorkspacePolicy_ListsThePublishTargetsThatAreNotNpmRegistries_Targets = resolveNonNpmDeployTargets({
      workflows: [
        {
          template: 'publish',
          name: 'project',
          triggers: ['release'],
          deploy: [
            {
              to: 'npm',
              path: './packages/action',
            },
            {
              to: 'github-action',
              path: './packages/action',
            },
            {
              to: 'github-pages',
              path: './apps/docs',
            },
          ],
        },
        {
          template: 'publish',
          name: 'second',
          triggers: ['release'],
          deploy: [{
            to: 'github-action',
            path: './packages/action',
          }],
        },
      ],
    }, './packages/action');

    deepStrictEqual(targets, ['github-action']);

    return;
  });

  it('flags a distributable workspace published outside npm', () => {
    const messages: Tests_Lib_WorkspacePolicy_WorkspacePolicy_FlagsADistributableWorkspacePublishedOutsideNpm_Messages = resolveDistributablePolicyMessages({
      workspaces: {
        './packages/firewall': {
          name: 'pfsense-pkg-firewall',
          role: 'package',
          policy: 'distributable',
        },
        './packages/library': {
          name: 'example-library',
          role: 'package',
          policy: 'distributable',
        },
      },
      workflows: [{
        template: 'publish',
        name: 'project',
        triggers: ['release'],
        deploy: [
          {
            to: 'pfsense',
            path: './packages/firewall',
          },
          {
            to: 'npm',
            path: './packages/library',
          },
        ],
      }],
    });

    deepStrictEqual(messages, ['Workspace "./packages/firewall" is "distributable", but a publish workflow sends it to "pfsense", not npm. Only npm packages can be distributable. Set its policy to "trackable".']);

    return;
  });

  it('registers a non-npm package as trackable', async () => {
    const projectDirectory: Tests_Lib_WorkspacePolicy_WorkspacePolicy_RegistersANonNpmPackageAsTrackable_ProjectDirectory = await mkdtemp(join(tmpdir(), 'nova-workspace-policy-'));

    try {
      await writeFile(join(projectDirectory, 'nova.config.json'), `${JSON.stringify({
        project: {
          name: { slug: 'example' },
        },
        workspaces: {},
      }, null, 2)}\n`, 'utf-8');

      await scaffold.registerWorkspaceInConfig(join(projectDirectory, 'nova.config.json'), './packages/action', 'example-action', 'action', 'package', [], ['nodejs'], undefined, undefined, undefined, false);

      await scaffold.registerWorkspaceInConfig(join(projectDirectory, 'nova.config.json'), './packages/library', 'example-library', 'library', 'package', [], ['nodejs']);

      const configRaw: Tests_Lib_WorkspacePolicy_WorkspacePolicy_RegistersANonNpmPackageAsTrackable_ConfigRaw = await readFile(join(projectDirectory, 'nova.config.json'), 'utf-8');

      strictEqual(JSON.parse(configRaw)['workspaces']['./packages/action']['policy'], 'trackable');

      strictEqual(JSON.parse(configRaw)['workspaces']['./packages/library']['policy'], 'distributable');
    } finally {
      await rm(projectDirectory, {
        recursive: true,
        force: true,
      });
    }

    return;
  });

  it('marks only the npm package scaffolds as npm publishers', async () => {
    const runScaffoldSpy: Tests_Lib_WorkspacePolicy_WorkspacePolicy_MarksOnlyTheNpmPackageScaffoldsAsNpmPublishers_RunScaffoldSpy = vi.spyOn(scaffold, 'runScaffold').mockResolvedValue(undefined);

    await CliScaffoldPackageGithubAction.run({});

    await CliScaffoldPackagePfsense.run({});

    await CliScaffoldPackageHomebridge.run({});

    expect(runScaffoldSpy).toHaveBeenNthCalledWith(1, {}, expect.objectContaining({ publishesToNpm: false }));

    expect(runScaffoldSpy).toHaveBeenNthCalledWith(2, {}, expect.objectContaining({ publishesToNpm: false }));

    expect(runScaffoldSpy).toHaveBeenNthCalledWith(3, {}, expect.not.objectContaining({ publishesToNpm: false }));

    return;
  });

  return;
});

import { deepStrictEqual } from 'node:assert/strict';
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

import { Runner as LibWorkspaceGraph } from '../../lib/workspace-graph.js';

import type {
  Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Graph,
  Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Packages,
  Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Returns,
  Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Workspaces,
  Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_SandboxRoot,
} from '../../types/tests/lib/workspace-graph.test.d.ts';

/**
 * Tests - Lib - Workspace Graph - Lib Workspace Graph.
 *
 * @since 0.41.1
 */
describe('LibWorkspaceGraph', async () => {
  const sandboxRoot: Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-workspace-graph-test-'));

  afterAll(async () => {
    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('reads internal workspace dependencies', async (): Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Returns => {
    const packages: Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Packages = [
      {
        path: 'apps/web',
        contents: {
          name: 'graph-app-web',
          dependencies: {
            'graph-app-web': '0.0.0',
            'lodash': '4.17.21',
            'util-alias': 'file:../../packages/util',
          },
          devDependencies: { '@graph/ui': 'workspace:*' },
        },
      },
      {
        path: 'apps/ios',
        contents: {
          name: 'graph-app-ios',
          optionalDependencies: { '@graph/ui': '*' },
        },
      },
      {
        path: 'apps/android',
        contents: { name: 'graph-app-android' },
      },
      {
        path: 'packages/ui',
        contents: { name: '@graph/ui' },
      },
      {
        path: 'packages/util',
        contents: { name: 'graph-package-util' },
      },
    ];
    const workspaces: Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Workspaces = {
      './': {
        name: 'graph-project',
        role: 'project',
        policy: 'freezable',
      },
      './apps/web': {
        name: 'graph-app-web',
        role: 'app',
        policy: 'trackable',
      },
      './apps/ios': {
        name: 'graph-app-ios',
        role: 'app',
        policy: 'trackable',
      },
      './apps/android': {
        name: 'graph-app-android',
        role: 'app',
        policy: 'trackable',
      },
      './packages/util': {
        name: 'graph-package-util',
        role: 'package',
        policy: 'trackable',
      },
      './packages/ui': {
        name: '@graph/ui',
        role: 'package',
        policy: 'trackable',
      },
      './apps/missing': {
        name: 'graph-app-missing',
        role: 'app',
        policy: 'trackable',
      },
    };

    await Promise.all(packages.map(async (workspacePackage) => {
      await mkdir(join(sandboxRoot, workspacePackage['path']), { recursive: true });

      await writeFile(join(sandboxRoot, workspacePackage['path'], 'package.json'), JSON.stringify(workspacePackage['contents'], null, 2), 'utf-8');

      return;
    }));

    const graph: Tests_Lib_WorkspaceGraph_LibWorkspaceGraph_ReadsInternalWorkspaceDependencies_Graph = await LibWorkspaceGraph.read(sandboxRoot, workspaces);

    deepStrictEqual(graph, {
      './apps/web': {
        dependencies: [
          './packages/util',
          './packages/ui',
        ],
      },
      './apps/ios': {
        dependencies: ['./packages/ui'],
      },
      './apps/android': {
        dependencies: [],
      },
      './packages/util': {
        dependencies: [],
      },
      './packages/ui': {
        dependencies: [],
      },
      './apps/missing': {
        dependencies: [],
      },
    });

    return;
  });

  return;
});

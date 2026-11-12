import { promises as fs } from 'node:fs';
import {
  join,
  resolve,
} from 'node:path';

import { isPlainObject } from './utility.js';

import type {
  Lib_WorkspaceGraph_DependencyFields,
  Lib_WorkspaceGraph_LocalSpecPrefixes,
  Lib_WorkspaceGraph_Runner_Read_Directories,
  Lib_WorkspaceGraph_Runner_Read_Graph,
  Lib_WorkspaceGraph_Runner_Read_Names,
  Lib_WorkspaceGraph_Runner_Read_PackageJsons,
  Lib_WorkspaceGraph_Runner_Read_PackageName,
  Lib_WorkspaceGraph_Runner_Read_Paths,
  Lib_WorkspaceGraph_Runner_Read_ProjectDirectory,
  Lib_WorkspaceGraph_Runner_Read_Returns,
  Lib_WorkspaceGraph_Runner_Read_Workspace,
  Lib_WorkspaceGraph_Runner_Read_Workspaces,
  Lib_WorkspaceGraph_Runner_ReadPackageJson_Directory,
  Lib_WorkspaceGraph_Runner_ReadPackageJson_ParsedContent,
  Lib_WorkspaceGraph_Runner_ReadPackageJson_RawContent,
  Lib_WorkspaceGraph_Runner_ReadPackageJson_Returns,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_DependencyName,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_DependencyPaths,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_Directories,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_Directory,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_FieldValue,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_LocalPath,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_LocalPrefix,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_LocalWorkspacePath,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_NamedPath,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_Names,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_PackageJson,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_Paths,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_Returns,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_SelfPath,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_Spec,
  Lib_WorkspaceGraph_Runner_ResolveDependencies_TargetDirectory,
} from '../types/lib/workspace-graph.d.ts';

/**
 * Lib - Workspace Graph - Dependency Fields.
 *
 * Lists the package.json fields whose entries can point at another workspace,
 * matching the fields Nova's workspace runner reads for its task graph.
 *
 * @since 0.41.1
 */
const dependencyFields: Lib_WorkspaceGraph_DependencyFields = [
  'dependencies',
  'devDependencies',
  'peerDependencies',
  'optionalDependencies',
];

/**
 * Lib - Workspace Graph - Local Spec Prefixes.
 *
 * Dependency spec prefixes that can name a folder inside the repository
 * instead of a registry package.
 *
 * @since 0.41.1
 */
const localSpecPrefixes: Lib_WorkspaceGraph_LocalSpecPrefixes = [
  'file:',
  'link:',
  'workspace:',
];

/**
 * Lib - Workspace Graph.
 *
 * Reads each registered workspace's package.json to find the workspaces it
 * depends on inside the repository.
 *
 * @since 0.41.1
 */
export class Runner {
  /**
   * Lib - Workspace Graph - Read.
   *
   * Returns one node per registered non-root workspace with its internal
   * dependencies in configuration order.
   *
   * @param {Lib_WorkspaceGraph_Runner_Read_ProjectDirectory} projectDirectory - Project directory.
   * @param {Lib_WorkspaceGraph_Runner_Read_Workspaces}       workspaces       - Workspaces.
   *
   * @returns {Lib_WorkspaceGraph_Runner_Read_Returns}
   *
   * @since 0.41.1
   */
  public static async read(projectDirectory: Lib_WorkspaceGraph_Runner_Read_ProjectDirectory, workspaces: Lib_WorkspaceGraph_Runner_Read_Workspaces): Lib_WorkspaceGraph_Runner_Read_Returns {
    const paths: Lib_WorkspaceGraph_Runner_Read_Paths = Object.keys(workspaces).filter((workspacePath) => workspacePath !== './');
    const directories: Lib_WorkspaceGraph_Runner_Read_Directories = paths.map((workspacePath) => resolve(projectDirectory, workspacePath));
    const packageJsons: Lib_WorkspaceGraph_Runner_Read_PackageJsons = await Promise.all(directories.map((directory) => Runner.readPackageJson(directory)));
    const names: Lib_WorkspaceGraph_Runner_Read_Names = paths.map((workspacePath, index) => {
      const packageName: Lib_WorkspaceGraph_Runner_Read_PackageName = (packageJsons[index] ?? {})['name'];
      const workspace: Lib_WorkspaceGraph_Runner_Read_Workspace = workspaces[workspacePath];

      if (typeof packageName === 'string' && packageName !== '') {
        return packageName;
      }

      return (workspace === undefined) ? workspacePath : workspace['name'];
    });
    const graph: Lib_WorkspaceGraph_Runner_Read_Graph = {};

    paths.forEach((workspacePath, index) => {
      Reflect.set(graph, workspacePath, {
        dependencies: Runner.resolveDependencies(packageJsons[index] ?? {}, workspacePath, directories[index] ?? workspacePath, paths, directories, names),
      });

      return;
    });

    return graph;
  }

  /**
   * Lib - Workspace Graph - Read package.json.
   *
   * Reads one workspace manifest, treating a missing or unreadable file as a
   * workspace without dependencies.
   *
   * @param {Lib_WorkspaceGraph_Runner_ReadPackageJson_Directory} directory - Directory.
   *
   * @private
   *
   * @returns {Lib_WorkspaceGraph_Runner_ReadPackageJson_Returns}
   *
   * @since 0.41.1
   */
  private static async readPackageJson(directory: Lib_WorkspaceGraph_Runner_ReadPackageJson_Directory): Lib_WorkspaceGraph_Runner_ReadPackageJson_Returns {
    try {
      const rawContent: Lib_WorkspaceGraph_Runner_ReadPackageJson_RawContent = await fs.readFile(join(directory, 'package.json'), 'utf-8');
      const parsedContent: Lib_WorkspaceGraph_Runner_ReadPackageJson_ParsedContent = JSON.parse(rawContent);

      return (isPlainObject(parsedContent) === true) ? parsedContent : {};
    } catch {
      return {};
    }
  }

  /**
   * Lib - Workspace Graph - Resolve Dependencies.
   *
   * Maps dependency names and local file, link, or workspace specs to registered
   * workspace paths, returned in configuration order without the workspace itself.
   *
   * @param {Lib_WorkspaceGraph_Runner_ResolveDependencies_PackageJson} packageJson - Package json.
   * @param {Lib_WorkspaceGraph_Runner_ResolveDependencies_SelfPath}    selfPath    - Self path.
   * @param {Lib_WorkspaceGraph_Runner_ResolveDependencies_Directory}   directory   - Directory.
   * @param {Lib_WorkspaceGraph_Runner_ResolveDependencies_Paths}       paths       - Paths.
   * @param {Lib_WorkspaceGraph_Runner_ResolveDependencies_Directories} directories - Directories.
   * @param {Lib_WorkspaceGraph_Runner_ResolveDependencies_Names}       names       - Names.
   *
   * @private
   *
   * @returns {Lib_WorkspaceGraph_Runner_ResolveDependencies_Returns}
   *
   * @since 0.41.1
   */
  private static resolveDependencies(packageJson: Lib_WorkspaceGraph_Runner_ResolveDependencies_PackageJson, selfPath: Lib_WorkspaceGraph_Runner_ResolveDependencies_SelfPath, directory: Lib_WorkspaceGraph_Runner_ResolveDependencies_Directory, paths: Lib_WorkspaceGraph_Runner_ResolveDependencies_Paths, directories: Lib_WorkspaceGraph_Runner_ResolveDependencies_Directories, names: Lib_WorkspaceGraph_Runner_ResolveDependencies_Names): Lib_WorkspaceGraph_Runner_ResolveDependencies_Returns {
    const dependencyPaths: Lib_WorkspaceGraph_Runner_ResolveDependencies_DependencyPaths = new Set();

    for (const field of dependencyFields) {
      const fieldValue: Lib_WorkspaceGraph_Runner_ResolveDependencies_FieldValue = packageJson[field];

      if (isPlainObject(fieldValue) === false) {
        continue;
      }

      for (const dependencyEntry of Object.entries(fieldValue)) {
        const dependencyName: Lib_WorkspaceGraph_Runner_ResolveDependencies_DependencyName = dependencyEntry[0];
        const spec: Lib_WorkspaceGraph_Runner_ResolveDependencies_Spec = dependencyEntry[1];
        const namedPath: Lib_WorkspaceGraph_Runner_ResolveDependencies_NamedPath = paths[names.indexOf(dependencyName)];

        if (namedPath !== undefined) {
          dependencyPaths.add(namedPath);
        }

        if (typeof spec !== 'string') {
          continue;
        }

        const localPrefix: Lib_WorkspaceGraph_Runner_ResolveDependencies_LocalPrefix = localSpecPrefixes.find((prefix) => spec.startsWith(prefix) === true);

        if (localPrefix === undefined) {
          continue;
        }

        const localPath: Lib_WorkspaceGraph_Runner_ResolveDependencies_LocalPath = spec.slice(localPrefix.length);

        if (localPath.startsWith('.') === false && localPath.startsWith('/') === false) {
          continue;
        }

        const targetDirectory: Lib_WorkspaceGraph_Runner_ResolveDependencies_TargetDirectory = resolve(directory, localPath);
        const localWorkspacePath: Lib_WorkspaceGraph_Runner_ResolveDependencies_LocalWorkspacePath = paths[directories.indexOf(targetDirectory)];

        if (localWorkspacePath !== undefined) {
          dependencyPaths.add(localWorkspacePath);
        }
      }
    }

    dependencyPaths.delete(selfPath);

    return paths.filter((workspacePath) => dependencyPaths.has(workspacePath));
  }
}

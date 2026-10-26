import {
  deepStrictEqual,
  rejects,
  strictEqual,
} from 'node:assert/strict';
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
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

import { Runner as LibDockerPackaging } from '../../lib/docker-packaging.js';

import type {
  Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_ApiDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_BotDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_BotWorkspace,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_BuildCommands,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_ComposeContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_DockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_ProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_SharedDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_ApiWorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_DockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_DocsWorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_NativeWorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_ProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_WebWorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_AssemblyPackage,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ComposeContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ContainerBuildPackage,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_DockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_DockerignoreContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_DockerignoreLines,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_GitAttributesContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_HealthcheckContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_InitUserContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_NovaConfig,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_RootPackage,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ServiceRunContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ShellVariableMarker,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_KeepsADocsOnlyDocusaurusApplianceOptInAndIndependentFromPagesDelivery_ComposeContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_KeepsADocsOnlyDocusaurusApplianceOptInAndIndependentFromPagesDelivery_DockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_KeepsADocsOnlyDocusaurusApplianceOptInAndIndependentFromPagesDelivery_ProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_KeepsADocsOnlyDocusaurusApplianceOptInAndIndependentFromPagesDelivery_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_DockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_OriginalPackage,
  Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_ProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_SyntheticPackage,
  Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_PnpmDockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_PnpmProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_PnpmWorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_ShellVariableMarker,
  Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnConfigContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnDockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnRunScriptContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnWorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ArtifactSentinel,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_DuplicateManifestContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_Manifest,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ManifestPath,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ReservedManifestContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ServiceRunPath,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsReservedAndDuplicateServiceNamesBeforeWritingDockerArtifacts_ProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsReservedAndDuplicateServiceNamesBeforeWritingDockerArtifacts_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SandboxRoot,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_CycleCaughtError,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_CycleErrorMessage,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_PrepareScript,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_PrepareType,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_PrepareUp,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_ProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_RootfsDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_ShellVariableMarker,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UnsafePathCaughtError,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UnsafePathErrorMessage,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UnsafeRuntimePathCaughtError,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UnsafeRuntimePathErrorMessage,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UpdatedManifest,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_WorkerFinish,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_WorkerType,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_WritablePathsContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_UsesYarnClassicNodeModulesWithoutBerryConfiguration_DockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_UsesYarnClassicNodeModulesWithoutBerryConfiguration_ProjectDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_UsesYarnClassicNodeModulesWithoutBerryConfiguration_SyntheticPackage,
  Tests_Lib_DockerPackaging_LibDockerPackaging_UsesYarnClassicNodeModulesWithoutBerryConfiguration_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_Manifest,
  Tests_Lib_DockerPackaging_PathExists_Returns,
  Tests_Lib_DockerPackaging_PathExists_TargetPath,
  Tests_Lib_DockerPackaging_WriteProject_PackageManager,
  Tests_Lib_DockerPackaging_WriteProject_ProjectDirectory,
  Tests_Lib_DockerPackaging_WriteProject_Returns,
  Tests_Lib_DockerPackaging_WriteWorkspace_Dependencies,
  Tests_Lib_DockerPackaging_WriteWorkspace_PackageName,
  Tests_Lib_DockerPackaging_WriteWorkspace_ProjectDirectory,
  Tests_Lib_DockerPackaging_WriteWorkspace_Returns,
  Tests_Lib_DockerPackaging_WriteWorkspace_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_WriteWorkspace_WorkspacePath,
} from '../../types/tests/lib/docker-packaging.test.d.ts';

/**
 * Tests - Lib - Docker Packaging - Write Project.
 *
 * @param {Tests_Lib_DockerPackaging_String} projectDirectory - Project directory.
 * @param {Tests_Lib_DockerPackaging_String} packageManager   - Package manager.
 *
 * @returns {Promise<void>}
 *
 * @since 0.34.0
 */
async function writeProject(projectDirectory: Tests_Lib_DockerPackaging_WriteProject_ProjectDirectory, packageManager: Tests_Lib_DockerPackaging_WriteProject_PackageManager = 'npm@11.18.0'): Tests_Lib_DockerPackaging_WriteProject_Returns {
  await mkdir(join(projectDirectory, 'apps'), { recursive: true });
  await mkdir(join(projectDirectory, 'packages'), { recursive: true });
  await writeFile(join(projectDirectory, 'package.json'), `${JSON.stringify({
    name: 'fixture-project',
    private: true,
    scripts: {
      'check': 'nova utility run-scripts --sequential "check:*"',
      'clean': 'nova utility run-scripts --parallel "clean:*"',
    },
    workspaces: [
      'apps/*',
      'packages/*',
    ],
    packageManager,
  }, null, 2)}\n`, 'utf-8');
  await writeFile(join(projectDirectory, 'nova.config.json'), `${JSON.stringify({
    project: {
      name: {
        slug: 'fixture',
        title: 'Fixture',
      },
      platforms: ['nodejs'],
    },
    workspaces: {
      './': {
        name: 'fixture-project',
        policy: 'freezable',
        role: 'project',
      },
    },
  }, null, 2)}\n`, 'utf-8');

  return;
}

/**
 * Tests - Lib - Docker Packaging - Write Workspace.
 *
 * @param {Tests_Lib_DockerPackaging_String}     projectDirectory - Project directory.
 * @param {Tests_Lib_DockerPackaging_String}     workspacePath    - Workspace path.
 * @param {Tests_Lib_DockerPackaging_String}     packageName      - Package name.
 * @param {Tests_Lib_DockerPackaging_JsonObject} dependencies     - Dependencies.
 *
 * @returns {Promise<string>}
 *
 * @since 0.34.0
 */
async function writeWorkspace(projectDirectory: Tests_Lib_DockerPackaging_WriteWorkspace_ProjectDirectory, workspacePath: Tests_Lib_DockerPackaging_WriteWorkspace_WorkspacePath, packageName: Tests_Lib_DockerPackaging_WriteWorkspace_PackageName, dependencies: Tests_Lib_DockerPackaging_WriteWorkspace_Dependencies = {}): Tests_Lib_DockerPackaging_WriteWorkspace_Returns {
  const workspaceDirectory: Tests_Lib_DockerPackaging_WriteWorkspace_WorkspaceDirectory = join(projectDirectory, workspacePath);

  await mkdir(join(workspaceDirectory, 'src'), { recursive: true });
  await writeFile(join(workspaceDirectory, 'package.json'), `${JSON.stringify({
    name: packageName,
    version: '0.0.0',
    private: true,
    scripts: {
      build: 'nova utility transpile --project tsconfig.source.json',
    },
    dependencies,
  }, null, 2)}\n`, 'utf-8');

  return workspaceDirectory;
}

/**
 * Tests - Lib - Docker Packaging - Path Exists.
 *
 * @param {Tests_Lib_DockerPackaging_String} targetPath - Target path.
 *
 * @returns {Promise<boolean>}
 *
 * @since 0.34.0
 */
async function pathExists(targetPath: Tests_Lib_DockerPackaging_PathExists_TargetPath): Tests_Lib_DockerPackaging_PathExists_Returns {
  try {
    await access(targetPath);

    return true;
  } catch {
    return false;
  }
}

/**
 * Tests - Lib - Docker Packaging - Lib Docker Packaging.
 *
 * @since 0.32.0
 */
describe('LibDockerPackaging', async () => {
  const sandboxRoot: Tests_Lib_DockerPackaging_LibDockerPackaging_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-docker-packaging-test-'));

  afterAll(async () => {
    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('generates one root s6 appliance and a private packages/docker workspace', async () => {
    const projectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ProjectDirectory = join(sandboxRoot, 'single');

    await writeProject(projectDirectory);

    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_WorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/api', 'fixture-app-api');

    await LibDockerPackaging.generateForTarget({
      profile: 'http-service',
      projectDirectory,
      replaceFile: true,
      workspaceDirectory,
      workspaceName: 'api',
    });

    const dockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_DockerfileContent = await readFile(join(projectDirectory, 'Dockerfile'), 'utf-8');
    const composeContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ComposeContent = await readFile(join(projectDirectory, 'compose.yml'), 'utf-8');
    const dockerignoreContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_DockerignoreContent = await readFile(join(projectDirectory, '.dockerignore'), 'utf-8');
    const gitAttributesContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_GitAttributesContent = await readFile(join(projectDirectory, 'packages', 'docker', '.gitattributes'), 'utf-8');
    const assemblyPackage: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_AssemblyPackage = JSON.parse(await readFile(join(projectDirectory, 'packages', 'docker', 'package.json'), 'utf-8'));
    const rootPackage: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_RootPackage = JSON.parse(await readFile(join(projectDirectory, 'package.json'), 'utf-8'));
    const novaConfig: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_NovaConfig = JSON.parse(await readFile(join(projectDirectory, 'nova.config.json'), 'utf-8'));
    const initUserContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_InitUserContent = await readFile(join(projectDirectory, 'packages', 'docker', 'rootfs', 'usr', 'local', 'libexec', 'nova-docker', 'init-user'), 'utf-8');
    const healthcheckContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_HealthcheckContent = await readFile(join(projectDirectory, 'packages', 'docker', 'rootfs', 'usr', 'local', 'libexec', 'nova-docker', 'healthcheck'), 'utf-8');
    const serviceRunContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ServiceRunContent = await readFile(join(projectDirectory, 'packages', 'docker', 'rootfs', 'etc', 's6-overlay', 's6-rc.d', 'api', 'run'), 'utf-8');
    const containerBuildPackage: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ContainerBuildPackage = JSON.parse(await readFile(join(projectDirectory, 'packages', 'docker', 'build-package.json'), 'utf-8'));
    const shellVariableMarker: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_ShellVariableMarker = '$';
    const dockerignoreLines: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesOneRootS6ApplianceAndAPrivatePackagesDockerWorkspace_DockerignoreLines = dockerignoreContent.split('\n');

    strictEqual(dockerfileContent.includes('FROM debian:trixie-20261005-slim AS s6-overlay'), true);
    strictEqual(dockerfileContent.includes('ARG S6_OVERLAY_VERSION="3.2.3.2"'), true);
    strictEqual(dockerfileContent.includes('"amd64") s6_architecture="x86_64"'), true);
    strictEqual(dockerfileContent.includes('"arm64") s6_architecture="aarch64"'), true);
    strictEqual(dockerfileContent.includes('COPY --from=s6-overlay /s6-rootfs/ /'), true);
    strictEqual(dockerfileContent.includes('apk add'), false);
    strictEqual(dockerfileContent.includes('ENTRYPOINT ["/init"]'), true);
    strictEqual(dockerfileContent.includes('[__'), false);
    strictEqual(dockerfileContent.includes('RUN corepack enable npm && npm install'), true);
    strictEqual(dockerfileContent.includes('COPY package-lock.json'), false);
    strictEqual(dockerfileContent.includes('COPY packages/docker/yarnrc.yml ./.yarnrc.yml'), false);
    strictEqual(dockerfileContent.includes('COPY ["packages/docker/workspace-manifests/apps/api/package.json","apps/api/package.json"]'), true);
    strictEqual(dockerfileContent.includes('RUN npm run build --workspace=\'fixture-app-api\''), true);
    strictEqual(dockerfileContent.includes('COPY . .'), false);
    strictEqual(dockerfileContent.includes('COPY ["apps/api","apps/api"]'), true);
    strictEqual(dockerfileContent.includes([
      'RUN mkdir -p /runtime \\',
      '  && cp -a . /runtime/',
    ].join('\n')), true);
    strictEqual(dockerfileContent.includes('COPY --from=build /runtime/ /app/'), true);
    strictEqual(dockerfileContent.includes('find /usr/local/libexec/nova-docker -type f -exec chmod 0755 {} \\;'), true);
    strictEqual(dockerfileContent.includes('find /etc/s6-overlay/s6-rc.d -type f \\( -name run -o -name finish \\) -exec chmod 0755 {} \\;'), true);
    strictEqual(dockerfileContent.includes('PUID=1000'), true);
    strictEqual(dockerfileContent.includes('PGID=1000'), true);
    strictEqual(dockerfileContent.includes('TZ=UTC'), true);
    strictEqual(composeContent.includes('context: .'), true);
    strictEqual(composeContent.includes('init: true'), false);
    strictEqual(composeContent.includes(`PUID: "${shellVariableMarker}{PUID:-1000}"`), true);
    strictEqual(composeContent.includes(`S6_READ_ONLY_ROOT: "${shellVariableMarker}{S6_READ_ONLY_ROOT:-0}"`), true);
    strictEqual(composeContent.includes('"3000:3000"'), true);
    strictEqual(dockerignoreContent.includes('#### Shared ####'), true);
    strictEqual(dockerignoreContent.includes('#### Version Control - Git / GitHub ####'), true);
    strictEqual(dockerignoreContent.includes('#### Language - Node.js ####'), true);
    strictEqual(dockerignoreContent.includes('#### Tooling - Nova ####'), true);
    strictEqual(dockerignoreLines.includes('**/.env'), true);
    strictEqual(dockerignoreLines.includes('**/.env.*'), true);
    strictEqual(dockerignoreLines.includes('!**/.env.sample'), true);
    strictEqual(dockerignoreLines.includes('!**/.env.example'), true);
    strictEqual(dockerignoreLines.indexOf('**/.env.*') < dockerignoreLines.indexOf('!**/.env.sample'), true);
    strictEqual(dockerignoreLines.includes('.secrets'), true);
    strictEqual(dockerignoreLines.includes('**/.secrets'), true);
    strictEqual(dockerignoreLines.includes('build'), true);
    strictEqual(dockerignoreLines.includes('**/build'), true);
    strictEqual(dockerignoreLines.includes('dist'), true);
    strictEqual(dockerignoreLines.includes('**/dist'), true);
    strictEqual(dockerignoreLines.includes('node_modules'), true);
    strictEqual(dockerignoreLines.includes('**/node_modules'), true);
    strictEqual(dockerignoreLines.includes('*.log'), true);
    strictEqual(dockerignoreLines.includes('**/*.log'), true);
    strictEqual(dockerignoreLines.includes('npm-debug.log*'), true);
    strictEqual(dockerignoreLines.includes('**/npm-debug.log*'), true);
    strictEqual(gitAttributesContent, 'rootfs/** text eol=lf\n');
    deepStrictEqual(assemblyPackage, {
      name: 'fixture-tool-docker',
      private: true,
      type: 'module',
      version: '0.0.0',
    });
    strictEqual(Object.hasOwn(assemblyPackage, 'scripts'), false);
    deepStrictEqual(containerBuildPackage['workspaces'], ['apps/api']);
    strictEqual(containerBuildPackage['packageManager'], 'npm@11.18.0');
    strictEqual(JSON.stringify(rootPackage['scripts']).includes('"deploy:container":"docker compose up --build --detach"'), true);
    strictEqual(JSON.stringify(novaConfig['workspaces']).includes('"./packages/docker":{"name":"fixture-tool-docker","policy":"freezable","role":"tool"}'), true);
    strictEqual(JSON.stringify(novaConfig['ignoreFiles']).includes('"./.dockerignore":{"bundles":["nova"],"patterns":[]}'), true);
    strictEqual(await pathExists(join(workspaceDirectory, 'Dockerfile')), false);
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker', 'yarnrc.yml')), false);
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker', 'rootfs', 'etc', 's6-overlay', 's6-rc.d', 'api', 'run')), true);
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker', 'rootfs', 'etc', 's6-overlay', 's6-rc.d', 'api', 'dependencies.d', 'nova-container-init')), true);
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker', 'rootfs', 'etc', 's6-overlay', 's6-rc.d', 'nova-container-init', 'dependencies.d', 'base')), true);
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker', 'rootfs', 'etc', 's6-overlay', 'user-bundles.d', 'user', 'contents.d', 'api')), true);
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker', 'rootfs', 'etc', 's6-overlay', 's6-rc.d', 'user')), false);
    strictEqual(initUserContent.includes('PUID must be between 1 and 2147483647.'), true);
    strictEqual(initUserContent.includes('TZ must name an installed IANA timezone.'), true);
    strictEqual(initUserContent.includes(`chown "${shellVariableMarker}{PUID_VALUE}:${shellVariableMarker}{PGID_VALUE}" -- "${shellVariableMarker}{writable_path}"`), true);
    strictEqual(initUserContent.includes('chown -R'), false);
    strictEqual(initUserContent.includes('groupmod'), false);
    strictEqual(initUserContent.includes('/etc/localtime'), false);
    strictEqual(initUserContent.includes('/etc|/etc/*'), true);
    strictEqual(initUserContent.startsWith('#!/command/with-contenv sh\n'), true);
    strictEqual(serviceRunContent.startsWith('#!/command/with-contenv sh\n'), true);
    strictEqual(serviceRunContent.includes('--require=/app/.pnp.cjs'), true);
    strictEqual(serviceRunContent.includes('--experimental-loader=/app/.pnp.loader.mjs'), true);
    strictEqual(serviceRunContent.includes(`/command/s6-applyuidgid -u "${shellVariableMarker}{PUID:-1000}" -g "${shellVariableMarker}{PGID:-1000}"`), true);
    strictEqual(healthcheckContent.includes('/command/s6-svstat -u /run/service/api'), true);
    strictEqual(serviceRunContent.includes('cd \'/app/apps/api\''), true);

    return;
  });

  it('adds a second workspace to the same image and builds its internal dependency closure', async () => {
    const projectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_ProjectDirectory = join(sandboxRoot, 'additive');

    await writeProject(projectDirectory);

    const sharedDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_SharedDirectory = await writeWorkspace(projectDirectory, 'packages/shared', 'fixture-package-shared');
    const botDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_BotDirectory = await writeWorkspace(projectDirectory, 'apps/bot', 'fixture-app-bot');
    const apiDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_ApiDirectory = await writeWorkspace(projectDirectory, 'apps/api', 'fixture-app-api', {
      'fixture-package-shared': 'workspace:*',
    });

    await writeWorkspace(projectDirectory, 'apps/unrelated', 'fixture-app-unrelated');

    strictEqual(await pathExists(sharedDirectory), true);

    await LibDockerPackaging.generateForTarget({
      ignoreFileEntry: {
        bundles: ['nova'],
        patterns: ['docker-local-output/'],
      },
      profile: 'background-service',
      projectDirectory,
      replaceFile: true,
      runtimePaths: ['public'],
      workspaceDirectory: botDirectory,
      workspaceName: 'bot',
    });

    await writeFile(join(projectDirectory, 'Dockerfile'), 'stale single-service Dockerfile\n', 'utf-8');

    await LibDockerPackaging.generateForTarget({
      profile: 'http-service',
      projectDirectory,
      replaceFile: false,
      workspaceDirectory: apiDirectory,
      workspaceName: 'api',
    });

    await LibDockerPackaging.generateForTarget({
      profile: 'background-service',
      projectDirectory,
      replaceFile: false,
      workspaceDirectory: botDirectory,
      workspaceName: 'bot',
    });

    const manifest: Tests_Lib_DockerPackaging_Manifest = JSON.parse(await readFile(join(projectDirectory, 'packages', 'docker', 'manifest.json'), 'utf-8'));
    const dockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_DockerfileContent = await readFile(join(projectDirectory, 'Dockerfile'), 'utf-8');
    const composeContent: Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_ComposeContent = await readFile(join(projectDirectory, 'compose.yml'), 'utf-8');
    const buildCommands: Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_BuildCommands = [
      'RUN npm run build --workspace=\'fixture-package-shared\'',
      'RUN npm run build --workspace=\'fixture-app-api\'',
      'RUN npm run build --workspace=\'fixture-app-bot\'',
    ];

    deepStrictEqual(manifest['services'].map((service) => service['name']), [
      'api',
      'bot',
    ]);
    deepStrictEqual(manifest['workspaces'].map((workspace) => workspace['path']), [
      'apps/api',
      'apps/bot',
    ]);

    const botWorkspace: Tests_Lib_DockerPackaging_LibDockerPackaging_AddsASecondWorkspaceToTheSameImageAndBuildsItsInternalDependencyClosure_BotWorkspace = manifest['workspaces'].find((workspace) => workspace['path'] === 'apps/bot');

    if (botWorkspace === undefined) {
      throw new Error('The additive Docker manifest did not retain the bot workspace.');
    }

    deepStrictEqual(botWorkspace['runtimePaths'], ['public']);

    for (const buildCommand of buildCommands) {
      strictEqual(dockerfileContent.includes(buildCommand), true);
    }

    strictEqual(dockerfileContent.indexOf(buildCommands[0]!) < dockerfileContent.indexOf(buildCommands[1]!), true);
    strictEqual(dockerfileContent.includes('fixture-app-unrelated'), false);
    strictEqual(dockerfileContent.includes('COPY ["packages/shared","packages/shared"]'), true);
    strictEqual(dockerfileContent.includes('COPY --from=build /runtime/ /app/'), true);
    strictEqual(dockerfileContent.includes('stale single-service Dockerfile'), false);
    strictEqual(composeContent.split('  app:').length - 1, 1);
    strictEqual(composeContent.includes('./apps/bot/.env'), true);
    strictEqual((await readFile(join(projectDirectory, '.dockerignore'), 'utf-8')).includes('docker-local-output/'), true);
    strictEqual(await pathExists(join(apiDirectory, 'compose.yml')), false);
    strictEqual(await pathExists(join(botDirectory, '.dockerignore')), false);

    return;
  });

  it('assembles mixed static, Next, and container-native profiles inside the Node runtime closure', async () => {
    const projectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_ProjectDirectory = join(sandboxRoot, 'mixed-profiles');

    await writeProject(projectDirectory);

    const apiWorkspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_ApiWorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/api', 'fixture-app-api');
    const docsWorkspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_DocsWorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/docs', 'fixture-app-docs');
    const webWorkspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_WebWorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/web', 'fixture-app-web');
    const nativeWorkspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_NativeWorkspaceDirectory = await writeWorkspace(projectDirectory, 'packages/native', 'fixture-package-native');

    await writeWorkspace(projectDirectory, 'apps/unrelated', 'fixture-app-unrelated');

    await LibDockerPackaging.generateForTarget({
      profile: 'http-service',
      projectDirectory,
      replaceFile: true,
      workspaceDirectory: apiWorkspaceDirectory,
      workspaceName: 'api',
    });
    await LibDockerPackaging.generateForTarget({
      buildDirectory: 'dist',
      profile: 'static-site',
      projectDirectory,
      replaceFile: false,
      workspaceDirectory: docsWorkspaceDirectory,
      workspaceName: 'docs',
    });
    await LibDockerPackaging.generateForTarget({
      buildDirectory: '.next',
      profile: 'nextjs-standalone',
      projectDirectory,
      replaceFile: false,
      workspaceDirectory: webWorkspaceDirectory,
      workspaceName: 'web',
    });
    await LibDockerPackaging.generateForTarget({
      profile: 'container-native',
      projectDirectory,
      replaceFile: false,
      workspaceDirectory: nativeWorkspaceDirectory,
      workspaceName: 'native',
    });

    const dockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_AssemblesMixedStaticNextAndContainerNativeProfilesInsideTheNodeRuntimeClosure_DockerfileContent = await readFile(join(projectDirectory, 'Dockerfile'), 'utf-8');

    strictEqual(dockerfileContent.includes('FROM node:24.22.0-trixie-slim AS runtime'), true);
    strictEqual(dockerfileContent.includes('COPY ["packages/native","packages/native"]'), true);
    strictEqual(dockerfileContent.includes('fixture-app-unrelated'), false);
    strictEqual(dockerfileContent.includes('cp -a \'/workspace/apps/docs/dist/.\' \'/runtime/sites/docs/\''), true);
    strictEqual(dockerfileContent.includes('cp -a \'/workspace/apps/web/.next/standalone/.\' \'/runtime/apps/web/\''), true);
    strictEqual(dockerfileContent.split('COPY --from=build /runtime/ /app/').length - 1, 1);
    strictEqual(dockerfileContent.includes('COPY --from=build /workspace/apps/docs/dist /app/sites/docs'), false);
    strictEqual(dockerfileContent.includes('COPY --from=build /workspace/apps/web/.next/standalone /app/apps/web'), false);

    return;
  });

  it('supports multiple native s6 services from one workspace with dependencies and critical halt behavior', async () => {
    const projectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_ProjectDirectory = join(sandboxRoot, 'multi-service');

    await writeProject(projectDirectory);

    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_WorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/worker', 'fixture-app-worker');

    await LibDockerPackaging.generateForTarget({
      profile: 'background-service',
      projectDirectory,
      replaceFile: true,
      services: [
        {
          command: 'node build/prepare.js',
          kind: 'oneshot',
          name: 'prepare',
        },
        {
          command: 'node build/worker.js',
          critical: true,
          dependencies: ['prepare'],
          name: 'worker',
          writablePaths: ['/app/data'],
        },
      ],
      workspaceDirectory,
      workspaceName: 'worker',
    });

    const rootfsDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_RootfsDirectory = join(projectDirectory, 'packages', 'docker', 'rootfs');
    const writablePathsContent: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_WritablePathsContent = await readFile(join(rootfsDirectory, 'etc', 'nova-docker', 'writable-paths'), 'utf-8');
    const prepareType: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_PrepareType = await readFile(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'prepare', 'type'), 'utf-8');
    const prepareUp: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_PrepareUp = await readFile(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'prepare', 'up'), 'utf-8');
    const prepareScript: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_PrepareScript = await readFile(join(rootfsDirectory, 'usr', 'local', 'libexec', 'nova-docker', 'services', 'prepare'), 'utf-8');
    const workerType: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_WorkerType = await readFile(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'worker', 'type'), 'utf-8');
    const workerFinish: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_WorkerFinish = await readFile(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'worker', 'finish'), 'utf-8');
    const shellVariableMarker: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_ShellVariableMarker = '$';

    strictEqual(prepareType, 'oneshot\n');
    strictEqual(prepareUp, '/usr/local/libexec/nova-docker/services/prepare\n');
    strictEqual(prepareScript.startsWith('#!/command/with-contenv sh\n'), true);
    strictEqual(prepareScript.includes('/command/s6-applyuidgid'), true);
    strictEqual(workerType, 'longrun\n');
    strictEqual(await pathExists(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'prepare', 'up')), true);
    strictEqual(await pathExists(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'worker', 'run')), true);
    strictEqual(await pathExists(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'worker', 'dependencies.d', 'prepare')), true);
    strictEqual(workerFinish.includes('/run/s6/basedir/bin/halt'), true);
    strictEqual(workerFinish.includes(`${shellVariableMarker}{2:-0}`), true);
    strictEqual(writablePathsContent, '/app/data\n');

    await LibDockerPackaging.generateForTarget({
      profile: 'background-service',
      projectDirectory,
      replaceFile: true,
      services: [{
        command: 'node build/worker.js',
        critical: true,
        name: 'worker',
        writablePaths: ['/app/data'],
      }],
      workspaceDirectory,
      workspaceName: 'worker',
    });

    const updatedManifest: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UpdatedManifest = JSON.parse(await readFile(join(projectDirectory, 'packages', 'docker', 'manifest.json'), 'utf-8'));

    deepStrictEqual(updatedManifest['services'].map((service) => service['name']), ['worker']);
    strictEqual(await pathExists(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'prepare')), false);

    let unsafePathErrorMessage: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UnsafePathErrorMessage = undefined;

    try {
      await LibDockerPackaging.generateForTarget({
        profile: 'background-service',
        projectDirectory,
        replaceFile: true,
        services: [{
          name: 'worker',
          writablePaths: ['/etc/shadow.d'],
        }],
        workspaceDirectory,
        workspaceName: 'worker',
      });
    } catch (error) {
      const unsafePathCaughtError: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UnsafePathCaughtError = error;

      if (unsafePathCaughtError instanceof Error) {
        unsafePathErrorMessage = unsafePathCaughtError.message;
      }
    }

    strictEqual(typeof unsafePathErrorMessage === 'string' && unsafePathErrorMessage.includes('not a safe, specific absolute path'), true);

    let unsafeRuntimePathErrorMessage: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UnsafeRuntimePathErrorMessage = undefined;

    try {
      await LibDockerPackaging.generateForTarget({
        profile: 'background-service',
        projectDirectory,
        replaceFile: true,
        runtimePaths: ['../secrets'],
        workspaceDirectory,
        workspaceName: 'worker',
      });
    } catch (error) {
      const unsafeRuntimePathCaughtError: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_UnsafeRuntimePathCaughtError = error;

      if (unsafeRuntimePathCaughtError instanceof Error) {
        unsafeRuntimePathErrorMessage = unsafeRuntimePathCaughtError.message;
      }
    }

    strictEqual(typeof unsafeRuntimePathErrorMessage === 'string' && unsafeRuntimePathErrorMessage.includes('not a safe, specific relative path'), true);

    let cycleErrorMessage: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_CycleErrorMessage = undefined;

    try {
      await LibDockerPackaging.generateForTarget({
        profile: 'background-service',
        projectDirectory,
        replaceFile: true,
        services: [
          {
            command: 'node build/prepare.js',
            dependencies: ['worker'],
            kind: 'oneshot',
            name: 'prepare',
          },
          {
            command: 'node build/worker.js',
            dependencies: ['prepare'],
            name: 'worker',
          },
        ],
        workspaceDirectory,
        workspaceName: 'worker',
      });
    } catch (error) {
      const cycleCaughtError: Tests_Lib_DockerPackaging_LibDockerPackaging_SupportsMultipleNativeS6ServicesFromOneWorkspaceWithDependenciesAndCriticalHaltBehavior_CycleCaughtError = error;

      if (cycleCaughtError instanceof Error) {
        cycleErrorMessage = cycleCaughtError.message;
      }
    }

    strictEqual(typeof cycleErrorMessage === 'string' && cycleErrorMessage.includes('dependency cycle'), true);

    return;
  });

  it('rejects persisted reserved and duplicate service names before changing artifacts', async () => {
    const projectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ProjectDirectory = join(sandboxRoot, 'invalid-persisted-service-names');

    await writeProject(projectDirectory);

    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_WorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/worker', 'fixture-app-worker');

    await LibDockerPackaging.generateForTarget({
      profile: 'background-service',
      projectDirectory,
      replaceFile: true,
      workspaceDirectory,
      workspaceName: 'worker',
    });

    const manifestPath: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ManifestPath = join(projectDirectory, 'packages', 'docker', 'manifest.json');
    const serviceRunPath: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ServiceRunPath = join(projectDirectory, 'packages', 'docker', 'rootfs', 'etc', 's6-overlay', 's6-rc.d', 'worker', 'run');
    const manifest: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_Manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));
    const artifactSentinel: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ArtifactSentinel = 'existing Docker artifact\n';
    const reservedManifestContent: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_ReservedManifestContent = `${JSON.stringify({
      ...manifest,
      services: manifest['services'].map((service) => ({
        ...service,
        name: 'base',
      })),
    }, null, 2)}\n`;

    await Promise.all([
      writeFile(join(projectDirectory, 'Dockerfile'), artifactSentinel, 'utf-8'),
      writeFile(join(projectDirectory, 'compose.yml'), artifactSentinel, 'utf-8'),
      writeFile(serviceRunPath, artifactSentinel, 'utf-8'),
      writeFile(manifestPath, reservedManifestContent, 'utf-8'),
    ]);

    await rejects(
      () => LibDockerPackaging.generateForTarget({
        profile: 'background-service',
        projectDirectory,
        replaceFile: true,
        workspaceDirectory,
        workspaceName: 'worker',
      }),
      {
        message: 'Docker service name "base" is reserved for Nova or s6-overlay internals.',
      },
    );

    strictEqual(await readFile(join(projectDirectory, 'Dockerfile'), 'utf-8'), artifactSentinel);
    strictEqual(await readFile(join(projectDirectory, 'compose.yml'), 'utf-8'), artifactSentinel);
    strictEqual(await readFile(serviceRunPath, 'utf-8'), artifactSentinel);
    strictEqual(await readFile(manifestPath, 'utf-8'), reservedManifestContent);

    const duplicateManifestContent: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsPersistedReservedAndDuplicateServiceNamesBeforeChangingArtifacts_DuplicateManifestContent = `${JSON.stringify({
      ...manifest,
      services: [
        manifest['services'][0],
        manifest['services'][0],
      ],
    }, null, 2)}\n`;

    await writeFile(manifestPath, duplicateManifestContent, 'utf-8');

    await rejects(
      () => LibDockerPackaging.generateForTarget({
        profile: 'background-service',
        projectDirectory,
        replaceFile: true,
        workspaceDirectory,
        workspaceName: 'worker',
      }),
      {
        message: 'Docker service name "worker" is declared more than once in the assembly manifest.',
      },
    );

    strictEqual(await readFile(join(projectDirectory, 'Dockerfile'), 'utf-8'), artifactSentinel);
    strictEqual(await readFile(join(projectDirectory, 'compose.yml'), 'utf-8'), artifactSentinel);
    strictEqual(await readFile(serviceRunPath, 'utf-8'), artifactSentinel);
    strictEqual(await readFile(manifestPath, 'utf-8'), duplicateManifestContent);

    return;
  });

  it('rejects reserved and duplicate service names before writing Docker artifacts', async () => {
    const projectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsReservedAndDuplicateServiceNamesBeforeWritingDockerArtifacts_ProjectDirectory = join(sandboxRoot, 'invalid-service-names');

    await writeProject(projectDirectory);

    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_RejectsReservedAndDuplicateServiceNamesBeforeWritingDockerArtifacts_WorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/worker', 'fixture-app-worker');

    for (const reservedName of [
      'base',
      'fix-attrs',
      'legacy-cont-init',
      'legacy-services',
      'nova-container-init',
      's6rc-oneshot-runner',
      'top',
      'user',
      'user2',
    ]) {
      await rejects(
        () => LibDockerPackaging.generateForTarget({
          profile: 'background-service',
          projectDirectory,
          replaceFile: true,
          services: [{ name: reservedName }],
          workspaceDirectory,
          workspaceName: 'worker',
        }),
        {
          message: `Docker service name "${reservedName}" is reserved for Nova or s6-overlay internals.`,
        },
      );
    }

    await rejects(
      () => LibDockerPackaging.generateForTarget({
        profile: 'background-service',
        projectDirectory,
        replaceFile: true,
        services: [
          { name: 'worker' },
          { name: 'worker' },
        ],
        workspaceDirectory,
        workspaceName: 'worker',
      }),
      {
        message: 'Docker service name "worker" is declared more than once for workspace "apps/worker".',
      },
    );

    strictEqual(await pathExists(join(projectDirectory, 'Dockerfile')), false);
    strictEqual(await pathExists(join(projectDirectory, 'compose.yml')), false);
    strictEqual(await pathExists(join(projectDirectory, '.dockerignore')), false);
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker')), false);

    return;
  });

  it('keeps a docs-only Docusaurus appliance opt-in and independent from Pages delivery', async () => {
    const projectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_KeepsADocsOnlyDocusaurusApplianceOptInAndIndependentFromPagesDelivery_ProjectDirectory = join(sandboxRoot, 'docs-only');

    await writeProject(projectDirectory);

    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_KeepsADocsOnlyDocusaurusApplianceOptInAndIndependentFromPagesDelivery_WorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/docs', 'fixture-docs');

    await LibDockerPackaging.generateForTarget({
      buildDirectory: 'build',
      profile: 'static-site',
      projectDirectory,
      replaceFile: true,
      workspaceDirectory,
      workspaceName: 'docs',
    });

    const manifest: Tests_Lib_DockerPackaging_Manifest = JSON.parse(await readFile(join(projectDirectory, 'packages', 'docker', 'manifest.json'), 'utf-8'));
    const dockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_KeepsADocsOnlyDocusaurusApplianceOptInAndIndependentFromPagesDelivery_DockerfileContent = await readFile(join(projectDirectory, 'Dockerfile'), 'utf-8');
    const composeContent: Tests_Lib_DockerPackaging_LibDockerPackaging_KeepsADocsOnlyDocusaurusApplianceOptInAndIndependentFromPagesDelivery_ComposeContent = await readFile(join(projectDirectory, 'compose.yml'), 'utf-8');

    deepStrictEqual(manifest['workspaces'], [{
      buildDirectory: 'build',
      packageName: 'fixture-docs',
      path: 'apps/docs',
      profile: 'static-site',
      runtimePaths: [],
    }]);
    deepStrictEqual(manifest['services'].map((service) => service['name']), ['docs']);
    strictEqual(dockerfileContent.includes('RUN npm run build --workspace=\'fixture-docs\''), true);
    strictEqual(dockerfileContent.includes('COPY --from=build /workspace/apps/docs/build /app/sites/docs'), true);
    strictEqual(composeContent.includes('"8080:8080"'), true);
    strictEqual(composeContent.includes('read_only: true'), true);

    return;
  });

  it('normalizes only closure-internal npm workspace protocols in build-only manifests', async () => {
    const projectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_ProjectDirectory = join(sandboxRoot, 'npm-workspace-protocols');

    await writeProject(projectDirectory, 'npm@11.18.0');
    await writeWorkspace(projectDirectory, 'packages/star', 'fixture-package-star');
    await writeWorkspace(projectDirectory, 'packages/caret', 'fixture-package-caret');
    await writeWorkspace(projectDirectory, 'packages/tilde', 'fixture-package-tilde');
    await writeWorkspace(projectDirectory, 'packages/unrelated', 'fixture-package-unrelated');

    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_WorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/api', 'fixture-app-api', {
      'external-package': 'workspace:*',
      'fixture-package-caret': 'workspace:^',
      'fixture-package-star': 'workspace:*',
      'fixture-package-tilde': 'workspace:~',
    });

    await LibDockerPackaging.generateForTarget({
      profile: 'http-service',
      projectDirectory,
      replaceFile: true,
      workspaceDirectory,
      workspaceName: 'api',
    });

    const syntheticPackage: Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_SyntheticPackage = JSON.parse(await readFile(join(projectDirectory, 'packages', 'docker', 'workspace-manifests', 'apps', 'api', 'package.json'), 'utf-8'));
    const originalPackage: Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_OriginalPackage = JSON.parse(await readFile(join(workspaceDirectory, 'package.json'), 'utf-8'));
    const dockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_NormalizesOnlyClosureInternalNpmWorkspaceProtocolsInBuildOnlyManifests_DockerfileContent = await readFile(join(projectDirectory, 'Dockerfile'), 'utf-8');

    deepStrictEqual(syntheticPackage['dependencies'], {
      'external-package': 'workspace:*',
      'fixture-package-caret': '^0.0.0',
      'fixture-package-star': '0.0.0',
      'fixture-package-tilde': '~0.0.0',
    });
    deepStrictEqual(originalPackage['dependencies'], {
      'external-package': 'workspace:*',
      'fixture-package-caret': 'workspace:^',
      'fixture-package-star': 'workspace:*',
      'fixture-package-tilde': 'workspace:~',
    });
    strictEqual(dockerfileContent.split('COPY ["packages/docker/workspace-manifests/apps/api/package.json","apps/api/package.json"]').length - 1, 2);
    strictEqual(dockerfileContent.indexOf('COPY ["apps/api","apps/api"]') < dockerfileContent.lastIndexOf('COPY ["packages/docker/workspace-manifests/apps/api/package.json","apps/api/package.json"]'), true);
    strictEqual(dockerfileContent.includes('fixture-package-unrelated'), false);

    return;
  });

  it('uses Yarn Classic node_modules without Berry configuration', async () => {
    const projectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_UsesYarnClassicNodeModulesWithoutBerryConfiguration_ProjectDirectory = join(sandboxRoot, 'yarn-classic-runtime');

    await writeProject(projectDirectory, 'yarn@1.22.22');
    await writeWorkspace(projectDirectory, 'packages/shared', 'fixture-package-shared');

    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_UsesYarnClassicNodeModulesWithoutBerryConfiguration_WorkspaceDirectory = await writeWorkspace(projectDirectory, 'apps/api', 'fixture-app-api', {
      'fixture-package-shared': 'workspace:*',
    });

    await writeWorkspace(projectDirectory, 'apps/unrelated', 'fixture-app-unrelated');

    await LibDockerPackaging.generateForTarget({
      profile: 'http-service',
      projectDirectory,
      replaceFile: true,
      workspaceDirectory,
      workspaceName: 'api',
    });

    const dockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_UsesYarnClassicNodeModulesWithoutBerryConfiguration_DockerfileContent = await readFile(join(projectDirectory, 'Dockerfile'), 'utf-8');
    const syntheticPackage: Tests_Lib_DockerPackaging_LibDockerPackaging_UsesYarnClassicNodeModulesWithoutBerryConfiguration_SyntheticPackage = JSON.parse(await readFile(join(projectDirectory, 'packages', 'docker', 'workspace-manifests', 'apps', 'api', 'package.json'), 'utf-8'));

    strictEqual(dockerfileContent.includes('RUN corepack enable yarn && yarn install'), true);
    strictEqual(dockerfileContent.includes('RUN yarn install --production && yarn cache clean'), true);
    strictEqual(dockerfileContent.includes('RUN yarn workspaces focus --all --production'), false);
    strictEqual(dockerfileContent.includes('COPY packages/docker/yarnrc.yml ./.yarnrc.yml'), false);
    strictEqual(dockerfileContent.includes('COPY ["packages/docker/workspace-manifests/apps/api/package.json","apps/api/package.json"]'), true);
    strictEqual(dockerfileContent.includes('COPY --from=build /runtime/ /app/'), true);
    strictEqual(dockerfileContent.includes('fixture-app-unrelated'), false);
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker', 'yarnrc.yml')), false);
    deepStrictEqual(syntheticPackage['dependencies'], {
      'fixture-package-shared': '0.0.0',
    });

    return;
  });

  it('preserves package manager runtime layouts for pnpm and Yarn PnP', async () => {
    const pnpmProjectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_PnpmProjectDirectory = join(sandboxRoot, 'pnpm-runtime');

    await writeProject(pnpmProjectDirectory, 'pnpm@10.17.1');
    await writeWorkspace(pnpmProjectDirectory, 'packages/shared', 'fixture-package-shared');

    const pnpmWorkspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_PnpmWorkspaceDirectory = await writeWorkspace(pnpmProjectDirectory, 'apps/api', 'fixture-app-api', {
      'fixture-package-shared': 'workspace:*',
    });

    await writeWorkspace(pnpmProjectDirectory, 'apps/unrelated', 'fixture-app-unrelated');

    await LibDockerPackaging.generateForTarget({
      profile: 'http-service',
      projectDirectory: pnpmProjectDirectory,
      replaceFile: true,
      workspaceDirectory: pnpmWorkspaceDirectory,
      workspaceName: 'api',
    });

    const pnpmDockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_PnpmDockerfileContent = await readFile(join(pnpmProjectDirectory, 'Dockerfile'), 'utf-8');

    strictEqual(pnpmDockerfileContent.includes('RUN corepack enable pnpm && pnpm install'), true);
    strictEqual(pnpmDockerfileContent.includes('RUN pnpm --filter \'fixture-package-shared\' run build'), true);
    strictEqual(pnpmDockerfileContent.includes('RUN pnpm --filter \'fixture-app-api\' run build'), true);
    strictEqual(pnpmDockerfileContent.includes('RUN pnpm install --prod'), true);
    strictEqual(pnpmDockerfileContent.includes('COPY ["packages/shared","packages/shared"]'), true);
    strictEqual(pnpmDockerfileContent.includes('packages/docker/workspace-manifests'), false);
    strictEqual(pnpmDockerfileContent.includes('fixture-app-unrelated'), false);
    strictEqual(pnpmDockerfileContent.includes('COPY --from=build /runtime/ /app/'), true);
    strictEqual(pnpmDockerfileContent.includes('COPY --from=build /workspace/node_modules /app/node_modules'), false);

    const yarnProjectDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnProjectDirectory = join(sandboxRoot, 'yarn-runtime');

    await writeProject(yarnProjectDirectory, 'yarn@4.9.4');
    await writeWorkspace(yarnProjectDirectory, 'packages/shared', 'fixture-package-shared');

    const yarnWorkspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnWorkspaceDirectory = await writeWorkspace(yarnProjectDirectory, 'apps/api', 'fixture-app-api', {
      'fixture-package-shared': 'workspace:*',
    });

    await writeWorkspace(yarnProjectDirectory, 'apps/unrelated', 'fixture-app-unrelated');

    await LibDockerPackaging.generateForTarget({
      profile: 'http-service',
      projectDirectory: yarnProjectDirectory,
      replaceFile: true,
      workspaceDirectory: yarnWorkspaceDirectory,
      workspaceName: 'api',
    });

    const yarnDockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnDockerfileContent = await readFile(join(yarnProjectDirectory, 'Dockerfile'), 'utf-8');
    const yarnConfigContent: Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnConfigContent = await readFile(join(yarnProjectDirectory, 'packages', 'docker', 'yarnrc.yml'), 'utf-8');
    const yarnRunScriptContent: Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_YarnRunScriptContent = await readFile(join(yarnProjectDirectory, 'packages', 'docker', 'rootfs', 'etc', 's6-overlay', 's6-rc.d', 'api', 'run'), 'utf-8');
    const shellVariableMarker: Tests_Lib_DockerPackaging_LibDockerPackaging_PreservesPackageManagerRuntimeLayoutsForPnpmAndYarnPnP_ShellVariableMarker = '$';

    strictEqual(yarnDockerfileContent.includes('COPY packages/docker/yarnrc.yml ./.yarnrc.yml'), true);
    strictEqual(yarnDockerfileContent.includes('RUN corepack enable yarn && yarn install'), true);
    strictEqual(yarnDockerfileContent.includes('RUN yarn workspace \'fixture-package-shared\' build'), true);
    strictEqual(yarnDockerfileContent.includes('RUN yarn workspace \'fixture-app-api\' build'), true);
    strictEqual(yarnDockerfileContent.includes('RUN yarn workspaces focus --all --production'), true);
    strictEqual(yarnDockerfileContent.includes('COPY ["packages/shared","packages/shared"]'), true);
    strictEqual(yarnDockerfileContent.includes('packages/docker/workspace-manifests'), false);
    strictEqual(yarnDockerfileContent.includes('fixture-app-unrelated'), false);
    strictEqual(yarnDockerfileContent.includes('COPY --from=build /runtime/ /app/'), true);
    strictEqual(yarnDockerfileContent.includes('COPY --from=build /workspace/node_modules /app/node_modules'), false);
    strictEqual(yarnConfigContent, [
      'enableGlobalCache: false',
      'nodeLinker: pnp',
      'pnpEnableEsmLoader: true',
      '',
    ].join('\n'));
    strictEqual(yarnRunScriptContent.includes(`export NODE_OPTIONS="--require=/app/.pnp.cjs${shellVariableMarker}{NODE_OPTIONS:+ ${shellVariableMarker}{NODE_OPTIONS}}"`), true);
    strictEqual(yarnRunScriptContent.includes(`export NODE_OPTIONS="--experimental-loader=/app/.pnp.loader.mjs${shellVariableMarker}{NODE_OPTIONS:+ ${shellVariableMarker}{NODE_OPTIONS}}"`), true);

    return;
  });

  return;
});

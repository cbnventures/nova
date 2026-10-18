import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
import {
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
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesAFrameworkFreeContainerNativeImage_ComposeContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesAFrameworkFreeContainerNativeImage_DockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesAFrameworkFreeContainerNativeImage_PackageJsonPath,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesAFrameworkFreeContainerNativeImage_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesBackgroundServicePackagingWithoutHTTPAssumptions_ComposeContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesBackgroundServicePackagingWithoutHTTPAssumptions_DockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesBackgroundServicePackagingWithoutHTTPAssumptions_PackageJsonPath,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesBackgroundServicePackagingWithoutHTTPAssumptions_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_ComposeContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_DockerfileContent,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_GeneratedPackageJson,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_PackageJsonPath,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_PackageJsonRaw,
  Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_WorkspaceDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_SandboxRoot,
  Tests_Lib_DockerPackaging_LibDockerPackaging_TemporaryDirectory,
  Tests_Lib_DockerPackaging_LibDockerPackaging_TemporaryPrefix,
} from '../../types/tests/lib/docker-packaging.test.d.ts';

/**
 * Tests - Lib - Docker Packaging - Lib Docker Packaging.
 *
 * @since 0.32.0
 */
describe('LibDockerPackaging', async () => {
  const temporaryDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_TemporaryDirectory = tmpdir();
  const temporaryPrefix: Tests_Lib_DockerPackaging_LibDockerPackaging_TemporaryPrefix = join(temporaryDirectory, 'nova-docker-packaging-test-');
  const sandboxRoot: Tests_Lib_DockerPackaging_LibDockerPackaging_SandboxRoot = await mkdtemp(temporaryPrefix);

  afterAll(async () => {
    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('generates HTTP-service packaging and inserts the deploy group before clean', async () => {
    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_WorkspaceDirectory = join(sandboxRoot, 'http-service');
    const packageJsonPath: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_PackageJsonPath = join(workspaceDirectory, 'package.json');

    await mkdir(workspaceDirectory, { recursive: true });
    await writeFile(packageJsonPath, `${JSON.stringify({
      name: 'http-service',
      scripts: {
        'build': 'nova utility run-scripts --sequential --node-env production "build:*"',
        'build:source': 'nova utility transpile --project tsconfig.source.json',
        'clean': 'nova utility run-scripts --parallel "clean:*"',
        'clean:build': 'shx rm -rf ./build',
      },
    }, null, 2)}\n`, 'utf-8');

    await LibDockerPackaging.generateForTarget({
      profile: 'http-service',
      replaceFile: true,
      workspaceDirectory,
    });

    const dockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_DockerfileContent = await readFile(join(workspaceDirectory, 'Dockerfile'), 'utf-8');
    const composeContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_ComposeContent = await readFile(join(workspaceDirectory, 'compose.yml'), 'utf-8');
    const packageJsonRaw: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_PackageJsonRaw = await readFile(packageJsonPath, 'utf-8');
    const generatedPackageJson: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesHTTPServicePackagingAndInsertsTheDeployGroupBeforeClean_GeneratedPackageJson = JSON.parse(packageJsonRaw);

    strictEqual(dockerfileContent.includes('EXPOSE 3000'), true);
    strictEqual(dockerfileContent.includes('HEALTHCHECK'), true);
    strictEqual(composeContent.includes('"3000:3000"'), true);
    deepStrictEqual(Object.keys(generatedPackageJson['scripts']), [
      'build',
      'build:source',
      'deploy',
      'deploy:container',
      'clean',
      'clean:build',
    ]);

    return;
  });

  it('generates background-service packaging without HTTP assumptions', async () => {
    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesBackgroundServicePackagingWithoutHTTPAssumptions_WorkspaceDirectory = join(sandboxRoot, 'background-service');
    const packageJsonPath: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesBackgroundServicePackagingWithoutHTTPAssumptions_PackageJsonPath = join(workspaceDirectory, 'package.json');

    await mkdir(workspaceDirectory, { recursive: true });
    await writeFile(packageJsonPath, `${JSON.stringify({
      name: 'background-service',
      scripts: {},
    }, null, 2)}\n`, 'utf-8');

    await LibDockerPackaging.generateForTarget({
      profile: 'background-service',
      replaceFile: true,
      workspaceDirectory,
    });

    const dockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesBackgroundServicePackagingWithoutHTTPAssumptions_DockerfileContent = await readFile(join(workspaceDirectory, 'Dockerfile'), 'utf-8');
    const composeContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesBackgroundServicePackagingWithoutHTTPAssumptions_ComposeContent = await readFile(join(workspaceDirectory, 'compose.yml'), 'utf-8');

    strictEqual(dockerfileContent.includes('EXPOSE'), false);
    strictEqual(dockerfileContent.includes('HEALTHCHECK'), false);
    strictEqual(composeContent.includes('env_file:'), true);
    strictEqual(composeContent.includes('ports:'), false);

    return;
  });

  it('generates a framework-free container-native image', async () => {
    const workspaceDirectory: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesAFrameworkFreeContainerNativeImage_WorkspaceDirectory = join(sandboxRoot, 'container-native');
    const packageJsonPath: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesAFrameworkFreeContainerNativeImage_PackageJsonPath = join(workspaceDirectory, 'package.json');

    await mkdir(workspaceDirectory, { recursive: true });
    await writeFile(packageJsonPath, `${JSON.stringify({
      name: 'container-native',
      scripts: {},
    }, null, 2)}\n`, 'utf-8');

    await LibDockerPackaging.generateForTarget({
      profile: 'container-native',
      replaceFile: true,
      workspaceDirectory,
    });

    const dockerfileContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesAFrameworkFreeContainerNativeImage_DockerfileContent = await readFile(join(workspaceDirectory, 'Dockerfile'), 'utf-8');
    const composeContent: Tests_Lib_DockerPackaging_LibDockerPackaging_GeneratesAFrameworkFreeContainerNativeImage_ComposeContent = await readFile(join(workspaceDirectory, 'compose.yml'), 'utf-8');

    strictEqual(dockerfileContent.includes('FROM alpine:'), true);
    strictEqual(dockerfileContent.includes('FROM node:'), false);
    strictEqual(dockerfileContent.includes('USER app'), true);
    strictEqual(composeContent.includes('stdin_open: true'), true);
    strictEqual(composeContent.includes('ports:'), false);

    return;
  });

  return;
});

import { ok, strictEqual } from 'node:assert/strict';
import {
  access,
  copyFile,
  mkdir,
  mkdtemp,
  readdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import {
  dirname,
  join,
  relative,
} from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  afterAll,
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as CliRecipeDockerSyncImage } from '../../../../cli/recipe/docker/sync-image.js';
import { Runner as LibDockerPackaging } from '../../../../lib/docker-packaging.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';

import type {
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Entries,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_FixtureDirectory,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_FixtureName,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Label,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_ProjectDirectory,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Returns,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_TargetPath,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_DryRunWritesNothing_DockerfileExists,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_DryRunWritesNothing_ProjectDirectory,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_EnabledConfig,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_FixturesDirectory,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_AssemblyPackage,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Manifest,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_ManifestPath,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_ProjectDirectory,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_ProjectFilePath,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Result,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_RootfsDirectory,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Scripts,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ListsEveryFileItWouldCreateInADryRun_DockerfileChange,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ListsEveryFileItWouldCreateInADryRun_ProjectDirectory,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ListsEveryFileItWouldCreateInADryRun_Result,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_OriginalCwd,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_PathExists_Returns,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_PathExists_TargetPath,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_Dockerfile,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_ManifestContent,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_ManifestPath,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_ProjectDirectory,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_SandboxRoot,
  Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_SkipsWhenTheRecipeIsNotEnabled_SyncImageSpy,
} from '../../../../types/tests/cli/recipe/docker/sync-image.test.d.ts';

/**
 * Tests - CLI - Recipe - Docker - Sync Image - Run.
 *
 * @since 0.49.0
 */
describe('CliRecipeDockerSyncImage.run', async () => {
  const originalCwd: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_OriginalCwd = process.cwd();
  const sandboxRoot: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-docker-sync-image-'));
  const fixturesDirectory: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_FixturesDirectory = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'fixtures', 'docker');
  const enabledConfig: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_EnabledConfig = {
    recipes: {
      docker: {
        'sync-image': {
          enabled: true,
        },
      },
    },
  };

  afterEach(() => {
    vi.restoreAllMocks();

    process.chdir(originalCwd);

    process.exitCode = 0;

    return;
  });

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  /**
   * Tests - CLI - Recipe - Docker - Sync Image - Copy Fixture.
   *
   * Copies one Docker fixture project into its own sandbox folder so each test
   * starts from an untouched manifest, stage fragments, and workspaces.
   *
   * @param {Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_FixtureName} fixtureName - Fixture name.
   * @param {Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Label}       label       - Label.
   *
   * @returns {Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Returns}
   *
   * @since 0.49.0
   */
  async function copyFixture(fixtureName: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_FixtureName, label: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Label): Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Returns {
    const projectDirectory: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_ProjectDirectory = await mkdtemp(join(sandboxRoot, `${label}-`));

    const fixtureDirectory: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_FixtureDirectory = join(fixturesDirectory, fixtureName, 'project');
    const entries: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_Entries = await readdir(fixtureDirectory, {
      recursive: true,
      withFileTypes: true,
    });

    await Promise.all(entries.filter((entry) => entry.isFile() === true).map(async (entry) => {
      const targetPath: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_CopyFixture_TargetPath = join(projectDirectory, relative(fixtureDirectory, join(entry.parentPath, entry.name)));

      await mkdir(dirname(targetPath), { recursive: true });

      await copyFile(join(entry.parentPath, entry.name), targetPath);

      return;
    }));

    return projectDirectory;
  }

  /**
   * Tests - CLI - Recipe - Docker - Sync Image - Path Exists.
   *
   * Reports whether a file is present, so a test can prove that a stale file
   * was removed or that a dry run created nothing.
   *
   * @param {Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_PathExists_TargetPath} targetPath - Target path.
   *
   * @returns {Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_PathExists_Returns}
   *
   * @since 0.49.0
   */
  async function pathExists(targetPath: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_PathExists_TargetPath): Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_PathExists_Returns {
    try {
      await access(targetPath);

      return true;
    } catch {
      return false;
    }
  }

  it('skips when the recipe is not enabled', async () => {
    const syncImageSpy: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_SkipsWhenTheRecipeIsNotEnabled_SyncImageSpy = vi.spyOn(LibDockerPackaging, 'syncImage');

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({});

    await CliRecipeDockerSyncImage.run({});

    strictEqual(syncImageSpy.mock.calls.length, 0);

    return;
  });

  it('dry run writes nothing', async () => {
    const projectDirectory: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_DryRunWritesNothing_ProjectDirectory = await copyFixture('pfsense-actions', 'dry-run');

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue(enabledConfig);

    process.chdir(projectDirectory);

    await CliRecipeDockerSyncImage.run({
      dryRun: true,
    });

    const dockerfileExists: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_DryRunWritesNothing_DockerfileExists = await pathExists(join(projectDirectory, 'Dockerfile'));

    strictEqual(dockerfileExists, false);
    ok(process.exitCode !== 1);

    return;
  });

  it('lists every file it would create in a dry run', async () => {
    const projectDirectory: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ListsEveryFileItWouldCreateInADryRun_ProjectDirectory = await copyFixture('outpost', 'dry-run-list');
    const result: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ListsEveryFileItWouldCreateInADryRun_Result = await LibDockerPackaging.syncImage({
      dryRun: true,
      projectDirectory,
    });
    const dockerfileChange: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ListsEveryFileItWouldCreateInADryRun_DockerfileChange = result['changes'].find((change) => change['path'] === 'Dockerfile');

    strictEqual(dockerfileChange !== undefined && dockerfileChange['status'] === 'create', true);
    strictEqual(dockerfileChange !== undefined && dockerfileChange['added'] > 100, true);
    strictEqual(result['changes'].some((change) => change['path'] === 'packages/docker/manifest.json'), false);
    strictEqual(result['changes'].some((change) => change['path'] === 'packages/docker/rootfs/etc/s6-overlay/s6-rc.d/server/run'), true);
    strictEqual(await pathExists(join(projectDirectory, 'Dockerfile')), false);

    return;
  });

  it('keeps project files and scripts and deletes only stale Nova files', async () => {
    const projectDirectory: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_ProjectDirectory = await copyFixture('transmission-vpn', 'ownership');
    const rootfsDirectory: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_RootfsDirectory = join(projectDirectory, 'packages', 'docker', 'rootfs');
    const projectFilePath: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_ProjectFilePath = join(rootfsDirectory, 'usr', 'local', 'libexec', 'transmission-vpn', 'config-init.sh');
    const manifestPath: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_ManifestPath = join(projectDirectory, 'packages', 'docker', 'manifest.json');

    await writeFile(join(projectDirectory, 'packages', 'docker', 'package.json'), `${JSON.stringify({
      name: 'transmission-vpn-tool-docker',
      version: '0.0.0',
      license: 'MIT',
      type: 'module',
      private: true,
      scripts: {
        'check': 'nova utility run-scripts --sequential "check:*"',
        'check:foundation': 'bash ./tests/foundation.test.sh',
      },
    }, null, 2)}\n`, 'utf-8');

    await LibDockerPackaging.syncImage({
      projectDirectory,
      replaceFile: true,
      reportFiles: false,
    });

    await mkdir(dirname(projectFilePath), { recursive: true });

    await writeFile(projectFilePath, '#!/bin/sh\n', 'utf-8');

    // Dropping a service from the manifest leaves its old s6 files behind as stale Nova output.
    const manifest: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Manifest = JSON.parse(await readFile(manifestPath, 'utf-8'));

    Reflect.set(manifest, 'services', manifest['services'].filter((service) => service['name'] !== 'web-proxy'));

    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');

    const result: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Result = await LibDockerPackaging.syncImage({
      projectDirectory,
      replaceFile: true,
      reportFiles: false,
    });
    const assemblyPackage: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_AssemblyPackage = JSON.parse(await readFile(join(projectDirectory, 'packages', 'docker', 'package.json'), 'utf-8'));
    const scripts: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Scripts = assemblyPackage['scripts'] as Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_KeepsProjectFilesAndScriptsAndDeletesOnlyStaleNovaFiles_Scripts;

    strictEqual(await pathExists(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'web-proxy', 'run')), false);
    strictEqual(await pathExists(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'web-proxy')), false);
    strictEqual(await pathExists(join(rootfsDirectory, 'etc', 's6-overlay', 'user-bundles.d', 'user', 'contents.d', 'web-proxy')), false);
    strictEqual(await pathExists(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'control-api', 'run')), true);
    strictEqual(await readFile(join(rootfsDirectory, 'etc', 's6-overlay', 's6-rc.d', 'firewall-init', 'down'), 'utf-8'), '/usr/local/libexec/transmission-vpn/firewall-down.sh\n');
    strictEqual(await readFile(projectFilePath, 'utf-8'), '#!/bin/sh\n');
    strictEqual(result['unownedFiles'].includes('packages/docker/rootfs/usr/local/libexec/transmission-vpn/config-init.sh'), true);
    strictEqual(result['changes'].some((change) => change['path'] === 'packages/docker/rootfs/etc/s6-overlay/s6-rc.d/web-proxy/run' && change['status'] === 'delete'), true);
    strictEqual(scripts['check'], 'nova utility run-scripts --sequential "check:*"');
    strictEqual(scripts['check:foundation'], 'bash ./tests/foundation.test.sh');
    strictEqual(scripts['build'], undefined);
    strictEqual(assemblyPackage['license'], 'MIT');
    strictEqual(result['changes'].some((change) => change['path'] === 'packages/docker/package.json'), false);
    strictEqual(result['missingScripts'].join(','), 'build');
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker', '.gitattributes')), false);
    strictEqual(result['changes'].some((change) => change['path'] === 'packages/docker/.gitattributes'), false);
    strictEqual(await pathExists(join(projectDirectory, '.dockerignore')), false);
    strictEqual(result['changes'].some((change) => change['path'] === '.dockerignore'), false);
    strictEqual(result['missingIgnoreFileEntry'], true);
    strictEqual(await pathExists(join(projectDirectory, 'packages', 'docker', 'pnpm-workspace.yaml')), false);

    return;
  });

  it('reads a schema version 1 manifest without rewriting it', async () => {
    const projectDirectory: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_ProjectDirectory = await copyFixture('pfsense-actions', 'schema-version-1');
    const manifestPath: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_ManifestPath = join(projectDirectory, 'packages', 'docker', 'manifest.json');
    const manifestContent: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_ManifestContent = `${JSON.stringify({
      healthPath: '/health',
      legacyStatePaths: [],
      networkMode: 'host',
      schemaVersion: 1,
      services: [{
        command: 'node build/index.js',
        critical: true,
        dependencies: [],
        environment: {},
        kind: 'longrun',
        name: 'pfsense-actions',
        port: 22603,
        requiredForHealth: true,
        runAsRoot: false,
        workspace: 'apps/api',
        writablePaths: [],
      }],
      workspaces: [{
        packageName: 'pfsense-actions-app-api',
        path: 'apps/api',
        profile: 'background-service',
        runtimePaths: [],
      }],
    }, null, 2)}\n`;

    await writeFile(manifestPath, manifestContent, 'utf-8');

    await LibDockerPackaging.syncImage({
      projectDirectory,
      replaceFile: true,
      reportFiles: false,
    });

    const dockerfile: Tests_Cli_Recipe_Docker_SyncImage_CliRecipeDockerSyncImageRun_ReadsASchemaVersion1ManifestWithoutRewritingIt_Dockerfile = await readFile(join(projectDirectory, 'Dockerfile'), 'utf-8');

    strictEqual(await readFile(manifestPath, 'utf-8'), manifestContent);
    strictEqual(dockerfile.includes('COPY --from=build /runtime/ /app/'), true);
    strictEqual(dockerfile.includes('COPY ["packages/docker/workspace-manifests/apps/api/package.json","apps/api/package.json"]'), true);

    return;
  });

  return;
});

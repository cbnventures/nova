import {
  deepStrictEqual,
  doesNotThrow,
  fail,
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

import { afterAll, describe, it } from 'vitest';

import { LibNovaConfig } from '../../lib/nova-config.js';

import type {
  TestsLibNovaConfigSharednovaconfigConstructorConfig,
  TestsLibNovaConfigSharednovaconfigLoadConfig,
  TestsLibNovaConfigSharednovaconfigLoadConfigContents,
  TestsLibNovaConfigSharednovaconfigLoadConfigData,
  TestsLibNovaConfigSharednovaconfigLoadConfigPath,
  TestsLibNovaConfigSharednovaconfigLoadCoreWorkspace,
  TestsLibNovaConfigSharednovaconfigLoadFirstEntity,
  TestsLibNovaConfigSharednovaconfigLoadLicenses,
  TestsLibNovaConfigSharednovaconfigLoadLoaded,
  TestsLibNovaConfigSharednovaconfigLoadLoadedEntities,
  TestsLibNovaConfigSharednovaconfigLoadLoadedProject,
  TestsLibNovaConfigSharednovaconfigLoadLoadedProjectName,
  TestsLibNovaConfigSharednovaconfigLoadLoadedUrls,
  TestsLibNovaConfigSharednovaconfigLoadLoadedWorkspaces,
  TestsLibNovaConfigSharednovaconfigLoadOriginalCwd,
  TestsLibNovaConfigSharednovaconfigLoadProjectDirectory,
  TestsLibNovaConfigSharednovaconfigLoadRecipeKeys,
  TestsLibNovaConfigSharednovaconfigLoadRootRecipes,
  TestsLibNovaConfigSharednovaconfigLoadRootWorkspace,
  TestsLibNovaConfigSharednovaconfigLoadSandboxPrefix,
  TestsLibNovaConfigSharednovaconfigLoadSandboxRoot,
  TestsLibNovaConfigSharednovaconfigLoadTemporaryDirectory,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsFirstWorkflow,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsLoadedWorkflows,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsOriginalCwd,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsSandboxPrefix,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsSandboxRoot,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsSecondWorkflow,
  TestsLibNovaConfigSharednovaconfigParseWorkflowsTemporaryDirectory,
  TestsLibNovaConfigSharednovaconfigSetAndSaveConfig,
  TestsLibNovaConfigSharednovaconfigSetAndSaveFileContents,
  TestsLibNovaConfigSharednovaconfigSetAndSaveFilePath,
  TestsLibNovaConfigSharednovaconfigSetAndSaveOriginalCwd,
  TestsLibNovaConfigSharednovaconfigSetAndSaveParsed,
  TestsLibNovaConfigSharednovaconfigSetAndSaveParsedEntities,
  TestsLibNovaConfigSharednovaconfigSetAndSaveParsedEntity,
  TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProject,
  TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProjectDescription,
  TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProjectName,
  TestsLibNovaConfigSharednovaconfigSetAndSaveParsedUrls,
  TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspace,
  TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspaces,
  TestsLibNovaConfigSharednovaconfigSetAndSaveProjectDirectory,
  TestsLibNovaConfigSharednovaconfigSetAndSaveSandboxPrefix,
  TestsLibNovaConfigSharednovaconfigSetAndSaveSandboxRoot,
  TestsLibNovaConfigSharednovaconfigSetAndSaveTemporaryDirectory,
} from '../../types/tests/lib/nova-config.test.d.ts';

/**
 * Tests - Lib - Nova Config - SharedNovaConfig Constructor.
 *
 * @since 0.13.0
 */
describe('SharedNovaConfig constructor', async () => {
  it('creates instance without errors', () => {
    doesNotThrow(() => {
      void new LibNovaConfig();

      return;
    });

    return;
  });

  it('instance has expected public methods', () => {
    const config: TestsLibNovaConfigSharednovaconfigConstructorConfig = new LibNovaConfig();

    strictEqual(typeof config.load, 'function');
    strictEqual(typeof config.set, 'function');
    strictEqual(typeof config.save, 'function');

    return;
  });

  return;
});

/**
 * Tests - Lib - Nova Config - SharedNovaConfig Set And Save.
 *
 * @since 0.13.0
 */
describe('SharedNovaConfig set and save', async () => {
  const originalCwd: TestsLibNovaConfigSharednovaconfigSetAndSaveOriginalCwd = process.cwd();
  const temporaryDirectory: TestsLibNovaConfigSharednovaconfigSetAndSaveTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsLibNovaConfigSharednovaconfigSetAndSaveSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibNovaConfigSharednovaconfigSetAndSaveSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('set accepts valid config and save writes file', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigSetAndSaveProjectDirectory = join(sandboxRoot, 'set-save');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigSetAndSaveConfig = new LibNovaConfig();

    config.set({
      project: {
        name: {
          slug: 'test-project',
          title: 'Test Project',
        },
        description: {
          short: 'A test project.',
        },
      },
    });

    await config.save(true);

    const filePath: TestsLibNovaConfigSharednovaconfigSetAndSaveFilePath = join(projectDirectory, 'nova.config.json');
    const fileContents: TestsLibNovaConfigSharednovaconfigSetAndSaveFileContents = await readFile(filePath, 'utf-8');
    const parsed: TestsLibNovaConfigSharednovaconfigSetAndSaveParsed = JSON.parse(fileContents);
    const parsedProject: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProject = parsed['project'] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProject;
    const parsedProjectName: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProjectName = parsedProject['name'] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProjectName;
    const parsedProjectDescription: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProjectDescription = parsedProject['description'] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedProjectDescription;

    strictEqual(parsedProjectName['slug'], 'test-project');
    strictEqual(parsedProjectName['title'], 'Test Project');
    strictEqual(parsedProjectDescription['short'], 'A test project.');

    return;
  });

  it('set accepts valid workspace config', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigSetAndSaveProjectDirectory = join(sandboxRoot, 'set-workspaces');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigSetAndSaveConfig = new LibNovaConfig();

    config.set({
      project: {
        name: {
          slug: 'nova',
        },
      },
      workspaces: {
        '.': {
          name: 'nova-project',
          role: 'project',
          policy: 'freezable',
        },
        'apps/docs': {
          name: 'nova-docs',
          role: 'docs',
          policy: 'freezable',
        },
        'packages/nova': {
          name: '@cbnventures/nova',
          role: 'package',
          policy: 'distributable',
        },
      },
    });

    await config.save(true);

    const filePath: TestsLibNovaConfigSharednovaconfigSetAndSaveFilePath = join(projectDirectory, 'nova.config.json');
    const fileContents: TestsLibNovaConfigSharednovaconfigSetAndSaveFileContents = await readFile(filePath, 'utf-8');
    const parsed: TestsLibNovaConfigSharednovaconfigSetAndSaveParsed = JSON.parse(fileContents);
    const parsedWorkspaces: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspaces = parsed['workspaces'] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspaces;
    const parsedRootWorkspace: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspace = parsedWorkspaces['.'] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspace;
    const parsedDocsWorkspace: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspace = parsedWorkspaces['apps/docs'] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspace;
    const parsedNovaWorkspace: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspace = parsedWorkspaces['packages/nova'] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedWorkspace;

    strictEqual(parsedRootWorkspace['name'], 'nova-project');
    strictEqual(parsedRootWorkspace['role'], 'project');
    strictEqual(parsedRootWorkspace['policy'], 'freezable');
    strictEqual(parsedDocsWorkspace['name'], 'nova-docs');
    strictEqual(parsedNovaWorkspace['name'], '@cbnventures/nova');
    strictEqual(parsedNovaWorkspace['policy'], 'distributable');

    return;
  });

  it('set accepts valid entities config', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigSetAndSaveProjectDirectory = join(sandboxRoot, 'set-entities');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigSetAndSaveConfig = new LibNovaConfig();

    config.set({
      entities: [{
        name: 'John Doe',
        email: 'john@example.com',
        url: 'https://example.com',
        roles: ['author'],
      }],
    });

    await config.save(true);

    const filePath: TestsLibNovaConfigSharednovaconfigSetAndSaveFilePath = join(projectDirectory, 'nova.config.json');
    const fileContents: TestsLibNovaConfigSharednovaconfigSetAndSaveFileContents = await readFile(filePath, 'utf-8');
    const parsed: TestsLibNovaConfigSharednovaconfigSetAndSaveParsed = JSON.parse(fileContents);
    const parsedEntities: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedEntities = parsed['entities'] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedEntities;
    const parsedFirstEntity: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedEntity = parsedEntities[0] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedEntity;

    strictEqual(parsedEntities.length, 1);
    strictEqual(parsedFirstEntity['name'], 'John Doe');
    strictEqual(parsedFirstEntity['email'], 'john@example.com');
    strictEqual(parsedFirstEntity['url'], 'https://example.com');
    deepStrictEqual(parsedFirstEntity['roles'], ['author']);

    return;
  });

  it('set accepts valid urls config', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigSetAndSaveProjectDirectory = join(sandboxRoot, 'set-urls');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigSetAndSaveConfig = new LibNovaConfig();

    config.set({
      urls: {
        homepage: 'https://example.com',
        repository: 'git+https://github.com/user/repo.git',
        bugs: 'https://github.com/user/repo/issues',
        fundSources: [
          'https://github.com/sponsors/user',
          'https://patreon.com/user',
        ],
      },
    });

    await config.save(true);

    const filePath: TestsLibNovaConfigSharednovaconfigSetAndSaveFilePath = join(projectDirectory, 'nova.config.json');
    const fileContents: TestsLibNovaConfigSharednovaconfigSetAndSaveFileContents = await readFile(filePath, 'utf-8');
    const parsed: TestsLibNovaConfigSharednovaconfigSetAndSaveParsed = JSON.parse(fileContents);
    const parsedUrls: TestsLibNovaConfigSharednovaconfigSetAndSaveParsedUrls = parsed['urls'] as TestsLibNovaConfigSharednovaconfigSetAndSaveParsedUrls;

    strictEqual(parsedUrls['homepage'], 'https://example.com');
    strictEqual(parsedUrls['repository'], 'git+https://github.com/user/repo.git');
    strictEqual(parsedUrls['bugs'], 'https://github.com/user/repo/issues');
    deepStrictEqual(parsedUrls['fundSources'], [
      'https://github.com/sponsors/user',
      'https://patreon.com/user',
    ]);

    return;
  });

  return;
});

/**
 * Tests - Lib - Nova Config - SharedNovaConfig Load.
 *
 * @since 0.13.0
 */
describe('SharedNovaConfig load', async () => {
  const originalCwd: TestsLibNovaConfigSharednovaconfigLoadOriginalCwd = process.cwd();
  const temporaryDirectory: TestsLibNovaConfigSharednovaconfigLoadTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsLibNovaConfigSharednovaconfigLoadSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibNovaConfigSharednovaconfigLoadSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('load reads config from filesystem', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'load');

    await mkdir(projectDirectory, { recursive: true });

    const configData: TestsLibNovaConfigSharednovaconfigLoadConfigData = {
      project: {
        name: {
          slug: 'loaded-project',
          title: 'Loaded Project',
        },
      },
    };

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify(configData, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    const loadedProjectName: TestsLibNovaConfigSharednovaconfigLoadLoadedProjectName = loadedProject['name'];

    if (loadedProjectName === undefined) {
      fail('Expected project name to be defined');
    }

    strictEqual(loadedProjectName['slug'], 'loaded-project');
    strictEqual(loadedProjectName['title'], 'Loaded Project');

    return;
  });

  it('load returns empty object when config file is missing', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'missing');

    await mkdir(projectDirectory, { recursive: true });

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    deepStrictEqual(loaded, {});

    return;
  });

  it('load strips unknown fields from config file', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'strip-unknown');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'test',
          title: 'Test',
        },
      },
      unknownField: 'should be ignored',
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    const loadedProjectName: TestsLibNovaConfigSharednovaconfigLoadLoadedProjectName = loadedProject['name'];

    if (loadedProjectName === undefined) {
      fail('Expected project name to be defined');
    }

    strictEqual(loadedProjectName['slug'], 'test');
    strictEqual('unknownField' in loaded, false);

    return;
  });

  it('load handles non-object config gracefully', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'non-object');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(configPath, '"just a string"', 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    deepStrictEqual(loaded, {});

    return;
  });

  it('load strips empty strings from config', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'empty-strings');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: '',
          title: 'Valid Title',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    const loadedProjectName: TestsLibNovaConfigSharednovaconfigLoadLoadedProjectName = loadedProject['name'];

    if (loadedProjectName === undefined) {
      fail('Expected project name to be defined');
    }

    strictEqual(loadedProjectName['slug'], undefined);
    strictEqual(loadedProjectName['title'], 'Valid Title');

    return;
  });

  it('load rejects workspace with invalid role', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'bad-role');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      workspaces: {
        '.': {
          name: 'test',
          role: 'invalid-role',
          policy: 'freezable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    strictEqual(loaded['workspaces'], undefined);

    return;
  });

  it('load rejects workspace with invalid policy for role', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'bad-policy');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      workspaces: {
        '.': {
          name: 'test-project',
          role: 'project',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    strictEqual(loaded['workspaces'], undefined);

    return;
  });

  it('load parses recipes from workspace config', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'recipes');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      workspaces: {
        '.': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          recipes: {
            'sync-identity': [true],
            'normalize-dependencies': [
              true,
              {
                pinDependencyVersions: true,
              },
            ],
          },
        },
        'packages/core': {
          name: '@test/core',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedWorkspaces: TestsLibNovaConfigSharednovaconfigLoadLoadedWorkspaces = loaded['workspaces'];

    if (loadedWorkspaces === undefined) {
      fail('Expected workspaces to be defined');
    }

    const rootWorkspace: TestsLibNovaConfigSharednovaconfigLoadRootWorkspace = loadedWorkspaces['.'];

    if (rootWorkspace === undefined) {
      fail('Expected root workspace to be defined');
    }

    const coreWorkspace: TestsLibNovaConfigSharednovaconfigLoadCoreWorkspace = loadedWorkspaces['packages/core'];

    if (coreWorkspace === undefined) {
      fail('Expected packages/core workspace to be defined');
    }

    const rootRecipes: TestsLibNovaConfigSharednovaconfigLoadRootRecipes = rootWorkspace['recipes'];

    if (rootRecipes === undefined) {
      fail('Expected root workspace recipes to be defined');
    }

    deepStrictEqual(rootRecipes['sync-identity'], [true]);
    deepStrictEqual(rootRecipes['normalize-dependencies'], [
      true,
      {
        pinDependencyVersions: true,
      },
    ]);
    strictEqual(coreWorkspace['recipes'], undefined);

    return;
  });

  it('load ignores invalid recipe tuples', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'recipes-invalid');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      workspaces: {
        '.': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          recipes: {
            'sync-identity': 'yes',
            'normalize-modules': [],
            'normalize-bundler': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedWorkspaces: TestsLibNovaConfigSharednovaconfigLoadLoadedWorkspaces = loaded['workspaces'];

    if (loadedWorkspaces === undefined) {
      fail('Expected workspaces to be defined');
    }

    const rootWorkspace: TestsLibNovaConfigSharednovaconfigLoadRootWorkspace = loadedWorkspaces['.'];

    if (rootWorkspace === undefined) {
      fail('Expected root workspace to be defined');
    }

    const rootRecipes: TestsLibNovaConfigSharednovaconfigLoadRootRecipes = rootWorkspace['recipes'];

    if (rootRecipes === undefined) {
      fail('Expected root workspace recipes to be defined');
    }

    strictEqual(rootRecipes['sync-identity'], undefined);
    strictEqual(rootRecipes['normalize-modules'], undefined);
    deepStrictEqual(rootRecipes['normalize-bundler'], [true]);

    return;
  });

  it('load ignores unknown recipe names', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'recipes-unknown');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      workspaces: {
        '.': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          recipes: {
            'unknown-recipe': [true],
            'sync-identity': [true],
          },
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedWorkspaces: TestsLibNovaConfigSharednovaconfigLoadLoadedWorkspaces = loaded['workspaces'];

    if (loadedWorkspaces === undefined) {
      fail('Expected workspaces to be defined');
    }

    const rootWorkspace: TestsLibNovaConfigSharednovaconfigLoadRootWorkspace = loadedWorkspaces['.'];

    if (rootWorkspace === undefined) {
      fail('Expected root workspace to be defined');
    }

    const rootRecipes: TestsLibNovaConfigSharednovaconfigLoadRootRecipes = rootWorkspace['recipes'];

    if (rootRecipes === undefined) {
      fail('Expected root workspace recipes to be defined');
    }

    const recipeKeys: TestsLibNovaConfigSharednovaconfigLoadRecipeKeys = Object.keys(rootRecipes);

    strictEqual(recipeKeys.length, 1);
    deepStrictEqual(rootRecipes['sync-identity'], [true]);

    return;
  });

  it('load filters non-boolean recipe settings', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'recipes-settings-invalid');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      workspaces: {
        '.': {
          name: 'project',
          role: 'project',
          policy: 'freezable',
          recipes: {
            'normalize-dependencies': [
              true,
              {
                pinDependencyVersions: true,
                pinDevDependencyVersions: 'yes',
              },
            ],
          },
        },
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedWorkspaces: TestsLibNovaConfigSharednovaconfigLoadLoadedWorkspaces = loaded['workspaces'];

    if (loadedWorkspaces === undefined) {
      fail('Expected workspaces to be defined');
    }

    const rootWorkspace: TestsLibNovaConfigSharednovaconfigLoadRootWorkspace = loadedWorkspaces['.'];

    if (rootWorkspace === undefined) {
      fail('Expected root workspace to be defined');
    }

    const rootRecipes: TestsLibNovaConfigSharednovaconfigLoadRootRecipes = rootWorkspace['recipes'];

    if (rootRecipes === undefined) {
      fail('Expected root workspace recipes to be defined');
    }

    deepStrictEqual(rootRecipes['normalize-dependencies'], [
      true,
      {
        pinDependencyVersions: true,
      },
    ]);

    return;
  });

  it('load filters invalid entity roles', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'bad-entity-roles');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      entities: [{
        name: 'Test',
        roles: ['invalid-role'],
      }],
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedEntities: TestsLibNovaConfigSharednovaconfigLoadLoadedEntities = loaded['entities'];

    if (loadedEntities === undefined) {
      fail('Expected entities to be defined');
    }

    const firstEntity: TestsLibNovaConfigSharednovaconfigLoadFirstEntity = loadedEntities[0];

    if (firstEntity === undefined) {
      fail('Expected first entity to be defined');
    }

    strictEqual(firstEntity['roles'], undefined);

    return;
  });

  it('load filters invalid email format', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'bad-email');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      entities: [{
        name: 'Test',
        email: 'not-an-email',
      }],
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedEntities: TestsLibNovaConfigSharednovaconfigLoadLoadedEntities = loaded['entities'];

    if (loadedEntities === undefined) {
      fail('Expected entities to be defined');
    }

    const firstEntity: TestsLibNovaConfigSharednovaconfigLoadFirstEntity = loadedEntities[0];

    if (firstEntity === undefined) {
      fail('Expected first entity to be defined');
    }

    strictEqual(firstEntity['email'], undefined);

    return;
  });

  it('load rejects invalid url protocol', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'bad-url');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      urls: {
        homepage: 'ftp://example.com',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    strictEqual(loaded['urls'], undefined);

    return;
  });

  it('load accepts valid legalName value', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'valid-legal-name');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        legalName: 'Example Author LLC',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['legalName'], 'Example Author LLC');

    return;
  });

  it('load strips empty legalName value', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'empty-legal-name');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'test',
        },
        legalName: '',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['legalName'], undefined);

    return;
  });

  it('load accepts valid pronouns value', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'valid-pronouns');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        pronouns: 'personal',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['pronouns'], 'personal');

    return;
  });

  it('load accepts business pronouns value', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'business-pronouns');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        pronouns: 'business',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['pronouns'], 'business');

    return;
  });

  it('load strips invalid pronouns value', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'bad-pronouns');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'test',
        },
        pronouns: 'other',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['pronouns'], undefined);

    return;
  });

  it('load accepts valid platforms array', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'valid-platforms');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        platforms: [
          'nodejs',
          'swift',
          'python',
        ],
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    deepStrictEqual(loadedProject['platforms'], [
      'nodejs',
      'swift',
      'python',
    ]);

    return;
  });

  it('load filters invalid platform entries', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'bad-platforms');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        platforms: [
          'nodejs',
          'invalid-platform',
          'python',
        ],
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    deepStrictEqual(loadedProject['platforms'], [
      'nodejs',
      'python',
    ]);

    return;
  });

  it('load strips platforms when all entries are invalid', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'all-bad-platforms');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'test',
        },
        platforms: [
          'invalid',
          'also-invalid',
        ],
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['platforms'], undefined);

    return;
  });

  it('load accepts valid startingYear', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'valid-year');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        startingYear: 2024,
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['startingYear'], 2024);

    return;
  });

  it('load accepts startingYear at minimum boundary', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'min-year');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        startingYear: 1970,
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['startingYear'], 1970);

    return;
  });

  it('load strips startingYear below 1970', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'year-below-min');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'test',
        },
        startingYear: 1969,
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['startingYear'], undefined);

    return;
  });

  it('load strips non-integer startingYear', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'year-float');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'test',
        },
        startingYear: 2024.5,
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['startingYear'], undefined);

    return;
  });

  it('load strips non-number startingYear', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'year-string');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'test',
        },
        startingYear: '2024',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['startingYear'], undefined);

    return;
  });

  it('load accepts valid license', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'license-valid');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'test',
        },
        license: 'Apache-2.0',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['license'], 'Apache-2.0');

    return;
  });

  it('load strips invalid license', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'license-invalid');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      project: {
        name: {
          slug: 'test',
        },
        license: 'INVALID',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    strictEqual(loadedProject['license'], undefined);

    return;
  });

  it('load accepts all supported licenses', async () => {
    const licenses: TestsLibNovaConfigSharednovaconfigLoadLicenses = [
      'AGPL-3.0',
      'Apache-2.0',
      'BSD-2-Clause',
      'BSD-3-Clause',
      'BSL-1.0',
      'CC0-1.0',
      'EPL-2.0',
      'GPL-2.0',
      'GPL-3.0',
      'LGPL-2.1',
      'MIT',
      'MPL-2.0',
      'Unlicense',
    ];

    for (const license of licenses) {
      const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, `license-${license}`);

      await mkdir(projectDirectory, { recursive: true });

      const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
      const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
        project: {
          name: {
            slug: 'test',
          },
          license,
        },
      }, null, 2);

      await writeFile(configPath, configContents, 'utf-8');

      process.chdir(projectDirectory);

      const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
      const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

      const loadedProject: TestsLibNovaConfigSharednovaconfigLoadLoadedProject = loaded['project'];

      if (loadedProject === undefined) {
        fail('Expected project to be defined');
      }

      strictEqual(loadedProject['license'], license);
    }

    return;
  });

  it('load accepts privacyPolicy url', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'privacy-policy');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      urls: {
        privacyPolicy: 'https://example.com/privacy',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedUrls: TestsLibNovaConfigSharednovaconfigLoadLoadedUrls = loaded['urls'];

    if (loadedUrls === undefined) {
      fail('Expected urls to be defined');
    }

    strictEqual(loadedUrls['privacyPolicy'], 'https://example.com/privacy');

    return;
  });

  it('load accepts termsOfUse url', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'terms-of-use');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      urls: {
        termsOfUse: 'https://example.com/terms',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedUrls: TestsLibNovaConfigSharednovaconfigLoadLoadedUrls = loaded['urls'];

    if (loadedUrls === undefined) {
      fail('Expected urls to be defined');
    }

    strictEqual(loadedUrls['termsOfUse'], 'https://example.com/terms');

    return;
  });

  it('load rejects invalid privacyPolicy url protocol', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'bad-privacy-url');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      urls: {
        privacyPolicy: 'ftp://example.com/privacy',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    strictEqual(loaded['urls'], undefined);

    return;
  });

  it('load accepts git protocol for repository field', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigLoadProjectDirectory = join(sandboxRoot, 'git-protocol');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigLoadConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigLoadConfigContents = JSON.stringify({
      urls: {
        repository: 'git://github.com/user/repo.git',
      },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigLoadConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigLoadLoaded = await config.load();

    const loadedUrls: TestsLibNovaConfigSharednovaconfigLoadLoadedUrls = loaded['urls'];

    if (loadedUrls === undefined) {
      fail('Expected urls to be defined');
    }

    strictEqual(loadedUrls['repository'], 'git://github.com/user/repo.git');

    return;
  });

  return;
});

/**
 * Tests - Lib - Nova Config - ParseWorkflows (via Load).
 *
 * @since 0.20.0
 */
describe('parseWorkflows (via load)', async () => {
  const originalCwd: TestsLibNovaConfigSharednovaconfigParseWorkflowsOriginalCwd = process.cwd();
  const temporaryDirectory: TestsLibNovaConfigSharednovaconfigParseWorkflowsTemporaryDirectory = tmpdir();
  const sandboxPrefix: TestsLibNovaConfigSharednovaconfigParseWorkflowsSandboxPrefix = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: TestsLibNovaConfigSharednovaconfigParseWorkflowsSandboxRoot = await mkdtemp(sandboxPrefix);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('load parses workflow with template, suffix, triggers, and depends-on', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory = join(sandboxRoot, 'workflows-full');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents = JSON.stringify({
      workflows: [
        {
          template: 'deploy',
          suffix: 'production',
          triggers: ['release'],
          settings: {
            region: 'us-east-1',
            stage: 'prod',
          },
        },
        {
          'template': 'deploy',
          'suffix': 'staging',
          'triggers': ['push'],
          'depends-on': ['deploy-production'],
        },
      ],
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded = await config.load();

    const loadedWorkflows: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoadedWorkflows = loaded['workflows'];

    if (loadedWorkflows === undefined) {
      fail('Expected workflows to be defined');
    }

    strictEqual(loadedWorkflows.length, 2);

    const firstWorkflow: TestsLibNovaConfigSharednovaconfigParseWorkflowsFirstWorkflow = loadedWorkflows[0];

    if (firstWorkflow === undefined) {
      fail('Expected first workflow to be defined');
    }

    strictEqual(firstWorkflow['suffix'], 'production');
    strictEqual(firstWorkflow['template'], 'deploy');
    deepStrictEqual(firstWorkflow['triggers'], ['release']);
    deepStrictEqual(firstWorkflow['settings'], {
      region: 'us-east-1',
      stage: 'prod',
    });

    const secondWorkflow: TestsLibNovaConfigSharednovaconfigParseWorkflowsSecondWorkflow = loadedWorkflows[1];

    if (secondWorkflow === undefined) {
      fail('Expected second workflow to be defined');
    }

    strictEqual(secondWorkflow['suffix'], 'staging');
    strictEqual(secondWorkflow['template'], 'deploy');
    deepStrictEqual(secondWorkflow['triggers'], ['push']);
    deepStrictEqual(secondWorkflow['depends-on'], ['deploy-production']);
    strictEqual(secondWorkflow['settings'], undefined);

    return;
  });

  it('load skips workflow entry without suffix', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory = join(sandboxRoot, 'workflows-no-suffix');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents = JSON.stringify({
      workflows: [
        {
          template: 'deploy',
          triggers: ['release'],
        },
        {
          template: 'test',
          suffix: 'valid',
          triggers: ['push'],
        },
      ],
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded = await config.load();

    const loadedWorkflows: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoadedWorkflows = loaded['workflows'];

    if (loadedWorkflows === undefined) {
      fail('Expected workflows to be defined');
    }

    strictEqual(loadedWorkflows.length, 1);

    const firstWorkflow: TestsLibNovaConfigSharednovaconfigParseWorkflowsFirstWorkflow = loadedWorkflows[0];

    if (firstWorkflow === undefined) {
      fail('Expected first workflow to be defined');
    }

    strictEqual(firstWorkflow['suffix'], 'valid');
    strictEqual(firstWorkflow['template'], 'test');

    return;
  });

  it('load skips workflow entry missing triggers', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory = join(sandboxRoot, 'workflows-no-triggers');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents = JSON.stringify({
      workflows: [
        {
          template: 'deploy',
          suffix: 'no-triggers',
        },
        {
          template: 'test',
          suffix: 'valid',
          triggers: ['push'],
        },
      ],
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded = await config.load();

    const loadedWorkflows: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoadedWorkflows = loaded['workflows'];

    if (loadedWorkflows === undefined) {
      fail('Expected workflows to be defined');
    }

    strictEqual(loadedWorkflows.length, 1);

    const firstWorkflow: TestsLibNovaConfigSharednovaconfigParseWorkflowsFirstWorkflow = loadedWorkflows[0];

    if (firstWorkflow === undefined) {
      fail('Expected first workflow to be defined');
    }

    strictEqual(firstWorkflow['template'], 'test');

    return;
  });

  it('load parses depends-on field as array', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory = join(sandboxRoot, 'workflows-depends-on');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents = JSON.stringify({
      workflows: [
        {
          template: 'publish-to-npm',
          suffix: 'primary',
          triggers: ['release'],
        },
        {
          'template': 'publish-to-npm',
          'suffix': 'secondary',
          'triggers': ['workflow-run-success'],
          'depends-on': ['publish-to-npm-primary'],
        },
      ],
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded = await config.load();

    const loadedWorkflows: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoadedWorkflows = loaded['workflows'];

    if (loadedWorkflows === undefined) {
      fail('Expected workflows to be defined');
    }

    strictEqual(loadedWorkflows.length, 2);

    const secondWorkflow: TestsLibNovaConfigSharednovaconfigParseWorkflowsSecondWorkflow = loadedWorkflows[1];

    if (secondWorkflow === undefined) {
      fail('Expected second workflow to be defined');
    }

    deepStrictEqual(secondWorkflow['depends-on'], ['publish-to-npm-primary']);

    return;
  });

  it('load allows empty triggers array', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory = join(sandboxRoot, 'workflows-empty-triggers');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents = JSON.stringify({
      workflows: [{
        template: 'check-sponsor-gated-issues',
        suffix: 'empty-triggers',
        triggers: [],
      }],
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded = await config.load();

    const loadedWorkflows: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoadedWorkflows = loaded['workflows'];

    if (loadedWorkflows === undefined) {
      fail('Expected workflows to be defined');
    }

    strictEqual(loadedWorkflows.length, 1);

    const firstWorkflow: TestsLibNovaConfigSharednovaconfigParseWorkflowsFirstWorkflow = loadedWorkflows[0];

    if (firstWorkflow === undefined) {
      fail('Expected first workflow to be defined');
    }

    deepStrictEqual(firstWorkflow['triggers'], []);

    return;
  });

  it('drops invalid workflow entries silently', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory = join(sandboxRoot, 'workflows-invalid');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents = JSON.stringify({
      workflows: [
        'not-an-object',
        {
          template: '',
          triggers: ['release'],
        },
        {
          template: 123,
          triggers: ['release'],
        },
        {
          template: 'valid-entry',
          suffix: 'valid-entry',
          triggers: ['release'],
        },
      ],
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded = await config.load();

    const loadedWorkflows: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoadedWorkflows = loaded['workflows'];

    if (loadedWorkflows === undefined) {
      fail('Expected workflows to be defined');
    }

    strictEqual(loadedWorkflows.length, 1);

    const firstWorkflow: TestsLibNovaConfigSharednovaconfigParseWorkflowsFirstWorkflow = loadedWorkflows[0];

    if (firstWorkflow === undefined) {
      fail('Expected first workflow to be defined');
    }

    strictEqual(firstWorkflow['template'], 'valid-entry');

    return;
  });

  it('returns undefined for non-array workflows', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory = join(sandboxRoot, 'workflows-non-array');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents = JSON.stringify({
      workflows: { template: 'deploy' },
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded = await config.load();

    strictEqual(loaded['workflows'], undefined);

    return;
  });

  it('drops non-string settings values', async () => {
    const projectDirectory: TestsLibNovaConfigSharednovaconfigParseWorkflowsProjectDirectory = join(sandboxRoot, 'workflows-bad-settings');

    await mkdir(projectDirectory, { recursive: true });

    const configPath: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigPath = join(projectDirectory, 'nova.config.json');
    const configContents: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfigContents = JSON.stringify({
      workflows: [{
        id: 'settings-test',
        template: 'deploy',
        suffix: 'settings-test',
        triggers: ['release'],
        settings: {
          region: 'us-east-1',
          count: 5,
          enabled: true,
          nested: { key: 'value' },
        },
      }],
    }, null, 2);

    await writeFile(configPath, configContents, 'utf-8');

    process.chdir(projectDirectory);

    const config: TestsLibNovaConfigSharednovaconfigParseWorkflowsConfig = new LibNovaConfig();
    const loaded: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoaded = await config.load();

    const loadedWorkflows: TestsLibNovaConfigSharednovaconfigParseWorkflowsLoadedWorkflows = loaded['workflows'];

    if (loadedWorkflows === undefined) {
      fail('Expected workflows to be defined');
    }

    strictEqual(loadedWorkflows.length, 1);

    const firstWorkflow: TestsLibNovaConfigSharednovaconfigParseWorkflowsFirstWorkflow = loadedWorkflows[0];

    if (firstWorkflow === undefined) {
      fail('Expected first workflow to be defined');
    }

    deepStrictEqual(firstWorkflow['settings'], {
      region: 'us-east-1',
    });

    return;
  });

  return;
});

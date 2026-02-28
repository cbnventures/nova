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
import { test } from 'node:test';

import { NovaConfig } from '@/lib/nova-config.js';

import type {
  NovaConfigTestOriginalCwd,
  NovaConfigTestSandboxRoot,
} from '@/types/tests/lib/nova-config.test.d.ts';

/**
 * Nova config constructor.
 *
 * @since 1.0.0
 */
test('NovaConfig constructor', async (context) => {
  await context.test('creates instance without errors', () => {
    doesNotThrow(() => {
      new NovaConfig();
    });
  });

  await context.test('instance has expected public methods', () => {
    const config = new NovaConfig();

    strictEqual(typeof config.load, 'function');
    strictEqual(typeof config.set, 'function');
    strictEqual(typeof config.save, 'function');
  });
});

/**
 * Nova config set and save.
 *
 * @since 1.0.0
 */
test('NovaConfig set and save', async (context) => {
  const originalCwd: NovaConfigTestOriginalCwd = process.cwd();
  const sandboxRoot: NovaConfigTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('set accepts valid config and save writes file', async () => {
    const projectDir = join(sandboxRoot, 'set-save');

    await mkdir(projectDir, { recursive: true });

    process.chdir(projectDir);

    const config = new NovaConfig();

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

    const filePath = join(projectDir, 'nova.config.json');
    const fileContents = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(fileContents);

    strictEqual(parsed.project.name.slug, 'test-project');
    strictEqual(parsed.project.name.title, 'Test Project');
    strictEqual(parsed.project.description.short, 'A test project.');
  });

  await context.test('set accepts valid workspace config', async () => {
    const projectDir = join(sandboxRoot, 'set-workspaces');

    await mkdir(projectDir, { recursive: true });

    process.chdir(projectDir);

    const config = new NovaConfig();

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

    const filePath = join(projectDir, 'nova.config.json');
    const fileContents = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(fileContents);

    strictEqual(parsed.workspaces['.'].name, 'nova-project');
    strictEqual(parsed.workspaces['.'].role, 'project');
    strictEqual(parsed.workspaces['.'].policy, 'freezable');
    strictEqual(parsed.workspaces['apps/docs'].name, 'nova-docs');
    strictEqual(parsed.workspaces['packages/nova'].name, '@cbnventures/nova');
    strictEqual(parsed.workspaces['packages/nova'].policy, 'distributable');
  });

  await context.test('set accepts valid entities config', async () => {
    const projectDir = join(sandboxRoot, 'set-entities');

    await mkdir(projectDir, { recursive: true });

    process.chdir(projectDir);

    const config = new NovaConfig();

    config.set({
      entities: [
        {
          name: 'John Doe',
          email: 'john@example.com',
          url: 'https://example.com',
          roles: ['author'],
        },
      ],
    });

    await config.save(true);

    const filePath = join(projectDir, 'nova.config.json');
    const fileContents = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(fileContents);

    strictEqual(parsed.entities.length, 1);
    strictEqual(parsed.entities[0].name, 'John Doe');
    strictEqual(parsed.entities[0].email, 'john@example.com');
    strictEqual(parsed.entities[0].url, 'https://example.com');
    deepStrictEqual(parsed.entities[0].roles, ['author']);
  });

  await context.test('set accepts valid urls config', async () => {
    const projectDir = join(sandboxRoot, 'set-urls');

    await mkdir(projectDir, { recursive: true });

    process.chdir(projectDir);

    const config = new NovaConfig();

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

    const filePath = join(projectDir, 'nova.config.json');
    const fileContents = await readFile(filePath, 'utf-8');
    const parsed = JSON.parse(fileContents);

    strictEqual(parsed.urls.homepage, 'https://example.com');
    strictEqual(parsed.urls.repository, 'git+https://github.com/user/repo.git');
    strictEqual(parsed.urls.bugs, 'https://github.com/user/repo/issues');
    deepStrictEqual(parsed.urls.fundSources, [
      'https://github.com/sponsors/user',
      'https://patreon.com/user',
    ]);
  });
});

/**
 * Nova config load.
 *
 * @since 1.0.0
 */
test('NovaConfig load', async (context) => {
  const originalCwd: NovaConfigTestOriginalCwd = process.cwd();
  const sandboxRoot: NovaConfigTestSandboxRoot = await mkdtemp(join(tmpdir(), `nova-${context.name}-`));

  context.after(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });
  });

  await context.test('load reads config from filesystem', async () => {
    const projectDir = join(sandboxRoot, 'load');

    await mkdir(projectDir, { recursive: true });

    const configData = {
      project: {
        name: {
          slug: 'loaded-project',
          title: 'Loaded Project',
        },
      },
    };

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify(configData, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedProject = loaded.project;

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    const loadedProjectName = loadedProject.name;

    if (loadedProjectName === undefined) {
      fail('Expected project name to be defined');
    }

    strictEqual(loadedProjectName.slug, 'loaded-project');
    strictEqual(loadedProjectName.title, 'Loaded Project');
  });

  await context.test('load returns empty object when config file is missing', async () => {
    const projectDir = join(sandboxRoot, 'missing');

    await mkdir(projectDir, { recursive: true });

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    deepStrictEqual(loaded, {});
  });

  await context.test('load strips unknown fields from config file', async () => {
    const projectDir = join(sandboxRoot, 'strip-unknown');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        project: {
          name: {
            slug: 'test',
            title: 'Test',
          },
        },
        unknownField: 'should be ignored',
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedProject = loaded.project;

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    const loadedProjectName = loadedProject.name;

    if (loadedProjectName === undefined) {
      fail('Expected project name to be defined');
    }

    strictEqual(loadedProjectName.slug, 'test');
    strictEqual('unknownField' in loaded, false);
  });

  await context.test('load handles non-object config gracefully', async () => {
    const projectDir = join(sandboxRoot, 'non-object');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      '"just a string"',
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    deepStrictEqual(loaded, {});
  });

  await context.test('load strips empty strings from config', async () => {
    const projectDir = join(sandboxRoot, 'empty-strings');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        project: {
          name: {
            slug: '',
            title: 'Valid Title',
          },
        },
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedProject = loaded.project;

    if (loadedProject === undefined) {
      fail('Expected project to be defined');
    }

    const loadedProjectName = loadedProject.name;

    if (loadedProjectName === undefined) {
      fail('Expected project name to be defined');
    }

    strictEqual(loadedProjectName.slug, undefined);
    strictEqual(loadedProjectName.title, 'Valid Title');
  });

  await context.test('load rejects workspace with invalid role', async () => {
    const projectDir = join(sandboxRoot, 'bad-role');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          '.': {
            name: 'test',
            role: 'invalid-role',
            policy: 'freezable',
          },
        },
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    strictEqual(loaded.workspaces, undefined);
  });

  await context.test('load rejects workspace with invalid policy for role', async () => {
    const projectDir = join(sandboxRoot, 'bad-policy');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          '.': {
            name: 'test-project',
            role: 'project',
            policy: 'distributable',
          },
        },
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    strictEqual(loaded.workspaces, undefined);
  });

  await context.test('load parses pinVersions boolean from workspace config', async () => {
    const projectDir = join(sandboxRoot, 'pin-versions');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          '.': {
            name: 'project',
            role: 'project',
            policy: 'freezable',
            pinVersions: true,
          },
          'packages/core': {
            name: '@test/core',
            role: 'package',
            policy: 'distributable',
          },
        },
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedWorkspaces = loaded.workspaces;

    if (loadedWorkspaces === undefined) {
      fail('Expected workspaces to be defined');
    }

    const rootWorkspace = loadedWorkspaces['.'];

    if (rootWorkspace === undefined) {
      fail('Expected root workspace to be defined');
    }

    const coreWorkspace = loadedWorkspaces['packages/core'];

    if (coreWorkspace === undefined) {
      fail('Expected packages/core workspace to be defined');
    }

    strictEqual(rootWorkspace.pinVersions, true);
    strictEqual(coreWorkspace.pinVersions, undefined);
  });

  await context.test('load ignores non-boolean pinVersions values', async () => {
    const projectDir = join(sandboxRoot, 'pin-versions-invalid');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          '.': {
            name: 'project',
            role: 'project',
            policy: 'freezable',
            pinVersions: 'yes',
          },
        },
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedWorkspaces = loaded.workspaces;

    if (loadedWorkspaces === undefined) {
      fail('Expected workspaces to be defined');
    }

    const rootWorkspace = loadedWorkspaces['.'];

    if (rootWorkspace === undefined) {
      fail('Expected root workspace to be defined');
    }

    strictEqual(rootWorkspace.pinVersions, undefined);
  });

  await context.test('load parses syncLtsEngines boolean from workspace config', async () => {
    const projectDir = join(sandboxRoot, 'sync-lts-engines');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          '.': {
            name: 'project',
            role: 'project',
            policy: 'freezable',
            syncLtsEngines: true,
          },
          'packages/core': {
            name: '@test/core',
            role: 'package',
            policy: 'distributable',
          },
        },
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedWorkspaces = loaded.workspaces;

    if (loadedWorkspaces === undefined) {
      fail('Expected workspaces to be defined');
    }

    const rootWorkspace = loadedWorkspaces['.'];

    if (rootWorkspace === undefined) {
      fail('Expected root workspace to be defined');
    }

    const coreWorkspace = loadedWorkspaces['packages/core'];

    if (coreWorkspace === undefined) {
      fail('Expected packages/core workspace to be defined');
    }

    strictEqual(rootWorkspace.syncLtsEngines, true);
    strictEqual(coreWorkspace.syncLtsEngines, undefined);
  });

  await context.test('load ignores non-boolean syncLtsEngines values', async () => {
    const projectDir = join(sandboxRoot, 'sync-lts-engines-invalid');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        workspaces: {
          '.': {
            name: 'project',
            role: 'project',
            policy: 'freezable',
            syncLtsEngines: 'yes',
          },
        },
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedWorkspaces = loaded.workspaces;

    if (loadedWorkspaces === undefined) {
      fail('Expected workspaces to be defined');
    }

    const rootWorkspace = loadedWorkspaces['.'];

    if (rootWorkspace === undefined) {
      fail('Expected root workspace to be defined');
    }

    strictEqual(rootWorkspace.syncLtsEngines, undefined);
  });

  await context.test('load filters invalid entity roles', async () => {
    const projectDir = join(sandboxRoot, 'bad-entity-roles');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        entities: [
          {
            name: 'Test',
            roles: ['invalid-role'],
          },
        ],
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedEntities = loaded.entities;

    if (loadedEntities === undefined) {
      fail('Expected entities to be defined');
    }

    const firstEntity = loadedEntities[0];

    if (firstEntity === undefined) {
      fail('Expected first entity to be defined');
    }

    strictEqual(firstEntity.roles, undefined);
  });

  await context.test('load filters invalid email format', async () => {
    const projectDir = join(sandboxRoot, 'bad-email');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        entities: [
          {
            name: 'Test',
            email: 'not-an-email',
          },
        ],
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedEntities = loaded.entities;

    if (loadedEntities === undefined) {
      fail('Expected entities to be defined');
    }

    const firstEntity = loadedEntities[0];

    if (firstEntity === undefined) {
      fail('Expected first entity to be defined');
    }

    strictEqual(firstEntity.email, undefined);
  });

  await context.test('load rejects invalid url protocol', async () => {
    const projectDir = join(sandboxRoot, 'bad-url');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        urls: {
          homepage: 'ftp://example.com',
        },
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    strictEqual(loaded.urls, undefined);
  });

  await context.test('load accepts git protocol for repository field', async () => {
    const projectDir = join(sandboxRoot, 'git-protocol');

    await mkdir(projectDir, { recursive: true });

    await writeFile(
      join(projectDir, 'nova.config.json'),
      JSON.stringify({
        urls: {
          repository: 'git://github.com/user/repo.git',
        },
      }, null, 2),
      'utf-8',
    );

    process.chdir(projectDir);

    const config = new NovaConfig();
    const loaded = await config.load();

    const loadedUrls = loaded.urls;

    if (loadedUrls === undefined) {
      fail('Expected urls to be defined');
    }

    strictEqual(loadedUrls.repository, 'git://github.com/user/repo.git');
  });
});

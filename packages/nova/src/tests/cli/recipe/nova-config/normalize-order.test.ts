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
  afterEach,
  describe,
  it,
} from 'vitest';

import { Runner as CliRecipeNovaConfigNormalizeOrder } from '../../../../cli/recipe/nova-config/normalize-order.js';

import type {
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Config,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ConfigPath,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_DockerHub,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_DockerHubKeys,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Keys,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Output,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_PackageJsonPath,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ParsedOutput,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ProjectDirectory,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_BadgeGroups,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Badges,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ConfigPath,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_LinkGroups,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Links,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Output,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ParsedOutput,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Profile,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ProjectDirectory,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ReadMe,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Support,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_SupportBadges,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_ConfigPath,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_Output,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_ParsedOutput,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_ProjectDirectory,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_Recipes,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_Settings,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OriginalCwd,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_SandboxRoot,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_TemporaryBase,
  Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_TemporaryDirectory,
} from '../../../../types/tests/cli/recipe/nova-config/normalize-order.test.d.ts';

/**
 * Tests - CLI - Recipe - Nova Config - Normalize Order - Run.
 *
 * @since 0.33.0
 */
describe.sequential('CliRecipeNovaConfigNormalizeOrder.run', async () => {
  const originalCwd: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OriginalCwd = process.cwd();
  const temporaryDirectory: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_TemporaryBase = join(temporaryDirectory, `nova-${'test'}-`);
  const sandboxRoot: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    process.chdir(originalCwd);

    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  afterEach(() => {
    process.exitCode = undefined;

    return;
  });

  it('orders known sections while preserving nested and unknown values', async () => {
    const projectDirectory: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ProjectDirectory = join(sandboxRoot, 'project');

    await mkdir(projectDirectory, { recursive: true });

    const packageJsonPath: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_PackageJsonPath = join(projectDirectory, 'package.json');

    await writeFile(packageJsonPath, '{"name":"test-project"}\n', 'utf-8');

    const configPath: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ConfigPath = join(projectDirectory, 'nova.config.json');
    const config: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Config = {
      settings: {
        custom: [
          'keep',
          'nested',
          'values',
        ],
      },
      experimentalFirst: {
        enabled: true,
      },
      urls: {
        homepage: 'https://www.example.com',
      },
      recipes: {
        'nova-config': {
          'normalize-order': {
            enabled: true,
          },
        },
      },
      project: {
        name: {
          slug: 'test-project',
        },
      },
      dockerHub: {
        immutableTags: {
          rules: [],
          enabled: false,
        },
        experimentalDockerHub: 'unchanged',
        categories: ['networking'],
        visibility: 'public',
        repository: 'nova',
        namespace: 'cbnventures',
      },
      github: {
        repo: 'nova',
        owner: 'cbnventures',
      },
      workflows: [],
      experimentalSecond: 'unchanged',
    };

    await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeNovaConfigNormalizeOrder.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Output = await readFile(configPath, 'utf-8');
    const parsedOutput: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ParsedOutput = JSON.parse(output) as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_ParsedOutput;
    const keys: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_Keys = Object.keys(parsedOutput);

    deepStrictEqual(keys, [
      'project',
      'github',
      'dockerHub',
      'workflows',
      'urls',
      'recipes',
      'settings',
      'experimentalFirst',
      'experimentalSecond',
    ]);
    const dockerHub: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_DockerHub = parsedOutput['dockerHub'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_DockerHub;
    const dockerHubKeys: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersKnownSectionsWhilePreservingNestedAndUnknownValues_DockerHubKeys = Object.keys(dockerHub);

    deepStrictEqual(dockerHubKeys, [
      'namespace',
      'repository',
      'visibility',
      'categories',
      'immutableTags',
      'experimentalDockerHub',
    ]);
    deepStrictEqual(parsedOutput['settings'], config['settings']);
    deepStrictEqual(parsedOutput['experimentalFirst'], config['experimentalFirst']);
    strictEqual(parsedOutput['experimentalSecond'], config['experimentalSecond']);

    return;
  });

  it('orders recipe groups and settings while keeping unknown keys last', async () => {
    const projectDirectory: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_ProjectDirectory = join(sandboxRoot, 'nested-order');

    await mkdir(projectDirectory, { recursive: true });

    await writeFile(join(projectDirectory, 'package.json'), '{"name":"nested-order"}\n', 'utf-8');

    const configPath: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_ConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(configPath, `${JSON.stringify({
      recipes: {
        'package-json': {},
        'tsconfig': {
          'sync-references': {
            enabled: true,
          },
        },
        'experimentalGroup': {},
        'nova-config': {
          'normalize-order': {
            enabled: true,
          },
        },
        'github': {},
      },
      settings: {
        versionStrategy: 'semver',
        experimentalSetting: true,
        changelog: {
          workspaceOrder: [],
        },
        coverage: {
          minimum: 80,
        },
        lockStepVersioning: true,
      },
    }, null, 2)}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeNovaConfigNormalizeOrder.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_Output = await readFile(configPath, 'utf-8');
    const parsedOutput: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_ParsedOutput = JSON.parse(output) as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_ParsedOutput;
    const recipes: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_Recipes = parsedOutput['recipes'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_Recipes;
    const settings: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_Settings = parsedOutput['settings'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersRecipeGroupsAndSettingsWhileKeepingUnknownKeysLast_Settings;

    deepStrictEqual(Object.keys(recipes), [
      'github',
      'nova-config',
      'tsconfig',
      'package-json',
      'experimentalGroup',
    ]);
    deepStrictEqual(Object.keys(settings), [
      'changelog',
      'coverage',
      'lockStepVersioning',
      'versionStrategy',
      'experimentalSetting',
    ]);
    deepStrictEqual(settings['changelog'], {
      workspaceOrder: [],
    });
    deepStrictEqual(settings['coverage'], {
      minimum: 80,
    });

    return;
  });

  it('orders profile README fields', async () => {
    const projectDirectory: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ProjectDirectory = join(sandboxRoot, 'profile-readme-order');

    await mkdir(projectDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'package.json'), '{"name":"profile-readme-order"}\n', 'utf-8');

    const configPath: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ConfigPath = join(projectDirectory, 'nova.config.json');

    await writeFile(configPath, `${JSON.stringify({
      readme: {
        experimentalReadMe: true,
        profile: {
          support: {
            badges: [{
              link: 'https://example.com/kofi',
              color: 'ff5e5b',
              logo: 'kofi',
              label: 'Ko-fi',
            }],
            message: ['Thank you.'],
            emoji: '🍩',
            title: 'Support',
          },
          linkGroups: [{
            links: [{
              description: 'My website',
              url: 'https://example.com',
              label: 'Website',
            }],
            columns: [
              'Link',
              'About',
            ],
            emoji: '🔗',
            title: 'Links',
          }],
          badgeGroups: [{
            badges: [{
              link: 'https://www.typescriptlang.org',
              color: '3178c6',
              logo: 'typescript',
              label: 'TypeScript',
            }],
            emoji: '👨🏻‍💻',
            title: 'Language Palette',
          }],
          introduction: ['Hello.'],
          experimentalProfile: true,
        },
        badges: [],
      },
      recipes: {
        'nova-config': {
          'normalize-order': {
            enabled: true,
          },
        },
      },
    }, null, 2)}\n`, 'utf-8');

    process.chdir(projectDirectory);

    await CliRecipeNovaConfigNormalizeOrder.run({
      replaceFile: true,
    });

    strictEqual(process.exitCode, undefined);

    const output: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Output = await readFile(configPath, 'utf-8');
    const parsedOutput: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ParsedOutput = JSON.parse(output) as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ParsedOutput;
    const readMe: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ReadMe = parsedOutput['readme'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_ReadMe;
    const profile: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Profile = readMe['profile'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Profile;
    const badgeGroups: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_BadgeGroups = profile['badgeGroups'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_BadgeGroups;
    const badges: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Badges = badgeGroups[0]['badges'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Badges;
    const linkGroups: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_LinkGroups = profile['linkGroups'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_LinkGroups;
    const links: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Links = linkGroups[0]['links'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Links;
    const support: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Support = profile['support'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_Support;
    const supportBadges: Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_SupportBadges = support['badges'] as Tests_Cli_Recipe_NovaConfig_NormalizeOrder_CliRecipeNovaConfigNormalizeOrderRun_OrdersProfileREADMEFields_SupportBadges;

    deepStrictEqual(Object.keys(readMe), [
      'badges',
      'profile',
      'experimentalReadMe',
    ]);
    deepStrictEqual(Object.keys(profile), [
      'introduction',
      'badgeGroups',
      'linkGroups',
      'support',
      'experimentalProfile',
    ]);
    deepStrictEqual(Object.keys(linkGroups[0]), [
      'title',
      'emoji',
      'columns',
      'links',
    ]);
    deepStrictEqual(Object.keys(support), [
      'title',
      'emoji',
      'message',
      'badges',
    ]);
    deepStrictEqual(Object.keys(supportBadges[0]), [
      'label',
      'logo',
      'color',
      'link',
    ]);
    deepStrictEqual(Object.keys(badgeGroups[0]), [
      'title',
      'emoji',
      'badges',
    ]);
    deepStrictEqual(Object.keys(badges[0]), [
      'label',
      'logo',
      'color',
      'link',
    ]);
    deepStrictEqual(Object.keys(links[0]), [
      'label',
      'url',
      'description',
    ]);

    return;
  });

  return;
});

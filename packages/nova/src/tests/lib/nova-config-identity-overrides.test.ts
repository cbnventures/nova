import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';
import {
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
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_DropsOverridesWithTheWrongShape_Config,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_DropsOverridesWithTheWrongShape_Loaded,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_DropsOverridesWithTheWrongShape_ProjectDirectory,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_KeepsTheDescriptionOverridesAndRecipes_Config,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_KeepsTheDescriptionOverridesAndRecipes_Loaded,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_KeepsTheDescriptionOverridesAndRecipes_ProjectDirectory,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_SandboxRoot,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheProjectKeywordsBreakTheTopicRules_Config,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheProjectKeywordsBreakTheTopicRules_Loaded,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheProjectKeywordsBreakTheTopicRules_ProjectDirectory,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheShortDescriptionBreaksTheStrictestActiveLimit_Config,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheShortDescriptionBreaksTheStrictestActiveLimit_Loaded,
  Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheShortDescriptionBreaksTheStrictestActiveLimit_ProjectDirectory,
} from '../../types/tests/lib/nova-config-identity-overrides.test.d.ts';

/**
 * Tests - Lib - Nova Config Identity Overrides - Shared_NovaConfig Identity Overrides.
 *
 * Confirms per-destination description overrides survive parsing and that the
 * description limits of active destinations are reported while loading.
 *
 * @since 0.49.0
 */
describe('Shared_NovaConfig identity overrides', async () => {
  const sandboxRoot: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-identity-overrides-'));

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('keeps the description overrides and recipes', async () => {
    const projectDirectory: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_KeepsTheDescriptionOverridesAndRecipes_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'keeps-'));

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
      project: {
        description: {
          short: 'x'.repeat(150),
        },
      },
      dockerHub: {
        namespace: 'example',
        repository: 'example',
        description: 'Docker Hub text',
      },
      workspaces: {
        './packages/action': {
          name: 'action',
          role: 'package',
          policy: 'trackable',
          githubAction: {
            description: 'Marketplace text',
          },
        },
        './packages/firewall': {
          name: 'pfsense-pkg-firewall',
          role: 'package',
          policy: 'trackable',
          pfsense: {
            comment: 'Firewall package',
          },
        },
      },
      recipes: {
        'github-action': {
          'sync-identity': {
            enabled: true,
          },
        },
        'pfsense': {
          'sync-identity': {
            enabled: true,
          },
        },
      },
    }), 'utf-8');

    const config: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_KeepsTheDescriptionOverridesAndRecipes_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_KeepsTheDescriptionOverridesAndRecipes_Loaded = await config.load(projectDirectory);

    strictEqual((loaded['dockerHub'] ?? { description: undefined })['description'], 'Docker Hub text');
    deepStrictEqual((loaded['workspaces'] ?? {})['./packages/action'], {
      role: 'package',
      policy: 'trackable',
      name: 'action',
      githubAction: {
        description: 'Marketplace text',
      },
    });
    deepStrictEqual(((loaded['workspaces'] ?? {})['./packages/firewall'] ?? { pfsense: undefined })['pfsense'], {
      comment: 'Firewall package',
    });
    deepStrictEqual(loaded['recipes'], {
      'github-action': {
        'sync-identity': {
          enabled: true,
        },
      },
      'pfsense': {
        'sync-identity': {
          enabled: true,
        },
      },
    });
    strictEqual(config.diagnostics().length, 0);

    return;
  });

  it('warns when the short description breaks the strictest active limit', async () => {
    const projectDirectory: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheShortDescriptionBreaksTheStrictestActiveLimit_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'warns-'));

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
      project: {
        description: {
          short: 'x'.repeat(80),
        },
      },
      workflows: [{
        template: 'publish',
        name: 'project',
        triggers: ['release'],
        deploy: [{
          to: 'pfsense',
          path: './packages/firewall',
        }],
      }],
      workspaces: {
        './packages/firewall': {
          name: 'pfsense-pkg-firewall',
          role: 'package',
          policy: 'trackable',
        },
      },
    }), 'utf-8');

    const config: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheShortDescriptionBreaksTheStrictestActiveLimit_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheShortDescriptionBreaksTheStrictestActiveLimit_Loaded = await config.load(projectDirectory);

    strictEqual(((loaded['project'] ?? {})['description'] ?? { short: undefined })['short'], 'x'.repeat(80));
    ok(config.diagnostics().some((diagnostic) => diagnostic['severity'] === 'warning' && diagnostic['message'].includes('allows at most 70')));

    return;
  });

  it('drops overrides with the wrong shape', async () => {
    const projectDirectory: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_DropsOverridesWithTheWrongShape_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'drops-'));

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
      workspaces: {
        './packages/action': {
          name: 'action',
          role: 'package',
          policy: 'trackable',
          githubAction: {
            description: 5,
          },
          pfsense: 'Firewall package',
        },
      },
    }), 'utf-8');

    const config: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_DropsOverridesWithTheWrongShape_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_DropsOverridesWithTheWrongShape_Loaded = await config.load(projectDirectory);

    deepStrictEqual((loaded['workspaces'] ?? {})['./packages/action'], {
      role: 'package',
      policy: 'trackable',
      name: 'action',
    });
    strictEqual(config.diagnostics().filter((diagnostic) => diagnostic['severity'] === 'error').length, 2);

    return;
  });

  it('warns when the project keywords break the topic rules', async () => {
    const projectDirectory: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheProjectKeywordsBreakTheTopicRules_ProjectDirectory = await mkdtemp(join(sandboxRoot, 'keywords-'));

    await writeFile(join(projectDirectory, 'nova.config.json'), JSON.stringify({
      project: {
        keywords: ['Example Keyword'],
      },
      github: {
        owner: 'example',
        repo: 'widget',
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
    }), 'utf-8');

    const config: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheProjectKeywordsBreakTheTopicRules_Config = new LibNovaConfig();
    const loaded: Tests_Lib_NovaConfigIdentityOverrides_SharedNovaConfigIdentityOverrides_WarnsWhenTheProjectKeywordsBreakTheTopicRules_Loaded = await config.load(projectDirectory);

    deepStrictEqual((loaded['project'] ?? {})['keywords'], ['Example Keyword']);
    ok(config.diagnostics().some((diagnostic) => diagnostic['severity'] === 'warning' && diagnostic['message'].includes('GitHub topics allow only lowercase letters')));

    return;
  });

  return;
});

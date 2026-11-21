import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  resolveDescriptionLimitMessages,
  resolveShortDescriptionLimit,
  resolveShortDescriptionLimitMessage,
} from '../../lib/description-limits.js';

import type {
  Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_AcceptsALongShortDescriptionWhenEveryActiveDestinationHasAnOverride_Config,
  Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_ReportsAnOverrideThatBreaksItsOwnLimit_Config,
  Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_ReportsAnOverrideThatBreaksItsOwnLimit_Messages,
  Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_ReportsAPfsenseCommentOverrideThatEndsWithAPeriod_Config,
  Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_ReportsAPfsenseCommentOverrideThatEndsWithAPeriod_Messages,
  Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_CapsTheShortDescriptionAt70WithGithubActionPfsenseAndDockerHubWithoutOverrides_Config,
  Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_CapsTheShortDescriptionAt70WithGithubActionPfsenseAndDockerHubWithoutOverrides_Message,
  Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_IgnoresDestinationsThatAreNotActive_Config,
  Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_MovesTo100WhenThePfsenseCommentOverrideIsSet_Config,
  Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_MovesTo125WhenTheDockerHubOverrideIsAlsoSet_Config,
  Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_StripsATrailingPeriodBeforeCheckingThePfsenseLimit_Config,
} from '../../types/tests/lib/description-limits.test.d.ts';

/**
 * Tests - Lib - Description Limits - Resolve Short Description Limit.
 *
 * @since 0.49.0
 */
describe('resolveShortDescriptionLimit', () => {
  it('caps the short description at 70 with github action pfsense and docker hub without overrides', () => {
    const config: Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_CapsTheShortDescriptionAt70WithGithubActionPfsenseAndDockerHubWithoutOverrides_Config = {
      dockerHub: {
        namespace: 'example',
        repository: 'example',
      },
      workflows: [{
        template: 'publish',
        name: 'project',
        triggers: ['release'],
        deploy: [
          {
            to: 'github-action',
            path: './packages/action',
          },
          {
            to: 'pfsense',
            path: './packages/firewall',
          },
        ],
      }],
    };
    const message: Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_CapsTheShortDescriptionAt70WithGithubActionPfsenseAndDockerHubWithoutOverrides_Message = resolveShortDescriptionLimitMessage(config, 'x'.repeat(71));

    strictEqual((resolveShortDescriptionLimit(config) ?? { limit: 0 })['limit'], 70);
    strictEqual(resolveShortDescriptionLimitMessage(config, 'x'.repeat(70)), undefined);
    ok(message !== undefined);
    ok(message.includes('has 71 characters'));
    ok(message.includes('allows at most 70'));
    ok(message.includes('Shorten "project.description.short"'));
    ok(message.includes('set "workspaces["./packages/firewall"].pfsense.comment"'));

    return;
  });

  it('moves to 100 when the pfsense comment override is set', () => {
    const config: Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_MovesTo100WhenThePfsenseCommentOverrideIsSet_Config = {
      dockerHub: {
        namespace: 'example',
        repository: 'example',
      },
      workflows: [{
        template: 'publish',
        name: 'project',
        triggers: ['release'],
        deploy: [
          {
            to: 'github-action',
            path: './packages/action',
          },
          {
            to: 'pfsense',
            path: './packages/firewall',
          },
        ],
      }],
      workspaces: {
        './packages/firewall': {
          name: 'pfsense-pkg-firewall',
          role: 'package',
          policy: 'trackable',
          pfsense: {
            comment: 'Firewall package',
          },
        },
      },
    };

    strictEqual((resolveShortDescriptionLimit(config) ?? { limit: 0 })['limit'], 100);
    strictEqual(resolveShortDescriptionLimitMessage(config, 'x'.repeat(100)), undefined);
    ok(resolveShortDescriptionLimitMessage(config, 'x'.repeat(101)) !== undefined);

    return;
  });

  it('moves to 125 when the docker hub override is also set', () => {
    const config: Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_MovesTo125WhenTheDockerHubOverrideIsAlsoSet_Config = {
      dockerHub: {
        namespace: 'example',
        repository: 'example',
        description: 'Docker Hub text',
      },
      workflows: [{
        template: 'publish',
        name: 'project',
        triggers: ['release'],
        deploy: [
          {
            to: 'github-action',
            path: './packages/action',
          },
          {
            to: 'pfsense',
            path: './packages/firewall',
          },
        ],
      }],
      workspaces: {
        './packages/firewall': {
          name: 'pfsense-pkg-firewall',
          role: 'package',
          policy: 'trackable',
          pfsense: {
            comment: 'Firewall package',
          },
        },
      },
    };

    strictEqual((resolveShortDescriptionLimit(config) ?? { limit: 0 })['limit'], 125);
    strictEqual(resolveShortDescriptionLimitMessage(config, 'x'.repeat(125)), undefined);
    ok(resolveShortDescriptionLimitMessage(config, 'x'.repeat(126)) !== undefined);

    return;
  });

  it('ignores destinations that are not active', () => {
    const config: Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_IgnoresDestinationsThatAreNotActive_Config = {
      project: {
        description: {
          short: 'x'.repeat(300),
        },
      },
      workspaces: {
        './packages/firewall': {
          name: 'pfsense-pkg-firewall',
          role: 'package',
          policy: 'trackable',
        },
      },
    };

    strictEqual(resolveShortDescriptionLimit(config), undefined);
    strictEqual(resolveShortDescriptionLimitMessage(config, 'x'.repeat(300)), undefined);
    strictEqual(resolveDescriptionLimitMessages(config).length, 0);

    return;
  });

  it('strips a trailing period before checking the pfsense limit', () => {
    const config: Tests_Lib_DescriptionLimits_ResolveShortDescriptionLimit_StripsATrailingPeriodBeforeCheckingThePfsenseLimit_Config = {
      workflows: [{
        template: 'publish',
        name: 'project',
        triggers: ['release'],
        deploy: [{
          to: 'pfsense',
          path: './packages/firewall',
        }],
      }],
    };

    strictEqual(resolveShortDescriptionLimitMessage(config, `${'x'.repeat(70)}.`), undefined);
    ok(resolveShortDescriptionLimitMessage(config, `${'x'.repeat(71)}.`) !== undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - Description Limits - Resolve Description Limit Messages.
 *
 * @since 0.49.0
 */
describe('resolveDescriptionLimitMessages', () => {
  it('reports an override that breaks its own limit', () => {
    const config: Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_ReportsAnOverrideThatBreaksItsOwnLimit_Config = {
      project: {
        description: {
          short: 'Short text',
        },
      },
      dockerHub: {
        namespace: 'example',
        repository: 'example',
        description: 'x'.repeat(101),
      },
    };
    const messages: Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_ReportsAnOverrideThatBreaksItsOwnLimit_Messages = resolveDescriptionLimitMessages(config);

    strictEqual(messages.length, 1);
    ok((messages[0] ?? '').includes('The "dockerHub.description" field has 101 characters, but Docker Hub allows at most 100.'));

    return;
  });

  it('reports a pfsense comment override that ends with a period', () => {
    const config: Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_ReportsAPfsenseCommentOverrideThatEndsWithAPeriod_Config = {
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
          pfsense: {
            comment: 'Firewall package.',
          },
        },
      },
    };
    const messages: Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_ReportsAPfsenseCommentOverrideThatEndsWithAPeriod_Messages = resolveDescriptionLimitMessages(config);

    strictEqual(messages.length, 1);
    ok((messages[0] ?? '').includes('ends with a period'));

    return;
  });

  it('accepts a long short description when every active destination has an override', () => {
    const config: Tests_Lib_DescriptionLimits_ResolveDescriptionLimitMessages_AcceptsALongShortDescriptionWhenEveryActiveDestinationHasAnOverride_Config = {
      project: {
        description: {
          short: 'x'.repeat(200),
        },
      },
      dockerHub: {
        namespace: 'example',
        repository: 'example',
        description: 'Docker Hub text',
      },
      workflows: [{
        template: 'publish',
        name: 'project',
        triggers: ['release'],
        deploy: [{
          to: 'github-action',
          path: './packages/action',
        }],
      }],
      workspaces: {
        './packages/action': {
          name: 'action',
          role: 'package',
          policy: 'trackable',
          githubAction: {
            description: 'Marketplace text',
          },
        },
      },
    };

    strictEqual(resolveDescriptionLimitMessages(config).length, 0);
    strictEqual(resolveShortDescriptionLimit(config), undefined);

    return;
  });

  return;
});

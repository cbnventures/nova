import { deepStrictEqual, ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  formatKeywordLimitMessage,
  isHomebridgePluginWorkspace,
  resolveDestinationKeywords,
  resolveGithubTopicsDestination,
  resolveHomebridgePluginDestination,
  resolveKeywordCountLimit,
  resolveKeywordDestinations,
  resolveKeywordLimitMessages,
  resolveProjectKeywordsLimitMessage,
} from '../../lib/keyword-limits.js';

/**
 * Tests - Lib - Keyword Limits - Format Keyword Limit Message.
 *
 * @since 0.49.0
 */
describe('formatKeywordLimitMessage', async () => {
  it('accepts keywords that are valid topics', () => {
    strictEqual(formatKeywordLimitMessage(resolveGithubTopicsDestination(undefined), [
      'monorepo',
      'cli-tool',
      'node22',
    ]), undefined);

    return;
  });

  it('rejects more than 20 keywords and points at the override', () => {
    strictEqual(formatKeywordLimitMessage(resolveGithubTopicsDestination(undefined), Array.from({ length: 21 }, (_ignored, index) => `topic-${index}`)), 'The "project.keywords" field has 21 keywords, but GitHub topics allow at most 20. Change "project.keywords", or set "github.topics" to give GitHub topics their own list.');

    return;
  });

  it('rejects uppercase letters, spaces, and a leading hyphen', () => {
    for (const keyword of [
      'TypeScript',
      'mono repo',
      '-leading',
      'under_score',
    ]) {
      ok(String(formatKeywordLimitMessage(resolveGithubTopicsDestination(undefined), [keyword])).includes(`has "${keyword}", but GitHub topics allow only lowercase letters, numbers, and hyphens`));
    }

    return;
  });

  it('rejects a keyword longer than 50 characters', () => {
    strictEqual(formatKeywordLimitMessage(resolveGithubTopicsDestination(undefined), ['a'.repeat(51)]), `The "project.keywords" field has "${'a'.repeat(51)}" with 51 characters, but GitHub topics allow at most 50 per keyword. Change "project.keywords", or set "github.topics" to give GitHub topics their own list.`);

    return;
  });

  it('names the override field when the override breaks the rules', () => {
    strictEqual(formatKeywordLimitMessage(resolveGithubTopicsDestination({ topics: ['Bad Topic'] }), ['Bad Topic']), 'The "github.topics" field has "Bad Topic", but GitHub topics allow only lowercase letters, numbers, and hyphens, starting with a letter or number. Change "github.topics", or remove it to use "project.keywords" instead.');

    return;
  });

  it('requires homebridge-plugin for a Homebridge plugin', () => {
    strictEqual(formatKeywordLimitMessage(resolveHomebridgePluginDestination('./packages/homebridge-example'), ['homekit']), 'The "project.keywords" field does not include "homebridge-plugin", which the npm keywords of the Homebridge plugin "./packages/homebridge-example" must contain. Add "homebridge-plugin" to "project.keywords".');

    strictEqual(formatKeywordLimitMessage(resolveHomebridgePluginDestination('./packages/homebridge-example'), [
      'Homebridge Plugin',
      'homebridge-plugin',
    ]), undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - Keyword Limits - Resolve Keyword Destinations.
 *
 * @since 0.49.0
 */
describe('resolveKeywordDestinations', async () => {
  it('activates topics only when the sync-identity recipe runs', () => {
    deepStrictEqual(resolveKeywordDestinations({
      github: {
        owner: 'example',
        repo: 'widget',
      },
    }), []);

    deepStrictEqual(resolveKeywordDestinations({
      github: {
        owner: 'example',
        repo: 'widget',
        topics: ['widget'],
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
    }).map((destination) => [
      destination['kind'],
      destination['override'],
    ]), [[
      'github-topics',
      ['widget'],
    ]]);

    return;
  });

  it('activates a Homebridge plugin only when its npm keywords sync', () => {
    for (const keywordsSetting of [
      true,
      false,
    ]) {
      deepStrictEqual(resolveKeywordDestinations({
        project: {
          platforms: [
            'nodejs',
            'homebridge',
          ],
        },
        workspaces: {
          './packages/homebridge-example': {
            name: '@example/homebridge-example',
            role: 'package',
            policy: 'distributable',
          },
        },
        recipes: {
          'package-json': {
            './packages/homebridge-example': {
              'sync-identity': {
                enabled: true,
                settings: {
                  keywords: keywordsSetting,
                },
              },
            },
          },
        },
      }).map((destination) => destination['kind']), (keywordsSetting === true) ? ['homebridge-plugin'] : []);
    }

    return;
  });

  it('recognizes Homebridge plugins by platform, role, policy, and package name', () => {
    strictEqual(isHomebridgePluginWorkspace({
      project: { platforms: ['homebridge'] },
      workspaces: {
        './packages/homebridge-example': {
          name: 'homebridge-example',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, './packages/homebridge-example'), true);

    strictEqual(isHomebridgePluginWorkspace({
      project: { platforms: ['nodejs'] },
      workspaces: {
        './packages/homebridge-example': {
          name: 'homebridge-example',
          role: 'package',
          policy: 'distributable',
        },
      },
    }, './packages/homebridge-example'), false);

    strictEqual(isHomebridgePluginWorkspace({
      project: { platforms: ['homebridge'] },
      workspaces: {
        './apps/docs': {
          name: 'example-docs',
          role: 'docs',
          policy: 'freezable',
        },
      },
    }, './apps/docs'), false);

    return;
  });

  return;
});

/**
 * Tests - Lib - Keyword Limits - Resolve Keyword Limit Messages.
 *
 * @since 0.49.0
 */
describe('resolveKeywordLimitMessages', async () => {
  it('checks each destination against its own list and filters by kind', () => {
    for (const kindCase of [
      {
        kind: undefined,
        expected: 2,
      },
      {
        kind: 'homebridge-plugin' as const,
        expected: 1,
      },
      {
        kind: 'github-topics' as const,
        expected: 1,
      },
    ]) {
      strictEqual(resolveKeywordLimitMessages({
        project: {
          keywords: ['Example Keyword'],
          platforms: ['homebridge'],
        },
        github: {
          owner: 'example',
          repo: 'widget',
        },
        workspaces: {
          './packages/homebridge-example': {
            name: 'homebridge-example',
            role: 'package',
            policy: 'distributable',
          },
        },
        recipes: {
          'github': {
            'sync-identity': {
              enabled: true,
            },
          },
          'package-json': {
            './packages/homebridge-example': {
              'sync-identity': {
                enabled: true,
                settings: {
                  keywords: true,
                },
              },
            },
          },
        },
      }, kindCase['kind']).length, kindCase['expected']);
    }

    return;
  });

  it('skips topics without keywords but still requires homebridge-plugin', () => {
    deepStrictEqual(resolveKeywordLimitMessages({
      project: { platforms: ['homebridge'] },
      github: {
        owner: 'example',
        repo: 'widget',
      },
      workspaces: {
        './packages/homebridge-example': {
          name: 'homebridge-example',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'github': {
          'sync-identity': {
            enabled: true,
          },
        },
        'package-json': {
          './packages/homebridge-example': {
            'sync-identity': {
              enabled: true,
              settings: {
                keywords: true,
              },
            },
          },
        },
      },
    }, undefined), ['The "project.keywords" field does not include "homebridge-plugin", which the npm keywords of the Homebridge plugin "./packages/homebridge-example" must contain. Add "homebridge-plugin" to "project.keywords".']);

    return;
  });

  return;
});

/**
 * Tests - Lib - Keyword Limits - Resolve Project Keywords Limit Message.
 *
 * @since 0.49.0
 */
describe('resolveProjectKeywordsLimitMessage', async () => {
  it('ignores a destination that has its own override', () => {
    strictEqual(resolveProjectKeywordsLimitMessage({
      github: {
        owner: 'example',
        repo: 'widget',
        topics: ['widget'],
      },
      recipes: {
        github: {
          'sync-identity': {
            enabled: true,
          },
        },
      },
    }, ['Not A Topic']), undefined);

    ok(String(resolveProjectKeywordsLimitMessage({
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
    }, ['Not A Topic'])).includes('"Not A Topic"'));

    return;
  });

  it('reports the strictest keyword count and reads the override first', () => {
    deepStrictEqual(resolveKeywordCountLimit({
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
    }), resolveGithubTopicsDestination({
      owner: 'example',
      repo: 'widget',
    }));

    strictEqual(resolveKeywordCountLimit({}), undefined);

    deepStrictEqual(resolveDestinationKeywords(resolveGithubTopicsDestination({ topics: ['override'] }), {
      project: {
        keywords: ['project'],
      },
    }), ['override']);

    return;
  });

  return;
});

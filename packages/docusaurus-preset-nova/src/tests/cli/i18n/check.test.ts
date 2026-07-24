import { strictEqual } from 'node:assert/strict';

import {
  beforeEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as Check } from '../../../cli/i18n/check.js';
import { Runner as SiteContext } from '../../../lib/i18n/site-context.js';

vi.mock('../../../lib/i18n/site-context.js', () => ({
  Runner: {
    gather: vi.fn(),
  },
}));

/**
 * Tests - CLI - I18n - Check - Run.
 *
 * @since 0.21.0
 */
describe('Check.run', () => {
  beforeEach(() => {
    vi.mocked(SiteContext['gather']).mockReset();

    return;
  });

  it('exits zero when the tree is in sync', async () => {
    vi.mocked(SiteContext['gather']).mockResolvedValue({
      siteDir: '/site',
      defaultLocale: 'en',
      locales: ['en'],
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      themeDefaults: {},
      perLocale: [{
        locale: 'en',
        localizationDir: '/site/i18n/en',
        isDefaultLocale: true,
        registry: {},
        areaFiles: [],
        existingCode: {
          greeting: { message: 'Hola' },
        },
        existingArea: new Map(),
      }],
    });

    await Check.run({});

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('exits one when the tree has drift', async () => {
    vi.mocked(SiteContext['gather']).mockResolvedValue({
      siteDir: '/site',
      defaultLocale: 'en',
      locales: ['en'],
      liveSiteKeys: new Set<string>(),
      themeLiveKeys: new Set(['theme.foo']),
      siteExtract: {},
      themeDefaults: {},
      perLocale: [{
        locale: 'en',
        localizationDir: '/site/i18n/en',
        isDefaultLocale: true,
        registry: {
          'theme.foo': 'Bar',
        },
        areaFiles: [],
        existingCode: {
          'theme.foo': { message: 'Bar' },
        },
        existingArea: new Map(),
      }],
    });

    await Check.run({});

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits two when the site cannot be loaded', async () => {
    vi.mocked(SiteContext['gather']).mockRejectedValue(new Error('Not a Docusaurus site root.'));

    await Check.run({});

    strictEqual(process.exitCode, 2);

    return;
  });

  return;
});

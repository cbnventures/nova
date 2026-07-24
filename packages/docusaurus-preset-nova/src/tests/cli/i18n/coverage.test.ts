import { strictEqual } from 'node:assert/strict';

import {
  beforeEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as Coverage } from '../../../cli/i18n/coverage.js';
import { Runner as ContentScan } from '../../../lib/i18n/content-scan.js';
import { Runner as SiteContext } from '../../../lib/i18n/site-context.js';

vi.mock('../../../lib/i18n/site-context.js', () => ({
  Runner: {
    gather: vi.fn(),
  },
}));

vi.mock('../../../lib/i18n/content-scan.js', () => ({
  Runner: {
    scan: vi.fn(),
  },
}));

/**
 * Tests - CLI - I18n - Coverage - Run.
 *
 * @since 0.21.0
 */
describe('Coverage.run', () => {
  beforeEach(() => {
    vi.mocked(SiteContext['gather']).mockReset();

    vi.mocked(ContentScan['scan']).mockReset();

    process.exitCode = undefined;

    return;
  });

  it('leaves the exit code unset when no threshold is applied', async () => {
    vi.mocked(SiteContext['gather']).mockResolvedValue({
      siteDir: '/site',
      defaultLocale: 'en',
      locales: [
        'en',
        'es',
      ],
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      themeDefaults: {},
      perLocale: [
        {
          locale: 'en',
          localizationDir: '/site/i18n/en',
          isDefaultLocale: true,
          registry: {},
          areaFiles: [],
          existingCode: {},
          existingArea: new Map(),
        },
        {
          locale: 'es',
          localizationDir: '/site/i18n/es',
          isDefaultLocale: false,
          registry: {},
          areaFiles: [],
          existingCode: {
            greeting: { message: 'Hola' },
          },
          existingArea: new Map(),
        },
      ],
    });

    vi.mocked(ContentScan['scan']).mockResolvedValue({
      sources: ['docs/intro.md'],
      perLocale: [
        {
          locale: 'en',
          isDefaultLocale: true,
          present: new Set<string>(),
        },
        {
          locale: 'es',
          isDefaultLocale: false,
          present: new Set<string>(),
        },
      ],
    });

    await Coverage.run({});

    strictEqual(process.exitCode, undefined);

    return;
  });

  it('exits one when a locale is below the threshold', async () => {
    vi.mocked(SiteContext['gather']).mockResolvedValue({
      siteDir: '/site',
      defaultLocale: 'en',
      locales: [
        'en',
        'es',
      ],
      liveSiteKeys: new Set(['greeting']),
      themeLiveKeys: new Set<string>(),
      siteExtract: {
        greeting: { message: 'Hello' },
      },
      themeDefaults: {},
      perLocale: [
        {
          locale: 'en',
          localizationDir: '/site/i18n/en',
          isDefaultLocale: true,
          registry: {},
          areaFiles: [],
          existingCode: {},
          existingArea: new Map(),
        },
        {
          locale: 'es',
          localizationDir: '/site/i18n/es',
          isDefaultLocale: false,
          registry: {},
          areaFiles: [],
          existingCode: {
            greeting: { message: 'Hola' },
          },
          existingArea: new Map(),
        },
      ],
    });

    vi.mocked(ContentScan['scan']).mockResolvedValue({
      sources: ['docs/intro.md'],
      perLocale: [
        {
          locale: 'en',
          isDefaultLocale: true,
          present: new Set<string>(),
        },
        {
          locale: 'es',
          isDefaultLocale: false,
          present: new Set<string>(),
        },
      ],
    });

    await Coverage.run({ minCoverage: '80' });

    strictEqual(process.exitCode, 1);

    return;
  });

  it('exits two when the site cannot be loaded', async () => {
    vi.mocked(SiteContext['gather']).mockRejectedValue(new Error('Not a Docusaurus site root.'));

    await Coverage.run({});

    strictEqual(process.exitCode, 2);

    return;
  });

  it('exits two on an invalid threshold', async () => {
    await Coverage.run({ minCoverage: 'abc' });

    strictEqual(process.exitCode, 2);

    return;
  });

  return;
});

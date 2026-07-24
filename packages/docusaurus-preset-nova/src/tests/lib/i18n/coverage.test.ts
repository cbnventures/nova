import { deepStrictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as Coverage } from '../../../lib/i18n/coverage.js';

/**
 * Tests - Lib - I18n - Coverage - Compute JSON.
 *
 * @since 0.21.0
 */
describe('Coverage.computeJson', () => {
  it('excludes a token left English in every locale from the union', () => {
    deepStrictEqual(Coverage.computeJson({
      universe: new Set([
        'home.title',
        'brand.name',
      ]),
      perLocale: [
        {
          locale: 'en',
          isDefaultLocale: true,
          translated: new Set(),
        },
        {
          locale: 'es',
          isDefaultLocale: false,
          translated: new Set(['home.title']),
        },
      ],
    }), {
      universeSize: 2,
      unionSize: 1,
      locales: [
        {
          locale: 'en',
          isDefaultLocale: true,
          translated: 2,
          definiteGaps: [],
          softGaps: [],
        },
        {
          locale: 'es',
          isDefaultLocale: false,
          translated: 1,
          definiteGaps: [],
          softGaps: ['brand.name'],
        },
      ],
    });

    return;
  });

  it('flags a key translated elsewhere as a definite gap', () => {
    deepStrictEqual(Coverage.computeJson({
      universe: new Set([
        'a',
        'b',
      ]),
      perLocale: [
        {
          locale: 'en',
          isDefaultLocale: true,
          translated: new Set(),
        },
        {
          locale: 'es',
          isDefaultLocale: false,
          translated: new Set([
            'a',
            'b',
          ]),
        },
        {
          locale: 'fr',
          isDefaultLocale: false,
          translated: new Set(['a']),
        },
      ],
    }), {
      universeSize: 2,
      unionSize: 2,
      locales: [
        {
          locale: 'en',
          isDefaultLocale: true,
          translated: 2,
          definiteGaps: [],
          softGaps: [],
        },
        {
          locale: 'es',
          isDefaultLocale: false,
          translated: 2,
          definiteGaps: [],
          softGaps: [],
        },
        {
          locale: 'fr',
          isDefaultLocale: false,
          translated: 1,
          definiteGaps: ['b'],
          softGaps: [],
        },
      ],
    });

    return;
  });

  it('marks the default locale fully covered', () => {
    deepStrictEqual(Coverage.computeJson({
      universe: new Set([
        'a',
        'b',
        'c',
      ]),
      perLocale: [{
        locale: 'en',
        isDefaultLocale: true,
        translated: new Set(),
      }],
    }), {
      universeSize: 3,
      unionSize: 0,
      locales: [{
        locale: 'en',
        isDefaultLocale: true,
        translated: 3,
        definiteGaps: [],
        softGaps: [],
      }],
    });

    return;
  });

  return;
});

/**
 * Tests - Lib - I18n - Coverage - Compute Content.
 *
 * @since 0.21.0
 */
describe('Coverage.computeContent', () => {
  it('counts a source without a translated copy as missing', () => {
    deepStrictEqual(Coverage.computeContent({
      sources: [
        'intro.md',
        'guide.md',
      ],
      perLocale: [
        {
          locale: 'en',
          isDefaultLocale: true,
          present: new Set(),
        },
        {
          locale: 'es',
          isDefaultLocale: false,
          present: new Set(['intro.md']),
        },
      ],
    }), {
      total: 2,
      locales: [
        {
          locale: 'en',
          isDefaultLocale: true,
          present: 2,
          missing: [],
        },
        {
          locale: 'es',
          isDefaultLocale: false,
          present: 1,
          missing: ['guide.md'],
        },
      ],
    });

    return;
  });

  it('marks the default locale fully present', () => {
    deepStrictEqual(Coverage.computeContent({
      sources: [
        'a.md',
        'b.md',
      ],
      perLocale: [{
        locale: 'en',
        isDefaultLocale: true,
        present: new Set(),
      }],
    }), {
      total: 2,
      locales: [{
        locale: 'en',
        isDefaultLocale: true,
        present: 2,
        missing: [],
      }],
    });

    return;
  });

  return;
});

/**
 * Tests - Lib - I18n - Coverage - Combine.
 *
 * @since 0.21.0
 */
describe('Coverage.combine', () => {
  it('blends json and content into one percentage', () => {
    deepStrictEqual(Coverage.combine({
      json: Coverage.computeJson({
        universe: new Set([
          'a',
          'b',
          'c',
          'd',
        ]),
        perLocale: [
          {
            locale: 'en',
            isDefaultLocale: true,
            translated: new Set(),
          },
          {
            locale: 'es',
            isDefaultLocale: false,
            translated: new Set([
              'a',
              'b',
            ]),
          },
        ],
      }),
      content: Coverage.computeContent({
        sources: [
          'x.md',
          'y.md',
        ],
        perLocale: [
          {
            locale: 'en',
            isDefaultLocale: true,
            present: new Set(),
          },
          {
            locale: 'es',
            isDefaultLocale: false,
            present: new Set(['x.md']),
          },
        ],
      }),
    }), {
      locales: [
        {
          locale: 'en',
          isDefaultLocale: true,
          percent: 100,
          jsonTranslated: 4,
          jsonTotal: 4,
          contentPresent: 2,
          contentTotal: 2,
          definiteGaps: [],
          softGaps: [],
          missingContent: [],
        },
        {
          locale: 'es',
          isDefaultLocale: false,
          percent: 50,
          jsonTranslated: 2,
          jsonTotal: 4,
          contentPresent: 1,
          contentTotal: 2,
          definiteGaps: [],
          softGaps: [
            'c',
            'd',
          ],
          missingContent: ['y.md'],
        },
      ],
    });

    return;
  });

  it('reads 100 percent when there is nothing to translate', () => {
    deepStrictEqual(Coverage.combine({
      json: Coverage.computeJson({
        universe: new Set(),
        perLocale: [{
          locale: 'es',
          isDefaultLocale: false,
          translated: new Set(),
        }],
      }),
      content: Coverage.computeContent({
        sources: [],
        perLocale: [{
          locale: 'es',
          isDefaultLocale: false,
          present: new Set(),
        }],
      }),
    }), {
      locales: [{
        locale: 'es',
        isDefaultLocale: false,
        percent: 100,
        jsonTranslated: 0,
        jsonTotal: 0,
        contentPresent: 0,
        contentTotal: 0,
        definiteGaps: [],
        softGaps: [],
        missingContent: [],
      }],
    });

    return;
  });

  return;
});

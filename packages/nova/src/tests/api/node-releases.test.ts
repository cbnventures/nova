import { strictEqual } from 'node:assert/strict';
import { test } from 'node:test';

import { NodeReleases } from '@/api/node-releases.js';

/**
 * Node releases fetch LTS versions.
 *
 * @since 1.0.0
 */
test('NodeReleases.fetchLtsVersions', async (context) => {
  context.afterEach(() => {
    NodeReleases.resetForTesting();
  });

  await context.test('returns constraint string for valid response', async (t) => {
    const today = new Date().toISOString().slice(0, 10);

    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        v18: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
        v20: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
        v22: {
          lts: today,
          end: '2099-12-31',
        },
      }),
    }));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, '^18 || ^20 || ^22');
  });

  await context.test('caches result after first fetch', async (t) => {
    let callCount = 0;

    t.mock.method(global, 'fetch', () => {
      callCount += 1;

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          v20: {
            lts: '2000-01-01',
            end: '2099-12-31',
          },
        }),
      });
    });

    const first = await NodeReleases.fetchLtsVersions();
    const second = await NodeReleases.fetchLtsVersions();

    strictEqual(first, '^20');
    strictEqual(second, '^20');
    strictEqual(callCount, 1);
  });

  await context.test('returns undefined on HTTP 404', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: false,
      status: 404,
    }));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);
  });

  await context.test('returns undefined on network error', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.reject(new Error('network error')));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);
  });

  await context.test('returns undefined on malformed JSON', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('not an object'),
    }));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);
  });

  await context.test('returns undefined when no active LTS versions', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        v16: {
          lts: '2000-01-01',
          end: '2000-01-01',
        },
        v14: {
          lts: '2000-01-01',
          end: '2000-01-01',
        },
      }),
    }));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);
  });

  await context.test('skips keys that do not parse to a major version number', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        vNext: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
        v20: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
      }),
    }));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');
  });

  await context.test('caches undefined result after fetch failure', async (t) => {
    let callCount = 0;

    t.mock.method(global, 'fetch', () => {
      callCount += 1;

      return Promise.resolve({
        ok: false,
        status: 500,
      });
    });

    const first = await NodeReleases.fetchLtsVersions();
    const second = await NodeReleases.fetchLtsVersions();

    strictEqual(first, undefined);
    strictEqual(second, undefined);
    strictEqual(callCount, 1);
  });

  await context.test('excludes entries where LTS has not started yet', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        v20: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
        v24: {
          lts: '2099-01-01',
          end: '2099-12-31',
        },
      }),
    }));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');
  });

  await context.test('excludes entries where end-of-life has passed', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        v16: {
          lts: '2000-01-01',
          end: '2000-01-01',
        },
        v20: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
      }),
    }));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');
  });

  await context.test('filters out non-LTS entries', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        v21: {
          end: '2099-12-31',
        },
        v20: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
      }),
    }));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');
  });

  await context.test('sorts major versions ascending', async (t) => {
    const today = new Date().toISOString().slice(0, 10);

    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        v22: {
          lts: today,
          end: '2099-12-31',
        },
        v18: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
        v20: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
      }),
    }));

    const result = await NodeReleases.fetchLtsVersions();

    strictEqual(result, '^18 || ^20 || ^22');
  });
});

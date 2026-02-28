import { ok, strictEqual } from 'node:assert/strict';
import { test } from 'node:test';

import { SpdxLicenses } from '@/api/spdx-licenses.js';

/**
 * SPDX licenses fetch licenses.
 *
 * @since 1.0.0
 */
test('SpdxLicenses.fetchLicenses', async (context) => {
  context.afterEach(() => {
    SpdxLicenses.resetForTesting();
  });

  await context.test('returns Set of license IDs for valid response', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        licenses: [
          { licenseId: 'MIT' },
          { licenseId: 'Apache-2.0' },
          { licenseId: 'ISC' },
        ],
      }),
    }));

    const result = await SpdxLicenses.fetchLicenses();

    ok(result instanceof Set);
    strictEqual(result.size, 3);
    ok(result.has('MIT'));
    ok(result.has('Apache-2.0'));
    ok(result.has('ISC'));
  });

  await context.test('caches result after first fetch', async (t) => {
    let callCount = 0;

    t.mock.method(global, 'fetch', () => {
      callCount += 1;

      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          licenses: [
            { licenseId: 'MIT' },
          ],
        }),
      });
    });

    await SpdxLicenses.fetchLicenses();
    await SpdxLicenses.fetchLicenses();

    strictEqual(callCount, 1);
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

    const first = await SpdxLicenses.fetchLicenses();
    const second = await SpdxLicenses.fetchLicenses();

    strictEqual(first, undefined);
    strictEqual(second, undefined);
    strictEqual(callCount, 1);
  });

  await context.test('returns undefined on HTTP 500', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: false,
      status: 500,
    }));

    const result = await SpdxLicenses.fetchLicenses();

    strictEqual(result, undefined);
  });

  await context.test('returns undefined on network error', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.reject(new Error('network error')));

    const result = await SpdxLicenses.fetchLicenses();

    strictEqual(result, undefined);
  });

  await context.test('returns undefined on malformed JSON', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve('not an object'),
    }));

    const result = await SpdxLicenses.fetchLicenses();

    strictEqual(result, undefined);
  });

  await context.test('returns empty Set for empty licenses array', async (t) => {
    t.mock.method(global, 'fetch', () => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        licenses: [],
      }),
    }));

    const result = await SpdxLicenses.fetchLicenses();

    ok(result instanceof Set);
    strictEqual(result.size, 0);
  });
});

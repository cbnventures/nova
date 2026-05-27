import { ok, strictEqual } from 'node:assert/strict';

import {
  afterEach, describe, it, vi,
} from 'vitest';

import { Runner as ApiSpdxLicenses } from '../../api/spdx-licenses.js';

import type {
  Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_CallCount,
  Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_First,
  Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_HasApache,
  Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_HasIsc,
  Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_HasMit,
  Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_Result,
  Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_Second,
} from '../../types/tests/api/spdx-licenses.test.d.ts';

/**
 * Tests - API - SPDX Licenses - Fetch Licenses.
 *
 * @since 0.13.0
 */
describe('ApiSpdxLicenses.fetchLicenses', async () => {
  afterEach(() => {
    ApiSpdxLicenses.resetForTesting();

    return;
  });

  it('returns Set of license IDs for valid response', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      licenses: [
        { licenseId: 'MIT' },
        { licenseId: 'Apache-2.0' },
        { licenseId: 'ISC' },
      ],
    }))));

    const result: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_Result = await ApiSpdxLicenses.fetchLicenses();

    ok(result instanceof Set);
    strictEqual(result.size, 3);
    const hasMit: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_HasMit = result.has('MIT');
    const hasApache: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_HasApache = result.has('Apache-2.0');
    const hasIsc: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_HasIsc = result.has('ISC');

    ok(hasMit);
    ok(hasApache);
    ok(hasIsc);

    return;
  });

  it('caches result after first fetch', async () => {
    let callCount: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_CallCount = 0;

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response(JSON.stringify({
        licenses: [{ licenseId: 'MIT' }],
      })));
    });

    await ApiSpdxLicenses.fetchLicenses();
    await ApiSpdxLicenses.fetchLicenses();

    strictEqual(callCount, 1);

    return;
  });

  it('caches undefined result after fetch failure', async () => {
    let callCount: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_CallCount = 0;

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response(null, { status: 500 }));
    });

    const first: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_First = await ApiSpdxLicenses.fetchLicenses();
    const second: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_Second = await ApiSpdxLicenses.fetchLicenses();

    strictEqual(first, undefined);
    strictEqual(second, undefined);
    strictEqual(callCount, 1);

    return;
  });

  it('returns undefined on HTTP 500', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(null, { status: 500 })));

    const result: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_Result = await ApiSpdxLicenses.fetchLicenses();

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined on network error', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('network error')));

    const result: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_Result = await ApiSpdxLicenses.fetchLicenses();

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined on malformed JSON', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify('not an object'))));

    const result: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_Result = await ApiSpdxLicenses.fetchLicenses();

    strictEqual(result, undefined);

    return;
  });

  it('returns empty Set for empty licenses array', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      licenses: [],
    }))));

    const result: Tests_Api_SpdxLicenses_ApiSpdxLicensesFetchLicenses_Result = await ApiSpdxLicenses.fetchLicenses();

    ok(result instanceof Set);
    strictEqual(result.size, 0);

    return;
  });

  return;
});

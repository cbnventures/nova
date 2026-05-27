import { strictEqual } from 'node:assert/strict';

import {
  afterEach, describe, it, vi,
} from 'vitest';

import { Runner as ApiNodeReleases } from '../../api/node-releases.js';

import type {
  Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_CallCount,
  Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_First,
  Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result,
  Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Second,
  Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Today,
} from '../../types/tests/api/node-releases.test.d.ts';

/**
 * Tests - API - Node Releases - Fetch LTS Versions.
 *
 * @since 0.13.0
 */
describe('ApiNodeReleases.fetchLtsVersions', async () => {
  afterEach(() => {
    ApiNodeReleases.resetForTesting();

    return;
  });

  it('returns constraint string for valid response', async () => {
    const today: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Today = new Date().toISOString().slice(0, 10);

    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
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
    }))));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^18 || ^20 || ^22');

    return;
  });

  it('caches result after first fetch', async () => {
    let callCount: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_CallCount = 0;

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response(JSON.stringify({
        v20: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
      })));
    });

    const first: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_First = await ApiNodeReleases.fetchLtsVersions();
    const second: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Second = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(first, '^20');
    strictEqual(second, '^20');
    strictEqual(callCount, 1);

    return;
  });

  it('returns undefined on HTTP 404', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(null, { status: 404 })));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined on network error', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('network error')));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined on malformed JSON', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify('not an object'))));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined when no active LTS versions', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      v16: {
        lts: '2000-01-01',
        end: '2000-01-01',
      },
      v14: {
        lts: '2000-01-01',
        end: '2000-01-01',
      },
    }))));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);

    return;
  });

  it('skips keys that do not parse to a major version number', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      vNext: {
        lts: '2000-01-01',
        end: '2099-12-31',
      },
      v20: {
        lts: '2000-01-01',
        end: '2099-12-31',
      },
    }))));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');

    return;
  });

  it('caches undefined result after fetch failure', async () => {
    let callCount: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_CallCount = 0;

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response(null, { status: 500 }));
    });

    const first: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_First = await ApiNodeReleases.fetchLtsVersions();
    const second: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Second = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(first, undefined);
    strictEqual(second, undefined);
    strictEqual(callCount, 1);

    return;
  });

  it('excludes entries where LTS has not started yet', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      v20: {
        lts: '2000-01-01',
        end: '2099-12-31',
      },
      v24: {
        lts: '2099-01-01',
        end: '2099-12-31',
      },
    }))));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');

    return;
  });

  it('excludes entries where end-of-life has passed', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      v16: {
        lts: '2000-01-01',
        end: '2000-01-01',
      },
      v20: {
        lts: '2000-01-01',
        end: '2099-12-31',
      },
    }))));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');

    return;
  });

  it('filters out non-LTS entries', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      v21: {
        end: '2099-12-31',
      },
      v20: {
        lts: '2000-01-01',
        end: '2099-12-31',
      },
    }))));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');

    return;
  });

  it('sorts major versions ascending', async () => {
    const today: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Today = new Date().toISOString().slice(0, 10);

    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
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
    }))));

    const result: Tests_Api_NodeReleases_ApiNodeReleasesFetchLtsVersions_Result = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^18 || ^20 || ^22');

    return;
  });

  return;
});

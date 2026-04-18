import { strictEqual } from 'node:assert/strict';

import {
  afterEach, describe, it, vi,
} from 'vitest';

import { ApiNodeReleases } from '../../api/node-releases.js';

import type {
  TestsApiNodeReleasesFetchLtsVersionsCallCount,
  TestsApiNodeReleasesFetchLtsVersionsFirst,
  TestsApiNodeReleasesFetchLtsVersionsResult,
  TestsApiNodeReleasesFetchLtsVersionsSecond,
  TestsApiNodeReleasesFetchLtsVersionsToday,
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
    const today: TestsApiNodeReleasesFetchLtsVersionsToday = new Date().toISOString().slice(0, 10);

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

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^18 || ^20 || ^22');

    return;
  });

  it('caches result after first fetch', async () => {
    let callCount: TestsApiNodeReleasesFetchLtsVersionsCallCount = 0;

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response(JSON.stringify({
        v20: {
          lts: '2000-01-01',
          end: '2099-12-31',
        },
      })));
    });

    const first: TestsApiNodeReleasesFetchLtsVersionsFirst = await ApiNodeReleases.fetchLtsVersions();
    const second: TestsApiNodeReleasesFetchLtsVersionsSecond = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(first, '^20');
    strictEqual(second, '^20');
    strictEqual(callCount, 1);

    return;
  });

  it('returns undefined on HTTP 404', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(null, { status: 404 })));

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined on network error', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.reject(new Error('network error')));

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, undefined);

    return;
  });

  it('returns undefined on malformed JSON', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify('not an object'))));

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

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

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

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

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');

    return;
  });

  it('caches undefined result after fetch failure', async () => {
    let callCount: TestsApiNodeReleasesFetchLtsVersionsCallCount = 0;

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response(null, { status: 500 }));
    });

    const first: TestsApiNodeReleasesFetchLtsVersionsFirst = await ApiNodeReleases.fetchLtsVersions();
    const second: TestsApiNodeReleasesFetchLtsVersionsSecond = await ApiNodeReleases.fetchLtsVersions();

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

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

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

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

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

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^20');

    return;
  });

  it('sorts major versions ascending', async () => {
    const today: TestsApiNodeReleasesFetchLtsVersionsToday = new Date().toISOString().slice(0, 10);

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

    const result: TestsApiNodeReleasesFetchLtsVersionsResult = await ApiNodeReleases.fetchLtsVersions();

    strictEqual(result, '^18 || ^20 || ^22');

    return;
  });

  return;
});

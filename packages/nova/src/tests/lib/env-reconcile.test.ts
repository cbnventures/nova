import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

import { libEnvGithub } from '../../lib/env-github.js';
import { libEnvReconcile } from '../../lib/env-reconcile.js';

/**
 * Tests - Lib - Env Reconcile - Lib Env Reconcile.
 *
 * @since 0.21.0
 */
describe('libEnvReconcile', () => {
  it('groups status entries into create, delete, and restore lists and ignores the rest', () => {
    deepStrictEqual(
      libEnvReconcile.plan([
        {
          name: 'CBN_NEW',
          state: 'missing',
        },
        {
          name: 'CBN_LEGACY',
          state: 'stale',
        },
        {
          name: 'CBN_TOKEN',
          state: 'type-mismatch',
        },
        {
          name: 'CBN_OK',
          state: 'declared',
        },
        {
          name: 'OTHER_X',
          state: 'unmanaged',
        },
        {
          name: 'CBN_EMPTY',
          state: 'empty-bake',
        },
      ]),
      {
        create: ['CBN_NEW'],
        delete: ['CBN_LEGACY'],
        restore: ['CBN_TOKEN'],
      },
    );

    return;
  });

  it('never adds an optional-absent key to create while a required missing key still lands there', () => {
    deepStrictEqual(
      libEnvReconcile.plan([
        {
          name: 'G_NPM_TOKEN',
          state: 'optional-absent',
        },
        {
          name: 'G_CLOUDFLARE_API_TOKEN',
          state: 'missing',
        },
      ]),
      {
        create: ['G_CLOUDFLARE_API_TOKEN'],
        delete: [],
        restore: [],
      },
    );

    return;
  });

  it('creates missing, deletes stale, and restores mismatched names when confirmed', async () => {
    vi.spyOn(libEnvGithub, 'read').mockResolvedValue({
      available: true,
      variables: [],
      secrets: [],
    });

    vi.spyOn(libEnvGithub, 'createStub').mockResolvedValue(true);

    vi.spyOn(libEnvGithub, 'delete').mockResolvedValue(true);

    deepStrictEqual(
      await libEnvReconcile.apply(
        {
          create: ['CBN_NEW'],
          delete: ['CBN_LEGACY'],
          restore: ['CBN_TOKEN'],
        },
        {
          CBN_NEW: false,
          CBN_LEGACY: false,
          CBN_TOKEN: true,
        },
        async () => true,
      ),
      {
        available: true,
        done: [
          'CBN_NEW',
          'CBN_LEGACY',
          'CBN_TOKEN',
        ],
        remaining: [],
      },
    );

    // A missing key is created as its intended kind; a type-mismatch is restored by
    // recreating it as its intended kind (secret here).
    deepStrictEqual(vi.mocked(libEnvGithub['createStub']).mock.calls, [
      [
        'CBN_NEW',
        false,
      ],
      [
        'CBN_TOKEN',
        true,
      ],
    ]);

    // A stale key is deleted under its current kind; a type-mismatch first deletes the
    // wrongly-stored entry under the opposite of its intended kind.
    deepStrictEqual(vi.mocked(libEnvGithub['delete']).mock.calls, [
      [
        'CBN_LEGACY',
        false,
      ],
      [
        'CBN_TOKEN',
        false,
      ],
    ]);

    vi.restoreAllMocks();

    return;
  });

  it('reports a failed operation as remaining while the rest complete', async () => {
    vi.spyOn(libEnvGithub, 'read').mockResolvedValue({
      available: true,
      variables: [],
      secrets: [],
    });

    vi.spyOn(libEnvGithub, 'createStub').mockImplementation(async (name) => name !== 'CBN_FAIL');

    vi.spyOn(libEnvGithub, 'delete').mockResolvedValue(true);

    deepStrictEqual(
      await libEnvReconcile.apply(
        {
          create: [
            'CBN_OK',
            'CBN_FAIL',
          ],
          delete: [],
          restore: [],
        },
        {
          CBN_OK: false,
          CBN_FAIL: true,
        },
        async () => true,
      ),
      {
        available: true,
        done: ['CBN_OK'],
        remaining: ['CBN_FAIL'],
      },
    );

    vi.restoreAllMocks();

    return;
  });

  it('short-circuits without mutating when gh is unavailable', async () => {
    vi.spyOn(libEnvGithub, 'read').mockResolvedValue({
      available: false,
      variables: [],
      secrets: [],
    });

    vi.spyOn(libEnvGithub, 'createStub').mockResolvedValue(true);

    vi.spyOn(libEnvGithub, 'delete').mockResolvedValue(true);

    deepStrictEqual(
      await libEnvReconcile.apply(
        {
          create: ['CBN_NEW'],
          delete: [],
          restore: [],
        },
        { CBN_NEW: false },
        async () => true,
      ),
      {
        available: false,
        done: [],
        remaining: ['CBN_NEW'],
      },
    );

    strictEqual(vi.mocked(libEnvGithub['createStub']).mock.calls.length, 0);
    strictEqual(vi.mocked(libEnvGithub['delete']).mock.calls.length, 0);

    vi.restoreAllMocks();

    return;
  });

  it('applies nothing when the confirm callback declines', async () => {
    vi.spyOn(libEnvGithub, 'read').mockResolvedValue({
      available: true,
      variables: [],
      secrets: [],
    });

    vi.spyOn(libEnvGithub, 'createStub').mockResolvedValue(true);

    vi.spyOn(libEnvGithub, 'delete').mockResolvedValue(true);

    deepStrictEqual(
      await libEnvReconcile.apply(
        {
          create: ['CBN_NEW'],
          delete: ['CBN_OLD'],
          restore: [],
        },
        {
          CBN_NEW: false,
          CBN_OLD: false,
        },
        async () => false,
      ),
      {
        available: true,
        done: [],
        remaining: [
          'CBN_NEW',
          'CBN_OLD',
        ],
      },
    );

    strictEqual(vi.mocked(libEnvGithub['createStub']).mock.calls.length, 0);
    strictEqual(vi.mocked(libEnvGithub['delete']).mock.calls.length, 0);

    vi.restoreAllMocks();

    return;
  });

  it('makes no gh calls and applies nothing for an empty plan', async () => {
    vi.spyOn(libEnvGithub, 'read').mockResolvedValue({
      available: true,
      variables: [],
      secrets: [],
    });

    vi.spyOn(libEnvGithub, 'createStub').mockResolvedValue(true);

    vi.spyOn(libEnvGithub, 'delete').mockResolvedValue(true);

    deepStrictEqual(
      await libEnvReconcile.apply(
        {
          create: [],
          delete: [],
          restore: [],
        },
        {},
        async () => true,
      ),
      {
        available: true,
        done: [],
        remaining: [],
      },
    );

    strictEqual(vi.mocked(libEnvGithub['read']).mock.calls.length, 0);
    strictEqual(vi.mocked(libEnvGithub['createStub']).mock.calls.length, 0);
    strictEqual(vi.mocked(libEnvGithub['delete']).mock.calls.length, 0);

    vi.restoreAllMocks();

    return;
  });

  return;
});

import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  LIB_CONSTANTS_DOCS_BASE_URL,
  LIB_CONSTANTS_RUN_WORKSPACES_DEFAULT_CONCURRENCY,
} from '../../lib/constants.js';

/**
 * Tests - Lib - Constants - Docs Base URL.
 *
 * @since 0.16.0
 */
describe('LIB_CONSTANTS_DOCS_BASE_URL', () => {
  it('exposes the canonical Nova docs origin without a trailing slash', () => {
    strictEqual(LIB_CONSTANTS_DOCS_BASE_URL, 'https://nova.cbnventures.io');

    return;
  });

  return;
});

/**
 * Tests - Lib - Constants - Run Workspaces Default Concurrency.
 *
 * @since 0.33.0
 */
describe('LIB_CONSTANTS_RUN_WORKSPACES_DEFAULT_CONCURRENCY', () => {
  it('keeps Nova\'s reusable workspace runner default at ten tasks', () => {
    strictEqual(LIB_CONSTANTS_RUN_WORKSPACES_DEFAULT_CONCURRENCY, 10);

    return;
  });

  return;
});

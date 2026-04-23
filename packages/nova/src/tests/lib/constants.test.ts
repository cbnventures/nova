import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { LIB_CONSTANTS_DOCS_BASE_URL } from '../../lib/constants.js';

/**
 * Tests - Lib - Constants - Docs Base URL.
 *
 * @since 0.16.3
 */
describe('LIB_CONSTANTS_DOCS_BASE_URL', () => {
  it('exposes the canonical Nova docs origin without a trailing slash', () => {
    strictEqual(LIB_CONSTANTS_DOCS_BASE_URL, 'https://nova.cbnventures.io');

    return;
  });

  return;
});

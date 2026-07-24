import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { libEnvNamespace } from '../../lib/env-namespace.js';

/**
 * Tests - Lib - Env Namespace - Lib Env Namespace.
 *
 * @since 0.21.0
 */
describe('libEnvNamespace', () => {
  it('detects overlapping prefixes case-insensitively', () => {
    strictEqual(libEnvNamespace.prefixesOverlap('CBN_', 'cbn_'), true);
    strictEqual(libEnvNamespace.prefixesOverlap('CBN_', 'CBN_SUB_'), true);
    strictEqual(libEnvNamespace.prefixesOverlap('CBN_', 'MJL_'), false);

    return;
  });

  it('rejects the reserved GITHUB_ prefix case-folded', () => {
    strictEqual(libEnvNamespace.isReservedPrefix('github_'), true);
    strictEqual(libEnvNamespace.isReservedPrefix('CBN_'), false);

    return;
  });

  it('derives a GitHub name by concatenating prefix and key', () => {
    strictEqual(libEnvNamespace.githubName('CBN_', 'PUBLIC_X'), 'CBN_PUBLIC_X');

    return;
  });

  it('detects a key that starts with its own prefix case-folded', () => {
    strictEqual(libEnvNamespace.startsWithPrefix('cbn_public_x', 'CBN_'), true);
    strictEqual(libEnvNamespace.startsWithPrefix('PUBLIC_X', 'CBN_'), false);

    return;
  });

  it('accepts a legal GitHub name and rejects malformed or reserved ones', () => {
    strictEqual(libEnvNamespace.isGithubLegalName('CBN_PUBLIC_X'), true);
    strictEqual(libEnvNamespace.isGithubLegalName('CBN_bad'), false);
    strictEqual(libEnvNamespace.isGithubLegalName('9_BAD'), false);
    strictEqual(libEnvNamespace.isGithubLegalName('GITHUB_TOKEN'), false);

    return;
  });

  return;
});

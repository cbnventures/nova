import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { buildShareHref } from '../../lib/share-targets.js';

/**
 * Tests - Lib - Share Targets - Build Share Href.
 *
 * @since 0.49.0
 */
describe('buildShareHref', async () => {
  it('builds each platform share URL with an encoded page URL', () => {
    strictEqual(buildShareHref('x', 'https://docs.example.com/a b?c=1'), 'https://x.com/intent/tweet?url=https%3A%2F%2Fdocs.example.com%2Fa%20b%3Fc%3D1');

    strictEqual(buildShareHref('facebook', 'https://docs.example.com/'), 'https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdocs.example.com%2F');

    strictEqual(buildShareHref('linkedin', 'https://docs.example.com/'), 'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fdocs.example.com%2F');

    strictEqual(buildShareHref('reddit', 'https://docs.example.com/'), 'https://www.reddit.com/submit?url=https%3A%2F%2Fdocs.example.com%2F');

    return;
  });

  it('returns undefined for platforms without a share URL', () => {
    strictEqual(buildShareHref('copy', 'https://docs.example.com/'), undefined);

    strictEqual(buildShareHref('mastodon', 'https://docs.example.com/'), undefined);

    return;
  });

  return;
});

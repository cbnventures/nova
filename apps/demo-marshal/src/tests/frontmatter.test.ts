import { registerFrontmatterSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tests - Frontmatter.
 *
 * This app self-checks its docs frontmatter THROUGH the published kit. The
 * suite logic lives in @cbnventures/nova/rules/vitest; this wrapper supplies
 * the configuration that reproduces this app's conventions.
 *
 * @since 0.20.0
 */
registerFrontmatterSuite({
  vitest,
  enable: 'all',
  requiredFields: [
    'title',
    'description',
    'tags',
  ],
  requiredBlogFields: [
    'title',
    'authors',
    'tags',
  ],
  indexSlug: 'overview',
  placeholderSentinel: 'x',
  placeholderBodyPrefix: 'Coming soon',
});

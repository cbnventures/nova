import { strictEqual } from 'node:assert/strict';

import { describe, it, vi } from 'vitest';

import BlogArchivePage from '../../../theme/BlogArchivePage/index.js';

import type {
  Tests_Theme_BlogArchivePage_Index_BlogArchivePage_UsesADescriptiveArchiveSummary_Element,
  Tests_Theme_BlogArchivePage_Index_DocusaurusTranslate_MockModule_TranslateImplementation,
} from '../../../types/tests/theme/BlogArchivePage/index.test.d.ts';

vi.mock('@docusaurus/Link', () => ({
  default: 'a',
}));

vi.mock('@docusaurus/theme-common', () => ({
  PageMetadata: 'meta',
}));

vi.mock('@docusaurus/theme-common/internal', () => ({
  useDateTimeFormat: vi.fn(() => ({
    format: vi.fn(),
  })),
}));

// Returning the translation id shows which string each prop reads, whatever the call order.
vi.mock('@docusaurus/Translate', () => ({
  translate: vi.fn<Tests_Theme_BlogArchivePage_Index_DocusaurusTranslate_MockModule_TranslateImplementation>((descriptor) => descriptor['id']),
}));

vi.mock('@theme/BlogLayout', () => ({
  default: 'main',
}));

vi.mock('@theme/Heading', () => ({
  default: 'h1',
}));

/**
 * Tests - Theme - Blog Archive Page - Blog Archive Page.
 *
 * @since 0.35.0
 */
describe('BlogArchivePage', async () => {
  it('uses a descriptive archive summary', () => {
    const element: Tests_Theme_BlogArchivePage_Index_BlogArchivePage_UsesADescriptiveArchiveSummary_Element = BlogArchivePage({
      archive: {
        blogPosts: [],
      },
    });

    strictEqual(element['props']['children'][0]['props']['description'], 'theme.blog.archive.description');

    return;
  });

  return;
});

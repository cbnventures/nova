import { strictEqual } from 'node:assert/strict';

import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, vi } from 'vitest';

import SiteMetadata from '../../../theme/SiteMetadata/index.js';

import type {
  Tests_Theme_SiteMetadata_Index_SiteMetadata_AddsSiteDescriptionToOpenGraph_DescriptionCount,
  Tests_Theme_SiteMetadata_Index_SiteMetadata_AddsSiteDescriptionToOpenGraph_DescriptionMarker,
  Tests_Theme_SiteMetadata_Index_SiteMetadata_AddsSiteDescriptionToOpenGraph_Markup,
} from '../../../types/tests/theme/SiteMetadata/index.test.d.ts';

vi.mock('@docusaurus/Head', () => ({
  default: 'head',
}));

vi.mock('@docusaurus/router', () => ({
  useLocation: vi.fn(() => ({
    pathname: '/tags/sample/',
  })),
}));

vi.mock('@docusaurus/theme-common', () => ({
  PageMetadata: vi.fn(),
  useThemeConfig: vi.fn(() => ({
    site: {
      metadata: [{
        name: 'description',
        content: 'Site description.',
      }],
    },
  })),
}));

vi.mock('@docusaurus/theme-common/internal', () => ({
  DEFAULT_SEARCH_TAG: 'default',
  useAlternatePageUtils: vi.fn(() => ({
    createUrl: vi.fn(() => 'https://www.example.com/tags/sample/'),
  })),
}));

vi.mock('@docusaurus/useBaseUrl', () => ({
  default: vi.fn(() => '/tags/sample/'),
}));

vi.mock('@docusaurus/useDocusaurusContext', () => ({
  default: vi.fn(() => ({
    i18n: {
      currentLocale: 'en',
      defaultLocale: 'en',
      localeConfigs: {
        en: {
          htmlLang: 'en',
        },
      },
    },
    siteConfig: {
      baseUrl: '/',
      trailingSlash: true,
      url: 'https://www.example.com',
    },
  })),
}));

vi.mock('@docusaurus/utils-common', () => ({
  applyTrailingSlash: vi.fn(() => '/tags/sample/'),
}));

vi.mock('@theme/SearchMetadata', () => ({
  default: vi.fn(),
}));

/**
 * Tests - Theme - Site Metadata - Site Metadata.
 *
 * @since 0.35.0
 */
describe('SiteMetadata', async () => {
  it('adds site description to Open Graph', () => {
    const markup: Tests_Theme_SiteMetadata_Index_SiteMetadata_AddsSiteDescriptionToOpenGraph_Markup = renderToStaticMarkup(SiteMetadata());
    const descriptionMarker: Tests_Theme_SiteMetadata_Index_SiteMetadata_AddsSiteDescriptionToOpenGraph_DescriptionMarker = 'property="og:description"';
    const descriptionCount: Tests_Theme_SiteMetadata_Index_SiteMetadata_AddsSiteDescriptionToOpenGraph_DescriptionCount = markup.split(descriptionMarker).length - 1;

    strictEqual(markup.includes('<meta property="og:description" content="Site description."/>'), true);
    strictEqual(descriptionCount, 1);

    return;
  });

  return;
});

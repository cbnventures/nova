import { strictEqual } from 'node:assert/strict';

import { describe, it, vi } from 'vitest';

import { getClaimLength } from '../../lib/use-navbar-active-item.js';

import type {
  Tests_Lib_UseNavbarActiveItem_GetClaimLength_ClaimsAPlainLinkUnderTheSiteBaseUrl_Result,
  Tests_Lib_UseNavbarActiveItem_GetClaimLength_IgnoresAPlainLinkOnAnotherRoute_Result,
  Tests_Lib_UseNavbarActiveItem_GetClaimLength_KeepsDocPathsThatAlreadyCarryTheBaseUrl_Result,
  Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Relative,
  Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Returns,
  Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Url,
} from '../../types/tests/lib/use-navbar-active-item.test.d.ts';

// The hook's Docusaurus client aliases only exist inside a site build.
vi.mock('@docusaurus/router', () => ({
  useLocation: vi.fn(),
}));

vi.mock('@docusaurus/useBaseUrl', () => ({
  useBaseUrlUtils: vi.fn(),
}));

/**
 * Tests - Lib - Use Navbar Active Item - With Repo Base URL.
 *
 * Mirrors how Docusaurus prefixes a path with a GitHub Pages base URL of
 * `/repo/`, leaving paths that already carry it unchanged.
 *
 * @param {Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Url} url - Url.
 *
 * @returns {Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Returns}
 *
 * @since 0.33.0
 */
function withRepoBaseUrl(url: Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Url): Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Returns {
  if (url.startsWith('/repo/') === true) {
    return url;
  }

  const relative: Tests_Lib_UseNavbarActiveItem_WithRepoBaseUrl_Relative = (url.startsWith('/') === true) ? url.slice(1) : url;

  return `/repo/${relative}`;
}

/**
 * Tests - Lib - Use Navbar Active Item - Get Claim Length.
 *
 * @since 0.33.0
 */
describe('getClaimLength', async () => {
  it('claims a plain link under the site base url', () => {
    const result: Tests_Lib_UseNavbarActiveItem_GetClaimLength_ClaimsAPlainLinkUnderTheSiteBaseUrl_Result = getClaimLength({
      label: 'Blog',
      to: '/blog/',
    }, '/repo/blog/introducing-the-app/', withRepoBaseUrl);

    strictEqual(result, '/repo/blog'.length);

    return;
  });

  it('keeps doc paths that already carry the base url', () => {
    const result: Tests_Lib_UseNavbarActiveItem_GetClaimLength_KeepsDocPathsThatAlreadyCarryTheBaseUrl_Result = getClaimLength({
      label: 'Overview',
      to: '/repo/docs/overview/',
      type: 'doc',
    }, '/repo/docs/overview/', withRepoBaseUrl);

    strictEqual(result, '/repo/docs/overview'.length);

    return;
  });

  it('ignores a plain link on another route', () => {
    const result: Tests_Lib_UseNavbarActiveItem_GetClaimLength_IgnoresAPlainLinkOnAnotherRoute_Result = getClaimLength({
      label: 'Blog',
      to: '/blog/',
    }, '/repo/docs/overview/', withRepoBaseUrl);

    strictEqual(result, null);

    return;
  });

  return;
});

/**
 * Lib - Use Navbar Active Item.
 *
 * Coordinates active-state across navbar items so that the most-specific
 * claim wins (longest matching prefix or regex match), returning only
 * the winning item's label when multiple items match the current URL.
 *
 * @since 0.18.0
 */

import { useLocation } from '@docusaurus/router';

import type {
  LibUseNavbarActiveItemBestKey,
  LibUseNavbarActiveItemBestScore,
  LibUseNavbarActiveItemClaimLength,
  LibUseNavbarActiveItemGetClaimLengthBase,
  LibUseNavbarActiveItemGetClaimLengthClaimBase,
  LibUseNavbarActiveItemGetClaimLengthMatch,
  LibUseNavbarActiveItemGetClaimLengthMatchedSubstring,
  LibUseNavbarActiveItemGetClaimLengthNormalized,
  LibUseNavbarActiveItemGetClaimLengthPathname,
  LibUseNavbarActiveItemGetClaimLengthReturns,
  LibUseNavbarActiveItemGetClaimLengthTo,
  LibUseNavbarActiveItemItem,
  LibUseNavbarActiveItemItemLabelOrSkip,
  LibUseNavbarActiveItemItems,
  LibUseNavbarActiveItemItemType,
  LibUseNavbarActiveItemNonLinkTypes,
  LibUseNavbarActiveItemNormalizeBaseInput,
  LibUseNavbarActiveItemNormalizeBaseReturns,
  LibUseNavbarActiveItemPathname,
  LibUseNavbarActiveItemReturns,
} from '../types/lib/use-navbar-active-item.d.ts';

/**
 * Lib - Use Navbar Active Item - Non Link Types.
 *
 * Types that never participate in path-based active matching (dropdowns,
 * locale switchers, raw HTML, and search). The coordinator skips them so
 * they do not contribute to the specificity contest.
 *
 * @since 0.18.0
 */
const nonLinkTypes: LibUseNavbarActiveItemNonLinkTypes = new Set([
  'dropdown',
  'docsVersionDropdown',
  'localeDropdown',
  'html',
  'search',
]);

/**
 * Lib - Use Navbar Active Item - Normalize Base.
 *
 * Strips a single trailing slash from a base path so claim comparisons
 * are not split between `/docs/` and `/docs`.
 *
 * @param {LibUseNavbarActiveItemNormalizeBaseInput} base - Base.
 *
 * @returns {LibUseNavbarActiveItemNormalizeBaseReturns}
 *
 * @since 0.18.0
 */
function normalizeBase(base: LibUseNavbarActiveItemNormalizeBaseInput): LibUseNavbarActiveItemNormalizeBaseReturns {
  if (base.length > 1 && base.endsWith('/') === true) {
    return base.slice(0, -1);
  }

  return base;
}

/**
 * Lib - Use Navbar Active Item - Get Claim Length.
 *
 * Returns the byte length of the URL prefix an item claims for the given
 * pathname, or null when the item does not claim it. Regex matches use
 * the matched substring length; prefix claims use the normalized base.
 *
 * @param {LibUseNavbarActiveItemItem}                   item     - Item.
 * @param {LibUseNavbarActiveItemGetClaimLengthPathname} pathname - Pathname.
 *
 * @returns {LibUseNavbarActiveItemGetClaimLengthReturns}
 *
 * @since 0.18.0
 */
function getClaimLength(item: LibUseNavbarActiveItemItem, pathname: LibUseNavbarActiveItemGetClaimLengthPathname): LibUseNavbarActiveItemGetClaimLengthReturns {
  if (item['activeBaseRegex'] !== undefined) {
    let match: LibUseNavbarActiveItemGetClaimLengthMatch = null;

    try {
      match = pathname.match(new RegExp(item['activeBaseRegex']));
    } catch {
      // Invalid regex falls through to other claim sources.
      match = null;
    }

    if (match !== null) {
      const matched: LibUseNavbarActiveItemGetClaimLengthMatchedSubstring = match[0];

      return matched.length;
    }
  }

  const claimBase: LibUseNavbarActiveItemGetClaimLengthClaimBase = item['claimBase'];
  const to: LibUseNavbarActiveItemGetClaimLengthTo = item['to'];
  const base: LibUseNavbarActiveItemGetClaimLengthBase = (claimBase !== undefined) ? claimBase : to;

  if (base === undefined) {
    return null;
  }

  const normalized: LibUseNavbarActiveItemGetClaimLengthNormalized = normalizeBase(base);

  if (
    pathname === base
    || pathname === normalized
    || pathname.indexOf(`${normalized}/`) === 0
  ) {
    return normalized.length;
  }

  return null;
}

/**
 * Lib - Use Navbar Active Item - Use Navbar Active Item.
 *
 * Walks the supplied navbar items and returns the label of the item whose
 * claim has the longest prefix/regex match against the current pathname,
 * or null when no item claims the URL.
 *
 * @param {LibUseNavbarActiveItemItems} items - Items.
 *
 * @returns {LibUseNavbarActiveItemReturns}
 *
 * @since 0.18.0
 */
export function useNavbarActiveItem(items: LibUseNavbarActiveItemItems): LibUseNavbarActiveItemReturns {
  const pathname: LibUseNavbarActiveItemPathname = useLocation()['pathname'];

  let bestKey: LibUseNavbarActiveItemBestKey = null;
  let bestScore: LibUseNavbarActiveItemBestScore = -1;

  for (let i = 0; i < items.length; i += 1) {
    const item: LibUseNavbarActiveItemItem = items[i] as LibUseNavbarActiveItemItem;
    const itemType: LibUseNavbarActiveItemItemType = item['type'];

    if (itemType !== undefined && nonLinkTypes.has(itemType) === true) {
      continue;
    }

    const label: LibUseNavbarActiveItemItemLabelOrSkip = item['label'];

    if (label === undefined) {
      continue;
    }

    const claimLength: LibUseNavbarActiveItemClaimLength = getClaimLength(item, pathname);

    if (claimLength !== null && claimLength > bestScore) {
      bestKey = label;
      bestScore = claimLength;
    }
  }

  return bestKey;
}

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
  Lib_UseNavbarActiveItem_BestKey,
  Lib_UseNavbarActiveItem_BestScore,
  Lib_UseNavbarActiveItem_ClaimLength,
  Lib_UseNavbarActiveItem_GetClaimLength_Base,
  Lib_UseNavbarActiveItem_GetClaimLength_ClaimBase,
  Lib_UseNavbarActiveItem_GetClaimLength_Match,
  Lib_UseNavbarActiveItem_GetClaimLength_MatchedSubstring,
  Lib_UseNavbarActiveItem_GetClaimLength_Normalized,
  Lib_UseNavbarActiveItem_GetClaimLength_Pathname,
  Lib_UseNavbarActiveItem_GetClaimLength_Returns,
  Lib_UseNavbarActiveItem_GetClaimLength_To,
  Lib_UseNavbarActiveItem_Item,
  Lib_UseNavbarActiveItem_ItemLabelOrSkip,
  Lib_UseNavbarActiveItem_Items,
  Lib_UseNavbarActiveItem_Item_Type,
  Lib_UseNavbarActiveItem_NonLinkTypes,
  Lib_UseNavbarActiveItem_NormalizeBase_Input,
  Lib_UseNavbarActiveItem_NormalizeBase_Returns,
  Lib_UseNavbarActiveItem_Pathname,
  Lib_UseNavbarActiveItem_Returns,
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
const nonLinkTypes: Lib_UseNavbarActiveItem_NonLinkTypes = new Set([
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
 * @param {Lib_UseNavbarActiveItem_NormalizeBase_Input} base - Base.
 *
 * @returns {Lib_UseNavbarActiveItem_NormalizeBase_Returns}
 *
 * @since 0.18.0
 */
function normalizeBase(base: Lib_UseNavbarActiveItem_NormalizeBase_Input): Lib_UseNavbarActiveItem_NormalizeBase_Returns {
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
 * @param {Lib_UseNavbarActiveItem_Item}                   item     - Item.
 * @param {Lib_UseNavbarActiveItem_GetClaimLength_Pathname} pathname - Pathname.
 *
 * @returns {Lib_UseNavbarActiveItem_GetClaimLength_Returns}
 *
 * @since 0.18.0
 */
function getClaimLength(item: Lib_UseNavbarActiveItem_Item, pathname: Lib_UseNavbarActiveItem_GetClaimLength_Pathname): Lib_UseNavbarActiveItem_GetClaimLength_Returns {
  if (item['activeBaseRegex'] !== undefined) {
    let match: Lib_UseNavbarActiveItem_GetClaimLength_Match = null;

    try {
      match = pathname.match(new RegExp(item['activeBaseRegex']));
    } catch {
      // Invalid regex falls through to other claim sources.
      match = null;
    }

    if (match !== null) {
      const matched: Lib_UseNavbarActiveItem_GetClaimLength_MatchedSubstring = match[0];

      return matched.length;
    }
  }

  const claimBase: Lib_UseNavbarActiveItem_GetClaimLength_ClaimBase = item['claimBase'];
  const to: Lib_UseNavbarActiveItem_GetClaimLength_To = item['to'];
  const base: Lib_UseNavbarActiveItem_GetClaimLength_Base = (claimBase !== undefined) ? claimBase : to;

  if (base === undefined) {
    return null;
  }

  const normalized: Lib_UseNavbarActiveItem_GetClaimLength_Normalized = normalizeBase(base);

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
 * @param {Lib_UseNavbarActiveItem_Items} items - Items.
 *
 * @returns {Lib_UseNavbarActiveItem_Returns}
 *
 * @since 0.18.0
 */
export function useNavbarActiveItem(items: Lib_UseNavbarActiveItem_Items): Lib_UseNavbarActiveItem_Returns {
  const pathname: Lib_UseNavbarActiveItem_Pathname = useLocation()['pathname'];

  let bestKey: Lib_UseNavbarActiveItem_BestKey = null;
  let bestScore: Lib_UseNavbarActiveItem_BestScore = -1;

  for (let i = 0; i < items.length; i += 1) {
    const item: Lib_UseNavbarActiveItem_Item = items[i] as Lib_UseNavbarActiveItem_Item;
    const itemType: Lib_UseNavbarActiveItem_Item_Type = item['type'];

    if (itemType !== undefined && nonLinkTypes.has(itemType) === true) {
      continue;
    }

    const label: Lib_UseNavbarActiveItem_ItemLabelOrSkip = item['label'];

    if (label === undefined) {
      continue;
    }

    const claimLength: Lib_UseNavbarActiveItem_ClaimLength = getClaimLength(item, pathname);

    if (claimLength !== null && claimLength > bestScore) {
      bestKey = label;
      bestScore = claimLength;
    }
  }

  return bestKey;
}

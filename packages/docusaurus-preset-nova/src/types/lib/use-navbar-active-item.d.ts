/**
 * Lib - Use Navbar Active Item.
 *
 * @since 0.18.0
 */
export type LibUseNavbarActiveItemItem = {
  type?: LibUseNavbarActiveItemItemType;
  label?: LibUseNavbarActiveItemItemLabel;
  to?: LibUseNavbarActiveItemItemTo;
  href?: LibUseNavbarActiveItemItemHref;
  activeBaseRegex?: LibUseNavbarActiveItemItemActiveBaseRegex;
  claimBase?: LibUseNavbarActiveItemItemClaimBase;
  [key: string]: unknown;
};

export type LibUseNavbarActiveItemItems = readonly LibUseNavbarActiveItemItem[];

export type LibUseNavbarActiveItemItemType = string | undefined;

export type LibUseNavbarActiveItemItemLabel = string | undefined;

export type LibUseNavbarActiveItemItemTo = string | undefined;

export type LibUseNavbarActiveItemItemHref = string | undefined;

export type LibUseNavbarActiveItemItemActiveBaseRegex = string | undefined;

export type LibUseNavbarActiveItemItemClaimBase = string | undefined;

/**
 * Lib - Use Navbar Active Item - Get Claim Length.
 *
 * @since 0.18.0
 */
export type LibUseNavbarActiveItemGetClaimLengthPathname = string;

export type LibUseNavbarActiveItemGetClaimLengthReturns = number | null;

export type LibUseNavbarActiveItemGetClaimLengthMatch = RegExpMatchArray | null;

export type LibUseNavbarActiveItemGetClaimLengthMatchedSubstring = string;

export type LibUseNavbarActiveItemGetClaimLengthClaimBase = string | undefined;

export type LibUseNavbarActiveItemGetClaimLengthTo = string | undefined;

export type LibUseNavbarActiveItemGetClaimLengthBase = string | undefined;

export type LibUseNavbarActiveItemGetClaimLengthNormalized = string;

/**
 * Lib - Use Navbar Active Item - Non Link Types.
 *
 * @since 0.18.0
 */
export type LibUseNavbarActiveItemNonLinkTypes = ReadonlySet<string>;

/**
 * Lib - Use Navbar Active Item - Normalize Base.
 *
 * @since 0.18.0
 */
export type LibUseNavbarActiveItemNormalizeBaseInput = string;

export type LibUseNavbarActiveItemNormalizeBaseReturns = string;

/**
 * Lib - Use Navbar Active Item - Use Navbar Active Item.
 *
 * @since 0.18.0
 */
export type LibUseNavbarActiveItemReturns = string | null;

export type LibUseNavbarActiveItemPathname = string;

export type LibUseNavbarActiveItemBestKey = string | null;

export type LibUseNavbarActiveItemBestScore = number;

export type LibUseNavbarActiveItemItemLabelOrSkip = string | undefined;

export type LibUseNavbarActiveItemClaimLength = number | null;

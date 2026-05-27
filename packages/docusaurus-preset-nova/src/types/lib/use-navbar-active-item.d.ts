/**
 * Lib - Use Navbar Active Item.
 *
 * @since 0.18.0
 */
export type Lib_UseNavbarActiveItem_Item = {
  type?: Lib_UseNavbarActiveItem_Item_Type;
  label?: Lib_UseNavbarActiveItem_Item_Label;
  to?: Lib_UseNavbarActiveItem_Item_To;
  href?: Lib_UseNavbarActiveItem_Item_Href;
  activeBaseRegex?: Lib_UseNavbarActiveItem_Item_ActiveBaseRegex;
  claimBase?: Lib_UseNavbarActiveItem_Item_ClaimBase;
  [key: string]: unknown;
};

export type Lib_UseNavbarActiveItem_Items = readonly Lib_UseNavbarActiveItem_Item[];

export type Lib_UseNavbarActiveItem_Item_Type = string | undefined;

export type Lib_UseNavbarActiveItem_Item_Label = string | undefined;

export type Lib_UseNavbarActiveItem_Item_To = string | undefined;

export type Lib_UseNavbarActiveItem_Item_Href = string | undefined;

export type Lib_UseNavbarActiveItem_Item_ActiveBaseRegex = string | undefined;

export type Lib_UseNavbarActiveItem_Item_ClaimBase = string | undefined;

/**
 * Lib - Use Navbar Active Item - Get Claim Length.
 *
 * @since 0.18.0
 */
export type Lib_UseNavbarActiveItem_GetClaimLength_Pathname = string;

export type Lib_UseNavbarActiveItem_GetClaimLength_Returns = number | null;

export type Lib_UseNavbarActiveItem_GetClaimLength_Match = RegExpMatchArray | null;

export type Lib_UseNavbarActiveItem_GetClaimLength_MatchedSubstring = string;

export type Lib_UseNavbarActiveItem_GetClaimLength_ClaimBase = string | undefined;

export type Lib_UseNavbarActiveItem_GetClaimLength_To = string | undefined;

export type Lib_UseNavbarActiveItem_GetClaimLength_Base = string | undefined;

export type Lib_UseNavbarActiveItem_GetClaimLength_Normalized = string;

/**
 * Lib - Use Navbar Active Item - Non Link Types.
 *
 * @since 0.18.0
 */
export type Lib_UseNavbarActiveItem_NonLinkTypes = ReadonlySet<string>;

/**
 * Lib - Use Navbar Active Item - Normalize Base.
 *
 * @since 0.18.0
 */
export type Lib_UseNavbarActiveItem_NormalizeBase_Input = string;

export type Lib_UseNavbarActiveItem_NormalizeBase_Returns = string;

/**
 * Lib - Use Navbar Active Item - Use Navbar Active Item.
 *
 * @since 0.18.0
 */
export type Lib_UseNavbarActiveItem_Returns = string | null;

export type Lib_UseNavbarActiveItem_Pathname = string;

export type Lib_UseNavbarActiveItem_BestKey = string | null;

export type Lib_UseNavbarActiveItem_BestScore = number;

export type Lib_UseNavbarActiveItem_ItemLabelOrSkip = string | undefined;

export type Lib_UseNavbarActiveItem_ClaimLength = number | null;

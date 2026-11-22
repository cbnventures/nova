import type {
  CSSProperties,
  JSX,
  MutableRefObject,
} from 'react';

import type { Theme_Navbar_Index_Navbar_Item, Theme_Navbar_Index_Navbar_Items } from '../index.d.ts';

/**
 * Theme - Navbar - More.
 *
 * @since 0.18.0
 */
export type Theme_Navbar_More_Index_More_Props_Items = Theme_Navbar_Index_Navbar_Items;

export type Theme_Navbar_More_Index_More_Props_ActiveItemLabel = string | null;

export type Theme_Navbar_More_Index_More_Props_ClassName = string | undefined;

export type Theme_Navbar_More_Index_More_Props_Style = CSSProperties | undefined;

export type Theme_Navbar_More_Index_More_Props = {
  items: Theme_Navbar_More_Index_More_Props_Items;
  activeItemLabel: Theme_Navbar_More_Index_More_Props_ActiveItemLabel;
  className?: Theme_Navbar_More_Index_More_Props_ClassName;
  style?: Theme_Navbar_More_Index_More_Props_Style;
};

export type Theme_Navbar_More_Index_More_Returns = JSX.Element;

export type Theme_Navbar_More_Index_More_Items = Theme_Navbar_Index_Navbar_Items;

export type Theme_Navbar_More_Index_More_ActiveItemLabel = string | null;

export type Theme_Navbar_More_Index_More_Pathname = string;

export type Theme_Navbar_More_Index_More_DetailsRef = MutableRefObject<HTMLDetailsElement | null>;

export type Theme_Navbar_More_Index_More_GroupIdPrefix = string;

export type Theme_Navbar_More_Index_More_Label = string;

export type Theme_Navbar_More_Index_More_Item = Theme_Navbar_Index_Navbar_Item;

export type Theme_Navbar_More_Index_More_ItemIndex = number;

export type Theme_Navbar_More_Index_More_ItemKey = string;

export type Theme_Navbar_More_Index_More_ItemType = string | undefined;

export type Theme_Navbar_More_Index_More_ItemChildren = Record<string, unknown>[] | undefined;

export type Theme_Navbar_More_Index_More_GroupLabelId = string;

export type Theme_Navbar_More_Index_More_GroupClassName = string;

export type Theme_Navbar_More_Index_More_ChildItem = Record<string, unknown>;

export type Theme_Navbar_More_Index_More_ChildLabel = string | undefined;

export type Theme_Navbar_More_Index_More_ChildKey = string;

export type Theme_Navbar_More_Index_More_ChildTo = string | undefined;

export type Theme_Navbar_More_Index_More_ChildIsActive = boolean;

export type Theme_Navbar_More_Index_More_ItemSpread = Record<string, unknown>;

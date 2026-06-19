import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Tab Item - Tab Item.
 *
 * @since 0.15.0
 */
export type Theme_TabItem_Index_TabItem_Props_Children = ReactNode;

export type Theme_TabItem_Index_TabItem_Props_Value = string;

export type Theme_TabItem_Index_TabItem_Props_ClassName = string | undefined;

export type Theme_TabItem_Index_TabItem_Props_Style = CSSProperties | undefined;

export type Theme_TabItem_Index_TabItem_Props = {
  children: Theme_TabItem_Index_TabItem_Props_Children;
  value: Theme_TabItem_Index_TabItem_Props_Value;
  className?: Theme_TabItem_Index_TabItem_Props_ClassName;
  style?: Theme_TabItem_Index_TabItem_Props_Style;
  [key: string]: unknown;
};

export type Theme_TabItem_Index_TabItem_Tabs_SelectedValue = string;

export type Theme_TabItem_Index_TabItem_Tabs = {
  selectedValue: Theme_TabItem_Index_TabItem_Tabs_SelectedValue;
};

export type Theme_TabItem_Index_TabItem_PanelId = string;

export type Theme_TabItem_Index_TabItem_AriaLabelledBy = string;

export type Theme_TabItem_Index_TabItem_Hidden = boolean;

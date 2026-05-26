import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Tab Item - Tab Item.
 *
 * @since 0.15.0
 */
export type ThemeTabItemTabItemPropsChildren = ReactNode;

export type ThemeTabItemTabItemPropsValue = string;

export type ThemeTabItemTabItemPropsClassName = string | undefined;

export type ThemeTabItemTabItemPropsStyle = CSSProperties | undefined;

export type ThemeTabItemTabItemProps = {
  children: ThemeTabItemTabItemPropsChildren;
  value: ThemeTabItemTabItemPropsValue;
  className?: ThemeTabItemTabItemPropsClassName;
  style?: ThemeTabItemTabItemPropsStyle;
  [key: string]: unknown;
};

export type ThemeTabItemTabItemTabs = {
  selectedValue: string;
};

export type ThemeTabItemTabItemPanelId = string;

export type ThemeTabItemTabItemAriaLabelledBy = string;

export type ThemeTabItemTabItemHidden = boolean;

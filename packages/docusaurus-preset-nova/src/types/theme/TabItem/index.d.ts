import type { ReactNode } from 'react';

/**
 * Theme - Tab Item - Tab Item.
 *
 * @since 0.15.0
 */
export type ThemeTabItemTabItemPropsChildren = ReactNode;

export type ThemeTabItemTabItemPropsValue = string;

export type ThemeTabItemTabItemProps = {
  children: ThemeTabItemTabItemPropsChildren;
  value: ThemeTabItemTabItemPropsValue;
  [key: string]: unknown;
};

export type ThemeTabItemTabItemTabs = {
  selectedValue: string;
};

export type ThemeTabItemTabItemPanelId = string;

export type ThemeTabItemTabItemAriaLabelledBy = string;

export type ThemeTabItemTabItemHidden = boolean;

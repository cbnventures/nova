import type {
  CSSProperties,
  JSX,
  MutableRefObject,
} from 'react';

import type { ThemeNavbarItem, ThemeNavbarItems } from '../index.d.ts';

/**
 * Theme - Navbar - More.
 *
 * @since 0.18.0
 */
export type ThemeNavbarMorePropsItems = ThemeNavbarItems;

export type ThemeNavbarMorePropsActiveItemLabel = string | null;

export type ThemeNavbarMorePropsClassName = string | undefined;

export type ThemeNavbarMorePropsStyle = CSSProperties | undefined;

export type ThemeNavbarMoreProps = {
  items: ThemeNavbarMorePropsItems;
  activeItemLabel: ThemeNavbarMorePropsActiveItemLabel;
  className?: ThemeNavbarMorePropsClassName;
  style?: ThemeNavbarMorePropsStyle;
};

export type ThemeNavbarMoreReturns = JSX.Element;

export type ThemeNavbarMoreItems = ThemeNavbarItems;

export type ThemeNavbarMoreActiveItemLabel = string | null;

export type ThemeNavbarMoreDetailsRef = MutableRefObject<HTMLDetailsElement | null>;

export type ThemeNavbarMoreMoreLabel = string;

export type ThemeNavbarMoreItem = ThemeNavbarItem;

export type ThemeNavbarMoreItemKey = string;

export type ThemeNavbarMoreItemSpread = Record<string, unknown>;

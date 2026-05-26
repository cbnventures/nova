import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type {
  CSSProperties,
  ReactNode,
} from 'react';

/**
 * Theme - Doc Root - Layout - Doc Root Layout.
 *
 * @since 0.15.0
 */
export type ThemeDocRootLayoutDocRootLayoutPropsChildren = ReactNode;

export type ThemeDocRootLayoutDocRootLayoutPropsClassName = string | undefined;

export type ThemeDocRootLayoutDocRootLayoutPropsStyle = CSSProperties | undefined;

export type ThemeDocRootLayoutDocRootLayoutProps = {
  children: ThemeDocRootLayoutDocRootLayoutPropsChildren;
  className?: ThemeDocRootLayoutDocRootLayoutPropsClassName;
  style?: ThemeDocRootLayoutDocRootLayoutPropsStyle;
  [key: string]: unknown;
};

export type ThemeDocRootLayoutDocRootLayoutSidebar = {
  items: ThemeDocRootLayoutDocRootLayoutSidebarItems;
  [key: string]: unknown;
} | null;

export type ThemeDocRootLayoutDocRootLayoutSidebarItems = PropSidebarItem[];

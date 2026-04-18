import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { ReactNode } from 'react';

/**
 * Theme - Doc Root - Layout - Doc Root Layout.
 *
 * @since 0.15.0
 */
export type ThemeDocRootLayoutDocRootLayoutPropsChildren = ReactNode;

export type ThemeDocRootLayoutDocRootLayoutProps = {
  children: ThemeDocRootLayoutDocRootLayoutPropsChildren;
  [key: string]: unknown;
};

export type ThemeDocRootLayoutDocRootLayoutSidebar = {
  items: ThemeDocRootLayoutDocRootLayoutSidebarItems;
  [key: string]: unknown;
} | null;

export type ThemeDocRootLayoutDocRootLayoutSidebarItems = PropSidebarItem[];

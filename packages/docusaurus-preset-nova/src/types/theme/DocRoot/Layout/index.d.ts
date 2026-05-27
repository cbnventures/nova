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
export type Theme_DocRoot_Layout_Index_DocRootLayout_Props_Children = ReactNode;

export type Theme_DocRoot_Layout_Index_DocRootLayout_Props_ClassName = string | undefined;

export type Theme_DocRoot_Layout_Index_DocRootLayout_Props_Style = CSSProperties | undefined;

export type Theme_DocRoot_Layout_Index_DocRootLayout_Props = {
  children: Theme_DocRoot_Layout_Index_DocRootLayout_Props_Children;
  className?: Theme_DocRoot_Layout_Index_DocRootLayout_Props_ClassName;
  style?: Theme_DocRoot_Layout_Index_DocRootLayout_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocRoot_Layout_Index_DocRootLayout_Sidebar = {
  items: Theme_DocRoot_Layout_Index_DocRootLayout_Sidebar_Items;
  [key: string]: unknown;
} | null;

export type Theme_DocRoot_Layout_Index_DocRootLayout_Sidebar_Items = PropSidebarItem[];

import type { PropSidebarItem } from '@docusaurus/plugin-content-docs';
import type { Props as DocRootModuleProps } from '@theme/DocRoot';
import type {
  CSSProperties,
  ReactNode,
} from 'react';

/**
 * Theme - Doc Root - Doc Root.
 *
 * @since 0.15.0
 */
export type Theme_DocRoot_Index_DocRoot_PropsClassName = string | undefined;

export type Theme_DocRoot_Index_DocRoot_PropsStyle = CSSProperties | undefined;

export type Theme_DocRoot_Index_DocRoot_Props = DocRootModuleProps & {
  className?: Theme_DocRoot_Index_DocRoot_PropsClassName;
  style?: Theme_DocRoot_Index_DocRoot_PropsStyle;
};

export type Theme_DocRoot_Index_DocRoot_RouteMetadata_DocElement = ReactNode;

export type Theme_DocRoot_Index_DocRoot_RouteMetadata_SidebarName = string | undefined;

export type Theme_DocRoot_Index_DocRoot_RouteMetadata_SidebarItems = PropSidebarItem[] | undefined;

export type Theme_DocRoot_Index_DocRoot_RouteMetadata = {
  docElement: Theme_DocRoot_Index_DocRoot_RouteMetadata_DocElement;
  sidebarName: Theme_DocRoot_Index_DocRoot_RouteMetadata_SidebarName;
  sidebarItems: Theme_DocRoot_Index_DocRoot_RouteMetadata_SidebarItems;
  [key: string]: unknown;
} | null;

export type Theme_DocRoot_Index_DocRoot_MergedClassName = string;

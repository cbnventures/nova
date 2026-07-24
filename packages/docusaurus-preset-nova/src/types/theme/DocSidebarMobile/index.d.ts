import type { PropSidebarBreadcrumbsItem } from '@docusaurus/plugin-content-docs';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Doc Sidebar Mobile - Doc Sidebar Mobile.
 *
 * @since 0.15.0
 */
export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Props_ClassName = string | undefined;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Props_Style = CSSProperties | undefined;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Props = {
  className?: Theme_DocSidebarMobile_Index_DocSidebarMobile_Props_ClassName;
  style?: Theme_DocSidebarMobile_Index_DocSidebarMobile_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Breadcrumbs = PropSidebarBreadcrumbsItem[] | null;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_OpenAriaLabel = string;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_Separator = ReactNode;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbItem = PropSidebarBreadcrumbsItem;

export type Theme_DocSidebarMobile_Index_DocSidebarMobile_BreadcrumbIndex = number;

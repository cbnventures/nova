import type { CSSProperties } from 'react';

/**
 * Theme - Doc Breadcrumbs - Doc Breadcrumbs.
 *
 * @since 0.15.0
 */
export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Props_ClassName = string | undefined;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Props_Style = CSSProperties | undefined;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Props = {
  className?: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Props_ClassName;
  style?: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Props_Style;
  [key: string]: unknown;
};

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Breadcrumbs = Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem[] | null;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_HomePageRoute = Record<string, unknown> | undefined;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_HomeHref = string;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_NavAriaLabel = string;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_HomeAriaLabel = string;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem_Type = string;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem_Label = string;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem_Href = string | undefined;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem_LinkUnlisted = boolean | undefined;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem = {
  type: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem_Type;
  label: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem_Label;
  href?: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem_Href;
  linkUnlisted?: Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbItem_LinkUnlisted;
  [key: string]: unknown;
};

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_Index = number;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_IsLast = boolean;

export type Theme_DocBreadcrumbs_Index_DocBreadcrumbs_BreadcrumbHref = string | undefined;

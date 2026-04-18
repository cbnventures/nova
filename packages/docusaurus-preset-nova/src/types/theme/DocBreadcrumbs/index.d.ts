/**
 * Theme - Doc Breadcrumbs - Doc Breadcrumbs.
 *
 * @since 0.15.0
 */
export type ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbs = ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItem[] | null;

export type ThemeDocBreadcrumbsDocBreadcrumbsHomePageRoute = Record<string, unknown> | undefined;

export type ThemeDocBreadcrumbsDocBreadcrumbsHomeHref = string;

export type ThemeDocBreadcrumbsDocBreadcrumbsNavAriaLabel = string;

export type ThemeDocBreadcrumbsDocBreadcrumbsHomeAriaLabel = string;

export type ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItemType = string;

export type ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItemLabel = string;

export type ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItemHref = string | undefined;

export type ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItemLinkUnlisted = boolean | undefined;

export type ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItem = {
  type: ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItemType;
  label: ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItemLabel;
  href?: ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItemHref;
  linkUnlisted?: ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbItemLinkUnlisted;
  [key: string]: unknown;
};

export type ThemeDocBreadcrumbsDocBreadcrumbsIndex = number;

export type ThemeDocBreadcrumbsDocBreadcrumbsIsLast = boolean;

export type ThemeDocBreadcrumbsDocBreadcrumbsBreadcrumbHref = string | undefined;

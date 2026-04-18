/**
 * Theme - Doc Paginator - Doc Paginator.
 *
 * @since 0.15.0
 */
export type ThemeDocPaginatorDocPaginatorNavLinkPermalink = string;

export type ThemeDocPaginatorDocPaginatorNavLinkTitle = string;

export type ThemeDocPaginatorDocPaginatorNavLinkDescription = string | undefined;

export type ThemeDocPaginatorDocPaginatorNavLink = {
  permalink: ThemeDocPaginatorDocPaginatorNavLinkPermalink;
  title: ThemeDocPaginatorDocPaginatorNavLinkTitle;
  description?: ThemeDocPaginatorDocPaginatorNavLinkDescription;
};

export type ThemeDocPaginatorDocPaginatorPropsClassName = string | undefined;

export type ThemeDocPaginatorDocPaginatorPropsPrevious = ThemeDocPaginatorDocPaginatorNavLink | undefined;

export type ThemeDocPaginatorDocPaginatorPropsNext = ThemeDocPaginatorDocPaginatorNavLink | undefined;

export type ThemeDocPaginatorDocPaginatorProps = {
  className?: ThemeDocPaginatorDocPaginatorPropsClassName;
  previous?: ThemeDocPaginatorDocPaginatorPropsPrevious;
  next?: ThemeDocPaginatorDocPaginatorPropsNext;
  [key: string]: unknown;
};

export type ThemeDocPaginatorDocPaginatorAriaLabel = string;

export type ThemeDocPaginatorDocPaginatorNavAriaLabel = string;

export type ThemeDocPaginatorDocPaginatorHeading = string;

export type ThemeDocPaginatorDocPaginatorGoBackLabel = string;

export type ThemeDocPaginatorDocPaginatorContinueReadingLabel = string;

export type ThemeDocPaginatorDocPaginatorGoBackAriaLabel = string;

export type ThemeDocPaginatorDocPaginatorContinueReadingAriaLabel = string;

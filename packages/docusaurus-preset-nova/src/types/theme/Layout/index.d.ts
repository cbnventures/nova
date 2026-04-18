import type { ReactNode } from 'react';

/**
 * Theme - Layout.
 *
 * @since 0.15.0
 */
export type ThemeLayoutPropsChildren = ReactNode;

export type ThemeLayoutPropsNoFooter = boolean | undefined;

export type ThemeLayoutPropsTitle = string | undefined;

export type ThemeLayoutPropsDescription = string | undefined;

export type ThemeLayoutPropsWrapperClassName = string | undefined;

export type ThemeLayoutProps = {
  children: ThemeLayoutPropsChildren;
  noFooter?: ThemeLayoutPropsNoFooter;
  title?: ThemeLayoutPropsTitle;
  description?: ThemeLayoutPropsDescription;
  wrapperClassName?: ThemeLayoutPropsWrapperClassName;
  [key: string]: unknown;
};

export type ThemeLayoutMetadataSpread = Record<string, unknown>;

import type { ReactNode } from 'react';

/**
 * Theme - Heading.
 *
 * @since 0.15.0
 */
export type ThemeHeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type ThemeHeadingPropsAs = ThemeHeadingAs;

export type ThemeHeadingPropsId = string | undefined;

export type ThemeHeadingPropsChildren = ReactNode;

export type ThemeHeadingPropsClassName = string | undefined;

export type ThemeHeadingProps = {
  as: ThemeHeadingPropsAs;
  id?: ThemeHeadingPropsId;
  children?: ThemeHeadingPropsChildren;
  className?: ThemeHeadingPropsClassName;
  [key: string]: unknown;
};

export type ThemeHeadingId = string | undefined;

export type ThemeHeadingBrokenLinksCollectAnchor = (anchor: string) => void;

export type ThemeHeadingBrokenLinksCollectAnchorValue = ThemeHeadingBrokenLinksCollectAnchor;

export type ThemeHeadingBrokenLinks = {
  collectAnchor: ThemeHeadingBrokenLinksCollectAnchorValue;
  [key: string]: unknown;
};

export type ThemeHeadingHashLinkLabel = string;

export type ThemeHeadingHashLink = ReactNode;

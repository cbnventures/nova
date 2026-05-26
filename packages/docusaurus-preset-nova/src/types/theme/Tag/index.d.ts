import type { CSSProperties } from 'react';

/**
 * Theme - Tag.
 *
 * @since 0.15.0
 */
export type ThemeTagPropsPermalink = string;

export type ThemeTagPropsLabel = string;

export type ThemeTagPropsCount = number | undefined;

export type ThemeTagPropsDescription = string | undefined;

export type ThemeTagPropsClassName = string | undefined;

export type ThemeTagPropsStyle = CSSProperties | undefined;

export type ThemeTagProps = {
  permalink: ThemeTagPropsPermalink;
  label: ThemeTagPropsLabel;
  count?: ThemeTagPropsCount;
  description?: ThemeTagPropsDescription;
  className?: ThemeTagPropsClassName;
  style?: ThemeTagPropsStyle;
  [key: string]: unknown;
};

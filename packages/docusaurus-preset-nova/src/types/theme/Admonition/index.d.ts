import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Admonition.
 *
 * @since 0.15.0
 */
export type ThemeAdmonitionPropsType = string;

export type ThemeAdmonitionPropsTitle = ReactNode;

export type ThemeAdmonitionPropsChildren = ReactNode;

export type ThemeAdmonitionPropsClassName = string | undefined;

export type ThemeAdmonitionPropsStyle = CSSProperties | undefined;

export type ThemeAdmonitionProps = {
  type: ThemeAdmonitionPropsType;
  title?: ThemeAdmonitionPropsTitle;
  children?: ThemeAdmonitionPropsChildren;
  className?: ThemeAdmonitionPropsClassName;
  style?: ThemeAdmonitionPropsStyle;
  [key: string]: unknown;
};

export type ThemeAdmonitionTitle = ReactNode;

export type ThemeAdmonitionIconName = string;

/**
 * Theme - Admonition - Icons.
 *
 * @since 0.15.0
 */
export type ThemeAdmonitionIcons = Record<string, string>;

/**
 * Theme - Admonition - Type Labels.
 *
 * @since 0.18.0
 */
export type ThemeAdmonitionTypeLabels = Record<string, string>;

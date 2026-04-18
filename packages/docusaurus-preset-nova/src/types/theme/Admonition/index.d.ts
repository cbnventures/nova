import type { ReactNode } from 'react';

/**
 * Theme - Admonition.
 *
 * @since 0.15.0
 */
export type ThemeAdmonitionPropsType = string;

export type ThemeAdmonitionPropsTitle = ReactNode;

export type ThemeAdmonitionPropsChildren = ReactNode;

export type ThemeAdmonitionProps = {
  type: ThemeAdmonitionPropsType;
  title?: ThemeAdmonitionPropsTitle;
  children?: ThemeAdmonitionPropsChildren;
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

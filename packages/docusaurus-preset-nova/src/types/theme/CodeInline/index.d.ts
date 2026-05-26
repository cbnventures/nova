import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Code Inline - Code Inline.
 *
 * @since 0.15.0
 */
export type ThemeCodeInlineCodeInlinePropsChildren = ReactNode;

export type ThemeCodeInlineCodeInlinePropsClassName = string | undefined;

export type ThemeCodeInlineCodeInlinePropsStyle = CSSProperties | undefined;

export type ThemeCodeInlineCodeInlineProps = {
  children: ThemeCodeInlineCodeInlinePropsChildren;
  className?: ThemeCodeInlineCodeInlinePropsClassName;
  style?: ThemeCodeInlineCodeInlinePropsStyle;
  [key: string]: unknown;
};

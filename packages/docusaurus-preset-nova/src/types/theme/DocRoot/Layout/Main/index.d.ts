import type {
  CSSProperties,
  ReactNode,
} from 'react';

/**
 * Theme - Doc Root - Layout - Main - Doc Root Layout Main.
 *
 * @since 0.15.0
 */
export type ThemeDocRootLayoutMainDocRootLayoutMainPropsChildren = ReactNode;

export type ThemeDocRootLayoutMainDocRootLayoutMainPropsClassName = string | undefined;

export type ThemeDocRootLayoutMainDocRootLayoutMainPropsStyle = CSSProperties | undefined;

export type ThemeDocRootLayoutMainDocRootLayoutMainProps = {
  children: ThemeDocRootLayoutMainDocRootLayoutMainPropsChildren;
  className?: ThemeDocRootLayoutMainDocRootLayoutMainPropsClassName;
  style?: ThemeDocRootLayoutMainDocRootLayoutMainPropsStyle;
  [key: string]: unknown;
};

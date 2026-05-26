import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Item - Toc - Mobile - Doc Item Toc Mobile.
 *
 * @since 0.15.0
 */
export type ThemeDocItemTocMobileDocItemTocMobilePropsClassName = string | undefined;

export type ThemeDocItemTocMobileDocItemTocMobilePropsStyle = CSSProperties | undefined;

export type ThemeDocItemTocMobileDocItemTocMobileProps = {
  className?: ThemeDocItemTocMobileDocItemTocMobilePropsClassName;
  style?: ThemeDocItemTocMobileDocItemTocMobilePropsStyle;
};

export type ThemeDocItemTocMobileDocItemTocMobileDoc = DocContextValue;

export type ThemeDocItemTocMobileDocItemTocMobileTocSpread = Record<string, unknown>;

export type ThemeDocItemTocMobileDocItemTocMobileMergedClassName = string;

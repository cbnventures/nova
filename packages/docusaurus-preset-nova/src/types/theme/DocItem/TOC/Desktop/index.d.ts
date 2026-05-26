import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';
import type { CSSProperties } from 'react';

/**
 * Theme - Doc Item - Toc - Desktop - Doc Item Toc Desktop.
 *
 * @since 0.15.0
 */
export type ThemeDocItemTocDesktopDocItemTocDesktopPropsClassName = string | undefined;

export type ThemeDocItemTocDesktopDocItemTocDesktopPropsStyle = CSSProperties | undefined;

export type ThemeDocItemTocDesktopDocItemTocDesktopProps = {
  className?: ThemeDocItemTocDesktopDocItemTocDesktopPropsClassName;
  style?: ThemeDocItemTocDesktopDocItemTocDesktopPropsStyle;
};

export type ThemeDocItemTocDesktopDocItemTocDesktopDoc = DocContextValue;

export type ThemeDocItemTocDesktopDocItemTocDesktopTocSpread = Record<string, unknown>;

export type ThemeDocItemTocDesktopDocItemTocDesktopMergedClassName = string;

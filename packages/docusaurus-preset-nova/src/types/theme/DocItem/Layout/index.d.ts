import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Doc Item - Layout - Doc Item Layout.
 *
 * @since 0.15.0
 */
export type ThemeDocItemLayoutDocItemLayoutPropsChildren = ReactNode;

export type ThemeDocItemLayoutDocItemLayoutPropsClassName = string | undefined;

export type ThemeDocItemLayoutDocItemLayoutPropsStyle = CSSProperties | undefined;

export type ThemeDocItemLayoutDocItemLayoutProps = {
  children: ThemeDocItemLayoutDocItemLayoutPropsChildren;
  className?: ThemeDocItemLayoutDocItemLayoutPropsClassName;
  style?: ThemeDocItemLayoutDocItemLayoutPropsStyle;
  [key: string]: unknown;
};

export type ThemeDocItemLayoutDocItemLayoutDoc = DocContextValue;

export type ThemeDocItemLayoutDocItemLayoutCanRenderToc = boolean;

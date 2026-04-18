import type { DocContextValue } from '@docusaurus/plugin-content-docs/client';
import type { ReactNode } from 'react';

/**
 * Theme - Doc Item - Layout - Doc Item Layout.
 *
 * @since 0.15.0
 */
export type ThemeDocItemLayoutDocItemLayoutPropsChildren = ReactNode;

export type ThemeDocItemLayoutDocItemLayoutProps = {
  children: ThemeDocItemLayoutDocItemLayoutPropsChildren;
  [key: string]: unknown;
};

export type ThemeDocItemLayoutDocItemLayoutDoc = DocContextValue;

export type ThemeDocItemLayoutDocItemLayoutCanRenderToc = boolean;

export type ThemeDocItemLayoutDocItemLayoutTocSpread = Record<string, unknown>;

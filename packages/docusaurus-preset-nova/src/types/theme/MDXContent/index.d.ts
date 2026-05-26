import type { MDXComponents } from 'mdx/types';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - MDX Content - MDX Content.
 *
 * @since 0.15.0
 */
export type ThemeMdxContentMdxContentPropsChildren = ReactNode;

export type ThemeMdxContentMdxContentPropsClassName = string | undefined;

export type ThemeMdxContentMdxContentPropsStyle = CSSProperties | undefined;

export type ThemeMdxContentMdxContentProps = {
  children: ThemeMdxContentMdxContentPropsChildren;
  className?: ThemeMdxContentMdxContentPropsClassName;
  style?: ThemeMdxContentMdxContentPropsStyle;
};

export type ThemeMdxContentMdxContentComponents = MDXComponents;

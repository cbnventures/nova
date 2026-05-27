import type { MDXComponents } from 'mdx/types';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - MDX Content - MDX Content.
 *
 * @since 0.15.0
 */
export type Theme_MdxContent_Index_MdxContent_Props_Children = ReactNode;

export type Theme_MdxContent_Index_MdxContent_Props_ClassName = string | undefined;

export type Theme_MdxContent_Index_MdxContent_Props_Style = CSSProperties | undefined;

export type Theme_MdxContent_Index_MdxContent_Props = {
  children: Theme_MdxContent_Index_MdxContent_Props_Children;
  className?: Theme_MdxContent_Index_MdxContent_Props_ClassName;
  style?: Theme_MdxContent_Index_MdxContent_Props_Style;
};

export type Theme_MdxContent_Index_MdxContent_Components = MDXComponents;

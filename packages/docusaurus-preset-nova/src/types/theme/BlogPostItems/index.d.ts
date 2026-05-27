import type { PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { ComponentType, CSSProperties, ReactNode } from 'react';

/**
 * Theme - Blog Post Items - Blog Post Items.
 *
 * @since 0.15.0
 */
export type Theme_BlogPostItems_Index_BlogPostItems_PropsComponentProps_Children = ReactNode;

export type Theme_BlogPostItems_Index_BlogPostItems_PropsComponentProps = {
  children: Theme_BlogPostItems_Index_BlogPostItems_PropsComponentProps_Children;
  [key: string]: unknown;
};

export type Theme_BlogPostItems_Index_BlogPostItems_Props_Component = ComponentType<Theme_BlogPostItems_Index_BlogPostItems_PropsComponentProps> | undefined;

export type Theme_BlogPostItems_Index_BlogPostItems_Props_Items = readonly Theme_BlogPostItems_Index_BlogPostItems_PropsItem[];

export type Theme_BlogPostItems_Index_BlogPostItems_Props_ClassName = string | undefined;

export type Theme_BlogPostItems_Index_BlogPostItems_Props_Style = CSSProperties | undefined;

export type Theme_BlogPostItems_Index_BlogPostItems_Props = {
  items: Theme_BlogPostItems_Index_BlogPostItems_Props_Items;
  component?: Theme_BlogPostItems_Index_BlogPostItems_Props_Component;
  className?: Theme_BlogPostItems_Index_BlogPostItems_Props_ClassName;
  style?: Theme_BlogPostItems_Index_BlogPostItems_Props_Style;
  [key: string]: unknown;
};

export type Theme_BlogPostItems_Index_BlogPostItems_PropsItem = {
  content: Theme_BlogPostItems_Index_BlogPostItems_PropsItem_Content;
  [key: string]: unknown;
};

export type Theme_BlogPostItems_Index_BlogPostItems_PropsItem_Content = PropBlogPostContent;

import type { PropBlogPostContent } from '@docusaurus/plugin-content-blog';
import type { ComponentType, ReactNode } from 'react';

/**
 * Theme - Blog Post Items - Blog Post Items.
 *
 * @since 0.15.0
 */
export type ThemeBlogPostItemsBlogPostItemsPropsComponentChildren = ReactNode;

export type ThemeBlogPostItemsBlogPostItemsPropsComponentProps = {
  children: ThemeBlogPostItemsBlogPostItemsPropsComponentChildren;
  [key: string]: unknown;
};

export type ThemeBlogPostItemsBlogPostItemsPropsComponent = ComponentType<ThemeBlogPostItemsBlogPostItemsPropsComponentProps> | undefined;

export type ThemeBlogPostItemsBlogPostItemsPropsItems = readonly ThemeBlogPostItemsBlogPostItemsPropsItem[];

export type ThemeBlogPostItemsBlogPostItemsProps = {
  items: ThemeBlogPostItemsBlogPostItemsPropsItems;
  component?: ThemeBlogPostItemsBlogPostItemsPropsComponent;
  [key: string]: unknown;
};

export type ThemeBlogPostItemsBlogPostItemsPropsItem = {
  content: ThemeBlogPostItemsBlogPostItemsPropsItemContent;
  [key: string]: unknown;
};

export type ThemeBlogPostItemsBlogPostItemsPropsItemContent = PropBlogPostContent;

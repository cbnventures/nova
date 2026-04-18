import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import type { ReactNode } from 'react';

/**
 * Theme - Blog Layout - Blog Layout.
 *
 * @since 0.15.0
 */
export type ThemeBlogLayoutSidebar = BlogSidebar;

export type ThemeBlogLayoutToc = ReactNode;

export type ThemeBlogLayoutChildren = ReactNode;

export type ThemeBlogLayoutPropsSidebar = BlogSidebar;

export type ThemeBlogLayoutPropsToc = ReactNode;

export type ThemeBlogLayoutPropsChildren = ReactNode;

export type ThemeBlogLayoutProps = {
  sidebar?: ThemeBlogLayoutPropsSidebar;
  toc?: ThemeBlogLayoutPropsToc;
  children: ThemeBlogLayoutPropsChildren;
  [key: string]: unknown;
};

export type ThemeBlogLayoutThemeConfigCast = unknown;

export type ThemeBlogLayoutThemeConfig = Record<string, unknown>;

export type ThemeBlogLayoutBlogConfigLayout = ThemeBlogLayoutBlogLayout;

export type ThemeBlogLayoutBlogConfig = {
  layout: ThemeBlogLayoutBlogConfigLayout;
  [key: string]: unknown;
};

export type ThemeBlogLayoutBlogLayoutHeading = string;

export type ThemeBlogLayoutBlogLayoutDescription = string;

export type ThemeBlogLayoutBlogLayout = {
  heading: ThemeBlogLayoutBlogLayoutHeading;
  description: ThemeBlogLayoutBlogLayoutDescription;
};

export type ThemeBlogLayoutHasSidebar = boolean;

export type ThemeBlogLayoutHasToc = boolean;

export type ThemeBlogLayoutMainClassName = string;

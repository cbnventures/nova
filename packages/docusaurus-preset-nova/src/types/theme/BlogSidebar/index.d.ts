import type { BlogSidebar, BlogSidebarItem } from '@docusaurus/plugin-content-blog';

/**
 * Theme - Blog Sidebar - Blog Sidebar.
 *
 * @since 0.15.0
 */
export type ThemeBlogSidebarBlogSidebarPropsSidebar = BlogSidebar | undefined;

export type ThemeBlogSidebarBlogSidebarProps = {
  sidebar?: ThemeBlogSidebarBlogSidebarPropsSidebar;
  [key: string]: unknown;
};

export type ThemeBlogSidebarBlogSidebarThemeConfigCast = unknown;

export type ThemeBlogSidebarBlogSidebarThemeConfig = Record<string, unknown>;

export type ThemeBlogSidebarBlogSidebarBlogConfigSidebar = ThemeBlogSidebarBlogSidebarSidebarConfig;

export type ThemeBlogSidebarBlogSidebarBlogConfig = {
  sidebar: ThemeBlogSidebarBlogSidebarBlogConfigSidebar;
  [key: string]: unknown;
};

export type ThemeBlogSidebarBlogSidebarSidebarConfigGroupByYear = boolean;

export type ThemeBlogSidebarBlogSidebarSidebarConfig = {
  groupByYear: ThemeBlogSidebarBlogSidebarSidebarConfigGroupByYear;
  [key: string]: unknown;
};

export type ThemeBlogSidebarBlogSidebarGroupByYear = boolean;

export type ThemeBlogSidebarBlogSidebarGlobalData = Record<string, unknown>;

export type ThemeBlogSidebarBlogSidebarBlogAuthors = ThemeBlogSidebarBlogSidebarBlogAuthor[];

export type ThemeBlogSidebarBlogSidebarAriaLabel = string;

export type ThemeBlogSidebarBlogSidebarAuthorsLabel = string;

export type ThemeBlogSidebarBlogSidebarSubscribeLabel = string;

export type ThemeBlogSidebarBlogSidebarFeedUrl = string;

export type ThemeBlogSidebarBlogSidebarCurrentYear = string;

export type ThemeBlogSidebarBlogSidebarSidebar = BlogSidebar;

export type ThemeBlogSidebarBlogSidebarTitle = string;

export type ThemeBlogSidebarBlogSidebarItems = BlogSidebarItem[];

export type ThemeBlogSidebarBlogSidebarItem = BlogSidebarItem;

export type ThemeBlogSidebarBlogSidebarItemDate = Date;

export type ThemeBlogSidebarBlogSidebarItemFullYear = number;

export type ThemeBlogSidebarBlogSidebarItemYear = string;

export type ThemeBlogSidebarBlogSidebarShowYearHeading = boolean;

export type ThemeBlogSidebarBlogSidebarBlogAuthorImageUrl = string | undefined;

export type ThemeBlogSidebarBlogSidebarBlogAuthorKey = string;

export type ThemeBlogSidebarBlogSidebarBlogAuthorName = string | undefined;

export type ThemeBlogSidebarBlogSidebarBlogAuthorPermalink = string | undefined;

export type ThemeBlogSidebarBlogSidebarBlogAuthor = {
  imageURL: ThemeBlogSidebarBlogSidebarBlogAuthorImageUrl;
  key: ThemeBlogSidebarBlogSidebarBlogAuthorKey;
  name: ThemeBlogSidebarBlogSidebarBlogAuthorName;
  permalink: ThemeBlogSidebarBlogSidebarBlogAuthorPermalink;
};

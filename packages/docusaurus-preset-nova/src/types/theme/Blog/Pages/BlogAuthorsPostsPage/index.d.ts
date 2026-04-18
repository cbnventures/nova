import type {
  AuthorItemProp,
  BlogPaginatedMetadata,
  BlogSidebar,
  PropBlogPostContent,
} from '@docusaurus/plugin-content-blog';

/**
 * Theme - Blog - Pages - Blog Authors Posts Page - Blog Authors Posts Page.
 *
 * @since 0.15.0
 */
export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsSidebar = BlogSidebar;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsAuthor = AuthorItemProp;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsListMetadata = BlogPaginatedMetadata;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItemContent = PropBlogPostContent;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItem = {
  content: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItemContent;
  [key: string]: unknown;
};

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItems = readonly ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItem[];

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageProps = {
  sidebar: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsSidebar;
  author: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsAuthor;
  listMetadata: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsListMetadata;
  items: ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItems;
  [key: string]: unknown;
};

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageItem = ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePropsItem;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageItemContent = PropBlogPostContent;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageAuthorName = string | undefined;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPageAuthorCount = number;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePostSuffix = string;

export type ThemeBlogPagesBlogAuthorsPostsPageBlogAuthorsPostsPagePostPluralSuffix = string;

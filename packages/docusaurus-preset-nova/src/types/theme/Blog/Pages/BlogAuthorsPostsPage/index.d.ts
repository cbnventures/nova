import type {
  AuthorItemProp,
  BlogPaginatedMetadata,
  BlogSidebar,
  PropBlogPostContent,
} from '@docusaurus/plugin-content-blog';
import type { useBlogMetadata } from '@docusaurus/plugin-content-blog/client';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog - Pages - Blog Authors Posts Page - Blog Authors Posts Page.
 *
 * @since 0.15.0
 */
export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_Sidebar = BlogSidebar;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_Author = AuthorItemProp;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_ListMetadata = BlogPaginatedMetadata;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_PropsItem_Content = PropBlogPostContent;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_PropsItem = {
  content: Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_PropsItem_Content;
  [key: string]: unknown;
};

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_Items = readonly Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_PropsItem[];

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_ClassName = string | undefined;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_Style = CSSProperties | undefined;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props = {
  sidebar: Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_Sidebar;
  author: Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_Author;
  listMetadata: Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_ListMetadata;
  items: Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_Items;
  className?: Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_ClassName;
  style?: Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Props_Style;
  [key: string]: unknown;
};

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Title = string;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Description = string | undefined;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_Item = Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_PropsItem;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_ItemContent = PropBlogPostContent;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_AuthorName = string | undefined;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_AuthorCount = number;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_PostSuffix = string;

export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_BlogAuthorsPostsPage_PostPluralSuffix = string;

/**
 * Theme - Blog - Pages - Blog Authors Posts Page - View All Authors Link.
 *
 * @since 0.18.0
 */
export type Theme_Blog_Pages_BlogAuthorsPostsPage_Index_ViewAllAuthorsLink_BlogMetadata = ReturnType<typeof useBlogMetadata>;

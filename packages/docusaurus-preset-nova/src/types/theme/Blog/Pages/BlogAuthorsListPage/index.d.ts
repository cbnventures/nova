import type { BlogSidebar } from '@docusaurus/plugin-content-blog';
import type { CSSProperties } from 'react';

/**
 * Theme - Blog - Pages - Blog Authors List Page.
 *
 * @since 0.15.0
 */
export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_AuthorImageUrl = string | undefined;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_AuthorTitle = string | undefined;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_AuthorPage = {
  permalink: string;
  [key: string]: unknown;
} | null | undefined;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_AuthorPermalink = string | undefined;

/**
 * Theme - Blog - Pages - Blog Authors List Page - Blog Authors List Page.
 *
 * @since 0.15.0
 */
export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props_Sidebar = BlogSidebar;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_PropsAuthor_Name = string | undefined;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_PropsAuthor_Key = string;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_PropsAuthor = {
  name: Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_PropsAuthor_Name;
  key: Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_PropsAuthor_Key;
  [key: string]: unknown;
};

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props_Authors = Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_PropsAuthor[];

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props_ClassName = string | undefined;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props_Style = CSSProperties | undefined;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props = {
  sidebar: Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props_Sidebar;
  authors: Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props_Authors;
  className?: Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props_ClassName;
  style?: Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Props_Style;
};

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Heading = string;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_Author = Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_PropsAuthor;

export type Theme_Blog_Pages_BlogAuthorsListPage_Index_BlogAuthorsListPage_AuthorCount = number | undefined;

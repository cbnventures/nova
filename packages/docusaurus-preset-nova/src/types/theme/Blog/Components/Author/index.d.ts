import type { CSSProperties } from 'react';

/**
 * Theme - Blog - Components - Author.
 *
 * @since 0.18.0
 */
export type Theme_Blog_Components_Author_Index_Author_Props_As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Theme_Blog_Components_Author_Index_Author_Props_Author_Page = {
  permalink: string;
} | null | undefined;

export type Theme_Blog_Components_Author_Index_Author_Props_ClassName = string | undefined;

export type Theme_Blog_Components_Author_Index_Author_Props_Style = CSSProperties | undefined;

export type Theme_Blog_Components_Author_Index_Author_Props = {
  author: Theme_Blog_Components_Author_Index_Author_Props_Author;
  as?: Theme_Blog_Components_Author_Index_Author_Props_As;
  count?: Theme_Blog_Components_Author_Index_Author_Props_Count;
  className?: Theme_Blog_Components_Author_Index_Author_Props_ClassName;
  style?: Theme_Blog_Components_Author_Index_Author_Props_Style;
};

export type Theme_Blog_Components_Author_Index_Author_Props_Author = {
  name?: string;
  imageURL?: string;
  url?: string;
  title?: string;
  email?: string;
  description?: string;
  page?: Theme_Blog_Components_Author_Index_Author_Props_Author_Page;
  socials?: Readonly<Record<string, string>>;
  [key: string]: unknown;
};

export type Theme_Blog_Components_Author_Index_Author_Props_Count = number | undefined;

export type Theme_Blog_Components_Author_Index_Author_Name = string | undefined;

export type Theme_Blog_Components_Author_Index_Author_Title = string | undefined;

export type Theme_Blog_Components_Author_Index_Author_ImageUrl = string | undefined;

export type Theme_Blog_Components_Author_Index_Author_Link = string | undefined;

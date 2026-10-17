import type { CSSProperties } from 'react';

/**
 * Theme - Blog - Components - Author.
 *
 * @since 0.18.0
 */
export type Theme_Blog_Components_Author_Index_Author_Props_Author_Name = string;

export type Theme_Blog_Components_Author_Index_Author_Props_Author_ImageURL = string;

export type Theme_Blog_Components_Author_Index_Author_Props_Author_Url = string;

export type Theme_Blog_Components_Author_Index_Author_Props_Author_Title = string;

export type Theme_Blog_Components_Author_Index_Author_Props_Author_Email = string;

export type Theme_Blog_Components_Author_Index_Author_Props_Author_Description = string;

export type Theme_Blog_Components_Author_Index_Author_Props_Author_Page_Object_Permalink = string;

export type Theme_Blog_Components_Author_Index_Author_Props_Author_Page_Object = {
  permalink: Theme_Blog_Components_Author_Index_Author_Props_Author_Page_Object_Permalink;
};

export type Theme_Blog_Components_Author_Index_Author_Props_Author_Page = Theme_Blog_Components_Author_Index_Author_Props_Author_Page_Object | null | undefined;

export type Theme_Blog_Components_Author_Index_Author_Props_Author_Socials = Readonly<Record<string, string>>;

export type Theme_Blog_Components_Author_Index_Author_Props_Author = {
  name?: Theme_Blog_Components_Author_Index_Author_Props_Author_Name;
  imageURL?: Theme_Blog_Components_Author_Index_Author_Props_Author_ImageURL;
  url?: Theme_Blog_Components_Author_Index_Author_Props_Author_Url;
  title?: Theme_Blog_Components_Author_Index_Author_Props_Author_Title;
  email?: Theme_Blog_Components_Author_Index_Author_Props_Author_Email;
  description?: Theme_Blog_Components_Author_Index_Author_Props_Author_Description;
  page?: Theme_Blog_Components_Author_Index_Author_Props_Author_Page;
  socials?: Theme_Blog_Components_Author_Index_Author_Props_Author_Socials;
  [key: string]: unknown;
};

export type Theme_Blog_Components_Author_Index_Author_Props_As = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type Theme_Blog_Components_Author_Index_Author_Props_Count = number | undefined;

export type Theme_Blog_Components_Author_Index_Author_Props_ClassName = string | undefined;

export type Theme_Blog_Components_Author_Index_Author_Props_Style = CSSProperties | undefined;

export type Theme_Blog_Components_Author_Index_Author_Props = {
  author: Theme_Blog_Components_Author_Index_Author_Props_Author;
  as?: Theme_Blog_Components_Author_Index_Author_Props_As;
  count?: Theme_Blog_Components_Author_Index_Author_Props_Count;
  className?: Theme_Blog_Components_Author_Index_Author_Props_ClassName;
  style?: Theme_Blog_Components_Author_Index_Author_Props_Style;
};

export type Theme_Blog_Components_Author_Index_Author_Name = string | undefined;

export type Theme_Blog_Components_Author_Index_Author_Title = string | undefined;

export type Theme_Blog_Components_Author_Index_Author_ImageUrl = string | undefined;

export type Theme_Blog_Components_Author_Index_Author_Link = string | undefined;

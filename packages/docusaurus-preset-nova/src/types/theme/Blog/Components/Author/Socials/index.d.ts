import type { CSSProperties } from 'react';

/**
 * Theme - Blog - Components - Author - Socials - Social Icon Configs.
 *
 * @since 0.18.0
 */
export type Theme_Blog_Components_Author_Socials_Index_Socials_IconConfigMap = Readonly<Record<string, Theme_Blog_Components_Author_Socials_Index_Socials_IconConfig>>;

/**
 * Theme - Blog - Components - Author - Socials.
 *
 * @since 0.18.0
 */
export type Theme_Blog_Components_Author_Socials_Index_Socials_Props_Author = {
  socials?: Readonly<Record<string, string>>;
  [key: string]: unknown;
};

export type Theme_Blog_Components_Author_Socials_Index_Socials_Props_ClassName = string | undefined;

export type Theme_Blog_Components_Author_Socials_Index_Socials_Props_Style = CSSProperties | undefined;

export type Theme_Blog_Components_Author_Socials_Index_Socials_Props = {
  author: Theme_Blog_Components_Author_Socials_Index_Socials_Props_Author;
  className?: Theme_Blog_Components_Author_Socials_Index_Socials_Props_ClassName;
  style?: Theme_Blog_Components_Author_Socials_Index_Socials_Props_Style;
};

export type Theme_Blog_Components_Author_Socials_Index_Socials = Readonly<Record<string, string>>;

export type Theme_Blog_Components_Author_Socials_Index_Socials_Entries = Array<[Theme_Blog_Components_Author_Socials_Index_Socials_Platform, Theme_Blog_Components_Author_Socials_Index_Socials_Link]>;

export type Theme_Blog_Components_Author_Socials_Index_Socials_Platform = string;

export type Theme_Blog_Components_Author_Socials_Index_Socials_Link = string;

export type Theme_Blog_Components_Author_Socials_Index_Socials_IconConfig_Icon = string;

export type Theme_Blog_Components_Author_Socials_Index_Socials_IconConfig_Label = string;

export type Theme_Blog_Components_Author_Socials_Index_Socials_IconConfig = {
  icon: Theme_Blog_Components_Author_Socials_Index_Socials_IconConfig_Icon;
  label: Theme_Blog_Components_Author_Socials_Index_Socials_IconConfig_Label;
};

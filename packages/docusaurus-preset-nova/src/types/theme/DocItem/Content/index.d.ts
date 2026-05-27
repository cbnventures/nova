import type { CSSProperties, ReactNode } from 'react';

/**
 * Theme - Doc Item - Content - Doc Item Content.
 *
 * @since 0.15.0
 */
export type Theme_DocItem_Content_Index_DocItemContent_Props_Children = ReactNode;

export type Theme_DocItem_Content_Index_DocItemContent_Props_ClassName = string | undefined;

export type Theme_DocItem_Content_Index_DocItemContent_Props_Style = CSSProperties | undefined;

export type Theme_DocItem_Content_Index_DocItemContent_Props = {
  children: Theme_DocItem_Content_Index_DocItemContent_Props_Children;
  className?: Theme_DocItem_Content_Index_DocItemContent_Props_ClassName;
  style?: Theme_DocItem_Content_Index_DocItemContent_Props_Style;
  [key: string]: unknown;
};

/**
 * Theme - Doc Item - Content - Use Synthetic Title.
 *
 * @since 0.15.0
 */
export type Theme_DocItem_Content_Index_UseSyntheticTitle_SyntheticTitle = string | null;

export type Theme_DocItem_Content_Index_UseSyntheticTitle_Doc_Metadata_Title = string;

export type Theme_DocItem_Content_Index_UseSyntheticTitle_Doc_ContentTitle = string | undefined;

export type Theme_DocItem_Content_Index_UseSyntheticTitle_Doc_Metadata = {
  title: Theme_DocItem_Content_Index_UseSyntheticTitle_Doc_Metadata_Title;
  [key: string]: unknown;
};

export type Theme_DocItem_Content_Index_UseSyntheticTitle_Doc_FrontMatter = {
  hide_title?: boolean;
  [key: string]: unknown;
};

export type Theme_DocItem_Content_Index_UseSyntheticTitle_Doc = {
  metadata: Theme_DocItem_Content_Index_UseSyntheticTitle_Doc_Metadata;
  frontMatter: Theme_DocItem_Content_Index_UseSyntheticTitle_Doc_FrontMatter;
  contentTitle: Theme_DocItem_Content_Index_UseSyntheticTitle_Doc_ContentTitle;
  [key: string]: unknown;
};

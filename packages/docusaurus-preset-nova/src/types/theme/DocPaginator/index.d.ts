import type { CSSProperties } from 'react';

/**
 * Theme - Doc Paginator - Doc Paginator.
 *
 * @since 0.15.0
 */
export type Theme_DocPaginator_Index_DocPaginator_NavLink_Permalink = string;

export type Theme_DocPaginator_Index_DocPaginator_NavLink_Title = string;

export type Theme_DocPaginator_Index_DocPaginator_NavLink_Description = string | undefined;

export type Theme_DocPaginator_Index_DocPaginator_NavLink = {
  permalink: Theme_DocPaginator_Index_DocPaginator_NavLink_Permalink;
  title: Theme_DocPaginator_Index_DocPaginator_NavLink_Title;
  description?: Theme_DocPaginator_Index_DocPaginator_NavLink_Description;
};

export type Theme_DocPaginator_Index_DocPaginator_Props_ClassName = string | undefined;

export type Theme_DocPaginator_Index_DocPaginator_Props_Style = CSSProperties | undefined;

export type Theme_DocPaginator_Index_DocPaginator_Props_Previous = Theme_DocPaginator_Index_DocPaginator_NavLink | undefined;

export type Theme_DocPaginator_Index_DocPaginator_Props_Next = Theme_DocPaginator_Index_DocPaginator_NavLink | undefined;

export type Theme_DocPaginator_Index_DocPaginator_Props = {
  className?: Theme_DocPaginator_Index_DocPaginator_Props_ClassName;
  style?: Theme_DocPaginator_Index_DocPaginator_Props_Style;
  previous?: Theme_DocPaginator_Index_DocPaginator_Props_Previous;
  next?: Theme_DocPaginator_Index_DocPaginator_Props_Next;
  [key: string]: unknown;
};

export type Theme_DocPaginator_Index_DocPaginator_AriaLabel = string;

export type Theme_DocPaginator_Index_DocPaginator_NavAriaLabel = string;

export type Theme_DocPaginator_Index_DocPaginator_Heading = string;

export type Theme_DocPaginator_Index_DocPaginator_GoBackLabel = string;

export type Theme_DocPaginator_Index_DocPaginator_ContinueReadingLabel = string;

export type Theme_DocPaginator_Index_DocPaginator_GoBackAriaLabel = string;

export type Theme_DocPaginator_Index_DocPaginator_ContinueReadingAriaLabel = string;

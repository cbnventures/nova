import type { CSSProperties } from 'react';

import type {
  Shared_TocHeading,
  Shared_TocHeading_Children,
  Shared_TocHeading_Id,
  Shared_TocHeading_Level,
  Shared_TocHeading_Value,
} from '../../shared.d.ts';

/**
 * Theme - Toc.
 *
 * @since 0.15.0
 */
export type Theme_Toc_Index_ListItems = Shared_TocHeading[];

export type Theme_Toc_Index_ListItemValue = Shared_TocHeading_Value;

export type Theme_Toc_Index_ListItemId = Shared_TocHeading_Id;

export type Theme_Toc_Index_ListItemLevel = Shared_TocHeading_Level;

export type Theme_Toc_Index_ListItemChildren = Shared_TocHeading_Children;

export type Theme_Toc_Index_ListItem = Shared_TocHeading;

export type Theme_Toc_Index_Props_Toc = Shared_TocHeading[];

export type Theme_Toc_Index_Props_ClassName = string | undefined;

export type Theme_Toc_Index_Props_Style = CSSProperties | undefined;

export type Theme_Toc_Index_Props_MinHeadingLevel = number;

export type Theme_Toc_Index_Props_MaxHeadingLevel = number;

export type Theme_Toc_Index_Props = {
  toc: Theme_Toc_Index_Props_Toc;
  className?: Theme_Toc_Index_Props_ClassName;
  style?: Theme_Toc_Index_Props_Style;
  minHeadingLevel?: Theme_Toc_Index_Props_MinHeadingLevel;
  maxHeadingLevel?: Theme_Toc_Index_Props_MaxHeadingLevel;
  [key: string]: unknown;
};

export type Theme_Toc_Index_Items = Shared_TocHeading[];

export type Theme_Toc_Index_MinHeadingLevel = number;

export type Theme_Toc_Index_MaxHeadingLevel = number;

export type Theme_Toc_Index_TocAriaLabel = string;

export type Theme_Toc_Index_TreeItems = Shared_TocHeading[];

/**
 * Theme - Toc - Toc.
 *
 * @since 0.15.0
 */
export type Theme_Toc_Index_TOC_Returns = React.JSX.Element | undefined;

/**
 * Theme - Toc - Toc List.
 *
 * @since 0.15.0
 */
export type Theme_Toc_Index_TocList_Returns = React.JSX.Element | undefined;

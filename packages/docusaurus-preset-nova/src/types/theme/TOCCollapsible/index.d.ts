import type { CSSProperties } from 'react';

import type { Shared_TocHeading } from '../../shared.d.ts';

/**
 * Theme - Toc Collapsible - Toc Collapsible Item.
 *
 * @since 0.21.0
 */
export type Theme_TocCollapsible_Index_TocCollapsibleItem = Shared_TocHeading;

/**
 * Theme - Toc Collapsible - Toc Collapsible (TOCCollapsible).
 *
 * @since 0.15.0
 */
export type Theme_TocCollapsible_Index_TocCollapsibleProps_Toc = Theme_TocCollapsible_Index_TocCollapsibleItem[];

export type Theme_TocCollapsible_Index_TocCollapsibleProps_ClassName = string | undefined;

export type Theme_TocCollapsible_Index_TocCollapsibleProps_Style = CSSProperties | undefined;

export type Theme_TocCollapsible_Index_TocCollapsibleProps_MinHeadingLevel = number | undefined;

export type Theme_TocCollapsible_Index_TocCollapsibleProps_MaxHeadingLevel = number | undefined;

export type Theme_TocCollapsible_Index_TocCollapsibleProps = {
  toc: Theme_TocCollapsible_Index_TocCollapsibleProps_Toc;
  className?: Theme_TocCollapsible_Index_TocCollapsibleProps_ClassName;
  style?: Theme_TocCollapsible_Index_TocCollapsibleProps_Style;
  minHeadingLevel?: Theme_TocCollapsible_Index_TocCollapsibleProps_MinHeadingLevel;
  maxHeadingLevel?: Theme_TocCollapsible_Index_TocCollapsibleProps_MaxHeadingLevel;
  [key: string]: unknown;
};

export type Theme_TocCollapsible_Index_TocCollapsibleItems = Theme_TocCollapsible_Index_TocCollapsibleItem[];

export type Theme_TocCollapsible_Index_TocCollapsibleMinHeadingLevel = number;

export type Theme_TocCollapsible_Index_TocCollapsibleMaxHeadingLevel = number;

export type Theme_TocCollapsible_Index_TocCollapsibleOpenAriaLabel = string;

export type Theme_TocCollapsible_Index_TocCollapsibleTriggerLabel = string;

export type Theme_TocCollapsible_Index_TocCollapsibleTreeItems = Theme_TocCollapsible_Index_TocCollapsibleItem[];

/**
 * Theme - Toc Collapsible - Toc Collapsible (TOCCollapsible).
 *
 * @since 0.15.0
 */
export type Theme_TocCollapsible_Index_TOCCollapsible_Returns = React.JSX.Element | undefined;

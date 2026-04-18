/**
 * Theme - Toc.
 *
 * @since 0.15.0
 */
export type ThemeTocPropsToc = ThemeTocListItem[];

export type ThemeTocPropsClassName = string | undefined;

export type ThemeTocPropsMinHeadingLevel = number | undefined;

export type ThemeTocPropsMaxHeadingLevel = number | undefined;

export type ThemeTocProps = {
  toc: ThemeTocPropsToc;
  className?: ThemeTocPropsClassName;
  minHeadingLevel?: ThemeTocPropsMinHeadingLevel;
  maxHeadingLevel?: ThemeTocPropsMaxHeadingLevel;
  [key: string]: unknown;
};

export type ThemeTocItems = ThemeTocListItem[];

/**
 * Theme - Toc - List.
 *
 * @since 0.15.0
 */
export type ThemeTocListItems = ThemeTocListItem[];

export type ThemeTocListItemValue = string;

export type ThemeTocListItemId = string;

export type ThemeTocListItemLevel = number;

export type ThemeTocListItemChildren = ThemeTocListItem[];

export type ThemeTocListItem = {
  value: ThemeTocListItemValue;
  id: ThemeTocListItemId;
  level: ThemeTocListItemLevel;
  children: ThemeTocListItemChildren;
};

export type ThemeTocTocAriaLabel = string;

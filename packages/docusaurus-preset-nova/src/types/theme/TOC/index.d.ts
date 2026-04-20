import type {
  SharedTocHeading,
  SharedTocHeadingChildren,
  SharedTocHeadingId,
  SharedTocHeadingLevel,
  SharedTocHeadingValue,
} from '../../shared.d.ts';

/**
 * Theme - Toc.
 *
 * @since 0.15.0
 */
export type ThemeTocPropsToc = SharedTocHeading[];

export type ThemeTocPropsClassName = string | undefined;

export type ThemeTocPropsMinHeadingLevel = number;

export type ThemeTocPropsMaxHeadingLevel = number;

export type ThemeTocProps = {
  toc: ThemeTocPropsToc;
  className?: ThemeTocPropsClassName;
  minHeadingLevel?: ThemeTocPropsMinHeadingLevel;
  maxHeadingLevel?: ThemeTocPropsMaxHeadingLevel;
  [key: string]: unknown;
};

export type ThemeTocItems = SharedTocHeading[];

export type ThemeTocMinHeadingLevel = number;

export type ThemeTocMaxHeadingLevel = number;

export type ThemeTocTocAriaLabel = string;

export type ThemeTocTreeItems = SharedTocHeading[];

/**
 * Theme - Toc - List.
 *
 * @since 0.15.0
 */
export type ThemeTocListItems = SharedTocHeading[];

export type ThemeTocListItemValue = SharedTocHeadingValue;

export type ThemeTocListItemId = SharedTocHeadingId;

export type ThemeTocListItemLevel = SharedTocHeadingLevel;

export type ThemeTocListItemChildren = SharedTocHeadingChildren;

export type ThemeTocListItem = SharedTocHeading;

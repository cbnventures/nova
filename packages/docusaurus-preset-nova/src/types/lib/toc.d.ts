import type {
  SharedTocHeading,
  SharedTocHeadingId,
  SharedTocHeadingLevel,
  SharedTocHeadingValue,
} from '../shared.d.ts';

/**
 * Lib - Toc - Filter Toc.
 *
 * @since 0.15.0
 */
export type LibTocFilterTocItems = SharedTocHeading[];

export type LibTocFilterTocMinHeadingLevel = number;

export type LibTocFilterTocMaxHeadingLevel = number;

export type LibTocFilterTocReturns = SharedTocHeading[];

export type LibTocFilterTocResults = SharedTocHeading[];

export type LibTocFilterTocFilteredChildren = SharedTocHeading[];

export type LibTocFilterTocIsInRange = boolean;

export type LibTocFilterTocItem = SharedTocHeading;

/**
 * Lib - Toc - Last Index At Level Seed.
 *
 * @since 0.15.0
 */
export type LibTocLastIndexAtLevelSeed = number;

/**
 * Lib - Toc - Last Index At Level Size.
 *
 * @since 0.15.0
 */
export type LibTocLastIndexAtLevelSize = number;

/**
 * Lib - Toc - Treeify Toc.
 *
 * @since 0.15.0
 */
export type LibTocTreeifyTocItems = LibTocTreeifyTocItem[];

export type LibTocTreeifyTocReturns = SharedTocHeading[];

export type LibTocTreeifyTocHeadings = SharedTocHeading[];

export type LibTocTreeifyTocItemValue = SharedTocHeadingValue;

export type LibTocTreeifyTocItemId = SharedTocHeadingId;

export type LibTocTreeifyTocItemLevel = SharedTocHeadingLevel;

export type LibTocTreeifyTocItem = {
  value: LibTocTreeifyTocItemValue;
  id: LibTocTreeifyTocItemId;
  level: LibTocTreeifyTocItemLevel;
  children?: LibTocTreeifyTocItem[];
};

export type LibTocTreeifyTocParentIndexByHeading = number[];

export type LibTocTreeifyTocLastIndexAtLevel = number[];

export type LibTocTreeifyTocParentIndexValue = number;

export type LibTocTreeifyTocHeading = SharedTocHeading;

export type LibTocTreeifyTocCurrentIndex = number;

export type LibTocTreeifyTocAncestorLevelIndexes = number[];

export type LibTocTreeifyTocMaxAncestorIndex = number;

export type LibTocTreeifyTocRoots = SharedTocHeading[];

export type LibTocTreeifyTocParent = SharedTocHeading;

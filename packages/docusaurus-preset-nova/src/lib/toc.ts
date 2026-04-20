import type {
  LibTocFilterTocFilteredChildren,
  LibTocFilterTocIsInRange,
  LibTocFilterTocItem,
  LibTocFilterTocItems,
  LibTocFilterTocMaxHeadingLevel,
  LibTocFilterTocMinHeadingLevel,
  LibTocFilterTocResults,
  LibTocFilterTocReturns,
  LibTocLastIndexAtLevelSeed,
  LibTocLastIndexAtLevelSize,
  LibTocTreeifyTocAncestorLevelIndexes,
  LibTocTreeifyTocCurrentIndex,
  LibTocTreeifyTocHeading,
  LibTocTreeifyTocHeadings,
  LibTocTreeifyTocItem,
  LibTocTreeifyTocItems,
  LibTocTreeifyTocLastIndexAtLevel,
  LibTocTreeifyTocMaxAncestorIndex,
  LibTocTreeifyTocParent,
  LibTocTreeifyTocParentIndexByHeading,
  LibTocTreeifyTocParentIndexValue,
  LibTocTreeifyTocReturns,
  LibTocTreeifyTocRoots,
} from '../types/lib/toc.d.ts';

/**
 * Lib - Toc - Last Index At Level Seed.
 *
 * Sentinel value indicating no heading has been seen yet at
 * a given level.
 *
 * @since 0.15.0
 */
const LIB_TOC_LAST_INDEX_AT_LEVEL_SEED: LibTocLastIndexAtLevelSeed = -1;

/**
 * Lib - Toc - Last Index At Level Size.
 *
 * Size of the per-level rolling index array used during
 * treeification. Entries 0 and 1 go unused so index i refers
 * to heading level i.
 *
 * @since 0.15.0
 */
const LIB_TOC_LAST_INDEX_AT_LEVEL_SIZE: LibTocLastIndexAtLevelSize = 7;

/**
 * Lib - Toc - Treeify Toc.
 *
 * Converts a flat table-of-contents list from the MDX loader
 * into a nested tree by linking each heading to the nearest
 * preceding heading at a shallower level.
 *
 * @param {LibTocTreeifyTocItems} items - Items.
 *
 * @returns {LibTocTreeifyTocReturns}
 *
 * @since 0.15.0
 */
export function treeifyToc(items: LibTocTreeifyTocItems): LibTocTreeifyTocReturns {
  const headings: LibTocTreeifyTocHeadings = items.map((item: LibTocTreeifyTocItem) => ({
    value: item['value'],
    id: item['id'],
    level: item['level'],
    children: [],
  }));
  const parentIndexByHeading: LibTocTreeifyTocParentIndexByHeading = headings.map(() => LIB_TOC_LAST_INDEX_AT_LEVEL_SEED);
  const lastIndexAtLevel: LibTocTreeifyTocLastIndexAtLevel = Array<LibTocTreeifyTocParentIndexValue>(LIB_TOC_LAST_INDEX_AT_LEVEL_SIZE).fill(LIB_TOC_LAST_INDEX_AT_LEVEL_SEED);

  headings.forEach((heading: LibTocTreeifyTocHeading, currentIndex: LibTocTreeifyTocCurrentIndex) => {
    const ancestorLevelIndexes: LibTocTreeifyTocAncestorLevelIndexes = lastIndexAtLevel.slice(2, heading['level']);
    const maxAncestorIndex: LibTocTreeifyTocMaxAncestorIndex = Math.max(...ancestorLevelIndexes);

    Reflect.set(parentIndexByHeading, currentIndex, maxAncestorIndex);
    Reflect.set(lastIndexAtLevel, heading['level'], currentIndex);

    return;
  });

  const roots: LibTocTreeifyTocRoots = [];

  headings.forEach((heading: LibTocTreeifyTocHeading, currentIndex: LibTocTreeifyTocCurrentIndex) => {
    const parentIndex: LibTocTreeifyTocParentIndexValue = parentIndexByHeading[currentIndex] as LibTocTreeifyTocParentIndexValue;

    if (parentIndex >= 0) {
      const parent: LibTocTreeifyTocParent = headings[parentIndex] as LibTocTreeifyTocParent;

      parent['children'].push(heading);

      return;
    }

    roots.push(heading);

    return;
  });

  return roots;
}

/**
 * Lib - Toc - Filter Toc.
 *
 * Prunes a treeified table of contents to only the headings whose
 * level falls within the given inclusive range, promoting the
 * children of excluded headings to their parent.
 *
 * @param {LibTocFilterTocItems}            items            - Items.
 * @param {LibTocFilterTocMinHeadingLevel}  minHeadingLevel  - Min heading level.
 * @param {LibTocFilterTocMaxHeadingLevel}  maxHeadingLevel  - Max heading level.
 *
 * @returns {LibTocFilterTocReturns}
 *
 * @since 0.15.0
 */
export function filterToc(items: LibTocFilterTocItems, minHeadingLevel: LibTocFilterTocMinHeadingLevel, maxHeadingLevel: LibTocFilterTocMaxHeadingLevel): LibTocFilterTocReturns {
  const results: LibTocFilterTocResults = [];

  for (const item of items) {
    const filteredChildren: LibTocFilterTocFilteredChildren = filterToc(item['children'], minHeadingLevel, maxHeadingLevel);
    const isInRange: LibTocFilterTocIsInRange = item['level'] >= minHeadingLevel && item['level'] <= maxHeadingLevel;

    if (isInRange === true) {
      const keptItem: LibTocFilterTocItem = {
        value: item['value'],
        id: item['id'],
        level: item['level'],
        children: filteredChildren,
      };

      results.push(keptItem);

      continue;
    }

    results.push(...filteredChildren);
  }

  return results;
}

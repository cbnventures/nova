import type {
  Lib_Toc_FilterToc_FilteredChildren,
  Lib_Toc_FilterToc_IsInRange,
  Lib_Toc_FilterToc_Item,
  Lib_Toc_FilterToc_Items,
  Lib_Toc_FilterToc_MaxHeadingLevel,
  Lib_Toc_FilterToc_MinHeadingLevel,
  Lib_Toc_FilterToc_Results,
  Lib_Toc_FilterToc_Returns,
  Lib_Toc_LastIndexAtLevelSeed,
  Lib_Toc_LastIndexAtLevelSize,
  Lib_Toc_TreeifyToc_AncestorLevelIndexes,
  Lib_Toc_TreeifyToc_CurrentIndex,
  Lib_Toc_TreeifyToc_Heading,
  Lib_Toc_TreeifyToc_Headings,
  Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Children,
  Lib_Toc_TreeifyToc_Items,
  Lib_Toc_TreeifyToc_LastIndexAtLevel,
  Lib_Toc_TreeifyToc_MaxAncestorIndex,
  Lib_Toc_TreeifyToc_Parent,
  Lib_Toc_TreeifyToc_ParentIndexByHeading,
  Lib_Toc_TreeifyToc_ParentIndexValue,
  Lib_Toc_TreeifyToc_Returns,
  Lib_Toc_TreeifyToc_Roots,
} from '../types/lib/toc.d.ts';

/**
 * Lib - Toc - Last Index At Level Seed.
 *
 * Sentinel value indicating no heading has been seen yet at
 * a given level.
 *
 * @since 0.15.0
 */
const LIB_TOC_LAST_INDEX_AT_LEVEL_SEED: Lib_Toc_LastIndexAtLevelSeed = -1;

/**
 * Lib - Toc - Last Index At Level Size.
 *
 * Size of the per-level rolling index array used during
 * treeification. Entries 0 and 1 go unused so index i refers
 * to heading level i.
 *
 * @since 0.15.0
 */
const LIB_TOC_LAST_INDEX_AT_LEVEL_SIZE: Lib_Toc_LastIndexAtLevelSize = 7;

/**
 * Lib - Toc - Treeify Toc.
 *
 * Converts a flat table-of-contents list from the MDX loader
 * into a nested tree by linking each heading to the nearest
 * preceding heading at a shallower level.
 *
 * @param {Lib_Toc_TreeifyToc_Items} items - Items.
 *
 * @returns {Lib_Toc_TreeifyToc_Returns}
 *
 * @since 0.15.0
 */
export function treeifyToc(items: Lib_Toc_TreeifyToc_Items): Lib_Toc_TreeifyToc_Returns {
  const headings: Lib_Toc_TreeifyToc_Headings = items.map((item: Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Children) => ({
    value: item['value'],
    id: item['id'],
    level: item['level'],
    children: [],
  }));
  const parentIndexByHeading: Lib_Toc_TreeifyToc_ParentIndexByHeading = headings.map(() => LIB_TOC_LAST_INDEX_AT_LEVEL_SEED);
  const lastIndexAtLevel: Lib_Toc_TreeifyToc_LastIndexAtLevel = Array<Lib_Toc_TreeifyToc_ParentIndexValue>(LIB_TOC_LAST_INDEX_AT_LEVEL_SIZE).fill(LIB_TOC_LAST_INDEX_AT_LEVEL_SEED);

  headings.forEach((heading: Lib_Toc_TreeifyToc_Heading, currentIndex: Lib_Toc_TreeifyToc_CurrentIndex) => {
    const ancestorLevelIndexes: Lib_Toc_TreeifyToc_AncestorLevelIndexes = lastIndexAtLevel.slice(2, heading['level']);
    const maxAncestorIndex: Lib_Toc_TreeifyToc_MaxAncestorIndex = Math.max(...ancestorLevelIndexes);

    Reflect.set(parentIndexByHeading, currentIndex, maxAncestorIndex);
    Reflect.set(lastIndexAtLevel, heading['level'], currentIndex);

    return;
  });

  const roots: Lib_Toc_TreeifyToc_Roots = [];

  headings.forEach((heading: Lib_Toc_TreeifyToc_Heading, currentIndex: Lib_Toc_TreeifyToc_CurrentIndex) => {
    const parentIndex: Lib_Toc_TreeifyToc_ParentIndexValue = parentIndexByHeading[currentIndex] as Lib_Toc_TreeifyToc_ParentIndexValue;

    if (parentIndex >= 0) {
      const parent: Lib_Toc_TreeifyToc_Parent = headings[parentIndex] as Lib_Toc_TreeifyToc_Parent;

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
 * @param {Lib_Toc_FilterToc_Items}            items            - Items.
 * @param {Lib_Toc_FilterToc_MinHeadingLevel}  minHeadingLevel  - Min heading level.
 * @param {Lib_Toc_FilterToc_MaxHeadingLevel}  maxHeadingLevel  - Max heading level.
 *
 * @returns {Lib_Toc_FilterToc_Returns}
 *
 * @since 0.15.0
 */
export function filterToc(items: Lib_Toc_FilterToc_Items, minHeadingLevel: Lib_Toc_FilterToc_MinHeadingLevel, maxHeadingLevel: Lib_Toc_FilterToc_MaxHeadingLevel): Lib_Toc_FilterToc_Returns {
  const results: Lib_Toc_FilterToc_Results = [];

  for (const item of items) {
    const filteredChildren: Lib_Toc_FilterToc_FilteredChildren = filterToc(item['children'], minHeadingLevel, maxHeadingLevel);
    const isInRange: Lib_Toc_FilterToc_IsInRange = item['level'] >= minHeadingLevel && item['level'] <= maxHeadingLevel;

    if (isInRange === true) {
      const keptItem: Lib_Toc_FilterToc_Item = {
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

import type {
  Shared_TocHeading,
  Shared_TocHeading_Id,
  Shared_TocHeading_Level,
  Shared_TocHeading_Value,
} from '../shared.d.ts';

/**
 * Lib - Toc - Filter Toc.
 *
 * @since 0.15.0
 */
export type Lib_Toc_FilterToc_Items = Shared_TocHeading[];

export type Lib_Toc_FilterToc_MinHeadingLevel = number;

export type Lib_Toc_FilterToc_MaxHeadingLevel = number;

export type Lib_Toc_FilterToc_Returns = Shared_TocHeading[];

export type Lib_Toc_FilterToc_Results = Shared_TocHeading[];

export type Lib_Toc_FilterToc_FilteredChildren = Shared_TocHeading[];

export type Lib_Toc_FilterToc_IsInRange = boolean;

export type Lib_Toc_FilterToc_Item = Shared_TocHeading;

/**
 * Lib - Toc - Last Index At Level Seed.
 *
 * @since 0.15.0
 */
export type Lib_Toc_LastIndexAtLevelSeed = number;

/**
 * Lib - Toc - Last Index At Level Size.
 *
 * @since 0.15.0
 */
export type Lib_Toc_LastIndexAtLevelSize = number;

/**
 * Lib - Toc - Treeify Toc.
 *
 * @since 0.15.0
 */
export type Lib_Toc_TreeifyToc_Items = Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Children[];

export type Lib_Toc_TreeifyToc_Returns = Shared_TocHeading[];

export type Lib_Toc_TreeifyToc_Headings = Shared_TocHeading[];

export type Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Value = Shared_TocHeading_Value;

export type Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Id = Shared_TocHeading_Id;

export type Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Level = Shared_TocHeading_Level;

export type Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Children = {
  value: Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Value;
  id: Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Id;
  level: Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Level;
  children?: Lib_Toc_TreeifyToc_Item_Children_Children_Children_Children_Children[];
};

export type Lib_Toc_TreeifyToc_ParentIndexByHeading = number[];

export type Lib_Toc_TreeifyToc_LastIndexAtLevel = number[];

export type Lib_Toc_TreeifyToc_ParentIndexValue = number;

export type Lib_Toc_TreeifyToc_Heading = Shared_TocHeading;

export type Lib_Toc_TreeifyToc_CurrentIndex = number;

export type Lib_Toc_TreeifyToc_AncestorLevelIndexes = number[];

export type Lib_Toc_TreeifyToc_MaxAncestorIndex = number;

export type Lib_Toc_TreeifyToc_Roots = Shared_TocHeading[];

export type Lib_Toc_TreeifyToc_Parent = Shared_TocHeading;

import type { Shared_HastNode } from '../../shared.d.ts';

/**
 * Tests - Lib - Rehype Shiki - Rehype Shiki.
 *
 * @since 0.15.0
 */
export type Tests_Lib_RehypeShiki_Tree = Shared_HastNode;

export type Tests_Lib_RehypeShiki_Transformer = (tree: Shared_HastNode) => Promise<void>;

export type Tests_Lib_RehypeShiki_OutputNode = Shared_HastNode | undefined;

export type Tests_Lib_RehypeShiki_OutputJson = string;

export type Tests_Lib_RehypeShiki_IncludesShiki = boolean;

export type Tests_Lib_RehypeShiki_IncludesMarker = boolean;

export type Tests_Lib_RehypeShiki_LangTree = Shared_HastNode;

export type Tests_Lib_RehypeShiki_LangTransformer = (tree: Shared_HastNode) => Promise<void>;

export type Tests_Lib_RehypeShiki_LangOutputNode = Shared_HastNode | undefined;

export type Tests_Lib_RehypeShiki_LangOutputJson = string;

export type Tests_Lib_RehypeShiki_LangIncludesShiki = boolean;

export type Tests_Lib_RehypeShiki_NoLangTree = Shared_HastNode;

export type Tests_Lib_RehypeShiki_NoLangTransformer = (tree: Shared_HastNode) => Promise<void>;

export type Tests_Lib_RehypeShiki_NoLangOutputNode = Shared_HastNode | undefined;

export type Tests_Lib_RehypeShiki_NoLangOutputJson = string;

export type Tests_Lib_RehypeShiki_NoLangIncludesShiki = boolean;

export type Tests_Lib_RehypeShiki_MagicCode = string;

export type Tests_Lib_RehypeShiki_MagicTree = Shared_HastNode;

export type Tests_Lib_RehypeShiki_MagicTransformer = (tree: Shared_HastNode) => Promise<void>;

export type Tests_Lib_RehypeShiki_MagicOutputNode = Shared_HastNode | undefined;

export type Tests_Lib_RehypeShiki_MagicOutputJson = string;

export type Tests_Lib_RehypeShiki_MagicIncludesHighlighted = boolean;

export type Tests_Lib_RehypeShiki_MagicExcludesComment = boolean;

export type Tests_Lib_RehypeShiki_RangeCode = string;

export type Tests_Lib_RehypeShiki_RangeTree = Shared_HastNode;

export type Tests_Lib_RehypeShiki_RangeTransformer = (tree: Shared_HastNode) => Promise<void>;

export type Tests_Lib_RehypeShiki_RangeOutputNode = Shared_HastNode | undefined;

export type Tests_Lib_RehypeShiki_RangeOutputJson = string;

export type Tests_Lib_RehypeShiki_RangeIncludesHighlighted = boolean;

export type Tests_Lib_RehypeShiki_DiffCode = string;

export type Tests_Lib_RehypeShiki_DiffTree = Shared_HastNode;

export type Tests_Lib_RehypeShiki_DiffTransformer = (tree: Shared_HastNode) => Promise<void>;

export type Tests_Lib_RehypeShiki_DiffOutputNode = Shared_HastNode | undefined;

export type Tests_Lib_RehypeShiki_DiffOutputJson = string;

export type Tests_Lib_RehypeShiki_DiffIncludesAdd = boolean;

export type Tests_Lib_RehypeShiki_DiffIncludesRemove = boolean;

export type Tests_Lib_RehypeShiki_MetadataTree = Shared_HastNode;

export type Tests_Lib_RehypeShiki_MetadataTransformer = (tree: Shared_HastNode) => Promise<void>;

export type Tests_Lib_RehypeShiki_MetadataOutputNode = Shared_HastNode | undefined;

export type Tests_Lib_RehypeShiki_MetadataOutputJson = string;

export type Tests_Lib_RehypeShiki_MetadataIncludesTitle = boolean;

export type Tests_Lib_RehypeShiki_MetadataIncludesLanguage = boolean;

export type Tests_Lib_RehypeShiki_MetadataIncludesShowLineNumbers = boolean;

export type Tests_Lib_RehypeShiki_MetadataIncludesLive = boolean;

export type Tests_Lib_RehypeShiki_MetadataIncludesMetastring = boolean;

export type Tests_Lib_RehypeShiki_AddRemoveCode = string;

export type Tests_Lib_RehypeShiki_AddRemoveTree = Shared_HastNode;

export type Tests_Lib_RehypeShiki_AddRemoveTransformer = (tree: Shared_HastNode) => Promise<void>;

export type Tests_Lib_RehypeShiki_AddRemoveOutputNode = Shared_HastNode | undefined;

export type Tests_Lib_RehypeShiki_AddRemoveOutputJson = string;

export type Tests_Lib_RehypeShiki_AddRemoveIncludesAdd = boolean;

export type Tests_Lib_RehypeShiki_AddRemoveIncludesRemove = boolean;

export type Tests_Lib_RehypeShiki_AddRemoveExcludesAddMarker = boolean;

export type Tests_Lib_RehypeShiki_AddRemoveExcludesRemoveMarker = boolean;

export type Tests_Lib_RehypeShiki_MarkerTree = Shared_HastNode;

export type Tests_Lib_RehypeShiki_MarkerTransformer = (tree: Shared_HastNode) => Promise<void>;

export type Tests_Lib_RehypeShiki_MarkerOutputNode = Shared_HastNode | undefined;

export type Tests_Lib_RehypeShiki_MarkerOutputJson = string;

export type Tests_Lib_RehypeShiki_MarkerIncludesAttribute = boolean;

import type { SharedHastNode } from '../../shared.d.ts';

/**
 * Tests - Lib - Rehype Shiki - Rehype Shiki.
 *
 * @since 0.15.0
 */
export type TestsLibRehypeShikiTree = SharedHastNode;

export type TestsLibRehypeShikiTransformer = (tree: SharedHastNode) => Promise<void>;

export type TestsLibRehypeShikiOutputNode = SharedHastNode | undefined;

export type TestsLibRehypeShikiOutputJson = string;

export type TestsLibRehypeShikiIncludesShiki = boolean;

export type TestsLibRehypeShikiIncludesMarker = boolean;

export type TestsLibRehypeShikiLangTree = SharedHastNode;

export type TestsLibRehypeShikiLangTransformer = (tree: SharedHastNode) => Promise<void>;

export type TestsLibRehypeShikiLangOutputNode = SharedHastNode | undefined;

export type TestsLibRehypeShikiLangOutputJson = string;

export type TestsLibRehypeShikiLangIncludesShiki = boolean;

export type TestsLibRehypeShikiNoLangTree = SharedHastNode;

export type TestsLibRehypeShikiNoLangTransformer = (tree: SharedHastNode) => Promise<void>;

export type TestsLibRehypeShikiNoLangOutputNode = SharedHastNode | undefined;

export type TestsLibRehypeShikiNoLangOutputJson = string;

export type TestsLibRehypeShikiNoLangIncludesShiki = boolean;

export type TestsLibRehypeShikiMagicCode = string;

export type TestsLibRehypeShikiMagicTree = SharedHastNode;

export type TestsLibRehypeShikiMagicTransformer = (tree: SharedHastNode) => Promise<void>;

export type TestsLibRehypeShikiMagicOutputNode = SharedHastNode | undefined;

export type TestsLibRehypeShikiMagicOutputJson = string;

export type TestsLibRehypeShikiMagicIncludesHighlighted = boolean;

export type TestsLibRehypeShikiMagicExcludesComment = boolean;

export type TestsLibRehypeShikiRangeCode = string;

export type TestsLibRehypeShikiRangeTree = SharedHastNode;

export type TestsLibRehypeShikiRangeTransformer = (tree: SharedHastNode) => Promise<void>;

export type TestsLibRehypeShikiRangeOutputNode = SharedHastNode | undefined;

export type TestsLibRehypeShikiRangeOutputJson = string;

export type TestsLibRehypeShikiRangeIncludesHighlighted = boolean;

export type TestsLibRehypeShikiDiffCode = string;

export type TestsLibRehypeShikiDiffTree = SharedHastNode;

export type TestsLibRehypeShikiDiffTransformer = (tree: SharedHastNode) => Promise<void>;

export type TestsLibRehypeShikiDiffOutputNode = SharedHastNode | undefined;

export type TestsLibRehypeShikiDiffOutputJson = string;

export type TestsLibRehypeShikiDiffIncludesAdd = boolean;

export type TestsLibRehypeShikiDiffIncludesRemove = boolean;

export type TestsLibRehypeShikiMarkerTree = SharedHastNode;

export type TestsLibRehypeShikiMarkerTransformer = (tree: SharedHastNode) => Promise<void>;

export type TestsLibRehypeShikiMarkerOutputNode = SharedHastNode | undefined;

export type TestsLibRehypeShikiMarkerOutputJson = string;

export type TestsLibRehypeShikiMarkerIncludesAttribute = boolean;

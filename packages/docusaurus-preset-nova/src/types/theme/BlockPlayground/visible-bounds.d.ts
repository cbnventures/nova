import type {
  Shared_BlockPlaygroundPaintExtents,
  Shared_BlockPlaygroundPaintStyle,
  Shared_BlockPlaygroundVisibleCrop,
  Shared_BlockPlaygroundVisibleEdge,
  Shared_BlockPlaygroundVisibleStyle,
} from '../../shared.d.ts';

/**
 * Theme - Block Playground - Visible Bounds.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_VisibleBounds_VisibleBoundsMediaTags = string[];
/**
 * Theme - Block Playground - Visible Bounds - Collect Visible Edges.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Stage = HTMLElement;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_CanvasBackground = string;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Returns = Shared_BlockPlaygroundVisibleEdge[];

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_StageRect = DOMRect;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_AppliedScale = number;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Edges = Shared_BlockPlaygroundVisibleEdge[];

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Elements = NodeListOf<Element>;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_TypedElement = Element;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Style = CSSStyleDeclaration;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_IsMedia = boolean;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_BeforeContent = string;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_AfterContent = string;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_HasPseudoContent = boolean;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Rect = DOMRect;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_PaintExtents = Shared_BlockPlaygroundPaintExtents;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_PaintReach = number;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Walker = TreeWalker;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Range = Range;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_TextNode = Node;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_ParentStyle = CSSStyleDeclaration;

export type Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_TextRect = DOMRect;

/**
 * Theme - Block Playground - Visible Bounds - Compute Paint Extents.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Style = Shared_BlockPlaygroundPaintStyle;

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Returns = Shared_BlockPlaygroundPaintExtents;

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Top = number;

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Bottom = number;

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Tokens = string[];

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Lengths = number[];

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_OffsetY = number;

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Blur = number;

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Spread = number;

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_OutlineWidth = number;

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_OutlineOffset = number;

export type Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Outline = number;

/**
 * Theme - Block Playground - Visible Bounds - Compute Visible Crop.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Edges = Shared_BlockPlaygroundVisibleEdge[];

export type Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_ContentHeight = number;

export type Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Allowance = number;

export type Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Returns = Shared_BlockPlaygroundVisibleCrop;

export type Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Top = number;

export type Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Bottom = number;

export type Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_BeyondTop = number;

export type Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_BeyondBottom = number;

export type Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Extra = number;

/**
 * Theme - Block Playground - Visible Bounds - Has Active Animations.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_VisibleBounds_HasActiveAnimations_Stage = HTMLElement;

export type Theme_BlockPlayground_VisibleBounds_HasActiveAnimations_Returns = boolean;

/**
 * Theme - Block Playground - Visible Bounds - Has Visible Box.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_VisibleBounds_HasVisibleBox_Style = Shared_BlockPlaygroundVisibleStyle;

export type Theme_BlockPlayground_VisibleBounds_HasVisibleBox_CanvasBackground = string;

export type Theme_BlockPlayground_VisibleBounds_HasVisibleBox_Returns = boolean;

/**
 * Theme - Block Playground - Visible Bounds - Split Top Level.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Value = string;

export type Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Separator = string;

export type Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Returns = string[];

export type Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Parts = string[];

export type Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Depth = number;

export type Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Current = string;

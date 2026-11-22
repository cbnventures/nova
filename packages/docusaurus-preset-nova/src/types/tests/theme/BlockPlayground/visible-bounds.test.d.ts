import type {
  Shared_BlockPlaygroundPaintExtents,
  Shared_BlockPlaygroundVisibleCrop,
} from '../../../shared.d.ts';

/**
 * Tests - Theme - Block Playground - Visible Bounds - Compute Paint Extents - Counts The Outline And Its Offset.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_CountsTheOutlineAndItsOffset_Result = Shared_BlockPlaygroundPaintExtents;

/**
 * Tests - Theme - Block Playground - Visible Bounds - Compute Paint Extents - Grows By The Largest Outer Shadow And Skips Inset Shadows.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_GrowsByTheLargestOuterShadowAndSkipsInsetShadows_Result = Shared_BlockPlaygroundPaintExtents;

/**
 * Tests - Theme - Block Playground - Visible Bounds - Compute Visible Crop - Crops To The Visible Content.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_CropsToTheVisibleContent_Result = Shared_BlockPlaygroundVisibleCrop;

/**
 * Tests - Theme - Block Playground - Visible Bounds - Compute Visible Crop - Keeps Shadows That Reach Past The Content.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_KeepsShadowsThatReachPastTheContent_Result = Shared_BlockPlaygroundVisibleCrop;

/**
 * Tests - Theme - Block Playground - Visible Bounds - Compute Visible Crop - Keeps The Full Height When Nothing Is Visible.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_KeepsTheFullHeightWhenNothingIsVisible_Result = Shared_BlockPlaygroundVisibleCrop;

/**
 * Tests - Theme - Block Playground - Visible Bounds - Has Visible Box - Counts Borders And Shadows.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_VisibleBounds_HasVisibleBox_CountsBordersAndShadows_Result = boolean;

/**
 * Tests - Theme - Block Playground - Visible Bounds - Has Visible Box - Ignores The Canvas Background.
 *
 * @since 0.50.0
 */
export type Tests_Theme_BlockPlayground_VisibleBounds_HasVisibleBox_IgnoresTheCanvasBackground_Result = boolean;

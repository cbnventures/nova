import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  computePaintExtents,
  computeVisibleCrop,
  hasVisibleBox,
} from '../../../theme/BlockPlayground/visible-bounds.js';

import type {
  Tests_Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_CountsTheOutlineAndItsOffset_Result,
  Tests_Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_GrowsByTheLargestOuterShadowAndSkipsInsetShadows_Result,
  Tests_Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_CropsToTheVisibleContent_Result,
  Tests_Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_KeepsShadowsThatReachPastTheContent_Result,
  Tests_Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_KeepsTheFullHeightWhenNothingIsVisible_Result,
  Tests_Theme_BlockPlayground_VisibleBounds_HasVisibleBox_CountsBordersAndShadows_Result,
  Tests_Theme_BlockPlayground_VisibleBounds_HasVisibleBox_IgnoresTheCanvasBackground_Result,
} from '../../../types/tests/theme/BlockPlayground/visible-bounds.test.d.ts';

/**
 * Tests - Theme - Block Playground - Visible Bounds - Compute Visible Crop.
 *
 * @since 0.50.0
 */
describe('computeVisibleCrop', async () => {
  it('crops to the visible content', () => {
    const result: Tests_Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_CropsToTheVisibleContent_Result = computeVisibleCrop([
      {
        top: 64,
        bottom: 90,
        reach: 0,
      },
      {
        top: 120,
        bottom: 340,
        reach: 12,
      },
    ], 400, 32);

    strictEqual(result['offset'], 64);
    strictEqual(result['height'], 276);

    return;
  });

  it('keeps shadows that reach past the content', () => {
    const result: Tests_Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_KeepsShadowsThatReachPastTheContent_Result = computeVisibleCrop([{
      top: 100,
      bottom: 300,
      reach: 61,
    }], 400, 32);

    strictEqual(result['offset'], 71);
    strictEqual(result['height'], 258);

    return;
  });

  it('keeps the full height when nothing is visible', () => {
    const result: Tests_Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_KeepsTheFullHeightWhenNothingIsVisible_Result = computeVisibleCrop([], 250, 32);

    strictEqual(result['offset'], 0);
    strictEqual(result['height'], 250);

    return;
  });

  return;
});

/**
 * Tests - Theme - Block Playground - Visible Bounds - Compute Paint Extents.
 *
 * @since 0.50.0
 */
describe('computePaintExtents', async () => {
  it('grows by the largest outer shadow and skips inset shadows', () => {
    const result: Tests_Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_GrowsByTheLargestOuterShadowAndSkipsInsetShadows_Result = computePaintExtents({
      boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 0px 0.5px, rgba(255, 255, 255, 0.18) 0px 0px 0px 0.5px inset, rgba(0, 0, 0, 0.3) 0px 22px 70px 4px',
      outlineStyle: 'none',
      outlineWidth: '0px',
      outlineOffset: '0px',
    });

    strictEqual(result['top'], 17);
    strictEqual(result['bottom'], 61);

    return;
  });

  it('counts the outline and its offset', () => {
    const result: Tests_Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_CountsTheOutlineAndItsOffset_Result = computePaintExtents({
      boxShadow: 'none',
      outlineStyle: 'solid',
      outlineWidth: '2px',
      outlineOffset: '2px',
    });

    strictEqual(result['top'], 4);
    strictEqual(result['bottom'], 4);

    return;
  });

  return;
});

/**
 * Tests - Theme - Block Playground - Visible Bounds - Has Visible Box.
 *
 * @since 0.50.0
 */
describe('hasVisibleBox', async () => {
  it('ignores the canvas background', () => {
    const result: Tests_Theme_BlockPlayground_VisibleBounds_HasVisibleBox_IgnoresTheCanvasBackground_Result = hasVisibleBox({
      backgroundColor: 'rgb(255, 255, 255)',
      backgroundImage: 'none',
      boxShadow: 'none',
      borderTopWidth: '0px',
      borderRightWidth: '0px',
      borderBottomWidth: '0px',
      borderLeftWidth: '0px',
    }, 'rgb(255, 255, 255)');

    strictEqual(result, false);

    return;
  });

  it('counts borders and shadows', () => {
    const result: Tests_Theme_BlockPlayground_VisibleBounds_HasVisibleBox_CountsBordersAndShadows_Result = hasVisibleBox({
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: 'none',
      boxShadow: 'none',
      borderTopWidth: '1px',
      borderRightWidth: '0px',
      borderBottomWidth: '0px',
      borderLeftWidth: '0px',
    }, 'rgb(255, 255, 255)');

    strictEqual(result, true);

    return;
  });

  return;
});

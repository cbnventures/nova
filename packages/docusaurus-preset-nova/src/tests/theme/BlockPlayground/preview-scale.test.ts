import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { computePreviewScale, isSameLayout } from '../../../theme/BlockPlayground/preview-scale.js';

import type {
  Tests_Theme_BlockPlayground_PreviewScale_ComputePreviewScale_FallsBackToFullSizeBeforeTheColumnIsMeasured_Result,
  Tests_Theme_BlockPlayground_PreviewScale_ComputePreviewScale_KeepsTheZoomAtTheMinimumAndNarrowsTheLayout_Result,
  Tests_Theme_BlockPlayground_PreviewScale_ComputePreviewScale_NeverZoomsInPastFullSize_Result,
  Tests_Theme_BlockPlayground_PreviewScale_ComputePreviewScale_ZoomsTheDesktopLayoutOutToTheColumn_Result,
  Tests_Theme_BlockPlayground_PreviewScale_IsSameLayout_IgnoresSubPixelDifferences_Result,
  Tests_Theme_BlockPlayground_PreviewScale_IsSameLayout_ReportsAPixelOrMoreAsAChange_Result,
} from '../../../types/tests/theme/BlockPlayground/preview-scale.test.d.ts';

/**
 * Tests - Theme - Block Playground - Preview Scale - Is Same Layout.
 *
 * @since 0.50.0
 */
describe('isSameLayout', async () => {
  it('ignores sub-pixel differences', () => {
    const result: Tests_Theme_BlockPlayground_PreviewScale_IsSameLayout_IgnoresSubPixelDifferences_Result = isSameLayout({
      size: {
        scale: 0.75,
        width: 822.5,
        height: 300,
      },
      crop: {
        offset: 12,
        height: 400,
      },
    }, {
      size: {
        scale: 0.75,
        width: 822.9,
        height: 300.6,
      },
      crop: {
        offset: 12.4,
        height: 400.8,
      },
    });

    strictEqual(result, true);

    return;
  });

  it('reports a pixel or more as a change', () => {
    const result: Tests_Theme_BlockPlayground_PreviewScale_IsSameLayout_ReportsAPixelOrMoreAsAChange_Result = isSameLayout({
      size: {
        scale: 0.75,
        width: 822.5,
        height: 300,
      },
      crop: {
        offset: 12,
        height: 400,
      },
    }, {
      size: {
        scale: 0.75,
        width: 822.5,
        height: 315,
      },
      crop: {
        offset: 32,
        height: 420,
      },
    });

    strictEqual(result, false);

    return;
  });

  return;
});

/**
 * Tests - Theme - Block Playground - Preview Scale - Compute Preview Scale.
 *
 * @since 0.50.0
 */
describe('computePreviewScale', async () => {
  it('zooms the desktop layout out to the column', () => {
    const result: Tests_Theme_BlockPlayground_PreviewScale_ComputePreviewScale_ZoomsTheDesktopLayoutOutToTheColumn_Result = computePreviewScale(960, 600, 1280, 0.6);

    strictEqual(result['scale'], 0.75);
    strictEqual(result['width'], 1280);
    strictEqual(result['height'], 450);

    return;
  });

  it('keeps the zoom at the minimum and narrows the layout', () => {
    const result: Tests_Theme_BlockPlayground_PreviewScale_ComputePreviewScale_KeepsTheZoomAtTheMinimumAndNarrowsTheLayout_Result = computePreviewScale(600, 101, 1280, 0.6);

    strictEqual(result['scale'], 0.6);
    strictEqual(result['width'], 1000);
    strictEqual(result['height'], 61);

    return;
  });

  it('never zooms in past full size', () => {
    const result: Tests_Theme_BlockPlayground_PreviewScale_ComputePreviewScale_NeverZoomsInPastFullSize_Result = computePreviewScale(1600, 540, 1280, 0.6);

    strictEqual(result['scale'], 1);
    strictEqual(result['width'], 1280);
    strictEqual(result['height'], 540);

    return;
  });

  it('falls back to full size before the column is measured', () => {
    const result: Tests_Theme_BlockPlayground_PreviewScale_ComputePreviewScale_FallsBackToFullSizeBeforeTheColumnIsMeasured_Result = computePreviewScale(0, 300, 1280, 0.6);

    strictEqual(result['scale'], 1);
    strictEqual(result['height'], 300);

    return;
  });

  return;
});

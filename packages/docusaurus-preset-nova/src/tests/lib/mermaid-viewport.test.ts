import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  clampScale,
  MERMAID_MAX_SCALE,
  MERMAID_MIN_SCALE,
  resolvePan,
} from '../../lib/mermaid-viewport.js';

import type {
  Tests_Lib_MermaidViewport_ClampScale_ClampsRequestsToTheSupportedZoomRange_AboveMaximum,
  Tests_Lib_MermaidViewport_ClampScale_ClampsRequestsToTheSupportedZoomRange_BelowMinimum,
  Tests_Lib_MermaidViewport_ClampScale_ClampsRequestsToTheSupportedZoomRange_WithinRange,
  Tests_Lib_MermaidViewport_ResolvePan_ResolvesPointerTravelFromTheDragOrigin_Current,
  Tests_Lib_MermaidViewport_ResolvePan_ResolvesPointerTravelFromTheDragOrigin_Result,
  Tests_Lib_MermaidViewport_ResolvePan_ResolvesPointerTravelFromTheDragOrigin_Start,
  Tests_Lib_MermaidViewport_ResolvePan_ResolvesPointerTravelFromTheDragOrigin_StartPosition,
} from '../../types/tests/lib/mermaid-viewport.test.d.ts';

/**
 * Tests - Lib - Mermaid Viewport - Clamp Scale.
 *
 * @since 0.30.0
 */
describe('clampScale', () => {
  it('clamps requests to the supported zoom range', () => {
    const belowMinimum: Tests_Lib_MermaidViewport_ClampScale_ClampsRequestsToTheSupportedZoomRange_BelowMinimum = clampScale(0);
    const withinRange: Tests_Lib_MermaidViewport_ClampScale_ClampsRequestsToTheSupportedZoomRange_WithinRange = clampScale(1.75);
    const aboveMaximum: Tests_Lib_MermaidViewport_ClampScale_ClampsRequestsToTheSupportedZoomRange_AboveMaximum = clampScale(5);

    strictEqual(belowMinimum, MERMAID_MIN_SCALE);
    strictEqual(withinRange, 1.75);
    strictEqual(aboveMaximum, MERMAID_MAX_SCALE);

    return;
  });

  return;
});

/**
 * Tests - Lib - Mermaid Viewport - Resolve Pan.
 *
 * @since 0.30.0
 */
describe('resolvePan', () => {
  it('resolves pointer travel from the drag origin', () => {
    const startPosition: Tests_Lib_MermaidViewport_ResolvePan_ResolvesPointerTravelFromTheDragOrigin_StartPosition = {
      x: 25,
      y: -10,
    };
    const start: Tests_Lib_MermaidViewport_ResolvePan_ResolvesPointerTravelFromTheDragOrigin_Start = {
      x: 100,
      y: 80,
    };
    const current: Tests_Lib_MermaidViewport_ResolvePan_ResolvesPointerTravelFromTheDragOrigin_Current = {
      x: 145,
      y: 50,
    };
    const result: Tests_Lib_MermaidViewport_ResolvePan_ResolvesPointerTravelFromTheDragOrigin_Result = resolvePan(startPosition, start, current);

    deepStrictEqual(result, {
      x: 70,
      y: -40,
    });

    return;
  });

  return;
});

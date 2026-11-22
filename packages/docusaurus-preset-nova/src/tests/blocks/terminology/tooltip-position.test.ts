import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { computeTooltipPosition } from '../../../blocks/terminology/tooltip-position.js';

import type {
  Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_CentresAboveTheTerm_Result,
  Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_FlipsBelowNearTheTopOfTheViewport_Result,
  Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_KeepsTheArrowOffTheCorners_Result,
  Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_StaysInsideTheViewportOnTheLeft_Result,
  Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_StaysInsideTheViewportOnTheRight_Result,
} from '../../../types/tests/blocks/terminology/tooltip-position.test.d.ts';

/**
 * Tests - Blocks - Terminology - Tooltip Position - Compute Tooltip Position.
 *
 * @since 0.50.0
 */
describe('computeTooltipPosition', async () => {
  it('centres above the term', () => {
    const result: Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_CentresAboveTheTerm_Result = computeTooltipPosition({
      top: 300,
      bottom: 320,
      left: 500,
      width: 40,
    }, {
      width: 200,
      height: 60,
    }, {
      width: 1400,
      height: 900,
    }, 10);

    strictEqual(result['placement'], 'top');
    strictEqual(result['top'], 230);
    strictEqual(result['left'], 420);
    strictEqual(result['arrowLeft'], 100);

    return;
  });

  it('flips below near the top of the viewport', () => {
    const result: Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_FlipsBelowNearTheTopOfTheViewport_Result = computeTooltipPosition({
      top: 40,
      bottom: 60,
      left: 500,
      width: 40,
    }, {
      width: 200,
      height: 60,
    }, {
      width: 1400,
      height: 900,
    }, 10);

    strictEqual(result['placement'], 'bottom');
    strictEqual(result['top'], 70);

    return;
  });

  it('stays inside the viewport on the left', () => {
    const result: Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_StaysInsideTheViewportOnTheLeft_Result = computeTooltipPosition({
      top: 300,
      bottom: 320,
      left: 10,
      width: 30,
    }, {
      width: 200,
      height: 60,
    }, {
      width: 390,
      height: 844,
    }, 10);

    strictEqual(result['left'], 8);
    strictEqual(result['arrowLeft'], 17);

    return;
  });

  it('stays inside the viewport on the right', () => {
    const result: Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_StaysInsideTheViewportOnTheRight_Result = computeTooltipPosition({
      top: 300,
      bottom: 320,
      left: 350,
      width: 30,
    }, {
      width: 200,
      height: 60,
    }, {
      width: 390,
      height: 844,
    }, 10);

    strictEqual(result['left'], 182);
    strictEqual(result['arrowLeft'], 183);

    return;
  });

  it('keeps the arrow off the corners', () => {
    const result: Tests_Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_KeepsTheArrowOffTheCorners_Result = computeTooltipPosition({
      top: 300,
      bottom: 320,
      left: 0,
      width: 4,
    }, {
      width: 200,
      height: 60,
    }, {
      width: 390,
      height: 844,
    }, 10);

    strictEqual(result['arrowLeft'], 12);

    return;
  });

  return;
});

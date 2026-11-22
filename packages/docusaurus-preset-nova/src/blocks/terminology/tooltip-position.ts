import type {
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor,
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_ArrowLeft,
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_CenterX,
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_FitsAbove,
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Gap,
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Left,
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_MaxLeft,
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Returns,
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Tooltip,
  Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Viewport,
  Blocks_Terminology_TooltipPosition_TooltipArrowInset,
  Blocks_Terminology_TooltipPosition_TooltipEdgeMargin,
} from '../../types/blocks/terminology/tooltip-position.d.ts';

/**
 * Blocks - Terminology - Tooltip Position - Tooltip Edge Margin.
 *
 * Smallest distance, in pixels, the tooltip keeps from the viewport edges so
 * it never touches or runs past them.
 *
 * @since 0.50.0
 */
const tooltipEdgeMargin: Blocks_Terminology_TooltipPosition_TooltipEdgeMargin = 8;

/**
 * Blocks - Terminology - Tooltip Position - Tooltip Arrow Inset.
 *
 * Smallest distance, in pixels, between the arrow and the tooltip's sides,
 * so the arrow never slides off a rounded corner.
 *
 * @since 0.50.0
 */
const tooltipArrowInset: Blocks_Terminology_TooltipPosition_TooltipArrowInset = 12;

/**
 * Blocks - Terminology - Tooltip Position - Compute Tooltip Position.
 *
 * Places the tooltip centred above the term, or below it when there's no room
 * above, keeps it inside the viewport sideways, and points the arrow at the
 * term. Coordinates are viewport pixels for a fixed-position tooltip.
 *
 * @param {Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor}   anchor   - Anchor.
 * @param {Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Tooltip}  tooltip  - Tooltip.
 * @param {Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Viewport} viewport - Viewport.
 * @param {Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Gap}      gap      - Gap.
 *
 * @returns {Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Returns}
 *
 * @since 0.50.0
 */
export function computeTooltipPosition(anchor: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor, tooltip: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Tooltip, viewport: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Viewport, gap: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Gap): Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Returns {
  const centerX: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_CenterX = anchor['left'] + (anchor['width'] / 2);
  const maxLeft: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_MaxLeft = Math.max(tooltipEdgeMargin, viewport['width'] - tooltip['width'] - tooltipEdgeMargin);
  const left: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Left = Math.min(maxLeft, Math.max(tooltipEdgeMargin, centerX - (tooltip['width'] / 2)));
  const fitsAbove: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_FitsAbove = anchor['top'] - gap - tooltip['height'] >= tooltipEdgeMargin;
  const arrowLeft: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_ArrowLeft = Math.min(Math.max(tooltipArrowInset, centerX - left), Math.max(tooltipArrowInset, tooltip['width'] - tooltipArrowInset));

  return {
    top: (fitsAbove === true) ? anchor['top'] - gap - tooltip['height'] : anchor['bottom'] + gap,
    left,
    placement: (fitsAbove === true) ? 'top' : 'bottom',
    arrowLeft,
  };
}

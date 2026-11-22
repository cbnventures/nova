import type { Shared_TerminologyTooltipPosition } from '../../shared.d.ts';

/**
 * Blocks - Terminology - Tooltip Position.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_TooltipPosition_TooltipEdgeMargin = number;

export type Blocks_Terminology_TooltipPosition_TooltipArrowInset = number;

/**
 * Blocks - Terminology - Tooltip Position - Compute Tooltip Position.
 *
 * @since 0.50.0
 */
export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor_Top = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor_Bottom = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor_Left = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor_Width = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor = {
  top: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor_Top;
  bottom: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor_Bottom;
  left: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor_Left;
  width: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Anchor_Width;
};

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Tooltip_Width = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Tooltip_Height = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Tooltip = {
  width: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Tooltip_Width;
  height: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Tooltip_Height;
};

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Viewport_Width = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Viewport_Height = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Viewport = {
  width: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Viewport_Width;
  height: Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Viewport_Height;
};

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Gap = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Returns = Shared_TerminologyTooltipPosition;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_CenterX = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_MaxLeft = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_Left = number;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_FitsAbove = boolean;

export type Blocks_Terminology_TooltipPosition_ComputeTooltipPosition_ArrowLeft = number;

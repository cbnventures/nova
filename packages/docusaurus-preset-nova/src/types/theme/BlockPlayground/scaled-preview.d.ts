import type {
  Dispatch,
  ReactNode,
  RefObject,
  SetStateAction,
} from 'react';

import type {
  Shared_BlockPlaygroundPreviewLayout,
  Shared_BlockPlaygroundPreviewSize,
  Shared_BlockPlaygroundVisibleCrop,
  Shared_BlockPlaygroundVisibleEdge,
} from '../../shared.d.ts';

/**
 * Theme - Block Playground - Scaled Preview.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_ScaledPreview_ScaledPreviewMaxWidth = number;

export type Theme_BlockPlayground_ScaledPreview_ScaledPreviewMinScale = number;

export type Theme_BlockPlayground_ScaledPreview_ScaledPreviewZoomQuery = string;

export type Theme_BlockPlayground_ScaledPreview_ScaledPreviewMaxSettleFrames = number;

/**
 * Theme - Block Playground - Scaled Preview - Block Playground Scaled Preview.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Props_Children = ReactNode;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Props = {
  children: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Props_Children;
};

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_OuterRef = RefObject<HTMLDivElement | null>;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_InnerRef = RefObject<HTMLDivElement | null>;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_PreviewLayoutState = [Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_PreviewLayout, Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SetPreviewLayout];

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_PreviewLayout = Shared_BlockPlaygroundPreviewLayout | undefined;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SetPreviewLayout = Dispatch<SetStateAction<Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_PreviewLayout>>;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsReadyState = [Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsReady, Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SetIsReady];

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsReady = boolean;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SetIsReady = Dispatch<SetStateAction<Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsReady>>;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_OuterElement = HTMLDivElement | null;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_InnerElement = HTMLDivElement | null;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsActive = boolean;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsSettled = boolean;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_FrameId = number;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_StableFrames = number;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SettleFrames = number;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Previous = Shared_BlockPlaygroundPreviewLayout | undefined;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Observer = ResizeObserver;

/**
 * Theme - Block Playground - Scaled Preview - Block Playground Scaled Preview - Commit.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Commit_Next = Shared_BlockPlaygroundPreviewLayout;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Commit_Returns = undefined;

/**
 * Theme - Block Playground - Scaled Preview - Block Playground Scaled Preview - Measure.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Returns = Shared_BlockPlaygroundPreviewLayout | undefined;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_CanvasElement = Element | null;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_CanvasBackground = string;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_ColumnWidth = number;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_IsZoomed = boolean;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Fit = Shared_BlockPlaygroundPreviewSize;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_CanvasPadding = number;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Allowance = number;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Edges = Shared_BlockPlaygroundVisibleEdge[];

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Crop = Shared_BlockPlaygroundVisibleCrop;

/**
 * Theme - Block Playground - Scaled Preview - Block Playground Scaled Preview - Settle.
 *
 * @since 0.50.0
 */
export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Settle_Returns = undefined;

export type Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Settle_Next = Shared_BlockPlaygroundPreviewLayout | undefined;

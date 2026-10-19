import type {
  CSSProperties,
  Dispatch,
  KeyboardEvent,
  PointerEvent,
  RefObject,
  SetStateAction,
} from 'react';

import type {
  Shared_MermaidRenderOutput,
  Shared_MermaidViewportPosition,
} from '../../shared.d.ts';

/**
 * Theme - Mermaid.
 *
 * @since 0.15.0
 */
export type Theme_Mermaid_Index_Mermaid_Props_Value = string;

export type Theme_Mermaid_Index_Mermaid_Props_ClassName = string | undefined;

export type Theme_Mermaid_Index_Mermaid_Props_Style = CSSProperties | undefined;

export type Theme_Mermaid_Index_Mermaid_Props = {
  value: Theme_Mermaid_Index_Mermaid_Props_Value;
  className?: Theme_Mermaid_Index_Mermaid_Props_ClassName;
  style?: Theme_Mermaid_Index_Mermaid_Props_Style;
  [key: string]: unknown;
};

export type Theme_Mermaid_Index_Mermaid_Returns = React.JSX.Element;

export type Theme_Mermaid_Index_Mermaid_ColorMode = string;

/**
 * Theme - Mermaid - Content.
 *
 * @since 0.15.0
 */
export type Theme_Mermaid_Index_MermaidContent_Props_Value = string;

export type Theme_Mermaid_Index_MermaidContent_Props_ClassName = string | undefined;

export type Theme_Mermaid_Index_MermaidContent_Props_Style = CSSProperties | undefined;

export type Theme_Mermaid_Index_MermaidContent_Props = {
  value: Theme_Mermaid_Index_MermaidContent_Props_Value;
  className?: Theme_Mermaid_Index_MermaidContent_Props_ClassName;
  style?: Theme_Mermaid_Index_MermaidContent_Props_Style;
  [key: string]: unknown;
};

export type Theme_Mermaid_Index_MermaidContent_Returns = React.JSX.Element | null;

export type Theme_Mermaid_Index_MermaidContent_RenderResult = Shared_MermaidRenderOutput | null;

export type Theme_Mermaid_Index_MermaidContent_ContainerRef = RefObject<HTMLDivElement | null>;

export type Theme_Mermaid_Index_MermaidContent_Scale = number;

export type Theme_Mermaid_Index_MermaidContent_ScaleState = [Theme_Mermaid_Index_MermaidContent_Scale, Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_Scale>>];

export type Theme_Mermaid_Index_MermaidContent_SetScale = Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_Scale>>;

export type Theme_Mermaid_Index_MermaidContent_Position = Shared_MermaidViewportPosition;

export type Theme_Mermaid_Index_MermaidContent_PositionState = [Theme_Mermaid_Index_MermaidContent_Position, Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_Position>>];

export type Theme_Mermaid_Index_MermaidContent_SetPosition = Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_Position>>;

export type Theme_Mermaid_Index_MermaidContent_IsDragging = boolean;

export type Theme_Mermaid_Index_MermaidContent_IsDraggingState = [Theme_Mermaid_Index_MermaidContent_IsDragging, Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_IsDragging>>];

export type Theme_Mermaid_Index_MermaidContent_SetIsDragging = Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_IsDragging>>;

export type Theme_Mermaid_Index_MermaidContent_IsNativeFullscreen = boolean;

export type Theme_Mermaid_Index_MermaidContent_IsNativeFullscreenState = [Theme_Mermaid_Index_MermaidContent_IsNativeFullscreen, Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_IsNativeFullscreen>>];

export type Theme_Mermaid_Index_MermaidContent_SetIsNativeFullscreen = Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_IsNativeFullscreen>>;

export type Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreen = boolean;

export type Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreenState = [Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreen, Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreen>>];

export type Theme_Mermaid_Index_MermaidContent_SetIsFallbackFullscreen = Dispatch<SetStateAction<Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreen>>;

export type Theme_Mermaid_Index_MermaidContent_Drag_PointerId = number;

export type Theme_Mermaid_Index_MermaidContent_Drag_Start = Shared_MermaidViewportPosition;

export type Theme_Mermaid_Index_MermaidContent_Drag_StartPosition = Shared_MermaidViewportPosition;

export type Theme_Mermaid_Index_MermaidContent_Drag = {
  pointerId: Theme_Mermaid_Index_MermaidContent_Drag_PointerId;
  start: Theme_Mermaid_Index_MermaidContent_Drag_Start;
  startPosition: Theme_Mermaid_Index_MermaidContent_Drag_StartPosition;
};

export type Theme_Mermaid_Index_MermaidContent_DragRef = RefObject<Theme_Mermaid_Index_MermaidContent_Drag | null>;

/**
 * Theme - Mermaid - Mermaid Content - Handle Fullscreen Change.
 *
 * @since 0.33.0
 */
export type Theme_Mermaid_Index_MermaidContent_HandleFullscreenChange_Returns = undefined;

export type Theme_Mermaid_Index_MermaidContent_FullscreenEffect_CleanupReturns = undefined;

/**
 * Theme - Mermaid - Mermaid Content - Handle Fallback Key Down.
 *
 * @since 0.33.0
 */
export type Theme_Mermaid_Index_MermaidContent_HandleFallbackKeyDown_Event = globalThis.KeyboardEvent;

export type Theme_Mermaid_Index_MermaidContent_HandleFallbackKeyDown_Returns = undefined;

export type Theme_Mermaid_Index_MermaidContent_FallbackFullscreenEffect_CleanupReturns = undefined;

export type Theme_Mermaid_Index_MermaidContent_ClassName = string;

export type Theme_Mermaid_Index_MermaidContent_FullscreenClassName = string;

export type Theme_Mermaid_Index_MermaidContent_CanZoomIn = boolean;

export type Theme_Mermaid_Index_MermaidContent_CanZoomOut = boolean;

export type Theme_Mermaid_Index_MermaidContent_IsInteractive = boolean;

export type Theme_Mermaid_Index_MermaidContent_IsFullscreen = boolean;

export type Theme_Mermaid_Index_MermaidContent_ScaleLabel = string;

export type Theme_Mermaid_Index_MermaidContent_ZoomInLabel = string;

export type Theme_Mermaid_Index_MermaidContent_ZoomOutLabel = string;

export type Theme_Mermaid_Index_MermaidContent_ResetLabel = string;

export type Theme_Mermaid_Index_MermaidContent_EnterFullscreenLabel = string;

export type Theme_Mermaid_Index_MermaidContent_ExitFullscreenLabel = string;

export type Theme_Mermaid_Index_MermaidContent_FullscreenLabel = string;

export type Theme_Mermaid_Index_MermaidContent_ViewportLabel = string;

export type Theme_Mermaid_Index_MermaidContent_StageStyle = CSSProperties;

export type Theme_Mermaid_Index_MermaidContent_ViewportClassName = string;

export type Theme_Mermaid_Index_MermaidContent_RequestFullscreen = (() => Promise<void>) | undefined;

/**
 * Theme - Mermaid - Mermaid Content - Reset View.
 *
 * @since 0.33.0
 */
export type Theme_Mermaid_Index_MermaidContent_ResetView_Returns = undefined;

/**
 * Theme - Mermaid - Mermaid Content - Toggle Fullscreen.
 *
 * @since 0.33.0
 */
export type Theme_Mermaid_Index_MermaidContent_ToggleFullscreen_Returns = undefined;

/**
 * Theme - Mermaid - Mermaid Content - Handle Key Down.
 *
 * @since 0.30.0
 */
export type Theme_Mermaid_Index_MermaidContent_HandleKeyDown_Event = KeyboardEvent<HTMLDivElement>;

export type Theme_Mermaid_Index_MermaidContent_HandleKeyDown_Returns = undefined;

export type Theme_Mermaid_Index_MermaidContent_HandleKeyDown_NextPosition = Shared_MermaidViewportPosition | undefined;

/**
 * Theme - Mermaid - Mermaid Content - Handle Pointer Down.
 *
 * @since 0.30.0
 */
export type Theme_Mermaid_Index_MermaidContent_HandlePointerDown_Event = PointerEvent<HTMLDivElement>;

export type Theme_Mermaid_Index_MermaidContent_HandlePointerDown_Returns = undefined;

/**
 * Theme - Mermaid - Mermaid Content - Handle Pointer End.
 *
 * @since 0.30.0
 */
export type Theme_Mermaid_Index_MermaidContent_HandlePointerEnd_Event = PointerEvent<HTMLDivElement>;

export type Theme_Mermaid_Index_MermaidContent_HandlePointerEnd_Returns = undefined;

/**
 * Theme - Mermaid - Mermaid Content - Handle Pointer Move.
 *
 * @since 0.30.0
 */
export type Theme_Mermaid_Index_MermaidContent_HandlePointerMove_Event = PointerEvent<HTMLDivElement>;

export type Theme_Mermaid_Index_MermaidContent_HandlePointerMove_Returns = undefined;

/**
 * Theme - Mermaid - Mermaid Content - Zoom In.
 *
 * @since 0.30.0
 */
export type Theme_Mermaid_Index_MermaidContent_ZoomIn_Returns = undefined;

export type Theme_Mermaid_Index_MermaidContent_ZoomIn_NextScale = number;

/**
 * Theme - Mermaid - Mermaid Content - Zoom Out.
 *
 * @since 0.30.0
 */
export type Theme_Mermaid_Index_MermaidContent_ZoomOut_Returns = undefined;

export type Theme_Mermaid_Index_MermaidContent_ZoomOut_NextScale = number;

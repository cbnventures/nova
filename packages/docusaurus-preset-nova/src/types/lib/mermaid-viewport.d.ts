import type { Shared_MermaidViewportPosition } from '../shared.d.ts';

/**
 * Lib - Mermaid Viewport - Minimum Scale.
 *
 * @since 0.30.0
 */
export type Lib_MermaidViewport_MinScale = number;

/**
 * Lib - Mermaid Viewport - Maximum Scale.
 *
 * @since 0.30.0
 */
export type Lib_MermaidViewport_MaxScale = number;

/**
 * Lib - Mermaid Viewport - Scale Step.
 *
 * @since 0.30.0
 */
export type Lib_MermaidViewport_ScaleStep = number;

/**
 * Lib - Mermaid Viewport - Pan Step.
 *
 * @since 0.30.0
 */
export type Lib_MermaidViewport_PanStep = number;

/**
 * Lib - Mermaid Viewport - Clamp Scale.
 *
 * @since 0.30.0
 */
export type Lib_MermaidViewport_ClampScale_Value = number;

export type Lib_MermaidViewport_ClampScale_Returns = number;

/**
 * Lib - Mermaid Viewport - Resolve Pan.
 *
 * @since 0.30.0
 */
export type Lib_MermaidViewport_ResolvePan_StartPosition = Shared_MermaidViewportPosition;

export type Lib_MermaidViewport_ResolvePan_Start = Shared_MermaidViewportPosition;

export type Lib_MermaidViewport_ResolvePan_Current = Shared_MermaidViewportPosition;

export type Lib_MermaidViewport_ResolvePan_Returns = Shared_MermaidViewportPosition;

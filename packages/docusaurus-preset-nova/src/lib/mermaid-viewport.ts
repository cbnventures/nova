import type {
  Lib_MermaidViewport_ClampScale_Returns,
  Lib_MermaidViewport_ClampScale_Value,
  Lib_MermaidViewport_MaxScale,
  Lib_MermaidViewport_MinScale,
  Lib_MermaidViewport_PanStep,
  Lib_MermaidViewport_ResolvePan_Current,
  Lib_MermaidViewport_ResolvePan_Returns,
  Lib_MermaidViewport_ResolvePan_Start,
  Lib_MermaidViewport_ResolvePan_StartPosition,
  Lib_MermaidViewport_ScaleStep,
} from '../types/lib/mermaid-viewport.d.ts';

/**
 * Lib - Mermaid Viewport - Mermaid Min Scale.
 *
 * Keeps diagrams legible while still allowing readers to zoom out after they
 * have explored a magnified graph.
 *
 * @since 0.30.0
 */
export const MERMAID_MIN_SCALE: Lib_MermaidViewport_MinScale = 0.5;

/**
 * Lib - Mermaid Viewport - Mermaid Max Scale.
 *
 * Caps magnification so transformed SVG geometry remains practical to pan on
 * both touch screens and pointer-driven desktops.
 *
 * @since 0.30.0
 */
export const MERMAID_MAX_SCALE: Lib_MermaidViewport_MaxScale = 3;

/**
 * Lib - Mermaid Viewport - Mermaid Scale Step.
 *
 * Defines one predictable increment for both zoom buttons so readers can
 * move through the supported magnification range consistently.
 *
 * @since 0.30.0
 */
export const MERMAID_SCALE_STEP: Lib_MermaidViewport_ScaleStep = 0.25;

/**
 * Lib - Mermaid Viewport - Mermaid Pan Step.
 *
 * Moves a magnified diagram by one consistent keyboard increment so arrow
 * navigation remains predictable across every rendered graph.
 *
 * @since 0.30.0
 */
export const MERMAID_PAN_STEP: Lib_MermaidViewport_PanStep = 32;

/**
 * Lib - Mermaid Viewport - Clamp Scale.
 *
 * Restricts a requested diagram scale to the supported viewport range so UI
 * controls never create an impractical transform.
 *
 * @param {Lib_MermaidViewport_ClampScale_Value} value - Value.
 *
 * @returns {Lib_MermaidViewport_ClampScale_Returns}
 *
 * @since 0.30.0
 */
export function clampScale(value: Lib_MermaidViewport_ClampScale_Value): Lib_MermaidViewport_ClampScale_Returns {
  return Math.min(MERMAID_MAX_SCALE, Math.max(MERMAID_MIN_SCALE, value));
}

/**
 * Lib - Mermaid Viewport - Resolve Pan.
 *
 * Adds pointer travel to the position captured when a drag starts so each
 * move is stable instead of accumulating rounding drift.
 *
 * @param {Lib_MermaidViewport_ResolvePan_StartPosition} startPosition - Start position.
 * @param {Lib_MermaidViewport_ResolvePan_Start}         start         - Start.
 * @param {Lib_MermaidViewport_ResolvePan_Current}       current       - Current.
 *
 * @returns {Lib_MermaidViewport_ResolvePan_Returns}
 *
 * @since 0.30.0
 */
export function resolvePan(startPosition: Lib_MermaidViewport_ResolvePan_StartPosition, start: Lib_MermaidViewport_ResolvePan_Start, current: Lib_MermaidViewport_ResolvePan_Current): Lib_MermaidViewport_ResolvePan_Returns {
  return {
    x: startPosition['x'] + current['x'] - start['x'],
    y: startPosition['y'] + current['y'] - start['y'],
  };
}

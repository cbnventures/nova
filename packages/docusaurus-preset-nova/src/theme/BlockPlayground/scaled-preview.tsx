import { useLayoutEffect, useRef, useState } from 'react';

import { computePreviewScale, isSameLayout } from './preview-scale.js';
import {
  collectVisibleEdges,
  computeVisibleCrop,
  hasActiveAnimations,
} from './visible-bounds.js';

import type {
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Commit_Next,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Commit_Returns,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_FrameId,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_InnerElement,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_InnerRef,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsActive,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsReady,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsReadyState,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsSettled,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Allowance,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_CanvasBackground,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_CanvasElement,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_CanvasPadding,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_ColumnWidth,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Crop,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Edges,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Fit,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_IsZoomed,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Returns,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Observer,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_OuterElement,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_OuterRef,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_PreviewLayout,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_PreviewLayoutState,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Previous,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Props,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SetIsReady,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SetPreviewLayout,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Settle_Next,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Settle_Returns,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SettleFrames,
  Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_StableFrames,
  Theme_BlockPlayground_ScaledPreview_ScaledPreviewMaxSettleFrames,
  Theme_BlockPlayground_ScaledPreview_ScaledPreviewMaxWidth,
  Theme_BlockPlayground_ScaledPreview_ScaledPreviewMinScale,
  Theme_BlockPlayground_ScaledPreview_ScaledPreviewZoomQuery,
} from '../../types/theme/BlockPlayground/scaled-preview.d.ts';

/**
 * Theme - Block Playground - Scaled Preview - Scaled Preview Max Width.
 *
 * Desktop width, in pixels, that blocks lay out at before the preview
 * scales them down to fit the docs column.
 *
 * @since 0.50.0
 */
const scaledPreviewMaxWidth: Theme_BlockPlayground_ScaledPreview_ScaledPreviewMaxWidth = 1280;

/**
 * Theme - Block Playground - Scaled Preview - Scaled Preview Min Scale.
 *
 * Smallest zoom the preview uses. Below it the layout width narrows instead,
 * so small blocks never shrink into hard-to-read islands.
 *
 * @since 0.50.0
 */
const scaledPreviewMinScale: Theme_BlockPlayground_ScaledPreview_ScaledPreviewMinScale = 0.75;

/**
 * Theme - Block Playground - Scaled Preview - Scaled Preview Zoom Query.
 *
 * Screens matching this query get the zoomed desktop preview. Narrower
 * screens show blocks at real size, in their own mobile layouts.
 *
 * @since 0.50.0
 */
const scaledPreviewZoomQuery: Theme_BlockPlayground_ScaledPreview_ScaledPreviewZoomQuery = '(min-width: 768px)';

/**
 * Theme - Block Playground - Scaled Preview - Scaled Preview Max Settle Frames.
 *
 * Longest the preview waits, in animation frames, for an entrance animation
 * or late layout to settle before it shows anyway.
 *
 * @since 0.50.0
 */
const scaledPreviewMaxSettleFrames: Theme_BlockPlayground_ScaledPreview_ScaledPreviewMaxSettleFrames = 180;

/**
 * Theme - Block Playground - Scaled Preview - Block Playground Scaled Preview.
 *
 * Lays its children out at desktop width and zooms them out to the column.
 * It stays invisible until web fonts load and the layout holds still for two
 * frames, then fades in, so the first frame a reader sees is the final one.
 *
 * @param {Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.50.0
 */
function BlockPlaygroundScaledPreview(props: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Props) {
  const outerRef: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_OuterRef = useRef<HTMLDivElement | null>(null);
  const innerRef: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_InnerRef = useRef<HTMLDivElement | null>(null);
  const previewLayoutState: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_PreviewLayoutState = useState<Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_PreviewLayout>(undefined);
  const previewLayout: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_PreviewLayout = previewLayoutState[0];
  const setPreviewLayout: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SetPreviewLayout = previewLayoutState[1];
  const isReadyState: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsReadyState = useState<Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsReady>(false);
  const isReady: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsReady = isReadyState[0];
  const setIsReady: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SetIsReady = isReadyState[1];

  useLayoutEffect(() => {
    const outerElement: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_OuterElement = outerRef.current;
    const innerElement: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_InnerElement = innerRef.current;

    if (outerElement === null || innerElement === null) {
      return undefined;
    }

    let isActive: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsActive = true;
    let isSettled: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_IsSettled = false;
    let frameId: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_FrameId = 0;
    let stableFrames: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_StableFrames = 0;
    let settleFrames: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_SettleFrames = 0;
    let previous: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Previous = undefined;

    /**
     * Theme - Block Playground - Scaled Preview - Block Playground Scaled Preview - Measure.
     *
     * Finds the visible content's vertical extent and returns the zoom,
     * layout width, crop offset, and outer height that make it fit.
     *
     * @returns {Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Returns}
     *
     * @since 0.50.0
     */
    function measure(): Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Returns {
      if (outerElement === null || innerElement === null) {
        return undefined;
      }

      const canvasElement: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_CanvasElement = outerElement.closest('.nova-block-playground-canvas');
      const canvasBackground: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_CanvasBackground = (canvasElement !== null) ? getComputedStyle(canvasElement)['backgroundColor'] : '';
      const columnWidth: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_ColumnWidth = outerElement.clientWidth;
      const isZoomed: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_IsZoomed = window.matchMedia(scaledPreviewZoomQuery).matches;

      // Phones render at real size so blocks use their own mobile layouts.
      const fit: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Fit = (isZoomed === true) ? computePreviewScale(columnWidth, 0, scaledPreviewMaxWidth, scaledPreviewMinScale) : computePreviewScale(columnWidth, 0, columnWidth, 1);
      const canvasPadding: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_CanvasPadding = (canvasElement !== null) ? parseFloat(getComputedStyle(canvasElement)['paddingTop']) : 0;

      // Shadows may spill into the canvas padding, measured here in unzoomed pixels.
      const allowance: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Allowance = (Number.isNaN(canvasPadding) === true) ? 0 : canvasPadding / fit['scale'];
      const edges: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Edges = collectVisibleEdges(innerElement, canvasBackground);
      const crop: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Measure_Crop = computeVisibleCrop(edges, innerElement.offsetHeight, allowance);

      return {
        size: {
          scale: fit['scale'],
          width: fit['width'],
          height: Math.ceil(crop['height'] * fit['scale']),
        },
        crop,
      };
    }

    /**
     * Theme - Block Playground - Scaled Preview - Block Playground Scaled Preview - Commit.
     *
     * Stores a new layout only when it differs by a pixel or more, so tiny
     * measuring noise never re-renders or nudges the preview.
     *
     * @param {Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Commit_Next} next - Next.
     *
     * @returns {Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Commit_Returns}
     *
     * @since 0.50.0
     */
    function commit(next: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Commit_Next): Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Commit_Returns {
      setPreviewLayout((current) => ((current !== undefined && isSameLayout(current, next) === true) ? current : next));

      return undefined;
    }

    /**
     * Theme - Block Playground - Scaled Preview - Block Playground Scaled Preview - Settle.
     *
     * Measures once per frame while the preview is still hidden, applying
     * each result, until the layout holds still for two frames in a row.
     * Entrance animations finish inside this window, so they never show.
     *
     * @returns {Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Settle_Returns}
     *
     * @since 0.50.0
     */
    function settle(): Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Settle_Returns {
      if (isActive === false || innerElement === null) {
        return undefined;
      }

      const next: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Settle_Next = measure();

      if (next === undefined) {
        return undefined;
      }

      // A held entrance animation (still in its delay) looks stable but is offset, so it doesn't count.
      stableFrames = (
        previous !== undefined
        && isSameLayout(previous, next) === true
        && hasActiveAnimations(innerElement) === false
      ) ? stableFrames + 1 : 0;
      settleFrames += 1;
      previous = next;

      // While hidden, every frame is applied; once visible, only the settled result is.
      if (isSettled === false) {
        commit(next);
      }

      if (stableFrames >= 2 || settleFrames >= scaledPreviewMaxSettleFrames) {
        commit(next);

        isSettled = true;

        setIsReady(true);

        return undefined;
      }

      frameId = requestAnimationFrame(settle);

      return undefined;
    }

    // After the first settle, only real layout changes (code edits, column width, fonts) re-measure.
    // Hover transforms and shadows never resize these boxes, so they never trigger it.
    const observer: Theme_BlockPlayground_ScaledPreview_BlockPlaygroundScaledPreview_Observer = new ResizeObserver(() => {
      if (isSettled === false) {
        return undefined;
      }

      cancelAnimationFrame(frameId);

      stableFrames = 0;
      settleFrames = 0;
      previous = undefined;
      frameId = requestAnimationFrame(settle);

      return undefined;
    });

    observer.observe(outerElement);
    observer.observe(innerElement);

    void document.fonts.ready.then(() => {
      if (isActive === true) {
        frameId = requestAnimationFrame(settle);
      }

      return undefined;
    });

    return () => {
      isActive = false;

      cancelAnimationFrame(frameId);

      observer.disconnect();

      return undefined;
    };
  }, []);

  return (
    <div
      ref={outerRef}
      className="nova-block-playground-viewport"
      data-ready={(isReady === true) ? 'true' : 'false'}
      style={(previewLayout !== undefined) ? { height: `${previewLayout['size']['height']}px` } : undefined}
    >
      <div
        ref={innerRef}
        className="nova-block-playground-stage"
        style={{
          width: (previewLayout !== undefined && previewLayout['size']['scale'] < 1) ? `${previewLayout['size']['width']}px` : undefined,
          marginTop: (previewLayout !== undefined) ? `${-1 * previewLayout['crop']['offset'] * previewLayout['size']['scale']}px` : undefined,
          transform: (previewLayout !== undefined && previewLayout['size']['scale'] < 1) ? `scale(${previewLayout['size']['scale']})` : undefined,
        }}
      >
        {props['children']}
      </div>
    </div>
  );
}

export default BlockPlaygroundScaledPreview;

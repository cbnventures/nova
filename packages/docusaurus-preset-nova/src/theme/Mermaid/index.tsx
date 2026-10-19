import ErrorBoundary from '@docusaurus/ErrorBoundary';
import { translate } from '@docusaurus/Translate';
import { Icon } from '@iconify/react/offline';
import ErrorPageContent from '@theme/ErrorPageContent';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  clampScale,
  MERMAID_MAX_SCALE,
  MERMAID_MIN_SCALE,
  MERMAID_PAN_STEP,
  MERMAID_SCALE_STEP,
  resolvePan,
} from '../../lib/mermaid-viewport.js';
import {
  MERMAID_CONTAINER_CLASS_NAME,
  useMermaidRenderResult,
} from '../../lib/mermaid.js';
import { useColorModeObserver } from '../../lib/use-color-mode-observer.js';

import type {
  Theme_Mermaid_Index_Mermaid_ColorMode,
  Theme_Mermaid_Index_Mermaid_Props,
  Theme_Mermaid_Index_Mermaid_Returns,
  Theme_Mermaid_Index_MermaidContent_CanZoomIn,
  Theme_Mermaid_Index_MermaidContent_CanZoomOut,
  Theme_Mermaid_Index_MermaidContent_ClassName,
  Theme_Mermaid_Index_MermaidContent_ContainerRef,
  Theme_Mermaid_Index_MermaidContent_DragRef,
  Theme_Mermaid_Index_MermaidContent_EnterFullscreenLabel,
  Theme_Mermaid_Index_MermaidContent_ExitFullscreenLabel,
  Theme_Mermaid_Index_MermaidContent_FallbackFullscreenEffect_CleanupReturns,
  Theme_Mermaid_Index_MermaidContent_FullscreenClassName,
  Theme_Mermaid_Index_MermaidContent_FullscreenEffect_CleanupReturns,
  Theme_Mermaid_Index_MermaidContent_FullscreenLabel,
  Theme_Mermaid_Index_MermaidContent_HandleFallbackKeyDown_Event,
  Theme_Mermaid_Index_MermaidContent_HandleFallbackKeyDown_Returns,
  Theme_Mermaid_Index_MermaidContent_HandleFullscreenChange_Returns,
  Theme_Mermaid_Index_MermaidContent_HandleKeyDown_Event,
  Theme_Mermaid_Index_MermaidContent_HandleKeyDown_NextPosition,
  Theme_Mermaid_Index_MermaidContent_HandleKeyDown_Returns,
  Theme_Mermaid_Index_MermaidContent_HandlePointerDown_Event,
  Theme_Mermaid_Index_MermaidContent_HandlePointerDown_Returns,
  Theme_Mermaid_Index_MermaidContent_HandlePointerEnd_Event,
  Theme_Mermaid_Index_MermaidContent_HandlePointerEnd_Returns,
  Theme_Mermaid_Index_MermaidContent_HandlePointerMove_Event,
  Theme_Mermaid_Index_MermaidContent_HandlePointerMove_Returns,
  Theme_Mermaid_Index_MermaidContent_IsDragging,
  Theme_Mermaid_Index_MermaidContent_IsDraggingState,
  Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreen,
  Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreenState,
  Theme_Mermaid_Index_MermaidContent_IsFullscreen,
  Theme_Mermaid_Index_MermaidContent_IsInteractive,
  Theme_Mermaid_Index_MermaidContent_IsNativeFullscreen,
  Theme_Mermaid_Index_MermaidContent_IsNativeFullscreenState,
  Theme_Mermaid_Index_MermaidContent_Position,
  Theme_Mermaid_Index_MermaidContent_PositionState,
  Theme_Mermaid_Index_MermaidContent_Props,
  Theme_Mermaid_Index_MermaidContent_RenderResult,
  Theme_Mermaid_Index_MermaidContent_RequestFullscreen,
  Theme_Mermaid_Index_MermaidContent_ResetLabel,
  Theme_Mermaid_Index_MermaidContent_ResetView_Returns,
  Theme_Mermaid_Index_MermaidContent_Returns,
  Theme_Mermaid_Index_MermaidContent_Scale,
  Theme_Mermaid_Index_MermaidContent_ScaleLabel,
  Theme_Mermaid_Index_MermaidContent_ScaleState,
  Theme_Mermaid_Index_MermaidContent_SetIsDragging,
  Theme_Mermaid_Index_MermaidContent_SetIsFallbackFullscreen,
  Theme_Mermaid_Index_MermaidContent_SetIsNativeFullscreen,
  Theme_Mermaid_Index_MermaidContent_SetPosition,
  Theme_Mermaid_Index_MermaidContent_SetScale,
  Theme_Mermaid_Index_MermaidContent_StageStyle,
  Theme_Mermaid_Index_MermaidContent_ToggleFullscreen_Returns,
  Theme_Mermaid_Index_MermaidContent_ViewportClassName,
  Theme_Mermaid_Index_MermaidContent_ViewportLabel,
  Theme_Mermaid_Index_MermaidContent_ZoomIn_NextScale,
  Theme_Mermaid_Index_MermaidContent_ZoomIn_Returns,
  Theme_Mermaid_Index_MermaidContent_ZoomInLabel,
  Theme_Mermaid_Index_MermaidContent_ZoomOut_NextScale,
  Theme_Mermaid_Index_MermaidContent_ZoomOut_Returns,
  Theme_Mermaid_Index_MermaidContent_ZoomOutLabel,
} from '../../types/theme/Mermaid/index.d.ts';

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions -- The Mermaid viewport is a custom two-dimensional interaction surface whose rendered SVG may contain native links. */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- The application viewport must receive focus so readers can pan it with the arrow keys. */

/**
 * Theme - Mermaid - Content.
 *
 * Renders a Mermaid diagram inside an accessible viewport with zoom buttons,
 * pointer panning, keyboard panning, and a one-click view reset.
 *
 * @param {Theme_Mermaid_Index_MermaidContent_Props} props - Props.
 *
 * @returns {Theme_Mermaid_Index_MermaidContent_Returns}
 *
 * @since 0.15.0
 */
function MermaidContent(props: Theme_Mermaid_Index_MermaidContent_Props): Theme_Mermaid_Index_MermaidContent_Returns {
  const renderResult: Theme_Mermaid_Index_MermaidContent_RenderResult = useMermaidRenderResult({ text: props['value'] });
  const containerRef: Theme_Mermaid_Index_MermaidContent_ContainerRef = useRef<HTMLDivElement | null>(null);
  const scaleState: Theme_Mermaid_Index_MermaidContent_ScaleState = useState<Theme_Mermaid_Index_MermaidContent_Scale>(1);
  const scale: Theme_Mermaid_Index_MermaidContent_Scale = scaleState[0];
  const setScale: Theme_Mermaid_Index_MermaidContent_SetScale = scaleState[1];
  const positionState: Theme_Mermaid_Index_MermaidContent_PositionState = useState<Theme_Mermaid_Index_MermaidContent_Position>({
    x: 0,
    y: 0,
  });
  const position: Theme_Mermaid_Index_MermaidContent_Position = positionState[0];
  const setPosition: Theme_Mermaid_Index_MermaidContent_SetPosition = positionState[1];
  const isDraggingState: Theme_Mermaid_Index_MermaidContent_IsDraggingState = useState<Theme_Mermaid_Index_MermaidContent_IsDragging>(false);
  const isDragging: Theme_Mermaid_Index_MermaidContent_IsDragging = isDraggingState[0];
  const setIsDragging: Theme_Mermaid_Index_MermaidContent_SetIsDragging = isDraggingState[1];
  const isNativeFullscreenState: Theme_Mermaid_Index_MermaidContent_IsNativeFullscreenState = useState<Theme_Mermaid_Index_MermaidContent_IsNativeFullscreen>(false);
  const isNativeFullscreen: Theme_Mermaid_Index_MermaidContent_IsNativeFullscreen = isNativeFullscreenState[0];
  const setIsNativeFullscreen: Theme_Mermaid_Index_MermaidContent_SetIsNativeFullscreen = isNativeFullscreenState[1];
  const isFallbackFullscreenState: Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreenState = useState<Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreen>(false);
  const isFallbackFullscreen: Theme_Mermaid_Index_MermaidContent_IsFallbackFullscreen = isFallbackFullscreenState[0];
  const setIsFallbackFullscreen: Theme_Mermaid_Index_MermaidContent_SetIsFallbackFullscreen = isFallbackFullscreenState[1];
  const dragRef: Theme_Mermaid_Index_MermaidContent_DragRef = useRef(null);

  useEffect(() => {
    if (
      renderResult !== null
      && containerRef.current !== null
      && renderResult['bindFunctions'] !== undefined
    ) {
      renderResult.bindFunctions(containerRef.current);
    }

    return undefined;
  }, [renderResult]);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    /**
     * Theme - Mermaid - Mermaid Content - Handle Fullscreen Change.
     *
     * Synchronizes component state when the browser enters fullscreen or the
     * reader leaves it with Escape or browser chrome.
     *
     * @returns {undefined}
     *
     * @since 0.33.0
     */
    function handleFullscreenChange(): Theme_Mermaid_Index_MermaidContent_HandleFullscreenChange_Returns {
      setIsNativeFullscreen(document.fullscreenElement === containerRef.current);

      return undefined;
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return (): Theme_Mermaid_Index_MermaidContent_FullscreenEffect_CleanupReturns => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);

      return undefined;
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined' || isFallbackFullscreen === false) {
      return undefined;
    }

    /**
     * Theme - Mermaid - Mermaid Content - Handle Fallback Key Down.
     *
     * Leaves the fixed-position fullscreen fallback when Escape is pressed in
     * browsers that do not provide the native Fullscreen API.
     *
     * @param {KeyboardEvent} event - Event.
     *
     * @returns {undefined}
     *
     * @since 0.33.0
     */
    function handleFallbackKeyDown(event: Theme_Mermaid_Index_MermaidContent_HandleFallbackKeyDown_Event): Theme_Mermaid_Index_MermaidContent_HandleFallbackKeyDown_Returns {
      if (event['key'] === 'Escape') {
        setIsFallbackFullscreen(false);
      }

      return undefined;
    }

    document.documentElement.classList.add('nova-mermaid-fullscreen-open');

    window.addEventListener('keydown', handleFallbackKeyDown);

    return (): Theme_Mermaid_Index_MermaidContent_FallbackFullscreenEffect_CleanupReturns => {
      window.removeEventListener('keydown', handleFallbackKeyDown);

      document.documentElement.classList.remove('nova-mermaid-fullscreen-open');

      return undefined;
    };
  }, [isFallbackFullscreen]);

  if (renderResult === null) {
    return null;
  }

  const className: Theme_Mermaid_Index_MermaidContent_ClassName = (props['className'] !== undefined) ? `${MERMAID_CONTAINER_CLASS_NAME} ${props['className']}` : MERMAID_CONTAINER_CLASS_NAME;
  const fullscreenClassName: Theme_Mermaid_Index_MermaidContent_FullscreenClassName = (isFallbackFullscreen === true) ? `${className} nova-mermaid-container--fullscreen` : className;
  const canZoomIn: Theme_Mermaid_Index_MermaidContent_CanZoomIn = scale < MERMAID_MAX_SCALE;
  const canZoomOut: Theme_Mermaid_Index_MermaidContent_CanZoomOut = scale > MERMAID_MIN_SCALE;
  const isInteractive: Theme_Mermaid_Index_MermaidContent_IsInteractive = scale > 1;
  const isFullscreen: Theme_Mermaid_Index_MermaidContent_IsFullscreen = isNativeFullscreen === true || isFallbackFullscreen === true;
  const scaleLabel: Theme_Mermaid_Index_MermaidContent_ScaleLabel = `${Math.round(scale * 100)}%`;
  const zoomInLabel: Theme_Mermaid_Index_MermaidContent_ZoomInLabel = translate({
    id: 'theme.mermaid.zoomIn',
    message: 'Zoom in diagram',
    description: 'Accessible label for the Mermaid diagram zoom-in button',
  });
  const zoomOutLabel: Theme_Mermaid_Index_MermaidContent_ZoomOutLabel = translate({
    id: 'theme.mermaid.zoomOut',
    message: 'Zoom out diagram',
    description: 'Accessible label for the Mermaid diagram zoom-out button',
  });
  const resetLabel: Theme_Mermaid_Index_MermaidContent_ResetLabel = translate({
    id: 'theme.mermaid.resetView',
    message: 'Reset diagram view',
    description: 'Accessible label for the Mermaid diagram reset button',
  });
  const enterFullscreenLabel: Theme_Mermaid_Index_MermaidContent_EnterFullscreenLabel = translate({
    id: 'theme.mermaid.enterFullscreen',
    message: 'View diagram fullscreen',
    description: 'Accessible label for the Mermaid diagram enter-fullscreen button',
  });
  const exitFullscreenLabel: Theme_Mermaid_Index_MermaidContent_ExitFullscreenLabel = translate({
    id: 'theme.mermaid.exitFullscreen',
    message: 'Exit diagram fullscreen',
    description: 'Accessible label for the Mermaid diagram exit-fullscreen button',
  });
  const fullscreenLabel: Theme_Mermaid_Index_MermaidContent_FullscreenLabel = (isFullscreen === true) ? exitFullscreenLabel : enterFullscreenLabel;
  const viewportLabel: Theme_Mermaid_Index_MermaidContent_ViewportLabel = translate({
    id: 'theme.mermaid.viewport',
    message: 'Interactive diagram. Zoom in, then drag or use the arrow keys to pan.',
    description: 'Accessible instructions for the interactive Mermaid diagram viewport',
  });
  const stageStyle: Theme_Mermaid_Index_MermaidContent_StageStyle = {
    transform: `translate(${position['x']}px, ${position['y']}px) scale(${scale})`,
  };
  const viewportClassName: Theme_Mermaid_Index_MermaidContent_ViewportClassName = [
    'nova-mermaid-viewport',
    (isInteractive === true) ? 'nova-mermaid-viewport--interactive' : '',
    (isDragging === true) ? 'nova-mermaid-viewport--dragging' : '',
  ].filter((value) => value !== '').join(' ');

  /**
   * Theme - Mermaid - Mermaid Content - Reset View.
   *
   * Restores the diagram to its fitted scale and places its stage back at the
   * centered origin.
   *
   * @returns {undefined}
   *
   * @since 0.33.0
   */
  function resetView(): Theme_Mermaid_Index_MermaidContent_ResetView_Returns {
    setScale(1);
    setPosition({
      x: 0,
      y: 0,
    });

    return undefined;
  }

  /**
   * Theme - Mermaid - Mermaid Content - Toggle Fullscreen.
   *
   * Enters the browser's native fullscreen surface when available and falls
   * back to a fixed viewport overlay otherwise. Entry always fits and centers
   * the graph; native and fallback modes both retain the same controls.
   *
   * @returns {undefined}
   *
   * @since 0.33.0
   */
  function toggleFullscreen(): Theme_Mermaid_Index_MermaidContent_ToggleFullscreen_Returns {
    if (typeof document === 'undefined' || containerRef.current === null) {
      return undefined;
    }

    if (isFallbackFullscreen === true) {
      setIsFallbackFullscreen(false);

      return undefined;
    }

    if (document.fullscreenElement === containerRef.current) {
      void document.exitFullscreen().catch(() => undefined);

      return undefined;
    }

    resetView();
    setIsDragging(false);

    const requestFullscreen: Theme_Mermaid_Index_MermaidContent_RequestFullscreen = Reflect.get(containerRef.current, 'requestFullscreen') as Theme_Mermaid_Index_MermaidContent_RequestFullscreen;

    if (requestFullscreen === undefined) {
      setIsFallbackFullscreen(true);

      return undefined;
    }

    void requestFullscreen.call(containerRef.current).catch(() => {
      setIsFallbackFullscreen(true);

      return undefined;
    });

    return undefined;
  }

  /**
   * Theme - Mermaid - Mermaid Content - Zoom In.
   *
   * Increases the diagram scale by one supported step while respecting the
   * maximum magnification boundary.
   *
   * @returns {undefined}
   *
   * @since 0.30.0
   */
  function zoomIn(): Theme_Mermaid_Index_MermaidContent_ZoomIn_Returns {
    const nextScale: Theme_Mermaid_Index_MermaidContent_ZoomIn_NextScale = clampScale(scale + MERMAID_SCALE_STEP);

    setScale(nextScale);

    return undefined;
  }

  /**
   * Theme - Mermaid - Mermaid Content - Zoom Out.
   *
   * Decreases the diagram scale by one supported step and recenters the
   * diagram when magnification no longer requires panning.
   *
   * @returns {undefined}
   *
   * @since 0.30.0
   */
  function zoomOut(): Theme_Mermaid_Index_MermaidContent_ZoomOut_Returns {
    const nextScale: Theme_Mermaid_Index_MermaidContent_ZoomOut_NextScale = clampScale(scale - MERMAID_SCALE_STEP);

    setScale(nextScale);

    if (nextScale <= 1) {
      setPosition({
        x: 0,
        y: 0,
      });
    }

    return undefined;
  }

  /**
   * Theme - Mermaid - Mermaid Content - Handle Pointer Down.
   *
   * Captures the starting pointer and diagram positions when a reader begins
   * dragging a magnified diagram outside a clickable node.
   *
   * @param {PointerEvent} event - Event.
   *
   * @returns {undefined}
   *
   * @since 0.30.0
   */
  function handlePointerDown(event: Theme_Mermaid_Index_MermaidContent_HandlePointerDown_Event): Theme_Mermaid_Index_MermaidContent_HandlePointerDown_Returns {
    if (event['button'] !== 0 || isInteractive === false) {
      return undefined;
    }

    if (event['target'] instanceof Element && event['target'].closest('a') !== null) {
      return undefined;
    }

    dragRef.current = {
      pointerId: event['pointerId'],
      start: {
        x: event['clientX'],
        y: event['clientY'],
      },
      startPosition: position,
    };

    event['currentTarget'].setPointerCapture(event['pointerId']);

    setIsDragging(true);

    return undefined;
  }

  /**
   * Theme - Mermaid - Mermaid Content - Handle Pointer Move.
   *
   * Resolves pointer travel against the captured drag origin and applies the
   * resulting position to the diagram stage.
   *
   * @param {PointerEvent} event - Event.
   *
   * @returns {undefined}
   *
   * @since 0.30.0
   */
  function handlePointerMove(event: Theme_Mermaid_Index_MermaidContent_HandlePointerMove_Event): Theme_Mermaid_Index_MermaidContent_HandlePointerMove_Returns {
    if (dragRef.current === null || dragRef.current['pointerId'] !== event['pointerId']) {
      return undefined;
    }

    setPosition(resolvePan(
      dragRef.current['startPosition'],
      dragRef.current['start'],
      {
        x: event['clientX'],
        y: event['clientY'],
      },
    ));

    return undefined;
  }

  /**
   * Theme - Mermaid - Mermaid Content - Handle Pointer End.
   *
   * Releases the active pointer capture and restores the viewport's idle
   * interaction state after a drag ends or is cancelled.
   *
   * @param {PointerEvent} event - Event.
   *
   * @returns {undefined}
   *
   * @since 0.30.0
   */
  function handlePointerEnd(event: Theme_Mermaid_Index_MermaidContent_HandlePointerEnd_Event): Theme_Mermaid_Index_MermaidContent_HandlePointerEnd_Returns {
    if (dragRef.current === null || dragRef.current['pointerId'] !== event['pointerId']) {
      return undefined;
    }

    if (event['currentTarget'].hasPointerCapture(event['pointerId']) === true) {
      event['currentTarget'].releasePointerCapture(event['pointerId']);
    }

    dragRef.current = null;
    setIsDragging(false);

    return undefined;
  }

  /**
   * Theme - Mermaid - Mermaid Content - Handle Key Down.
   *
   * Moves a magnified diagram in fixed steps when a reader uses an arrow key
   * inside the focused viewport.
   *
   * @param {KeyboardEvent} event - Event.
   *
   * @returns {undefined}
   *
   * @since 0.30.0
   */
  function handleKeyDown(event: Theme_Mermaid_Index_MermaidContent_HandleKeyDown_Event): Theme_Mermaid_Index_MermaidContent_HandleKeyDown_Returns {
    if (isInteractive === false) {
      return undefined;
    }

    let nextPosition: Theme_Mermaid_Index_MermaidContent_HandleKeyDown_NextPosition = undefined;

    switch (event['key']) {
      case 'ArrowDown': {
        nextPosition = {
          x: position['x'],
          y: position['y'] - MERMAID_PAN_STEP,
        };
        break;
      }

      case 'ArrowLeft': {
        nextPosition = {
          x: position['x'] + MERMAID_PAN_STEP,
          y: position['y'],
        };
        break;
      }

      case 'ArrowRight': {
        nextPosition = {
          x: position['x'] - MERMAID_PAN_STEP,
          y: position['y'],
        };
        break;
      }

      case 'ArrowUp': {
        nextPosition = {
          x: position['x'],
          y: position['y'] + MERMAID_PAN_STEP,
        };
        break;
      }

      default: {
        break;
      }
    }

    if (nextPosition !== undefined) {
      event.preventDefault();

      setPosition(nextPosition);
    }

    return undefined;
  }

  return (
    <div
      ref={containerRef}
      className={fullscreenClassName}
      style={props['style']}
    >
      <div
        className="nova-mermaid-controls"
        role="toolbar"
        aria-label={translate({
          id: 'theme.mermaid.controls',
          message: 'Diagram controls',
          description: 'Accessible label for the Mermaid diagram control toolbar',
        })}
      >
        <button
          className="nova-mermaid-control"
          type="button"
          disabled={canZoomOut === false}
          onClick={zoomOut}
          aria-label={zoomOutLabel}
          title={zoomOutLabel}
        >
          <Icon icon="lucide:zoom-out" width="16" height="16" aria-hidden="true" />
        </button>
        <button
          className="nova-mermaid-control nova-mermaid-scale"
          type="button"
          disabled={(
            scale === 1
            && position['x'] === 0
            && position['y'] === 0
          )}
          onClick={() => {
            resetView();

            return undefined;
          }}
          aria-label={`${resetLabel}: ${scaleLabel}`}
          title={resetLabel}
        >
          {scaleLabel}
        </button>
        <button
          className="nova-mermaid-control"
          type="button"
          disabled={canZoomIn === false}
          onClick={zoomIn}
          aria-label={zoomInLabel}
          title={zoomInLabel}
        >
          <Icon icon="lucide:zoom-in" width="16" height="16" aria-hidden="true" />
        </button>
        <button
          className="nova-mermaid-control"
          type="button"
          onClick={toggleFullscreen}
          aria-label={fullscreenLabel}
          aria-pressed={isFullscreen}
          title={fullscreenLabel}
        >
          <Icon
            icon={(isFullscreen === true) ? 'lucide:minimize-2' : 'lucide:maximize-2'}
            width="16"
            height="16"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        className={viewportClassName}
        role="application"
        tabIndex={0}
        aria-label={viewportLabel}
        onKeyDown={handleKeyDown}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
      >
        <div
          className="nova-mermaid-stage"
          style={stageStyle}
          dangerouslySetInnerHTML={{ __html: renderResult['svg'] }}
        />
      </div>
    </div>
  );
}

/**
 * Theme - Mermaid - Mermaid.
 *
 * Wraps the Mermaid diagram renderer in an error boundary so malformed syntax
 * does not crash the page and color-mode changes remount the diagram cleanly.
 *
 * @param {Theme_Mermaid_Index_Mermaid_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function Mermaid(props: Theme_Mermaid_Index_Mermaid_Props): Theme_Mermaid_Index_Mermaid_Returns {
  const colorMode: Theme_Mermaid_Index_Mermaid_ColorMode = useColorModeObserver();

  return (
    <ErrorBoundary
      fallback={(params) => (
        <ErrorPageContent
          error={params['error']}
          tryAgain={params['tryAgain']}
        />
      )}
    >
      <MermaidContent
        key={colorMode}
        value={props['value']}
        className={props['className']}
        style={props['style']}
      />
    </ErrorBoundary>
  );
}

export default Mermaid;

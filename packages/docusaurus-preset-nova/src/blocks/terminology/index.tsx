import Link from '@docusaurus/Link';
import {
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { computeTooltipPosition } from './tooltip-position.js';

import type {
  Blocks_Terminology_Index_BlocksTerminology_ClassName,
  Blocks_Terminology_Index_BlocksTerminology_ClearTimers_Returns,
  Blocks_Terminology_Index_BlocksTerminology_DescribedBy,
  Blocks_Terminology_Index_BlocksTerminology_DescriptionId,
  Blocks_Terminology_Index_BlocksTerminology_FrameId,
  Blocks_Terminology_Index_BlocksTerminology_HandleBlur_Returns,
  Blocks_Terminology_Index_BlocksTerminology_HandleClick_Event,
  Blocks_Terminology_Index_BlocksTerminology_HandleClick_Returns,
  Blocks_Terminology_Index_BlocksTerminology_HandleEscape_Event,
  Blocks_Terminology_Index_BlocksTerminology_HandleEscape_Returns,
  Blocks_Terminology_Index_BlocksTerminology_HandleFocus_Returns,
  Blocks_Terminology_Index_BlocksTerminology_HandleKeyDown_Event,
  Blocks_Terminology_Index_BlocksTerminology_HandleKeyDown_Returns,
  Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Event,
  Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_InsideTerm,
  Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_InsideTooltip,
  Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Returns,
  Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Target,
  Blocks_Terminology_Index_BlocksTerminology_HandlePointerDown_Event,
  Blocks_Terminology_Index_BlocksTerminology_HandlePointerDown_Returns,
  Blocks_Terminology_Index_BlocksTerminology_HandlePointerEnter_Event,
  Blocks_Terminology_Index_BlocksTerminology_HandlePointerEnter_Returns,
  Blocks_Terminology_Index_BlocksTerminology_HandlePointerLeave_Event,
  Blocks_Terminology_Index_BlocksTerminology_HandlePointerLeave_Returns,
  Blocks_Terminology_Index_BlocksTerminology_HideTimerRef,
  Blocks_Terminology_Index_BlocksTerminology_IsOpen,
  Blocks_Terminology_Index_BlocksTerminology_IsOpenState,
  Blocks_Terminology_Index_BlocksTerminology_PointerTypeRef,
  Blocks_Terminology_Index_BlocksTerminology_Position,
  Blocks_Terminology_Index_BlocksTerminology_PositionState,
  Blocks_Terminology_Index_BlocksTerminology_Props,
  Blocks_Terminology_Index_BlocksTerminology_ScheduleHide_Returns,
  Blocks_Terminology_Index_BlocksTerminology_ScheduleShow_Delay,
  Blocks_Terminology_Index_BlocksTerminology_ScheduleShow_Returns,
  Blocks_Terminology_Index_BlocksTerminology_SetIsOpen,
  Blocks_Terminology_Index_BlocksTerminology_SetPosition,
  Blocks_Terminology_Index_BlocksTerminology_ShowTimerRef,
  Blocks_Terminology_Index_BlocksTerminology_TermElement,
  Blocks_Terminology_Index_BlocksTerminology_TermRef,
  Blocks_Terminology_Index_BlocksTerminology_Tooltip,
  Blocks_Terminology_Index_BlocksTerminology_TooltipContainer,
  Blocks_Terminology_Index_BlocksTerminology_TooltipId,
  Blocks_Terminology_Index_BlocksTerminology_TooltipRef,
  Blocks_Terminology_Index_BlocksTerminology_TooltipStyle,
  Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_Anchor,
  Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_AnchorRect,
  Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_Returns,
  Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_TooltipElement,
  Blocks_Terminology_Index_TerminologyHideDelay,
  Blocks_Terminology_Index_TerminologyShowDelay,
  Blocks_Terminology_Index_TerminologyTooltipGap,
} from '../../types/blocks/terminology/index.d.ts';

/**
 * Blocks - Terminology - Show Delay.
 *
 * Milliseconds a pointer rests on a term, or keyboard focus stays on it,
 * before the tooltip opens, so passing over a term doesn't flash it.
 *
 * @since 0.50.0
 */
const terminologyShowDelay: Blocks_Terminology_Index_TerminologyShowDelay = 150;

/**
 * Blocks - Terminology - Hide Delay.
 *
 * Milliseconds before the tooltip closes after the pointer leaves, so it can
 * cross the gap to the tooltip and reach the link inside it.
 *
 * @since 0.50.0
 */
const terminologyHideDelay: Blocks_Terminology_Index_TerminologyHideDelay = 120;

/**
 * Blocks - Terminology - Tooltip Gap.
 *
 * Distance, in pixels, between the term and the tooltip, leaving room for
 * the arrow that points at the term.
 *
 * @since 0.50.0
 */
const terminologyTooltipGap: Blocks_Terminology_Index_TerminologyTooltipGap = 10;

/**
 * Blocks - Terminology - Blocks Terminology.
 *
 * Inline term with a custom tooltip that explains it. The tooltip opens on
 * hover and keyboard focus on desktop and on tap on touch screens; for a
 * linked term the first tap opens it and the second tap follows the link.
 *
 * @param {Blocks_Terminology_Index_BlocksTerminology_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function BlocksTerminology(props: Blocks_Terminology_Index_BlocksTerminology_Props) {
  const baseClassName: Blocks_Terminology_Index_BlocksTerminology_ClassName = (props['color'] === true) ? 'nova-terminology nova-terminology-colored' : 'nova-terminology';
  const className: Blocks_Terminology_Index_BlocksTerminology_ClassName = (props['className'] !== undefined) ? `${baseClassName} ${props['className']}` : baseClassName;
  const tooltipId: Blocks_Terminology_Index_BlocksTerminology_TooltipId = useId();
  const descriptionId: Blocks_Terminology_Index_BlocksTerminology_DescriptionId = useId();
  const termRef: Blocks_Terminology_Index_BlocksTerminology_TermRef = useRef<HTMLElement | null>(null);
  const tooltipRef: Blocks_Terminology_Index_BlocksTerminology_TooltipRef = useRef<HTMLSpanElement | null>(null);
  const showTimerRef: Blocks_Terminology_Index_BlocksTerminology_ShowTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const hideTimerRef: Blocks_Terminology_Index_BlocksTerminology_HideTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const pointerTypeRef: Blocks_Terminology_Index_BlocksTerminology_PointerTypeRef = useRef<string>('mouse');
  const isOpenState: Blocks_Terminology_Index_BlocksTerminology_IsOpenState = useState<Blocks_Terminology_Index_BlocksTerminology_IsOpen>(false);
  const isOpen: Blocks_Terminology_Index_BlocksTerminology_IsOpen = isOpenState[0];
  const setIsOpen: Blocks_Terminology_Index_BlocksTerminology_SetIsOpen = isOpenState[1];
  const positionState: Blocks_Terminology_Index_BlocksTerminology_PositionState = useState<Blocks_Terminology_Index_BlocksTerminology_Position>(undefined);
  const position: Blocks_Terminology_Index_BlocksTerminology_Position = positionState[0];
  const setPosition: Blocks_Terminology_Index_BlocksTerminology_SetPosition = positionState[1];

  /**
   * Blocks - Terminology - Blocks Terminology - Clear Timers.
   *
   * Cancels any pending open or close, so the latest pointer or focus change
   * always decides the tooltip's state.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_ClearTimers_Returns}
   *
   * @since 0.50.0
   */
  function clearTimers(): Blocks_Terminology_Index_BlocksTerminology_ClearTimers_Returns {
    clearTimeout(showTimerRef.current);
    clearTimeout(hideTimerRef.current);

    return undefined;
  }

  /**
   * Blocks - Terminology - Blocks Terminology - Schedule Show.
   *
   * Opens the tooltip after the given delay, cancelling a pending close,
   * so brief passes over the term don't open it.
   *
   * @param {Blocks_Terminology_Index_BlocksTerminology_ScheduleShow_Delay} delay - Delay.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_ScheduleShow_Returns}
   *
   * @since 0.50.0
   */
  function scheduleShow(delay: Blocks_Terminology_Index_BlocksTerminology_ScheduleShow_Delay): Blocks_Terminology_Index_BlocksTerminology_ScheduleShow_Returns {
    clearTimers();

    showTimerRef.current = setTimeout(() => {
      setIsOpen(true);

      return undefined;
    }, delay);

    return undefined;
  }

  /**
   * Blocks - Terminology - Blocks Terminology - Schedule Hide.
   *
   * Closes the tooltip after a short delay, cancelling a pending open,
   * so the pointer can move from the term onto the tooltip.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_ScheduleHide_Returns}
   *
   * @since 0.50.0
   */
  function scheduleHide(): Blocks_Terminology_Index_BlocksTerminology_ScheduleHide_Returns {
    clearTimers();

    hideTimerRef.current = setTimeout(() => {
      setIsOpen(false);

      return undefined;
    }, terminologyHideDelay);

    return undefined;
  }

  /**
   * Blocks - Terminology - Blocks Terminology - Update Position.
   *
   * Measures the term and the tooltip and places the tooltip next to the
   * term in viewport pixels, which works inside scrolled or zoomed areas.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_Returns}
   *
   * @since 0.50.0
   */
  function updatePosition(): Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_Returns {
    const anchor: Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_Anchor = termRef.current;
    const tooltipElement: Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_TooltipElement = tooltipRef.current;

    if (anchor === null || tooltipElement === null) {
      return undefined;
    }

    const anchorRect: Blocks_Terminology_Index_BlocksTerminology_UpdatePosition_AnchorRect = anchor.getBoundingClientRect();

    setPosition(computeTooltipPosition({
      top: anchorRect.top,
      bottom: anchorRect.bottom,
      left: anchorRect.left,
      width: anchorRect.width,
    }, {
      width: tooltipElement.offsetWidth,
      height: tooltipElement.offsetHeight,
    }, {
      width: document.documentElement.clientWidth,
      height: window.innerHeight,
    }, terminologyTooltipGap));

    return undefined;
  }

  // While open: follow scrolling and resizing, and close on Escape or a tap elsewhere.
  useEffect(() => {
    if (isOpen === false) {
      setPosition(undefined);

      return undefined;
    }

    const frameId: Blocks_Terminology_Index_BlocksTerminology_FrameId = requestAnimationFrame(() => {
      updatePosition();

      return undefined;
    });

    /**
     * Blocks - Terminology - Blocks Terminology - Handle Outside Pointer.
     *
     * Closes the tooltip when a pointer goes down outside both the term and
     * the tooltip, including on another term.
     *
     * @param {Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Event} event - Event.
     *
     * @returns {Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Returns}
     *
     * @since 0.50.0
     */
    function handleOutsidePointer(event: Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Event): Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Returns {
      const target: Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_Target = event.target;

      if (!(target instanceof Node)) {
        return undefined;
      }

      const insideTerm: Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_InsideTerm = termRef.current !== null && termRef.current.contains(target) === true;
      const insideTooltip: Blocks_Terminology_Index_BlocksTerminology_HandleOutsidePointer_InsideTooltip = tooltipRef.current !== null && tooltipRef.current.contains(target) === true;

      if (insideTerm === true || insideTooltip === true) {
        return undefined;
      }

      clearTimers();

      setIsOpen(false);

      return undefined;
    }

    /**
     * Blocks - Terminology - Blocks Terminology - Handle Escape.
     *
     * Closes the tooltip when Escape is pressed, leaving focus on the term
     * so keyboard users can carry on reading.
     *
     * @param {Blocks_Terminology_Index_BlocksTerminology_HandleEscape_Event} event - Event.
     *
     * @returns {Blocks_Terminology_Index_BlocksTerminology_HandleEscape_Returns}
     *
     * @since 0.50.0
     */
    function handleEscape(event: Blocks_Terminology_Index_BlocksTerminology_HandleEscape_Event): Blocks_Terminology_Index_BlocksTerminology_HandleEscape_Returns {
      if (event.key === 'Escape') {
        clearTimers();

        setIsOpen(false);
      }

      return undefined;
    }

    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    document.addEventListener('pointerdown', handleOutsidePointer);
    document.addEventListener('keydown', handleEscape);

    return () => {
      cancelAnimationFrame(frameId);

      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);

      document.removeEventListener('pointerdown', handleOutsidePointer);
      document.removeEventListener('keydown', handleEscape);

      return undefined;
    };
  }, [isOpen]);

  // Pending timers must not fire after the term unmounts.
  useEffect(() => {
    return () => {
      clearTimers();

      return undefined;
    };
  }, []);

  /**
   * Blocks - Terminology - Blocks Terminology - Handle Pointer Down.
   *
   * Remembers whether the term is being used with a mouse, a finger, or a
   * pen, so a click can tell a tap from a mouse click.
   *
   * @param {Blocks_Terminology_Index_BlocksTerminology_HandlePointerDown_Event} event - Event.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_HandlePointerDown_Returns}
   *
   * @since 0.50.0
   */
  function handlePointerDown(event: Blocks_Terminology_Index_BlocksTerminology_HandlePointerDown_Event): Blocks_Terminology_Index_BlocksTerminology_HandlePointerDown_Returns {
    pointerTypeRef.current = event.pointerType;

    return undefined;
  }

  /**
   * Blocks - Terminology - Blocks Terminology - Handle Pointer Enter.
   *
   * Opens the tooltip after a short delay when a mouse rests on the term.
   * Touch pointers are handled by the click handler instead.
   *
   * @param {Blocks_Terminology_Index_BlocksTerminology_HandlePointerEnter_Event} event - Event.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_HandlePointerEnter_Returns}
   *
   * @since 0.50.0
   */
  function handlePointerEnter(event: Blocks_Terminology_Index_BlocksTerminology_HandlePointerEnter_Event): Blocks_Terminology_Index_BlocksTerminology_HandlePointerEnter_Returns {
    if (event.pointerType === 'mouse') {
      scheduleShow(terminologyShowDelay);
    }

    return undefined;
  }

  /**
   * Blocks - Terminology - Blocks Terminology - Handle Pointer Leave.
   *
   * Closes the tooltip shortly after a mouse leaves the term or the tooltip.
   * Re-entering either one cancels the close.
   *
   * @param {Blocks_Terminology_Index_BlocksTerminology_HandlePointerLeave_Event} event - Event.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_HandlePointerLeave_Returns}
   *
   * @since 0.50.0
   */
  function handlePointerLeave(event: Blocks_Terminology_Index_BlocksTerminology_HandlePointerLeave_Event): Blocks_Terminology_Index_BlocksTerminology_HandlePointerLeave_Returns {
    if (event.pointerType === 'mouse') {
      scheduleHide();
    }

    return undefined;
  }

  /**
   * Blocks - Terminology - Blocks Terminology - Handle Focus.
   *
   * Opens the tooltip after a short delay when the term receives keyboard
   * focus; focus from a tap is left to the click handler.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_HandleFocus_Returns}
   *
   * @since 0.50.0
   */
  function handleFocus(): Blocks_Terminology_Index_BlocksTerminology_HandleFocus_Returns {
    if (pointerTypeRef.current === 'mouse') {
      scheduleShow(terminologyShowDelay);
    }

    return undefined;
  }

  /**
   * Blocks - Terminology - Blocks Terminology - Handle Blur.
   *
   * Closes the tooltip when focus leaves the term, unless it moved into the
   * tooltip, such as onto its link.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_HandleBlur_Returns}
   *
   * @since 0.50.0
   */
  function handleBlur(): Blocks_Terminology_Index_BlocksTerminology_HandleBlur_Returns {
    if (pointerTypeRef.current === 'mouse') {
      scheduleHide();
    }

    return undefined;
  }

  /**
   * Blocks - Terminology - Blocks Terminology - Handle Click.
   *
   * On touch, the first tap opens the tooltip instead of following a link,
   * and a tap on an open plain term closes it. A tap on an open linked term,
   * and every mouse click, behaves normally.
   *
   * @param {Blocks_Terminology_Index_BlocksTerminology_HandleClick_Event} event - Event.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_HandleClick_Returns}
   *
   * @since 0.50.0
   */
  function handleClick(event: Blocks_Terminology_Index_BlocksTerminology_HandleClick_Event): Blocks_Terminology_Index_BlocksTerminology_HandleClick_Returns {
    if (pointerTypeRef.current === 'mouse') {
      if (props['to'] === undefined) {
        clearTimers();

        setIsOpen(true);
      }

      pointerTypeRef.current = 'mouse';

      return undefined;
    }

    if (isOpen === false) {
      event.preventDefault();

      clearTimers();

      setIsOpen(true);
    } else if (props['to'] === undefined) {
      clearTimers();

      setIsOpen(false);
    }

    pointerTypeRef.current = 'mouse';

    return undefined;
  }

  /**
   * Blocks - Terminology - Blocks Terminology - Handle Key Down.
   *
   * Lets keyboard users toggle a plain term's tooltip with Enter or Space,
   * the keys a button responds to, since the term is an inline element.
   *
   * @param {Blocks_Terminology_Index_BlocksTerminology_HandleKeyDown_Event} event - Event.
   *
   * @returns {Blocks_Terminology_Index_BlocksTerminology_HandleKeyDown_Returns}
   *
   * @since 0.50.0
   */
  function handleKeyDown(event: Blocks_Terminology_Index_BlocksTerminology_HandleKeyDown_Event): Blocks_Terminology_Index_BlocksTerminology_HandleKeyDown_Returns {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return undefined;
    }

    event.preventDefault();

    clearTimers();

    setIsOpen((previous) => previous === false);

    return undefined;
  }

  const describedBy: Blocks_Terminology_Index_BlocksTerminology_DescribedBy = (isOpen === true) ? tooltipId : descriptionId;
  const tooltipStyle: Blocks_Terminology_Index_BlocksTerminology_TooltipStyle = (position !== undefined) ? {
    'top': `${position['top']}px`,
    'left': `${position['left']}px`,
    '--nova-terminology-arrow-left': `${position['arrowLeft']}px`,
  } : {
    top: '0px',
    left: '0px',
    visibility: 'hidden',
  };
  const tooltipContainer: Blocks_Terminology_Index_BlocksTerminology_TooltipContainer = (isOpen === true && termRef.current !== null) ? (termRef.current.closest('dialog') ?? document.body) : null;
  const tooltip: Blocks_Terminology_Index_BlocksTerminology_Tooltip = (tooltipContainer !== null) ? createPortal(
    <span
      ref={tooltipRef}
      id={tooltipId}
      role="tooltip"
      className="nova-terminology-tooltip"
      data-placement={(position !== undefined) ? position['placement'] : 'top'}
      style={tooltipStyle}
      onPointerEnter={() => {
        clearTimers();

        return undefined;
      }}
      onPointerLeave={handlePointerLeave}
    >
      <span className="nova-terminology-tooltip-text">{props['title']}</span>
    </span>,
    tooltipContainer,
  ) : null;

  if (props['to'] !== undefined) {
    return (
      <>
        <Link
          ref={(element: Blocks_Terminology_Index_BlocksTerminology_TermElement) => {
            termRef.current = element;

            return undefined;
          }}
          className={className}
          {...((props['style'] !== undefined) ? { style: props['style'] } : {})}
          to={props['to']}
          aria-describedby={describedBy}
          onPointerDown={handlePointerDown}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={handleClick}
        >
          {props['children']}
          <span id={descriptionId} hidden>{props['title']}</span>
        </Link>
        {tooltip}
      </>
    );
  }

  return (
    <>
      <span
        ref={(element: Blocks_Terminology_Index_BlocksTerminology_TermElement) => {
          termRef.current = element;

          return undefined;
        }}
        role="button"
        tabIndex={0}
        className={className}
        style={props['style']}
        aria-describedby={describedBy}
        onPointerDown={handlePointerDown}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <abbr>{props['children']}</abbr>
        <span id={descriptionId} hidden>{props['title']}</span>
      </span>
      {tooltip}
    </>
  );
}

export default BlocksTerminology;

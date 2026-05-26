import type {
  PluginsMermaidTooltipClientClickAnchor,
  PluginsMermaidTooltipClientClickHref,
  PluginsMermaidTooltipClientClickReturns,
  PluginsMermaidTooltipClientClickTarget,
  PluginsMermaidTooltipClientFindClickableMatch,
  PluginsMermaidTooltipClientFindClickableReturns,
  PluginsMermaidTooltipClientFindClickableTarget,
  PluginsMermaidTooltipClientFindClickableUnknown,
  PluginsMermaidTooltipClientGetOrCreateTooltipEl,
  PluginsMermaidTooltipClientHideForReturns,
  PluginsMermaidTooltipClientHideForStash,
  PluginsMermaidTooltipClientHideForStashed,
  PluginsMermaidTooltipClientHoveredNode,
  PluginsMermaidTooltipClientPointermoveReturns,
  PluginsMermaidTooltipClientPointeroverNode,
  PluginsMermaidTooltipClientPointeroverReturns,
  PluginsMermaidTooltipClientShowForEl,
  PluginsMermaidTooltipClientShowForReturns,
  PluginsMermaidTooltipClientShowForStash,
  PluginsMermaidTooltipClientShowForTitle,
  PluginsMermaidTooltipClientShowForX,
  PluginsMermaidTooltipClientShowForY,
  PluginsMermaidTooltipClientTooltipEl,
} from '../../types/plugins/mermaid-tooltip/client.d.ts';

/*
 * Runtime tooltip handler for pre-rendered Mermaid diagrams.
 *
 * Mermaid emits `click <id> "<href>" "<tooltip>"` directives as a `title`
 * attribute on `<g class="...clickable...">`. Browsers only honor the
 * `title` attribute as a native tooltip on HTML elements - on SVG groups
 * the attribute is silently ignored, and an SVG `<title>` child element
 * would surface a native (unstyled) tooltip that fights the design system.
 *
 * This module creates a single `<div class="nova-mermaid-tooltip">` element
 * (styled by `theme/Mermaid/style.css`) and shows it on hover of any
 * clickable Mermaid node. The `title` attribute is stashed and removed
 * while hovered so no native tooltip competes, and restored on leave
 * for accessibility.
 *
 * The class is deliberately distinct from mermaid library's own
 * `<div class="mermaidTooltip">` (appended to body via `setupToolTips`
 * on every render and never cleaned up). Both elements would otherwise
 * collide on selectors and leak across SPA navigations; the library
 * element is hidden by CSS in `theme/Mermaid/style.css`.
 */

const TOOLTIP_CLASS = 'nova-mermaid-tooltip';
const STASH_KEY = 'novaMermaidTooltipStash';
const CURSOR_OFFSET_X = 12;
const CURSOR_OFFSET_Y = 12;

if (typeof document !== 'undefined') {
  let tooltipEl: PluginsMermaidTooltipClientTooltipEl = null;
  let hoveredNode: PluginsMermaidTooltipClientHoveredNode = null;

  const getOrCreateTooltip = (): PluginsMermaidTooltipClientGetOrCreateTooltipEl => {
    if (tooltipEl !== null && tooltipEl.isConnected === true) {
      return tooltipEl;
    }

    const el: PluginsMermaidTooltipClientGetOrCreateTooltipEl = document.createElement('div');

    el.className = TOOLTIP_CLASS;
    el.style.position = 'absolute';
    el.style.pointerEvents = 'none';
    el.style.opacity = '0';
    el.style.transition = 'opacity 100ms';
    el.style.zIndex = '1000';
    document.body.appendChild(el);
    tooltipEl = el;

    return el;
  };

  const findClickable = (target: PluginsMermaidTooltipClientFindClickableTarget): PluginsMermaidTooltipClientFindClickableReturns => {
    if (target instanceof Element === false) {
      return null;
    }

    const match: PluginsMermaidTooltipClientFindClickableMatch = (target).closest('g.clickable');

    return (match === null) ? null : match as PluginsMermaidTooltipClientFindClickableUnknown as SVGGElement;
  };

  const showFor = (node: SVGGElement, x: PluginsMermaidTooltipClientShowForX, y: PluginsMermaidTooltipClientShowForY): PluginsMermaidTooltipClientShowForReturns => {
    const title: PluginsMermaidTooltipClientShowForTitle = node.getAttribute('title');

    if (title === null || title.length === 0) {
      return undefined;
    }

    const stash: PluginsMermaidTooltipClientShowForStash = node.dataset;

    if (stash[STASH_KEY] === undefined) {
      Reflect.set(stash, STASH_KEY, title);

      node.removeAttribute('title');
    }

    const el: PluginsMermaidTooltipClientShowForEl = getOrCreateTooltip();

    el.textContent = title;
    el.style.left = `${String(x + CURSOR_OFFSET_X)}px`;
    el.style.top = `${String(y + CURSOR_OFFSET_Y)}px`;
    el.style.opacity = '1';

    return undefined;
  };

  const hideFor = (node: SVGGElement): PluginsMermaidTooltipClientHideForReturns => {
    const stash: PluginsMermaidTooltipClientHideForStash = node.dataset;
    const stashed: PluginsMermaidTooltipClientHideForStashed = stash[STASH_KEY];

    if (stashed !== undefined) {
      node.setAttribute('title', stashed);
      delete stash[STASH_KEY];
    }

    if (tooltipEl !== null) {
      tooltipEl.style.opacity = '0';
      /*
       * Reset inline top/left so the hidden tooltip falls back to the CSS
       * `top: 0; left: 0` idle pin. Without this, the element stays parked
       * at the previous hover's `pageX`/`pageY` (often thousands of pixels
       * down the document) and extends the scrollable area on the next
       * page after an SPA navigation.
       */
      tooltipEl.style.left = '';
      tooltipEl.style.top = '';
    }

    return undefined;
  };

  document.addEventListener('pointerover', (event: PointerEvent): PluginsMermaidTooltipClientPointeroverReturns => {
    const node: PluginsMermaidTooltipClientPointeroverNode = findClickable(event.target);

    if (node === hoveredNode) {
      return undefined;
    }

    if (hoveredNode !== null) {
      hideFor(hoveredNode);
    }

    if (node !== null) {
      showFor(node, event.pageX, event.pageY);
    }

    hoveredNode = node;

    return undefined;
  });

  document.addEventListener('pointermove', (event: PointerEvent): PluginsMermaidTooltipClientPointermoveReturns => {
    if (tooltipEl === null || hoveredNode === null) {
      return undefined;
    }

    tooltipEl.style.left = `${String(event.pageX + CURSOR_OFFSET_X)}px`;
    tooltipEl.style.top = `${String(event.pageY + CURSOR_OFFSET_Y)}px`;

    return undefined;
  });

  /*
   * Mermaid wraps clickable nodes in `<a xlink:href="#">` when the `click`
   * directive has no real URL (tooltip-only nodes). Clicking the placeholder
   * anchor scrolls the page to the top. Suppress that for any anchor inside
   * a pre-rendered mermaid container whose href resolves to `#`; real URLs
   * (e.g. `xlink:href="https://..."`) are left untouched.
   */
  document.addEventListener('click', (event: MouseEvent): PluginsMermaidTooltipClientClickReturns => {
    if (event.target instanceof Element === true) {
      const target: PluginsMermaidTooltipClientClickTarget = event.target;

      if (target.closest('.nova-mermaid-container') !== null) {
        const anchor: PluginsMermaidTooltipClientClickAnchor = target.closest('a');

        if (anchor !== null) {
          const href: PluginsMermaidTooltipClientClickHref = anchor.getAttribute('xlink:href') ?? anchor.getAttribute('href');

          if (
            href === '#'
            || href === ''
            || href === null
          ) {
            event.preventDefault();
          }
        }
      }
    }

    /*
     * Hide the tooltip on any click. SPA navigations triggered by clicking
     * a clickable mermaid node leave the cursor parked on the now-unmounted
     * SVG, so no `pointerover` fires to invoke `hideFor`. Without this,
     * the tooltip stays at `opacity: 1` on the next page until the user
     * moves the mouse.
     */
    if (hoveredNode !== null) {
      hideFor(hoveredNode);
      hoveredNode = null;
    }

    return undefined;
  });
}

export {};

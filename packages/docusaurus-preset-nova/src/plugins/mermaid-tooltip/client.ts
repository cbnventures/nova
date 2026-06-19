import type {
  Plugins_MermaidTooltip_Client_Click,
  Plugins_MermaidTooltip_Client_Click_Anchor,
  Plugins_MermaidTooltip_Client_Click_Href,
  Plugins_MermaidTooltip_Client_Click_Target,
  Plugins_MermaidTooltip_Client_FindClickable,
  Plugins_MermaidTooltip_Client_FindClickable_Match,
  Plugins_MermaidTooltip_Client_FindClickable_Unknown,
  Plugins_MermaidTooltip_Client_GetOrCreateTooltip_El,
  Plugins_MermaidTooltip_Client_HideFor,
  Plugins_MermaidTooltip_Client_HideFor_Stash,
  Plugins_MermaidTooltip_Client_HideFor_Stashed,
  Plugins_MermaidTooltip_Client_HoveredNode,
  Plugins_MermaidTooltip_Client_Pointermove,
  Plugins_MermaidTooltip_Client_Pointerover,
  Plugins_MermaidTooltip_Client_Pointerover_Node,
  Plugins_MermaidTooltip_Client_ShowFor,
  Plugins_MermaidTooltip_Client_ShowFor_El,
  Plugins_MermaidTooltip_Client_ShowFor_Stash,
  Plugins_MermaidTooltip_Client_ShowFor_Title,
  Plugins_MermaidTooltip_Client_TooltipEl,
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
  let tooltipEl: Plugins_MermaidTooltip_Client_TooltipEl = null;
  let hoveredNode: Plugins_MermaidTooltip_Client_HoveredNode = null;

  const getOrCreateTooltip = (): Plugins_MermaidTooltip_Client_GetOrCreateTooltip_El => {
    if (tooltipEl !== null && tooltipEl.isConnected === true) {
      return tooltipEl;
    }

    const el: Plugins_MermaidTooltip_Client_GetOrCreateTooltip_El = document.createElement('div');

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

  const findClickable: Plugins_MermaidTooltip_Client_FindClickable = (target) => {
    if (target instanceof Element === false) {
      return null;
    }

    const match: Plugins_MermaidTooltip_Client_FindClickable_Match = (target).closest('g.clickable');

    return (match === null) ? null : match as Plugins_MermaidTooltip_Client_FindClickable_Unknown as SVGGElement;
  };

  const showFor: Plugins_MermaidTooltip_Client_ShowFor = (node, x, y) => {
    const title: Plugins_MermaidTooltip_Client_ShowFor_Title = node.getAttribute('title');

    if (title === null || title.length === 0) {
      return undefined;
    }

    const stash: Plugins_MermaidTooltip_Client_ShowFor_Stash = node.dataset;

    if (stash[STASH_KEY] === undefined) {
      Reflect.set(stash, STASH_KEY, title);

      node.removeAttribute('title');
    }

    const el: Plugins_MermaidTooltip_Client_ShowFor_El = getOrCreateTooltip();

    el.textContent = title;
    el.style.left = `${String(x + CURSOR_OFFSET_X)}px`;
    el.style.top = `${String(y + CURSOR_OFFSET_Y)}px`;
    el.style.opacity = '1';

    return undefined;
  };

  const hideFor: Plugins_MermaidTooltip_Client_HideFor = (node) => {
    const stash: Plugins_MermaidTooltip_Client_HideFor_Stash = node.dataset;
    const stashed: Plugins_MermaidTooltip_Client_HideFor_Stashed = stash[STASH_KEY];

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

  const pointerover: Plugins_MermaidTooltip_Client_Pointerover = (event) => {
    const node: Plugins_MermaidTooltip_Client_Pointerover_Node = findClickable(event.target);

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
  };

  const pointermove: Plugins_MermaidTooltip_Client_Pointermove = (event) => {
    if (tooltipEl === null || hoveredNode === null) {
      return undefined;
    }

    tooltipEl.style.left = `${String(event.pageX + CURSOR_OFFSET_X)}px`;
    tooltipEl.style.top = `${String(event.pageY + CURSOR_OFFSET_Y)}px`;

    return undefined;
  };

  /*
   * Mermaid wraps clickable nodes in `<a xlink:href="#">` when the `click`
   * directive has no real URL (tooltip-only nodes). Clicking the placeholder
   * anchor scrolls the page to the top. Suppress that for any anchor inside
   * a pre-rendered mermaid container whose href resolves to `#`; real URLs
   * (e.g. `xlink:href="https://..."`) are left untouched.
   */
  const click: Plugins_MermaidTooltip_Client_Click = (event) => {
    if (event.target instanceof Element === true) {
      const target: Plugins_MermaidTooltip_Client_Click_Target = event.target;

      if (target.closest('.nova-mermaid-container') !== null) {
        const anchor: Plugins_MermaidTooltip_Client_Click_Anchor = target.closest('a');

        if (anchor !== null) {
          const href: Plugins_MermaidTooltip_Client_Click_Href = anchor.getAttribute('xlink:href') ?? anchor.getAttribute('href');

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
  };

  document.addEventListener('pointerover', pointerover);
  document.addEventListener('pointermove', pointermove);
  document.addEventListener('click', click);
}

export {};

import type {
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_AfterContent,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_AppliedScale,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_BeforeContent,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_CanvasBackground,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Edges,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Elements,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_HasPseudoContent,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_IsMedia,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_PaintExtents,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_PaintReach,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_ParentStyle,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Range,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Rect,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Returns,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Stage,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_StageRect,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Style,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_TextNode,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_TextRect,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_TypedElement,
  Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Walker,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Blur,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Bottom,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Lengths,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_OffsetY,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Outline,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_OutlineOffset,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_OutlineWidth,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Returns,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Spread,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Style,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Tokens,
  Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Top,
  Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Allowance,
  Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_BeyondBottom,
  Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_BeyondTop,
  Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Bottom,
  Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_ContentHeight,
  Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Edges,
  Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Extra,
  Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Returns,
  Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Top,
  Theme_BlockPlayground_VisibleBounds_HasActiveAnimations_Returns,
  Theme_BlockPlayground_VisibleBounds_HasActiveAnimations_Stage,
  Theme_BlockPlayground_VisibleBounds_HasVisibleBox_CanvasBackground,
  Theme_BlockPlayground_VisibleBounds_HasVisibleBox_Returns,
  Theme_BlockPlayground_VisibleBounds_HasVisibleBox_Style,
  Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Current,
  Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Depth,
  Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Parts,
  Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Returns,
  Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Separator,
  Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Value,
  Theme_BlockPlayground_VisibleBounds_VisibleBoundsMediaTags,
} from '../../types/theme/BlockPlayground/visible-bounds.d.ts';

/**
 * Theme - Block Playground - Visible Bounds - Visible Bounds Media Tags.
 *
 * Element names that always count as visible content, such as images and
 * icons, whatever their own background or border.
 *
 * @since 0.50.0
 */
const visibleBoundsMediaTags: Theme_BlockPlayground_VisibleBounds_VisibleBoundsMediaTags = [
  'IMG',
  'SVG',
  'VIDEO',
  'CANVAS',
  'PICTURE',
];

/**
 * Theme - Block Playground - Visible Bounds - Has Active Animations.
 *
 * Checks for finite animations or transitions that are still running or
 * waiting out their delay anywhere in the stage. Entrance animations hold
 * content offset until they finish, so measuring before then misplaces it.
 *
 * @param {Theme_BlockPlayground_VisibleBounds_HasActiveAnimations_Stage} stage - Stage.
 *
 * @returns {Theme_BlockPlayground_VisibleBounds_HasActiveAnimations_Returns}
 *
 * @since 0.50.0
 */
export function hasActiveAnimations(stage: Theme_BlockPlayground_VisibleBounds_HasActiveAnimations_Stage): Theme_BlockPlayground_VisibleBounds_HasActiveAnimations_Returns {
  if (typeof stage.getAnimations !== 'function') {
    return false;
  }

  return stage.getAnimations({ subtree: true }).some((animation) => {
    if (animation.playState === 'finished' || animation.effect === null) {
      return false;
    }

    // Endless animations, such as a blinking caret, never settle, so they are ignored.
    return animation.effect.getComputedTiming()['endTime'] !== Infinity;
  });
}

/**
 * Theme - Block Playground - Visible Bounds - Compute Visible Crop.
 *
 * Crops to the border boxes of everything visible, so the canvas padding alone
 * frames the example. Shadows may spill into that padding; only when one
 * reaches past it is equal room added on both sides, keeping the content centred.
 *
 * @param {Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Edges}         edges         - Edges.
 * @param {Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_ContentHeight} contentHeight - Content height.
 * @param {Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Allowance}     allowance     - Allowance.
 *
 * @returns {Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Returns}
 *
 * @since 0.50.0
 */
export function computeVisibleCrop(edges: Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Edges, contentHeight: Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_ContentHeight, allowance: Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Allowance): Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Returns {
  if (edges.length === 0) {
    return {
      offset: 0,
      height: contentHeight,
    };
  }

  const top: Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Top = Math.min(...edges.map((edge) => edge['top']));
  const bottom: Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Bottom = Math.max(...edges.map((edge) => edge['bottom']));

  if (bottom <= top) {
    return {
      offset: 0,
      height: contentHeight,
    };
  }

  const beyondTop: Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_BeyondTop = Math.max(0, ...edges.map((edge) => top - (edge['top'] - edge['reach'])));
  const beyondBottom: Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_BeyondBottom = Math.max(0, ...edges.map((edge) => (edge['bottom'] + edge['reach']) - bottom));
  const extra: Theme_BlockPlayground_VisibleBounds_ComputeVisibleCrop_Extra = Math.max(0, Math.max(beyondTop, beyondBottom) - allowance);

  return {
    offset: top - extra,
    height: (bottom - top) + (extra * 2),
  };
}

/**
 * Theme - Block Playground - Visible Bounds - Split Top Level.
 *
 * Splits a computed CSS value on a separator that sits outside parentheses,
 * so color functions such as `rgba(0, 0, 0, 0.3)` stay whole.
 *
 * @param {Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Value}     value     - Value.
 * @param {Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Separator} separator - Separator.
 *
 * @returns {Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Returns}
 *
 * @since 0.50.0
 */
export function splitTopLevel(value: Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Value, separator: Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Separator): Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Returns {
  const parts: Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Parts = [];
  let depth: Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Depth = 0;
  let current: Theme_BlockPlayground_VisibleBounds_SplitTopLevel_Current = '';

  for (const character of value) {
    if (character === '(') {
      depth += 1;
    } else if (character === ')') {
      depth -= 1;
    }

    if (depth === 0 && character === separator) {
      parts.push(current);

      current = '';

      continue;
    }

    current += character;
  }

  parts.push(current);

  return parts.map((part) => part.trim()).filter((part) => part !== '');
}

/**
 * Theme - Block Playground - Visible Bounds - Compute Paint Extents.
 *
 * Works out how far an element visibly paints above and below its border box
 * from its outer box shadows (offset, half the blur, and spread) and its
 * outline, so the preview crop keeps a frame's ring and visible shadow.
 *
 * @param {Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Style} style - Style.
 *
 * @returns {Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Returns}
 *
 * @since 0.50.0
 */
export function computePaintExtents(style: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Style): Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Returns {
  let top: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Top = 0;
  let bottom: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Bottom = 0;

  if (style['boxShadow'] !== 'none' && style['boxShadow'] !== '') {
    for (const shadow of splitTopLevel(style['boxShadow'], ',')) {
      const tokens: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Tokens = splitTopLevel(shadow, ' ');

      if (tokens.includes('inset') === true) {
        continue;
      }

      const lengths: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Lengths = tokens.filter((token) => token.endsWith('px') === true).map((token) => parseFloat(token));
      const offsetY: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_OffsetY = lengths[1] ?? 0;
      const blur: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Blur = lengths[2] ?? 0;
      const spread: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Spread = lengths[3] ?? 0;

      // Only about half of a blur is visibly painted; the faint outer tail may be clipped.
      top = Math.max(top, (blur / 2) + spread - offsetY);
      bottom = Math.max(bottom, (blur / 2) + spread + offsetY);
    }
  }

  if (style['outlineStyle'] !== 'none' && style['outlineStyle'] !== '') {
    const outlineWidth: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_OutlineWidth = parseFloat(style['outlineWidth']);
    const outlineOffset: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_OutlineOffset = parseFloat(style['outlineOffset']);
    const outline: Theme_BlockPlayground_VisibleBounds_ComputePaintExtents_Outline = ((Number.isNaN(outlineWidth) === true) ? 0 : outlineWidth) + ((Number.isNaN(outlineOffset) === true) ? 0 : outlineOffset);

    top = Math.max(top, outline);
    bottom = Math.max(bottom, outline);
  }

  return {
    top,
    bottom,
  };
}

/**
 * Theme - Block Playground - Visible Bounds - Has Visible Box.
 *
 * Checks whether an element paints something of its own: a background that
 * differs from the canvas, a background image, a border, or a shadow.
 *
 * @param {Theme_BlockPlayground_VisibleBounds_HasVisibleBox_Style}            style            - Style.
 * @param {Theme_BlockPlayground_VisibleBounds_HasVisibleBox_CanvasBackground} canvasBackground - Canvas background.
 *
 * @returns {Theme_BlockPlayground_VisibleBounds_HasVisibleBox_Returns}
 *
 * @since 0.50.0
 */
export function hasVisibleBox(style: Theme_BlockPlayground_VisibleBounds_HasVisibleBox_Style, canvasBackground: Theme_BlockPlayground_VisibleBounds_HasVisibleBox_CanvasBackground): Theme_BlockPlayground_VisibleBounds_HasVisibleBox_Returns {
  if (
    style['backgroundColor'] !== canvasBackground
    && style['backgroundColor'] !== 'transparent'
    && style['backgroundColor'] !== 'rgba(0, 0, 0, 0)'
  ) {
    return true;
  }

  if (style['backgroundImage'] !== 'none') {
    return true;
  }

  if (style['boxShadow'] !== 'none') {
    return true;
  }

  return [
    style['borderTopWidth'],
    style['borderRightWidth'],
    style['borderBottomWidth'],
    style['borderLeftWidth'],
  ].some((width) => width !== '0px' && width !== '');
}

/**
 * Theme - Block Playground - Visible Bounds - Collect Visible Edges.
 *
 * Gathers the top and bottom of every visible text run, media element, and
 * painted box in the stage, in unscaled stage pixels. Hidden helpers, such
 * as the Typewriter's measuring copies, are skipped.
 *
 * @param {Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Stage}            stage            - Stage.
 * @param {Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_CanvasBackground} canvasBackground - Canvas background.
 *
 * @returns {Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Returns}
 *
 * @since 0.50.0
 */
export function collectVisibleEdges(stage: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Stage, canvasBackground: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_CanvasBackground): Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Returns {
  const stageRect: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_StageRect = stage.getBoundingClientRect();
  const appliedScale: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_AppliedScale = (stage.offsetWidth > 0) ? stageRect.width / stage.offsetWidth : 1;
  const edges: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Edges = [];

  // Iterate the NodeList directly; spreading it breaks under the site's loose Babel transform.
  const elements: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Elements = stage.querySelectorAll('*');

  for (const element of elements) {
    const typedElement: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_TypedElement = element;
    const style: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Style = getComputedStyle(typedElement);

    // Opacity is ignored on purpose: entrance animations start at 0 but end visible.
    if (style['visibility'] === 'hidden' || style['display'] === 'none') {
      continue;
    }

    const isMedia: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_IsMedia = (
      visibleBoundsMediaTags.includes(typedElement.tagName.toUpperCase()) === true
      || typedElement.getAttribute('role') === 'img'
    );

    const beforeContent: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_BeforeContent = getComputedStyle(typedElement, '::before')['content'];
    const afterContent: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_AfterContent = getComputedStyle(typedElement, '::after')['content'];

    // Pseudo-element content can't be measured directly, so its parent's box counts instead.
    const hasPseudoContent: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_HasPseudoContent = [
      beforeContent,
      afterContent,
    ].some((content) => content !== 'none' && content !== 'normal');

    if (
      isMedia === true
      || hasPseudoContent === true
      || hasVisibleBox(style, canvasBackground) === true
    ) {
      const rect: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Rect = typedElement.getBoundingClientRect();

      // The shadow's reach is kept apart from the box, so the crop can let it spill into the padding.
      const paintExtents: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_PaintExtents = computePaintExtents(style);
      const paintReach: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_PaintReach = Math.max(paintExtents['top'], paintExtents['bottom']);

      if (rect.height > 0 && rect.width > 0) {
        edges.push({
          top: (rect.top - stageRect.top) / appliedScale,
          bottom: (rect.bottom - stageRect.top) / appliedScale,
          reach: paintReach,
        });
      }
    }
  }

  const walker: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
  const range: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_Range = document.createRange();

  while (walker.nextNode() !== null) {
    const textNode: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_TextNode = walker.currentNode;

    if (
      textNode.textContent === null
      || textNode.textContent.trim() === ''
      || textNode.parentElement === null
    ) {
      continue;
    }

    const parentStyle: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_ParentStyle = getComputedStyle(textNode.parentElement);

    if (parentStyle['visibility'] === 'hidden') {
      continue;
    }

    range.selectNodeContents(textNode);

    const textRect: Theme_BlockPlayground_VisibleBounds_CollectVisibleEdges_TextRect = range.getBoundingClientRect();

    if (textRect.height > 0) {
      edges.push({
        top: (textRect.top - stageRect.top) / appliedScale,
        bottom: (textRect.bottom - stageRect.top) / appliedScale,
        reach: 0,
      });
    }
  }

  return edges;
}

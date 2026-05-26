import { useEffect, useState } from 'react';

import type {
  LibMermaidContainerClassName,
  LibMermaidGetCssVariableAlpha,
  LibMermaidGetCssVariableBlue,
  LibMermaidGetCssVariableCanvas,
  LibMermaidGetCssVariableContext,
  LibMermaidGetCssVariableData,
  LibMermaidGetCssVariableGreen,
  LibMermaidGetCssVariableName,
  LibMermaidGetCssVariableProbe,
  LibMermaidGetCssVariableRed,
  LibMermaidGetCssVariableResolved,
  LibMermaidGetCssVariableReturns,
  LibMermaidLoadMermaidReturns,
  LibMermaidPromise,
  LibMermaidUseMermaidConfigColorMode,
  LibMermaidUseMermaidConfigFontFamily,
  LibMermaidUseMermaidConfigIsDark,
  LibMermaidUseMermaidConfigReturns,
  LibMermaidUseMermaidRenderResultCancelled,
  LibMermaidUseMermaidRenderResultConfig,
  LibMermaidUseMermaidRenderResultId,
  LibMermaidUseMermaidRenderResultInitializeConfig,
  LibMermaidUseMermaidRenderResultMermaidDefault,
  LibMermaidUseMermaidRenderResultMermaidModule,
  LibMermaidUseMermaidRenderResultOptions,
  LibMermaidUseMermaidRenderResultRenderOutput,
  LibMermaidUseMermaidRenderResultReturns,
  LibMermaidUseMermaidRenderResultSetResult,
  LibMermaidUseMermaidRenderResultState,
} from '../types/lib/mermaid.d.ts';

/**
 * Lib - Mermaid - Container Class Name.
 *
 * CSS class name applied to the container element that wraps
 * rendered Mermaid SVG diagrams.
 *
 * @since 0.15.0
 */
export const MERMAID_CONTAINER_CLASS_NAME: LibMermaidContainerClassName = 'nova-mermaid-container';

/**
 * Lib - Mermaid - Get Resolved Color.
 *
 * Returns the CSS custom property value flattened to `#rrggbb` (or
 * `rgba(...)` if non-opaque) so Mermaid's color parser can consume
 * color-mix expressions the generator emits for token-bearing colors.
 *
 * @param {LibMermaidGetCssVariableName} name - Name.
 *
 * @returns {LibMermaidGetCssVariableReturns}
 *
 * @since 0.18.0
 */
function getResolvedColor(name: LibMermaidGetCssVariableName): LibMermaidGetCssVariableReturns {
  if (typeof document === 'undefined') {
    return '';
  }

  const probe: LibMermaidGetCssVariableProbe = document.createElement('span');

  probe.style.color = `var(${name})`;
  probe.style.display = 'none';
  document.body.appendChild(probe);

  const resolved: LibMermaidGetCssVariableResolved = getComputedStyle(probe).color;

  document.body.removeChild(probe);

  if (resolved === '') {
    return '';
  }

  const canvas: LibMermaidGetCssVariableCanvas = document.createElement('canvas');

  canvas.width = 1;
  canvas.height = 1;

  const ctx: LibMermaidGetCssVariableContext = canvas.getContext('2d');

  if (ctx === null) {
    return resolved;
  }

  ctx.fillStyle = resolved;
  ctx.fillRect(0, 0, 1, 1);

  const data: LibMermaidGetCssVariableData = ctx.getImageData(0, 0, 1, 1).data;
  const r: LibMermaidGetCssVariableRed = data[0];
  const g: LibMermaidGetCssVariableGreen = data[1];
  const b: LibMermaidGetCssVariableBlue = data[2];
  const a: LibMermaidGetCssVariableAlpha = data[3];

  if (a === 255) {
    return `#${[
      r,
      g,
      b,
    ].map((n) => (n ?? 0).toString(16).padStart(2, '0')).join('')}`;
  }

  return `rgba(${r ?? 0}, ${g ?? 0}, ${b ?? 0}, ${((a ?? 0) / 255).toFixed(3)})`;
}

/**
 * Lib - Mermaid - Promise.
 *
 * Module-level memoization variable for the lazy-loaded mermaid
 * library promise to prevent redundant dynamic imports.
 *
 * @since 0.15.0
 */
let mermaidPromise: LibMermaidPromise = undefined;

/**
 * Lib - Mermaid - Load Mermaid.
 *
 * Lazy-loads the mermaid library via dynamic import and memoizes
 * the resulting promise so subsequent calls reuse the same instance.
 *
 * @returns {LibMermaidLoadMermaidReturns}
 *
 * @since 0.15.0
 */
export function loadMermaid(): LibMermaidLoadMermaidReturns {
  if (mermaidPromise === undefined) {
    mermaidPromise = import('mermaid');
  }

  return mermaidPromise;
}

/**
 * Lib - Mermaid - Use Mermaid Config.
 *
 * React hook that observes the document data-theme attribute
 * and reads preset CSS variables to build a mermaid
 * configuration with matching theme variables.
 *
 * @returns {LibMermaidUseMermaidConfigReturns}
 *
 * @since 0.15.0
 */
export function useMermaidConfig(): LibMermaidUseMermaidConfigReturns {
  const colorMode: LibMermaidUseMermaidConfigColorMode = (typeof document !== 'undefined') ? (document.documentElement.getAttribute('data-theme') ?? 'light') : 'light';
  const isDark: LibMermaidUseMermaidConfigIsDark = colorMode === 'dark';
  /*
   * Mermaid's font is hard-coded - decoupled from `--nova-font-body` - so
   * measurement (themeVariables.fontFamily) and render (themeCSS rule below)
   * always come from the same source. Binding to a preset or consumer-level
   * body font lets site-wide typography swaps push diagram rect widths into
   * unpredictable layouts with no way to recover, because mermaid sizes
   * rects from measurement at config time and has no post-render reflow.
   */
  const fontFamily: LibMermaidUseMermaidConfigFontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

  /*
   * securityLevel: 'loose' matches @docusaurus/theme-mermaid's default.
   * The stricter level runs DOMPurify over the SVG and strips HTML
   * children of foreignObject, which erases every node label in
   * flowcharts with htmlLabels enabled.
   */
  return {
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    colorMode,
    htmlLabels: true,
    themeVariables: {
      primaryColor: getResolvedColor(isDark === true ? '--nova-color-primary-800' : '--nova-color-primary-100'),
      primaryTextColor: getResolvedColor(isDark === true ? '--nova-color-primary-100' : '--nova-color-primary-900'),
      primaryBorderColor: getResolvedColor(isDark === true ? '--nova-color-primary-600' : '--nova-color-primary-300'),
      secondaryColor: getResolvedColor(isDark === true ? '--nova-color-accent-800' : '--nova-color-accent-100'),
      secondaryTextColor: getResolvedColor(isDark === true ? '--nova-color-accent-100' : '--nova-color-accent-900'),
      secondaryBorderColor: getResolvedColor(isDark === true ? '--nova-color-accent-600' : '--nova-color-accent-300'),
      tertiaryColor: getResolvedColor('--nova-color-surface-raised'),
      tertiaryTextColor: getResolvedColor('--nova-color-text'),
      tertiaryBorderColor: getResolvedColor('--nova-color-border'),
      lineColor: getResolvedColor('--nova-color-text-muted'),
      textColor: getResolvedColor('--nova-color-text'),
      mainBkg: getResolvedColor(isDark === true ? '--nova-color-primary-900' : '--nova-color-primary-50'),
      nodeBorder: getResolvedColor(isDark === true ? '--nova-color-primary-600' : '--nova-color-primary-300'),
      clusterBkg: getResolvedColor('--nova-mermaid-cluster-fill'),
      clusterBorder: getResolvedColor('--nova-mermaid-cluster-stroke'),
      edgeLabelBackground: getResolvedColor('--nova-color-background'),
      fontFamily,
      fontSize: '14px',
    },
    /*
     * themeCSS gets injected into a `<style>` block inside the rendered SVG
     * with every selector auto-prefixed by `#mermaid-svg-<id>` (specificity
     * 1,0,N). CSS variables here resolve at render time from the document
     * context, so per-preset `--nova-*` tokens flow through.
     *
     * `.nodeLabel p` / `.cluster-label foreignObject p` — forces font-family +
     * font-size + margin on the `<p>` mermaid emits for htmlLabels so
     * rendered text matches what mermaid measured with themeVariables.
     * Without these, page CSS `p { font-size: 1rem; margin-block: 1em;
     * font-family: var(--nova-font-body) }` cascades in and overruns the
     * rect mermaid sized at config time.
     *
     * `.node rect` / `.cluster rect` — corner radius. Each preset declares
     * its own `--nova-mermaid-node-radius` / `--nova-mermaid-cluster-radius`
     * explicitly (no fallback) so the per-preset value is the single source
     * of truth for diagram block geometry.
     */
    themeCSS: [
      `.nodeLabel p, .cluster-label foreignObject p { margin: 0; color: inherit; font-family: ${fontFamily}; font-size: 14px; line-height: 1.5; }`,
      '.node rect { rx: var(--nova-mermaid-node-radius); ry: var(--nova-mermaid-node-radius); }',
      '.cluster rect { rx: var(--nova-mermaid-cluster-radius); ry: var(--nova-mermaid-cluster-radius); }',
    ].join('\n'),
    flowchart: {
      subGraphTitleMargin: {
        top: 16,
        bottom: 16,
      },
    },
  };
}

/**
 * Lib - Mermaid - Use Mermaid Render Result.
 *
 * React hook that renders a mermaid text string to SVG and
 * returns the render result or null while loading.
 *
 * @param {LibMermaidUseMermaidRenderResultOptions} options - Options.
 *
 * @returns {LibMermaidUseMermaidRenderResultReturns}
 *
 * @since 0.15.0
 */
export function useMermaidRenderResult(options: LibMermaidUseMermaidRenderResultOptions): LibMermaidUseMermaidRenderResultReturns {
  const state: LibMermaidUseMermaidRenderResultState = useState<LibMermaidUseMermaidRenderResultReturns>(null);
  const result: LibMermaidUseMermaidRenderResultReturns = state[0];
  const setResult: LibMermaidUseMermaidRenderResultSetResult = state[1];
  const config: LibMermaidUseMermaidRenderResultConfig = useMermaidConfig();
  const id: LibMermaidUseMermaidRenderResultId = `mermaid-svg-${String(Math.random()).replace('.', '')}`;

  useEffect(() => {
    let cancelled: LibMermaidUseMermaidRenderResultCancelled = false;

    void (async () => {
      try {
        const mermaidModule: LibMermaidUseMermaidRenderResultMermaidModule = await loadMermaid();
        const mermaidDefault: LibMermaidUseMermaidRenderResultMermaidDefault = mermaidModule['default'];

        /*
         * Wait for web fonts to load before measuring label widths. Mermaid
         * measures node and cluster label widths via a temporary DOM element
         * whose bbox depends on the live font metrics. Preset body fonts use
         * `font-display: block`, so during the load blocking period the temp
         * element measures with the fallback font - typically narrower than
         * the eventual web font. Awaiting `document.fonts.ready` pins
         * measurement to the same font that will render.
         */
        if (typeof document !== 'undefined') {
          await document.fonts.ready;
        }

        mermaidDefault.initialize(config as LibMermaidUseMermaidRenderResultInitializeConfig);

        const renderOutput: LibMermaidUseMermaidRenderResultRenderOutput = await mermaidDefault.render(id, options['text']);

        if (cancelled === false) {
          setResult(renderOutput);
        }
      } catch {
        // Silently ignore render failures for malformed diagrams.
      }

      return;
    })();

    return () => {
      cancelled = true;

      return;
    };
  }, [
    options['text'],
    config['colorMode'],
  ]);

  return result;
}

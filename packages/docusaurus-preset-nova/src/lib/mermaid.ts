import { useEffect, useState } from 'react';

import type {
  Lib_Mermaid_ContainerClassName,
  Lib_Mermaid_GetResolvedColor_A,
  Lib_Mermaid_GetResolvedColor_B,
  Lib_Mermaid_GetResolvedColor_Canvas,
  Lib_Mermaid_GetResolvedColor_Ctx,
  Lib_Mermaid_GetResolvedColor_Data,
  Lib_Mermaid_GetResolvedColor_G,
  Lib_Mermaid_GetResolvedColor_Name,
  Lib_Mermaid_GetResolvedColor_Probe,
  Lib_Mermaid_GetResolvedColor_R,
  Lib_Mermaid_GetResolvedColor_Resolved,
  Lib_Mermaid_GetResolvedColor_Returns,
  Lib_Mermaid_LoadMermaid_Returns,
  Lib_Mermaid_MermaidPromise,
  Lib_Mermaid_UseMermaidConfig_ColorMode,
  Lib_Mermaid_UseMermaidConfig_FontFamily,
  Lib_Mermaid_UseMermaidConfig_IsDark,
  Lib_Mermaid_UseMermaidConfig_Returns,
  Lib_Mermaid_UseMermaidRenderResult_Cancelled,
  Lib_Mermaid_UseMermaidRenderResult_Config,
  Lib_Mermaid_UseMermaidRenderResult_Id,
  Lib_Mermaid_UseMermaidRenderResult_InitializeConfig,
  Lib_Mermaid_UseMermaidRenderResult_MermaidDefault,
  Lib_Mermaid_UseMermaidRenderResult_MermaidModule,
  Lib_Mermaid_UseMermaidRenderResult_Options,
  Lib_Mermaid_UseMermaidRenderResult_RenderOutput,
  Lib_Mermaid_UseMermaidRenderResult_Result,
  Lib_Mermaid_UseMermaidRenderResult_Returns,
  Lib_Mermaid_UseMermaidRenderResult_SetResult,
  Lib_Mermaid_UseMermaidRenderResult_State,
} from '../types/lib/mermaid.d.ts';

/**
 * Lib - Mermaid - Container Class Name.
 *
 * CSS class name applied to the container element that wraps
 * rendered Mermaid SVG diagrams.
 *
 * @since 0.15.0
 */
export const MERMAID_CONTAINER_CLASS_NAME: Lib_Mermaid_ContainerClassName = 'nova-mermaid-container';

/**
 * Lib - Mermaid - Get Resolved Color.
 *
 * Returns the CSS custom property value flattened to `#rrggbb` (or
 * `rgba(...)` if non-opaque) so Mermaid's color parser can consume
 * color-mix expressions the generator emits for token-bearing colors.
 *
 * @param {Lib_Mermaid_GetResolvedColor_Name} name - Name.
 *
 * @returns {Lib_Mermaid_GetResolvedColor_Returns}
 *
 * @since 0.18.0
 */
function getResolvedColor(name: Lib_Mermaid_GetResolvedColor_Name): Lib_Mermaid_GetResolvedColor_Returns {
  if (typeof document === 'undefined') {
    return '';
  }

  const probe: Lib_Mermaid_GetResolvedColor_Probe = document.createElement('span');

  probe.style.color = `var(${name})`;
  probe.style.display = 'none';
  document.body.appendChild(probe);

  const resolved: Lib_Mermaid_GetResolvedColor_Resolved = getComputedStyle(probe).color;

  document.body.removeChild(probe);

  if (resolved === '') {
    return '';
  }

  const canvas: Lib_Mermaid_GetResolvedColor_Canvas = document.createElement('canvas');

  canvas.width = 1;
  canvas.height = 1;

  const ctx: Lib_Mermaid_GetResolvedColor_Ctx = canvas.getContext('2d');

  if (ctx === null) {
    return resolved;
  }

  ctx.fillStyle = resolved;
  ctx.fillRect(0, 0, 1, 1);

  const data: Lib_Mermaid_GetResolvedColor_Data = ctx.getImageData(0, 0, 1, 1).data;
  const r: Lib_Mermaid_GetResolvedColor_R = data[0];
  const g: Lib_Mermaid_GetResolvedColor_G = data[1];
  const b: Lib_Mermaid_GetResolvedColor_B = data[2];
  const a: Lib_Mermaid_GetResolvedColor_A = data[3];

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
let mermaidPromise: Lib_Mermaid_MermaidPromise = undefined;

/**
 * Lib - Mermaid - Load Mermaid.
 *
 * Lazy-loads the mermaid library via dynamic import and memoizes
 * the resulting promise so subsequent calls reuse the same instance.
 *
 * @returns {Lib_Mermaid_LoadMermaid_Returns}
 *
 * @since 0.15.0
 */
export function loadMermaid(): Lib_Mermaid_LoadMermaid_Returns {
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
 * @returns {Lib_Mermaid_UseMermaidConfig_Returns}
 *
 * @since 0.15.0
 */
export function useMermaidConfig(): Lib_Mermaid_UseMermaidConfig_Returns {
  const colorMode: Lib_Mermaid_UseMermaidConfig_ColorMode = (typeof document !== 'undefined') ? (document.documentElement.getAttribute('data-theme') ?? 'light') : 'light';
  const isDark: Lib_Mermaid_UseMermaidConfig_IsDark = colorMode === 'dark';
  /*
   * Mermaid's font is hard-coded - decoupled from `--nova-font-body` - so
   * measurement (themeVariables.fontFamily) and render (themeCSS rule below)
   * always come from the same source. Binding to a preset or consumer-level
   * body font lets site-wide typography swaps push diagram rect widths into
   * unpredictable layouts with no way to recover, because mermaid sizes
   * rects from measurement at config time and has no post-render reflow.
   */
  const fontFamily: Lib_Mermaid_UseMermaidConfig_FontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

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
 * @param {Lib_Mermaid_UseMermaidRenderResult_Options} options - Options.
 *
 * @returns {Lib_Mermaid_UseMermaidRenderResult_Returns}
 *
 * @since 0.15.0
 */
export function useMermaidRenderResult(options: Lib_Mermaid_UseMermaidRenderResult_Options): Lib_Mermaid_UseMermaidRenderResult_Returns {
  const state: Lib_Mermaid_UseMermaidRenderResult_State = useState<Lib_Mermaid_UseMermaidRenderResult_Returns>(null);
  const result: Lib_Mermaid_UseMermaidRenderResult_Result = state[0];
  const setResult: Lib_Mermaid_UseMermaidRenderResult_SetResult = state[1];
  const config: Lib_Mermaid_UseMermaidRenderResult_Config = useMermaidConfig();
  const id: Lib_Mermaid_UseMermaidRenderResult_Id = `mermaid-svg-${String(Math.random()).replace('.', '')}`;

  useEffect(() => {
    let cancelled: Lib_Mermaid_UseMermaidRenderResult_Cancelled = false;

    void (async () => {
      try {
        const mermaidModule: Lib_Mermaid_UseMermaidRenderResult_MermaidModule = await loadMermaid();
        const mermaidDefault: Lib_Mermaid_UseMermaidRenderResult_MermaidDefault = mermaidModule['default'];

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

        mermaidDefault.initialize(config as Lib_Mermaid_UseMermaidRenderResult_InitializeConfig);

        const renderOutput: Lib_Mermaid_UseMermaidRenderResult_RenderOutput = await mermaidDefault.render(id, options['text']);

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

import { useEffect, useState } from 'react';

import type {
  LibMermaidContainerClassName,
  LibMermaidGetCssVariableComputedStyle,
  LibMermaidGetCssVariableName,
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
export const MERMAID_CONTAINER_CLASS_NAME: LibMermaidContainerClassName = 'docusaurus-mermaid-container';

/**
 * Lib - Mermaid - Get CSS Variable.
 *
 * Reads a CSS custom property value from the document root
 * element and returns the trimmed string.
 *
 * @param {LibMermaidGetCssVariableName} name - Name.
 *
 * @returns {LibMermaidGetCssVariableReturns}
 *
 * @since 0.15.0
 */
function getCssVariable(name: LibMermaidGetCssVariableName): LibMermaidGetCssVariableReturns {
  if (typeof document === 'undefined') {
    return '';
  }

  const computedStyle: LibMermaidGetCssVariableComputedStyle = getComputedStyle(document.documentElement);

  return computedStyle.getPropertyValue(name).trim();
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
  const fontFamily: LibMermaidUseMermaidConfigFontFamily = getCssVariable('--nova-font-body');

  return {
    startOnLoad: false,
    theme: 'base',
    colorMode,
    themeVariables: {
      primaryColor: getCssVariable(isDark === true ? '--nova-color-primary-800' : '--nova-color-primary-100'),
      primaryTextColor: getCssVariable(isDark === true ? '--nova-color-primary-100' : '--nova-color-primary-900'),
      primaryBorderColor: getCssVariable(isDark === true ? '--nova-color-primary-600' : '--nova-color-primary-300'),
      secondaryColor: getCssVariable(isDark === true ? '--nova-color-accent-800' : '--nova-color-accent-100'),
      secondaryTextColor: getCssVariable(isDark === true ? '--nova-color-accent-100' : '--nova-color-accent-900'),
      secondaryBorderColor: getCssVariable(isDark === true ? '--nova-color-accent-600' : '--nova-color-accent-300'),
      tertiaryColor: getCssVariable(isDark === true ? '--nova-color-neutral-800' : '--nova-color-neutral-100'),
      tertiaryTextColor: getCssVariable(isDark === true ? '--nova-color-neutral-100' : '--nova-color-neutral-800'),
      tertiaryBorderColor: getCssVariable(isDark === true ? '--nova-color-neutral-600' : '--nova-color-neutral-300'),
      lineColor: getCssVariable(isDark === true ? '--nova-color-neutral-500' : '--nova-color-neutral-400'),
      textColor: getCssVariable(isDark === true ? '--nova-color-neutral-200' : '--nova-color-neutral-800'),
      mainBkg: getCssVariable(isDark === true ? '--nova-color-primary-900' : '--nova-color-primary-50'),
      nodeBorder: getCssVariable(isDark === true ? '--nova-color-primary-600' : '--nova-color-primary-300'),
      clusterBkg: getCssVariable(isDark === true ? '--nova-color-neutral-900' : '--nova-color-neutral-50'),
      clusterBorder: getCssVariable(isDark === true ? '--nova-color-neutral-700' : '--nova-color-neutral-200'),
      edgeLabelBackground: getCssVariable(isDark === true ? '--nova-color-neutral-900' : '--nova-color-neutral-50'),
      fontFamily,
      fontSize: '14px',
    },
    themeCSS: [
      '.node rect, .node circle, .node polygon, .node ellipse, .node .basic { rx: 8px; ry: 8px; stroke-width: 1.5px; }',
      '.node .label { font-weight: 500; letter-spacing: -0.01em; }',
      '.edgePath path.path { stroke-width: 1.5px; }',
      '.edgeLabel { font-size: 12px; }',
      '.cluster rect { rx: 12px; ry: 12px; stroke-width: 1.5px; }',
      '.cluster text { font-weight: 600; font-size: 13px; letter-spacing: -0.01em; }',
      `.label { font-family: ${fontFamily}; }`,
      `.nodeLabel { font-family: ${fontFamily}; }`,
      `.edgeLabel { font-family: ${fontFamily}; }`,
      '.label foreignObject { overflow: visible; }',
      `.node.muted rect, .node.muted path, .node.muted .basic { fill: ${getCssVariable(isDark === true ? '--nova-color-neutral-800' : '--nova-color-neutral-100')} !important; stroke: ${getCssVariable(isDark === true ? '--nova-color-neutral-600' : '--nova-color-neutral-300')} !important; }`,
      `.node.muted .label, .node.muted .nodeLabel { color: ${getCssVariable(isDark === true ? '--nova-color-neutral-400' : '--nova-color-neutral-500')} !important; }`,
    ].join('\n'),
    flowchart: {
      curve: 'basis',
      padding: 16,
      nodeSpacing: 50,
      rankSpacing: 60,
      subGraphTitleMargin: {
        top: 16,
        bottom: 8,
      },
      htmlLabels: true,
      useMaxWidth: false,
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

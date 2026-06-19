import ErrorBoundary from '@docusaurus/ErrorBoundary';
import ErrorPageContent from '@theme/ErrorPageContent';
import { useEffect, useRef, useState } from 'react';

import {
  MERMAID_CONTAINER_CLASS_NAME,
  useMermaidRenderResult,
} from '../../lib/mermaid.js';

import type {
  Theme_Mermaid_Index_Mermaid_ColorMode,
  Theme_Mermaid_Index_Mermaid_ColorModeState,
  Theme_Mermaid_Index_Mermaid_CurrentTheme,
  Theme_Mermaid_Index_Mermaid_Observer,
  Theme_Mermaid_Index_Mermaid_Props,
  Theme_Mermaid_Index_Mermaid_Returns,
  Theme_Mermaid_Index_Mermaid_SetColorMode,
  Theme_Mermaid_Index_Mermaid_Theme,
  Theme_Mermaid_Index_MermaidContent_ClassName,
  Theme_Mermaid_Index_MermaidContent_ContainerRef,
  Theme_Mermaid_Index_MermaidContent_Props,
  Theme_Mermaid_Index_MermaidContent_RenderResult,
  Theme_Mermaid_Index_MermaidContent_Returns,
} from '../../types/theme/Mermaid/index.d.ts';

/**
 * Theme - Mermaid - Content.
 *
 * Renders a Mermaid diagram from the given text by injecting
 * the resulting SVG into a container div.
 *
 * @param {Theme_Mermaid_Index_MermaidContent_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MermaidContent(props: Theme_Mermaid_Index_MermaidContent_Props): Theme_Mermaid_Index_MermaidContent_Returns {
  const renderResult: Theme_Mermaid_Index_MermaidContent_RenderResult = useMermaidRenderResult({ text: props['value'] });
  const containerRef: Theme_Mermaid_Index_MermaidContent_ContainerRef = useRef<HTMLDivElement | null>(null);

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

  if (renderResult === null) {
    return null;
  }

  const className: Theme_Mermaid_Index_MermaidContent_ClassName = (props['className'] !== undefined) ? `${MERMAID_CONTAINER_CLASS_NAME} ${props['className']}` : MERMAID_CONTAINER_CLASS_NAME;

  return (
    <div
      ref={containerRef}
      className={className}
      style={props['style']}
      dangerouslySetInnerHTML={{ __html: renderResult['svg'] }}
    />
  );
}

/**
 * Theme - Mermaid.
 *
 * Wraps the Mermaid diagram renderer in an error boundary so
 * that malformed syntax does not crash the page.
 *
 * @param {Theme_Mermaid_Index_Mermaid_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Mermaid(props: Theme_Mermaid_Index_Mermaid_Props): Theme_Mermaid_Index_Mermaid_Returns {
  const colorModeState: Theme_Mermaid_Index_Mermaid_ColorModeState = useState<Theme_Mermaid_Index_Mermaid_ColorMode>('light');
  const colorMode: Theme_Mermaid_Index_Mermaid_ColorMode = colorModeState[0];
  const setColorMode: Theme_Mermaid_Index_Mermaid_SetColorMode = colorModeState[1];

  useEffect(() => {
    const currentTheme: Theme_Mermaid_Index_Mermaid_CurrentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme !== null) {
      setColorMode(currentTheme);
    }

    const observer: Theme_Mermaid_Index_Mermaid_Observer = new MutationObserver(() => {
      const theme: Theme_Mermaid_Index_Mermaid_Theme = document.documentElement.getAttribute('data-theme');

      if (theme !== null) {
        setColorMode(theme);
      }

      return undefined;
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      observer.disconnect();

      return undefined;
    };
  }, []);

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

import ErrorBoundary from '@docusaurus/ErrorBoundary';
import ErrorPageContent from '@theme/ErrorPageContent';
import { useEffect, useRef, useState } from 'react';

import {
  MERMAID_CONTAINER_CLASS_NAME,
  useMermaidRenderResult,
} from '../../lib/mermaid.js';

import type {
  ThemeMermaidContentContainerRef,
  ThemeMermaidContentProps,
  ThemeMermaidContentRenderResult,
  ThemeMermaidContentReturns,
  ThemeMermaidMermaidColorMode,
  ThemeMermaidMermaidColorModeState,
  ThemeMermaidMermaidCurrentTheme,
  ThemeMermaidMermaidObserver,
  ThemeMermaidMermaidProps,
  ThemeMermaidMermaidReturns,
  ThemeMermaidMermaidSetColorMode,
  ThemeMermaidMermaidTheme,
} from '../../types/theme/Mermaid/index.d.ts';

/**
 * Theme - Mermaid - Content.
 *
 * Renders a Mermaid diagram from the given text by injecting
 * the resulting SVG into a container div.
 *
 * @param {ThemeMermaidContentProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function MermaidContent(props: ThemeMermaidContentProps): ThemeMermaidContentReturns {
  const renderResult: ThemeMermaidContentRenderResult = useMermaidRenderResult({ text: props['value'] });
  const containerRef: ThemeMermaidContentContainerRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div
      ref={containerRef}
      className={MERMAID_CONTAINER_CLASS_NAME}
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
 * @param {ThemeMermaidMermaidProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Mermaid(props: ThemeMermaidMermaidProps): ThemeMermaidMermaidReturns {
  const colorModeState: ThemeMermaidMermaidColorModeState = useState<ThemeMermaidMermaidColorMode>('light');
  const colorMode: ThemeMermaidMermaidColorMode = colorModeState[0];
  const setColorMode: ThemeMermaidMermaidSetColorMode = colorModeState[1];

  useEffect(() => {
    const currentTheme: ThemeMermaidMermaidCurrentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme !== null) {
      setColorMode(currentTheme);
    }

    const observer: ThemeMermaidMermaidObserver = new MutationObserver(() => {
      const theme: ThemeMermaidMermaidTheme = document.documentElement.getAttribute('data-theme');

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
      <MermaidContent key={colorMode} value={props['value']} />
    </ErrorBoundary>
  );
}

export default Mermaid;

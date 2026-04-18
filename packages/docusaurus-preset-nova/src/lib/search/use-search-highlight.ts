import { useEffect, useRef } from 'react';

import type {
  LibSearchUseSearchHighlightCurrentMark,
  LibSearchUseSearchHighlightHighlightTerm,
  LibSearchUseSearchHighlightInstance,
  LibSearchUseSearchHighlightIsCancelled,
  LibSearchUseSearchHighlightMarkConstructor,
  LibSearchUseSearchHighlightMarkConstructorCast,
  LibSearchUseSearchHighlightMarkDefault,
  LibSearchUseSearchHighlightMarkModule,
  LibSearchUseSearchHighlightMarkModuleRecord,
  LibSearchUseSearchHighlightMarkRef,
  LibSearchUseSearchHighlightOptions,
  LibSearchUseSearchHighlightReturns,
  LibSearchUseSearchHighlightSearchParams,
  LibSearchUseSearchHighlightTargetElement,
} from '../../types/lib/search/use-search-highlight.d.ts';

/**
 * Lib - Search - Use Search Highlight - Use Search Highlight.
 *
 * React hook that reads the _highlight query parameter from the current URL,
 * lazily loads mark.js, and highlights matching terms within the article or
 * main content area, cleaning up highlights on unmount or when the URL changes.
 *
 * @param {LibSearchUseSearchHighlightOptions} options - Options.
 *
 * @since 0.15.0
 */
export function useSearchHighlight(options: LibSearchUseSearchHighlightOptions): LibSearchUseSearchHighlightReturns {
  const markRef: LibSearchUseSearchHighlightMarkRef = useRef<unknown>(undefined);

  useEffect(() => {
    if (options['enabled'] === false) {
      return;
    }

    const searchParams: LibSearchUseSearchHighlightSearchParams = new URLSearchParams(window.location.search);
    const highlightTerm: LibSearchUseSearchHighlightHighlightTerm = searchParams.get('_highlight');

    if (highlightTerm === null || highlightTerm === '') {
      return;
    }

    let isCancelled: LibSearchUseSearchHighlightIsCancelled = false as LibSearchUseSearchHighlightIsCancelled;

    void (async () => {
      try {
        const markModule: LibSearchUseSearchHighlightMarkModule = await import('mark.js');
        const markModuleRecord: LibSearchUseSearchHighlightMarkModuleRecord = markModule as LibSearchUseSearchHighlightMarkModuleRecord;
        const markDefault: LibSearchUseSearchHighlightMarkDefault = markModuleRecord['default'];
        const markConstructorCast: LibSearchUseSearchHighlightMarkConstructorCast = markModule;

        const MarkConstructor: LibSearchUseSearchHighlightMarkConstructor = (markDefault !== undefined) ? markDefault as LibSearchUseSearchHighlightMarkConstructor : markConstructorCast as LibSearchUseSearchHighlightMarkConstructor;

        if (isCancelled === true) {
          return;
        }

        const targetElement: LibSearchUseSearchHighlightTargetElement = document.querySelector('article') ?? document.querySelector('main');

        if (targetElement === null) {
          return;
        }

        const instance: LibSearchUseSearchHighlightInstance = new MarkConstructor(targetElement);

        markRef.current = instance;
        instance.mark(highlightTerm);
      } catch {
        // mark.js is an optional enhancement; silently ignore import failures.
      }

      return;
    })();

    return () => {
      isCancelled = true;

      const currentMark: LibSearchUseSearchHighlightCurrentMark = markRef.current;

      if (currentMark !== undefined) {
        const typedMark: LibSearchUseSearchHighlightInstance = currentMark as LibSearchUseSearchHighlightInstance;

        typedMark.unmark();
        markRef.current = undefined;
      }

      return;
    };
  }, [
    options['enabled'],
    (typeof window !== 'undefined') ? window.location.search : '',
  ]);

  return;
}

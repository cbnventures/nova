import { useEffect, useRef } from 'react';

import type {
  Lib_Search_UseSearchHighlight_CurrentMark,
  Lib_Search_UseSearchHighlight_HighlightTerm,
  Lib_Search_UseSearchHighlight_Instance,
  Lib_Search_UseSearchHighlight_IsCancelled,
  Lib_Search_UseSearchHighlight_MarkConstructor,
  Lib_Search_UseSearchHighlight_MarkConstructorCast,
  Lib_Search_UseSearchHighlight_MarkDefault,
  Lib_Search_UseSearchHighlight_MarkModule,
  Lib_Search_UseSearchHighlight_MarkModuleRecord,
  Lib_Search_UseSearchHighlight_MarkRef,
  Lib_Search_UseSearchHighlight_Options,
  Lib_Search_UseSearchHighlight_Returns,
  Lib_Search_UseSearchHighlight_SearchParams,
  Lib_Search_UseSearchHighlight_TargetElement,
  Lib_Search_UseSearchHighlight_UseSearchHighlight_TypedMark,
} from '../../types/lib/search/use-search-highlight.d.ts';

/**
 * Lib - Search - Use Search Highlight - Use Search Highlight.
 *
 * React hook that reads the _highlight query parameter from the current URL,
 * lazily loads mark.js, and highlights matching terms within the article or
 * main content area, cleaning up highlights on unmount or when the URL changes.
 *
 * @param {Lib_Search_UseSearchHighlight_Options} options - Options.
 *
 * @since 0.15.0
 */
export function useSearchHighlight(options: Lib_Search_UseSearchHighlight_Options): Lib_Search_UseSearchHighlight_Returns {
  const markRef: Lib_Search_UseSearchHighlight_MarkRef = useRef<unknown>(undefined);

  useEffect(() => {
    if (options['enabled'] === false) {
      return;
    }

    const searchParams: Lib_Search_UseSearchHighlight_SearchParams = new URLSearchParams(window.location.search);
    const highlightTerm: Lib_Search_UseSearchHighlight_HighlightTerm = searchParams.get('_highlight');

    if (highlightTerm === null || highlightTerm === '') {
      return;
    }

    let isCancelled: Lib_Search_UseSearchHighlight_IsCancelled = false as Lib_Search_UseSearchHighlight_IsCancelled;

    void (async () => {
      try {
        const markModule: Lib_Search_UseSearchHighlight_MarkModule = await import('mark.js');
        const markModuleRecord: Lib_Search_UseSearchHighlight_MarkModuleRecord = markModule as Lib_Search_UseSearchHighlight_MarkModuleRecord;
        const markDefault: Lib_Search_UseSearchHighlight_MarkDefault = markModuleRecord['default'];
        const markConstructorCast: Lib_Search_UseSearchHighlight_MarkConstructorCast = markModule;

        const MarkConstructor: Lib_Search_UseSearchHighlight_MarkConstructor = (markDefault !== undefined) ? markDefault as Lib_Search_UseSearchHighlight_MarkConstructor : markConstructorCast as Lib_Search_UseSearchHighlight_MarkConstructor;

        if (isCancelled === true) {
          return;
        }

        const targetElement: Lib_Search_UseSearchHighlight_TargetElement = document.querySelector('article') ?? document.querySelector('main');

        if (targetElement === null) {
          return;
        }

        const instance: Lib_Search_UseSearchHighlight_Instance = new MarkConstructor(targetElement);

        markRef.current = instance;
        instance.mark(highlightTerm);
      } catch {
        // mark.js is an optional enhancement; silently ignore import failures.
      }

      return;
    })();

    return () => {
      isCancelled = true;

      const currentMark: Lib_Search_UseSearchHighlight_CurrentMark = markRef.current;

      if (currentMark !== undefined) {
        const typedMark: Lib_Search_UseSearchHighlight_UseSearchHighlight_TypedMark = currentMark as Lib_Search_UseSearchHighlight_UseSearchHighlight_TypedMark;

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

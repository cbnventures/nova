import { translate } from '@docusaurus/Translate';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import type {
  Lib_Search_UseSearchWorker_Error,
  Lib_Search_UseSearchWorker_ErrorState,
  Lib_Search_UseSearchWorker_HandleMessage,
  Lib_Search_UseSearchWorker_IndexUrl,
  Lib_Search_UseSearchWorker_InitErrorMessage,
  Lib_Search_UseSearchWorker_IsReady,
  Lib_Search_UseSearchWorker_IsReadyState,
  Lib_Search_UseSearchWorker_ManifestContentType,
  Lib_Search_UseSearchWorker_ManifestData,
  Lib_Search_UseSearchWorker_ManifestFetchError,
  Lib_Search_UseSearchWorker_ManifestResponse,
  Lib_Search_UseSearchWorker_MessageEvent,
  Lib_Search_UseSearchWorker_Options,
  Lib_Search_UseSearchWorker_PerformSearch,
  Lib_Search_UseSearchWorker_ProductionOnlyError,
  Lib_Search_UseSearchWorker_Query,
  Lib_Search_UseSearchWorker_ResolvedIndexUrl,
  Lib_Search_UseSearchWorker_Results,
  Lib_Search_UseSearchWorker_ResultsState,
  Lib_Search_UseSearchWorker_Returns,
  Lib_Search_UseSearchWorker_Search,
  Lib_Search_UseSearchWorker_SetError,
  Lib_Search_UseSearchWorker_SetIsReady,
  Lib_Search_UseSearchWorker_SetResults,
  Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_ErrorMessages,
  Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageData,
  Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageHits,
  Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageReason,
  Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageType,
  Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_TranslatedError,
  Lib_Search_UseSearchWorker_UseSearchWorker_PerformSearch_CurrentWorker,
  Lib_Search_UseSearchWorker_UseSearchWorker_PerformSearch_FuzzyDistance,
  Lib_Search_UseSearchWorker_UseSearchWorker_PerformSearch_SearchLimit,
  Lib_Search_UseSearchWorker_WorkerInstance,
  Lib_Search_UseSearchWorker_WorkerRef,
} from '../../types/lib/search/use-search-worker.d.ts';

/**
 * Lib - Search - Use Search Worker - Use Search Worker.
 *
 * React hook that manages a Web Worker lifecycle for full-text search, lazily
 * creating the worker on first call, fetching the search manifest to resolve
 * the index URL, posting search queries, and returning results and state.
 *
 * @param {Lib_Search_UseSearchWorker_Options} options - Options.
 *
 * @returns {Lib_Search_UseSearchWorker_Returns}
 *
 * @since 0.15.0
 */
export function useSearchWorker(options: Lib_Search_UseSearchWorker_Options): Lib_Search_UseSearchWorker_Returns {
  const workerRef: Lib_Search_UseSearchWorker_WorkerRef = useRef<Worker | undefined>(undefined);

  const isReadyState: Lib_Search_UseSearchWorker_IsReadyState = useState<Lib_Search_UseSearchWorker_IsReady>(false);
  const isReady: Lib_Search_UseSearchWorker_IsReady = isReadyState[0];
  const setIsReady: Lib_Search_UseSearchWorker_SetIsReady = isReadyState[1];

  const resultsState: Lib_Search_UseSearchWorker_ResultsState = useState<Lib_Search_UseSearchWorker_Results>([]);
  const results: Lib_Search_UseSearchWorker_Results = resultsState[0];
  const setResults: Lib_Search_UseSearchWorker_SetResults = resultsState[1];

  const errorState: Lib_Search_UseSearchWorker_ErrorState = useState<Lib_Search_UseSearchWorker_Error>(undefined);
  const error: Lib_Search_UseSearchWorker_Error = errorState[0];
  const setError: Lib_Search_UseSearchWorker_SetError = errorState[1];

  useEffect(() => {
    let workerInstance: Lib_Search_UseSearchWorker_WorkerInstance = undefined;

    /**
     * Lib - Search - Use Search Worker - Use Search Worker - Handle Message.
     *
     * Handles messages posted back from the search worker, dispatching ready,
     * results, and error notifications to the corresponding React state setters.
     *
     * @since 0.15.0
     */
    const handleMessage: Lib_Search_UseSearchWorker_HandleMessage = (messageEvent: Lib_Search_UseSearchWorker_MessageEvent) => {
      const messageData: Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageData = messageEvent['data'] as Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageData;
      const messageType: Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageType = messageData['type'] as Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageType;

      if (messageType === 'ready') {
        setIsReady(true);
      } else if (messageType === 'results') {
        const messageHits: Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageHits = messageData['hits'] as Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageHits;

        setResults(messageHits);
        setError(undefined);
      } else if (messageType === 'error') {
        const messageReason: Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageReason = messageData['reason'] as Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_MessageReason;
        const errorMessages: Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_ErrorMessages = {
          'SEARCH_UNKNOWN_INIT_ERROR': translate({
            id: 'theme.search.unknownInitError',
            message: 'Unknown error during init',
            description: 'The error message when an unknown error occurs during search initialization',
          }),
          'SEARCH_INDEX_NOT_INITIALIZED': translate({
            id: 'theme.search.indexNotInitialized',
            message: 'Search index not initialized',
            description: 'The error message when search is attempted before the index is ready',
          }),
        };
        const translatedError: Lib_Search_UseSearchWorker_UseSearchWorker_HandleMessage_TranslatedError = errorMessages[messageReason] ?? messageReason;

        setError(translatedError);
      }

      return undefined;
    };

    void (async () => {
      try {
        const manifestResponse: Lib_Search_UseSearchWorker_ManifestResponse = await fetch(options['manifestUrl']);
        const manifestContentType: Lib_Search_UseSearchWorker_ManifestContentType = manifestResponse['headers'].get('content-type') ?? '';

        if (manifestResponse['ok'] === false || manifestContentType.includes('application/json') === false) {
          const productionOnlyError: Lib_Search_UseSearchWorker_ProductionOnlyError = translate({
            id: 'theme.search.productionOnly',
            message: 'Search is available in production builds only',
            description: 'The error message when search is used in a non-production build',
          });

          setError(productionOnlyError);
          setIsReady(true);

          return;
        }

        const manifestData: Lib_Search_UseSearchWorker_ManifestData = await manifestResponse.json() as Lib_Search_UseSearchWorker_ManifestData;

        if (
          manifestData === null
          || typeof manifestData !== 'object'
          || typeof manifestData['indexUrl'] !== 'string'
        ) {
          setError('Invalid search manifest: missing indexUrl.');
          setIsReady(true);

          return;
        }

        const indexUrl: Lib_Search_UseSearchWorker_IndexUrl = manifestData['indexUrl'];
        const resolvedIndexUrl: Lib_Search_UseSearchWorker_ResolvedIndexUrl = new URL(indexUrl, window.location.origin + options['manifestUrl']).href;

        workerInstance = new Worker(options['workerUrl']);
        workerRef.current = workerInstance;

        workerInstance.addEventListener('message', handleMessage);

        workerInstance.postMessage({
          type: 'init',
          indexUrl: resolvedIndexUrl,
        });
      } catch (initError) {
        const manifestFetchError: Lib_Search_UseSearchWorker_ManifestFetchError = translate({
          id: 'theme.search.manifestFetchError',
          message: 'Failed to fetch search manifest',
          description: 'The error message when the search manifest cannot be fetched',
        });
        const initErrorMessage: Lib_Search_UseSearchWorker_InitErrorMessage = (initError instanceof Error) ? initError['message'] : manifestFetchError;

        setError(initErrorMessage);
      }

      return;
    })();

    return () => {
      if (workerInstance !== undefined) {
        workerInstance.terminate();
      }

      workerRef.current = undefined;

      return;
    };
  }, [
    options['workerUrl'],
    options['manifestUrl'],
  ]);

  /**
   * Lib - Search - Use Search Worker - Use Search Worker - Perform Search.
   *
   * Posts a search query to the worker once it is ready, applying the
   * configured result limit and fuzzy matching distance so the worker
   * returns a bounded set of hits.
   *
   * @since 0.15.0
   */
  const performSearch: Lib_Search_UseSearchWorker_PerformSearch = (query: Lib_Search_UseSearchWorker_Query) => {
    const currentWorker: Lib_Search_UseSearchWorker_UseSearchWorker_PerformSearch_CurrentWorker = workerRef.current;

    if (currentWorker === undefined || isReady === false) {
      return undefined;
    }

    const searchLimit: Lib_Search_UseSearchWorker_UseSearchWorker_PerformSearch_SearchLimit = options['searchResultLimits'] ?? 8;
    const fuzzyDistance: Lib_Search_UseSearchWorker_UseSearchWorker_PerformSearch_FuzzyDistance = options['fuzzyMatchingDistance'] ?? 1;

    currentWorker.postMessage({
      type: 'search',
      query,
      limit: searchLimit,
      fuzzyDistance,
    });

    return undefined;
  };

  const search: Lib_Search_UseSearchWorker_Search = useCallback(performSearch, [isReady]);

  return {
    search,
    results,
    isReady,
    error,
  };
}

import { translate } from '@docusaurus/Translate';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import type {
  LibSearchUseSearchWorkerCurrentWorker,
  LibSearchUseSearchWorkerError,
  LibSearchUseSearchWorkerErrorMessages,
  LibSearchUseSearchWorkerErrorState,
  LibSearchUseSearchWorkerIndexUrl,
  LibSearchUseSearchWorkerInitErrorMessage,
  LibSearchUseSearchWorkerIsReady,
  LibSearchUseSearchWorkerIsReadyState,
  LibSearchUseSearchWorkerManifestContentType,
  LibSearchUseSearchWorkerManifestData,
  LibSearchUseSearchWorkerManifestFetchError,
  LibSearchUseSearchWorkerManifestResponse,
  LibSearchUseSearchWorkerMessageData,
  LibSearchUseSearchWorkerMessageEvent,
  LibSearchUseSearchWorkerMessageHits,
  LibSearchUseSearchWorkerMessageReason,
  LibSearchUseSearchWorkerMessageType,
  LibSearchUseSearchWorkerOptions,
  LibSearchUseSearchWorkerProductionOnlyError,
  LibSearchUseSearchWorkerResolvedIndexUrl,
  LibSearchUseSearchWorkerResults,
  LibSearchUseSearchWorkerResultsState,
  LibSearchUseSearchWorkerReturns,
  LibSearchUseSearchWorkerSearchFunction,
  LibSearchUseSearchWorkerSearchLimit,
  LibSearchUseSearchWorkerSearchQuery,
  LibSearchUseSearchWorkerSetError,
  LibSearchUseSearchWorkerSetIsReady,
  LibSearchUseSearchWorkerSetResults,
  LibSearchUseSearchWorkerTranslatedError,
  LibSearchUseSearchWorkerWorkerInstance,
  LibSearchUseSearchWorkerWorkerRef,
} from '../../types/lib/search/use-search-worker.d.ts';

/**
 * Lib - Search - Use Search Worker - Use Search Worker.
 *
 * React hook that manages a Web Worker lifecycle for full-text search, lazily
 * creating the worker on first call, fetching the search manifest to resolve
 * the index URL, posting search queries, and returning results and state.
 *
 * @param {LibSearchUseSearchWorkerOptions} options - Options.
 *
 * @returns {LibSearchUseSearchWorkerReturns}
 *
 * @since 0.15.0
 */
export function useSearchWorker(options: LibSearchUseSearchWorkerOptions): LibSearchUseSearchWorkerReturns {
  const workerRef: LibSearchUseSearchWorkerWorkerRef = useRef<Worker | undefined>(undefined);

  const isReadyState: LibSearchUseSearchWorkerIsReadyState = useState<LibSearchUseSearchWorkerIsReady>(false);
  const isReady: LibSearchUseSearchWorkerIsReady = isReadyState[0];
  const setIsReady: LibSearchUseSearchWorkerSetIsReady = isReadyState[1];

  const resultsState: LibSearchUseSearchWorkerResultsState = useState<LibSearchUseSearchWorkerResults>([]);
  const results: LibSearchUseSearchWorkerResults = resultsState[0];
  const setResults: LibSearchUseSearchWorkerSetResults = resultsState[1];

  const errorState: LibSearchUseSearchWorkerErrorState = useState<LibSearchUseSearchWorkerError>(undefined);
  const error: LibSearchUseSearchWorkerError = errorState[0];
  const setError: LibSearchUseSearchWorkerSetError = errorState[1];

  useEffect(() => {
    let workerInstance: LibSearchUseSearchWorkerWorkerInstance = undefined;

    void (async () => {
      try {
        const manifestResponse: LibSearchUseSearchWorkerManifestResponse = await fetch(options['manifestUrl']);
        const manifestContentType: LibSearchUseSearchWorkerManifestContentType = manifestResponse['headers'].get('content-type') ?? '';

        if (manifestResponse['ok'] === false || manifestContentType.includes('application/json') === false) {
          const productionOnlyError: LibSearchUseSearchWorkerProductionOnlyError = translate({
            id: 'theme.search.productionOnly',
            message: 'Search is available in production builds only',
            description: 'The error message when search is used in a non-production build',
          });

          setError(productionOnlyError);
          setIsReady(true);

          return;
        }

        const manifestData: LibSearchUseSearchWorkerManifestData = await manifestResponse.json() as LibSearchUseSearchWorkerManifestData;

        if (
          manifestData === null
          || typeof manifestData !== 'object'
          || typeof manifestData['indexUrl'] !== 'string'
        ) {
          setError('Invalid search manifest: missing indexUrl.');
          setIsReady(true);

          return;
        }

        const indexUrl: LibSearchUseSearchWorkerIndexUrl = manifestData['indexUrl'];
        const resolvedIndexUrl: LibSearchUseSearchWorkerResolvedIndexUrl = new URL(indexUrl, window.location.origin + options['manifestUrl']).href;

        workerInstance = new Worker(options['workerUrl']);
        workerRef.current = workerInstance;

        workerInstance.addEventListener('message', (messageEvent: LibSearchUseSearchWorkerMessageEvent) => {
          const messageData: LibSearchUseSearchWorkerMessageData = messageEvent['data'] as LibSearchUseSearchWorkerMessageData;
          const messageType: LibSearchUseSearchWorkerMessageType = messageData['type'] as LibSearchUseSearchWorkerMessageType;

          if (messageType === 'ready') {
            setIsReady(true);
          } else if (messageType === 'results') {
            const messageHits: LibSearchUseSearchWorkerMessageHits = messageData['hits'] as LibSearchUseSearchWorkerMessageHits;

            setResults(messageHits);
            setError(undefined);
          } else if (messageType === 'error') {
            const messageReason: LibSearchUseSearchWorkerMessageReason = messageData['reason'] as LibSearchUseSearchWorkerMessageReason;
            const errorMessages: LibSearchUseSearchWorkerErrorMessages = {
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
            const translatedError: LibSearchUseSearchWorkerTranslatedError = errorMessages[messageReason] ?? messageReason;

            setError(translatedError);
          }

          return;
        });

        workerInstance.postMessage({
          type: 'init',
          indexUrl: resolvedIndexUrl,
        });
      } catch (initError) {
        const manifestFetchError: LibSearchUseSearchWorkerManifestFetchError = translate({
          id: 'theme.search.manifestFetchError',
          message: 'Failed to fetch search manifest',
          description: 'The error message when the search manifest cannot be fetched',
        });
        const initErrorMessage: LibSearchUseSearchWorkerInitErrorMessage = (initError instanceof Error) ? initError['message'] : manifestFetchError;

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

  const search: LibSearchUseSearchWorkerSearchFunction = useCallback((query: LibSearchUseSearchWorkerSearchQuery) => {
    const currentWorker: LibSearchUseSearchWorkerCurrentWorker = workerRef.current;

    if (currentWorker === undefined || isReady === false) {
      return;
    }

    const searchLimit: LibSearchUseSearchWorkerSearchLimit = 8;

    currentWorker.postMessage({
      type: 'search',
      query,
      limit: searchLimit,
    });

    return;
  }, [isReady]);

  return {
    search,
    results,
    isReady,
    error,
  };
}

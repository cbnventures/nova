import type { Dispatch, SetStateAction } from 'react';

import type { SharedSearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Lib - Search - Use Search Worker - Options.
 *
 * @since 0.15.0
 */
export type LibSearchUseSearchWorkerOptionsWorkerUrl = string;

export type LibSearchUseSearchWorkerOptionsManifestUrl = string;

export type LibSearchUseSearchWorkerOptions = {
  workerUrl: LibSearchUseSearchWorkerOptionsWorkerUrl;
  manifestUrl: LibSearchUseSearchWorkerOptionsManifestUrl;
};

/**
 * Lib - Search - Use Search Worker - Returns.
 *
 * @since 0.15.0
 */
export type LibSearchUseSearchWorkerReturnsSearch = (query: string) => void;

export type LibSearchUseSearchWorkerReturnsResults = SharedSearchWorkerSearchHit[];

export type LibSearchUseSearchWorkerReturnsIsReady = boolean;

export type LibSearchUseSearchWorkerReturnsError = string | undefined;

export type LibSearchUseSearchWorkerReturns = {
  search: LibSearchUseSearchWorkerReturnsSearch;
  results: LibSearchUseSearchWorkerReturnsResults;
  isReady: LibSearchUseSearchWorkerReturnsIsReady;
  error: LibSearchUseSearchWorkerReturnsError;
};

/**
 * Lib - Search - Use Search Worker - Translated Errors.
 *
 * @since 0.15.0
 */
export type LibSearchUseSearchWorkerProductionOnlyError = string;

export type LibSearchUseSearchWorkerErrorMessages = Record<string, string>;

export type LibSearchUseSearchWorkerTranslatedError = string;

export type LibSearchUseSearchWorkerManifestFetchError = string;

/**
 * Lib - Search - Use Search Worker - Use Search Worker.
 *
 * @since 0.15.0
 */
export type LibSearchUseSearchWorkerWorkerRef = React.RefObject<Worker | undefined>;

export type LibSearchUseSearchWorkerIsReadyState = [LibSearchUseSearchWorkerIsReady, LibSearchUseSearchWorkerSetIsReady];

export type LibSearchUseSearchWorkerIsReady = boolean;

export type LibSearchUseSearchWorkerSetIsReady = Dispatch<SetStateAction<LibSearchUseSearchWorkerIsReady>>;

export type LibSearchUseSearchWorkerResultsState = [LibSearchUseSearchWorkerResults, LibSearchUseSearchWorkerSetResults];

export type LibSearchUseSearchWorkerResults = SharedSearchWorkerSearchHit[];

export type LibSearchUseSearchWorkerSetResults = Dispatch<SetStateAction<LibSearchUseSearchWorkerResults>>;

export type LibSearchUseSearchWorkerErrorState = [LibSearchUseSearchWorkerError, LibSearchUseSearchWorkerSetError];

export type LibSearchUseSearchWorkerError = string | undefined;

export type LibSearchUseSearchWorkerSetError = Dispatch<SetStateAction<LibSearchUseSearchWorkerError>>;

export type LibSearchUseSearchWorkerWorkerInstance = Worker | undefined;

export type LibSearchUseSearchWorkerManifestResponse = Response;

export type LibSearchUseSearchWorkerManifestContentType = string;

export type LibSearchUseSearchWorkerManifestDataIndexUrl = string;

export type LibSearchUseSearchWorkerManifestData = {
  indexUrl: LibSearchUseSearchWorkerManifestDataIndexUrl;
  [key: string]: unknown;
};

export type LibSearchUseSearchWorkerIndexUrl = string;

export type LibSearchUseSearchWorkerResolvedIndexUrl = string;

export type LibSearchUseSearchWorkerMessageEvent = MessageEvent;

export type LibSearchUseSearchWorkerMessageData = Record<string, unknown>;

export type LibSearchUseSearchWorkerMessageType = string | undefined;

export type LibSearchUseSearchWorkerMessageHits = SharedSearchWorkerSearchHit[];

export type LibSearchUseSearchWorkerMessageReason = string;

export type LibSearchUseSearchWorkerInitError = unknown;

export type LibSearchUseSearchWorkerInitErrorMessage = string;

export type LibSearchUseSearchWorkerSearchFunction = (query: string) => void;

export type LibSearchUseSearchWorkerSearchQuery = string;

export type LibSearchUseSearchWorkerCurrentWorker = Worker | undefined;

export type LibSearchUseSearchWorkerSearchLimit = number;

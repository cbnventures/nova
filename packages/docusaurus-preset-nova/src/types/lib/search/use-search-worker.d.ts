import type { Dispatch, SetStateAction } from 'react';

import type { Shared_SearchWorkerSearchHit } from '../../shared.d.ts';

/**
 * Lib - Search - Use Search Worker - Options.
 *
 * @since 0.15.0
 */
export type Lib_Search_UseSearchWorker_Options_WorkerUrl = string;

export type Lib_Search_UseSearchWorker_Options_ManifestUrl = string;

export type Lib_Search_UseSearchWorker_Options = {
  workerUrl: Lib_Search_UseSearchWorker_Options_WorkerUrl;
  manifestUrl: Lib_Search_UseSearchWorker_Options_ManifestUrl;
};

/**
 * Lib - Search - Use Search Worker - Returns.
 *
 * @since 0.15.0
 */
export type Lib_Search_UseSearchWorker_Returns_Search = (query: string) => void;

export type Lib_Search_UseSearchWorker_Returns_Results = Shared_SearchWorkerSearchHit[];

export type Lib_Search_UseSearchWorker_Returns_IsReady = boolean;

export type Lib_Search_UseSearchWorker_Returns_Error = string | undefined;

export type Lib_Search_UseSearchWorker_Returns = {
  search: Lib_Search_UseSearchWorker_Returns_Search;
  results: Lib_Search_UseSearchWorker_Returns_Results;
  isReady: Lib_Search_UseSearchWorker_Returns_IsReady;
  error: Lib_Search_UseSearchWorker_Returns_Error;
};

/**
 * Lib - Search - Use Search Worker - Translated Errors.
 *
 * @since 0.15.0
 */
export type Lib_Search_UseSearchWorker_ProductionOnlyError = string;

export type Lib_Search_UseSearchWorker_ErrorMessages = Record<string, string>;

export type Lib_Search_UseSearchWorker_TranslatedError = string;

export type Lib_Search_UseSearchWorker_ManifestFetchError = string;

/**
 * Lib - Search - Use Search Worker - Use Search Worker.
 *
 * @since 0.15.0
 */
export type Lib_Search_UseSearchWorker_WorkerRef = React.RefObject<Worker | undefined>;

export type Lib_Search_UseSearchWorker_IsReadyState = [Lib_Search_UseSearchWorker_IsReady, Lib_Search_UseSearchWorker_SetIsReady];

export type Lib_Search_UseSearchWorker_IsReady = boolean;

export type Lib_Search_UseSearchWorker_SetIsReady = Dispatch<SetStateAction<Lib_Search_UseSearchWorker_IsReady>>;

export type Lib_Search_UseSearchWorker_ResultsState = [Lib_Search_UseSearchWorker_Results, Lib_Search_UseSearchWorker_SetResults];

export type Lib_Search_UseSearchWorker_Results = Shared_SearchWorkerSearchHit[];

export type Lib_Search_UseSearchWorker_SetResults = Dispatch<SetStateAction<Lib_Search_UseSearchWorker_Results>>;

export type Lib_Search_UseSearchWorker_ErrorState = [Lib_Search_UseSearchWorker_Error, Lib_Search_UseSearchWorker_SetError];

export type Lib_Search_UseSearchWorker_Error = string | undefined;

export type Lib_Search_UseSearchWorker_SetError = Dispatch<SetStateAction<Lib_Search_UseSearchWorker_Error>>;

export type Lib_Search_UseSearchWorker_WorkerInstance = Worker | undefined;

export type Lib_Search_UseSearchWorker_ManifestResponse = Response;

export type Lib_Search_UseSearchWorker_ManifestContentType = string;

export type Lib_Search_UseSearchWorker_ManifestData_IndexUrl = string;

export type Lib_Search_UseSearchWorker_ManifestData = {
  indexUrl: Lib_Search_UseSearchWorker_ManifestData_IndexUrl;
  [key: string]: unknown;
};

export type Lib_Search_UseSearchWorker_IndexUrl = string;

export type Lib_Search_UseSearchWorker_ResolvedIndexUrl = string;

export type Lib_Search_UseSearchWorker_UseSearchWorker_Message_Event = MessageEvent;

export type Lib_Search_UseSearchWorker_UseSearchWorker_Message_Data = Record<string, unknown>;

export type Lib_Search_UseSearchWorker_UseSearchWorker_Message_Type = string | undefined;

export type Lib_Search_UseSearchWorker_UseSearchWorker_Message_Hits = Shared_SearchWorkerSearchHit[];

export type Lib_Search_UseSearchWorker_UseSearchWorker_Message_Reason = string;

export type Lib_Search_UseSearchWorker_InitError = unknown;

export type Lib_Search_UseSearchWorker_InitErrorMessage = string;

export type Lib_Search_UseSearchWorker_SearchFunction = (query: string) => void;

export type Lib_Search_UseSearchWorker_SearchQuery = string;

export type Lib_Search_UseSearchWorker_CurrentWorker = Worker | undefined;

export type Lib_Search_UseSearchWorker_SearchLimit = number;

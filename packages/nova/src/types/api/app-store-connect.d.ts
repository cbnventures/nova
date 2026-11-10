import type { KeyObject } from 'node:crypto';

import type {
  Shared_AppStoreConnectCredentials,
  Shared_AppStoreConnectRequestOptions,
  Shared_AppStoreConnectResource,
  Shared_AppStoreConnectScreenshotProcessingWaiter,
} from '../shared.d.ts';

/**
 * API - App Store Connect - Active API Operations.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_ActiveApiOperations = number;

export type Api_AppStoreConnect_Runner_ApiOperationQueue_Item = () => void;

export type Api_AppStoreConnect_Runner_ApiOperationQueue = Api_AppStoreConnect_Runner_ApiOperationQueue_Item[];

export type Api_AppStoreConnect_Runner_ApiOperationsPausedUntil = number;

export type Api_AppStoreConnect_Runner_IssuerId = string | undefined;

export type Api_AppStoreConnect_Runner_KeyId = string;

export type Api_AppStoreConnect_Runner_PrivateKey = KeyObject;

export type Api_AppStoreConnect_Runner_ScreenshotProcessingPolls = Map<string, Promise<void>>;

export type Api_AppStoreConnect_Runner_ScreenshotProcessingWaiter_FileName = string;

export type Api_AppStoreConnect_Runner_ScreenshotProcessingWaiter_Reject = (reason?: unknown) => void;

export type Api_AppStoreConnect_Runner_ScreenshotProcessingWaiter_Resolve = () => void;

export type Api_AppStoreConnect_Runner_ScreenshotProcessingWaiter = {
  fileName: Api_AppStoreConnect_Runner_ScreenshotProcessingWaiter_FileName;
  reject: Api_AppStoreConnect_Runner_ScreenshotProcessingWaiter_Reject;
  resolve: Api_AppStoreConnect_Runner_ScreenshotProcessingWaiter_Resolve;
};

export type Api_AppStoreConnect_Runner_ScreenshotProcessingWaiters = Map<string, Map<string, Api_AppStoreConnect_Runner_ScreenshotProcessingWaiter>>;

export type Api_AppStoreConnect_Runner_Token = string | undefined;

export type Api_AppStoreConnect_Runner_TokenExpiresAt = number;

/**
 * API - App Store Connect - Acquire API Operation.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_AcquireApiOperation_Returns = Promise<void>;

export type Api_AppStoreConnect_Runner_AcquireApiOperation_PromiseValue = void;

/**
 * API - App Store Connect - Apply Rate Limit Budget.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Response = Response;

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Returns = void;

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Header = string | null;

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Parts = string[];

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Limit = number | undefined;

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Remaining = number | undefined;

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_SeparatorIndex = number;

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Name = string;

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Value = number;

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_RemainingRatio = number;

export type Api_AppStoreConnect_Runner_ApplyRateLimitBudget_DelayMilliseconds = number;

/**
 * API - App Store Connect - Cleanup Screenshot Reservation.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_CleanupScreenshotReservation_ScreenshotId = string;

export type Api_AppStoreConnect_Runner_CleanupScreenshotReservation_FileName = string;

export type Api_AppStoreConnect_Runner_CleanupScreenshotReservation_Returns = Promise<void>;

/**
 * API - App Store Connect - Constructor.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_Constructor_Credentials = Shared_AppStoreConnectCredentials;

/**
 * API - App Store Connect - Create Localization.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_CreateLocalization_VersionId = string;

export type Api_AppStoreConnect_Runner_CreateLocalization_Locale = string;

export type Api_AppStoreConnect_Runner_CreateLocalization_Attributes = Record<string, string>;

export type Api_AppStoreConnect_Runner_CreateLocalization_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_CreateLocalization_Attempt = number;

export type Api_AppStoreConnect_Runner_CreateLocalization_Response = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_CreateLocalization_Localizations = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_CreateLocalization_MatchingLocalization = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_CreateLocalization_MatchingAttributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_CreateLocalization_RetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_CreateLocalization_RetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_CreateLocalization_RetryDecision_DelayMilliseconds;
} | undefined;

/**
 * API - App Store Connect - Create Screenshot Set.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_CreateScreenshotSet_LocalizationId = string;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_DisplayType = string;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_Attempt = number;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_Response = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_Sets = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_MatchingSet = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_MatchingAttributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_RetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_RetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_CreateScreenshotSet_RetryDecision_DelayMilliseconds;
} | undefined;

/**
 * API - App Store Connect - Delete Resource.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_DeleteResource_ResourceType = string;

export type Api_AppStoreConnect_Runner_DeleteResource_Id = string;

export type Api_AppStoreConnect_Runner_DeleteResource_Returns = Promise<void>;

/**
 * API - App Store Connect - Fetch With Limit.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_FetchWithLimit_Url = string;

export type Api_AppStoreConnect_Runner_FetchWithLimit_Options_Authenticated = boolean;

export type Api_AppStoreConnect_Runner_FetchWithLimit_Options_Body = Buffer | string | undefined;

export type Api_AppStoreConnect_Runner_FetchWithLimit_Options_Headers = Record<string, string>;

export type Api_AppStoreConnect_Runner_FetchWithLimit_Options_Method = string;

export type Api_AppStoreConnect_Runner_FetchWithLimit_Options_RateLimitAttempt = number;

export type Api_AppStoreConnect_Runner_FetchWithLimit_Options_TimeoutMilliseconds = number;

export type Api_AppStoreConnect_Runner_FetchWithLimit_Options = {
  authenticated: Api_AppStoreConnect_Runner_FetchWithLimit_Options_Authenticated;
  body?: Api_AppStoreConnect_Runner_FetchWithLimit_Options_Body;
  headers?: Api_AppStoreConnect_Runner_FetchWithLimit_Options_Headers;
  method: Api_AppStoreConnect_Runner_FetchWithLimit_Options_Method;
  rateLimitAttempt: Api_AppStoreConnect_Runner_FetchWithLimit_Options_RateLimitAttempt;
  timeoutMilliseconds: Api_AppStoreConnect_Runner_FetchWithLimit_Options_TimeoutMilliseconds;
};

export type Api_AppStoreConnect_Runner_FetchWithLimit_Returns = Promise<Response>;

export type Api_AppStoreConnect_Runner_FetchWithLimit_Headers = Record<string, string>;

export type Api_AppStoreConnect_Runner_FetchWithLimit_RequestInit = RequestInit;

export type Api_AppStoreConnect_Runner_FetchWithLimit_Response = Response;

export type Api_AppStoreConnect_Runner_FetchWithLimit_RetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_FetchWithLimit_RetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_FetchWithLimit_RetryDecision_DelayMilliseconds;
} | undefined;

/**
 * API - App Store Connect - Find App.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_FindApp_BundleIdentifier = string;

export type Api_AppStoreConnect_Runner_FindApp_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_FindApp_Query = URLSearchParams;

export type Api_AppStoreConnect_Runner_FindApp_Apps = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_FindApp_App = Shared_AppStoreConnectResource | undefined;

/**
 * API - App Store Connect - Find Asset Library.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_FindAssetLibrary_AppId = string;

export type Api_AppStoreConnect_Runner_FindAssetLibrary_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_FindAssetLibrary_Response = Shared_AppStoreConnectResource | undefined;

/**
 * API - App Store Connect - Find Version.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_FindVersion_AppId = string;

export type Api_AppStoreConnect_Runner_FindVersion_Version = string;

export type Api_AppStoreConnect_Runner_FindVersion_Platform = string;

export type Api_AppStoreConnect_Runner_FindVersion_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_FindVersion_Query = URLSearchParams;

export type Api_AppStoreConnect_Runner_FindVersion_Versions = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_FindVersion_ResolvedVersion = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_FindVersion_Attributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_FindVersion_State = string;

/**
 * API - App Store Connect - Get Token.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_GetToken_Returns = string;

export type Api_AppStoreConnect_Runner_GetToken_Now = number;

export type Api_AppStoreConnect_Runner_GetToken_IssuedAt = number;

export type Api_AppStoreConnect_Runner_GetToken_ExpiresAt = number;

export type Api_AppStoreConnect_Runner_GetToken_Header = Record<string, string>;

export type Api_AppStoreConnect_Runner_GetToken_Payload = Record<string, string | number>;

export type Api_AppStoreConnect_Runner_GetToken_EncodedHeader = string;

export type Api_AppStoreConnect_Runner_GetToken_EncodedPayload = string;

export type Api_AppStoreConnect_Runner_GetToken_SigningInput = string;

export type Api_AppStoreConnect_Runner_GetToken_Signature = Buffer;

/**
 * API - App Store Connect - Is Ambiguous Create Error.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_IsAmbiguousCreateError_Error = unknown;

export type Api_AppStoreConnect_Runner_IsAmbiguousCreateError_TypeGuard_AppStoreConnectAmbiguousCreate = true;

export type Api_AppStoreConnect_Runner_IsAmbiguousCreateError_TypeGuard = Error & {
  appStoreConnectAmbiguousCreate: Api_AppStoreConnect_Runner_IsAmbiguousCreateError_TypeGuard_AppStoreConnectAmbiguousCreate;
};

/**
 * API - App Store Connect - List.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_List_Path = string;

export type Api_AppStoreConnect_Runner_List_Returns = Promise<Shared_AppStoreConnectResource[]>;

export type Api_AppStoreConnect_Runner_List_Resources = Shared_AppStoreConnectResource[];

/**
 * API - App Store Connect - List Localizations.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_ListLocalizations_VersionId = string;

export type Api_AppStoreConnect_Runner_ListLocalizations_Returns = Promise<Shared_AppStoreConnectResource[]>;

export type Api_AppStoreConnect_Runner_ListLocalizations_Query = URLSearchParams;

/**
 * API - App Store Connect - List Page.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_ListPage_Path = string;

export type Api_AppStoreConnect_Runner_ListPage_Resources = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_ListPage_Returns = Promise<Shared_AppStoreConnectResource[]>;

export type Api_AppStoreConnect_Runner_ListPage_Response = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_ListPage_Data = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_ListPage_Links = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_ListPage_Next = string | undefined;

/**
 * API - App Store Connect - List Screenshots.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_ListScreenshots_ScreenshotSetId = string;

export type Api_AppStoreConnect_Runner_ListScreenshots_Returns = Promise<Shared_AppStoreConnectResource[]>;

export type Api_AppStoreConnect_Runner_ListScreenshots_Query = URLSearchParams;

/**
 * API - App Store Connect - List Screenshot Sets.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_ListScreenshotSets_LocalizationId = string;

export type Api_AppStoreConnect_Runner_ListScreenshotSets_Returns = Promise<Shared_AppStoreConnectResource[]>;

export type Api_AppStoreConnect_Runner_ListScreenshotSets_Query = URLSearchParams;

/**
 * API - App Store Connect - Pause API Operations.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_PauseApiOperations_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_PauseApiOperations_Returns = void;

export type Api_AppStoreConnect_Runner_PauseApiOperations_PausedUntil = number;

/**
 * API - App Store Connect - Poll Screenshot Set.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_PollScreenshotSet_ScreenshotSetId = string;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_Attempt = number;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_Returns = Promise<void>;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_Waiters = Map<string, Shared_AppStoreConnectScreenshotProcessingWaiter> | undefined;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_TimedOutWaiter = Shared_AppStoreConnectScreenshotProcessingWaiter;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_Resources = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_PollScreenshotSet_ScreenshotId = string;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_ProcessingWaiter = Shared_AppStoreConnectScreenshotProcessingWaiter;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_Resource = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_Attributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_State = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_Errors = string;

export type Api_AppStoreConnect_Runner_PollScreenshotSet_PollingWaiter = Shared_AppStoreConnectScreenshotProcessingWaiter;

/**
 * API - App Store Connect - Release API Operation.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_ReleaseApiOperation_Returns = void;

export type Api_AppStoreConnect_Runner_ReleaseApiOperation_Resume = (() => void) | undefined;

/**
 * API - App Store Connect - Reorder Screenshots.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotSetId = string;

export type Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotIds = string[];

export type Api_AppStoreConnect_Runner_ReorderScreenshots_Returns = Promise<void>;

/**
 * API - App Store Connect - Request.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_Request_Path = string;

export type Api_AppStoreConnect_Runner_Request_Options = Shared_AppStoreConnectRequestOptions;

export type Api_AppStoreConnect_Runner_Request_Returns = Promise<Shared_AppStoreConnectResource | undefined>;

/**
 * API - App Store Connect - Request Error.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_RequestError_Message = string;

export type Api_AppStoreConnect_Runner_RequestError_AmbiguousCreate = true;

export type Api_AppStoreConnect_Runner_RequestError_Cause = unknown;

export type Api_AppStoreConnect_Runner_RequestError_Returns = Error;

export type Api_AppStoreConnect_Runner_RequestError_Error = Error;

/**
 * API - App Store Connect - Request With Attempt.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_RequestWithAttempt_Path = string;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Options = Shared_AppStoreConnectRequestOptions;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_RateLimitAttempt = number;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_TransientAttempt = number;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Returns = Promise<Shared_AppStoreConnectResource | undefined>;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Method = string;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Body = Record<string, unknown> | undefined;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Url = string;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Response = Response | undefined;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_SerializedBody = string | undefined;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_NetworkRetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_NetworkRetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_RequestWithAttempt_NetworkRetryDecision_DelayMilliseconds;
} | undefined;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ExpectedStatuses = number[];

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseData = unknown;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseBodyRetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseBodyRetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseBodyRetryDecision_DelayMilliseconds;
} | undefined;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseText = string;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ErrorBodyRetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ErrorBodyRetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_RequestWithAttempt_ErrorBodyRetryDecision_DelayMilliseconds;
} | undefined;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_RateLimitRetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_RateLimitRetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_RequestWithAttempt_RateLimitRetryDecision_DelayMilliseconds;
} | undefined;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseRetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseRetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseRetryDecision_DelayMilliseconds;
} | undefined;

/**
 * API - App Store Connect - Reserve Screenshot.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_ReserveScreenshot_ScreenshotSetId = string;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_FileName = string;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_File = Buffer;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_PriorScreenshotIds = Set<string>;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_Attempt = number;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_Reservation = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_Resources = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_ReserveScreenshot_OrphanIds = string[];

export type Api_AppStoreConnect_Runner_ReserveScreenshot_ResourceId = string;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_Attributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_State = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_RetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_ReserveScreenshot_RetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_ReserveScreenshot_RetryDecision_DelayMilliseconds;
} | undefined;

/**
 * API - App Store Connect - Retry After Delay.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_RetryAfterDelay_Response = Response;

export type Api_AppStoreConnect_Runner_RetryAfterDelay_Returns = number | undefined;

export type Api_AppStoreConnect_Runner_RetryAfterDelay_Value = string | null;

export type Api_AppStoreConnect_Runner_RetryAfterDelay_Seconds = number;

export type Api_AppStoreConnect_Runner_RetryAfterDelay_Date = number;

/**
 * API - App Store Connect - Retry Decision.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_RetryDecision_Response = Response | undefined;

export type Api_AppStoreConnect_Runner_RetryDecision_Attempt = number;

export type Api_AppStoreConnect_Runner_RetryDecision_Returns = Api_AppStoreConnect_Runner_RetryDecision_Decision | undefined;

export type Api_AppStoreConnect_Runner_RetryDecision_MaximumAttempts = number;

export type Api_AppStoreConnect_Runner_RetryDecision_MaximumDelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_RetryDecision_RetryAfterDelay = number | undefined;

export type Api_AppStoreConnect_Runner_RetryDecision_ExponentialDelay = number;

export type Api_AppStoreConnect_Runner_RetryDecision_JitterMultiplier = number;

export type Api_AppStoreConnect_Runner_RetryDecision_Decision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_RetryDecision_Decision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_RetryDecision_Decision_DelayMilliseconds;
};

/**
 * API - App Store Connect - Run Operation Batch.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_RunOperationBatch_Items<Item> = Item[];

export type Api_AppStoreConnect_Runner_RunOperationBatch_Operation<Item, Result> = (item: Item, index: number) => Promise<Result>;

export type Api_AppStoreConnect_Runner_RunOperationBatch_Results<Result> = Result[];

export type Api_AppStoreConnect_Runner_RunOperationBatch_Offset = number;

export type Api_AppStoreConnect_Runner_RunOperationBatch_Returns = Promise<void>;

export type Api_AppStoreConnect_Runner_RunOperationBatch_BatchItems<Item> = Item[];

export type Api_AppStoreConnect_Runner_RunOperationBatch_BatchPromises<Result> = Promise<Result>[];

export type Api_AppStoreConnect_Runner_RunOperationBatch_BatchResults<Result> = PromiseSettledResult<Result>[];

export type Api_AppStoreConnect_Runner_RunOperationBatch_RejectedResults = PromiseRejectedResult[];

export type Api_AppStoreConnect_Runner_RunOperationBatch_Errors = unknown[];

/**
 * API - App Store Connect - Run Operations.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_RunOperations_Items<Item> = Item[];

export type Api_AppStoreConnect_Runner_RunOperations_Operation<Item, Result> = (item: Item, index: number) => Promise<Result>;

export type Api_AppStoreConnect_Runner_RunOperations_Returns<Result> = Promise<Result[]>;

export type Api_AppStoreConnect_Runner_RunOperations_Results<Result> = Result[];

/**
 * API - App Store Connect - Update Localization.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_UpdateLocalization_LocalizationId = string;

export type Api_AppStoreConnect_Runner_UpdateLocalization_Attributes = Record<string, string>;

export type Api_AppStoreConnect_Runner_UpdateLocalization_Returns = Promise<void>;

/**
 * API - App Store Connect - Upload Asset Library Image.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AssetLibraryId = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Category = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReferenceName = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_FileName = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_File = Buffer;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Checksum = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_IdempotentReferenceName = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Query = URLSearchParams;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ExistingImages = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_PriorImageIds = Set<string>;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReusableImage = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReusableAttributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReusableState = unknown;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedImages = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedAttributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedState = unknown;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedImageIds = string[];

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Reservation = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReservationAttempt = number;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciliationImages = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciledImage = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciliationImageId = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciliationAttributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReservationRetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReservationRetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReservationRetryDecision_DelayMilliseconds;
} | undefined;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Resource = Shared_AppStoreConnectResource;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Attributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Operations = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ResourceId = string;

/**
 * API - App Store Connect - Upload Operation.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_UploadOperation_Operation = Shared_AppStoreConnectResource;

export type Api_AppStoreConnect_Runner_UploadOperation_File = Buffer;

export type Api_AppStoreConnect_Runner_UploadOperation_Returns = Promise<void>;

export type Api_AppStoreConnect_Runner_UploadOperation_Method = string;

export type Api_AppStoreConnect_Runner_UploadOperation_Url = string;

export type Api_AppStoreConnect_Runner_UploadOperation_Offset = number;

export type Api_AppStoreConnect_Runner_UploadOperation_Length = number;

export type Api_AppStoreConnect_Runner_UploadOperation_RequestHeaders = unknown[];

export type Api_AppStoreConnect_Runner_UploadOperation_Headers = Record<string, string>;

export type Api_AppStoreConnect_Runner_UploadOperation_Header = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_UploadOperation_Name = string;

/**
 * API - App Store Connect - Upload Operation Attempt.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Url = string;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Method = string;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Headers = Record<string, string>;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_File = Buffer;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Offset = number;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Length = number;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_RateLimitAttempt = number;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_TransientAttempt = number;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Returns = Promise<void>;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Response = Response | undefined;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_NetworkRetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_NetworkRetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_UploadOperationAttempt_NetworkRetryDecision_DelayMilliseconds;
} | undefined;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseText = string;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_RateLimitRetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_RateLimitRetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_UploadOperationAttempt_RateLimitRetryDecision_DelayMilliseconds;
} | undefined;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseRetryDecision_DelayMilliseconds = number;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseRetryDecision = {
  delayMilliseconds: Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseRetryDecision_DelayMilliseconds;
} | undefined;

/**
 * API - App Store Connect - Upload Screenshot.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_UploadScreenshot_ScreenshotSetId = string;

export type Api_AppStoreConnect_Runner_UploadScreenshot_FileName = string;

export type Api_AppStoreConnect_Runner_UploadScreenshot_File = Buffer;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Checksum = string;

export type Api_AppStoreConnect_Runner_UploadScreenshot_PriorScreenshots = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_UploadScreenshot_PriorScreenshotIds = Set<string>;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Resource = Shared_AppStoreConnectResource;

export type Api_AppStoreConnect_Runner_UploadScreenshot_ResourceId = string;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Attributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Operations = Shared_AppStoreConnectResource[];

/**
 * API - App Store Connect - Wait For API Pause.
 *
 * @since 0.39.0
 */
export type Api_AppStoreConnect_Runner_WaitForApiPause_Returns = Promise<void>;

export type Api_AppStoreConnect_Runner_WaitForApiPause_DelayMilliseconds = number;

/**
 * API - App Store Connect - Wait For Asset Library Image.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_ImageId = string;

export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_FileName = string;

export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Attempt = number;

export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Query = URLSearchParams;

export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Response = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Resource = Shared_AppStoreConnectResource;

export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Attributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_State = string;

export type Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_DelayMilliseconds = number;

/**
 * API - App Store Connect - Wait For Screenshot.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotSetId = string;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotId = string;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_FileName = string;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Returns = Promise<void>;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Waiter_FileName = string;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Waiter_Reject = (reason?: unknown) => void;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Waiter_Resolve = () => void;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Waiter = {
  fileName: Api_AppStoreConnect_Runner_WaitForScreenshot_Waiter_FileName;
  reject: Api_AppStoreConnect_Runner_WaitForScreenshot_Waiter_Reject;
  resolve: Api_AppStoreConnect_Runner_WaitForScreenshot_Waiter_Resolve;
};

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Waiters = Map<string, Api_AppStoreConnect_Runner_WaitForScreenshot_Waiter> | undefined;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_ProcessingPromise = Promise<void>;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_ExistingPoll = Promise<void> | undefined;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Poll = Promise<void>;

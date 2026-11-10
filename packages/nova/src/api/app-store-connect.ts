import {
  createHash,
  createPrivateKey,
  sign,
} from 'node:crypto';

import {
  requireArray,
  requireNonNegativeInteger,
  requireObject,
  requireString,
  wait,
} from '../lib/integration.js';
import { Logger } from '../toolkit/index.js';

import type {
  Api_AppStoreConnect_Runner_AcquireApiOperation_PromiseValue,
  Api_AppStoreConnect_Runner_AcquireApiOperation_Returns,
  Api_AppStoreConnect_Runner_ActiveApiOperations,
  Api_AppStoreConnect_Runner_ApiOperationQueue,
  Api_AppStoreConnect_Runner_ApiOperationsPausedUntil,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_DelayMilliseconds,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Header,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Limit,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Name,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Parts,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Remaining,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_RemainingRatio,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Response,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Returns,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_SeparatorIndex,
  Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Value,
  Api_AppStoreConnect_Runner_CleanupScreenshotReservation_FileName,
  Api_AppStoreConnect_Runner_CleanupScreenshotReservation_Returns,
  Api_AppStoreConnect_Runner_CleanupScreenshotReservation_ScreenshotId,
  Api_AppStoreConnect_Runner_Constructor_Credentials,
  Api_AppStoreConnect_Runner_CreateLocalization_Attempt,
  Api_AppStoreConnect_Runner_CreateLocalization_Attributes,
  Api_AppStoreConnect_Runner_CreateLocalization_Locale,
  Api_AppStoreConnect_Runner_CreateLocalization_Localizations,
  Api_AppStoreConnect_Runner_CreateLocalization_MatchingAttributes,
  Api_AppStoreConnect_Runner_CreateLocalization_MatchingLocalization,
  Api_AppStoreConnect_Runner_CreateLocalization_Response,
  Api_AppStoreConnect_Runner_CreateLocalization_RetryDecision,
  Api_AppStoreConnect_Runner_CreateLocalization_Returns,
  Api_AppStoreConnect_Runner_CreateLocalization_VersionId,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_Attempt,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_DisplayType,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_LocalizationId,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_MatchingAttributes,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_MatchingSet,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_Response,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_RetryDecision,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_Returns,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_Sets,
  Api_AppStoreConnect_Runner_DeleteResource_Id,
  Api_AppStoreConnect_Runner_DeleteResource_ResourceType,
  Api_AppStoreConnect_Runner_DeleteResource_Returns,
  Api_AppStoreConnect_Runner_FetchWithLimit_Headers,
  Api_AppStoreConnect_Runner_FetchWithLimit_Options,
  Api_AppStoreConnect_Runner_FetchWithLimit_RequestInit,
  Api_AppStoreConnect_Runner_FetchWithLimit_Response,
  Api_AppStoreConnect_Runner_FetchWithLimit_RetryDecision,
  Api_AppStoreConnect_Runner_FetchWithLimit_Returns,
  Api_AppStoreConnect_Runner_FetchWithLimit_Url,
  Api_AppStoreConnect_Runner_FindApp_App,
  Api_AppStoreConnect_Runner_FindApp_Apps,
  Api_AppStoreConnect_Runner_FindApp_BundleIdentifier,
  Api_AppStoreConnect_Runner_FindApp_Query,
  Api_AppStoreConnect_Runner_FindApp_Returns,
  Api_AppStoreConnect_Runner_FindAssetLibrary_AppId,
  Api_AppStoreConnect_Runner_FindAssetLibrary_Response,
  Api_AppStoreConnect_Runner_FindAssetLibrary_Returns,
  Api_AppStoreConnect_Runner_FindVersion_AppId,
  Api_AppStoreConnect_Runner_FindVersion_Attributes,
  Api_AppStoreConnect_Runner_FindVersion_Platform,
  Api_AppStoreConnect_Runner_FindVersion_Query,
  Api_AppStoreConnect_Runner_FindVersion_ResolvedVersion,
  Api_AppStoreConnect_Runner_FindVersion_Returns,
  Api_AppStoreConnect_Runner_FindVersion_State,
  Api_AppStoreConnect_Runner_FindVersion_Version,
  Api_AppStoreConnect_Runner_FindVersion_Versions,
  Api_AppStoreConnect_Runner_GetToken_EncodedHeader,
  Api_AppStoreConnect_Runner_GetToken_EncodedPayload,
  Api_AppStoreConnect_Runner_GetToken_ExpiresAt,
  Api_AppStoreConnect_Runner_GetToken_Header,
  Api_AppStoreConnect_Runner_GetToken_IssuedAt,
  Api_AppStoreConnect_Runner_GetToken_Now,
  Api_AppStoreConnect_Runner_GetToken_Payload,
  Api_AppStoreConnect_Runner_GetToken_Returns,
  Api_AppStoreConnect_Runner_GetToken_Signature,
  Api_AppStoreConnect_Runner_GetToken_SigningInput,
  Api_AppStoreConnect_Runner_IsAmbiguousCreateError_Error,
  Api_AppStoreConnect_Runner_IsAmbiguousCreateError_TypeGuard,
  Api_AppStoreConnect_Runner_IssuerId,
  Api_AppStoreConnect_Runner_KeyId,
  Api_AppStoreConnect_Runner_List_Path,
  Api_AppStoreConnect_Runner_List_Resources,
  Api_AppStoreConnect_Runner_List_Returns,
  Api_AppStoreConnect_Runner_ListLocalizations_Query,
  Api_AppStoreConnect_Runner_ListLocalizations_Returns,
  Api_AppStoreConnect_Runner_ListLocalizations_VersionId,
  Api_AppStoreConnect_Runner_ListPage_Data,
  Api_AppStoreConnect_Runner_ListPage_Links,
  Api_AppStoreConnect_Runner_ListPage_Next,
  Api_AppStoreConnect_Runner_ListPage_Path,
  Api_AppStoreConnect_Runner_ListPage_Resources,
  Api_AppStoreConnect_Runner_ListPage_Response,
  Api_AppStoreConnect_Runner_ListPage_Returns,
  Api_AppStoreConnect_Runner_ListScreenshots_Query,
  Api_AppStoreConnect_Runner_ListScreenshots_Returns,
  Api_AppStoreConnect_Runner_ListScreenshots_ScreenshotSetId,
  Api_AppStoreConnect_Runner_ListScreenshotSets_LocalizationId,
  Api_AppStoreConnect_Runner_ListScreenshotSets_Query,
  Api_AppStoreConnect_Runner_ListScreenshotSets_Returns,
  Api_AppStoreConnect_Runner_PauseApiOperations_DelayMilliseconds,
  Api_AppStoreConnect_Runner_PauseApiOperations_PausedUntil,
  Api_AppStoreConnect_Runner_PauseApiOperations_Returns,
  Api_AppStoreConnect_Runner_PollScreenshotSet_Attempt,
  Api_AppStoreConnect_Runner_PollScreenshotSet_Attributes,
  Api_AppStoreConnect_Runner_PollScreenshotSet_DelayMilliseconds,
  Api_AppStoreConnect_Runner_PollScreenshotSet_Errors,
  Api_AppStoreConnect_Runner_PollScreenshotSet_PollingWaiter,
  Api_AppStoreConnect_Runner_PollScreenshotSet_ProcessingWaiter,
  Api_AppStoreConnect_Runner_PollScreenshotSet_Resource,
  Api_AppStoreConnect_Runner_PollScreenshotSet_Resources,
  Api_AppStoreConnect_Runner_PollScreenshotSet_Returns,
  Api_AppStoreConnect_Runner_PollScreenshotSet_ScreenshotId,
  Api_AppStoreConnect_Runner_PollScreenshotSet_ScreenshotSetId,
  Api_AppStoreConnect_Runner_PollScreenshotSet_State,
  Api_AppStoreConnect_Runner_PollScreenshotSet_TimedOutWaiter,
  Api_AppStoreConnect_Runner_PollScreenshotSet_Waiters,
  Api_AppStoreConnect_Runner_PrivateKey,
  Api_AppStoreConnect_Runner_ReleaseApiOperation_Resume,
  Api_AppStoreConnect_Runner_ReleaseApiOperation_Returns,
  Api_AppStoreConnect_Runner_ReorderScreenshots_Returns,
  Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotIds,
  Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotSetId,
  Api_AppStoreConnect_Runner_Request_Options,
  Api_AppStoreConnect_Runner_Request_Path,
  Api_AppStoreConnect_Runner_Request_Returns,
  Api_AppStoreConnect_Runner_RequestError_AmbiguousCreate,
  Api_AppStoreConnect_Runner_RequestError_Cause,
  Api_AppStoreConnect_Runner_RequestError_Error,
  Api_AppStoreConnect_Runner_RequestError_Message,
  Api_AppStoreConnect_Runner_RequestError_Returns,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Body,
  Api_AppStoreConnect_Runner_RequestWithAttempt_ErrorBodyRetryDecision,
  Api_AppStoreConnect_Runner_RequestWithAttempt_ExpectedStatuses,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Method,
  Api_AppStoreConnect_Runner_RequestWithAttempt_NetworkRetryDecision,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Options,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Path,
  Api_AppStoreConnect_Runner_RequestWithAttempt_RateLimitAttempt,
  Api_AppStoreConnect_Runner_RequestWithAttempt_RateLimitRetryDecision,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Response,
  Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseBodyRetryDecision,
  Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseData,
  Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseRetryDecision,
  Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseText,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Returns,
  Api_AppStoreConnect_Runner_RequestWithAttempt_SerializedBody,
  Api_AppStoreConnect_Runner_RequestWithAttempt_TransientAttempt,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Url,
  Api_AppStoreConnect_Runner_ReserveScreenshot_Attempt,
  Api_AppStoreConnect_Runner_ReserveScreenshot_Attributes,
  Api_AppStoreConnect_Runner_ReserveScreenshot_File,
  Api_AppStoreConnect_Runner_ReserveScreenshot_FileName,
  Api_AppStoreConnect_Runner_ReserveScreenshot_OrphanIds,
  Api_AppStoreConnect_Runner_ReserveScreenshot_PriorScreenshotIds,
  Api_AppStoreConnect_Runner_ReserveScreenshot_Reservation,
  Api_AppStoreConnect_Runner_ReserveScreenshot_ResourceId,
  Api_AppStoreConnect_Runner_ReserveScreenshot_Resources,
  Api_AppStoreConnect_Runner_ReserveScreenshot_RetryDecision,
  Api_AppStoreConnect_Runner_ReserveScreenshot_Returns,
  Api_AppStoreConnect_Runner_ReserveScreenshot_ScreenshotSetId,
  Api_AppStoreConnect_Runner_ReserveScreenshot_State,
  Api_AppStoreConnect_Runner_RetryAfterDelay_Date,
  Api_AppStoreConnect_Runner_RetryAfterDelay_Response,
  Api_AppStoreConnect_Runner_RetryAfterDelay_Returns,
  Api_AppStoreConnect_Runner_RetryAfterDelay_Seconds,
  Api_AppStoreConnect_Runner_RetryAfterDelay_Value,
  Api_AppStoreConnect_Runner_RetryDecision_Attempt,
  Api_AppStoreConnect_Runner_RetryDecision_ExponentialDelay,
  Api_AppStoreConnect_Runner_RetryDecision_JitterMultiplier,
  Api_AppStoreConnect_Runner_RetryDecision_MaximumAttempts,
  Api_AppStoreConnect_Runner_RetryDecision_MaximumDelayMilliseconds,
  Api_AppStoreConnect_Runner_RetryDecision_Response,
  Api_AppStoreConnect_Runner_RetryDecision_RetryAfterDelay,
  Api_AppStoreConnect_Runner_RetryDecision_Returns,
  Api_AppStoreConnect_Runner_RunOperationBatch_BatchItems,
  Api_AppStoreConnect_Runner_RunOperationBatch_BatchPromises,
  Api_AppStoreConnect_Runner_RunOperationBatch_BatchResults,
  Api_AppStoreConnect_Runner_RunOperationBatch_Errors,
  Api_AppStoreConnect_Runner_RunOperationBatch_Items,
  Api_AppStoreConnect_Runner_RunOperationBatch_Offset,
  Api_AppStoreConnect_Runner_RunOperationBatch_Operation,
  Api_AppStoreConnect_Runner_RunOperationBatch_RejectedResults,
  Api_AppStoreConnect_Runner_RunOperationBatch_Results,
  Api_AppStoreConnect_Runner_RunOperationBatch_Returns,
  Api_AppStoreConnect_Runner_RunOperations_Items,
  Api_AppStoreConnect_Runner_RunOperations_Operation,
  Api_AppStoreConnect_Runner_RunOperations_Results,
  Api_AppStoreConnect_Runner_RunOperations_Returns,
  Api_AppStoreConnect_Runner_ScreenshotProcessingPolls,
  Api_AppStoreConnect_Runner_ScreenshotProcessingWaiters,
  Api_AppStoreConnect_Runner_Token,
  Api_AppStoreConnect_Runner_TokenExpiresAt,
  Api_AppStoreConnect_Runner_UpdateLocalization_Attributes,
  Api_AppStoreConnect_Runner_UpdateLocalization_LocalizationId,
  Api_AppStoreConnect_Runner_UpdateLocalization_Returns,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedAttributes,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedImageIds,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedImages,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedState,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AssetLibraryId,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Attributes,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Category,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Checksum,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ExistingImages,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_File,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_FileName,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_IdempotentReferenceName,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Operations,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_PriorImageIds,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Query,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciledImage,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciliationAttributes,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciliationImageId,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciliationImages,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReferenceName,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Reservation,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReservationAttempt,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReservationRetryDecision,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Resource,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ResourceId,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Returns,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReusableAttributes,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReusableImage,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReusableState,
  Api_AppStoreConnect_Runner_UploadOperation_File,
  Api_AppStoreConnect_Runner_UploadOperation_Header,
  Api_AppStoreConnect_Runner_UploadOperation_Headers,
  Api_AppStoreConnect_Runner_UploadOperation_Length,
  Api_AppStoreConnect_Runner_UploadOperation_Method,
  Api_AppStoreConnect_Runner_UploadOperation_Name,
  Api_AppStoreConnect_Runner_UploadOperation_Offset,
  Api_AppStoreConnect_Runner_UploadOperation_Operation,
  Api_AppStoreConnect_Runner_UploadOperation_RequestHeaders,
  Api_AppStoreConnect_Runner_UploadOperation_Returns,
  Api_AppStoreConnect_Runner_UploadOperation_Url,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_File,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Headers,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Length,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Method,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_NetworkRetryDecision,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Offset,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_RateLimitAttempt,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_RateLimitRetryDecision,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Response,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseRetryDecision,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseText,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Returns,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_TransientAttempt,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Url,
  Api_AppStoreConnect_Runner_UploadScreenshot_Attributes,
  Api_AppStoreConnect_Runner_UploadScreenshot_Checksum,
  Api_AppStoreConnect_Runner_UploadScreenshot_File,
  Api_AppStoreConnect_Runner_UploadScreenshot_FileName,
  Api_AppStoreConnect_Runner_UploadScreenshot_Operations,
  Api_AppStoreConnect_Runner_UploadScreenshot_PriorScreenshotIds,
  Api_AppStoreConnect_Runner_UploadScreenshot_PriorScreenshots,
  Api_AppStoreConnect_Runner_UploadScreenshot_Resource,
  Api_AppStoreConnect_Runner_UploadScreenshot_ResourceId,
  Api_AppStoreConnect_Runner_UploadScreenshot_Returns,
  Api_AppStoreConnect_Runner_UploadScreenshot_ScreenshotSetId,
  Api_AppStoreConnect_Runner_WaitForApiPause_DelayMilliseconds,
  Api_AppStoreConnect_Runner_WaitForApiPause_Returns,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Attempt,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Attributes,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_DelayMilliseconds,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_FileName,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_ImageId,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Query,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Resource,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Response,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Returns,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_State,
  Api_AppStoreConnect_Runner_WaitForScreenshot_ExistingPoll,
  Api_AppStoreConnect_Runner_WaitForScreenshot_FileName,
  Api_AppStoreConnect_Runner_WaitForScreenshot_Poll,
  Api_AppStoreConnect_Runner_WaitForScreenshot_ProcessingPromise,
  Api_AppStoreConnect_Runner_WaitForScreenshot_Returns,
  Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotId,
  Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotSetId,
  Api_AppStoreConnect_Runner_WaitForScreenshot_Waiters,
} from '../types/api/app-store-connect.d.ts';

/**
 * API - App Store Connect - API Base URL.
 *
 * Keeps every JSON API request pinned to Apple's documented production
 * service without leaking endpoint details into individual commands.
 *
 * @since 0.34.0
 */
const apiBaseUrl = 'https://api.appstoreconnect.apple.com';

/**
 * API - App Store Connect - API Request Timeout Milliseconds.
 *
 * Bounds ordinary metadata requests so network failures surface instead of
 * leaving an integration command suspended indefinitely.
 *
 * @since 0.34.0
 */
const apiRequestTimeoutMilliseconds = 60 * 1000;

/**
 * API - App Store Connect - Asset Upload Timeout Milliseconds.
 *
 * Gives large image byte ranges more time than metadata while retaining a
 * finite failure boundary for interrupted uploads.
 *
 * @since 0.34.0
 */
const assetUploadTimeoutMilliseconds = 5 * 60 * 1000;

/**
 * API - App Store Connect - Initial Retry Delay Milliseconds.
 *
 * Establishes the first exponential-backoff window before jitter is applied so
 * transient retries remain responsive without immediately repeating a request.
 *
 * @since 0.39.0
 */
const initialRetryDelayMilliseconds = 1000;

/**
 * API - App Store Connect - Maximum Concurrent API Operations.
 *
 * Caps every JSON request and upload byte-range operation on one client so
 * nested target and file batches cannot exceed Apple's practical rate limit.
 *
 * @since 0.39.0
 */
const maximumConcurrentApiOperations = 3;

/**
 * API - App Store Connect - Maximum Processing Attempts.
 *
 * Caps asynchronous image-processing polls before Nova reports an actionable
 * timeout rather than waiting without an upper bound.
 *
 * @since 0.34.0
 */
const maximumProcessingAttempts = 300;

/**
 * API - App Store Connect - Maximum Rate Limit Attempts.
 *
 * Gives Apple rate-limit responses a larger retry budget than ordinary
 * transient failures because long upload batches commonly encounter bursts.
 *
 * @since 0.39.0
 */
const maximumRateLimitAttempts = 10;

/**
 * API - App Store Connect - Maximum Rate Limit Delay Milliseconds.
 *
 * Allows fallback rate-limit backoff to approach ten minutes across the retry
 * budget while explicit retry-after values remain authoritative.
 *
 * @since 0.39.0
 */
const maximumRateLimitDelayMilliseconds = 10 * 60 * 1000;

/**
 * API - App Store Connect - Maximum Transient Attempts.
 *
 * Keeps server and network retry budgets finite because those failures are less
 * likely than rate limits to recover after many repeated attempts.
 *
 * @since 0.39.0
 */
const maximumTransientAttempts = 5;

/**
 * API - App Store Connect - Maximum Transient Delay Milliseconds.
 *
 * Caps fallback backoff for server and network failures without overriding a
 * valid retry-after response supplied by Apple.
 *
 * @since 0.39.0
 */
const maximumTransientDelayMilliseconds = 15 * 1000;

/**
 * API - App Store Connect - Processing Poll Maximum Delay Milliseconds.
 *
 * Caps the shared screenshot-set and asset-image polling backoff so completed
 * uploads are observed promptly without issuing one request per image.
 *
 * @since 0.39.0
 */
const processingPollMaximumDelayMilliseconds = 15 * 1000;

/**
 * API - App Store Connect - Processing Poll Initial Delay Milliseconds.
 *
 * Gives Apple two seconds to begin processing before a set-level poll, then
 * supplies the base for the required exponential polling schedule.
 *
 * @since 0.39.0
 */
const processingPollInitialDelayMilliseconds = 2 * 1000;

/**
 * API - App Store Connect - Rate Limit Critical Delay Milliseconds.
 *
 * Applies a minute-long client-wide pause when Apple's remaining hourly budget
 * is at or below one percent or ten requests, whichever boundary comes first.
 *
 * @since 0.39.0
 */
const rateLimitCriticalDelayMilliseconds = 60 * 1000;

/**
 * API - App Store Connect - Rate Limit Low Delay Milliseconds.
 *
 * Spaces requests when Apple's remaining hourly budget falls below five
 * percent, reducing the chance that a large batch exhausts the shared budget.
 *
 * @since 0.39.0
 */
const rateLimitLowDelayMilliseconds = 1000;

/**
 * API - App Store Connect - Editable App Store States.
 *
 * Restricts mutations to version states Apple permits developers to edit,
 * preventing released or review-locked records from being targeted.
 *
 * @since 0.34.0
 */
const editableAppStoreStates = new Set([
  'DEVELOPER_REJECTED',
  'INVALID_BINARY',
  'METADATA_REJECTED',
  'PREPARE_FOR_SUBMISSION',
  'REJECTED',
]);
/**
 * API - App Store Connect - Ready Asset States.
 *
 * Identifies asset-library states that are sufficiently processed for a
 * placement to reference the uploaded image safely.
 *
 * @since 0.34.0
 */
const readyAssetStates = new Set([
  'ACCEPTED',
  'APPROVED',
  'IN_REVIEW',
  'PREPARE_FOR_SUBMISSION',
  'READY_FOR_REVIEW',
  'WAITING_FOR_REVIEW',
]);
/**
 * API - App Store Connect - Failed Asset Cleanup States.
 *
 * Limits reservation cleanup to explicit processing failures. Archived or
 * unknown states remain untouched because the image may still be intentional.
 *
 * @since 0.39.0
 */
const failedAssetCleanupStates = new Set([
  'FAILED',
  'REJECTED',
]);
/**
 * API - App Store Connect - Failed Asset States.
 *
 * Identifies terminal processing failures so Nova can stop polling and return
 * Apple's state details to the developer promptly.
 *
 * @since 0.34.0
 */
const failedAssetStates = new Set([
  'ARCHIVED',
  'FAILED',
  'REJECTED',
]);

/**
 * API - App Store Connect.
 *
 * Authenticates with an official App Store Connect API private key and exposes
 * the JSON:API primitives shared by Nova's Apple store integrations.
 *
 * @since 0.34.0
 */
export class Runner {
  /**
   * API - App Store Connect - Active API Operations.
   *
   * Tracks in-flight fetch calls for this client so every command shares one
   * concurrency boundary across metadata, uploads, and replacement cleanup.
   *
   * @private
   *
   * @since 0.39.0
   */
  #activeApiOperations: Api_AppStoreConnect_Runner_ActiveApiOperations = 0;

  /**
   * API - App Store Connect - API Operation Queue.
   *
   * Holds blocked fetch resumptions in arrival order while the configured
   * concurrency boundary is full.
   *
   * @private
   *
   * @since 0.39.0
   */
  readonly #apiOperationQueue: Api_AppStoreConnect_Runner_ApiOperationQueue = [];

  /**
   * API - App Store Connect - API Operations Paused Until.
   *
   * Holds one limiter-wide not-before timestamp for vendor rate limits and
   * proactive low-budget throttling across JSON and upload requests.
   *
   * @private
   *
   * @since 0.39.0
   */
  #apiOperationsPausedUntil: Api_AppStoreConnect_Runner_ApiOperationsPausedUntil = 0;

  /**
   * API - App Store Connect - Issuer ID.
   *
   * Identifies a team API key. Individual API keys omit the issuer and use the
   * user subject expected by Apple's token contract.
   *
   * @private
   *
   * @since 0.34.0
   */
  readonly #issuerId: Api_AppStoreConnect_Runner_IssuerId;

  /**
   * API - App Store Connect - Key ID.
   *
   * Identifies the discovered private key in every short-lived JSON web token
   * sent to App Store Connect.
   *
   * @private
   *
   * @since 0.34.0
   */
  readonly #keyId: Api_AppStoreConnect_Runner_KeyId;

  /**
   * API - App Store Connect - Private Key.
   *
   * Holds the parsed P-256 key used to sign short-lived tokens without exposing
   * its original file contents to logs or Nova configuration.
   *
   * @private
   *
   * @since 0.34.0
   */
  readonly #privateKey: Api_AppStoreConnect_Runner_PrivateKey;

  /**
   * API - App Store Connect - Screenshot Processing Polls.
   *
   * Tracks the single active polling loop for each screenshot set so concurrent
   * uploads share one list request at every backoff interval.
   *
   * @private
   *
   * @since 0.39.0
   */
  readonly #screenshotProcessingPolls: Api_AppStoreConnect_Runner_ScreenshotProcessingPolls = new Map();

  /**
   * API - App Store Connect - Screenshot Processing Waiters.
   *
   * Groups uploaded screenshot promises by set and resource identifier so one
   * set-level poll can resolve or reject every completed reservation.
   *
   * @private
   *
   * @since 0.39.0
   */
  readonly #screenshotProcessingWaiters: Api_AppStoreConnect_Runner_ScreenshotProcessingWaiters = new Map();

  /**
   * API - App Store Connect - Token.
   *
   * Caches the current short-lived token so a batch upload does not sign a new
   * token for every request.
   *
   * @private
   *
   * @since 0.34.0
   */
  #token: Api_AppStoreConnect_Runner_Token;

  /**
   * API - App Store Connect - Token Expires At.
   *
   * Records the current token expiration time and forces renewal before the
   * remaining lifetime becomes too short for another request.
   *
   * @private
   *
   * @since 0.34.0
   */
  #tokenExpiresAt: Api_AppStoreConnect_Runner_TokenExpiresAt = 0;

  /**
   * API - App Store Connect - Constructor.
   *
   * Parses the discovered private key once and retains only the material needed
   * for authenticated requests during the current command.
   *
   * @param {Api_AppStoreConnect_Runner_Constructor_Credentials} credentials - Credentials.
   *
   * @since 0.34.0
   */
  public constructor(credentials: Api_AppStoreConnect_Runner_Constructor_Credentials) {
    this.#issuerId = credentials['issuerId'];
    this.#keyId = credentials['keyId'];
    this.#privateKey = createPrivateKey(credentials['privateKey']);

    return;
  }

  /**
   * API - App Store Connect - Request.
   *
   * Sends an authenticated JSON request with bounded retries for transient
   * network, rate-limit, and server failures.
   *
   * @param {Api_AppStoreConnect_Runner_Request_Path}    path    - Path.
   * @param {Api_AppStoreConnect_Runner_Request_Options} options - Options.
   *
   * @returns {Api_AppStoreConnect_Runner_Request_Returns}
   *
   * @since 0.39.0
   */
  public async request(path: Api_AppStoreConnect_Runner_Request_Path, options: Api_AppStoreConnect_Runner_Request_Options = {}): Api_AppStoreConnect_Runner_Request_Returns {
    return this.requestWithAttempt(path, options, 0, 0);
  }

  /**
   * API - App Store Connect - Is Ambiguous Create Error.
   *
   * Identifies POST failures that may have reached Apple so resource-specific
   * callers can reconcile vendor state before deciding whether to retry.
   *
   * @param {Api_AppStoreConnect_Runner_IsAmbiguousCreateError_Error} error - Error.
   *
   * @returns {Api_AppStoreConnect_Runner_IsAmbiguousCreateError_TypeGuard}
   *
   * @since 0.39.0
   */
  public static isAmbiguousCreateError(error: Api_AppStoreConnect_Runner_IsAmbiguousCreateError_Error): error is Api_AppStoreConnect_Runner_IsAmbiguousCreateError_TypeGuard {
    return (
      typeof error === 'object'
      && error !== null
      && 'appStoreConnectAmbiguousCreate' in error
      && error['appStoreConnectAmbiguousCreate'] === true
    );
  }

  /**
   * API - App Store Connect - Run Operations.
   *
   * Starts a bounded batch at a time and waits for every member to settle so a
   * rejected operation never leaves sibling mutations running in the background.
   *
   * @param {Api_AppStoreConnect_Runner_RunOperations_Items<Item>}             items     - Items.
   * @param {Api_AppStoreConnect_Runner_RunOperations_Operation<Item, Result>} operation - Operation.
   *
   * @returns {Api_AppStoreConnect_Runner_RunOperations_Returns<Result>}
   *
   * @since 0.39.0
   */
  public static async runOperations<Item, Result>(items: Api_AppStoreConnect_Runner_RunOperations_Items<Item>, operation: Api_AppStoreConnect_Runner_RunOperations_Operation<Item, Result>): Api_AppStoreConnect_Runner_RunOperations_Returns<Result> {
    const results: Api_AppStoreConnect_Runner_RunOperations_Results<Result> = [];

    await Runner.runOperationBatch(items, operation, results, 0);

    return results;
  }

  /**
   * API - App Store Connect - Request With Attempt.
   *
   * Sends one authenticated request and applies the shared rate-limit, server,
   * and network retry policy before recursively starting another attempt.
   *
   * @param {Api_AppStoreConnect_Runner_RequestWithAttempt_Path}             path             - Path.
   * @param {Api_AppStoreConnect_Runner_RequestWithAttempt_Options}          options          - Options.
   * @param {Api_AppStoreConnect_Runner_RequestWithAttempt_RateLimitAttempt} rateLimitAttempt - Rate limit attempt.
   * @param {Api_AppStoreConnect_Runner_RequestWithAttempt_TransientAttempt} transientAttempt - Transient attempt.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_RequestWithAttempt_Returns}
   *
   * @since 0.39.0
   */
  private async requestWithAttempt(path: Api_AppStoreConnect_Runner_RequestWithAttempt_Path, options: Api_AppStoreConnect_Runner_RequestWithAttempt_Options, rateLimitAttempt: Api_AppStoreConnect_Runner_RequestWithAttempt_RateLimitAttempt, transientAttempt: Api_AppStoreConnect_Runner_RequestWithAttempt_TransientAttempt): Api_AppStoreConnect_Runner_RequestWithAttempt_Returns {
    const method: Api_AppStoreConnect_Runner_RequestWithAttempt_Method = options['method'] ?? 'GET';
    const body: Api_AppStoreConnect_Runner_RequestWithAttempt_Body = options['body'];
    const url: Api_AppStoreConnect_Runner_RequestWithAttempt_Url = (path.startsWith('https://') === true) ? path : `${apiBaseUrl}${path}`;
    let response: Api_AppStoreConnect_Runner_RequestWithAttempt_Response = undefined;
    const serializedBody: Api_AppStoreConnect_Runner_RequestWithAttempt_SerializedBody = (body === undefined) ? undefined : JSON.stringify(body);

    try {
      response = await this.fetchWithLimit(url, {
        authenticated: true,
        body: serializedBody,
        method,
        rateLimitAttempt: rateLimitAttempt + 1,
        timeoutMilliseconds: apiRequestTimeoutMilliseconds,
      });
    } catch (error) {
      if (method === 'POST' && options['idempotent'] !== true) {
        throw Runner.requestError(`${method} ${url} failed after it may have reached App Store Connect.`, true, error);
      }

      const networkRetryDecision: Api_AppStoreConnect_Runner_RequestWithAttempt_NetworkRetryDecision = Runner.retryDecision(undefined, transientAttempt + 1, maximumTransientAttempts, maximumTransientDelayMilliseconds);

      if (networkRetryDecision === undefined) {
        throw new Error(`${method} ${url} failed.`, { cause: error });
      }

      await wait(networkRetryDecision['delayMilliseconds']);

      return this.requestWithAttempt(path, options, rateLimitAttempt, transientAttempt + 1);
    }

    const expectedStatuses: Api_AppStoreConnect_Runner_RequestWithAttempt_ExpectedStatuses = options['expectedStatuses'] ?? [200];

    if (expectedStatuses.includes(response.status) === true) {
      if (response.status === 204) {
        return undefined;
      }

      let responseData: Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseData = undefined;

      try {
        responseData = await response.json();
      } catch (error) {
        if (method === 'POST' && options['idempotent'] !== true) {
          throw Runner.requestError(`${method} ${url} returned HTTP ${response.status}, but its response body failed after the create may have reached App Store Connect.`, true, error);
        }

        const responseBodyRetryDecision: Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseBodyRetryDecision = Runner.retryDecision(undefined, transientAttempt + 1, maximumTransientAttempts, maximumTransientDelayMilliseconds);

        if (responseBodyRetryDecision === undefined) {
          throw new Error(`${method} ${url} returned HTTP ${response.status}, but its response body could not be read.`, { cause: error });
        }

        await wait(responseBodyRetryDecision['delayMilliseconds']);

        return this.requestWithAttempt(path, options, rateLimitAttempt, transientAttempt + 1);
      }

      return requireObject(responseData, `Response from ${method} ${url}`);
    }

    if (
      method === 'DELETE'
      && response.status === 404
      && (
        rateLimitAttempt > 0
        || transientAttempt > 0
      )
    ) {
      return undefined;
    }

    let responseText: Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseText = '';

    try {
      responseText = await response.text();
    } catch (error) {
      if (method === 'POST' && options['idempotent'] !== true) {
        throw Runner.requestError(`${method} ${url} returned HTTP ${response.status}, but its response body failed after the create may have reached App Store Connect.`, true, error);
      }

      const errorBodyRetryDecision: Api_AppStoreConnect_Runner_RequestWithAttempt_ErrorBodyRetryDecision = Runner.retryDecision(undefined, transientAttempt + 1, maximumTransientAttempts, maximumTransientDelayMilliseconds);

      if (errorBodyRetryDecision === undefined) {
        throw new Error(`${method} ${url} returned HTTP ${response.status}, but its response body could not be read.`, { cause: error });
      }

      await wait(errorBodyRetryDecision['delayMilliseconds']);

      return this.requestWithAttempt(path, options, rateLimitAttempt, transientAttempt + 1);
    }

    if (response.status === 429) {
      const rateLimitRetryDecision: Api_AppStoreConnect_Runner_RequestWithAttempt_RateLimitRetryDecision = Runner.retryDecision(response, rateLimitAttempt + 1, maximumRateLimitAttempts, maximumRateLimitDelayMilliseconds);

      if (rateLimitRetryDecision === undefined) {
        throw new Error(`${method} ${url} failed with HTTP ${response.status}: ${responseText}. The run is safe to resume after App Store Connect's rate limit resets.`);
      }

      return this.requestWithAttempt(path, options, rateLimitAttempt + 1, transientAttempt);
    }

    if (
      method === 'POST'
      && options['idempotent'] !== true
      && response.status >= 500
    ) {
      throw Runner.requestError(`${method} ${url} failed with HTTP ${response.status}: ${responseText}`, true);
    }

    const responseRetryDecision: Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseRetryDecision = Runner.retryDecision(response, transientAttempt + 1, maximumTransientAttempts, maximumTransientDelayMilliseconds);

    if (responseRetryDecision === undefined) {
      throw new Error(`${method} ${url} failed with HTTP ${response.status}: ${responseText}`);
    }

    await wait(responseRetryDecision['delayMilliseconds']);

    return this.requestWithAttempt(path, options, rateLimitAttempt, transientAttempt + 1);
  }

  /**
   * API - App Store Connect - List.
   *
   * Follows Apple's pagination links and returns one complete resource list so
   * command planners do not accidentally operate on a partial collection.
   *
   * @param {Api_AppStoreConnect_Runner_List_Path} path - Path.
   *
   * @returns {Api_AppStoreConnect_Runner_List_Returns}
   *
   * @since 0.34.0
   */
  public async list(path: Api_AppStoreConnect_Runner_List_Path): Api_AppStoreConnect_Runner_List_Returns {
    const resources: Api_AppStoreConnect_Runner_List_Resources = [];

    return this.listPage(path, resources);
  }

  /**
   * API - App Store Connect - List Page.
   *
   * Accumulates one collection page at a time and follows Apple's next link
   * until the complete resource list has been assembled.
   *
   * @param {Api_AppStoreConnect_Runner_ListPage_Path}      path      - Path.
   * @param {Api_AppStoreConnect_Runner_ListPage_Resources} resources - Resources.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_ListPage_Returns}
   *
   * @since 0.34.0
   */
  private async listPage(path: Api_AppStoreConnect_Runner_ListPage_Path, resources: Api_AppStoreConnect_Runner_ListPage_Resources): Api_AppStoreConnect_Runner_ListPage_Returns {
    const response: Api_AppStoreConnect_Runner_ListPage_Response = await this.request(path);

    if (response === undefined) {
      throw new Error(`Collection response from ${path} was empty.`);
    }

    const data: Api_AppStoreConnect_Runner_ListPage_Data = requireArray(response['data'], `Collection response from ${path}`).map((item) => requireObject(item, `Resource from ${path}`));
    const links: Api_AppStoreConnect_Runner_ListPage_Links = (response['links'] === undefined) ? {} : requireObject(response['links'], `Links from ${path}`);
    const next: Api_AppStoreConnect_Runner_ListPage_Next = (typeof links['next'] === 'string' && links['next'] !== '') ? links['next'] : undefined;

    resources.push(...data);

    if (next === undefined) {
      return resources;
    }

    return this.listPage(next, resources);
  }

  /**
   * API - App Store Connect - Find App.
   *
   * Resolves one App Store Connect application by its exact bundle identifier
   * before any version or localized content is changed.
   *
   * @param {Api_AppStoreConnect_Runner_FindApp_BundleIdentifier} bundleIdentifier - Bundle identifier.
   *
   * @returns {Api_AppStoreConnect_Runner_FindApp_Returns}
   *
   * @since 0.34.0
   */
  public async findApp(bundleIdentifier: Api_AppStoreConnect_Runner_FindApp_BundleIdentifier): Api_AppStoreConnect_Runner_FindApp_Returns {
    const query: Api_AppStoreConnect_Runner_FindApp_Query = new URLSearchParams({
      'filter[bundleId]': bundleIdentifier,
      'fields[apps]': 'bundleId,name',
      'limit': '2',
    });
    const apps: Api_AppStoreConnect_Runner_FindApp_Apps = await this.list(`/v1/apps?${query.toString()}`);

    if (apps.length !== 1) {
      throw new Error(`Expected one App Store Connect app for ${bundleIdentifier}; found ${apps.length}.`);
    }

    const app: Api_AppStoreConnect_Runner_FindApp_App = apps[0];

    if (app === undefined) {
      throw new Error(`App Store Connect did not return ${bundleIdentifier}.`);
    }

    return app;
  }

  /**
   * API - App Store Connect - Find Version.
   *
   * Resolves one editable store version for the requested platform and version,
   * preventing Nova from mutating released or otherwise locked metadata.
   *
   * @param {Api_AppStoreConnect_Runner_FindVersion_AppId}    appId    - App id.
   * @param {Api_AppStoreConnect_Runner_FindVersion_Version}  version  - Version.
   * @param {Api_AppStoreConnect_Runner_FindVersion_Platform} platform - Platform.
   *
   * @returns {Api_AppStoreConnect_Runner_FindVersion_Returns}
   *
   * @since 0.34.0
   */
  public async findVersion(appId: Api_AppStoreConnect_Runner_FindVersion_AppId, version: Api_AppStoreConnect_Runner_FindVersion_Version, platform: Api_AppStoreConnect_Runner_FindVersion_Platform): Api_AppStoreConnect_Runner_FindVersion_Returns {
    const query: Api_AppStoreConnect_Runner_FindVersion_Query = new URLSearchParams({
      'filter[platform]': platform,
      'filter[versionString]': version,
      'fields[appStoreVersions]': 'appStoreState,platform,versionString',
      'limit': '10',
    });
    const versions: Api_AppStoreConnect_Runner_FindVersion_Versions = await this.list(`/v1/apps/${appId}/appStoreVersions?${query.toString()}`);

    if (versions.length !== 1) {
      throw new Error(`Expected one ${platform} App Store version ${version}; found ${versions.length}.`);
    }

    const resolvedVersion: Api_AppStoreConnect_Runner_FindVersion_ResolvedVersion = versions[0];

    if (resolvedVersion === undefined) {
      throw new Error(`App Store Connect did not return ${platform} version ${version}.`);
    }

    const attributes: Api_AppStoreConnect_Runner_FindVersion_Attributes = requireObject(resolvedVersion['attributes'], `${platform} version attributes`);
    const state: Api_AppStoreConnect_Runner_FindVersion_State = requireString(attributes['appStoreState'], `${platform} version state`);

    if (editableAppStoreStates.has(state) === false) {
      throw new Error(`${platform} App Store version ${version} is not editable in state ${state}.`);
    }

    return resolvedVersion;
  }

  /**
   * API - App Store Connect - List Localizations.
   *
   * Loads all version-localization resources for a selected store version so
   * commands can update existing locales or create only missing ones.
   *
   * @param {Api_AppStoreConnect_Runner_ListLocalizations_VersionId} versionId - Version id.
   *
   * @returns {Api_AppStoreConnect_Runner_ListLocalizations_Returns}
   *
   * @since 0.34.0
   */
  public async listLocalizations(versionId: Api_AppStoreConnect_Runner_ListLocalizations_VersionId): Api_AppStoreConnect_Runner_ListLocalizations_Returns {
    const query: Api_AppStoreConnect_Runner_ListLocalizations_Query = new URLSearchParams({
      'fields[appStoreVersionLocalizations]': 'description,keywords,locale,marketingUrl,promotionalText,supportUrl,whatsNew',
      'limit': '200',
    });

    return this.list(`/v1/appStoreVersions/${versionId}/appStoreVersionLocalizations?${query.toString()}`);
  }

  /**
   * API - App Store Connect - Create Localization.
   *
   * Creates only a locale represented by local files and optionally applies its
   * explicitly supplied metadata in the same JSON:API request.
   *
   * @param {Api_AppStoreConnect_Runner_CreateLocalization_VersionId}  versionId  - Version id.
   * @param {Api_AppStoreConnect_Runner_CreateLocalization_Locale}     locale     - Locale.
   * @param {Api_AppStoreConnect_Runner_CreateLocalization_Attributes} attributes - Attributes.
   *
   * @returns {Api_AppStoreConnect_Runner_CreateLocalization_Returns}
   *
   * @since 0.34.0
   */
  public async createLocalization(versionId: Api_AppStoreConnect_Runner_CreateLocalization_VersionId, locale: Api_AppStoreConnect_Runner_CreateLocalization_Locale, attributes: Api_AppStoreConnect_Runner_CreateLocalization_Attributes = {}): Api_AppStoreConnect_Runner_CreateLocalization_Returns {
    let attempt: Api_AppStoreConnect_Runner_CreateLocalization_Attempt = 1;

    while (attempt <= maximumTransientAttempts) {
      let response: Api_AppStoreConnect_Runner_CreateLocalization_Response = undefined;

      try {
        response = await this.request('/v1/appStoreVersionLocalizations', {
          body: {
            data: {
              attributes: {
                locale,
                ...attributes,
              },
              relationships: {
                appStoreVersion: {
                  data: {
                    id: versionId,
                    type: 'appStoreVersions',
                  },
                },
              },
              type: 'appStoreVersionLocalizations',
            },
          },
          expectedStatuses: [201],
          method: 'POST',
        });
      } catch (error) {
        if (Runner.isAmbiguousCreateError(error) === false) {
          throw error;
        }

        const localizations: Api_AppStoreConnect_Runner_CreateLocalization_Localizations = await this.listLocalizations(versionId);
        const matchingLocalization: Api_AppStoreConnect_Runner_CreateLocalization_MatchingLocalization = localizations.find((localization) => {
          const matchingAttributes: Api_AppStoreConnect_Runner_CreateLocalization_MatchingAttributes = requireObject(localization['attributes'], `Localization attributes while reconciling ${locale}`);

          return matchingAttributes['locale'] === locale;
        });

        if (matchingLocalization !== undefined) {
          return matchingLocalization;
        }

        if (attempt >= maximumTransientAttempts) {
          throw error;
        }

        const retryDecision: Api_AppStoreConnect_Runner_CreateLocalization_RetryDecision = Runner.retryDecision(undefined, attempt, maximumTransientAttempts, maximumTransientDelayMilliseconds);

        if (retryDecision !== undefined) {
          await wait(retryDecision['delayMilliseconds']);
        }

        attempt += 1;

        continue;
      }

      if (response === undefined) {
        throw new Error(`Creating ${locale} App Store localization returned no resource.`);
      }

      return requireObject(response['data'], `Created ${locale} localization`);
    }

    throw new Error(`Creating ${locale} App Store localization exhausted its reconciliation attempts.`);
  }

  /**
   * API - App Store Connect - Update Localization.
   *
   * Patches only fields present in the local metadata file, leaving every other
   * App Store Connect localization field unchanged.
   *
   * @param {Api_AppStoreConnect_Runner_UpdateLocalization_LocalizationId} localizationId - Localization id.
   * @param {Api_AppStoreConnect_Runner_UpdateLocalization_Attributes}     attributes     - Attributes.
   *
   * @returns {Api_AppStoreConnect_Runner_UpdateLocalization_Returns}
   *
   * @since 0.34.0
   */
  public async updateLocalization(localizationId: Api_AppStoreConnect_Runner_UpdateLocalization_LocalizationId, attributes: Api_AppStoreConnect_Runner_UpdateLocalization_Attributes): Api_AppStoreConnect_Runner_UpdateLocalization_Returns {
    await this.request(`/v1/appStoreVersionLocalizations/${localizationId}`, {
      body: {
        data: {
          attributes,
          id: localizationId,
          type: 'appStoreVersionLocalizations',
        },
      },
      expectedStatuses: [200],
      method: 'PATCH',
    });

    return;
  }

  /**
   * API - App Store Connect - List Screenshot Sets.
   *
   * Reads the standard screenshot sets attached to one localization so Nova can
   * replace only the local target folders that a developer supplied.
   *
   * @param {Api_AppStoreConnect_Runner_ListScreenshotSets_LocalizationId} localizationId - Localization id.
   *
   * @returns {Api_AppStoreConnect_Runner_ListScreenshotSets_Returns}
   *
   * @since 0.34.0
   */
  public async listScreenshotSets(localizationId: Api_AppStoreConnect_Runner_ListScreenshotSets_LocalizationId): Api_AppStoreConnect_Runner_ListScreenshotSets_Returns {
    const query: Api_AppStoreConnect_Runner_ListScreenshotSets_Query = new URLSearchParams({
      'fields[appScreenshotSets]': 'screenshotDisplayType',
      'limit': '50',
    });

    return this.list(`/v1/appStoreVersionLocalizations/${localizationId}/appScreenshotSets?${query.toString()}`);
  }

  /**
   * API - App Store Connect - List Screenshots.
   *
   * Reads every screenshot and delivery state in an existing set so replacement
   * can preserve complete content and remove abandoned upload reservations.
   *
   * @param {Api_AppStoreConnect_Runner_ListScreenshots_ScreenshotSetId} screenshotSetId - Screenshot set id.
   *
   * @returns {Api_AppStoreConnect_Runner_ListScreenshots_Returns}
   *
   * @since 0.39.0
   */
  public async listScreenshots(screenshotSetId: Api_AppStoreConnect_Runner_ListScreenshots_ScreenshotSetId): Api_AppStoreConnect_Runner_ListScreenshots_Returns {
    const query: Api_AppStoreConnect_Runner_ListScreenshots_Query = new URLSearchParams({
      'fields[appScreenshots]': 'assetDeliveryState,fileName,sourceFileChecksum',
      'limit': '200',
    });

    return this.list(`/v1/appScreenshotSets/${screenshotSetId}/appScreenshots?${query.toString()}`);
  }

  /**
   * API - App Store Connect - Create Screenshot Set.
   *
   * Creates a standard device-specific screenshot container for one locale after
   * an existing local target has been validated and approved.
   *
   * @param {Api_AppStoreConnect_Runner_CreateScreenshotSet_LocalizationId} localizationId - Localization id.
   * @param {Api_AppStoreConnect_Runner_CreateScreenshotSet_DisplayType}    displayType    - Display type.
   *
   * @returns {Api_AppStoreConnect_Runner_CreateScreenshotSet_Returns}
   *
   * @since 0.34.0
   */
  public async createScreenshotSet(localizationId: Api_AppStoreConnect_Runner_CreateScreenshotSet_LocalizationId, displayType: Api_AppStoreConnect_Runner_CreateScreenshotSet_DisplayType): Api_AppStoreConnect_Runner_CreateScreenshotSet_Returns {
    let attempt: Api_AppStoreConnect_Runner_CreateScreenshotSet_Attempt = 1;

    while (attempt <= maximumTransientAttempts) {
      let response: Api_AppStoreConnect_Runner_CreateScreenshotSet_Response = undefined;

      try {
        response = await this.request('/v1/appScreenshotSets', {
          body: {
            data: {
              attributes: {
                screenshotDisplayType: displayType,
              },
              relationships: {
                appStoreVersionLocalization: {
                  data: {
                    id: localizationId,
                    type: 'appStoreVersionLocalizations',
                  },
                },
              },
              type: 'appScreenshotSets',
            },
          },
          expectedStatuses: [201],
          method: 'POST',
        });
      } catch (error) {
        if (Runner.isAmbiguousCreateError(error) === false) {
          throw error;
        }

        const sets: Api_AppStoreConnect_Runner_CreateScreenshotSet_Sets = await this.listScreenshotSets(localizationId);
        const matchingSet: Api_AppStoreConnect_Runner_CreateScreenshotSet_MatchingSet = sets.find((set) => {
          const matchingAttributes: Api_AppStoreConnect_Runner_CreateScreenshotSet_MatchingAttributes = requireObject(set['attributes'], `Screenshot set attributes while reconciling ${displayType}`);

          return matchingAttributes['screenshotDisplayType'] === displayType;
        });

        if (matchingSet !== undefined) {
          return matchingSet;
        }

        if (attempt >= maximumTransientAttempts) {
          throw error;
        }

        const retryDecision: Api_AppStoreConnect_Runner_CreateScreenshotSet_RetryDecision = Runner.retryDecision(undefined, attempt, maximumTransientAttempts, maximumTransientDelayMilliseconds);

        if (retryDecision !== undefined) {
          await wait(retryDecision['delayMilliseconds']);
        }

        attempt += 1;

        continue;
      }

      if (response === undefined) {
        throw new Error(`Creating screenshot set ${displayType} returned no resource.`);
      }

      return requireObject(response['data'], `Created screenshot set ${displayType}`);
    }

    throw new Error(`Creating screenshot set ${displayType} exhausted its reconciliation attempts.`);
  }

  /**
   * API - App Store Connect - Upload Screenshot.
   *
   * Reserves, uploads, commits, and waits for one standard App Store screenshot
   * while preserving the deterministic order established by its filename.
   *
   * @param {Api_AppStoreConnect_Runner_UploadScreenshot_ScreenshotSetId} screenshotSetId - Screenshot set id.
   * @param {Api_AppStoreConnect_Runner_UploadScreenshot_FileName}        fileName        - File name.
   * @param {Api_AppStoreConnect_Runner_UploadScreenshot_File}            file            - File.
   *
   * @returns {Api_AppStoreConnect_Runner_UploadScreenshot_Returns}
   *
   * @since 0.39.0
   */
  public async uploadScreenshot(screenshotSetId: Api_AppStoreConnect_Runner_UploadScreenshot_ScreenshotSetId, fileName: Api_AppStoreConnect_Runner_UploadScreenshot_FileName, file: Api_AppStoreConnect_Runner_UploadScreenshot_File): Api_AppStoreConnect_Runner_UploadScreenshot_Returns {
    const checksum: Api_AppStoreConnect_Runner_UploadScreenshot_Checksum = createHash('md5').update(file).digest('hex');
    const priorScreenshots: Api_AppStoreConnect_Runner_UploadScreenshot_PriorScreenshots = await this.listScreenshots(screenshotSetId);
    const priorScreenshotIds: Api_AppStoreConnect_Runner_UploadScreenshot_PriorScreenshotIds = new Set(priorScreenshots.map((priorScreenshot) => requireString(priorScreenshot['id'], `Existing screenshot ID before uploading ${fileName}`)));
    const resource: Api_AppStoreConnect_Runner_UploadScreenshot_Resource = await this.reserveScreenshot(screenshotSetId, fileName, file, priorScreenshotIds, 1);
    const resourceId: Api_AppStoreConnect_Runner_UploadScreenshot_ResourceId = requireString(resource['id'], `Reserved screenshot ID for ${fileName}`);

    try {
      const attributes: Api_AppStoreConnect_Runner_UploadScreenshot_Attributes = requireObject(resource['attributes'], `Reserved screenshot attributes for ${fileName}`);
      const operations: Api_AppStoreConnect_Runner_UploadScreenshot_Operations = requireArray(attributes['uploadOperations'], `Upload operations for ${fileName}`).map((operation) => requireObject(operation, `Upload operation for ${fileName}`));

      if (operations.length === 0) {
        throw new Error(`${fileName} did not receive upload operations.`);
      }

      await Runner.runOperations(operations, (operation) => this.uploadOperation(operation, file));

      await this.request(`/v1/appScreenshots/${resourceId}`, {
        body: {
          data: {
            attributes: {
              sourceFileChecksum: checksum,
              uploaded: true,
            },
            id: resourceId,
            type: 'appScreenshots',
          },
        },
        expectedStatuses: [200],
        method: 'PATCH',
      });

      await this.waitForScreenshot(screenshotSetId, resourceId, fileName);

      return resource;
    } catch (error) {
      await this.cleanupScreenshotReservation(resourceId, fileName);

      throw error;
    }
  }

  /**
   * API - App Store Connect - Reorder Screenshots.
   *
   * Applies the complete filename-derived order after every screenshot in a set
   * has completed Apple's processing pipeline.
   *
   * @param {Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotSetId} screenshotSetId - Screenshot set id.
   * @param {Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotIds}   screenshotIds   - Screenshot ids.
   *
   * @returns {Api_AppStoreConnect_Runner_ReorderScreenshots_Returns}
   *
   * @since 0.39.0
   */
  public async reorderScreenshots(screenshotSetId: Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotSetId, screenshotIds: Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotIds): Api_AppStoreConnect_Runner_ReorderScreenshots_Returns {
    await this.request(`/v1/appScreenshotSets/${screenshotSetId}/relationships/appScreenshots`, {
      body: {
        data: screenshotIds.map((screenshotId) => ({
          id: screenshotId,
          type: 'appScreenshots',
        })),
      },
      expectedStatuses: [
        200,
        204,
      ],
      method: 'PATCH',
    });

    return;
  }

  /**
   * API - App Store Connect - Find Asset Library.
   *
   * Resolves the application-owned asset library used by creative assets and
   * Apple's placement-based iPhone Duo screenshots.
   *
   * @param {Api_AppStoreConnect_Runner_FindAssetLibrary_AppId} appId - App id.
   *
   * @returns {Api_AppStoreConnect_Runner_FindAssetLibrary_Returns}
   *
   * @since 0.34.0
   */
  public async findAssetLibrary(appId: Api_AppStoreConnect_Runner_FindAssetLibrary_AppId): Api_AppStoreConnect_Runner_FindAssetLibrary_Returns {
    const response: Api_AppStoreConnect_Runner_FindAssetLibrary_Response = await this.request(`/v1/apps/${appId}/assetLibrary`);

    if (response === undefined) {
      throw new Error(`App ${appId} returned no asset library.`);
    }

    return requireObject(response['data'], `Asset library for ${appId}`);
  }

  /**
   * API - App Store Connect - Upload Asset Library Image.
   *
   * Reserves, uploads, commits, and waits for one placement-based image using
   * Apple's current App Asset Library workflow.
   *
   * @param {Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AssetLibraryId} assetLibraryId - Asset library id.
   * @param {Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Category}       category       - Category.
   * @param {Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReferenceName}  referenceName  - Reference name.
   * @param {Api_AppStoreConnect_Runner_UploadAssetLibraryImage_FileName}       fileName       - File name.
   * @param {Api_AppStoreConnect_Runner_UploadAssetLibraryImage_File}           file           - File.
   *
   * @returns {Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Returns}
   *
   * @since 0.39.0
   */
  public async uploadAssetLibraryImage(assetLibraryId: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AssetLibraryId, category: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Category, referenceName: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReferenceName, fileName: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_FileName, file: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_File): Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Returns {
    const checksum: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Checksum = createHash('md5').update(file).digest('hex').slice(0, 8);
    const idempotentReferenceName: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_IdempotentReferenceName = `${referenceName} [md5:${checksum}]`;
    const query: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Query = new URLSearchParams({
      'fields[appAssetLibraryImages]': 'category,fileName,referenceName,state,stateDetails',
      'filter[category]': category,
      'filter[referenceName]': idempotentReferenceName,
      'limit': '200',
    });
    const existingImages: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ExistingImages = await this.list(`/v1/appAssetLibraries/${assetLibraryId}/images?${query.toString()}`);
    const priorImageIds: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_PriorImageIds = new Set(existingImages.map((existingImage) => requireString(existingImage['id'], `Existing asset ID for ${fileName}`)));
    const reusableImage: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReusableImage = existingImages.find((existingImage) => {
      const reusableAttributes: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReusableAttributes = requireObject(existingImage['attributes'], `Existing asset attributes for ${fileName}`);
      const reusableState: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReusableState = reusableAttributes['state'];

      return (
        reusableAttributes['referenceName'] === idempotentReferenceName
        && typeof reusableState === 'string'
        && readyAssetStates.has(reusableState) === true
      );
    });

    if (reusableImage !== undefined) {
      return reusableImage;
    }

    const abandonedImages: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedImages = existingImages.filter((existingImage) => {
      const abandonedAttributes: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedAttributes = requireObject(existingImage['attributes'], `Existing asset attributes for ${fileName}`);
      const abandonedState: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedState = abandonedAttributes['state'];

      return (
        abandonedAttributes['referenceName'] === idempotentReferenceName
        && typeof abandonedState === 'string'
        && failedAssetCleanupStates.has(abandonedState) === true
      );
    });
    const abandonedImageIds: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AbandonedImageIds = abandonedImages.map((abandonedImage) => requireString(abandonedImage['id'], `Abandoned asset ID for ${fileName}`));

    await Runner.runOperations(abandonedImageIds, (abandonedImageId) => this.deleteResource('appAssetLibraryImages', abandonedImageId));

    let reservation: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Reservation = undefined;
    let reservationAttempt: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReservationAttempt = 1;

    while (reservationAttempt <= maximumTransientAttempts) {
      try {
        reservation = await this.request('/v1/appAssetLibraryImages', {
          body: {
            data: {
              attributes: {
                category,
                fileName,
                fileSize: file.length,
                referenceName: idempotentReferenceName,
              },
              relationships: {
                assetLibrary: {
                  data: {
                    id: assetLibraryId,
                    type: 'appAssetLibraries',
                  },
                },
              },
              type: 'appAssetLibraryImages',
            },
          },
          expectedStatuses: [201],
          method: 'POST',
        });
      } catch (error) {
        if (Runner.isAmbiguousCreateError(error) === false) {
          throw error;
        }

        const reconciliationImages: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciliationImages = await this.list(`/v1/appAssetLibraries/${assetLibraryId}/images?${query.toString()}`);
        const reconciledImage: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciledImage = reconciliationImages.find((reconciliationImage) => {
          const reconciliationImageId: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciliationImageId = requireString(reconciliationImage['id'], `Asset ID while reconciling ${fileName}`);
          const reconciliationAttributes: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReconciliationAttributes = requireObject(reconciliationImage['attributes'], `Asset attributes while reconciling ${fileName}`);

          return (
            priorImageIds.has(reconciliationImageId) === false
            && reconciliationAttributes['category'] === category
            && reconciliationAttributes['referenceName'] === idempotentReferenceName
          );
        });

        if (reconciledImage !== undefined) {
          reservation = { data: reconciledImage };

          break;
        }

        if (reservationAttempt >= maximumTransientAttempts) {
          throw error;
        }

        const reservationRetryDecision: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReservationRetryDecision = Runner.retryDecision(undefined, reservationAttempt, maximumTransientAttempts, maximumTransientDelayMilliseconds);

        if (reservationRetryDecision !== undefined) {
          await wait(reservationRetryDecision['delayMilliseconds']);
        }

        reservationAttempt += 1;

        continue;
      }

      break;
    }

    if (reservation === undefined) {
      throw new Error(`Reserving asset ${fileName} returned no resource.`);
    }

    const resource: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Resource = requireObject(reservation['data'], `Reserved asset ${fileName}`);
    const attributes: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Attributes = requireObject(resource['attributes'], `Reserved asset attributes for ${fileName}`);
    const operations: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Operations = requireArray(attributes['uploadOperations'], `Upload operations for ${fileName}`).map((operation) => requireObject(operation, `Upload operation for ${fileName}`));

    if (operations.length === 0) {
      throw new Error(`${fileName} did not receive upload operations.`);
    }

    await Runner.runOperations(operations, (operation) => this.uploadOperation(operation, file));

    const resourceId: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ResourceId = requireString(resource['id'], `Reserved asset ID for ${fileName}`);

    await this.request(`/v1/appAssetLibraryImages/${resourceId}`, {
      body: {
        data: {
          attributes: {
            uploaded: true,
          },
          id: resourceId,
          type: 'appAssetLibraryImages',
        },
      },
      expectedStatuses: [200],
      method: 'PATCH',
    });

    return this.waitForAssetLibraryImage(resourceId, fileName);
  }

  /**
   * API - App Store Connect - Delete Resource.
   *
   * Deletes one known App Store Connect resource after the command's single
   * approval boundary has been crossed.
   *
   * @param {Api_AppStoreConnect_Runner_DeleteResource_ResourceType} resourceType - Resource type.
   * @param {Api_AppStoreConnect_Runner_DeleteResource_Id}           id           - Id.
   *
   * @returns {Api_AppStoreConnect_Runner_DeleteResource_Returns}
   *
   * @since 0.34.0
   */
  public async deleteResource(resourceType: Api_AppStoreConnect_Runner_DeleteResource_ResourceType, id: Api_AppStoreConnect_Runner_DeleteResource_Id): Api_AppStoreConnect_Runner_DeleteResource_Returns {
    await this.request(`/v1/${resourceType}/${id}`, {
      expectedStatuses: [204],
      method: 'DELETE',
    });

    return;
  }

  /**
   * API - App Store Connect - Cleanup Screenshot Reservation.
   *
   * Removes a reservation owned by the current upload after byte transfer or
   * processing fails, while preserving the original failure if cleanup fails.
   *
   * @param {Api_AppStoreConnect_Runner_CleanupScreenshotReservation_ScreenshotId} screenshotId - Screenshot id.
   * @param {Api_AppStoreConnect_Runner_CleanupScreenshotReservation_FileName}     fileName     - File name.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_CleanupScreenshotReservation_Returns}
   *
   * @since 0.39.0
   */
  private async cleanupScreenshotReservation(screenshotId: Api_AppStoreConnect_Runner_CleanupScreenshotReservation_ScreenshotId, fileName: Api_AppStoreConnect_Runner_CleanupScreenshotReservation_FileName): Api_AppStoreConnect_Runner_CleanupScreenshotReservation_Returns {
    try {
      await this.deleteResource('appScreenshots', screenshotId);

      Logger.info(`Removed failed screenshot reservation ${fileName} (${screenshotId}).`);
    } catch (cleanupError) {
      Logger.warn(`Unable to remove failed screenshot reservation ${fileName} (${screenshotId}): ${String(cleanupError)}`);
    }

    return;
  }

  /**
   * API - App Store Connect - Poll Screenshot Set.
   *
   * Lists a screenshot set once per backoff interval and resolves all waiting
   * uploads whose shared delivery-state snapshot is terminal.
   *
   * @param {Api_AppStoreConnect_Runner_PollScreenshotSet_ScreenshotSetId} screenshotSetId - Screenshot set id.
   * @param {Api_AppStoreConnect_Runner_PollScreenshotSet_Attempt}         attempt         - Attempt.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_PollScreenshotSet_Returns}
   *
   * @since 0.39.0
   */
  private async pollScreenshotSet(screenshotSetId: Api_AppStoreConnect_Runner_PollScreenshotSet_ScreenshotSetId, attempt: Api_AppStoreConnect_Runner_PollScreenshotSet_Attempt): Api_AppStoreConnect_Runner_PollScreenshotSet_Returns {
    const delayMilliseconds: Api_AppStoreConnect_Runner_PollScreenshotSet_DelayMilliseconds = Math.min(processingPollInitialDelayMilliseconds * Math.pow(2, attempt - 1), processingPollMaximumDelayMilliseconds);

    await wait(delayMilliseconds);

    const waiters: Api_AppStoreConnect_Runner_PollScreenshotSet_Waiters = this.#screenshotProcessingWaiters.get(screenshotSetId);

    if (waiters === undefined || waiters.size === 0) {
      this.#screenshotProcessingPolls.delete(screenshotSetId);

      this.#screenshotProcessingWaiters.delete(screenshotSetId);

      return;
    }

    if (attempt > maximumProcessingAttempts) {
      for (const waiterEntry of waiters) {
        const timedOutWaiter: Api_AppStoreConnect_Runner_PollScreenshotSet_TimedOutWaiter = waiterEntry[1];

        timedOutWaiter.reject(new Error(`${timedOutWaiter['fileName']} did not finish Apple processing in time.`));
      }

      waiters.clear();

      this.#screenshotProcessingPolls.delete(screenshotSetId);

      this.#screenshotProcessingWaiters.delete(screenshotSetId);

      return;
    }

    try {
      const resources: Api_AppStoreConnect_Runner_PollScreenshotSet_Resources = await this.listScreenshots(screenshotSetId);

      for (const waiterEntry of waiters) {
        const screenshotId: Api_AppStoreConnect_Runner_PollScreenshotSet_ScreenshotId = waiterEntry[0];
        const processingWaiter: Api_AppStoreConnect_Runner_PollScreenshotSet_ProcessingWaiter = waiterEntry[1];
        const resource: Api_AppStoreConnect_Runner_PollScreenshotSet_Resource = resources.find((candidate) => candidate['id'] === screenshotId);

        if (resource === undefined) {
          continue;
        }

        const attributes: Api_AppStoreConnect_Runner_PollScreenshotSet_Attributes = requireObject(resource['attributes'], `Screenshot attributes for ${processingWaiter['fileName']}`);
        const state: Api_AppStoreConnect_Runner_PollScreenshotSet_State = requireObject(attributes['assetDeliveryState'], `Screenshot delivery state for ${processingWaiter['fileName']}`);

        if (state['state'] === 'COMPLETE') {
          waiters.delete(screenshotId);

          processingWaiter.resolve();

          continue;
        }

        if (state['state'] === 'FAILED') {
          const errors: Api_AppStoreConnect_Runner_PollScreenshotSet_Errors = JSON.stringify(state['errors'] ?? []);

          waiters.delete(screenshotId);

          processingWaiter.reject(new Error(`${processingWaiter['fileName']} failed Apple processing: ${errors}`));
        }
      }

      if (waiters.size === 0) {
        this.#screenshotProcessingPolls.delete(screenshotSetId);

        this.#screenshotProcessingWaiters.delete(screenshotSetId);

        return;
      }

      await this.pollScreenshotSet(screenshotSetId, attempt + 1);
    } catch (error) {
      for (const waiterEntry of waiters) {
        const pollingWaiter: Api_AppStoreConnect_Runner_PollScreenshotSet_PollingWaiter = waiterEntry[1];

        pollingWaiter.reject(error);
      }

      waiters.clear();

      this.#screenshotProcessingPolls.delete(screenshotSetId);

      this.#screenshotProcessingWaiters.delete(screenshotSetId);

      return;
    }

    return;
  }

  /**
   * API - App Store Connect - Reserve Screenshot.
   *
   * Reconciles an ambiguous reservation create by removing only same-name
   * awaiting-upload resources absent from the pre-create snapshot before retry.
   *
   * @param {Api_AppStoreConnect_Runner_ReserveScreenshot_ScreenshotSetId}    screenshotSetId    - Screenshot set id.
   * @param {Api_AppStoreConnect_Runner_ReserveScreenshot_FileName}           fileName           - File name.
   * @param {Api_AppStoreConnect_Runner_ReserveScreenshot_File}               file               - File.
   * @param {Api_AppStoreConnect_Runner_ReserveScreenshot_PriorScreenshotIds} priorScreenshotIds - Prior screenshot ids.
   * @param {Api_AppStoreConnect_Runner_ReserveScreenshot_Attempt}            attempt            - Attempt.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_ReserveScreenshot_Returns}
   *
   * @since 0.39.0
   */
  private async reserveScreenshot(screenshotSetId: Api_AppStoreConnect_Runner_ReserveScreenshot_ScreenshotSetId, fileName: Api_AppStoreConnect_Runner_ReserveScreenshot_FileName, file: Api_AppStoreConnect_Runner_ReserveScreenshot_File, priorScreenshotIds: Api_AppStoreConnect_Runner_ReserveScreenshot_PriorScreenshotIds, attempt: Api_AppStoreConnect_Runner_ReserveScreenshot_Attempt): Api_AppStoreConnect_Runner_ReserveScreenshot_Returns {
    let reservation: Api_AppStoreConnect_Runner_ReserveScreenshot_Reservation = undefined;

    try {
      reservation = await this.request('/v1/appScreenshots', {
        body: {
          data: {
            attributes: {
              fileName,
              fileSize: file.length,
            },
            relationships: {
              appScreenshotSet: {
                data: {
                  id: screenshotSetId,
                  type: 'appScreenshotSets',
                },
              },
            },
            type: 'appScreenshots',
          },
        },
        expectedStatuses: [201],
        method: 'POST',
      });
    } catch (error) {
      if (Runner.isAmbiguousCreateError(error) === false) {
        throw error;
      }

      const resources: Api_AppStoreConnect_Runner_ReserveScreenshot_Resources = await this.listScreenshots(screenshotSetId);
      const orphanIds: Api_AppStoreConnect_Runner_ReserveScreenshot_OrphanIds = resources.filter((resource) => {
        const resourceId: Api_AppStoreConnect_Runner_ReserveScreenshot_ResourceId = requireString(resource['id'], `Screenshot ID while reconciling ${fileName}`);
        const attributes: Api_AppStoreConnect_Runner_ReserveScreenshot_Attributes = requireObject(resource['attributes'], `Screenshot attributes while reconciling ${fileName}`);
        const state: Api_AppStoreConnect_Runner_ReserveScreenshot_State = requireObject(attributes['assetDeliveryState'], `Screenshot delivery state while reconciling ${fileName}`);

        return (
          priorScreenshotIds.has(resourceId) === false
          && attributes['fileName'] === fileName
          && state['state'] === 'AWAITING_UPLOAD'
        );
      }).map((resource) => requireString(resource['id'], `Orphan screenshot ID for ${fileName}`));

      await Runner.runOperations(orphanIds, (orphanId) => this.deleteResource('appScreenshots', orphanId));

      if (attempt >= maximumTransientAttempts) {
        throw error;
      }

      const retryDecision: Api_AppStoreConnect_Runner_ReserveScreenshot_RetryDecision = Runner.retryDecision(undefined, attempt, maximumTransientAttempts, maximumTransientDelayMilliseconds);

      if (retryDecision !== undefined) {
        await wait(retryDecision['delayMilliseconds']);
      }

      return this.reserveScreenshot(screenshotSetId, fileName, file, priorScreenshotIds, attempt + 1);
    }

    if (reservation === undefined) {
      throw new Error(`Reserving screenshot ${fileName} returned no resource.`);
    }

    return requireObject(reservation['data'], `Reserved screenshot ${fileName}`);
  }

  /**
   * API - App Store Connect - Acquire API Operation.
   *
   * Reserves one client-wide fetch slot or waits in arrival order until another
   * request releases a slot.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_AcquireApiOperation_Returns}
   *
   * @since 0.39.0
   */
  private async acquireApiOperation(): Api_AppStoreConnect_Runner_AcquireApiOperation_Returns {
    if (this.#activeApiOperations < maximumConcurrentApiOperations) {
      this.#activeApiOperations += 1;

      return;
    }

    await new Promise<Api_AppStoreConnect_Runner_AcquireApiOperation_PromiseValue>((resume) => {
      this.#apiOperationQueue.push(resume);

      return;
    });

    return;
  }

  /**
   * API - App Store Connect - Wait For API Pause.
   *
   * Delays every limiter participant until the longest active vendor-directed
   * or low-budget pause expires, including extensions made while already waiting.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_WaitForApiPause_Returns}
   *
   * @since 0.39.0
   */
  private async waitForApiPause(): Api_AppStoreConnect_Runner_WaitForApiPause_Returns {
    const delayMilliseconds: Api_AppStoreConnect_Runner_WaitForApiPause_DelayMilliseconds = this.#apiOperationsPausedUntil - Date.now();

    if (delayMilliseconds <= 0) {
      return;
    }

    await wait(delayMilliseconds);

    await this.waitForApiPause();

    return;
  }

  /**
   * API - App Store Connect - Fetch With Limit.
   *
   * Runs one fetch inside the shared client limiter and always releases its slot
   * after a response or thrown network error.
   *
   * @param {Api_AppStoreConnect_Runner_FetchWithLimit_Url}     url     - Url.
   * @param {Api_AppStoreConnect_Runner_FetchWithLimit_Options} options - Options.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_FetchWithLimit_Returns}
   *
   * @since 0.39.0
   */
  private async fetchWithLimit(url: Api_AppStoreConnect_Runner_FetchWithLimit_Url, options: Api_AppStoreConnect_Runner_FetchWithLimit_Options): Api_AppStoreConnect_Runner_FetchWithLimit_Returns {
    await this.acquireApiOperation();

    try {
      await this.waitForApiPause();

      const headers: Api_AppStoreConnect_Runner_FetchWithLimit_Headers = {
        ...(options['headers'] ?? {}),
      };

      if (options['authenticated'] === true) {
        Reflect.set(headers, 'Accept', 'application/json');
        Reflect.set(headers, 'Authorization', `Bearer ${this.getToken()}`);

        if (options['body'] !== undefined) {
          Reflect.set(headers, 'Content-Type', 'application/json');
        }
      }

      const requestInit: Api_AppStoreConnect_Runner_FetchWithLimit_RequestInit = {
        headers,
        method: options['method'],
        signal: AbortSignal.timeout(options['timeoutMilliseconds']),
      };

      if (options['body'] !== undefined) {
        Reflect.set(requestInit, 'body', options['body']);
      }

      const response: Api_AppStoreConnect_Runner_FetchWithLimit_Response = await fetch(url, requestInit);

      this.applyRateLimitBudget(response);

      if (response.status === 429) {
        const retryDecision: Api_AppStoreConnect_Runner_FetchWithLimit_RetryDecision = Runner.retryDecision(response, options['rateLimitAttempt'], maximumRateLimitAttempts, maximumRateLimitDelayMilliseconds);

        if (retryDecision !== undefined) {
          this.pauseApiOperations(retryDecision['delayMilliseconds']);
        }
      }

      return response;
    } finally {
      this.releaseApiOperation();
    }
  }

  /**
   * API - App Store Connect - Upload Operation.
   *
   * Uploads one reserved byte range using Apple's signed operation URL and
   * headers, retrying only transient failures.
   *
   * @param {Api_AppStoreConnect_Runner_UploadOperation_Operation} operation - Operation.
   * @param {Api_AppStoreConnect_Runner_UploadOperation_File}      file      - File.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_UploadOperation_Returns}
   *
   * @since 0.39.0
   */
  private async uploadOperation(operation: Api_AppStoreConnect_Runner_UploadOperation_Operation, file: Api_AppStoreConnect_Runner_UploadOperation_File): Api_AppStoreConnect_Runner_UploadOperation_Returns {
    const method: Api_AppStoreConnect_Runner_UploadOperation_Method = requireString(operation['method'], 'Upload operation method');
    const url: Api_AppStoreConnect_Runner_UploadOperation_Url = requireString(operation['url'], 'Upload operation URL');
    const offset: Api_AppStoreConnect_Runner_UploadOperation_Offset = requireNonNegativeInteger(operation['offset'], 'Upload operation offset');
    const length: Api_AppStoreConnect_Runner_UploadOperation_Length = requireNonNegativeInteger(operation['length'], 'Upload operation length');
    const requestHeaders: Api_AppStoreConnect_Runner_UploadOperation_RequestHeaders = requireArray(operation['requestHeaders'], 'Upload operation request headers');
    const headers: Api_AppStoreConnect_Runner_UploadOperation_Headers = {};

    for (const requestHeader of requestHeaders) {
      const header: Api_AppStoreConnect_Runner_UploadOperation_Header = requireObject(requestHeader, 'Upload operation request header');
      const name: Api_AppStoreConnect_Runner_UploadOperation_Name = requireString(header['name'], 'Upload header name');

      Reflect.set(headers, name, requireString(header['value'], `Upload header ${name}`));
    }

    if (offset + length > file.length) {
      throw new Error(`Upload operation exceeds the ${file.length}-byte source file.`);
    }

    await this.uploadOperationAttempt(url, method, headers, file, offset, length, 0, 0);

    return;
  }

  /**
   * API - App Store Connect - Upload Operation Attempt.
   *
   * Executes one signed byte-range upload and applies the same retry and
   * concurrency policy used by authenticated JSON requests.
   *
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Url}              url              - Url.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Method}           method           - Method.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Headers}          headers          - Headers.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_File}             file             - File.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Offset}           offset           - Offset.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Length}           length           - Length.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_RateLimitAttempt} rateLimitAttempt - Rate limit attempt.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_TransientAttempt} transientAttempt - Transient attempt.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_UploadOperationAttempt_Returns}
   *
   * @since 0.39.0
   */
  private async uploadOperationAttempt(url: Api_AppStoreConnect_Runner_UploadOperationAttempt_Url, method: Api_AppStoreConnect_Runner_UploadOperationAttempt_Method, headers: Api_AppStoreConnect_Runner_UploadOperationAttempt_Headers, file: Api_AppStoreConnect_Runner_UploadOperationAttempt_File, offset: Api_AppStoreConnect_Runner_UploadOperationAttempt_Offset, length: Api_AppStoreConnect_Runner_UploadOperationAttempt_Length, rateLimitAttempt: Api_AppStoreConnect_Runner_UploadOperationAttempt_RateLimitAttempt, transientAttempt: Api_AppStoreConnect_Runner_UploadOperationAttempt_TransientAttempt): Api_AppStoreConnect_Runner_UploadOperationAttempt_Returns {
    let response: Api_AppStoreConnect_Runner_UploadOperationAttempt_Response = undefined;

    try {
      response = await this.fetchWithLimit(url, {
        authenticated: false,
        body: file.subarray(offset, offset + length),
        headers,
        method,
        rateLimitAttempt: rateLimitAttempt + 1,
        timeoutMilliseconds: assetUploadTimeoutMilliseconds,
      });
    } catch (error) {
      const networkRetryDecision: Api_AppStoreConnect_Runner_UploadOperationAttempt_NetworkRetryDecision = Runner.retryDecision(undefined, transientAttempt + 1, maximumTransientAttempts, maximumTransientDelayMilliseconds);

      if (networkRetryDecision === undefined) {
        throw new Error('Asset upload failed.', { cause: error });
      }

      await wait(networkRetryDecision['delayMilliseconds']);

      await this.uploadOperationAttempt(url, method, headers, file, offset, length, rateLimitAttempt, transientAttempt + 1);

      return;
    }

    if (response.ok === true) {
      return;
    }

    const responseText: Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseText = await response.text();

    if (response.status === 429) {
      const rateLimitRetryDecision: Api_AppStoreConnect_Runner_UploadOperationAttempt_RateLimitRetryDecision = Runner.retryDecision(response, rateLimitAttempt + 1, maximumRateLimitAttempts, maximumRateLimitDelayMilliseconds);

      if (rateLimitRetryDecision === undefined) {
        throw new Error(`Asset upload failed with HTTP ${response.status}: ${responseText}. The run is safe to resume after App Store Connect's rate limit resets.`);
      }

      await this.uploadOperationAttempt(url, method, headers, file, offset, length, rateLimitAttempt + 1, transientAttempt);

      return;
    }

    const responseRetryDecision: Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseRetryDecision = Runner.retryDecision(response, transientAttempt + 1, maximumTransientAttempts, maximumTransientDelayMilliseconds);

    if (responseRetryDecision === undefined) {
      throw new Error(`Asset upload failed with HTTP ${response.status}: ${responseText}`);
    }

    await wait(responseRetryDecision['delayMilliseconds']);

    await this.uploadOperationAttempt(url, method, headers, file, offset, length, rateLimitAttempt, transientAttempt + 1);

    return;
  }

  /**
   * API - App Store Connect - Wait For Screenshot.
   *
   * Registers one uploaded image with its set-level polling loop so concurrent
   * uploads share one list request at each processing interval.
   *
   * @param {Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotSetId} screenshotSetId - Screenshot set id.
   * @param {Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotId}    screenshotId    - Screenshot id.
   * @param {Api_AppStoreConnect_Runner_WaitForScreenshot_FileName}        fileName        - File name.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_WaitForScreenshot_Returns}
   *
   * @since 0.34.0
   */
  private async waitForScreenshot(screenshotSetId: Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotSetId, screenshotId: Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotId, fileName: Api_AppStoreConnect_Runner_WaitForScreenshot_FileName): Api_AppStoreConnect_Runner_WaitForScreenshot_Returns {
    let waiters: Api_AppStoreConnect_Runner_WaitForScreenshot_Waiters = this.#screenshotProcessingWaiters.get(screenshotSetId);

    if (waiters === undefined) {
      waiters = new Map();

      this.#screenshotProcessingWaiters.set(screenshotSetId, waiters);
    }

    const processingPromise: Api_AppStoreConnect_Runner_WaitForScreenshot_ProcessingPromise = new Promise((resolvePromise, rejectPromise) => {
      waiters.set(screenshotId, {
        fileName,
        reject: rejectPromise,
        resolve: resolvePromise,
      });

      return;
    });
    const existingPoll: Api_AppStoreConnect_Runner_WaitForScreenshot_ExistingPoll = this.#screenshotProcessingPolls.get(screenshotSetId);

    if (existingPoll === undefined) {
      const poll: Api_AppStoreConnect_Runner_WaitForScreenshot_Poll = this.pollScreenshotSet(screenshotSetId, 1);

      this.#screenshotProcessingPolls.set(screenshotSetId, poll);

      poll.catch(() => undefined);
    }

    await processingPromise;

    return;
  }

  /**
   * API - App Store Connect - Wait For Asset Library Image.
   *
   * Polls a placement-based image until Apple reports a usable or failed state,
   * preventing placements from referencing unfinished uploads.
   *
   * @param {Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_ImageId}  imageId  - Image id.
   * @param {Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_FileName} fileName - File name.
   * @param {Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Attempt}  attempt  - Attempt.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Returns}
   *
   * @since 0.34.0
   */
  private async waitForAssetLibraryImage(imageId: Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_ImageId, fileName: Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_FileName, attempt: Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Attempt = 1): Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Returns {
    const query: Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Query = new URLSearchParams({
      'fields[appAssetLibraryImages]': 'referenceName,fileName,state,stateDetails,specId,imageAsset',
    });

    if (attempt > maximumProcessingAttempts) {
      throw new Error(`${fileName} did not finish Apple processing in time.`);
    }

    const response: Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Response = await this.request(`/v1/appAssetLibraryImages/${imageId}?${query.toString()}`);

    if (response === undefined) {
      throw new Error(`Asset ${fileName} returned no processing state.`);
    }

    const resource: Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Resource = requireObject(response['data'], `Asset ${fileName}`);
    const attributes: Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Attributes = requireObject(resource['attributes'], `Asset attributes for ${fileName}`);
    const state: Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_State = requireString(attributes['state'], `Asset state for ${fileName}`);

    if (readyAssetStates.has(state) === true) {
      return resource;
    }

    if (failedAssetStates.has(state) === true) {
      throw new Error(`${fileName} failed Apple processing in state ${state}: ${JSON.stringify(attributes['stateDetails'] ?? {})}`);
    }

    const delayMilliseconds: Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_DelayMilliseconds = Math.min(processingPollInitialDelayMilliseconds * Math.pow(2, attempt - 1), processingPollMaximumDelayMilliseconds);

    await wait(delayMilliseconds);

    return this.waitForAssetLibraryImage(imageId, fileName, attempt + 1);
  }

  /**
   * API - App Store Connect - Apply Rate Limit Budget.
   *
   * Reads Apple's hourly limit and remaining counters and adds a client-wide
   * pacing pause before a low remaining budget becomes a hard rate limit.
   *
   * @param {Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Response} response - Response.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Returns}
   *
   * @since 0.39.0
   */
  private applyRateLimitBudget(response: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Response): Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Returns {
    const header: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Header = response.headers.get('x-rate-limit');

    if (header === null || header === '') {
      return;
    }

    const parts: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Parts = header.split(';').map((part) => part.trim()).filter((part) => part !== '');
    let limit: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Limit = undefined;
    let remaining: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Remaining = undefined;

    for (const part of parts) {
      const separatorIndex: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_SeparatorIndex = part.indexOf(':');

      if (separatorIndex === -1) {
        continue;
      }

      const name: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Name = part.slice(0, separatorIndex);
      const value: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_Value = Number(part.slice(separatorIndex + 1));

      if (Number.isFinite(value) === false || value < 0) {
        continue;
      }

      if (name === 'user-hour-lim') {
        limit = value;
      }

      if (name === 'user-hour-rem') {
        remaining = value;
      }
    }

    if (
      limit === undefined
      || remaining === undefined
      || limit <= 0
    ) {
      return;
    }

    const remainingRatio: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_RemainingRatio = remaining / limit;
    let delayMilliseconds: Api_AppStoreConnect_Runner_ApplyRateLimitBudget_DelayMilliseconds = 0;

    if (remaining <= 10 || remainingRatio <= 0.01) {
      delayMilliseconds = rateLimitCriticalDelayMilliseconds;
    } else if (remainingRatio <= 0.05) {
      delayMilliseconds = rateLimitLowDelayMilliseconds;
    }

    if (delayMilliseconds > 0) {
      this.pauseApiOperations(delayMilliseconds);
    }

    return;
  }

  /**
   * API - App Store Connect - Get Token.
   *
   * Reuses a valid token or signs a new 19-minute ES256 token following Apple's
   * team-key and individual-key claims.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_GetToken_Returns}
   *
   * @since 0.34.0
   */
  private getToken(): Api_AppStoreConnect_Runner_GetToken_Returns {
    const now: Api_AppStoreConnect_Runner_GetToken_Now = Math.floor(Date.now() / 1000);

    if (this.#token !== undefined && now < this.#tokenExpiresAt - 60) {
      return this.#token;
    }

    const issuedAt: Api_AppStoreConnect_Runner_GetToken_IssuedAt = now;
    const expiresAt: Api_AppStoreConnect_Runner_GetToken_ExpiresAt = now + (19 * 60);
    const header: Api_AppStoreConnect_Runner_GetToken_Header = {
      alg: 'ES256',
      kid: this.#keyId,
      typ: 'JWT',
    };
    const payload: Api_AppStoreConnect_Runner_GetToken_Payload = {
      aud: 'appstoreconnect-v1',
      exp: expiresAt,
      iat: issuedAt,
    };

    if (this.#issuerId === undefined) {
      Reflect.set(payload, 'sub', 'user');
    } else {
      Reflect.set(payload, 'iss', this.#issuerId);
    }

    const encodedHeader: Api_AppStoreConnect_Runner_GetToken_EncodedHeader = Buffer.from(JSON.stringify(header)).toString('base64url');
    const encodedPayload: Api_AppStoreConnect_Runner_GetToken_EncodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
    const signingInput: Api_AppStoreConnect_Runner_GetToken_SigningInput = `${encodedHeader}.${encodedPayload}`;
    const signature: Api_AppStoreConnect_Runner_GetToken_Signature = sign('sha256', Buffer.from(signingInput), {
      dsaEncoding: 'ieee-p1363',
      key: this.#privateKey,
    });

    this.#token = `${signingInput}.${signature.toString('base64url')}`;
    this.#tokenExpiresAt = expiresAt;

    return this.#token;
  }

  /**
   * API - App Store Connect - Pause API Operations.
   *
   * Extends the shared limiter pause without shortening a longer pause already
   * established by another response in the same concurrent batch.
   *
   * @param {Api_AppStoreConnect_Runner_PauseApiOperations_DelayMilliseconds} delayMilliseconds - Delay milliseconds.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_PauseApiOperations_Returns}
   *
   * @since 0.39.0
   */
  private pauseApiOperations(delayMilliseconds: Api_AppStoreConnect_Runner_PauseApiOperations_DelayMilliseconds): Api_AppStoreConnect_Runner_PauseApiOperations_Returns {
    const pausedUntil: Api_AppStoreConnect_Runner_PauseApiOperations_PausedUntil = Date.now() + delayMilliseconds;

    this.#apiOperationsPausedUntil = Math.max(this.#apiOperationsPausedUntil, pausedUntil);

    return;
  }

  /**
   * API - App Store Connect - Release API Operation.
   *
   * Returns one fetch slot and resumes the oldest queued operation without
   * allowing a newly arriving request to bypass that queue.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_ReleaseApiOperation_Returns}
   *
   * @since 0.39.0
   */
  private releaseApiOperation(): Api_AppStoreConnect_Runner_ReleaseApiOperation_Returns {
    this.#activeApiOperations -= 1;

    const resume: Api_AppStoreConnect_Runner_ReleaseApiOperation_Resume = this.#apiOperationQueue.shift();

    if (resume === undefined) {
      return;
    }

    this.#activeApiOperations += 1;

    resume();

    return;
  }

  /**
   * API - App Store Connect - Retry After Delay.
   *
   * Parses both delay-seconds and HTTP-date retry-after values without shortening
   * Apple's explicit cool-down instruction.
   *
   * @param {Api_AppStoreConnect_Runner_RetryAfterDelay_Response} response - Response.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_RetryAfterDelay_Returns}
   *
   * @since 0.39.0
   */
  private static retryAfterDelay(response: Api_AppStoreConnect_Runner_RetryAfterDelay_Response): Api_AppStoreConnect_Runner_RetryAfterDelay_Returns {
    const value: Api_AppStoreConnect_Runner_RetryAfterDelay_Value = response.headers.get('retry-after');

    if (value === null || value === '') {
      return undefined;
    }

    const seconds: Api_AppStoreConnect_Runner_RetryAfterDelay_Seconds = Number(value);

    if (Number.isFinite(seconds) === true && seconds >= 0) {
      return seconds * 1000;
    }

    const date: Api_AppStoreConnect_Runner_RetryAfterDelay_Date = Date.parse(value);

    if (Number.isFinite(date) === false) {
      return undefined;
    }

    return Math.max(0, date - Date.now());
  }

  /**
   * API - App Store Connect - Request Error.
   *
   * Marks a transport error with the create-ambiguity signal consumed by the
   * screenshot and placement reconciliation boundaries.
   *
   * @param {Api_AppStoreConnect_Runner_RequestError_Message}         message         - Message.
   * @param {Api_AppStoreConnect_Runner_RequestError_AmbiguousCreate} ambiguousCreate - Ambiguous create.
   * @param {Api_AppStoreConnect_Runner_RequestError_Cause}           cause           - Cause.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_RequestError_Returns}
   *
   * @since 0.39.0
   */
  private static requestError(message: Api_AppStoreConnect_Runner_RequestError_Message, ambiguousCreate: Api_AppStoreConnect_Runner_RequestError_AmbiguousCreate, cause: Api_AppStoreConnect_Runner_RequestError_Cause = undefined): Api_AppStoreConnect_Runner_RequestError_Returns {
    const error: Api_AppStoreConnect_Runner_RequestError_Error = (cause === undefined) ? new Error(message) : new Error(message, { cause });

    Reflect.set(error, 'appStoreConnectAmbiguousCreate', ambiguousCreate);

    return error;
  }

  /**
   * API - App Store Connect - Retry Decision.
   *
   * Applies one retry budget and delay policy to authenticated JSON requests
   * and signed upload operations, including jitter and retry-after handling.
   *
   * @param {Api_AppStoreConnect_Runner_RetryDecision_Response}                 response                 - Response.
   * @param {Api_AppStoreConnect_Runner_RetryDecision_Attempt}                  attempt                  - Attempt.
   * @param {Api_AppStoreConnect_Runner_RetryDecision_MaximumAttempts}          maximumAttempts          - Maximum attempts.
   * @param {Api_AppStoreConnect_Runner_RetryDecision_MaximumDelayMilliseconds} maximumDelayMilliseconds - Maximum delay milliseconds.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_RetryDecision_Returns}
   *
   * @since 0.39.0
   */
  private static retryDecision(response: Api_AppStoreConnect_Runner_RetryDecision_Response, attempt: Api_AppStoreConnect_Runner_RetryDecision_Attempt, maximumAttempts: Api_AppStoreConnect_Runner_RetryDecision_MaximumAttempts, maximumDelayMilliseconds: Api_AppStoreConnect_Runner_RetryDecision_MaximumDelayMilliseconds): Api_AppStoreConnect_Runner_RetryDecision_Returns {
    if (
      response !== undefined
      && response.status !== 429
      && response.status < 500
    ) {
      return undefined;
    }

    if (attempt >= maximumAttempts) {
      return undefined;
    }

    if (response !== undefined) {
      const retryAfterDelay: Api_AppStoreConnect_Runner_RetryDecision_RetryAfterDelay = Runner.retryAfterDelay(response);

      if (retryAfterDelay !== undefined) {
        return { delayMilliseconds: retryAfterDelay };
      }
    }

    const exponentialDelay: Api_AppStoreConnect_Runner_RetryDecision_ExponentialDelay = Math.min(initialRetryDelayMilliseconds * Math.pow(2, attempt - 1), maximumDelayMilliseconds);
    const jitterMultiplier: Api_AppStoreConnect_Runner_RetryDecision_JitterMultiplier = 0.5 + (Math.random() * 0.5);

    return { delayMilliseconds: Math.floor(exponentialDelay * jitterMultiplier) };
  }

  /**
   * API - App Store Connect - Run Operation Batch.
   *
   * Executes one bounded slice, preserves source order, and recurses only after
   * every operation settles successfully.
   *
   * @param {Api_AppStoreConnect_Runner_RunOperationBatch_Items<Item>}             items     - Items.
   * @param {Api_AppStoreConnect_Runner_RunOperationBatch_Operation<Item, Result>} operation - Operation.
   * @param {Api_AppStoreConnect_Runner_RunOperationBatch_Results<Result>}         results   - Results.
   * @param {Api_AppStoreConnect_Runner_RunOperationBatch_Offset}                  offset    - Offset.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_RunOperationBatch_Returns}
   *
   * @since 0.39.0
   */
  private static async runOperationBatch<Item, Result>(items: Api_AppStoreConnect_Runner_RunOperationBatch_Items<Item>, operation: Api_AppStoreConnect_Runner_RunOperationBatch_Operation<Item, Result>, results: Api_AppStoreConnect_Runner_RunOperationBatch_Results<Result>, offset: Api_AppStoreConnect_Runner_RunOperationBatch_Offset): Api_AppStoreConnect_Runner_RunOperationBatch_Returns {
    if (offset >= items.length) {
      return;
    }

    const batchItems: Api_AppStoreConnect_Runner_RunOperationBatch_BatchItems<Item> = items.slice(offset, offset + maximumConcurrentApiOperations);
    const batchPromises: Api_AppStoreConnect_Runner_RunOperationBatch_BatchPromises<Result> = batchItems.map((item, index) => operation(item, offset + index));
    const batchResults: Api_AppStoreConnect_Runner_RunOperationBatch_BatchResults<Result> = await Promise.allSettled(batchPromises);
    const rejectedResults: Api_AppStoreConnect_Runner_RunOperationBatch_RejectedResults = batchResults.filter((batchResult) => batchResult.status === 'rejected');

    for (const batchResult of batchResults) {
      if (batchResult.status === 'fulfilled') {
        results.push(batchResult.value);
      }
    }

    if (rejectedResults.length > 0) {
      const errors: Api_AppStoreConnect_Runner_RunOperationBatch_Errors = rejectedResults.map((rejectedResult) => rejectedResult.reason);

      throw new AggregateError(errors, `${rejectedResults.length} App Store Connect operation(s) failed after every in-flight operation finished.`);
    }

    await Runner.runOperationBatch(items, operation, results, offset + batchItems.length);

    return;
  }
}

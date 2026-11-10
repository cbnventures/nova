import type { vi } from 'vitest';

import type { Runner as ApiAppStoreConnect } from '../../../api/app-store-connect.js';

import type { Shared_AppStoreConnectResource } from '../../shared.d.ts';

/**
 * Tests - API - App Store Connect - API App Store Connect Request - Honors Retry After Before Retrying.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_HonorsRetryAfterBeforeRetrying_CallCount = number;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_HonorsRetryAfterBeforeRetrying_RequestPromise = Promise<Shared_AppStoreConnectResource | undefined>;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_HonorsRetryAfterBeforeRetrying_Result = Shared_AppStoreConnectResource | undefined;

/**
 * Tests - API - App Store Connect - API App Store Connect Request - Marks Any POST Transport Failure As Ambiguous.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAnyPOSTTransportFailureAsAmbiguous_Client = ApiAppStoreConnect;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAnyPOSTTransportFailureAsAmbiguous_ValidateError = (error: unknown) => boolean;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAnyPOSTTransportFailureAsAmbiguous_ValidateError_ReceivedError = unknown;

/**
 * Tests - API - App Store Connect - API App Store Connect Request - Marks A POST Success Body Read Failure As Ambiguous.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAPOSTSuccessBodyReadFailureAsAmbiguous_Client = ApiAppStoreConnect;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAPOSTSuccessBodyReadFailureAsAmbiguous_ValidateError = (error: unknown) => boolean;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAPOSTSuccessBodyReadFailureAsAmbiguous_ValidateError_ReceivedError = unknown;

/**
 * Tests - API - App Store Connect - API App Store Connect Request - Pauses The Whole Limiter After A 429.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_PausesTheWholeLimiterAfterA429_CallCount = number;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_PausesTheWholeLimiterAfterA429_Client = ApiAppStoreConnect;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_PausesTheWholeLimiterAfterA429_Requests = Promise<(Shared_AppStoreConnectResource | undefined)>[];

/**
 * Tests - API - App Store Connect - API App Store Connect Request - Retried Delete Treats A 404 As Success.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriedDELETETreatsA404AsSuccess_CallCount = number;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriedDELETETreatsA404AsSuccess_Client = ApiAppStoreConnect;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriedDELETETreatsA404AsSuccess_DeletePromise = Promise<void>;

/**
 * Tests - API - App Store Connect - API App Store Connect Request - Retries A 429 Storm Until It Succeeds.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriesA429StormUntilItSucceeds_CallCount = number;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriesA429StormUntilItSucceeds_RequestPromise = Promise<Shared_AppStoreConnectResource | undefined>;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriesA429StormUntilItSucceeds_Result = Shared_AppStoreConnectResource | undefined;

/**
 * Tests - API - App Store Connect - API App Store Connect Request - Says Rate Limit Exhaustion Is Safe To Resume After The Extended Cooldown.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SaysRateLimitExhaustionIsSafeToResumeAfterTheExtendedCooldown_CallCount = number;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SaysRateLimitExhaustionIsSafeToResumeAfterTheExtendedCooldown_Request = Promise<Shared_AppStoreConnectResource | undefined>;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SaysRateLimitExhaustionIsSafeToResumeAfterTheExtendedCooldown_Assertion = Promise<void>;

/**
 * Tests - API - App Store Connect - API App Store Connect Request - Slows Down For A Low Rate Budget.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_CallCount = number;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_Client = ApiAppStoreConnect;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_FirstRequest = Promise<Shared_AppStoreConnectResource | undefined>;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_SecondRequest = Promise<Shared_AppStoreConnectResource | undefined>;

/**
 * Tests - API - App Store Connect - API App Store Connect Run Operations - Never Exceeds The Concurrency Limit.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_NeverExceedsTheConcurrencyLimit_Active = number;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_NeverExceedsTheConcurrencyLimit_Items = number[];

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_NeverExceedsTheConcurrencyLimit_MaxInFlight = number;

/**
 * Tests - API - App Store Connect - API App Store Connect Run Operations - Reports Every Failure.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_ReportsEveryFailure_Finished = string[];

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_ReportsEveryFailure_ValidateAggregateError = (error: unknown) => boolean;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_ReportsEveryFailure_ValidateAggregateError_ReceivedError = unknown;

/**
 * Tests - API - App Store Connect - API App Store Connect Upload Asset Library Image - Reuses A Ready Checksum Named Image.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_File = Buffer;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_Checksum = string;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_ReferenceName = string;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_FetchSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_Result = Shared_AppStoreConnectResource;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_FetchCall = Parameters<typeof fetch> | undefined;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_RequestUrl = URL;

/**
 * Tests - API - App Store Connect - API App Store Connect Upload Screenshot - Applies The Rate Limit Policy To Chunk Uploads.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_CallCount = number;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_ChunkAttempts = number;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Committed = boolean;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Url = URL;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Method = string;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_UploadPromise = Promise<Shared_AppStoreConnectResource>;

export type Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Result = Shared_AppStoreConnectResource;

/**
 * Tests - API - App Store Connect - Create Client.
 *
 * @since 0.39.0
 */
export type Tests_Api_AppStoreConnect_CreateClient_Returns = ApiAppStoreConnect;

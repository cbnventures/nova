import type { KeyObject } from 'node:crypto';

import type {
  Shared_AppStoreConnectCredentials,
  Shared_AppStoreConnectRequestOptions,
  Shared_AppStoreConnectResource,
} from '../shared.d.ts';

/**
 * API - App Store Connect - Issuer ID.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_IssuerId = string | undefined;

export type Api_AppStoreConnect_Runner_KeyId = string;

export type Api_AppStoreConnect_Runner_PrivateKey = KeyObject;

export type Api_AppStoreConnect_Runner_Token = string | undefined;

export type Api_AppStoreConnect_Runner_TokenExpiresAt = number;

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

export type Api_AppStoreConnect_Runner_CreateLocalization_Response = Shared_AppStoreConnectResource | undefined;

/**
 * API - App Store Connect - Create Screenshot Set.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_CreateScreenshotSet_LocalizationId = string;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_DisplayType = string;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_CreateScreenshotSet_Response = Shared_AppStoreConnectResource | undefined;

/**
 * API - App Store Connect - Delete Resource.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_DeleteResource_ResourceType = string;

export type Api_AppStoreConnect_Runner_DeleteResource_Id = string;

export type Api_AppStoreConnect_Runner_DeleteResource_Returns = Promise<void>;

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
 * API - App Store Connect - List Screenshot Sets.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_ListScreenshotSets_LocalizationId = string;

export type Api_AppStoreConnect_Runner_ListScreenshotSets_Returns = Promise<Shared_AppStoreConnectResource[]>;

export type Api_AppStoreConnect_Runner_ListScreenshotSets_Query = URLSearchParams;

/**
 * API - App Store Connect - Reorder Screenshots.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotSetId = string;

export type Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotIds = string[];

export type Api_AppStoreConnect_Runner_ReorderScreenshots_Returns = Promise<void>;

/**
 * API - App Store Connect - Request.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_Request_Path = string;

export type Api_AppStoreConnect_Runner_Request_Options = Shared_AppStoreConnectRequestOptions;

export type Api_AppStoreConnect_Runner_Request_Returns = Promise<Shared_AppStoreConnectResource | undefined>;

export type Api_AppStoreConnect_Runner_Request_Attempt = number;

/**
 * API - App Store Connect - Request Retry Delay.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_RequestRetryDelay_Response = Response;

export type Api_AppStoreConnect_Runner_RequestRetryDelay_Attempt = number;

export type Api_AppStoreConnect_Runner_RequestRetryDelay_Returns = number;

export type Api_AppStoreConnect_Runner_RequestRetryDelay_RetryAfter = number;

/**
 * API - App Store Connect - Request With Attempt.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_RequestWithAttempt_Path = string;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Options = Shared_AppStoreConnectRequestOptions;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Attempt = number;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Returns = Promise<Shared_AppStoreConnectResource | undefined>;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Method = string;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Body = Record<string, unknown> | undefined;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Url = string;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Headers = Record<string, string>;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Response = Response | undefined;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_RequestInit = RequestInit;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ExpectedStatuses = number[];

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseData = unknown;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseText = string;

export type Api_AppStoreConnect_Runner_RequestWithAttempt_Retryable = boolean;

/**
 * API - App Store Connect - Update Localization.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_UpdateLocalization_LocalizationId = string;

export type Api_AppStoreConnect_Runner_UpdateLocalization_Attributes = Record<string, string>;

export type Api_AppStoreConnect_Runner_UpdateLocalization_Returns = Promise<void>;

/**
 * API - App Store Connect - Upload Asset Library Image.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AssetLibraryId = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Category = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReferenceName = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_FileName = string;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_File = Buffer;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Reservation = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Resource = Shared_AppStoreConnectResource;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Attributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Operations = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ResourceId = string;

/**
 * API - App Store Connect - Upload Operation.
 *
 * @since 0.34.0
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

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Attempt = number;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Returns = Promise<void>;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Response = Response | undefined;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseText = string;

export type Api_AppStoreConnect_Runner_UploadOperationAttempt_Retryable = boolean;

/**
 * API - App Store Connect - Upload Screenshot.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_UploadScreenshot_ScreenshotSetId = string;

export type Api_AppStoreConnect_Runner_UploadScreenshot_FileName = string;

export type Api_AppStoreConnect_Runner_UploadScreenshot_File = Buffer;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Returns = Promise<Shared_AppStoreConnectResource>;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Checksum = string;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Reservation = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Resource = Shared_AppStoreConnectResource;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Attributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_UploadScreenshot_Operations = Shared_AppStoreConnectResource[];

export type Api_AppStoreConnect_Runner_UploadScreenshot_ResourceId = string;

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

/**
 * API - App Store Connect - Wait For Screenshot.
 *
 * @since 0.34.0
 */
export type Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotId = string;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_FileName = string;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Attempt = number;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Returns = Promise<void>;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Query = URLSearchParams;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Response = Shared_AppStoreConnectResource | undefined;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Data = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_Attributes = Record<string, unknown>;

export type Api_AppStoreConnect_Runner_WaitForScreenshot_State = Shared_AppStoreConnectResource;

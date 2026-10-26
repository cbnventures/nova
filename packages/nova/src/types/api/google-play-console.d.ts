import type { GoogleAuth } from 'google-auth-library';

import type {
  Shared_GooglePlayConsoleRequestOptions,
  Shared_GooglePlayConsoleResource,
} from '../shared.d.ts';

/**
 * API - Google Play Console - Constructor.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_Auth = GoogleAuth;

export type Api_GooglePlayConsole_Runner_PackageName = string;

/**
 * API - Google Play Console - Commit Edit.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_CommitEdit_EditId = string;

export type Api_GooglePlayConsole_Runner_CommitEdit_Returns = Promise<void>;

export type Api_GooglePlayConsole_Runner_Constructor_PackageName = string;

/**
 * API - Google Play Console - Create Edit.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_CreateEdit_Returns = Promise<string>;

export type Api_GooglePlayConsole_Runner_CreateEdit_Response = Shared_GooglePlayConsoleResource | undefined;

/**
 * API - Google Play Console - Delete Edit.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_DeleteEdit_EditId = string;

export type Api_GooglePlayConsole_Runner_DeleteEdit_Returns = Promise<void>;

/**
 * API - Google Play Console - Delete Images.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_DeleteImages_EditId = string;

export type Api_GooglePlayConsole_Runner_DeleteImages_Locale = string;

export type Api_GooglePlayConsole_Runner_DeleteImages_ImageType = string;

export type Api_GooglePlayConsole_Runner_DeleteImages_Returns = Promise<void>;

/**
 * API - Google Play Console - Edit Path.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_EditPath_EditId = string;

export type Api_GooglePlayConsole_Runner_EditPath_Returns = string;

/**
 * API - Google Play Console - Get Access Token.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_GetAccessToken_Returns = Promise<string>;

export type Api_GooglePlayConsole_Runner_GetAccessToken_Token = string | null | undefined;

/**
 * API - Google Play Console - Request.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_Request_Path = string;

export type Api_GooglePlayConsole_Runner_Request_Options = Shared_GooglePlayConsoleRequestOptions;

export type Api_GooglePlayConsole_Runner_Request_Returns = Promise<Shared_GooglePlayConsoleResource | undefined>;

export type Api_GooglePlayConsole_Runner_Request_Token = string;

export type Api_GooglePlayConsole_Runner_Request_Headers = Record<string, string>;

export type Api_GooglePlayConsole_Runner_Request_RequestInit = RequestInit;

export type Api_GooglePlayConsole_Runner_Request_Response = Response;

export type Api_GooglePlayConsole_Runner_Request_ExpectedStatuses = number[];

export type Api_GooglePlayConsole_Runner_Request_ResponseText = string;

export type Api_GooglePlayConsole_Runner_Request_Data = unknown;

/**
 * API - Google Play Console - Update Listing.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_UpdateListing_EditId = string;

export type Api_GooglePlayConsole_Runner_UpdateListing_Locale = string;

export type Api_GooglePlayConsole_Runner_UpdateListing_Attributes = Record<string, string>;

export type Api_GooglePlayConsole_Runner_UpdateListing_Returns = Promise<void>;

/**
 * API - Google Play Console - Upload Image.
 *
 * @since 0.34.0
 */
export type Api_GooglePlayConsole_Runner_UploadImage_EditId = string;

export type Api_GooglePlayConsole_Runner_UploadImage_Locale = string;

export type Api_GooglePlayConsole_Runner_UploadImage_ImageType = string;

export type Api_GooglePlayConsole_Runner_UploadImage_FileName = string;

export type Api_GooglePlayConsole_Runner_UploadImage_File = Buffer;

export type Api_GooglePlayConsole_Runner_UploadImage_Returns = Promise<void>;

export type Api_GooglePlayConsole_Runner_UploadImage_Boundary = string;

export type Api_GooglePlayConsole_Runner_UploadImage_Metadata = Buffer;

export type Api_GooglePlayConsole_Runner_UploadImage_Prefix = Buffer;

export type Api_GooglePlayConsole_Runner_UploadImage_Suffix = Buffer;

export type Api_GooglePlayConsole_Runner_UploadImage_Body = Buffer;

export type Api_GooglePlayConsole_Runner_UploadImage_Token = string;

export type Api_GooglePlayConsole_Runner_UploadImage_Response = Response;

export type Api_GooglePlayConsole_Runner_UploadImage_ResponseText = string;

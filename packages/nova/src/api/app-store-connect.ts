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

import type {
  Api_AppStoreConnect_Runner_Constructor_Credentials,
  Api_AppStoreConnect_Runner_CreateLocalization_Attributes,
  Api_AppStoreConnect_Runner_CreateLocalization_Locale,
  Api_AppStoreConnect_Runner_CreateLocalization_Response,
  Api_AppStoreConnect_Runner_CreateLocalization_Returns,
  Api_AppStoreConnect_Runner_CreateLocalization_VersionId,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_DisplayType,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_LocalizationId,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_Response,
  Api_AppStoreConnect_Runner_CreateScreenshotSet_Returns,
  Api_AppStoreConnect_Runner_DeleteResource_Id,
  Api_AppStoreConnect_Runner_DeleteResource_ResourceType,
  Api_AppStoreConnect_Runner_DeleteResource_Returns,
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
  Api_AppStoreConnect_Runner_ListScreenshotSets_LocalizationId,
  Api_AppStoreConnect_Runner_ListScreenshotSets_Query,
  Api_AppStoreConnect_Runner_ListScreenshotSets_Returns,
  Api_AppStoreConnect_Runner_PrivateKey,
  Api_AppStoreConnect_Runner_ReorderScreenshots_Returns,
  Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotIds,
  Api_AppStoreConnect_Runner_ReorderScreenshots_ScreenshotSetId,
  Api_AppStoreConnect_Runner_Request_Options,
  Api_AppStoreConnect_Runner_Request_Path,
  Api_AppStoreConnect_Runner_Request_Returns,
  Api_AppStoreConnect_Runner_RequestRetryDelay_Attempt,
  Api_AppStoreConnect_Runner_RequestRetryDelay_Response,
  Api_AppStoreConnect_Runner_RequestRetryDelay_RetryAfter,
  Api_AppStoreConnect_Runner_RequestRetryDelay_Returns,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Attempt,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Body,
  Api_AppStoreConnect_Runner_RequestWithAttempt_ExpectedStatuses,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Headers,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Method,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Options,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Path,
  Api_AppStoreConnect_Runner_RequestWithAttempt_RequestInit,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Response,
  Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseData,
  Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseText,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Retryable,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Returns,
  Api_AppStoreConnect_Runner_RequestWithAttempt_Url,
  Api_AppStoreConnect_Runner_Token,
  Api_AppStoreConnect_Runner_TokenExpiresAt,
  Api_AppStoreConnect_Runner_UpdateLocalization_Attributes,
  Api_AppStoreConnect_Runner_UpdateLocalization_LocalizationId,
  Api_AppStoreConnect_Runner_UpdateLocalization_Returns,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AssetLibraryId,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Attributes,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Category,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_File,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_FileName,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Operations,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReferenceName,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Reservation,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Resource,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ResourceId,
  Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Returns,
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
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Attempt,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_File,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Headers,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Length,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Method,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Offset,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Response,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseText,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Retryable,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Returns,
  Api_AppStoreConnect_Runner_UploadOperationAttempt_Url,
  Api_AppStoreConnect_Runner_UploadScreenshot_Attributes,
  Api_AppStoreConnect_Runner_UploadScreenshot_Checksum,
  Api_AppStoreConnect_Runner_UploadScreenshot_File,
  Api_AppStoreConnect_Runner_UploadScreenshot_FileName,
  Api_AppStoreConnect_Runner_UploadScreenshot_Operations,
  Api_AppStoreConnect_Runner_UploadScreenshot_Reservation,
  Api_AppStoreConnect_Runner_UploadScreenshot_Resource,
  Api_AppStoreConnect_Runner_UploadScreenshot_ResourceId,
  Api_AppStoreConnect_Runner_UploadScreenshot_Returns,
  Api_AppStoreConnect_Runner_UploadScreenshot_ScreenshotSetId,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Attempt,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Attributes,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_FileName,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_ImageId,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Query,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Resource,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Response,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_Returns,
  Api_AppStoreConnect_Runner_WaitForAssetLibraryImage_State,
  Api_AppStoreConnect_Runner_WaitForScreenshot_Attempt,
  Api_AppStoreConnect_Runner_WaitForScreenshot_Attributes,
  Api_AppStoreConnect_Runner_WaitForScreenshot_Data,
  Api_AppStoreConnect_Runner_WaitForScreenshot_FileName,
  Api_AppStoreConnect_Runner_WaitForScreenshot_Query,
  Api_AppStoreConnect_Runner_WaitForScreenshot_Response,
  Api_AppStoreConnect_Runner_WaitForScreenshot_Returns,
  Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotId,
  Api_AppStoreConnect_Runner_WaitForScreenshot_State,
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
 * API - App Store Connect - Maximum Processing Attempts.
 *
 * Caps asynchronous image-processing polls before Nova reports an actionable
 * timeout rather than waiting without an upper bound.
 *
 * @since 0.34.0
 */
const maximumProcessingAttempts = 300;

/**
 * API - App Store Connect - Maximum Request Attempts.
 *
 * Limits transient request and upload retries so repeated vendor failures do
 * not turn one command into an unbounded mutation loop.
 *
 * @since 0.34.0
 */
const maximumRequestAttempts = 5;

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
   * @since 0.34.0
   */
  public async request(path: Api_AppStoreConnect_Runner_Request_Path, options: Api_AppStoreConnect_Runner_Request_Options = {}): Api_AppStoreConnect_Runner_Request_Returns {
    return this.requestWithAttempt(path, options, 1);
  }

  /**
   * API - App Store Connect - Request With Attempt.
   *
   * Sends one authenticated request and recursively retries transient failures
   * without serial-await loops that hide control flow from Nova's lint rules.
   *
   * @param {Api_AppStoreConnect_Runner_RequestWithAttempt_Path}    path    - Path.
   * @param {Api_AppStoreConnect_Runner_RequestWithAttempt_Options} options - Options.
   * @param {Api_AppStoreConnect_Runner_RequestWithAttempt_Attempt} attempt - Attempt.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_RequestWithAttempt_Returns}
   *
   * @since 0.34.0
   */
  private async requestWithAttempt(path: Api_AppStoreConnect_Runner_RequestWithAttempt_Path, options: Api_AppStoreConnect_Runner_RequestWithAttempt_Options, attempt: Api_AppStoreConnect_Runner_RequestWithAttempt_Attempt): Api_AppStoreConnect_Runner_RequestWithAttempt_Returns {
    const method: Api_AppStoreConnect_Runner_RequestWithAttempt_Method = options['method'] ?? 'GET';
    const body: Api_AppStoreConnect_Runner_RequestWithAttempt_Body = options['body'];
    const url: Api_AppStoreConnect_Runner_RequestWithAttempt_Url = (path.startsWith('https://') === true) ? path : `${apiBaseUrl}${path}`;
    const headers: Api_AppStoreConnect_Runner_RequestWithAttempt_Headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`,
    };

    if (body !== undefined) {
      Reflect.set(headers, 'Content-Type', 'application/json');
    }

    let response: Api_AppStoreConnect_Runner_RequestWithAttempt_Response = undefined;
    const requestInit: Api_AppStoreConnect_Runner_RequestWithAttempt_RequestInit = {
      headers,
      method,
      signal: AbortSignal.timeout(apiRequestTimeoutMilliseconds),
    };

    if (body !== undefined) {
      Reflect.set(requestInit, 'body', JSON.stringify(body));
    }

    try {
      response = await fetch(url, requestInit);
    } catch (error) {
      if (attempt === maximumRequestAttempts) {
        throw new Error(`${method} ${url} failed.`, { cause: error });
      }

      await wait((2 ** (attempt - 1)) * 1000);

      return this.requestWithAttempt(path, options, attempt + 1);
    }

    const expectedStatuses: Api_AppStoreConnect_Runner_RequestWithAttempt_ExpectedStatuses = options['expectedStatuses'] ?? [200];

    if (expectedStatuses.includes(response.status) === true) {
      if (response.status === 204) {
        return undefined;
      }

      const responseData: Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseData = await response.json();

      return requireObject(responseData, `Response from ${method} ${url}`);
    }

    const responseText: Api_AppStoreConnect_Runner_RequestWithAttempt_ResponseText = await response.text();
    const retryable: Api_AppStoreConnect_Runner_RequestWithAttempt_Retryable = response.status === 429 || response.status >= 500;

    if (retryable === false || attempt === maximumRequestAttempts) {
      throw new Error(`${method} ${url} failed with HTTP ${response.status}: ${responseText}`);
    }

    await wait(Runner.requestRetryDelay(response, attempt));

    return this.requestWithAttempt(path, options, attempt + 1);
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
    const response: Api_AppStoreConnect_Runner_CreateLocalization_Response = await this.request('/v1/appStoreVersionLocalizations', {
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

    if (response === undefined) {
      throw new Error(`Creating ${locale} App Store localization returned no resource.`);
    }

    return requireObject(response['data'], `Created ${locale} localization`);
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
    const response: Api_AppStoreConnect_Runner_CreateScreenshotSet_Response = await this.request('/v1/appScreenshotSets', {
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

    if (response === undefined) {
      throw new Error(`Creating screenshot set ${displayType} returned no resource.`);
    }

    return requireObject(response['data'], `Created screenshot set ${displayType}`);
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
   * @since 0.34.0
   */
  public async uploadScreenshot(screenshotSetId: Api_AppStoreConnect_Runner_UploadScreenshot_ScreenshotSetId, fileName: Api_AppStoreConnect_Runner_UploadScreenshot_FileName, file: Api_AppStoreConnect_Runner_UploadScreenshot_File): Api_AppStoreConnect_Runner_UploadScreenshot_Returns {
    const checksum: Api_AppStoreConnect_Runner_UploadScreenshot_Checksum = createHash('md5').update(file).digest('hex');
    const reservation: Api_AppStoreConnect_Runner_UploadScreenshot_Reservation = await this.request('/v1/appScreenshots', {
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

    if (reservation === undefined) {
      throw new Error(`Reserving screenshot ${fileName} returned no resource.`);
    }

    const resource: Api_AppStoreConnect_Runner_UploadScreenshot_Resource = requireObject(reservation['data'], `Reserved screenshot ${fileName}`);
    const attributes: Api_AppStoreConnect_Runner_UploadScreenshot_Attributes = requireObject(resource['attributes'], `Reserved screenshot attributes for ${fileName}`);
    const operations: Api_AppStoreConnect_Runner_UploadScreenshot_Operations = requireArray(attributes['uploadOperations'], `Upload operations for ${fileName}`).map((operation) => requireObject(operation, `Upload operation for ${fileName}`));

    if (operations.length === 0) {
      throw new Error(`${fileName} did not receive upload operations.`);
    }

    await Promise.all(operations.map((operation) => this.uploadOperation(operation, file)));

    const resourceId: Api_AppStoreConnect_Runner_UploadScreenshot_ResourceId = requireString(resource['id'], `Reserved screenshot ID for ${fileName}`);

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

    await this.waitForScreenshot(resourceId, fileName);

    return resource;
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
   * @since 0.34.0
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
   * @since 0.34.0
   */
  public async uploadAssetLibraryImage(assetLibraryId: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_AssetLibraryId, category: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Category, referenceName: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_ReferenceName, fileName: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_FileName, file: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_File): Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Returns {
    const reservation: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Reservation = await this.request('/v1/appAssetLibraryImages', {
      body: {
        data: {
          attributes: {
            category,
            fileName,
            fileSize: file.length,
            referenceName,
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

    if (reservation === undefined) {
      throw new Error(`Reserving asset ${fileName} returned no resource.`);
    }

    const resource: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Resource = requireObject(reservation['data'], `Reserved asset ${fileName}`);
    const attributes: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Attributes = requireObject(resource['attributes'], `Reserved asset attributes for ${fileName}`);
    const operations: Api_AppStoreConnect_Runner_UploadAssetLibraryImage_Operations = requireArray(attributes['uploadOperations'], `Upload operations for ${fileName}`).map((operation) => requireObject(operation, `Upload operation for ${fileName}`));

    if (operations.length === 0) {
      throw new Error(`${fileName} did not receive upload operations.`);
    }

    await Promise.all(operations.map((operation) => this.uploadOperation(operation, file)));

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
   * @since 0.34.0
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

    await this.uploadOperationAttempt(url, method, headers, file, offset, length, 1);

    return;
  }

  /**
   * API - App Store Connect - Upload Operation Attempt.
   *
   * Executes one signed byte-range upload and recursively retries only the
   * transient failures allowed by Apple's upload contract.
   *
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Url}     url     - Url.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Method}  method  - Method.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Headers} headers - Headers.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_File}    file    - File.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Offset}  offset  - Offset.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Length}  length  - Length.
   * @param {Api_AppStoreConnect_Runner_UploadOperationAttempt_Attempt} attempt - Attempt.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_UploadOperationAttempt_Returns}
   *
   * @since 0.34.0
   */
  private async uploadOperationAttempt(url: Api_AppStoreConnect_Runner_UploadOperationAttempt_Url, method: Api_AppStoreConnect_Runner_UploadOperationAttempt_Method, headers: Api_AppStoreConnect_Runner_UploadOperationAttempt_Headers, file: Api_AppStoreConnect_Runner_UploadOperationAttempt_File, offset: Api_AppStoreConnect_Runner_UploadOperationAttempt_Offset, length: Api_AppStoreConnect_Runner_UploadOperationAttempt_Length, attempt: Api_AppStoreConnect_Runner_UploadOperationAttempt_Attempt): Api_AppStoreConnect_Runner_UploadOperationAttempt_Returns {
    let response: Api_AppStoreConnect_Runner_UploadOperationAttempt_Response = undefined;

    try {
      response = await fetch(url, {
        body: file.subarray(offset, offset + length),
        headers,
        method,
        signal: AbortSignal.timeout(assetUploadTimeoutMilliseconds),
      });
    } catch (error) {
      if (attempt === maximumRequestAttempts) {
        throw new Error('Asset upload failed.', { cause: error });
      }

      await wait((2 ** (attempt - 1)) * 1000);

      await this.uploadOperationAttempt(url, method, headers, file, offset, length, attempt + 1);

      return;
    }

    if (response.ok === true) {
      return;
    }

    const responseText: Api_AppStoreConnect_Runner_UploadOperationAttempt_ResponseText = await response.text();
    const retryable: Api_AppStoreConnect_Runner_UploadOperationAttempt_Retryable = response.status === 429 || response.status >= 500;

    if (retryable === false || attempt === maximumRequestAttempts) {
      throw new Error(`Asset upload failed with HTTP ${response.status}: ${responseText}`);
    }

    await wait(Runner.requestRetryDelay(response, attempt));

    await this.uploadOperationAttempt(url, method, headers, file, offset, length, attempt + 1);

    return;
  }

  /**
   * API - App Store Connect - Wait For Screenshot.
   *
   * Polls the delivery state until Apple accepts or rejects the uploaded image,
   * allowing the caller to reorder only fully processed screenshots.
   *
   * @param {Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotId} screenshotId - Screenshot id.
   * @param {Api_AppStoreConnect_Runner_WaitForScreenshot_FileName}     fileName     - File name.
   * @param {Api_AppStoreConnect_Runner_WaitForScreenshot_Attempt}      attempt      - Attempt.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_WaitForScreenshot_Returns}
   *
   * @since 0.34.0
   */
  private async waitForScreenshot(screenshotId: Api_AppStoreConnect_Runner_WaitForScreenshot_ScreenshotId, fileName: Api_AppStoreConnect_Runner_WaitForScreenshot_FileName, attempt: Api_AppStoreConnect_Runner_WaitForScreenshot_Attempt = 1): Api_AppStoreConnect_Runner_WaitForScreenshot_Returns {
    const query: Api_AppStoreConnect_Runner_WaitForScreenshot_Query = new URLSearchParams({
      'fields[appScreenshots]': 'assetDeliveryState,fileName,sourceFileChecksum',
    });

    if (attempt > maximumProcessingAttempts) {
      throw new Error(`${fileName} did not finish Apple processing in time.`);
    }

    const response: Api_AppStoreConnect_Runner_WaitForScreenshot_Response = await this.request(`/v1/appScreenshots/${screenshotId}?${query.toString()}`);

    if (response === undefined) {
      throw new Error(`Screenshot ${fileName} returned no processing state.`);
    }

    const data: Api_AppStoreConnect_Runner_WaitForScreenshot_Data = requireObject(response['data'], `Screenshot ${fileName}`);
    const attributes: Api_AppStoreConnect_Runner_WaitForScreenshot_Attributes = requireObject(data['attributes'], `Screenshot attributes for ${fileName}`);
    const state: Api_AppStoreConnect_Runner_WaitForScreenshot_State = requireObject(attributes['assetDeliveryState'], `Screenshot delivery state for ${fileName}`);

    if (state['state'] === 'COMPLETE') {
      return;
    }

    if (state['state'] === 'FAILED') {
      throw new Error(`${fileName} failed Apple processing: ${JSON.stringify(state['errors'] ?? [])}`);
    }

    await wait(2000);

    await this.waitForScreenshot(screenshotId, fileName, attempt + 1);

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

    await wait(2000);

    return this.waitForAssetLibraryImage(imageId, fileName, attempt + 1);
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

    if (this.#token !== undefined && now < this.#tokenExpiresAt - 30) {
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
   * API - App Store Connect - Request Retry Delay.
   *
   * Honors Apple's retry-after response before falling back to bounded
   * exponential backoff for transient errors.
   *
   * @param {Api_AppStoreConnect_Runner_RequestRetryDelay_Response} response - Response.
   * @param {Api_AppStoreConnect_Runner_RequestRetryDelay_Attempt}  attempt  - Attempt.
   *
   * @private
   *
   * @returns {Api_AppStoreConnect_Runner_RequestRetryDelay_Returns}
   *
   * @since 0.34.0
   */
  private static requestRetryDelay(response: Api_AppStoreConnect_Runner_RequestRetryDelay_Response, attempt: Api_AppStoreConnect_Runner_RequestRetryDelay_Attempt): Api_AppStoreConnect_Runner_RequestRetryDelay_Returns {
    const retryAfter: Api_AppStoreConnect_Runner_RequestRetryDelay_RetryAfter = Number.parseInt(response.headers.get('retry-after') ?? '', 10);

    if (Number.isFinite(retryAfter) === true && retryAfter > 0) {
      return retryAfter * 1000;
    }

    return Math.min(1000 * (2 ** (attempt - 1)), 15 * 1000);
  }
}

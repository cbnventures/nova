import { randomUUID } from 'node:crypto';

import { GoogleAuth } from 'google-auth-library';

import {
  requireObject,
  requireString,
} from '../lib/integration.js';

import type {
  Api_GooglePlayConsole_Runner_Auth,
  Api_GooglePlayConsole_Runner_CommitEdit_EditId,
  Api_GooglePlayConsole_Runner_CommitEdit_Returns,
  Api_GooglePlayConsole_Runner_Constructor_PackageName,
  Api_GooglePlayConsole_Runner_CreateEdit_Response,
  Api_GooglePlayConsole_Runner_CreateEdit_Returns,
  Api_GooglePlayConsole_Runner_DeleteEdit_EditId,
  Api_GooglePlayConsole_Runner_DeleteEdit_Returns,
  Api_GooglePlayConsole_Runner_DeleteImages_EditId,
  Api_GooglePlayConsole_Runner_DeleteImages_ImageType,
  Api_GooglePlayConsole_Runner_DeleteImages_Locale,
  Api_GooglePlayConsole_Runner_DeleteImages_Returns,
  Api_GooglePlayConsole_Runner_EditPath_EditId,
  Api_GooglePlayConsole_Runner_EditPath_Returns,
  Api_GooglePlayConsole_Runner_GetAccessToken_Returns,
  Api_GooglePlayConsole_Runner_GetAccessToken_Token,
  Api_GooglePlayConsole_Runner_PackageName,
  Api_GooglePlayConsole_Runner_Request_Data,
  Api_GooglePlayConsole_Runner_Request_ExpectedStatuses,
  Api_GooglePlayConsole_Runner_Request_Headers,
  Api_GooglePlayConsole_Runner_Request_Options,
  Api_GooglePlayConsole_Runner_Request_Path,
  Api_GooglePlayConsole_Runner_Request_RequestInit,
  Api_GooglePlayConsole_Runner_Request_Response,
  Api_GooglePlayConsole_Runner_Request_ResponseText,
  Api_GooglePlayConsole_Runner_Request_Returns,
  Api_GooglePlayConsole_Runner_Request_Token,
  Api_GooglePlayConsole_Runner_UpdateListing_Attributes,
  Api_GooglePlayConsole_Runner_UpdateListing_EditId,
  Api_GooglePlayConsole_Runner_UpdateListing_Locale,
  Api_GooglePlayConsole_Runner_UpdateListing_Returns,
  Api_GooglePlayConsole_Runner_UploadImage_Body,
  Api_GooglePlayConsole_Runner_UploadImage_Boundary,
  Api_GooglePlayConsole_Runner_UploadImage_EditId,
  Api_GooglePlayConsole_Runner_UploadImage_File,
  Api_GooglePlayConsole_Runner_UploadImage_FileName,
  Api_GooglePlayConsole_Runner_UploadImage_ImageType,
  Api_GooglePlayConsole_Runner_UploadImage_Locale,
  Api_GooglePlayConsole_Runner_UploadImage_Metadata,
  Api_GooglePlayConsole_Runner_UploadImage_Prefix,
  Api_GooglePlayConsole_Runner_UploadImage_Response,
  Api_GooglePlayConsole_Runner_UploadImage_ResponseText,
  Api_GooglePlayConsole_Runner_UploadImage_Returns,
  Api_GooglePlayConsole_Runner_UploadImage_Suffix,
  Api_GooglePlayConsole_Runner_UploadImage_Token,
} from '../types/api/google-play-console.d.ts';

/**
 * API - Google Play Console.
 *
 * Wraps the official Android Publisher edits API and authenticates exclusively
 * through Google Application Default Credentials.
 *
 * @since 0.34.0
 */
export class Runner {
  /**
   * API - Google Play Console - Authentication.
   *
   * Resolves official Application Default Credentials only when a request needs
   * an access token, keeping secrets outside Nova configuration and storage.
   *
   * @private
   *
   * @since 0.34.0
   */
  readonly #auth: Api_GooglePlayConsole_Runner_Auth;

  /**
   * API - Google Play Console - Package Name.
   *
   * Scopes every edit and image request to the selected Android application.
   * The value is encoded before it becomes part of a Google API URL.
   *
   * @private
   *
   * @since 0.34.0
   */
  readonly #packageName: Api_GooglePlayConsole_Runner_PackageName;

  /**
   * API - Google Play Console - Constructor.
   *
   * Prepares an ADC-backed client for one Android application without reading a
   * credential early. Authentication begins only after plan confirmation.
   *
   * @param {Api_GooglePlayConsole_Runner_Constructor_PackageName} packageName - Package name.
   *
   * @since 0.34.0
   */
  public constructor(packageName: Api_GooglePlayConsole_Runner_Constructor_PackageName) {
    this.#auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });
    this.#packageName = packageName;

    return;
  }

  /**
   * API - Google Play Console - Create Edit.
   *
   * Opens the transactional edit required by every Android Publisher mutation.
   * No listing or image change is applied outside this edit boundary.
   *
   * @returns {Api_GooglePlayConsole_Runner_CreateEdit_Returns}
   *
   * @since 0.34.0
   */
  public async createEdit(): Api_GooglePlayConsole_Runner_CreateEdit_Returns {
    const response: Api_GooglePlayConsole_Runner_CreateEdit_Response = await this.request('/edits', {
      body: {},
      expectedStatuses: [200],
      method: 'POST',
    });

    if (response === undefined) {
      throw new Error('Google Play created an empty edit response.');
    }

    return requireString(response['id'], 'Google Play edit ID');
  }

  /**
   * API - Google Play Console - Delete Edit.
   *
   * Abandons a failed edit so partial local plans are never committed later.
   * This keeps retries isolated from an earlier incomplete operation.
   *
   * @param {Api_GooglePlayConsole_Runner_DeleteEdit_EditId} editId - Edit id.
   *
   * @returns {Api_GooglePlayConsole_Runner_DeleteEdit_Returns}
   *
   * @since 0.34.0
   */
  public async deleteEdit(editId: Api_GooglePlayConsole_Runner_DeleteEdit_EditId): Api_GooglePlayConsole_Runner_DeleteEdit_Returns {
    await this.request(this.editPath(editId), {
      expectedStatuses: [204],
      method: 'DELETE',
    });

    return;
  }

  /**
   * API - Google Play Console - Commit Edit.
   *
   * Atomically applies every successful mutation in the current local plan.
   * Google validates the complete edit before making it live.
   *
   * @param {Api_GooglePlayConsole_Runner_CommitEdit_EditId} editId - Edit id.
   *
   * @returns {Api_GooglePlayConsole_Runner_CommitEdit_Returns}
   *
   * @since 0.34.0
   */
  public async commitEdit(editId: Api_GooglePlayConsole_Runner_CommitEdit_EditId): Api_GooglePlayConsole_Runner_CommitEdit_Returns {
    await this.request(`${this.editPath(editId)}:commit`, {
      body: {},
      expectedStatuses: [200],
      method: 'POST',
    });

    return;
  }

  /**
   * API - Google Play Console - Update Listing.
   *
   * Replaces only one explicitly supplied locale inside the active edit.
   * Local null placeholders never reach this request.
   *
   * @param {Api_GooglePlayConsole_Runner_UpdateListing_EditId}     editId     - Edit id.
   * @param {Api_GooglePlayConsole_Runner_UpdateListing_Locale}     locale     - Locale.
   * @param {Api_GooglePlayConsole_Runner_UpdateListing_Attributes} attributes - Attributes.
   *
   * @returns {Api_GooglePlayConsole_Runner_UpdateListing_Returns}
   *
   * @since 0.34.0
   */
  public async updateListing(editId: Api_GooglePlayConsole_Runner_UpdateListing_EditId, locale: Api_GooglePlayConsole_Runner_UpdateListing_Locale, attributes: Api_GooglePlayConsole_Runner_UpdateListing_Attributes): Api_GooglePlayConsole_Runner_UpdateListing_Returns {
    await this.request(`${this.editPath(editId)}/listings/${encodeURIComponent(locale)}`, {
      body: attributes,
      expectedStatuses: [200],
      method: 'PUT',
    });

    return;
  }

  /**
   * API - Google Play Console - Delete Images.
   *
   * Clears one explicit locale and vendor image type before ordered re-upload.
   * Image types absent from the local plan remain untouched.
   *
   * @param {Api_GooglePlayConsole_Runner_DeleteImages_EditId}    editId    - Edit id.
   * @param {Api_GooglePlayConsole_Runner_DeleteImages_Locale}    locale    - Locale.
   * @param {Api_GooglePlayConsole_Runner_DeleteImages_ImageType} imageType - Image type.
   *
   * @returns {Api_GooglePlayConsole_Runner_DeleteImages_Returns}
   *
   * @since 0.34.0
   */
  public async deleteImages(editId: Api_GooglePlayConsole_Runner_DeleteImages_EditId, locale: Api_GooglePlayConsole_Runner_DeleteImages_Locale, imageType: Api_GooglePlayConsole_Runner_DeleteImages_ImageType): Api_GooglePlayConsole_Runner_DeleteImages_Returns {
    await this.request(`${this.editPath(editId)}/listings/${encodeURIComponent(locale)}/${encodeURIComponent(imageType)}`, {
      expectedStatuses: [200],
      method: 'DELETE',
    });

    return;
  }

  /**
   * API - Google Play Console - Upload Image.
   *
   * Sends one local image through Google's official multipart upload endpoint.
   * The local filename is retained as upload metadata for traceability.
   *
   * @param {Api_GooglePlayConsole_Runner_UploadImage_EditId}    editId    - Edit id.
   * @param {Api_GooglePlayConsole_Runner_UploadImage_Locale}    locale    - Locale.
   * @param {Api_GooglePlayConsole_Runner_UploadImage_ImageType} imageType - Image type.
   * @param {Api_GooglePlayConsole_Runner_UploadImage_FileName}  fileName  - File name.
   * @param {Api_GooglePlayConsole_Runner_UploadImage_File}      file      - File.
   *
   * @returns {Api_GooglePlayConsole_Runner_UploadImage_Returns}
   *
   * @since 0.34.0
   */
  public async uploadImage(editId: Api_GooglePlayConsole_Runner_UploadImage_EditId, locale: Api_GooglePlayConsole_Runner_UploadImage_Locale, imageType: Api_GooglePlayConsole_Runner_UploadImage_ImageType, fileName: Api_GooglePlayConsole_Runner_UploadImage_FileName, file: Api_GooglePlayConsole_Runner_UploadImage_File): Api_GooglePlayConsole_Runner_UploadImage_Returns {
    const boundary: Api_GooglePlayConsole_Runner_UploadImage_Boundary = `nova-${randomUUID()}`;
    const metadata: Api_GooglePlayConsole_Runner_UploadImage_Metadata = Buffer.from(JSON.stringify({ name: fileName }));
    const prefix: Api_GooglePlayConsole_Runner_UploadImage_Prefix = Buffer.concat([
      Buffer.from([
        `--${boundary}`,
        'Content-Type: application/json; charset=UTF-8',
        '',
        '',
      ].join('\r\n')),
      metadata,
      Buffer.from([
        '',
        `--${boundary}`,
        'Content-Type: application/octet-stream',
        '',
        '',
      ].join('\r\n')),
    ]);
    const suffix: Api_GooglePlayConsole_Runner_UploadImage_Suffix = Buffer.from([
      '',
      `--${boundary}--`,
      '',
    ].join('\r\n'));
    const body: Api_GooglePlayConsole_Runner_UploadImage_Body = Buffer.concat([
      prefix,
      file,
      suffix,
    ]);
    const token: Api_GooglePlayConsole_Runner_UploadImage_Token = await this.getAccessToken();
    const response: Api_GooglePlayConsole_Runner_UploadImage_Response = await fetch(`https://androidpublisher.googleapis.com/upload/androidpublisher/v3/applications/${encodeURIComponent(this.#packageName)}/edits/${encodeURIComponent(editId)}/listings/${encodeURIComponent(locale)}/${encodeURIComponent(imageType)}?uploadType=multipart`, {
      body,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Length': String(body.length),
        'Content-Type': `multipart/related; boundary=${boundary}`,
      },
      method: 'POST',
    });

    if (response.status !== 200) {
      const responseText: Api_GooglePlayConsole_Runner_UploadImage_ResponseText = await response.text();

      throw new Error(`Google Play image upload failed (${response.status}): ${responseText}`);
    }

    return;
  }

  /**
   * API - Google Play Console - Request.
   *
   * Applies bearer authentication and validates response status and JSON shape.
   * Errors include Google's response text without exposing credentials.
   *
   * @param {Api_GooglePlayConsole_Runner_Request_Path}    path    - Path.
   * @param {Api_GooglePlayConsole_Runner_Request_Options} options - Options.
   *
   * @private
   *
   * @returns {Api_GooglePlayConsole_Runner_Request_Returns}
   *
   * @since 0.34.0
   */
  private async request(path: Api_GooglePlayConsole_Runner_Request_Path, options: Api_GooglePlayConsole_Runner_Request_Options = {}): Api_GooglePlayConsole_Runner_Request_Returns {
    const token: Api_GooglePlayConsole_Runner_Request_Token = await this.getAccessToken();
    const headers: Api_GooglePlayConsole_Runner_Request_Headers = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    };

    if (options['body'] !== undefined) {
      Reflect.set(headers, 'Content-Type', 'application/json');
    }

    const requestInit: Api_GooglePlayConsole_Runner_Request_RequestInit = {
      headers,
      method: options['method'] ?? 'GET',
    };

    if (options['body'] !== undefined) {
      Reflect.set(requestInit, 'body', JSON.stringify(options['body']));
    }

    const response: Api_GooglePlayConsole_Runner_Request_Response = await fetch(`https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${encodeURIComponent(this.#packageName)}${path}`, requestInit);
    const expectedStatuses: Api_GooglePlayConsole_Runner_Request_ExpectedStatuses = options['expectedStatuses'] ?? [200];

    if (expectedStatuses.includes(response.status) === false) {
      const responseText: Api_GooglePlayConsole_Runner_Request_ResponseText = await response.text();

      throw new Error(`Google Play request failed (${response.status}): ${responseText}`);
    }

    if (response.status === 204) {
      return undefined;
    }

    const data: Api_GooglePlayConsole_Runner_Request_Data = await response.json();

    return requireObject(data, 'Google Play response');
  }

  /**
   * API - Google Play Console - Get Access Token.
   *
   * Resolves a short-lived token through Google's official ADC search order.
   * Nova does not accept or persist alternate credential paths.
   *
   * @private
   *
   * @returns {Api_GooglePlayConsole_Runner_GetAccessToken_Returns}
   *
   * @since 0.34.0
   */
  private async getAccessToken(): Api_GooglePlayConsole_Runner_GetAccessToken_Returns {
    const token: Api_GooglePlayConsole_Runner_GetAccessToken_Token = await this.#auth.getAccessToken();

    return requireString(token, 'Google Application Default Credentials access token');
  }

  /**
   * API - Google Play Console - Edit Path.
   *
   * Centralizes the encoded application edit path shared by all mutations.
   * This prevents individual methods from constructing divergent endpoints.
   *
   * @param {Api_GooglePlayConsole_Runner_EditPath_EditId} editId - Edit id.
   *
   * @private
   *
   * @returns {Api_GooglePlayConsole_Runner_EditPath_Returns}
   *
   * @since 0.34.0
   */
  private editPath(editId: Api_GooglePlayConsole_Runner_EditPath_EditId): Api_GooglePlayConsole_Runner_EditPath_Returns {
    return `/edits/${encodeURIComponent(editId)}`;
  }
}

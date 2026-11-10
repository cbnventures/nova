import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

import {
  libSchemaDockerHubCategories,
  libSchemaDockerHubCredentialHelperResponse,
  libSchemaDockerHubDockerConfig,
  libSchemaDockerHubLoginResponse,
  libSchemaDockerHubRepository,
} from '../lib/schema.js';
import { Logger } from '../toolkit/index.js';

import type {
  Api_DockerHub_ApiUrl,
  Api_DockerHub_CredentialServer,
  Api_DockerHub_RegistryKeys,
  Api_DockerHub_Runner_Categories,
  Api_DockerHub_Runner_FetchCategories_Message,
  Api_DockerHub_Runner_FetchCategories_Parsed,
  Api_DockerHub_Runner_FetchCategories_Response,
  Api_DockerHub_Runner_FetchCategories_ResponseData,
  Api_DockerHub_Runner_FetchCategories_Returns,
  Api_DockerHub_Runner_FindCredentials_Auth,
  Api_DockerHub_Runner_FindCredentials_Config,
  Api_DockerHub_Runner_FindCredentials_ConfigDirectory,
  Api_DockerHub_Runner_FindCredentials_ConfigPath,
  Api_DockerHub_Runner_FindCredentials_ConfigResult,
  Api_DockerHub_Runner_FindCredentials_Credentials,
  Api_DockerHub_Runner_FindCredentials_DecodedAuth,
  Api_DockerHub_Runner_FindCredentials_DockerConfigDirectory,
  Api_DockerHub_Runner_FindCredentials_Helper,
  Api_DockerHub_Runner_FindCredentials_HelperCandidates,
  Api_DockerHub_Runner_FindCredentials_ParsedConfig,
  Api_DockerHub_Runner_FindCredentials_RawConfig,
  Api_DockerHub_Runner_FindCredentials_Returns,
  Api_DockerHub_Runner_FindCredentials_Secret,
  Api_DockerHub_Runner_FindCredentials_SeparatorIndex,
  Api_DockerHub_Runner_FindCredentials_Username,
  Api_DockerHub_Runner_GetRepository_Namespace,
  Api_DockerHub_Runner_GetRepository_Parsed,
  Api_DockerHub_Runner_GetRepository_Repository,
  Api_DockerHub_Runner_GetRepository_Response,
  Api_DockerHub_Runner_GetRepository_Returns,
  Api_DockerHub_Runner_GetRepository_Token,
  Api_DockerHub_Runner_Login_Credentials,
  Api_DockerHub_Runner_Login_Message,
  Api_DockerHub_Runner_Login_Parsed,
  Api_DockerHub_Runner_Login_Response,
  Api_DockerHub_Runner_Login_ResponseData,
  Api_DockerHub_Runner_Login_Returns,
  Api_DockerHub_Runner_Populated,
  Api_DockerHub_Runner_ReadCredentialHelper_Command,
  Api_DockerHub_Runner_ReadCredentialHelper_Data,
  Api_DockerHub_Runner_ReadCredentialHelper_Helper,
  Api_DockerHub_Runner_ReadCredentialHelper_Parsed,
  Api_DockerHub_Runner_ReadCredentialHelper_Result,
  Api_DockerHub_Runner_ReadCredentialHelper_Returns,
  Api_DockerHub_Runner_Request_Body,
  Api_DockerHub_Runner_Request_Message,
  Api_DockerHub_Runner_Request_Method,
  Api_DockerHub_Runner_Request_Path,
  Api_DockerHub_Runner_Request_RequestInit,
  Api_DockerHub_Runner_Request_Response,
  Api_DockerHub_Runner_Request_ResponseBody,
  Api_DockerHub_Runner_Request_Returns,
  Api_DockerHub_Runner_Request_Token,
  Api_DockerHub_Runner_ResetForTesting_Returns,
  Api_DockerHub_Runner_UpdateCategories_Categories,
  Api_DockerHub_Runner_UpdateCategories_Namespace,
  Api_DockerHub_Runner_UpdateCategories_Repository,
  Api_DockerHub_Runner_UpdateCategories_Returns,
  Api_DockerHub_Runner_UpdateCategories_Token,
  Api_DockerHub_Runner_UpdateIdentity_Body,
  Api_DockerHub_Runner_UpdateIdentity_Description,
  Api_DockerHub_Runner_UpdateIdentity_FullDescription,
  Api_DockerHub_Runner_UpdateIdentity_Namespace,
  Api_DockerHub_Runner_UpdateIdentity_Repository,
  Api_DockerHub_Runner_UpdateIdentity_Returns,
  Api_DockerHub_Runner_UpdateIdentity_Token,
  Api_DockerHub_Runner_UpdateImmutableTags_Enabled,
  Api_DockerHub_Runner_UpdateImmutableTags_Namespace,
  Api_DockerHub_Runner_UpdateImmutableTags_Repository,
  Api_DockerHub_Runner_UpdateImmutableTags_Returns,
  Api_DockerHub_Runner_UpdateImmutableTags_Rules,
  Api_DockerHub_Runner_UpdateImmutableTags_Token,
  Api_DockerHub_Runner_UpdatePrivacy_IsPrivate,
  Api_DockerHub_Runner_UpdatePrivacy_Namespace,
  Api_DockerHub_Runner_UpdatePrivacy_Repository,
  Api_DockerHub_Runner_UpdatePrivacy_Returns,
  Api_DockerHub_Runner_UpdatePrivacy_Token,
} from '../types/api/docker-hub.d.ts';

/**
 * API - Docker Hub - API URL.
 *
 * Defines the stable base URL for Docker Hub v2 API requests.
 * Keeping it centralized prevents endpoint wrappers from drifting.
 *
 * @since 0.40.0
 */
const apiUrl: Api_DockerHub_ApiUrl = 'https://hub.docker.com/v2';

/**
 * API - Docker Hub - Credential Server.
 *
 * Identifies Docker Hub in Docker's credential-helper protocol.
 * Docker config lookup and helper stdin must use this exact value.
 *
 * @since 0.40.0
 */
const credentialServer: Api_DockerHub_CredentialServer = 'https://index.docker.io/v1/';

/**
 * API - Docker Hub - Registry Keys.
 *
 * Lists Docker's supported credential-helper keys in lookup order.
 * The short hostname takes precedence over the legacy URL.
 *
 * @since 0.40.0
 */
const registryKeys: Api_DockerHub_RegistryKeys = [
  'index.docker.io',
  credentialServer,
];

/**
 * API - Docker Hub.
 *
 * Discovers Docker CLI credentials and performs the repository API operations
 * used by Nova's Docker Hub recipes.
 *
 * @since 0.40.0
 */
export class Runner {
  /**
   * API - Docker Hub - Runner - Categories.
   *
   * Stores Docker Hub's public category list after the first fetch attempt.
   * Configure and sync recipes share this cache during one process.
   *
   * @private
   *
   * @since 0.40.0
   */
  static #categories: Api_DockerHub_Runner_Categories;

  /**
   * API - Docker Hub - Runner - Populated.
   *
   * Prevents repeated category requests after either success or failure.
   * Failed lookups remain cached until tests explicitly reset the client.
   *
   * @private
   *
   * @since 0.40.0
   */
  static #populated: Api_DockerHub_Runner_Populated;

  /**
   * API - Docker Hub - Fetch Categories.
   *
   * Fetches and caches Docker Hub's public repository categories.
   * Invalid responses are logged once and resolve to undefined.
   *
   * @returns {Api_DockerHub_Runner_FetchCategories_Returns}
   *
   * @since 0.40.0
   */
  public static async fetchCategories(): Api_DockerHub_Runner_FetchCategories_Returns {
    if (Runner.#populated === true) {
      return Runner.#categories;
    }

    try {
      const response: Api_DockerHub_Runner_FetchCategories_Response = await fetch(`${apiUrl}/categories`);

      if (response.ok === false) {
        Logger.customize({
          name: 'Runner',
          purpose: 'fetchCategories',
        }).error(`Failed to fetch Docker Hub categories. HTTP status: ${response.status}`);

        Runner.#populated = true;

        return undefined;
      }

      const responseData: Api_DockerHub_Runner_FetchCategories_ResponseData = await response.json<Api_DockerHub_Runner_FetchCategories_ResponseData>();
      const parsed: Api_DockerHub_Runner_FetchCategories_Parsed = libSchemaDockerHubCategories.safeParse(responseData);

      if (parsed.success === false) {
        Logger.customize({
          name: 'Runner',
          purpose: 'fetchCategories',
        }).error('Failed to parse Docker Hub categories.');

        Runner.#populated = true;

        return undefined;
      }

      Runner.#categories = parsed.data;
      Runner.#populated = true;

      return Runner.#categories;
    } catch (error) {
      const message: Api_DockerHub_Runner_FetchCategories_Message = [
        'Failed to fetch Docker Hub categories.',
        error,
      ].join('\n');

      Logger.customize({
        name: 'Runner',
        purpose: 'fetchCategories',
      }).error(message);

      Runner.#populated = true;

      return undefined;
    }
  }

  /**
   * API - Docker Hub - Find Credentials.
   *
   * Resolves Docker Hub credentials through Docker's helper and config lookup
   * order without logging credential material.
   *
   * @returns {Api_DockerHub_Runner_FindCredentials_Returns}
   *
   * @since 0.40.0
   */
  public static findCredentials(): Api_DockerHub_Runner_FindCredentials_Returns {
    const dockerConfigDirectory: Api_DockerHub_Runner_FindCredentials_DockerConfigDirectory = process.env['DOCKER_CONFIG'];
    const configDirectory: Api_DockerHub_Runner_FindCredentials_ConfigDirectory = (
      dockerConfigDirectory !== undefined
      && dockerConfigDirectory.trim().length > 0
    ) ? dockerConfigDirectory : join(homedir(), '.docker');
    const configPath: Api_DockerHub_Runner_FindCredentials_ConfigPath = join(configDirectory, 'config.json');

    try {
      const rawConfig: Api_DockerHub_Runner_FindCredentials_RawConfig = readFileSync(configPath, 'utf-8');
      const parsedConfig: Api_DockerHub_Runner_FindCredentials_ParsedConfig = JSON.parse(rawConfig);
      const configResult: Api_DockerHub_Runner_FindCredentials_ConfigResult = libSchemaDockerHubDockerConfig.safeParse(parsedConfig);

      if (configResult.success === false) {
        return undefined;
      }

      const config: Api_DockerHub_Runner_FindCredentials_Config = configResult.data;
      const helperCandidates: Api_DockerHub_Runner_FindCredentials_HelperCandidates = [];

      for (const registryKey of registryKeys) {
        const helper: Api_DockerHub_Runner_FindCredentials_Helper = (config['credHelpers'] !== undefined) ? config['credHelpers'][registryKey] : undefined;

        if (
          helper !== undefined
          && helper.length > 0
          && helperCandidates.includes(helper) === false
        ) {
          helperCandidates.push(helper);
        }
      }

      if (
        config['credsStore'] !== undefined
        && config['credsStore'].length > 0
        && helperCandidates.includes(config['credsStore']) === false
      ) {
        helperCandidates.push(config['credsStore']);
      }

      for (const helperCandidate of helperCandidates) {
        const credentials: Api_DockerHub_Runner_FindCredentials_Credentials = Runner.#readCredentialHelper(helperCandidate);

        if (credentials !== undefined) {
          return credentials;
        }
      }

      const auth: Api_DockerHub_Runner_FindCredentials_Auth = (
        config['auths'] !== undefined
        && config['auths'][credentialServer] !== undefined
      ) ? config['auths'][credentialServer]['auth'] : undefined;

      if (auth === undefined) {
        return undefined;
      }

      const decodedAuth: Api_DockerHub_Runner_FindCredentials_DecodedAuth = Buffer.from(auth, 'base64').toString('utf-8');
      const separatorIndex: Api_DockerHub_Runner_FindCredentials_SeparatorIndex = decodedAuth.indexOf(':');

      if (separatorIndex <= 0 || separatorIndex === decodedAuth.length - 1) {
        return undefined;
      }

      const username: Api_DockerHub_Runner_FindCredentials_Username = decodedAuth.slice(0, separatorIndex);
      const secret: Api_DockerHub_Runner_FindCredentials_Secret = decodedAuth.slice(separatorIndex + 1);

      return {
        username,
        secret,
        source: 'config',
      };
    } catch {
      return undefined;
    }
  }

  /**
   * API - Docker Hub - Get Repository.
   *
   * Reads the configured Docker Hub repository and validates its sync fields.
   * HTTP failures preserve status while returning no repository body.
   *
   * @param {Api_DockerHub_Runner_GetRepository_Namespace}  namespace  - Namespace.
   * @param {Api_DockerHub_Runner_GetRepository_Repository} repository - Repository.
   * @param {Api_DockerHub_Runner_GetRepository_Token}      token      - Token.
   *
   * @returns {Api_DockerHub_Runner_GetRepository_Returns}
   *
   * @since 0.40.0
   */
  public static async getRepository(namespace: Api_DockerHub_Runner_GetRepository_Namespace, repository: Api_DockerHub_Runner_GetRepository_Repository, token: Api_DockerHub_Runner_GetRepository_Token): Api_DockerHub_Runner_GetRepository_Returns {
    const response: Api_DockerHub_Runner_GetRepository_Response = await Runner.#request(
      'GET',
      `/namespaces/${encodeURIComponent(namespace)}/repositories/${encodeURIComponent(repository)}`,
      token,
    );

    if (response['ok'] === false) {
      return {
        ok: false,
        status: response['status'],
        body: undefined,
      };
    }

    const parsed: Api_DockerHub_Runner_GetRepository_Parsed = libSchemaDockerHubRepository.safeParse(response['body']);

    if (parsed.success === false) {
      Logger.customize({
        name: 'Runner',
        purpose: 'getRepository',
      }).error('Failed to parse the Docker Hub repository response.');

      return {
        ok: false,
        status: response['status'],
        body: undefined,
      };
    }

    return {
      ok: true,
      status: response['status'],
      body: parsed.data,
    };
  }

  /**
   * API - Docker Hub - Login.
   *
   * Exchanges stored Docker credentials for a short-lived Docker Hub token.
   * Authentication failures never include credential or token material in logs.
   *
   * @param {Api_DockerHub_Runner_Login_Credentials} credentials - Credentials.
   *
   * @returns {Api_DockerHub_Runner_Login_Returns}
   *
   * @since 0.40.0
   */
  public static async login(credentials: Api_DockerHub_Runner_Login_Credentials): Api_DockerHub_Runner_Login_Returns {
    try {
      const response: Api_DockerHub_Runner_Login_Response = await fetch(`${apiUrl}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: credentials['username'],
          secret: credentials['secret'],
        }),
      });

      if (response.ok === false) {
        Logger.customize({
          name: 'Runner',
          purpose: 'login',
        }).error(`Failed to log in to Docker Hub. HTTP status: ${response.status}`);

        return undefined;
      }

      const responseData: Api_DockerHub_Runner_Login_ResponseData = await response.json<Api_DockerHub_Runner_Login_ResponseData>();
      const parsed: Api_DockerHub_Runner_Login_Parsed = libSchemaDockerHubLoginResponse.safeParse(responseData);

      if (parsed.success === false) {
        Logger.customize({
          name: 'Runner',
          purpose: 'login',
        }).error('Failed to parse the Docker Hub login response.');

        return undefined;
      }

      return parsed.data['access_token'];
    } catch (error) {
      const message: Api_DockerHub_Runner_Login_Message = [
        'Failed to log in to Docker Hub.',
        error,
      ].join('\n');

      Logger.customize({
        name: 'Runner',
        purpose: 'login',
      }).error(message);

      return undefined;
    }
  }

  /**
   * API - Docker Hub - Runner - Read Credential Helper.
   *
   * Invokes one Docker credential helper and validates its JSON response.
   * Failed helpers resolve silently so later credential sources can run.
   *
   * @param {Api_DockerHub_Runner_ReadCredentialHelper_Helper} helper - Helper.
   *
   * @private
   *
   * @returns {Api_DockerHub_Runner_ReadCredentialHelper_Returns}
   *
   * @since 0.40.0
   */
  static #readCredentialHelper(helper: Api_DockerHub_Runner_ReadCredentialHelper_Helper): Api_DockerHub_Runner_ReadCredentialHelper_Returns {
    try {
      const command: Api_DockerHub_Runner_ReadCredentialHelper_Command = `docker-credential-${helper}`;
      const result: Api_DockerHub_Runner_ReadCredentialHelper_Result = spawnSync(command, ['get'], {
        input: credentialServer,
        encoding: 'utf-8',
      });

      if (result.error !== undefined || result.status !== 0) {
        return undefined;
      }

      const data: Api_DockerHub_Runner_ReadCredentialHelper_Data = JSON.parse(result.stdout);
      const parsed: Api_DockerHub_Runner_ReadCredentialHelper_Parsed = libSchemaDockerHubCredentialHelperResponse.safeParse(data);

      if (parsed.success === false) {
        return undefined;
      }

      return {
        username: parsed.data['Username'],
        secret: parsed.data['Secret'],
        source: helper,
      };
    } catch {
      return undefined;
    }
  }

  /**
   * API - Docker Hub - Runner - Request.
   *
   * Performs one authenticated repository request without exposing its token.
   * Network failures use status zero and retain the response object shape.
   *
   * @param {Api_DockerHub_Runner_Request_Method} method - Method.
   * @param {Api_DockerHub_Runner_Request_Path}   path   - Path.
   * @param {Api_DockerHub_Runner_Request_Token}  token  - Token.
   * @param {Api_DockerHub_Runner_Request_Body}   [body] - Body.
   *
   * @private
   *
   * @returns {Api_DockerHub_Runner_Request_Returns}
   *
   * @since 0.40.0
   */
  static async #request(method: Api_DockerHub_Runner_Request_Method, path: Api_DockerHub_Runner_Request_Path, token: Api_DockerHub_Runner_Request_Token, body?: Api_DockerHub_Runner_Request_Body): Api_DockerHub_Runner_Request_Returns {
    try {
      const requestInit: Api_DockerHub_Runner_Request_RequestInit = {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };

      if (body !== undefined) {
        requestInit.body = JSON.stringify(body);
      }

      const response: Api_DockerHub_Runner_Request_Response = await fetch(`${apiUrl}${path}`, requestInit);
      let responseBody: Api_DockerHub_Runner_Request_ResponseBody = undefined;

      try {
        responseBody = await response.json<Api_DockerHub_Runner_Request_ResponseBody>();
      } catch {
        /* Empty response bodies are valid for update endpoints. */
      }

      return {
        ok: response.ok,
        status: response.status,
        body: responseBody,
      };
    } catch (error) {
      const message: Api_DockerHub_Runner_Request_Message = [
        `Docker Hub request failed for ${path}.`,
        error,
      ].join('\n');

      Logger.customize({
        name: 'Runner',
        purpose: 'request',
      }).error(message);

      return {
        ok: false,
        status: 0,
        body: undefined,
      };
    }
  }

  /**
   * API - Docker Hub - Reset For Testing.
   *
   * Clears the category cache so tests can exercise every fetch path.
   * Credential discovery and repository calls have no retained state.
   *
   * @returns {Api_DockerHub_Runner_ResetForTesting_Returns}
   *
   * @since 0.40.0
   */
  public static resetForTesting(): Api_DockerHub_Runner_ResetForTesting_Returns {
    Runner.#categories = undefined;
    Runner.#populated = undefined;

    return;
  }

  /**
   * API - Docker Hub - Update Categories.
   *
   * Replaces all Docker Hub repository categories.
   * The endpoint requires the complete array of category objects.
   *
   * @param {Api_DockerHub_Runner_UpdateCategories_Namespace}  namespace  - Namespace.
   * @param {Api_DockerHub_Runner_UpdateCategories_Repository} repository - Repository.
   * @param {Api_DockerHub_Runner_UpdateCategories_Token}      token      - Token.
   * @param {Api_DockerHub_Runner_UpdateCategories_Categories} categories - Categories.
   *
   * @returns {Api_DockerHub_Runner_UpdateCategories_Returns}
   *
   * @since 0.40.0
   */
  public static async updateCategories(namespace: Api_DockerHub_Runner_UpdateCategories_Namespace, repository: Api_DockerHub_Runner_UpdateCategories_Repository, token: Api_DockerHub_Runner_UpdateCategories_Token, categories: Api_DockerHub_Runner_UpdateCategories_Categories): Api_DockerHub_Runner_UpdateCategories_Returns {
    return Runner.#request(
      'PATCH',
      `/namespaces/${encodeURIComponent(namespace)}/repositories/${encodeURIComponent(repository)}/categories`,
      token,
      categories,
    );
  }

  /**
   * API - Docker Hub - Update Identity.
   *
   * Updates only the supplied short description and overview fields.
   * Omitted fields are excluded because Docker Hub treats this as a patch.
   *
   * @param {Api_DockerHub_Runner_UpdateIdentity_Namespace}       namespace       - Namespace.
   * @param {Api_DockerHub_Runner_UpdateIdentity_Repository}      repository      - Repository.
   * @param {Api_DockerHub_Runner_UpdateIdentity_Token}           token           - Token.
   * @param {Api_DockerHub_Runner_UpdateIdentity_Description}     description     - Description.
   * @param {Api_DockerHub_Runner_UpdateIdentity_FullDescription} fullDescription - Full description.
   *
   * @returns {Api_DockerHub_Runner_UpdateIdentity_Returns}
   *
   * @since 0.40.0
   */
  public static async updateIdentity(namespace: Api_DockerHub_Runner_UpdateIdentity_Namespace, repository: Api_DockerHub_Runner_UpdateIdentity_Repository, token: Api_DockerHub_Runner_UpdateIdentity_Token, description: Api_DockerHub_Runner_UpdateIdentity_Description, fullDescription: Api_DockerHub_Runner_UpdateIdentity_FullDescription): Api_DockerHub_Runner_UpdateIdentity_Returns {
    const body: Api_DockerHub_Runner_UpdateIdentity_Body = {};

    if (description !== undefined) {
      Reflect.set(body, 'description', description);
    }

    if (fullDescription !== undefined) {
      Reflect.set(body, 'full_description', fullDescription);
    }

    return Runner.#request(
      'PATCH',
      `/namespaces/${encodeURIComponent(namespace)}/repositories/${encodeURIComponent(repository)}`,
      token,
      body,
    );
  }

  /**
   * API - Docker Hub - Update Immutable Tags.
   *
   * Replaces the immutable-tag enabled flag and complete rule list.
   * Docker Hub expects its write-field names instead of the read shape.
   *
   * @param {Api_DockerHub_Runner_UpdateImmutableTags_Namespace}  namespace  - Namespace.
   * @param {Api_DockerHub_Runner_UpdateImmutableTags_Repository} repository - Repository.
   * @param {Api_DockerHub_Runner_UpdateImmutableTags_Token}      token      - Token.
   * @param {Api_DockerHub_Runner_UpdateImmutableTags_Enabled}    enabled    - Enabled.
   * @param {Api_DockerHub_Runner_UpdateImmutableTags_Rules}      rules      - Rules.
   *
   * @returns {Api_DockerHub_Runner_UpdateImmutableTags_Returns}
   *
   * @since 0.40.0
   */
  public static async updateImmutableTags(namespace: Api_DockerHub_Runner_UpdateImmutableTags_Namespace, repository: Api_DockerHub_Runner_UpdateImmutableTags_Repository, token: Api_DockerHub_Runner_UpdateImmutableTags_Token, enabled: Api_DockerHub_Runner_UpdateImmutableTags_Enabled, rules: Api_DockerHub_Runner_UpdateImmutableTags_Rules): Api_DockerHub_Runner_UpdateImmutableTags_Returns {
    return Runner.#request(
      'PATCH',
      `/namespaces/${encodeURIComponent(namespace)}/repositories/${encodeURIComponent(repository)}/immutabletags`,
      token,
      {
        immutable_tags: enabled,
        immutable_tags_rules: rules,
      },
    );
  }

  /**
   * API - Docker Hub - Update Privacy.
   *
   * Changes Docker Hub repository visibility through the privacy endpoint.
   * This endpoint accepts POST even though the other updates use PATCH.
   *
   * @param {Api_DockerHub_Runner_UpdatePrivacy_Namespace}  namespace  - Namespace.
   * @param {Api_DockerHub_Runner_UpdatePrivacy_Repository} repository - Repository.
   * @param {Api_DockerHub_Runner_UpdatePrivacy_Token}      token      - Token.
   * @param {Api_DockerHub_Runner_UpdatePrivacy_IsPrivate}  isPrivate  - Is private.
   *
   * @returns {Api_DockerHub_Runner_UpdatePrivacy_Returns}
   *
   * @since 0.40.0
   */
  public static async updatePrivacy(namespace: Api_DockerHub_Runner_UpdatePrivacy_Namespace, repository: Api_DockerHub_Runner_UpdatePrivacy_Repository, token: Api_DockerHub_Runner_UpdatePrivacy_Token, isPrivate: Api_DockerHub_Runner_UpdatePrivacy_IsPrivate): Api_DockerHub_Runner_UpdatePrivacy_Returns {
    return Runner.#request(
      'POST',
      `/namespaces/${encodeURIComponent(namespace)}/repositories/${encodeURIComponent(repository)}/privacy`,
      token,
      { is_private: isPrivate },
    );
  }
}

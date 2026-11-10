import type { SpawnSyncReturns } from 'node:child_process';

import type { z } from 'zod';

import type {
  libSchemaDockerHubCategories,
  libSchemaDockerHubCredentialHelperResponse,
  libSchemaDockerHubDockerConfig,
  libSchemaDockerHubLoginResponse,
  libSchemaDockerHubRepository,
} from '../../lib/schema.js';

import type {
  Shared_DockerHubCategories,
  Shared_DockerHubCredentials,
  Shared_DockerHubRepository,
  Shared_DockerHubResponse,
} from '../shared.d.ts';

/**
 * API - Docker Hub - Constants.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_ApiUrl = string;

export type Api_DockerHub_CredentialServer = string;

export type Api_DockerHub_RegistryKeys = readonly string[];

/**
 * API - Docker Hub - Runner.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_Categories = Shared_DockerHubCategories | undefined;

export type Api_DockerHub_Runner_Populated = boolean | undefined;

/**
 * API - Docker Hub - Runner - Fetch Categories.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_FetchCategories_Returns = Promise<Shared_DockerHubCategories | undefined>;

export type Api_DockerHub_Runner_FetchCategories_Response = Response;

export type Api_DockerHub_Runner_FetchCategories_ResponseData = unknown;

export type Api_DockerHub_Runner_FetchCategories_Parsed = z.ZodSafeParseResult<z.infer<typeof libSchemaDockerHubCategories>>;

export type Api_DockerHub_Runner_FetchCategories_Message = string;

/**
 * API - Docker Hub - Runner - Find Credentials.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_FindCredentials_Returns = Shared_DockerHubCredentials | undefined;

export type Api_DockerHub_Runner_FindCredentials_DockerConfigDirectory = string | undefined;

export type Api_DockerHub_Runner_FindCredentials_ConfigDirectory = string;

export type Api_DockerHub_Runner_FindCredentials_ConfigPath = string;

export type Api_DockerHub_Runner_FindCredentials_RawConfig = string;

export type Api_DockerHub_Runner_FindCredentials_ParsedConfig = unknown;

export type Api_DockerHub_Runner_FindCredentials_ConfigResult = z.ZodSafeParseResult<z.infer<typeof libSchemaDockerHubDockerConfig>>;

export type Api_DockerHub_Runner_FindCredentials_Config = z.infer<typeof libSchemaDockerHubDockerConfig>;

export type Api_DockerHub_Runner_FindCredentials_HelperCandidates = string[];

export type Api_DockerHub_Runner_FindCredentials_Helper = string | undefined;

export type Api_DockerHub_Runner_FindCredentials_Credentials = Shared_DockerHubCredentials | undefined;

export type Api_DockerHub_Runner_FindCredentials_Auth = string | undefined;

export type Api_DockerHub_Runner_FindCredentials_DecodedAuth = string;

export type Api_DockerHub_Runner_FindCredentials_SeparatorIndex = number;

export type Api_DockerHub_Runner_FindCredentials_Username = string;

export type Api_DockerHub_Runner_FindCredentials_Secret = string;

/**
 * API - Docker Hub - Runner - Get Repository.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_GetRepository_Namespace = string;

export type Api_DockerHub_Runner_GetRepository_Repository = string;

export type Api_DockerHub_Runner_GetRepository_Token = string;

export type Api_DockerHub_Runner_GetRepository_Returns = Promise<Shared_DockerHubResponse<Shared_DockerHubRepository | undefined>>;

export type Api_DockerHub_Runner_GetRepository_Response = Shared_DockerHubResponse;

export type Api_DockerHub_Runner_GetRepository_Parsed = z.ZodSafeParseResult<z.infer<typeof libSchemaDockerHubRepository>>;

/**
 * API - Docker Hub - Runner - Login.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_Login_Credentials = Shared_DockerHubCredentials;

export type Api_DockerHub_Runner_Login_Returns = Promise<string | undefined>;

export type Api_DockerHub_Runner_Login_Response = Response;

export type Api_DockerHub_Runner_Login_ResponseData = unknown;

export type Api_DockerHub_Runner_Login_Parsed = z.ZodSafeParseResult<z.infer<typeof libSchemaDockerHubLoginResponse>>;

export type Api_DockerHub_Runner_Login_Message = string;

/**
 * API - Docker Hub - Runner - Read Credential Helper.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_ReadCredentialHelper_Helper = string;

export type Api_DockerHub_Runner_ReadCredentialHelper_Returns = Shared_DockerHubCredentials | undefined;

export type Api_DockerHub_Runner_ReadCredentialHelper_Command = string;

export type Api_DockerHub_Runner_ReadCredentialHelper_Result = SpawnSyncReturns<string>;

export type Api_DockerHub_Runner_ReadCredentialHelper_Data = unknown;

export type Api_DockerHub_Runner_ReadCredentialHelper_Parsed = z.ZodSafeParseResult<z.infer<typeof libSchemaDockerHubCredentialHelperResponse>>;

/**
 * API - Docker Hub - Runner - Request.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_Request_Method = 'GET' | 'PATCH' | 'POST';

export type Api_DockerHub_Runner_Request_Path = string;

export type Api_DockerHub_Runner_Request_Token = string;

export type Api_DockerHub_Runner_Request_Body = unknown;

export type Api_DockerHub_Runner_Request_Returns = Promise<Shared_DockerHubResponse>;

export type Api_DockerHub_Runner_Request_RequestInit = RequestInit;

export type Api_DockerHub_Runner_Request_Response = Response;

export type Api_DockerHub_Runner_Request_ResponseBody = unknown;

export type Api_DockerHub_Runner_Request_Message = string;

/**
 * API - Docker Hub - Runner - Reset For Testing.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_ResetForTesting_Returns = void;

/**
 * API - Docker Hub - Runner - Update Categories.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_UpdateCategories_Namespace = string;

export type Api_DockerHub_Runner_UpdateCategories_Repository = string;

export type Api_DockerHub_Runner_UpdateCategories_Token = string;

export type Api_DockerHub_Runner_UpdateCategories_Categories = Shared_DockerHubCategories;

export type Api_DockerHub_Runner_UpdateCategories_Returns = Promise<Shared_DockerHubResponse>;

/**
 * API - Docker Hub - Runner - Update Identity.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_UpdateIdentity_Namespace = string;

export type Api_DockerHub_Runner_UpdateIdentity_Repository = string;

export type Api_DockerHub_Runner_UpdateIdentity_Token = string;

export type Api_DockerHub_Runner_UpdateIdentity_Description = string | undefined;

export type Api_DockerHub_Runner_UpdateIdentity_FullDescription = string | undefined;

export type Api_DockerHub_Runner_UpdateIdentity_Returns = Promise<Shared_DockerHubResponse>;

export type Api_DockerHub_Runner_UpdateIdentity_Body = Record<string, string>;

/**
 * API - Docker Hub - Runner - Update Immutable Tags.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_UpdateImmutableTags_Namespace = string;

export type Api_DockerHub_Runner_UpdateImmutableTags_Repository = string;

export type Api_DockerHub_Runner_UpdateImmutableTags_Token = string;

export type Api_DockerHub_Runner_UpdateImmutableTags_Enabled = boolean;

export type Api_DockerHub_Runner_UpdateImmutableTags_Rules = string[];

export type Api_DockerHub_Runner_UpdateImmutableTags_Returns = Promise<Shared_DockerHubResponse>;

/**
 * API - Docker Hub - Runner - Update Privacy.
 *
 * @since 0.40.0
 */
export type Api_DockerHub_Runner_UpdatePrivacy_Namespace = string;

export type Api_DockerHub_Runner_UpdatePrivacy_Repository = string;

export type Api_DockerHub_Runner_UpdatePrivacy_Token = string;

export type Api_DockerHub_Runner_UpdatePrivacy_IsPrivate = boolean;

export type Api_DockerHub_Runner_UpdatePrivacy_Returns = Promise<Shared_DockerHubResponse>;

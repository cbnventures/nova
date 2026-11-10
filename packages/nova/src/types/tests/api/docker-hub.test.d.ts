import type { spawnSync } from 'node:child_process';

import type { vi } from 'vitest';

import type {
  Shared_DockerHubCategories,
  Shared_DockerHubCredentials,
  Shared_DockerHubRepository,
  Shared_DockerHubResponse,
} from '../../shared.d.ts';

/**
 * Tests - API - Docker Hub - Repository Fixture.
 *
 * @since 0.40.0
 */
export type Tests_Api_DockerHub_RepositoryFixture = Shared_DockerHubRepository;

/**
 * Tests - API - Docker Hub - Fetch Categories - Caches The Live List.
 *
 * @since 0.40.0
 */
export type Tests_Api_DockerHub_ApiDockerHubFetchCategories_CachesTheLiveList_FetchSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Api_DockerHub_ApiDockerHubFetchCategories_CachesTheLiveList_First = Shared_DockerHubCategories | undefined;

export type Tests_Api_DockerHub_ApiDockerHubFetchCategories_CachesTheLiveList_Second = Shared_DockerHubCategories | undefined;

/**
 * Tests - API - Docker Hub - Find Credentials - Falls Back To Config Auth.
 *
 * @since 0.40.0
 */
export type Tests_Api_DockerHub_ApiDockerHubFindCredentials_FallsBackToConfigAuth_Credentials = Shared_DockerHubCredentials | undefined;

/**
 * Tests - API - Docker Hub - Find Credentials - Uses Credential Helpers In Order.
 *
 * @since 0.40.0
 */
export type Tests_Api_DockerHub_ApiDockerHubFindCredentials_UsesCredentialHelpersInOrder_HelperResult = ReturnType<typeof spawnSync>;

export type Tests_Api_DockerHub_ApiDockerHubFindCredentials_UsesCredentialHelpersInOrder_Credentials = Shared_DockerHubCredentials | undefined;

/**
 * Tests - API - Docker Hub - Login - Posts Credentials And Returns The Token.
 *
 * @since 0.40.0
 */
export type Tests_Api_DockerHub_ApiDockerHubLogin_PostsCredentialsAndReturnsTheToken_FetchSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Api_DockerHub_ApiDockerHubLogin_PostsCredentialsAndReturnsTheToken_Token = string | undefined;

/**
 * Tests - API - Docker Hub - Repository Requests - Reads A Missing Overview And Null Description As Empty.
 *
 * @since 0.40.1
 */
export type Tests_Api_DockerHub_ApiDockerHubRepositoryRequests_ReadsAMissingOverviewAndNullDescriptionAsEmpty_NewRepositoryFixture = Record<string, unknown>;

export type Tests_Api_DockerHub_ApiDockerHubRepositoryRequests_ReadsAMissingOverviewAndNullDescriptionAsEmpty_Repository = Shared_DockerHubResponse<Shared_DockerHubRepository | undefined>;

/**
 * Tests - API - Docker Hub - Repository Requests - Use The Documented Methods And Bodies.
 *
 * @since 0.40.0
 */
export type Tests_Api_DockerHub_ApiDockerHubRepositoryRequests_UsesTheDocumentedMethodsAndBodies_FetchSpy = ReturnType<typeof vi['spyOn']>;

export type Tests_Api_DockerHub_ApiDockerHubRepositoryRequests_UsesTheDocumentedMethodsAndBodies_Repository = Shared_DockerHubResponse<Shared_DockerHubRepository | undefined>;

/**
 * Tests - API - Docker Hub - Node Child Process.
 *
 * @since 0.40.0
 */
export type Tests_Api_DockerHub_NodeChildProcess_MockModule_SpawnSync = ReturnType<typeof vi['fn']>;

export type Tests_Api_DockerHub_NodeChildProcess_MockModule = Readonly<{
  spawnSync: Tests_Api_DockerHub_NodeChildProcess_MockModule_SpawnSync;
}>;

/**
 * Tests - API - Docker Hub - Node Fs.
 *
 * @since 0.40.0
 */
export type Tests_Api_DockerHub_NodeFs_MockModule_ReadFileSync = ReturnType<typeof vi['fn']>;

export type Tests_Api_DockerHub_NodeFs_MockModule = Readonly<{
  readFileSync: Tests_Api_DockerHub_NodeFs_MockModule_ReadFileSync;
}>;

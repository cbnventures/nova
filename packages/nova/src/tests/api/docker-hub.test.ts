import {
  deepStrictEqual,
  strictEqual,
} from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

import {
  afterEach,
  describe,
  it,
  vi,
} from 'vitest';

import { Runner as ApiDockerHub } from '../../api/docker-hub.js';

import type {
  Tests_Api_DockerHub_ApiDockerHubFetchCategories_CachesTheLiveList_FetchSpy,
  Tests_Api_DockerHub_ApiDockerHubFetchCategories_CachesTheLiveList_First,
  Tests_Api_DockerHub_ApiDockerHubFetchCategories_CachesTheLiveList_Second,
  Tests_Api_DockerHub_ApiDockerHubFindCredentials_FallsBackToConfigAuth_Credentials,
  Tests_Api_DockerHub_ApiDockerHubFindCredentials_UsesCredentialHelpersInOrder_Credentials,
  Tests_Api_DockerHub_ApiDockerHubFindCredentials_UsesCredentialHelpersInOrder_HelperResult,
  Tests_Api_DockerHub_ApiDockerHubLogin_PostsCredentialsAndReturnsTheToken_FetchSpy,
  Tests_Api_DockerHub_ApiDockerHubLogin_PostsCredentialsAndReturnsTheToken_Token,
  Tests_Api_DockerHub_ApiDockerHubRepositoryRequests_UsesTheDocumentedMethodsAndBodies_FetchSpy,
  Tests_Api_DockerHub_ApiDockerHubRepositoryRequests_UsesTheDocumentedMethodsAndBodies_Repository,
  Tests_Api_DockerHub_RepositoryFixture,
} from '../../types/tests/api/docker-hub.test.d.ts';

vi.mock('node:child_process', () => ({
  spawnSync: vi.fn(),
}));

vi.mock('node:fs', () => ({
  readFileSync: vi.fn(),
}));

/**
 * Tests - API - Docker Hub - Repository Fixture.
 *
 * Represents the repository fields consumed by Docker Hub sync recipes.
 *
 * @since 0.40.0
 */
const repositoryFixture: Tests_Api_DockerHub_RepositoryFixture = {
  description: 'Short description',
  full_description: '# Overview',
  is_private: false,
  categories: [{
    name: 'Networking',
    slug: 'networking',
  }],
  immutable_tags_settings: {
    enabled: false,
    rules: [],
  },
  permissions: {
    write: true,
  },
};

afterEach(() => {
  ApiDockerHub.resetForTesting();

  vi.clearAllMocks();

  vi.restoreAllMocks();

  vi.unstubAllEnvs();

  return;
});

/**
 * Tests - API - Docker Hub - Fetch Categories.
 *
 * @since 0.40.0
 */
describe('ApiDockerHub.fetchCategories', () => {
  it('caches the live list', async () => {
    const fetchSpy: Tests_Api_DockerHub_ApiDockerHubFetchCategories_CachesTheLiveList_FetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify([{
      name: 'Networking',
      slug: 'networking',
    }]), { status: 200 }));
    const first: Tests_Api_DockerHub_ApiDockerHubFetchCategories_CachesTheLiveList_First = await ApiDockerHub.fetchCategories();
    const second: Tests_Api_DockerHub_ApiDockerHubFetchCategories_CachesTheLiveList_Second = await ApiDockerHub.fetchCategories();

    deepStrictEqual(first, [{
      name: 'Networking',
      slug: 'networking',
    }]);
    strictEqual(second, first);
    strictEqual(fetchSpy.mock.calls.length, 1);

    return;
  });

  return;
});

/**
 * Tests - API - Docker Hub - Find Credentials.
 *
 * @since 0.40.0
 */
describe('ApiDockerHub.findCredentials', () => {
  it('uses credential helpers in order', () => {
    vi.stubEnv('DOCKER_CONFIG', '/tmp/nova-docker-config');

    vi.mocked(readFileSync).mockReturnValue(JSON.stringify({
      credHelpers: {
        'index.docker.io': 'desktop',
        'https://index.docker.io/v1/': 'osxkeychain',
      },
      credsStore: 'pass',
    }));

    const helperResult: Tests_Api_DockerHub_ApiDockerHubFindCredentials_UsesCredentialHelpersInOrder_HelperResult = {
      pid: 1,
      output: [
        null,
        JSON.stringify({
          Username: 'jacky',
          Secret: 'personal-access-token',
        }),
        '',
      ],
      stdout: JSON.stringify({
        Username: 'jacky',
        Secret: 'personal-access-token',
      }),
      stderr: '',
      status: 0,
      signal: null,
    };

    vi.mocked(spawnSync).mockReturnValue(helperResult);

    const credentials: Tests_Api_DockerHub_ApiDockerHubFindCredentials_UsesCredentialHelpersInOrder_Credentials = ApiDockerHub.findCredentials();

    deepStrictEqual(credentials, {
      username: 'jacky',
      secret: 'personal-access-token',
      source: 'desktop',
    });
    deepStrictEqual(vi.mocked(readFileSync).mock.calls[0], [
      '/tmp/nova-docker-config/config.json',
      'utf-8',
    ]);
    deepStrictEqual(vi.mocked(spawnSync).mock.calls[0], [
      'docker-credential-desktop',
      ['get'],
      {
        input: 'https://index.docker.io/v1/',
        encoding: 'utf-8',
      },
    ]);

    return;
  });

  it('falls back to config auth', () => {
    vi.mocked(readFileSync).mockReturnValue(JSON.stringify({
      auths: {
        'https://index.docker.io/v1/': {
          auth: Buffer.from('jacky:personal-access-token').toString('base64'),
        },
      },
    }));

    const credentials: Tests_Api_DockerHub_ApiDockerHubFindCredentials_FallsBackToConfigAuth_Credentials = ApiDockerHub.findCredentials();

    deepStrictEqual(credentials, {
      username: 'jacky',
      secret: 'personal-access-token',
      source: 'config',
    });
    strictEqual(vi.mocked(spawnSync).mock.calls.length, 0);

    return;
  });

  return;
});

/**
 * Tests - API - Docker Hub - Login.
 *
 * @since 0.40.0
 */
describe('ApiDockerHub.login', () => {
  it('posts credentials and returns the token', async () => {
    const fetchSpy: Tests_Api_DockerHub_ApiDockerHubLogin_PostsCredentialsAndReturnsTheToken_FetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({ access_token: 'jwt-token' }), { status: 200 }));
    const token: Tests_Api_DockerHub_ApiDockerHubLogin_PostsCredentialsAndReturnsTheToken_Token = await ApiDockerHub.login({
      username: 'jacky',
      secret: 'personal-access-token',
      source: 'config',
    });

    strictEqual(token, 'jwt-token');
    deepStrictEqual(fetchSpy.mock.calls[0], [
      'https://hub.docker.com/v2/auth/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: 'jacky',
          secret: 'personal-access-token',
        }),
      },
    ]);

    return;
  });

  return;
});

/**
 * Tests - API - Docker Hub - Repository Requests.
 *
 * @since 0.40.0
 */
describe('ApiDockerHub.repositoryRequests', () => {
  it('uses the documented methods and bodies', async () => {
    const fetchSpy: Tests_Api_DockerHub_ApiDockerHubRepositoryRequests_UsesTheDocumentedMethodsAndBodies_FetchSpy = vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(new Response(JSON.stringify(repositoryFixture), { status: 200 }))
      .mockResolvedValue(new Response(null, { status: 204 }));
    const repository: Tests_Api_DockerHub_ApiDockerHubRepositoryRequests_UsesTheDocumentedMethodsAndBodies_Repository = await ApiDockerHub.getRepository('mrjackyliang', 'transmission-vpn', 'jwt-token');

    await ApiDockerHub.updateIdentity('mrjackyliang', 'transmission-vpn', 'jwt-token', 'Description', '# Readme');

    await ApiDockerHub.updateCategories('mrjackyliang', 'transmission-vpn', 'jwt-token', [{
      name: 'Networking',
      slug: 'networking',
    }]);

    await ApiDockerHub.updatePrivacy('mrjackyliang', 'transmission-vpn', 'jwt-token', true);

    await ApiDockerHub.updateImmutableTags('mrjackyliang', 'transmission-vpn', 'jwt-token', true, ['^v\\d+$']);

    deepStrictEqual(repository, {
      ok: true,
      status: 200,
      body: repositoryFixture,
    });
    strictEqual(fetchSpy.mock.calls[0]![0], 'https://hub.docker.com/v2/namespaces/mrjackyliang/repositories/transmission-vpn');
    deepStrictEqual(fetchSpy.mock.calls[1]![1], {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer jwt-token',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description: 'Description',
        full_description: '# Readme',
      }),
    });
    strictEqual(fetchSpy.mock.calls[2]![0], 'https://hub.docker.com/v2/namespaces/mrjackyliang/repositories/transmission-vpn/categories');
    strictEqual(fetchSpy.mock.calls[2]![1]!['method'], 'PATCH');
    strictEqual(fetchSpy.mock.calls[2]![1]!['body'], JSON.stringify([{
      name: 'Networking',
      slug: 'networking',
    }]));
    strictEqual(fetchSpy.mock.calls[3]![1]!['method'], 'POST');
    strictEqual(fetchSpy.mock.calls[3]![1]!['body'], JSON.stringify({ is_private: true }));
    strictEqual(fetchSpy.mock.calls[4]![1]!['method'], 'PATCH');
    strictEqual(fetchSpy.mock.calls[4]![1]!['body'], JSON.stringify({
      immutable_tags: true,
      immutable_tags_rules: ['^v\\d+$'],
    }));

    return;
  });

  return;
});

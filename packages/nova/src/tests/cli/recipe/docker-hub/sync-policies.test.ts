import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Runner as DockerHub } from '../../../../api/docker-hub.js';
import { dockerHubPrecheck } from '../../../../cli/recipe/docker-hub/docker-hub-precheck.js';
import { Runner as CliRecipeDockerHubSyncPolicies } from '../../../../cli/recipe/docker-hub/sync-policies.js';

vi.mock('../../../../cli/recipe/docker-hub/docker-hub-precheck.js', () => ({
  dockerHubPrecheck: vi.fn(),
}));

/**
 * Tests - CLI - Recipe - Docker Hub - Sync Policies - Run.
 *
 * @since 0.40.0
 */
describe('CliRecipeDockerHubSyncPolicies.run', () => {
  beforeEach(() => {
    process.exitCode = undefined;

    vi.mocked(dockerHubPrecheck).mockResolvedValue({
      workingFile: {},
      dockerHub: {
        namespace: 'mrjackyliang',
        repository: 'transmission-vpn',
        visibility: 'private',
        immutableTags: {
          enabled: true,
          rules: ['^v\\d+$'],
        },
      },
      namespace: 'mrjackyliang',
      repositoryName: 'transmission-vpn',
      token: 'jwt-token',
      repository: {
        description: 'Description',
        full_description: '# Overview',
        is_private: false,
        categories: [],
        immutable_tags_settings: {
          enabled: false,
          rules: [],
        },
        permissions: { write: true },
      },
      isDryRun: false,
    });

    vi.spyOn(DockerHub, 'updatePrivacy').mockResolvedValue({
      ok: true,
      status: 200,
      body: undefined,
    });

    vi.spyOn(DockerHub, 'updateImmutableTags').mockResolvedValue({
      ok: true,
      status: 200,
      body: undefined,
    });

    return;
  });

  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = undefined;

    return;
  });

  it('updates changed visibility and immutable tags', async () => {
    await CliRecipeDockerHubSyncPolicies.run({});

    expect(DockerHub['updatePrivacy']).toHaveBeenCalledWith('mrjackyliang', 'transmission-vpn', 'jwt-token', true);

    expect(DockerHub['updateImmutableTags']).toHaveBeenCalledWith('mrjackyliang', 'transmission-vpn', 'jwt-token', true, ['^v\\d+$']);

    return;
  });

  it('sends nothing during a dry run', async () => {
    vi.mocked(dockerHubPrecheck).mockResolvedValue({
      workingFile: {},
      dockerHub: {
        namespace: 'mrjackyliang',
        repository: 'transmission-vpn',
        visibility: 'private',
        immutableTags: {
          enabled: true,
          rules: ['^v\\d+$'],
        },
      },
      namespace: 'mrjackyliang',
      repositoryName: 'transmission-vpn',
      token: 'jwt-token',
      repository: {
        description: 'Description',
        full_description: '# Overview',
        is_private: false,
        categories: [],
        immutable_tags_settings: {
          enabled: false,
          rules: [],
        },
        permissions: { write: true },
      },
      isDryRun: true,
    });

    await CliRecipeDockerHubSyncPolicies.run({ dryRun: true });

    expect(DockerHub['updatePrivacy']).not.toHaveBeenCalled();

    expect(DockerHub['updateImmutableTags']).not.toHaveBeenCalled();

    return;
  });

  it('leaves unchanged policies alone', async () => {
    vi.mocked(dockerHubPrecheck).mockResolvedValue({
      workingFile: {},
      dockerHub: {
        namespace: 'mrjackyliang',
        repository: 'transmission-vpn',
        visibility: 'private',
        immutableTags: {
          enabled: true,
          rules: ['^v\\d+$'],
        },
      },
      namespace: 'mrjackyliang',
      repositoryName: 'transmission-vpn',
      token: 'jwt-token',
      repository: {
        description: 'Description',
        full_description: '# Overview',
        is_private: true,
        categories: [],
        immutable_tags_settings: {
          enabled: true,
          rules: ['^v\\d+$'],
        },
        permissions: { write: true },
      },
      isDryRun: false,
    });

    await CliRecipeDockerHubSyncPolicies.run({});

    expect(DockerHub['updatePrivacy']).not.toHaveBeenCalled();

    expect(DockerHub['updateImmutableTags']).not.toHaveBeenCalled();

    return;
  });

  return;
});

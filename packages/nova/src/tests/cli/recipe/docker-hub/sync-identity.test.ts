import { promises as fs } from 'node:fs';

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
import { Runner as CliRecipeDockerHubSyncIdentity } from '../../../../cli/recipe/docker-hub/sync-identity.js';
import * as utility from '../../../../lib/utility.js';

vi.mock('../../../../cli/recipe/docker-hub/docker-hub-precheck.js', () => ({
  dockerHubPrecheck: vi.fn(),
}));

/**
 * Tests - CLI - Recipe - Docker Hub - Sync Identity - Run.
 *
 * @since 0.40.0
 */
describe('CliRecipeDockerHubSyncIdentity.run', () => {
  beforeEach(() => {
    process.exitCode = undefined;

    vi.mocked(dockerHubPrecheck).mockResolvedValue({
      workingFile: {
        project: {
          description: { short: 'Nova short description' },
        },
      },
      dockerHub: {
        namespace: 'mrjackyliang',
        repository: 'transmission-vpn',
        categories: ['networking'],
      },
      namespace: 'mrjackyliang',
      repositoryName: 'transmission-vpn',
      token: 'jwt-token',
      repository: {
        description: 'Old description',
        full_description: 'Old overview',
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

    vi.spyOn(utility, 'pathExists').mockResolvedValue(true);

    vi.spyOn(fs, 'readFile').mockResolvedValue('# Nova overview');

    vi.spyOn(DockerHub, 'fetchCategories').mockResolvedValue([{
      name: 'Networking',
      slug: 'networking',
    }]);

    vi.spyOn(DockerHub, 'updateIdentity').mockResolvedValue({
      ok: true,
      status: 200,
      body: undefined,
    });

    vi.spyOn(DockerHub, 'updateCategories').mockResolvedValue({
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

  it('updates only changed identity fields and categories', async () => {
    await CliRecipeDockerHubSyncIdentity.run({});

    expect(DockerHub['updateIdentity']).toHaveBeenCalledWith(
      'mrjackyliang',
      'transmission-vpn',
      'jwt-token',
      'Nova short description',
      '# Nova overview',
    );

    expect(DockerHub['updateCategories']).toHaveBeenCalledWith(
      'mrjackyliang',
      'transmission-vpn',
      'jwt-token',
      [{
        name: 'Networking',
        slug: 'networking',
      }],
    );

    return;
  });

  it('sends nothing during a dry run', async () => {
    vi.mocked(dockerHubPrecheck).mockResolvedValue({
      workingFile: {
        project: {
          description: { short: 'Nova short description' },
        },
      },
      dockerHub: {
        namespace: 'mrjackyliang',
        repository: 'transmission-vpn',
        categories: ['networking'],
      },
      namespace: 'mrjackyliang',
      repositoryName: 'transmission-vpn',
      token: 'jwt-token',
      repository: {
        description: 'Old description',
        full_description: 'Old overview',
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

    await CliRecipeDockerHubSyncIdentity.run({ dryRun: true });

    expect(DockerHub['updateIdentity']).not.toHaveBeenCalled();

    expect(DockerHub['updateCategories']).not.toHaveBeenCalled();

    return;
  });

  it('rejects an unknown live category before sending changes', async () => {
    vi.mocked(DockerHub['fetchCategories']).mockResolvedValue([{
      name: 'Security',
      slug: 'security',
    }]);

    await CliRecipeDockerHubSyncIdentity.run({});

    expect(DockerHub['updateIdentity']).not.toHaveBeenCalled();

    expect(DockerHub['updateCategories']).not.toHaveBeenCalled();

    expect(process.exitCode).toBe(1);

    return;
  });

  return;
});

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
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import * as utility from '../../../../lib/utility.js';
import { Logger } from '../../../../toolkit/index.js';

/**
 * Tests - CLI - Recipe - Docker Hub - Docker Hub Precheck - Docker Hub Precheck.
 *
 * @since 0.40.0
 */
describe('dockerHubPrecheck', () => {
  beforeEach(() => {
    process.exitCode = undefined;

    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      dockerHub: {
        namespace: 'mrjackyliang',
        repository: 'transmission-vpn',
      },
      recipes: {
        'docker-hub': {
          'sync-identity': { enabled: true },
        },
      },
    });

    return;
  });

  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = undefined;

    return;
  });

  it('reports the exact missing login error', async () => {
    vi.spyOn(DockerHub, 'findCredentials').mockReturnValue(undefined);

    vi.spyOn(Logger, 'error').mockImplementation(vi.fn());

    await expect(dockerHubPrecheck('sync-identity', {})).resolves.toBeUndefined();

    expect(Logger['error']).toHaveBeenCalledWith('No Docker Hub login found. Run "docker login".');

    expect(process.exitCode).toBe(1);

    return;
  });

  it('reports the exact missing repository error', async () => {
    vi.spyOn(DockerHub, 'findCredentials').mockReturnValue({
      username: 'jacky',
      secret: 'personal-access-token',
      source: 'config',
    });

    vi.spyOn(DockerHub, 'login').mockResolvedValue('jwt-token');

    vi.spyOn(DockerHub, 'getRepository').mockResolvedValue({
      ok: false,
      status: 404,
      body: undefined,
    });

    vi.spyOn(Logger, 'error').mockImplementation(vi.fn());

    await expect(dockerHubPrecheck('sync-identity', {})).resolves.toBeUndefined();

    expect(Logger['error']).toHaveBeenCalledWith('Docker Hub repository mrjackyliang/transmission-vpn does not exist. Push the first image, then run the recipe again.');

    expect(process.exitCode).toBe(1);

    return;
  });

  it('returns the authenticated repository context', async () => {
    vi.spyOn(DockerHub, 'findCredentials').mockReturnValue({
      username: 'jacky',
      secret: 'personal-access-token',
      source: 'config',
    });

    vi.spyOn(DockerHub, 'login').mockResolvedValue('jwt-token');

    vi.spyOn(DockerHub, 'getRepository').mockResolvedValue({
      ok: true,
      status: 200,
      body: {
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
    });

    await expect(dockerHubPrecheck('sync-identity', { dryRun: true })).resolves.toMatchObject({
      namespace: 'mrjackyliang',
      repositoryName: 'transmission-vpn',
      token: 'jwt-token',
      isDryRun: true,
    });

    return;
  });

  it('skips a disabled recipe before reading credentials', async () => {
    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      dockerHub: {
        namespace: 'mrjackyliang',
        repository: 'transmission-vpn',
      },
      recipes: {
        'docker-hub': {
          'sync-identity': { enabled: false },
        },
      },
    });

    vi.spyOn(DockerHub, 'findCredentials');

    await expect(dockerHubPrecheck('sync-identity', {})).resolves.toBeUndefined();

    expect(DockerHub['findCredentials']).not.toHaveBeenCalled();

    expect(process.exitCode).toBeUndefined();

    return;
  });

  return;
});

import { notStrictEqual, strictEqual } from 'node:assert/strict';

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Runner as CliRecipePackageJsonSyncIdentity } from '../../../../cli/recipe/package-json/sync-identity.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';
import { Runner as LibReleaseHistory } from '../../../../lib/release-history.js';
import * as utility from '../../../../lib/utility.js';

/**
 * Tests - CLI - Recipe - package.json - Sync Identity Keywords - CliRecipePackageJsonSyncIdentity Keywords.
 *
 * @since 0.49.0
 */
describe('CliRecipePackageJsonSyncIdentity keywords', async () => {
  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = 0;

    return;
  });

  it('stops before writing when a Homebridge plugin would lose homebridge-plugin', async () => {
    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(utility, 'loadWorkspaceManifests').mockResolvedValue([]);

    vi.spyOn(LibReleaseHistory, 'validateStrategy').mockResolvedValue(undefined);

    vi.spyOn(process['stderr'], 'write').mockImplementation(() => true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      project: {
        keywords: ['homekit'],
        platforms: [
          'nodejs',
          'homebridge',
        ],
      },
      workspaces: {
        './packages/homebridge-example': {
          name: 'homebridge-example',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/homebridge-example': {
            'sync-identity': {
              enabled: true,
              settings: {
                keywords: true,
              },
            },
          },
        },
      },
    });

    await CliRecipePackageJsonSyncIdentity.run({});

    strictEqual(process.exitCode, 1);

    expect(utility['loadWorkspaceManifests']).not.toHaveBeenCalled();

    expect(process['stderr']['write']).toHaveBeenCalledWith(expect.stringContaining('does not include "homebridge-plugin"'));

    return;
  });

  it('keeps going when the Homebridge plugin keywords are not synced', async () => {
    vi.spyOn(utility, 'isProjectRoot').mockResolvedValue(true);

    vi.spyOn(utility, 'loadWorkspaceManifests').mockResolvedValue([]);

    vi.spyOn(LibReleaseHistory, 'validateStrategy').mockResolvedValue(undefined);

    vi.spyOn(process['stderr'], 'write').mockImplementation(() => true);

    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      project: {
        keywords: ['homekit'],
        platforms: ['homebridge'],
      },
      workspaces: {
        './packages/homebridge-example': {
          name: 'homebridge-example',
          role: 'package',
          policy: 'distributable',
        },
      },
      recipes: {
        'package-json': {
          './packages/homebridge-example': {
            'sync-identity': {
              enabled: true,
            },
          },
        },
      },
    });

    await CliRecipePackageJsonSyncIdentity.run({});

    notStrictEqual(process.exitCode, 1);

    expect(utility['loadWorkspaceManifests']).toHaveBeenCalledTimes(1);

    return;
  });

  return;
});

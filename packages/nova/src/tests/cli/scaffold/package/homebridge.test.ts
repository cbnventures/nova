import {
  notStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Runner as CliScaffoldPackageHomebridge } from '../../../../cli/scaffold/package/homebridge.js';
import { Runner as LibNovaConfig } from '../../../../lib/nova-config.js';

/**
 * Tests - CLI - Scaffold - Package - Homebridge - CLI Scaffold Package Homebridge.
 *
 * @since 0.49.0
 */
describe('CliScaffoldPackageHomebridge', async () => {
  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = 0;

    return;
  });

  it('writes no files when project keywords lack homebridge-plugin', async () => {
    vi.spyOn(LibNovaConfig.prototype, 'load').mockResolvedValue({
      project: {
        keywords: ['homekit'],
      },
    });

    vi.spyOn(process['stderr'], 'write').mockImplementation(() => true);

    strictEqual(await Reflect.apply(Reflect.get(CliScaffoldPackageHomebridge, 'resolveReplacements'), CliScaffoldPackageHomebridge, [
      'example',
      '/example/project',
    ]), undefined);

    strictEqual(process.exitCode, 1);

    expect(process['stderr']['write']).toHaveBeenCalledWith(expect.stringContaining('does not include "homebridge-plugin", which the npm keywords of the Homebridge plugin "./packages/example" must contain.'));

    return;
  });

  it('continues when project keywords include homebridge-plugin or are not set', async () => {
    vi.spyOn(LibNovaConfig.prototype, 'load')
      .mockResolvedValueOnce({
        project: {
          keywords: [
            'homekit',
            'homebridge-plugin',
          ],
        },
      })
      .mockResolvedValueOnce({});

    ok(await Reflect.apply(Reflect.get(CliScaffoldPackageHomebridge, 'resolveReplacements'), CliScaffoldPackageHomebridge, [
      'example',
      '/example/project',
    ]) instanceof Map);

    ok(await Reflect.apply(Reflect.get(CliScaffoldPackageHomebridge, 'resolveReplacements'), CliScaffoldPackageHomebridge, [
      'example',
      '/example/project',
    ]) instanceof Map);

    notStrictEqual(process.exitCode, 1);

    return;
  });

  return;
});

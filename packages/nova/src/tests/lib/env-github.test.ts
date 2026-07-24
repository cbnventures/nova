import {
  deepStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';

import {
  describe,
  it,
  vi,
} from 'vitest';

import {
  libEnvGithub,
  parseGhNames,
} from '../../lib/env-github.js';
import * as utility from '../../lib/utility.js';

/**
 * Tests - Lib - Env GitHub - Lib Env GitHub.
 *
 * @since 0.21.0
 */
describe('libEnvGithub', () => {
  it('reports gh as unavailable when the CLI is missing', async () => {
    vi.spyOn(utility, 'isCommandExists').mockResolvedValue(false);

    deepStrictEqual(await libEnvGithub.read(), {
      available: false,
      variables: [],
      secrets: [],
    });

    vi.restoreAllMocks();

    return;
  });

  it('lists variable and secret names when gh is available', async () => {
    vi.spyOn(utility, 'isCommandExists').mockResolvedValue(true);

    vi.spyOn(utility, 'executeShell').mockImplementation(async (command) => {
      if (command.includes('variable list') === true) {
        return {
          textOut: JSON.stringify([
            { name: 'CBN_A' },
            { name: 'CBN_B' },
          ]),
          textError: '',
          code: 0,
        };
      }

      if (command.includes('secret list') === true) {
        return {
          textOut: JSON.stringify([{ name: 'CBN_S' }]),
          textError: '',
          code: 0,
        };
      }

      return {
        textOut: '',
        textError: '',
        code: 0,
      };
    });

    deepStrictEqual(await libEnvGithub.read(), {
      available: true,
      variables: [
        'CBN_A',
        'CBN_B',
      ],
      secrets: ['CBN_S'],
    });

    vi.restoreAllMocks();

    return;
  });

  it('creates a secret stub through gh secret set', async () => {
    vi.spyOn(utility, 'executeShell').mockImplementation(async (command) => ({
      textOut: '',
      textError: '',
      code: (command.includes('gh secret set') === true) ? 0 : 1,
    }));

    strictEqual(await libEnvGithub.createStub('CBN_TOKEN', true), true);

    vi.restoreAllMocks();

    return;
  });

  it('creates a variable stub through gh variable set', async () => {
    vi.spyOn(utility, 'executeShell').mockImplementation(async (command) => ({
      textOut: '',
      textError: '',
      code: (command.includes('gh variable set') === true) ? 0 : 1,
    }));

    strictEqual(await libEnvGithub.createStub('CBN_REGION', false), true);

    vi.restoreAllMocks();

    return;
  });

  it('deletes a secret through gh secret delete', async () => {
    vi.spyOn(utility, 'executeShell').mockImplementation(async (command) => ({
      textOut: '',
      textError: '',
      code: (command.includes('gh secret delete') === true) ? 0 : 1,
    }));

    strictEqual(await libEnvGithub.delete('CBN_TOKEN', true), true);

    vi.restoreAllMocks();

    return;
  });

  it('shell-quotes the key name in every assembled gh command', async () => {
    vi.spyOn(utility, 'executeShell').mockImplementation(async () => ({
      textOut: '',
      textError: '',
      code: 0,
    }));

    await libEnvGithub.createStub('CBN_TOKEN', true);
    await libEnvGithub.createStub('CBN_REGION', false);

    await libEnvGithub.delete('CBN_TOKEN', true);
    await libEnvGithub.delete('CBN_REGION', false);

    deepStrictEqual(vi.mocked(utility['executeShell']).mock.calls.map((call) => call[0]), [
      'gh secret set "CBN_TOKEN" --body "NOVA_PLACEHOLDER"',
      'gh variable set "CBN_REGION" --body "NOVA_PLACEHOLDER"',
      'gh secret delete "CBN_TOKEN"',
      'gh variable delete "CBN_REGION"',
    ]);

    vi.restoreAllMocks();

    return;
  });

  it('sends a non-empty placeholder body and never an empty body when stubbing', async () => {
    vi.spyOn(utility, 'executeShell').mockImplementation(async () => ({
      textOut: '',
      textError: '',
      code: 0,
    }));

    await libEnvGithub.createStub('CBN_TOKEN', true);
    await libEnvGithub.createStub('CBN_REGION', false);

    // A stub written with an empty "--body" is the 422 bug: GitHub rejects an empty variable
    // outright and leaves an empty secret un-editable, so every assembled stub command for both
    // a secret and a variable must carry a non-empty placeholder body.
    for (const stubCommand of vi.mocked(utility['executeShell']).mock.calls.map((call) => call[0])) {
      ok(stubCommand.includes('--body ""') === false, 'createStub must never send an empty --body');
      ok(stubCommand.includes('--body "NOVA_PLACEHOLDER"') === true, 'createStub must send a non-empty placeholder body');
    }

    vi.restoreAllMocks();

    return;
  });

  it('parses gh json output and tolerates invalid json', () => {
    deepStrictEqual(parseGhNames(JSON.stringify([
      { name: 'A' },
      { name: 'B' },
    ])), [
      'A',
      'B',
    ]);
    deepStrictEqual(parseGhNames('not json'), []);

    return;
  });

  return;
});

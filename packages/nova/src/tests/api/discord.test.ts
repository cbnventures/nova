import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { Runner as ApiDiscord } from '../../api/discord.js';

/**
 * Tests - API - Discord - Fetch Current Application.
 *
 * @since 0.49.0
 */
describe('ApiDiscord.fetchCurrentApplication', async () => {
  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('sends the bot token to the current-application endpoint and returns its identity', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      id: '123456789012345678',
      name: 'Example Bot',
      verify_key: 'not-returned',
    }), { status: 200 })));

    deepStrictEqual(await ApiDiscord.fetchCurrentApplication('example-token'), {
      id: '123456789012345678',
      name: 'Example Bot',
    });

    expect(global['fetch']).toHaveBeenCalledWith('https://discord.com/api/v10/oauth2/applications/@me', {
      headers: {
        'Authorization': 'Bot example-token',
        'Accept': 'application/json',
      },
    });

    return;
  });

  it('throws with the status and body when Discord rejects the token', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response('401: Unauthorized', { status: 401 })));

    await expect(ApiDiscord.fetchCurrentApplication('bad-token')).rejects.toThrow('Discord token validation failed (401): 401: Unauthorized');

    return;
  });

  it('throws when the application has no name', async () => {
    vi.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve(new Response(JSON.stringify({
      id: '123456789012345678',
    }), { status: 200 })));

    await expect(ApiDiscord.fetchCurrentApplication('example-token')).rejects.toThrow('Discord application name must be a non-empty string.');

    strictEqual(vi.mocked(global['fetch']).mock.calls.length, 1);

    return;
  });

  return;
});

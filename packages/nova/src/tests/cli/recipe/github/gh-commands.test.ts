import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import { executeGhCommands } from '../../../../cli/recipe/github/gh-commands.js';
import * as utility from '../../../../lib/utility.js';

/**
 * Tests - CLI - Recipe - GitHub - Gh Commands - Gh Commands.
 *
 * Verifies the shared executor previews dry runs and stops ordered mutations at
 * the first GitHub CLI failure.
 *
 * @since 0.26.0
 */
describe('gh commands', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    process.exitCode = undefined;

    return;
  });

  it('does not execute previewed commands during a dry run', async () => {
    vi.spyOn(utility, 'executeShell').mockResolvedValue({
      textOut: '',
      textError: '',
      code: 0,
    });

    await expect(executeGhCommands([
      'gh api first',
      'gh api second',
    ], 'sync-security', true)).resolves.toBe(true);

    expect(utility['executeShell']).not.toHaveBeenCalled();

    return;
  });

  it('runs mutations in order and stops at the first failure', async () => {
    vi.spyOn(utility, 'executeShell')
      .mockResolvedValueOnce({
        textOut: '',
        textError: '',
        code: 0,
      })
      .mockResolvedValueOnce({
        textOut: '',
        textError: 'permission denied',
        code: 1,
      });

    await expect(executeGhCommands([
      'gh api first',
      'gh api second',
      'gh api third',
    ], 'sync-security', false)).resolves.toBe(false);

    expect(utility['executeShell']).toHaveBeenNthCalledWith(1, 'gh api first');

    expect(utility['executeShell']).toHaveBeenNthCalledWith(2, 'gh api second');

    expect(utility['executeShell']).toHaveBeenCalledTimes(2);

    return;
  });

  return;
});

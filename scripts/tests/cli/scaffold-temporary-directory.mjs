import {
  existsSync,
  realpathSync,
} from 'node:fs';

import {
  describe,
  expect,
  it,
} from 'vitest';

import {
  createScaffoldTemporaryDirectory,
  removeScaffoldTemporaryDirectory,
} from '../../lib/scaffold-temporary-directory.mjs';

/**
 * Tests - CLI - Scaffold Temporary Directory - Scaffold Temporary Directory.
 *
 * Locks the scaffold smoke harness to one canonical path spelling and verifies
 * its Windows-friendly recursive cleanup contract.
 *
 * @since 0.0.0
 */
describe('Scaffold temporary directory', () => {
  it('creates a canonical directory and removes it', () => {
    const directory = createScaffoldTemporaryDirectory();

    expect(directory).toBe(realpathSync.native(directory));

    expect(existsSync(directory)).toBe(true);

    removeScaffoldTemporaryDirectory(directory);

    expect(existsSync(directory)).toBe(false);

    return;
  });

  return;
});

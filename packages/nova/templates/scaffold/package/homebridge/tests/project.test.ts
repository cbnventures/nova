import {
  describe,
  expect,
  it,
} from 'vitest';

import packageJson from '../package.json' with { type: 'json' };

/**
 * Project - Workspace Identity.
 *
 * Confirms the generated workspace keeps its registered package identity.
 *
 * @since 0.0.0
 */
describe('Workspace identity', () => {
  it('uses the generated package name', () => {
    expect(packageJson['name']).toBe('[__WORKSPACE_PACKAGE_NAME__]');

    return;
  });

  return;
});

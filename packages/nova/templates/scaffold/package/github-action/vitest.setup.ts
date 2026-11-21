import { VitestSetup } from '@cbnventures/nova/toolkit';
import { afterEach, beforeEach, vi } from 'vitest';

/**
 * Vitest.
 *
 * Global test hooks suppressing Logger output via stdout/stderr spies
 * and resetting the process exit code that a failed action run sets.
 *
 * @since 0.0.0
 */
VitestSetup.register({
  afterEach,
  beforeEach,
  vi,
});

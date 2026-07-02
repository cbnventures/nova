import { resolve } from 'node:path';

import { registerDotenvSuite } from '@cbnventures/nova/rules/vitest';

/**
 * Tests - Dotenv.
 *
 * This repository self-checks its own `.env` / `.env.sample` quote convention
 * THROUGH the published kit. The suite logic lives in
 * @cbnventures/nova/rules/vitest; this wrapper supplies the configuration that
 * reproduces this repository's conventions. The `.env` files live at the
 * monorepo root, two levels up from this docs workspace, so `rootDir` resolves
 * there from the Vitest working directory.
 *
 * @since 0.20.0
 */
registerDotenvSuite({
  enable: 'all',
  rootDir: resolve(process.cwd(), '..', '..'),
});

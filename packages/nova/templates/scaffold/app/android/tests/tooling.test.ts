import { registerToolingCoverageSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tooling.
 *
 * Confirms every helper script is linted and type-checked, and that no TSConfig
 * turns on "skipLibCheck".
 *
 * @since 0.0.0
 */
registerToolingCoverageSuite({
  vitest,
  enable: 'all',
});

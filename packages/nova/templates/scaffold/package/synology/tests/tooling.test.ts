import { registerToolingCoverageSuite } from '@cbnventures/nova/rules/vitest';
import * as vitest from 'vitest';

/**
 * Tooling.
 *
 * Confirms every helper script is linted and type-checked, and that no TSConfig
 * turns on skipLibCheck.
 *
 * @since UNRELEASED
 */
registerToolingCoverageSuite({
  vitest,
  enable: 'all',
});

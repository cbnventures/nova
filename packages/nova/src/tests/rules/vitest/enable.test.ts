import { strictEqual } from 'node:assert/strict';

import {
  describe,
  it,
} from 'vitest';

import { isEnabled } from '../../../rules/vitest/enable.js';

import type {
  Tests_Rules_Vitest_Enable_IsEnabled_ReturnsFalseWhenTheKeyIsNotListed_Result,
  Tests_Rules_Vitest_Enable_IsEnabled_ReturnsTrueWhenEnableIsAll_Result,
  Tests_Rules_Vitest_Enable_IsEnabled_ReturnsTrueWhenTheKeyIsListed_Result,
  Tests_Rules_Vitest_Enable_IsEnabled_ToggleKey,
} from '../../../types/tests/rules/vitest/enable.test.d.ts';

/**
 * Tests - Rules - Vitest - Enable - Is Enabled.
 *
 * @since 0.20.0
 */
describe('isEnabled', () => {
  it('returns true when enable is all', () => {
    const result: Tests_Rules_Vitest_Enable_IsEnabled_ReturnsTrueWhenEnableIsAll_Result = isEnabled<Tests_Rules_Vitest_Enable_IsEnabled_ToggleKey>('x', 'all');

    strictEqual(result, true);

    return;
  });

  it('returns true when the key is listed', () => {
    const result: Tests_Rules_Vitest_Enable_IsEnabled_ReturnsTrueWhenTheKeyIsListed_Result = isEnabled<Tests_Rules_Vitest_Enable_IsEnabled_ToggleKey>('x', ['x']);

    strictEqual(result, true);

    return;
  });

  it('returns false when the key is not listed', () => {
    const result: Tests_Rules_Vitest_Enable_IsEnabled_ReturnsFalseWhenTheKeyIsNotListed_Result = isEnabled<Tests_Rules_Vitest_Enable_IsEnabled_ToggleKey>('x', ['y']);

    strictEqual(result, false);

    return;
  });

  return;
});

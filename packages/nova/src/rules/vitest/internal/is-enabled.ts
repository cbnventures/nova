import type {
  Rules_Vitest_Internal_IsEnabled_IsEnabled_Enable,
  Rules_Vitest_Internal_IsEnabled_IsEnabled_Key,
  Rules_Vitest_Internal_IsEnabled_IsEnabled_Returns,
} from '../../../types/rules/vitest/internal/is-enabled.d.ts';

/**
 * Rules - Vitest - Internal - Is Enabled - Is Enabled.
 *
 * Resolves whether a single toggle key is active for a suite. The `enable` value is
 * either the string `all` (every key is active) or an explicit array of keys (only the
 * listed keys are active). Used by every register function to gate its checks.
 *
 * @param {Rules_Vitest_Internal_IsEnabled_IsEnabled_Key<ToggleKey>}    key    - Key.
 * @param {Rules_Vitest_Internal_IsEnabled_IsEnabled_Enable<ToggleKey>} enable - Enable.
 *
 * @returns {Rules_Vitest_Internal_IsEnabled_IsEnabled_Returns}
 *
 * @since 0.20.0
 */
export function isEnabled<ToggleKey extends string>(key: Rules_Vitest_Internal_IsEnabled_IsEnabled_Key<ToggleKey>, enable: Rules_Vitest_Internal_IsEnabled_IsEnabled_Enable<ToggleKey>): Rules_Vitest_Internal_IsEnabled_IsEnabled_Returns {
  if (enable === 'all') {
    return true;
  }

  return enable.includes(key);
}

import type {
  Rules_Vitest_ActiveVitest_GetActiveVitest_Returns,
  Rules_Vitest_ActiveVitest_ResetActiveVitest_Returns,
  Rules_Vitest_ActiveVitest_SetActiveVitest_Returns,
  Rules_Vitest_ActiveVitest_SetActiveVitest_Vitest,
  Rules_Vitest_ActiveVitest_State,
} from '../../types/rules/vitest/active-vitest.d.ts';

/**
 * Rules - Vitest - Active Vitest - State.
 *
 * Module-level holder for the consumer's live vitest namespace, injected by the
 * register function so suites call describe/it off the same copy the test worker drives.
 * Invariant: one namespace per test file (last-writer-wins, read by factories).
 *
 * @since 0.21.0
 */
let state: Rules_Vitest_ActiveVitest_State = undefined;

/**
 * Rules - Vitest - Active Vitest - Get Active Vitest.
 *
 * Returns the vitest namespace stored by the register function. Throws when no register
 * function has injected a namespace yet, which means a rule module was used without its
 * suite being registered first.
 *
 * @returns {Rules_Vitest_ActiveVitest_GetActiveVitest_Returns}
 *
 * @since 0.21.0
 */
export function getActiveVitest(): Rules_Vitest_ActiveVitest_GetActiveVitest_Returns {
  if (state === undefined) {
    throw new Error('Active vitest namespace is not set. Call the suite register function with a `vitest` config field (import * as vitest from "vitest") before the rules run.');
  }

  return state;
}

/**
 * Rules - Vitest - Active Vitest - Reset Active Vitest.
 *
 * Clears the stored vitest namespace back to `undefined`. Used by the holder's own tests to
 * restore a clean, isolated starting state before each case.
 *
 * @returns {Rules_Vitest_ActiveVitest_ResetActiveVitest_Returns}
 *
 * @since 0.21.0
 */
export function resetActiveVitest(): Rules_Vitest_ActiveVitest_ResetActiveVitest_Returns {
  state = undefined;

  return;
}

/**
 * Rules - Vitest - Active Vitest - Set Active Vitest.
 *
 * Stores the consumer's live vitest namespace so the rule modules can later retrieve it via
 * `getActiveVitest`. Re-setting the SAME object is allowed, but setting a DIFFERENT one when
 * a namespace is already held throws (enforces one namespace per test file).
 *
 * @param {Rules_Vitest_ActiveVitest_SetActiveVitest_Vitest} vitest - Vitest.
 *
 * @returns {Rules_Vitest_ActiveVitest_SetActiveVitest_Returns}
 *
 * @since 0.21.0
 */
export function setActiveVitest(vitest: Rules_Vitest_ActiveVitest_SetActiveVitest_Vitest): Rules_Vitest_ActiveVitest_SetActiveVitest_Returns {
  if (state !== undefined && state !== vitest) {
    throw new Error('A different vitest namespace is already active. All register*Suite calls in one test file must share a single vitest namespace (import * as vitest from "vitest") because the holder is last-writer-wins and the describe factories read it during the deferred collection phase.');
  }

  state = vitest;

  return;
}

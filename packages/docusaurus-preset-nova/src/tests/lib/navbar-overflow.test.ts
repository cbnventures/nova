import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { resolveNavbarVisibleCount } from '../../lib/use-navbar-overflow.js';

import type {
  Tests_Lib_NavbarOverflow_ResolveNavbarVisibleCount_DoesNotReserveTheMoreControlWhenEveryItemFits_Result,
  Tests_Lib_NavbarOverflow_ResolveNavbarVisibleCount_ReservesTheMoreControlOnlyAfterOverflowIsConfirmed_Result,
  Tests_Lib_NavbarOverflow_ResolveNavbarVisibleCount_RevealsItemsAgainWhenTheAvailableSpaceGrows_Expanded,
  Tests_Lib_NavbarOverflow_ResolveNavbarVisibleCount_RevealsItemsAgainWhenTheAvailableSpaceGrows_Narrow,
} from '../../types/tests/lib/navbar-overflow.test.d.ts';

/**
 * Tests - Lib - Navbar Overflow - Resolve Navbar Visible Count.
 *
 * @since 0.33.0
 */
describe('resolveNavbarVisibleCount', () => {
  it('does not reserve the More control when every item fits', () => {
    const result: Tests_Lib_NavbarOverflow_ResolveNavbarVisibleCount_DoesNotReserveTheMoreControlWhenEveryItemFits_Result = resolveNavbarVisibleCount({
      availablePixels: 210,
      childrenWidths: [
        100,
        100,
      ],
      gap: 10,
      triggerPixels: 40,
    });

    strictEqual(result, 2);

    return;
  });

  it('reserves the More control only after overflow is confirmed', () => {
    const result: Tests_Lib_NavbarOverflow_ResolveNavbarVisibleCount_ReservesTheMoreControlOnlyAfterOverflowIsConfirmed_Result = resolveNavbarVisibleCount({
      availablePixels: 300,
      childrenWidths: [
        100,
        100,
        100,
      ],
      gap: 10,
      triggerPixels: 40,
    });

    strictEqual(result, 2);

    return;
  });

  it('reveals items again when the available space grows', () => {
    const narrow: Tests_Lib_NavbarOverflow_ResolveNavbarVisibleCount_RevealsItemsAgainWhenTheAvailableSpaceGrows_Narrow = resolveNavbarVisibleCount({
      availablePixels: 300,
      childrenWidths: [
        100,
        100,
        100,
      ],
      gap: 10,
      triggerPixels: 40,
    });
    const expanded: Tests_Lib_NavbarOverflow_ResolveNavbarVisibleCount_RevealsItemsAgainWhenTheAvailableSpaceGrows_Expanded = resolveNavbarVisibleCount({
      availablePixels: 320,
      childrenWidths: [
        100,
        100,
        100,
      ],
      gap: 10,
      triggerPixels: 40,
    });

    strictEqual(narrow, 2);
    strictEqual(expanded, 3);

    return;
  });

  return;
});

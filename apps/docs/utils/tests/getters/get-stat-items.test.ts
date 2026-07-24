import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { fetchStatItems } from '../../getters/get-stat-items.js';

import type {
  Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Colors,
  Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Labels,
  Tests_Getters_GetStatItems_FetchStatItems_ReturnsPositiveCountsForEachStatCategory_ParsedValue,
} from '../../types/tests/getters/get-stat-items.test.d.ts';

/**
 * Tests - Getters - Get Stat Items - Fetch Stat Items.
 *
 * @since 0.15.0
 */
describe('fetchStatItems', () => {
  it('returns four stat items with expected labels and colors', () => {
    strictEqual(fetchStatItems().length, 4);

    const labels: Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Labels = fetchStatItems().map((item) => item['label']);

    deepStrictEqual(labels, [
      'Custom lint rules',
      'Config presets',
      'Project recipes',
      'Project scaffolds',
    ]);

    const colors: Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Colors = fetchStatItems().map((item) => item['color']);

    deepStrictEqual(colors, [
      'primary',
      'accent',
      'primary',
      'accent',
    ]);

    return;
  });

  it('returns positive counts for each stat category', () => {
    for (const item of fetchStatItems()) {
      const parsedValue: Tests_Getters_GetStatItems_FetchStatItems_ReturnsPositiveCountsForEachStatCategory_ParsedValue = Number(item['value']);

      strictEqual(Number.isNaN(parsedValue), false);
      strictEqual(parsedValue > 0, true);
    }

    return;
  });

  return;
});

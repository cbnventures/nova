import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { fetchStatItems } from '../../getters/get-stat-items.js';

import type {
  Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Colors,
  Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Labels,
  Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Result,
  Tests_Getters_GetStatItems_FetchStatItems_ReturnsPositiveCountsForEachStatCategory_ParsedValue,
  Tests_Getters_GetStatItems_FetchStatItems_ReturnsPositiveCountsForEachStatCategory_Result,
} from '../../types/tests/getters/get-stat-items.test.d.ts';

/**
 * Tests - Getters - Get Stat Items - Fetch Stat Items.
 *
 * @since 0.15.0
 */
describe('fetchStatItems', () => {
  it('returns four stat items with expected labels and colors', () => {
    const result: Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Result = fetchStatItems();

    strictEqual(result.length, 4);

    const labels: Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Labels = result.map((item) => item['label']);

    deepStrictEqual(labels, [
      'Custom lint rules',
      'Config presets',
      'Project recipes',
      'Project scaffolds',
    ]);

    const colors: Tests_Getters_GetStatItems_FetchStatItems_ReturnsFourStatItemsWithExpectedLabelsAndColors_Colors = result.map((item) => item['color']);

    deepStrictEqual(colors, [
      'primary',
      'accent',
      'primary',
      'accent',
    ]);

    return;
  });

  it('returns positive counts for each stat category', () => {
    const result: Tests_Getters_GetStatItems_FetchStatItems_ReturnsPositiveCountsForEachStatCategory_Result = fetchStatItems();

    for (const item of result) {
      const parsedValue: Tests_Getters_GetStatItems_FetchStatItems_ReturnsPositiveCountsForEachStatCategory_ParsedValue = Number(item['value']);

      strictEqual(Number.isNaN(parsedValue), false);
      strictEqual(parsedValue > 0, true);
    }

    return;
  });

  return;
});

import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { fetchStatItems } from '../../getters/get-stat-items.js';

import type {
  TestsGettersGetStatItemsFetchStatItemsColors,
  TestsGettersGetStatItemsFetchStatItemsLabels,
  TestsGettersGetStatItemsFetchStatItemsParsedValue,
  TestsGettersGetStatItemsFetchStatItemsResult,
} from '../../types/tests/getters/get-stat-items.test.d.ts';

/**
 * Tests - Getters - Get Stat Items - Fetch Stat Items.
 *
 * @since 0.15.0
 */
describe('fetchStatItems', () => {
  it('returns four stat items with expected labels and colors', () => {
    const result: TestsGettersGetStatItemsFetchStatItemsResult = fetchStatItems();

    strictEqual(result.length, 4);

    const labels: TestsGettersGetStatItemsFetchStatItemsLabels = result.map((item) => item['label']);

    deepStrictEqual(labels, [
      'Custom lint rules',
      'Config presets',
      'Project recipes',
      'Project scaffolds',
    ]);

    const colors: TestsGettersGetStatItemsFetchStatItemsColors = result.map((item) => item['color']);

    deepStrictEqual(colors, [
      'primary',
      'accent',
      'primary',
      'accent',
    ]);

    return;
  });

  it('returns positive counts for each stat category', () => {
    const result: TestsGettersGetStatItemsFetchStatItemsResult = fetchStatItems();

    for (const item of result) {
      const parsedValue: TestsGettersGetStatItemsFetchStatItemsParsedValue = Number(item['value']);

      strictEqual(Number.isNaN(parsedValue), false);
      strictEqual(parsedValue > 0, true);
    }

    return;
  });

  return;
});

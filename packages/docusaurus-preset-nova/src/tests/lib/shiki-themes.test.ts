import { strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { getShikiThemes } from '../../lib/shiki-themes.js';

import type {
  TestsLibShikiThemesDark,
  TestsLibShikiThemesLight,
  TestsLibShikiThemesResult,
} from '../../types/tests/lib/shiki-themes.test.d.ts';

/**
 * Tests - Lib - Shiki Themes - Get Shiki Themes.
 *
 * @since 0.15.0
 */
describe('getShikiThemes', async () => {
  it('returns github themes for foundry preset', () => {
    const result: TestsLibShikiThemesResult = getShikiThemes('foundry');
    const light: TestsLibShikiThemesLight = result['light'];
    const dark: TestsLibShikiThemesDark = result['dark'];

    strictEqual(light, 'github-light');
    strictEqual(dark, 'github-dark');

    return;
  });

  it('returns vitesse themes for sentinel preset', () => {
    const result: TestsLibShikiThemesResult = getShikiThemes('sentinel');
    const light: TestsLibShikiThemesLight = result['light'];
    const dark: TestsLibShikiThemesDark = result['dark'];

    strictEqual(light, 'vitesse-light');
    strictEqual(dark, 'vitesse-dark');

    return;
  });

  it('throws for unknown preset name', () => {
    throws(() => {
      getShikiThemes('nonexistent');

      return;
    });

    return;
  });

  return;
});

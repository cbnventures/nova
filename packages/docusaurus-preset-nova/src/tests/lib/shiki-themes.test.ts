import { strictEqual, throws } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { getShikiThemes } from '../../lib/shiki-themes.js';

import type {
  Tests_Lib_ShikiThemes_Dark,
  Tests_Lib_ShikiThemes_Light,
  Tests_Lib_ShikiThemes_Result,
} from '../../types/tests/lib/shiki-themes.test.d.ts';

/**
 * Tests - Lib - Shiki Themes - Get Shiki Themes.
 *
 * @since 0.15.0
 */
describe('getShikiThemes', async () => {
  it('returns github themes for foundry preset', () => {
    const result: Tests_Lib_ShikiThemes_Result = getShikiThemes('foundry');
    const light: Tests_Lib_ShikiThemes_Light = result['light'];
    const dark: Tests_Lib_ShikiThemes_Dark = result['dark'];

    strictEqual(light, 'github-light');
    strictEqual(dark, 'github-dark');

    return;
  });

  it('returns min-light and dracula themes for lantern preset', () => {
    const result: Tests_Lib_ShikiThemes_Result = getShikiThemes('lantern');
    const light: Tests_Lib_ShikiThemes_Light = result['light'];
    const dark: Tests_Lib_ShikiThemes_Dark = result['dark'];

    strictEqual(light, 'min-light');
    strictEqual(dark, 'dracula');

    return;
  });

  it('returns solarized themes for marshal preset', () => {
    const result: Tests_Lib_ShikiThemes_Result = getShikiThemes('marshal');
    const light: Tests_Lib_ShikiThemes_Light = result['light'];
    const dark: Tests_Lib_ShikiThemes_Dark = result['dark'];

    strictEqual(light, 'solarized-light');
    strictEqual(dark, 'solarized-dark');

    return;
  });

  it('returns vitesse themes for sentinel preset', () => {
    const result: Tests_Lib_ShikiThemes_Result = getShikiThemes('sentinel');
    const light: Tests_Lib_ShikiThemes_Light = result['light'];
    const dark: Tests_Lib_ShikiThemes_Dark = result['dark'];

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

import { ok } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { comparePresetThemeFiles } from '../../lib/compare-preset-theme-files.js';

import type { Tests_Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Result } from '../../types/tests/lib/compare-preset-theme-files.test.d.ts';

/**
 * Tests - Lib - Compare Preset Theme Files - Compare Preset Theme Files.
 *
 * @since 0.15.0
 */
describe('comparePresetThemeFiles', async () => {
  it('sorts the Navbar wrapper before any Navbar variant subfolder', () => {
    const result: Tests_Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Result = comparePresetThemeFiles('Navbar/style.css', 'Navbar/Bridge/style.css');

    ok(result < 0);

    return;
  });

  it('sorts a Navbar variant subfolder after the Navbar wrapper', () => {
    const result: Tests_Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Result = comparePresetThemeFiles('Navbar/Bridge/style.css', 'Navbar/style.css');

    ok(result > 0);

    return;
  });

  it('sorts the Footer wrapper before any Footer variant subfolder', () => {
    const result: Tests_Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Result = comparePresetThemeFiles('Footer/style.css', 'Footer/Commons/style.css');

    ok(result < 0);

    return;
  });

  it('sorts a Footer variant subfolder after the Footer wrapper', () => {
    const result: Tests_Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Result = comparePresetThemeFiles('Footer/Commons/style.css', 'Footer/style.css');

    ok(result > 0);

    return;
  });

  it('sorts Navbar variant subfolders alphabetically among themselves', () => {
    const result: Tests_Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Result = comparePresetThemeFiles('Navbar/Bridge/style.css', 'Navbar/Canopy/style.css');

    ok(result < 0);

    return;
  });

  it('sorts non-Navbar non-Footer paths alphabetically', () => {
    const result: Tests_Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Result = comparePresetThemeFiles('Admonition/style.css', 'DocItem/Content/style.css');

    ok(result < 0);

    return;
  });

  it('returns zero when comparing identical paths', () => {
    const result: Tests_Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Result = comparePresetThemeFiles('Navbar/style.css', 'Navbar/style.css');

    ok(result === 0);

    return;
  });

  it('keeps Admonition before Navbar wrapper (cross-component alpha order)', () => {
    const result: Tests_Lib_ComparePresetThemeFiles_ComparePresetThemeFiles_Result = comparePresetThemeFiles('Admonition/style.css', 'Navbar/style.css');

    ok(result < 0);

    return;
  });

  return;
});

import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsSentinelPresetSentinel } from '../../../presets/sentinel/preset.js';

import type {
  Tests_Presets_Sentinel_Preset_Footer,
  Tests_Presets_Sentinel_Preset_Navbar,
  Tests_Presets_Sentinel_Preset_Sentinel,
} from '../../../types/tests/presets/sentinel/preset.test.d.ts';

/**
 * Tests - Presets - Sentinel - Preset - Sentinel.
 *
 * @since 0.15.0
 */
describe('presetsSentinelPresetSentinel', async () => {
  it('has correct color values', () => {
    const sentinel: Tests_Presets_Sentinel_Preset_Sentinel = presetsSentinelPresetSentinel;

    deepStrictEqual(sentinel['colors']['primary'], {
      light: '#0d9488', dark: '#0d9488',
    });
    deepStrictEqual(sentinel['colors']['accent'], {
      light: '#6366f1', dark: '#6366f1',
    });
    deepStrictEqual(sentinel['colors']['text'], {
      light: '#1e293b', dark: '#e2e8f0',
    });
    deepStrictEqual(sentinel['colors']['border'], {
      light: '#cbd5e1', dark: '#334155',
    });

    return;
  });

  it('has correct font names', () => {
    const sentinel: Tests_Presets_Sentinel_Preset_Sentinel = presetsSentinelPresetSentinel;

    strictEqual(sentinel['fonts']['display'], 'Unbounded');
    strictEqual(sentinel['fonts']['body'], 'DM Sans');
    strictEqual(sentinel['fonts']['code'], 'JetBrains Mono');

    return;
  });

  it('has correct shape values', () => {
    const sentinel: Tests_Presets_Sentinel_Preset_Sentinel = presetsSentinelPresetSentinel;

    strictEqual(sentinel['shape']['radius'], 'rounded');
    strictEqual(sentinel['shape']['density'], 'comfortable');

    return;
  });

  it('has correct depth values', () => {
    const sentinel: Tests_Presets_Sentinel_Preset_Sentinel = presetsSentinelPresetSentinel;

    strictEqual(sentinel['depth']['cards'], 'flat');
    strictEqual(sentinel['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    const sentinel: Tests_Presets_Sentinel_Preset_Sentinel = presetsSentinelPresetSentinel;

    strictEqual(sentinel['motion']['speed'], 'subtle');
    strictEqual(sentinel['motion']['staggeredReveals'], false);
    strictEqual(sentinel['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Sentinel - Preset - Presets_Sentinel_Preset_Sentinel Navbar And Footer.
 *
 * Verifies that the sentinel preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.15.0
 */
describe('presetsSentinelPresetSentinel navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: Tests_Presets_Sentinel_Preset_Navbar = presetsSentinelPresetSentinel['navbar'];

    strictEqual(navbar, 'canopy');

    return;
  });

  it('has correct footer value', () => {
    const footer: Tests_Presets_Sentinel_Preset_Footer = presetsSentinelPresetSentinel['footer'];

    strictEqual(footer, 'embassy');

    return;
  });

  return;
});

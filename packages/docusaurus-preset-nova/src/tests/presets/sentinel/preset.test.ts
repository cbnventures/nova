import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsSentinelPresetSentinel } from '../../../presets/sentinel/preset.js';

import type {
  TestsPresetsSentinelPresetFooter,
  TestsPresetsSentinelPresetNavbar,
  TestsPresetsSentinelPresetSentinel,
} from '../../../types/tests/presets/sentinel/preset.test.d.ts';

/**
 * Tests - Presets - Sentinel - Preset - Sentinel.
 *
 * @since 0.15.0
 */
describe('presetsSentinelPresetSentinel', async () => {
  it('has correct color values', () => {
    const sentinel: TestsPresetsSentinelPresetSentinel = presetsSentinelPresetSentinel;

    strictEqual(sentinel['colors']['primary'], '#0d9488');
    strictEqual(sentinel['colors']['accent'], '#6366f1');
    strictEqual(sentinel['colors']['neutral'], '#64748b');

    return;
  });

  it('has correct font names', () => {
    const sentinel: TestsPresetsSentinelPresetSentinel = presetsSentinelPresetSentinel;

    strictEqual(sentinel['fonts']['display'], 'Unbounded');
    strictEqual(sentinel['fonts']['body'], 'DM Sans');
    strictEqual(sentinel['fonts']['code'], 'JetBrains Mono');

    return;
  });

  it('has correct shape values', () => {
    const sentinel: TestsPresetsSentinelPresetSentinel = presetsSentinelPresetSentinel;

    strictEqual(sentinel['shape']['radius'], 'rounded');
    strictEqual(sentinel['shape']['density'], 'comfortable');

    return;
  });

  it('has correct depth values', () => {
    const sentinel: TestsPresetsSentinelPresetSentinel = presetsSentinelPresetSentinel;

    strictEqual(sentinel['depth']['cards'], 'flat');
    strictEqual(sentinel['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    const sentinel: TestsPresetsSentinelPresetSentinel = presetsSentinelPresetSentinel;

    strictEqual(sentinel['motion']['speed'], 'subtle');
    strictEqual(sentinel['motion']['staggeredReveals'], false);
    strictEqual(sentinel['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Sentinel - Preset - PresetsSentinelPresetSentinel Navbar And Footer.
 *
 * Verifies that the sentinel preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.15.0
 */
describe('presetsSentinelPresetSentinel navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: TestsPresetsSentinelPresetNavbar = presetsSentinelPresetSentinel['navbar'];

    strictEqual(navbar, 'canopy');

    return;
  });

  it('has correct footer value', () => {
    const footer: TestsPresetsSentinelPresetFooter = presetsSentinelPresetSentinel['footer'];

    strictEqual(footer, 'embassy');

    return;
  });

  return;
});

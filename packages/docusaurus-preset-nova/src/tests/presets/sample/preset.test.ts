import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsSamplePresetSample } from '../../../presets/sample/preset.js';

import type {
  Tests_Presets_Sample_Preset_PresetsSamplePresetSampleNavbarAndFooter_HasCorrectFooterValue_Footer,
  Tests_Presets_Sample_Preset_PresetsSamplePresetSampleNavbarAndFooter_HasCorrectNavbarValue_Navbar,
} from '../../../types/tests/presets/sample/preset.test.d.ts';

/**
 * Tests - Presets - Sample - Preset - Sample.
 *
 * @since 0.18.0
 */
describe('presetsSamplePresetSample', async () => {
  it('has correct color values', () => {
    deepStrictEqual(presetsSamplePresetSample['colors']['primary'], {
      light: '#64748b', dark: '#64748b',
    });
    deepStrictEqual(presetsSamplePresetSample['colors']['accent'], {
      light: '#94a3b8', dark: '#94a3b8',
    });
    deepStrictEqual(presetsSamplePresetSample['colors']['text'], {
      light: '#27272a', dark: '#e4e4e7',
    });
    deepStrictEqual(presetsSamplePresetSample['colors']['border'], {
      light: '#d4d4d8', dark: '#3f3f46',
    });

    return;
  });

  it('has correct font names', () => {
    strictEqual(presetsSamplePresetSample['fonts']['display'], 'Source Serif 4');
    strictEqual(presetsSamplePresetSample['fonts']['body'], 'Source Sans 3');
    strictEqual(presetsSamplePresetSample['fonts']['code'], 'Source Code Pro');

    return;
  });

  it('has correct shape values', () => {
    strictEqual(presetsSamplePresetSample['shape']['radius'], 'rounded');
    strictEqual(presetsSamplePresetSample['shape']['density'], 'comfortable');

    return;
  });

  it('has correct depth values', () => {
    strictEqual(presetsSamplePresetSample['depth']['cards'], 'flat');
    strictEqual(presetsSamplePresetSample['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    strictEqual(presetsSamplePresetSample['motion']['speed'], 'subtle');
    strictEqual(presetsSamplePresetSample['motion']['staggeredReveals'], false);
    strictEqual(presetsSamplePresetSample['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Sample - Preset - PresetsSamplePresetSample Navbar And Footer.
 *
 * Verifies that the sample preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.18.0
 */
describe('presetsSamplePresetSample navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: Tests_Presets_Sample_Preset_PresetsSamplePresetSampleNavbarAndFooter_HasCorrectNavbarValue_Navbar = presetsSamplePresetSample['navbar'];

    strictEqual(navbar, 'bridge');

    return;
  });

  it('has correct footer value', () => {
    const footer: Tests_Presets_Sample_Preset_PresetsSamplePresetSampleNavbarAndFooter_HasCorrectFooterValue_Footer = presetsSamplePresetSample['footer'];

    strictEqual(footer, 'commons');

    return;
  });

  return;
});

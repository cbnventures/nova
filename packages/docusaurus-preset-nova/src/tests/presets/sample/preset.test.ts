import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsSamplePresetSample } from '../../../presets/sample/preset.js';

import type {
  TestsPresetsSamplePresetFooter,
  TestsPresetsSamplePresetNavbar,
  TestsPresetsSamplePresetSample,
} from '../../../types/tests/presets/sample/preset.test.d.ts';

/**
 * Tests - Presets - Sample - Preset - Sample.
 *
 * @since 0.18.0
 */
describe('presetsSamplePresetSample', async () => {
  it('has correct color values', () => {
    const sample: TestsPresetsSamplePresetSample = presetsSamplePresetSample;

    deepStrictEqual(sample['colors']['primary'], {
      light: '#64748b', dark: '#64748b',
    });
    deepStrictEqual(sample['colors']['accent'], {
      light: '#94a3b8', dark: '#94a3b8',
    });
    deepStrictEqual(sample['colors']['text'], {
      light: '#27272a', dark: '#e4e4e7',
    });
    deepStrictEqual(sample['colors']['border'], {
      light: '#d4d4d8', dark: '#3f3f46',
    });

    return;
  });

  it('has correct font names', () => {
    const sample: TestsPresetsSamplePresetSample = presetsSamplePresetSample;

    strictEqual(sample['fonts']['display'], 'Source Serif 4');
    strictEqual(sample['fonts']['body'], 'Source Sans 3');
    strictEqual(sample['fonts']['code'], 'Source Code Pro');

    return;
  });

  it('has correct shape values', () => {
    const sample: TestsPresetsSamplePresetSample = presetsSamplePresetSample;

    strictEqual(sample['shape']['radius'], 'rounded');
    strictEqual(sample['shape']['density'], 'comfortable');

    return;
  });

  it('has correct depth values', () => {
    const sample: TestsPresetsSamplePresetSample = presetsSamplePresetSample;

    strictEqual(sample['depth']['cards'], 'flat');
    strictEqual(sample['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    const sample: TestsPresetsSamplePresetSample = presetsSamplePresetSample;

    strictEqual(sample['motion']['speed'], 'subtle');
    strictEqual(sample['motion']['staggeredReveals'], false);
    strictEqual(sample['motion']['hoverEffects'], true);

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
    const navbar: TestsPresetsSamplePresetNavbar = presetsSamplePresetSample['navbar'];

    strictEqual(navbar, 'bridge');

    return;
  });

  it('has correct footer value', () => {
    const footer: TestsPresetsSamplePresetFooter = presetsSamplePresetSample['footer'];

    strictEqual(footer, 'commons');

    return;
  });

  return;
});

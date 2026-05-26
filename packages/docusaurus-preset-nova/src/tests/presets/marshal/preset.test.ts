import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsMarshalPresetMarshal } from '../../../presets/marshal/preset.js';

import type {
  TestsPresetsMarshalPresetFooter,
  TestsPresetsMarshalPresetMarshal,
  TestsPresetsMarshalPresetNavbar,
} from '../../../types/tests/presets/marshal/preset.test.d.ts';

/**
 * Tests - Presets - Marshal - Preset - Marshal.
 *
 * @since 0.18.0
 */
describe('presetsMarshalPresetMarshal', async () => {
  it('has correct color values', () => {
    const marshal: TestsPresetsMarshalPresetMarshal = presetsMarshalPresetMarshal;

    deepStrictEqual(marshal['colors']['primary'], {
      light: '#2f5a3d', dark: '#2f5a3d',
    });
    deepStrictEqual(marshal['colors']['accent'], {
      light: '#a33939', dark: '#a33939',
    });
    deepStrictEqual(marshal['colors']['text'], {
      light: '#2a2620', dark: '#ede5cf',
    });
    deepStrictEqual(marshal['colors']['border'], {
      light: '#d8cdb0', dark: '#4a4030',
    });

    return;
  });

  it('has correct font names', () => {
    const marshal: TestsPresetsMarshalPresetMarshal = presetsMarshalPresetMarshal;

    strictEqual(marshal['fonts']['display'], 'IBM Plex Serif');
    strictEqual(marshal['fonts']['body'], 'IBM Plex Sans');
    strictEqual(marshal['fonts']['code'], 'IBM Plex Mono');

    return;
  });

  it('has correct shape values', () => {
    const marshal: TestsPresetsMarshalPresetMarshal = presetsMarshalPresetMarshal;

    strictEqual(marshal['shape']['radius'], 'rounded');
    strictEqual(marshal['shape']['density'], 'compact');

    return;
  });

  it('has correct depth values', () => {
    const marshal: TestsPresetsMarshalPresetMarshal = presetsMarshalPresetMarshal;

    strictEqual(marshal['depth']['cards'], 'flat');
    strictEqual(marshal['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    const marshal: TestsPresetsMarshalPresetMarshal = presetsMarshalPresetMarshal;

    strictEqual(marshal['motion']['speed'], 'subtle');
    strictEqual(marshal['motion']['staggeredReveals'], false);
    strictEqual(marshal['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Marshal - Preset - PresetsMarshalPresetMarshal Navbar And Footer.
 *
 * Verifies that the marshal preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.18.0
 */
describe('presetsMarshalPresetMarshal navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: TestsPresetsMarshalPresetNavbar = presetsMarshalPresetMarshal['navbar'];

    strictEqual(navbar, 'canopy');

    return;
  });

  it('has correct footer value', () => {
    const footer: TestsPresetsMarshalPresetFooter = presetsMarshalPresetMarshal['footer'];

    strictEqual(footer, 'commons');

    return;
  });

  return;
});

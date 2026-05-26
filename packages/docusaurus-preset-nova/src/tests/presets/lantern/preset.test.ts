import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsLanternPresetLantern } from '../../../presets/lantern/preset.js';

import type {
  TestsPresetsLanternPresetFooter,
  TestsPresetsLanternPresetLantern,
  TestsPresetsLanternPresetNavbar,
} from '../../../types/tests/presets/lantern/preset.test.d.ts';

/**
 * Tests - Presets - Lantern - Preset - Lantern.
 *
 * @since 0.18.0
 */
describe('presetsLanternPresetLantern', async () => {
  it('has correct color values', () => {
    const lantern: TestsPresetsLanternPresetLantern = presetsLanternPresetLantern;

    deepStrictEqual(lantern['colors']['primary'], {
      light: '#f59e0b', dark: '#f59e0b',
    });
    deepStrictEqual(lantern['colors']['accent'], {
      light: '#4338ca', dark: '#4338ca',
    });
    deepStrictEqual(lantern['colors']['text'], {
      light: '#3d2f1a', dark: '#f0e2c0',
    });
    deepStrictEqual(lantern['colors']['border'], {
      light: '#e8dcb8', dark: '#4a3d24',
    });

    return;
  });

  it('has correct font names', () => {
    const lantern: TestsPresetsLanternPresetLantern = presetsLanternPresetLantern;

    strictEqual(lantern['fonts']['display'], 'Fraunces');
    strictEqual(lantern['fonts']['body'], 'Manrope');
    strictEqual(lantern['fonts']['code'], 'IBM Plex Mono');

    return;
  });

  it('has correct shape values', () => {
    const lantern: TestsPresetsLanternPresetLantern = presetsLanternPresetLantern;

    strictEqual(lantern['shape']['radius'], 'rounded');
    strictEqual(lantern['shape']['density'], 'comfortable');

    return;
  });

  it('has correct depth values', () => {
    const lantern: TestsPresetsLanternPresetLantern = presetsLanternPresetLantern;

    strictEqual(lantern['depth']['cards'], 'elevated');
    strictEqual(lantern['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    const lantern: TestsPresetsLanternPresetLantern = presetsLanternPresetLantern;

    strictEqual(lantern['motion']['speed'], 'normal');
    strictEqual(lantern['motion']['staggeredReveals'], true);
    strictEqual(lantern['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Lantern - Preset - PresetsLanternPresetLantern Navbar And Footer.
 *
 * Verifies that the lantern preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.18.0
 */
describe('presetsLanternPresetLantern navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: TestsPresetsLanternPresetNavbar = presetsLanternPresetLantern['navbar'];

    strictEqual(navbar, 'compass');

    return;
  });

  it('has correct footer value', () => {
    const footer: TestsPresetsLanternPresetFooter = presetsLanternPresetLantern['footer'];

    strictEqual(footer, 'commons');

    return;
  });

  return;
});

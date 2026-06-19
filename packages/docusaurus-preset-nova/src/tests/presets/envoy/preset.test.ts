import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsEnvoyPresetEnvoy } from '../../../presets/envoy/preset.js';

import type {
  Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectColorValues_Envoy,
  Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectDepthValues_Envoy,
  Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectFontNames_Envoy,
  Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectMotionValues_Envoy,
  Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectShapeValues_Envoy,
  Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoyNavbarAndFooter_HasCorrectFooterValue_Footer,
  Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoyNavbarAndFooter_HasCorrectNavbarValue_Navbar,
} from '../../../types/tests/presets/envoy/preset.test.d.ts';

/**
 * Tests - Presets - Envoy - Preset - Envoy.
 *
 * @since 0.15.0
 */
describe('presetsEnvoyPresetEnvoy', async () => {
  it('has correct color values', () => {
    const envoy: Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectColorValues_Envoy = presetsEnvoyPresetEnvoy;

    deepStrictEqual(envoy['colors']['primary'], {
      light: '#7c3aed', dark: '#7c3aed',
    });
    deepStrictEqual(envoy['colors']['accent'], {
      light: '#06b6d4', dark: '#06b6d4',
    });
    deepStrictEqual(envoy['colors']['text'], {
      light: '#18181b', dark: '#e4e4e7',
    });
    deepStrictEqual(envoy['colors']['border'], {
      light: '#d4d4d8', dark: '#52525b',
    });

    return;
  });

  it('has correct font names', () => {
    const envoy: Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectFontNames_Envoy = presetsEnvoyPresetEnvoy;

    strictEqual(envoy['fonts']['display'], 'Plus Jakarta Sans');
    strictEqual(envoy['fonts']['body'], 'Inter');
    strictEqual(envoy['fonts']['code'], 'JetBrains Mono');

    return;
  });

  it('has correct shape values', () => {
    const envoy: Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectShapeValues_Envoy = presetsEnvoyPresetEnvoy;

    strictEqual(envoy['shape']['radius'], 'rounded');
    strictEqual(envoy['shape']['density'], 'comfortable');

    return;
  });

  it('has correct depth values', () => {
    const envoy: Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectDepthValues_Envoy = presetsEnvoyPresetEnvoy;

    strictEqual(envoy['depth']['cards'], 'elevated');
    strictEqual(envoy['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    const envoy: Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoy_HasCorrectMotionValues_Envoy = presetsEnvoyPresetEnvoy;

    strictEqual(envoy['motion']['speed'], 'normal');
    strictEqual(envoy['motion']['staggeredReveals'], true);
    strictEqual(envoy['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Envoy - Preset - PresetsEnvoyPresetEnvoy Navbar And Footer.
 *
 * Verifies that the envoy preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.15.0
 */
describe('presetsEnvoyPresetEnvoy navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoyNavbarAndFooter_HasCorrectNavbarValue_Navbar = presetsEnvoyPresetEnvoy['navbar'];

    strictEqual(navbar, 'compass');

    return;
  });

  it('has correct footer value', () => {
    const footer: Tests_Presets_Envoy_Preset_PresetsEnvoyPresetEnvoyNavbarAndFooter_HasCorrectFooterValue_Footer = presetsEnvoyPresetEnvoy['footer'];

    strictEqual(footer, 'launchpad');

    return;
  });

  return;
});

import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsFoundryPresetFoundry } from '../../../presets/foundry/preset.js';

import type {
  Tests_Presets_Foundry_Preset_PresetsFoundryPresetFoundryNavbarAndFooter_HasCorrectFooterValue_Footer,
  Tests_Presets_Foundry_Preset_PresetsFoundryPresetFoundryNavbarAndFooter_HasCorrectNavbarValue_Navbar,
} from '../../../types/tests/presets/foundry/preset.test.d.ts';

/**
 * Tests - Presets - Foundry - Preset - Foundry.
 *
 * @since 0.15.0
 */
describe('presetsFoundryPresetFoundry', async () => {
  it('has correct color values', () => {
    deepStrictEqual(presetsFoundryPresetFoundry['colors']['primary'], {
      light: '#ea580c', dark: '#ea580c',
    });
    deepStrictEqual(presetsFoundryPresetFoundry['colors']['accent'], {
      light: '#fbbf24', dark: '#fbbf24',
    });
    deepStrictEqual(presetsFoundryPresetFoundry['colors']['text'], {
      light: '#1c1917', dark: '#e7e5e4',
    });
    deepStrictEqual(presetsFoundryPresetFoundry['colors']['border'], {
      light: '#d6d3d1', dark: '#57534e',
    });

    return;
  });

  it('has correct font names', () => {
    strictEqual(presetsFoundryPresetFoundry['fonts']['display'], 'Plus Jakarta Sans');
    strictEqual(presetsFoundryPresetFoundry['fonts']['body'], 'Inter');
    strictEqual(presetsFoundryPresetFoundry['fonts']['code'], 'Fira Code');

    return;
  });

  it('has correct shape values', () => {
    strictEqual(presetsFoundryPresetFoundry['shape']['radius'], 'rounded');
    strictEqual(presetsFoundryPresetFoundry['shape']['density'], 'comfortable');

    return;
  });

  it('has correct depth values', () => {
    strictEqual(presetsFoundryPresetFoundry['depth']['cards'], 'elevated');
    strictEqual(presetsFoundryPresetFoundry['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    strictEqual(presetsFoundryPresetFoundry['motion']['speed'], 'normal');
    strictEqual(presetsFoundryPresetFoundry['motion']['staggeredReveals'], true);
    strictEqual(presetsFoundryPresetFoundry['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Foundry - Preset - PresetsFoundryPresetFoundry Navbar And Footer.
 *
 * Verifies that the foundry preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.15.0
 */
describe('presetsFoundryPresetFoundry navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: Tests_Presets_Foundry_Preset_PresetsFoundryPresetFoundryNavbarAndFooter_HasCorrectNavbarValue_Navbar = presetsFoundryPresetFoundry['navbar'];

    strictEqual(navbar, 'bridge');

    return;
  });

  it('has correct footer value', () => {
    const footer: Tests_Presets_Foundry_Preset_PresetsFoundryPresetFoundryNavbarAndFooter_HasCorrectFooterValue_Footer = presetsFoundryPresetFoundry['footer'];

    strictEqual(footer, 'commons');

    return;
  });

  return;
});

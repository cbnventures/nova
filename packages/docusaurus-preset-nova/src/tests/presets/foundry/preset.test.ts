import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsFoundryPresetFoundry } from '../../../presets/foundry/preset.js';

import type {
  Tests_Presets_Foundry_Preset_Footer,
  Tests_Presets_Foundry_Preset_Foundry,
  Tests_Presets_Foundry_Preset_Navbar,
} from '../../../types/tests/presets/foundry/preset.test.d.ts';

/**
 * Tests - Presets - Foundry - Preset - Foundry.
 *
 * @since 0.15.0
 */
describe('presetsFoundryPresetFoundry', async () => {
  it('has correct color values', () => {
    const foundry: Tests_Presets_Foundry_Preset_Foundry = presetsFoundryPresetFoundry;

    deepStrictEqual(foundry['colors']['primary'], {
      light: '#ea580c', dark: '#ea580c',
    });
    deepStrictEqual(foundry['colors']['accent'], {
      light: '#fbbf24', dark: '#fbbf24',
    });
    deepStrictEqual(foundry['colors']['text'], {
      light: '#1c1917', dark: '#e7e5e4',
    });
    deepStrictEqual(foundry['colors']['border'], {
      light: '#d6d3d1', dark: '#57534e',
    });

    return;
  });

  it('has correct font names', () => {
    const foundry: Tests_Presets_Foundry_Preset_Foundry = presetsFoundryPresetFoundry;

    strictEqual(foundry['fonts']['display'], 'Plus Jakarta Sans');
    strictEqual(foundry['fonts']['body'], 'Inter');
    strictEqual(foundry['fonts']['code'], 'Fira Code');

    return;
  });

  it('has correct shape values', () => {
    const foundry: Tests_Presets_Foundry_Preset_Foundry = presetsFoundryPresetFoundry;

    strictEqual(foundry['shape']['radius'], 'rounded');
    strictEqual(foundry['shape']['density'], 'comfortable');

    return;
  });

  it('has correct depth values', () => {
    const foundry: Tests_Presets_Foundry_Preset_Foundry = presetsFoundryPresetFoundry;

    strictEqual(foundry['depth']['cards'], 'elevated');
    strictEqual(foundry['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    const foundry: Tests_Presets_Foundry_Preset_Foundry = presetsFoundryPresetFoundry;

    strictEqual(foundry['motion']['speed'], 'normal');
    strictEqual(foundry['motion']['staggeredReveals'], true);
    strictEqual(foundry['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Foundry - Preset - Presets_Foundry_Preset_Foundry Navbar And Footer.
 *
 * Verifies that the foundry preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.15.0
 */
describe('presetsFoundryPresetFoundry navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: Tests_Presets_Foundry_Preset_Navbar = presetsFoundryPresetFoundry['navbar'];

    strictEqual(navbar, 'bridge');

    return;
  });

  it('has correct footer value', () => {
    const footer: Tests_Presets_Foundry_Preset_Footer = presetsFoundryPresetFoundry['footer'];

    strictEqual(footer, 'commons');

    return;
  });

  return;
});

import { deepStrictEqual, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsSignalPresetSignal } from '../../../presets/signal/preset.js';

import type {
  Tests_Presets_Signal_Preset_Footer,
  Tests_Presets_Signal_Preset_Navbar,
  Tests_Presets_Signal_Preset_Signal,
} from '../../../types/tests/presets/signal/preset.test.d.ts';

/**
 * Tests - Presets - Signal - Preset - Signal.
 *
 * @since 0.15.0
 */
describe('presetsSignalPresetSignal', async () => {
  it('has correct color values', () => {
    const signal: Tests_Presets_Signal_Preset_Signal = presetsSignalPresetSignal;

    deepStrictEqual(signal['colors']['primary'], {
      light: '#dc2626', dark: '#dc2626',
    });
    deepStrictEqual(signal['colors']['accent'], {
      light: '#f59e0b', dark: '#f59e0b',
    });
    deepStrictEqual(signal['colors']['text'], {
      light: '#262626', dark: '#e5e5e5',
    });
    deepStrictEqual(signal['colors']['border'], {
      light: '#d4d4d4', dark: '#404040',
    });

    return;
  });

  it('has correct font names', () => {
    const signal: Tests_Presets_Signal_Preset_Signal = presetsSignalPresetSignal;

    strictEqual(signal['fonts']['display'], 'Space Grotesk');
    strictEqual(signal['fonts']['body'], 'Inter');
    strictEqual(signal['fonts']['code'], 'JetBrains Mono');

    return;
  });

  it('has correct shape values', () => {
    const signal: Tests_Presets_Signal_Preset_Signal = presetsSignalPresetSignal;

    strictEqual(signal['shape']['radius'], 'sharp');
    strictEqual(signal['shape']['density'], 'compact');

    return;
  });

  it('has correct depth values', () => {
    const signal: Tests_Presets_Signal_Preset_Signal = presetsSignalPresetSignal;

    strictEqual(signal['depth']['cards'], 'flat');
    strictEqual(signal['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    const signal: Tests_Presets_Signal_Preset_Signal = presetsSignalPresetSignal;

    strictEqual(signal['motion']['speed'], 'subtle');
    strictEqual(signal['motion']['staggeredReveals'], false);
    strictEqual(signal['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Signal - Preset - Presets_Signal_Preset_Signal Navbar And Footer.
 *
 * Verifies that the signal preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.15.0
 */
describe('presetsSignalPresetSignal navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: Tests_Presets_Signal_Preset_Navbar = presetsSignalPresetSignal['navbar'];

    strictEqual(navbar, 'monolith');

    return;
  });

  it('has correct footer value', () => {
    const footer: Tests_Presets_Signal_Preset_Footer = presetsSignalPresetSignal['footer'];

    strictEqual(footer, 'ledger');

    return;
  });

  return;
});

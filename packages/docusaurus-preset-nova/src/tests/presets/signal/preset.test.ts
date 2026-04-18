import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsSignalPresetSignal } from '../../../presets/signal/preset.js';

import type {
  TestsPresetsSignalPresetFooter,
  TestsPresetsSignalPresetNavbar,
  TestsPresetsSignalPresetSignal,
} from '../../../types/tests/presets/signal/preset.test.d.ts';

/**
 * Tests - Presets - Signal - Preset - Signal.
 *
 * @since 0.15.0
 */
describe('presetsSignalPresetSignal', async () => {
  it('has correct color values', () => {
    const signal: TestsPresetsSignalPresetSignal = presetsSignalPresetSignal;

    strictEqual(signal['colors']['primary'], '#e11d48');
    strictEqual(signal['colors']['accent'], '#f59e0b');
    strictEqual(signal['colors']['neutral'], '#525252');

    return;
  });

  it('has correct font names', () => {
    const signal: TestsPresetsSignalPresetSignal = presetsSignalPresetSignal;

    strictEqual(signal['fonts']['display'], 'Space Grotesk');
    strictEqual(signal['fonts']['body'], 'Inter');
    strictEqual(signal['fonts']['code'], 'JetBrains Mono');

    return;
  });

  it('has correct shape values', () => {
    const signal: TestsPresetsSignalPresetSignal = presetsSignalPresetSignal;

    strictEqual(signal['shape']['radius'], 'sharp');
    strictEqual(signal['shape']['density'], 'compact');

    return;
  });

  it('has correct depth values', () => {
    const signal: TestsPresetsSignalPresetSignal = presetsSignalPresetSignal;

    strictEqual(signal['depth']['cards'], 'flat');
    strictEqual(signal['depth']['codeBlocks'], 'bordered');

    return;
  });

  it('has correct motion values', () => {
    const signal: TestsPresetsSignalPresetSignal = presetsSignalPresetSignal;

    strictEqual(signal['motion']['speed'], 'subtle');
    strictEqual(signal['motion']['staggeredReveals'], false);
    strictEqual(signal['motion']['hoverEffects'], true);

    return;
  });

  return;
});

/**
 * Tests - Presets - Signal - Preset - PresetsSignalPresetSignal Navbar And Footer.
 *
 * Verifies that the signal preset includes the correct navbar
 * and footer variant identifiers for theme rendering.
 *
 * @since 0.15.0
 */
describe('presetsSignalPresetSignal navbar and footer', async () => {
  it('has correct navbar value', () => {
    const navbar: TestsPresetsSignalPresetNavbar = presetsSignalPresetSignal['navbar'];

    strictEqual(navbar, 'monolith');

    return;
  });

  it('has correct footer value', () => {
    const footer: TestsPresetsSignalPresetFooter = presetsSignalPresetSignal['footer'];

    strictEqual(footer, 'ledger');

    return;
  });

  return;
});

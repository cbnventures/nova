import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsEnvoyPresetEnvoy } from '../../presets/envoy/preset.js';
import { presetsFoundryPresetFoundry } from '../../presets/foundry/preset.js';
import { presetsIndexNames, presetsIndexPresets } from '../../presets/index.js';
import { presetsSentinelPresetSentinel } from '../../presets/sentinel/preset.js';
import { presetsSignalPresetSignal } from '../../presets/signal/preset.js';

import type {
  TestsPresetsIndexNamesIncludesEnvoy,
  TestsPresetsIndexNamesIncludesFoundry,
  TestsPresetsIndexNamesIncludesSentinel,
  TestsPresetsIndexNamesIncludesSignal,
  TestsPresetsIndexNamesLength,
  TestsPresetsIndexPresetsEnvoy,
  TestsPresetsIndexPresetsFoundry,
  TestsPresetsIndexPresetsSentinel,
  TestsPresetsIndexPresetsSignal,
} from '../../types/tests/presets/index.test.d.ts';

/**
 * Tests - Presets - Index Names.
 *
 * @since 0.15.0
 */
describe('presetsIndexNames', async () => {
  it('contains all preset names', () => {
    const includesFoundry: TestsPresetsIndexNamesIncludesFoundry = presetsIndexNames.includes('foundry');
    const includesSentinel: TestsPresetsIndexNamesIncludesSentinel = presetsIndexNames.includes('sentinel');
    const includesSignal: TestsPresetsIndexNamesIncludesSignal = presetsIndexNames.includes('signal');
    const includesEnvoy: TestsPresetsIndexNamesIncludesEnvoy = presetsIndexNames.includes('envoy');
    const length: TestsPresetsIndexNamesLength = presetsIndexNames.length;

    ok(includesFoundry);
    ok(includesSentinel);
    ok(includesSignal);
    ok(includesEnvoy);
    strictEqual(length, 4);

    return;
  });

  return;
});

/**
 * Tests - Presets - Index Presets.
 *
 * @since 0.15.0
 */
describe('presetsIndexPresets', async () => {
  it('maps foundry name to foundry preset', () => {
    const foundry: TestsPresetsIndexPresetsFoundry = presetsIndexPresets['foundry'];

    strictEqual(foundry, presetsFoundryPresetFoundry);

    return;
  });

  it('maps sentinel name to sentinel preset', () => {
    const sentinel: TestsPresetsIndexPresetsSentinel = presetsIndexPresets['sentinel'];

    strictEqual(sentinel, presetsSentinelPresetSentinel);

    return;
  });

  it('maps signal name to signal preset', () => {
    const signal: TestsPresetsIndexPresetsSignal = presetsIndexPresets['signal'];

    strictEqual(signal, presetsSignalPresetSignal);

    return;
  });

  it('maps envoy name to envoy preset', () => {
    const envoy: TestsPresetsIndexPresetsEnvoy = presetsIndexPresets['envoy'];

    strictEqual(envoy, presetsEnvoyPresetEnvoy);

    return;
  });

  return;
});

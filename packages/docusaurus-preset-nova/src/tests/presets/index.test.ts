import { ok, strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsEnvoyPresetEnvoy } from '../../presets/envoy/preset.js';
import { presetsFoundryPresetFoundry } from '../../presets/foundry/preset.js';
import { presetsIndexNames, presetsIndexPresets } from '../../presets/index.js';
import { presetsLanternPresetLantern } from '../../presets/lantern/preset.js';
import { presetsMarshalPresetMarshal } from '../../presets/marshal/preset.js';
import { presetsSentinelPresetSentinel } from '../../presets/sentinel/preset.js';
import { presetsSignalPresetSignal } from '../../presets/signal/preset.js';

import type {
  Tests_Presets_Index_NamesIncludesEnvoy,
  Tests_Presets_Index_NamesIncludesFoundry,
  Tests_Presets_Index_NamesIncludesLantern,
  Tests_Presets_Index_NamesIncludesMarshal,
  Tests_Presets_Index_NamesIncludesSentinel,
  Tests_Presets_Index_NamesIncludesSignal,
  Tests_Presets_Index_NamesLength,
  Tests_Presets_Index_PresetsEnvoy,
  Tests_Presets_Index_PresetsFoundry,
  Tests_Presets_Index_PresetsLantern,
  Tests_Presets_Index_PresetsMarshal,
  Tests_Presets_Index_PresetsSentinel,
  Tests_Presets_Index_PresetsSignal,
} from '../../types/tests/presets/index.test.d.ts';

/**
 * Tests - Presets - Index Names.
 *
 * @since 0.15.0
 */
describe('presetsIndexNames', async () => {
  it('contains all preset names', () => {
    const includesEnvoy: Tests_Presets_Index_NamesIncludesEnvoy = presetsIndexNames.includes('envoy');
    const includesFoundry: Tests_Presets_Index_NamesIncludesFoundry = presetsIndexNames.includes('foundry');
    const includesLantern: Tests_Presets_Index_NamesIncludesLantern = presetsIndexNames.includes('lantern');
    const includesMarshal: Tests_Presets_Index_NamesIncludesMarshal = presetsIndexNames.includes('marshal');
    const includesSentinel: Tests_Presets_Index_NamesIncludesSentinel = presetsIndexNames.includes('sentinel');
    const includesSignal: Tests_Presets_Index_NamesIncludesSignal = presetsIndexNames.includes('signal');
    const length: Tests_Presets_Index_NamesLength = presetsIndexNames.length;

    ok(includesEnvoy);
    ok(includesFoundry);
    ok(includesLantern);
    ok(includesMarshal);
    ok(includesSentinel);
    ok(includesSignal);
    strictEqual(length, 6);

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
  it('maps envoy name to envoy preset', () => {
    const envoy: Tests_Presets_Index_PresetsEnvoy = presetsIndexPresets['envoy'];

    strictEqual(envoy, presetsEnvoyPresetEnvoy);

    return;
  });

  it('maps foundry name to foundry preset', () => {
    const foundry: Tests_Presets_Index_PresetsFoundry = presetsIndexPresets['foundry'];

    strictEqual(foundry, presetsFoundryPresetFoundry);

    return;
  });

  it('maps lantern name to lantern preset', () => {
    const lantern: Tests_Presets_Index_PresetsLantern = presetsIndexPresets['lantern'];

    strictEqual(lantern, presetsLanternPresetLantern);

    return;
  });

  it('maps marshal name to marshal preset', () => {
    const marshal: Tests_Presets_Index_PresetsMarshal = presetsIndexPresets['marshal'];

    strictEqual(marshal, presetsMarshalPresetMarshal);

    return;
  });

  it('maps sentinel name to sentinel preset', () => {
    const sentinel: Tests_Presets_Index_PresetsSentinel = presetsIndexPresets['sentinel'];

    strictEqual(sentinel, presetsSentinelPresetSentinel);

    return;
  });

  it('maps signal name to signal preset', () => {
    const signal: Tests_Presets_Index_PresetsSignal = presetsIndexPresets['signal'];

    strictEqual(signal, presetsSignalPresetSignal);

    return;
  });

  return;
});

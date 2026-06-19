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
  Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesEnvoy,
  Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesFoundry,
  Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesLantern,
  Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesMarshal,
  Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesSentinel,
  Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesSignal,
  Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_Length,
} from '../../types/tests/presets/index.test.d.ts';

/**
 * Tests - Presets - Index Names.
 *
 * @since 0.15.0
 */
describe('presetsIndexNames', async () => {
  it('contains all preset names', () => {
    const includesEnvoy: Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesEnvoy = presetsIndexNames.includes('envoy');
    const includesFoundry: Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesFoundry = presetsIndexNames.includes('foundry');
    const includesLantern: Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesLantern = presetsIndexNames.includes('lantern');
    const includesMarshal: Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesMarshal = presetsIndexNames.includes('marshal');
    const includesSentinel: Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesSentinel = presetsIndexNames.includes('sentinel');
    const includesSignal: Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_IncludesSignal = presetsIndexNames.includes('signal');
    const length: Tests_Presets_Index_PresetsIndexNames_ContainsAllPresetNames_Length = presetsIndexNames.length;

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
    strictEqual(presetsIndexPresets['envoy'], presetsEnvoyPresetEnvoy);

    return;
  });

  it('maps foundry name to foundry preset', () => {
    strictEqual(presetsIndexPresets['foundry'], presetsFoundryPresetFoundry);

    return;
  });

  it('maps lantern name to lantern preset', () => {
    strictEqual(presetsIndexPresets['lantern'], presetsLanternPresetLantern);

    return;
  });

  it('maps marshal name to marshal preset', () => {
    strictEqual(presetsIndexPresets['marshal'], presetsMarshalPresetMarshal);

    return;
  });

  it('maps sentinel name to sentinel preset', () => {
    strictEqual(presetsIndexPresets['sentinel'], presetsSentinelPresetSentinel);

    return;
  });

  it('maps signal name to signal preset', () => {
    strictEqual(presetsIndexPresets['signal'], presetsSignalPresetSignal);

    return;
  });

  return;
});

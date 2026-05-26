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
  TestsPresetsIndexNamesIncludesEnvoy,
  TestsPresetsIndexNamesIncludesFoundry,
  TestsPresetsIndexNamesIncludesLantern,
  TestsPresetsIndexNamesIncludesMarshal,
  TestsPresetsIndexNamesIncludesSentinel,
  TestsPresetsIndexNamesIncludesSignal,
  TestsPresetsIndexNamesLength,
  TestsPresetsIndexPresetsEnvoy,
  TestsPresetsIndexPresetsFoundry,
  TestsPresetsIndexPresetsLantern,
  TestsPresetsIndexPresetsMarshal,
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
    const includesEnvoy: TestsPresetsIndexNamesIncludesEnvoy = presetsIndexNames.includes('envoy');
    const includesFoundry: TestsPresetsIndexNamesIncludesFoundry = presetsIndexNames.includes('foundry');
    const includesLantern: TestsPresetsIndexNamesIncludesLantern = presetsIndexNames.includes('lantern');
    const includesMarshal: TestsPresetsIndexNamesIncludesMarshal = presetsIndexNames.includes('marshal');
    const includesSentinel: TestsPresetsIndexNamesIncludesSentinel = presetsIndexNames.includes('sentinel');
    const includesSignal: TestsPresetsIndexNamesIncludesSignal = presetsIndexNames.includes('signal');
    const length: TestsPresetsIndexNamesLength = presetsIndexNames.length;

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
    const envoy: TestsPresetsIndexPresetsEnvoy = presetsIndexPresets['envoy'];

    strictEqual(envoy, presetsEnvoyPresetEnvoy);

    return;
  });

  it('maps foundry name to foundry preset', () => {
    const foundry: TestsPresetsIndexPresetsFoundry = presetsIndexPresets['foundry'];

    strictEqual(foundry, presetsFoundryPresetFoundry);

    return;
  });

  it('maps lantern name to lantern preset', () => {
    const lantern: TestsPresetsIndexPresetsLantern = presetsIndexPresets['lantern'];

    strictEqual(lantern, presetsLanternPresetLantern);

    return;
  });

  it('maps marshal name to marshal preset', () => {
    const marshal: TestsPresetsIndexPresetsMarshal = presetsIndexPresets['marshal'];

    strictEqual(marshal, presetsMarshalPresetMarshal);

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

  return;
});

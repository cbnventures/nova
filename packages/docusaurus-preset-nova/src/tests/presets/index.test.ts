import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { presetsEnvoyPresetEnvoy } from '../../presets/envoy/preset.js';
import { presetsFoundryPresetFoundry } from '../../presets/foundry/preset.js';
import { presetsIndexPresets } from '../../presets/index.js';
import { presetsLanternPresetLantern } from '../../presets/lantern/preset.js';
import { presetsMarshalPresetMarshal } from '../../presets/marshal/preset.js';
import { presetsSentinelPresetSentinel } from '../../presets/sentinel/preset.js';
import { presetsSignalPresetSignal } from '../../presets/signal/preset.js';

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

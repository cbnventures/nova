import { presetsEnvoyPresetEnvoy } from './envoy/preset.js';
import { presetsFoundryPresetFoundry } from './foundry/preset.js';
import { presetsLanternPresetLantern } from './lantern/preset.js';
import { presetsMarshalPresetMarshal } from './marshal/preset.js';
import { presetsSentinelPresetSentinel } from './sentinel/preset.js';
import { presetsSignalPresetSignal } from './signal/preset.js';

import type {
  Presets_Index_Names,
  Presets_Index_Presets,
} from '../types/presets/index.d.ts';

/**
 * Presets - Index Names.
 *
 * Canonical list of available preset names used for validation and iteration across
 * the preset registry.
 *
 * @since 0.15.0
 */
export const presetsIndexNames: Presets_Index_Names = [
  'envoy',
  'foundry',
  'lantern',
  'marshal',
  'sentinel',
  'signal',
];

/**
 * Presets - Index Presets.
 *
 * Registry mapping each preset name to its full configuration object for lookup
 * by the theme initialization logic.
 *
 * @since 0.15.0
 */
export const presetsIndexPresets: Presets_Index_Presets = {
  envoy: presetsEnvoyPresetEnvoy,
  foundry: presetsFoundryPresetFoundry,
  lantern: presetsLanternPresetLantern,
  marshal: presetsMarshalPresetMarshal,
  sentinel: presetsSentinelPresetSentinel,
  signal: presetsSignalPresetSignal,
};

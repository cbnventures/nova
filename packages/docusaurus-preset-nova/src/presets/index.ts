import { presetsEnvoyPresetEnvoy } from './envoy/preset.js';
import { presetsFoundryPresetFoundry } from './foundry/preset.js';
import { presetsSentinelPresetSentinel } from './sentinel/preset.js';
import { presetsSignalPresetSignal } from './signal/preset.js';

import type {
  PresetsIndexNames,
  PresetsIndexPresets,
} from '../types/presets/index.d.ts';

/**
 * Presets - Index Names.
 *
 * Canonical list of available preset names used for validation and iteration across
 * the preset registry.
 *
 * @since 0.15.0
 */
export const presetsIndexNames: PresetsIndexNames = [
  'foundry',
  'sentinel',
  'signal',
  'envoy',
];

/**
 * Presets - Index Presets.
 *
 * Registry mapping each preset name to its full configuration object for lookup
 * by the theme initialization logic.
 *
 * @since 0.15.0
 */
export const presetsIndexPresets: PresetsIndexPresets = {
  foundry: presetsFoundryPresetFoundry,
  sentinel: presetsSentinelPresetSentinel,
  signal: presetsSignalPresetSignal,
  envoy: presetsEnvoyPresetEnvoy,
};

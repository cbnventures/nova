import type {
  SharedPreset,
  SharedPresetName,
} from '../shared.d.ts';

/**
 * Presets - Index Names.
 *
 * @since 0.15.0
 */
export type PresetsIndexNames = SharedPresetName[];

/**
 * Presets - Index Presets.
 *
 * @since 0.15.0
 */
export type PresetsIndexPresets = Record<SharedPresetName, SharedPreset>;

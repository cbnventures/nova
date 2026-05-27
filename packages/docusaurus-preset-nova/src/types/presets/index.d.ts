import type {
  Shared_Preset,
  Shared_PresetName,
} from '../shared.d.ts';

/**
 * Presets - Index Names.
 *
 * @since 0.15.0
 */
export type Presets_Index_Names = Shared_PresetName[];

/**
 * Presets - Index Presets.
 *
 * @since 0.15.0
 */
export type Presets_Index_Presets = Record<Shared_PresetName, Shared_Preset>;

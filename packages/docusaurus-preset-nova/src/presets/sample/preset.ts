import type { Presets_Sample_Preset_Sample } from '../../types/presets/sample/preset.d.ts';

/**
 * Presets - Sample - Preset - Sample.
 *
 * Reference template only - NOT a user-selectable preset; excluded from
 * `Shared_PresetName` and the registry. Defaults are intentionally neutral so a
 * copy-paste produces a runnable but visually unopinionated starting point.
 *
 * @since 0.18.0
 */
export const presetsSamplePresetSample: Presets_Sample_Preset_Sample = {
  logo: {
    alt: 'Sample',
    src: '@nova-assets/presets/sample/logo.svg',
  },
  colors: {
    primary: {
      light: '#64748b',
      dark: '#64748b',
    },
    accent: {
      light: '#94a3b8',
      dark: '#94a3b8',
    },
    text: {
      light: '#27272a',
      dark: '#e4e4e7',
    },
    border: {
      light: '#d4d4d8',
      dark: '#3f3f46',
    },
    warning: {
      light: '#f59e0b',
      dark: '#f59e0b',
    },
    danger: {
      light: '#ef4444',
      dark: '#ef4444',
    },
  },
  fonts: {
    display: 'Source Serif 4',
    body: 'Source Sans 3',
    code: 'Source Code Pro',
  },
  shape: {
    radius: 'rounded',
    density: 'comfortable',
  },
  depth: {
    cards: 'flat',
    codeBlocks: 'bordered',
  },
  motion: {
    speed: 'subtle',
    staggeredReveals: false,
    hoverEffects: true,
  },
  navbar: 'bridge',
  footer: 'commons',
  cta: {
    contained: false,
  },
};

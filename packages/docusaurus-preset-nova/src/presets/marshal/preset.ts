import type { Presets_Marshal_Preset_Marshal } from '../../types/presets/marshal/preset.d.ts';

/**
 * Presets - Marshal - Preset - Marshal.
 *
 * Lock-inactive-threads and sponsor-gated-support shared documentation preset with IBM
 * Plex Serif display font, IBM Plex Sans body font, and IBM Plex Mono code font paired
 * with rounded shapes and flat card depth. Automated clerk - oxidized ink on cream paper.
 *
 * @since 0.18.0
 */
export const presetsMarshalPresetMarshal: Presets_Marshal_Preset_Marshal = {
  logo: {
    alt: 'Marshal',
    src: '@nova-assets/presets/marshal/logo.svg',
  },
  colors: {
    primary: {
      light: '#2f5a3d',
      dark: '#2f5a3d',
    },
    accent: {
      light: '#a33939',
      dark: '#a33939',
    },
    text: {
      light: '#2a2620',
      dark: '#ede5cf',
    },
    border: {
      light: '#d8cdb0',
      dark: '#4a4030',
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
    display: 'IBM Plex Serif',
    body: 'IBM Plex Sans',
    code: 'IBM Plex Mono',
  },
  shape: {
    radius: 'rounded',
    density: 'compact',
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
  navbar: 'canopy',
  footer: 'commons',
  cta: {
    contained: false,
  },
};

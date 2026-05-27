import type { Presets_Lantern_Preset_Lantern } from '../../types/presets/lantern/preset.d.ts';

/**
 * Presets - Lantern - Preset - Lantern.
 *
 * Homebridge ADT Pulse documentation site preset with Fraunces display font,
 * Manrope body font, and IBM Plex Mono code font paired with rounded shapes
 * and elevated card depth. Warm perimeter vigil - amber on indigo.
 *
 * @since 0.18.0
 */
export const presetsLanternPresetLantern: Presets_Lantern_Preset_Lantern = {
  logo: {
    title: 'Lantern',
    alt: 'Lantern',
    src: '@nova-assets/presets/lantern/logo.svg',
  },
  colors: {
    primary: {
      light: '#f59e0b',
      dark: '#f59e0b',
    },
    accent: {
      light: '#4338ca',
      dark: '#4338ca',
    },
    text: {
      light: '#3d2f1a',
      dark: '#f0e2c0',
    },
    border: {
      light: '#e8dcb8',
      dark: '#4a3d24',
    },
    warning: {
      light: '#f59e0b',
      dark: '#f59e0b',
    },
    danger: {
      light: '#b91c1c',
      dark: '#b91c1c',
    },
  },
  fonts: {
    display: 'Fraunces',
    body: 'Manrope',
    code: 'IBM Plex Mono',
  },
  shape: {
    radius: 'rounded',
    density: 'comfortable',
  },
  depth: {
    cards: 'elevated',
    codeBlocks: 'bordered',
  },
  motion: {
    speed: 'normal',
    staggeredReveals: true,
    hoverEffects: true,
  },
  navbar: 'compass',
  footer: 'commons',
  cta: {
    contained: false,
  },
};

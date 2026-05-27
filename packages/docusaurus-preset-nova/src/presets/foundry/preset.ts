import type { Presets_Foundry_Preset_Foundry } from '../../types/presets/foundry/preset.d.ts';

/**
 * Presets - Foundry - Preset - Foundry.
 *
 * Default preset with Plus Jakarta Sans display font, Inter body font,
 * and Fira Code code font paired with rounded shapes and elevated
 * card depth.
 *
 * @since 0.15.0
 */
export const presetsFoundryPresetFoundry: Presets_Foundry_Preset_Foundry = {
  logo: {
    title: 'Foundry',
    alt: 'Foundry',
    src: '@nova-assets/presets/foundry/logo.svg',
  },
  colors: {
    primary: {
      light: '#ea580c',
      dark: '#ea580c',
    },
    accent: {
      light: '#fbbf24',
      dark: '#fbbf24',
    },
    text: {
      light: '#1c1917',
      dark: '#e7e5e4',
    },
    border: {
      light: '#d6d3d1',
      dark: '#57534e',
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
    display: 'Plus Jakarta Sans',
    body: 'Inter',
    code: 'Fira Code',
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
  navbar: 'bridge',
  footer: 'commons',
  cta: {
    contained: false,
  },
};

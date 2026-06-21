import type { Presets_Envoy_Preset_Envoy } from '../../types/presets/envoy/preset.d.ts';

/**
 * Presets - Envoy - Preset - Envoy.
 *
 * Ntfy-reverse-proxy documentation site preset with Plus Jakarta Sans
 * display font, Inter body font, and JetBrains Mono code font paired
 * with rounded shapes and elevated card depth.
 *
 * @since 0.15.0
 */
export const presetsEnvoyPresetEnvoy: Presets_Envoy_Preset_Envoy = {
  logo: {
    alt: 'Envoy',
    src: '@nova-assets/presets/envoy/logo.svg',
  },
  colors: {
    primary: {
      light: '#7c3aed',
      dark: '#7c3aed',
    },
    accent: {
      light: '#06b6d4',
      dark: '#06b6d4',
    },
    text: {
      light: '#18181b',
      dark: '#e4e4e7',
    },
    border: {
      light: '#d4d4d8',
      dark: '#52525b',
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
    code: 'JetBrains Mono',
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
  footer: 'launchpad',
  cta: {
    contained: false,
  },
};

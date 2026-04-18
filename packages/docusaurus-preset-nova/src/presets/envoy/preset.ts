import type { PresetsEnvoyPresetEnvoy } from '../../types/presets/envoy/preset.d.ts';

/**
 * Presets - Envoy - Preset - Envoy.
 *
 * Ntfy-reverse-proxy documentation site preset with Plus Jakarta Sans
 * display font, Inter body font, and JetBrains Mono code font paired
 * with rounded shapes and elevated card depth.
 *
 * @since 0.15.0
 */
export const presetsEnvoyPresetEnvoy: PresetsEnvoyPresetEnvoy = {
  logo: {
    title: 'Envoy',
    alt: 'Envoy',
    src: '@nova-assets/presets/envoy/logo.svg',
  },
  colors: {
    primary: '#7c3aed',
    accent: '#06b6d4',
    neutral: '#71717a',
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
};

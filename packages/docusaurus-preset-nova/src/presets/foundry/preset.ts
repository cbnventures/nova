import type { PresetsFoundryPresetFoundry } from '../../types/presets/foundry/preset.d.ts';

/**
 * Presets - Foundry - Preset - Foundry.
 *
 * Default preset with Plus Jakarta Sans display font, Inter body font,
 * and Fira Code code font paired with rounded shapes and elevated
 * card depth.
 *
 * @since 0.15.0
 */
export const presetsFoundryPresetFoundry: PresetsFoundryPresetFoundry = {
  logo: {
    title: 'Foundry',
    alt: 'Foundry',
    src: '@nova-assets/presets/foundry/logo.svg',
  },
  colors: {
    primary: '#ea580c',
    accent: '#fbbf24',
    neutral: '#78716c',
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
};

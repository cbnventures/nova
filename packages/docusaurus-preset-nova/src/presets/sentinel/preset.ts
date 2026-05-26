import type { PresetsSentinelPresetSentinel } from '../../types/presets/sentinel/preset.d.ts';

/**
 * Presets - Sentinel - Preset - Sentinel.
 *
 * Alternative preset with Unbounded display font, DM Sans body font, and JetBrains Mono code
 * font paired with rounded shapes and flat card depth.
 *
 * @since 0.15.0
 */
export const presetsSentinelPresetSentinel: PresetsSentinelPresetSentinel = {
  logo: {
    title: 'Sentinel',
    alt: 'Sentinel',
    src: '@nova-assets/presets/sentinel/logo.svg',
  },
  colors: {
    primary: {
      light: '#0d9488',
      dark: '#0d9488',
    },
    accent: {
      light: '#6366f1',
      dark: '#6366f1',
    },
    text: {
      light: '#1e293b',
      dark: '#e2e8f0',
    },
    border: {
      light: '#cbd5e1',
      dark: '#334155',
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
    display: 'Unbounded',
    body: 'DM Sans',
    code: 'JetBrains Mono',
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
  navbar: 'canopy',
  footer: 'embassy',
  cta: {
    contained: false,
  },
};

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
    primary: '#0d9488',
    accent: '#6366f1',
    neutral: '#64748b',
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
};

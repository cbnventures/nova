import type { PresetsSignalPresetSignal } from '../../types/presets/signal/preset.d.ts';

/**
 * Presets - Signal - Preset - Signal.
 *
 * Branded-short-links documentation site preset with Space Grotesk display
 * font, Inter body font, and JetBrains Mono code font paired with sharp
 * shapes and flat card depth.
 *
 * @since 0.15.0
 */
export const presetsSignalPresetSignal: PresetsSignalPresetSignal = {
  logo: {
    title: 'Signal',
    alt: 'Signal',
    src: '@nova-assets/presets/signal/logo.svg',
  },
  colors: {
    primary: '#e11d48',
    accent: '#f59e0b',
    neutral: '#525252',
  },
  fonts: {
    display: 'Space Grotesk',
    body: 'Inter',
    code: 'JetBrains Mono',
  },
  shape: {
    radius: 'sharp',
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
  navbar: 'monolith',
  footer: 'ledger',
};

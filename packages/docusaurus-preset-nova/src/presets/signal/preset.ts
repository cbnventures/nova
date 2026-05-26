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
    primary: {
      light: '#dc2626',
      dark: '#dc2626',
    },
    accent: {
      light: '#f59e0b',
      dark: '#f59e0b',
    },
    text: {
      light: '#262626',
      dark: '#e5e5e5',
    },
    border: {
      light: '#d4d4d4',
      dark: '#404040',
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
  cta: {
    contained: false,
  },
};

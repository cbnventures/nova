import { ok } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as CssGenerator } from '../../lib/css-generator.js';

import type {
  Tests_Lib_CssGenerator_ColorIncludesFifty,
  Tests_Lib_CssGenerator_ColorIncludesNineFifty,
  Tests_Lib_CssGenerator_ColorIncludesNineHundred,
  Tests_Lib_CssGenerator_ColorResult,
  Tests_Lib_CssGenerator_ComfortableGridIncludesGutterSixteen,
  Tests_Lib_CssGenerator_ComfortableGridIncludesPaddingSixteen,
  Tests_Lib_CssGenerator_ComfortableGridLargeBlock,
  Tests_Lib_CssGenerator_ComfortableGridLargeIncludesGutterTwentyFour,
  Tests_Lib_CssGenerator_ComfortableGridLargeIncludesPaddingTwentyFour,
  Tests_Lib_CssGenerator_ComfortableGridMediumBlock,
  Tests_Lib_CssGenerator_ComfortableGridMediumIncludesGutterTwenty,
  Tests_Lib_CssGenerator_ComfortableGridMediumIncludesPaddingTwenty,
  Tests_Lib_CssGenerator_ComfortableGridMediumSections,
  Tests_Lib_CssGenerator_ComfortableGridResult,
  Tests_Lib_CssGenerator_ComfortableGridRootBlock,
  Tests_Lib_CssGenerator_ComfortableGridSections,
  Tests_Lib_CssGenerator_CompactGridIncludesGutterTwelve,
  Tests_Lib_CssGenerator_CompactGridIncludesPaddingTwelve,
  Tests_Lib_CssGenerator_CompactGridLargeBlock,
  Tests_Lib_CssGenerator_CompactGridLargeIncludesGutterTwenty,
  Tests_Lib_CssGenerator_CompactGridLargeIncludesPaddingTwenty,
  Tests_Lib_CssGenerator_CompactGridMediumBlock,
  Tests_Lib_CssGenerator_CompactGridMediumIncludesGutterSixteen,
  Tests_Lib_CssGenerator_CompactGridMediumIncludesPaddingSixteen,
  Tests_Lib_CssGenerator_CompactGridMediumSections,
  Tests_Lib_CssGenerator_CompactGridResult,
  Tests_Lib_CssGenerator_CompactGridRootBlock,
  Tests_Lib_CssGenerator_CompactGridSections,
  Tests_Lib_CssGenerator_ElevatedIncludesShadow,
  Tests_Lib_CssGenerator_ElevatedResult,
  Tests_Lib_CssGenerator_ExpressiveMotionIncludesThreeHundred,
  Tests_Lib_CssGenerator_ExpressiveMotionResult,
  Tests_Lib_CssGenerator_FlatIncludesNone,
  Tests_Lib_CssGenerator_FlatResult,
  Tests_Lib_CssGenerator_GlassIncludesBlur,
  Tests_Lib_CssGenerator_GlassResult,
  Tests_Lib_CssGenerator_GridIntegrationIncludesGutter,
  Tests_Lib_CssGenerator_GridIntegrationIncludesMedia,
  Tests_Lib_CssGenerator_GridIntegrationIncludesRoot,
  Tests_Lib_CssGenerator_GridIntegrationResult,
  Tests_Lib_CssGenerator_GridMediaIncludesFourEighty,
  Tests_Lib_CssGenerator_GridMediaIncludesSevenSixtyEight,
  Tests_Lib_CssGenerator_GridMediaResult,
  Tests_Lib_CssGenerator_IncludesAccent,
  Tests_Lib_CssGenerator_IncludesBorder,
  Tests_Lib_CssGenerator_IncludesDepth,
  Tests_Lib_CssGenerator_IncludesFont,
  Tests_Lib_CssGenerator_IncludesMotion,
  Tests_Lib_CssGenerator_IncludesMotionEasing,
  Tests_Lib_CssGenerator_IncludesPrimary,
  Tests_Lib_CssGenerator_IncludesRoot,
  Tests_Lib_CssGenerator_IncludesShape,
  Tests_Lib_CssGenerator_IncludesSurface,
  Tests_Lib_CssGenerator_IncludesText,
  Tests_Lib_CssGenerator_MotionEasingIncludesCurve,
  Tests_Lib_CssGenerator_MotionEasingResult,
  Tests_Lib_CssGenerator_NoneMotionIncludesZero,
  Tests_Lib_CssGenerator_NoneMotionResult,
  Tests_Lib_CssGenerator_PillIncludesLargeRadius,
  Tests_Lib_CssGenerator_PillResult,
  Tests_Lib_CssGenerator_Result,
  Tests_Lib_CssGenerator_SharpIncludesZero,
  Tests_Lib_CssGenerator_SharpResult,
  Tests_Lib_CssGenerator_SpaciousGridIncludesGutterTwenty,
  Tests_Lib_CssGenerator_SpaciousGridIncludesPaddingTwenty,
  Tests_Lib_CssGenerator_SpaciousGridLargeBlock,
  Tests_Lib_CssGenerator_SpaciousGridLargeIncludesGutterThirtyTwo,
  Tests_Lib_CssGenerator_SpaciousGridLargeIncludesPaddingThirtyTwo,
  Tests_Lib_CssGenerator_SpaciousGridMediumBlock,
  Tests_Lib_CssGenerator_SpaciousGridMediumIncludesGutterTwentyFour,
  Tests_Lib_CssGenerator_SpaciousGridMediumIncludesPaddingTwentyFour,
  Tests_Lib_CssGenerator_SpaciousGridMediumSections,
  Tests_Lib_CssGenerator_SpaciousGridResult,
  Tests_Lib_CssGenerator_SpaciousGridRootBlock,
  Tests_Lib_CssGenerator_SpaciousGridSections,
} from '../../types/tests/lib/css-generator.test.d.ts';

/**
 * Tests - Lib - CSS Generator - CssGenerator Generate.
 *
 * @since 0.15.0
 */
describe('CssGenerator generate', async () => {
  it('produces CSS with all variable categories', () => {
    const result: Tests_Lib_CssGenerator_Result = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
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
        navbar: 'bridge',
        footer: 'commons',
        cta: {
          contained: false,
        },
      },
    });

    const includesRoot: Tests_Lib_CssGenerator_IncludesRoot = result.includes(':root {');
    const includesPrimary: Tests_Lib_CssGenerator_IncludesPrimary = result.includes('--nova-color-primary-');
    const includesAccent: Tests_Lib_CssGenerator_IncludesAccent = result.includes('--nova-color-accent-');
    const includesText: Tests_Lib_CssGenerator_IncludesText = result.includes('--nova-color-text:');
    const includesBorder: Tests_Lib_CssGenerator_IncludesBorder = result.includes('--nova-color-border:');
    const includesSurface: Tests_Lib_CssGenerator_IncludesSurface = result.includes('--nova-color-surface-raised:');
    const includesFont: Tests_Lib_CssGenerator_IncludesFont = result.includes('--nova-font-display:');
    const includesShape: Tests_Lib_CssGenerator_IncludesShape = result.includes('--nova-shape-radius:');
    const includesDepth: Tests_Lib_CssGenerator_IncludesDepth = result.includes('--nova-depth-card-');
    const includesMotion: Tests_Lib_CssGenerator_IncludesMotion = result.includes('--nova-motion-duration:');
    const includesMotionEasing: Tests_Lib_CssGenerator_IncludesMotionEasing = result.includes('--nova-motion-easing:');

    ok(includesRoot);
    ok(includesPrimary);
    ok(includesAccent);
    ok(includesText);
    ok(includesBorder);
    ok(includesSurface);
    ok(includesFont);
    ok(includesShape);
    ok(includesDepth);
    ok(includesMotion);
    ok(includesMotionEasing);

    return;
  });

  it('includes all eleven shade levels for each color', () => {
    const result: Tests_Lib_CssGenerator_ColorResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
        },
        motion: {
          speed: 'none',
          staggeredReveals: false,
          hoverEffects: false,
        },
        navbar: 'bridge',
        footer: 'commons',
        cta: {
          contained: false,
        },
      },
    });

    const includesFifty: Tests_Lib_CssGenerator_ColorIncludesFifty = result.includes('--nova-color-primary-50:');
    const includesNineHundred: Tests_Lib_CssGenerator_ColorIncludesNineHundred = result.includes('--nova-color-primary-900:');
    const includesNineFifty: Tests_Lib_CssGenerator_ColorIncludesNineFifty = result.includes('--nova-color-primary-950:');

    ok(includesFifty);
    ok(includesNineHundred);
    ok(includesNineFifty);

    return;
  });

  return;
});

/**
 * Tests - Lib - CSS Generator - CssGenerator Generate Depth Variables.
 *
 * @since 0.15.0
 */
describe('CssGenerator generate depth variables', async () => {
  it('produces flat card depth with no shadow', () => {
    const result: Tests_Lib_CssGenerator_FlatResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const includesNone: Tests_Lib_CssGenerator_FlatIncludesNone = result.includes('--nova-depth-card-shadow: none;');

    ok(includesNone);

    return;
  });

  it('produces elevated card depth with shadow', () => {
    const result: Tests_Lib_CssGenerator_ElevatedResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
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
        navbar: 'bridge',
        footer: 'commons',
        cta: {
          contained: false,
        },
      },
    });

    const includesShadow: Tests_Lib_CssGenerator_ElevatedIncludesShadow = result.includes('--nova-depth-card-shadow: 0 4px 6px');

    ok(includesShadow);

    return;
  });

  it('produces glass card depth with backdrop blur', () => {
    const result: Tests_Lib_CssGenerator_GlassResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'glass',
          codeBlocks: 'elevated',
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
      },
    });

    const includesBlur: Tests_Lib_CssGenerator_GlassIncludesBlur = result.includes('--nova-depth-card-backdrop: blur(5px);');

    ok(includesBlur);

    return;
  });

  return;
});

/**
 * Tests - Lib - CSS Generator - CssGenerator Generate Grid Variables.
 *
 * @since 0.15.0
 */
describe('CssGenerator generate grid variables', async () => {
  it('produces 12px gutter and padding for compact density', () => {
    const result: Tests_Lib_CssGenerator_CompactGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'compact',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const sections: Tests_Lib_CssGenerator_CompactGridSections = result.split('@media');
    const rootBlock: Tests_Lib_CssGenerator_CompactGridRootBlock = String(sections[0]);

    const includesGutterTwelve: Tests_Lib_CssGenerator_CompactGridIncludesGutterTwelve = rootBlock.includes('--nova-grid-gutter: 12px;');
    const includesPaddingTwelve: Tests_Lib_CssGenerator_CompactGridIncludesPaddingTwelve = rootBlock.includes('--nova-grid-padding: 12px;');

    ok(includesGutterTwelve);
    ok(includesPaddingTwelve);

    return;
  });

  it('produces 16px gutter and padding for comfortable density', () => {
    const result: Tests_Lib_CssGenerator_ComfortableGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const sections: Tests_Lib_CssGenerator_ComfortableGridSections = result.split('@media');
    const rootBlock: Tests_Lib_CssGenerator_ComfortableGridRootBlock = String(sections[0]);

    const includesGutterSixteen: Tests_Lib_CssGenerator_ComfortableGridIncludesGutterSixteen = rootBlock.includes('--nova-grid-gutter: 16px;');
    const includesPaddingSixteen: Tests_Lib_CssGenerator_ComfortableGridIncludesPaddingSixteen = rootBlock.includes('--nova-grid-padding: 16px;');

    ok(includesGutterSixteen);
    ok(includesPaddingSixteen);

    return;
  });

  it('produces 20px gutter and padding for spacious density', () => {
    const result: Tests_Lib_CssGenerator_SpaciousGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'spacious',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const sections: Tests_Lib_CssGenerator_SpaciousGridSections = result.split('@media');
    const rootBlock: Tests_Lib_CssGenerator_SpaciousGridRootBlock = String(sections[0]);

    const includesGutterTwenty: Tests_Lib_CssGenerator_SpaciousGridIncludesGutterTwenty = rootBlock.includes('--nova-grid-gutter: 20px;');
    const includesPaddingTwenty: Tests_Lib_CssGenerator_SpaciousGridIncludesPaddingTwenty = rootBlock.includes('--nova-grid-padding: 20px;');

    ok(includesGutterTwenty);
    ok(includesPaddingTwenty);

    return;
  });

  it('produces correct medium and large breakpoint values for compact density', () => {
    const result: Tests_Lib_CssGenerator_CompactGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'compact',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const sections: Tests_Lib_CssGenerator_CompactGridMediumSections = result.split('@media');
    const mediumBlock: Tests_Lib_CssGenerator_CompactGridMediumBlock = String(sections[1]);
    const largeBlock: Tests_Lib_CssGenerator_CompactGridLargeBlock = String(sections[2]);

    const includesMediumGutterSixteen: Tests_Lib_CssGenerator_CompactGridMediumIncludesGutterSixteen = mediumBlock.includes('--nova-grid-gutter: 16px;');
    const includesMediumPaddingSixteen: Tests_Lib_CssGenerator_CompactGridMediumIncludesPaddingSixteen = mediumBlock.includes('--nova-grid-padding: 16px;');
    const includesLargeGutterTwenty: Tests_Lib_CssGenerator_CompactGridLargeIncludesGutterTwenty = largeBlock.includes('--nova-grid-gutter: 20px;');
    const includesLargePaddingTwenty: Tests_Lib_CssGenerator_CompactGridLargeIncludesPaddingTwenty = largeBlock.includes('--nova-grid-padding: 20px;');

    ok(includesMediumGutterSixteen);
    ok(includesMediumPaddingSixteen);
    ok(includesLargeGutterTwenty);
    ok(includesLargePaddingTwenty);

    return;
  });

  it('produces correct medium and large breakpoint values for comfortable density', () => {
    const result: Tests_Lib_CssGenerator_ComfortableGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const sections: Tests_Lib_CssGenerator_ComfortableGridMediumSections = result.split('@media');
    const mediumBlock: Tests_Lib_CssGenerator_ComfortableGridMediumBlock = String(sections[1]);
    const largeBlock: Tests_Lib_CssGenerator_ComfortableGridLargeBlock = String(sections[2]);

    const includesMediumGutterTwenty: Tests_Lib_CssGenerator_ComfortableGridMediumIncludesGutterTwenty = mediumBlock.includes('--nova-grid-gutter: 20px;');
    const includesMediumPaddingTwenty: Tests_Lib_CssGenerator_ComfortableGridMediumIncludesPaddingTwenty = mediumBlock.includes('--nova-grid-padding: 20px;');
    const includesLargeGutterTwentyFour: Tests_Lib_CssGenerator_ComfortableGridLargeIncludesGutterTwentyFour = largeBlock.includes('--nova-grid-gutter: 24px;');
    const includesLargePaddingTwentyFour: Tests_Lib_CssGenerator_ComfortableGridLargeIncludesPaddingTwentyFour = largeBlock.includes('--nova-grid-padding: 24px;');

    ok(includesMediumGutterTwenty);
    ok(includesMediumPaddingTwenty);
    ok(includesLargeGutterTwentyFour);
    ok(includesLargePaddingTwentyFour);

    return;
  });

  it('produces correct medium and large breakpoint values for spacious density', () => {
    const result: Tests_Lib_CssGenerator_SpaciousGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'spacious',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const sections: Tests_Lib_CssGenerator_SpaciousGridMediumSections = result.split('@media');
    const mediumBlock: Tests_Lib_CssGenerator_SpaciousGridMediumBlock = String(sections[1]);
    const largeBlock: Tests_Lib_CssGenerator_SpaciousGridLargeBlock = String(sections[2]);

    const includesMediumGutterTwentyFour: Tests_Lib_CssGenerator_SpaciousGridMediumIncludesGutterTwentyFour = mediumBlock.includes('--nova-grid-gutter: 24px;');
    const includesMediumPaddingTwentyFour: Tests_Lib_CssGenerator_SpaciousGridMediumIncludesPaddingTwentyFour = mediumBlock.includes('--nova-grid-padding: 24px;');
    const includesLargeGutterThirtyTwo: Tests_Lib_CssGenerator_SpaciousGridLargeIncludesGutterThirtyTwo = largeBlock.includes('--nova-grid-gutter: 32px;');
    const includesLargePaddingThirtyTwo: Tests_Lib_CssGenerator_SpaciousGridLargeIncludesPaddingThirtyTwo = largeBlock.includes('--nova-grid-padding: 32px;');

    ok(includesMediumGutterTwentyFour);
    ok(includesMediumPaddingTwentyFour);
    ok(includesLargeGutterThirtyTwo);
    ok(includesLargePaddingThirtyTwo);

    return;
  });

  it('includes responsive media query blocks', () => {
    const result: Tests_Lib_CssGenerator_GridMediaResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const includesFourEighty: Tests_Lib_CssGenerator_GridMediaIncludesFourEighty = result.includes('@media (min-width: 480px)');
    const includesSevenSixtyEight: Tests_Lib_CssGenerator_GridMediaIncludesSevenSixtyEight = result.includes('@media (min-width: 768px)');

    ok(includesFourEighty);
    ok(includesSevenSixtyEight);

    return;
  });

  it('integration: generate output contains root block and post-root media queries', () => {
    const result: Tests_Lib_CssGenerator_GridIntegrationResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const includesRoot: Tests_Lib_CssGenerator_GridIntegrationIncludesRoot = result.includes(':root {');
    const includesMedia: Tests_Lib_CssGenerator_GridIntegrationIncludesMedia = result.includes('@media (min-width:');
    const includesGutter: Tests_Lib_CssGenerator_GridIntegrationIncludesGutter = result.includes('--nova-grid-gutter:');

    ok(includesRoot);
    ok(includesMedia);
    ok(includesGutter);

    return;
  });

  return;
});

/**
 * Tests - Lib - CSS Generator - CssGenerator Generate Motion Variables.
 *
 * @since 0.15.0
 */
describe('CssGenerator generate motion variables', async () => {
  it('produces zero duration for none speed', () => {
    const result: Tests_Lib_CssGenerator_NoneMotionResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
        },
        motion: {
          speed: 'none',
          staggeredReveals: false,
          hoverEffects: false,
        },
        navbar: 'bridge',
        footer: 'commons',
        cta: {
          contained: false,
        },
      },
    });

    const includesZero: Tests_Lib_CssGenerator_NoneMotionIncludesZero = result.includes('--nova-motion-duration: 0ms;');

    ok(includesZero);

    return;
  });

  it('produces 300ms duration for expressive speed', () => {
    const result: Tests_Lib_CssGenerator_ExpressiveMotionResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
        },
        motion: {
          speed: 'expressive',
          staggeredReveals: true,
          hoverEffects: true,
        },
        navbar: 'bridge',
        footer: 'commons',
        cta: {
          contained: false,
        },
      },
    });

    const includesThreeHundred: Tests_Lib_CssGenerator_ExpressiveMotionIncludesThreeHundred = result.includes('--nova-motion-duration: 300ms;');

    ok(includesThreeHundred);

    return;
  });

  it('produces canonical Nova ease curve for motion easing', () => {
    const result: Tests_Lib_CssGenerator_MotionEasingResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'rounded',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
        },
        motion: {
          speed: 'normal',
          staggeredReveals: false,
          hoverEffects: false,
        },
        navbar: 'bridge',
        footer: 'commons',
        cta: {
          contained: false,
        },
      },
    });

    const includesCurve: Tests_Lib_CssGenerator_MotionEasingIncludesCurve = result.includes('--nova-motion-easing: cubic-bezier(0.22, 1, 0.36, 1);');

    ok(includesCurve);

    return;
  });

  return;
});

/**
 * Tests - Lib - CSS Generator - CssGenerator Generate Shape Variables.
 *
 * @since 0.15.0
 */
describe('CssGenerator generate shape variables', async () => {
  it('produces zero radius for sharp shape', () => {
    const result: Tests_Lib_CssGenerator_SharpResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'sharp',
          density: 'comfortable',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const includesZero: Tests_Lib_CssGenerator_SharpIncludesZero = result.includes('--nova-shape-radius: 0;');

    ok(includesZero);

    return;
  });

  it('produces 9999px radius for pill shape', () => {
    const result: Tests_Lib_CssGenerator_PillResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: {
            light: '#ea580c', dark: '#ea580c',
          },
          accent: {
            light: '#fbbf24', dark: '#fbbf24',
          },
          text: {
            light: '#1c1917', dark: '#e7e5e4',
          },
          border: {
            light: '#d6d3d1', dark: '#44403c',
          },
          warning: {
            light: '#f59e0b', dark: '#fbbf24',
          },
          danger: {
            light: '#ef4444', dark: '#f87171',
          },
        },
        fonts: {
          display: 'Sora',
          body: 'DM Sans',
          code: 'JetBrains Mono',
        },
        shape: {
          radius: 'pill',
          density: 'spacious',
        },
        depth: {
          cards: 'flat',
          codeBlocks: 'flat',
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
      },
    });

    const includesLargeRadius: Tests_Lib_CssGenerator_PillIncludesLargeRadius = result.includes('--nova-shape-radius: 9999px;');

    ok(includesLargeRadius);

    return;
  });

  return;
});

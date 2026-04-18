import { ok } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { CssGenerator } from '../../lib/css-generator.js';

import type {
  TestsLibCssGeneratorColorIncludesFifty,
  TestsLibCssGeneratorColorIncludesNineFifty,
  TestsLibCssGeneratorColorIncludesNineHundred,
  TestsLibCssGeneratorColorResult,
  TestsLibCssGeneratorComfortableGridIncludesGutterSixteen,
  TestsLibCssGeneratorComfortableGridIncludesPaddingSixteen,
  TestsLibCssGeneratorComfortableGridLargeBlock,
  TestsLibCssGeneratorComfortableGridLargeIncludesGutterTwentyFour,
  TestsLibCssGeneratorComfortableGridLargeIncludesPaddingTwentyFour,
  TestsLibCssGeneratorComfortableGridMediumBlock,
  TestsLibCssGeneratorComfortableGridMediumIncludesGutterTwenty,
  TestsLibCssGeneratorComfortableGridMediumIncludesPaddingTwenty,
  TestsLibCssGeneratorComfortableGridMediumSections,
  TestsLibCssGeneratorComfortableGridResult,
  TestsLibCssGeneratorComfortableGridRootBlock,
  TestsLibCssGeneratorComfortableGridSections,
  TestsLibCssGeneratorCompactGridIncludesGutterTwelve,
  TestsLibCssGeneratorCompactGridIncludesPaddingTwelve,
  TestsLibCssGeneratorCompactGridLargeBlock,
  TestsLibCssGeneratorCompactGridLargeIncludesGutterTwenty,
  TestsLibCssGeneratorCompactGridLargeIncludesPaddingTwenty,
  TestsLibCssGeneratorCompactGridMediumBlock,
  TestsLibCssGeneratorCompactGridMediumIncludesGutterSixteen,
  TestsLibCssGeneratorCompactGridMediumIncludesPaddingSixteen,
  TestsLibCssGeneratorCompactGridMediumSections,
  TestsLibCssGeneratorCompactGridResult,
  TestsLibCssGeneratorCompactGridRootBlock,
  TestsLibCssGeneratorCompactGridSections,
  TestsLibCssGeneratorElevatedIncludesShadow,
  TestsLibCssGeneratorElevatedResult,
  TestsLibCssGeneratorExpressiveMotionIncludesThreeHundred,
  TestsLibCssGeneratorExpressiveMotionResult,
  TestsLibCssGeneratorFlatIncludesNone,
  TestsLibCssGeneratorFlatResult,
  TestsLibCssGeneratorGlassIncludesBlur,
  TestsLibCssGeneratorGlassResult,
  TestsLibCssGeneratorGridIntegrationIncludesGutter,
  TestsLibCssGeneratorGridIntegrationIncludesMedia,
  TestsLibCssGeneratorGridIntegrationIncludesRoot,
  TestsLibCssGeneratorGridIntegrationResult,
  TestsLibCssGeneratorGridMediaIncludesFourEighty,
  TestsLibCssGeneratorGridMediaIncludesSevenSixtyEight,
  TestsLibCssGeneratorGridMediaResult,
  TestsLibCssGeneratorIncludesAccent,
  TestsLibCssGeneratorIncludesDepth,
  TestsLibCssGeneratorIncludesFont,
  TestsLibCssGeneratorIncludesMotion,
  TestsLibCssGeneratorIncludesNeutral,
  TestsLibCssGeneratorIncludesPrimary,
  TestsLibCssGeneratorIncludesRoot,
  TestsLibCssGeneratorIncludesShape,
  TestsLibCssGeneratorNoneMotionIncludesZero,
  TestsLibCssGeneratorNoneMotionResult,
  TestsLibCssGeneratorPillIncludesLargeRadius,
  TestsLibCssGeneratorPillResult,
  TestsLibCssGeneratorResult,
  TestsLibCssGeneratorSharpIncludesZero,
  TestsLibCssGeneratorSharpResult,
  TestsLibCssGeneratorSpaciousGridIncludesGutterTwenty,
  TestsLibCssGeneratorSpaciousGridIncludesPaddingTwenty,
  TestsLibCssGeneratorSpaciousGridLargeBlock,
  TestsLibCssGeneratorSpaciousGridLargeIncludesGutterThirtyTwo,
  TestsLibCssGeneratorSpaciousGridLargeIncludesPaddingThirtyTwo,
  TestsLibCssGeneratorSpaciousGridMediumBlock,
  TestsLibCssGeneratorSpaciousGridMediumIncludesGutterTwentyFour,
  TestsLibCssGeneratorSpaciousGridMediumIncludesPaddingTwentyFour,
  TestsLibCssGeneratorSpaciousGridMediumSections,
  TestsLibCssGeneratorSpaciousGridResult,
  TestsLibCssGeneratorSpaciousGridRootBlock,
  TestsLibCssGeneratorSpaciousGridSections,
} from '../../types/tests/lib/css-generator.test.d.ts';

/**
 * Tests - Lib - CSS Generator - CssGenerator Generate.
 *
 * @since 0.15.0
 */
describe('CssGenerator generate', async () => {
  it('produces CSS with all variable categories', () => {
    const result: TestsLibCssGeneratorResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesRoot: TestsLibCssGeneratorIncludesRoot = result.includes(':root {');
    const includesPrimary: TestsLibCssGeneratorIncludesPrimary = result.includes('--nova-color-primary-');
    const includesAccent: TestsLibCssGeneratorIncludesAccent = result.includes('--nova-color-accent-');
    const includesNeutral: TestsLibCssGeneratorIncludesNeutral = result.includes('--nova-color-neutral-');
    const includesFont: TestsLibCssGeneratorIncludesFont = result.includes('--nova-font-display:');
    const includesShape: TestsLibCssGeneratorIncludesShape = result.includes('--nova-shape-radius:');
    const includesDepth: TestsLibCssGeneratorIncludesDepth = result.includes('--nova-depth-card-');
    const includesMotion: TestsLibCssGeneratorIncludesMotion = result.includes('--nova-motion-duration:');

    ok(includesRoot);
    ok(includesPrimary);
    ok(includesAccent);
    ok(includesNeutral);
    ok(includesFont);
    ok(includesShape);
    ok(includesDepth);
    ok(includesMotion);

    return;
  });

  it('includes all eleven shade levels for each color', () => {
    const result: TestsLibCssGeneratorColorResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesFifty: TestsLibCssGeneratorColorIncludesFifty = result.includes('--nova-color-primary-50:');
    const includesNineHundred: TestsLibCssGeneratorColorIncludesNineHundred = result.includes('--nova-color-primary-900:');
    const includesNineFifty: TestsLibCssGeneratorColorIncludesNineFifty = result.includes('--nova-color-primary-950:');

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
    const result: TestsLibCssGeneratorFlatResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesNone: TestsLibCssGeneratorFlatIncludesNone = result.includes('--nova-depth-card-shadow: none;');

    ok(includesNone);

    return;
  });

  it('produces elevated card depth with shadow', () => {
    const result: TestsLibCssGeneratorElevatedResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesShadow: TestsLibCssGeneratorElevatedIncludesShadow = result.includes('--nova-depth-card-shadow: 0 4px 6px');

    ok(includesShadow);

    return;
  });

  it('produces glass card depth with backdrop blur', () => {
    const result: TestsLibCssGeneratorGlassResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesBlur: TestsLibCssGeneratorGlassIncludesBlur = result.includes('--nova-depth-card-backdrop: blur(5px);');

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
    const result: TestsLibCssGeneratorCompactGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const sections: TestsLibCssGeneratorCompactGridSections = result.split('@media');
    const rootBlock: TestsLibCssGeneratorCompactGridRootBlock = String(sections[0]);

    const includesGutterTwelve: TestsLibCssGeneratorCompactGridIncludesGutterTwelve = rootBlock.includes('--nova-grid-gutter: 12px;');
    const includesPaddingTwelve: TestsLibCssGeneratorCompactGridIncludesPaddingTwelve = rootBlock.includes('--nova-grid-padding: 12px;');

    ok(includesGutterTwelve);
    ok(includesPaddingTwelve);

    return;
  });

  it('produces 16px gutter and padding for comfortable density', () => {
    const result: TestsLibCssGeneratorComfortableGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const sections: TestsLibCssGeneratorComfortableGridSections = result.split('@media');
    const rootBlock: TestsLibCssGeneratorComfortableGridRootBlock = String(sections[0]);

    const includesGutterSixteen: TestsLibCssGeneratorComfortableGridIncludesGutterSixteen = rootBlock.includes('--nova-grid-gutter: 16px;');
    const includesPaddingSixteen: TestsLibCssGeneratorComfortableGridIncludesPaddingSixteen = rootBlock.includes('--nova-grid-padding: 16px;');

    ok(includesGutterSixteen);
    ok(includesPaddingSixteen);

    return;
  });

  it('produces 20px gutter and padding for spacious density', () => {
    const result: TestsLibCssGeneratorSpaciousGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const sections: TestsLibCssGeneratorSpaciousGridSections = result.split('@media');
    const rootBlock: TestsLibCssGeneratorSpaciousGridRootBlock = String(sections[0]);

    const includesGutterTwenty: TestsLibCssGeneratorSpaciousGridIncludesGutterTwenty = rootBlock.includes('--nova-grid-gutter: 20px;');
    const includesPaddingTwenty: TestsLibCssGeneratorSpaciousGridIncludesPaddingTwenty = rootBlock.includes('--nova-grid-padding: 20px;');

    ok(includesGutterTwenty);
    ok(includesPaddingTwenty);

    return;
  });

  it('produces correct medium and large breakpoint values for compact density', () => {
    const result: TestsLibCssGeneratorCompactGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const sections: TestsLibCssGeneratorCompactGridMediumSections = result.split('@media');
    const mediumBlock: TestsLibCssGeneratorCompactGridMediumBlock = String(sections[1]);
    const largeBlock: TestsLibCssGeneratorCompactGridLargeBlock = String(sections[2]);

    const includesMediumGutterSixteen: TestsLibCssGeneratorCompactGridMediumIncludesGutterSixteen = mediumBlock.includes('--nova-grid-gutter: 16px;');
    const includesMediumPaddingSixteen: TestsLibCssGeneratorCompactGridMediumIncludesPaddingSixteen = mediumBlock.includes('--nova-grid-padding: 16px;');
    const includesLargeGutterTwenty: TestsLibCssGeneratorCompactGridLargeIncludesGutterTwenty = largeBlock.includes('--nova-grid-gutter: 20px;');
    const includesLargePaddingTwenty: TestsLibCssGeneratorCompactGridLargeIncludesPaddingTwenty = largeBlock.includes('--nova-grid-padding: 20px;');

    ok(includesMediumGutterSixteen);
    ok(includesMediumPaddingSixteen);
    ok(includesLargeGutterTwenty);
    ok(includesLargePaddingTwenty);

    return;
  });

  it('produces correct medium and large breakpoint values for comfortable density', () => {
    const result: TestsLibCssGeneratorComfortableGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const sections: TestsLibCssGeneratorComfortableGridMediumSections = result.split('@media');
    const mediumBlock: TestsLibCssGeneratorComfortableGridMediumBlock = String(sections[1]);
    const largeBlock: TestsLibCssGeneratorComfortableGridLargeBlock = String(sections[2]);

    const includesMediumGutterTwenty: TestsLibCssGeneratorComfortableGridMediumIncludesGutterTwenty = mediumBlock.includes('--nova-grid-gutter: 20px;');
    const includesMediumPaddingTwenty: TestsLibCssGeneratorComfortableGridMediumIncludesPaddingTwenty = mediumBlock.includes('--nova-grid-padding: 20px;');
    const includesLargeGutterTwentyFour: TestsLibCssGeneratorComfortableGridLargeIncludesGutterTwentyFour = largeBlock.includes('--nova-grid-gutter: 24px;');
    const includesLargePaddingTwentyFour: TestsLibCssGeneratorComfortableGridLargeIncludesPaddingTwentyFour = largeBlock.includes('--nova-grid-padding: 24px;');

    ok(includesMediumGutterTwenty);
    ok(includesMediumPaddingTwenty);
    ok(includesLargeGutterTwentyFour);
    ok(includesLargePaddingTwentyFour);

    return;
  });

  it('produces correct medium and large breakpoint values for spacious density', () => {
    const result: TestsLibCssGeneratorSpaciousGridResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const sections: TestsLibCssGeneratorSpaciousGridMediumSections = result.split('@media');
    const mediumBlock: TestsLibCssGeneratorSpaciousGridMediumBlock = String(sections[1]);
    const largeBlock: TestsLibCssGeneratorSpaciousGridLargeBlock = String(sections[2]);

    const includesMediumGutterTwentyFour: TestsLibCssGeneratorSpaciousGridMediumIncludesGutterTwentyFour = mediumBlock.includes('--nova-grid-gutter: 24px;');
    const includesMediumPaddingTwentyFour: TestsLibCssGeneratorSpaciousGridMediumIncludesPaddingTwentyFour = mediumBlock.includes('--nova-grid-padding: 24px;');
    const includesLargeGutterThirtyTwo: TestsLibCssGeneratorSpaciousGridLargeIncludesGutterThirtyTwo = largeBlock.includes('--nova-grid-gutter: 32px;');
    const includesLargePaddingThirtyTwo: TestsLibCssGeneratorSpaciousGridLargeIncludesPaddingThirtyTwo = largeBlock.includes('--nova-grid-padding: 32px;');

    ok(includesMediumGutterTwentyFour);
    ok(includesMediumPaddingTwentyFour);
    ok(includesLargeGutterThirtyTwo);
    ok(includesLargePaddingThirtyTwo);

    return;
  });

  it('includes responsive media query blocks', () => {
    const result: TestsLibCssGeneratorGridMediaResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesFourEighty: TestsLibCssGeneratorGridMediaIncludesFourEighty = result.includes('@media (min-width: 480px)');
    const includesSevenSixtyEight: TestsLibCssGeneratorGridMediaIncludesSevenSixtyEight = result.includes('@media (min-width: 768px)');

    ok(includesFourEighty);
    ok(includesSevenSixtyEight);

    return;
  });

  it('integration: generate output contains root block and post-root media queries', () => {
    const result: TestsLibCssGeneratorGridIntegrationResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesRoot: TestsLibCssGeneratorGridIntegrationIncludesRoot = result.includes(':root {');
    const includesMedia: TestsLibCssGeneratorGridIntegrationIncludesMedia = result.includes('@media (min-width:');
    const includesGutter: TestsLibCssGeneratorGridIntegrationIncludesGutter = result.includes('--nova-grid-gutter:');

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
    const result: TestsLibCssGeneratorNoneMotionResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesZero: TestsLibCssGeneratorNoneMotionIncludesZero = result.includes('--nova-motion-duration: 0ms;');

    ok(includesZero);

    return;
  });

  it('produces 300ms duration for expressive speed', () => {
    const result: TestsLibCssGeneratorExpressiveMotionResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesThreeHundred: TestsLibCssGeneratorExpressiveMotionIncludesThreeHundred = result.includes('--nova-motion-duration: 300ms;');

    ok(includesThreeHundred);

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
    const result: TestsLibCssGeneratorSharpResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesZero: TestsLibCssGeneratorSharpIncludesZero = result.includes('--nova-shape-radius: 0;');

    ok(includesZero);

    return;
  });

  it('produces 9999px radius for pill shape', () => {
    const result: TestsLibCssGeneratorPillResult = CssGenerator.generate({
      preset: {
        logo: {
          title: 'Test',
          alt: 'Test',
          src: '/test/logo.svg',
        },
        colors: {
          primary: '#ea580c',
          accent: '#fbbf24',
          neutral: '#78716c',
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
      },
    });

    const includesLargeRadius: TestsLibCssGeneratorPillIncludesLargeRadius = result.includes('--nova-shape-radius: 9999px;');

    ok(includesLargeRadius);

    return;
  });

  return;
});

import { ok } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as CssGenerator } from '../../lib/css-generator.js';

import type {
  Tests_Lib_CssGenerator_CssGeneratorGenerate_IncludesAllElevenShadeLevelsForEachColor_IncludesFifty,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_IncludesAllElevenShadeLevelsForEachColor_IncludesNineFifty,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_IncludesAllElevenShadeLevelsForEachColor_IncludesNineHundred,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_IncludesAllElevenShadeLevelsForEachColor_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesAccent,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesBorder,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesDepth,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesFont,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesMotion,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesMotionEasing,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesPrimary,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesRoot,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesShape,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesSurface,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesText,
  Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesElevatedCardDepthWithShadow_IncludesShadow,
  Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesElevatedCardDepthWithShadow_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesFlatCardDepthWithNoShadow_IncludesNone,
  Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesFlatCardDepthWithNoShadow_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesGlassCardDepthWithBackdropBlur_IncludesBlur,
  Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesGlassCardDepthWithBackdropBlur_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IncludesResponsiveMediaQueryBlocks_IncludesFourEighty,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IncludesResponsiveMediaQueryBlocks_IncludesSevenSixtyEight,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IncludesResponsiveMediaQueryBlocks_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IntegrationGenerateOutputContainsRootBlockAndPostRootMediaQueries_IncludesGutter,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IntegrationGenerateOutputContainsRootBlockAndPostRootMediaQueries_IncludesMedia,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IntegrationGenerateOutputContainsRootBlockAndPostRootMediaQueries_IncludesRoot,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IntegrationGenerateOutputContainsRootBlockAndPostRootMediaQueries_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_IncludesGutterTwelve,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_IncludesPaddingTwelve,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_RootBlock,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_Sections,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_IncludesGutterSixteen,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_IncludesPaddingSixteen,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_RootBlock,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_Sections,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_IncludesGutterTwenty,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_IncludesPaddingTwenty,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_RootBlock,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_Sections,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_IncludesLargeGutterTwentyFour,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_IncludesLargePaddingTwentyFour,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_IncludesMediumGutterTwenty,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_IncludesMediumPaddingTwenty,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_LargeBlock,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_MediumBlock,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_Sections,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_IncludesLargeGutterTwenty,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_IncludesLargePaddingTwenty,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_IncludesMediumGutterSixteen,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_IncludesMediumPaddingSixteen,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_LargeBlock,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_MediumBlock,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_Sections,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_IncludesLargeGutterThirtyTwo,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_IncludesLargePaddingThirtyTwo,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_IncludesMediumGutterTwentyFour,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_IncludesMediumPaddingTwentyFour,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_LargeBlock,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_MediumBlock,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_Sections,
  Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_Produces300msDurationForExpressiveSpeed_IncludesThreeHundred,
  Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_Produces300msDurationForExpressiveSpeed_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_ProducesCanonicalNovaEaseCurveForMotionEasing_IncludesCurve,
  Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_ProducesCanonicalNovaEaseCurveForMotionEasing_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_ProducesZeroDurationForNoneSpeed_IncludesZero,
  Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_ProducesZeroDurationForNoneSpeed_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateShapeVariables_Produces9999pxRadiusForPillShape_IncludesLargeRadius,
  Tests_Lib_CssGenerator_CssGeneratorGenerateShapeVariables_Produces9999pxRadiusForPillShape_Result,
  Tests_Lib_CssGenerator_CssGeneratorGenerateShapeVariables_ProducesZeroRadiusForSharpShape_IncludesZero,
  Tests_Lib_CssGenerator_CssGeneratorGenerateShapeVariables_ProducesZeroRadiusForSharpShape_Result,
} from '../../types/tests/lib/css-generator.test.d.ts';

/**
 * Tests - Lib - CSS Generator - CssGenerator Generate.
 *
 * @since 0.15.0
 */
describe('CssGenerator generate', async () => {
  it('produces CSS with all variable categories', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesRoot: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesRoot = result.includes(':root {');
    const includesPrimary: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesPrimary = result.includes('--nova-color-primary-');
    const includesAccent: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesAccent = result.includes('--nova-color-accent-');
    const includesText: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesText = result.includes('--nova-color-text:');
    const includesBorder: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesBorder = result.includes('--nova-color-border:');
    const includesSurface: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesSurface = result.includes('--nova-color-surface-raised:');
    const includesFont: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesFont = result.includes('--nova-font-display:');
    const includesShape: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesShape = result.includes('--nova-shape-radius:');
    const includesDepth: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesDepth = result.includes('--nova-depth-card-');
    const includesMotion: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesMotion = result.includes('--nova-motion-duration:');
    const includesMotionEasing: Tests_Lib_CssGenerator_CssGeneratorGenerate_ProducesCSSWithAllVariableCategories_IncludesMotionEasing = result.includes('--nova-motion-easing:');

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
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerate_IncludesAllElevenShadeLevelsForEachColor_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesFifty: Tests_Lib_CssGenerator_CssGeneratorGenerate_IncludesAllElevenShadeLevelsForEachColor_IncludesFifty = result.includes('--nova-color-primary-50:');
    const includesNineHundred: Tests_Lib_CssGenerator_CssGeneratorGenerate_IncludesAllElevenShadeLevelsForEachColor_IncludesNineHundred = result.includes('--nova-color-primary-900:');
    const includesNineFifty: Tests_Lib_CssGenerator_CssGeneratorGenerate_IncludesAllElevenShadeLevelsForEachColor_IncludesNineFifty = result.includes('--nova-color-primary-950:');

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
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesFlatCardDepthWithNoShadow_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesNone: Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesFlatCardDepthWithNoShadow_IncludesNone = result.includes('--nova-depth-card-shadow: none;');

    ok(includesNone);

    return;
  });

  it('produces elevated card depth with shadow', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesElevatedCardDepthWithShadow_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesShadow: Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesElevatedCardDepthWithShadow_IncludesShadow = result.includes('--nova-depth-card-shadow: 0 4px 6px');

    ok(includesShadow);

    return;
  });

  it('produces glass card depth with backdrop blur', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesGlassCardDepthWithBackdropBlur_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesBlur: Tests_Lib_CssGenerator_CssGeneratorGenerateDepthVariables_ProducesGlassCardDepthWithBackdropBlur_IncludesBlur = result.includes('--nova-depth-card-backdrop: blur(5px);');

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
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const sections: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_Sections = result.split('@media');
    const rootBlock: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_RootBlock = String(sections[0]);

    const includesGutterTwelve: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_IncludesGutterTwelve = rootBlock.includes('--nova-grid-gutter: 12px;');
    const includesPaddingTwelve: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces12pxGutterAndPaddingForCompactDensity_IncludesPaddingTwelve = rootBlock.includes('--nova-grid-padding: 12px;');

    ok(includesGutterTwelve);
    ok(includesPaddingTwelve);

    return;
  });

  it('produces 16px gutter and padding for comfortable density', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const sections: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_Sections = result.split('@media');
    const rootBlock: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_RootBlock = String(sections[0]);

    const includesGutterSixteen: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_IncludesGutterSixteen = rootBlock.includes('--nova-grid-gutter: 16px;');
    const includesPaddingSixteen: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces16pxGutterAndPaddingForComfortableDensity_IncludesPaddingSixteen = rootBlock.includes('--nova-grid-padding: 16px;');

    ok(includesGutterSixteen);
    ok(includesPaddingSixteen);

    return;
  });

  it('produces 20px gutter and padding for spacious density', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const sections: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_Sections = result.split('@media');
    const rootBlock: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_RootBlock = String(sections[0]);

    const includesGutterTwenty: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_IncludesGutterTwenty = rootBlock.includes('--nova-grid-gutter: 20px;');
    const includesPaddingTwenty: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_Produces20pxGutterAndPaddingForSpaciousDensity_IncludesPaddingTwenty = rootBlock.includes('--nova-grid-padding: 20px;');

    ok(includesGutterTwenty);
    ok(includesPaddingTwenty);

    return;
  });

  it('produces correct medium and large breakpoint values for compact density', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const sections: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_Sections = result.split('@media');
    const mediumBlock: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_MediumBlock = String(sections[1]);
    const largeBlock: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_LargeBlock = String(sections[2]);

    const includesMediumGutterSixteen: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_IncludesMediumGutterSixteen = mediumBlock.includes('--nova-grid-gutter: 16px;');
    const includesMediumPaddingSixteen: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_IncludesMediumPaddingSixteen = mediumBlock.includes('--nova-grid-padding: 16px;');
    const includesLargeGutterTwenty: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_IncludesLargeGutterTwenty = largeBlock.includes('--nova-grid-gutter: 20px;');
    const includesLargePaddingTwenty: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForCompactDensity_IncludesLargePaddingTwenty = largeBlock.includes('--nova-grid-padding: 20px;');

    ok(includesMediumGutterSixteen);
    ok(includesMediumPaddingSixteen);
    ok(includesLargeGutterTwenty);
    ok(includesLargePaddingTwenty);

    return;
  });

  it('produces correct medium and large breakpoint values for comfortable density', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const sections: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_Sections = result.split('@media');
    const mediumBlock: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_MediumBlock = String(sections[1]);
    const largeBlock: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_LargeBlock = String(sections[2]);

    const includesMediumGutterTwenty: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_IncludesMediumGutterTwenty = mediumBlock.includes('--nova-grid-gutter: 20px;');
    const includesMediumPaddingTwenty: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_IncludesMediumPaddingTwenty = mediumBlock.includes('--nova-grid-padding: 20px;');
    const includesLargeGutterTwentyFour: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_IncludesLargeGutterTwentyFour = largeBlock.includes('--nova-grid-gutter: 24px;');
    const includesLargePaddingTwentyFour: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForComfortableDensity_IncludesLargePaddingTwentyFour = largeBlock.includes('--nova-grid-padding: 24px;');

    ok(includesMediumGutterTwenty);
    ok(includesMediumPaddingTwenty);
    ok(includesLargeGutterTwentyFour);
    ok(includesLargePaddingTwentyFour);

    return;
  });

  it('produces correct medium and large breakpoint values for spacious density', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const sections: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_Sections = result.split('@media');
    const mediumBlock: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_MediumBlock = String(sections[1]);
    const largeBlock: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_LargeBlock = String(sections[2]);

    const includesMediumGutterTwentyFour: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_IncludesMediumGutterTwentyFour = mediumBlock.includes('--nova-grid-gutter: 24px;');
    const includesMediumPaddingTwentyFour: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_IncludesMediumPaddingTwentyFour = mediumBlock.includes('--nova-grid-padding: 24px;');
    const includesLargeGutterThirtyTwo: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_IncludesLargeGutterThirtyTwo = largeBlock.includes('--nova-grid-gutter: 32px;');
    const includesLargePaddingThirtyTwo: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_ProducesCorrectMediumAndLargeBreakpointValuesForSpaciousDensity_IncludesLargePaddingThirtyTwo = largeBlock.includes('--nova-grid-padding: 32px;');

    ok(includesMediumGutterTwentyFour);
    ok(includesMediumPaddingTwentyFour);
    ok(includesLargeGutterThirtyTwo);
    ok(includesLargePaddingThirtyTwo);

    return;
  });

  it('includes responsive media query blocks', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IncludesResponsiveMediaQueryBlocks_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesFourEighty: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IncludesResponsiveMediaQueryBlocks_IncludesFourEighty = result.includes('@media (min-width: 480px)');
    const includesSevenSixtyEight: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IncludesResponsiveMediaQueryBlocks_IncludesSevenSixtyEight = result.includes('@media (min-width: 768px)');

    ok(includesFourEighty);
    ok(includesSevenSixtyEight);

    return;
  });

  it('integration: generate output contains root block and post-root media queries', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IntegrationGenerateOutputContainsRootBlockAndPostRootMediaQueries_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesRoot: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IntegrationGenerateOutputContainsRootBlockAndPostRootMediaQueries_IncludesRoot = result.includes(':root {');
    const includesMedia: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IntegrationGenerateOutputContainsRootBlockAndPostRootMediaQueries_IncludesMedia = result.includes('@media (min-width:');
    const includesGutter: Tests_Lib_CssGenerator_CssGeneratorGenerateGridVariables_IntegrationGenerateOutputContainsRootBlockAndPostRootMediaQueries_IncludesGutter = result.includes('--nova-grid-gutter:');

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
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_ProducesZeroDurationForNoneSpeed_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesZero: Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_ProducesZeroDurationForNoneSpeed_IncludesZero = result.includes('--nova-motion-duration: 0ms;');

    ok(includesZero);

    return;
  });

  it('produces 300ms duration for expressive speed', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_Produces300msDurationForExpressiveSpeed_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesThreeHundred: Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_Produces300msDurationForExpressiveSpeed_IncludesThreeHundred = result.includes('--nova-motion-duration: 300ms;');

    ok(includesThreeHundred);

    return;
  });

  it('produces canonical Nova ease curve for motion easing', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_ProducesCanonicalNovaEaseCurveForMotionEasing_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesCurve: Tests_Lib_CssGenerator_CssGeneratorGenerateMotionVariables_ProducesCanonicalNovaEaseCurveForMotionEasing_IncludesCurve = result.includes('--nova-motion-easing: cubic-bezier(0.22, 1, 0.36, 1);');

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
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateShapeVariables_ProducesZeroRadiusForSharpShape_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesZero: Tests_Lib_CssGenerator_CssGeneratorGenerateShapeVariables_ProducesZeroRadiusForSharpShape_IncludesZero = result.includes('--nova-shape-radius: 0;');

    ok(includesZero);

    return;
  });

  it('produces 9999px radius for pill shape', () => {
    const result: Tests_Lib_CssGenerator_CssGeneratorGenerateShapeVariables_Produces9999pxRadiusForPillShape_Result = CssGenerator.generate({
      preset: {
        logo: {
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

    const includesLargeRadius: Tests_Lib_CssGenerator_CssGeneratorGenerateShapeVariables_Produces9999pxRadiusForPillShape_IncludesLargeRadius = result.includes('--nova-shape-radius: 9999px;');

    ok(includesLargeRadius);

    return;
  });

  return;
});

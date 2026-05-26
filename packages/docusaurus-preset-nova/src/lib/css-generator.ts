import { Color } from './color.js';

import type {
  LibCssGeneratorGenerateAccentDarkColor,
  LibCssGeneratorGenerateAccentDarkLines,
  LibCssGeneratorGenerateAccentDarkScale,
  LibCssGeneratorGenerateAccentLightColor,
  LibCssGeneratorGenerateAccentLightLines,
  LibCssGeneratorGenerateAccentLightScale,
  LibCssGeneratorGenerateBorderDark,
  LibCssGeneratorGenerateBorderLight,
  LibCssGeneratorGenerateColorVariablesLines,
  LibCssGeneratorGenerateColorVariablesReturns,
  LibCssGeneratorGenerateColorVariablesScale,
  LibCssGeneratorGenerateColorVariablesScaleName,
  LibCssGeneratorGenerateColorVariablesShadeLevels,
  LibCssGeneratorGenerateDangerDark,
  LibCssGeneratorGenerateDangerLight,
  LibCssGeneratorGenerateDepthLines,
  LibCssGeneratorGenerateDepthVariablesDepth,
  LibCssGeneratorGenerateDepthVariablesLines,
  LibCssGeneratorGenerateDepthVariablesReturns,
  LibCssGeneratorGenerateFontLines,
  LibCssGeneratorGenerateFontVariablesFonts,
  LibCssGeneratorGenerateFontVariablesReturns,
  LibCssGeneratorGenerateGridLines,
  LibCssGeneratorGenerateGridMediaBlocks,
  LibCssGeneratorGenerateGridVariablesBaseLines,
  LibCssGeneratorGenerateGridVariablesDensityGutter,
  LibCssGeneratorGenerateGridVariablesDensityPadding,
  LibCssGeneratorGenerateGridVariablesMediaBlocks,
  LibCssGeneratorGenerateGridVariablesReturns,
  LibCssGeneratorGenerateGridVariablesShape,
  LibCssGeneratorGenerateLines,
  LibCssGeneratorGenerateMotionLines,
  LibCssGeneratorGenerateMotionVariablesDuration,
  LibCssGeneratorGenerateMotionVariablesHover,
  LibCssGeneratorGenerateMotionVariablesMotion,
  LibCssGeneratorGenerateMotionVariablesReturns,
  LibCssGeneratorGenerateMotionVariablesStaggered,
  LibCssGeneratorGenerateOptions,
  LibCssGeneratorGeneratePrimaryDarkColor,
  LibCssGeneratorGeneratePrimaryDarkLines,
  LibCssGeneratorGeneratePrimaryDarkScale,
  LibCssGeneratorGeneratePrimaryLightColor,
  LibCssGeneratorGeneratePrimaryLightLines,
  LibCssGeneratorGeneratePrimaryLightScale,
  LibCssGeneratorGenerateReturns,
  LibCssGeneratorGenerateShapeLines,
  LibCssGeneratorGenerateShapeVariablesDensityGapScale,
  LibCssGeneratorGenerateShapeVariablesDensityPaddingScale,
  LibCssGeneratorGenerateShapeVariablesRadiusValue,
  LibCssGeneratorGenerateShapeVariablesReturns,
  LibCssGeneratorGenerateShapeVariablesShape,
  LibCssGeneratorGenerateTextDark,
  LibCssGeneratorGenerateTextLight,
  LibCssGeneratorGenerateWarningDark,
  LibCssGeneratorGenerateWarningLight,
} from '../types/lib/css-generator.d.ts';

/**
 * Lib - CSS Generator.
 *
 * Transforms resolved preset configuration and color inputs into a
 * complete CSS custom properties block for injection into the
 * document head at build time.
 *
 * @since 0.15.0
 */
export class CssGenerator {
  /**
   * Lib - CSS Generator - Generate.
   *
   * Accepts a resolved preset with embedded color definitions, generates
   * shade scales for each color channel, then assembles all CSS
   * custom properties into a root-scoped style block.
   *
   * @param {LibCssGeneratorGenerateOptions} options - Options.
   *
   * @returns {LibCssGeneratorGenerateReturns}
   *
   * @since 0.15.0
   */
  public static generate(options: LibCssGeneratorGenerateOptions): LibCssGeneratorGenerateReturns {
    const primaryLightColor: LibCssGeneratorGeneratePrimaryLightColor = new Color(options['preset']['colors']['primary']['light']);
    const primaryDarkColor: LibCssGeneratorGeneratePrimaryDarkColor = new Color(options['preset']['colors']['primary']['dark']);
    const accentLightColor: LibCssGeneratorGenerateAccentLightColor = new Color(options['preset']['colors']['accent']['light']);
    const accentDarkColor: LibCssGeneratorGenerateAccentDarkColor = new Color(options['preset']['colors']['accent']['dark']);

    const primaryLightScale: LibCssGeneratorGeneratePrimaryLightScale = primaryLightColor.generateScale();
    const primaryDarkScale: LibCssGeneratorGeneratePrimaryDarkScale = primaryDarkColor.generateScale();
    const accentLightScale: LibCssGeneratorGenerateAccentLightScale = accentLightColor.generateScale();
    const accentDarkScale: LibCssGeneratorGenerateAccentDarkScale = accentDarkColor.generateScale();

    const primaryLightLines: LibCssGeneratorGeneratePrimaryLightLines = CssGenerator.generateColorVariables('primary', primaryLightScale);
    const primaryDarkLines: LibCssGeneratorGeneratePrimaryDarkLines = CssGenerator.generateColorVariables('primary', primaryDarkScale);
    const accentLightLines: LibCssGeneratorGenerateAccentLightLines = CssGenerator.generateColorVariables('accent', accentLightScale);
    const accentDarkLines: LibCssGeneratorGenerateAccentDarkLines = CssGenerator.generateColorVariables('accent', accentDarkScale);

    const textLight: LibCssGeneratorGenerateTextLight = options['preset']['colors']['text']['light'];
    const textDark: LibCssGeneratorGenerateTextDark = options['preset']['colors']['text']['dark'];
    const borderLight: LibCssGeneratorGenerateBorderLight = options['preset']['colors']['border']['light'];
    const borderDark: LibCssGeneratorGenerateBorderDark = options['preset']['colors']['border']['dark'];
    const warningLight: LibCssGeneratorGenerateWarningLight = options['preset']['colors']['warning']['light'];
    const warningDark: LibCssGeneratorGenerateWarningDark = options['preset']['colors']['warning']['dark'];
    const dangerLight: LibCssGeneratorGenerateDangerLight = options['preset']['colors']['danger']['light'];
    const dangerDark: LibCssGeneratorGenerateDangerDark = options['preset']['colors']['danger']['dark'];

    const fontLines: LibCssGeneratorGenerateFontLines = CssGenerator.generateFontVariables(options['preset']['fonts']);
    const shapeLines: LibCssGeneratorGenerateShapeLines = CssGenerator.generateShapeVariables(options['preset']['shape']);
    const depthLines: LibCssGeneratorGenerateDepthLines = CssGenerator.generateDepthVariables(options['preset']['depth']);
    const motionLines: LibCssGeneratorGenerateMotionLines = CssGenerator.generateMotionVariables(options['preset']['motion']);
    const gridLines: LibCssGeneratorGenerateGridLines = CssGenerator.generateGridVariables(options['preset']['shape']);

    const lines: LibCssGeneratorGenerateLines = [
      ':root {',
      ...primaryLightLines,
      ...accentLightLines,
      `  --nova-color-text: ${textLight};`,
      '  --nova-color-text-muted: color-mix(in srgb, var(--nova-color-text), var(--nova-color-background) 50%);',
      '  --nova-color-text-soft: color-mix(in srgb, var(--nova-color-text), var(--nova-color-background) 70%);',
      `  --nova-color-text-inverse: ${textDark};`,
      `  --nova-color-border: ${borderLight};`,
      '  --nova-color-border-subtle: color-mix(in srgb, var(--nova-color-border), var(--nova-color-background) 50%);',
      '  --nova-color-surface-raised: color-mix(in srgb, var(--nova-color-background), var(--nova-color-text) 4%);',
      `  --nova-color-warning-500: ${warningLight};`,
      '  --nova-color-warning-400: color-mix(in srgb, var(--nova-color-warning-500), var(--nova-color-background) 30%);',
      '  --nova-color-warning-bg: color-mix(in srgb, var(--nova-color-warning-500), transparent 94%);',
      `  --nova-color-danger-500: ${dangerLight};`,
      '  --nova-color-danger-400: color-mix(in srgb, var(--nova-color-danger-500), var(--nova-color-background) 30%);',
      '  --nova-color-danger-bg: color-mix(in srgb, var(--nova-color-danger-500), transparent 94%);',
      ...fontLines,
      ...shapeLines,
      ...depthLines,
      ...motionLines,
      ...gridLines['baseLines'],
      '}',
      '',
      ':root[data-theme="dark"] {',
      ...primaryDarkLines,
      ...accentDarkLines,
      `  --nova-color-text: ${textDark};`,
      `  --nova-color-border: ${borderDark};`,
      `  --nova-color-warning-500: ${warningDark};`,
      '  --nova-color-warning-bg: color-mix(in srgb, var(--nova-color-warning-500), transparent 90%);',
      `  --nova-color-danger-500: ${dangerDark};`,
      '  --nova-color-danger-bg: color-mix(in srgb, var(--nova-color-danger-500), transparent 90%);',
      '}',
    ];

    const gridMediaBlocks: LibCssGeneratorGenerateGridMediaBlocks = gridLines['mediaBlocks'].join('\n\n');

    return [
      lines.join('\n'),
      '',
      gridMediaBlocks,
    ].join('\n');
  }

  /**
   * Lib - CSS Generator - Generate Color Variables.
   *
   * Iterates over the eleven shade levels in a color scale and
   * produces one CSS custom property declaration per level using
   * the scale name as a namespace prefix.
   *
   * @param {LibCssGeneratorGenerateColorVariablesScaleName} scaleName - Scale name.
   * @param {LibCssGeneratorGenerateColorVariablesScale}     scale     - Scale.
   *
   * @private
   *
   * @returns {LibCssGeneratorGenerateColorVariablesReturns}
   *
   * @since 0.15.0
   */
  private static generateColorVariables(scaleName: LibCssGeneratorGenerateColorVariablesScaleName, scale: LibCssGeneratorGenerateColorVariablesScale): LibCssGeneratorGenerateColorVariablesReturns {
    const lines: LibCssGeneratorGenerateColorVariablesLines = [];

    const shadeLevels: LibCssGeneratorGenerateColorVariablesShadeLevels = [
      50,
      100,
      200,
      300,
      400,
      500,
      600,
      700,
      800,
      900,
      950,
    ];

    for (const level of shadeLevels) {
      lines.push(`  --nova-color-${scaleName}-${String(level)}: ${scale[level]};`);
    }

    return lines;
  }

  /**
   * Lib - CSS Generator - Generate Font Variables.
   *
   * Maps the three font family names from the preset into CSS
   * custom properties with appropriate fallback stacks for display,
   * body, and monospace usage.
   *
   * @param {LibCssGeneratorGenerateFontVariablesFonts} fonts - Fonts.
   *
   * @private
   *
   * @returns {LibCssGeneratorGenerateFontVariablesReturns}
   *
   * @since 0.15.0
   */
  private static generateFontVariables(fonts: LibCssGeneratorGenerateFontVariablesFonts): LibCssGeneratorGenerateFontVariablesReturns {
    return [
      `  --nova-font-display: '${fonts['display']}', sans-serif;`,
      `  --nova-font-body: '${fonts['body']}', sans-serif;`,
      `  --nova-font-code: '${fonts['code']}', monospace;`,
    ];
  }

  /**
   * Lib - CSS Generator - Generate Shape Variables.
   *
   * Converts the radius keyword into a concrete CSS length and the
   * density keyword into padding and gap scale values for consistent
   * component spacing.
   *
   * @param {LibCssGeneratorGenerateShapeVariablesShape} shape - Shape.
   *
   * @private
   *
   * @returns {LibCssGeneratorGenerateShapeVariablesReturns}
   *
   * @since 0.15.0
   */
  private static generateShapeVariables(shape: LibCssGeneratorGenerateShapeVariablesShape): LibCssGeneratorGenerateShapeVariablesReturns {
    let radiusValue: LibCssGeneratorGenerateShapeVariablesRadiusValue = '0.5rem';

    if (shape['radius'] === 'sharp') {
      radiusValue = '0';
    } else if (shape['radius'] === 'pill') {
      radiusValue = '9999px';
    }

    let densityPaddingScale: LibCssGeneratorGenerateShapeVariablesDensityPaddingScale = '1rem';

    if (shape['density'] === 'compact') {
      densityPaddingScale = '0.5rem';
    } else if (shape['density'] === 'spacious') {
      densityPaddingScale = '1.5rem';
    }

    let densityGapScale: LibCssGeneratorGenerateShapeVariablesDensityGapScale = '0.5rem';

    if (shape['density'] === 'compact') {
      densityGapScale = '0.25rem';
    } else if (shape['density'] === 'spacious') {
      densityGapScale = '1rem';
    }

    return [
      `  --nova-shape-radius: ${radiusValue};`,
      `  --nova-shape-padding: ${densityPaddingScale};`,
      `  --nova-shape-gap: ${densityGapScale};`,
    ];
  }

  /**
   * Lib - CSS Generator - Generate Depth Variables.
   *
   * Maps the card and code block depth keywords into shadow and border CSS custom properties
   * that control the visual elevation of surface elements.
   *
   * @param {LibCssGeneratorGenerateDepthVariablesDepth} depth - Depth.
   *
   * @private
   *
   * @returns {LibCssGeneratorGenerateDepthVariablesReturns}
   *
   * @since 0.15.0
   */
  private static generateDepthVariables(depth: LibCssGeneratorGenerateDepthVariablesDepth): LibCssGeneratorGenerateDepthVariablesReturns {
    const lines: LibCssGeneratorGenerateDepthVariablesLines = [];

    if (depth['cards'] === 'flat') {
      lines.push('  --nova-depth-card-shadow: none;');
      lines.push('  --nova-depth-card-border: 1px solid var(--nova-color-border);');
      lines.push('  --nova-depth-card-backdrop: none;');
    } else if (depth['cards'] === 'elevated') {
      lines.push('  --nova-depth-card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);');
      lines.push('  --nova-depth-card-border: none;');
      lines.push('  --nova-depth-card-backdrop: none;');
    } else {
      lines.push('  --nova-depth-card-shadow: 0 4px 30px rgb(0 0 0 / 0.1);');
      lines.push('  --nova-depth-card-border: 1px solid rgb(255 255 255 / 0.18);');
      lines.push('  --nova-depth-card-backdrop: blur(5px);');
    }

    if (depth['codeBlocks'] === 'flat') {
      lines.push('  --nova-depth-code-shadow: none;');
      lines.push('  --nova-depth-code-border: none;');
    } else if (depth['codeBlocks'] === 'bordered') {
      lines.push('  --nova-depth-code-shadow: none;');
      lines.push('  --nova-depth-code-border: 1px solid var(--nova-color-border);');
    } else {
      lines.push('  --nova-depth-code-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);');
      lines.push('  --nova-depth-code-border: none;');
    }

    return lines;
  }

  /**
   * Lib - CSS Generator - Generate Motion Variables.
   *
   * Converts the motion speed keyword into a transition duration, emits
   * the canonical Nova ease curve as a shared easing token, and maps the
   * boolean animation flags into numeric CSS custom properties.
   *
   * @param {LibCssGeneratorGenerateMotionVariablesMotion} motion - Motion.
   *
   * @private
   *
   * @returns {LibCssGeneratorGenerateMotionVariablesReturns}
   *
   * @since 0.15.0
   */
  private static generateMotionVariables(motion: LibCssGeneratorGenerateMotionVariablesMotion): LibCssGeneratorGenerateMotionVariablesReturns {
    let duration: LibCssGeneratorGenerateMotionVariablesDuration = '200ms';

    if (motion['speed'] === 'none') {
      duration = '0ms';
    } else if (motion['speed'] === 'subtle') {
      duration = '150ms';
    } else if (motion['speed'] === 'expressive') {
      duration = '300ms';
    }

    const staggered: LibCssGeneratorGenerateMotionVariablesStaggered = (motion['staggeredReveals'] === true) ? 1 : 0;
    const hover: LibCssGeneratorGenerateMotionVariablesHover = (motion['hoverEffects'] === true) ? 1 : 0;

    return [
      `  --nova-motion-duration: ${duration};`,
      '  --nova-motion-easing: cubic-bezier(0.22, 1, 0.36, 1);',
      `  --nova-motion-staggered-reveals: ${String(staggered)};`,
      `  --nova-motion-hover-effects: ${String(hover)};`,
    ];
  }

  /**
   * Lib - CSS Generator - Generate Grid Variables.
   *
   * Converts the density keyword into responsive gutter and
   * padding values with breakpoint-specific media query blocks
   * for consistent layout-level spacing.
   *
   * @param {LibCssGeneratorGenerateGridVariablesShape} shape - Shape.
   *
   * @private
   *
   * @returns {LibCssGeneratorGenerateGridVariablesReturns}
   *
   * @since 0.15.0
   */
  private static generateGridVariables(shape: LibCssGeneratorGenerateGridVariablesShape): LibCssGeneratorGenerateGridVariablesReturns {
    let densityGutter: LibCssGeneratorGenerateGridVariablesDensityGutter = '16px';
    let densityPadding: LibCssGeneratorGenerateGridVariablesDensityPadding = '16px';

    if (shape['density'] === 'compact') {
      densityGutter = '12px';
      densityPadding = '12px';
    } else if (shape['density'] === 'spacious') {
      densityGutter = '20px';
      densityPadding = '20px';
    }

    const baseLines: LibCssGeneratorGenerateGridVariablesBaseLines = [
      `  --nova-grid-gutter: ${densityGutter};`,
      `  --nova-grid-padding: ${densityPadding};`,
    ];

    let mediumGutter: LibCssGeneratorGenerateGridVariablesDensityGutter = '20px';
    let mediumPadding: LibCssGeneratorGenerateGridVariablesDensityPadding = '20px';

    if (shape['density'] === 'compact') {
      mediumGutter = '16px';
      mediumPadding = '16px';
    } else if (shape['density'] === 'spacious') {
      mediumGutter = '24px';
      mediumPadding = '24px';
    }

    let largeGutter: LibCssGeneratorGenerateGridVariablesDensityGutter = '24px';
    let largePadding: LibCssGeneratorGenerateGridVariablesDensityPadding = '24px';

    if (shape['density'] === 'compact') {
      largeGutter = '20px';
      largePadding = '20px';
    } else if (shape['density'] === 'spacious') {
      largeGutter = '32px';
      largePadding = '32px';
    }

    const mediaBlocks: LibCssGeneratorGenerateGridVariablesMediaBlocks = [
      [
        '@media (min-width: 480px) {',
        '  :root {',
        `    --nova-grid-gutter: ${mediumGutter};`,
        `    --nova-grid-padding: ${mediumPadding};`,
        '  }',
        '}',
      ].join('\n'),
      [
        '@media (min-width: 768px) {',
        '  :root {',
        `    --nova-grid-gutter: ${largeGutter};`,
        `    --nova-grid-padding: ${largePadding};`,
        '  }',
        '}',
      ].join('\n'),
    ];

    return {
      baseLines,
      mediaBlocks,
    };
  }
}

import { Color } from './color.js';

import type {
  LibCssGeneratorGenerateAccentColor,
  LibCssGeneratorGenerateAccentLines,
  LibCssGeneratorGenerateAccentScale,
  LibCssGeneratorGenerateColorVariablesLines,
  LibCssGeneratorGenerateColorVariablesReturns,
  LibCssGeneratorGenerateColorVariablesScale,
  LibCssGeneratorGenerateColorVariablesScaleName,
  LibCssGeneratorGenerateColorVariablesShadeLevels,
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
  LibCssGeneratorGenerateNeutralColor,
  LibCssGeneratorGenerateNeutralLines,
  LibCssGeneratorGenerateNeutralScale,
  LibCssGeneratorGenerateOptions,
  LibCssGeneratorGeneratePrimaryColor,
  LibCssGeneratorGeneratePrimaryLines,
  LibCssGeneratorGeneratePrimaryScale,
  LibCssGeneratorGenerateReturns,
  LibCssGeneratorGenerateShapeLines,
  LibCssGeneratorGenerateShapeVariablesDensityGapScale,
  LibCssGeneratorGenerateShapeVariablesDensityPaddingScale,
  LibCssGeneratorGenerateShapeVariablesRadiusValue,
  LibCssGeneratorGenerateShapeVariablesReturns,
  LibCssGeneratorGenerateShapeVariablesShape,
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
    const primaryColor: LibCssGeneratorGeneratePrimaryColor = new Color(options['preset']['colors']['primary']);
    const accentColor: LibCssGeneratorGenerateAccentColor = new Color(options['preset']['colors']['accent']);
    const neutralColor: LibCssGeneratorGenerateNeutralColor = new Color(options['preset']['colors']['neutral']);

    const primaryScale: LibCssGeneratorGeneratePrimaryScale = primaryColor.generateScale();
    const accentScale: LibCssGeneratorGenerateAccentScale = accentColor.generateScale();
    const neutralScale: LibCssGeneratorGenerateNeutralScale = neutralColor.generateScale();

    const primaryLines: LibCssGeneratorGeneratePrimaryLines = CssGenerator.generateColorVariables('primary', primaryScale);
    const accentLines: LibCssGeneratorGenerateAccentLines = CssGenerator.generateColorVariables('accent', accentScale);
    const neutralLines: LibCssGeneratorGenerateNeutralLines = CssGenerator.generateColorVariables('neutral', neutralScale);

    const fontLines: LibCssGeneratorGenerateFontLines = CssGenerator.generateFontVariables(options['preset']['fonts']);
    const shapeLines: LibCssGeneratorGenerateShapeLines = CssGenerator.generateShapeVariables(options['preset']['shape']);
    const depthLines: LibCssGeneratorGenerateDepthLines = CssGenerator.generateDepthVariables(options['preset']['depth']);
    const motionLines: LibCssGeneratorGenerateMotionLines = CssGenerator.generateMotionVariables(options['preset']['motion']);
    const gridLines: LibCssGeneratorGenerateGridLines = CssGenerator.generateGridVariables(options['preset']['shape']);

    const lines: LibCssGeneratorGenerateLines = [
      ':root {',
      ...primaryLines,
      ...accentLines,
      ...neutralLines,
      ...fontLines,
      ...shapeLines,
      ...depthLines,
      ...motionLines,
      ...gridLines['baseLines'],
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
      lines.push('  --nova-depth-card-border: 1px solid var(--nova-color-neutral-200);');
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
      lines.push('  --nova-depth-code-border: 1px solid var(--nova-color-neutral-200);');
    } else {
      lines.push('  --nova-depth-code-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);');
      lines.push('  --nova-depth-code-border: none;');
    }

    return lines;
  }

  /**
   * Lib - CSS Generator - Generate Motion Variables.
   *
   * Converts the motion speed keyword into a transition duration
   * and maps the boolean animation flags into numeric CSS custom
   * properties for conditional animation logic.
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

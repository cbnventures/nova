import { Runner as LibColor } from './color.js';

import type {
  Lib_CssGenerator_Runner_Generate_AccentDarkColor,
  Lib_CssGenerator_Runner_Generate_AccentDarkLines,
  Lib_CssGenerator_Runner_Generate_AccentDarkScale,
  Lib_CssGenerator_Runner_Generate_AccentLightColor,
  Lib_CssGenerator_Runner_Generate_AccentLightLines,
  Lib_CssGenerator_Runner_Generate_AccentLightScale,
  Lib_CssGenerator_Runner_Generate_BorderDark,
  Lib_CssGenerator_Runner_Generate_BorderLight,
  Lib_CssGenerator_Runner_GenerateColorVariables_Lines,
  Lib_CssGenerator_Runner_GenerateColorVariables_Returns,
  Lib_CssGenerator_Runner_GenerateColorVariables_Scale,
  Lib_CssGenerator_Runner_GenerateColorVariables_ScaleName,
  Lib_CssGenerator_Runner_GenerateColorVariables_ShadeLevels,
  Lib_CssGenerator_Runner_Generate_DangerDark,
  Lib_CssGenerator_Runner_Generate_DangerLight,
  Lib_CssGenerator_Runner_Generate_DepthLines,
  Lib_CssGenerator_Runner_GenerateDepthVariables_Depth,
  Lib_CssGenerator_Runner_GenerateDepthVariables_Lines,
  Lib_CssGenerator_Runner_GenerateDepthVariables_Returns,
  Lib_CssGenerator_Runner_Generate_FontLines,
  Lib_CssGenerator_Runner_GenerateFontVariables_Fonts,
  Lib_CssGenerator_Runner_GenerateFontVariables_Returns,
  Lib_CssGenerator_Runner_Generate_GridLines,
  Lib_CssGenerator_Runner_Generate_GridMediaBlocks,
  Lib_CssGenerator_Runner_GenerateGridVariables_BaseLines,
  Lib_CssGenerator_Runner_GenerateGridVariables_DensityGutter,
  Lib_CssGenerator_Runner_GenerateGridVariables_DensityPadding,
  Lib_CssGenerator_Runner_GenerateGridVariables_MediaBlocks,
  Lib_CssGenerator_Runner_GenerateGridVariables_Returns,
  Lib_CssGenerator_Runner_GenerateGridVariables_Shape,
  Lib_CssGenerator_Runner_Generate_Lines,
  Lib_CssGenerator_Runner_Generate_MotionLines,
  Lib_CssGenerator_Runner_GenerateMotionVariables_Duration,
  Lib_CssGenerator_Runner_GenerateMotionVariables_Hover,
  Lib_CssGenerator_Runner_GenerateMotionVariables_Motion,
  Lib_CssGenerator_Runner_GenerateMotionVariables_Returns,
  Lib_CssGenerator_Runner_GenerateMotionVariables_Staggered,
  Lib_CssGenerator_Runner_Generate_Options,
  Lib_CssGenerator_Runner_Generate_PrimaryDarkColor,
  Lib_CssGenerator_Runner_Generate_PrimaryDarkLines,
  Lib_CssGenerator_Runner_Generate_PrimaryDarkScale,
  Lib_CssGenerator_Runner_Generate_PrimaryLightColor,
  Lib_CssGenerator_Runner_Generate_PrimaryLightLines,
  Lib_CssGenerator_Runner_Generate_PrimaryLightScale,
  Lib_CssGenerator_Runner_Generate_Returns,
  Lib_CssGenerator_Runner_Generate_ShapeLines,
  Lib_CssGenerator_Runner_GenerateShapeVariables_DensityGapScale,
  Lib_CssGenerator_Runner_GenerateShapeVariables_DensityPaddingScale,
  Lib_CssGenerator_Runner_GenerateShapeVariables_RadiusValue,
  Lib_CssGenerator_Runner_GenerateShapeVariables_Returns,
  Lib_CssGenerator_Runner_GenerateShapeVariables_Shape,
  Lib_CssGenerator_Runner_Generate_TextDark,
  Lib_CssGenerator_Runner_Generate_TextLight,
  Lib_CssGenerator_Runner_Generate_WarningDark,
  Lib_CssGenerator_Runner_Generate_WarningLight,
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
export class Runner {
  /**
   * Lib - CSS Generator - Generate.
   *
   * Accepts a resolved preset with embedded color definitions, generates
   * shade scales for each color channel, then assembles all CSS
   * custom properties into a root-scoped style block.
   *
   * @param {Lib_CssGenerator_Runner_Generate_Options} options - Options.
   *
   * @returns {Lib_CssGenerator_Runner_Generate_Returns}
   *
   * @since 0.15.0
   */
  public static generate(options: Lib_CssGenerator_Runner_Generate_Options): Lib_CssGenerator_Runner_Generate_Returns {
    const primaryLightColor: Lib_CssGenerator_Runner_Generate_PrimaryLightColor = new LibColor(options['preset']['colors']['primary']['light']);
    const primaryDarkColor: Lib_CssGenerator_Runner_Generate_PrimaryDarkColor = new LibColor(options['preset']['colors']['primary']['dark']);
    const accentLightColor: Lib_CssGenerator_Runner_Generate_AccentLightColor = new LibColor(options['preset']['colors']['accent']['light']);
    const accentDarkColor: Lib_CssGenerator_Runner_Generate_AccentDarkColor = new LibColor(options['preset']['colors']['accent']['dark']);

    const primaryLightScale: Lib_CssGenerator_Runner_Generate_PrimaryLightScale = primaryLightColor.generateScale();
    const primaryDarkScale: Lib_CssGenerator_Runner_Generate_PrimaryDarkScale = primaryDarkColor.generateScale();
    const accentLightScale: Lib_CssGenerator_Runner_Generate_AccentLightScale = accentLightColor.generateScale();
    const accentDarkScale: Lib_CssGenerator_Runner_Generate_AccentDarkScale = accentDarkColor.generateScale();

    const primaryLightLines: Lib_CssGenerator_Runner_Generate_PrimaryLightLines = Runner.generateColorVariables('primary', primaryLightScale);
    const primaryDarkLines: Lib_CssGenerator_Runner_Generate_PrimaryDarkLines = Runner.generateColorVariables('primary', primaryDarkScale);
    const accentLightLines: Lib_CssGenerator_Runner_Generate_AccentLightLines = Runner.generateColorVariables('accent', accentLightScale);
    const accentDarkLines: Lib_CssGenerator_Runner_Generate_AccentDarkLines = Runner.generateColorVariables('accent', accentDarkScale);

    const textLight: Lib_CssGenerator_Runner_Generate_TextLight = options['preset']['colors']['text']['light'];
    const textDark: Lib_CssGenerator_Runner_Generate_TextDark = options['preset']['colors']['text']['dark'];
    const borderLight: Lib_CssGenerator_Runner_Generate_BorderLight = options['preset']['colors']['border']['light'];
    const borderDark: Lib_CssGenerator_Runner_Generate_BorderDark = options['preset']['colors']['border']['dark'];
    const warningLight: Lib_CssGenerator_Runner_Generate_WarningLight = options['preset']['colors']['warning']['light'];
    const warningDark: Lib_CssGenerator_Runner_Generate_WarningDark = options['preset']['colors']['warning']['dark'];
    const dangerLight: Lib_CssGenerator_Runner_Generate_DangerLight = options['preset']['colors']['danger']['light'];
    const dangerDark: Lib_CssGenerator_Runner_Generate_DangerDark = options['preset']['colors']['danger']['dark'];

    const fontLines: Lib_CssGenerator_Runner_Generate_FontLines = Runner.generateFontVariables(options['preset']['fonts']);
    const shapeLines: Lib_CssGenerator_Runner_Generate_ShapeLines = Runner.generateShapeVariables(options['preset']['shape']);
    const depthLines: Lib_CssGenerator_Runner_Generate_DepthLines = Runner.generateDepthVariables(options['preset']['depth']);
    const motionLines: Lib_CssGenerator_Runner_Generate_MotionLines = Runner.generateMotionVariables(options['preset']['motion']);
    const gridLines: Lib_CssGenerator_Runner_Generate_GridLines = Runner.generateGridVariables(options['preset']['shape']);

    const lines: Lib_CssGenerator_Runner_Generate_Lines = [
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

    const gridMediaBlocks: Lib_CssGenerator_Runner_Generate_GridMediaBlocks = gridLines['mediaBlocks'].join('\n\n');

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
   * @param {Lib_CssGenerator_Runner_GenerateColorVariables_ScaleName} scaleName - Scale name.
   * @param {Lib_CssGenerator_Runner_GenerateColorVariables_Scale}     scale     - Scale.
   *
   * @private
   *
   * @returns {Lib_CssGenerator_Runner_GenerateColorVariables_Returns}
   *
   * @since 0.15.0
   */
  private static generateColorVariables(scaleName: Lib_CssGenerator_Runner_GenerateColorVariables_ScaleName, scale: Lib_CssGenerator_Runner_GenerateColorVariables_Scale): Lib_CssGenerator_Runner_GenerateColorVariables_Returns {
    const lines: Lib_CssGenerator_Runner_GenerateColorVariables_Lines = [];

    const shadeLevels: Lib_CssGenerator_Runner_GenerateColorVariables_ShadeLevels = [
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
   * @param {Lib_CssGenerator_Runner_GenerateFontVariables_Fonts} fonts - Fonts.
   *
   * @private
   *
   * @returns {Lib_CssGenerator_Runner_GenerateFontVariables_Returns}
   *
   * @since 0.15.0
   */
  private static generateFontVariables(fonts: Lib_CssGenerator_Runner_GenerateFontVariables_Fonts): Lib_CssGenerator_Runner_GenerateFontVariables_Returns {
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
   * @param {Lib_CssGenerator_Runner_GenerateShapeVariables_Shape} shape - Shape.
   *
   * @private
   *
   * @returns {Lib_CssGenerator_Runner_GenerateShapeVariables_Returns}
   *
   * @since 0.15.0
   */
  private static generateShapeVariables(shape: Lib_CssGenerator_Runner_GenerateShapeVariables_Shape): Lib_CssGenerator_Runner_GenerateShapeVariables_Returns {
    let radiusValue: Lib_CssGenerator_Runner_GenerateShapeVariables_RadiusValue = '0.5rem';

    if (shape['radius'] === 'sharp') {
      radiusValue = '0';
    } else if (shape['radius'] === 'pill') {
      radiusValue = '9999px';
    }

    let densityPaddingScale: Lib_CssGenerator_Runner_GenerateShapeVariables_DensityPaddingScale = '1rem';

    if (shape['density'] === 'compact') {
      densityPaddingScale = '0.5rem';
    } else if (shape['density'] === 'spacious') {
      densityPaddingScale = '1.5rem';
    }

    let densityGapScale: Lib_CssGenerator_Runner_GenerateShapeVariables_DensityGapScale = '0.5rem';

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
   * @param {Lib_CssGenerator_Runner_GenerateDepthVariables_Depth} depth - Depth.
   *
   * @private
   *
   * @returns {Lib_CssGenerator_Runner_GenerateDepthVariables_Returns}
   *
   * @since 0.15.0
   */
  private static generateDepthVariables(depth: Lib_CssGenerator_Runner_GenerateDepthVariables_Depth): Lib_CssGenerator_Runner_GenerateDepthVariables_Returns {
    const lines: Lib_CssGenerator_Runner_GenerateDepthVariables_Lines = [];

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
   * @param {Lib_CssGenerator_Runner_GenerateMotionVariables_Motion} motion - Motion.
   *
   * @private
   *
   * @returns {Lib_CssGenerator_Runner_GenerateMotionVariables_Returns}
   *
   * @since 0.15.0
   */
  private static generateMotionVariables(motion: Lib_CssGenerator_Runner_GenerateMotionVariables_Motion): Lib_CssGenerator_Runner_GenerateMotionVariables_Returns {
    let duration: Lib_CssGenerator_Runner_GenerateMotionVariables_Duration = '200ms';

    if (motion['speed'] === 'none') {
      duration = '0ms';
    } else if (motion['speed'] === 'subtle') {
      duration = '150ms';
    } else if (motion['speed'] === 'expressive') {
      duration = '300ms';
    }

    const staggered: Lib_CssGenerator_Runner_GenerateMotionVariables_Staggered = (motion['staggeredReveals'] === true) ? 1 : 0;
    const hover: Lib_CssGenerator_Runner_GenerateMotionVariables_Hover = (motion['hoverEffects'] === true) ? 1 : 0;

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
   * @param {Lib_CssGenerator_Runner_GenerateGridVariables_Shape} shape - Shape.
   *
   * @private
   *
   * @returns {Lib_CssGenerator_Runner_GenerateGridVariables_Returns}
   *
   * @since 0.15.0
   */
  private static generateGridVariables(shape: Lib_CssGenerator_Runner_GenerateGridVariables_Shape): Lib_CssGenerator_Runner_GenerateGridVariables_Returns {
    let densityGutter: Lib_CssGenerator_Runner_GenerateGridVariables_DensityGutter = '16px';
    let densityPadding: Lib_CssGenerator_Runner_GenerateGridVariables_DensityPadding = '16px';

    if (shape['density'] === 'compact') {
      densityGutter = '12px';
      densityPadding = '12px';
    } else if (shape['density'] === 'spacious') {
      densityGutter = '20px';
      densityPadding = '20px';
    }

    const baseLines: Lib_CssGenerator_Runner_GenerateGridVariables_BaseLines = [
      `  --nova-grid-gutter: ${densityGutter};`,
      `  --nova-grid-padding: ${densityPadding};`,
    ];

    let mediumGutter: Lib_CssGenerator_Runner_GenerateGridVariables_DensityGutter = '20px';
    let mediumPadding: Lib_CssGenerator_Runner_GenerateGridVariables_DensityPadding = '20px';

    if (shape['density'] === 'compact') {
      mediumGutter = '16px';
      mediumPadding = '16px';
    } else if (shape['density'] === 'spacious') {
      mediumGutter = '24px';
      mediumPadding = '24px';
    }

    let largeGutter: Lib_CssGenerator_Runner_GenerateGridVariables_DensityGutter = '24px';
    let largePadding: Lib_CssGenerator_Runner_GenerateGridVariables_DensityPadding = '24px';

    if (shape['density'] === 'compact') {
      largeGutter = '20px';
      largePadding = '20px';
    } else if (shape['density'] === 'spacious') {
      largeGutter = '32px';
      largePadding = '32px';
    }

    const mediaBlocks: Lib_CssGenerator_Runner_GenerateGridVariables_MediaBlocks = [
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

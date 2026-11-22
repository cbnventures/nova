import { strictEqual } from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import { LIB_REGEX_CSS_BLOCK_COMMENT, LIB_REGEX_WHITESPACE_RUN } from '../../../../lib/regex.js';
import { presetsIndexNames } from '../../../../presets/index.js';

import type {
  Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_BeforeOpen,
  Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Chunk,
  Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_CommentPattern,
  Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Css,
  Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_OpenIndex,
  Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Returns,
  Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Rules,
  Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Selector,
  Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_StrippedCss,
  Tests_Theme_Navbar_Shared_OverflowMeasure_GetPackageRoot_CurrentFileDirectory,
  Tests_Theme_Navbar_Shared_OverflowMeasure_GetPackageRoot_CurrentFilePath,
  Tests_Theme_Navbar_Shared_OverflowMeasure_GetPackageRoot_Returns,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_BaseCss,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_BaseCssPath,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ColonIndex,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Declaration,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Declarations,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ItemsClass,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ItemsToken,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ItemsTokenIndex,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PackageRoot,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PresetCss,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PresetCssPath,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PresetName,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PreviousToken,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PropertyName,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PropertyValue,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Rule,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Rules,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Selector,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_SelectorTokens,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_SizingPrefixes,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Sources,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ValueTokens,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_VariantName,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_VariantNames,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_VariantSource,
  Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_VariantSourcePath,
} from '../../../../types/tests/theme/Navbar/shared/overflow-measure.test.d.ts';

/**
 * Tests - Theme - Navbar - Shared - Overflow Measure - Collect Rules.
 *
 * Splits a stylesheet into selector and declaration pairs, unwrapping
 * at-rule wrappers such as media queries so their inner rules are kept.
 *
 * @param {Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Css} css - Css.
 *
 * @returns {Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Returns}
 *
 * @since 0.50.0
 */
function collectRules(css: Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Css): Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Returns {
  const commentPattern: Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_CommentPattern = new RegExp(LIB_REGEX_CSS_BLOCK_COMMENT.source, 'g');
  const strippedCss: Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_StrippedCss = css.replace(commentPattern, '');
  const rules: Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Rules = [];

  for (const chunkEntry of strippedCss.split('}')) {
    const chunk: Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Chunk = chunkEntry;
    const openIndex: Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_OpenIndex = chunk.lastIndexOf('{');

    if (openIndex === -1) {
      continue;
    }

    const beforeOpen: Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_BeforeOpen = chunk.slice(0, openIndex);
    const selector: Tests_Theme_Navbar_Shared_OverflowMeasure_CollectRules_Selector = beforeOpen.slice(beforeOpen.lastIndexOf('{') + 1).trim();

    rules.push({
      selector,
      declarations: chunk.slice(openIndex + 1),
    });
  }

  return rules;
}

/**
 * Tests - Theme - Navbar - Shared - Overflow Measure - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the
 * current test file location.
 *
 * @returns {Tests_Theme_Navbar_Shared_OverflowMeasure_GetPackageRoot_Returns}
 *
 * @since 0.50.0
 */
function getPackageRoot(): Tests_Theme_Navbar_Shared_OverflowMeasure_GetPackageRoot_Returns {
  const currentFilePath: Tests_Theme_Navbar_Shared_OverflowMeasure_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_Theme_Navbar_Shared_OverflowMeasure_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..', '..', '..', '..');
}

/**
 * Tests - Theme - Navbar - Shared - Overflow Measure - Overflow Measure Across Presets And Variants.
 *
 * Walks every preset with every navbar variant that overflows into More. The
 * hidden measuring copy must pick up every rule that sizes the visible items,
 * and the visible items cluster must stay free to shrink below its content.
 *
 * @since 0.50.0
 */
describe('Overflow measure across presets and variants', async () => {
  const packageRoot: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PackageRoot = getPackageRoot();
  const variantNames: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_VariantNames = [
    'Bridge',
    'Canopy',
    'Compass',
  ];
  const sizingPrefixes: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_SizingPrefixes = [
    'border-width',
    'column-gap',
    'font',
    'gap',
    'letter-spacing',
    'margin',
    'max-width',
    'min-width',
    'padding',
    'text-transform',
    'white-space',
    'width',
    'word-spacing',
  ];

  for (const presetNameEntry of presetsIndexNames) {
    for (const variantNameEntry of variantNames) {
      const presetName: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PresetName = presetNameEntry;
      const variantName: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_VariantName = variantNameEntry;

      it(`'${presetName}' preset with the '${variantName}' navbar measures items the way it shows them`, async () => {
        const itemsClass: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ItemsClass = `nova-navbar-${variantName.toLowerCase()}-items`;
        const variantSourcePath: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_VariantSourcePath = resolve(packageRoot, 'src', 'theme', 'Navbar', variantName, 'index.tsx');
        const baseCssPath: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_BaseCssPath = resolve(packageRoot, 'src', 'styles', 'theme', 'Navbar', variantName, 'style.css');
        const presetCssPath: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PresetCssPath = resolve(packageRoot, 'src', 'styles', 'presets', presetName, 'theme', 'Navbar', variantName, 'style.css');
        const sources: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Sources = await Promise.all([
          readFile(variantSourcePath, 'utf-8'),
          readFile(baseCssPath, 'utf-8'),
          readFile(presetCssPath, 'utf-8'),
        ]);
        const variantSource: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_VariantSource = sources[0];
        const baseCss: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_BaseCss = sources[1];
        const presetCss: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PresetCss = sources[2];
        const rules: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Rules = [
          ...collectRules(baseCss),
          ...collectRules(presetCss),
        ];

        // The measuring copy and the visible cluster share the items class.
        strictEqual(variantSource.includes(`className="${itemsClass} nova-navbar-items-measure"`), true, `Expected the '${variantName}' measuring copy to carry '${itemsClass}'.`);
        strictEqual(variantSource.includes(`'${itemsClass}'`), true, `Expected the '${variantName}' visible cluster to carry '${itemsClass}'.`);

        for (const ruleEntry of rules) {
          const rule: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Rule = ruleEntry;
          const declarations: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Declarations = rule['declarations'].split(';');

          for (const selectorEntry of rule['selector'].split(',')) {
            const selector: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Selector = selectorEntry.replaceAll('>', ' > ').trim();
            const selectorTokens: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_SelectorTokens = selector.split(LIB_REGEX_WHITESPACE_RUN);
            const itemsTokenIndex: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ItemsTokenIndex = selectorTokens.findIndex((selectorToken) => selectorToken.includes(itemsClass));

            if (itemsTokenIndex === -1) {
              continue;
            }

            const itemsToken: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ItemsToken = selectorTokens[itemsTokenIndex];
            const previousToken: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PreviousToken = selectorTokens[itemsTokenIndex - 1];

            for (const declarationEntry of declarations) {
              const declaration: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_Declaration = declarationEntry;
              const colonIndex: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ColonIndex = declaration.indexOf(':');

              if (colonIndex === -1) {
                continue;
              }

              const propertyName: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PropertyName = declaration.slice(0, colonIndex).trim();
              const propertyValue: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_PropertyValue = declaration.slice(colonIndex + 1).trim();
              const valueTokens: Tests_Theme_Navbar_Shared_OverflowMeasure_OverflowMeasureAcrossPresetsAndVariants_ValueTokens = propertyValue.split(LIB_REGEX_WHITESPACE_RUN);

              // Sizing rules reach the measuring copy only through the bare shared class.
              if (sizingPrefixes.some((sizingPrefix) => propertyName.startsWith(sizingPrefix)) === true) {
                strictEqual(itemsToken, `.${itemsClass}`, `Expected '${selectorEntry.trim()}' in '${presetName}' to size items through the bare '.${itemsClass}' class the measuring copy shares.`);
                strictEqual(previousToken === '>', false, `Expected '${selectorEntry.trim()}' in '${presetName}' not to tie '.${itemsClass}' to a parent the measuring copy lacks.`);
              }

              // The visible cluster itself must be able to shrink so overflow is detected.
              if (itemsTokenIndex !== selectorTokens.length - 1) {
                continue;
              }

              if (propertyName === 'flex') {
                strictEqual(
                  (
                    valueTokens[0] !== 'none'
                    && valueTokens[1] !== '0'
                  ),
                  true,
                  `Expected '${presetName}' not to stop '.${itemsClass}' from shrinking with 'flex: ${propertyValue}'.`,
                );
              }

              if (propertyName === 'flex-shrink') {
                strictEqual(valueTokens[0] !== '0', true, `Expected '${presetName}' not to stop '.${itemsClass}' from shrinking with 'flex-shrink: ${propertyValue}'.`);
              }

              if (propertyName === 'min-width') {
                strictEqual(valueTokens[0], '0', `Expected '${presetName}' to keep '.${itemsClass}' at 'min-width: 0'.`);
              }

              if (
                propertyName === 'width'
                || propertyName === 'flex-basis'
              ) {
                strictEqual(propertyValue.includes('content'), false, `Expected '${presetName}' not to size '.${itemsClass}' to its content with '${propertyName}: ${propertyValue}'.`);
              }
            }
          }
        }

        return;
      });
    }
  }

  return;
});

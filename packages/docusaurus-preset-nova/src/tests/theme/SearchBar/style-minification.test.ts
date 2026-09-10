import { deepStrictEqual, strictEqual } from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { describe, it } from 'vitest';

import type {
  Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_CurrentDirectory,
  Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_CurrentFilePath,
  Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_Errors,
  Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_KeepsMountingRule,
  Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_Result,
  Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_StylePath,
  Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_StyleSource,
  Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_Warnings,
} from '../../../types/tests/theme/SearchBar/style-minification.test.d.ts';

/**
 * Tests - Theme - Search Bar - Style Minification - SearchBar Styles.
 *
 * Exercises the shared SearchBar stylesheet with the production CleanCSS
 * settings so unsupported syntax cannot silently return to the preset.
 *
 * @since 0.26.0
 */
describe('SearchBar styles', () => {
  it('minifies without production warnings', async () => {
    const currentFilePath: Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_CurrentFilePath = fileURLToPath(import.meta.url);
    const currentDirectory: Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_CurrentDirectory = dirname(currentFilePath);
    const stylePath: Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_StylePath = resolve(currentDirectory, '../../../styles/theme/SearchBar/style.css');
    const styleSource: Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_StyleSource = readFileSync(stylePath, 'utf-8');
    const result: Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_Result = await CssMinimizerPlugin.cleanCssMinify(
      { 'style.css': styleSource },
      undefined,
      {
        inline: false,
        level: {
          1: {
            all: false,
            removeWhitespace: true,
          },
          2: {
            all: true,
            removeUnusedAtRules: false,
            restructureRules: true,
          },
        },
      },
    );
    const warnings: Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_Warnings = result.warnings ?? [];
    const errors: Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_Errors = result.errors ?? [];
    const keepsMountingRule: Tests_Theme_SearchBar_StyleMinification_SearchBarStyles_MinifiesWithoutProductionWarnings_KeepsMountingRule = result.code.includes('.nova-search-dropdown-mounting{visibility:hidden!important;max-height:0!important}');

    deepStrictEqual(warnings, []);
    deepStrictEqual(errors, []);
    strictEqual(keepsMountingRule, true);

    return;
  });

  return;
});

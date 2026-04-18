import { ESLintUtils } from '@typescript-eslint/utils';

import { LIB_REGEX_PATTERN_CAMEL_CASE_BOUNDARY } from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintJsdocRequireJsdocParamNameCheckProgramAllComments,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramContext,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramDescription,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramExpected,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramFinalFixedValue,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramFixedValue,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramLines,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramMatch,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramMismatches,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramParamName,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramRawDescription,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramReturns,
  RulesEslintJsdocRequireJsdocParamNameCheckProgramWords,
  RulesEslintJsdocRequireJsdocParamNameRuleDefaultOptionsIgnoreFiles,
  RulesEslintJsdocRequireJsdocParamNameRuleOptions,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-param-name.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Name.
 *
 * Enforces that every @param description is the capitalized, space-separated form of the
 * parameter name followed by a period, ensuring consistency.
 *
 * @since 0.15.0
 */
export class RulesEslintJsdocRequireJsdocParamName {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Param Name - Param Pattern.
   *
   * Matches @param lines that include an optional type in braces, the
   * parameter name, a dash separator, and the description text to validate.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #paramPattern = new RegExp('@param\\s+(?:\\{[^}]*\\}\\s+)?(\\w+)\\s+-\\s+(.+)');

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Param Name - Rule.
   *
   * Exported through the ESLint plugin index and activated in
   * eslint.config.ts. Provides auto-fix to rewrite mismatched @param descriptions.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-param-name',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require @param descriptions to match the parameter name.',
      },
      fixable: 'code',
      messages: {
        paramDescriptionMismatch: 'The @param description for \'{{ paramName }}\' must be \'{{ expected }}\'.',
      },
      schema: [{
        type: 'object',
        properties: {
          ignoreFiles: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      ignoreFiles: [] as RulesEslintJsdocRequireJsdocParamNameRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintJsdocRequireJsdocParamNameRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program() {
          RulesEslintJsdocRequireJsdocParamName.checkProgram(context);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Param Name - Check Program.
   *
   * Iterates all block comments in the file and extracts param
   * tag lines via the regex pattern, reporting mismatches against the parameter name.
   *
   * @private
   *
   * @param {RulesEslintJsdocRequireJsdocParamNameCheckProgramContext} context - Context.
   *
   * @returns {RulesEslintJsdocRequireJsdocParamNameCheckProgramReturns}
   *
   * @since 0.15.0
   */
  private static checkProgram(context: RulesEslintJsdocRequireJsdocParamNameCheckProgramContext): RulesEslintJsdocRequireJsdocParamNameCheckProgramReturns {
    const allComments: RulesEslintJsdocRequireJsdocParamNameCheckProgramAllComments = context.sourceCode.getAllComments();

    for (const comment of allComments) {
      if (comment.type !== 'Block') {
        continue;
      }

      if (comment.value.startsWith('*') === false) {
        continue;
      }

      const lines: RulesEslintJsdocRequireJsdocParamNameCheckProgramLines = comment.value.split('\n');
      let fixedValue: RulesEslintJsdocRequireJsdocParamNameCheckProgramFixedValue = comment.value;
      const mismatches: RulesEslintJsdocRequireJsdocParamNameCheckProgramMismatches = [];

      // First pass: collect mismatches and compute the fully fixed value.
      for (const line of lines) {
        const match: RulesEslintJsdocRequireJsdocParamNameCheckProgramMatch = RulesEslintJsdocRequireJsdocParamName.#paramPattern.exec(line);

        if (match === null) {
          continue;
        }

        const paramName: RulesEslintJsdocRequireJsdocParamNameCheckProgramParamName = match[1];
        const rawDescription: RulesEslintJsdocRequireJsdocParamNameCheckProgramRawDescription = match[2];

        if (paramName === undefined || rawDescription === undefined) {
          continue;
        }

        const description: RulesEslintJsdocRequireJsdocParamNameCheckProgramDescription = rawDescription.trim();

        // Convert camelCase to space-separated words with first letter capitalized.
        const words: RulesEslintJsdocRequireJsdocParamNameCheckProgramWords = paramName.replace(new RegExp(LIB_REGEX_PATTERN_CAMEL_CASE_BOUNDARY.source, 'g'), ' $1').trim();
        const expected: RulesEslintJsdocRequireJsdocParamNameCheckProgramExpected = `${words.charAt(0).toUpperCase()}${words.slice(1).toLowerCase()}.`;

        if (description !== expected) {
          fixedValue = fixedValue.replace(`- ${description}`, `- ${expected}`);
          mismatches.push({
            paramName,
            expected,
          });
        }
      }

      // Second pass: report errors with the pre-computed fixed value.
      const finalFixedValue: RulesEslintJsdocRequireJsdocParamNameCheckProgramFinalFixedValue = fixedValue;

      for (const mismatch of mismatches) {
        context.report({
          node: comment,
          messageId: 'paramDescriptionMismatch',
          data: {
            paramName: mismatch['paramName'],
            expected: mismatch['expected'],
          },
          fix(fixer) {
            return fixer.replaceTextRange(comment.range, `/*${finalFixedValue}*/`);
          },
        });
      }
    }

    return;
  }
}

import { ESLintUtils } from '@typescript-eslint/utils';

import { LIB_REGEX_PATTERN_CAMEL_CASE_BOUNDARY } from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_AllComments,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Context,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Description,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Expected,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_FinalFixedValue,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_FixedValue,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Match,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Mismatches,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_ParamName,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_RawDescription,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Words,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_RuleOptions,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-param-name.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Param Name.
 *
 * Enforces that every @param description is the capitalized, space-separated form of the
 * parameter name followed by a period, ensuring consistency.
 *
 * @since 0.15.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program() {
          Runner.checkProgram(context);

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
   * @param {Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Context} context - Context.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Returns}
   *
   * @since 0.15.0
   */
  private static checkProgram(context: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Context): Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Returns {
    const allComments: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_AllComments = context.sourceCode.getAllComments();

    for (const comment of allComments) {
      if (comment.type !== 'Block') {
        continue;
      }

      if (comment.value.startsWith('*') === false) {
        continue;
      }

      const lines: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Lines = comment.value.split('\n');
      let fixedValue: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_FixedValue = comment.value;
      const mismatches: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Mismatches = [];

      // First pass: collect mismatches and compute the fully fixed value.
      for (const line of lines) {
        const match: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Match = Runner.#paramPattern.exec(line);

        if (match === null) {
          continue;
        }

        const paramName: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_ParamName = match[1];
        const rawDescription: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_RawDescription = match[2];

        if (paramName === undefined || rawDescription === undefined) {
          continue;
        }

        const description: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Description = rawDescription.trim();

        // Convert camelCase to space-separated words with first letter capitalized.
        const words: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Words = paramName.replace(new RegExp(LIB_REGEX_PATTERN_CAMEL_CASE_BOUNDARY.source, 'g'), ' $1').trim();
        const expected: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_Expected = `${words.charAt(0).toUpperCase()}${words.slice(1).toLowerCase()}.`;

        if (description !== expected) {
          fixedValue = fixedValue.replace(`- ${description}`, `- ${expected}`);
          mismatches.push({
            paramName,
            expected,
          });
        }
      }

      // Second pass: report errors with the pre-computed fixed value.
      const finalFixedValue: Rules_Eslint_Jsdoc_RequireJsdocParamName_Runner_CheckProgram_FinalFixedValue = fixedValue;

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

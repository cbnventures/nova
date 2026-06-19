import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Context,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Node,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Returns,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Node,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Returns,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Options,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleDefaultOptionsRegexFile,
} from '../../../types/rules/eslint/regex/no-regex-literals.d.ts';

/**
 * Rules - ESLint - Regex - No Regex Literals.
 *
 * Forces all regex patterns into a centralized regex file so patterns are reusable,
 * testable, and not scattered across the codebase as inline literals.
 *
 * @since 0.13.0
 */
export class Runner {
  /**
   * Rules - ESLint - Regex - No Regex Literals - Rule.
   *
   * Registered under the name no-regex-literals and
   * exported through the rules index as NoRegexLiterals
   * for preset consumption.
   *
   * @since 0.13.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-regex-literals',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow regex literal expressions. Centralize patterns in a shared regex file instead.',
      },
      messages: {
        noRegexLiteralWithFile: 'Move this regex literal to \'{{ regexFile }}\' and import from there.',
        noRegexLiteralWithoutFile: 'Create a shared regex file and configure the \'regexFile\' option, then move this regex literal there.',
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
          regexFile: {
            type: 'string',
          },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      ignoreFiles: [] as Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleDefaultOptionsIgnoreFiles,
      regexFile: '' as Rules_Eslint_Regex_NoRegexLiterals_Runner_RuleDefaultOptionsRegexFile,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      // Skip the designated regex file.
      if (options['regexFile'] !== '' && isIgnoredFile(context.filename, [options['regexFile']]) === true) {
        return {};
      }

      return {
        Literal(node: Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Node): Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Returns {
          Runner.checkLiteral(context, node, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Regex - No Regex Literals - Check Literal.
   *
   * Checks whether a literal node contains a regex value and reports it with the configured
   * regexFile path when available, or a generic message otherwise.
   *
   * @private
   *
   * @param {Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Context} context - Context.
   * @param {Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Node}    node    - Node.
   * @param {Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options} options - Options.
   *
   * @returns {Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Returns}
   *
   * @since 0.13.0
   */
  private static checkLiteral(context: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Context, node: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Node, options: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options): Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Returns {
    if ('regex' in node && node.regex !== undefined) {
      if (options['regexFile'] !== '') {
        context.report({
          node,
          messageId: 'noRegexLiteralWithFile',
          data: {
            regexFile: options['regexFile'],
          },
        });
      } else {
        context.report({
          node,
          messageId: 'noRegexLiteralWithoutFile',
        });
      }
    }

    return;
  }
}

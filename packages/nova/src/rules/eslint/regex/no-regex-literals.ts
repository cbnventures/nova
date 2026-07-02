import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Context,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Node,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Options,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckLiteral_Returns,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Context,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_FirstArgument,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_IsStaticTemplate,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_IsStringLiteral,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Node,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Options,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Returns,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_CallExpression_Node,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_CallExpression_Returns,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Node,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Returns,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_NewExpression_Node,
  Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_NewExpression_Returns,
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
        description: 'Disallow regex literals and RegExp constructor calls with inline patterns. Centralize patterns in a shared regex file instead.',
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
        CallExpression(node: Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_CallExpression_Node): Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_CallExpression_Returns {
          Runner.checkRegExpConstructor(context, node, options);

          return;
        },
        Literal(node: Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Node): Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_Literal_Returns {
          Runner.checkLiteral(context, node, options);

          return;
        },
        NewExpression(node: Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_NewExpression_Node): Rules_Eslint_Regex_NoRegexLiterals_Runner_Create_NewExpression_Returns {
          Runner.checkRegExpConstructor(context, node, options);

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

  /**
   * Rules - ESLint - Regex - No Regex Literals - Check Reg Exp Constructor.
   *
   * Reports a `RegExp(...)` or `new RegExp(...)` call whose first argument is an
   * inline string or static template pattern, so the pattern moves to the shared
   * regex file. Calls passing a reference such as a lib constant `.source` are allowed.
   *
   * @private
   *
   * @param {Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Context} context - Context.
   * @param {Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Node}    node    - Node.
   * @param {Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Options} options - Options.
   *
   * @returns {Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Returns}
   *
   * @since 0.20.0
   */
  private static checkRegExpConstructor(context: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Context, node: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Node, options: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Options): Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_Returns {
    if (node.callee.type !== 'Identifier' || node.callee.name !== 'RegExp') {
      return;
    }

    const firstArgument: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_FirstArgument = node.arguments[0];

    if (firstArgument === undefined) {
      return;
    }

    const isStringLiteral: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_IsStringLiteral = firstArgument.type === 'Literal' && typeof firstArgument.value === 'string';
    const isStaticTemplate: Rules_Eslint_Regex_NoRegexLiterals_Runner_CheckRegExpConstructor_IsStaticTemplate = firstArgument.type === 'TemplateLiteral' && firstArgument.expressions.length === 0;

    if (isStringLiteral === false && isStaticTemplate === false) {
      return;
    }

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

    return;
  }
}

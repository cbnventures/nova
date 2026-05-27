import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Context,
  Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Node,
  Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Returns,
  Rules_Eslint_Syntax_NoOptionalChaining_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Syntax_NoOptionalChaining_Runner_RuleOptions,
} from '../../../types/rules/eslint/syntax/no-optional-chaining.d.ts';

/**
 * Rules - ESLint - Syntax - No Optional Chaining.
 *
 * Disallows the ?. operator so null and undefined checks are written as explicit
 * if-statements that are visible in control flow.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - Syntax - No Optional Chaining - Rule.
   *
   * Registered under the name no-optional-chaining and exported through the rules index as
   * NoOptionalChaining for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-optional-chaining',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow the optional chaining operator (?.).',
      },
      messages: {
        noOptionalChaining: 'Unexpected optional chaining operator (?.). Use an explicit null/undefined check instead.',
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
      ignoreFiles: [] as Rules_Eslint_Syntax_NoOptionalChaining_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Syntax_NoOptionalChaining_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ChainExpression(node) {
          Runner.checkChainExpression(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Syntax - No Optional Chaining - Check Chain Expression.
   *
   * Reports every ChainExpression node unconditionally since the ?. operator is banned in
   * favor of explicit null and undefined guard clauses.
   *
   * @private
   *
   * @param {Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Context} context - Context.
   * @param {Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Returns}
   *
   * @since 0.15.0
   */
  private static checkChainExpression(context: Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Context, node: Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Node): Rules_Eslint_Syntax_NoOptionalChaining_Runner_CheckChainExpression_Returns {
    context.report({
      node,
      messageId: 'noOptionalChaining',
    });

    return;
  }
}

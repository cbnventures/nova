import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintSyntaxNoOptionalChainingCheckChainExpressionContext,
  RulesEslintSyntaxNoOptionalChainingCheckChainExpressionNode,
  RulesEslintSyntaxNoOptionalChainingCheckChainExpressionReturns,
  RulesEslintSyntaxNoOptionalChainingRuleDefaultOptionsIgnoreFiles,
  RulesEslintSyntaxNoOptionalChainingRuleOptions,
} from '../../../types/rules/eslint/syntax/no-optional-chaining.d.ts';

/**
 * Rules - ESLint - Syntax - No Optional Chaining.
 *
 * Disallows the ?. operator so null and undefined checks are written as explicit
 * if-statements that are visible in control flow.
 *
 * @since 0.15.0
 */
export class RulesEslintSyntaxNoOptionalChaining {
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
      ignoreFiles: [] as RulesEslintSyntaxNoOptionalChainingRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintSyntaxNoOptionalChainingRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ChainExpression(node) {
          RulesEslintSyntaxNoOptionalChaining.checkChainExpression(context, node);

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
   * @param {RulesEslintSyntaxNoOptionalChainingCheckChainExpressionContext} context - Context.
   * @param {RulesEslintSyntaxNoOptionalChainingCheckChainExpressionNode}    node    - Node.
   *
   * @returns {RulesEslintSyntaxNoOptionalChainingCheckChainExpressionReturns}
   *
   * @since 0.15.0
   */
  private static checkChainExpression(context: RulesEslintSyntaxNoOptionalChainingCheckChainExpressionContext, node: RulesEslintSyntaxNoOptionalChainingCheckChainExpressionNode): RulesEslintSyntaxNoOptionalChainingCheckChainExpressionReturns {
    context.report({
      node,
      messageId: 'noOptionalChaining',
    });

    return;
  }
}

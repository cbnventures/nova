import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralContext,
  RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralNode,
  RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralReturns,
  RulesEslintFormattingNoTernaryInTemplateLiteralRuleDefaultOptionsIgnoreFiles,
  RulesEslintFormattingNoTernaryInTemplateLiteralRuleOptions,
} from '../../../types/rules/eslint/formatting/no-ternary-in-template-literal.d.ts';

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal.
 *
 * Prevents ternary expressions inside template literal interpolations. The ternary should be
 * extracted into a variable so the template stays readable.
 *
 * @since 0.15.0
 */
export class RulesEslintFormattingNoTernaryInTemplateLiteral {
  /**
   * Rules - ESLint - Formatting - No Ternary In Template Literal - Rule.
   *
   * Registered under the name no-ternary-in-template-literal
   * and exported through the rules index for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-ternary-in-template-literal',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow ternary expressions inside template literals.',
      },
      messages: {
        noTernaryInTemplate: 'Do not use ternary expressions inside template literals. Extract the ternary into a variable first.',
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
      ignoreFiles: [] as RulesEslintFormattingNoTernaryInTemplateLiteralRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintFormattingNoTernaryInTemplateLiteralRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        TemplateLiteral(node) {
          RulesEslintFormattingNoTernaryInTemplateLiteral.checkTemplateLiteral(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - No Ternary In Template Literal - Check Template Literal.
   *
   * Iterates over the template literal expressions and reports any ConditionalExpression node
   * found inside the interpolation slots.
   *
   * @private
   *
   * @param {RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralContext} context - Context.
   * @param {RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralNode}    node    - Node.
   *
   * @returns {RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralReturns}
   *
   * @since 0.15.0
   */
  private static checkTemplateLiteral(context: RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralContext, node: RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralNode): RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralReturns {
    for (const expression of node.expressions) {
      if (expression.type === 'ConditionalExpression') {
        context.report({
          node: expression,
          messageId: 'noTernaryInTemplate',
        });
      }
    }

    return;
  }
}

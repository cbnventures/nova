import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Context,
  Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Node,
  Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Returns,
  Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_RuleOptions,
} from '../../../types/rules/eslint/formatting/no-ternary-in-template-literal.d.ts';

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal.
 *
 * Prevents ternary expressions inside template literal interpolations. The ternary should be
 * extracted into a variable so the template stays readable.
 *
 * @since 0.15.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        TemplateLiteral(node) {
          Runner.checkTemplateLiteral(context, node);

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
   * @param {Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Context} context - Context.
   * @param {Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Returns}
   *
   * @since 0.15.0
   */
  private static checkTemplateLiteral(context: Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Context, node: Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Node): Rules_Eslint_Formatting_NoTernaryInTemplateLiteral_Runner_CheckTemplateLiteral_Returns {
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

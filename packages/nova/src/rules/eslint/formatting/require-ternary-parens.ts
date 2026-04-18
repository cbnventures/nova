import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionCharBefore,
  RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionContext,
  RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionNode,
  RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionReturns,
  RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionSourceText,
  RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionTestStart,
  RulesEslintFormattingRequireTernaryParensRuleDefaultOptionsIgnoreFiles,
  RulesEslintFormattingRequireTernaryParensRuleOptions,
} from '../../../types/rules/eslint/formatting/require-ternary-parens.d.ts';

/**
 * Rules - ESLint - Formatting - Require Ternary Parens.
 *
 * Wraps ternary conditions in parentheses so the test expression is visually separated from
 * the consequent and alternate branches.
 *
 * @since 0.15.0
 */
export class RulesEslintFormattingRequireTernaryParens {
  /**
   * Rules - ESLint - Formatting - Require Ternary Parens - Rule.
   *
   * Registered under the name require-ternary-parens and exported through the rules index as
   * RequireTernaryParens for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-ternary-parens',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require parenthesized condition in ternary expressions.',
      },
      fixable: 'code',
      messages: {
        requireTernaryParens: 'Wrap the ternary condition in parentheses.',
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
      ignoreFiles: [] as RulesEslintFormattingRequireTernaryParensRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintFormattingRequireTernaryParensRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ConditionalExpression(node) {
          RulesEslintFormattingRequireTernaryParens.checkConditionalExpression(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - Require Ternary Parens - Check Conditional Expression.
   *
   * Checks the character before the test expression start position
   * for an opening parenthesis and provides an auto-fix to wrap the condition.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionContext} context - Context.
   * @param {RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionNode}    node    - Node.
   *
   * @returns {RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionReturns}
   *
   * @since 0.15.0
   */
  private static checkConditionalExpression(context: RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionContext, node: RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionNode): RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionReturns {
    const sourceText: RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionSourceText = context.sourceCode.getText();
    const testStart: RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionTestStart = node.test.range[0];

    if (testStart < 1) {
      context.report({
        node,
        messageId: 'requireTernaryParens',
        fix(fixer) {
          return [
            fixer.insertTextBefore(node.test, '('),
            fixer.insertTextAfter(node.test, ')'),
          ];
        },
      });

      return;
    }

    const charBefore: RulesEslintFormattingRequireTernaryParensCheckConditionalExpressionCharBefore = sourceText[testStart - 1];

    if (charBefore !== '(') {
      context.report({
        node,
        messageId: 'requireTernaryParens',
        fix(fixer) {
          return [
            fixer.insertTextBefore(node.test, '('),
            fixer.insertTextAfter(node.test, ')'),
          ];
        },
      });
    }

    return;
  }
}

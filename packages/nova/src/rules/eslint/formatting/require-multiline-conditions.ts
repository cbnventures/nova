import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionContext,
  RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionCurr,
  RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionMaxInline,
  RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionNode,
  RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionOperandCount,
  RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionOperands,
  RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionPrev,
  RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionReturns,
  RulesEslintFormattingRequireMultilineConditionsCollectOperandsNode,
  RulesEslintFormattingRequireMultilineConditionsCollectOperandsReturns,
  RulesEslintFormattingRequireMultilineConditionsRuleDefaultOptionsIgnoreFiles,
  RulesEslintFormattingRequireMultilineConditionsRuleDefaultOptionsMaxInline,
  RulesEslintFormattingRequireMultilineConditionsRuleMaxInline,
  RulesEslintFormattingRequireMultilineConditionsRuleOptions,
} from '../../../types/rules/eslint/formatting/require-multiline-conditions.d.ts';

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions.
 *
 * Requires each operand in a logical expression to appear on its
 * own line when the operand count exceeds the configured maxInline threshold.
 *
 * @since 0.15.0
 */
export class RulesEslintFormattingRequireMultilineConditions {
  /**
   * Rules - ESLint - Formatting - Require Multiline Conditions - Rule.
   *
   * Exported through the ESLint plugin index and activated in
   * eslint.config.ts with a default maxInline of 2 operands before requiring wrapping.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-multiline-conditions',
    meta: {
      type: 'layout',
      docs: {
        description: 'Require each operand to be on its own line when a logical expression exceeds the allowed inline count.',
      },
      messages: {
        requireMultiline: 'This logical expression has {{ count }} operands (max {{ max }} inline). Place each operand on its own line.',
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
          maxInline: {
            type: 'number',
          },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      ignoreFiles: [] as RulesEslintFormattingRequireMultilineConditionsRuleDefaultOptionsIgnoreFiles,
      maxInline: 2 as RulesEslintFormattingRequireMultilineConditionsRuleDefaultOptionsMaxInline,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintFormattingRequireMultilineConditionsRuleOptions = defaultOptions[0];
      const maxInline: RulesEslintFormattingRequireMultilineConditionsRuleMaxInline = options['maxInline'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        LogicalExpression(node) {
          RulesEslintFormattingRequireMultilineConditions.checkLogicalExpression(context, node, maxInline);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - Require Multiline Conditions - Check Logical Expression.
   *
   * Only processes the outermost logical expression. Collects all
   * operands via collectOperands and reports when consecutive operands share a line.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionContext}   context   - Context.
   * @param {RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionNode}      node      - Node.
   * @param {RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionMaxInline} maxInline - Max inline.
   *
   * @returns {RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionReturns}
   *
   * @since 0.15.0
   */
  private static checkLogicalExpression(context: RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionContext, node: RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionNode, maxInline: RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionMaxInline): RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionReturns {
    // Only process the outermost logical expression.
    if (node.parent.type === 'LogicalExpression') {
      return;
    }

    const operands: RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionOperands = RulesEslintFormattingRequireMultilineConditions.collectOperands(node);
    const operandCount: RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionOperandCount = operands.length;

    if (operandCount <= maxInline) {
      return;
    }

    // Check if any two consecutive operands share the same start line.
    for (let i = 1; i < operands.length; i += 1) {
      const prev: RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionPrev = operands[i - 1];
      const curr: RulesEslintFormattingRequireMultilineConditionsCheckLogicalExpressionCurr = operands[i];

      if (prev === undefined || curr === undefined) {
        continue;
      }

      if (prev.loc.start.line === curr.loc.start.line) {
        context.report({
          node,
          messageId: 'requireMultiline',
          data: {
            count: String(operandCount),
            max: String(maxInline),
          },
        });

        return;
      }
    }

    return;
  }

  /**
   * Rules - ESLint - Formatting - Require Multiline Conditions - Collect Operands.
   *
   * Recursively flattens a chain of LogicalExpression nodes into
   * a flat array of leaf operand nodes. Called by checkLogicalExpression for counting.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequireMultilineConditionsCollectOperandsNode} node - Node.
   *
   * @returns {RulesEslintFormattingRequireMultilineConditionsCollectOperandsReturns}
   *
   * @since 0.15.0
   */
  private static collectOperands(node: RulesEslintFormattingRequireMultilineConditionsCollectOperandsNode): RulesEslintFormattingRequireMultilineConditionsCollectOperandsReturns {
    const operands: RulesEslintFormattingRequireMultilineConditionsCollectOperandsReturns = [];

    if (node.left.type === 'LogicalExpression') {
      operands.push(...RulesEslintFormattingRequireMultilineConditions.collectOperands(node.left));
    } else {
      operands.push(node.left);
    }

    if (node.right.type === 'LogicalExpression') {
      operands.push(...RulesEslintFormattingRequireMultilineConditions.collectOperands(node.right));
    } else {
      operands.push(node.right);
    }

    return operands;
  }
}

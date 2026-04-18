import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionCloseParen,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionContext,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionCurr,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionGroupStyle,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionNode,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOpenParen,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOperands,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOperatorIndex,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOperatorToken,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionParent,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionPrev,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionReturns,
  RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionTokensBetween,
  RulesEslintFormattingRequireMultilineConditionGroupsCollectGroupOperandsNode,
  RulesEslintFormattingRequireMultilineConditionGroupsCollectGroupOperandsReturns,
  RulesEslintFormattingRequireMultilineConditionGroupsRuleDefaultOptionsGroupStyle,
  RulesEslintFormattingRequireMultilineConditionGroupsRuleDefaultOptionsIgnoreFiles,
  RulesEslintFormattingRequireMultilineConditionGroupsRuleGroupStyle,
  RulesEslintFormattingRequireMultilineConditionGroupsRuleOptions,
} from '../../../types/rules/eslint/formatting/require-multiline-condition-groups.d.ts';

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups.
 *
 * Enforces expanded formatting for parenthesized groups in
 * mixed-operator logical expressions and validates operator placement between groups.
 *
 * @since 0.15.0
 */
export class RulesEslintFormattingRequireMultilineConditionGroups {
  /**
   * Rules - ESLint - Formatting - Require Multiline Condition Groups - Rule.
   *
   * Exported through the ESLint plugin index and activated in
   * eslint.config.ts. Supports three group styles for operator placement.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-multiline-condition-groups',
    meta: {
      type: 'layout',
      docs: {
        description: 'Require expanded formatting for parenthesized groups in mixed-operator logical expressions.',
      },
      messages: {
        requireGroupMultiline: 'Each operand in this group must start on its own line ({{ count }} operands found).',
        requireGroupStyle: 'Operator placement between groups does not follow the "{{ style }}" style.',
      },
      schema: [{
        type: 'object',
        properties: {
          groupStyle: {
            type: 'string',
            enum: [
              'operator-before-open',
              'operator-after-close',
              'operator-inline',
            ],
          },
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
      groupStyle: 'operator-before-open' as RulesEslintFormattingRequireMultilineConditionGroupsRuleDefaultOptionsGroupStyle,
      ignoreFiles: [] as RulesEslintFormattingRequireMultilineConditionGroupsRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintFormattingRequireMultilineConditionGroupsRuleOptions = defaultOptions[0];
      const groupStyle: RulesEslintFormattingRequireMultilineConditionGroupsRuleGroupStyle = options['groupStyle'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        LogicalExpression(node) {
          RulesEslintFormattingRequireMultilineConditionGroups.checkLogicalExpression(context, node, groupStyle);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - Require Multiline Condition Groups - Check Logical Expression.
   *
   * Fires only for inner groups where the parent uses a different operator. Checks operand
   * line positions and validates operator token placement style.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionContext}    context    - Context.
   * @param {RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionNode}       node       - Node.
   * @param {RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionGroupStyle} groupStyle - Group style.
   *
   * @returns {RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionReturns}
   *
   * @since 0.15.0
   */
  private static checkLogicalExpression(context: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionContext, node: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionNode, groupStyle: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionGroupStyle): RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionReturns {
    const parent: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionParent = node.parent;

    // Only process when parent is a LogicalExpression with a different operator.
    if (parent.type !== 'LogicalExpression') {
      return;
    }

    if (parent.operator === node.operator) {
      return;
    }

    const operands: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOperands = RulesEslintFormattingRequireMultilineConditionGroups.collectGroupOperands(node);

    // Check if any two consecutive operands share the same start line.
    for (let i = 1; i < operands.length; i += 1) {
      const prev: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionPrev = operands[i - 1];
      const curr: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionCurr = operands[i];

      if (prev === undefined || curr === undefined) {
        continue;
      }

      if (prev.loc.start.line === curr.loc.start.line) {
        context.report({
          node,
          messageId: 'requireGroupMultiline',
          data: {
            count: String(operands.length),
          },
        });

        return;
      }
    }

    // Check group style (only when this node is the right child).
    if (groupStyle !== 'operator-inline' && node === parent.right) {
      const tokensBetween: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionTokensBetween = context.sourceCode.getTokensBetween(parent.left, parent.right);
      const operatorIndex: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOperatorIndex = tokensBetween.findIndex((tokenBetween) => tokenBetween.value === parent.operator);

      if (operatorIndex !== -1) {
        const operatorToken: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOperatorToken = tokensBetween[operatorIndex];
        const closeParen: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionCloseParen = (operatorIndex > 0) ? tokensBetween[operatorIndex - 1] : undefined;
        const openParen: RulesEslintFormattingRequireMultilineConditionGroupsCheckLogicalExpressionOpenParen = (operatorIndex < tokensBetween.length - 1) ? tokensBetween[operatorIndex + 1] : undefined;

        if (
          operatorToken !== undefined
          && closeParen !== undefined
          && openParen !== undefined
          && closeParen.value === ')'
          && openParen.value === '('
        ) {
          if (groupStyle === 'operator-before-open') {
            // Operator should be on a different line from ')' and same line as '('.
            if (
              operatorToken.loc.start.line === closeParen.loc.start.line
              || operatorToken.loc.start.line !== openParen.loc.start.line
            ) {
              context.report({
                node,
                messageId: 'requireGroupStyle',
                data: {
                  style: groupStyle,
                },
              });
            }
          } else if (groupStyle === 'operator-after-close') {
            // Operator should be on the same line as ')' and different line from '('.
            if (
              operatorToken.loc.start.line !== closeParen.loc.start.line
              || operatorToken.loc.start.line === openParen.loc.start.line
            ) {
              context.report({
                node,
                messageId: 'requireGroupStyle',
                data: {
                  style: groupStyle,
                },
              });
            }
          }
        }
      }
    }

    return;
  }

  /**
   * Rules - ESLint - Formatting - Require Multiline Condition Groups - Collect Group Operands.
   *
   * Recursively flattens a chain of same-operator LogicalExpression nodes into a flat array of
   * leaf operands for line position comparison.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequireMultilineConditionGroupsCollectGroupOperandsNode} node - Node.
   *
   * @returns {RulesEslintFormattingRequireMultilineConditionGroupsCollectGroupOperandsReturns}
   *
   * @since 0.15.0
   */
  private static collectGroupOperands(node: RulesEslintFormattingRequireMultilineConditionGroupsCollectGroupOperandsNode): RulesEslintFormattingRequireMultilineConditionGroupsCollectGroupOperandsReturns {
    const operands: RulesEslintFormattingRequireMultilineConditionGroupsCollectGroupOperandsReturns = [];

    if (node.left.type === 'LogicalExpression' && node.left.operator === node.operator) {
      operands.push(...RulesEslintFormattingRequireMultilineConditionGroups.collectGroupOperands(node.left));
    } else {
      operands.push(node.left);
    }

    if (node.right.type === 'LogicalExpression' && node.right.operator === node.operator) {
      operands.push(...RulesEslintFormattingRequireMultilineConditionGroups.collectGroupOperands(node.right));
    } else {
      operands.push(node.right);
    }

    return operands;
  }
}

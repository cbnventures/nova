import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_CloseParen,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Context,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Curr,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_GroupStyle,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Node,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_OpenParen,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Operands,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_OperatorIndex,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_OperatorToken,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Parent,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Prev,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Returns,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_TokensBetween,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Node,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Returns,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleDefaultOptionsGroupStyle,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleGroupStyle,
  Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleOptions,
} from '../../../types/rules/eslint/formatting/require-multiline-condition-groups.d.ts';

/**
 * Rules - ESLint - Formatting - Require Multiline Condition Groups.
 *
 * Enforces expanded formatting for parenthesized groups in
 * mixed-operator logical expressions and validates operator placement between groups.
 *
 * @since 0.15.0
 */
export class Runner {
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
      groupStyle: 'operator-before-open' as Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleDefaultOptionsGroupStyle,
      ignoreFiles: [] as Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleOptions = defaultOptions[0];
      const groupStyle: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_RuleGroupStyle = options['groupStyle'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        LogicalExpression(node) {
          Runner.checkLogicalExpression(context, node, groupStyle);

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
   * @param {Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Context}    context    - Context.
   * @param {Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Node}       node       - Node.
   * @param {Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_GroupStyle} groupStyle - Group style.
   *
   * @returns {Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Returns}
   *
   * @since 0.15.0
   */
  private static checkLogicalExpression(context: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Context, node: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Node, groupStyle: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_GroupStyle): Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Returns {
    const parent: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Parent = node.parent;

    // Only process when parent is a LogicalExpression with a different operator.
    if (parent.type !== 'LogicalExpression') {
      return;
    }

    if (parent.operator === node.operator) {
      return;
    }

    const operands: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Operands = Runner.collectGroupOperands(node);

    // Check if any two consecutive operands share the same start line.
    for (let i = 1; i < operands.length; i += 1) {
      const prev: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Prev = operands[i - 1];
      const curr: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_Curr = operands[i];

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
      const tokensBetween: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_TokensBetween = context.sourceCode.getTokensBetween(parent.left, parent.right);
      const operatorIndex: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_OperatorIndex = tokensBetween.findIndex((tokenBetween) => tokenBetween.value === parent.operator);

      if (operatorIndex !== -1) {
        const operatorToken: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_OperatorToken = tokensBetween[operatorIndex];
        const closeParen: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_CloseParen = (operatorIndex > 0) ? tokensBetween[operatorIndex - 1] : undefined;
        const openParen: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CheckLogicalExpression_OpenParen = (operatorIndex < tokensBetween.length - 1) ? tokensBetween[operatorIndex + 1] : undefined;

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
   * @param {Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Returns}
   *
   * @since 0.15.0
   */
  private static collectGroupOperands(node: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Node): Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Returns {
    const operands: Rules_Eslint_Formatting_RequireMultilineConditionGroups_Runner_CollectGroupOperands_Returns = [];

    if (node.left.type === 'LogicalExpression' && node.left.operator === node.operator) {
      operands.push(...Runner.collectGroupOperands(node.left));
    } else {
      operands.push(node.left);
    }

    if (node.right.type === 'LogicalExpression' && node.right.operator === node.operator) {
      operands.push(...Runner.collectGroupOperands(node.right));
    } else {
      operands.push(node.right);
    }

    return operands;
  }
}

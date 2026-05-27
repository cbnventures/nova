import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Context,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Curr,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_MaxInline,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Node,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_OperandCount,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Operands,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Prev,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Returns,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Node,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Returns,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleDefaultOptionsMaxInline,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleMaxInline,
  Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleOptions,
} from '../../../types/rules/eslint/formatting/require-multiline-conditions.d.ts';

/**
 * Rules - ESLint - Formatting - Require Multiline Conditions.
 *
 * Requires each operand in a logical expression to appear on its
 * own line when the operand count exceeds the configured maxInline threshold.
 *
 * @since 0.15.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleDefaultOptionsIgnoreFiles,
      maxInline: 2 as Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleDefaultOptionsMaxInline,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleOptions = defaultOptions[0];
      const maxInline: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_RuleMaxInline = options['maxInline'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        LogicalExpression(node) {
          Runner.checkLogicalExpression(context, node, maxInline);

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
   * @param {Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Context}   context   - Context.
   * @param {Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Node}      node      - Node.
   * @param {Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_MaxInline} maxInline - Max inline.
   *
   * @returns {Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Returns}
   *
   * @since 0.15.0
   */
  private static checkLogicalExpression(context: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Context, node: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Node, maxInline: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_MaxInline): Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Returns {
    // Only process the outermost logical expression.
    if (node.parent.type === 'LogicalExpression') {
      return;
    }

    const operands: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Operands = Runner.collectOperands(node);
    const operandCount: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_OperandCount = operands.length;

    if (operandCount <= maxInline) {
      return;
    }

    // Check if any two consecutive operands share the same start line.
    for (let i = 1; i < operands.length; i += 1) {
      const prev: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Prev = operands[i - 1];
      const curr: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CheckLogicalExpression_Curr = operands[i];

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
   * @param {Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Returns}
   *
   * @since 0.15.0
   */
  private static collectOperands(node: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Node): Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Returns {
    const operands: Rules_Eslint_Formatting_RequireMultilineConditions_Runner_CollectOperands_Returns = [];

    if (node.left.type === 'LogicalExpression') {
      operands.push(...Runner.collectOperands(node.left));
    } else {
      operands.push(node.left);
    }

    if (node.right.type === 'LogicalExpression') {
      operands.push(...Runner.collectOperands(node.right));
    } else {
      operands.push(node.right);
    }

    return operands;
  }
}

import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Body,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_ChainLength,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Context,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_MaxChainLength,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_MaxNestedArrows,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_NestedCount,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Node,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Returns,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Count,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Current,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Node,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Returns,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Count,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Node,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Returns,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_ArrowFunctionExpression_Node,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_ArrowFunctionExpression_Returns,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_MaxChainLength,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_MaxNestedArrows,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_Options,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_RuleDefaultOptionsMaxChainLength,
  Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_RuleDefaultOptionsMaxNestedArrows,
} from '../../../types/rules/eslint/formatting/no-complex-arrow-concise.d.ts';

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise.
 *
 * Flags concise arrow functions whose bodies contain too many nested
 * arrow callbacks or chained method calls, requiring a block body instead.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - Formatting - No Complex Arrow Concise - Rule.
   *
   * Registered in eslint.config.ts and visits every
   * ArrowFunctionExpression to check whether its concise body exceeds complexity thresholds.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-complex-arrow-concise',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require arrow functions with complex concise bodies to use an explicit block body.',
      },
      messages: {
        tooManyNestedArrows: 'This concise arrow has {{ count }} nested arrow callbacks (max {{ max }}). Use a block body instead.',
        tooLongChain: 'This concise arrow has {{ count }} chained method calls (max {{ max }}). Use a block body instead.',
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
          maxChainLength: {
            type: 'number',
          },
          maxNestedArrows: {
            type: 'number',
          },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      ignoreFiles: [] as Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_RuleDefaultOptionsIgnoreFiles,
      maxChainLength: 2 as Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_RuleDefaultOptionsMaxChainLength,
      maxNestedArrows: 1 as Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_RuleDefaultOptionsMaxNestedArrows,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_Options = defaultOptions[0];
      const maxNestedArrows: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_MaxNestedArrows = options['maxNestedArrows'];
      const maxChainLength: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_MaxChainLength = options['maxChainLength'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ArrowFunctionExpression(node: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_ArrowFunctionExpression_Node): Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_Create_ArrowFunctionExpression_Returns {
          Runner.checkArrowFunction(context, node, maxNestedArrows, maxChainLength);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - No Complex Arrow Concise - Check Arrow Function.
   *
   * Called by the rule visitor for each arrow function. Skips block
   * bodies then checks nested arrow count and method chain length against thresholds.
   *
   * @private
   *
   * @param {Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Context}         context         - Context.
   * @param {Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Node}            node            - Node.
   * @param {Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_MaxNestedArrows} maxNestedArrows - Max nested arrows.
   * @param {Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_MaxChainLength}  maxChainLength  - Max chain length.
   *
   * @returns {Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Returns}
   *
   * @since 0.15.0
   */
  private static checkArrowFunction(context: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Context, node: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Node, maxNestedArrows: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_MaxNestedArrows, maxChainLength: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_MaxChainLength): Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Returns {
    // Only check concise arrow bodies (no block body).
    if (node.body.type === 'BlockStatement') {
      return;
    }

    const body: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_Body = node.body;

    // Check nested arrow count.
    const nestedCount: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_NestedCount = Runner.countNestedArrows(body);

    if (nestedCount > maxNestedArrows) {
      context.report({
        node,
        messageId: 'tooManyNestedArrows',
        data: {
          count: String(nestedCount),
          max: String(maxNestedArrows),
        },
      });

      return;
    }

    // Check chain length.
    const chainLength: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CheckArrowFunction_ChainLength = Runner.countChainLength(body);

    if (chainLength > maxChainLength) {
      context.report({
        node,
        messageId: 'tooLongChain',
        data: {
          count: String(chainLength),
          max: String(maxChainLength),
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Formatting - No Complex Arrow Concise - Count Chain Length.
   *
   * Walks a CallExpression chain by following each callee
   * MemberExpression to count how many chained method calls exist in the expression.
   *
   * @private
   *
   * @param {Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Returns}
   *
   * @since 0.15.0
   */
  private static countChainLength(node: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Node): Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Returns {
    let count: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Count = 0;
    let current: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountChainLength_Current = node;

    while (
      current.type === 'CallExpression'
      && current.callee.type === 'MemberExpression'
    ) {
      count += 1;
      current = current.callee.object;
    }

    return count;
  }

  /**
   * Rules - ESLint - Formatting - No Complex Arrow Concise - Count Nested Arrows.
   *
   * Recursively traverses the AST subtree to count
   * ArrowFunctionExpression nodes nested within arguments, properties, and sub-expressions.
   *
   * @private
   *
   * @param {Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Returns}
   *
   * @since 0.15.0
   */
  private static countNestedArrows(node: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Node): Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Returns {
    if (node.type === 'ArrowFunctionExpression') {
      return 1;
    }

    let count: Rules_Eslint_Formatting_NoComplexArrowConcise_Runner_CountNestedArrows_Count = 0;

    if ('arguments' in node && Array.isArray(node.arguments) === true) {
      for (const argument of node.arguments) {
        count += Runner.countNestedArrows(argument);
      }
    }

    if ('callee' in node && node.callee !== undefined) {
      count += Runner.countNestedArrows(node.callee);
    }

    if ('object' in node && node.object !== undefined) {
      count += Runner.countNestedArrows(node.object);
    }

    if ('property' in node && node.property !== undefined) {
      count += Runner.countNestedArrows(node.property);
    }

    if ('elements' in node && Array.isArray(node.elements) === true) {
      for (const element of node.elements) {
        if (element !== null) {
          count += Runner.countNestedArrows(element);
        }
      }
    }

    if ('properties' in node && Array.isArray(node.properties) === true) {
      for (const property of node.properties) {
        count += Runner.countNestedArrows(property);
      }
    }

    if (
      'value' in node
      && node.value !== null
      && node.value !== undefined
      && typeof node.value === 'object'
      && 'type' in node.value
    ) {
      count += Runner.countNestedArrows(node.value);
    }

    if ('expressions' in node && Array.isArray(node.expressions) === true) {
      for (const expression of node.expressions) {
        count += Runner.countNestedArrows(expression);
      }
    }

    if (
      'left' in node
      && node.left !== undefined
      && typeof node.left === 'object'
      && 'type' in node.left
    ) {
      count += Runner.countNestedArrows(node.left);
    }

    if (
      'right' in node
      && node.right !== undefined
      && typeof node.right === 'object'
      && 'type' in node.right
    ) {
      count += Runner.countNestedArrows(node.right);
    }

    if (
      'consequent' in node
      && node.consequent !== undefined
      && typeof node.consequent === 'object'
      && node.consequent !== null
      && 'type' in node.consequent
    ) {
      count += Runner.countNestedArrows(node.consequent);
    }

    if (
      'alternate' in node
      && node.alternate !== undefined
      && node.alternate !== null
      && typeof node.alternate === 'object'
      && 'type' in node.alternate
    ) {
      count += Runner.countNestedArrows(node.alternate);
    }

    return count;
  }
}

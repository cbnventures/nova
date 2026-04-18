import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionBody,
  RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionChainLength,
  RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionContext,
  RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionMaxChainLength,
  RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionMaxNestedArrows,
  RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionNestedCount,
  RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionNode,
  RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionReturns,
  RulesEslintFormattingNoComplexArrowConciseCountChainLengthCount,
  RulesEslintFormattingNoComplexArrowConciseCountChainLengthCurrent,
  RulesEslintFormattingNoComplexArrowConciseCountChainLengthNode,
  RulesEslintFormattingNoComplexArrowConciseCountChainLengthReturns,
  RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsCount,
  RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsNode,
  RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsReturns,
  RulesEslintFormattingNoComplexArrowConciseRuleDefaultOptionsIgnoreFiles,
  RulesEslintFormattingNoComplexArrowConciseRuleDefaultOptionsMaxChainLength,
  RulesEslintFormattingNoComplexArrowConciseRuleDefaultOptionsMaxNestedArrows,
  RulesEslintFormattingNoComplexArrowConciseRuleMaxChainLength,
  RulesEslintFormattingNoComplexArrowConciseRuleMaxNestedArrows,
  RulesEslintFormattingNoComplexArrowConciseRuleOptions,
} from '../../../types/rules/eslint/formatting/no-complex-arrow-concise.d.ts';

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise.
 *
 * Flags concise arrow functions whose bodies contain too many nested
 * arrow callbacks or chained method calls, requiring a block body instead.
 *
 * @since 0.15.0
 */
export class RulesEslintFormattingNoComplexArrowConcise {
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
      ignoreFiles: [] as RulesEslintFormattingNoComplexArrowConciseRuleDefaultOptionsIgnoreFiles,
      maxChainLength: 2 as RulesEslintFormattingNoComplexArrowConciseRuleDefaultOptionsMaxChainLength,
      maxNestedArrows: 1 as RulesEslintFormattingNoComplexArrowConciseRuleDefaultOptionsMaxNestedArrows,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintFormattingNoComplexArrowConciseRuleOptions = defaultOptions[0];
      const maxNestedArrows: RulesEslintFormattingNoComplexArrowConciseRuleMaxNestedArrows = options['maxNestedArrows'];
      const maxChainLength: RulesEslintFormattingNoComplexArrowConciseRuleMaxChainLength = options['maxChainLength'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ArrowFunctionExpression(node) {
          RulesEslintFormattingNoComplexArrowConcise.checkArrowFunction(context, node, maxNestedArrows, maxChainLength);

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
   * @param {RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionContext}         context         - Context.
   * @param {RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionNode}            node            - Node.
   * @param {RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionMaxNestedArrows} maxNestedArrows - Max nested arrows.
   * @param {RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionMaxChainLength}  maxChainLength  - Max chain length.
   *
   * @returns {RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionReturns}
   *
   * @since 0.15.0
   */
  private static checkArrowFunction(context: RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionContext, node: RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionNode, maxNestedArrows: RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionMaxNestedArrows, maxChainLength: RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionMaxChainLength): RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionReturns {
    // Only check concise arrow bodies (no block body).
    if (node.body.type === 'BlockStatement') {
      return;
    }

    const body: RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionBody = node.body;

    // Check nested arrow count.
    const nestedCount: RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionNestedCount = RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(body);

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
    const chainLength: RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionChainLength = RulesEslintFormattingNoComplexArrowConcise.countChainLength(body);

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
   * @param {RulesEslintFormattingNoComplexArrowConciseCountChainLengthNode} node - Node.
   *
   * @returns {RulesEslintFormattingNoComplexArrowConciseCountChainLengthReturns}
   *
   * @since 0.15.0
   */
  private static countChainLength(node: RulesEslintFormattingNoComplexArrowConciseCountChainLengthNode): RulesEslintFormattingNoComplexArrowConciseCountChainLengthReturns {
    let count: RulesEslintFormattingNoComplexArrowConciseCountChainLengthCount = 0;
    let current: RulesEslintFormattingNoComplexArrowConciseCountChainLengthCurrent = node;

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
   * @param {RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsNode} node - Node.
   *
   * @returns {RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsReturns}
   *
   * @since 0.15.0
   */
  private static countNestedArrows(node: RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsNode): RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsReturns {
    if (node.type === 'ArrowFunctionExpression') {
      return 1;
    }

    let count: RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsCount = 0;

    if ('arguments' in node && Array.isArray(node.arguments) === true) {
      for (const argument of node.arguments) {
        count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(argument);
      }
    }

    if ('callee' in node && node.callee !== undefined) {
      count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(node.callee);
    }

    if ('object' in node && node.object !== undefined) {
      count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(node.object);
    }

    if ('property' in node && node.property !== undefined) {
      count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(node.property);
    }

    if ('elements' in node && Array.isArray(node.elements) === true) {
      for (const element of node.elements) {
        if (element !== null) {
          count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(element);
        }
      }
    }

    if ('properties' in node && Array.isArray(node.properties) === true) {
      for (const property of node.properties) {
        count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(property);
      }
    }

    if (
      'value' in node
      && node.value !== null
      && node.value !== undefined
      && typeof node.value === 'object'
      && 'type' in node.value
    ) {
      count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(node.value);
    }

    if ('expressions' in node && Array.isArray(node.expressions) === true) {
      for (const expression of node.expressions) {
        count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(expression);
      }
    }

    if (
      'left' in node
      && node.left !== undefined
      && typeof node.left === 'object'
      && 'type' in node.left
    ) {
      count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(node.left);
    }

    if (
      'right' in node
      && node.right !== undefined
      && typeof node.right === 'object'
      && 'type' in node.right
    ) {
      count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(node.right);
    }

    if (
      'consequent' in node
      && node.consequent !== undefined
      && typeof node.consequent === 'object'
      && node.consequent !== null
      && 'type' in node.consequent
    ) {
      count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(node.consequent);
    }

    if (
      'alternate' in node
      && node.alternate !== undefined
      && node.alternate !== null
      && typeof node.alternate === 'object'
      && 'type' in node.alternate
    ) {
      count += RulesEslintFormattingNoComplexArrowConcise.countNestedArrows(node.alternate);
    }

    return count;
  }
}

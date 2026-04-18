import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintConventionsNoImplicitBooleanCheckConditionContext,
  RulesEslintConventionsNoImplicitBooleanCheckConditionNode,
  RulesEslintConventionsNoImplicitBooleanCheckConditionReturns,
  RulesEslintConventionsNoImplicitBooleanCheckConditionTest,
  RulesEslintConventionsNoImplicitBooleanCheckNegationContext,
  RulesEslintConventionsNoImplicitBooleanCheckNegationNode,
  RulesEslintConventionsNoImplicitBooleanCheckNegationReturns,
  RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanArgument,
  RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanNode,
  RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanReturns,
  RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestCurrent,
  RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestNode,
  RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestReturns,
  RulesEslintConventionsNoImplicitBooleanReportImplicitNodesContext,
  RulesEslintConventionsNoImplicitBooleanReportImplicitNodesReturns,
  RulesEslintConventionsNoImplicitBooleanReportImplicitNodesTest,
  RulesEslintConventionsNoImplicitBooleanRuleDefaultOptionsIgnoreFiles,
  RulesEslintConventionsNoImplicitBooleanRuleOptions,
} from '../../../types/rules/eslint/conventions/no-implicit-boolean.d.ts';

/**
 * Rules - ESLint - Conventions - No Implicit Boolean.
 *
 * Requires explicit boolean comparisons in conditions instead of relying on truthy/falsy
 * coercion, making each check unambiguous.
 *
 * @since 0.14.0
 */
export class RulesEslintConventionsNoImplicitBoolean {
  /**
   * Rules - ESLint - Conventions - No Implicit Boolean - Rule.
   *
   * Registered as a custom ESLint rule in the eslint config. Visits
   * condition-bearing statements and standalone negations to detect implicit coercion.
   *
   * @since 0.14.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-implicit-boolean',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require explicit boolean comparisons instead of relying on truthy/falsy coercion.',
      },
      messages: {
        requireExplicitCheck: 'Use an explicit comparison instead of relying on truthy/falsy coercion (e.g., `=== undefined`, `=== true`, `> 0`).',
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
      ignoreFiles: [] as RulesEslintConventionsNoImplicitBooleanRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintConventionsNoImplicitBooleanRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        IfStatement(node) {
          RulesEslintConventionsNoImplicitBoolean.checkCondition(context, node);

          return;
        },
        WhileStatement(node) {
          RulesEslintConventionsNoImplicitBoolean.checkCondition(context, node);

          return;
        },
        DoWhileStatement(node) {
          RulesEslintConventionsNoImplicitBoolean.checkCondition(context, node);

          return;
        },
        ForStatement(node) {
          RulesEslintConventionsNoImplicitBoolean.checkCondition(context, node);

          return;
        },
        ConditionalExpression(node) {
          RulesEslintConventionsNoImplicitBoolean.checkCondition(context, node);

          return;
        },
        UnaryExpression(node) {
          RulesEslintConventionsNoImplicitBoolean.checkNegation(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - No Implicit Boolean - Check Condition.
   *
   * Shared by if, while, do-while, for, and ternary visitors to extract the test expression
   * and delegate to reportImplicitNodes.
   *
   * @private
   *
   * @param {RulesEslintConventionsNoImplicitBooleanCheckConditionContext} context - Context.
   * @param {RulesEslintConventionsNoImplicitBooleanCheckConditionNode}    node    - Node.
   *
   * @returns {RulesEslintConventionsNoImplicitBooleanCheckConditionReturns}
   *
   * @since 0.14.0
   */
  private static checkCondition(context: RulesEslintConventionsNoImplicitBooleanCheckConditionContext, node: RulesEslintConventionsNoImplicitBooleanCheckConditionNode): RulesEslintConventionsNoImplicitBooleanCheckConditionReturns {
    const test: RulesEslintConventionsNoImplicitBooleanCheckConditionTest = node.test;

    if (test === undefined || test === null) {
      return;
    }

    RulesEslintConventionsNoImplicitBoolean.reportImplicitNodes(context, test);

    return;
  }

  /**
   * Rules - ESLint - Conventions - No Implicit Boolean - Check Negation.
   *
   * Called by the UnaryExpression visitor to catch negations outside
   * condition tests, such as standalone "if (!value)" patterns in assignments.
   *
   * @private
   *
   * @param {RulesEslintConventionsNoImplicitBooleanCheckNegationContext} context - Context.
   * @param {RulesEslintConventionsNoImplicitBooleanCheckNegationNode}    node    - Node.
   *
   * @returns {RulesEslintConventionsNoImplicitBooleanCheckNegationReturns}
   *
   * @since 0.15.0
   */
  private static checkNegation(context: RulesEslintConventionsNoImplicitBooleanCheckNegationContext, node: RulesEslintConventionsNoImplicitBooleanCheckNegationNode): RulesEslintConventionsNoImplicitBooleanCheckNegationReturns {
    if (node.operator !== '!') {
      return;
    }

    // Skip if already inside a condition test (handled by condition visitors).
    if (RulesEslintConventionsNoImplicitBoolean.isInsideConditionTest(node) === true) {
      return;
    }

    if (RulesEslintConventionsNoImplicitBoolean.isImplicitBoolean(node) === true) {
      context.report({
        node,
        messageId: 'requireExplicitCheck',
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Conventions - No Implicit Boolean - Is Inside Condition Test.
   *
   * Used by checkNegation to avoid double-reporting negations that already appear inside a
   * condition test handled by the condition visitors.
   *
   * @private
   *
   * @param {RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestNode} node - Node.
   *
   * @returns {RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestReturns}
   *
   * @since 0.15.0
   */
  private static isInsideConditionTest(node: RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestNode): RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestReturns {
    let current: RulesEslintConventionsNoImplicitBooleanIsInsideConditionTestCurrent = node.parent;

    while (current !== undefined && current !== null) {
      if (
        (
          current.type === 'IfStatement'
          || current.type === 'WhileStatement'
          || current.type === 'DoWhileStatement'
          || current.type === 'ForStatement'
          || current.type === 'ConditionalExpression'
        )
        && 'test' in current
        && current.test !== undefined
        && current.test !== null
      ) {
        return true;
      }

      current = current.parent;
    }

    return false;
  }

  /**
   * Rules - ESLint - Conventions - No Implicit Boolean - Is Implicit Boolean.
   *
   * Returns true for node types that rely on truthy or falsy coercion: identifiers, member
   * expressions, call expressions, awaits, and negations thereof.
   *
   * @private
   *
   * @param {RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanNode} node - Node.
   *
   * @returns {RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanReturns}
   *
   * @since 0.14.0
   */
  private static isImplicitBoolean(node: RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanNode): RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanReturns {
    // Bare identifier (e.g., `value`).
    if (node.type === 'Identifier') {
      return true;
    }

    // Member expression (e.g., `items.length`).
    if (node.type === 'MemberExpression') {
      return true;
    }

    // Call expression (e.g., `getValue()`, `Array.isArray(x)`).
    if (node.type === 'CallExpression') {
      return true;
    }

    // Await expression (e.g., `await pathExists(p)`).
    if (node.type === 'AwaitExpression') {
      return RulesEslintConventionsNoImplicitBoolean.isImplicitBoolean(node.argument);
    }

    // Negated expression (e.g., `!value`, `!items.length`, `!fn()`).
    if (node.type === 'UnaryExpression' && node.operator === '!') {
      const argument: RulesEslintConventionsNoImplicitBooleanIsImplicitBooleanArgument = node.argument;

      return argument.type === 'Identifier'
        || argument.type === 'MemberExpression'
        || argument.type === 'CallExpression'
        || argument.type === 'AwaitExpression';
    }

    return false;
  }

  /**
   * Rules - ESLint - Conventions - No Implicit Boolean - Report Implicit Nodes.
   *
   * Recursively walks logical expression operands and
   * reports each leaf node that uses implicit boolean coercion.
   *
   * @private
   *
   * @param {RulesEslintConventionsNoImplicitBooleanReportImplicitNodesContext} context - Context.
   * @param {RulesEslintConventionsNoImplicitBooleanReportImplicitNodesTest}    test    - Test.
   *
   * @returns {RulesEslintConventionsNoImplicitBooleanReportImplicitNodesReturns}
   *
   * @since 0.14.0
   */
  private static reportImplicitNodes(context: RulesEslintConventionsNoImplicitBooleanReportImplicitNodesContext, test: RulesEslintConventionsNoImplicitBooleanReportImplicitNodesTest): RulesEslintConventionsNoImplicitBooleanReportImplicitNodesReturns {
    // For logical expressions, check each operand recursively.
    if (test.type === 'LogicalExpression') {
      RulesEslintConventionsNoImplicitBoolean.reportImplicitNodes(context, test.left);
      RulesEslintConventionsNoImplicitBoolean.reportImplicitNodes(context, test.right);

      return;
    }

    if (RulesEslintConventionsNoImplicitBoolean.isImplicitBoolean(test) === true) {
      context.report({
        node: test,
        messageId: 'requireExplicitCheck',
      });
    }

    return;
  }
}

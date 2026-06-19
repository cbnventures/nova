import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Context,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Test,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Context,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ConditionalExpression_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ConditionalExpression_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_DoWhileStatement_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_DoWhileStatement_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ForStatement_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ForStatement_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_IfStatement_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_IfStatement_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_Options,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_UnaryExpression_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_UnaryExpression_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_WhileStatement_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_WhileStatement_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Argument,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Current,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Node,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Context,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Returns,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Test,
  Rules_Eslint_Conventions_NoImplicitBoolean_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/conventions/no-implicit-boolean.d.ts';

/**
 * Rules - ESLint - Conventions - No Implicit Boolean.
 *
 * Requires explicit boolean comparisons in conditions instead of relying on truthy/falsy
 * coercion, making each check unambiguous.
 *
 * @since 0.14.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Conventions_NoImplicitBoolean_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        IfStatement(node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_IfStatement_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_IfStatement_Returns {
          Runner.checkCondition(context, node);

          return;
        },
        WhileStatement(node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_WhileStatement_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_WhileStatement_Returns {
          Runner.checkCondition(context, node);

          return;
        },
        DoWhileStatement(node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_DoWhileStatement_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_DoWhileStatement_Returns {
          Runner.checkCondition(context, node);

          return;
        },
        ForStatement(node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ForStatement_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ForStatement_Returns {
          Runner.checkCondition(context, node);

          return;
        },
        ConditionalExpression(node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ConditionalExpression_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_ConditionalExpression_Returns {
          Runner.checkCondition(context, node);

          return;
        },
        UnaryExpression(node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_UnaryExpression_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_Create_UnaryExpression_Returns {
          Runner.checkNegation(context, node);

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
   * @param {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Context} context - Context.
   * @param {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Returns}
   *
   * @since 0.14.0
   */
  private static checkCondition(context: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Context, node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Returns {
    const test: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckCondition_Test = node.test;

    if (test === undefined || test === null) {
      return;
    }

    Runner.reportImplicitNodes(context, test);

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
   * @param {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Context} context - Context.
   * @param {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Returns}
   *
   * @since 0.15.0
   */
  private static checkNegation(context: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Context, node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_CheckNegation_Returns {
    if (node.operator !== '!') {
      return;
    }

    // Skip if already inside a condition test (handled by condition visitors).
    if (Runner.isInsideConditionTest(node) === true) {
      return;
    }

    if (Runner.isImplicitBoolean(node) === true) {
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
   * @param {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Node} node - Node.
   *
   * @returns {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Returns}
   *
   * @since 0.15.0
   */
  private static isInsideConditionTest(node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Returns {
    let current: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsInsideConditionTest_Current = node.parent;

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
   * @param {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Node} node - Node.
   *
   * @returns {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Returns}
   *
   * @since 0.14.0
   */
  private static isImplicitBoolean(node: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Node): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Returns {
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
      return Runner.isImplicitBoolean(node.argument);
    }

    // Negated expression (e.g., `!value`, `!items.length`, `!fn()`).
    if (node.type === 'UnaryExpression' && node.operator === '!') {
      const argument: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_IsImplicitBoolean_Argument = node.argument;

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
   * @param {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Context} context - Context.
   * @param {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Test}    test    - Test.
   *
   * @returns {Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Returns}
   *
   * @since 0.14.0
   */
  private static reportImplicitNodes(context: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Context, test: Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Test): Rules_Eslint_Conventions_NoImplicitBoolean_Runner_ReportImplicitNodes_Returns {
    // For logical expressions, check each operand recursively.
    if (test.type === 'LogicalExpression') {
      Runner.reportImplicitNodes(context, test.left);
      Runner.reportImplicitNodes(context, test.right);

      return;
    }

    if (Runner.isImplicitBoolean(test) === true) {
      context.report({
        node: test,
        messageId: 'requireExplicitCheck',
      });
    }

    return;
  }
}

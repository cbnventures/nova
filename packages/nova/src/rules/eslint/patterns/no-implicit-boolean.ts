import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoImplicitBooleanCheckConditionNode,
  NoImplicitBooleanCheckConditionReturns,
  NoImplicitBooleanIsImplicitBooleanNode,
  NoImplicitBooleanIsImplicitBooleanReturns,
  NoImplicitBooleanReportImplicitNodesReturns,
  NoImplicitBooleanReportImplicitNodesTest,
} from '@/types/rules/eslint/patterns/no-implicit-boolean.d.ts';

/**
 * No implicit boolean.
 *
 * @since 1.0.0
 */
const noImplicitBoolean = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-implicit-boolean',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Require explicit boolean comparisons instead of relying on truthy/falsy coercion.',
    },
    messages: {
      requireExplicitCheck: 'Use an explicit comparison instead of relying on truthy/falsy coercion (e.g., `=== undefined`, `=== true`, `> 0`).',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * No implicit boolean - Is implicit boolean.
     *
     * @param {NoImplicitBooleanIsImplicitBooleanNode} node - Node.
     *
     * @returns {NoImplicitBooleanIsImplicitBooleanReturns}
     *
     * @since 1.0.0
     */
    const isImplicitBoolean = (node: NoImplicitBooleanIsImplicitBooleanNode): NoImplicitBooleanIsImplicitBooleanReturns => {
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

      // Negated expression (e.g., `!value`, `!items.length`, `!fn()`).
      if (node.type === 'UnaryExpression' && node.operator === '!') {
        const argument = node.argument;

        return argument.type === 'Identifier' || argument.type === 'MemberExpression' || argument.type === 'CallExpression';
      }

      return false;
    };

    /**
     * No implicit boolean - Report implicit nodes.
     *
     * @param {NoImplicitBooleanReportImplicitNodesTest} test - Test.
     *
     * @returns {NoImplicitBooleanReportImplicitNodesReturns}
     *
     * @since 1.0.0
     */
    const reportImplicitNodes = (test: NoImplicitBooleanReportImplicitNodesTest): NoImplicitBooleanReportImplicitNodesReturns => {
      // For logical expressions, check each operand recursively.
      if (test.type === 'LogicalExpression') {
        reportImplicitNodes(test.left);
        reportImplicitNodes(test.right);

        return;
      }

      if (isImplicitBoolean(test) === true) {
        context.report({
          node: test,
          messageId: 'requireExplicitCheck',
        });
      }
    };

    /**
     * No implicit boolean - Check condition.
     *
     * @param {NoImplicitBooleanCheckConditionNode} node - Statement node.
     *
     * @returns {NoImplicitBooleanCheckConditionReturns}
     *
     * @since 1.0.0
     */
    const checkCondition = (node: NoImplicitBooleanCheckConditionNode): NoImplicitBooleanCheckConditionReturns => {
      const test = node.type === 'ForStatement' ? node.test : node.test;

      if (test == null) {
        return;
      }

      reportImplicitNodes(test);
    };

    return {
      IfStatement: checkCondition,
      WhileStatement: checkCondition,
      DoWhileStatement: checkCondition,
      ForStatement: checkCondition,
      ConditionalExpression: checkCondition,
    };
  },
});

export default noImplicitBoolean;

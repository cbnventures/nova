import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoAssignThenReturnCheckReturnNode,
  NoAssignThenReturnCheckReturnReturns,
} from '@/types/rules/eslint/patterns/no-assign-then-return.d.ts';

/**
 * No assign then return.
 *
 * @since 1.0.0
 */
const noAssignThenReturn = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-assign-then-return',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow assigning to a variable and immediately returning it.',
    },
    messages: {
      returnDirectly: 'Return the expression directly instead of assigning to an intermediate variable.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * No assign then return - Check return.
     *
     * @param {NoAssignThenReturnCheckReturnNode} node - Return statement node.
     *
     * @returns {NoAssignThenReturnCheckReturnReturns}
     *
     * @since 1.0.0
     */
    const checkReturn = (node: NoAssignThenReturnCheckReturnNode): NoAssignThenReturnCheckReturnReturns => {
      const argument = node.argument;

      // Only check returns that return an identifier.
      if (argument == null || argument.type !== 'Identifier') {
        return;
      }

      const parent = node.parent;

      if (parent == null || (parent.type !== 'BlockStatement' && parent.type !== 'Program')) {
        return;
      }

      const body = parent.body;
      const nodeIndex = body.indexOf(node);

      if (nodeIndex < 1) {
        return;
      }

      const prevStatement = body[nodeIndex - 1];

      if (prevStatement === undefined || prevStatement.type !== 'VariableDeclaration' || prevStatement.kind !== 'const') {
        return;
      }

      const declarations = prevStatement.declarations;

      if (declarations.length !== 1) {
        return;
      }

      const declarator = declarations[0];

      if (declarator === undefined) {
        return;
      }

      if (declarator.id.type === 'Identifier' && declarator.id.name === argument.name) {
        context.report({
          node,
          messageId: 'returnDirectly',
        });
      }
    };

    return {
      ReturnStatement: checkReturn,
    };
  },
});

export default noAssignThenReturn;

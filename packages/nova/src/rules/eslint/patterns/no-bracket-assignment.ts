import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoBracketAssignmentCheckAssignmentNode,
  NoBracketAssignmentCheckAssignmentReturns,
} from '@/types/rules/eslint/patterns/no-bracket-assignment.d.ts';

/**
 * No bracket assignment.
 *
 * @since 1.0.0
 */
const noBracketAssignment = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-bracket-assignment',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow bracket notation assignment. Use `Reflect.set()` instead.',
    },
    messages: {
      useReflectSet: 'Use `Reflect.set(target, key, value)` instead of bracket assignment.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * No bracket assignment - Check assignment.
     *
     * @param {NoBracketAssignmentCheckAssignmentNode} node - Assignment expression node.
     *
     * @returns {NoBracketAssignmentCheckAssignmentReturns}
     *
     * @since 1.0.0
     */
    const checkAssignment = (node: NoBracketAssignmentCheckAssignmentNode): NoBracketAssignmentCheckAssignmentReturns => {
      const left = node.left;

      if (left.type === 'MemberExpression' && left.computed === true) {
        context.report({
          node,
          messageId: 'useReflectSet',
        });
      }
    };

    return {
      AssignmentExpression: checkAssignment,
    };
  },
});

export default noBracketAssignment;

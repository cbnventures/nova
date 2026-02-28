import { ESLintUtils } from '@typescript-eslint/utils';

import type { SwitchCaseBlocksCheckCaseNode, SwitchCaseBlocksCheckCaseReturns } from '@/types/rules/eslint/switch-case-blocks.d.ts';

/**
 * Switch case blocks.
 *
 * @since 1.0.0
 */
const switchCaseBlocks = ESLintUtils.RuleCreator(() => '#')({
  name: 'switch-case-blocks',
  meta: {
    type: 'layout',
    docs: {
      description: 'Require each switch case to wrap its statements in a block (e.g., "case x: { ... }").',
    },
    messages: {
      requireBlock: 'Wrap this switch case body in a block.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * Switch case blocks - Check case.
     *
     * @param {SwitchCaseBlocksCheckCaseNode} node - Switch case node.
     *
     * @returns {SwitchCaseBlocksCheckCaseReturns}
     *
     * @since 1.0.0
     */
    const checkCase = (node: SwitchCaseBlocksCheckCaseNode): SwitchCaseBlocksCheckCaseReturns => {
      const { consequent } = node;

      // Allow empty cases (fallthrough handled explicitly by author).
      if (consequent.length === 0) {
        return;
      }

      // Valid when the case has exactly one BlockStatement.
      const [firstConsequent] = consequent;

      if (consequent.length === 1 && firstConsequent !== undefined && firstConsequent.type === 'BlockStatement') {
        return;
      }

      context.report({
        node,
        messageId: 'requireBlock',
      });
    };

    return {
      SwitchCase: checkCase,
    };
  },
});

export default switchCaseBlocks;

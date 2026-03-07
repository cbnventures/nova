import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoTernaryInTemplateLiteralCheckTemplateLiteralNode,
  NoTernaryInTemplateLiteralCheckTemplateLiteralReturns,
} from '@/types/rules/eslint/patterns/no-ternary-in-template-literal.d.ts';

/**
 * No ternary in template literal.
 *
 * @since 1.0.0
 */
const noTernaryInTemplateLiteral = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-ternary-in-template-literal',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow ternary expressions inside template literals.',
    },
    messages: {
      noTernaryInTemplate: 'Do not use ternary expressions inside template literals. Extract the ternary into a variable first.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * No ternary in template literal - Check template literal.
     *
     * @param {NoTernaryInTemplateLiteralCheckTemplateLiteralNode} node - Template literal node.
     *
     * @returns {NoTernaryInTemplateLiteralCheckTemplateLiteralReturns}
     *
     * @since 1.0.0
     */
    const checkTemplateLiteral = (node: NoTernaryInTemplateLiteralCheckTemplateLiteralNode): NoTernaryInTemplateLiteralCheckTemplateLiteralReturns => {
      for (const expression of node.expressions) {
        if (expression.type === 'ConditionalExpression') {
          context.report({
            node: expression,
            messageId: 'noTernaryInTemplate',
          });
        }
      }
    };

    return {
      TemplateLiteral: checkTemplateLiteral,
    };
  },
});

export default noTernaryInTemplateLiteral;

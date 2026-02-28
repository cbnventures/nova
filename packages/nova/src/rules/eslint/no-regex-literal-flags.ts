import { ESLintUtils } from '@typescript-eslint/utils';

import type { NoRegexLiteralFlagsCheckLiteralNode, NoRegexLiteralFlagsCheckLiteralReturns } from '@/types/rules/eslint/no-regex-literal-flags.d.ts';

/**
 * No regex literal flags.
 *
 * @since 1.0.0
 */
const noRegexLiteralFlags = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-regex-literal-flags',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow flags on regex literals. Add flags at the call site via new RegExp(pattern, flags) instead.',
    },
    messages: {
      noRegexFlags: 'Do not use flags on regex literals. Add flags at the call site via new RegExp(pattern, flags) instead.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * No regex literal flags - Check literal.
     *
     * @param {NoRegexLiteralFlagsCheckLiteralNode} node - Literal node.
     *
     * @returns {NoRegexLiteralFlagsCheckLiteralReturns}
     *
     * @since 1.0.0
     */
    const checkLiteral = (node: NoRegexLiteralFlagsCheckLiteralNode): NoRegexLiteralFlagsCheckLiteralReturns => {
      if ('regex' in node && node.regex !== undefined && node.regex.flags.length > 0) {
        context.report({
          node,
          messageId: 'noRegexFlags',
        });
      }
    };

    return {
      Literal: checkLiteral,
    };
  },
});

export default noRegexLiteralFlags;

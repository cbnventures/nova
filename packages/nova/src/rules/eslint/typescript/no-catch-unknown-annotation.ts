import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoCatchUnknownAnnotationCheckCatchClauseNode,
  NoCatchUnknownAnnotationCheckCatchClauseReturns,
} from '@/types/rules/eslint/typescript/no-catch-unknown-annotation.d.ts';

/**
 * No catch unknown annotation.
 *
 * @since 1.0.0
 */
const noCatchUnknownAnnotation = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-catch-unknown-annotation',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow redundant `: unknown` annotation on catch clause variables.',
    },
    messages: {
      removeCatchAnnotation: 'Remove the redundant `: unknown` annotation. TypeScript defaults catch variables to `unknown`.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    /**
     * No catch unknown annotation - Check catch clause.
     *
     * @param {NoCatchUnknownAnnotationCheckCatchClauseNode} node - Catch clause node.
     *
     * @returns {NoCatchUnknownAnnotationCheckCatchClauseReturns}
     *
     * @since 1.0.0
     */
    const checkCatchClause = (node: NoCatchUnknownAnnotationCheckCatchClauseNode): NoCatchUnknownAnnotationCheckCatchClauseReturns => {
      const param = node.param;

      if (param == null) {
        return;
      }

      const typeAnnotation = param.typeAnnotation;

      if (typeAnnotation === undefined) {
        return;
      }

      if (typeAnnotation.typeAnnotation.type === 'TSUnknownKeyword') {
        context.report({
          node: typeAnnotation,
          messageId: 'removeCatchAnnotation',
        });
      }
    };

    return {
      CatchClause: checkCatchClause,
    };
  },
});

export default noCatchUnknownAnnotation;

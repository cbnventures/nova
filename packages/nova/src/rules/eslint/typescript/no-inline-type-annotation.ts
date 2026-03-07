import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoInlineTypeAnnotationCheckTypeAnnotationNode,
  NoInlineTypeAnnotationCheckTypeAnnotationReturns,
} from '@/types/rules/eslint/typescript/no-inline-type-annotation.d.ts';

/**
 * No inline type annotation.
 *
 * @since 1.0.0
 */
const noInlineTypeAnnotation = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-inline-type-annotation',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow inline type annotations in code files. Extract the type to a named alias in a `.d.ts` file.',
    },
    messages: {
      useNamedType: 'Do not use inline type annotations in code files. Extract the type to a named alias in a `.d.ts` file.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const normalizedFilename = context.filename.replaceAll('\\', '/');

    // Skip .d.ts files — inline types are allowed in type definition files.
    if (normalizedFilename.endsWith('.d.ts')) {
      return {};
    }

    /**
     * No inline type annotation - Check type annotation.
     *
     * @param {NoInlineTypeAnnotationCheckTypeAnnotationNode} node - Type annotation node.
     *
     * @returns {NoInlineTypeAnnotationCheckTypeAnnotationReturns}
     *
     * @since 1.0.0
     */
    const checkTypeAnnotation = (node: NoInlineTypeAnnotationCheckTypeAnnotationNode): NoInlineTypeAnnotationCheckTypeAnnotationReturns => {
      const typeNode = node.typeAnnotation;

      // Allow TSTypeReference without typeArguments (e.g., `: MyType`).
      if (typeNode.type === 'TSTypeReference' && typeNode.typeArguments === undefined) {
        return;
      }

      context.report({
        node: typeNode,
        messageId: 'useNamedType',
      });
    };

    return {
      TSTypeAnnotation: checkTypeAnnotation,
    };
  },
});

export default noInlineTypeAnnotation;

import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoRegexLiteralsCheckLiteralNode,
  NoRegexLiteralsCheckLiteralReturns,
  NoRegexLiteralsDefaultOptionsAllowedFiles,
} from '@/types/rules/eslint/no-regex-literals.d.ts';

/**
 * No regex literals.
 *
 * @since 1.0.0
 */
const noRegexLiterals = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-regex-literals',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow regex literal expressions. Centralize patterns in a shared patterns file instead.',
    },
    messages: {
      noRegexLiteral: 'Do not use regex literals inline. Centralize patterns in a shared patterns file and import from there.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          allowedFiles: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{
    allowedFiles: [] as NoRegexLiteralsDefaultOptionsAllowedFiles,
  }],
  create(context, [options]) {
    const allowedFiles = options.allowedFiles;
    const normalizedFilename = context.filename.replaceAll('\\', '/');

    // Skip files that match an allowed pattern (exact match or path suffix).
    const isAllowed = allowedFiles.some((pattern) => {
      const normalizedPattern = pattern.replaceAll('\\', '/');

      return normalizedFilename === normalizedPattern
        || normalizedFilename.endsWith(`/${normalizedPattern}`);
    });

    if (isAllowed === true) {
      return {};
    }

    /**
     * No regex literals - Check literal.
     *
     * @param {NoRegexLiteralsCheckLiteralNode} node - Literal node.
     *
     * @returns {NoRegexLiteralsCheckLiteralReturns}
     *
     * @since 1.0.0
     */
    const checkLiteral = (node: NoRegexLiteralsCheckLiteralNode): NoRegexLiteralsCheckLiteralReturns => {
      if ('regex' in node && node.regex !== undefined) {
        context.report({
          node,
          messageId: 'noRegexLiteral',
        });
      }
    };

    return {
      Literal: checkLiteral,
    };
  },
});

export default noRegexLiterals;

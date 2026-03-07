import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoSharedTypeImportCheckImportNode,
  NoSharedTypeImportCheckImportReturns,
  NoSharedTypeImportDefaultOptionsSharedFiles,
} from '@/types/rules/eslint/typescript/no-shared-type-import.d.ts';

/**
 * No shared type import.
 *
 * @since 1.0.0
 */
const noSharedTypeImport = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-shared-type-import',
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow importing shared type files in code files. Shared types should only be imported by `.d.ts` files.',
    },
    messages: {
      noSharedTypeImport: 'Do not import from shared type files in code files. Import from the domain `.d.ts` file instead.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          sharedFiles: {
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
    sharedFiles: [] as NoSharedTypeImportDefaultOptionsSharedFiles,
  }],
  create(context, [options]) {
    const sharedFiles = options.sharedFiles;
    const normalizedFilename = context.filename.replaceAll('\\', '/');

    // Skip .d.ts files — they are allowed to import shared types.
    if (normalizedFilename.endsWith('.d.ts')) {
      return {};
    }

    /**
     * No shared type import - Check import.
     *
     * @param {NoSharedTypeImportCheckImportNode} node - Import node.
     *
     * @returns {NoSharedTypeImportCheckImportReturns}
     *
     * @since 1.0.0
     */
    const checkImport = (node: NoSharedTypeImportCheckImportNode): NoSharedTypeImportCheckImportReturns => {
      const source = node.source.value;
      const normalizedSource = source.replaceAll('\\', '/');

      const isShared = sharedFiles.some((sharedFile) => {
        const normalizedSharedFile = sharedFile.replaceAll('\\', '/');

        return normalizedSource === normalizedSharedFile
          || normalizedSource.endsWith(`/${normalizedSharedFile}`);
      });

      if (isShared === true) {
        context.report({
          node,
          messageId: 'noSharedTypeImport',
        });
      }
    };

    return {
      ImportDeclaration: checkImport,
    };
  },
});

export default noSharedTypeImport;

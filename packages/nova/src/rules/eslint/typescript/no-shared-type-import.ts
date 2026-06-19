import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Context,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_IsShared,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Node,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_NormalizedSharedFile,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_NormalizedSource,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Returns,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_SharedFiles,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Source,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_ImportDeclaration_Node,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_ImportDeclaration_Returns,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_NormalizedFilename,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_Options,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Typescript_NoSharedTypeImport_Runner_RuleDefaultOptionsSharedFiles,
} from '../../../types/rules/eslint/typescript/no-shared-type-import.d.ts';

/**
 * Rules - ESLint - TypeScript - No Shared Type Import.
 *
 * Prevents code files from importing shared type files directly. Only .d.ts files may import
 * from shared.d.ts to keep the type dependency graph one-directional.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * Rules - ESLint - TypeScript - No Shared Type Import - Rule.
   *
   * Registered under the name no-shared-type-import and exported through the rules index as
   * NoSharedTypeImport for preset consumption.
   *
   * @since 0.14.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-shared-type-import',
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow importing shared type files in code files. Shared types should only be imported by `.d.ts` files.',
      },
      messages: {
        noSharedTypeImport: 'Do not import from shared type files in code files. Import from the domain `.d.ts` file instead.',
      },
      schema: [{
        type: 'object',
        properties: {
          ignoreFiles: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          sharedFiles: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      ignoreFiles: [] as Rules_Eslint_Typescript_NoSharedTypeImport_Runner_RuleDefaultOptionsIgnoreFiles,
      sharedFiles: [] as Rules_Eslint_Typescript_NoSharedTypeImport_Runner_RuleDefaultOptionsSharedFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_Options = defaultOptions[0];
      const normalizedFilename: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_NormalizedFilename = context.filename.replaceAll('\\', '/');

      // Skip .d.ts files - they are allowed to import shared types.
      if (normalizedFilename.endsWith('.d.ts') === true) {
        return {};
      }

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ImportDeclaration(node: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_ImportDeclaration_Node): Rules_Eslint_Typescript_NoSharedTypeImport_Runner_Create_ImportDeclaration_Returns {
          Runner.checkImport(context, node, options['sharedFiles']);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - TypeScript - No Shared Type Import - Check Import.
   *
   * Normalizes the import source path and compares
   * it against the configured sharedFiles list to determine
   * whether the import should be flagged.
   *
   * @private
   *
   * @param {Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Context}     context     - Context.
   * @param {Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Node}        node        - Node.
   * @param {Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_SharedFiles} sharedFiles - Shared files.
   *
   * @returns {Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Returns}
   *
   * @since 0.14.0
   */
  private static checkImport(context: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Context, node: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Node, sharedFiles: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_SharedFiles): Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Returns {
    const source: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_Source = node.source.value;
    const normalizedSource: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_NormalizedSource = source.replaceAll('\\', '/');

    const isShared: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_IsShared = sharedFiles.some((sharedFile) => {
      const normalizedSharedFile: Rules_Eslint_Typescript_NoSharedTypeImport_Runner_CheckImport_NormalizedSharedFile = sharedFile.replaceAll('\\', '/');

      return normalizedSource === normalizedSharedFile
        || normalizedSource.endsWith(`/${normalizedSharedFile}`);
    });

    if (isShared === true) {
      context.report({
        node,
        messageId: 'noSharedTypeImport',
      });
    }

    return;
  }
}

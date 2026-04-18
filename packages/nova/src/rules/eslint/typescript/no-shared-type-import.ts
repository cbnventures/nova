import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintTypescriptNoSharedTypeImportCheckImportContext,
  RulesEslintTypescriptNoSharedTypeImportCheckImportIsShared,
  RulesEslintTypescriptNoSharedTypeImportCheckImportNode,
  RulesEslintTypescriptNoSharedTypeImportCheckImportNormalizedSharedFile,
  RulesEslintTypescriptNoSharedTypeImportCheckImportNormalizedSource,
  RulesEslintTypescriptNoSharedTypeImportCheckImportReturns,
  RulesEslintTypescriptNoSharedTypeImportCheckImportSharedFiles,
  RulesEslintTypescriptNoSharedTypeImportCheckImportSource,
  RulesEslintTypescriptNoSharedTypeImportRuleDefaultOptionsIgnoreFiles,
  RulesEslintTypescriptNoSharedTypeImportRuleDefaultOptionsSharedFiles,
  RulesEslintTypescriptNoSharedTypeImportRuleNormalizedFilename,
  RulesEslintTypescriptNoSharedTypeImportRuleOptions,
} from '../../../types/rules/eslint/typescript/no-shared-type-import.d.ts';

/**
 * Rules - ESLint - TypeScript - No Shared Type Import.
 *
 * Prevents code files from importing shared type files directly. Only .d.ts files may import
 * from shared.d.ts to keep the type dependency graph one-directional.
 *
 * @since 0.14.0
 */
export class RulesEslintTypescriptNoSharedTypeImport {
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
      ignoreFiles: [] as RulesEslintTypescriptNoSharedTypeImportRuleDefaultOptionsIgnoreFiles,
      sharedFiles: [] as RulesEslintTypescriptNoSharedTypeImportRuleDefaultOptionsSharedFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintTypescriptNoSharedTypeImportRuleOptions = defaultOptions[0];
      const normalizedFilename: RulesEslintTypescriptNoSharedTypeImportRuleNormalizedFilename = context.filename.replaceAll('\\', '/');

      // Skip .d.ts files — they are allowed to import shared types.
      if (normalizedFilename.endsWith('.d.ts') === true) {
        return {};
      }

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ImportDeclaration(node) {
          RulesEslintTypescriptNoSharedTypeImport.checkImport(context, node, options['sharedFiles']);

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
   * @param {RulesEslintTypescriptNoSharedTypeImportCheckImportContext}     context     - Context.
   * @param {RulesEslintTypescriptNoSharedTypeImportCheckImportNode}        node        - Node.
   * @param {RulesEslintTypescriptNoSharedTypeImportCheckImportSharedFiles} sharedFiles - Shared files.
   *
   * @returns {RulesEslintTypescriptNoSharedTypeImportCheckImportReturns}
   *
   * @since 0.14.0
   */
  private static checkImport(context: RulesEslintTypescriptNoSharedTypeImportCheckImportContext, node: RulesEslintTypescriptNoSharedTypeImportCheckImportNode, sharedFiles: RulesEslintTypescriptNoSharedTypeImportCheckImportSharedFiles): RulesEslintTypescriptNoSharedTypeImportCheckImportReturns {
    const source: RulesEslintTypescriptNoSharedTypeImportCheckImportSource = node.source.value;
    const normalizedSource: RulesEslintTypescriptNoSharedTypeImportCheckImportNormalizedSource = source.replaceAll('\\', '/');

    const isShared: RulesEslintTypescriptNoSharedTypeImportCheckImportIsShared = sharedFiles.some((sharedFile) => {
      const normalizedSharedFile: RulesEslintTypescriptNoSharedTypeImportCheckImportNormalizedSharedFile = sharedFile.replaceAll('\\', '/');

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

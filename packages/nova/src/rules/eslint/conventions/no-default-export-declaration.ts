import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationContext,
  RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationDeclarationText,
  RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationName,
  RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationNode,
  RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationReturns,
  RulesEslintConventionsNoDefaultExportDeclarationRuleDefaultOptionsIgnoreFiles,
  RulesEslintConventionsNoDefaultExportDeclarationRuleOptions,
} from '../../../types/rules/eslint/conventions/no-default-export-declaration.d.ts';

/**
 * Rules - ESLint - Conventions - No Default Export Declaration.
 *
 * Prevents attaching function or class declarations to export default.
 * The declaration should be defined first, then exported by name at the bottom.
 *
 * @since 0.15.0
 */
export class RulesEslintConventionsNoDefaultExportDeclaration {
  /**
   * Rules - ESLint - Conventions - No Default Export Declaration - Rule.
   *
   * Registered under the name no-default-export-declaration
   * and exported through the rules index for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-default-export-declaration',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow attaching declarations to default exports. Declare first, then export default at the bottom.',
      },
      fixable: 'code',
      messages: {
        noDefaultExportDeclaration: 'Declare \'{{ name }}\' first, then use \'export default {{ name }};\' at the bottom of the file.',
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
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      ignoreFiles: [] as RulesEslintConventionsNoDefaultExportDeclarationRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintConventionsNoDefaultExportDeclarationRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ExportDefaultDeclaration(node) {
          RulesEslintConventionsNoDefaultExportDeclaration.checkExportDefaultDeclaration(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - No Default Export Declaration - Check Export Default Declaration.
   *
   * Only flags named function and class declarations attached
   * to export default and provides an auto-fix that separates the declaration from export.
   *
   * @private
   *
   * @param {RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationContext} context - Context.
   * @param {RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationNode}    node    - Node.
   *
   * @returns {RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationReturns}
   *
   * @since 0.15.0
   */
  private static checkExportDefaultDeclaration(context: RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationContext, node: RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationNode): RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationReturns {
    // Only flag function and class declarations attached to export default.
    if (
      node['declaration']['type'] !== 'FunctionDeclaration'
      && node['declaration']['type'] !== 'ClassDeclaration'
    ) {
      return;
    }

    const name: RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationName = ('id' in node['declaration'] && node['declaration']['id'] !== null) ? node['declaration']['id']['name'] : 'anonymous';

    // Skip anonymous declarations — cannot be separated.
    if (name === 'anonymous') {
      return;
    }

    context.report({
      node,
      messageId: 'noDefaultExportDeclaration',
      data: {
        name,
      },
      fix(fixer) {
        const declarationText: RulesEslintConventionsNoDefaultExportDeclarationCheckExportDefaultDeclarationDeclarationText = context.sourceCode.getText(node['declaration']);

        return [
          fixer.replaceText(node, declarationText),
          fixer.insertTextAfterRange([
            0,
            context.sourceCode.getText().length,
          ], `\nexport default ${name};\n`),
        ];
      },
    });

    return;
  }
}

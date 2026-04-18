import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintConventionsRequireUndefinedInitCheckDeclaratorContext,
  RulesEslintConventionsRequireUndefinedInitCheckDeclaratorGrandparent,
  RulesEslintConventionsRequireUndefinedInitCheckDeclaratorNode,
  RulesEslintConventionsRequireUndefinedInitCheckDeclaratorParent,
  RulesEslintConventionsRequireUndefinedInitCheckDeclaratorReturns,
  RulesEslintConventionsRequireUndefinedInitRuleDefaultOptionsIgnoreFiles,
  RulesEslintConventionsRequireUndefinedInitRuleOptions,
} from '../../../types/rules/eslint/conventions/require-undefined-init.d.ts';

/**
 * Rules - ESLint - Conventions - Require Undefined Init.
 *
 * Requires let declarations without an initial value to include an explicit = undefined so
 * the intent is clear and no variable is silently uninitialized.
 *
 * @since 0.15.0
 */
export class RulesEslintConventionsRequireUndefinedInit {
  /**
   * Rules - ESLint - Conventions - Require Undefined Init - Rule.
   *
   * Registered under the name require-undefined-init and exported through the rules index as
   * RequireUndefinedInit for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-undefined-init',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require explicit = undefined when declaring variables without a value.',
      },
      fixable: 'code',
      messages: {
        requireUndefinedInit: 'Add explicit "= undefined" to this uninitialized variable declaration.',
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
      ignoreFiles: [] as RulesEslintConventionsRequireUndefinedInitRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintConventionsRequireUndefinedInitRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        VariableDeclarator(node) {
          RulesEslintConventionsRequireUndefinedInit.checkDeclarator(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - Require Undefined Init - Check Declarator.
   *
   * Only targets let declarations with a null init, skipping for-in and for-of loop variables.
   * Provides an auto-fix that appends = undefined after the id.
   *
   * @private
   *
   * @param {RulesEslintConventionsRequireUndefinedInitCheckDeclaratorContext} context - Context.
   * @param {RulesEslintConventionsRequireUndefinedInitCheckDeclaratorNode}    node    - Node.
   *
   * @returns {RulesEslintConventionsRequireUndefinedInitCheckDeclaratorReturns}
   *
   * @since 0.15.0
   */
  private static checkDeclarator(context: RulesEslintConventionsRequireUndefinedInitCheckDeclaratorContext, node: RulesEslintConventionsRequireUndefinedInitCheckDeclaratorNode): RulesEslintConventionsRequireUndefinedInitCheckDeclaratorReturns {
    // Only check let declarations (const requires an initializer, var is banned).
    const parent: RulesEslintConventionsRequireUndefinedInitCheckDeclaratorParent = node.parent;

    if (parent === undefined || parent.type !== 'VariableDeclaration') {
      return;
    }

    if (parent.kind !== 'let') {
      return;
    }

    // Skip for-in/for-of loop variables.
    const grandparent: RulesEslintConventionsRequireUndefinedInitCheckDeclaratorGrandparent = parent.parent;

    if (
      grandparent !== undefined
      && (
        grandparent.type === 'ForInStatement'
        || grandparent.type === 'ForOfStatement'
      )
    ) {
      return;
    }

    if (node.init !== null) {
      return;
    }

    context.report({
      node,
      messageId: 'requireUndefinedInit',
      fix(fixer) {
        return fixer.insertTextAfter(node.id, ' = undefined');
      },
    });

    return;
  }
}

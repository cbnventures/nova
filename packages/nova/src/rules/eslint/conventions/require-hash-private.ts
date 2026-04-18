import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintConventionsRequireHashPrivateCheckMemberContext,
  RulesEslintConventionsRequireHashPrivateCheckMemberNode,
  RulesEslintConventionsRequireHashPrivateCheckMemberReturns,
  RulesEslintConventionsRequireHashPrivateRuleDefaultOptionsIgnoreFiles,
  RulesEslintConventionsRequireHashPrivateRuleDefaultOptionsSkipMethods,
  RulesEslintConventionsRequireHashPrivateRuleOptions,
} from '../../../types/rules/eslint/conventions/require-hash-private.d.ts';

/**
 * Rules - ESLint - Conventions - Require Hash Private.
 *
 * Enforces native #hash private fields over the private keyword so privacy is enforced at
 * runtime by the engine, not just at compile time by TypeScript.
 *
 * @since 0.15.0
 */
export class RulesEslintConventionsRequireHashPrivate {
  /**
   * Rules - ESLint - Conventions - Require Hash Private - Rule.
   *
   * Registered under the name require-hash-private and exported through the rules index as
   * RequireHashPrivate for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-hash-private',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require #hash notation for private class members instead of the private keyword.',
      },
      messages: {
        requireHashPrivate: 'Use #hash notation for private class members instead of the private keyword.',
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
          skipMethods: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      ignoreFiles: [] as RulesEslintConventionsRequireHashPrivateRuleDefaultOptionsIgnoreFiles,
      skipMethods: true as RulesEslintConventionsRequireHashPrivateRuleDefaultOptionsSkipMethods,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintConventionsRequireHashPrivateRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        PropertyDefinition(node) {
          RulesEslintConventionsRequireHashPrivate.checkMember(context, node);

          return;
        },
        ...(options['skipMethods'] === true ? {} : {
          MethodDefinition(node: RulesEslintConventionsRequireHashPrivateCheckMemberNode) {
            RulesEslintConventionsRequireHashPrivate.checkMember(context, node);

            return;
          },
        }),
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - Require Hash Private - Check Member.
   *
   * Reports class members that use the private keyword accessibility but do not use a
   * PrivateIdentifier key, prompting migration to #hash syntax.
   *
   * @private
   *
   * @param {RulesEslintConventionsRequireHashPrivateCheckMemberContext} context - Context.
   * @param {RulesEslintConventionsRequireHashPrivateCheckMemberNode}    node    - Node.
   *
   * @returns {RulesEslintConventionsRequireHashPrivateCheckMemberReturns}
   *
   * @since 0.15.0
   */
  private static checkMember(context: RulesEslintConventionsRequireHashPrivateCheckMemberContext, node: RulesEslintConventionsRequireHashPrivateCheckMemberNode): RulesEslintConventionsRequireHashPrivateCheckMemberReturns {
    if (node.accessibility !== 'private') {
      return;
    }

    if (node.key.type === 'PrivateIdentifier') {
      return;
    }

    context.report({
      node: node.key,
      messageId: 'requireHashPrivate',
    });

    return;
  }
}

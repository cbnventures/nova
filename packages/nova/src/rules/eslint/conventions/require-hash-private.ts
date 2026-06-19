import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Context,
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Node,
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Returns,
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_MethodDefinition_Node,
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_MethodDefinition_Returns,
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_Options,
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_PropertyDefinition_Node,
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_PropertyDefinition_Returns,
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleDefaultOptionsSkipMethods,
} from '../../../types/rules/eslint/conventions/require-hash-private.d.ts';

/**
 * Rules - ESLint - Conventions - Require Hash Private.
 *
 * Enforces native #hash private fields over the private keyword so privacy is enforced at
 * runtime by the engine, not just at compile time by TypeScript.
 *
 * @since 0.15.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleDefaultOptionsIgnoreFiles,
      skipMethods: true as Rules_Eslint_Conventions_RequireHashPrivate_Runner_RuleDefaultOptionsSkipMethods,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        PropertyDefinition(node: Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_PropertyDefinition_Node): Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_PropertyDefinition_Returns {
          Runner.checkMember(context, node);

          return;
        },
        ...(options['skipMethods'] === true ? {} : {
          MethodDefinition(node: Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_MethodDefinition_Node): Rules_Eslint_Conventions_RequireHashPrivate_Runner_Create_MethodDefinition_Returns {
            Runner.checkMember(context, node);

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
   * @param {Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Context} context - Context.
   * @param {Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Returns}
   *
   * @since 0.15.0
   */
  private static checkMember(context: Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Context, node: Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Node): Rules_Eslint_Conventions_RequireHashPrivate_Runner_CheckMember_Returns {
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

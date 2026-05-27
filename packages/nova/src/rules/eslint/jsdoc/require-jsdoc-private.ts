import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Comments,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Context,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_InsertPosition,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_IsPrivateIdentifier,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_IsPrivateKeyword,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_JsdocComment,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_PrivateTag,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_SinceIndex,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_RuleOptions,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-private.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private.
 *
 * Requires a @private tag in JSDoc blocks for private class
 * members so generated documentation correctly excludes internal implementation details.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Private - Rule.
   *
   * Registered under the name require-jsdoc-private and exported through the rules index as
   * RequireJsdocPrivate for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-private',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require @private tag for private class members.',
      },
      fixable: 'code',
      messages: {
        requirePrivateTag: 'Private class members must have a @private tag in their JSDoc block.',
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
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        MethodDefinition(node) {
          Runner.checkMember(context, node);

          return;
        },
        PropertyDefinition(node) {
          Runner.checkMember(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Private - Check Member.
   *
   * Identifies private members by the private
   * keyword or PrivateIdentifier key, then checks their JSDoc for
   * @private and auto-inserts it before @since.
   *
   * @private
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Context} context - Context.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Returns}
   *
   * @since 0.15.0
   */
  private static checkMember(context: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Context, node: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Node): Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Returns {
    const isPrivateKeyword: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_IsPrivateKeyword = node.accessibility === 'private';
    const isPrivateIdentifier: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_IsPrivateIdentifier = node.key.type === 'PrivateIdentifier';

    if (isPrivateKeyword === false && isPrivateIdentifier === false) {
      return;
    }

    const comments: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_Comments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_JsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    if (jsdocComment.value.includes('@private') === true) {
      return;
    }

    context.report({
      node: jsdocComment,
      messageId: 'requirePrivateTag',
      fix(fixer) {
        const sinceIndex: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_SinceIndex = jsdocComment.value.indexOf('@since');

        if (sinceIndex === -1) {
          return null;
        }

        const insertPosition: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_InsertPosition = jsdocComment.range[0] + 2 + sinceIndex;
        const privateTag: Rules_Eslint_Jsdoc_RequireJsdocPrivate_Runner_CheckMember_PrivateTag = [
          '@private',
          '   *',
          '   * ',
        ].join('\n');

        return fixer.insertTextBeforeRange([
          insertPosition,
          insertPosition,
        ], privateTag);
      },
    });

    return;
  }
}

import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintJsdocRequireJsdocPrivateCheckMemberComments,
  RulesEslintJsdocRequireJsdocPrivateCheckMemberContext,
  RulesEslintJsdocRequireJsdocPrivateCheckMemberInsertPosition,
  RulesEslintJsdocRequireJsdocPrivateCheckMemberIsPrivateIdentifier,
  RulesEslintJsdocRequireJsdocPrivateCheckMemberIsPrivateKeyword,
  RulesEslintJsdocRequireJsdocPrivateCheckMemberJsdocComment,
  RulesEslintJsdocRequireJsdocPrivateCheckMemberNode,
  RulesEslintJsdocRequireJsdocPrivateCheckMemberPrivateTag,
  RulesEslintJsdocRequireJsdocPrivateCheckMemberReturns,
  RulesEslintJsdocRequireJsdocPrivateCheckMemberSinceIndex,
  RulesEslintJsdocRequireJsdocPrivateRuleDefaultOptionsIgnoreFiles,
  RulesEslintJsdocRequireJsdocPrivateRuleOptions,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-private.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Private.
 *
 * Requires a @private tag in JSDoc blocks for private class
 * members so generated documentation correctly excludes internal implementation details.
 *
 * @since 0.15.0
 */
export class RulesEslintJsdocRequireJsdocPrivate {
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
      ignoreFiles: [] as RulesEslintJsdocRequireJsdocPrivateRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintJsdocRequireJsdocPrivateRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        MethodDefinition(node) {
          RulesEslintJsdocRequireJsdocPrivate.checkMember(context, node);

          return;
        },
        PropertyDefinition(node) {
          RulesEslintJsdocRequireJsdocPrivate.checkMember(context, node);

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
   * @param {RulesEslintJsdocRequireJsdocPrivateCheckMemberContext} context - Context.
   * @param {RulesEslintJsdocRequireJsdocPrivateCheckMemberNode}    node    - Node.
   *
   * @returns {RulesEslintJsdocRequireJsdocPrivateCheckMemberReturns}
   *
   * @since 0.15.0
   */
  private static checkMember(context: RulesEslintJsdocRequireJsdocPrivateCheckMemberContext, node: RulesEslintJsdocRequireJsdocPrivateCheckMemberNode): RulesEslintJsdocRequireJsdocPrivateCheckMemberReturns {
    const isPrivateKeyword: RulesEslintJsdocRequireJsdocPrivateCheckMemberIsPrivateKeyword = node.accessibility === 'private';
    const isPrivateIdentifier: RulesEslintJsdocRequireJsdocPrivateCheckMemberIsPrivateIdentifier = node.key.type === 'PrivateIdentifier';

    if (isPrivateKeyword === false && isPrivateIdentifier === false) {
      return;
    }

    const comments: RulesEslintJsdocRequireJsdocPrivateCheckMemberComments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: RulesEslintJsdocRequireJsdocPrivateCheckMemberJsdocComment = undefined;

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
        const sinceIndex: RulesEslintJsdocRequireJsdocPrivateCheckMemberSinceIndex = jsdocComment.value.indexOf('@since');

        if (sinceIndex === -1) {
          return null;
        }

        const insertPosition: RulesEslintJsdocRequireJsdocPrivateCheckMemberInsertPosition = jsdocComment.range[0] + 2 + sinceIndex;
        const privateTag: RulesEslintJsdocRequireJsdocPrivateCheckMemberPrivateTag = [
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

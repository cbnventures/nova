import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintJsdocRequireJsdocSinceCheckNodeComments,
  RulesEslintJsdocRequireJsdocSinceCheckNodeContext,
  RulesEslintJsdocRequireJsdocSinceCheckNodeJsdocComment,
  RulesEslintJsdocRequireJsdocSinceCheckNodeNode,
  RulesEslintJsdocRequireJsdocSinceCheckNodeReturns,
  RulesEslintJsdocRequireJsdocSinceRuleDefaultOptionsIgnoreFiles,
  RulesEslintJsdocRequireJsdocSinceRuleOptions,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-since.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since.
 *
 * Ensures every JSDoc block contains a @since tag so consumers
 * can trace when each public API surface was introduced or last changed.
 *
 * @since 0.15.0
 */
export class RulesEslintJsdocRequireJsdocSince {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Since - Rule.
   *
   * Registered under the name require-jsdoc-since and exported through the rules index as
   * RequireJsdocSince for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-since',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require @since tag in every JSDoc block.',
      },
      messages: {
        requireSinceTag: 'JSDoc block must include a @since tag.',
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
      ignoreFiles: [] as RulesEslintJsdocRequireJsdocSinceRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintJsdocRequireJsdocSinceRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ClassDeclaration(node) {
          RulesEslintJsdocRequireJsdocSince.checkNode(context, node);

          return;
        },
        MethodDefinition(node) {
          RulesEslintJsdocRequireJsdocSince.checkNode(context, node);

          return;
        },
        PropertyDefinition(node) {
          RulesEslintJsdocRequireJsdocSince.checkNode(context, node);

          return;
        },
        FunctionDeclaration(node) {
          RulesEslintJsdocRequireJsdocSince.checkNode(context, node);

          return;
        },
        TSTypeAliasDeclaration(node) {
          RulesEslintJsdocRequireJsdocSince.checkNode(context, node);

          return;
        },
        TSInterfaceDeclaration(node) {
          RulesEslintJsdocRequireJsdocSince.checkNode(context, node);

          return;
        },
        TSEnumDeclaration(node) {
          RulesEslintJsdocRequireJsdocSince.checkNode(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Since - Check Node.
   *
   * Retrieves the leading JSDoc block comment for the node and
   * verifies it contains the @since tag. Reports the comment node when the tag is missing.
   *
   * @private
   *
   * @param {RulesEslintJsdocRequireJsdocSinceCheckNodeContext} context - Context.
   * @param {RulesEslintJsdocRequireJsdocSinceCheckNodeNode}    node    - Node.
   *
   * @returns {RulesEslintJsdocRequireJsdocSinceCheckNodeReturns}
   *
   * @since 0.15.0
   */
  private static checkNode(context: RulesEslintJsdocRequireJsdocSinceCheckNodeContext, node: RulesEslintJsdocRequireJsdocSinceCheckNodeNode): RulesEslintJsdocRequireJsdocSinceCheckNodeReturns {
    const comments: RulesEslintJsdocRequireJsdocSinceCheckNodeComments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: RulesEslintJsdocRequireJsdocSinceCheckNodeJsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    if (jsdocComment.value.includes('@since') === true) {
      return;
    }

    context.report({
      node: jsdocComment,
      messageId: 'requireSinceTag',
    });

    return;
  }
}

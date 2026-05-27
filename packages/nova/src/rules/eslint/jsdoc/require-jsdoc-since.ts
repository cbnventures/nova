import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Comments,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Context,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_JsdocComment,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Node,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleOptions,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-since.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Since.
 *
 * Ensures every JSDoc block contains a @since tag so consumers
 * can trace when each public API surface was introduced or last changed.
 *
 * @since 0.15.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ClassDeclaration(node) {
          Runner.checkNode(context, node);

          return;
        },
        MethodDefinition(node) {
          Runner.checkNode(context, node);

          return;
        },
        PropertyDefinition(node) {
          Runner.checkNode(context, node);

          return;
        },
        FunctionDeclaration(node) {
          Runner.checkNode(context, node);

          return;
        },
        TSTypeAliasDeclaration(node) {
          Runner.checkNode(context, node);

          return;
        },
        TSInterfaceDeclaration(node) {
          Runner.checkNode(context, node);

          return;
        },
        TSEnumDeclaration(node) {
          Runner.checkNode(context, node);

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
   * @param {Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Context} context - Context.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Returns}
   *
   * @since 0.15.0
   */
  private static checkNode(context: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Context, node: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Node): Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Returns {
    const comments: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_Comments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: Rules_Eslint_Jsdoc_RequireJsdocSince_Runner_CheckNode_JsdocComment = undefined;

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

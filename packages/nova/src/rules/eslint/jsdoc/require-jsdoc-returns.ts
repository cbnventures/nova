import { ESLintUtils } from '@typescript-eslint/utils';

import {
  LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX,
  LIB_REGEX_PATTERN_JSDOC_RETURNS_TYPE_ONLY,
  LIB_REGEX_PATTERN_JSDOC_TAG_NAME_CAPTURE,
} from '../../../lib/regex.js';
import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Comments,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Context,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_CurrentLine,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_HasReturnTag,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_JsdocComment,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Match,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_MatchName,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Node,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Stripped,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Target,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_AllComments,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Context,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Line,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Lines,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Match,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_MatchName,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Stripped,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_FunctionDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_FunctionDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_MethodDefinition_Node,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_MethodDefinition_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Program_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_PropertyDefinition_Node,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_PropertyDefinition_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_PropertyDefinition_Value,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_DeclaratorInit,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_IsFunctionConst,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-returns.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Returns.
 *
 * Requires documented functions to declare an @returns tag. Existing tags may
 * contain only a type in braces, with no trailing description.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Returns - Rule.
   *
   * Checks documented function nodes for a required @returns tag, then scans
   * every JSDoc block to enforce the type-only tag format.
   *
   * @since 0.21.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-returns',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require documented functions to declare a type-only @returns tag.',
      },
      messages: {
        missingReturns: 'Documented functions must declare an @returns tag.',
        returnsTypeOnly: 'The @returns tag must contain only a type in braces, with no trailing description.',
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
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        FunctionDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_FunctionDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_FunctionDeclaration_Returns {
          if (node.body === null) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        MethodDefinition(node: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_MethodDefinition_Node): Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_MethodDefinition_Returns {
          if (
            node.kind === 'constructor'
            || node.kind === 'set'
            || node.value.body === null
          ) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        PropertyDefinition(node: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_PropertyDefinition_Node): Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_PropertyDefinition_Returns {
          const value: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_PropertyDefinition_Value = node.value;

          if (
            value === null
            || (
              value.type !== 'ArrowFunctionExpression'
              && value.type !== 'FunctionExpression'
            )
            || value.body === null
          ) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        Program(): Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_Program_Returns {
          Runner.checkProgram(context);

          return;
        },
        VariableDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_Returns {
          let isFunctionConst: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_IsFunctionConst = false;

          for (const declarator of node.declarations) {
            const declaratorInit: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_Create_VariableDeclaration_DeclaratorInit = declarator.init;

            if (
              declaratorInit !== null
              && (
                declaratorInit.type === 'ArrowFunctionExpression'
                || declaratorInit.type === 'FunctionExpression'
              )
            ) {
              isFunctionConst = true;
            }
          }

          if (isFunctionConst === false) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Returns - Check Node.
   *
   * Finds the leading JSDoc block for an implemented function and reports it
   * when no @returns tag is present. Missing JSDoc remains the responsibility
   * of require-jsdoc-presence so the two rules never duplicate diagnostics.
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Context} context - Context.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Node}    node    - Node.
   *
   * @private
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Returns}
   *
   * @since UNRELEASED
   */
  private static checkNode(context: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Context, node: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Node): Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Returns {
    let target: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Target = node;

    if (
      node.parent.type === 'ExportNamedDeclaration'
      || node.parent.type === 'ExportDefaultDeclaration'
    ) {
      target = node.parent;
    }

    const comments: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Comments = context.sourceCode.getCommentsBefore(target);
    let jsdocComment: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_JsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      return;
    }

    const lines: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Lines = jsdocComment.value.split('\n');
    let hasReturnTag: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_HasReturnTag = false;

    for (const line of lines) {
      const currentLine: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_CurrentLine = line;

      if (currentLine === undefined) {
        continue;
      }

      const stripped: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Stripped = currentLine.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();
      const match: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_Match = LIB_REGEX_PATTERN_JSDOC_TAG_NAME_CAPTURE.exec(stripped);

      if (match === null) {
        continue;
      }

      const matchName: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckNode_MatchName = match[1];

      if (matchName === 'returns') {
        hasReturnTag = true;

        break;
      }
    }

    if (hasReturnTag === false) {
      context.report({
        node: jsdocComment,
        messageId: 'missingReturns',
      });
    }

    return;
  }

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Returns - Check Program.
   *
   * Scans all block comments and reports any @returns line that
   * carries more than a single type in braces (a trailing description).
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Context} context - Context.
   *
   * @private
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Returns}
   *
   * @since 0.21.0
   */
  private static checkProgram(context: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Context): Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Returns {
    const allComments: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_AllComments = context.sourceCode.getAllComments();

    for (const comment of allComments) {
      if (comment.type !== 'Block') {
        continue;
      }

      if (comment.value.startsWith('*') === false) {
        continue;
      }

      const lines: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Lines = comment.value.split('\n');

      for (let i = 0; i < lines.length; i += 1) {
        const line: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Line = lines[i];

        if (line === undefined) {
          continue;
        }

        const stripped: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Stripped = line.replace(LIB_REGEX_PATTERN_JSDOC_LINE_PREFIX, '').trim();
        const match: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_Match = LIB_REGEX_PATTERN_JSDOC_TAG_NAME_CAPTURE.exec(stripped);

        if (match === null) {
          continue;
        }

        const matchName: Rules_Eslint_Jsdoc_RequireJsdocReturns_Runner_CheckProgram_MatchName = match[1];

        if (matchName !== 'returns') {
          continue;
        }

        if (LIB_REGEX_PATTERN_JSDOC_RETURNS_TYPE_ONLY.test(stripped) === false) {
          context.report({
            node: comment,
            messageId: 'returnsTypeOnly',
          });

          break;
        }
      }
    }

    return;
  }
}

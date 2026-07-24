import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Comments,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Context,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_JsdocComment,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ClassDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ClassDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ExportNamedDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ExportNamedDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_FunctionDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_FunctionDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_MethodDefinition_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_MethodDefinition_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_Options,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_PropertyDefinition_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_PropertyDefinition_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSEnumDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSEnumDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSInterfaceDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSInterfaceDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSTypeAliasDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSTypeAliasDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_DeclaratorInit,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_IsFunctionConst,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_Node,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_Returns,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_RuleDefaultOptionsSkipDirectories,
} from '../../../types/rules/eslint/jsdoc/require-jsdoc-presence.d.ts';

/**
 * Rules - ESLint - JSDoc - Require JSDoc Presence.
 *
 * Requires every documentable symbol to carry a leading JSDoc block so
 * generated documentation never silently drops an undocumented declaration.
 *
 * @since 0.21.0
 */
export class Runner {
  /**
   * Rules - ESLint - JSDoc - Require JSDoc Presence - Rule.
   *
   * Registered under the name require-jsdoc-presence and exported through the rules index as
   * RequireJsdocPresence for preset consumption.
   *
   * @since 0.21.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-jsdoc-presence',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require a leading JSDoc block on every documentable symbol.',
      },
      messages: {
        missingJsdoc: 'Documentable symbols must have a leading JSDoc block.',
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
          skipDirectories: {
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
      ignoreFiles: [] as Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_RuleDefaultOptionsIgnoreFiles,
      skipDirectories: [] as Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_RuleDefaultOptionsSkipDirectories,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      // Skip files in configured directories.
      for (const skipDirectory of options['skipDirectories']) {
        if (context.filename.includes(`/${skipDirectory}/`) === true) {
          return {};
        }
      }

      // Skip .d.ts declaration files; their type aliases use the section-header convention, not per-symbol JSDoc.
      if (context.filename.endsWith('.d.ts') === true) {
        return {};
      }

      return {
        ClassDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ClassDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ClassDeclaration_Returns {
          // Exported declarations are covered once via the export hook; ambient declarations have no implementation to document.
          if (
            node.parent.type === 'ExportNamedDeclaration'
            || node.parent.type === 'ExportDefaultDeclaration'
            || node.declare === true
          ) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        FunctionDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_FunctionDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_FunctionDeclaration_Returns {
          // Exported declarations are covered once via the export hook; ambient declarations and overload signatures are TSDeclareFunction nodes this hook never receives.
          if (
            node.parent.type === 'ExportNamedDeclaration'
            || node.parent.type === 'ExportDefaultDeclaration'
          ) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        TSTypeAliasDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSTypeAliasDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSTypeAliasDeclaration_Returns {
          // Exported declarations are covered once via the export hook; ambient declarations have no implementation to document.
          if (
            node.parent.type === 'ExportNamedDeclaration'
            || node.parent.type === 'ExportDefaultDeclaration'
            || node.declare === true
          ) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        TSInterfaceDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSInterfaceDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSInterfaceDeclaration_Returns {
          // Exported declarations are covered once via the export hook; ambient declarations have no implementation to document.
          if (
            node.parent.type === 'ExportNamedDeclaration'
            || node.parent.type === 'ExportDefaultDeclaration'
            || node.declare === true
          ) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        TSEnumDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSEnumDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_TSEnumDeclaration_Returns {
          // Exported declarations are covered once via the export hook; ambient declarations have no implementation to document.
          if (
            node.parent.type === 'ExportNamedDeclaration'
            || node.parent.type === 'ExportDefaultDeclaration'
            || node.declare === true
          ) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        MethodDefinition(node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_MethodDefinition_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_MethodDefinition_Returns {
          // Overload and abstract signatures carry no body and are not documentable on their own.
          if (
            node.value !== null
            && node.value.type === 'FunctionExpression'
            && node.value.body === null
          ) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        PropertyDefinition(node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_PropertyDefinition_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_PropertyDefinition_Returns {
          // Overload and abstract signatures carry no body and are not documentable on their own.
          if (
            node.value !== null
            && node.value.type === 'FunctionExpression'
            && node.value.body === null
          ) {
            return;
          }

          Runner.checkNode(context, node);

          return;
        },
        VariableDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_Returns {
          // Exported consts are covered once via the export hook; ambient declarations have no implementation to document.
          if (node.parent.type === 'ExportNamedDeclaration' || node.declare === true) {
            return;
          }

          // Module-level declarations are always documentable symbols.
          if (node.parent.type === 'Program') {
            Runner.checkNode(context, node);

            return;
          }

          // Local declarations are only documentable when they define a function (nested helper); local value consts carry no block requirement.
          let isFunctionConst: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_IsFunctionConst = false;

          for (const declarator of node.declarations) {
            const declaratorInit: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_VariableDeclaration_DeclaratorInit = declarator.init;

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
        ExportNamedDeclaration(node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ExportNamedDeclaration_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_Create_ExportNamedDeclaration_Returns {
          // Re-export lists (export { foo }) carry no declaration and are not documented API.
          if (node.declaration === null) {
            return;
          }

          // Import-equals aliases are not documentable symbols and lack a declare modifier to inspect.
          if (node.declaration.type === 'TSImportEqualsDeclaration') {
            return;
          }

          // Ambient declarations have no implementation to document.
          if (node.declaration.declare === true) {
            return;
          }

          // Check the export node itself so the leading JSDoc above the export keyword is found once.
          Runner.checkNode(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - JSDoc - Require JSDoc Presence - Check Node.
   *
   * Scans the leading comments of the node for a JSDoc block
   * comment and reports the node when no such block is present.
   *
   * @param {Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Context} context - Context.
   * @param {Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Node}    node    - Node.
   *
   * @private
   *
   * @returns {Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Returns}
   *
   * @since 0.21.0
   */
  private static checkNode(context: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Context, node: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Node): Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Returns {
    const comments: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_Comments = context.sourceCode.getCommentsBefore(node);
    let jsdocComment: Rules_Eslint_Jsdoc_RequireJsdocPresence_Runner_CheckNode_JsdocComment = undefined;

    for (const comment of comments) {
      if (comment.type === 'Block' && comment.value.startsWith('*') === true) {
        jsdocComment = comment;
      }
    }

    if (jsdocComment === undefined) {
      context.report({
        node,
        messageId: 'missingJsdoc',
      });
    }

    return;
  }
}

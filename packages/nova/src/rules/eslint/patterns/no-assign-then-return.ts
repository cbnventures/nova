import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Argument,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Body,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Context,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Declarations,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Declarator,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_InitText,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Node,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_NodeIndex,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Parent,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_PrevStatement,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Returns,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Patterns_NoAssignThenReturn_Runner_RuleOptions,
} from '../../../types/rules/eslint/patterns/no-assign-then-return.d.ts';

/**
 * Rules - ESLint - Patterns - No Assign Then Return.
 *
 * Detects a const assignment immediately followed by returning that same variable. The fix
 * inlines the expression into the return statement directly.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * Rules - ESLint - Patterns - No Assign Then Return - Rule.
   *
   * Registered under the name no-assign-then-return and exported through the rules index as
   * NoAssignThenReturn for preset consumption.
   *
   * @since 0.14.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-assign-then-return',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow assigning to a variable and immediately returning it.',
      },
      fixable: 'code',
      messages: {
        returnDirectly: 'Return the expression directly instead of assigning to an intermediate variable.',
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
      ignoreFiles: [] as Rules_Eslint_Patterns_NoAssignThenReturn_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ReturnStatement(node) {
          Runner.checkReturn(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Patterns - No Assign Then Return - Check Return.
   *
   * Looks at the statement before a return to see if it declares a const whose identifier
   * matches the return argument, then offers an auto-fix to inline it.
   *
   * @private
   *
   * @param {Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Context} context - Context.
   * @param {Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Returns}
   *
   * @since 0.14.0
   */
  private static checkReturn(context: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Context, node: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Node): Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Returns {
    const argument: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Argument = node.argument;

    // Only check returns that return an identifier.
    if (
      argument === undefined
      || argument === null
      || argument.type !== 'Identifier'
    ) {
      return;
    }

    const parent: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Parent = node.parent;

    if (
      parent === undefined
      || parent === null
      || (
        parent.type !== 'BlockStatement'
        && parent.type !== 'Program'
      )
    ) {
      return;
    }

    const body: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Body = parent.body;
    const nodeIndex: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_NodeIndex = body.indexOf(node);

    if (nodeIndex < 1) {
      return;
    }

    const prevStatement: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_PrevStatement = body[nodeIndex - 1];

    if (
      prevStatement === undefined
      || prevStatement.type !== 'VariableDeclaration'
      || prevStatement.kind !== 'const'
    ) {
      return;
    }

    const declarations: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Declarations = prevStatement.declarations;

    if (declarations.length !== 1) {
      return;
    }

    const declarator: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_Declarator = declarations[0];

    if (declarator === undefined) {
      return;
    }

    if (
      declarator.id.type === 'Identifier'
      && declarator.id.name === argument.name
      && declarator.init !== null
      && declarator.init !== undefined
    ) {
      const initText: Rules_Eslint_Patterns_NoAssignThenReturn_Runner_CheckReturn_InitText = context.sourceCode.getText(declarator.init);

      context.report({
        node,
        messageId: 'returnDirectly',
        fix(fixer) {
          return [
            fixer.remove(prevStatement),
            fixer.replaceText(argument, initText),
          ];
        },
      });
    }

    return;
  }
}

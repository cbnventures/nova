import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintPatternsNoAssignThenReturnCheckReturnArgument,
  RulesEslintPatternsNoAssignThenReturnCheckReturnBody,
  RulesEslintPatternsNoAssignThenReturnCheckReturnContext,
  RulesEslintPatternsNoAssignThenReturnCheckReturnDeclarations,
  RulesEslintPatternsNoAssignThenReturnCheckReturnDeclarator,
  RulesEslintPatternsNoAssignThenReturnCheckReturnInitText,
  RulesEslintPatternsNoAssignThenReturnCheckReturnNode,
  RulesEslintPatternsNoAssignThenReturnCheckReturnNodeIndex,
  RulesEslintPatternsNoAssignThenReturnCheckReturnParent,
  RulesEslintPatternsNoAssignThenReturnCheckReturnPrevStatement,
  RulesEslintPatternsNoAssignThenReturnCheckReturnReturns,
  RulesEslintPatternsNoAssignThenReturnRuleDefaultOptionsIgnoreFiles,
  RulesEslintPatternsNoAssignThenReturnRuleOptions,
} from '../../../types/rules/eslint/patterns/no-assign-then-return.d.ts';

/**
 * Rules - ESLint - Patterns - No Assign Then Return.
 *
 * Detects a const assignment immediately followed by returning that same variable. The fix
 * inlines the expression into the return statement directly.
 *
 * @since 0.14.0
 */
export class RulesEslintPatternsNoAssignThenReturn {
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
      ignoreFiles: [] as RulesEslintPatternsNoAssignThenReturnRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintPatternsNoAssignThenReturnRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ReturnStatement(node) {
          RulesEslintPatternsNoAssignThenReturn.checkReturn(context, node);

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
   * @param {RulesEslintPatternsNoAssignThenReturnCheckReturnContext} context - Context.
   * @param {RulesEslintPatternsNoAssignThenReturnCheckReturnNode}    node    - Node.
   *
   * @returns {RulesEslintPatternsNoAssignThenReturnCheckReturnReturns}
   *
   * @since 0.14.0
   */
  private static checkReturn(context: RulesEslintPatternsNoAssignThenReturnCheckReturnContext, node: RulesEslintPatternsNoAssignThenReturnCheckReturnNode): RulesEslintPatternsNoAssignThenReturnCheckReturnReturns {
    const argument: RulesEslintPatternsNoAssignThenReturnCheckReturnArgument = node.argument;

    // Only check returns that return an identifier.
    if (
      argument === undefined
      || argument === null
      || argument.type !== 'Identifier'
    ) {
      return;
    }

    const parent: RulesEslintPatternsNoAssignThenReturnCheckReturnParent = node.parent;

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

    const body: RulesEslintPatternsNoAssignThenReturnCheckReturnBody = parent.body;
    const nodeIndex: RulesEslintPatternsNoAssignThenReturnCheckReturnNodeIndex = body.indexOf(node);

    if (nodeIndex < 1) {
      return;
    }

    const prevStatement: RulesEslintPatternsNoAssignThenReturnCheckReturnPrevStatement = body[nodeIndex - 1];

    if (
      prevStatement === undefined
      || prevStatement.type !== 'VariableDeclaration'
      || prevStatement.kind !== 'const'
    ) {
      return;
    }

    const declarations: RulesEslintPatternsNoAssignThenReturnCheckReturnDeclarations = prevStatement.declarations;

    if (declarations.length !== 1) {
      return;
    }

    const declarator: RulesEslintPatternsNoAssignThenReturnCheckReturnDeclarator = declarations[0];

    if (declarator === undefined) {
      return;
    }

    if (
      declarator.id.type === 'Identifier'
      && declarator.id.name === argument.name
      && declarator.init !== null
      && declarator.init !== undefined
    ) {
      const initText: RulesEslintPatternsNoAssignThenReturnCheckReturnInitText = context.sourceCode.getText(declarator.init);

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

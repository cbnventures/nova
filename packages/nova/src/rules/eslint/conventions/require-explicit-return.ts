import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Body,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Context,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_LastStatement,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Node,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Parent,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Returns,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Statements,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_HasReturnValue_Node,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_HasReturnValue_Returns,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsExcludeArrowFunctions,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsExcludeConstructors,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsExcludeSetters,
  Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/conventions/require-explicit-return.d.ts';

/**
 * Rules - ESLint - Conventions - Require Explicit Return.
 *
 * Requires void functions to end with an explicit return statement
 * so control flow termination is always visible in the source code.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - Conventions - Require Explicit Return - Rule.
   *
   * Exported through the ESLint plugin index and activated in
   * eslint.config.ts. Visits all function types on exit to check the last statement.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-explicit-return',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require an explicit return statement at the end of void function bodies.',
      },
      messages: {
        requireExplicitReturn: 'Add an explicit "return;" at the end of this void function body.',
      },
      schema: [{
        type: 'object',
        properties: {
          excludeArrowFunctions: {
            type: 'boolean',
          },
          excludeConstructors: {
            type: 'boolean',
          },
          excludeSetters: {
            type: 'boolean',
          },
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
      excludeArrowFunctions: false as Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsExcludeArrowFunctions,
      excludeConstructors: false as Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsExcludeConstructors,
      excludeSetters: false as Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsExcludeSetters,
      ignoreFiles: [] as Rules_Eslint_Conventions_RequireExplicitReturn_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        'FunctionDeclaration:exit'(node) {
          Runner.checkFunction(context, node, options);

          return;
        },
        'FunctionExpression:exit'(node) {
          Runner.checkFunction(context, node, options);

          return;
        },
        'ArrowFunctionExpression:exit'(node) {
          Runner.checkFunction(context, node, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Conventions - Require Explicit Return - Check Function.
   *
   * Examines a single function node on exit. Skips concise arrows,
   * constructors, setters, and functions that return a value (non-void).
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Context} context - Context.
   * @param {Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Node}    node    - Node.
   * @param {Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options} options - Options.
   *
   * @returns {Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Returns}
   *
   * @since 0.15.0
   */
  private static checkFunction(context: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Context, node: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Node, options: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Options): Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Returns {
    // Skip concise arrow functions (no block body).
    if (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement') {
      return;
    }

    // Check exclusions.
    if (node.type === 'ArrowFunctionExpression' && options['excludeArrowFunctions'] === true) {
      return;
    }

    // Check if this is a constructor.
    const parent: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Parent = node.parent;

    if (
      parent !== undefined
      && parent.type === 'MethodDefinition'
      && parent.kind === 'constructor'
      && options['excludeConstructors'] === true
    ) {
      return;
    }

    // Check if this is a setter.
    if (
      parent !== undefined
      && parent.type === 'MethodDefinition'
      && parent.kind === 'set'
      && options['excludeSetters'] === true
    ) {
      return;
    }

    const body: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Body = node.body;

    if (body.type !== 'BlockStatement') {
      return;
    }

    const statements: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_Statements = body.body;

    // Skip empty function bodies.
    if (statements.length === 0) {
      return;
    }

    // If the function has any return with a value, it is not void - skip.
    if (Runner.hasReturnValue(body) === true) {
      return;
    }

    // Check if the last statement is already a bare return.
    const lastStatement: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_CheckFunction_LastStatement = statements[statements.length - 1];

    if (lastStatement === undefined) {
      return;
    }

    if (lastStatement.type === 'ReturnStatement' && lastStatement.argument === null) {
      return;
    }

    context.report({
      node,
      messageId: 'requireExplicitReturn',
    });

    return;
  }

  /**
   * Rules - ESLint - Conventions - Require Explicit Return - Has Return Value.
   *
   * Recursively walks the AST subtree looking for any return statement
   * with an argument. Stops at nested function boundaries to avoid false positives.
   *
   * @private
   *
   * @param {Rules_Eslint_Conventions_RequireExplicitReturn_Runner_HasReturnValue_Node} node - Node.
   *
   * @returns {Rules_Eslint_Conventions_RequireExplicitReturn_Runner_HasReturnValue_Returns}
   *
   * @since 0.15.0
   */
  private static hasReturnValue(node: Rules_Eslint_Conventions_RequireExplicitReturn_Runner_HasReturnValue_Node): Rules_Eslint_Conventions_RequireExplicitReturn_Runner_HasReturnValue_Returns {
    if (node.type === 'ReturnStatement' && node.argument !== null) {
      return true;
    }

    // Do not descend into nested functions.
    if (
      node.type === 'FunctionDeclaration'
      || node.type === 'FunctionExpression'
      || node.type === 'ArrowFunctionExpression'
    ) {
      return false;
    }

    if ('body' in node && Array.isArray(node.body) === true) {
      for (const child of node.body) {
        if (Runner.hasReturnValue(child) === true) {
          return true;
        }
      }
    }

    // Check single-node body (e.g., WhileStatement.body, ForStatement.body).
    if (
      'body' in node
      && Array.isArray(node.body) === false
      && node.body !== null
      && node.body !== undefined
      && typeof node.body === 'object'
    ) {
      if (Runner.hasReturnValue(node.body) === true) {
        return true;
      }
    }

    // Check all possible child nodes for control flow structures.
    if (
      'consequent' in node
      && node.consequent !== null
      && node.consequent !== undefined
    ) {
      if (Array.isArray(node.consequent) === true) {
        for (const child of node.consequent) {
          if (Runner.hasReturnValue(child) === true) {
            return true;
          }
        }
      } else if (Runner.hasReturnValue(node.consequent) === true) {
        return true;
      }
    }

    if (
      'alternate' in node
      && node.alternate !== null
      && node.alternate !== undefined
    ) {
      if (Runner.hasReturnValue(node.alternate) === true) {
        return true;
      }
    }

    if (
      'block' in node
      && node.block !== null
      && node.block !== undefined
    ) {
      if (Runner.hasReturnValue(node.block) === true) {
        return true;
      }
    }

    if (
      'handler' in node
      && node.handler !== null
      && node.handler !== undefined
    ) {
      if (Runner.hasReturnValue(node.handler) === true) {
        return true;
      }
    }

    if (
      'finalizer' in node
      && node.finalizer !== null
      && node.finalizer !== undefined
    ) {
      if (Runner.hasReturnValue(node.finalizer) === true) {
        return true;
      }
    }

    if ('cases' in node && Array.isArray(node.cases) === true) {
      for (const child of node.cases) {
        if (Runner.hasReturnValue(child) === true) {
          return true;
        }
      }
    }

    return false;
  }
}

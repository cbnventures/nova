import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintConventionsRequireExplicitReturnCheckFunctionBody,
  RulesEslintConventionsRequireExplicitReturnCheckFunctionContext,
  RulesEslintConventionsRequireExplicitReturnCheckFunctionLastStatement,
  RulesEslintConventionsRequireExplicitReturnCheckFunctionNode,
  RulesEslintConventionsRequireExplicitReturnCheckFunctionOptions,
  RulesEslintConventionsRequireExplicitReturnCheckFunctionParent,
  RulesEslintConventionsRequireExplicitReturnCheckFunctionReturns,
  RulesEslintConventionsRequireExplicitReturnCheckFunctionStatements,
  RulesEslintConventionsRequireExplicitReturnHasReturnValueNode,
  RulesEslintConventionsRequireExplicitReturnHasReturnValueReturns,
  RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsExcludeArrowFunctions,
  RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsExcludeConstructors,
  RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsExcludeSetters,
  RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsIgnoreFiles,
  RulesEslintConventionsRequireExplicitReturnRuleOptions,
} from '../../../types/rules/eslint/conventions/require-explicit-return.d.ts';

/**
 * Rules - ESLint - Conventions - Require Explicit Return.
 *
 * Requires void functions to end with an explicit return statement
 * so control flow termination is always visible in the source code.
 *
 * @since 0.15.0
 */
export class RulesEslintConventionsRequireExplicitReturn {
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
      excludeArrowFunctions: false as RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsExcludeArrowFunctions,
      excludeConstructors: false as RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsExcludeConstructors,
      excludeSetters: false as RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsExcludeSetters,
      ignoreFiles: [] as RulesEslintConventionsRequireExplicitReturnRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintConventionsRequireExplicitReturnRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        'FunctionDeclaration:exit'(node) {
          RulesEslintConventionsRequireExplicitReturn.checkFunction(context, node, options);

          return;
        },
        'FunctionExpression:exit'(node) {
          RulesEslintConventionsRequireExplicitReturn.checkFunction(context, node, options);

          return;
        },
        'ArrowFunctionExpression:exit'(node) {
          RulesEslintConventionsRequireExplicitReturn.checkFunction(context, node, options);

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
   * @param {RulesEslintConventionsRequireExplicitReturnCheckFunctionContext} context - Context.
   * @param {RulesEslintConventionsRequireExplicitReturnCheckFunctionNode}    node    - Node.
   * @param {RulesEslintConventionsRequireExplicitReturnCheckFunctionOptions} options - Options.
   *
   * @returns {RulesEslintConventionsRequireExplicitReturnCheckFunctionReturns}
   *
   * @since 0.15.0
   */
  private static checkFunction(context: RulesEslintConventionsRequireExplicitReturnCheckFunctionContext, node: RulesEslintConventionsRequireExplicitReturnCheckFunctionNode, options: RulesEslintConventionsRequireExplicitReturnCheckFunctionOptions): RulesEslintConventionsRequireExplicitReturnCheckFunctionReturns {
    // Skip concise arrow functions (no block body).
    if (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement') {
      return;
    }

    // Check exclusions.
    if (node.type === 'ArrowFunctionExpression' && options['excludeArrowFunctions'] === true) {
      return;
    }

    // Check if this is a constructor.
    const parent: RulesEslintConventionsRequireExplicitReturnCheckFunctionParent = node.parent;

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

    const body: RulesEslintConventionsRequireExplicitReturnCheckFunctionBody = node.body;

    if (body.type !== 'BlockStatement') {
      return;
    }

    const statements: RulesEslintConventionsRequireExplicitReturnCheckFunctionStatements = body.body;

    // Skip empty function bodies.
    if (statements.length === 0) {
      return;
    }

    // If the function has any return with a value, it is not void — skip.
    if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(body) === true) {
      return;
    }

    // Check if the last statement is already a bare return.
    const lastStatement: RulesEslintConventionsRequireExplicitReturnCheckFunctionLastStatement = statements[statements.length - 1];

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
   * @param {RulesEslintConventionsRequireExplicitReturnHasReturnValueNode} node - Node.
   *
   * @returns {RulesEslintConventionsRequireExplicitReturnHasReturnValueReturns}
   *
   * @since 0.15.0
   */
  private static hasReturnValue(node: RulesEslintConventionsRequireExplicitReturnHasReturnValueNode): RulesEslintConventionsRequireExplicitReturnHasReturnValueReturns {
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
        if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(child) === true) {
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
      if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(node.body) === true) {
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
          if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(child) === true) {
            return true;
          }
        }
      } else if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(node.consequent) === true) {
        return true;
      }
    }

    if (
      'alternate' in node
      && node.alternate !== null
      && node.alternate !== undefined
    ) {
      if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(node.alternate) === true) {
        return true;
      }
    }

    if (
      'block' in node
      && node.block !== null
      && node.block !== undefined
    ) {
      if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(node.block) === true) {
        return true;
      }
    }

    if (
      'handler' in node
      && node.handler !== null
      && node.handler !== undefined
    ) {
      if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(node.handler) === true) {
        return true;
      }
    }

    if (
      'finalizer' in node
      && node.finalizer !== null
      && node.finalizer !== undefined
    ) {
      if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(node.finalizer) === true) {
        return true;
      }
    }

    if ('cases' in node && Array.isArray(node.cases) === true) {
      for (const child of node.cases) {
        if (RulesEslintConventionsRequireExplicitReturn.hasReturnValue(child) === true) {
          return true;
        }
      }
    }

    return false;
  }
}

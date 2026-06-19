import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Context,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Node,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Returns,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Callee,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Context,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_InsideCallback,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Node,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Parent,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Returns,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Context,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Node,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Parent,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Returns,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Context,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Declarator,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Left,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Node,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Returns,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Context,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Node,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Parent,
  Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Returns,
  Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckAssignmentExpressions,
  Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckCallbackParams,
  Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckForOfLoops,
  Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckFunctionParams,
  Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckVariableDeclarations,
  Rules_Eslint_Syntax_NoDestructuring_Runner_Create_InsideCallback,
  Rules_Eslint_Syntax_NoDestructuring_Runner_Create_Options,
  Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsAssignmentExpressions,
  Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsCallbackParams,
  Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsForOfLoops,
  Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsFunctionParams,
  Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsVariableDeclarations,
} from '../../../types/rules/eslint/syntax/no-destructuring.d.ts';

/**
 * Rules - ESLint - Syntax - No Destructuring.
 *
 * Disallows destructuring in variable declarations, function parameters, callbacks, for-of
 * loops, and assignment expressions to keep access explicit.
 *
 * @since 0.14.0
 */
export class Runner {
  /**
   * Rules - ESLint - Syntax - No Destructuring - Callback Methods.
   *
   * Enumerates array methods whose arrow or
   * function arguments are considered callbacks, so destructured
   * parameters get a specialized error message.
   *
   * @private
   *
   * @since 0.14.0
   */
  static readonly #callbackMethods = new Set([
    'map',
    'filter',
    'find',
    'forEach',
    'some',
    'every',
    'reduce',
    'flatMap',
    'sort',
    'findIndex',
    'findLast',
    'findLastIndex',
  ]);

  /**
   * Rules - ESLint - Syntax - No Destructuring - Rule.
   *
   * Registered as a custom ESLint rule in
   * the eslint config. Each destructuring context is independently
   * toggleable via boolean schema options.
   *
   * @since 0.14.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-destructuring',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow destructuring patterns in various contexts.',
      },
      messages: {
        noDestructuringCallback: 'Do not destructure callback parameters. Use a descriptive parameter name and access properties or indices in the function body.',
        noDestructuringForOf: 'Do not destructure in `for...of` loops. Use a single variable name and access elements in the loop body.',
        noDestructuringParam: 'Do not destructure function parameters. Access properties in the function body instead.',
        noDestructuringVariable: 'Do not destructure in variable declarations. Assign the value and access properties separately.',
        noDestructuringAssignment: 'Do not use destructuring assignment. Access properties separately instead.',
      },
      schema: [{
        type: 'object',
        properties: {
          assignmentExpressions: {
            type: 'boolean',
          },
          callbackParams: {
            type: 'boolean',
          },
          forOfLoops: {
            type: 'boolean',
          },
          functionParams: {
            type: 'boolean',
          },
          ignoreFiles: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
          variableDeclarations: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      }],
    },
    defaultOptions: [{
      assignmentExpressions: true as Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsAssignmentExpressions,
      callbackParams: true as Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsCallbackParams,
      forOfLoops: true as Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsForOfLoops,
      functionParams: true as Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsFunctionParams,
      ignoreFiles: [] as Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsIgnoreFiles,
      variableDeclarations: true as Rules_Eslint_Syntax_NoDestructuring_Runner_RuleDefaultOptionsVariableDeclarations,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Syntax_NoDestructuring_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      const checkCallbackParams: Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckCallbackParams = options['callbackParams'];
      const checkFunctionParams: Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckFunctionParams = options['functionParams'];
      const checkForOfLoops: Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckForOfLoops = options['forOfLoops'];
      const checkVariableDeclarations: Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckVariableDeclarations = options['variableDeclarations'];
      const checkAssignmentExpressions: Rules_Eslint_Syntax_NoDestructuring_Runner_Create_CheckAssignmentExpressions = options['assignmentExpressions'];

      // Per-lint tracking state for callback detection.
      const insideCallback: Rules_Eslint_Syntax_NoDestructuring_Runner_Create_InsideCallback = { value: false };

      return {
        'ArrowFunctionExpression'(node) {
          if (checkCallbackParams === true) {
            Runner.checkCallback(context, node, insideCallback);
          }

          return;
        },
        'FunctionExpression'(node) {
          if (checkCallbackParams === true) {
            Runner.checkCallback(context, node, insideCallback);
          }

          return;
        },
        'ForOfStatement'(node) {
          if (checkForOfLoops === true) {
            Runner.checkForOf(context, node);
          }

          return;
        },
        'FunctionDeclaration'(node) {
          if (checkFunctionParams === true) {
            Runner.checkFunction(context, node);
          }

          return;
        },
        'ArrowFunctionExpression:exit'(node) {
          if (checkFunctionParams === true) {
            Runner.checkFunction(context, node);
          }

          return;
        },
        'FunctionExpression:exit'(node) {
          if (checkFunctionParams === true) {
            Runner.checkFunction(context, node);
          }

          return;
        },
        'VariableDeclarator'(node) {
          if (checkVariableDeclarations === true) {
            Runner.checkDeclarator(context, node);
          }

          return;
        },
        'AssignmentExpression'(node) {
          if (checkAssignmentExpressions === true) {
            Runner.checkAssignment(context, node);
          }

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Syntax - No Destructuring - Check Callback.
   *
   * Reports destructured parameters in arrow or
   * function expressions passed as arguments to known
   * array methods like map, filter, and reduce.
   *
   * @private
   *
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Context}        context        - Context.
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Node}           node           - Node.
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_InsideCallback} insideCallback - Inside callback.
   *
   * @returns {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Returns}
   *
   * @since 0.14.0
   */
  private static checkCallback(context: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Context, node: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Node, insideCallback: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_InsideCallback): Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Returns {
    const parent: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Parent = node.parent;

    // Check if this function is a callback argument to a method call.
    if (
      parent === undefined
      || parent === null
      || parent.type !== 'CallExpression'
    ) {
      return;
    }

    const callee: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckCallback_Callee = parent.callee;

    if (callee.type !== 'MemberExpression' || callee.property.type !== 'Identifier') {
      return;
    }

    if (Runner.#callbackMethods.has(callee.property.name) === false) {
      return;
    }

    Reflect.set(insideCallback, 'value', true);

    for (const param of node.params) {
      if (param.type === 'ObjectPattern' || param.type === 'ArrayPattern') {
        context.report({
          node: param,
          messageId: 'noDestructuringCallback',
        });
      }
    }

    return;
  }

  /**
   * Rules - ESLint - Syntax - No Destructuring - Check For Of.
   *
   * Reports destructured loop variables in for-of
   * statements so callers use a single variable name and
   * access elements by index in the loop body.
   *
   * @private
   *
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Context} context - Context.
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Returns}
   *
   * @since 0.14.0
   */
  private static checkForOf(context: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Context, node: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Node): Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Returns {
    const left: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Left = node.left;

    if (left.type !== 'VariableDeclaration') {
      return;
    }

    const declarator: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckForOf_Declarator = left.declarations[0];

    if (declarator === undefined) {
      return;
    }

    if (declarator.id.type !== 'ArrayPattern' && declarator.id.type !== 'ObjectPattern') {
      return;
    }

    context.report({
      node: declarator.id,
      messageId: 'noDestructuringForOf',
    });

    return;
  }

  /**
   * Rules - ESLint - Syntax - No Destructuring - Check Function.
   *
   * Reports destructured parameters on function
   * declarations and non-callback function expressions.
   * Skips callbacks handled by checkCallback.
   *
   * @private
   *
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Context} context - Context.
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Returns}
   *
   * @since 0.14.0
   */
  private static checkFunction(context: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Context, node: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Node): Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Returns {
    // Skip callback functions (handled by checkCallback).
    const parent: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckFunction_Parent = node.parent;

    if (
      parent !== undefined
      && parent !== null
      && parent.type === 'CallExpression'
    ) {
      return;
    }

    for (const param of node.params) {
      if (param.type === 'ObjectPattern' || param.type === 'ArrayPattern') {
        context.report({
          node: param,
          messageId: 'noDestructuringParam',
        });
      }
    }

    return;
  }

  /**
   * Rules - ESLint - Syntax - No Destructuring - Check Declarator.
   *
   * Reports object or array destructuring in
   * variable declarations. Skips for-of loop variables
   * since those are handled by checkForOf.
   *
   * @private
   *
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Context} context - Context.
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Returns}
   *
   * @since 0.14.0
   */
  private static checkDeclarator(context: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Context, node: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Node): Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Returns {
    if (node.id.type !== 'ObjectPattern' && node.id.type !== 'ArrayPattern') {
      return;
    }

    // Skip for-of variable declarations (handled by checkForOf).
    const parent: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckDeclarator_Parent = node.parent;

    if (
      parent !== undefined
      && parent !== null
      && parent.parent !== undefined
      && parent.parent !== null
      && parent.parent.type === 'ForOfStatement'
    ) {
      return;
    }

    context.report({
      node: node.id,
      messageId: 'noDestructuringVariable',
    });

    return;
  }

  /**
   * Rules - ESLint - Syntax - No Destructuring - Check Assignment.
   *
   * Reports destructuring on the left side
   * of assignment expressions where object or array patterns
   * are used to reassign multiple bindings.
   *
   * @private
   *
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Context} context - Context.
   * @param {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Returns}
   *
   * @since 0.14.0
   */
  private static checkAssignment(context: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Context, node: Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Node): Rules_Eslint_Syntax_NoDestructuring_Runner_CheckAssignment_Returns {
    if (node.left.type === 'ObjectPattern' || node.left.type === 'ArrayPattern') {
      context.report({
        node: node.left,
        messageId: 'noDestructuringAssignment',
      });
    }

    return;
  }
}

import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintSyntaxNoDestructuringCheckAssignmentContext,
  RulesEslintSyntaxNoDestructuringCheckAssignmentNode,
  RulesEslintSyntaxNoDestructuringCheckAssignmentReturns,
  RulesEslintSyntaxNoDestructuringCheckCallbackCallee,
  RulesEslintSyntaxNoDestructuringCheckCallbackContext,
  RulesEslintSyntaxNoDestructuringCheckCallbackInsideCallback,
  RulesEslintSyntaxNoDestructuringCheckCallbackNode,
  RulesEslintSyntaxNoDestructuringCheckCallbackParent,
  RulesEslintSyntaxNoDestructuringCheckCallbackReturns,
  RulesEslintSyntaxNoDestructuringCheckDeclaratorContext,
  RulesEslintSyntaxNoDestructuringCheckDeclaratorNode,
  RulesEslintSyntaxNoDestructuringCheckDeclaratorParent,
  RulesEslintSyntaxNoDestructuringCheckDeclaratorReturns,
  RulesEslintSyntaxNoDestructuringCheckForOfContext,
  RulesEslintSyntaxNoDestructuringCheckForOfDeclarator,
  RulesEslintSyntaxNoDestructuringCheckForOfLeft,
  RulesEslintSyntaxNoDestructuringCheckForOfNode,
  RulesEslintSyntaxNoDestructuringCheckForOfReturns,
  RulesEslintSyntaxNoDestructuringCheckFunctionContext,
  RulesEslintSyntaxNoDestructuringCheckFunctionNode,
  RulesEslintSyntaxNoDestructuringCheckFunctionParent,
  RulesEslintSyntaxNoDestructuringCheckFunctionReturns,
  RulesEslintSyntaxNoDestructuringRuleCheckAssignmentExpressions,
  RulesEslintSyntaxNoDestructuringRuleCheckCallbackParams,
  RulesEslintSyntaxNoDestructuringRuleCheckForOfLoops,
  RulesEslintSyntaxNoDestructuringRuleCheckFunctionParams,
  RulesEslintSyntaxNoDestructuringRuleCheckVariableDeclarations,
  RulesEslintSyntaxNoDestructuringRuleDefaultOptionsAssignmentExpressions,
  RulesEslintSyntaxNoDestructuringRuleDefaultOptionsCallbackParams,
  RulesEslintSyntaxNoDestructuringRuleDefaultOptionsForOfLoops,
  RulesEslintSyntaxNoDestructuringRuleDefaultOptionsFunctionParams,
  RulesEslintSyntaxNoDestructuringRuleDefaultOptionsIgnoreFiles,
  RulesEslintSyntaxNoDestructuringRuleDefaultOptionsVariableDeclarations,
  RulesEslintSyntaxNoDestructuringRuleOptions,
} from '../../../types/rules/eslint/syntax/no-destructuring.d.ts';

/**
 * Rules - ESLint - Syntax - No Destructuring.
 *
 * Disallows destructuring in variable declarations, function parameters, callbacks, for-of
 * loops, and assignment expressions to keep access explicit.
 *
 * @since 0.14.0
 */
export class RulesEslintSyntaxNoDestructuring {
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
      assignmentExpressions: true as RulesEslintSyntaxNoDestructuringRuleDefaultOptionsAssignmentExpressions,
      callbackParams: true as RulesEslintSyntaxNoDestructuringRuleDefaultOptionsCallbackParams,
      forOfLoops: true as RulesEslintSyntaxNoDestructuringRuleDefaultOptionsForOfLoops,
      functionParams: true as RulesEslintSyntaxNoDestructuringRuleDefaultOptionsFunctionParams,
      ignoreFiles: [] as RulesEslintSyntaxNoDestructuringRuleDefaultOptionsIgnoreFiles,
      variableDeclarations: true as RulesEslintSyntaxNoDestructuringRuleDefaultOptionsVariableDeclarations,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintSyntaxNoDestructuringRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      const checkCallbackParams: RulesEslintSyntaxNoDestructuringRuleCheckCallbackParams = options['callbackParams'];
      const checkFunctionParams: RulesEslintSyntaxNoDestructuringRuleCheckFunctionParams = options['functionParams'];
      const checkForOfLoops: RulesEslintSyntaxNoDestructuringRuleCheckForOfLoops = options['forOfLoops'];
      const checkVariableDeclarations: RulesEslintSyntaxNoDestructuringRuleCheckVariableDeclarations = options['variableDeclarations'];
      const checkAssignmentExpressions: RulesEslintSyntaxNoDestructuringRuleCheckAssignmentExpressions = options['assignmentExpressions'];

      // Per-lint tracking state for callback detection.
      const insideCallback: RulesEslintSyntaxNoDestructuringCheckCallbackInsideCallback = { value: false };

      return {
        'ArrowFunctionExpression'(node) {
          if (checkCallbackParams === true) {
            RulesEslintSyntaxNoDestructuring.checkCallback(context, node, insideCallback);
          }

          return;
        },
        'FunctionExpression'(node) {
          if (checkCallbackParams === true) {
            RulesEslintSyntaxNoDestructuring.checkCallback(context, node, insideCallback);
          }

          return;
        },
        'ForOfStatement'(node) {
          if (checkForOfLoops === true) {
            RulesEslintSyntaxNoDestructuring.checkForOf(context, node);
          }

          return;
        },
        'FunctionDeclaration'(node) {
          if (checkFunctionParams === true) {
            RulesEslintSyntaxNoDestructuring.checkFunction(context, node);
          }

          return;
        },
        'ArrowFunctionExpression:exit'(node) {
          if (checkFunctionParams === true) {
            RulesEslintSyntaxNoDestructuring.checkFunction(context, node);
          }

          return;
        },
        'FunctionExpression:exit'(node) {
          if (checkFunctionParams === true) {
            RulesEslintSyntaxNoDestructuring.checkFunction(context, node);
          }

          return;
        },
        'VariableDeclarator'(node) {
          if (checkVariableDeclarations === true) {
            RulesEslintSyntaxNoDestructuring.checkDeclarator(context, node);
          }

          return;
        },
        'AssignmentExpression'(node) {
          if (checkAssignmentExpressions === true) {
            RulesEslintSyntaxNoDestructuring.checkAssignment(context, node);
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
   * @param {RulesEslintSyntaxNoDestructuringCheckCallbackContext}        context        - Context.
   * @param {RulesEslintSyntaxNoDestructuringCheckCallbackNode}           node           - Node.
   * @param {RulesEslintSyntaxNoDestructuringCheckCallbackInsideCallback} insideCallback - Inside callback.
   *
   * @returns {RulesEslintSyntaxNoDestructuringCheckCallbackReturns}
   *
   * @since 0.14.0
   */
  private static checkCallback(context: RulesEslintSyntaxNoDestructuringCheckCallbackContext, node: RulesEslintSyntaxNoDestructuringCheckCallbackNode, insideCallback: RulesEslintSyntaxNoDestructuringCheckCallbackInsideCallback): RulesEslintSyntaxNoDestructuringCheckCallbackReturns {
    const parent: RulesEslintSyntaxNoDestructuringCheckCallbackParent = node.parent;

    // Check if this function is a callback argument to a method call.
    if (
      parent === undefined
      || parent === null
      || parent.type !== 'CallExpression'
    ) {
      return;
    }

    const callee: RulesEslintSyntaxNoDestructuringCheckCallbackCallee = parent.callee;

    if (callee.type !== 'MemberExpression' || callee.property.type !== 'Identifier') {
      return;
    }

    if (RulesEslintSyntaxNoDestructuring.#callbackMethods.has(callee.property.name) === false) {
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
   * @param {RulesEslintSyntaxNoDestructuringCheckForOfContext} context - Context.
   * @param {RulesEslintSyntaxNoDestructuringCheckForOfNode}    node    - Node.
   *
   * @returns {RulesEslintSyntaxNoDestructuringCheckForOfReturns}
   *
   * @since 0.14.0
   */
  private static checkForOf(context: RulesEslintSyntaxNoDestructuringCheckForOfContext, node: RulesEslintSyntaxNoDestructuringCheckForOfNode): RulesEslintSyntaxNoDestructuringCheckForOfReturns {
    const left: RulesEslintSyntaxNoDestructuringCheckForOfLeft = node.left;

    if (left.type !== 'VariableDeclaration') {
      return;
    }

    const declarator: RulesEslintSyntaxNoDestructuringCheckForOfDeclarator = left.declarations[0];

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
   * @param {RulesEslintSyntaxNoDestructuringCheckFunctionContext} context - Context.
   * @param {RulesEslintSyntaxNoDestructuringCheckFunctionNode}    node    - Node.
   *
   * @returns {RulesEslintSyntaxNoDestructuringCheckFunctionReturns}
   *
   * @since 0.14.0
   */
  private static checkFunction(context: RulesEslintSyntaxNoDestructuringCheckFunctionContext, node: RulesEslintSyntaxNoDestructuringCheckFunctionNode): RulesEslintSyntaxNoDestructuringCheckFunctionReturns {
    // Skip callback functions (handled by checkCallback).
    const parent: RulesEslintSyntaxNoDestructuringCheckFunctionParent = node.parent;

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
   * @param {RulesEslintSyntaxNoDestructuringCheckDeclaratorContext} context - Context.
   * @param {RulesEslintSyntaxNoDestructuringCheckDeclaratorNode}    node    - Node.
   *
   * @returns {RulesEslintSyntaxNoDestructuringCheckDeclaratorReturns}
   *
   * @since 0.14.0
   */
  private static checkDeclarator(context: RulesEslintSyntaxNoDestructuringCheckDeclaratorContext, node: RulesEslintSyntaxNoDestructuringCheckDeclaratorNode): RulesEslintSyntaxNoDestructuringCheckDeclaratorReturns {
    if (node.id.type !== 'ObjectPattern' && node.id.type !== 'ArrayPattern') {
      return;
    }

    // Skip for-of variable declarations (handled by checkForOf).
    const parent: RulesEslintSyntaxNoDestructuringCheckDeclaratorParent = node.parent;

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
   * @param {RulesEslintSyntaxNoDestructuringCheckAssignmentContext} context - Context.
   * @param {RulesEslintSyntaxNoDestructuringCheckAssignmentNode}    node    - Node.
   *
   * @returns {RulesEslintSyntaxNoDestructuringCheckAssignmentReturns}
   *
   * @since 0.14.0
   */
  private static checkAssignment(context: RulesEslintSyntaxNoDestructuringCheckAssignmentContext, node: RulesEslintSyntaxNoDestructuringCheckAssignmentNode): RulesEslintSyntaxNoDestructuringCheckAssignmentReturns {
    if (node.left.type === 'ObjectPattern' || node.left.type === 'ArrayPattern') {
      context.report({
        node: node.left,
        messageId: 'noDestructuringAssignment',
      });
    }

    return;
  }
}

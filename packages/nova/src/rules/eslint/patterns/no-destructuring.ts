import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  NoDestructuringCallbackMethods,
  NoDestructuringCheckAssignmentNode,
  NoDestructuringCheckAssignmentReturns,
  NoDestructuringCheckCallbackNode,
  NoDestructuringCheckCallbackReturns,
  NoDestructuringCheckDeclaratorNode,
  NoDestructuringCheckDeclaratorReturns,
  NoDestructuringCheckForOfNode,
  NoDestructuringCheckForOfReturns,
  NoDestructuringCheckFunctionNode,
  NoDestructuringCheckFunctionReturns,
  NoDestructuringDefaultOptionsAssignmentExpressions,
  NoDestructuringDefaultOptionsCallbackParams,
  NoDestructuringDefaultOptionsForOfLoops,
  NoDestructuringDefaultOptionsFunctionParams,
  NoDestructuringDefaultOptionsVariableDeclarations,
} from '@/types/rules/eslint/patterns/no-destructuring.d.ts';

/**
 * No destructuring - Callback methods.
 *
 * @since 1.0.0
 */
const CALLBACK_METHODS: NoDestructuringCallbackMethods = new Set([
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
 * No destructuring.
 *
 * @since 1.0.0
 */
const noDestructuring = ESLintUtils.RuleCreator(() => '#')({
  name: 'no-destructuring',
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow destructuring patterns in various contexts.',
    },
    messages: {
      noDestructuringCallback: 'Do not destructure callback parameters. Use a descriptive parameter name and access properties or indices in the function body.',
      noDestructuringForOf: 'Do not destructure in `for...of` loops. Use a single variable name and access elements in the loop body. Destructuring is only allowed with `Object.entries()`.',
      noDestructuringParam: 'Do not destructure function parameters. Access properties in the function body instead.',
      noDestructuringVariable: 'Do not destructure in variable declarations. Assign the value and access properties separately.',
      noDestructuringAssignment: 'Do not use destructuring assignment. Access properties separately instead.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          functionParams: {
            type: 'boolean',
          },
          callbackParams: {
            type: 'boolean',
          },
          forOfLoops: {
            type: 'boolean',
          },
          variableDeclarations: {
            type: 'boolean',
          },
          assignmentExpressions: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{
    functionParams: true as NoDestructuringDefaultOptionsFunctionParams,
    callbackParams: true as NoDestructuringDefaultOptionsCallbackParams,
    forOfLoops: true as NoDestructuringDefaultOptionsForOfLoops,
    variableDeclarations: true as NoDestructuringDefaultOptionsVariableDeclarations,
    assignmentExpressions: true as NoDestructuringDefaultOptionsAssignmentExpressions,
  }],
  create(context, [options]) {
    const checkFunctionParams = options.functionParams;
    const checkCallbackParams = options.callbackParams;
    const checkForOfLoops = options.forOfLoops;
    const checkVariableDeclarations = options.variableDeclarations;
    const checkAssignmentExpressions = options.assignmentExpressions;

    /**
     * No destructuring - Check callback.
     *
     * @param {NoDestructuringCheckCallbackNode} node - Function expression or arrow function node.
     *
     * @returns {NoDestructuringCheckCallbackReturns}
     *
     * @since 1.0.0
     */
    const checkCallback = (node: NoDestructuringCheckCallbackNode): NoDestructuringCheckCallbackReturns => {
      if (checkCallbackParams !== true) {
        return;
      }

      const parent = node.parent;

      // Check if this function is a callback argument to a method call.
      if (parent == null || parent.type !== 'CallExpression') {
        return;
      }

      const callee = parent.callee;

      if (callee.type !== 'MemberExpression' || callee.property.type !== 'Identifier') {
        return;
      }

      if (CALLBACK_METHODS.has(callee.property.name) === false) {
        return;
      }

      for (const param of node.params) {
        if (param.type === 'ObjectPattern' || param.type === 'ArrayPattern') {
          context.report({
            node: param,
            messageId: 'noDestructuringCallback',
          });
        }
      }
    };

    /**
     * No destructuring - Check for of.
     *
     * @param {NoDestructuringCheckForOfNode} node - For-of statement node.
     *
     * @returns {NoDestructuringCheckForOfReturns}
     *
     * @since 1.0.0
     */
    const checkForOf = (node: NoDestructuringCheckForOfNode): NoDestructuringCheckForOfReturns => {
      if (checkForOfLoops !== true) {
        return;
      }

      const left = node.left;

      if (left.type !== 'VariableDeclaration') {
        return;
      }

      const declarator = left.declarations[0];

      if (declarator === undefined) {
        return;
      }

      if (declarator.id.type !== 'ArrayPattern' && declarator.id.type !== 'ObjectPattern') {
        return;
      }

      // Allow destructuring with Object.entries().
      const right = node.right;

      if (
        right.type === 'CallExpression'
        && right.callee.type === 'MemberExpression'
        && right.callee.object.type === 'Identifier'
        && right.callee.object.name === 'Object'
        && right.callee.property.type === 'Identifier'
        && right.callee.property.name === 'entries'
      ) {
        return;
      }

      context.report({
        node: declarator.id,
        messageId: 'noDestructuringForOf',
      });
    };

    /**
     * No destructuring - Check function.
     *
     * @param {NoDestructuringCheckFunctionNode} node - Function declaration or expression node.
     *
     * @returns {NoDestructuringCheckFunctionReturns}
     *
     * @since 1.0.0
     */
    const checkFunction = (node: NoDestructuringCheckFunctionNode): NoDestructuringCheckFunctionReturns => {
      if (checkFunctionParams !== true) {
        return;
      }

      // Skip callback functions (handled by checkCallback).
      const parent = node.parent;

      if (parent != null && parent.type === 'CallExpression') {
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
    };

    /**
     * No destructuring - Check declarator.
     *
     * @param {NoDestructuringCheckDeclaratorNode} node - Variable declarator node.
     *
     * @returns {NoDestructuringCheckDeclaratorReturns}
     *
     * @since 1.0.0
     */
    const checkDeclarator = (node: NoDestructuringCheckDeclaratorNode): NoDestructuringCheckDeclaratorReturns => {
      if (checkVariableDeclarations !== true) {
        return;
      }

      if (node.id.type !== 'ObjectPattern' && node.id.type !== 'ArrayPattern') {
        return;
      }

      // Skip for-of variable declarations (handled by checkForOf).
      const parent = node.parent;

      if (parent != null && parent.parent != null && parent.parent.type === 'ForOfStatement') {
        return;
      }

      context.report({
        node: node.id,
        messageId: 'noDestructuringVariable',
      });
    };

    /**
     * No destructuring - Check assignment.
     *
     * @param {NoDestructuringCheckAssignmentNode} node - Assignment expression node.
     *
     * @returns {NoDestructuringCheckAssignmentReturns}
     *
     * @since 1.0.0
     */
    const checkAssignment = (node: NoDestructuringCheckAssignmentNode): NoDestructuringCheckAssignmentReturns => {
      if (checkAssignmentExpressions !== true) {
        return;
      }

      if (node.left.type === 'ObjectPattern' || node.left.type === 'ArrayPattern') {
        context.report({
          node: node.left,
          messageId: 'noDestructuringAssignment',
        });
      }
    };

    return {
      'ArrowFunctionExpression': checkCallback,
      'FunctionExpression': checkCallback,
      'ForOfStatement': checkForOf,
      'FunctionDeclaration': checkFunction,
      'ArrowFunctionExpression:exit': checkFunction,
      'FunctionExpression:exit': checkFunction,
      'VariableDeclarator': checkDeclarator,
      'AssignmentExpression': checkAssignment,
    };
  },
});

export default noDestructuring;

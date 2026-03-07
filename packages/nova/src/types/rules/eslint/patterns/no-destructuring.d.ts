import type { TSESTree } from '@typescript-eslint/utils';

/**
 * No destructuring - Callback methods.
 *
 * @since 1.0.0
 */
export type NoDestructuringCallbackMethods = Set<string>;

/**
 * No destructuring - Check assignment.
 *
 * @since 1.0.0
 */
export type NoDestructuringCheckAssignmentNode = TSESTree.AssignmentExpression;

export type NoDestructuringCheckAssignmentReturns = void;

/**
 * No destructuring - Check callback.
 *
 * @since 1.0.0
 */
export type NoDestructuringCheckCallbackNode = TSESTree.ArrowFunctionExpression | TSESTree.FunctionExpression;

export type NoDestructuringCheckCallbackReturns = void;

/**
 * No destructuring - Check declarator.
 *
 * @since 1.0.0
 */
export type NoDestructuringCheckDeclaratorNode = TSESTree.VariableDeclarator;

export type NoDestructuringCheckDeclaratorReturns = void;

/**
 * No destructuring - Check for of.
 *
 * @since 1.0.0
 */
export type NoDestructuringCheckForOfNode = TSESTree.ForOfStatement;

export type NoDestructuringCheckForOfReturns = void;

/**
 * No destructuring - Check function.
 *
 * @since 1.0.0
 */
export type NoDestructuringCheckFunctionNode = TSESTree.FunctionDeclaration | TSESTree.FunctionExpression | TSESTree.ArrowFunctionExpression;

export type NoDestructuringCheckFunctionReturns = void;

/**
 * No destructuring - Default options.
 *
 * @since 1.0.0
 */
export type NoDestructuringDefaultOptionsFunctionParams = boolean;

export type NoDestructuringDefaultOptionsCallbackParams = boolean;

export type NoDestructuringDefaultOptionsForOfLoops = boolean;

export type NoDestructuringDefaultOptionsVariableDeclarations = boolean;

export type NoDestructuringDefaultOptionsAssignmentExpressions = boolean;

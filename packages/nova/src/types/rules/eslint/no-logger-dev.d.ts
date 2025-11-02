import type { TSESLint, TSESTree } from '@typescript-eslint/utils';

/**
 * No logger dev - Find variable.
 *
 * @since 1.0.0
 */
export type NoLoggerDevFindVariableIdentifier = TSESTree.Identifier;

export type NoLoggerDevFindVariableReturns = TSESLint.Scope.Variable | undefined;

/**
 * No logger dev - Is logger customize call.
 *
 * @since 1.0.0
 */
export type NoLoggerDevIsLoggerCustomizeCallNode = TSESTree.Node | null | undefined;

export type NoLoggerDevIsLoggerCustomizeCallTypeGuard = TSESTree.CallExpression;

/**
 * No logger dev - Came from logger customize.
 *
 * @since 1.0.0
 */
export type NoLoggerDevCameFromLoggerCustomizeIdentifier = TSESTree.Identifier;

export type NoLoggerDevCameFromLoggerCustomizeReturns = boolean;

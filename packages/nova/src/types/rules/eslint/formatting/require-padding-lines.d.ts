import type { TSESTree } from '@typescript-eslint/utils';

/**
 * Require padding lines - Check body.
 *
 * @since 1.0.0
 */
export type RequirePaddingLinesCheckBodyNode = TSESTree.Program | TSESTree.BlockStatement;

export type RequirePaddingLinesCheckBodyReturns = void;

/**
 * Require padding lines - Check switch cases.
 *
 * @since 1.0.0
 */
export type RequirePaddingLinesCheckSwitchCasesNode = TSESTree.SwitchStatement;

export type RequirePaddingLinesCheckSwitchCasesReturns = void;

/**
 * Require padding lines - Default options.
 *
 * @since 1.0.0
 */
export type RequirePaddingLinesDefaultOptionsExitCodeBeforeReturn = boolean;

export type RequirePaddingLinesDefaultOptionsBeforeLoops = boolean;

export type RequirePaddingLinesDefaultOptionsBareAwait = boolean;

export type RequirePaddingLinesDefaultOptionsBetweenOperations = boolean;

export type RequirePaddingLinesDefaultOptionsBetweenSwitchCases = boolean;

/**
 * Require padding lines - Is bare await expression.
 *
 * @since 1.0.0
 */
export type RequirePaddingLinesIsBareAwaitExpressionNode = TSESTree.Statement;

export type RequirePaddingLinesIsBareAwaitExpressionReturns = boolean;

/**
 * Require padding lines - Is expression operation.
 *
 * @since 1.0.0
 */
export type RequirePaddingLinesIsExpressionOperationNode = TSESTree.Statement;

export type RequirePaddingLinesIsExpressionOperationReturns = boolean;

/**
 * Require padding lines - Is loop statement.
 *
 * @since 1.0.0
 */
export type RequirePaddingLinesIsLoopStatementNode = TSESTree.Statement;

export type RequirePaddingLinesIsLoopStatementReturns = boolean;

/**
 * Require padding lines - Is process exit code assignment.
 *
 * @since 1.0.0
 */
export type RequirePaddingLinesIsProcessExitCodeAssignmentNode = TSESTree.Statement;

export type RequirePaddingLinesIsProcessExitCodeAssignmentReturns = boolean;

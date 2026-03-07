import type { TSESTree } from '@typescript-eslint/utils';

/**
 * No implicit boolean - Check condition.
 *
 * @since 1.0.0
 */
export type NoImplicitBooleanCheckConditionNode = TSESTree.IfStatement | TSESTree.WhileStatement | TSESTree.DoWhileStatement | TSESTree.ForStatement | TSESTree.ConditionalExpression;

export type NoImplicitBooleanCheckConditionReturns = void;

/**
 * No implicit boolean - Is implicit boolean.
 *
 * @since 1.0.0
 */
export type NoImplicitBooleanIsImplicitBooleanNode = TSESTree.Node;

export type NoImplicitBooleanIsImplicitBooleanReturns = boolean;

/**
 * No implicit boolean - Report implicit nodes.
 *
 * @since 1.0.0
 */
export type NoImplicitBooleanReportImplicitNodesTest = TSESTree.Node;

export type NoImplicitBooleanReportImplicitNodesReturns = void;

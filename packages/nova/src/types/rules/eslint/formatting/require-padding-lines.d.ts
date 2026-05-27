import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Check Body.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Node = TSESTree.Program | TSESTree.BlockStatement;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_ExitCodeBeforeReturn = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BeforeLoops = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BareAwait = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BetweenOperations = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Returns = void;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Statements = TSESTree.Statement[];

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Prev = TSESTree.Statement | undefined;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Curr = TSESTree.Statement | undefined;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevEndLine = number;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrStartLine = number;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_HasBlankLine = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrIsBareAwait = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevIsBareAwait = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrIsDeclaration = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevIsDeclaration = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevKey = string | undefined;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrKey = string | undefined;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Check Line Comments.
 *
 * @since 0.15.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Returns = void;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_AllComments = TSESTree.Comment[];

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Lines = string[];

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_CommentLine = number;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_CurrentLineContent = string | undefined;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_PrevLineContent = string | undefined;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_TrimmedPrevLine = string;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Check Switch Cases.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Context = Readonly<RuleContext<string, unknown[]>>;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Node = TSESTree.SwitchStatement;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Returns = void;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Cases = TSESTree.SwitchCase[];

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Prev = TSESTree.SwitchCase | undefined;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Curr = TSESTree.SwitchCase | undefined;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_PrevEndLine = number;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_CurrStartLine = number;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_HasBlankLine = boolean;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Get Callee Key.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Node = TSESTree.Statement;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Returns = string | undefined;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Expression = TSESTree.Expression;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Is Bare Await Expression.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsBareAwaitExpression_Node = TSESTree.Statement;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsBareAwaitExpression_Returns = boolean;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Is Expression Operation.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Node = TSESTree.Statement;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Returns = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Expression = TSESTree.Expression;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Is Loop Statement.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsLoopStatement_Node = TSESTree.Statement;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsLoopStatement_Returns = boolean;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Is Process Exit Code Assignment.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Node = TSESTree.Statement;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Returns = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Expression = TSESTree.Expression;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Left = TSESTree.Expression | TSESTree.PrivateIdentifier;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Object = TSESTree.Expression;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Property = TSESTree.Expression | TSESTree.PrivateIdentifier;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Rule.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBareAwait = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBeforeLineComment = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBeforeLoops = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBetweenOperations = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBetweenSwitchCases = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsExitCodeBeforeReturn = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsIgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_IgnoreFiles = string[];

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_ExitCodeBeforeReturn = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BeforeLineComment = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BeforeLoops = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BareAwait = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BetweenOperations = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BetweenSwitchCases = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions = Readonly<{
  ignoreFiles: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_IgnoreFiles;
  exitCodeBeforeReturn: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_ExitCodeBeforeReturn;
  beforeLineComment: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BeforeLineComment;
  beforeLoops: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BeforeLoops;
  bareAwait: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BareAwait;
  betweenOperations: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BetweenOperations;
  betweenSwitchCases: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions_BetweenSwitchCases;
}>;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckExitCodeBeforeReturn = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBeforeLoops = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBareAwait = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBeforeLineComment = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBetweenOperations = boolean;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBetweenSwitchCases = boolean;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Serialize Callee.
 *
 * @since 0.14.0
 */
export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Node = TSESTree.Expression;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Returns = string | undefined;

export type Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Object = string | undefined;

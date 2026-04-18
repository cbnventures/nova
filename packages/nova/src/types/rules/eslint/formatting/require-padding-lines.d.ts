import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Check Body.
 *
 * @since 0.14.0
 */
export type RulesEslintFormattingRequirePaddingLinesCheckBodyContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyNode = TSESTree.Program | TSESTree.BlockStatement;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyExitCodeBeforeReturn = boolean;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyBeforeLoops = boolean;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyBareAwait = boolean;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyBetweenOperations = boolean;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyReturns = void;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyStatements = TSESTree.Statement[];

export type RulesEslintFormattingRequirePaddingLinesCheckBodyPrev = TSESTree.Statement | undefined;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyCurr = TSESTree.Statement | undefined;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyPrevEndLine = number;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyCurrStartLine = number;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyHasBlankLine = boolean;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyCurrIsBareAwait = boolean;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyPrevIsBareAwait = boolean;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyCurrIsDeclaration = boolean;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyPrevIsDeclaration = boolean;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyPrevKey = string | undefined;

export type RulesEslintFormattingRequirePaddingLinesCheckBodyCurrKey = string | undefined;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Check Line Comments.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingRequirePaddingLinesCheckLineCommentsContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingRequirePaddingLinesCheckLineCommentsReturns = void;

export type RulesEslintFormattingRequirePaddingLinesCheckLineCommentsAllComments = TSESTree.Comment[];

export type RulesEslintFormattingRequirePaddingLinesCheckLineCommentsLines = string[];

export type RulesEslintFormattingRequirePaddingLinesCheckLineCommentsCommentLine = number;

export type RulesEslintFormattingRequirePaddingLinesCheckLineCommentsCurrentLineContent = string | undefined;

export type RulesEslintFormattingRequirePaddingLinesCheckLineCommentsPrevLineContent = string | undefined;

export type RulesEslintFormattingRequirePaddingLinesCheckLineCommentsTrimmedPrevLine = string;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Check Switch Cases.
 *
 * @since 0.14.0
 */
export type RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesNode = TSESTree.SwitchStatement;

export type RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesReturns = void;

export type RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesCases = TSESTree.SwitchCase[];

export type RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesPrev = TSESTree.SwitchCase | undefined;

export type RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesCurr = TSESTree.SwitchCase | undefined;

export type RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesPrevEndLine = number;

export type RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesCurrStartLine = number;

export type RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesHasBlankLine = boolean;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Get Callee Key.
 *
 * @since 0.14.0
 */
export type RulesEslintFormattingRequirePaddingLinesGetCalleeKeyNode = TSESTree.Statement;

export type RulesEslintFormattingRequirePaddingLinesGetCalleeKeyReturns = string | undefined;

export type RulesEslintFormattingRequirePaddingLinesGetCalleeKeyExpression = TSESTree.Expression;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Is Bare Await Expression.
 *
 * @since 0.14.0
 */
export type RulesEslintFormattingRequirePaddingLinesIsBareAwaitExpressionNode = TSESTree.Statement;

export type RulesEslintFormattingRequirePaddingLinesIsBareAwaitExpressionReturns = boolean;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Is Expression Operation.
 *
 * @since 0.14.0
 */
export type RulesEslintFormattingRequirePaddingLinesIsExpressionOperationNode = TSESTree.Statement;

export type RulesEslintFormattingRequirePaddingLinesIsExpressionOperationReturns = boolean;

export type RulesEslintFormattingRequirePaddingLinesIsExpressionOperationExpression = TSESTree.Expression;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Is Loop Statement.
 *
 * @since 0.14.0
 */
export type RulesEslintFormattingRequirePaddingLinesIsLoopStatementNode = TSESTree.Statement;

export type RulesEslintFormattingRequirePaddingLinesIsLoopStatementReturns = boolean;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Is Process Exit Code Assignment.
 *
 * @since 0.14.0
 */
export type RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentNode = TSESTree.Statement;

export type RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentReturns = boolean;

export type RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentExpression = TSESTree.Expression;

export type RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentLeft = TSESTree.Expression | TSESTree.PrivateIdentifier;

export type RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentObject = TSESTree.Expression;

export type RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentProperty = TSESTree.Expression | TSESTree.PrivateIdentifier;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Rule.
 *
 * @since 0.14.0
 */
export type RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBareAwait = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBeforeLineComment = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBeforeLoops = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBetweenOperations = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBetweenSwitchCases = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsExitCodeBeforeReturn = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequirePaddingLinesRuleOptionsIgnoreFiles = string[];

export type RulesEslintFormattingRequirePaddingLinesRuleOptionsExitCodeBeforeReturn = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleOptionsBeforeLineComment = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleOptionsBeforeLoops = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleOptionsBareAwait = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleOptionsBetweenOperations = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleOptionsBetweenSwitchCases = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleOptions = Readonly<{
  ignoreFiles: RulesEslintFormattingRequirePaddingLinesRuleOptionsIgnoreFiles;
  exitCodeBeforeReturn: RulesEslintFormattingRequirePaddingLinesRuleOptionsExitCodeBeforeReturn;
  beforeLineComment: RulesEslintFormattingRequirePaddingLinesRuleOptionsBeforeLineComment;
  beforeLoops: RulesEslintFormattingRequirePaddingLinesRuleOptionsBeforeLoops;
  bareAwait: RulesEslintFormattingRequirePaddingLinesRuleOptionsBareAwait;
  betweenOperations: RulesEslintFormattingRequirePaddingLinesRuleOptionsBetweenOperations;
  betweenSwitchCases: RulesEslintFormattingRequirePaddingLinesRuleOptionsBetweenSwitchCases;
}>;

export type RulesEslintFormattingRequirePaddingLinesRuleCheckExitCodeBeforeReturn = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleCheckBeforeLoops = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleCheckBareAwait = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleCheckBeforeLineComment = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleCheckBetweenOperations = boolean;

export type RulesEslintFormattingRequirePaddingLinesRuleCheckBetweenSwitchCases = boolean;

/**
 * Rules - ESLint - Formatting - Require Padding Lines - Serialize Callee.
 *
 * @since 0.14.0
 */
export type RulesEslintFormattingRequirePaddingLinesSerializeCalleeNode = TSESTree.Expression;

export type RulesEslintFormattingRequirePaddingLinesSerializeCalleeReturns = string | undefined;

export type RulesEslintFormattingRequirePaddingLinesSerializeCalleeObject = string | undefined;

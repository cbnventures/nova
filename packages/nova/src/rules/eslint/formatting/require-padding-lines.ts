import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintFormattingRequirePaddingLinesCheckBodyBareAwait,
  RulesEslintFormattingRequirePaddingLinesCheckBodyBeforeLoops,
  RulesEslintFormattingRequirePaddingLinesCheckBodyBetweenOperations,
  RulesEslintFormattingRequirePaddingLinesCheckBodyContext,
  RulesEslintFormattingRequirePaddingLinesCheckBodyCurr,
  RulesEslintFormattingRequirePaddingLinesCheckBodyCurrIsBareAwait,
  RulesEslintFormattingRequirePaddingLinesCheckBodyCurrIsDeclaration,
  RulesEslintFormattingRequirePaddingLinesCheckBodyCurrKey,
  RulesEslintFormattingRequirePaddingLinesCheckBodyCurrStartLine,
  RulesEslintFormattingRequirePaddingLinesCheckBodyExitCodeBeforeReturn,
  RulesEslintFormattingRequirePaddingLinesCheckBodyHasBlankLine,
  RulesEslintFormattingRequirePaddingLinesCheckBodyNode,
  RulesEslintFormattingRequirePaddingLinesCheckBodyPrev,
  RulesEslintFormattingRequirePaddingLinesCheckBodyPrevEndLine,
  RulesEslintFormattingRequirePaddingLinesCheckBodyPrevIsBareAwait,
  RulesEslintFormattingRequirePaddingLinesCheckBodyPrevIsDeclaration,
  RulesEslintFormattingRequirePaddingLinesCheckBodyPrevKey,
  RulesEslintFormattingRequirePaddingLinesCheckBodyReturns,
  RulesEslintFormattingRequirePaddingLinesCheckBodyStatements,
  RulesEslintFormattingRequirePaddingLinesCheckLineCommentsAllComments,
  RulesEslintFormattingRequirePaddingLinesCheckLineCommentsCommentLine,
  RulesEslintFormattingRequirePaddingLinesCheckLineCommentsContext,
  RulesEslintFormattingRequirePaddingLinesCheckLineCommentsCurrentLineContent,
  RulesEslintFormattingRequirePaddingLinesCheckLineCommentsLines,
  RulesEslintFormattingRequirePaddingLinesCheckLineCommentsPrevLineContent,
  RulesEslintFormattingRequirePaddingLinesCheckLineCommentsReturns,
  RulesEslintFormattingRequirePaddingLinesCheckLineCommentsTrimmedPrevLine,
  RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesCases,
  RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesContext,
  RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesCurr,
  RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesCurrStartLine,
  RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesHasBlankLine,
  RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesNode,
  RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesPrev,
  RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesPrevEndLine,
  RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesReturns,
  RulesEslintFormattingRequirePaddingLinesGetCalleeKeyExpression,
  RulesEslintFormattingRequirePaddingLinesGetCalleeKeyNode,
  RulesEslintFormattingRequirePaddingLinesGetCalleeKeyReturns,
  RulesEslintFormattingRequirePaddingLinesIsBareAwaitExpressionNode,
  RulesEslintFormattingRequirePaddingLinesIsBareAwaitExpressionReturns,
  RulesEslintFormattingRequirePaddingLinesIsExpressionOperationExpression,
  RulesEslintFormattingRequirePaddingLinesIsExpressionOperationNode,
  RulesEslintFormattingRequirePaddingLinesIsExpressionOperationReturns,
  RulesEslintFormattingRequirePaddingLinesIsLoopStatementNode,
  RulesEslintFormattingRequirePaddingLinesIsLoopStatementReturns,
  RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentExpression,
  RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentLeft,
  RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentNode,
  RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentObject,
  RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentProperty,
  RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentReturns,
  RulesEslintFormattingRequirePaddingLinesRuleCheckBareAwait,
  RulesEslintFormattingRequirePaddingLinesRuleCheckBeforeLineComment,
  RulesEslintFormattingRequirePaddingLinesRuleCheckBeforeLoops,
  RulesEslintFormattingRequirePaddingLinesRuleCheckBetweenOperations,
  RulesEslintFormattingRequirePaddingLinesRuleCheckBetweenSwitchCases,
  RulesEslintFormattingRequirePaddingLinesRuleCheckExitCodeBeforeReturn,
  RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBareAwait,
  RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBeforeLineComment,
  RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBeforeLoops,
  RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBetweenOperations,
  RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBetweenSwitchCases,
  RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsExitCodeBeforeReturn,
  RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsIgnoreFiles,
  RulesEslintFormattingRequirePaddingLinesRuleOptions,
  RulesEslintFormattingRequirePaddingLinesSerializeCalleeNode,
  RulesEslintFormattingRequirePaddingLinesSerializeCalleeObject,
  RulesEslintFormattingRequirePaddingLinesSerializeCalleeReturns,
} from '../../../types/rules/eslint/formatting/require-padding-lines.d.ts';

/**
 * Rules - ESLint - Formatting - Require Padding Lines.
 *
 * Enforces blank lines between specific statement patterns such as exit-code-before-return,
 * loops, bare awaits, distinct operations, and switch cases.
 *
 * @since 0.14.0
 */
export class RulesEslintFormattingRequirePaddingLines {
  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Rule.
   *
   * Registered as a fixable layout rule in the eslint config.
   * Delegates to checkBody for block-level checks and checkLineComments for comment spacing.
   *
   * @since 0.14.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-padding-lines',
    meta: {
      type: 'layout',
      docs: {
        description: 'Require blank lines between specific statement patterns for readability.',
      },
      fixable: 'whitespace',
      messages: {
        exitCodeBeforeReturn: 'Add a blank line between the `process.exitCode` assignment and the return statement.',
        beforeLoops: 'Add a blank line before this loop statement.',
        bareAwait: 'Add a blank line to separate this bare `await` from surrounding declarations.',
        beforeLineComment: 'Add a blank line before this line comment.',
        betweenOperations: 'Add a blank line between distinct operations.',
        betweenSwitchCases: 'Add a blank line between switch cases.',
      },
      schema: [{
        type: 'object',
        properties: {
          bareAwait: {
            type: 'boolean',
          },
          beforeLineComment: {
            type: 'boolean',
          },
          beforeLoops: {
            type: 'boolean',
          },
          betweenOperations: {
            type: 'boolean',
          },
          betweenSwitchCases: {
            type: 'boolean',
          },
          exitCodeBeforeReturn: {
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
      bareAwait: true as RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBareAwait,
      beforeLineComment: true as RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBeforeLineComment,
      beforeLoops: true as RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBeforeLoops,
      betweenOperations: true as RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBetweenOperations,
      betweenSwitchCases: true as RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsBetweenSwitchCases,
      exitCodeBeforeReturn: true as RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsExitCodeBeforeReturn,
      ignoreFiles: [] as RulesEslintFormattingRequirePaddingLinesRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintFormattingRequirePaddingLinesRuleOptions = defaultOptions[0];
      const checkExitCodeBeforeReturn: RulesEslintFormattingRequirePaddingLinesRuleCheckExitCodeBeforeReturn = options['exitCodeBeforeReturn'];
      const checkBeforeLoops: RulesEslintFormattingRequirePaddingLinesRuleCheckBeforeLoops = options['beforeLoops'];
      const checkBareAwait: RulesEslintFormattingRequirePaddingLinesRuleCheckBareAwait = options['bareAwait'];
      const checkBeforeLineComment: RulesEslintFormattingRequirePaddingLinesRuleCheckBeforeLineComment = options['beforeLineComment'];
      const checkBetweenOperations: RulesEslintFormattingRequirePaddingLinesRuleCheckBetweenOperations = options['betweenOperations'];
      const checkBetweenSwitchCases: RulesEslintFormattingRequirePaddingLinesRuleCheckBetweenSwitchCases = options['betweenSwitchCases'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program(node) {
          RulesEslintFormattingRequirePaddingLines.checkBody(context, node, checkExitCodeBeforeReturn, checkBeforeLoops, checkBareAwait, checkBetweenOperations);

          if (checkBeforeLineComment === true) {
            RulesEslintFormattingRequirePaddingLines.checkLineComments(context);
          }

          return;
        },
        BlockStatement(node) {
          RulesEslintFormattingRequirePaddingLines.checkBody(context, node, checkExitCodeBeforeReturn, checkBeforeLoops, checkBareAwait, checkBetweenOperations);

          return;
        },
        ...(checkBetweenSwitchCases === true ? {
          SwitchStatement(node) {
            RulesEslintFormattingRequirePaddingLines.checkSwitchCases(context, node);

            return;
          },
        } : {}),
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Check Body.
   *
   * Iterates consecutive statement pairs in a Program or BlockStatement and reports when a
   * required blank line is missing between them.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequirePaddingLinesCheckBodyContext}              context              - Context.
   * @param {RulesEslintFormattingRequirePaddingLinesCheckBodyNode}                 node                 - Node.
   * @param {RulesEslintFormattingRequirePaddingLinesCheckBodyExitCodeBeforeReturn} exitCodeBeforeReturn - Exit code before return.
   * @param {RulesEslintFormattingRequirePaddingLinesCheckBodyBeforeLoops}          beforeLoops          - Before loops.
   * @param {RulesEslintFormattingRequirePaddingLinesCheckBodyBareAwait}            bareAwait            - Bare await.
   * @param {RulesEslintFormattingRequirePaddingLinesCheckBodyBetweenOperations}    betweenOperations    - Between operations.
   *
   * @returns {RulesEslintFormattingRequirePaddingLinesCheckBodyReturns}
   *
   * @since 0.14.0
   */
  private static checkBody(context: RulesEslintFormattingRequirePaddingLinesCheckBodyContext, node: RulesEslintFormattingRequirePaddingLinesCheckBodyNode, exitCodeBeforeReturn: RulesEslintFormattingRequirePaddingLinesCheckBodyExitCodeBeforeReturn, beforeLoops: RulesEslintFormattingRequirePaddingLinesCheckBodyBeforeLoops, bareAwait: RulesEslintFormattingRequirePaddingLinesCheckBodyBareAwait, betweenOperations: RulesEslintFormattingRequirePaddingLinesCheckBodyBetweenOperations): RulesEslintFormattingRequirePaddingLinesCheckBodyReturns {
    const statements: RulesEslintFormattingRequirePaddingLinesCheckBodyStatements = node.body;

    for (let i = 1; i < statements.length; i += 1) {
      const prev: RulesEslintFormattingRequirePaddingLinesCheckBodyPrev = statements[i - 1];
      const curr: RulesEslintFormattingRequirePaddingLinesCheckBodyCurr = statements[i];

      if (prev === undefined || curr === undefined) {
        continue;
      }

      const prevEndLine: RulesEslintFormattingRequirePaddingLinesCheckBodyPrevEndLine = prev.loc.end.line;
      const currStartLine: RulesEslintFormattingRequirePaddingLinesCheckBodyCurrStartLine = curr.loc.start.line;
      const hasBlankLine: RulesEslintFormattingRequirePaddingLinesCheckBodyHasBlankLine = currStartLine >= prevEndLine + 2;

      if (hasBlankLine === true) {
        continue;
      }

      // Check: process.exitCode = N followed by return.
      if (
        exitCodeBeforeReturn === true
        && RulesEslintFormattingRequirePaddingLines.isProcessExitCodeAssignment(prev) === true
        && curr.type === 'ReturnStatement'
      ) {
        context.report({
          node: curr,
          messageId: 'exitCodeBeforeReturn',
        });

        continue;
      }

      // Check: blank line before loop statements.
      if (
        beforeLoops === true
        && RulesEslintFormattingRequirePaddingLines.isLoopStatement(curr) === true
        && RulesEslintFormattingRequirePaddingLines.isLoopStatement(prev) === false
      ) {
        context.report({
          node: curr,
          messageId: 'beforeLoops',
        });

        continue;
      }

      // Check: bare await separated from declarations.
      if (bareAwait === true) {
        const currIsBareAwait: RulesEslintFormattingRequirePaddingLinesCheckBodyCurrIsBareAwait = RulesEslintFormattingRequirePaddingLines.isBareAwaitExpression(curr);
        const prevIsBareAwait: RulesEslintFormattingRequirePaddingLinesCheckBodyPrevIsBareAwait = RulesEslintFormattingRequirePaddingLines.isBareAwaitExpression(prev);
        const currIsDeclaration: RulesEslintFormattingRequirePaddingLinesCheckBodyCurrIsDeclaration = curr.type === 'VariableDeclaration';
        const prevIsDeclaration: RulesEslintFormattingRequirePaddingLinesCheckBodyPrevIsDeclaration = prev.type === 'VariableDeclaration';

        if (
          (
            currIsBareAwait === true
            && prevIsDeclaration === true
          )
          || (
            currIsDeclaration === true
            && prevIsBareAwait === true
          )
        ) {
          context.report({
            node: curr,
            messageId: 'bareAwait',
          });

          continue;
        }
      }

      // Check: blank line between declaration and expression statement.
      if (
        betweenOperations === true
        && prev.type === 'VariableDeclaration'
        && RulesEslintFormattingRequirePaddingLines.isExpressionOperation(curr) === true
      ) {
        context.report({
          node: curr,
          messageId: 'betweenOperations',
        });

        continue;
      }

      // Check: blank line between distinct expression statements.
      if (
        betweenOperations === true
        && RulesEslintFormattingRequirePaddingLines.isExpressionOperation(prev) === true
        && RulesEslintFormattingRequirePaddingLines.isExpressionOperation(curr) === true
      ) {
        const prevKey: RulesEslintFormattingRequirePaddingLinesCheckBodyPrevKey = RulesEslintFormattingRequirePaddingLines.getCalleeKey(prev);
        const currKey: RulesEslintFormattingRequirePaddingLinesCheckBodyCurrKey = RulesEslintFormattingRequirePaddingLines.getCalleeKey(curr);

        // Skip when both statements call the same function.
        if (
          prevKey !== undefined
          && currKey !== undefined
          && prevKey === currKey
        ) {
          continue;
        }

        // Skip when both are bare function calls (no member expression).
        if (
          prevKey !== undefined
          && currKey !== undefined
          && prevKey.includes('.') === false
          && currKey.includes('.') === false
        ) {
          continue;
        }

        context.report({
          node: curr,
          messageId: 'betweenOperations',
        });
      }
    }

    return;
  }

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Check Line Comments.
   *
   * Scans all line comments in the source and reports those not preceded by a blank line,
   * another comment, or an opening brace. Provides an auto-fix.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequirePaddingLinesCheckLineCommentsContext} context - Context.
   *
   * @returns {RulesEslintFormattingRequirePaddingLinesCheckLineCommentsReturns}
   *
   * @since 0.15.0
   */
  private static checkLineComments(context: RulesEslintFormattingRequirePaddingLinesCheckLineCommentsContext): RulesEslintFormattingRequirePaddingLinesCheckLineCommentsReturns {
    const allComments: RulesEslintFormattingRequirePaddingLinesCheckLineCommentsAllComments = context.sourceCode.getAllComments();
    const lines: RulesEslintFormattingRequirePaddingLinesCheckLineCommentsLines = context.sourceCode.lines;

    for (const comment of allComments) {
      // Only check line comments (//), not block comments (/* */).
      if (comment.type !== 'Line') {
        continue;
      }

      const commentLine: RulesEslintFormattingRequirePaddingLinesCheckLineCommentsCommentLine = comment.loc.start.line;

      // Skip trailing comments (code exists before the comment on the same line).
      const currentLineContent: RulesEslintFormattingRequirePaddingLinesCheckLineCommentsCurrentLineContent = lines[commentLine - 1];

      if (currentLineContent !== undefined && currentLineContent.trim().startsWith('//') === false) {
        continue;
      }

      // Skip if this is the first line of the file.
      if (commentLine <= 1) {
        continue;
      }

      const prevLineContent: RulesEslintFormattingRequirePaddingLinesCheckLineCommentsPrevLineContent = lines[commentLine - 2];

      if (prevLineContent === undefined) {
        continue;
      }

      const trimmedPrevLine: RulesEslintFormattingRequirePaddingLinesCheckLineCommentsTrimmedPrevLine = prevLineContent.trim();

      // Skip if previous line is blank.
      if (trimmedPrevLine === '') {
        continue;
      }

      // Skip if previous line is another comment (consecutive comments are fine).
      if (
        trimmedPrevLine.startsWith('//') === true
        || trimmedPrevLine.startsWith('*') === true
        || trimmedPrevLine.startsWith('/*') === true
      ) {
        continue;
      }

      // Skip if previous line is an opening brace (start of block).
      if (
        trimmedPrevLine === '{'
        || trimmedPrevLine.endsWith('{') === true
      ) {
        continue;
      }

      context.report({
        loc: comment.loc,
        messageId: 'beforeLineComment',
        fix(fixer) {
          return fixer.insertTextBeforeRange([
            comment.range[0],
            comment.range[0],
          ], '\n');
        },
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Check Switch Cases.
   *
   * Iterates consecutive case/default clauses and reports missing blank lines between them,
   * skipping empty fallthrough cases.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesContext} context - Context.
   * @param {RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesNode}    node    - Node.
   *
   * @returns {RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesReturns}
   *
   * @since 0.14.0
   */
  private static checkSwitchCases(context: RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesContext, node: RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesNode): RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesReturns {
    const cases: RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesCases = node.cases;

    for (let i = 1; i < cases.length; i += 1) {
      const prev: RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesPrev = cases[i - 1];
      const curr: RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesCurr = cases[i];

      if (prev === undefined || curr === undefined) {
        continue;
      }

      // Skip when the previous case is an empty fallthrough.
      if (prev.consequent.length === 0) {
        continue;
      }

      const prevEndLine: RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesPrevEndLine = prev.loc.end.line;
      const currStartLine: RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesCurrStartLine = curr.loc.start.line;
      const hasBlankLine: RulesEslintFormattingRequirePaddingLinesCheckSwitchCasesHasBlankLine = currStartLine >= prevEndLine + 2;

      if (hasBlankLine === true) {
        continue;
      }

      context.report({
        node: curr,
        messageId: 'betweenSwitchCases',
      });
    }

    return;
  }

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Get Callee Key.
   *
   * Used by checkBody to extract a serialized callee key from
   * an expression statement, unwrapping any await wrapper first.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequirePaddingLinesGetCalleeKeyNode} node - Node.
   *
   * @returns {RulesEslintFormattingRequirePaddingLinesGetCalleeKeyReturns}
   *
   * @since 0.14.0
   */
  private static getCalleeKey(node: RulesEslintFormattingRequirePaddingLinesGetCalleeKeyNode): RulesEslintFormattingRequirePaddingLinesGetCalleeKeyReturns {
    if (node.type !== 'ExpressionStatement') {
      return undefined;
    }

    let expression: RulesEslintFormattingRequirePaddingLinesGetCalleeKeyExpression = node.expression;

    // Unwrap await expressions.
    if (expression.type === 'AwaitExpression') {
      expression = expression.argument;
    }

    if (expression.type !== 'CallExpression') {
      return undefined;
    }

    return RulesEslintFormattingRequirePaddingLines.serializeCallee(expression.callee);
  }

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Is Bare Await Expression.
   *
   * Used by checkBody to detect standalone await statements that are not assigned to a
   * variable, so they can be separated from surrounding code.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequirePaddingLinesIsBareAwaitExpressionNode} node - Node.
   *
   * @returns {RulesEslintFormattingRequirePaddingLinesIsBareAwaitExpressionReturns}
   *
   * @since 0.14.0
   */
  private static isBareAwaitExpression(node: RulesEslintFormattingRequirePaddingLinesIsBareAwaitExpressionNode): RulesEslintFormattingRequirePaddingLinesIsBareAwaitExpressionReturns {
    if (node.type !== 'ExpressionStatement') {
      return false;
    }

    return node.expression.type === 'AwaitExpression';
  }

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Is Expression Operation.
   *
   * Used by checkBody to identify expression statements that are
   * call or await expressions, which require blank-line separation from declarations.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequirePaddingLinesIsExpressionOperationNode} node - Node.
   *
   * @returns {RulesEslintFormattingRequirePaddingLinesIsExpressionOperationReturns}
   *
   * @since 0.14.0
   */
  private static isExpressionOperation(node: RulesEslintFormattingRequirePaddingLinesIsExpressionOperationNode): RulesEslintFormattingRequirePaddingLinesIsExpressionOperationReturns {
    if (node.type !== 'ExpressionStatement') {
      return false;
    }

    const expression: RulesEslintFormattingRequirePaddingLinesIsExpressionOperationExpression = node.expression;

    return (
      expression.type === 'CallExpression'
      || expression.type === 'AwaitExpression'
    );
  }

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Is Loop Statement.
   *
   * Used by checkBody to detect for, for-in, for-of, while, and
   * do-while statements so a blank line can be required before them.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequirePaddingLinesIsLoopStatementNode} node - Node.
   *
   * @returns {RulesEslintFormattingRequirePaddingLinesIsLoopStatementReturns}
   *
   * @since 0.14.0
   */
  private static isLoopStatement(node: RulesEslintFormattingRequirePaddingLinesIsLoopStatementNode): RulesEslintFormattingRequirePaddingLinesIsLoopStatementReturns {
    return (
      node.type === 'ForStatement'
      || node.type === 'ForInStatement'
      || node.type === 'ForOfStatement'
      || node.type === 'WhileStatement'
      || node.type === 'DoWhileStatement'
    );
  }

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Is Process Exit Code Assignment.
   *
   * Used by checkBody to detect process.exitCode assignments so a blank line is required
   * before the subsequent return statement.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentNode} node - Node.
   *
   * @returns {RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentReturns}
   *
   * @since 0.14.0
   */
  private static isProcessExitCodeAssignment(node: RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentNode): RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentReturns {
    if (node.type !== 'ExpressionStatement') {
      return false;
    }

    const expression: RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentExpression = node.expression;

    if (expression.type !== 'AssignmentExpression') {
      return false;
    }

    const left: RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentLeft = expression.left;

    if (left.type !== 'MemberExpression') {
      return false;
    }

    const object: RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentObject = left.object;
    const property: RulesEslintFormattingRequirePaddingLinesIsProcessExitCodeAssignmentProperty = left.property;

    return (
      object.type === 'Identifier'
      && object.name === 'process'
      && property.type === 'Identifier'
      && property.name === 'exitCode'
    );
  }

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Serialize Callee.
   *
   * Recursively builds a dot-separated string from a callee node so getCalleeKey can compare
   * whether two consecutive calls target the same receiver.
   *
   * @private
   *
   * @param {RulesEslintFormattingRequirePaddingLinesSerializeCalleeNode} node - Node.
   *
   * @returns {RulesEslintFormattingRequirePaddingLinesSerializeCalleeReturns}
   *
   * @since 0.14.0
   */
  private static serializeCallee(node: RulesEslintFormattingRequirePaddingLinesSerializeCalleeNode): RulesEslintFormattingRequirePaddingLinesSerializeCalleeReturns {
    if (node.type === 'Identifier') {
      return node.name;
    }

    if (
      node.type === 'MemberExpression'
      && node.property.type === 'Identifier'
    ) {
      const object: RulesEslintFormattingRequirePaddingLinesSerializeCalleeObject = RulesEslintFormattingRequirePaddingLines.serializeCallee(node.object);

      if (object !== undefined) {
        return `${object}.${node.property.name}`;
      }
    }

    return undefined;
  }
}

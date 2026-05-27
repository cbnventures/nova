import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BareAwait,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BeforeLoops,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BetweenOperations,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Context,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Curr,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrIsBareAwait,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrIsDeclaration,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrKey,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrStartLine,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_ExitCodeBeforeReturn,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_HasBlankLine,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Node,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Prev,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevEndLine,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevIsBareAwait,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevIsDeclaration,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevKey,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Returns,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Statements,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_AllComments,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_CommentLine,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Context,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_CurrentLineContent,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Lines,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_PrevLineContent,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Returns,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_TrimmedPrevLine,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Cases,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Context,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Curr,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_CurrStartLine,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_HasBlankLine,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Node,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Prev,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_PrevEndLine,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Returns,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Expression,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Node,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Returns,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsBareAwaitExpression_Node,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsBareAwaitExpression_Returns,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Expression,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Node,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Returns,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsLoopStatement_Node,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsLoopStatement_Returns,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Expression,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Left,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Node,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Object,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Property,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Returns,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBareAwait,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBeforeLineComment,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBeforeLoops,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBetweenOperations,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBetweenSwitchCases,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckExitCodeBeforeReturn,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBareAwait,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBeforeLineComment,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBeforeLoops,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBetweenOperations,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBetweenSwitchCases,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsExitCodeBeforeReturn,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Node,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Object,
  Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Returns,
} from '../../../types/rules/eslint/formatting/require-padding-lines.d.ts';

/**
 * Rules - ESLint - Formatting - Require Padding Lines.
 *
 * Enforces blank lines between specific statement patterns such as exit-code-before-return,
 * loops, bare awaits, distinct operations, and switch cases.
 *
 * @since 0.14.0
 */
export class Runner {
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
      bareAwait: true as Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBareAwait,
      beforeLineComment: true as Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBeforeLineComment,
      beforeLoops: true as Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBeforeLoops,
      betweenOperations: true as Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBetweenOperations,
      betweenSwitchCases: true as Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsBetweenSwitchCases,
      exitCodeBeforeReturn: true as Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsExitCodeBeforeReturn,
      ignoreFiles: [] as Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleOptions = defaultOptions[0];
      const checkExitCodeBeforeReturn: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckExitCodeBeforeReturn = options['exitCodeBeforeReturn'];
      const checkBeforeLoops: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBeforeLoops = options['beforeLoops'];
      const checkBareAwait: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBareAwait = options['bareAwait'];
      const checkBeforeLineComment: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBeforeLineComment = options['beforeLineComment'];
      const checkBetweenOperations: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBetweenOperations = options['betweenOperations'];
      const checkBetweenSwitchCases: Rules_Eslint_Formatting_RequirePaddingLines_Runner_RuleCheckBetweenSwitchCases = options['betweenSwitchCases'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Program(node) {
          Runner.checkBody(context, node, checkExitCodeBeforeReturn, checkBeforeLoops, checkBareAwait, checkBetweenOperations);

          if (checkBeforeLineComment === true) {
            Runner.checkLineComments(context);
          }

          return;
        },
        BlockStatement(node) {
          Runner.checkBody(context, node, checkExitCodeBeforeReturn, checkBeforeLoops, checkBareAwait, checkBetweenOperations);

          return;
        },
        ...(checkBetweenSwitchCases === true ? {
          SwitchStatement(node) {
            Runner.checkSwitchCases(context, node);

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
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Context}              context              - Context.
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Node}                 node                 - Node.
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_ExitCodeBeforeReturn} exitCodeBeforeReturn - Exit code before return.
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BeforeLoops}          beforeLoops          - Before loops.
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BareAwait}            bareAwait            - Bare await.
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BetweenOperations}    betweenOperations    - Between operations.
   *
   * @returns {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Returns}
   *
   * @since 0.14.0
   */
  private static checkBody(context: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Context, node: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Node, exitCodeBeforeReturn: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_ExitCodeBeforeReturn, beforeLoops: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BeforeLoops, bareAwait: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BareAwait, betweenOperations: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_BetweenOperations): Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Returns {
    const statements: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Statements = node.body;

    for (let i = 1; i < statements.length; i += 1) {
      const prev: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Prev = statements[i - 1];
      const curr: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_Curr = statements[i];

      if (prev === undefined || curr === undefined) {
        continue;
      }

      const prevEndLine: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevEndLine = prev.loc.end.line;
      const currStartLine: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrStartLine = curr.loc.start.line;
      const hasBlankLine: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_HasBlankLine = currStartLine >= prevEndLine + 2;

      if (hasBlankLine === true) {
        continue;
      }

      // Check: process.exitCode = N followed by return.
      if (
        exitCodeBeforeReturn === true
        && Runner.isProcessExitCodeAssignment(prev) === true
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
        && Runner.isLoopStatement(curr) === true
        && Runner.isLoopStatement(prev) === false
      ) {
        context.report({
          node: curr,
          messageId: 'beforeLoops',
        });

        continue;
      }

      // Check: bare await separated from declarations.
      if (bareAwait === true) {
        const currIsBareAwait: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrIsBareAwait = Runner.isBareAwaitExpression(curr);
        const prevIsBareAwait: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevIsBareAwait = Runner.isBareAwaitExpression(prev);
        const currIsDeclaration: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrIsDeclaration = curr.type === 'VariableDeclaration';
        const prevIsDeclaration: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevIsDeclaration = prev.type === 'VariableDeclaration';

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
        && Runner.isExpressionOperation(curr) === true
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
        && Runner.isExpressionOperation(prev) === true
        && Runner.isExpressionOperation(curr) === true
      ) {
        const prevKey: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_PrevKey = Runner.getCalleeKey(prev);
        const currKey: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckBody_CurrKey = Runner.getCalleeKey(curr);

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
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Context} context - Context.
   *
   * @returns {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Returns}
   *
   * @since 0.15.0
   */
  private static checkLineComments(context: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Context): Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Returns {
    const allComments: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_AllComments = context.sourceCode.getAllComments();
    const lines: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_Lines = context.sourceCode.lines;

    for (const comment of allComments) {
      // Only check line comments (//), not block comments (/* */).
      if (comment.type !== 'Line') {
        continue;
      }

      const commentLine: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_CommentLine = comment.loc.start.line;

      // Skip trailing comments (code exists before the comment on the same line).
      const currentLineContent: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_CurrentLineContent = lines[commentLine - 1];

      if (currentLineContent !== undefined && currentLineContent.trim().startsWith('//') === false) {
        continue;
      }

      // Skip if this is the first line of the file.
      if (commentLine <= 1) {
        continue;
      }

      const prevLineContent: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_PrevLineContent = lines[commentLine - 2];

      if (prevLineContent === undefined) {
        continue;
      }

      const trimmedPrevLine: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckLineComments_TrimmedPrevLine = prevLineContent.trim();

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
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Context} context - Context.
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Returns}
   *
   * @since 0.14.0
   */
  private static checkSwitchCases(context: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Context, node: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Node): Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Returns {
    const cases: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Cases = node.cases;

    for (let i = 1; i < cases.length; i += 1) {
      const prev: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Prev = cases[i - 1];
      const curr: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_Curr = cases[i];

      if (prev === undefined || curr === undefined) {
        continue;
      }

      // Skip when the previous case is an empty fallthrough.
      if (prev.consequent.length === 0) {
        continue;
      }

      const prevEndLine: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_PrevEndLine = prev.loc.end.line;
      const currStartLine: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_CurrStartLine = curr.loc.start.line;
      const hasBlankLine: Rules_Eslint_Formatting_RequirePaddingLines_Runner_CheckSwitchCases_HasBlankLine = currStartLine >= prevEndLine + 2;

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
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Returns}
   *
   * @since 0.14.0
   */
  private static getCalleeKey(node: Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Node): Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Returns {
    if (node.type !== 'ExpressionStatement') {
      return undefined;
    }

    let expression: Rules_Eslint_Formatting_RequirePaddingLines_Runner_GetCalleeKey_Expression = node.expression;

    // Unwrap await expressions.
    if (expression.type === 'AwaitExpression') {
      expression = expression.argument;
    }

    if (expression.type !== 'CallExpression') {
      return undefined;
    }

    return Runner.serializeCallee(expression.callee);
  }

  /**
   * Rules - ESLint - Formatting - Require Padding Lines - Is Bare Await Expression.
   *
   * Used by checkBody to detect standalone await statements that are not assigned to a
   * variable, so they can be separated from surrounding code.
   *
   * @private
   *
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsBareAwaitExpression_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsBareAwaitExpression_Returns}
   *
   * @since 0.14.0
   */
  private static isBareAwaitExpression(node: Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsBareAwaitExpression_Node): Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsBareAwaitExpression_Returns {
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
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Returns}
   *
   * @since 0.14.0
   */
  private static isExpressionOperation(node: Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Node): Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Returns {
    if (node.type !== 'ExpressionStatement') {
      return false;
    }

    const expression: Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsExpressionOperation_Expression = node.expression;

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
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsLoopStatement_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsLoopStatement_Returns}
   *
   * @since 0.14.0
   */
  private static isLoopStatement(node: Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsLoopStatement_Node): Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsLoopStatement_Returns {
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
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Returns}
   *
   * @since 0.14.0
   */
  private static isProcessExitCodeAssignment(node: Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Node): Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Returns {
    if (node.type !== 'ExpressionStatement') {
      return false;
    }

    const expression: Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Expression = node.expression;

    if (expression.type !== 'AssignmentExpression') {
      return false;
    }

    const left: Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Left = expression.left;

    if (left.type !== 'MemberExpression') {
      return false;
    }

    const object: Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Object = left.object;
    const property: Rules_Eslint_Formatting_RequirePaddingLines_Runner_IsProcessExitCodeAssignment_Property = left.property;

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
   * @param {Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Node} node - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Returns}
   *
   * @since 0.14.0
   */
  private static serializeCallee(node: Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Node): Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Returns {
    if (node.type === 'Identifier') {
      return node.name;
    }

    if (
      node.type === 'MemberExpression'
      && node.property.type === 'Identifier'
    ) {
      const object: Rules_Eslint_Formatting_RequirePaddingLines_Runner_SerializeCallee_Object = Runner.serializeCallee(node.object);

      if (object !== undefined) {
        return `${object}.${node.property.name}`;
      }
    }

    return undefined;
  }
}

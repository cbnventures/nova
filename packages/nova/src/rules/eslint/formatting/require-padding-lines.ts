import { ESLintUtils } from '@typescript-eslint/utils';

import type {
  RequirePaddingLinesCheckBodyNode,
  RequirePaddingLinesCheckBodyReturns,
  RequirePaddingLinesCheckSwitchCasesNode,
  RequirePaddingLinesCheckSwitchCasesReturns,
  RequirePaddingLinesDefaultOptionsBareAwait,
  RequirePaddingLinesDefaultOptionsBeforeLoops,
  RequirePaddingLinesDefaultOptionsBetweenOperations,
  RequirePaddingLinesDefaultOptionsBetweenSwitchCases,
  RequirePaddingLinesDefaultOptionsExitCodeBeforeReturn,
  RequirePaddingLinesIsBareAwaitExpressionNode,
  RequirePaddingLinesIsBareAwaitExpressionReturns,
  RequirePaddingLinesIsExpressionOperationNode,
  RequirePaddingLinesIsExpressionOperationReturns,
  RequirePaddingLinesIsLoopStatementNode,
  RequirePaddingLinesIsLoopStatementReturns,
  RequirePaddingLinesIsProcessExitCodeAssignmentNode,
  RequirePaddingLinesIsProcessExitCodeAssignmentReturns,
} from '@/types/rules/eslint/formatting/require-padding-lines.d.ts';

/**
 * Require padding lines - Is process exit code assignment.
 *
 * @param {RequirePaddingLinesIsProcessExitCodeAssignmentNode} node - Statement node.
 *
 * @returns {RequirePaddingLinesIsProcessExitCodeAssignmentReturns}
 *
 * @since 1.0.0
 */
const isProcessExitCodeAssignment = (node: RequirePaddingLinesIsProcessExitCodeAssignmentNode): RequirePaddingLinesIsProcessExitCodeAssignmentReturns => {
  if (node.type !== 'ExpressionStatement') {
    return false;
  }

  const expression = node.expression;

  if (expression.type !== 'AssignmentExpression') {
    return false;
  }

  const left = expression.left;

  if (left.type !== 'MemberExpression') {
    return false;
  }

  const object = left.object;
  const property = left.property;

  return (
    object.type === 'Identifier'
    && object.name === 'process'
    && property.type === 'Identifier'
    && property.name === 'exitCode'
  );
};

/**
 * Require padding lines - Is loop statement.
 *
 * @param {RequirePaddingLinesIsLoopStatementNode} node - Statement node.
 *
 * @returns {RequirePaddingLinesIsLoopStatementReturns}
 *
 * @since 1.0.0
 */
const isLoopStatement = (node: RequirePaddingLinesIsLoopStatementNode): RequirePaddingLinesIsLoopStatementReturns => {
  return (
    node.type === 'ForStatement'
    || node.type === 'ForInStatement'
    || node.type === 'ForOfStatement'
    || node.type === 'WhileStatement'
    || node.type === 'DoWhileStatement'
  );
};

/**
 * Require padding lines - Is bare await expression.
 *
 * @param {RequirePaddingLinesIsBareAwaitExpressionNode} node - Statement node.
 *
 * @returns {RequirePaddingLinesIsBareAwaitExpressionReturns}
 *
 * @since 1.0.0
 */
const isBareAwaitExpression = (node: RequirePaddingLinesIsBareAwaitExpressionNode): RequirePaddingLinesIsBareAwaitExpressionReturns => {
  if (node.type !== 'ExpressionStatement') {
    return false;
  }

  return node.expression.type === 'AwaitExpression';
};

/**
 * Require padding lines - Is expression operation.
 *
 * @param {RequirePaddingLinesIsExpressionOperationNode} node - Statement node.
 *
 * @returns {RequirePaddingLinesIsExpressionOperationReturns}
 *
 * @since 1.0.0
 */
const isExpressionOperation = (node: RequirePaddingLinesIsExpressionOperationNode): RequirePaddingLinesIsExpressionOperationReturns => {
  if (node.type !== 'ExpressionStatement') {
    return false;
  }

  const expression = node.expression;

  return (
    expression.type === 'CallExpression'
    || expression.type === 'AwaitExpression'
  );
};

/**
 * Require padding lines.
 *
 * @since 1.0.0
 */
const requirePaddingLines = ESLintUtils.RuleCreator(() => '#')({
  name: 'require-padding-lines',
  meta: {
    type: 'layout',
    docs: {
      description: 'Require blank lines between specific statement patterns for readability.',
    },
    messages: {
      exitCodeBeforeReturn: 'Add a blank line between the `process.exitCode` assignment and the return statement.',
      beforeLoops: 'Add a blank line before this loop statement.',
      bareAwait: 'Add a blank line to separate this bare `await` from surrounding declarations.',
      betweenOperations: 'Add a blank line between distinct operations.',
      betweenSwitchCases: 'Add a blank line between switch cases.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          exitCodeBeforeReturn: {
            type: 'boolean',
          },
          beforeLoops: {
            type: 'boolean',
          },
          bareAwait: {
            type: 'boolean',
          },
          betweenOperations: {
            type: 'boolean',
          },
          betweenSwitchCases: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{
    exitCodeBeforeReturn: true as RequirePaddingLinesDefaultOptionsExitCodeBeforeReturn,
    beforeLoops: true as RequirePaddingLinesDefaultOptionsBeforeLoops,
    bareAwait: true as RequirePaddingLinesDefaultOptionsBareAwait,
    betweenOperations: true as RequirePaddingLinesDefaultOptionsBetweenOperations,
    betweenSwitchCases: true as RequirePaddingLinesDefaultOptionsBetweenSwitchCases,
  }],
  create(context, [options]) {
    const checkExitCodeBeforeReturn = options.exitCodeBeforeReturn;
    const checkBeforeLoops = options.beforeLoops;
    const checkBareAwait = options.bareAwait;
    const checkBetweenOperations = options.betweenOperations;
    const checkBetweenSwitchCases = options.betweenSwitchCases;

    /**
     * Require padding lines - Check body.
     *
     * @param {RequirePaddingLinesCheckBodyNode} node - Block or program node.
     *
     * @returns {RequirePaddingLinesCheckBodyReturns}
     *
     * @since 1.0.0
     */
    const checkBody = (node: RequirePaddingLinesCheckBodyNode): RequirePaddingLinesCheckBodyReturns => {
      const statements = node.body;

      for (let i = 1; i < statements.length; i += 1) {
        const prev = statements[i - 1];
        const curr = statements[i];

        if (prev === undefined || curr === undefined) {
          continue;
        }

        const prevEndLine = prev.loc.end.line;
        const currStartLine = curr.loc.start.line;
        const hasBlankLine = currStartLine >= prevEndLine + 2;

        if (hasBlankLine === true) {
          continue;
        }

        // Check: process.exitCode = N followed by return.
        if (checkExitCodeBeforeReturn === true && isProcessExitCodeAssignment(prev) && curr.type === 'ReturnStatement') {
          context.report({
            node: curr,
            messageId: 'exitCodeBeforeReturn',
          });

          continue;
        }

        // Check: blank line before loop statements.
        if (checkBeforeLoops === true && isLoopStatement(curr) && isLoopStatement(prev) === false) {
          context.report({
            node: curr,
            messageId: 'beforeLoops',
          });

          continue;
        }

        // Check: bare await separated from declarations.
        if (checkBareAwait === true) {
          const currIsBareAwait = isBareAwaitExpression(curr);
          const prevIsBareAwait = isBareAwaitExpression(prev);
          const currIsDeclaration = curr.type === 'VariableDeclaration';
          const prevIsDeclaration = prev.type === 'VariableDeclaration';

          if ((currIsBareAwait === true && prevIsDeclaration === true) || (currIsDeclaration === true && prevIsBareAwait === true)) {
            context.report({
              node: curr,
              messageId: 'bareAwait',
            });

            continue;
          }
        }

        // Check: blank line between distinct expression statements.
        if (checkBetweenOperations === true && isExpressionOperation(prev) && isExpressionOperation(curr)) {
          context.report({
            node: curr,
            messageId: 'betweenOperations',
          });
        }
      }
    };

    /**
     * Require padding lines - Check switch cases.
     *
     * @param {RequirePaddingLinesCheckSwitchCasesNode} node - Switch statement node.
     *
     * @returns {RequirePaddingLinesCheckSwitchCasesReturns}
     *
     * @since 1.0.0
     */
    const checkSwitchCases = (node: RequirePaddingLinesCheckSwitchCasesNode): RequirePaddingLinesCheckSwitchCasesReturns => {
      const cases = node.cases;

      for (let i = 1; i < cases.length; i += 1) {
        const prev = cases[i - 1];
        const curr = cases[i];

        if (prev === undefined || curr === undefined) {
          continue;
        }

        // Skip when the previous case is an empty fallthrough.
        if (prev.consequent.length === 0) {
          continue;
        }

        const prevEndLine = prev.loc.end.line;
        const currStartLine = curr.loc.start.line;
        const hasBlankLine = currStartLine >= prevEndLine + 2;

        if (hasBlankLine === true) {
          continue;
        }

        context.report({
          node: curr,
          messageId: 'betweenSwitchCases',
        });
      }
    };

    return {
      Program: checkBody,
      BlockStatement: checkBody,
      ...(checkBetweenSwitchCases === true ? { SwitchStatement: checkSwitchCases } : {}),
    };
  },
});

export default requirePaddingLines;

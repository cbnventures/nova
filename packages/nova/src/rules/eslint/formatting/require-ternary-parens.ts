import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Context,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Fix_Fixer,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Fix_Returns,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_IsParenthesized,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Node,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Returns,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_TokenAfter,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_TokenBefore,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_ConditionalExpression_Node,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_ConditionalExpression_Returns,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_Options,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/formatting/require-ternary-parens.d.ts';

/**
 * Rules - ESLint - Formatting - Require Ternary Parens.
 *
 * Wraps ternary conditions in parentheses so the test expression is visually separated from
 * the consequent and alternate branches.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - Formatting - Require Ternary Parens - Rule.
   *
   * Registered under the name require-ternary-parens and exported through the rules index as
   * RequireTernaryParens for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'require-ternary-parens',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Require parenthesized condition in ternary expressions.',
      },
      fixable: 'code',
      messages: {
        requireTernaryParens: 'Wrap the ternary condition in parentheses.',
      },
      schema: [{
        type: 'object',
        properties: {
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
      ignoreFiles: [] as Rules_Eslint_Formatting_RequireTernaryParens_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        ConditionalExpression(node: Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_ConditionalExpression_Node): Rules_Eslint_Formatting_RequireTernaryParens_Runner_Create_ConditionalExpression_Returns {
          Runner.checkConditionalExpression(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - Require Ternary Parens - Check Conditional Expression.
   *
   * Reports a ternary whose condition lacks wrapping parentheses and auto-fixes it. The
   * tokens immediately around the test detect an already-wrapped condition.
   *
   * @param {Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Context} context - Context.
   * @param {Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Node}    node    - Node.
   *
   * @private
   *
   * @returns {Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Returns}
   *
   * @since 0.15.0
   */
  private static checkConditionalExpression(context: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Context, node: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Node): Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Returns {
    const tokenBefore: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_TokenBefore = context.sourceCode.getTokenBefore(node.test);
    const tokenAfter: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_TokenAfter = context.sourceCode.getTokenAfter(node.test);

    // The condition is only genuinely wrapped when a '(' token opens immediately before the test
    // and a matching ')' token closes immediately after it. Inspecting a single preceding character
    // misfired on spaced parens like ( a === b ) and on ternaries nested in call arguments like foo(a ? 1 : 0).
    const isParenthesized: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_IsParenthesized = tokenBefore !== null
      && tokenBefore.value === '('
      && tokenAfter !== null
      && tokenAfter.value === ')';

    if (isParenthesized === false) {
      context.report({
        node,
        messageId: 'requireTernaryParens',
        fix(fixer: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Fix_Fixer): Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Fix_Returns {
          return [
            fixer.insertTextBefore(node.test, '('),
            fixer.insertTextAfter(node.test, ')'),
          ];
        },
      });
    }

    return;
  }
}

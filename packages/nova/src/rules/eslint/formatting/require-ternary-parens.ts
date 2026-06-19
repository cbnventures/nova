import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_CharBefore,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Context,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Fix_Fixer,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Fix_Returns,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Node,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Returns,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_SourceText,
  Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_TestStart,
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
   * Checks the character before the test expression start position
   * for an opening parenthesis and provides an auto-fix to wrap the condition.
   *
   * @private
   *
   * @param {Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Context} context - Context.
   * @param {Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Returns}
   *
   * @since 0.15.0
   */
  private static checkConditionalExpression(context: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Context, node: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Node): Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_Returns {
    const sourceText: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_SourceText = context.sourceCode.getText();
    const testStart: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_TestStart = node.test.range[0];

    if (testStart < 1) {
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

      return;
    }

    const charBefore: Rules_Eslint_Formatting_RequireTernaryParens_Runner_CheckConditionalExpression_CharBefore = sourceText[testStart - 1];

    if (charBefore !== '(') {
      context.report({
        node,
        messageId: 'requireTernaryParens',
        fix(fixer) {
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

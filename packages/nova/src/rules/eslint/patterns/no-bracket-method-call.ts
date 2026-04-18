import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintPatternsNoBracketMethodCallCheckCallExpressionCallee,
  RulesEslintPatternsNoBracketMethodCallCheckCallExpressionContext,
  RulesEslintPatternsNoBracketMethodCallCheckCallExpressionMethodName,
  RulesEslintPatternsNoBracketMethodCallCheckCallExpressionNode,
  RulesEslintPatternsNoBracketMethodCallCheckCallExpressionOptions,
  RulesEslintPatternsNoBracketMethodCallCheckCallExpressionProperty,
  RulesEslintPatternsNoBracketMethodCallCheckCallExpressionReturns,
  RulesEslintPatternsNoBracketMethodCallRuleDefaultOptionsAllowedMethods,
  RulesEslintPatternsNoBracketMethodCallRuleDefaultOptionsIgnoreFiles,
  RulesEslintPatternsNoBracketMethodCallRuleOptions,
} from '../../../types/rules/eslint/patterns/no-bracket-method-call.d.ts';

/**
 * Rules - ESLint - Patterns - No Bracket Method Call.
 *
 * Disallows calling methods through bracket notation with a static string key. Dot notation
 * is clearer and bracket access is reserved for property reads.
 *
 * @since 0.15.0
 */
export class RulesEslintPatternsNoBracketMethodCall {
  /**
   * Rules - ESLint - Patterns - No Bracket Method Call - Rule.
   *
   * Registered under the name no-bracket-method-call and exported through the rules index as
   * NoBracketMethodCall for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-bracket-method-call',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow calling methods via bracket notation with a static string key.',
      },
      fixable: 'code',
      messages: {
        noBracketMethodCall: 'Use dot notation to call "{{ method }}" instead of bracket notation.',
      },
      schema: [{
        type: 'object',
        properties: {
          allowedMethods: {
            type: 'array',
            items: {
              type: 'string',
            },
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
      allowedMethods: [] as RulesEslintPatternsNoBracketMethodCallRuleDefaultOptionsAllowedMethods,
      ignoreFiles: [] as RulesEslintPatternsNoBracketMethodCallRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintPatternsNoBracketMethodCallRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        CallExpression(node) {
          RulesEslintPatternsNoBracketMethodCall.checkCallExpression(context, node, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Patterns - No Bracket Method Call - Check Call Expression.
   *
   * Inspects computed MemberExpression callees with
   * static string keys and provides an auto-fix that
   * replaces bracket notation with dot notation.
   *
   * @private
   *
   * @param {RulesEslintPatternsNoBracketMethodCallCheckCallExpressionContext} context - Context.
   * @param {RulesEslintPatternsNoBracketMethodCallCheckCallExpressionNode}    node    - Node.
   * @param {RulesEslintPatternsNoBracketMethodCallCheckCallExpressionOptions} options - Options.
   *
   * @returns {RulesEslintPatternsNoBracketMethodCallCheckCallExpressionReturns}
   *
   * @since 0.15.0
   */
  private static checkCallExpression(context: RulesEslintPatternsNoBracketMethodCallCheckCallExpressionContext, node: RulesEslintPatternsNoBracketMethodCallCheckCallExpressionNode, options: RulesEslintPatternsNoBracketMethodCallCheckCallExpressionOptions): RulesEslintPatternsNoBracketMethodCallCheckCallExpressionReturns {
    const callee: RulesEslintPatternsNoBracketMethodCallCheckCallExpressionCallee = node.callee;

    if (callee.type !== 'MemberExpression') {
      return;
    }

    if (callee.computed === false) {
      return;
    }

    const property: RulesEslintPatternsNoBracketMethodCallCheckCallExpressionProperty = callee.property;

    if (property.type !== 'Literal') {
      return;
    }

    if (typeof property.value !== 'string') {
      return;
    }

    const methodName: RulesEslintPatternsNoBracketMethodCallCheckCallExpressionMethodName = property.value;

    if (options['allowedMethods'].includes(methodName) === true) {
      return;
    }

    context.report({
      node: callee,
      messageId: 'noBracketMethodCall',
      data: {
        method: methodName,
      },
      fix(fixer) {
        return fixer.replaceTextRange([
          callee.object.range[1],
          callee.range[1],
        ], `.${methodName}`);
      },
    });

    return;
  }
}

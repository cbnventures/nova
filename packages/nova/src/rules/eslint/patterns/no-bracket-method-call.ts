import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Callee,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Context,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Fix_Fixer,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Fix_Returns,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_MethodName,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Node,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Options,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Property,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Returns,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_CallExpression_Node,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_CallExpression_Returns,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_Options,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleDefaultOptionsAllowedMethods,
  Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/patterns/no-bracket-method-call.d.ts';

/**
 * Rules - ESLint - Patterns - No Bracket Method Call.
 *
 * Disallows calling methods through bracket notation with a static string key. Dot notation
 * is clearer and bracket access is reserved for property reads.
 *
 * @since 0.15.0
 */
export class Runner {
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
      allowedMethods: [] as Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleDefaultOptionsAllowedMethods,
      ignoreFiles: [] as Rules_Eslint_Patterns_NoBracketMethodCall_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        CallExpression(node: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_CallExpression_Node): Rules_Eslint_Patterns_NoBracketMethodCall_Runner_Create_CallExpression_Returns {
          Runner.checkCallExpression(context, node, options);

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
   * @param {Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Context} context - Context.
   * @param {Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Node}    node    - Node.
   * @param {Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Options} options - Options.
   *
   * @returns {Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Returns}
   *
   * @since 0.15.0
   */
  private static checkCallExpression(context: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Context, node: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Node, options: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Options): Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Returns {
    const callee: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Callee = node.callee;

    if (callee.type !== 'MemberExpression') {
      return;
    }

    if (callee.computed === false) {
      return;
    }

    const property: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Property = callee.property;

    if (property.type !== 'Literal') {
      return;
    }

    if (typeof property.value !== 'string') {
      return;
    }

    const methodName: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_MethodName = property.value;

    if (options['allowedMethods'].includes(methodName) === true) {
      return;
    }

    context.report({
      node: callee,
      messageId: 'noBracketMethodCall',
      data: {
        method: methodName,
      },
      fix(fixer: Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Fix_Fixer): Rules_Eslint_Patterns_NoBracketMethodCall_Runner_CheckCallExpression_Fix_Returns {
        return fixer.replaceTextRange([
          callee.object.range[1],
          callee.range[1],
        ], `.${methodName}`);
      },
    });

    return;
  }
}

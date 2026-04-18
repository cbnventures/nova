import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintPatternsNoBracketAssignmentCheckAssignmentContext,
  RulesEslintPatternsNoBracketAssignmentCheckAssignmentLeft,
  RulesEslintPatternsNoBracketAssignmentCheckAssignmentNode,
  RulesEslintPatternsNoBracketAssignmentCheckAssignmentObjectText,
  RulesEslintPatternsNoBracketAssignmentCheckAssignmentPropertyText,
  RulesEslintPatternsNoBracketAssignmentCheckAssignmentReturns,
  RulesEslintPatternsNoBracketAssignmentCheckAssignmentValueText,
  RulesEslintPatternsNoBracketAssignmentRuleDefaultOptionsIgnoreFiles,
  RulesEslintPatternsNoBracketAssignmentRuleOptions,
} from '../../../types/rules/eslint/patterns/no-bracket-assignment.d.ts';

/**
 * Rules - ESLint - Patterns - No Bracket Assignment.
 *
 * Replaces bracket-notation assignment with Reflect.set so dynamic property writes are
 * explicit function calls that stand out in code review.
 *
 * @since 0.14.0
 */
export class RulesEslintPatternsNoBracketAssignment {
  /**
   * Rules - ESLint - Patterns - No Bracket Assignment - Rule.
   *
   * Registered under the name no-bracket-assignment and exported through the rules index as
   * NoBracketAssignment for preset consumption.
   *
   * @since 0.14.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-bracket-assignment',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow bracket notation assignment. Use `Reflect.set()` instead.',
      },
      fixable: 'code',
      messages: {
        useReflectSet: 'Use `Reflect.set(target, key, value)` instead of bracket assignment.',
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
      ignoreFiles: [] as RulesEslintPatternsNoBracketAssignmentRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintPatternsNoBracketAssignmentRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        AssignmentExpression(node) {
          RulesEslintPatternsNoBracketAssignment.checkAssignment(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Patterns - No Bracket Assignment - Check Assignment.
   *
   * Detects computed MemberExpression on the left
   * side of an assignment and provides an auto-fix
   * that rewrites it as a Reflect.set call.
   *
   * @private
   *
   * @param {RulesEslintPatternsNoBracketAssignmentCheckAssignmentContext} context - Context.
   * @param {RulesEslintPatternsNoBracketAssignmentCheckAssignmentNode}    node    - Node.
   *
   * @returns {RulesEslintPatternsNoBracketAssignmentCheckAssignmentReturns}
   *
   * @since 0.14.0
   */
  private static checkAssignment(context: RulesEslintPatternsNoBracketAssignmentCheckAssignmentContext, node: RulesEslintPatternsNoBracketAssignmentCheckAssignmentNode): RulesEslintPatternsNoBracketAssignmentCheckAssignmentReturns {
    const left: RulesEslintPatternsNoBracketAssignmentCheckAssignmentLeft = node.left;

    if (left.type === 'MemberExpression' && left.computed === true) {
      if (node.operator === '=') {
        const objectText: RulesEslintPatternsNoBracketAssignmentCheckAssignmentObjectText = context.sourceCode.getText(left.object);
        const propertyText: RulesEslintPatternsNoBracketAssignmentCheckAssignmentPropertyText = context.sourceCode.getText(left.property);
        const valueText: RulesEslintPatternsNoBracketAssignmentCheckAssignmentValueText = context.sourceCode.getText(node.right);

        context.report({
          node,
          messageId: 'useReflectSet',
          fix(fixer) {
            return fixer.replaceText(node, `Reflect.set(${objectText}, ${propertyText}, ${valueText})`);
          },
        });
      } else {
        context.report({
          node,
          messageId: 'useReflectSet',
        });
      }
    }

    return;
  }
}

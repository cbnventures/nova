import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Context,
  Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Left,
  Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Node,
  Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_ObjectText,
  Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_PropertyText,
  Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Returns,
  Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_ValueText,
  Rules_Eslint_Patterns_NoBracketAssignment_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Patterns_NoBracketAssignment_Runner_RuleOptions,
} from '../../../types/rules/eslint/patterns/no-bracket-assignment.d.ts';

/**
 * Rules - ESLint - Patterns - No Bracket Assignment.
 *
 * Replaces bracket-notation assignment with Reflect.set so dynamic property writes are
 * explicit function calls that stand out in code review.
 *
 * @since 0.14.0
 */
export class Runner {
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
      ignoreFiles: [] as Rules_Eslint_Patterns_NoBracketAssignment_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Patterns_NoBracketAssignment_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        AssignmentExpression(node) {
          Runner.checkAssignment(context, node);

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
   * @param {Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Context} context - Context.
   * @param {Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Returns}
   *
   * @since 0.14.0
   */
  private static checkAssignment(context: Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Context, node: Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Node): Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Returns {
    const left: Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_Left = node.left;

    if (left.type === 'MemberExpression' && left.computed === true) {
      if (node.operator === '=') {
        const objectText: Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_ObjectText = context.sourceCode.getText(left.object);
        const propertyText: Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_PropertyText = context.sourceCode.getText(left.property);
        const valueText: Rules_Eslint_Patterns_NoBracketAssignment_Runner_CheckAssignment_ValueText = context.sourceCode.getText(node.right);

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

import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralContext,
  RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralIsRegExpArgument,
  RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralNode,
  RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralParent,
  RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralReturns,
  RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralTemplateCurly,
  RulesEslintPatternsNoTemplateCurlyInStringRuleDefaultOptionsIgnoreFiles,
  RulesEslintPatternsNoTemplateCurlyInStringRuleOptions,
} from '../../../types/rules/eslint/patterns/no-template-curly-in-string.d.ts';

/**
 * Rules - ESLint - Patterns - No Template Curly In String.
 *
 * Catches template literal placeholders inside
 * regular strings where they appear as literal text instead
 * of being interpolated, indicating missing backticks.
 *
 * @since 0.15.0
 */
export class RulesEslintPatternsNoTemplateCurlyInString {
  /**
   * Rules - ESLint - Patterns - No Template Curly In String - Rule.
   *
   * Registered under the name no-template-curly-in-string and exported through the rules
   * index as NoTemplateCurlyInString for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-template-curly-in-string',
    meta: {
      type: 'problem',
      docs: {
        description: [
          'Disallow template literal placeholder syntax in regular strings so missing backticks are caught before',
          [
            '$',
            '{',
            '}',
          ].join(''),
          'appears literally in output.',
        ].join(' '),
      },
      messages: {
        noTemplateCurlyInString: 'Unexpected template string expression in a regular string. Use backticks for template literals.',
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
      ignoreFiles: [] as RulesEslintPatternsNoTemplateCurlyInStringRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintPatternsNoTemplateCurlyInStringRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Literal(node) {
          RulesEslintPatternsNoTemplateCurlyInString.checkLiteral(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Patterns - No Template Curly In String - Check Literal.
   *
   * Scans string literal values for the dollar-brace sequence that indicates a template
   * placeholder accidentally placed inside regular quotes.
   *
   * @private
   *
   * @param {RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralContext} context - Context.
   * @param {RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralNode}    node    - Node.
   *
   * @returns {RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralReturns}
   *
   * @since 0.15.0
   */
  private static checkLiteral(context: RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralContext, node: RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralNode): RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralReturns {
    if (typeof node.value !== 'string') {
      return;
    }

    // Skip strings passed as the first argument to new RegExp().
    const parent: RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralParent = node.parent;
    const isRegExpArgument: RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralIsRegExpArgument = parent !== undefined
      && parent.type === 'NewExpression'
      && parent.callee.type === 'Identifier'
      && parent.callee.name === 'RegExp'
      && parent.arguments[0] === node;

    if (isRegExpArgument === true) {
      return;
    }

    const templateCurly: RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralTemplateCurly = [
      '$',
      '{',
    ].join('');

    if (node.value.includes(templateCurly) === true) {
      context.report({
        node,
        messageId: 'noTemplateCurlyInString',
      });
    }

    return;
  }
}

import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintSafetyNoScriptUrlCheckLiteralAllowedPatterns,
  RulesEslintSafetyNoScriptUrlCheckLiteralContext,
  RulesEslintSafetyNoScriptUrlCheckLiteralLowered,
  RulesEslintSafetyNoScriptUrlCheckLiteralNode,
  RulesEslintSafetyNoScriptUrlCheckLiteralReturns,
  RulesEslintSafetyNoScriptUrlCheckLiteralValue,
  RulesEslintSafetyNoScriptUrlRuleDefaultOptionsAllowedPatterns,
  RulesEslintSafetyNoScriptUrlRuleDefaultOptionsIgnoreFiles,
  RulesEslintSafetyNoScriptUrlRuleOptions,
} from '../../../types/rules/eslint/safety/no-script-url.d.ts';

/**
 * Rules - ESLint - Safety - No Script URL.
 *
 * Flags string literals that begin with javascript: to prevent XSS injection vectors. An
 * allowedPatterns option permits specific safe values like void(0).
 *
 * @since 0.15.0
 */
export class RulesEslintSafetyNoScriptUrl {
  /**
   * Rules - ESLint - Safety - No Script URL - Rule.
   *
   * Exported through the ESLint plugin index
   * and activated in eslint.config.ts. Inspects every
   * Literal node for the javascript: protocol prefix.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-script-url',
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow javascript: URLs except for explicitly allowed patterns.',
      },
      messages: {
        noScriptUrl: 'Unexpected javascript: URL. Use a safe alternative or "javascript:void(0)" instead.',
      },
      schema: [{
        type: 'object',
        properties: {
          allowedPatterns: {
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
      allowedPatterns: [] as RulesEslintSafetyNoScriptUrlRuleDefaultOptionsAllowedPatterns,
      ignoreFiles: [] as RulesEslintSafetyNoScriptUrlRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintSafetyNoScriptUrlRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Literal(node) {
          RulesEslintSafetyNoScriptUrl.checkLiteral(context, node, options['allowedPatterns']);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Safety - No Script URL - Check Literal.
   *
   * Tests a single Literal node value against the javascript: prefix after lowercasing.
   * Skips the report when the value matches an allowed pattern.
   *
   * @private
   *
   * @param {RulesEslintSafetyNoScriptUrlCheckLiteralContext}         context         - Context.
   * @param {RulesEslintSafetyNoScriptUrlCheckLiteralNode}            node            - Node.
   * @param {RulesEslintSafetyNoScriptUrlCheckLiteralAllowedPatterns} allowedPatterns - Allowed patterns.
   *
   * @returns {RulesEslintSafetyNoScriptUrlCheckLiteralReturns}
   *
   * @since 0.15.0
   */
  private static checkLiteral(context: RulesEslintSafetyNoScriptUrlCheckLiteralContext, node: RulesEslintSafetyNoScriptUrlCheckLiteralNode, allowedPatterns: RulesEslintSafetyNoScriptUrlCheckLiteralAllowedPatterns): RulesEslintSafetyNoScriptUrlCheckLiteralReturns {
    const value: RulesEslintSafetyNoScriptUrlCheckLiteralValue = node.value;

    if (typeof value !== 'string') {
      return;
    }

    const lowered: RulesEslintSafetyNoScriptUrlCheckLiteralLowered = value.toLowerCase();

    if (lowered.startsWith('javascript:') === false) {
      return;
    }

    for (const pattern of allowedPatterns) {
      if (lowered === pattern.toLowerCase()) {
        return;
      }
    }

    context.report({
      node,
      messageId: 'noScriptUrl',
    });

    return;
  }
}

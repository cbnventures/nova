import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_AllowedPatterns,
  Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Context,
  Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Lowered,
  Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Node,
  Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Returns,
  Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Value,
  Rules_Eslint_Safety_NoScriptUrl_Runner_RuleDefaultOptionsAllowedPatterns,
  Rules_Eslint_Safety_NoScriptUrl_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Safety_NoScriptUrl_Runner_RuleOptions,
} from '../../../types/rules/eslint/safety/no-script-url.d.ts';

/**
 * Rules - ESLint - Safety - No Script URL.
 *
 * Flags string literals that begin with javascript: to prevent XSS injection vectors. An
 * allowedPatterns option permits specific safe values like void(0).
 *
 * @since 0.15.0
 */
export class Runner {
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
      allowedPatterns: [] as Rules_Eslint_Safety_NoScriptUrl_Runner_RuleDefaultOptionsAllowedPatterns,
      ignoreFiles: [] as Rules_Eslint_Safety_NoScriptUrl_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Safety_NoScriptUrl_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Literal(node) {
          Runner.checkLiteral(context, node, options['allowedPatterns']);

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
   * @param {Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Context}         context         - Context.
   * @param {Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Node}            node            - Node.
   * @param {Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_AllowedPatterns} allowedPatterns - Allowed patterns.
   *
   * @returns {Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Returns}
   *
   * @since 0.15.0
   */
  private static checkLiteral(context: Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Context, node: Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Node, allowedPatterns: Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_AllowedPatterns): Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Returns {
    const value: Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Value = node.value;

    if (typeof value !== 'string') {
      return;
    }

    const lowered: Rules_Eslint_Safety_NoScriptUrl_Runner_CheckLiteral_Lowered = value.toLowerCase();

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

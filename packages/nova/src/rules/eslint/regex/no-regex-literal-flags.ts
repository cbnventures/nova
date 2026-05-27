import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Context,
  Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Node,
  Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Returns,
  Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_RuleOptions,
} from '../../../types/rules/eslint/regex/no-regex-literal-flags.d.ts';

/**
 * Rules - ESLint - Regex - No Regex Literal Flags.
 *
 * Prevents flags from being baked into regex literals so the call site controls flags via
 * the RegExp constructor, keeping stored patterns reusable.
 *
 * @since 0.13.0
 */
export class Runner {
  /**
   * Rules - ESLint - Regex - No Regex Literal Flags - Rule.
   *
   * Registered under the name no-regex-literal-flags and exported through the rules index as
   * NoRegexLiteralFlags for preset consumption.
   *
   * @since 0.13.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-regex-literal-flags',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow flags on regex literals. Add flags at the call site via new RegExp(pattern, flags) instead.',
      },
      messages: {
        noRegexFlags: 'Do not use flags on regex literals. Add flags at the call site via new RegExp(pattern, flags) instead.',
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
      ignoreFiles: [] as Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_RuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Literal(node) {
          Runner.checkLiteral(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Regex - No Regex Literal Flags - Check Literal.
   *
   * Reports regex literals that carry inline flags
   * so the pattern stays portable and flags are applied
   * at the call site through the RegExp constructor.
   *
   * @private
   *
   * @param {Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Context} context - Context.
   * @param {Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Node}    node    - Node.
   *
   * @returns {Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Returns}
   *
   * @since 0.13.0
   */
  private static checkLiteral(context: Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Context, node: Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Node): Rules_Eslint_Regex_NoRegexLiteralFlags_Runner_CheckLiteral_Returns {
    if (
      'regex' in node
      && node.regex !== undefined
      && node.regex.flags.length > 0
    ) {
      context.report({
        node,
        messageId: 'noRegexFlags',
      });
    }

    return;
  }
}

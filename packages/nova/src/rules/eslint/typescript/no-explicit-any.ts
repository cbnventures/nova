import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordContext,
  RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordNode,
  RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordReturns,
  RulesEslintTypescriptNoExplicitAnyRuleDefaultOptionsIgnoreFiles,
  RulesEslintTypescriptNoExplicitAnyRuleOptions,
} from '../../../types/rules/eslint/typescript/no-explicit-any.d.ts';

/**
 * Rules - ESLint - TypeScript - No Explicit Any.
 *
 * Bans the "any" type annotation across the
 * codebase so every value is either narrowed through type
 * guards or described by a specific named type.
 *
 * @since 0.15.0
 */
export class RulesEslintTypescriptNoExplicitAny {
  /**
   * Rules - ESLint - TypeScript - No Explicit Any - Rule.
   *
   * Registered under the name no-explicit-any and
   * exported through the rules index as NoExplicitAny
   * for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-explicit-any',
    meta: {
      type: 'problem',
      docs: {
        description: 'Disallow usage of the "any" type. Use "unknown" and narrow with type guards, or define a specific type.',
      },
      messages: {
        noExplicitAny: 'Do not use "any". Use "unknown" and narrow with type guards, or define a specific type.',
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
      ignoreFiles: [] as RulesEslintTypescriptNoExplicitAnyRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintTypescriptNoExplicitAnyRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        TSAnyKeyword(node) {
          RulesEslintTypescriptNoExplicitAny.checkAnyKeyword(context, node);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - TypeScript - No Explicit Any - Check Any Keyword.
   *
   * Reports every TSAnyKeyword node unconditionally
   * since no usage of the any type is permitted in the
   * codebase regardless of context.
   *
   * @private
   *
   * @param {RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordContext} context - Context.
   * @param {RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordNode}    node    - Node.
   *
   * @returns {RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordReturns}
   *
   * @since 0.15.0
   */
  private static checkAnyKeyword(context: RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordContext, node: RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordNode): RulesEslintTypescriptNoExplicitAnyCheckAnyKeywordReturns {
    context.report({
      node,
      messageId: 'noExplicitAny',
    });

    return;
  }
}

import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintSyntaxNoNumericLiteralsCheckLiteralContext,
  RulesEslintSyntaxNoNumericLiteralsCheckLiteralLowered,
  RulesEslintSyntaxNoNumericLiteralsCheckLiteralNode,
  RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptions,
  RulesEslintSyntaxNoNumericLiteralsCheckLiteralRaw,
  RulesEslintSyntaxNoNumericLiteralsCheckLiteralReturns,
  RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsAllowBinary,
  RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsAllowHex,
  RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsAllowOctal,
  RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsIgnoreFiles,
  RulesEslintSyntaxNoNumericLiteralsRuleOptions,
} from '../../../types/rules/eslint/syntax/no-numeric-literals.d.ts';

/**
 * Rules - ESLint - Syntax - No Numeric Literals.
 *
 * Forbids binary, octal, and hexadecimal literal forms so numeric bases are always explicit
 * through parseInt with a radix argument.
 *
 * @since 0.15.0
 */
export class RulesEslintSyntaxNoNumericLiterals {
  /**
   * Rules - ESLint - Syntax - No Numeric Literals - Rule.
   *
   * Registered under the name no-numeric-literals and exported through the rules index as
   * NoNumericLiterals for preset consumption.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-numeric-literals',
    meta: {
      type: 'suggestion',
      docs: {
        description: 'Disallow binary, octal, and hexadecimal numeric literal forms.',
      },
      messages: {
        noNumericLiteral: 'Use parseInt() with an explicit base instead of the {{ form }} literal {{ raw }}.',
      },
      schema: [{
        type: 'object',
        properties: {
          allowBinary: {
            type: 'boolean',
          },
          allowHex: {
            type: 'boolean',
          },
          allowOctal: {
            type: 'boolean',
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
      allowBinary: false as RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsAllowBinary,
      allowHex: false as RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsAllowHex,
      allowOctal: false as RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsAllowOctal,
      ignoreFiles: [] as RulesEslintSyntaxNoNumericLiteralsRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintSyntaxNoNumericLiteralsRuleOptions = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Literal(node) {
          RulesEslintSyntaxNoNumericLiterals.checkLiteral(context, node, options);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Syntax - No Numeric Literals - Check Literal.
   *
   * Inspects numeric literal raw text for 0b, 0o,
   * or 0x prefixes and reports unless the corresponding
   * allow option is enabled in the rule configuration.
   *
   * @private
   *
   * @param {RulesEslintSyntaxNoNumericLiteralsCheckLiteralContext} context - Context.
   * @param {RulesEslintSyntaxNoNumericLiteralsCheckLiteralNode}    node    - Node.
   * @param {RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptions} options - Options.
   *
   * @returns {RulesEslintSyntaxNoNumericLiteralsCheckLiteralReturns}
   *
   * @since 0.15.0
   */
  private static checkLiteral(context: RulesEslintSyntaxNoNumericLiteralsCheckLiteralContext, node: RulesEslintSyntaxNoNumericLiteralsCheckLiteralNode, options: RulesEslintSyntaxNoNumericLiteralsCheckLiteralOptions): RulesEslintSyntaxNoNumericLiteralsCheckLiteralReturns {
    if (typeof node.value !== 'number') {
      return;
    }

    const raw: RulesEslintSyntaxNoNumericLiteralsCheckLiteralRaw = node.raw;

    if (raw === undefined) {
      return;
    }

    const lowered: RulesEslintSyntaxNoNumericLiteralsCheckLiteralLowered = raw.toLowerCase();

    if (lowered.startsWith('0b') === true) {
      if (options['allowBinary'] === true) {
        return;
      }

      context.report({
        node,
        messageId: 'noNumericLiteral',
        data: {
          form: 'binary',
          raw,
        },
      });

      return;
    }

    if (lowered.startsWith('0o') === true) {
      if (options['allowOctal'] === true) {
        return;
      }

      context.report({
        node,
        messageId: 'noNumericLiteral',
        data: {
          form: 'octal',
          raw,
        },
      });

      return;
    }

    if (lowered.startsWith('0x') === true) {
      if (options['allowHex'] === true) {
        return;
      }

      context.report({
        node,
        messageId: 'noNumericLiteral',
        data: {
          form: 'hexadecimal',
          raw,
        },
      });
    }

    return;
  }
}

import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Context,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Lowered,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Node,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Raw,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Returns,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_Create_Literal_Node,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_Create_Literal_Returns,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_Create_Options,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsAllowBinary,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsAllowHex,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsAllowOctal,
  Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsIgnoreFiles,
} from '../../../types/rules/eslint/syntax/no-numeric-literals.d.ts';

/**
 * Rules - ESLint - Syntax - No Numeric Literals.
 *
 * Forbids binary, octal, and hexadecimal literal forms so numeric bases are always explicit
 * through parseInt with a radix argument.
 *
 * @since 0.15.0
 */
export class Runner {
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
      allowBinary: false as Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsAllowBinary,
      allowHex: false as Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsAllowHex,
      allowOctal: false as Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsAllowOctal,
      ignoreFiles: [] as Rules_Eslint_Syntax_NoNumericLiterals_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Syntax_NoNumericLiterals_Runner_Create_Options = defaultOptions[0];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Literal(node: Rules_Eslint_Syntax_NoNumericLiterals_Runner_Create_Literal_Node): Rules_Eslint_Syntax_NoNumericLiterals_Runner_Create_Literal_Returns {
          Runner.checkLiteral(context, node, options);

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
   * @param {Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Context} context - Context.
   * @param {Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Node}    node    - Node.
   * @param {Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options} options - Options.
   *
   * @returns {Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Returns}
   *
   * @since 0.15.0
   */
  private static checkLiteral(context: Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Context, node: Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Node, options: Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Options): Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Returns {
    if (typeof node.value !== 'number') {
      return;
    }

    const raw: Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Raw = node.raw;

    if (raw === undefined) {
      return;
    }

    const lowered: Rules_Eslint_Syntax_NoNumericLiterals_Runner_CheckLiteral_Lowered = raw.toLowerCase();

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

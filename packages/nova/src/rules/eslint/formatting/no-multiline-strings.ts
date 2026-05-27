import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_AllowEscapeSequences,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Context,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Node,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Raw,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_RawInner,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Returns,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_AllowEscapeSequences,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Context,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Node,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiRawParts,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiValue,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Raw,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Returns,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_First,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Last,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_LastIndex,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Parts,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Returns,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_StrippedFirst,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_StrippedLast,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_WorkingParts,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleAllowEscapeSequences,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleDefaultOptionsAllowEscapeSequences,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleDefaultOptionsIgnoreFiles,
  Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleOptions,
} from '../../../types/rules/eslint/formatting/no-multiline-strings.d.ts';

/**
 * Rules - ESLint - Formatting - No Multiline Strings.
 *
 * Disallows multiline string content including backslash continuation, visual newlines in
 * template literals, and internal escape sequences.
 *
 * @since 0.15.0
 */
export class Runner {
  /**
   * Rules - ESLint - Formatting - No Multiline Strings - Newline Character.
   *
   * Stores the literal linefeed character used to detect visual newlines in template literal
   * quasis and backslash continuation patterns.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #newlineChar = String.fromCharCode(10);

  /**
   * Rules - ESLint - Formatting - No Multiline Strings - Escaped Newline Pattern.
   *
   * The two-character escape sequence used to detect internal newline escapes in raw string
   * content, built by joining to avoid self-triggering.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #escapedNewline = [
    '\\',
    'n',
  ].join('');

  /**
   * Rules - ESLint - Formatting - No Multiline Strings - Backslash Continuation Pattern.
   *
   * The backslash-then-newline sequence used to detect line continuation in regular string
   * literals, built by joining to avoid self-triggering.
   *
   * @private
   *
   * @since 0.15.0
   */
  static readonly #backslashContinuation = [
    '\\',
    Runner.#newlineChar,
  ].join('');

  /**
   * Rules - ESLint - Formatting - No Multiline Strings - Rule.
   *
   * Registered as a custom ESLint rule in the eslint config. Visits
   * Literal and TemplateLiteral nodes to flag multiline string patterns.
   *
   * @since 0.15.0
   */
  public static rule = ESLintUtils.RuleCreator(() => '#')({
    name: 'no-multiline-strings',
    meta: {
      type: 'suggestion',
      docs: {
        description: [
          'Disallow multiline string content including backslash continuation, visual newlines in template literals, and internal ',
          Runner.#escapedNewline,
          ' escape sequences.',
        ].join(''),
      },
      messages: {
        noBackslashContinuation: [
          'Unexpected backslash line continuation. Use [].join("',
          Runner.#escapedNewline,
          '") to construct multiline strings.',
        ].join(''),
        noVisualNewline: [
          'Unexpected visual newline in template literal. Use ',
          Runner.#escapedNewline,
          ' for inline newlines or [].join("',
          Runner.#escapedNewline,
          '") for multiline content.',
        ].join(''),
        noEscapeNewline: [
          'String contains multiline content. Split into an array and use [].join("',
          Runner.#escapedNewline,
          '") instead.',
        ].join(''),
      },
      schema: [{
        type: 'object',
        properties: {
          allowEscapeSequences: {
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
      allowEscapeSequences: false as Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleDefaultOptionsAllowEscapeSequences,
      ignoreFiles: [] as Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleOptions = defaultOptions[0];
      const allowEscapeSequences: Rules_Eslint_Formatting_NoMultilineStrings_Runner_RuleAllowEscapeSequences = options['allowEscapeSequences'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Literal(node) {
          Runner.checkLiteral(context, node, allowEscapeSequences);

          return;
        },
        TemplateLiteral(node) {
          Runner.checkTemplateLiteral(context, node, allowEscapeSequences);

          return;
        },
      };
    },
  });

  /**
   * Rules - ESLint - Formatting - No Multiline Strings - Check Literal.
   *
   * Inspects regular string literals for backslash continuation and
   * internal escape sequences, skipping standalone newline delimiters.
   *
   * @private
   *
   * @param {Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Context}              context              - Context.
   * @param {Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Node}                 node                 - Node.
   * @param {Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_AllowEscapeSequences} allowEscapeSequences - Allow escape sequences.
   *
   * @returns {Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Returns}
   *
   * @since 0.15.0
   */
  private static checkLiteral(context: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Context, node: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Node, allowEscapeSequences: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_AllowEscapeSequences): Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Returns {
    if (typeof node.value !== 'string') {
      return;
    }

    // Skip standalone newline strings (e.g. '\n' used as a join delimiter).
    if (node.value === Runner.#newlineChar) {
      return;
    }

    const raw: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_Raw = node.raw;

    // Check backslash continuation.
    if (raw.includes(Runner.#backslashContinuation) === true) {
      context.report({
        node,
        messageId: 'noBackslashContinuation',
      });

      return;
    }

    // Check internal \n escape sequences in regular strings.
    if (allowEscapeSequences === false) {
      const rawInner: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckLiteral_RawInner = raw.slice(1, raw.length - 1);

      if (Runner.hasInternalEscapedNewlines([rawInner]) === true) {
        context.report({
          node,
          messageId: 'noEscapeNewline',
        });
      }
    }

    return;
  }

  /**
   * Rules - ESLint - Formatting - No Multiline Strings - Check Template Literal.
   *
   * Inspects template literals for visual newlines in quasis and internal escape sequences,
   * skipping tagged template expressions.
   *
   * @private
   *
   * @param {Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Context}              context              - Context.
   * @param {Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Node}                 node                 - Node.
   * @param {Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_AllowEscapeSequences} allowEscapeSequences - Allow escape sequences.
   *
   * @returns {Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Returns}
   *
   * @since 0.15.0
   */
  private static checkTemplateLiteral(context: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Context, node: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Node, allowEscapeSequences: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_AllowEscapeSequences): Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Returns {
    // Skip tagged template literals.
    if (node.parent.type === 'TaggedTemplateExpression') {
      return;
    }

    // Check visual newlines in each quasi.
    for (const quasi of node.quasis) {
      const raw: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_Raw = quasi.value.raw;

      if (raw.includes(Runner.#newlineChar) === true) {
        context.report({
          node,
          messageId: 'noVisualNewline',
        });

        return;
      }
    }

    // Check internal \n escape sequences across all quasis.
    if (allowEscapeSequences === false) {
      const quasiRawParts: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiRawParts = node.quasis.map((quasi) => {
        const quasiValue: Rules_Eslint_Formatting_NoMultilineStrings_Runner_CheckTemplateLiteral_QuasiValue = quasi.value;

        return quasiValue['raw'];
      });

      if (Runner.hasInternalEscapedNewlines(quasiRawParts) === true) {
        context.report({
          node,
          messageId: 'noEscapeNewline',
        });
      }
    }

    return;
  }

  /**
   * Rules - ESLint - Formatting - No Multiline Strings - Has Internal Escaped Newlines.
   *
   * Strips leading and trailing escape sequences from the first and last parts, then checks
   * whether any remaining part still contains an escaped newline.
   *
   * @private
   *
   * @param {Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Parts} parts - Parts.
   *
   * @returns {Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Returns}
   *
   * @since 0.15.0
   */
  private static hasInternalEscapedNewlines(parts: Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Parts): Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Returns {
    const workingParts: Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_WorkingParts = [...parts];

    // Strip leading escaped newlines from the first part.
    const first: Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_First = workingParts[0];

    if (first !== undefined) {
      let strippedFirst: Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_StrippedFirst = first;

      while (strippedFirst.startsWith(Runner.#escapedNewline) === true) {
        strippedFirst = strippedFirst.slice(Runner.#escapedNewline.length);
      }

      Reflect.set(workingParts, 0, strippedFirst);
    }

    // Strip trailing escaped newlines from the last part.
    const lastIndex: Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_LastIndex = workingParts.length - 1;
    const last: Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_Last = workingParts[lastIndex];

    if (last !== undefined) {
      let strippedLast: Rules_Eslint_Formatting_NoMultilineStrings_Runner_HasInternalEscapedNewlines_StrippedLast = last;

      while (strippedLast.endsWith(Runner.#escapedNewline) === true) {
        strippedLast = strippedLast.slice(0, strippedLast.length - Runner.#escapedNewline.length);
      }

      Reflect.set(workingParts, lastIndex, strippedLast);
    }

    // Check remaining parts for internal escaped newlines.
    for (const workingPart of workingParts) {
      if (workingPart.includes(Runner.#escapedNewline) === true) {
        return true;
      }
    }

    return false;
  }
}

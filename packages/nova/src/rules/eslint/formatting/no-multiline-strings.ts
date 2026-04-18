import { ESLintUtils } from '@typescript-eslint/utils';

import { isIgnoredFile } from '../../../lib/utility.js';

import type {
  RulesEslintFormattingNoMultilineStringsCheckLiteralAllowEscapeSequences,
  RulesEslintFormattingNoMultilineStringsCheckLiteralContext,
  RulesEslintFormattingNoMultilineStringsCheckLiteralNode,
  RulesEslintFormattingNoMultilineStringsCheckLiteralRaw,
  RulesEslintFormattingNoMultilineStringsCheckLiteralRawInner,
  RulesEslintFormattingNoMultilineStringsCheckLiteralReturns,
  RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralAllowEscapeSequences,
  RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralContext,
  RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralNode,
  RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiRawParts,
  RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiValue,
  RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralRaw,
  RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralReturns,
  RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesFirst,
  RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesLast,
  RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesLastIndex,
  RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesParts,
  RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesReturns,
  RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesStrippedFirst,
  RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesStrippedLast,
  RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesWorkingParts,
  RulesEslintFormattingNoMultilineStringsRuleAllowEscapeSequences,
  RulesEslintFormattingNoMultilineStringsRuleDefaultOptionsAllowEscapeSequences,
  RulesEslintFormattingNoMultilineStringsRuleDefaultOptionsIgnoreFiles,
  RulesEslintFormattingNoMultilineStringsRuleOptions,
} from '../../../types/rules/eslint/formatting/no-multiline-strings.d.ts';

/**
 * Rules - ESLint - Formatting - No Multiline Strings.
 *
 * Disallows multiline string content including backslash continuation, visual newlines in
 * template literals, and internal escape sequences.
 *
 * @since 0.15.0
 */
export class RulesEslintFormattingNoMultilineStrings {
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
    RulesEslintFormattingNoMultilineStrings.#newlineChar,
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
          RulesEslintFormattingNoMultilineStrings.#escapedNewline,
          ' escape sequences.',
        ].join(''),
      },
      messages: {
        noBackslashContinuation: [
          'Unexpected backslash line continuation. Use [].join("',
          RulesEslintFormattingNoMultilineStrings.#escapedNewline,
          '") to construct multiline strings.',
        ].join(''),
        noVisualNewline: [
          'Unexpected visual newline in template literal. Use ',
          RulesEslintFormattingNoMultilineStrings.#escapedNewline,
          ' for inline newlines or [].join("',
          RulesEslintFormattingNoMultilineStrings.#escapedNewline,
          '") for multiline content.',
        ].join(''),
        noEscapeNewline: [
          'String contains multiline content. Split into an array and use [].join("',
          RulesEslintFormattingNoMultilineStrings.#escapedNewline,
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
      allowEscapeSequences: false as RulesEslintFormattingNoMultilineStringsRuleDefaultOptionsAllowEscapeSequences,
      ignoreFiles: [] as RulesEslintFormattingNoMultilineStringsRuleDefaultOptionsIgnoreFiles,
    }],
    create(context, defaultOptions) {
      const options: RulesEslintFormattingNoMultilineStringsRuleOptions = defaultOptions[0];
      const allowEscapeSequences: RulesEslintFormattingNoMultilineStringsRuleAllowEscapeSequences = options['allowEscapeSequences'];

      // Skip ignored files.
      if (isIgnoredFile(context.filename, options['ignoreFiles']) === true) {
        return {};
      }

      return {
        Literal(node) {
          RulesEslintFormattingNoMultilineStrings.checkLiteral(context, node, allowEscapeSequences);

          return;
        },
        TemplateLiteral(node) {
          RulesEslintFormattingNoMultilineStrings.checkTemplateLiteral(context, node, allowEscapeSequences);

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
   * @param {RulesEslintFormattingNoMultilineStringsCheckLiteralContext}              context              - Context.
   * @param {RulesEslintFormattingNoMultilineStringsCheckLiteralNode}                 node                 - Node.
   * @param {RulesEslintFormattingNoMultilineStringsCheckLiteralAllowEscapeSequences} allowEscapeSequences - Allow escape sequences.
   *
   * @returns {RulesEslintFormattingNoMultilineStringsCheckLiteralReturns}
   *
   * @since 0.15.0
   */
  private static checkLiteral(context: RulesEslintFormattingNoMultilineStringsCheckLiteralContext, node: RulesEslintFormattingNoMultilineStringsCheckLiteralNode, allowEscapeSequences: RulesEslintFormattingNoMultilineStringsCheckLiteralAllowEscapeSequences): RulesEslintFormattingNoMultilineStringsCheckLiteralReturns {
    if (typeof node.value !== 'string') {
      return;
    }

    // Skip standalone newline strings (e.g. '\n' used as a join delimiter).
    if (node.value === RulesEslintFormattingNoMultilineStrings.#newlineChar) {
      return;
    }

    const raw: RulesEslintFormattingNoMultilineStringsCheckLiteralRaw = node.raw;

    // Check backslash continuation.
    if (raw.includes(RulesEslintFormattingNoMultilineStrings.#backslashContinuation) === true) {
      context.report({
        node,
        messageId: 'noBackslashContinuation',
      });

      return;
    }

    // Check internal \n escape sequences in regular strings.
    if (allowEscapeSequences === false) {
      const rawInner: RulesEslintFormattingNoMultilineStringsCheckLiteralRawInner = raw.slice(1, raw.length - 1);

      if (RulesEslintFormattingNoMultilineStrings.hasInternalEscapedNewlines([rawInner]) === true) {
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
   * @param {RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralContext}              context              - Context.
   * @param {RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralNode}                 node                 - Node.
   * @param {RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralAllowEscapeSequences} allowEscapeSequences - Allow escape sequences.
   *
   * @returns {RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralReturns}
   *
   * @since 0.15.0
   */
  private static checkTemplateLiteral(context: RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralContext, node: RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralNode, allowEscapeSequences: RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralAllowEscapeSequences): RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralReturns {
    // Skip tagged template literals.
    if (node.parent.type === 'TaggedTemplateExpression') {
      return;
    }

    // Check visual newlines in each quasi.
    for (const quasi of node.quasis) {
      const raw: RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralRaw = quasi.value.raw;

      if (raw.includes(RulesEslintFormattingNoMultilineStrings.#newlineChar) === true) {
        context.report({
          node,
          messageId: 'noVisualNewline',
        });

        return;
      }
    }

    // Check internal \n escape sequences across all quasis.
    if (allowEscapeSequences === false) {
      const quasiRawParts: RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiRawParts = node.quasis.map((quasi) => {
        const quasiValue: RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiValue = quasi.value;

        return quasiValue['raw'];
      });

      if (RulesEslintFormattingNoMultilineStrings.hasInternalEscapedNewlines(quasiRawParts) === true) {
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
   * @param {RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesParts} parts - Parts.
   *
   * @returns {RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesReturns}
   *
   * @since 0.15.0
   */
  private static hasInternalEscapedNewlines(parts: RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesParts): RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesReturns {
    const workingParts: RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesWorkingParts = [...parts];

    // Strip leading escaped newlines from the first part.
    const first: RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesFirst = workingParts[0];

    if (first !== undefined) {
      let strippedFirst: RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesStrippedFirst = first;

      while (strippedFirst.startsWith(RulesEslintFormattingNoMultilineStrings.#escapedNewline) === true) {
        strippedFirst = strippedFirst.slice(RulesEslintFormattingNoMultilineStrings.#escapedNewline.length);
      }

      Reflect.set(workingParts, 0, strippedFirst);
    }

    // Strip trailing escaped newlines from the last part.
    const lastIndex: RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesLastIndex = workingParts.length - 1;
    const last: RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesLast = workingParts[lastIndex];

    if (last !== undefined) {
      let strippedLast: RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesStrippedLast = last;

      while (strippedLast.endsWith(RulesEslintFormattingNoMultilineStrings.#escapedNewline) === true) {
        strippedLast = strippedLast.slice(0, strippedLast.length - RulesEslintFormattingNoMultilineStrings.#escapedNewline.length);
      }

      Reflect.set(workingParts, lastIndex, strippedLast);
    }

    // Check remaining parts for internal escaped newlines.
    for (const workingPart of workingParts) {
      if (workingPart.includes(RulesEslintFormattingNoMultilineStrings.#escapedNewline) === true) {
        return true;
      }
    }

    return false;
  }
}

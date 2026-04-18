import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Backslash Continuation Pattern.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Check Literal.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoMultilineStringsCheckLiteralContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingNoMultilineStringsCheckLiteralNode = TSESTree.Literal;

export type RulesEslintFormattingNoMultilineStringsCheckLiteralAllowEscapeSequences = boolean;

export type RulesEslintFormattingNoMultilineStringsCheckLiteralReturns = void;

export type RulesEslintFormattingNoMultilineStringsCheckLiteralRaw = string;

export type RulesEslintFormattingNoMultilineStringsCheckLiteralRawInner = string;

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Check Template Literal.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralNode = TSESTree.TemplateLiteral;

export type RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralAllowEscapeSequences = boolean;

export type RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralReturns = void;

export type RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralRaw = string;

export type RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiRawParts = string[];

export type RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiValueRaw = string;

export type RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiValueCooked = string | null;

export type RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiValue = {
  raw: RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiValueRaw;
  cooked: RulesEslintFormattingNoMultilineStringsCheckTemplateLiteralQuasiValueCooked;
};

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Escaped Newline Pattern.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Has Internal Escaped Newlines.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesParts = string[];

export type RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesReturns = boolean;

export type RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesWorkingParts = string[];

export type RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesFirst = string | undefined;

export type RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesStrippedFirst = string;

export type RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesLastIndex = number;

export type RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesLast = string | undefined;

export type RulesEslintFormattingNoMultilineStringsHasInternalEscapedNewlinesStrippedLast = string;

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Newline Character.
 *
 * @since 0.15.0
 */

/**
 * Rules - ESLint - Formatting - No Multiline Strings - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoMultilineStringsRuleDefaultOptionsAllowEscapeSequences = boolean;

export type RulesEslintFormattingNoMultilineStringsRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintFormattingNoMultilineStringsRuleOptionsIgnoreFiles = string[];

export type RulesEslintFormattingNoMultilineStringsRuleOptionsAllowEscapeSequences = boolean;

export type RulesEslintFormattingNoMultilineStringsRuleOptions = Readonly<{
  ignoreFiles: RulesEslintFormattingNoMultilineStringsRuleOptionsIgnoreFiles;
  allowEscapeSequences: RulesEslintFormattingNoMultilineStringsRuleOptionsAllowEscapeSequences;
}>;

export type RulesEslintFormattingNoMultilineStringsRuleAllowEscapeSequences = boolean;

import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal - Check Template Literal.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralNode = TSESTree.TemplateLiteral;

export type RulesEslintFormattingNoTernaryInTemplateLiteralCheckTemplateLiteralReturns = void;

/**
 * Rules - ESLint - Formatting - No Ternary In Template Literal - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoTernaryInTemplateLiteralRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintFormattingNoTernaryInTemplateLiteralRuleOptionsIgnoreFiles = string[];

export type RulesEslintFormattingNoTernaryInTemplateLiteralRuleOptions = Readonly<{
  ignoreFiles: RulesEslintFormattingNoTernaryInTemplateLiteralRuleOptionsIgnoreFiles;
}>;

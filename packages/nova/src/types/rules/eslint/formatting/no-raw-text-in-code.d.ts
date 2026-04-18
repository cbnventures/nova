import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - No Raw Text In Code - Check JSX Text.
 *
 * @since 0.13.0
 */
export type RulesEslintFormattingNoRawTextInCodeCheckJSXTextContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingNoRawTextInCodeCheckJSXTextNode = TSESTree.JSXText;

export type RulesEslintFormattingNoRawTextInCodeCheckJSXTextReturns = void;

export type RulesEslintFormattingNoRawTextInCodeCheckJSXTextParent = TSESTree.Node | undefined;

/**
 * Rules - ESLint - Formatting - No Raw Text In Code - Rule.
 *
 * @since 0.13.0
 */
export type RulesEslintFormattingNoRawTextInCodeRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintFormattingNoRawTextInCodeRuleOptionsIgnoreFiles = string[];

export type RulesEslintFormattingNoRawTextInCodeRuleOptions = Readonly<{
  ignoreFiles: RulesEslintFormattingNoRawTextInCodeRuleOptionsIgnoreFiles;
}>;

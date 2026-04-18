import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Patterns - No Template Curly In String - Check Literal.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralNode = TSESTree.Literal;

export type RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralReturns = void;

export type RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralParent = TSESTree.Node | undefined;

export type RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralIsRegExpArgument = boolean;

export type RulesEslintPatternsNoTemplateCurlyInStringCheckLiteralTemplateCurly = string;

/**
 * Rules - ESLint - Patterns - No Template Curly In String - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintPatternsNoTemplateCurlyInStringRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoTemplateCurlyInStringRuleOptionsIgnoreFiles = string[];

export type RulesEslintPatternsNoTemplateCurlyInStringRuleOptions = Readonly<{
  ignoreFiles: RulesEslintPatternsNoTemplateCurlyInStringRuleOptionsIgnoreFiles;
}>;

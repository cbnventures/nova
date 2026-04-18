import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Safety - No Script URL - Check Literal.
 *
 * @since 0.15.0
 */
export type RulesEslintSafetyNoScriptUrlCheckLiteralContext = Readonly<RuleContext<string, readonly unknown[]>>;

export type RulesEslintSafetyNoScriptUrlCheckLiteralNode = TSESTree.Literal;

export type RulesEslintSafetyNoScriptUrlCheckLiteralAllowedPatterns = string[];

export type RulesEslintSafetyNoScriptUrlCheckLiteralReturns = void;

export type RulesEslintSafetyNoScriptUrlCheckLiteralValue = unknown;

export type RulesEslintSafetyNoScriptUrlCheckLiteralLowered = string;

/**
 * Rules - ESLint - Safety - No Script URL - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintSafetyNoScriptUrlRuleDefaultOptionsAllowedPatterns = string[];

export type RulesEslintSafetyNoScriptUrlRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintSafetyNoScriptUrlRuleOptionsIgnoreFiles = string[];

export type RulesEslintSafetyNoScriptUrlRuleOptionsAllowedPatterns = string[];

export type RulesEslintSafetyNoScriptUrlRuleOptions = Readonly<{
  ignoreFiles: RulesEslintSafetyNoScriptUrlRuleOptionsIgnoreFiles;
  allowedPatterns: RulesEslintSafetyNoScriptUrlRuleOptionsAllowedPatterns;
}>;

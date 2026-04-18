import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Check Arrow Function.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionNode = TSESTree.ArrowFunctionExpression;

export type RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionMaxNestedArrows = number;

export type RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionMaxChainLength = number;

export type RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionReturns = void;

export type RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionBody = TSESTree.Expression;

export type RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionNestedCount = number;

export type RulesEslintFormattingNoComplexArrowConciseCheckArrowFunctionChainLength = number;

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Count Chain Length.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoComplexArrowConciseCountChainLengthNode = TSESTree.Node;

export type RulesEslintFormattingNoComplexArrowConciseCountChainLengthReturns = number;

export type RulesEslintFormattingNoComplexArrowConciseCountChainLengthCount = number;

export type RulesEslintFormattingNoComplexArrowConciseCountChainLengthCurrent = TSESTree.Node;

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Count Nested Arrows.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsNode = TSESTree.Node;

export type RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsReturns = number;

export type RulesEslintFormattingNoComplexArrowConciseCountNestedArrowsCount = number;

/**
 * Rules - ESLint - Formatting - No Complex Arrow Concise - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintFormattingNoComplexArrowConciseRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintFormattingNoComplexArrowConciseRuleDefaultOptionsMaxChainLength = number;

export type RulesEslintFormattingNoComplexArrowConciseRuleDefaultOptionsMaxNestedArrows = number;

export type RulesEslintFormattingNoComplexArrowConciseRuleOptionsIgnoreFiles = string[];

export type RulesEslintFormattingNoComplexArrowConciseRuleOptionsMaxNestedArrows = number;

export type RulesEslintFormattingNoComplexArrowConciseRuleOptionsMaxChainLength = number;

export type RulesEslintFormattingNoComplexArrowConciseRuleOptions = Readonly<{
  ignoreFiles: RulesEslintFormattingNoComplexArrowConciseRuleOptionsIgnoreFiles;
  maxNestedArrows: RulesEslintFormattingNoComplexArrowConciseRuleOptionsMaxNestedArrows;
  maxChainLength: RulesEslintFormattingNoComplexArrowConciseRuleOptionsMaxChainLength;
}>;

export type RulesEslintFormattingNoComplexArrowConciseRuleMaxNestedArrows = number;

export type RulesEslintFormattingNoComplexArrowConciseRuleMaxChainLength = number;

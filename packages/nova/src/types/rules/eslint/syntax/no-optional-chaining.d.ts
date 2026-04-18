import type { TSESTree } from '@typescript-eslint/utils';
import type { RuleContext } from '@typescript-eslint/utils/ts-eslint';

/**
 * Rules - ESLint - Syntax - No Optional Chaining - Check Chain Expression.
 *
 * @since 0.15.0
 */
export type RulesEslintSyntaxNoOptionalChainingCheckChainExpressionContext = Readonly<RuleContext<string, unknown[]>>;

export type RulesEslintSyntaxNoOptionalChainingCheckChainExpressionNode = TSESTree.ChainExpression;

export type RulesEslintSyntaxNoOptionalChainingCheckChainExpressionReturns = void;

/**
 * Rules - ESLint - Syntax - No Optional Chaining - Rule.
 *
 * @since 0.15.0
 */
export type RulesEslintSyntaxNoOptionalChainingRuleDefaultOptionsIgnoreFiles = string[];

export type RulesEslintSyntaxNoOptionalChainingRuleOptionsIgnoreFiles = string[];

export type RulesEslintSyntaxNoOptionalChainingRuleOptions = Readonly<{
  ignoreFiles: RulesEslintSyntaxNoOptionalChainingRuleOptionsIgnoreFiles;
}>;
